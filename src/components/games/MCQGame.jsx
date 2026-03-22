"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Heart, Timer, Crosshair, Terminal, 
  AlertTriangle, ChevronRight, Shield 
} from 'lucide-react';

const PhaserBattle = dynamic(() => import('./PhaserBattle'), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 z-0 bg-transparent" /> 
});

export default function MCQGame({ questions, onComplete }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [combatLog, setCombatLog] = useState(["BATTLE INITIALIZED..."]);
  const [combatAction, setCombatAction] = useState(null);

  const current = questions[step];
  const damagePerHit = 100 / questions.length;

  const logCombat = (msg) => setCombatLog(prev => [msg, ...prev].slice(0, 4));

  // Question Timer Effect
  useEffect(() => {
    if (result || timeLeft <= 0) {
      if (timeLeft === 0 && !result) handleChoice(-1);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, result]);

  useEffect(() => {
    setTimeLeft(30);
  }, [step]);

  const handleChoice = (idx) => {
    if (result) return;
    
    if (idx === current.a) {
      setResult('correct');
      setEnemyHp(prev => Math.max(0, prev - damagePerHit));
      logCombat(`PLAYER STRIKES FOR ${Math.round(damagePerHit)} DMG!`);
      setCombatAction({ type: 'player_attack', id: Date.now() });

      setTimeout(() => {
        if (step < questions.length - 1) {
          setStep(s => s + 1);
          setResult(null);
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setResult('wrong');
      setPlayerHp(prev => Math.max(0, prev - 15));
      logCombat(`ENEMY COUNTERS FOR 15 DMG! MISS: ${current.q.slice(0, 15)}...`);
      setCombatAction({ type: 'enemy_attack', id: Date.now() });

      setTimeout(() => {
        setResult(null);
        if (step < questions.length - 1) {
          setStep(s => s + 1);
        } else {
          onComplete();
        }
      }, 2000);
    }
  };

  const renderHPBar = (current, max, isPlayer) => {
    const pct = Math.max(0, (current / max) * 100);
    const color = isPlayer ? (pct > 30 ? 'bg-brand-neon' : 'bg-red-500') : (pct > 40 ? 'bg-brand-orange' : 'bg-red-600');
    return (
      <div className="w-full">
        <div className="flex justify-between text-[10px] font-black uppercase mb-1 tracking-widest text-white/50">
          <span>{isPlayer ? 'YOUR HP' : 'BOSS HP'}</span>
          <span>{Math.round(current)} / {max}</span>
        </div>
        <div className="h-4 w-full bg-black/50 border border-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: '100%' }}
            animate={{ width: `${pct}%` }}
            className={`h-full ${color} transition-all duration-300 ease-out`}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[700px] flex flex-col p-6 bg-[#010202]/80 backdrop-blur-xl border border-white/5 rounded-[40px] text-white overflow-hidden relative">
      <PhaserBattle actionTrigger={combatAction} />
      
      {/* HUD AREA */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-8 relative z-10 pt-4 pointer-events-none">
         {/* Player HP */}
         <div className="w-full md:w-[280px] p-4 bg-black/80 border border-white/5 rounded-3xl backdrop-blur-sm pointer-events-auto">
           {renderHPBar(playerHp, 100, true)}
         </div>
         
         {/* Phase Indicator */}
         <div className="shrink-0 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2 px-4 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 animate-pulse">
               <Crosshair className="w-4 h-4 text-brand-orange" />
               <span className="text-[10px] font-black text-brand-orange uppercase tracking-[0.3em]">Tactical_Combat</span>
            </div>
            <div className="flex items-center gap-2">
               <Timer className={`w-4 h-4 ${timeLeft < 10 ? 'text-red-500' : 'text-white/20'}`} />
               <span className={`text-xl font-black font-mono ${timeLeft < 10 ? 'text-red-500' : 'text-white/40'}`}>{timeLeft}s</span>
            </div>
         </div>

         {/* Enemy HP */}
         <div className="w-full md:w-[280px] p-4 bg-black/80 border border-red-500/20 rounded-3xl backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0.1)] pointer-events-auto">
           {renderHPBar(enemyHp, 100, false)}
         </div>
      </div>

      {/* MID SPACE FOR PHASER */}
      <div className="flex-1 min-h-[250px] pointer-events-none" />

      {/* BOTTOM HUD AREA */}
      <div className="w-full max-w-6xl mx-auto relative z-10 pointer-events-none flex flex-col lg:flex-row gap-6 items-end pb-4">
         
         {/* LEFT: MCQ CARD */}
         <div className="flex-1 w-full pointer-events-auto">
            <motion.div 
               key={step} 
               initial={{ opacity:0, y:20 }} 
               animate={{ opacity:1, y:0 }} 
               className="bg-black/90 backdrop-blur-md border border-white/10 p-8 rounded-[40px] shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                  <motion.div 
                    className="h-full bg-brand-orange shadow-[0_0_10px_rgba(255,165,0,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / questions.length) * 100}%` }}
                  />
               </div>

               <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_8px_white]" />
                     <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Question_{step+1}_of_{questions.length}</span>
                  </div>
                  {result && (
                     <motion.span 
                        initial={{ opacity:0, scale:0.8 }} 
                        animate={{ opacity:1, scale:1 }}
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${result === 'correct' ? 'text-brand-success bg-brand-success/10 border border-brand-success/20' : 'text-red-500 bg-red-500/10 border border-red-500/20'}`}
                     >
                        {result === 'correct' ? 'CRITICAL_HIT' : 'PHASE_MISMATCH'}
                     </motion.span>
                  )}
               </div>

               <h3 className="text-xl md:text-2xl font-black mb-8 leading-tight tracking-tight uppercase italic">{questions[step]?.q}</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {questions[step]?.options.map((opt, i) => (
                     <button 
                        key={i} 
                        onClick={() => handleChoice(i)}
                        disabled={!!result}
                        className={`group relative py-4 px-6 text-left rounded-2xl border transition-all active:scale-95 ${
                           result === 'correct' && i === questions[step].a 
                           ? 'bg-brand-success/20 border-brand-success text-brand-success' 
                           : result === 'wrong' && i === questions[step].a
                           ? 'bg-brand-success/5 border-brand-success/20 text-brand-success'
                           : 'bg-white/5 border-white/10 hover:border-brand-orange hover:bg-brand-orange/5 text-white/80'
                        }`}
                     >
                        <span className="text-[10px] font-black mr-4 opacity-20">{String.fromCharCode(65 + i)}</span>
                        <span className="font-bold text-sm tracking-tight">{opt}</span>
                     </button>
                  ))}
               </div>
            </motion.div>
         </div>

         {/* RIGHT: LOG CONSOLE */}
         <div className="w-full lg:w-[320px] bg-black/80 backdrop-blur-md border border-white/10 rounded-[35px] p-6 h-[220px] overflow-hidden flex flex-col font-mono text-[9px] text-white/40 tracking-widest uppercase pointer-events-auto">
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
               <span className="font-black text-white/20">BATTLE_CONSOLE</span>
               <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
               </div>
            </div>
            <div className="space-y-2">
               {combatLog.map((log, i) => (
               <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex gap-2 ${i===0 ? 'text-brand-orange opacity-100 font-bold' : 'opacity-40'}`}
               >
                  <span className="text-white/10">{'>'}</span>
                  <span>{log}</span>
               </motion.div>
               ))}
            </div>
            <div className="mt-auto pt-4 flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse shadow-[0_0_10px_#00ffff]" />
               <span className="text-[8px] text-brand-neon font-black">SYSTEM_STABLE</span>
            </div>
         </div>
      </div>
    </div>
  );
}
