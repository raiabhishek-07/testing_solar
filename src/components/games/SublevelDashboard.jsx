"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export default function SublevelDashboard({ label, sublevels, completedIds, onSelectSublevel, onBack }) {
  // HELPER: Map icon strings to actual Lucide components
  const getIcon = (iconName) => {
    return LucideIcons[iconName] || LucideIcons.Cpu;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 font-sans text-white">
      {/* Header */}
      <header className="text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-brand-neon/20 bg-brand-neon/10 text-brand-neon backdrop-blur-sm shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <Shield className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.4em]">{label}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-pixel uppercase text-white tracking-tighter drop-shadow-[0_0_40px_rgba(0,255,255,0.15)]">
          TACTICAL <span className="text-brand-neon">PIPELINES</span>
        </h1>
        <p className="text-white/30 text-xs font-black uppercase tracking-[0.3em]">
          Select a sublevel to launch the Battle Pipeline.
        </p>
      </header>

      {/* Grid of Sublevels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {sublevels.map((sub, idx) => {
          const isCompleted = completedIds.includes(sub.id);
          const isLocked = idx > 0 && !completedIds.includes(sublevels[idx - 1].id);
          const isNext = !isCompleted && !isLocked;
          
          const Icon = getIcon(sub.icon);

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={!isLocked ? { scale: 1.05, y: -5 } : {}}
              onClick={() => !isLocked && onSelectSublevel(sub.pipeline)}
              className={`relative rounded-[32px] border-2 cursor-pointer transition-all flex items-start gap-6 p-8 overflow-hidden group
                ${isLocked
                  ? 'opacity-30 border-white/5 pointer-events-none grayscale bg-black/50'
                  : isCompleted
                  ? 'border-brand-success/40 bg-[#021f12] shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                  : isNext
                  ? 'border-brand-neon bg-[#001717] shadow-[0_0_40px_rgba(0,255,255,0.15)]'
                  : 'border-[#1a2e44] bg-[#050d14]/80 hover:border-brand-neon/60'
                }`}
            >
              {/* Background Glow */}
              {(isNext || isCompleted) && (
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-50 ${isNext ? 'bg-brand-neon' : 'bg-brand-success'}`} />
              )}

              {/* Status Badge */}
              <div className={`absolute top-4 right-5 text-[9px] font-black px-3 py-1 rounded-full border tracking-widest uppercase flex items-center gap-1
                ${isCompleted ? 'border-brand-success/40 text-brand-success bg-brand-success/10'
                : isNext ? 'border-brand-neon/40 text-brand-neon bg-brand-neon/10'
                : 'border-white/10 text-white/30'
              }`}>
                {isCompleted ? <><CheckCircle2 className="w-3 h-3"/> SYNCED</> : isLocked ? <><Lock className="w-3 h-3"/> LOCKED</> : 'AWAITING SYNC...'}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 shrink-0 rounded-[20px] flex items-center justify-center border-2 transition-all shadow-xl bg-black ${
                isCompleted ? 'border-brand-success text-brand-success'
                : isNext ? 'border-brand-neon text-brand-neon'
                : 'border-white/20 text-white/40'
              }`}>
                {isLocked ? <Lock className="w-7 h-7 opacity-50" /> : <Icon className="w-8 h-8" />}
              </div>

              {/* Text Core */}
              <div className="flex-1 mt-1">
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1.5 ${isCompleted ? 'text-brand-success/60' : isNext ? 'text-brand-neon/80' : 'text-white/40'}`}>
                  Sublevel {idx + 1}
                </p>
                <h3 className="text-2xl font-black italic uppercase leading-none mb-3 tracking-tighter">
                  {sub.title}
                </h3>
                <p className="text-white/50 text-xs font-medium leading-relaxed">
                  {sub.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Nav */}
      <div className="mt-20">
        <button
          onClick={onBack}
          className="px-12 py-5 rounded-[20px] bg-white/5 border border-white/10 hover:bg-white/10 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-3"
        >
          <LucideIcons.ArrowLeft className="w-5 h-5"/>
          RETURN TO MISSION HUB
        </button>
      </div>
    </div>
  );
}
