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
};

export const getMessage = (req, res) => {
  chatService.getConversation(req.body, res)
    .then(result => res.status(200).json(result))
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};

export const getLastMessage = (req, res) => {
  chatService.lastMessage(req, res)
    .then(result => res.status(200).json(result))
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};

export const getUnreadMessage = (req, res) => {
  chatService.unreadMessage(req, res)
    .then(result => res.status(200).json(result))
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
};
