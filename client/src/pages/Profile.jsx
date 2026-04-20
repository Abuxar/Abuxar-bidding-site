import React, { useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import api from '../api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuthStore();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || 'https://via.placeholder.com/150');
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      const res = await api.post('/auth/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAvatarPreview(res.data.avatar);
      toast.success('Avatar updated to Cloudinary');
      // A quick reload ensures the AuthStore catches the new URL on the next boot, 
      // or we can just rely on the preview state to stay active locally.
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to sync image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pt-12 space-y-12">
      <div className="border-b border-brand-primary/20 pb-4">
        <h1 className="text-3xl font-serif text-brand-primary tracking-widest uppercase">Identity Dossier</h1>
      </div>

      <div className="glass-card p-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex flex-col items-center space-y-6">
           <div className="relative group">
              <img src={avatarPreview} alt="Avatar" className="w-48 h-48 rounded-sm object-cover border-2 border-brand-primary/40 group-hover:border-brand-primary transition-colors duration-500" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <label className="cursor-pointer text-xs uppercase tracking-widest text-brand-primary font-bold">
                  {isUploading ? 'SYNCING...' : 'UPDATE AVATAR'}
                  <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={handleAvatarChange} />
                </label>
              </div>
           </div>
           <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-[10px] tracking-widest uppercase border border-brand-primary/20">{user?.role}</span>
              <span className={`px-3 py-1 text-[10px] tracking-widest uppercase border ${user?.isVerified ? 'bg-green-900/40 text-green-400 border-green-500/30' : 'bg-red-900/40 text-red-400 border-red-500/30'}`}>
                {user?.isVerified ? 'VERIFIED' : 'PENDING'}
              </span>
           </div>
        </div>

        <div className="flex-1 space-y-8 w-full">
           <div className="space-y-1">
             <p className="text-xs tracking-[0.2em] text-brand-accent/50 uppercase">Alias</p>
             <p className="text-2xl font-serif text-brand-primary">{user?.username || 'GUEST'}</p>
           </div>
           <div className="space-y-1 border-t border-brand-primary/10 pt-4">
             <p className="text-xs tracking-[0.2em] text-brand-accent/50 uppercase">Encrypted Comms</p>
             <p className="text-lg text-brand-accent font-mono">{user?.email || 'N/A'}</p>
           </div>
           <div className="space-y-1 border-t border-brand-primary/10 pt-4">
             <p className="text-xs tracking-[0.2em] text-brand-accent/50 uppercase">Account Fingerprint</p>
             <p className="text-xs text-brand-accent/60 font-mono break-all">{user?._id || 'N/A'}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
