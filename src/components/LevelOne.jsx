"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Code, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  Zap, 
  Shield, 
  Gamepad2,
  Lock,
  Star,
  Play
} from 'lucide-react';

const STAGES = [
  {
    id: 1,
    title: "THE ECHO CHAMBER",
    subtitle: "Master the Print() Command",
    icon: Terminal,
    desc: "The ancient printers are offline. Rebuild the instruction sequence to broadcast your first signal.",
    xp: 150
  },
  {
    id: 2,
    title: "VARIABLE VAULT",
    subtitle: "Data Type Synchronization",
    icon: Layers,
    desc: "Unlabeled data cores are leaking. Correct the variable types before the system crashes.",
    xp: 200
  },
  {
    id: 3,
    title: "SYNTAX STRIKE",
    subtitle: "Rule Recognition",
    icon: Zap,
    desc: "The compiler is rejecting your thought patterns. Identify the perfect syntax to breach the core.",
    xp: 250
  }
];

export default function LevelOne({ onComplete, onBack, onViewDoc }) {
  const [activeStage, setActiveStage] = useState(null); // null = overworld map
  const [completedStages, setCompletedStages] = useState([]);
  const [gameStep, setGameStep] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // playing, won, lost

  // --- GAME 1: ECHO CHAMBER (Sorter) ---
  const game1Data = [
    {
      lines: ["print(", "'Hello World'", ")"],
      shuffled: ["'Hello World'", ")", "print("],
      hint: "Always start with the command, then the content in brackets."
    },
    {
      lines: ["name =", "'Hero'", "print(name)"],
      shuffled: ["print(name)", "'Hero'", "name ="],
      hint: "Assign the value first, then print the variable name."
    }
  ];
  const [g1Current, setG1Current] = useState([]);
  
  const handleG1Drop = (item) => {
    setG1Current([...g1Current, item]);
  };

  const checkG1 = () => {
    const isCorrect = g1Current.join(' ') === game1Data[gameStep].lines.join(' ');
    if (isCorrect) {
      if (gameStep < game1Data.length - 1) {
        setGameStep(gameStep + 1);
        setG1Current([]);
      } else {
        finishStage(1);
      }
    } else {
      setG1Current([]);
    }
  };

  // --- GAME 2: VARIABLE VAULT (Matching) ---
  const game2Data = [
    { key: "power_level", value: "9000", type: "Integer" },
    { key: "user_name", value: "'Binary'", type: "String" },
    { key: "is_connected", value: "True", type: "Boolean" },
    { key: "cpu_temp", value: "45.5", type: "Float" }
  ];
  const [g2Selections, setG2Selections] = useState({});
  const [g2SelectedKey, setG2SelectedKey] = useState(null);
  const [shuffledG2Types, setShuffledG2Types] = useState([]);

  useEffect(() => {
    if (activeStage?.id === 2) {
      setShuffledG2Types([...Array.from(new Set(game2Data.map(d => d.type)))].sort(() => Math.random() - 0.5));
    }
  }, [activeStage]);

  const checkG2 = (type) => {
    if (!g2SelectedKey) return;
    const item = game2Data.find(d => d.key === g2SelectedKey);
    if (item.type === type) {
      setG2Selections({ ...g2Selections, [g2SelectedKey]: true });
      setG2SelectedKey(null);
      if (Object.keys(g2Selections).length + 1 === game2Data.length) {
        finishStage(2);
      }
    } else {
      setG2SelectedKey(null);
      // Optional: Add shake animation state
    }
  };

  // --- GAME 3: SYNTAX STRIKE (Recognition) ---
  const game3Data = [
    {
      code: "1_level = 'Expert'",
      isValid: false,
      reason: "Variable names cannot start with numbers."
    },
    {
      code: "status = True",
      isValid: true,
      reason: "Correct boolean assignment."
    },
    {
      code: "print 'Welcome'",
      isValid: false,
      reason: "Missing parentheses for print() function."
    }
  ];

  const handleG3Choice = (choice) => {
    if (choice === game3Data[gameStep].isValid) {
      if (gameStep < game3Data.length - 1) {
        setGameStep(gameStep + 1);
      } else {
        finishStage(3);
      }
    } else {
      setGameStatus('lost');
    }
  };

  const finishStage = (id) => {
    if (!completedStages.includes(id)) {
      setCompletedStages([...completedStages, id]);
    }
    setGameStatus('won');
  };

  const handleNextStage = () => {
    const currentIdx = STAGES.findIndex(s => s.id === activeStage.id);
    const nextStage = STAGES[currentIdx + 1];
    
    if (nextStage) {
      setActiveStage(nextStage);
      setGameStep(0);
      setG1Current([]);
      setG2Selections({});
      setGameStatus('playing');
    } else {
      setActiveStage(null); // All stages done
      setGameStatus('playing');
    }
  };

  const resetToMap = () => {
    setActiveStage(null);
    setGameStep(0);
    setG1Current([]);
    setG2Selections({});
    setGameStatus('playing');
  };

  useEffect(() => {
    if (completedStages.length === STAGES.length) {
      // Final completion
    }
  }, [completedStages]);

  // --- RENDER MAP ---
  if (!activeStage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <header className="text-center mb-16 space-y-4">
           <div className="flex items-center justify-center gap-2 text-brand-neon">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.5em]">SYSTEM_RECOVERY_PHASE</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black font-pixel uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Level 1: First Code
           </h1>
           <p className="text-white/40 text-xs md:text-sm font-black uppercase tracking-widest max-w-xl mx-auto leading-relaxed">
              Complete the 3 sub-missions to master the core syntax of the realm. 
              The journey to the logic core starts here.
           </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
           {STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isLocked = idx > 0 && !completedStages.includes(STAGES[idx-1].id);
              const isCompleted = completedStages.includes(stage.id);

              return (
                 <motion.div
                    key={stage.id}
                    whileHover={!isLocked ? { y: -10, scale: 1.02 } : {}}
                    className={`relative p-8 rounded-[40px] border-2 transition-all group overflow-hidden ${
                       isLocked 
                        ? 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed' 
                        : isCompleted 
                          ? 'bg-brand-success/5 border-brand-success/30'
                          : 'bg-[#0a121e]/80 border-[#1e3a5f] cursor-pointer hover:border-brand-neon shadow-2xl'
                    }`}
                    onClick={() => !isLocked && setActiveStage(stage)}
                 >
                    {/* Background Glow */}
                    {!isLocked && (
                       <div className={`absolute -bottom-20 -right-20 w-48 h-48 blur-[80px] rounded-full transition-colors ${
                          isCompleted ? 'bg-brand-success/10' : 'bg-brand-neon/10'
                       }`} />
                    )}

                    <div className="relative z-10 space-y-6">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${
                          isLocked ? 'bg-white/5 border-white/10' : 'bg-brand-neon/5 border-brand-neon/30 group-hover:bg-brand-neon group-hover:text-black transition-all'
                       }`}>
                          {isLocked ? <Lock className="w-6 h-6 text-white/20" /> : <Icon className="w-8 h-8" />}
                       </div>

                       <div>
                          <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">{stage.title}</h3>
                          <p className="text-brand-neon/60 text-[10px] font-black uppercase tracking-widest mt-1">{stage.subtitle}</p>
                       </div>

                       <p className="text-white/40 text-xs font-medium leading-relaxed uppercase">
                          {stage.desc}
                       </p>

                       <div className="pt-6 flex justify-between items-center border-t border-white/5">
                          <div className="flex items-center gap-2">
                             <div className="w-6 h-6 rounded bg-brand-neon/10 flex items-center justify-center">
                                <Star className="w-3 h-3 text-brand-neon" fill="currentColor" />
                             </div>
                             <span className="text-[10px] font-black text-brand-neon">{stage.xp} XP</span>
                          </div>
                          {isCompleted ? (
                             <CheckCircle2 className="w-6 h-6 text-brand-success" />
                          ) : !isLocked && (
                             <div className="bg-white/5 px-4 py-2 rounded-full text-[10px] font-black uppercase text-white/40 group-hover:text-white transition-colors">
                                PLAY MISSION
                             </div>
                          )}
                       </div>
                    </div>
                 </motion.div>
              );
           })}
        </div>

        <button 
          onClick={completedStages.length === STAGES.length ? () => onComplete(STAGES.reduce((acc, s) => acc + s.xp, 0)) : onBack}
          className={`mt-16 px-12 py-5 rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all shadow-2xl ${
            completedStages.length === STAGES.length 
              ? 'bg-brand-neon text-black hover:scale-105 active:scale-95 shadow-brand-neon/20 ring-4 ring-brand-neon/20' 
              : 'bg-white/5 text-white/40 hover:text-white'
          }`}
        >
           {completedStages.length === STAGES.length ? 'COMPLETE LEVEL 1' : 'RETURN TO MAP'}
        </button>
      </div>
    );
  }

  // --- RENDER ACTIVE STAGE ---
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
       <div className="w-full max-w-3xl">
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-[#0a121e]/95 backdrop-blur-3xl border-2 border-[#1e3a5f] rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]"
          >
             {/* Header */}
             <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-brand-neon/10 rounded-xl border border-brand-neon/30">
                      <activeStage.icon className="w-6 h-6 text-brand-neon" />
                   </div>
                   <div>
                      <h4 className="text-xs font-black text-brand-neon uppercase tracking-[0.4em]">{activeStage.subtitle}</h4>
                      <h2 className="text-2xl font-black text-white uppercase italic">{activeStage.title}</h2>
                   </div>
                </div>
                <button onClick={resetToMap} className="text-white/20 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">ABORT</button>
             </div>

             {/* Stage Logic */}
             <div className="min-h-[350px]">
                {gameStatus === 'won' ? (
                   <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="text-center py-10 space-y-8"
                   >
                      <div className="w-24 h-24 bg-brand-success/10 rounded-full flex items-center justify-center border-2 border-brand-success mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                         <CheckCircle2 className="w-12 h-12 text-brand-success" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Mission Success</h3>
                         <p className="text-white/40 text-sm font-bold uppercase tracking-widest">Protocol synchronized. +{activeStage.xp} XP acquired.</p>
                      </div>
                      <button 
                        onClick={() => {
                          const isLast = activeStage.id === STAGES[STAGES.length - 1].id;
                          if (isLast) resetToMap();
                          else handleNextStage();
                        }}
                        className="bg-brand-success text-black px-12 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-3 mx-auto"
                      >
                         {activeStage.id === STAGES[STAGES.length - 1].id ? 'FINALIZED' : 'NEXT MISSION'}
                         <ArrowRight className="w-4 h-4" />
                      </button>
                   </motion.div>
                ) : gameStatus === 'lost' ? (
                   <div className="text-center py-10 space-y-8">
                      <div className="w-24 h-24 bg-brand-danger/10 rounded-full flex items-center justify-center border-2 border-brand-danger mx-auto">
                         <XCircle className="w-12 h-12 text-brand-danger" />
                      </div>
                      <div className="space-y-2">
                         <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Syntax Error</h3>
                         <p className="text-white/40 text-sm font-bold uppercase tracking-widest leading-relaxed">The compiler rejected your thought pattern. <br/>Retry the mission.</p>
                      </div>
                      <button 
                        onClick={() => { setGameStatus('playing'); setGameStep(0); }}
                        className="bg-white text-black px-12 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                      >
                         RETRY MISSION
                      </button>
                   </div>
                ) : (
                   <div className="h-full">
                      {activeStage.id === 1 && (
                         <div className="space-y-8">
                            <h5 className="text-lg font-bold text-white pr-10 border-l-4 border-brand-neon pl-4 italic">
                               Complete the code instruction by selecting the tokens in order:
                            </h5>
                            <div className="flex flex-wrap gap-3 min-h-[60px] p-4 bg-white/5 border border-white/5 rounded-2xl relative">
                               {g1Current.length === 0 && <span className="text-white/10 uppercase font-black text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest">Awaiting tokens...</span>}
                               {g1Current.map((t, i) => (
                                  <motion.div key={i} layoutId={t} className="px-4 py-2 bg-brand-neon text-black rounded-lg font-bold text-sm shadow-[0_0_10px_rgba(0,255,255,0.3)]">{t}</motion.div>
                               ))}
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                               {game1Data[gameStep].shuffled.map((token, idx) => (
                                  <button 
                                    key={idx} 
                                    disabled={g1Current.includes(token)}
                                    onClick={() => handleG1Drop(token)}
                                    className={`px-4 py-4 rounded-xl border-2 font-pixel text-xs transition-all ${
                                       g1Current.includes(token)
                                        ? 'opacity-20 border-white/5'
                                        : 'bg-[#1a2f4a] border-brand-neon/30 text-white/80 hover:border-brand-neon'
                                    }`}
                                  >
                                     {token}
                                  </button>
                               ))}
                            </div>
                            <div className="flex justify-between items-center pt-8">
                               <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Step {gameStep + 1} of {game1Data.length}</p>
                               <button 
                                 onClick={checkG1}
                                 className="flex items-center gap-3 bg-white text-black px-8 py-3 rounded-lg font-black text-xs uppercase"
                               >
                                  VERIFY
                                  <ChevronRight className="w-4 h-4" />
                               </button>
                            </div>
                         </div>
                      )}

                      {activeStage.id === 2 && (
                        <div className="space-y-8">
                           <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                              <p className="text-[10px] font-black text-brand-neon uppercase tracking-[0.2em]">Select a Core → Then select its Type</p>
                              {g2SelectedKey && <span className="text-[10px] text-white/40 animate-pulse font-pixel">ACTIVECORE: {g2SelectedKey}</span>}
                           </div>
                           <div className="grid grid-cols-2 gap-8 relative h-[350px]">
                              {/* Left Column: Cores */}
                              <div className="space-y-3">
                                 {game2Data.map((d) => (
                                    <button 
                                      key={d.key}
                                      disabled={g2Selections[d.key]}
                                      onClick={() => setG2SelectedKey(d.key)}
                                      className={`w-full text-left p-4 rounded-xl border-2 transition-all relative overflow-hidden group ${
                                         g2Selections[d.key] 
                                          ? 'border-brand-success/50 bg-brand-success/5 opacity-50 cursor-default' 
                                          : g2SelectedKey === d.key
                                            ? 'border-brand-neon bg-brand-neon/10 shadow-[0_0_20px_rgba(0,255,255,0.2)]'
                                            : 'border-[#1e3a5f] bg-[#0a121e] hover:border-[#3b82f6]'
                                      }`}
                                    >
                                       <div className="text-[9px] uppercase font-black opacity-40 mb-1">{d.key}</div>
                                       <div className="text-sm font-pixel text-white">{d.value}</div>
                                       {g2Selections[d.key] && <div className="absolute top-2 right-2"><CheckCircle2 className="w-4 h-4 text-brand-success" /></div>}
                                    </button>
                                 ))}
                              </div>

                              {/* Middle Connections (Visual) */}
                              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 hidden md:block" />

                              {/* Right Column: Types */}
                              <div className="space-y-3">
                                 {shuffledG2Types.map((type) => (
                                    <button 
                                      key={type}
                                      disabled={!g2SelectedKey}
                                      onClick={() => checkG2(type)}
                                      className={`w-full p-6 md:p-8 rounded-xl border-2 font-black uppercase tracking-widest text-xs transition-all ${
                                        !g2SelectedKey 
                                          ? 'border-white/5 opacity-40 cursor-not-allowed bg-transparent'
                                          : 'border-[#1e3a5f] bg-[#0a121e] hover:border-brand-orange text-white'
                                      }`}
                                    >
                                       {type}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                      )}

                      {activeStage.id === 3 && (
                        <div className="space-y-12">
                           <div className="space-y-4">
                              <h5 className="text-lg font-bold text-white border-l-4 border-brand-pink pl-4 italic">
                                 Is the code below valid according to Realm Syntax?
                              </h5>
                              <div className="p-10 bg-black/60 border border-white/5 rounded-3xl text-center relative overflow-hidden group">
                                 <code className="text-2xl md:text-3xl font-pixel text-brand-neon tracking-tighter shadow-brand-neon/20">
                                    {game3Data[gameStep].code}
                                 </code>
                                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                           </div>

                           <div className="flex gap-4">
                              <button 
                                onClick={() => handleG3Choice(true)}
                                className="flex-1 py-10 rounded-2xl border-4 border-[#1e3a5f] bg-[#0a121e] hover:border-brand-success hover:bg-brand-success/5 text-brand-success font-black text-2xl md:text-3xl italic tracking-tighter uppercase transition-all"
                              >
                                 VALID
                              </button>
                              <button 
                                onClick={() => handleG3Choice(false)}
                                className="flex-1 py-10 rounded-2xl border-4 border-[#1e3a5f] bg-[#0a121e] hover:border-brand-danger hover:bg-brand-danger/5 text-brand-danger font-black text-2xl md:text-3xl italic tracking-tighter uppercase transition-all"
                              >
                                 INVALID
                              </button>
                           </div>
                           <p className="text-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Sub-Mission {gameStep + 1} of {game3Data.length}</p>
                        </div>
                      )}
                   </div>
                )}
             </div>
          </motion.div>
       </div>
    </div>
  );
}
