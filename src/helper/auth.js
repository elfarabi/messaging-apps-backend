import jwt from 'jsonwebtoken';

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, 'secretjwt', (err, decode) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: 'not verify'
        });
      } else {
        res.locals.decode = decode;
        next();
      }
    });
  }
  else {
    res.status(400).json({
      success: false,
      message: 'No token provided'
    });
  }
};

export default isAuthenticated;