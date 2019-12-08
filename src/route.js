import express from 'express';
import isAuthenticated from './helper/auth';
import * as userController from './controller/userController';
import * as chatController from './controller/chatController';

const router = express.Router();

router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);

router.post('/chat/send', isAuthenticated, chatController.sendMessage);
router.get('/chat/get', isAuthenticated, chatController.getMessage);
router.get('/chat/last', isAuthenticated, chatController.getLastMessage);

module.exports = router;
