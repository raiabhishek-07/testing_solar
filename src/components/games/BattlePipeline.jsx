"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, CheckCircle2, Skull,
  Zap, AlertTriangle, ArrowLeft, Crosshair, Terminal,
  Bug, Eye, Code2, BookOpen, Shield, VolumeX, Volume2
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { 
  GameAudio, sfxClick, sfxHover, sfxAttack, sfxHit, 
  sfxSuccess, sfxError, sfxLevelComplete, sfxLevelFail, sfxPageTransition 
} from '@/lib/sounds';

// Arena is loaded dynamically to prevent SSR issues
const BattleArena = dynamic(() => import('./BattleArena'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#020b10] flex items-center justify-center">
      <p className="text-brand-neon/30 text-xs font-mono uppercase tracking-widest animate-pulse">LOADING ARENA...</p>
    </div>
  )
});

// ── HP Bar Component (Outside to prevent re-mount focus loss) ─────────
const HPBar = ({ cur, max, isPlayer, name }) => {
  const pct = Math.max(0, (cur / max) * 100);
  const barColor = isPlayer
    ? (pct > 40 ? 'bg-brand-neon shadow-[0_0_10px_rgba(0,255,204,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]')
    : (pct > 40 ? 'bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.4)]' : 'bg-red-600');
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-1">
        <span className={isPlayer ? 'text-brand-neon' : 'text-orange-400'}>
          {isPlayer ? '⚔ PLAYER' : `👾 ${name || 'BOSS'}`}
        </span>
        <span className="text-white/40">{Math.round(cur)}/{max}</span>
      </div>
      <div className="h-3.5 w-full bg-black/60 border border-white/10 rounded-full overflow-hidden relative">
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }}
          className={`h-full rounded-full ${barColor} transition-colors duration-300`} />
      </div>
    </div>
  );
};

