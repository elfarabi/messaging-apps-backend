import { User, ChatRoom, ChatContent } from '../model';
import * as UserService from '../service/userService';

export const signup = (req, res) => {
  UserService.createUser(req.body)
    .then(result => res.status(200).json(result))
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
  // const password = bcrypt.hashSync(req.body.password, 10);
  // User.create({email, name, password})
  //   .then(() => {
  //     return res.status(200).json({
  //       success: true,
  //       message: 'signup is successfully',
  //     });
  //   })
  //   .catch(err => {
  //     return res.status(400).json({
  //       success: false,
  //       message: err.message
  //     });
  //   });
};

export const login = (req, res) => {
  UserService.loginUser(req.body)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json(err));
  // User.findOne({ where: { email: req.body.email } })
  //   .then(userInfo => {
  //     if (!userInfo) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "email is not correct"
  //       });
  //     }
  //     const valid = bcrypt.compareSync(req.body.password, userInfo.password);
  //     if (valid) {
  //       const payload = {
  //         id: userInfo.id
  //       };
  //       const token = jwt.sign(payload, 'secretjwt', { expiresIn: '30d' });
  //       return res.status(200).json({
  //         success: true,
  //         message: "signin successfully",
  //         data: token
  //       });
  //     } else {
  //       res.status(400).json({
  //         success: false,
  //         message: 'password is not correct'
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(400).json({
  //       success: false,
  //       message: err.message
  //     });
  //   });
};

// exports.createUser = (req, res) => {
//   User.sync({ force: true })
//   .then(() => {
//     console.log('this is your ID');
//     return User.create(req.body);
//   })
//   .catch(err => {
//     console.log('failed create tabel', err.message);
//     return err;
//   });
// };

// exports.createChatRoom = (req, res) => {
//   ChatRoom.sync({ force: true })
//   .then(() => {
//     console.log('this is your Chat Room')
//     return ChatRoom.create(req.body)
//   })
//   .catch(err => {
//     console.log('failed create tabel', err.message)
//     return err
//   })
// }

// export const createChatContent = (req, res) => {

//   ChatContent.sync({ force: true })
//     .then(() => {
//       console.log('this is your Chat Room');
//       return ChatContent.create(req.body);
//     })
//     .catch(err => {
//       console.log('failed create tabel', err.message);
//       return err;
//     });
// };
