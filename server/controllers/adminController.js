const User = require('../models/userModel');
const Auction = require('../models/auctionModel');
const Bid = require('../models/bidModel');

const approveAuction = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    
    auction.status = 'Scheduled'; 
    await auction.save();
    res.json({ message: 'Auction approved', auction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUserBan = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Revoke verification status to simulate ban (as Banned is not in our schema enum currently)
    user.isVerified = !user.isVerified; 
    await user.save();
    
    res.json({ message: `User ${user.username} verification status toggled to ${user.isVerified}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const totalAuctions = await Auction.countDocuments();
    const activeAuctions = await Auction.countDocuments({ status: 'Active' });
    const totalUsers = await User.countDocuments();
    const totalBids = await Bid.countDocuments();

    res.json({ totalAuctions, activeAuctions, totalUsers, totalBids });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { approveAuction, handleUserBan, getAnalytics };
