const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Config = require('../lib/Config');

const userSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  googleToken: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

userSchema.methods.generateJwt = () => {
  return jwt.sign({ payload: this }, Config.get('JWT_USER_SECRET'));
};

userSchema.statics.getUserFromJwt = token => {
  return jwt.verify(token, Config.get('JWT_USER_SECRET'));
};

module.exports = mongoose.model('User', userSchema);
