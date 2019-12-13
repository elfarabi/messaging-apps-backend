import { User, ChatRoom, ChatContent } from '../model';

const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'new_database',
  password: 'postgres',
  port: 5432,
});

const findUserInDB = (userId) => {
  return User.findOne({
    where: {
      email: userId
    }
  });
};

const createChatRoomInDB = (idUserOne, idUserTwo) => {
  return ChatRoom.create({
    userOneId: idUserOne,
    userTwoId: idUserTwo
  });
};

const findChatRoomInDB = (idUserOne, idUserTwo) => {
  return ChatRoom.findOne({
    where: {
      $or: [
        {
          userOneId: idUserOne,
          userTwoId: idUserTwo
        },
        {
          userOneId: idUserTwo,
          userTwoId: idUserOne
        }
      ]
    }
  });
};

const createContentInDB = (message, id, idUserOne) => {
  return ChatContent.create({
    content: message,
    chatRoomId: id,
    userId: idUserOne
  });
};

const findChatContentInDB = (idFindChatRoom) => {
  return ChatContent.findAll({
    where: {
      chatRoomId: idFindChatRoom
    },
    order: [['createdAt', 'DESC']]
  });
};

export const sendMessage = async ({ userId, message }, res) => {
  const findUser = await findUserInDB(userId); /* Find User in Data Base */
  const { id: idUserOne } = res.locals.decode;
  const { id: idUserTwo } = findUser;
  if (findUser) {
    const findChatRoom = await findChatRoomInDB(idUserOne, idUserTwo); /* Find Chat Room in Data Base */
    const idFindChatRoom = findChatRoom && findChatRoom.id;

    if (findChatRoom) {
      const createChatContent = await createContentInDB(message, idFindChatRoom, idUserOne); /* Create Chat Content if Chat Room exists in Data Base */
      return Promise.resolve({
        success: true,
        data: createChatContent
      });
    }
    const createChatRoom = await createChatRoomInDB(idUserOne, idUserTwo); /* Create Chat Room if not exists Chat Room */
    const idCreateChatRoom = createChatRoom.id;

    if (createChatRoom) {
      const createChatContent = await createContentInDB(message, idCreateChatRoom, idUserOne); /* Create Chat Content after Create Chat Room */
      return Promise.resolve({
        success: true,
        data: createChatContent
      });
    }
    return Promise.reject({ message: 'failed to create chat room' });
  }
  return Promise.reject({ message: 'user not found' });
};

export const getConversation = async ({ userId }, res) => {
  const findUser = await findUserInDB(userId); /* Find User in Data Base */
  const { id: idUserOne } = res.locals.decode;
  const { id: idUserTwo } = findUser;

  if (findUser) {
    const findChatRoom = await findChatRoomInDB(idUserOne, idUserTwo); /* Find Chat Room in Data Base */
    const idFindChatRoom = findChatRoom && findChatRoom.id;

    if (findChatRoom) {
      await ChatContent.update({ /* Update for status isRead in Chat Content */
        isRead: true
      },
        {
          where: {
            chatRoomId: findChatRoom.id,
            userId: idUserTwo
          }
        });

      const findChatContent = await findChatContentInDB(idFindChatRoom); /* Find Chat Content in Data Base */
      return Promise.resolve({
        success: true,
        data: findChatContent
      });
    }
    return Promise.reject({ message: 'chat room not found' });
  }
  return Promise.reject({ message: 'user not found' });
};

export const lastMessage = async (req, res) => {
  const { id: idUserOne } = res.locals.decode;

  const getLastMessage = await pool.query( /* Query SQL for get Last Message and Count Unread Message */
    `SELECT *,
    (SELECT COUNT (chat_contents."id") FROM chat_contents
    WHERE chat_contents."chatRoomId" = chat_rooms."id"
    AND NOT chat_contents."userId" = ${idUserOne}
    AND chat_contents."isRead" = false) AS unread_count

    FROM chat_rooms
    LEFT JOIN chat_contents
    ON chat_rooms."id" = chat_contents."chatRoomId"
    WHERE (chat_rooms."userOneId" = ${idUserOne} OR chat_rooms."userTwoId" = ${idUserOne})

    AND (chat_contents."id" = (
    SELECT MAX (chat_contents."id") FROM chat_contents
    WHERE chat_contents."chatRoomId" = chat_rooms."id"
    ))`
  );
  if (getLastMessage) {
    return Promise.resolve({
      success: true,
      data: getLastMessage.rows
    });
  }
  return Promise.reject();
};

