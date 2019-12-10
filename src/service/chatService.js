import { User, ChatRoom, ChatContent } from '../model';

export const sendMessage = async ({ userId, message }, res) => {
  const findUser = await User.findOne({ where: { email: userId } });

  if (findUser) {
    const idUserOne = res.locals.decode.id;
    const idUserTwo = findUser.dataValues.id;
    const findChatRoom = await ChatRoom.findOne({
      where: {
        'userOneId': [idUserOne, idUserTwo],
        'userTwoId': [idUserOne, idUserTwo]
      }
    });

    if (findChatRoom) {
      /* Create Chat Conten if exist Chat Room */
      const createChatContent = await ChatContent.create({
        content: message,
        chatRoomId: findChatRoom.id,
        userId: idUserOne
      });
      return Promise.resolve({
        success: true,
        data: createChatContent
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
        chatRoomId: createChatRoom.id,
        userId: idUserOne
      });
      return Promise.resolve({
        success: true,
        data: createChatContent
      });
    }
    return Promise.reject({message: 'failed to create chat room'});
  }
  return Promise.reject({message: 'user not found'});
};

export const getConversation = async ({ userId }, res) => {
  const findUser = await User.findOne({ where: { email: userId } });

  if (findUser) {
    const idUserOne = res.locals.decode.id;
    const idUserTwo = findUser.dataValues.id;
    const findChatRoom = await ChatRoom.findOne({
      where: { 'userOneId': [idUserOne, idUserTwo], 'userTwoId': [idUserOne, idUserTwo] },
    });

    if (findChatRoom) {
      await ChatContent.update(
        { isRead: true },
        { where: { 'chatRoomId': findChatRoom.id, 'userId': idUserOne } }
      );
      const findChatContent = await ChatContent.findAll({
        where: { 'chatRoomId': findChatRoom.id },
        order: [['createdAt', 'DESC']]
      });
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
  const idUserOne = res.locals.decode.id;

  const findChatRoom = await ChatRoom.findAll({
    where: {
      $or: [
        {
          'userOneId': idUserOne,
        },
        {
          'userTwoId': idUserOne
        }
      ]
    }
  });

  if (findChatRoom) {
    const getIdChatRoom = findChatRoom.map(idx => {
      return idx.dataValues.id;
    });
    
    let query = [];
    const getChatContentOne = await ChatContent.findOne({
      limit: 1,
      where: { 'chatRoomId': getIdChatRoom[0] },
      order: [['createdAt', 'DESC']]
    });
    query.push(getChatContentOne);
    const getChatContentTwo = await ChatContent.findOne({
      limit: 1,
      where: { 'chatRoomId': getIdChatRoom[1] || getIdChatRoom },
      order: [['createdAt', 'DESC']]
    });
    query.push(getChatContentTwo);

    let valueContent = query;
    const idQueryOne = query[0].dataValues.id;
    const idQueryTwo = query[1].dataValues.id;

    const getUnreadOne = await ChatContent.findAll({
      where: { 'chatRoomId': getIdChatRoom[0], 'userId': idUserOne, 'isRead': false }
    });
    const unreadOne = getUnreadOne.length;

    const getUnreadTwo = await ChatContent.findAll({
      where: { 'chatRoomId': getIdChatRoom[1] || getIdChatRoom, 'userId': idUserOne, 'isRead': false }
    });
    const unreadTwo = getUnreadTwo.length;

    if (idQueryOne === idQueryTwo) {
      const id = valueContent[0].id;
      return Promise.resolve({
        success: true,
        unread: unreadOne,
        data: valueContent[0]
      });
    }
    return Promise.resolve({
      success: true,
      unread: unreadOne,
      data: valueContent
    });
  }
  return Promise.reject({ message: 'chat room not found' });
};
