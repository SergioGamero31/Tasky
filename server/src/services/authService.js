const jwtUtils = require('../utils/jwtUtils');
const User = require('../models/user');
const bcrypt = require('bcrypt');

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function createUser(email, userName, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, userName, password: hashedPassword });
  return await newUser.save();
}

async function authenticateUser(email, password) {
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
}

function generateAccessToken(userId) {
  const accessToken = jwtUtils.generateAccessToken(userId);
  return accessToken;
}

function generateRefreshToken(userId) {
  const refreshToken = jwtUtils.generateRefreshToken(userId);
  return refreshToken;
}

function verifyRefreshToken(token) {
  return jwtUtils.verifyRefreshToken(token);
}

module.exports = {
  getUserByEmail,
  createUser,
  authenticateUser,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
};
