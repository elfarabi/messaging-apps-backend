import { User, ChatRoom, ChatContent } from '../model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async ({ email, name, password }) => {
  const bcryptPassword = bcrypt.hashSync(password, 10);
  const createUser = await User.create({ email, name, password: bcryptPassword })
  const errResult = {
    success: true,
    message: 'failed create account'
  }

  if (createUser) {
    const result = {
      success: true,
      message: 'Success create account'
    };
    return Promise.resolve(result);
  }
  return Promise.reject(errResult)
};

export const loginUser = async ({ email, password }) => {
  const findUser = await User.findOne({ where: { email }});
  const loginFail = {
    success: false,
    message: 'email or password is not correct'
  }

  if (findUser) {
    const valid = bcrypt.compareSync(password, findUser.password);
    if (valid) {
      const payload = {
        id: findUser.id
      }
      const result = {
        success: true,
        token: jwt.sign(payload, 'secretjwt', { expiresIn: '30d' })
      }
      return Promise.resolve(result)
    }
    return Promise.reject(loginFail);
  }
  return Promise.reject(loginFail);
};
