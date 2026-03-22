"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, CheckCircle2, Lock, ArrowRight, ArrowLeft, Star,
  Terminal, Zap, ChevronRight, BookOpen, X
} from 'lucide-react';
import MCQGame from '@/components/games/MCQGame';
import MatchGame from '@/components/games/MatchGame';
import YesNoGame from '@/components/games/YesNoGame';
import AlgoBuilder from '@/components/games/AlgoBuilder';
import SyntaxSorter from '@/components/games/SyntaxSorter';
import GameContainer from '@/components/doc/MiniGames';

export default function LevelTemplate({
  langLabel = 'LEVEL_SYSTEM',
  foundationStages = [],
  testStages = [],
  onComplete,
  onBack,
  onViewDoc
}) {
  const [phase, setPhase] = useState('foundation');
  const [activeStage, setActiveStage] = useState(null);
  const [completedStages, setCompletedStages] = useState([]);
  const [activeExampleIdx, setActiveExampleIdx] = useState(0);

  // Generate unique storage key
  const storageKey = `clash_progress_${langLabel}_${activeStage?.id || 'hub'}`;
  const currentList = phase === 'foundation' ? foundationStages : testStages;

  // Load progress on mount or phase change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const curUser = JSON.parse(localStorage.getItem('clash_user') || '{}');
      
      // SUPER TESTER BYPASS: Unlock everything immediately
      if (curUser.id === 1773809647903) {
        setCompletedStages(currentList.map(s => s.id));
      } else {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setCompletedStages(JSON.parse(saved));
        } else {
          setCompletedStages([]);
        }
      }
    }
  }, [storageKey, currentList.length]); // Re-sync when switching phases or list size changes

  // Save progress when completedStages change
  useEffect(() => {
    if (typeof window !== 'undefined' && completedStages.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(completedStages));
    }
  }, [completedStages, storageKey]);

  const isPhaseComplete = completedStages.length === currentList.length;

  const finishStage = (id) => {
    const newCompleted = completedStages.includes(id)
      ? completedStages
      : [...completedStages, id];
    setCompletedStages(newCompleted);
    const nextIdx = currentList.findIndex(s => s.id === id) + 1;
    if (nextIdx < currentList.length) {
      setActiveStage(currentList[nextIdx]);
      setActiveExampleIdx(0);
    } else {
      setActiveStage(null);
    }
  };

  const enterTestPhase = () => {
    setPhase('test');
    setCompletedStages([]);
    setActiveStage(null);
  };

  // ── MAP VIEW ─────────────────────────────────────────────────────────
  if (!activeStage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 font-sans">
        {/* Header */}
        <header className="text-center mb-14 space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-neon/20 bg-brand-neon/5 text-brand-neon backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{langLabel}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-pixel uppercase text-white tracking-tighter
                         drop-shadow-[0_0_40px_rgba(0,255,255,0.15)]">
            {phase === 'foundation'
              ? <><span className="text-brand-neon">{foundationStages.length}</span> CORE PROTOCOLS</>
              : <><span className="text-brand-orange">5</span> ELITE TESTS</>}
          </h1>
          <p className="text-white/25 text-[10px] font-black uppercase tracking-[0.35em]">
            {phase === 'foundation'
              ? 'Complete every protocol before advancing to the Elite Tests.'
              : 'Prove mastery through 5 interactive challenges.'}
          </p>

          {/* Phase toggle pills */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className={`flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${phase === 'foundation' ? 'border-brand-neon text-brand-neon bg-brand-neon/10' : 'border-white/10 text-white/20'}`}>
              <span className="w-4 h-4 rounded-full bg-current text-black text-[7px] flex items-center justify-center font-black">1</span>
              FOUNDATION
            </div>
            <ChevronRight className="w-4 h-4 text-white/20" />
            <div className={`flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all ${phase === 'test' ? 'border-brand-orange text-brand-orange bg-brand-orange/10' : 'border-white/10 text-white/20'}`}>
              <span className="w-4 h-4 rounded-full bg-current text-black text-[7px] flex items-center justify-center font-black">2</span>
              ELITE TESTS
            </div>
          </div>
        </header>

        {/* Stage Grid */}
        <div className={`grid gap-4 w-full max-w-7xl px-4 ${
          phase === 'foundation'
            ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6'
            : 'grid-cols-1 md:grid-cols-5'
        }`}>
          {currentList.map((stage, idx) => {
            const Icon = stage.icon;
            const isLocked = idx > 0 && !completedStages.includes(currentList[idx - 1].id);
            const isCompleted = completedStages.includes(stage.id);
            const isNext = !isCompleted && !isLocked && idx === completedStages.length;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.035, type: 'spring', stiffness: 300 }}
                whileHover={!isLocked ? { scale: 1.04, y: -6 } : {}}
                onClick={() => !isLocked && setActiveStage(stage)}
                className={`relative rounded-[28px] border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-3 overflow-hidden group
                  ${phase === 'foundation' ? 'p-6 min-h-[158px]' : 'p-8 min-h-[180px]'}
                  ${isLocked
                    ? 'opacity-20 border-white/5 pointer-events-none grayscale'
                    : isCompleted
                    ? 'border-brand-success/30 bg-[#021a0f]'
                    : isNext
                    ? 'border-brand-neon bg-[#001a1a] shadow-[0_0_30px_rgba(0,255,255,0.12)]'
                    : 'border-[#1a2e44] bg-[#050d14]/80 hover:border-brand-neon/60'
                  }`}
              >
                {/* Animated glow for next stage */}
                {isNext && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-neon/5 to-transparent pointer-events-none" />
                )}
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-success/5 to-transparent pointer-events-none" />
                )}

                {/* Stage number badge */}
                <div className={`absolute top-3 left-3 text-[8px] font-black px-2 py-0.5 rounded-full border ${
                  isCompleted ? 'border-brand-success/30 text-brand-success/50'
                  : isNext ? 'border-brand-neon/40 text-brand-neon/60'
                  : 'border-white/10 text-white/20'
                }`}>
                  {phase === 'foundation' ? `#${String(idx + 1).padStart(2, '0')}` : `T${idx + 1}`}
                </div>

                {/* Completed tick */}
                {isCompleted && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-success/20 border border-brand-success/40 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-brand-success" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 mt-4 transition-all ${
                  isCompleted
                    ? 'border-brand-success/40 text-brand-success bg-brand-success/10'
                    : isNext
                    ? 'border-brand-neon text-brand-neon bg-brand-neon/10 group-hover:bg-brand-neon group-hover:text-black'
                    : 'border-white/10 text-white/40 group-hover:border-brand-neon/50 group-hover:text-brand-neon'
                }`}>
                  {isLocked ? <Lock className="w-5 h-5 text-white/20" /> : <Icon className="w-6 h-6" />}
                </div>

                {/* Label */}
                <div className="space-y-1 px-1">
                  <p className={`text-[11px] font-black uppercase italic leading-tight line-clamp-2 ${
                    isCompleted ? 'text-brand-success/60' : isNext ? 'text-white' : 'text-white/50 group-hover:text-white'
                  }`}>
                    {stage.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        {phase === 'foundation' && (
          <div className="w-full max-w-7xl px-4 mt-10">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">
              <span>Progress</span>
              <span className="text-brand-neon">{completedStages.length} / {foundationStages.length} Synced</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-brand-neon rounded-full"
                animate={{ width: `${(completedStages.length / foundationStages.length) * 100}%` }}
                transition={{ type: 'spring', stiffness: 150 }}
              />
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-14 justify-center">
          {phase === 'foundation' ? (
            <>
              <button
                onClick={onBack}
                className="px-10 py-4 rounded-2xl bg-white/5 text-white/30 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white border border-white/5 transition-all"
              >
                ABORT_MISSION
              </button>
              {isPhaseComplete && (
                <motion.button
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={enterTestPhase}
                  className="px-14 py-5 rounded-2xl bg-brand-neon text-black font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(0,255,255,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                  ACTIVATE ELITE TESTS
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => { setPhase('foundation'); setCompletedStages(foundationStages.map(s => s.id)); }}
                className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-white/5 text-white/30 font-black text-[10px] uppercase tracking-[0.4em] hover:text-white border border-white/5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                REVIEW FOUNDATIONS
              </button>
              {isPhaseComplete && (
                <motion.button
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={onComplete}
                  className="px-14 py-5 rounded-2xl bg-brand-success text-black font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:scale-105 transition-all"
                >
                  INITIALIZE NEXT LEVEL →
                </motion.button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ── STAGE/TOPIC CARD VIEW ─────────────────────────────────────────────
  const stageIdx = currentList.findIndex(s => s.id === activeStage.id);
  const totalStages = currentList.length;
  const examples = activeStage.examples || [];
  const hasExamples = examples.length > 0;
  const currentExample = hasExamples ? examples[activeExampleIdx] : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeStage.id}-${activeExampleIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="relative"
          >
            {phase === 'foundation' ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-6">
                {/* LEFT PANEL — Content & Examples */}
                <div className="bg-[#030712]/90 backdrop-blur-xl border-2 border-white/5 rounded-[48px] p-8 md:p-12 flex flex-col min-h-[600px] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-brand-neon/5 blur-[120px] rounded-full pointer-events-none transition-all group-hover:bg-brand-neon/10" />
                  
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-neon/15 border border-brand-neon/30 flex items-center justify-center">
                        <span className="text-brand-neon font-black text-sm">{String(stageIdx + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-brand-neon/60 uppercase tracking-[0.4em] mb-1">{activeStage.title}</p>
                        <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter leading-none">
                          {activeStage.subtitle}
                        </h2>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setActiveStage(null)}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/20 hover:text-white hover:border-brand-neon/40 hover:bg-brand-neon/5 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1 space-y-8">
                    {activeExampleIdx === 0 && (
                       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                          <p className="text-white/70 text-lg leading-relaxed font-medium">
                            {activeStage.content}
                          </p>
                          {hasExamples && (
                             <div className="p-6 rounded-3xl bg-brand-neon/5 border border-brand-neon/10">
                                <p className="text-[10px] font-black text-brand-neon uppercase tracking-widest mb-3">LEARNING PATHWAY</p>
                                <p className="text-white/40 text-sm">We have prepared {examples.length} hands-on examples to master this protocol. Click "Next Step" to begin.</p>
                             </div>
                          )}
                       </motion.div>
                    )}

                    {activeExampleIdx > 0 && currentExample && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                        <div className="flex items-center gap-3">
                           <div className="px-3 py-1 rounded-full bg-brand-neon/20 border border-brand-neon/30 text-brand-neon text-[10px] font-black uppercase tracking-widest">
                              Example {activeExampleIdx}
                           </div>
                           <h3 className="text-xl font-bold text-white italic">{currentExample.title}</h3>
                        </div>
                        
                        <div className="space-y-6">
                          <p className="text-white/80 text-lg leading-relaxed">
                            {currentExample.explanation}
                          </p>
                          
                          <div className="bg-black/60 rounded-3xl p-6 border border-white/5 font-mono text-sm overflow-x-auto">
                            <pre className="text-brand-neon/90">
                              <code>{currentExample.code}</code>
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Navigation Footer */}
                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex gap-2">
                       {hasExamples && [0, ...examples.map((_, i) => i + 1)].map((i) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${
                             i === activeExampleIdx ? 'w-8 bg-brand-neon' : i < activeExampleIdx ? 'w-4 bg-brand-success' : 'w-2 bg-white/10'
                          }`} />
                       ))}
                    </div>

                    <div className="flex gap-4">
                      {activeExampleIdx > 0 && (
                        <button
                          onClick={() => setActiveExampleIdx(prev => prev - 1)}
                          className="px-6 py-3 rounded-xl border border-white/10 text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
                        >
                          Previous
                        </button>
                      )}
                      
                      {activeExampleIdx < examples.length ? (
                        <button
                          onClick={() => setActiveExampleIdx(prev => prev + 1)}
                          className="bg-brand-neon text-black px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:scale-105 transition-all flex items-center gap-2"
                        >
                          {activeExampleIdx === 0 ? 'START EXAMPLES' : 'NEXT STEP'}
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => finishStage(activeStage.id)}
                          className="bg-brand-success text-black px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-105 transition-all flex items-center gap-2"
                        >
                          COMPLETE PROTOCOL
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL — Insights & Terminal */}
                <div className="flex flex-col gap-6">
                  {/* Key Insight */}
                  <div className="bg-brand-neon/5 border-2 border-brand-neon/20 rounded-[40px] p-8 flex-1 relative overflow-hidden group/insight">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-neon/10 blur-[60px] rounded-full group-hover/insight:scale-150 transition-transform duration-1000" />
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 bg-brand-neon/20 rounded-xl border border-brand-neon/40 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                        <Star className="w-5 h-5 text-brand-neon fill-brand-neon" />
                      </div>
                      <span className="text-[10px] font-black text-brand-neon uppercase tracking-[0.5em]">MISSION_INTEL</span>
                    </div>
                    <p className="text-white/80 font-bold text-lg leading-relaxed italic border-l-2 border-brand-neon/30 pl-6">
                      {activeStage.keyPoint}
                    </p>
                    
                    <div className="mt-10">
                       <button
                         onClick={() => onViewDoc ? onViewDoc(activeStage.title) : null}
                         className="w-full bg-white/5 border border-white/10 py-4 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] hover:bg-brand-neon/10 hover:text-brand-neon hover:border-brand-neon/30 transition-all shadow-xl"
                       >
                         <BookOpen className="w-4 h-4" />
                         OPEN_CODEX_DATABASE
                       </button>
                    </div>
                  </div>

                  {/* Terminal */}
                  <div className="bg-[#020610] border-2 border-white/5 rounded-[40px] p-8 font-mono shadow-2xl relative overflow-hidden">
                    <div className="flex items-center gap-2.5 mb-6">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      <span className="ml-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">CORE_TERMINAL v4.2</span>
                    </div>
                    <div className="space-y-3 text-[12px] leading-relaxed">
                      <p className="text-brand-neon/40 tracking-tighter flex items-center gap-2">
                         <span className="w-1.5 h-1.5 rounded-full bg-brand-neon/40 animate-pulse" />
                         {'>'} INITIALIZING stage_{String(stageIdx + 1).padStart(2, '0')}
                      </p>
                      <p className="text-white/20">{'>'} load_status: <span className="text-brand-success/60 italic font-bold">READY</span></p>
                      <p className="text-white/20">{'>'} examples_discovered: <span className="text-white/60">{examples.length} UNIT(S)</span></p>
                      <p className="text-white/20">{'>'} protocol_step: <span className="text-brand-neon/60">{activeExampleIdx}/{examples.length}</span></p>
                      
                      <div className="mt-8 pt-6 border-t border-white/5">
                         <p className="text-brand-neon flex items-center gap-2">
                           <ChevronRight className="w-4 h-4 animate-pulse" />
                           <span className="text-brand-neon/80 uppercase font-black text-[10px] tracking-widest">
                              {activeExampleIdx === 0 ? 'awaiting_intel_sync...' : 'processing_sub_logic...'}
                           </span>
                         </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStage(null)}
                    className="flex items-center justify-center gap-3 py-5 rounded-[28px] bg-white/5 border border-white/10 text-[11px] font-black text-white/30 uppercase tracking-[0.4em] hover:bg-white/10 hover:text-white transition-all group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    RETURN_TO_HUB
                  </button>
                </div>
              </div>
            ) : (
              /* ── ELITE TEST LAYOUT ──────────────────────────────── */
              <div className="bg-[#03070f]/97 backdrop-blur-[60px] border-2 border-white/10 rounded-[48px] relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-10 py-8 border-b border-white/5">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-brand-orange/15 rounded-2xl border border-brand-orange/30 shadow-[0_0_20px_rgba(255,165,0,0.15)]">
                      <activeStage.icon className="w-7 h-7 text-brand-orange" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-brand-orange/60 uppercase tracking-[0.4em] mb-1">{activeStage.title}</p>
                      <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{activeStage.subtitle}</h2>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="flex gap-2 hidden md:flex">
                      {testStages.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${
                          completedStages.includes(testStages[i]?.id) ? 'w-8 bg-brand-success' : i === stageIdx ? 'w-10 bg-brand-orange' : 'w-3 bg-white/10'
                        }`} />
                      ))}
                    </div>
                    <button 
                      onClick={() => setActiveStage(null)}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/30 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all flex items-center gap-3 group"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">ABORT_TEST</span>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                    >
                      {activeStage.type === 'mcq' && <MCQGame questions={activeStage.gameData} onComplete={() => finishStage(activeStage.id)} />}
                      {activeStage.type === 'match' && <MatchGame pairs={activeStage.gameData} onComplete={() => finishStage(activeStage.id)} />}
                      {activeStage.type === 'yesno' && <YesNoGame questions={activeStage.gameData} onComplete={() => finishStage(activeStage.id)} />}
                      {activeStage.type === 'algo' && <AlgoBuilder steps={activeStage.gameData.steps} title={activeStage.gameData.title} onComplete={() => finishStage(activeStage.id)} />}
                      {activeStage.type === 'sorter' && <SyntaxSorter puzzles={activeStage.gameData} onComplete={() => finishStage(activeStage.id)} />}
                      {['factory', 'robot', 'bug', 'coding'].includes(activeStage.type) && (
                         <GameContainer 
                            type={activeStage.type} 
                            config={activeStage.gameData} 
                            onComplete={() => finishStage(activeStage.id)} 
                         />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center px-12 py-6 border-t border-white/5 bg-brand-orange/5">
                  <button
                    onClick={() => setActiveStage(null)}
                    className="flex items-center gap-3 text-[11px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-white transition-all group"
                  >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    MISSION_HUB
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(255,165,0,0.5)] animate-pulse" />
                    <span className="text-[9px] font-black text-brand-orange/50 uppercase tracking-widest">ENHANCED_EVALUATION_MODE</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>

  );
}
