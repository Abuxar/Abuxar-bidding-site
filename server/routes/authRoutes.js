const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { registerUser, loginUser, logoutUser, refreshToken, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 20, 
  message: 'Too many requests from this IP, please try again later'
});

router.post('/register', authLimiter, registerUser);
router.post('/login', authLimiter, loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);
router.get('/profile', protect, getProfile);

const upload = require('../middleware/uploadMiddleware');
const cloudinary = require('../utils/cloudinary');
router.post('/avatar', protect, upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    req.user.avatarUrl = result.secure_url;
    await req.user.save();
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
