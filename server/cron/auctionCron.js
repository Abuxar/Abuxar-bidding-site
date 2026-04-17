const cron = require('node-cron');
const Auction = require('../models/auctionModel');
const User = require('../models/userModel');
const emailQueue = require('../queues/emailQueue');

const initCron = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      
      const expiredAuctions = await Auction.find({
        status: 'Active',
        endTime: { $lt: now }
      });

      for (const auction of expiredAuctions) {
        auction.status = 'Ended';
        await auction.save();

        if (auction.topBidderId) {
          const winner = await User.findById(auction.topBidderId);
          if (winner) {
            emailQueue.add({
              type: 'auction_won',
              email: winner.email,
              data: {
                auctionTitle: auction.title,
                finalPrice: auction.currentPrice
              }
            });
          }
        }
      }

    } catch (error) {
      console.error('Cron Error:', error);
    }
  });
};

module.exports = initCron;
