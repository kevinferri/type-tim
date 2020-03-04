const jwt = require('jsonwebtoken');
const Config = require('./lib/Config');

exports.isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ status: 403 });
  }

  return next();
};

exports.isValidJwt = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).json({ error: 'No JWT was provided.' });
  }

  const splitted = authorization.split(' ');
  const type = splitted[0].toLowerCase();
  const token = splitted[1];

  if (type !== 'jwt') {
    return res.status(403).json({
      error:
        'Invalid format for Authorization header. Must be in the format of jwt <token>.',
    });
  }

  try {
    jwt.verify(token, Config.get('JWT_USER_SECRET'));
  } catch (err) {
    return res.status(403).json({ error: 'Invalid JWT.' });
  }

  return next();
};
