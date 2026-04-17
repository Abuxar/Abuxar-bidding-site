const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' }); // Make sure we hit the server .env

const connectDB = require('../config/db');
const User = require('../models/userModel');
const Auction = require('../models/auctionModel');

const seed = async () => {
  try {
    await connectDB();
    
    // Clear old data for clean test
    await User.deleteMany();
    await Auction.deleteMany();
    
    const seller = await User.create({
      username: 'LuxSeller',
      email: 'seller@prestige.com',
      password: 'password123',
      role: 'Seller',
      isVerified: true
    });
    
    await Auction.create({
      sellerId: seller._id,
      title: 'Patek Philippe Nautilus 5711',
      description: 'An immaculate stainless steel luxury sports watch with an iconic blue dial. A true piece of history.',
      startingPrice: 125000,
      currentPrice: 125000,
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 Day
      images: ['https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'],
      status: 'Active'
    });

    console.log('Seeded Masterpiece Auction Successfully');
    process.exit();
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
};
seed();
