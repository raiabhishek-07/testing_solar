"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, Zap, Terminal, Box, Play, RotateCcw, 
  CheckCircle2, XCircle, ArrowRight, MousePointer2,
  ListOrdered, Hammer, Search, ShieldAlert, Bot, Star
} from 'lucide-react';

// --- GAME 1: FACTORY ---
const FactoryGame = ({ target, tasks, onComplete }) => {
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, checking, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdd = (tool) => {
    if (status === 'success') return;
    if (selected.length < 4) setSelected([...selected, tool]);
    setStatus('idle');
  };

  const handleReset = () => {
    setSelected([]);
    setStatus('idle');
  };

  const handleExecute = () => {
    setStatus('checking');
    setTimeout(() => {
      const isCorrect = selected.join(',') === tasks.join(',');
      if (isCorrect) {
        setStatus('success');
        onComplete && onComplete();
      } else {
        setStatus('error');
        setErrorMsg(selected.length < tasks.length ? "Incomplete Protocol" : "Logical Mismatch");
      }
    }, 1000);
  };

  return (
    <div className="space-y-8 bg-black/40 p-8 rounded-[40px] border border-white/5 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 blur-[100px] -z-10" />

       <div className="flex items-center justify-between">
          <div className="space-y-1">
             <h3 className="text-sm font-black text-brand-neon uppercase tracking-[0.3em]">Factory_Task:</h3>
             <p className="text-2xl font-black text-white italic uppercase">{target}</p>
          </div>
          <div className="flex gap-2">
             <button onClick={handleReset} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                <RotateCcw className="w-5 h-5 opacity-50" />
             </button>
          </div>
       </div>

       {/* INVENTORY */}
       <div className="grid grid-cols-4 gap-4">
          {['🍊', '🍎', '🥛', '🔪', '🌀', '🍵', '🔥', '☕'].filter(i => {
             // Only show items relevant to the level context if we want, or show a subset
             return true; 
          }).slice(0, 8).map((item, i) => (
             <motion.button
                key={i}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAdd(item)}
                className="h-20 glass rounded-3xl flex items-center justify-center text-3xl border-white/5 hover:border-brand-neon/40 transition-all"
             >
                {item}
             </motion.button>
          ))}
       </div>

       {/* PROGRAM SLOTS */}
       <div className="flex items-center gap-4 py-8 overflow-x-auto scrollbar-hide">
          {[0, 1, 2, 3].map(i => (
             <div key={i} className={`shrink-0 w-20 h-20 rounded-3xl border-2 border-dashed flex items-center justify-center text-3xl transition-all ${
                selected[i] ? 'border-brand-neon/40 bg-brand-neon/5' : 'border-white/5 bg-white/2'
             }`}>
                {selected[i] || <span className="text-white/10 text-xs font-black">{i+1}</span>}
             </div>
          ))}
          <ArrowRight className="w-6 h-6 opacity-20 mx-2" />
          <div className={`shrink-0 w-24 h-24 rounded-[40px] border-2 border-brand-neon/20 flex flex-col items-center justify-center gap-1 transition-all ${status === 'success' ? 'bg-brand-neon/20 border-brand-neon scale-110 shadow-lg shadow-brand-neon/20' : ''}`}>
             <Box className={`w-8 h-8 ${status === 'success' ? 'text-brand-neon animate-bounce' : 'opacity-20 text-white'}`} />
             <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Output</span>
          </div>
       </div>

       {/* EXECUTION PANEL */}
       <div className="flex flex-col gap-4">
          <button 
             onClick={handleExecute}
             disabled={selected.length === 0 || status === 'checking'}
             className="w-full h-16 glass rounded-[30px] border-brand-neon/30 flex items-center justify-center gap-4 group hover:bg-brand-neon/10 transition-all active:scale-95 disabled:opacity-30"
          >
             {status === 'checking' ? (
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-brand-neon animate-bounce" />
                   <div className="w-2 h-2 rounded-full bg-brand-neon animate-bounce [animation-delay:0.2s]" />
                   <div className="w-2 h-2 rounded-full bg-brand-neon animate-bounce [animation-delay:0.4s]" />
                </div>
             ) : (
                <>
                   <span className="text-sm font-black text-brand-neon uppercase tracking-[0.4em]">Run_Program</span>
                   <Play className="w-5 h-5 text-brand-neon group-hover:translate-x-1 transition-transform" />
                </>
             )}
          </button>

          <AnimatePresence>
             {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-brand-neon/10 rounded-3xl border border-brand-neon/20 flex items-center gap-4">
                   <CheckCircle2 className="w-8 h-8 text-brand-neon" />
                   <div className="space-y-1">
                      <p className="text-sm font-black text-brand-neon uppercase tracking-widest">Logic_Verified</p>
                      <p className="text-xs text-white/60 font-medium">Factory output matches target. Core concepts synchronized.</p>
                   </div>
                </motion.div>
             )}
             {status === 'error' && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 bg-red-500/10 rounded-3xl border border-red-500/20 flex items-center gap-4">
                   <XCircle className="w-8 h-8 text-red-500" />
                   <div className="space-y-1">
                      <p className="text-sm font-black text-red-500 uppercase tracking-widest">Protocol_Error: {errorMsg}</p>
                      <p className="text-xs text-white/60 font-medium">Instructions failed to produce correct output. Re-examine the steps.</p>
                   </div>
                </motion.div>
             )}
          </AnimatePresence>
       </div>
    </div>
  );
};

