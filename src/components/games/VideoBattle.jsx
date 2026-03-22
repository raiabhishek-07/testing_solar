"use client";
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react';

export default function VideoBattle({ playerHealth = 100, villainHealth = 100 }) {
  const [heroHit, setHeroHit] = useState(false);
  const [dragonHit, setDragonHit] = useState(false);
  
  const prevHeroHealth = useRef(playerHealth);
  const prevDragonHealth = useRef(villainHealth);

  useEffect(() => {
    if (playerHealth < prevHeroHealth.current) {
      setHeroHit(true);
      setTimeout(() => setHeroHit(false), 500);
    }
    prevHeroHealth.current = playerHealth;
  }, [playerHealth]);

  useEffect(() => {
    if (villainHealth < prevDragonHealth.current) {
      setDragonHit(true);
      setTimeout(() => setDragonHit(false), 500);
    }
    prevDragonHealth.current = villainHealth;
  }, [villainHealth]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[40px]">
      {/* SHAKE EFFECT ON IMPACT */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ 
          x: heroHit ? [-10, 10, -10, 10, 0] : dragonHit ? [10, -10, 10, -10, 0] : 0,
          y: (heroHit || dragonHit) ? [5, -5, 5, -5, 0] : 0
        }}
        transition={{ duration: 0.4 }}
      >
        <motion.img
           src="/assets/knight_dragon_battle.png"
           initial={{ scale: 1.1, opacity: 0 }}
           animate={{ scale: 1, opacity: 0.8 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           className="w-full h-full object-cover mix-blend-screen"
        />
      </motion.div>
      
      {/* FLASH OVERLAYS */}
      <motion.div 
         animate={{ opacity: heroHit ? [0, 0.4, 0] : 0 }}
         className="absolute inset-0 bg-brand-danger/30"
      />
      <motion.div 
         animate={{ opacity: dragonHit ? [0, 0.4, 0] : 0 }}
         className="absolute inset-0 bg-brand-neon/30"
      />
      
      {/* DYNAMIC DIRECTIONAL FLASH (SPARK) */}
      {dragonHit && (
         <motion.div 
            initial={{ scale: 0, x: '80%', y: '50%', opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            className="absolute w-20 h-20 bg-white rounded-full blur-3xl z-10"
         />
      )}
      {heroHit && (
         <motion.div 
            initial={{ scale: 0, x: '20%', y: '50%', opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            className="absolute w-20 h-20 bg-brand-danger rounded-full blur-3xl z-10"
         />
      )}
      
      {/* Dynamic Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020811] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-brand-purple/5 mix-blend-overlay" />
      
      {/* High-Tech HUD health bars displayed on top of video */}
      <div className="absolute top-10 left-10 right-10 flex justify-between px-4">
         <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div 
               className="h-full bg-brand-neon transition-all duration-500 shadow-[0_0_15px_#00ffff]" 
               style={{ width: `${playerHealth}%` }}
            />
         </div>
         <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div 
               className="h-full bg-brand-purple transition-all duration-500 shadow-[0_0_15px_#a855f7]" 
               style={{ width: `${villainHealth}%` }}
            />
         </div>
      </div>
    </div>
  );
}
