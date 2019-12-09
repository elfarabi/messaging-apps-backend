import 'sequelize';
import { Sequelize } from 'sequelize';
import { sequelize } from '../db';

const Model = Sequelize.Model;

class ChatContent extends Model { }
ChatContent.init({
  content: { type: Sequelize.TEXT },
  isRead: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
}, { sequelize, modelName: 'chat_content'});

export default ChatContent;
