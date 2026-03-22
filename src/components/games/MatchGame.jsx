"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

/**
 * MatchGame — Reusable Match the Following Engine
 * Props:
 *   pairs: [{ concept: string, match: string }]
 *   onComplete: () => void
 */
export default function MatchGame({ pairs, onComplete }) {
  const [matchSelections, setMatchSelections] = useState({});
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [shuffledMatches, setShuffledMatches] = useState([]);
  const [flashWrong, setFlashWrong] = useState(false);
  const [flashRight, setFlashRight] = useState(null);

  useEffect(() => {
    setShuffledMatches([...pairs.map(p => p.match)].sort(() => Math.random() - 0.5));
    setMatchSelections({});
    setSelectedConcept(null);
  }, [pairs]);

  const handleMatch = (matchValue) => {
    if (!selectedConcept) return;
    const correct = pairs.find(p => p.concept === selectedConcept)?.match;
    if (matchValue === correct) {
      const newSels = { ...matchSelections, [selectedConcept]: matchValue };
      setMatchSelections(newSels);
      setFlashRight(selectedConcept);
      setSelectedConcept(null);
      setTimeout(() => setFlashRight(null), 600);
      if (Object.keys(newSels).length === pairs.length) {
        setTimeout(() => onComplete(), 700);
      }
    } else {
      setFlashWrong(true);
      setTimeout(() => {
        setFlashWrong(false);
        setSelectedConcept(null);
      }, 700);
    }
  };

  const progress = Object.keys(matchSelections).length;

  return (
    <div className="space-y-6 w-full">
      {/* Progress */}
      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/20">
        <span>Matched {progress} / {pairs.length}</span>
        {selectedConcept && <span className="text-brand-neon animate-pulse">ACTIVE: {selectedConcept}</span>}
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-brand-success rounded-full"
          animate={{ width: `${(progress / pairs.length) * 100}%` }}
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
        {/* Left — Concepts */}
        <div className="space-y-2">
          <p className="text-[8px] font-black uppercase tracking-widest text-brand-neon/40 text-center mb-3">Concept</p>
          {pairs.map(p => {
            const isDone = !!matchSelections[p.concept];
            const isSelected = selectedConcept === p.concept;
            const justMatched = flashRight === p.concept;
            return (
              <button
                key={p.concept}
                disabled={isDone}
                onClick={() => setSelectedConcept(p.concept)}
                className={`w-full p-4 rounded-2xl border-2 text-left text-xs font-black uppercase tracking-wider transition-all ${
                  isDone
                    ? 'border-brand-success/30 bg-brand-success/5 opacity-40 cursor-default grayscale'
                    : justMatched
                    ? 'border-brand-success bg-brand-success/20 text-brand-success'
                    : isSelected
                    ? 'border-brand-neon bg-brand-neon/10 shadow-[0_0_15px_rgba(0,255,255,0.2)]'
                    : 'border-white/10 bg-[#0d1b2e]/50 hover:border-white/30 text-white'
                }`}
              >
                {isDone && <CheckCircle2 className="w-3 h-3 inline mr-2 text-brand-success" />}
                {p.concept}
              </button>
            );
          })}
        </div>

        {/* Right — Definitions */}
        <div className="space-y-2">
          <p className="text-[8px] font-black uppercase tracking-widest text-brand-neon/40 text-center mb-3">Definition</p>
          {shuffledMatches.map(m => {
            const isMatched = Object.values(matchSelections).includes(m);
            return (
              <button
                key={m}
                disabled={!selectedConcept || isMatched}
                onClick={() => handleMatch(m)}
                className={`w-full p-4 rounded-2xl border-2 text-[10px] font-medium italic transition-all min-h-[52px] text-left ${
                  isMatched
                    ? 'border-brand-success/20 opacity-20 cursor-default'
                    : !selectedConcept
                    ? 'opacity-30 border-white/5 cursor-not-allowed text-white/20'
                    : flashWrong
                    ? 'border-brand-danger/50 animate-pulse'
                    : 'border-white/10 hover:border-brand-orange hover:bg-brand-orange/5 text-white active:scale-95'
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
