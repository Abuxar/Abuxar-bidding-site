const Auction = require('../models/auctionModel');
const Bid = require('../models/bidModel');
const emailQueue = require('../queues/emailQueue');
const User = require('../models/userModel');

const createAuction = async (req, res) => {
  try {
    const { title, description, startingPrice, reservePrice, endTime, images } = req.body;
    
    const auction = await Auction.create({
      sellerId: req.user._id,
      title,
      description,
      startingPrice,
      currentPrice: startingPrice,
      reservePrice,
      endTime,
      images: images || [],
    });

    res.status(201).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find({ status: 'Active' });
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const placeBid = async (req, res) => {
  const { amount } = req.body;
  const auctionId = req.params.id;
  const bidderId = req.user._id;

  try {
    const auction = await Auction.findById(auctionId);
    
    if (!auction) return res.status(404).json({ message: 'Auction not found' });
    if (auction.status !== 'Active') return res.status(400).json({ message: 'Auction is not active' });
    if (new Date(auction.endTime) < new Date()) return res.status(400).json({ message: 'Auction has ended' });

    if (amount <= auction.currentPrice) {
      return res.status(400).json({ message: 'Bid must be higher than current price' });
    }

    const timeRemaining = new Date(auction.endTime).getTime() - new Date().getTime();
    let newEndTime = auction.endTime;

    // Anti-snipe: extend by 2 mins if bid placed in last 60s
    if (timeRemaining < 60 * 1000) {
      newEndTime = new Date(new Date().getTime() + 2 * 60 * 1000);
    }

    const previousTopBidder = auction.topBidderId;

    const updatedAuction = await Auction.findOneAndUpdate(
      { _id: auctionId, currentPrice: { $lt: amount }, status: 'Active' },
      { 
        $set: { 
          currentPrice: amount, 
          topBidderId: bidderId,
          endTime: newEndTime 
        } 
      },
      { new: true }
    );

    if (!updatedAuction) {
      return res.status(400).json({ message: 'Bid failed. Someone might have placed a higher bid right before you.' });
    }

    const bid = await Bid.create({ auctionId, bidderId, amount });

    const io = req.app.get('io');
    if (io) {
      io.to(auctionId).emit('auctionUpdated', {
        auctionId,
        currentPrice: updatedAuction.currentPrice,
        topBidderId: updatedAuction.topBidderId,
        endTime: updatedAuction.endTime
      });
    }

    if (previousTopBidder && previousTopBidder.toString() !== bidderId.toString()) {
      const prevUser = await User.findById(previousTopBidder);
      if (prevUser) {
        emailQueue.add({
          type: 'outbid',
          email: prevUser.email,
          data: {
            auctionTitle: updatedAuction.title,
            newPrice: updatedAuction.currentPrice,
          }
        });
      }
    }

    res.status(201).json(bid);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAuction, getAuctions, placeBid };
