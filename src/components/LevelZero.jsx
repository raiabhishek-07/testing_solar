"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Cpu, 
  Code, 
  Zap, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  HelpCircle, 
  Star, 
  Lock,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  Bot,
  Coffee,
  ListOrdered,
  MapPin,
  Gamepad2
} from 'lucide-react';

// --- DATA ---
const MCQ_QUESTIONS = [
  { q: "What is a computer?", options: ["A machine that processes information", "A type of animal", "A book", "A chair"], a: 0, hint: "It uses hardware and software to handle data." },
  { q: "What is a program?", options: ["A movie", "A set of instructions for a computer", "A keyboard", "A mouse"], a: 1, hint: "Computers need these to know what to do." },
  { q: "What is programming?", options: ["Playing games", "Giving instructions to a computer", "Drawing pictures", "Watching videos"], a: 1, hint: "The act of writing code." },
  { q: "What is a programming language?", options: ["Language used to talk to computers", "A music language", "A human body language", "A drawing language"], a: 0, hint: "Like Python or Java." },
  { q: "Which one is a programming language?", options: ["Python", "Banana", "Chair", "Pencil"], a: 0, hint: "Starts with P!" },
  { q: "Example of instruction in real life?", options: ["Brush your teeth", "Jump to the moon", "Fly like a bird", "Become invisible"], a: 0, hint: "Something you can actually follow step-by-step." },
  { q: "What is Input?", options: ["Data given to a computer", "Computer sleeping", "Computer dancing", "Computer flying"], a: 0, hint: "Information goes INTO the machine." },
  { q: "What is Output?", options: ["Result produced by computer", "Computer noise", "Computer color", "Computer battery"], a: 0, hint: "Information comes OUT of the machine." },
  { q: "What is Logic?", options: ["Thinking step by step", "Random guessing", "Sleeping", "Jumping"], a: 0, hint: "Using rules to make choices." },
  { q: "What is an Algorithm?", options: ["Step-by-step solution", "A toy", "A keyboard", "A cable"], a: 0, hint: "Like a recipe." },
  { q: "What is Debugging?", options: ["Fixing mistakes in code", "Creating bugs", "Playing games", "Turning off computer"], a: 0, hint: "Squashing those pesky bugs." },
  { q: "Why coding is useful?", options: ["To build apps and games", "To cook food", "To fly airplanes", "To grow trees"], a: 0, hint: "It's the superpower of the digital age." }
];

const MATCH_SETS = [
  {
    title: "Level Basics",
    items: [
      { concept: "Computer", match: "Machine that processes data" },
      { concept: "Program", match: "Set of instructions" },
      { concept: "Programming", match: "Writing instructions" },
      { concept: "Language", match: "Language to talk to computer" }
    ]
  },
  {
    title: "Data Flow",
    items: [
      { concept: "Input", match: "Data given to computer" },
      { concept: "Output", match: "Result from computer" },
      { concept: "Logic", match: "Thinking step by step" },
      { concept: "Algorithm", match: "Step-by-step solution" }
    ]
  }
];

const YESNO_QUESTIONS = [
  { q: "A computer can follow instructions.", a: true },
  { q: "Programming means talking to animals.", a: false },
  { q: "A program is a set of instructions.", a: true },
  { q: "Python is a programming language.", a: true },
  { q: "Input means data given to computer.", a: true },
  { q: "Output is the result from a computer.", a: true },
  { q: "Debugging means finding mistakes.", a: true },
  { q: "Algorithm means random guessing.", a: false },
  { q: "Logic means thinking step by step.", a: true },
  { q: "Coding is useful to build apps and games.", a: true }
];

const ALGO_STEPS = [
  { id: 1, text: "Boil water", order: 1 },
  { id: 2, text: "Add tea powder", order: 2 },
  { id: 3, text: "Pour water", order: 3 },
  { id: 4, text: "Drink tea", order: 4 }
];

