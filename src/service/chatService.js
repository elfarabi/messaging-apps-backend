import { User, ChatRoom, ChatContent } from '../model';
import { notEqual } from 'assert';

const findUserInDB = async (userId) => {
  const find = await User.findOne({ where: { email: userId } });
  return find;
};

const findChatRoomInDB = async (idUserOne, idUserTwo) => {
  let find = await ChatRoom.findOne({
    where: { 'userOneId': idUserOne, 'userTwoId': idUserTwo }
  });
  if (find != null) return find;

  return find;
};

const creatChatContentInDB = async (message, idUserOne, chatRoomId) => {
  const create = await ChatContent.create({
    content: message,
    chatRoomId,
    userId: idUserOne
  });
  return create;
};

export const sendMessage = async ({ userId, message }, res) => {
  const findUser = await findUserInDB(userId);
  const userNotFound = {
    success: false,
    message: 'user not found'
  };

  if (findUser) {
    const idUserOne = res.locals.decode.id;
    const idUserTwo = findUser.dataValues.id;
    const findChatRoom = await findChatRoomInDB(idUserOne, idUserTwo);
    if (findChatRoom) {
      const createChatContent = await creatChatContentInDB(message, idUserOne, findChatRoom.id);
      return Promise.resolve({
        success: true,
        data: createChatContent,
      });
    }

    // create chat room
    // if not exists
    return ChatRoom.create({
      'userOneId': idUserOne,
      'userTwoId': idUserTwo,
    }).then((data) => {
      return ChatContent.create({
        'content': message,
        'userId': idUserOne,
        'chatRoomId': data.id,
      }).then((data) => Promise.resolve({ success: true, data, })).catch((e) => Promise.reject({ success: false, message: e }));
    }).catch((message) => Promise.reject({ success: false, message }));
  }
  return Promise.reject(userNotFound);
};

export const getConversation = async ({ userId }, res) => {
  const findUser = await User.findOne({ where: { email: userId } });
  const notFound = {
    success: false,
    message: 'not found'
  };

  if (findUser) {
    const idUserOne = res.locals.decode.id;
    const idUserTwo = findUser.dataValues.id;
    const findRoomContent = await ChatRoom.findAll({
      where: { 'userOneId': [idUserOne, idUserTwo], 'userTwoId': [idUserOne, idUserTwo] },
    });
    if (findRoomContent) {
      const getRoomId = findRoomContent.map(index => {
        const contentMessage = index.dataValues.id;
        return contentMessage;
      });
      const getContent = findRoomContent.map(index => {
        const roomId = index.dataValues.userOneId;
        return roomId;
      });
      if (getContent && getRoomId) {
        console.log('masuk ini')
        const findChatConversation = ChatContent.findAll({
          where: { 'chatRoomId': getRoomId, 'userId': getContent },
          order: [['createdAt', 'DESC']]
        });
        return Promise.resolve(findChatConversation);
      }
      return Promise.reject(notFound);
    }
    return Promise.reject(notFound);
  }
  return Promise.reject(notFound);
};

export const getLastMessage = async (req, res) => {
  const idUser = res.locals.decode.id;
  const findChatRoom = await ChatRoom.findAll({
    where: {
      $or: [
        {
          userOneId: idUser,
        },
        {
          userTwoId: idUser
        }
      ]
    }
  });
  return Promise.resolve(findChatRoom);
  // if (findChatRoom) {
  //   const idChatRoom = findChatRoom.map(idx => {
  //     return idx.dataValues.id;
  //   });
  //   const findChatContent = await ChatContent.findAll({
  //     where: { 'chatRoomId': idChatRoom },
  //     order: [['createdAt', 'DESC']]
  //   });
  //   if (findChatContent) {
  //     return Promise.resolve(findChatContent)
  // const findChatRoom = await ChatRoom.findOne({ where: { id: findChatConten.chatRoomId } });
  // if (findChatRoom) {
  //   const findUser = await User.findOne({ where: { id: findChatRoom.userTwoId } });
  //   return Promise.resolve(findUser)
  // return Promise.resolve({
  //   success: true,
  //   message: {
  //     with: findUser.email,
  //     lastMessage: findChatConten.content
  //   }
  // });
  // }
  //   }
  // }
  return Promise.reject();
};
