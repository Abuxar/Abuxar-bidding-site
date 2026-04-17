import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import useSocketStore from '../store/useSocketStore';
import CountdownTimer from '../components/CountdownTimer';
import toast from 'react-hot-toast';

const AuctionDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { socket } = useSocketStore();
  const [bidAmount, setBidAmount] = useState('');
  
  const { user, isAuthenticated } = useAuthStore();
  const [isEnded, setIsEnded] = useState(false);

  const { data: auction, isLoading } = useQuery({
    queryKey: ['auction', id],
    queryFn: async () => {
      const { data } = await api.get('/auctions');
      return data.find(a => a._id === id);
    }
  });

  useEffect(() => {
    if (socket && auction) {
      socket.emit('joinAuction', { auctionId: id });
      
      socket.on('auctionUpdated', (newData) => {
        queryClient.setQueryData(['auction', id], (old) => {
          if (!old) return old;
          return { ...old, currentPrice: newData.currentPrice, endTime: newData.endTime };
        });
        toast.success(`New bid placed: $${newData.currentPrice}`);
      });

      return () => {
        socket.emit('leaveAuction', { auctionId: id });
        socket.off('auctionUpdated');
      };
    }
  }, [socket, id, auction, queryClient]);

  const bidMutation = useMutation({
    mutationFn: async (amount) => {
      const res = await api.post(`/auctions/${id}/bid`, { amount: Number(amount) });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Bid placed successfully!');
      setBidAmount('');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Bid failed');
    }
  });

  if (isLoading || !auction) return <div className="text-center pt-20 text-brand-primary tracking-widest font-serif text-2xl animate-pulse">Loading Source...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pt-12">
      <div className="glass-card rounded-sm overflow-hidden p-10 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 bg-brand-brown rounded-sm h-96 lg:h-[500px] xl:h-[600px] relative overflow-hidden flex items-center justify-center flex-shrink-0">
          {auction.images && auction.images.length > 0 ? (
             <img src={auction.images[0]} alt="Lot" className="w-full h-full object-cover border border-brand-primary/20 opacity-80 hover:opacity-100 transition-opacity" />
          ) : (
            <span className="font-serif text-3xl tracking-[0.3em] text-brand-primary/20">NO IMAGE</span>
          )}
        </div>
        <div className="md:w-1/2 flex flex-col justify-center space-y-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-brand-accent tracking-wide mb-4">
              {auction.title}
            </h1>
            <p className="text-brand-accent/60 leading-relaxed font-light">
              {auction.description}
            </p>
          </div>
          
          <div className="p-6 rounded-sm bg-brand-dark/50 border border-brand-primary/20 flex flex-col items-center shadow-inner">
            <span className="text-xs text-brand-primary uppercase tracking-[0.3em] font-semibold mb-3">Time Remaining</span>
            <CountdownTimer endTime={auction.endTime} onEnd={() => setIsEnded(true)} />
          </div>

          <div className="flex justify-between items-end border-b border-brand-primary/20 pb-6">
            <div>
              <p className="text-xs text-brand-accent/50 uppercase tracking-[0.2em] mb-2">Current Bid</p>
              <p className="text-4xl font-serif text-brand-primary">${auction.currentPrice.toLocaleString()}</p>
            </div>
            <span className="text-xs text-brand-danger uppercase tracking-widest font-bold animate-pulse">Live</span>
          </div>

          <div className="flex flex-col space-y-4 pt-4">
             {isEnded ? (
               <div className="p-4 bg-brand-danger/20 border border-brand-danger text-brand-danger text-center tracking-widest uppercase font-bold rounded-sm">
                 Auction Concluded
               </div>
             ) : isAuthenticated ? (
               <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <input 
                      type="number" 
                      className="input-field flex-grow text-xl" 
                      placeholder={`Min bid: $${auction.currentPrice + 1}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      disabled={bidMutation.isPending}
                    />
                    <button 
                      className="btn-primary flex-shrink-0 px-8"
                      onClick={() => bidMutation.mutate(bidAmount)}
                      disabled={bidMutation.isPending || !bidAmount}
                    >
                      {bidMutation.isPending ? 'Placing...' : 'Place Bid'}
                    </button>
                 </div>
               </div>
             ) : (
               <a href="/auth" className="btn-primary text-center">
                 Sign in to Place Bid
               </a>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
