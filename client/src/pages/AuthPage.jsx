import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../api';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const res = await api.post(endpoint, data);
      return res.data;
    },
    onSuccess: (data) => {
      login(data.user);
      toast.success(isLogin ? 'Welcome back!' : 'Registration successful!');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Authentication failed');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      mutation.mutate({ email: formData.email, password: formData.password });
    } else {
      mutation.mutate(formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="glass-card p-10 rounded-sm w-full max-w-md text-center">
        <h2 className="text-3xl font-serif text-brand-primary tracking-widest mb-8">
          {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Username" 
              className="input-field" 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            className="input-field" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="input-field" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit" className="btn-primary w-full mt-4" disabled={mutation.isPending}>
            {mutation.isPending ? 'Processing...' : isLogin ? 'Access Account' : 'Register'}
          </button>
        </form>
        <p className="mt-6 text-brand-accent/50 text-sm tracking-wider">
          {isLogin ? 'New to Prestige?' : 'Already hold an account?'} 
          <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-brand-primary hover:text-brand-accent transition-colors">
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
