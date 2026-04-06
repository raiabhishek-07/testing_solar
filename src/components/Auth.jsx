"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { sfxClick, sfxHover, sfxSuccess, sfxError, sfxPageTransition } from '@/lib/sounds';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Lazy load Firebase so we don't break SSR immediately
      const { auth, db } = await import('@/lib/firebase');
      const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = await import('firebase/auth');
      const { doc, setDoc, getDoc } = await import('firebase/firestore');

      let userData;

      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
        
        if (userDoc.exists()) {
            userData = { uid: userCredential.user.uid, ...userDoc.data() };
        } else {
            userData = { uid: userCredential.user.uid, email: formData.email, name: "Recruit", progress: {} };
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        userData = { 
            uid: userCredential.user.uid, 
            email: formData.email, 
            name: formData.name,
            progress: {}
        };
        await setDoc(doc(db, "users", userCredential.user.uid), userData);
      }

      // Sync local storage manually so the rest of the app doesn't break
      localStorage.setItem('clash_user', JSON.stringify(userData));
      
      if (userData.progress) {
          localStorage.setItem('clash_local_progress', JSON.stringify(userData.progress));
      }

      sfxSuccess();
      sfxPageTransition();
      onAuthSuccess(userData);
      
    } catch (err) {
      console.error(err);
      sfxError();
      setError(err.message || 'Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-10 rounded-[40px] border-white/10 space-y-8"
      >
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black font-pixel text-white uppercase tracking-tighter">
            {isLogin ? 'WELCOME BACK' : 'LEVEL UP'}
          </h2>
          <p className="text-white/40 text-sm uppercase tracking-widest leading-none">
            {isLogin ? 'Enter your credentials to continue' : 'Join the elite squad of student-heroes'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-4">Full Name</label>
               <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                 <input 
                   required
                   type="text"
                   placeholder="Enter your name"
                   className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple/50 transition-colors"
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                 />
               </div>
            </div>
          )}

          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-4">Email Address</label>
             <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
               <input 
                 required
                 type="email"
                 placeholder="name@example.com"
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple/50 transition-colors"
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
               />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-4">Access Password</label>
             <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
               <input 
                 required
                 type="password"
                 placeholder="••••••••"
                 className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-purple/50 transition-colors"
                 value={formData.password}
                 onChange={(e) => setFormData({...formData, password: e.target.value})}
               />
             </div>
          </div>

          {error && <p className="text-brand-danger text-xs font-bold uppercase tracking-widest text-center">{error}</p>}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => sfxHover()}
            onClick={() => sfxClick()}
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-purple to-brand-neon py-5 rounded-2xl text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(168,85,247,0.3)]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isLogin ? 'INITIATE LOGIN' : 'CREATE ACCOUNT'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <div className="text-center pt-4">
          <button 
            onClick={() => { sfxClick(); setIsLogin(!isLogin); }}
            onMouseEnter={() => sfxHover()}
            className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-brand-neon transition-colors"
          >
            {isLogin ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY RECRUITED? LOGIN"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
