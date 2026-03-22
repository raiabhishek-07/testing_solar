"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Lock, Skull } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const PHASES = [
  { label: '📖 Learn', key: 'teaching' },
  { label: '⚔️ Battle', key: 'mcq' },
  { label: '💻 Code', key: 'coding' },
  { label: '🐛 Debug', key: 'debugging' },
  { label: '🔮 Oracle', key: 'prediction' },
];

export default function SublevelDashboard({ label, sublevels, completedIds, onSelectSublevel, onBack }) {
  const getIcon = (iconName) => LucideIcons[iconName] || LucideIcons.Cpu;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 font-sans text-white">
      {/* Header */}
      <header className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-brand-neon/20 bg-brand-neon/10 text-brand-neon backdrop-blur-sm">
          <Shield className="w-5 h-5" />
          <span className="text-xs font-black uppercase tracking-[0.4em]">{label}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tighter drop-shadow-[0_0_40px_rgba(0,255,255,0.15)]">
          TACTICAL <span className="text-brand-neon">PIPELINES</span>
        </h1>
        <div className="flex items-center justify-center gap-2 flex-wrap mt-2">
          {PHASES.map((p, i) => (
            <span key={i} className="text-[9px] font-black px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/30 uppercase tracking-widest">
              {p.label}
            </span>
          ))}
        </div>
      </header>

      {/* Sublevel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        {sublevels.map((sub, idx) => {
          const isCompleted = completedIds.includes(sub.id);
          const isLocked = idx > 0 && !completedIds.includes(sublevels[idx - 1].id);
          const isNext = !isCompleted && !isLocked;
          const isBoss = sub.isBoss === true;
          const Icon = isBoss ? Skull : getIcon(sub.icon);

          const availablePhases = PHASES.filter(p => {
            if (p.key === 'teaching')   return sub.pipeline?.teaching?.length > 0;
            if (p.key === 'mcq')        return sub.pipeline?.battle?.mcq?.length > 0;
            if (p.key === 'coding')     return sub.pipeline?.coding?.length > 0;
            if (p.key === 'debugging')  return sub.pipeline?.debugging?.length > 0;
            if (p.key === 'prediction') return sub.pipeline?.prediction?.length > 0;
            return false;
          });

          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, type: 'spring', stiffness: 200 }}
              whileHover={!isLocked ? { scale: 1.04, y: -4 } : {}}
              onClick={() => !isLocked && onSelectSublevel(sub.pipeline)}
              className={`relative rounded-[32px] border-2 cursor-pointer transition-all flex flex-col gap-5 p-7 overflow-hidden
                ${isLocked
                  ? 'opacity-30 border-white/5 pointer-events-none grayscale bg-black/50'
                  : isBoss && isNext
                  ? 'border-red-500/60 bg-[#1a0000] shadow-[0_0_50px_rgba(220,38,38,0.25)]'
                  : isCompleted
                  ? 'border-brand-success/40 bg-[#021f12] shadow-[0_0_30px_rgba(16,185,129,0.1)]'
                  : isNext
                  ? 'border-brand-neon bg-[#001717] shadow-[0_0_40px_rgba(0,255,255,0.15)]'
                  : 'border-[#1a2e44] bg-[#050d14]/80 hover:border-brand-neon/60'
                }`}
            >
              {/* Glow */}
              {(isNext || isCompleted) && (
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-40 ${isBoss ? 'bg-red-500' : isNext ? 'bg-brand-neon' : 'bg-brand-success'}`} />
              )}

              {/* Status badge */}
              <div className={`absolute top-4 right-4 text-[8px] font-black px-2.5 py-1 rounded-full border tracking-widest uppercase flex items-center gap-1
                ${isCompleted ? 'border-brand-success/40 text-brand-success bg-brand-success/10'
                : isBoss && isNext ? 'border-red-500/40 text-red-400 bg-red-500/10 animate-pulse'
                : isNext ? 'border-brand-neon/40 text-brand-neon bg-brand-neon/10'
                : 'border-white/10 text-white/30'}`}>
                {isCompleted ? <><CheckCircle2 className="w-3 h-3" />SYNCED</> 
                  : isLocked ? <><Lock className="w-3 h-3" />LOCKED</> 
                  : isBoss ? <>⚠️ BOSS</> 
                  : 'READY'}
              </div>

              {/* Icon + title */}
              <div className="flex items-center gap-4 mt-3">
                <div className={`w-14 h-14 shrink-0 rounded-[18px] flex items-center justify-center border-2 bg-black ${
                  isCompleted ? 'border-brand-success text-brand-success'
                  : isBoss && isNext ? 'border-red-500 text-red-400'
                  : isNext ? 'border-brand-neon text-brand-neon'
                  : 'border-white/20 text-white/40'
                }`}>
                  {isLocked ? <Lock className="w-6 h-6 opacity-50" /> : <Icon className="w-7 h-7" />}
                </div>
                <div className="flex-1">
                  <p className={`text-[9px] font-black uppercase tracking-[0.4em] mb-1 ${isCompleted ? 'text-brand-success/60' : isBoss ? 'text-red-400/80' : isNext ? 'text-brand-neon/80' : 'text-white/40'}`}>
                    {isBoss ? '👾 BOSS FIGHT' : `Sublevel ${idx + 1}`}
                  </p>
                  <h3 className="text-xl font-black italic uppercase leading-none tracking-tighter">{sub.title}</h3>
                  <p className="text-white/40 text-xs mt-1">{sub.subtitle}</p>
                </div>
              </div>

              {/* Phase chips */}
              <div className="flex gap-2 flex-wrap">
                {availablePhases.map((p, pi) => (
                  <span key={pi} className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${
                    isBoss ? 'border-red-500/30 bg-red-500/10 text-red-300'
                    : isCompleted ? 'border-brand-success/30 bg-brand-success/10 text-brand-success'
                    : 'border-white/10 bg-white/5 text-white/40'
                  }`}>
                    {p.label}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Back */}
      <div className="mt-16">
        <button onClick={onBack}
          className="px-10 py-4 rounded-[20px] bg-white/5 border border-white/10 hover:bg-white/10 text-white/40 hover:text-white font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center gap-3">
          <LucideIcons.ArrowLeft className="w-4 h-4" />
          RETURN TO MISSION HUB
        </button>
      </div>
    </div>
  );
}
