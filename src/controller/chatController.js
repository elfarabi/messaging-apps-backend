import * as chatService from '../service/chatService';

export const sendMessage = (req, res) => {
  chatService.sendMessage(req.body, res)
    .then(result => res.status(200).json(result))
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
  // const { userId, message } = req.body;
  // User.findOne({ where: { email: userId } })
  //   .then(data => {
  //     if (!data) {
  //       return res.status(400).json({
  //         success: false,
  //         message: 'user not found'
  //       });
  //     } else {
  //       const idUserOne = res.locals.decode.id;
  //       const idUserTwo = data.dataValues.id;
  //       ChatRoom.findAll({
  //         where: { 'userOneId': [idUserOne, idUserTwo], 'userTwoId': [idUserOne, idUserTwo] }
  //       })
  //         .then(datas => {
  //           if (datas.length <= 0) {
  //             console.log('belom ada chat room');
  //             /* Create  new chat room */
  //             // ChatRoom.create({
  //             //   userOneId: idUserOne,
  //             //   userTwoId: idUserTwo
  //             // });

  //             return res.status(200).json({
  //               success: true,
  //               message: `success send message to ${data.dataValues.email}`
  //             });
  //           } else {
  //             console.log('sudah ada chat room');
  //             /* Create new chat content */
  //             // ChatContent.create({
  //             //   content: message,
  //             //   // chatRoomId: ,
  //             //   userId: idUserOne
  //             // });
  //             return res.status(200).json({
  //               success: true,
  //               message: `your message success send message to ${data.dataValues.email}`
  //             });
  //           }
  //         })
  //         .catch(err => {
  //           res.status(200).json({
  //             status: false,
  //             message: err.message
  //           });
  //         });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(200).json({
  //       status: false,
  //       message: err.message
  //     });
  //   });
};

export const getMessage = (req, res) => {
  chatService.getConversation(req.body, res)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json(err));
  // const { userId } = req.body;

  // User.findOne({ where: { email: userId } })
  //   .then(datas => {
  //     const idUserOne = res.locals.decode.id;
  //     const idUserTwo = datas.dataValues.id;
  //     ChatRoom.findAll({
  //       where: { 'userOneId': [idUserOne, idUserTwo], 'userTwoId': [idUserOne, idUserTwo] }
  //     })
  //       .then(data => {
  //         console.log('data', data);
  // ChatContent.findAll({
  //   where: { 'chatRoomId': data.dataValues.id}
  // })
  // .then(doc => {
  //   console.log('docs', doc)
  //   console.log('content', doc.dataValues.content);
  // })
  //     });
  // })
};

export const getLastMessage = (req, res) => {
  chatService.getLastMessage(req, res)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json(err));
};
