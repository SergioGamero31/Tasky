const jwt = require('jsonwebtoken');
require('dotenv').config();

//Secret key
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

function generateAccessToken(userId) {
  const accessToken = jwt.sign({ userId }, accessSecret, {
    expiresIn: '1d'
  });
  return accessToken;
}

function generateRefreshToken(userId) {
  const refreshToken = jwt.sign({ userId }, refreshSecret, {
    expiresIn: '7d'
  });
  return refreshToken;
}

function verifyAccessToken(token, callback) {
  jwt.verify(token, accessSecret, (err, decoded) => {
    if (err) return callback(err, null);
    return callback(null, decoded.userId);
  });
}

function verifyRefreshToken(token) {
  jwt.verify(token, refreshSecret, (err, decoded) => {
    if (err) return callback(err, null);
    return callback(null, decoded.userId);
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
