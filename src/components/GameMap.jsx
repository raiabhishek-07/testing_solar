"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, Star, ChevronLeft, MapPin, Zap, Code, Cpu, Terminal, Shield, Trophy, HelpCircle, BookOpen } from 'lucide-react';

const levelNodes = [
  { id: 0, title: "NOOB ZONE", subtitle: "Level 0: Foundations", xp: 100, icon: Terminal },
  { id: 1, title: "FIRST CODE", subtitle: "Level 1: Basic Syntax", xp: 200, icon: Code },
  { id: 2, title: "DECISIONS", subtitle: "Level 2: Logic & Conditions", xp: 350, icon: Shield },
  { id: 3, title: "LOOPS & ARRAYS", subtitle: "Level 3: Repetition Control", xp: 500, icon: Cpu },
  { id: 4, title: "STRINGS & FUNCTIONS", subtitle: "Level 4: Modular Code", xp: 650, icon: Zap },
  { id: 5, title: "CORE SOLVING", subtitle: "Level 5: Core Problem Solving", xp: 800, icon: HelpCircle },
  { id: 6, title: "LOGIC MASTER", subtitle: "Level 6: Logic Master", xp: 950, icon: Shield },
  { id: 7, title: "FINAL BOSS", subtitle: "Ultimate Clash: Everything Mixed", xp: 1200, icon: Trophy }
];

const FloatingCode = () => {
   // Use deterministic pseudo-random values to fix SSR hydration mismatch
   const getPrng = (seed) => ((seed * 16807) % 2147483647) / 2147483647;
   
   return (
   <div className="absolute inset-0 pointer-events-none opacity-10 overflow-hidden">
      {[...Array(8)].map((_, i) => (
         <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 5 + getPrng(i + 1) * 5,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute text-[10px] font-mono text-brand-neon"
            style={{
              left: `${getPrng(i + 13) * 90}%`,
              top: `${getPrng(i + 42) * 90}%`,
            }}
         >
            {i % 2 === 0 ? "010110" : "0xFFFF"}
         </motion.div>
      ))}
   </div>
   );
};

