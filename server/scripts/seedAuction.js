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

    const admin = await User.create({
      username: 'SystemArchitect',
      email: 'admin@prestige.com',
      password: 'adminpassword',
      role: 'Admin',
      isVerified: true
    });

    const items = [
      {
        sellerId: seller._id,
        title: 'Patek Philippe Nautilus 5711',
        description: 'An immaculate stainless steel luxury sports watch with an iconic blue gradient dial.',
        startingPrice: 125000, currentPrice: 125000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 48),
        images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Hermès Crocodile Birkin 35',
        description: 'An exceptionally rare Nilo crocodile skin handbag, featuring 18k white gold hardware.',
        startingPrice: 350000, currentPrice: 380000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 72), 
        images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Aston Martin DB5 - Silver Birch',
        description: 'A meticulously restored 1964 Aston Martin DB5, finished in iconic Silver Birch.',
        startingPrice: 1850000, currentPrice: 2100000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 120), 
        images: ['https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Custom Superyacht 120ft',
        description: 'A fully custom built trideck superyacht delivered this year. The epitome of sea luxury.',
        startingPrice: 25000000, currentPrice: 25000000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 500),
        images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Rolex Submariner Hulk',
        description: 'The legendary discontinued green dial Submariner. A massive collector favorite.',
        startingPrice: 22000, currentPrice: 28500,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Ferrari Enzo 2003',
        description: 'One of only 400 ever built. Finished in Rosso Corsa over black leather.',
        startingPrice: 3100000, currentPrice: 3250000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 96),
        images: ['https://images.unsplash.com/photo-1583121280346-0819bf3a287a?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: '19th Century Fine Art',
        description: 'An authenticated Renaissance masterpiece previously stored in a private European vault.',
        startingPrice: 4200000, currentPrice: 4350000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 200),
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Gulfstream G650 Private Jet',
        description: 'A practically brand new Gulfstream G650 with VIP configuration. Ultra long-range.',
        startingPrice: 45000000, currentPrice: 45000000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 600),
        images: ['https://images.unsplash.com/photo-1540962351-8b019b846e4c?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Cartier Diamond Set',
        description: 'A bespoke diamond necklace set featuring over 20 carats of VVS1 diamonds.',
        startingPrice: 650000, currentPrice: 720000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 36),
        images: ['https://images.unsplash.com/photo-1599643478524-cb04b200c04d?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Steinway & Sons Grand Piano',
        description: 'A 1901 Model D Concert Grand Piano in exceptional condition, fully original.',
        startingPrice: 120000, currentPrice: 145000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 18),
        images: ['https://images.unsplash.com/photo-1550976527-be151ae2e03b?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Beverly Hills Estate',
        description: 'A 12,000 sq ft modern architectural masterpiece overlooking the Pacific Ocean.',
        startingPrice: 15000000, currentPrice: 18500000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 144),
        images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'The Macallan 50-Year',
        description: 'A highly sought after 50-Year single malt Scotch. Bottled and sealed.',
        startingPrice: 85000, currentPrice: 90000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 48),
        images: ['https://images.unsplash.com/photo-1569529465841-dfecdab75e3a?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: '1kg Swiss Gold Bullion',
        description: 'A certified 1 kilogram solid gold bullion cast by Credit Suisse.',
        startingPrice: 65000, currentPrice: 65000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 12),
        images: ['https://images.unsplash.com/photo-1611082539073-be9acbdca533?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: '17th Century Persian Silk Rug',
        description: 'An immaculate, hand-knotted silk rug hailing from the royal courts of Persia.',
        startingPrice: 180000, currentPrice: 200000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 80),
        images: ['https://images.unsplash.com/photo-1589574400262-e66b4f73b64c?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      },
      {
        sellerId: seller._id,
        title: 'Roman Marble Sculpture',
        description: 'An authentic marble bust from the Roman Empire around 2nd Century AD. Fully papered.',
        startingPrice: 350000, currentPrice: 350000,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 200),
        images: ['https://images.unsplash.com/photo-1545987796-2009ce4a0b27?q=80&w=1080&auto=format&fit=crop'], status: 'Active'
      }
    ];

    await Auction.insertMany(items);

    console.log('Seeded Masterpiece Collection Successfully');
    process.exit();
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
};
seed();
