"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Play, TerminalSquare, AlertTriangle, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

const SpellslingerEngine = dynamic(() => import('@/components/games/function-spellslinger/SpellslingerEngine'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#020617] flex items-center justify-center font-mono text-cyan-500">INITIALIZING RPG ENGINE...</div>
});

const LANGS = [
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'java',   label: 'Java',   icon: '☕' },
    { id: 'c',      label: 'C',      icon: '⚙️' },
    { id: 'cpp',    label: 'C++',    icon: '🔧' },
];

const langApiStyle = (lang, funcName, args) => {
    const argsStr = args.map(a => typeof a === 'string' ? `"${a}"` : a).join(', ');
    switch(lang) {
        case 'python': return `${funcName}(${argsStr})`;
        case 'java': return `${funcName}(${argsStr});`;
        case 'c': return `${funcName}(${argsStr});`;
        case 'cpp': return `${funcName}(${argsStr});`;
        default: return `${funcName}(${argsStr});`;
    }
};

const ARCANE_BEHEMOTH_PHASES = [
    {
        id: 0,
        type: "ATTACK",
        prompt: "The Behemoth is vulnerable to Fire! Deploy a Fireball dealing exactly 1000 damage.",
        api: `// SPIRES OF MAGIC API\nfunction castFireball(element, damage) { ... }`,
        defaultCode: `// Type your tactical command below:\n\n`,
        expectedFunc: 'castFireball',
        expectedArgs: ['Fire', 1000],
        bossDamage: 1000
    },
    {
        id: 1,
        type: "DEFENSE",
        prompt: "DANGER! The Behemoth is charging Oblivion Ray! Cast a shield across the 'Entire Party' immediately.",
        api: `// SPIRES OF MAGIC API\nfunction castShield(target) { ... }`,
        defaultCode: `// Defend the party!\n\n`,
        expectedFunc: 'castShield',
        expectedArgs: ['Entire Party'],
        bossDamage: 0
    },
    {
        id: 2,
        type: "SUPPORT",
        prompt: "The party took thermal damage! Heal exactly 750 HP.",
        api: `// SPIRES OF MAGIC API\nfunction healParty(amount) { ... }`,
        defaultCode: `// Channel restorative magic:\n\n`,
        expectedFunc: 'healParty',
        expectedArgs: [750],
        bossDamage: 0
    },
    {
        id: 3,
        type: "ATTACK",
        prompt: "The Behemoth exposed its core! Strike it with exactly 5 consecutive Thunder bolts to the 'Core'.",
        api: `// SPIRES OF MAGIC API\nfunction castThunder(strikes, targetPart) { ... }`,
        defaultCode: `// Unleash lightning:\n\n`,
        expectedFunc: 'castThunder',
        expectedArgs: [5, 'Core'],
        bossDamage: 2000
    },
    {
        id: 4,
        type: "FINISHER",
        prompt: "It's freezing over! Shatter it with maximum Ice power (2000).",
        api: `// SPIRES OF MAGIC API\nfunction castBlizzard(element, damage) { ... }`,
        defaultCode: `// Finish the fight!\n\n`,
        expectedFunc: 'castBlizzard',
        expectedArgs: ['Ice', 2000],
        bossDamage: 2000
    }
];

