const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  let token = req.get('Authorization') || req.query.token;
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        console.log('JWT verification error:', err);
        res.status(401).json({ error: 'Invalid token' });
        // Stops processing here.
      } else {
        console.log('Decoded JWT:', decoded);
        req.user = decoded.user;
        req.exp = new Date(decoded.exp * 1000);
        return next();
      }
    });
  } else {
    console.log('No token provided.');
    req.user = null;
    return next();
  }
};
