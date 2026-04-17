const express = require('express');
const router = express.Router();
const { createAuction, getAuctions, placeBid } = require('../controllers/auctionController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAuctions)
  .post(protect, authorize('Seller', 'Admin'), createAuction);

router.post('/:id/bid', protect, placeBid);

module.exports = router;
