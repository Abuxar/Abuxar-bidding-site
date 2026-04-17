import { useQuery } from '@tanstack/react-query';
import api from '../api';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'Admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['adminAnalytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics');
      return res.data;
    },
    enabled: isAuthenticated && user?.role === 'Admin',
  });

  if (isLoading || !analytics) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-brand-primary animate-pulse tracking-widest uppercase">Initializing Command Center...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pt-6">
      <div className="border-b border-brand-primary/20 pb-6 mb-8 text-center md:text-left">
        <h1 className="text-4xl font-serif text-brand-primary tracking-widest uppercase shadow-md drop-shadow-xl inline-block -skew-x-3 pr-2">Prestige Command Center</h1>
        <p className="text-brand-accent/70 mt-2 tracking-widest uppercase text-sm">System Administration Protocol</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-8 flex flex-col justify-center items-center text-center space-y-2 border-t-2 border-t-brand-primary/50">
           <span className="text-brand-accent/50 uppercase tracking-[0.2em] text-xs font-bold">Total Operations</span>
           <span className="text-5xl font-serif text-brand-primary drop-shadow-lg">{analytics.totalAuctions}</span>
        </div>
        <div className="glass-card p-8 flex flex-col justify-center items-center text-center space-y-2 border-t-2 border-t-brand-primary/50">
           <span className="text-brand-accent/50 uppercase tracking-[0.2em] text-xs font-bold">Active Markets</span>
           <span className="text-5xl font-serif text-brand-accent drop-shadow-lg">{analytics.activeAuctions}</span>
        </div>
        <div className="glass-card p-8 flex flex-col justify-center items-center text-center space-y-2 border-t-2 border-t-brand-primary/50">
           <span className="text-brand-accent/50 uppercase tracking-[0.2em] text-xs font-bold">Verified Clients</span>
           <span className="text-5xl font-serif text-brand-primary drop-shadow-lg">{analytics.totalUsers}</span>
        </div>
        <div className="glass-card p-8 flex flex-col justify-center items-center text-center space-y-2 border-t-2 border-t-brand-primary/50">
           <span className="text-brand-accent/50 uppercase tracking-[0.2em] text-xs font-bold">Global Bids</span>
           <span className="text-5xl font-serif text-brand-accent drop-shadow-lg">{analytics.totalBids}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass-card p-8">
            <h2 className="text-xl font-serif font-semibold text-brand-primary uppercase tracking-widest border-b border-brand-primary/10 pb-4 mb-6">Master Controls</h2>
            <div className="space-y-4">
                <p className="text-sm text-brand-accent/70">As the system architect, you possess absolute authority over the auction market and user verification states. Use the master routes to inject bans or approve pending scheduled events manually via terminal.</p>
                <div className="p-4 bg-brand-brown rounded-sm font-mono text-brand-primary/80 text-xs mt-4">
                   ~ PUT /api/v1/admin/user/:id/ban <br/>
                   ~ PUT /api/v1/admin/auction/:id/approve
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