export default function SpellslingerPage() {
    const [selectedLang, setSelectedLang] = useState('python');
    const [phaseIdx, setPhaseIdx] = useState(0);
    const phase = ARCANE_BEHEMOTH_PHASES[phaseIdx] || ARCANE_BEHEMOTH_PHASES[0];
    
    // Live Combat State
    const [bossHP, setBossHP] = useState(5000);
    const [partyHP, setPartyHP] = useState(2500);
    const [gamePhase, setGamePhase] = useState("FIGHTING"); // FIGHTING, VICTORY, GAMEOVER
    
    const [code, setCode] = useState(phase.defaultCode);
    const [status, setStatus] = useState("IDLE"); // IDLE, RUNNING, SUCCESS, FAILED
    const [error, setError] = useState(null);
    const [lastAction, setLastAction] = useState(null);

    const handleNextPhase = () => {
        if (bossHP <= 0 || partyHP <= 0) {
            // Restart Entire Battle
            setPhaseIdx(0);
            setBossHP(5000);
            setPartyHP(2500);
            setGamePhase("FIGHTING");
            setCode(ARCANE_BEHEMOTH_PHASES[0].defaultCode);
            setStatus("IDLE");
            setError(null);
            setLastAction(null);
            return;
        }

        const next = phaseIdx + 1;
        if (next < ARCANE_BEHEMOTH_PHASES.length) {
            setPhaseIdx(next);
            setCode(ARCANE_BEHEMOTH_PHASES[next].defaultCode);
            setStatus("IDLE");
            setError(null);
            setLastAction(null);
        }
    };

    const handleExecuteTurn = () => {
        setError(null);
        setStatus("RUNNING");
        
        let actionFired = null;

        // Extended Boss API
        const castBlizzard = (element, power) => { actionFired = { func: 'castBlizzard', args: [element, power] }; }
        const castFireball = (element, power) => { actionFired = { func: 'castFireball', args: [element, power] }; }
        const castThunder = (strikes, target) => { actionFired = { func: 'castThunder', args: [strikes, target] }; }
        const healParty = (amount) => { actionFired = { func: 'healParty', args: [amount] }; }
        const castShield = (target) => { actionFired = { func: 'castShield', args: [target] }; }

        try {
            const func = new Function('castBlizzard', 'castFireball', 'castThunder', 'healParty', 'castShield', code);
            func(castBlizzard, castFireball, castThunder, healParty, castShield);

            // Synchronize with Phaser animations 
            setTimeout(() => {
                const processFailure = (errorMsg) => {
                    setStatus("FAILED");
                    setError(errorMsg);
                    
                    // Trigger Boss Counter-Attack via explicit command override
                    setLastAction({ func: 'bossAttack' });
                    
                    const newPartyHP = Math.max(0, partyHP - 500);
                    setPartyHP(newPartyHP);
                    if (newPartyHP <= 0) setGamePhase("GAMEOVER");
                };

                if (!actionFired) {
                    processFailure("Syntax Error: You did not call any valid functions! Turn forfeited. Boss Retaliates!");
                    return;
                }

                setLastAction(actionFired);

                if (actionFired.func !== phase.expectedFunc) {
                    processFailure(`Tactical Blunder! You called [${actionFired.func}] instead of [${phase.expectedFunc}]!`);
                    return;
                }

                // Check arguments strictly by value and type
                let argsMatch = true;
                let argError = null;
                
                if (actionFired.args.length !== phase.expectedArgs.length) {
                    argsMatch = false;
                    argError = `Expected ${phase.expectedArgs.length} arguments, but got ${actionFired.args.length}.`;
                } else {
                    for(let i=0; i<phase.expectedArgs.length; i++) {
                        if (actionFired.args[i] !== phase.expectedArgs[i]) {
                            argsMatch = false;
                            argError = `Argument ${i+1} mismatch: Passed [${typeof actionFired.args[i]} ${actionFired.args[i]}] instead of [${typeof phase.expectedArgs[i]} ${phase.expectedArgs[i]}].`;
                            break;
                        }
                    }
                }

                if (!argsMatch) {
                    processFailure(`Parameter Integrity Failed! ${argError}`);
                } else {
                    setStatus("SUCCESS");
                    const newBossHP = Math.max(0, bossHP - phase.bossDamage);
                    setBossHP(newBossHP);
                    if (newBossHP <= 0) {
                        setGamePhase("VICTORY");
                    } else {
                        // Automatically proceed to next phase after a delay
                        setTimeout(handleNextPhase, 2500);
                    }
                }
            }, 500); // Small initial delay to let Phaser start breathing

        } catch (err) {
            setTimeout(() => {
                setStatus("FAILED");
                setError(`CODE EXCEPTION: ${err.message}`);
                setLastAction({ func: 'bossAttack' });
                
                const newPartyHP = Math.max(0, partyHP - 500);
                setPartyHP(newPartyHP);
                if (newPartyHP <= 0) setGamePhase("GAMEOVER");
            }, 500);
        }
    };

    return (
        <div className="w-full h-screen min-h-[750px] bg-[#020617] text-slate-300 flex flex-col font-mono overflow-y-auto">
            
            {/* TOP HUD - BATTLE BANNER */}
            <div className="w-full h-24 border-b-2 border-slate-800 bg-[#0f172a] flex justify-between items-center px-8 z-10 shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <Link href="/dashboard" className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600">
                    <ArrowLeft className="w-6 h-6 text-cyan-400" />
                </Link>

                {/* Language Picker */}
                <div className="flex gap-1 p-1 bg-black/60 border border-slate-700 rounded-xl">
                    {LANGS.map(l => (
                        <button key={l.id} onClick={() => setSelectedLang(l.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                                selectedLang === l.id ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                            }`}>
                            <span>{l.icon}</span> {l.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center flex-1">
                    <h1 className="text-2xl font-black tracking-[0.3em] text-white flex items-center gap-4 uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        <ShieldAlert className="w-8 h-8 text-rose-500" />
                        Target: Arcane Behemoth
                    </h1>
                    
                    {/* Persistent HP Bars */}
                    <div className="flex gap-10 mt-2 w-full max-w-2xl justify-center">
                        <div className="flex flex-col items-center w-48">
                            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-1">Party HP</span>
                            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                                <div className="h-full bg-cyan-500 transition-all duration-500" style={{ width: `${(partyHP / 2500) * 100}%` }} />
                            </div>
                            <span className="text-xs text-white mt-1">{partyHP} / 2500</span>
                        </div>
                        
                        <div className="flex flex-col items-center w-64">
                            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest mb-1">Boss HP</span>
                            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                                <div className="h-full bg-rose-500 transition-all duration-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" style={{ width: `${(bossHP / 5000) * 100}%` }} />
                            </div>
                            <span className="text-xs text-white mt-1">{bossHP} / 5000</span>
                        </div>
                    </div>
                </div>

                {gamePhase !== "FIGHTING" && (
                    <button onClick={handleNextPhase} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl flex items-center gap-2 uppercase tracking-widest transition-all animate-pulse">
                        Play Again <Play className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* PHASER BATTLE ENGINE */}
            <div className="flex-1 w-full relative z-0 border-b-2 border-slate-800 bg-[#020617] min-h-[300px]">
                <SpellslingerEngine 
                    action={lastAction}
                    status={status}
                    actionTime={Date.now()}
                    bossId={2} // Use the Void eye or standard behemoth
                />
            </div>

            {/* BOTTOM HUD - CODING TERMINAL (Fully Responsive Flex) */}
            <div className="w-full flex flex-col lg:flex-row bg-[#0f172a] shrink-0 z-10 lg:h-80">
                
                {/* API Documentation Panel */}
                <div className="w-full lg:w-[400px] border-b-2 lg:border-r-2 lg:border-b-0 border-slate-800 flex flex-col p-6 bg-[#020617] h-64 lg:h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Spell Functions API
                        </h3>
                        <Link href="/function-spellslinger/guide" className="text-[10px] bg-indigo-950/50 text-indigo-400 px-3 py-1 rounded font-black tracking-widest uppercase hover:bg-indigo-900 border border-indigo-900/50 transition-colors flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> OFFICIAL GUIDE
                        </Link>
                    </div>
                    <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl p-4 overflow-y-auto">
                        <pre className="text-[11px] text-emerald-400/80 font-mono leading-relaxed whitespace-pre-wrap">
                            {phase.api}
                        </pre>
                    </div>
                </div>

                {/* Editor Box */}
                <div className="flex-1 flex flex-col p-6 min-h-[300px] lg:min-h-0 bg-[#061022]">
                    
                    {/* Game Over / Victory Overlays */}
                    {gamePhase === "GAMEOVER" && (
                        <div className="absolute inset-0 z-50 bg-rose-950/90 flex flex-col items-center justify-center p-8 backdrop-blur-md">
                            <h2 className="text-5xl font-black text-rose-500 tracking-widest uppercase break-words text-center drop-shadow-[0_0_30px_rgba(244,63,94,1)]">PARTY WIPED OUT</h2>
                            <p className="mt-4 text-rose-300 font-bold tracking-widest text-center">Your code was weak, and the Behemoth crushed you.</p>
                        </div>
                    )}
                    {gamePhase === "VICTORY" && (
                        <div className="absolute inset-0 z-50 bg-emerald-950/90 flex flex-col items-center justify-center p-8 backdrop-blur-md">
                            <h2 className="text-5xl font-black text-emerald-400 tracking-widest uppercase break-words text-center drop-shadow-[0_0_30px_rgba(52,211,153,1)]">ARCANE MASTERY</h2>
                            <p className="mt-4 text-emerald-300 font-bold tracking-widest text-center">The Behemoth is vanquished by flawless code execution!</p>
                        </div>
                    )}

                    <div className="w-full px-5 py-3 mb-4 bg-rose-950/40 border-l-4 border-rose-500 rounded-r-lg text-rose-200 text-xs font-medium leading-relaxed shadow-md flex gap-3">
                        <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 animate-pulse" />
                        <span><strong>TURN {phaseIdx + 1} TACTIC:</strong> {phase.prompt}</span>
                    </div>

                    <h3 className="text-xs font-black tracking-widest text-cyan-500 uppercase flex items-center gap-2 mb-4">
                        <TerminalSquare className="w-4 h-4" /> Command Execution
                    </h3>
                    
                    <div className="flex-1 relative rounded-xl bg-[#020617] border border-cyan-900/40 p-5 shadow-[inset_0_0_20px_rgba(0,0,0,1)] group">
                        <textarea 
                            className="w-full h-full bg-transparent text-cyan-300 font-mono text-sm leading-relaxed outline-none resize-none placeholder-slate-700 selection:bg-cyan-900 z-10 relative"
                            spellCheck="false"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                </div>
                
                {/* Execution Panel */}
                <div className="w-full lg:w-[350px] flex flex-col p-6 bg-gradient-to-t lg:bg-gradient-to-l from-[#020617] to-[#0f172a] border-t-2 lg:border-t-0 lg:border-l-2 border-slate-800 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
                    <button 
                        onClick={handleExecuteTurn}
                        className="w-full py-6 mt-2 mb-6 bg-cyan-600 hover:bg-cyan-500 text-white font-black text-lg tracking-widest uppercase rounded-2xl shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_40px_rgba(8,145,178,0.6)] flex justify-center items-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none border border-cyan-400/50"

                        disabled={status === "RUNNING" || status === "SUCCESS"}
                    >
                        <Play className="w-6 h-6 fill-current" />
                        EXECUTE TURN
                    </button>

                    <div className="flex-1 flex flex-col justify-end">
                        {status === "FAILED" && (
                            <div className="p-5 bg-rose-950 border-l-4 border-rose-500 rounded-r-xl text-rose-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                                    <span className="font-black text-xs tracking-widest uppercase text-rose-500">Boss Counter-Attack!</span>
                                </div>
                                <p className="text-[11px] font-medium leading-relaxed">{error}</p>
                                <div className="mt-4 pt-3 border-t border-rose-900/50">
                                    <span className="text-[10px] font-bold uppercase text-rose-400">Correct Tactical Command:</span>
                                    <code className="block mt-1 bg-rose-900/30 px-3 py-2 rounded text-emerald-300 text-[12px] font-mono font-black border border-rose-800/50">
                                        {langApiStyle(selectedLang, phase.expectedFunc, phase.expectedArgs)}
                                    </code>
                                </div>
                            </div>
                        )}

                        {status === "SUCCESS" && (
                            <div className="p-5 bg-emerald-950 border-l-4 border-emerald-500 rounded-r-xl text-emerald-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-emerald-500" />
                                    <span className="font-black text-xs tracking-widest uppercase text-emerald-500">Critical Hit!</span>
                                </div>
                                <p className="text-[11px] font-medium leading-relaxed">Exact function array executed flawlessly. Engaging next battle phase...</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
