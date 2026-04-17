const cron = require('node-cron');
const Auction = require('../models/auctionModel');

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
      }

    } catch (error) {
      console.error('Cron Error:', error);
    }
  });
};

module.exports = initCron;
