const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' }); 

const connectDB = require('../config/db');
const User = require('../models/userModel');
const Auction = require('../models/auctionModel');

const seed = async () => {
  try {
    await connectDB();
    
    await User.deleteMany();
    await Auction.deleteMany();
    
    const seller = await User.create({
      username: 'PrestigeAcquisitions',
      email: 'seller@prestige.com',
      password: 'password123',
      role: 'Seller',
      isVerified: true
    });

    const items = [
      {
        sellerId: seller._id,
        title: 'Patek Philippe Nautilus 5711',
        description: 'An immaculate stainless steel luxury sports watch with an iconic blue gradient dial. Originally released in 1976 and discontinued, it represents a true pinnacle of modern haute horlogerie.',
        startingPrice: 125000,
        currentPrice: 125000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 48),
        images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=1000'],
        status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Hermès Himalayan Crocodile Birkin 35',
        description: 'An exceptionally rare Nilo crocodile skin handbag, featuring 18k white gold hardware embellished with diamonds. Often considered the holy grail of fashion collections globally.',
        startingPrice: 350000,
        currentPrice: 380000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 72), 
        images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=1000'],
        status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Aston Martin DB5 - Silver Birch',
        description: 'A meticulously restored 1964 Aston Martin DB5, finished in iconic Silver Birch over black Connolly leather. The ultimate expression of gentlemanly grand touring.',
        startingPrice: 1850000,
        currentPrice: 2100000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 120), 
        images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1000'],
        status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'The Macallan 1926 Fine & Rare',
        description: 'A 60-year-old single malt, bottled from cask number 263. This is universally recognized as the pinnacle of single malt Scotch whisky collection and investment.',
        startingPrice: 1500000,
        currentPrice: 1500000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
        images: ['https://images.unsplash.com/photo-1569529465841-dfecdab75e3a?auto=format&fit=crop&q=80&w=1000'],
        status: 'Active'
      },
      {
        sellerId: seller._id,
        title: '7.02 Carat Flawless Diamond Ring',
        description: 'An astounding internally flawless, D-color diamond set in an elegant platinum band. A testament to pure perfection and exquisite craftsmanship.',
        startingPrice: 850000,
        currentPrice: 850000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 96),
        images: ['https://images.unsplash.com/photo-1605100804763-247f66126e28?auto=format&fit=crop&q=80&w=1000'],
        status: 'Active'
      },
      {
        sellerId: seller._id,
        title: '19th Century Renaissance Masterpiece',
        description: 'An authenticated, un-restored masterpiece painting from the late renaissance era. Obtained from a private European family vault.',
        startingPrice: 4200000,
        currentPrice: 4350000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 200),
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1000'],
        status: 'Active'
      }
    ];

    await Auction.insertMany(items);

    console.log('Seeded Elite Masterpiece Collection Successfully');
    process.exit();
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
};
seed();
