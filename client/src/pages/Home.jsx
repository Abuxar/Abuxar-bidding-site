import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const fetchAuctions = async () => {
  const { data } = await api.get('/auctions');
  return data;
};

const Home = () => {
  const { data: auctions, isLoading, error } = useQuery({
    queryKey: ['auctions'],
    queryFn: fetchAuctions
  });
  
  const navigate = useNavigate();

  if (isLoading) return <div className="text-center text-brand-primary py-20 font-serif text-2xl tracking-widest animate-pulse">Gathering Collection...</div>;
  if (error) return <div className="text-center text-brand-danger py-20 font-serif">Failed to load curated active lots.</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-12 pb-16"
    >
      <header className="text-center space-y-6 pt-16 pb-12">
        <h1 className="text-5xl md:text-6xl font-serif tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary drop-shadow-sm">
          EXQUISITE AUCTIONS
        </h1>
        <p className="text-lg md:text-xl text-brand-accent/70 max-w-2xl mx-auto font-light tracking-wide">
          Curated masterpieces. Exceptional heritage. Unrivaled prestige.
        </p>
      </header>
      
      {auctions?.length === 0 ? (
         <p className="text-center text-brand-accent/50 italic font-serif">The vault is currently empty. Please return later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {auctions.map((auction) => (
            <div key={auction._id} onClick={() => navigate(`/auction/${auction._id}`)} className="glass-card flex flex-col rounded-sm overflow-hidden group cursor-pointer transition-all duration-700 transform hover:-translate-y-2">
              <div className="h-80 sm:h-96 bg-brand-brown relative overflow-hidden flex items-center justify-center flex-shrink-0">
                {auction.images && auction.images.length > 0 ? (
                  <img src={auction.images[0]} alt={auction.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 origin-center opacity-80" />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-brown to-brand-dark opacity-100 group-hover:scale-110 transition-transform duration-1000 origin-center"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 to-transparent z-10"></div>
                <span className="absolute z-20 font-serif text-3xl text-brand-primary/80 tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-xl drop-shadow-2xl">VIEW</span>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between relative z-20 space-y-6">
                <h3 className="text-2xl font-serif text-brand-accent group-hover:text-brand-primary transition-colors duration-500 leading-snug">{auction.title}</h3>
                <div className="flex justify-between items-end border-t border-brand-primary/20 pt-5 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-brand-accent/50 text-xs tracking-[0.2em] uppercase mb-1">Current Bid</span>
                    <span className="text-brand-primary font-medium text-2xl tracking-wide">${auction.currentPrice.toLocaleString()}</span>
                  </div>
                  <span className="text-brand-danger text-xs uppercase tracking-[0.2em] font-semibold animate-pulse">Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Home;
