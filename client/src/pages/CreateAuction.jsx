import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import api from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateAuction = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || (user?.role !== 'Seller' && user?.role !== 'Admin')) {
       navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // We expect a single URL string for Images in this simple implementation,
    // translating it to the array format required by the backend API.
    const payload = {
       title: formData.get('title'),
       description: formData.get('description'),
       startingPrice: Number(formData.get('startingPrice')),
       reservePrice: Number(formData.get('reservePrice')) || 0,
       endTime: formData.get('endTime'),
       images: [formData.get('image')]
    };

    try {
      setIsSubmitting(true);
      const res = await api.post('/auctions', payload);
      toast.success('Market Listing Established Successfully');
      navigate(`/auction/${res.data._id}`);
    } catch (error) {
       toast.error(error.response?.data?.message || 'Failed to establish listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pt-12">
      <div className="text-center md:text-left border-b border-brand-primary/20 pb-4">
        <h1 className="text-3xl font-serif text-brand-primary tracking-widest uppercase shadow-md drop-shadow-xl inline-block -skew-x-2">Publish Asset</h1>
        <p className="text-brand-accent/70 mt-3 text-xs tracking-widest uppercase">Secure Seller Protocol</p>
      </div>

      <div className="glass-card p-10 mt-6">
        <form onSubmit={handleSubmit} className="space-y-8">
           <div className="space-y-2">
             <label className="text-xs tracking-[0.15em] text-brand-accent/70 uppercase">Asset Designation</label>
             <input required name="title" type="text" className="w-full bg-brand-brown/40 border border-brand-primary/20 p-3 text-brand-primary focus:border-brand-primary focus:outline-none transition-colors border-l-4" placeholder="e.g. 1957 Rolex Submariner" />
           </div>

           <div className="space-y-2">
             <label className="text-xs tracking-[0.15em] text-brand-accent/70 uppercase">Asset Manifest (Description)</label>
             <textarea required name="description" rows="4" className="w-full bg-brand-brown/40 border border-brand-primary/20 p-3 text-brand-primary focus:border-brand-primary focus:outline-none transition-colors resize-none" placeholder="Detail the condition, provenance, and specifications..." />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-xs tracking-[0.15em] text-brand-accent/70 uppercase">Starting Bid ($)</label>
               <input required name="startingPrice" type="number" min="1" className="w-full bg-brand-brown/40 border border-brand-primary/20 p-3 text-brand-primary focus:border-brand-primary focus:outline-none transition-colors" placeholder="e.g. 50000" />
             </div>
             <div className="space-y-2">
               <label className="text-xs tracking-[0.15em] text-brand-accent/70 uppercase">Reserve Price ($)</label>
               <input name="reservePrice" type="number" min="0" className="w-full bg-brand-brown/40 border border-brand-primary/20 p-3 text-brand-primary focus:border-brand-primary focus:outline-none transition-colors" placeholder="Optional minimum threshold" />
             </div>
           </div>

           <div className="space-y-2">
             <label className="text-xs tracking-[0.15em] text-brand-accent/70 uppercase">Secure Media (Image URL)</label>
             <input required name="image" type="url" className="w-full bg-brand-brown/40 border border-brand-primary/20 p-3 text-brand-primary focus:border-brand-primary focus:outline-none transition-colors" placeholder="https://source.unsplash.com/... or secure CDN absolute path" />
           </div>

           <div className="space-y-2">
             <label className="text-xs tracking-[0.15em] text-brand-accent/70 uppercase">Market Expiration Date</label>
             <input required name="endTime" type="datetime-local" className="w-full bg-brand-brown/40 border border-brand-primary/20 p-3 text-brand-primary focus:border-brand-primary focus:outline-none transition-colors" />
           </div>

           <button type="submit" disabled={isSubmitting} className="btn-primary w-full py-4 text-sm tracking-[0.3em] uppercase mt-4">
             {isSubmitting ? 'ENCRYPTING & PUBLISHING...' : 'CONFIRM MARKET INJECTION'}
           </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
