const jwt = require('jsonwebtoken');

const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '15m',
  });
};

const generateRefreshToken = (res, id) => {
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret', {
    expiresIn: '7d',
  });

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
