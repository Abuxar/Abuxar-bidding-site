const express = require('express');
const router = express.Router();
const { approveAuction, handleUserBan, getAnalytics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect, authorize('Admin'));

router.put('/auction/:id/approve', approveAuction);
router.put('/user/:id/ban', handleUserBan);
router.get('/analytics', getAnalytics);

module.exports = router;
