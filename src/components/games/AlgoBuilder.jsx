"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

/**
 * AlgoBuilder — Step-ordering game
 * Props:
 *   steps: [{ id, text, order }]  — correct order is determined by 'order' field
 *   title: string  — e.g. "Make Tea"
 *   onComplete: () => void
 */
export default function AlgoBuilder({ steps, title = "Arrange the Steps", onComplete }) {
  const [list, setList] = useState([]);
  const [verified, setVerified] = useState(false);
  const [wrong, setWrong] = useState(false);

  useEffect(() => {
    setList([...steps].sort(() => Math.random() - 0.5));
    setVerified(false);
    setWrong(false);
  }, [steps]);

  const move = (index, direction) => {
    const newList = [...list];
    const target = index + direction;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    setList(newList);
    setWrong(false);
  };

  const verify = () => {
    const isCorrect = list.every((item, idx) => item.order === idx + 1);
    if (isCorrect) {
      setVerified(true);
      setTimeout(() => onComplete(), 900);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 1000);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="text-center space-y-1">
        <p className="text-[9px] font-black text-brand-neon/40 uppercase tracking-[0.5em]">Algorithm Challenge</p>
        <h3 className="text-2xl font-black text-white italic uppercase">{title}</h3>
        <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">Arrange steps in the correct order</p>
      </div>

      <div className="space-y-2">
        {list.map((item, idx) => (
          <motion.div
            layout
            key={item.id}
            className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${
              verified
                ? 'border-brand-success/40 bg-brand-success/5'
                : wrong
                ? 'border-brand-danger/30 bg-brand-danger/5'
                : 'border-white/10 bg-[#0d1b2e]/40'
            }`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-8 h-8 rounded-lg text-sm font-black flex items-center justify-center border ${verified ? 'border-brand-success/40 text-brand-success' : 'border-white/10 text-white/20'}`}>
                {idx + 1}
              </div>
              <span className="text-base font-bold text-white uppercase italic">{item.text}</span>
            </div>
            {!verified && (
              <div className="flex flex-col gap-1">
                <button onClick={() => move(idx, -1)} className="p-1 hover:text-brand-neon transition-colors rounded">
                  <ChevronRight className="w-4 h-4 -rotate-90" />
                </button>
                <button onClick={() => move(idx, 1)} className="p-1 hover:text-brand-neon transition-colors rounded">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </button>
              </div>
            )}
            {verified && <CheckCircle2 className="w-5 h-5 text-brand-success" />}
          </motion.div>
        ))}
      </div>

      {!verified && (
        <button
          onClick={verify}
          className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
            wrong
              ? 'bg-brand-danger/20 border-2 border-brand-danger/40 text-brand-danger'
              : 'bg-brand-neon text-black hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(0,255,255,0.2)]'
          }`}
        >
          {wrong ? 'WRONG ORDER — TRY AGAIN' : 'VERIFY ALGORITHM'}
        </button>
      )}
    </div>
  );
}