export default function GameMap({ user, selectedLanguage, onEnterLevel, onBack, toggleProfile, onViewDocs }) {
  const languageGlow = selectedLanguage?.color || '#a855f7';
  const xp = user?.progress?.totalXP || 0;
  const currentLvl = Math.floor(xp / 1000) + 1;
  const rankNames = ["Novice", "Script Kiddie", "Bug Hunter", "Code Sorcerer", "Algorithm Archmage"];
  const rank = rankNames[Math.min(currentLvl - 1, rankNames.length - 1)];

  const isUnlocked = (id) => {
    if (id === 0) return true;
    return !!user?.progress?.[`level${id - 1}`];
  };

  const isCompleted = (id) => {
    return !!user?.progress?.[`level${id}`];
  };

  const levelsCleared = Object.keys(user?.progress || {}).filter(k => k.startsWith('level')).length;

  return (
    <div className="min-h-screen bg-transparent py-20 px-4 sm:px-6 relative overflow-hidden font-sans">
      {/* Premium Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_2px,transparent_2px),linear-gradient(90deg,rgba(0,255,255,0.02)_2px,transparent_2px)] bg-[size:80px_80px] [perspective:2000px] [transform:rotateX(45deg)] origin-top opacity-40" />
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/20 to-[#020202]/80" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-brand-purple/5 blur-[250px] rounded-full animate-pulse" />
      </div>

      <FloatingCode />

      {/* TOP HUD: MISSION CONTROL */}
      <div className="fixed top-0 left-0 w-full z-40 p-4 sm:p-6 pointer-events-none">
         <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto relative">
            
            <div className="flex items-center gap-3 pointer-events-auto">
               <motion.button 
                  onClick={onBack}
                  whileHover={{ scale: 1.05, x: 5 }}
                  className="glass p-3 rounded-2xl border-white/5 hover:border-white/20 text-white/50 hover:text-white transition-all"
               >
                  <ChevronLeft className="w-5 h-5" />
               </motion.button>

               <motion.button 
                  onClick={onViewDocs}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="glass px-5 py-3 rounded-2xl border-brand-neon/20 bg-brand-neon/5 text-brand-neon hover:border-brand-neon/50 hover:bg-brand-neon/10 transition-all flex items-center gap-3 group shadow-2xl"
               >
                  <BookOpen className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">Codex</span>
               </motion.button>
            </div>

            {/* PERFECTLY CENTERED REALM HEADER */}
            <motion.div 
               initial={{ y: -20, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }}
               className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
               <div className="glass px-8 py-3 rounded-[30px] border-brand-neon/20 flex flex-col items-center gap-0.5 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-neon to-transparent" />
                  <div className="flex items-center gap-3">
                     <selectedLanguage.icon className="w-4 h-4 animate-pulse" style={{ color: languageGlow }} />
                     <h1 className="text-lg sm:text-2xl font-pixel text-white uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                        {selectedLanguage?.name} REALM
                     </h1>
                  </div>
                  <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 flex items-center gap-4">
                     <span className="w-6 h-px bg-white/10" />
                     {levelsCleared} / {levelNodes.length} DECRYPTED
                     <span className="w-6 h-px bg-white/10" />
                  </div>
               </div>
            </motion.div>

            <motion.div 
               initial={{ x: 20, opacity: 0 }} 
               animate={{ x: 0, opacity: 1 }}
               onClick={toggleProfile}
               className="glass p-1 pr-4 rounded-full border-white/5 hover:border-brand-neon/20 transition-all cursor-pointer group flex items-center gap-3"
            >
               <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center shadow-lg text-white">
                  <Star className="w-4 h-4" />
               </div>
               <div className="text-left">
                  <div className="text-[9px] font-black text-white uppercase tracking-tight">{rank}</div>
                  <div className="text-[7px] text-white/30 font-black uppercase tracking-widest leading-none">ID: {String(user?.id || '').slice(0, 6)}</div>
               </div>
            </motion.div>
         </div>
      </div>

      {/* PROGRESS OVERVIEW */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-6 pointer-events-none">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-[25px] p-0.5 border-white/5 relative overflow-hidden backdrop-blur-md pointer-events-auto"
         >
            <div className="px-5 py-3 space-y-2">
               <div className="flex justify-between items-end">
                  <div className="space-y-0">
                     <div className="text-[8px] font-black uppercase tracking-widest text-brand-neon flex items-center gap-2">
                        <Zap className="w-2.5 h-2.5 fill-current" /> SYSTEM_RECOVERY
                     </div>
                     <div className="text-lg font-black text-white font-pixel">LEVEL {currentLvl}</div>
                  </div>
                  <div className="text-right">
                     <div className="text-[10px] font-black text-white">{xp} <span className="text-white/20">/</span> {currentLvl * 1000} XP</div>
                     <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">CURRENT_SYNC</div>
                  </div>
               </div>
               
               <div className="h-2 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(xp % 1000) / 10}%` }}
                    className="h-full bg-gradient-to-r from-brand-purple via-brand-neon to-brand-cyan shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                  />
               </div>
            </div>
         </motion.div>
      </div>

      {/* MAIN JOURNEY MAP */}
      <div className="relative container mx-auto flex flex-col items-center mt-72 sm:mt-64 z-10">
        
        {/* The Map Arena */}
        <div className="relative w-full max-w-4xl h-[1200px] flex justify-center items-center overflow-visible">
           <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 1300" preserveAspectRatio="xMidYMid meet">
             <defs>
               <filter id="pathGlow">
                 <feGaussianBlur stdDeviation="6" result="blur"/>
                 <feComposite in="SourceGraphic" in2="blur" operator="over"/>
               </filter>
               <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={languageGlow} />
                  <stop offset="100%" stopColor="#00ffff" />
               </linearGradient>
             </defs>

             {/* Base Path (Zig-Zag) */}
             <path 
               d="M 300 100 L 450 250 L 150 400 L 450 550 L 150 700 L 450 850 L 150 1000 L 300 1150"
               fill="none"
               stroke="white"
               strokeWidth="1.5"
               strokeDasharray="10 15"
               className="opacity-5"
             />

             {/* Animated Flow Path */}
             <path 
               d="M 300 100 L 450 250 L 150 400 L 450 550 L 150 700 L 450 850 L 150 1000 L 300 1150"
               fill="none"
               stroke="url(#lineGrad)"
               strokeWidth="3"
               filter="url(#pathGlow)"
               className="opacity-20 translate-y-2"
               style={{ 
                  strokeDasharray: '3000', 
                  strokeDashoffset: '3000',
                  animation: 'dash 20s linear infinite'
               }}
             />

             {/* Data Packets */}
             {[...Array(4)].map((_, i) => (
                <circle key={i} r="3" fill="#00ffff" opacity="0.6">
                  <animateMotion 
                    path="M 300 100 L 450 250 L 150 400 L 450 550 L 150 700 L 450 850 L 150 1000 L 300 1150"
                    dur={`${8 + i * 2}s`}
                    repeatCount="indefinite"
                    begin={`${i * 1.5}s`}
                  />
                  <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                </circle>
             ))}
           </svg>

           {/* Nodes with Updated Zig-Zag Positions */}
           {[
             { id: 0, x: 300, y: 100 },
             { id: 1, x: 450, y: 250 },
             { id: 2, x: 150, y: 400 },
             { id: 3, x: 450, y: 550 },
             { id: 4, x: 150, y: 700 },
             { id: 5, x: 450, y: 850 },
             { id: 6, x: 150, y: 1000 },
             { id: 7, x: 300, y: 1150 }
           ].map((pos, i) => {
             const node = levelNodes[i];
             const unlocked = isUnlocked(node.id);
             return (
               <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  style={{ left: `${(pos.x / 600) * 100}%`, top: `${(pos.y / 1300) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
               >
                  <div className="relative flex flex-col items-center">
                     {/* Label Container */}
                     <div className="absolute top-[120%] whitespace-nowrap text-center pointer-events-none group-hover:-translate-y-1 transition-transform">
                        <div className={`text-[11px] font-black uppercase tracking-[0.2em] ${unlocked ? 'text-white' : 'text-white/20'} font-pixel`}>
                          {node.title}
                        </div>
                        <div className="text-[9px] font-black text-brand-neon/60 uppercase tracking-widest mt-1.5 italic">
                           {unlocked ? node.subtitle : "ENCRYPTED_SECTOR"}
                        </div>
                     </div>

                     {/* The Node Button */}
                     <motion.button
                        whileHover={unlocked ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
                        onClick={() => unlocked && onEnterLevel(node.id)}
                        className={`relative w-24 h-24 flex flex-col items-center justify-center transition-all ${
                          unlocked ? 'cursor-pointer' : 'cursor-not-allowed grayscale'
                        }`}
                     >
                        {/* Diamond Base */}
                        <div className={`absolute inset-0 bg-white/5 border-2 transition-all rotate-45 transform-gpu ${
                           isCompleted(node.id) ? 'border-brand-success bg-brand-success/10 rounded-xl scale-105' :
                           unlocked ? 'border-brand-neon bg-brand-neon/10 rounded-xl' : 'border-white/5 rounded-lg'
                         } ${unlocked ? 'shadow-[0_0_40px_rgba(0,255,255,0.2)]' : ''}`} />
                        
                        {/* Icon & Label */}
                         <div className="relative z-10 flex flex-col items-center gap-1">
                            {(() => {
                               const Icon = node.icon;
                               return <Icon className={`w-8 h-8 ${isCompleted(node.id) ? 'text-brand-success' : unlocked ? 'text-white' : 'text-white/10'}`} />;
                            })()}
                            {isCompleted(node.id) ? (
                               <div className="text-[7px] font-black text-brand-success uppercase tracking-widest">
                                  DECRYPTED
                               </div>
                            ) : unlocked && (
                               <div className="text-[8px] font-black text-brand-neon uppercase tracking-widest animate-pulse">
                                  INIT_AUTH
                               </div>
                            )}
                        </div>

                        {/* Status Ring */}
                        {unlocked && (i === levelsCleared) && (
                           <div className="absolute -inset-4 border border-brand-neon animate-[ping_2s_infinite] opacity-40 rounded-xl rotate-45" />
                        )}
                        {unlocked && (i === levelsCleared) && (
                           <div className="absolute -inset-8 border border-brand-purple/30 animate-[ping_3s_infinite] opacity-20 rounded-xl rotate-45" />
                        )}
                     </motion.button>
                     
                     {/* Glow Underlay */}
                     {unlocked && (
                       <div className="absolute -inset-12 bg-brand-neon/10 blur-[50px] rounded-full -z-10 animate-pulse pointer-events-none" />
                     )}
                  </div>
               </motion.div>
             );
           })}
        </div>
      </div>

      {/* High-Tech Scanner Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50">
         <motion.div 
            animate={{ y: ["0%", "100%", "0%"] }} 
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-[2px] bg-brand-neon/10 shadow-[0_0_20px_#00ffff44]"
         />
      </div>

      {/* FOOTER COMMAND BAR */}
      <div className="fixed bottom-0 left-0 w-full z-40 p-6 pointer-events-none">
         <div className="max-w-7xl mx-auto flex justify-between items-end pointer-events-auto">
            <div className="flex flex-col gap-4">
               {/* Real-time Sensors (Fake stats for immersion) */}
               <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                     <div key={i} className="glass px-3 py-1.5 rounded-lg border-white/5 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-brand-neon animate-pulse" />
                        <span className="text-[7px] font-black text-white/40 uppercase tracking-widest">
                           {["CORE_TEMP", "SYNC_RATE", "DECRYPT_SPD"][i]}: {40 + ((i + 1) * 17) % 50}{["°C", "%", "kb/s"][i]}
                        </span>
                     </div>
                  ))}
               </div>

               <div className="glass px-6 py-2.5 rounded-full border-white/5 flex items-center gap-4 text-[9px] font-black text-white/30 uppercase tracking-[0.4em] backdrop-blur-xl">
                  <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse shadow-[0_0_10px_#00ffff]" />
                  SECURE_CONNECTION: STABLE_v2.1.2 - REGION: {selectedLanguage?.name?.toUpperCase()}_SECTOR
               </div>
            </div>
            
            <div className="flex gap-4">
               <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass p-3 rounded-xl border-brand-neon/10 text-brand-neon bg-brand-neon/5 hover:border-brand-neon/30 transition-all backdrop-blur-xl group"
               >
                  <MapPin className="w-4 h-4 group-hover:animate-bounce" />
               </motion.button>
               <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass p-3 rounded-xl border-brand-purple/10 text-brand-purple bg-brand-purple/5 hover:border-brand-purple/30 transition-all backdrop-blur-xl"
               >
                  <Trophy className="w-4 h-4" />
               </motion.button>
            </div>
         </div>
      </div>
    </div>
  );
}
