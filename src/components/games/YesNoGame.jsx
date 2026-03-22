"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, Zap, Timer, Heart, Check, X, 
  Terminal, Crosshair, ChevronRight 
} from 'lucide-react';

const PhaserBattle = dynamic(() => import('./PhaserBattle'), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 z-0 bg-transparent" /> 
});

export default function YesNoGame({ questions, onComplete }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [combatLog, setCombatLog] = useState(["TRUTH_MATRIX_INITIALIZED..."]);
  const [combatAction, setCombatAction] = useState(null);

  const current = questions[step];
  const damagePerHit = 100 / questions.length;

  const logCombat = (msg) => setCombatLog(prev => [msg, ...prev].slice(0, 4));

  // Question Timer Effect
  useEffect(() => {
    if (result || timeLeft <= 0) {
      if (timeLeft === 0 && !result) handleAns(null);
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, result]);

  useEffect(() => {
    setTimeLeft(30);
  }, [step]);

  const handleAns = (val) => {
    if (result) return;
    
    if (val === current.a) {
      setResult('correct');
      setEnemyHp(prev => Math.max(0, prev - damagePerHit));
      logCombat(`LOGIC_STRIKE SUCCESSFUL! ${Math.round(damagePerHit)} DMG.`);
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
      setPlayerHp(prev => Math.max(0, prev - 20));
      logCombat(`SYSTEM REJECTS LOGIC! -20 HP. SOURCE: ${current.q.slice(0, 15)}...`);
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
    <div className="min-h-[700px] flex flex-col p-6 bg-[#030508]/90 backdrop-blur-xl border border-white/5 rounded-[50px] text-white overflow-hidden relative">
      <PhaserBattle actionTrigger={combatAction} />
      
      {/* HUD AREA */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-8 relative z-10 pt-4 pointer-events-none">
         <div className="w-full md:w-[280px] p-4 bg-black/80 border border-white/5 rounded-3xl backdrop-blur-sm pointer-events-auto">
           {renderHPBar(playerHp, 100, true)}
         </div>
         
         <div className="shrink-0 flex flex-col items-center">
            <div className="flex items-center gap-3 mb-2 px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10">
               <ShieldAlert className="w-4 h-4 text-brand-purple" />
               <span className="text-[10px] font-black text-brand-purple uppercase tracking-[0.3em]">Truth_Duel</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
               <Timer className="w-4 h-4" />
               <span className="text-xl font-black font-mono tracking-widest">{timeLeft}s</span>
            </div>
         </div>

         <div className="w-full md:w-[280px] p-4 bg-black/80 border border-red-500/20 rounded-3xl backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0.1)] pointer-events-auto">
           {renderHPBar(enemyHp, 100, false)}
         </div>
      </div>

      {/* MID SPACE FOR PHASER */}
      <div className="flex-1 min-h-[250px] pointer-events-none" />

      {/* BOTTOM HUD AREA */}
      <div className="w-full max-w-7xl mx-auto relative z-10 pointer-events-none flex flex-col lg:flex-row gap-8 items-end pb-8">
         
         {/* LEFT: YES/NO CARDS */}
         <div className="flex-1 w-full pointer-events-auto">
            <motion.div 
               key={step} 
               initial={{ opacity:0, y:20 }} 
               animate={{ opacity:1, y:0 }} 
               className="bg-black/90 backdrop-blur-md border border-white/10 p-10 rounded-[50px] shadow-2xl relative overflow-hidden text-center"
            >
               <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                  <motion.div 
                    className="h-full bg-brand-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${(step / questions.length) * 100}%` }}
                  />
               </div>

               <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-10">Mission_Challenge_{step+1}</p>

               <h3 className="text-3xl md:text-5xl font-black mb-12 leading-none tracking-tighter uppercase italic">{questions[step]?.q}</h3>
               
               <div className="flex justify-center gap-8">
                  <button 
                     onClick={() => handleAns(false)}
                     disabled={!!result}
                     className={`w-32 h-32 rounded-[30px] border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                        result && current.a === false 
                        ? 'bg-red-500/20 border-red-500 text-red-500' 
                        : 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-white/40 hover:text-red-500'
                     }`}
                  >
                     <X className="w-12 h-12 mb-2" strokeWidth={3} />
                     <span className="text-[10px] font-black uppercase">False</span>
                  </button>

                  <button 
                     onClick={() => handleAns(true)}
                     disabled={!!result}
                     className={`w-32 h-32 rounded-[30px] border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${
                        result && current.a === true 
                        ? 'bg-brand-success/20 border-brand-success text-brand-success' 
                        : 'bg-white/5 border-white/10 hover:border-brand-success/50 hover:bg-brand-success/10 text-white/40 hover:text-brand-success'
                     }`}
                  >
                     <Check className="w-12 h-12 mb-2" strokeWidth={3} />
                     <span className="text-[10px] font-black uppercase">True</span>
                  </button>
               </div>
            </motion.div>
         </div>

         {/* RIGHT: LOG CONSOLE */}
         <div className="w-full lg:w-[350px] bg-black/80 backdrop-blur-md border border-white/10 rounded-[40px] p-6 h-[250px] overflow-hidden flex flex-col font-mono text-[9px] text-white/40 tracking-widest uppercase pointer-events-auto">
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
               <span className="font-black text-white/20">BATTLE_CONSOLE</span>
               <Terminal className="w-3 h-3 text-white/10" />
            </div>
            <div className="space-y-2">
               {combatLog.map((log, i) => (
               <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className={`flex gap-2 ${i===0 ? 'text-brand-neon opacity-100 font-bold' : 'opacity-40'}`}
               >
                  <span className="text-white/10">{'>'}</span>
                  <span>{log}</span>
               </motion.div>
               ))}
            </div>
            <div className="mt-auto pt-4 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse shadow-[0_0_10px_#10b981]" />
                  <span className="text-[8px] text-brand-success font-black tracking-widest">ENCRYPTED_LINK_ACTIVE</span>
               </div>
               <span className="text-white/10">v.1.0.4</span>
            </div>
         </div>
      </div>
    </div>
  );
}
