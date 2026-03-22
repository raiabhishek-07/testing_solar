"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * SyntaxSorter — Token assembly game (arrange code tokens in order)
 * Props:
 *   puzzles: [{ tokens: string[], answer: string[] }]
 *   onComplete: () => void
 */
export default function SyntaxSorter({ puzzles, onComplete }) {
  const [step, setStep] = useState(0);
  const [assembled, setAssembled] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [wrong, setWrong] = useState(false);

  const current = puzzles[step];

  useEffect(() => {
    setShuffled([...current.tokens].sort(() => Math.random() - 0.5));
    setAssembled([]);
    setWrong(false);
  }, [step]);

  const addToken = (token) => {
    setAssembled(prev => [...prev, token]);
    setWrong(false);
  };

  const removeToken = (idx) => {
    setAssembled(prev => prev.filter((_, i) => i !== idx));
  };

  const verify = () => {
    if (assembled.join('') === current.answer.join('')) {
      if (step < puzzles.length - 1) {
        setTimeout(() => setStep(s => s + 1), 600);
      } else {
        setTimeout(() => onComplete(), 600);
      }
    } else {
      setWrong(true);
      setTimeout(() => {
        setAssembled([]);
        setWrong(false);
      }, 800);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-1">
        <p className="text-[9px] font-black text-brand-neon/40 uppercase tracking-[0.5em]">Puzzle {step + 1} of {puzzles.length}</p>
        <p className="text-white/40 text-xs font-black uppercase tracking-widest">Arrange the tokens to form valid code</p>
      </div>

      {/* Assembly zone */}
      <div
        className={`min-h-[64px] flex flex-wrap gap-2 p-5 rounded-2xl border-2 relative transition-all ${
          wrong
            ? 'border-brand-danger/50 bg-brand-danger/5'
            : assembled.length > 0
            ? 'border-brand-neon/30 bg-brand-neon/5'
            : 'border-white/5 bg-white/2'
        }`}
      >
        {assembled.length === 0 && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
            Click tokens below to assemble...
          </span>
        )}
        {assembled.map((t, i) => (
          <motion.button
            key={i}
            layoutId={`assembled-${i}`}
            onClick={() => removeToken(i)}
            className="px-4 py-2 bg-brand-neon text-black rounded-lg font-bold text-sm shadow-[0_0_8px_rgba(0,255,255,0.3)] hover:bg-brand-neon/80 transition-colors"
          >
            {t}
          </motion.button>
        ))}
      </div>

      {/* Token bar */}
      <div className="flex flex-wrap gap-3 justify-center">
        {shuffled.map((token, i) => {
          const used = assembled.includes(token) && assembled.indexOf(token) === assembled.findIndex(x => x === token);
          // Allow multiple uses if token appears multiple times
          const usedCount = assembled.filter(x => x === token).length;
          const totalCount = current.tokens.filter(x => x === token).length;
          const isExhausted = usedCount >= totalCount;

          return (
            <button
              key={i}
              disabled={isExhausted}
              onClick={() => !isExhausted && addToken(token)}
              className={`px-5 py-3 rounded-xl border-2 font-pixel text-sm transition-all ${
                isExhausted
                  ? 'opacity-20 border-white/5 cursor-not-allowed'
                  : 'border-brand-neon/30 bg-[#1a2f4a] text-white hover:border-brand-neon active:scale-95'
              }`}
            >
              {token}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setAssembled([])}
          className="flex-1 py-4 rounded-xl border-2 border-white/10 text-white/30 hover:text-white font-black text-xs uppercase"
        >
          CLEAR
        </button>
        <button
          onClick={verify}
          disabled={assembled.length === 0}
          className={`flex-[3] py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
            wrong
              ? 'bg-brand-danger/20 border-2 border-brand-danger/40 text-brand-danger'
              : assembled.length === 0
              ? 'bg-white/5 text-white/20 cursor-not-allowed'
              : 'bg-white text-black hover:bg-brand-neon hover:text-black active:scale-95'
          }`}
        >
          {wrong ? 'WRONG — RETRY' : 'VERIFY SYNTAX'}
        </button>
      </div>
    </div>
  );
}
