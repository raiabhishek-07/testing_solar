"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, Shield, Timer, Heart, Trophy, AlertTriangle } from 'lucide-react';
import VideoBattle from '@/components/games/VideoBattle';

export default function MCQGame({ questions, onComplete }) {
  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [villainHealth, setVillainHealth] = useState(100);

  const current = questions[step];
  const progress = ((step) / questions.length) * 100;

  // Question Timer Effect
  useEffect(() => {
    if (result || timeLeft <= 0) {
      if (timeLeft === 0 && !result) {
        handleChoice(-1); // Auto-fail on time up
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, result]);

  // Reset timer on step change
  useEffect(() => {
    setTimeLeft(30);
  }, [step]);

  const handleChoice = (idx) => {
    if (result) return;
    
    if (idx === current.a) {
      setResult('correct');
      setScore(s => s + 1);
      
      // Reduce villain health (trigger cinematic feedback in UI)
      setVillainHealth(prev => Math.max(0, prev - (100 / questions.length)));

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
      
      // Reduce player health (trigger cinematic feedback in UI)
      setPlayerHealth(prev => Math.max(0, prev - (100 / questions.length)));

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

  return (
    <div className="relative space-y-8 w-full">
      {/* CINEMATIC VIDEO BACKGROUND */}
      <VideoBattle 
        playerHealth={playerHealth} 
        villainHealth={villainHealth} 
      />

      <div className="relative z-10 flex flex-col gap-6">
        {/* HUD AREA */}
        <div className="flex justify-between items-center gap-4 bg-black/40 p-4 rounded-3xl backdrop-blur-md border border-white/5 mt-10">
           {/* Timer Section */}
           <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl border ${timeLeft < 10 ? 'border-brand-danger bg-brand-danger/10 text-brand-danger animate-pulse' : 'border-white/10 text-white/50'}`}>
                 <Timer className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                 <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">BATTLE_SESSION_TIMER</p>
                 <p className={`text-2xl font-black font-pixel leading-none ${timeLeft < 10 ? 'text-brand-danger' : 'text-white'}`}>{timeLeft}s</p>
              </div>
           </div>

           {/* Health Summary */}
           <div className="flex items-center gap-6">
              <div className="flex flex-col items-end gap-1">
                 <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                       <Heart key={i} className={`w-3 h-3 ${i < (playerHealth/20) ? 'text-brand-danger fill-current' : 'text-white/10'}`} />
                    ))}
                 </div>
                 <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">KNIGHT_STAMINA</span>
              </div>
           </div>
        </div>

        {/* Question Container */}
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-black/60 relative p-10 rounded-[40px] border-2 border-white/10 shadow-2xl space-y-10"
        >
          {/* Section badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-purple text-[10px] font-black uppercase tracking-[0.2em]">
               <Zap className="w-4 h-4 fill-current" /> MAGIC QUIZ
            </div>
            {result === 'correct' && (
               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-brand-success font-black text-xs uppercase tracking-widest">+1 CORRECT_STRIKE</motion.div>
            )}
            {result === 'wrong' && (
               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-brand-danger font-black text-xs uppercase tracking-widest">ARMOR_PENETRATED</motion.div>
            )}
          </div>

          <h3 className="text-3xl md:text-4xl font-black text-white italic leading-tight uppercase tracking-tight shadow-sm text-center">{current.q}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.options.map((opt, i) => {
              const isCorrectAndChosen = (result === 'correct' && i === current.a);
              const isWrongChoice = (result === 'wrong' && i !== current.a);
              const isCorrectButNotChosen = (result === 'wrong' && i === current.a);
              
              return (
                <button
                  key={i}
                  onClick={() => handleChoice(i)}
                  disabled={!!result}
                  className={`p-6 rounded-[30px] border-2 text-left transition-all relative overflow-hidden group ${
                    isCorrectAndChosen
                      ? 'border-brand-success bg-brand-success/20 text-brand-success'
                      : isWrongChoice
                      ? 'border-brand-danger/20 bg-brand-danger/5 text-brand-danger opacity-50'
                      : isCorrectButNotChosen
                      ? 'border-brand-success/40 bg-brand-success/5 text-brand-success/60'
                      : 'border-white/10 hover:border-brand-neon bg-white/5 text-white/50 hover:text-white hover:scale-[1.02]'
                  }`}
                >
                  <div className="relative z-10 flex items-center gap-4">
                    <span className="text-xs font-black uppercase opacity-20">{String.fromCharCode(65 + i)}.</span>
                    <span className="text-lg font-black uppercase italic tracking-tight">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Progress Footer */}
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mt-4 italic">
           <span>ENCOUNTER_STEP_{step + 1}</span>
           <span>REALM_STABILITY: {Math.floor(playerHealth)}%</span>
        </div>
      </div>
    </div>
  );
}
