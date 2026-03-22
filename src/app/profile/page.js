"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Zap, Trophy, TrendingUp, Star, LogOut, ChevronLeft, CheckCircle, Lock, Camera, Edit3 } from 'lucide-react';
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('clash_user');
    if (!savedUser) {
      router.push('/auth');
    } else {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('clash_user');
    sessionStorage.removeItem('clash_lang');
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center font-pixel text-brand-neon animate-pulse uppercase">SYNCHRONIZING PROFILE...</div>;
  if (!user) return null;

  const xp = user.progress?.totalXP || 0;
  const level = Math.floor(xp / 1000) + 1;
  const rankNames = ["Novice", "Script Kiddie", "Bug Hunter", "Code Sorcerer", "Algorithm Archmage"];
  const rank = rankNames[Math.min(level - 1, rankNames.length - 1)];
  const dungeonsCompleted = Object.keys(user.progress || {}).filter(k => k.startsWith('level')).length;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-brand-neon selection:text-black font-sans pb-20">
      <Navbar user={user} toggleProfile={() => router.push('/profile')} onStartQuest={() => router.push('/realm')} />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10">
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[150px]" />
         <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-neon/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-32 space-y-8 sm:space-y-12">
         {/* Navigation & Header */}
         <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <motion.button 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={() => router.push('/dashboard')}
              className="glass p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-center justify-center sm:justify-start gap-2 text-white/40 hover:text-white transition-all border-white/5"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-black uppercase tracking-tighter text-[9px] sm:text-[10px]">BACK TO JOURNEY</span>
            </motion.button>

            <motion.button 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              onClick={handleLogout}
              className="px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl bg-brand-danger/10 text-brand-danger border border-brand-danger/20 font-black uppercase tracking-widest text-[9px] sm:text-[10px] flex items-center justify-center gap-2 hover:bg-brand-danger hover:text-white transition-all"
            >
              <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              TERMINATE SESSION
            </motion.button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Left Column: Avatar & Rank */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.1 }}
               className="lg:col-span-1 space-y-6 sm:space-y-8"
            >
               <div className="glass p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border-white/10 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-20 sm:h-24 bg-gradient-to-b from-brand-purple/20 to-transparent" />
                  
                  <div className="relative inline-block mb-4 sm:mb-6 pt-2 sm:pt-4">
                     <div className="absolute -inset-4 bg-brand-neon/20 blur-2xl rounded-full animate-pulse" />
                     <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center relative z-10">
                        <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                        <button className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-neon flex items-center justify-center border-4 border-[#050505] hover:scale-110 transition-transform shadow-xl">
                           <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                        </button>
                     </div>
                  </div>

                  <div className="space-y-1 sm:space-y-2 relative z-10">
                     <h2 className="text-2xl sm:text-4xl font-black font-pixel text-white uppercase tracking-tighter truncate px-2">{user.name}</h2>
                     <div className="inline-block px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-[9px] sm:text-[10px] font-black text-brand-neon uppercase tracking-widest">
                        {rank} • LVL {level}
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                     <div className="glass p-3 sm:p-4 rounded-xl sm:rounded-2xl border-white/5 bg-white/2">
                        <div className="text-xl sm:text-2xl font-black text-white">{xp}</div>
                        <div className="text-[7px] sm:text-[8px] text-white/30 font-black uppercase tracking-widest">TOTAL XP</div>
                     </div>
                     <div className="glass p-3 sm:p-4 rounded-xl sm:rounded-2xl border-white/5 bg-white/2">
                        <div className="text-xl sm:text-2xl font-black text-white">{dungeonsCompleted}</div>
                        <div className="text-[7px] sm:text-[8px] text-white/30 font-black uppercase tracking-widest">CLEARED</div>
                     </div>
                  </div>
               </div>

               <div className="glass p-6 sm:p-8 rounded-[25px] sm:rounded-[30px] border-white/5 space-y-4 sm:space-y-6">
                  <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/30">CONTACT INFO</h4>
                  <div className="space-y-3 sm:space-y-4">
                     <div className="flex items-center gap-3 sm:gap-4 text-white/60">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-brand-purple shrink-0" />
                        <span className="text-xs sm:text-sm font-bold truncate">{user.email}</span>
                     </div>
                     <div className="flex items-center gap-3 sm:gap-4 text-white/60">
                        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-brand-cyan shrink-0" />
                        <span className="text-xs sm:text-sm font-bold">Encrypted Account</span>
                     </div>
                  </div>
                  <button className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all">
                     EDIT ACCOUNT SETTINGS
                  </button>
               </div>
            </motion.div>

            {/* Right Column: Achievements & Progress */}
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="lg:col-span-2 space-y-6 sm:space-y-8"
            >
               <div className="glass p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border-white/10 space-y-8 sm:space-y-10">
                  <div className="space-y-4 sm:space-y-6">
                     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                        <div className="space-y-1 sm:space-y-2">
                           <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tighter">REPUTATION PROGRESS</h3>
                           <p className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest">NEXT RANK: {rankNames[Math.min(level, rankNames.length - 1)]}</p>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto">
                           <span className="text-lg sm:text-xl font-black text-brand-neon">{xp % 1000}</span>
                           <span className="text-white/20 text-xs sm:text-sm font-black mx-1">/</span>
                           <span className="text-white/40 text-xs sm:text-sm font-black uppercase">1000 XP</span>
                        </div>
                     </div>
                     <div className="w-full h-3 sm:h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 sm:p-1">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(xp % 1000) / 10}%` }}
                          className="h-full bg-gradient-to-r from-brand-purple to-brand-neon rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                        />
                     </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                     <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/30 border-b border-white/5 pb-2">CHAPTER PROGRESSION</h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {[0,1,2,3,4,5].map(lvl => {
                           const isComp = user.progress?.[`level${lvl}`] === 'completed';
                           return (
                             <div key={lvl} className={`glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all flex items-center justify-between ${isComp ? 'border-brand-success/30 bg-brand-success/5' : 'border-white/5 bg-white/2 opacity-40 grayscale'}`}>
                                <div className="flex items-center gap-3 sm:gap-4">
                                   <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${isComp ? 'bg-brand-success/20 text-brand-success' : 'bg-white/5 text-white/20'}`}>
                                      {isComp ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : <Lock className="w-5 h-5 sm:w-6 sm:h-6" />}
                                   </div>
                                   <div className="text-left">
                                      <div className="text-xs sm:text-sm font-black text-white uppercase tracking-tighter">CHAPTER {lvl}</div>
                                      <div className="text-[8px] sm:text-[9px] font-black text-white/30 uppercase tracking-widest">{isComp ? 'CLEARED' : 'LOCKED'}</div>
                                   </div>
                                </div>
                                {isComp && (
                                   <div className="text-brand-success">
                                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                                   </div>
                                )}
                             </div>
                           )
                        })}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-10 border-t border-white/5">
                     <div className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-white/5 flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                           <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="text-left">
                           <div className="text-[8px] sm:text-xs font-black text-brand-cyan uppercase tracking-widest">ACHIEVEMENT</div>
                           <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-tighter">EARLY RECRUIT</div>
                        </div>
                     </div>
                     <div className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-white/5 flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-purple/20 flex items-center justify-center text-brand-purple">
                           <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="text-left">
                           <div className="text-[8px] sm:text-xs font-black text-brand-purple uppercase tracking-widest">SPECIALITY</div>
                           <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-tighter">PYTHON SORCERER</div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
    </main>
  );
}