// ── Shared Combat Layout (Outside to fix input focus persistence) ─────
const CombatLayout = ({ 
  phaseName, Icon, accentClass, children, 
  playerHp, enemyHp, maxEnemyHp, enemyName, 
  onBack, totalCorrect, totalAnswered, 
  combatLog, combatAction 
}) => {
  const [muted, setMuted] = useState(GameAudio.isMuted);
  return (
    <div className="h-screen flex flex-col bg-[#020408] overflow-hidden">
      {/* ── ROW 1: TOP HUD ── */}
      <div className="flex-none flex items-center justify-between gap-3 px-4 py-3 bg-black/60 backdrop-blur-sm border-b border-white/5 z-20">
        <button onClick={onBack} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:border-white/30 transition-all">
          <ArrowLeft className="w-4 h-4 text-white/50" />
        </button>

        <div className="flex-1 max-w-[200px] flex items-center gap-3">
          <HPBar cur={playerHp} max={100} isPlayer={true} />
          <button 
            onClick={() => { GameAudio.toggleMute(); setMuted(p => !p); }}
            className="p-1.5 bg-white/5 border border-white/10 rounded-lg hover:border-brand-neon/40 transition-all flex-none"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-white/20" /> : <Volume2 className="w-3.5 h-3.5 text-brand-neon" />}
          </button>
        </div>

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] ${accentClass} animate-pulse flex-none`}>
          <Icon className="w-3.5 h-3.5" /> {phaseName}
        </div>

        <div className="flex-1 max-w-[200px]">
          <HPBar cur={enemyHp} max={maxEnemyHp} isPlayer={false} name={enemyName} />
        </div>

        <div className="text-[9px] font-mono text-white/20 text-right flex-none">
          <div className="text-brand-neon font-black">{totalCorrect}/{totalAnswered}</div>
          <div>SCORE</div>
        </div>
      </div>

      <div className="flex-none relative" style={{ height: '300px' }}>
        <BattleArena actionTrigger={combatAction} arenaHeight={300} />
      </div>

      <div className="flex-none h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row gap-3 p-4 min-h-0">
        <div className="flex-1 min-w-0">
          {children}
        </div>

        <div className="flex-none w-full lg:w-56 bg-black/70 border border-white/10 rounded-2xl p-3 h-40 lg:h-auto overflow-hidden flex flex-col font-mono text-[8px] tracking-widest uppercase">
          <div className="mb-2 text-white/20 border-b border-white/5 pb-1 font-black text-[8px] flex items-center gap-1.5">
            <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-red-500/60"/><div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"/><div className="w-1.5 h-1.5 rounded-full bg-green-500/60"/></div>
            CONSOLE
          </div>
          <div className="space-y-1 flex-1 overflow-hidden">
            {combatLog.map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                className={`leading-tight ${i === 0 ? 'text-brand-neon font-bold' : 'text-white/25'}`}>
                {'>'} {log}
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 border-t border-white/5 pt-1.5 mt-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-neon animate-pulse" />
            <span className="text-brand-neon/50 text-[7px]">STABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BattlePipeline({ pipelineData, langLabel, onComplete, onBack }) {
  // ── TEST USER BYPASS ──────────────────────────────────────────
  const [isTestUser] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem('clash_user') || '{}');
      return u.email === 'test@example.com';
    } catch { return false; }
  });

  const [phase, setPhase]         = useState('concept_card');
  const [cardIdx, setCardIdx]     = useState(0);
  const [mcqIdx, setMcqIdx]       = useState(0);
  const [mcqResult, setMcqResult] = useState(null);
  const [mcqSelected, setMcqSelected] = useState(null);
  const [mcqCorrect, setMcqCorrect] = useState(0);
  const [codeIdx, setCodeIdx]     = useState(0);
  const [codeAnswer, setCodeAnswer] = useState('');
  const [codeResult, setCodeResult] = useState(null);
  const [codeHintShown, setCodeHintShown] = useState(false);
  const [codeAttempts, setCodeAttempts] = useState(0);
  const [debugIdx, setDebugIdx]   = useState(0);
  const [debugResult, setDebugResult] = useState(null);
  const [debugSelected, setDebugSelected] = useState(null);
  const [oracleIdx, setOracleIdx] = useState(0);
  const [oracleResult, setOracleResult] = useState(null);

  const maxEnemyHp = pipelineData.battle?.enemy?.maxHp || 100;
  const [enemyHp, setEnemyHp]     = useState(maxEnemyHp);
  const [playerHp, setPlayerHp]   = useState(100);
  const [combatAction, setCombatAction] = useState(null);
  const [combatLog, setCombatLog] = useState(['BATTLE INITIALIZED...']);
  const [weakAreas, setWeakAreas] = useState([]);

  // ── Overall score tracking ───────────────────────────────────────────
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  const logCombat = (msg) => setCombatLog(prev => [msg, ...prev].slice(0, 6));
  const hitEnemy  = (dmg) => { setEnemyHp(p => Math.max(0, p - dmg)); setCombatAction({ type: 'player_attack', id: Date.now() }); };
  const hitPlayer = (dmg) => { sfxHit(); setPlayerHp(p => Math.max(0, p - dmg)); setCombatAction({ type: 'enemy_attack',  id: Date.now() }); };
  const recoverPlayer = (amt) => { setPlayerHp(p => Math.min(100, p + amt)); };

  const cards   = pipelineData.teaching  || [];
  const mcqs    = pipelineData.battle?.mcq || [];
  const codings = pipelineData.coding    || [];
  const debugs  = pipelineData.debugging || [];
  const oracles = pipelineData.prediction|| [];

  // ── Calculate damage per phase proportionally ────────────────────────
  const mcqDmgEach   = mcqs.length    ? Math.round((maxEnemyHp * 0.50) / mcqs.length)    : 0;
  const codeDmgEach  = codings.length  ? Math.round((maxEnemyHp * 0.20) / codings.length) : 0;
  const debugDmgEach = debugs.length   ? Math.round((maxEnemyHp * 0.15) / debugs.length)  : 0;
  const oracleDmgEach= oracles.length  ? Math.round((maxEnemyHp * 0.15) / oracles.length) : 0;

  const totalQuestions = mcqs.length + codings.length + debugs.length + oracles.length;
  const playerDmgEach  = totalQuestions > 0 ? Math.round(100 / totalQuestions) : 10;

  useEffect(() => {
    if (playerHp <= 0 && phase !== 'results' && phase !== 'concept_card') {
      setPhase('results');
    }
  }, [playerHp, phase]);


  useEffect(() => {
    if (phase === 'battle_mcq') GameAudio.setMusicState('battle');
    if (phase === 'results') {
      GameAudio.setMusicState('idle');
      const scorePct = totalAnswered > 0 ? (totalCorrect / totalAnswered) : 0;
      const didWin = isTestUser ? true : (playerHp > 0 && (enemyHp <= 0 || scorePct >= 0.5));
      if (didWin) sfxLevelComplete();
      else sfxLevelFail();
    }
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ════════════════════════════════════════════════════════════════════════
  // 🟣 PHASE 1 — CONCEPT CARD
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'concept_card') {
    const card = cards[cardIdx];
    if (!card) { setPhase('battle_mcq'); return null; }
    const isLast = cardIdx + 1 >= cards.length;
    const phaseSteps = ['📖 Learn', '⚔️ Battle', '💻 Code', '🐛 Debug', '🔮 Predict'];

    const next = () => {
      if (isLast) {
        setPhase('battle_mcq');
        sfxPageTransition();
      } else {
        setCardIdx(c => c + 1);
        sfxPageTransition();
      }
    };

    return (
      <div className="h-screen flex flex-col bg-[#020610] text-white overflow-hidden">
        <div className="flex-none flex justify-between items-center px-6 py-4 border-b border-white/5">
          <button onClick={onBack} className="p-2 bg-white/5 border border-white/10 rounded-xl hover:border-brand-neon transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {phaseSteps.map((s, i) => (
              <div key={i} className={`flex flex-col items-center gap-1`}>
                <div className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-8 bg-brand-neon' : 'w-4 bg-white/10'}`} />
                <span className="text-[7px] text-white/20 hidden md:block">{s}</span>
              </div>
            ))}
          </div>
          <span className="text-[10px] font-black text-white/20">{cardIdx + 1}/{cards.length}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex items-start justify-center">
          <motion.div key={cardIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-black/70 border border-white/10 rounded-[32px] p-8 shadow-2xl">

            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-neon/10 border border-brand-neon/30 text-brand-neon text-[9px] font-black uppercase tracking-[0.3em]">
                <BookOpen className="w-3 h-3" /> CONCEPT BRIEFING
              </div>
              {card.emoji && <span className="text-3xl">{card.emoji}</span>}
            </div>

            <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-4 leading-tight">{card.title}</h2>
            {card.analogy && (
              <div className="bg-brand-neon/5 border border-brand-neon/20 rounded-xl p-4 mb-5">
                <p className="text-brand-neon text-xs font-bold mb-1">🎯 Think of it like this:</p>
                <p className="text-white/70 text-sm">{card.analogy}</p>
              </div>
            )}
            <p className="text-white/80 text-base leading-relaxed mb-5">{card.content}</p>

            {card.examples?.map((ex, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl mb-3">
                <p className="text-brand-neon text-xs font-black mb-1 flex items-center gap-2"><Zap className="w-3 h-3" />{ex.title}</p>
                <p className="text-white/50 text-xs mb-2">{ex.explanation}</p>
                <pre className="bg-black/70 p-3 rounded-lg text-xs font-mono text-brand-neon/70 overflow-x-auto border border-white/5 whitespace-pre-wrap">{ex.code}</pre>
              </div>
            ))}

            <button onClick={next}
              className="w-full py-4 bg-brand-neon text-black font-black text-sm uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(0,255,204,0.3)] flex items-center justify-center gap-2">
              {isLast ? '⚔️ ENTER COMBAT' : 'GOT IT →'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // 🟡 PHASE 2 — BATTLE MCQ
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'battle_mcq') {
    if (mcqs.length === 0) { setPhase('coding_lab'); return null; }
    const q = mcqs[mcqIdx];

    const handleMcq = (idx) => {
      if (mcqResult) return;
      sfxClick();
      setMcqSelected(idx);
      setTotalAnswered(t => t + 1);
      
      if (idx === q.a) {
        setMcqResult('correct'); 
        setMcqCorrect(c => c + 1);
        setTotalCorrect(t => t + 1);
        sfxAttack();
        sfxSuccess();
        hitEnemy(mcqDmgEach);
        recoverPlayer(5);
        logCombat(`⚔️ CRITICAL HIT! ${mcqDmgEach} DMG DEALT`);
        
        // Auto-advance on correct after a short delay
        setTimeout(() => {
          setMcqResult(null);
          setMcqSelected(null);
          const next = mcqIdx + 1;
          next < mcqs.length
            ? setMcqIdx(next)
            : setPhase(codings.length ? 'coding_lab' : debugs.length ? 'debug_mission' : oracles.length ? 'oracle_test' : 'results');
        }, isTestUser ? 600 : 1800);
      } else {
        setMcqResult('wrong');
        sfxError();
        hitPlayer(playerDmgEach);
        if (q.topic && !weakAreas.includes(q.topic)) setWeakAreas(p => [...p, q.topic]);
        logCombat(`💥 ENEMY COUNTERS! -${playerDmgEach} HP`);
        // ON WRONG: Don't auto-advance. Let them read the explanation then click "ACKNOWLEDGE"
      }
    };

    const nextMcq = () => {
      sfxClick();
      setMcqResult(null);
      setMcqSelected(null);
      const next = mcqIdx + 1;
      next < mcqs.length
        ? setMcqIdx(next)
        : setPhase(codings.length ? 'coding_lab' : debugs.length ? 'debug_mission' : oracles.length ? 'oracle_test' : 'results');
    };

    return (
      <CombatLayout 
        phaseName="Tactical Combat" 
        Icon={Crosshair} 
        accentClass="border-brand-orange/30 bg-brand-orange/10 text-brand-orange"
        playerHp={playerHp}
        enemyHp={enemyHp}
        maxEnemyHp={maxEnemyHp}
        enemyName={pipelineData.battle?.enemy?.name}
        onBack={onBack}
        totalCorrect={totalCorrect}
        totalAnswered={totalAnswered}
        combatLog={combatLog}
        combatAction={combatAction}
      >
        <motion.div key={mcqIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 border border-white/10 rounded-2xl p-5 relative overflow-hidden h-full">
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <motion.div className="h-full bg-brand-orange" animate={{ width: `${(mcqIdx / mcqs.length) * 100}%` }} />
          </div>
          <div className="flex justify-between items-center mb-4 pt-2">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Q{mcqIdx + 1} of {mcqs.length}</span>
            <AnimatePresence>
              {mcqResult && (
                <motion.span initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                  className={`text-[9px] font-black px-3 py-1 rounded-full border uppercase ${
                    mcqResult === 'correct' ? 'text-brand-success border-brand-success/30 bg-brand-success/10'
                    : 'text-red-400 border-red-400/30 bg-red-400/10'}`}>
                  {mcqResult === 'correct' ? '✅ CORRECT!' : '❌ WRONG!'}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <h3 className="text-lg font-black mb-4 leading-snug uppercase italic">{q?.q}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {q?.options.map((opt, i) => {
              let btnClass = 'bg-white/5 border-white/10 hover:border-brand-orange hover:bg-brand-orange/10 text-white/80';
              if (mcqResult) {
                if (i === q.a) {
                  btnClass = 'bg-brand-success/20 border-brand-success text-brand-success ring-2 ring-brand-success/40 scale-[1.02]';
                } else if (mcqResult === 'wrong' && i === mcqSelected) {
                  btnClass = 'bg-red-500/20 border-red-500 text-red-400 ring-2 ring-red-500/40';
                } else {
                  btnClass = 'opacity-30 border-white/5 cursor-not-allowed text-white/30';
                }
              }
              return (
                <button key={i} onClick={() => handleMcq(i)} disabled={!!mcqResult}
                  className={`text-left py-3.5 px-4 rounded-xl border text-sm transition-all active:scale-95 font-semibold ${btnClass}`}>
                  <span className="text-[9px] font-black opacity-30 mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
                  {mcqResult && i === q.a && <span className="ml-2 text-[9px] font-black tracking-widest">✅ CORRECT</span>}
                  {mcqResult === 'wrong' && i === mcqSelected && <span className="ml-2 text-[9px] font-black tracking-widest">❌ WRONG</span>}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {mcqResult === 'wrong' && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="p-5 bg-orange-600/20 border-2 border-orange-500 rounded-[24px] flex flex-col md:flex-row items-center gap-6 relative z-[100] shadow-[0_0_50px_rgba(249,115,22,0.2)]">
                <div className="flex-1">
                  <p className="text-orange-400 text-xs font-black uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                    BATTLE INTEL RECOVERED
                  </p>
                  <p className="text-white text-sm leading-relaxed font-medium">
                    {q?.explanation || "Carefully study the logic of this protocol to avoid future synchronization failures."}
                  </p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextMcq(); }}
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                  className="px-10 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all flex-none flex items-center gap-3 animate-pulse">
                  CONTINUE MISSION
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </CombatLayout>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // 🔵 PHASE 3 — CODING LAB
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'coding_lab') {
    if (codings.length === 0) { setPhase(debugs.length ? 'debug_mission' : 'oracle_test'); return null; }
    const q = codings[codeIdx];
    const handleCode = (e) => {
      e.preventDefault();
      const ans = e.target.elements.code_ans.value.trim();
      const ok = q.validate ? q.validate(ans) : ans.toLowerCase() === (q.answer || '').toLowerCase();
      setCodeAttempts(a => a + 1);
      setTotalAnswered(t => t + 1);
      if (ok) {
        setCodeResult('correct'); setTotalCorrect(t => t + 1);
        hitEnemy(codeDmgEach); recoverPlayer(10);
        logCombat(`💻 CODE EXECUTED! +${codeDmgEach} DMG`);
        setTimeout(() => {
          setCodeResult(null); setCodeAnswer(''); setCodeHintShown(false); setCodeAttempts(0);
          const next = codeIdx + 1;
          next < codings.length ? setCodeIdx(next) : setPhase(debugs.length ? 'debug_mission' : oracles.length ? 'oracle_test' : 'results');
        }, 1400);
      } else {
        setCodeResult('wrong');
        if (codeAttempts >= 1) setCodeHintShown(true);
        hitPlayer(playerDmgEach); logCombat(`⚠️ SYNTAX ERROR! -${playerDmgEach} HP`);
        if (isTestUser) {
          setTimeout(() => {
            setCodeResult(null); setCodeAnswer(''); setCodeHintShown(false); setCodeAttempts(0);
            const next = codeIdx + 1;
            next < codings.length ? setCodeIdx(next) : setPhase(debugs.length ? 'debug_mission' : oracles.length ? 'oracle_test' : 'results');
          }, 1000);
        } else {
          setTimeout(() => setCodeResult(null), 2000);
        }
      }
    };
    return (
      <CombatLayout 
        phaseName="Coding Lab" 
        Icon={Code2} 
        accentClass="border-blue-400/30 bg-blue-400/10 text-blue-400"
        playerHp={playerHp}
        enemyHp={enemyHp}
        maxEnemyHp={maxEnemyHp}
        enemyName={pipelineData.battle?.enemy?.name}
        onBack={onBack}
        totalCorrect={totalCorrect}
        totalAnswered={totalAnswered}
        combatLog={combatLog}
        combatAction={combatAction}
      >
        <motion.div key={codeIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 border border-blue-400/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(96,165,250,0.08)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-400/10 border border-blue-400/30 rounded-full text-blue-400 font-black text-[9px] tracking-widest uppercase">
              <Code2 className="w-3 h-3" />CODING LAB {codeIdx + 1}/{codings.length}
            </span>
          </div>
          <h3 className="text-base font-black mb-1.5 uppercase italic">{q.title}</h3>
          <p className="text-white/50 text-sm mb-3">🎯 {q.objective}</p>
          {q.starterCode && <pre className="bg-black/70 border border-white/10 rounded-xl p-3 text-xs font-mono text-brand-neon/70 mb-3 overflow-x-auto">{q.starterCode}</pre>}
          {codeHintShown && q.hint && (
            <div className="mb-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-300 text-xs">💡 Hint: {q.hint}</div>
          )}
          {codeResult && (
            <div className={`mb-3 p-3 rounded-xl text-sm font-black ${codeResult === 'correct' ? 'bg-brand-success/20 text-brand-success' : 'bg-red-500/20 text-red-400'}`}>
              {codeResult === 'correct' ? '✅ PERFECT!' : (
                <div>
                  <p>❌ Not quite — try again!</p>
                  {q.answer && (
                    <p className="mt-1.5 text-yellow-300 font-mono text-xs">💡 Correct answer: <span className="text-brand-success font-black">{q.answer}</span></p>
                  )}
                </div>
              )}
            </div>
          )}
          <form onSubmit={handleCode} className="flex gap-2">
            <input name="code_ans" type="text" autoComplete="off" placeholder="Type your answer..." value={codeAnswer} onChange={e => setCodeAnswer(e.target.value)}
              className="flex-1 bg-black/60 border border-white/10 focus:border-blue-400 rounded-xl px-4 py-2.5 text-white font-mono text-sm outline-none transition-all" />
            <button type="submit" className="px-5 bg-blue-500 hover:bg-blue-400 text-white font-black text-xs uppercase rounded-xl transition-all active:scale-95">RUN</button>
          </form>
        </motion.div>
      </CombatLayout>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // 🟠 PHASE 4 — DEBUG MISSION
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'debug_mission') {
    if (debugs.length === 0) { setPhase(oracles.length ? 'oracle_test' : 'results'); return null; }
    const q = debugs[debugIdx];
    const handleDebug = (opt) => {
      if (debugResult) return;
      setDebugSelected(opt);
      const ok = opt === q.answer;
      setTotalAnswered(t => t + 1);
      if (ok) {
        setDebugResult('correct'); setTotalCorrect(t => t + 1);
        hitEnemy(debugDmgEach); recoverPlayer(8);
        logCombat(`🐛 BUG ELIMINATED! +${debugDmgEach} DMG`);
        setTimeout(() => {
          setDebugResult(null); setDebugSelected(null);
          const next = debugIdx + 1;
          next < debugs.length ? setDebugIdx(next) : setPhase(oracles.length ? 'oracle_test' : 'results');
        }, isTestUser ? 800 : 2000);
      } else {
        setDebugResult('wrong'); hitPlayer(playerDmgEach); logCombat(`🚨 PATCH FAILED! -${playerDmgEach} HP`);
        if (isTestUser) {
          setTimeout(() => {
            setDebugResult(null); setDebugSelected(null);
            const next = debugIdx + 1;
            next < debugs.length ? setDebugIdx(next) : setPhase(oracles.length ? 'oracle_test' : 'results');
          }, 1000);
        } else {
          setTimeout(() => { setDebugResult(null); setDebugSelected(null); }, 2500);
        }
      }
    };
    return (
      <CombatLayout 
        phaseName="Debug Mission" 
        Icon={Bug} 
        accentClass="border-orange-400/30 bg-orange-400/10 text-orange-400"
        playerHp={playerHp}
        enemyHp={enemyHp}
        maxEnemyHp={maxEnemyHp}
        enemyName={pipelineData.battle?.enemy?.name}
        onBack={onBack}
        totalCorrect={totalCorrect}
        totalAnswered={totalAnswered}
        combatLog={combatLog}
        combatAction={combatAction}
      >
        <motion.div key={debugIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 border border-orange-400/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(251,146,60,0.08)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 border border-red-500/40 rounded-full text-red-400 font-black text-[9px] tracking-widest uppercase animate-pulse">
              <Bug className="w-3 h-3" />🚨 DEBUG MISSION {debugIdx + 1}/{debugs.length}
            </span>
          </div>
          <p className="text-white/60 text-sm mb-4">{q.description}</p>
          {q.brokenCode && (
            <div className="mb-4">
              <p className="text-red-400 text-[9px] font-black uppercase tracking-widest mb-2">⚠️ CORRUPTED CODE:</p>
              <pre className="bg-black/80 border border-red-500/30 rounded-xl p-3 text-xs font-mono overflow-x-auto leading-relaxed">
                {q.brokenCode.split('\n').map((line, li) => (
                  <div key={li} className={li === q.bugLine ? 'bg-red-500/20 text-red-300' : 'text-white/70'}>
                    <span className="text-white/20 select-none mr-3">{li + 1}</span>{line}
                  </div>
                ))}
              </pre>
            </div>
          )}
          {debugResult && (
            <div className={`mb-3 p-3 rounded-xl text-sm font-black ${debugResult === 'correct' ? 'bg-brand-success/20 text-brand-success' : 'bg-red-500/20 text-red-400'}`}>
              {debugResult === 'correct' ? '✅ BUG FIXED!' : (
                <div>
                  <p>❌ Not quite. {q.hint || ''}</p>
                  <p className="mt-1.5 text-brand-success text-xs">✅ Correct fix: <strong>{q.answer}</strong></p>
                </div>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options?.map((opt, i) => {
              let btnClass = 'bg-white/5 border-white/10 hover:border-orange-400 hover:bg-orange-400/10 text-white/70';
              if (debugResult) {
                if (opt === q.answer) {
                  btnClass = 'bg-brand-success/20 border-brand-success text-brand-success ring-2 ring-brand-success/40';
                } else if (debugResult === 'wrong' && opt === debugSelected) {
                  btnClass = 'bg-red-500/20 border-red-500 text-red-400 ring-2 ring-red-500/40';
                } else {
                  btnClass = 'opacity-30 border-white/5 text-white/30';
                }
              }
              return (
                <button key={i} onClick={() => handleDebug(opt)} disabled={!!debugResult}
                  className={`text-left py-3 px-4 rounded-xl border text-xs font-mono transition-all active:scale-95 ${btnClass}`}>
                  {opt}
                  {debugResult && opt === q.answer && <span className="ml-1 text-[8px]">✅</span>}
                  {debugResult && opt === debugSelected && <span className="ml-1 text-[8px]">❌</span>}
                </button>
              );
            })}
          </div>
        </motion.div>
      </CombatLayout>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // 🟢 PHASE 5 — ORACLE TEST
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'oracle_test') {
    if (oracles.length === 0) { setPhase('results'); return null; }
    const q = oracles[oracleIdx];
    const handleOracle = (opt) => {
      if (oracleResult) return;
      const ok = opt === q.answer;
      setTotalAnswered(t => t + 1);
      if (ok) { setOracleResult('correct'); setTotalCorrect(t => t + 1); hitEnemy(oracleDmgEach); recoverPlayer(8); }
      else     { setOracleResult('wrong'); hitPlayer(playerDmgEach); logCombat(`🔴 WRONG PREDICTION! -${playerDmgEach} HP`); }
    };
    const goNext = () => {
      setOracleResult(null);
      const next = oracleIdx + 1;
      next < oracles.length ? setOracleIdx(next) : setPhase('results');
    };
    return (
      <CombatLayout 
        phaseName="Oracle Test" 
        Icon={Eye} 
        accentClass="border-green-400/30 bg-green-400/10 text-green-400"
        playerHp={playerHp}
        enemyHp={enemyHp}
        maxEnemyHp={maxEnemyHp}
        enemyName={pipelineData.battle?.enemy?.name}
        onBack={onBack}
        totalCorrect={totalCorrect}
        totalAnswered={totalAnswered}
        combatLog={combatLog}
        combatAction={combatAction}
      >
        <motion.div key={oracleIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 border border-green-400/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(74,222,128,0.08)]">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-400/10 border border-green-400/30 rounded-full text-green-400 font-black text-[9px] tracking-widest uppercase">
              <Eye className="w-3 h-3" />🔮 ORACLE TEST {oracleIdx + 1}/{oracles.length}
            </span>
          </div>
          <p className="text-white/50 text-sm mb-3">Think like a CPU — what does this output?</p>
          <pre className="bg-black/80 border border-green-400/20 rounded-xl p-4 text-xs font-mono text-green-300/80 mb-5 overflow-x-auto leading-relaxed">{q.code}</pre>
          {!oracleResult ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options?.map((opt, i) => (
                <button key={i} onClick={() => handleOracle(opt)}
                  className="text-left py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:border-green-400 hover:bg-green-400/10 text-white/70 text-sm font-mono transition-all active:scale-95">
                  <span className="text-[9px] opacity-30 mr-2">{String.fromCharCode(65+i)}.</span>{opt}
                </button>
              ))}
            </div>
          ) : (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3">
              <div className={`p-4 rounded-2xl border-2 ${oracleResult === 'correct' ? 'bg-brand-success/10 border-brand-success/40 text-brand-success' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                <p className="font-black text-sm">{oracleResult === 'correct' ? '✅ PERFECT PREDICTION!' : `❌ The answer was: "${q.answer}"`}</p>
                {q.explanation && <p className="text-white/50 text-xs mt-2">{q.explanation}</p>}
              </div>
              <button onClick={goNext} className="w-full py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-black tracking-widest uppercase text-sm transition-all">
                {oracleIdx + 1 < oracles.length ? 'NEXT →' : '🏆 COMPLETE'}
              </button>
            </motion.div>
          )}
        </motion.div>
      </CombatLayout>
    );
  }

  // ════════════════════════════════════════════════════════════════════════
  // 🔴 RESULTS
  // ════════════════════════════════════════════════════════════════════════
  if (phase === 'results') {
    const scorePct = totalAnswered > 0 ? (totalCorrect / totalAnswered) : 0;
    const isWin = isTestUser ? true : (playerHp > 0 && (enemyHp <= 0 || scorePct >= 0.5));


    return (
      <div className="h-screen flex items-center justify-center bg-black text-white p-6">
        <div className={`w-full max-w-md border-2 p-10 rounded-[40px] text-center relative overflow-hidden ${isWin ? 'border-brand-success/30 bg-[#001a0d]' : 'border-red-600/30 bg-[#1a0000]'}`}>
          <div className="text-6xl mb-4">{isWin ? '🏆' : '💀'}</div>
          <h2 className={`text-5xl font-black uppercase italic tracking-tighter mb-2 ${isWin ? 'text-brand-success' : 'text-red-500'}`}>
            {isWin ? 'VICTORY' : 'DEFEATED'}
          </h2>
          <p className="text-white/30 text-xs font-black tracking-[0.4em] uppercase mb-8">
            {isWin ? 'Sublevel Cleared!' : 'Combat Terminated'}
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { label: 'Total Score', val: `${totalCorrect}/${totalAnswered}` },
              { label: 'HP Left', val: `${Math.max(0, playerHp)}` },
              { label: 'Enemy', val: enemyHp <= 0 ? '☠️' : `${Math.round(enemyHp)}hp` },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-xl font-black">{s.val}</p>
                <p className="text-[8px] uppercase tracking-widest text-white/30 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          {weakAreas.length > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl mb-6 text-left">
              <p className="text-red-400 text-[8px] font-black uppercase tracking-widest mb-2 flex items-center gap-2"><AlertTriangle className="w-3 h-3"/>Weak Areas</p>
              <div className="flex flex-wrap gap-1.5">
                {[...new Set(weakAreas)].map((w, i) => (
                  <span key={i} className="px-2 py-0.5 bg-red-500/20 text-red-300 text-[8px] rounded-full border border-red-500/30">{w}</span>
                ))}
              </div>
            </div>
          )}
          <button onClick={() => { sfxClick(); isWin ? onComplete() : onBack(); }}
            className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${isWin ? 'bg-brand-success text-black hover:scale-105 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-white/10 hover:bg-white/20'}`}>
            {isWin ? '🚀 CLAIM XP & CONTINUE' : '🔄 RETRY'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
