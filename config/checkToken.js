const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  console.log('Received token:', token); // Add logging statement

  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      console.log('Error:', err); // Add logging statement
      console.log('Received token:', token);
      console.log('Decoded:', decoded); // Add logging statement

      req.user = err ? null : decoded.user;
      req.exp = err ? null : new Date(decoded.exp * 1000);
      return next();
    });
  } else {
    req.user = null;
    return next();
  }
};
