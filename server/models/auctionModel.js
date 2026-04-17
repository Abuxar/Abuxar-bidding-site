const mongoose = require('mongoose');

const auctionSchema = mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    startingPrice: {
      type: Number,
      required: true,
    },
    reservePrice: {
      type: Number,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    topBidderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['Draft', 'Scheduled', 'Active', 'Ended'],
      default: 'Active',
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
