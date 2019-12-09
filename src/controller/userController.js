import * as UserService from '../service/userService';

export const signup = (req, res) => {
  UserService.createUser(req.body)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({
      status: false,
      message: err.message
    }));
};

export const login = (req, res) => {
  UserService.loginUser(req.body)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json({
      status: false,
      message: err.message
    }));
};
