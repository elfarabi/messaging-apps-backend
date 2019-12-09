import { User, ChatRoom, ChatContent } from '../model';

const findChatRoomInDB = async (idUserOne, idUserTwo) => {
  let find = await ChatRoom.findOne({
    where: { 'userOneId': idUserOne, 'userTwoId': idUserTwo }
  });
  if (find != null) return find;

  return find;
};

export const sendMessage = async ({ userId, message }, res) => {
  const findUser = await User.findOne({ where: { email: userId } });

  if (findUser) {
    const idUserOne = res.locals.decode.id;
    const idUserTwo = findUser.dataValues.id;
    const findChatRoom = await findChatRoomInDB(idUserOne, idUserTwo);

    if (findChatRoom) {
      /* Create Chat Conten if exist Chat Room */
      const createChatContent = await ChatContent.create({
        content: message,
        chatRoomId: findChatRoom.id,
        userId: idUserOne
      });
      return Promise.resolve({
        success: true,
        data: createChatContent,
      });
    }
    /* Create Chat Room if not exists Chat Room */
    const createChatRoom = await ChatRoom.create({
      'userOneId': idUserOne,
      'userTwoId': idUserTwo
    });

    if (createChatRoom) {
      /* Create Chat Content after Create Chat Room */
      const createChatContent = await ChatContent.create({
        content: message,
        chatRoomId,
        userId: idUserOne
      });
      return Promise.resolve({
        success: true,
        message: createChatContent
      });
    }
    return Promise.reject({
      success: false,
      message: 'Cannot Create Chat Room'
    });
  }
  return Promise.reject({
    success: false,
    message: 'user not found'
  });
};

export const getConversation = async ({ userId }, res) => {
  const findUser = await User.findOne({ where: { email: userId } });

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
      const getUserId = findRoomContent.map(index => {
        const roomId = index.dataValues.userOneId;
        return roomId;
      });
      if (getUserId.length > 0 && getRoomId.length > 0) {
        const findChatConversation = ChatContent.findAll({
          where: { 'chatRoomId': getRoomId, 'userId': getUserId },
          order: [['createdAt', 'DESC']]
        });
        return Promise.resolve(findChatConversation);
      }
      return Promise.reject({
        success: false,
        message: 'No Message'
      });
    }
    return Promise.reject({
      success: false,
      message: 'No Message'
    });
  }
  return Promise.reject({
    success: false,
    message: 'User Not Found'
  });
};