// --- GAME 2: ROBOT ---
const RobotCommander = ({ grid, start, goal, onComplete }) => {
  const [commands, setCommands] = useState([]);
  const [robotPos, setRobotPos] = useState(start);
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState('idle');

  const addCommand = (cmd) => {
    if (isPlaying || status === 'success') return;
    setCommands([...commands, cmd]);
  };

  const handleReset = () => {
    setCommands([]);
    setRobotPos(start);
    setIsPlaying(false);
    setStatus('idle');
  };

  const runSimulation = async () => {
    setIsPlaying(true);
    let currentPos = { ...start };
    
    for (const cmd of commands) {
      await new Promise(r => setTimeout(r, 600));
      if (cmd === 'MOVE') {
        currentPos = { ...currentPos, x: currentPos.x + 1 };
      }
      setRobotPos({ ...currentPos });
      
      // Basic out of bounds check for 4x1 grid example
      if (currentPos.x > 3) break;
    }

    if (currentPos.x === goal.x && currentPos.y === goal.y) {
      setStatus('success');
      onComplete && onComplete();
    } else {
      setStatus('error');
    }
    setIsPlaying(false);
  };

  return (
    <div className="bg-black/40 p-10 rounded-[50px] border border-white/5 space-y-10">
       <div className="flex items-center justify-between">
          <div className="space-y-1">
             <h3 className="text-sm font-black text-brand-purple uppercase tracking-[0.3em]">Robot_Command:</h3>
             <p className="text-2xl font-black text-white italic uppercase italic tracking-tighter">Navigate to Sector {goal.x},{goal.y}</p>
          </div>
          <button onClick={handleReset} className="p-3 bg-white/5 rounded-2xl hover:bg-white/10">
             <RotateCcw className="w-5 h-5 opacity-40" />
          </button>
       </div>

       {/* GRID DISPLAY */}
       <div className="flex justify-center py-6">
          <div className="flex gap-4">
             {[0, 1, 2, 3].map(x => (
                <div key={x} className={`w-20 h-20 rounded-3xl border-2 flex items-center justify-center relative transition-all duration-500 ${
                   goal.x === x ? 'border-brand-neon/40 bg-brand-neon/5' : 'border-white/5 bg-white/2'
                }`}>
                   {robotPos.x === x && (
                      <motion.div layoutId="robot" className="absolute inset-0 flex items-center justify-center">
                         <Bot className="w-10 h-10 text-brand-neon animate-pulse" />
                      </motion.div>
                   )}
                   {goal.x === x && <Star className={`w-6 h-6 absolute top-2 right-2 ${robotPos.x === x ? 'text-yellow-400' : 'opacity-20 text-white'}`} />}
                </div>
             ))}
          </div>
       </div>

       {/* COMMAND PANEL */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Available_Code:</span>
             <div className="grid grid-cols-1 gap-3">
                <button onClick={() => addCommand('MOVE')} className="h-14 glass rounded-2xl border-white/5 hover:border-brand-purple/50 flex items-center justify-between px-6 group transition-all">
                   <span className="text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">MOVE_FORWARD</span>
                   <MousePointer2 className="w-4 h-4 opacity-50" />
                </button>
                <div className="opacity-20 pointer-events-none h-14 glass rounded-2xl border-white/5 flex items-center justify-between px-6">
                   <span className="text-xs font-black uppercase tracking-widest">TURN_LEFT [Locked]</span>
                </div>
             </div>
          </div>

          <div className="space-y-4">
             <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Instruction_Buffer:</span>
             <div className="h-40 glass rounded-3xl border-white/5 p-6 space-y-2 overflow-y-auto scrollbar-hide">
                {commands.map((c, i) => (
                   <div key={i} className="flex items-center gap-3 text-brand-purple">
                      <Terminal className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-black uppercase tracking-widest">{c}()</span>
                   </div>
                ))}
                {commands.length === 0 && <span className="text-[11px] font-black uppercase tracking-widest opacity-10"># Empty_Sequence</span>}
             </div>
          </div>
       </div>

       <button 
          onClick={runSimulation}
          disabled={commands.length === 0 || isPlaying || status === 'success'}
          className="w-full h-20 bg-brand-purple rounded-[30px] flex items-center justify-center gap-4 group hover:scale-[1.02] transition-all disabled:opacity-20 active:scale-95"
       >
          <Play className="w-6 h-6 text-white" />
          <span className="text-sm font-black text-white uppercase tracking-[0.6em]">Initialize_Sequence</span>
       </button>

       <AnimatePresence>
          {status === 'success' && (
             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-brand-purple/10 rounded-[40px] border border-brand-purple/20 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-brand-purple/20 flex items-center justify-center">
                   <CheckCircle2 className="w-8 h-8 text-brand-purple" />
                </div>
                <div className="space-y-1">
                   <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Algorithm_Synchronized</h4>
                   <p className="text-sm text-white/40 leading-relaxed font-light">Robot reached goal using defined instruction set. Pathfinding logic confirmed.</p>
                </div>
             </motion.div>
          )}
       </AnimatePresence>
    </div>
  );
};

// --- GAME 3: BUG HUNTER ---
const BugHunter = ({ scenario, lines, correctOrder, onComplete }) => {
  const [currentLines, setCurrentLines] = useState(lines);
  const [status, setStatus] = useState('idle');

  const moveLine = (fromIndex, toIndex) => {
    if (status === 'success') return;
    const newLines = [...currentLines];
    const [movedItem] = newLines.splice(fromIndex, 1);
    newLines.splice(toIndex, 0, movedItem);
    setCurrentLines(newLines);
    setStatus('idle');
  };

  const handleVerify = () => {
    const isCorrect = currentLines.join('|') === correctOrder.join('|');
    if (isCorrect) {
       setStatus('success');
       onComplete && onComplete();
    } else {
       setStatus('error');
    }
  };

  return (
    <div className="bg-black/40 p-10 rounded-[50px] border border-white/5 space-y-10 relative overflow-hidden">
       <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-500/5 blur-[100px] -z-10" />

       <div className="space-y-4">
          <div className="flex items-center gap-3 text-yellow-500">
             <ShieldAlert className="w-6 h-6" />
             <h3 className="text-sm font-black uppercase tracking-[0.4em]">Protocol_Glitch_Detected</h3>
          </div>
          <p className="text-2xl font-black text-white italic uppercase tracking-tighter">Scenario: "{scenario}"</p>
       </div>

       <div className="space-y-4">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Current_Logic_Chain:</span>
          <div className="space-y-3">
             {currentLines.map((line, i) => (
                <motion.div 
                   key={line}
                   layout
                   className={`p-6 glass rounded-3xl border-white/5 flex items-center justify-between group transition-all hover:bg-white/5 ${
                      status === 'success' ? 'border-brand-neon/40 text-brand-neon' : 'hover:border-yellow-500/40'
                   }`}
                >
                   <div className="flex items-center gap-6">
                      <span className="text-xs font-black text-white/20 font-pixel">0{i+1}</span>
                      <span className="text-sm font-black uppercase tracking-widest">{line}</span>
                   </div>
                   <div className="flex gap-2">
                      <button 
                        disabled={i === 0 || status === 'success'} 
                        onClick={() => moveLine(i, i - 1)}
                        className="p-2 bg-white/5 rounded-xl hover:text-yellow-500 disabled:opacity-10"
                      >
                         <ArrowRight className="w-4 h-4 -rotate-90" />
                      </button>
                      <button 
                        disabled={i === currentLines.length - 1 || status === 'success'} 
                        onClick={() => moveLine(i, i + 1)}
                        className="p-2 bg-white/5 rounded-xl hover:text-yellow-500 disabled:opacity-10"
                      >
                         <ArrowRight className="w-4 h-4 rotate-90" />
                      </button>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>

       <button 
          onClick={handleVerify}
          disabled={status === 'success'}
          className={`w-full h-16 rounded-[30px] flex items-center justify-center gap-4 group transition-all active:scale-95 ${
             status === 'success' ? 'bg-brand-neon text-black' : 'glass border-yellow-500/40 text-yellow-500 hover:bg-yellow-500/10'
          }`}
       >
          <Hammer className="w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-[0.4em]">
             {status === 'success' ? 'Logic_Repaired' : 'Patch_System'}
          </span>
       </button>
    </div>
  );
};

// --- GAME 4: CODING CHALLENGE ---
import CodeEditor from '@/components/CodeEditor/CodeEditor';
import { Code } from 'lucide-react';

const CodingGame = ({ title, objective, starterCode, hints, validate, onComplete }) => {
  // Mock a LevelConfig for the CodeEditor
  const levelConfig = {
    id: 'dynamic-coding-stage',
    title: title || 'Coding Challenge',
    objective: objective || 'Solve the problem using code.',
    starterCode: starterCode || '',
    hints: hints || [],
    validate: validate || (() => true),
    winMessage: 'System Logic Verified!',
    xpReward: 100,
    gemReward: 2
  };

  return (
    <div className="h-[600px] rounded-[40px] overflow-hidden border-2 border-white/5 relative bg-[#0d0d16]">
       <div className="absolute top-4 right-4 z-50">
          <div className="px-4 py-2 bg-brand-neon/10 border border-brand-neon/20 rounded-xl flex items-center gap-2">
             <Code className="w-4 h-4 text-brand-neon" />
             <span className="text-[10px] font-black text-brand-neon uppercase tracking-widest">Coding_Lab_Active</span>
          </div>
       </div>
       <CodeEditor 
          level={levelConfig} 
          theme={{ accent: '#00ffff' }} 
          onSuccess={() => onComplete && onComplete()} 
          onRetry={() => {}} 
       />
    </div>
  );
};

export default function GameContainer({ type, config, onComplete }) {
  if (type === 'factory') return <FactoryGame {...config} onComplete={onComplete} />;
  if (type === 'robot') return <RobotCommander {...config} onComplete={onComplete} />;
  if (type === 'bug') return <BugHunter {...config} onComplete={onComplete} />;
  if (type === 'coding') return <CodingGame {...config} onComplete={onComplete} />;
  return null;
}