export default function LevelZero({ onComplete, onBack, onViewDoc }) {
  const [gameMode, setGameMode] = useState('menu'); // menu, mcq, match, yesno, algo
  const [completedGames, setCompletedGames] = useState([]);
  
  // MCQ State
  const [mcqStep, setMcqStep] = useState(0);
  const [mcqResult, setMcqResult] = useState(null); // correct, wrong

  // Match State
  const [matchSetIdx, setMatchSetIdx] = useState(0);
  const [matchSelections, setMatchSelections] = useState({});
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [shuffledMatches, setShuffledMatches] = useState([]);

  // YesNo State
  const [ynStep, setYnStep] = useState(0);
  const [ynResult, setYnResult] = useState(null);

  // Algo State
  const [algoList, setAlgoList] = useState([]);
  const [algoCorrect, setAlgoCorrect] = useState(false);

  useEffect(() => {
    if (gameMode === 'match') {
      const items = MATCH_SETS[matchSetIdx].items.map(i => i.match);
      setShuffledMatches(items.sort(() => Math.random() - 0.5));
      setMatchSelections({});
      setSelectedConcept(null);
    }
  }, [gameMode, matchSetIdx]);

  useEffect(() => {
    if (gameMode === 'algo') {
      setAlgoList([...ALGO_STEPS].sort(() => Math.random() - 0.5));
      setAlgoCorrect(false);
    }
  }, [gameMode]);

  const finishGame = (mode) => {
    if (!completedGames.includes(mode)) {
      setCompletedGames([...completedGames, mode]);
    }
    setGameMode('menu');
  };

  const handleMcqChoice = (idx) => {
    if (idx === MCQ_QUESTIONS[mcqStep].a) {
      setMcqResult('correct');
      setTimeout(() => {
        if (mcqStep < MCQ_QUESTIONS.length - 1) {
          setMcqStep(mcqStep + 1);
          setMcqResult(null);
        } else {
          finishGame('mcq');
        }
      }, 1000);
    } else {
      setMcqResult('wrong');
      setTimeout(() => setMcqResult(null), 2000);
    }
  };

  const handleMatch = (matchValue) => {
    if (!selectedConcept) return;
    const correct = MATCH_SETS[matchSetIdx].items.find(i => i.concept === selectedConcept).match;
    if (matchValue === correct) {
      const newSels = { ...matchSelections, [selectedConcept]: true };
      setMatchSelections(newSels);
      setSelectedConcept(null);
      if (Object.keys(newSels).length === MATCH_SETS[matchSetIdx].items.length) {
        if (matchSetIdx < MATCH_SETS.length - 1) {
          setTimeout(() => setMatchSetIdx(matchSetIdx + 1), 1000);
        } else {
          finishGame('match');
        }
      }
    } else {
      setSelectedConcept(null);
    }
  };

  const checkAlgo = () => {
    const isOrdered = algoList.every((item, idx) => item.order === idx + 1);
    if (isOrdered) {
      setAlgoCorrect(true);
      setTimeout(() => finishGame('algo'), 1500);
    }
  };

  const moveAlgo = (index, direction) => {
    const newList = [...algoList];
    const target = index + direction;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    setAlgoList(newList);
  };

  // --- RENDERING ---

  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 font-sans">
        <header className="text-center mb-16 space-y-4">
           <div className="flex items-center justify-center gap-2 text-brand-neon">
              <Shield className="w-5 h-5 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">NOOB_ZONE_TRAINING</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-black font-pixel uppercase tracking-tighter text-white">GENESIS ARCADE</h1>
           <p className="text-white/40 text-[10px] font-black uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
              MASTER THE FOUNDATIONS THROUGH 4 INTERACTIVE CHALLENGES.
           </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
           {[
              { id: 'mcq', title: "MCQ ADVENTURE", desc: "Walking path challenge with 12 checkpoints.", icon: MapPin },
              { id: 'match', title: "MATCH MASTER", desc: "Drag and drop matching for core meanings.", icon: Layers },
              { id: 'yesno', title: "ROBO QUIZ", desc: "Help the robot analyze yes/no protocols.", icon: Bot },
              { id: 'algo', title: "ALGO BUILDER", desc: "The tea maker algorithm sorting game.", icon: ListOrdered }
           ].map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-8 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col items-center text-center gap-4 ${
                  completedGames.includes(game.id) 
                    ? 'border-brand-success/30 bg-brand-success/5 opacity-80' 
                    : 'border-[#1e3a5f] bg-[#0a121e]/80 hover:border-brand-neon shadow-2xl'
                }`}
                onClick={() => setGameMode(game.id)}
              >
                 <div className="w-16 h-16 rounded-2xl bg-brand-neon/5 border-2 border-brand-neon/30 flex items-center justify-center">
                    <game.icon className="w-8 h-8 text-brand-neon" />
                 </div>
                 <h2 className="text-xl font-black text-white italic uppercase tracking-tighter line-clamp-1">{game.title}</h2>
                 <p className="text-white/40 text-[10px] uppercase font-black tracking-widest leading-relaxed">{game.desc}</p>
                 {completedGames.includes(game.id) && <CheckCircle2 className="w-6 h-6 text-brand-success mt-2" />}
              </motion.div>
           ))}
        </div>

        <button 
          onClick={completedGames.length === 4 ? onComplete : onBack}
          className={`mt-16 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all shadow-xl ${
            completedGames.length === 4 
              ? 'bg-brand-neon text-black shadow-brand-neon/30 hover:scale-105' 
              : 'bg-white/5 text-white/40 hover:text-white'
          }`}
        >
           {completedGames.length === 4 ? 'SYNC COMPLETED' : 'ABORT TRAINING'}
        </button>
      </div>
    );
  }

  // --- GAME 1: MCQ ADVENTURE ---
  if (gameMode === 'mcq') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
         <div className="w-full max-w-4xl space-y-12">
            {/* The Path Map */}
            <div className="relative h-24 w-full bg-white/5 rounded-full border border-white/5 px-8 flex items-center justify-between overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-brand-neon/5 to-transparent" />
               <div className="flex gap-4 w-full justify-between items-center relative z-10 px-4">
                  {MCQ_QUESTIONS.map((_, i) => (
                     <div key={i} className={`w-3 h-3 rounded-full transition-all ${i < mcqStep ? 'bg-brand-success' : i === mcqStep ? 'bg-brand-neon scale-150 shadow-[0_0_15px_#00ffff]' : 'bg-white/10'}`} />
                  ))}
               </div>
               
               {/* Moving Character Representation */}
               <motion.div 
                 animate={{ x: `${(mcqStep / (MCQ_QUESTIONS.length-1)) * 90}%` }}
                 className="absolute left-8 top-1/2 -translate-y-1/2 z-20"
               >
                  <div className="p-3 bg-brand-neon rounded-xl text-black shadow-[0_0_20px_#00ffff] mb-20 relative">
                     <Gamepad2 className="w-5 h-5 animate-bounce" />
                     <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-neon rotate-45" />
                  </div>
               </motion.div>
            </div>

            <motion.div 
              key={mcqStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0a121e]/95 backdrop-blur-3xl border-2 border-white/5 rounded-[40px] p-8 md:p-12 relative shadow-2xl overflow-hidden"
            >
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-brand-neon/10 rounded-xl border border-brand-neon/30">
                     <MapPin className="w-6 h-6 text-brand-neon" />
                  </div>
                  <div>
                     <h4 className="text-[10px] font-black text-brand-neon uppercase tracking-[0.5em]">CHECKPOINT_{mcqStep + 1} / 12</h4>
                     <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{MCQ_QUESTIONS[mcqStep].q}</h2>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MCQ_QUESTIONS[mcqStep].options.map((opt, idx) => (
                     <button
                        key={idx}
                        onClick={() => handleMcqChoice(idx)}
                        className={`p-6 rounded-2xl border-2 text-left font-bold text-sm transition-all ${
                          mcqResult === 'correct' && idx === MCQ_QUESTIONS[mcqStep].a
                            ? 'bg-brand-success/10 border-brand-success text-brand-success'
                            : mcqResult === 'wrong' && idx !== MCQ_QUESTIONS[mcqStep].a
                               ? 'bg-brand-danger/5 border-white/5 opacity-50'
                               : 'bg-white/5 border-white/5 hover:border-brand-neon text-white hover:bg-brand-neon/5'
                        }`}
                     >
                        {opt}
                     </button>
                  ))}
               </div>

               <AnimatePresence>
                 {mcqResult === 'wrong' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 p-4 bg-brand-neon/5 border-l-4 border-brand-neon rounded-r-xl"
                    >
                       <p className="text-[10px] font-black text-brand-neon uppercase tracking-widest mb-1 italic">HINT_SCANNING...</p>
                       <p className="text-white/60 text-xs font-medium">{MCQ_QUESTIONS[mcqStep].hint}</p>
                    </motion.div>
                 )}
               </AnimatePresence>
            </motion.div>
         </div>
      </div>
    );
  }

  // --- GAME 2: MATCHING ---
  if (gameMode === 'match') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
         <div className="w-full max-w-2xl space-y-8">
            <div className="text-center space-y-2">
               <h2 className="text-3xl font-black text-white italic uppercase">{MATCH_SETS[matchSetIdx].title}</h2>
               <p className="text-brand-neon text-[10px] font-black uppercase tracking-[0.4em]">Match the concept to its definition</p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 relative pb-20">
               {/* Left Column */}
               <div className="space-y-4">
                  {MATCH_SETS[matchSetIdx].items.map(i => (
                     <button
                        key={i.concept}
                        disabled={matchSelections[i.concept]}
                        onClick={() => setSelectedConcept(i.concept)}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
                           matchSelections[i.concept]
                            ? 'bg-brand-success/5 border-brand-success/20 opacity-30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                            : selectedConcept === i.concept
                              ? 'bg-brand-neon/10 border-brand-neon text-brand-neon shadow-[0_0_20px_rgba(0,255,255,0.2)]'
                              : 'bg-[#0a121e] border-white/5 text-white/60 hover:border-white/20'
                        }`}
                     >
                        <span className="text-xs font-black uppercase tracking-widest">{i.concept}</span>
                        {matchSelections[i.concept] && <CheckCircle2 className="w-4 h-4 text-brand-success float-right" />}
                     </button>
                  ))}
               </div>

               {/* Right Column */}
               <div className="space-y-4">
                  {shuffledMatches.map(m => (
                     <button
                        key={m}
                        disabled={!selectedConcept}
                        onClick={() => handleMatch(m)}
                        className={`w-full p-6 rounded-2xl border-2 text-left text-xs italic font-medium transition-all ${
                           Object.values(matchSelections).some(() => false /* logic needed */)
                            ? 'opacity-30'
                            : !selectedConcept 
                              ? 'opacity-20 border-white/5 text-white/20' 
                              : 'bg-white/5 border-white/5 text-white/60 hover:border-brand-orange hover:bg-brand-orange/5'
                        }`}
                     >
                        {m}
                     </button>
                  ))}
               </div>
            </div>
            <div className="flex justify-center mt-12">
               <button onClick={() => setGameMode('menu')} className="text-white/20 hover:text-white uppercase font-black text-[10px] tracking-[0.5em]">Abort Match</button>
            </div>
         </div>
      </div>
    );
  }

  // --- GAME 3: YES/NO ---
  if (gameMode === 'yesno') {
    const q = YESNO_QUESTIONS[ynStep];
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
         <div className="w-full max-w-2xl space-y-12">
            <div className="flex flex-col items-center gap-6">
                <motion.div 
                  animate={ynResult === 'correct' ? { scale: [1, 1.2, 1], y: [0, -10, 0] } : ynResult === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
                  className={`w-32 h-32 rounded-full border-4 flex items-center justify-center bg-[#0a121e] transition-colors ${ynResult === 'correct' ? 'border-brand-success' : ynResult === 'wrong' ? 'border-brand-danger' : 'border-brand-neon'}`}
                >
                   <Bot className={`w-16 h-16 ${ynResult === 'correct' ? 'text-brand-success' : ynResult === 'wrong' ? 'text-brand-danger' : 'text-brand-neon'}`} />
                </motion.div>
                <div className="text-center space-y-2">
                   <h3 className="text-brand-neon text-[10px] font-black uppercase tracking-[0.6em]">REASONING_BOT v1.0</h3>
                   <div className="relative">
                      <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-xl font-bold text-white italic">
                         "{q.q}"
                      </div>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a121e] px-4 text-[9px] font-black text-white/20 italic tracking-widest border border-white/5 rounded-full">INCOMING_QUERY</div>
                   </div>
                </div>
            </div>

            <div className="flex gap-4">
               <button
                  disabled={ynResult}
                  onClick={() => {
                     if (q.a === true) {
                        setYnResult('correct');
                        setTimeout(() => {
                           if (ynStep < YESNO_QUESTIONS.length - 1) { setYnStep(ynStep + 1); setYnResult(null); }
                           else finishGame('yesno');
                        }, 1000);
                     } else { setYnResult('wrong'); setTimeout(() => setYnResult(null), 1500); }
                  }}
                  className={`flex-1 py-10 rounded-2xl border-4 flex flex-col items-center justify-center gap-4 transition-all ${ynResult === 'correct' && q.a === true ? 'bg-brand-success/20 border-brand-success text-brand-success shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/5 bg-white/5 hover:border-brand-success hover:text-brand-success'}`}
               >
                  <ThumbsUp className="w-10 h-10" />
                  <span className="font-black italic text-2xl uppercase tracking-tighter">YES</span>
               </button>
               <button
                  disabled={ynResult}
                  onClick={() => {
                     if (q.a === false) {
                        setYnResult('correct');
                        setTimeout(() => {
                           if (ynStep < YESNO_QUESTIONS.length - 1) { setYnStep(ynStep + 1); setYnResult(null); }
                           else finishGame('yesno');
                        }, 1000);
                     } else { setYnResult('wrong'); setTimeout(() => setYnResult(null), 1500); }
                  }}
                  className={`flex-1 py-10 rounded-2xl border-4 flex flex-col items-center justify-center gap-4 transition-all ${ynResult === 'correct' && q.a === false ? 'bg-brand-success/20 border-brand-success text-brand-success shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'border-white/5 bg-white/5 hover:border-brand-danger hover:text-brand-danger'}`}
               >
                  <ThumbsDown className="w-10 h-10" />
                  <span className="font-black italic text-2xl uppercase tracking-tighter">NO</span>
               </button>
            </div>
            <p className="text-center text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic">Protocol {ynStep + 1} of 10</p>
         </div>
      </div>
    );
  }

  // --- GAME 4: ALGO BUILDER ---
  if (gameMode === 'algo') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
         <div className="w-full max-w-xl space-y-12">
            <div className="text-center space-y-4">
               <div className="w-20 h-20 bg-brand-orange/10 border-2 border-brand-orange/30 rounded-full flex items-center justify-center mx-auto">
                  <Coffee className="w-10 h-10 text-brand-orange" />
               </div>
               <h2 className="text-3xl font-black text-white italic uppercase">Make The Tea</h2>
               <p className="text-white/40 text-xs font-black uppercase tracking-widest">DANGER! Incorrect order will ruin the brew. <br/>Arrange the algorithm steps correctly.</p>
            </div>

            <div className="space-y-3">
               {algoList.map((item, idx) => (
                  <motion.div
                    layout
                    key={item.id}
                    className={`p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${algoCorrect && item.order === idx + 1 ? 'border-brand-success bg-brand-success/10' : 'bg-[#0a121e] border-white/5'}`}
                  >
                     <div className="flex items-center gap-6">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center font-black text-white/20">{idx + 1}</div>
                        <span className="text-lg font-bold text-white uppercase italic">{item.text}</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <button onClick={() => moveAlgo(idx, -1)} className="p-1 hover:text-brand-neon bg-white/5 rounded"><ChevronRight className="w-4 h-4 -rotate-90" /></button>
                        <button onClick={() => moveAlgo(idx, 1)} className="p-1 hover:text-brand-neon bg-white/5 rounded"><ChevronRight className="w-4 h-4 rotate-90" /></button>
                     </div>
                  </motion.div>
               ))}
            </div>

            <button 
              onClick={checkAlgo}
              className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${algoCorrect ? 'bg-brand-success text-black' : 'bg-brand-neon text-black hover:scale-105 active:scale-95 shadow-xl'}`}
            >
               {algoCorrect ? 'ALGORITHM_VERIFIED' : 'TEST ALGORITHM'}
            </button>
            
            <button onClick={() => setGameMode('menu')} className="w-full text-white/20 hover:text-white uppercase font-black text-[10px] tracking-[0.5em] text-center block">Abort Builder</button>
         </div>
      </div>
    );
  }

  return null;
}
