"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, ChevronRight, CheckCircle2, Skull, 
  Zap, Heart, AlertTriangle, ArrowLeft, Crosshair, Terminal
} from 'lucide-react';

const PhaserBattle = dynamic(() => import('./PhaserBattle'), { 
  ssr: false, 
  loading: () => <div className="absolute inset-0 z-0 bg-transparent" /> 
});

export default function BattlePipeline({ pipelineData, langLabel, onComplete, onBack }) {
  const [phase, setPhase] = useState('teaching'); 
  // phases: teaching -> practice -> battle_mcq -> boss_coding -> results

  // Teaching State
  const [cardIdx, setCardIdx] = useState(0);
  
  // Practice State
  const [pracIdx, setPracIdx] = useState(0);
  const [pracFeedback, setPracFeedback] = useState(null);
  
  // Battle State
  const maxEnemyHp = pipelineData.battle?.enemy?.maxHp || 100;
  const [enemyHp, setEnemyHp] = useState(maxEnemyHp);
  const [playerHp, setPlayerHp] = useState(100);
  const [mcqIdx, setMcqIdx] = useState(0);
  const [codingIdx, setCodingIdx] = useState(0);
  const [combatAction, setCombatAction] = useState(null);
  
  // Result State
  const [weakAreas, setWeakAreas] = useState([]);
  const [stats, setStats] = useState({ mcqCorrect: 0, codingCorrect: 0 });
  const [combatLog, setCombatLog] = useState(["BATTLE INITIALIZED..."]);

  const logCombat = (msg) => setCombatLog(prev => [msg, ...prev].slice(0, 4));

  // --- RENDERING HELPERS ---
  const renderHPBar = (current, max, isPlayer) => {
    const pct = Math.max(0, (current / max) * 100);
    const color = isPlayer ? (pct > 30 ? 'bg-brand-neon' : 'bg-red-500') : (pct > 40 ? 'bg-brand-orange' : 'bg-red-600');
    return (
      <div className="w-full">
        <div className="flex justify-between text-[10px] font-black uppercase mb-1 tracking-widest text-white/50">
          <span>{isPlayer ? 'YOUR HP' : pipelineData.battle.enemy.name}</span>
          <span>{current} / {max}</span>
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

  // --- TEACHING PHASE ---
  if (phase === 'teaching') {
    const cards = pipelineData.teaching || [];
    const card = cards[cardIdx];
    if (!card) return null;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#020610] text-white">
        <div className="w-full max-w-4xl relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 blur-[100px] rounded-full pointer-events-none" />
           
           <div className="flex justify-between items-center mb-8">
              <button onClick={onBack} className="p-3 bg-white/5 rounded-2xl border border-white/10 hover:border-brand-neon focus:outline-none transition-all">
                 <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                 {cards.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-500 ${i === cardIdx ? 'w-10 bg-brand-neon' : i < cardIdx ? 'w-4 bg-brand-success' : 'w-4 bg-white/10'}`} />
                 ))}
              </div>
           </div>

           <motion.div key={cardIdx} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }} className="bg-black/80 backdrop-blur-md border border-white/10 p-10 md:p-14 rounded-[40px] shadow-2xl">
              <div className="inline-flex px-4 py-1.5 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-[10px] font-black text-brand-neon uppercase tracking-[0.3em] mb-6">
                 Teaching Card {cardIdx + 1} of {cards.length}
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8">{card.title}</h2>
              <p className="text-white/80 text-xl leading-relaxed mb-10">{card.content}</p>
              
              {card.examples?.length > 0 && (
                 <div className="space-y-4">
                    {card.examples.map((ex, i) => (
                       <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                          <h4 className="font-bold text-brand-neon mb-2 flex items-center gap-2"><Zap className="w-4 h-4"/> {ex.title}</h4>
                          <p className="text-white/60 text-sm mb-4">{ex.explanation}</p>
                          <pre className="bg-black p-4 rounded-xl text-sm font-mono text-brand-neon/80 overflow-x-auto border border-white/5">{ex.code}</pre>
                       </div>
                    ))}
                 </div>
              )}

              <div className="mt-12 flex justify-end">
                 <button 
                   onClick={() => {
                     cardIdx + 1 < cards.length ? setCardIdx(cardIdx + 1) : setPhase('practice');
                   }}
                   className="px-10 py-5 bg-brand-neon text-black font-black text-sm uppercase tracking-widest rounded-2xl hover:scale-105 transition-all flex items-center gap-3 shadow-[0_0_30px_rgba(0,255,255,0.3)]"
                 >
                   {cardIdx + 1 < cards.length ? 'NEXT CARD' : 'ENTER PRACTICE MODE'} <ChevronRight className="w-5 h-5"/>
                 </button>
              </div>
           </motion.div>
        </div>
      </div>
    );
  }

  // --- PRACTICE PHASE ---
  if (phase === 'practice') {
    const pracs = pipelineData.practice || [];
    const prac = pracs[pracIdx];
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#030a08] text-white">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10 space-y-4">
             <div className="inline-flex px-4 py-1.5 rounded-full bg-brand-success/10 border border-brand-success/30 text-[10px] font-black text-brand-success uppercase tracking-[0.3em] animate-pulse">
                WARM-UP PRACTICE (NO HP LOSS)
             </div>
             <h2 className="text-3xl font-black uppercase italic tracking-tighter">Question {pracIdx + 1} of {pracs.length}</h2>
          </div>

          <motion.div key={pracIdx} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="bg-black/80 border 2 border-brand-success/20 p-8 md:p-12 rounded-[40px] shadow-[0_0_50px_rgba(16,185,129,0.1)]">
             <h3 className="text-2xl font-bold mb-8">{prac.q}</h3>
             
             {!pracFeedback ? (
               <div className="space-y-4">
                 {prac.options.map((opt, i) => (
                   <button 
                     key={i}
                     onClick={() => setPracFeedback(i === prac.a ? 'correct' : 'wrong')}
                     className="w-full text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-success hover:bg-brand-success/5 transition-all text-lg"
                   >
                     {opt}
                   </button>
                 ))}
               </div>
             ) : (
               <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={`p-8 rounded-3xl border-2 ${pracFeedback === 'correct' ? 'bg-brand-success/10 border-brand-success/30' : 'bg-red-500/10 border-red-500/30'}`}>
                 <h4 className={`text-2xl font-black uppercase italic mb-4 ${pracFeedback === 'correct' ? 'text-brand-success' : 'text-red-500'}`}>
                   {pracFeedback === 'correct' ? 'EXCELLENT' : 'INCORRECT'}
                 </h4>
                 <p className="text-white/80 text-lg mb-8">{prac.explanation}</p>
                 <button 
                   onClick={() => {
                     setPracFeedback(null);
                     pracIdx + 1 < pracs.length ? setPracIdx(pracIdx + 1) : setPhase('battle_mcq');
                   }}
                   className="w-full py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-black tracking-widest uppercase transition-all"
                 >
                   {pracIdx + 1 < pracs.length ? 'NEXT QUESTION' : 'START COMBAT MOCK'}
                 </button>
               </motion.div>
             )}
          </motion.div>
        </div>
      </div>
    );
  }

  // --- COMBAT UI (SHARED FOR BATTLE_MCQ & BOSS_CODING) ---
  const isCombat = phase === 'battle_mcq' || phase === 'boss_coding';
  const mcqs = pipelineData.battle?.mcq || [];
  const codings = pipelineData.battle?.coding || [];

  if (isCombat) {
     const handleMcq = (optIdx) => {
       const q = mcqs[mcqIdx];
       if (optIdx === q.a) {
         setEnemyHp(prev => Math.max(0, prev - q.damage));
         setStats(s => ({ ...s, mcqCorrect: s.mcqCorrect + 1 }));
         logCombat(`PLAYER STRIKES FOR ${q.damage} DMG! [MCQ]`);
         setCombatAction({ type: 'player_attack', id: Date.now() });
       } else {
         setPlayerHp(prev => Math.max(0, prev - 10));
         logCombat(`ENEMY COUNTERS FOR 10 DMG! MISS: ${q.topic}`);
         if (q.topic && !weakAreas.includes(q.topic)) setWeakAreas(prev => [...prev, q.topic]);
         setCombatAction({ type: 'enemy_attack', id: Date.now() });
       }
       setTimeout(() => {
         mcqIdx + 1 < mcqs.length ? setMcqIdx(mcqIdx + 1) : setPhase('boss_coding');
       }, 800);
    };

    const handleCodingSubmit = (userAnswer) => {
       const q = codings[codingIdx];
       const correctAns = q.type === 'debug' ? q.missing : q.answer;
       const isCorrect = userAnswer.trim() === correctAns;

       if (isCorrect) {
          setEnemyHp(prev => Math.max(0, prev - q.damage));
          setStats(s => ({ ...s, codingCorrect: s.codingCorrect + 1 }));
          logCombat(`CRITICAL HIT! ALGORITHM EXCECUTED FOR ${q.damage} DMG!`);
          setCombatAction({ type: 'player_attack', id: Date.now() });
       } else {
          setPlayerHp(prev => Math.max(0, prev - 25));
          logCombat(`BOSS STRIKES BACK MASSIVELY FOR 25 DMG!`);
          if (q.topic && !weakAreas.includes(q.topic)) setWeakAreas(prev => [...prev, q.topic]);
          setCombatAction({ type: 'enemy_attack', id: Date.now() });
       }

       setTimeout(() => {
          codingIdx + 1 < codings.length ? setCodingIdx(codingIdx + 1) : setPhase('results');
       }, 1500);
    };

    return (
      <div className="min-h-screen flex flex-col p-6 bg-[#010202] text-white overflow-hidden relative">
        <PhaserBattle actionTrigger={combatAction} />
        
        {/* HUD */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-12 relative z-10 pt-4 pointer-events-none">
           {/* Player HP */}
           <div className="w-full md:w-1/3 p-4 bg-black/80 border border-white/5 rounded-3xl backdrop-blur-sm pointer-events-auto">
             {renderHPBar(playerHp, 100, true)}
           </div>
           
           {/* Phase Title */}
           <div className="shrink-0 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center mb-2 animate-pulse">
                {phase === 'battle_mcq' ? <Crosshair className="w-8 h-8 text-brand-orange" /> : <Skull className="w-8 h-8 text-red-500" />}
             </div>
             <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">
               {phase === 'battle_mcq' ? 'TACTICAL COMBAT' : 'BOSS OVERRIDE'}
             </p>
           </div>

           {/* Enemy HP */}
           <div className="w-full md:w-1/3 p-4 bg-black/80 border border-red-500/20 rounded-3xl backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0.1)] pointer-events-auto">
             {renderHPBar(enemyHp, maxEnemyHp, false)}
           </div>
        </div>

        {/* EMPTY SPACE - LET PHASER SPRITES FIGHT HERE */}
        <div className="flex-1 min-h-[300px] pointer-events-none" />

        {/* BOTTOM HUD AREA (QUESTIONS & LOGS) */}
        <div className="w-full max-w-7xl mx-auto relative z-10 pointer-events-none flex flex-col lg:flex-row gap-6 items-end pb-8">
           
           {/* LEFT: INTERACTIVE QUESTIONS / CODE BOX */}
           <div className="flex-1 w-full pointer-events-auto">
             {phase === 'battle_mcq' && (
               <motion.div key={mcqIdx} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="bg-black/80 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden rounded-t-3xl">
                     <div className="h-full bg-brand-orange" style={{ width: `${(mcqIdx / mcqs.length) * 100}%` }} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-6 leading-tight">{mcqs[mcqIdx]?.q}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {mcqs[mcqIdx]?.options.map((opt, i) => (
                        <button 
                          key={i} onClick={() => handleMcq(i)}
                          className="py-4 px-6 text-left rounded-2xl bg-white/5 border border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 transition-all font-bold text-white/80 text-sm"
                        >
                           {opt}
                        </button>
                     ))}
                  </div>
               </motion.div>
             )}

             {phase === 'boss_coding' && (
               <motion.div key={codingIdx} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="bg-black/90 backdrop-blur-md border border-red-500/30 p-8 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.15)] relative">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full mb-4 text-red-500 font-black text-[10px] tracking-widest uppercase">
                    <Terminal className="w-4 h-4"/> {codings[codingIdx]?.title}
                  </div>
                  
                  <pre className="p-4 bg-black rounded-2xl font-mono text-sm text-brand-neon/90 border border-white/5 shadow-inner mb-4 overflow-x-auto whitespace-pre-wrap">
                    {codings[codingIdx]?.code}
                  </pre>

                  {codings[codingIdx]?.hint && (
                    <p className="text-white/40 text-xs mb-4 italic border-l-2 border-white/10 pl-4">{codings[codingIdx].hint}</p>
                  )}

                  <form onSubmit={(e) => { e.preventDefault(); handleCodingSubmit(e.target.elements.ans.value); }} className="flex gap-3">
                     <input 
                       name="ans" type="text" placeholder="Type solution perfectly..." autoComplete="off" autoFocus
                       className="flex-1 bg-black/50 border border-white/10 focus:border-red-500/50 rounded-xl px-4 py-3 text-white font-mono text-sm outline-none transition-all placeholder:text-white/20"
                     />
                     <button type="submit" className="px-8 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 text-xs">
                       EXECUTE
                     </button>
                  </form>
               </motion.div>
             )}
           </div>

           {/* RIGHT: COMBAT LOG */}
           <div className="w-full lg:w-1/3 bg-black/70 backdrop-blur-md border border-white/10 rounded-3xl p-6 h-48 overflow-hidden flex flex-col font-mono text-[10px] text-white/40 tracking-widest uppercase pointer-events-auto">
              <div className="mb-4 text-white/20 border-b border-white/5 pb-2 font-black">BATTLE CONSOLE</div>
              {combatLog.map((log, i) => (
                <div key={i} className={`mb-1.5 ${i===0 ? 'text-brand-neon opacity-100 font-bold drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]' : 'opacity-40'}`}>
                   {'>'} {log}
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  // --- RESULTS PHASE ---
  if (phase === 'results') {
    const isWin = playerHp > 0;
    const accuracy = Math.round(((stats.mcqCorrect + stats.codingCorrect) / (mcqs.length + codings.length)) * 100);

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-black text-white">
        <div className={`w-full max-w-2xl bg-black border-2 p-12 rounded-[40px] text-center shadow-2xl relative overflow-hidden ${isWin ? 'border-brand-success/30' : 'border-red-600/30'}`}>
           <div className={`absolute inset-0 opacity-10 ${isWin ? 'bg-brand-success' : 'bg-red-600'}`} />
           
           <h2 className={`text-6xl md:text-8xl font-black font-pixel tracking-tighter uppercase mb-2 ${isWin ? 'text-brand-success' : 'text-red-500'}`}>
             {isWin ? 'VICTORY' : 'DEFEAT'}
           </h2>
           <p className="text-white/40 text-sm font-black tracking-[0.4em] uppercase mb-12">Combat Terminated</p>

           <div className="grid grid-cols-3 gap-4 mb-12">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-3xl font-black">{stats.mcqCorrect}/{mcqs.length}</p>
                <p className="text-[9px] uppercase tracking-widest text-white/30 mt-2">Tactical Hits</p>
             </div>
             <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-3xl font-black">{stats.codingCorrect}/{codings.length}</p>
                <p className="text-[9px] uppercase tracking-widest text-white/30 mt-2">Boss Strikes</p>
             </div>
             <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                <p className={`text-3xl font-black ${accuracy >= 80 ? 'text-brand-success' : 'text-brand-orange'}`}>{accuracy}%</p>
                <p className="text-[9px] uppercase tracking-widest text-white/30 mt-2">Accuracy</p>
             </div>
           </div>

           {weakAreas.length > 0 && (
             <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl mb-12 text-left">
                <h4 className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4"/> Critical Weak Areas Detected
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(weakAreas)].map((w, i) => (
                    <span key={i} className="px-3 py-1 bg-red-500/20 text-red-300 text-xs rounded-full border border-red-500/30">{w}</span>
                  ))}
                </div>
             </div>
           )}

           <button 
             onClick={() => isWin ? onComplete() : onBack()}
             className={`relative z-50 w-full py-6 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isWin ? 'bg-brand-success text-black hover:scale-105 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : 'bg-white/10 hover:bg-white/20'}`}
           >
             {isWin ? 'CLAIM EXPERIENCE & RETURN' : 'RETURN TO HUB & RETRY'}
           </button>
        </div>
      </div>
    );
  }

  return null;
}
