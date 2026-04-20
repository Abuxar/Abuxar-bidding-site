import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import useSocketStore from './store/useSocketStore';
import useAuthStore from './store/useAuthStore';
import api from './api';

import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import AuctionDetail from './pages/AuctionDetail';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import CreateAuction from './pages/CreateAuction';
import TopBar from './components/TopBar';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout error', error);
      // Failsafe logout in case of network issue
      logout();
      navigate('/auth');
    }
  };

  return (
    <nav className="border-b border-brand-primary/10 bg-brand-dark/95 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <a href="/" className="text-2xl font-serif font-semibold tracking-widest text-brand-primary uppercase drop-shadow-md cursor-pointer">
          Prestige<span className="text-brand-accent font-light">Auctions</span>
        </a>
        <div className="space-x-4 md:space-x-8 flex items-center">
          <a href="/" className="text-brand-accent/80 hover:text-brand-primary uppercase tracking-widest text-xs font-semibold transition-colors">Gallery</a>
          {isAuthenticated && (user?.role === 'Seller' || user?.role === 'Admin') && (
             <a href="/create-auction" className="text-brand-primary hover:text-brand-accent uppercase tracking-widest text-xs font-semibold transition-colors border border-brand-primary/30 px-3 py-1 rounded-sm hidden sm:inline-block">
                Publish
             </a>
          )}
          {isAuthenticated && user?.role === 'Admin' && (
             <a href="/admin" className="text-brand-accent/80 hover:text-brand-primary uppercase tracking-widest text-xs font-semibold transition-colors items-center gap-2 hidden lg:flex">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                Command Center
             </a>
          )}
          {isAuthenticated ? (
            <div className="flex items-center space-x-6 border-l border-brand-primary/20 pl-4 md:pl-6 ml-2 md:ml-4">
              <a href="/profile" className="text-brand-primary font-serif tracking-widest text-sm hover:text-brand-accent transition-colors flex items-center gap-3">
                {user?.avatar && <img src={user.avatar} className="w-6 h-6 rounded-full object-cover border border-brand-primary/30 hidden md:block" alt="" />}
                {user?.username}
              </a>
              <button onClick={handleLogout} className="text-brand-danger hover:text-red-500 uppercase tracking-widest text-xs font-bold transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
             <div className="border-l border-brand-primary/20 pl-4 md:pl-6 ml-2 md:ml-4">
               <a href="/auth" className="btn-primary text-xs tracking-widest uppercase">Sign In</a>
             </div>
          )}
        </div>
      </div>
    </nav>
  );
};

function App() {
  const { connect, disconnect } = useSocketStore();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col font-sans bg-brand-dark bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
          <TopBar />
          <Navigation />
          <main className="flex-grow container mx-auto px-6 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/auction/:id" element={<AuctionDetail />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-auction" element={<CreateAuction />} />
            </Routes>
          </main>
          <Footer />
        </div>
        
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#16120e',
            color: '#fdfbf7',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }
        }} />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
