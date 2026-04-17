const User = require('../models/userModel');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'Please provide all required fields' });

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ username, email, password });
    if (user) {
      res.status(201).json({ message: 'User registered successfully', userId: user._id });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const accessToken = generateAccessToken(user._id, user.role);
      generateRefreshToken(res, user._id);
      
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const refreshToken = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ message: 'Not authorized, no refresh token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret');
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const newAccessToken = generateAccessToken(user._id, user.role);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, refresh token failed' });
  }
};

const getProfile = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, loginUser, logoutUser, refreshToken, getProfile };
