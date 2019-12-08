import 'sequelize';
import { Sequelize } from 'sequelize';
// import { User } from '.';
import { sequelize } from '../db';
import User from './user';
import ChatContent from './chatContent';

const Model = Sequelize.Model;

class ChatRoom extends Model { }
ChatRoom.init({
}, { sequelize, modelName: 'chat_room'});

ChatRoom.hasMany(ChatContent, { as: 'chatContents', foreignKey: 'chatRoomId'});

export default ChatRoom;
