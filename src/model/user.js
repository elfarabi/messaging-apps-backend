import 'sequelize';
import { Sequelize } from 'sequelize';
import ChatRoom from './chatRoom';
import ChatContent from './chatContent';
import { sequelize } from '../db';


const Model = Sequelize.Model;

class User extends Model {}
User.init({
    email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true }},
    password: { type: Sequelize.TEXT, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
}, { sequelize, modelName: 'user'});

User.hasMany(ChatRoom, { as: 'chatRoomsOne', foreignKey: 'userOneId' });
User.hasMany(ChatRoom, { as: 'chatRoomsTwo', foreignKey: 'userTwoId' });
User.hasMany(ChatContent, { as: 'chatContents', foreignKey: 'userId' });

export { User as default };
