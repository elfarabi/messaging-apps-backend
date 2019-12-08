import 'sequelize';
import { Sequelize } from 'sequelize';
// import { ChatRoom } from '.';
import { sequelize } from '../db';
import User from './user';
import ChatRoom from './chatRoom';

const Model = Sequelize.Model;

class ChatContent extends Model { }
ChatContent.init({
  content: { type: Sequelize.TEXT }
}, { sequelize, modelName: 'chat_content'});

export default ChatContent;
