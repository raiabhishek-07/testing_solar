"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Bug, Heart, Terminal, AlertTriangle, ShieldCheck, Cpu } from 'lucide-react';
import Editor from '@monaco-editor/react';

const BugHunterEngine = dynamic(
    () => import('@/components/games/bug-platformer/BugHunterEngine'), 
    { ssr: false, loading: () => <div className="absolute inset-0 bg-[#020617] flex items-center justify-center font-mono text-cyan-500">BOOTING MAINFRAME...</div> }
);

const BUG_PUZZLES = {
    bug_1: {
        errorType: "ReferenceError",
        errorMessage: "x is not defined",
        codeSnippet: `function getCoordinates() {\n    let y = 20;\n    \n    return { x: x, y: y };\n}`,
        tactic: "A ReferenceError means a variable was used before being declared. Declare 'x' (e.g. let x = 10) somewhere before it is used!",
        correctFix: "let x = 10; // Must be declared before returning!",
        validate: (code) => {
            if (!code.includes("getCoordinates")) return false;
            try { return new Function(code + "\nreturn getCoordinates();")()?.x !== undefined; } catch (e) { return false; }
        }
    },
    bug_2: {
        errorType: "SyntaxError",
        errorMessage: "Unexpected token 'else'",
        codeSnippet: `function checkAge(age) {\n    if (age >= 18)\n        return "Adult";\n        console.log("Checking!");\n    else {\n        return "Minor";\n    }\n}`,
        tactic: "A SyntaxError happens when Javascript structure is broken. When an 'if' block has multiple lines, what structural brackets { } are missing?",
        correctFix: "Wrap the 'if' block contents in { ... } braces.",
        validate: (code) => {
            try { return new Function(code + "\nreturn checkAge(20);")() === "Adult"; } catch (e) { return false; }
        }
    },
    bug_3: {
        errorType: "TypeError",
        errorMessage: "user.getName is not a function",
        codeSnippet: `const user = {\n    name: "Alex",\n    age: 25\n};\n\nfunction greetUser() {\n    return "Hello, " + user.getName();\n}`,
        tactic: "A TypeError occurs when an operation is performed on the wrong data type. Ensure the 'user' object actually has a functioning getName() method!",
        correctFix: "Add 'getName: function() { return this.name; }' inside the user object.",
        validate: (code) => {
            try { return new Function(code + "\nreturn greetUser();")().includes("Alex"); } catch (e) { return false; }
        }
    },
    bug_4: {
        errorType: "TypeError",
        errorMessage: "Assignment to constant variable.",
        codeSnippet: `function incrementScore() {\n    const score = 100;\n    score += 50;\n    return score;\n}`,
        tactic: "You cannot reassign a variable declared with 'const'. Use the proper declaration for mutating variables!",
        correctFix: "Change 'const score = 100;' to 'let score = 100;'",
        validate: (code) => {
            try { return new Function(code + "\nreturn incrementScore();")() === 150; } catch (e) { return false; }
        }
    },
    bug_5: {
        errorType: "TypeError",
        errorMessage: "Cannot read properties of undefined (reading 'toUpperCase')",
        codeSnippet: `function shoutWords(words) {\n    for (let i = 0; i <= words.length; i++) {\n        words[i] = words[i].toUpperCase();\n    }\n    return words;\n}`,
        tactic: "An off-by-one array error causes the loop to check an index out of bounds (which is undefined!). Fix the loop iteration limit.",
        correctFix: "Change 'i <= words.length' to 'i < words.length' instead.",
        validate: (code) => {
            try { return new Function(code + "\nreturn shoutWords(['a','b'])[1];")() === "B"; } catch (e) { return false; }
        }
    },
    bug_6: {
        errorType: "SyntaxError",
        errorMessage: "Unexpected token '{' - Arrow function requires explicit return",
        codeSnippet: `const getDouble = (x) => {\n    x * 2;\n};\n\nfunction calculate() {\n    return getDouble(10);\n}`,
        tactic: "If you use { curly braces } in an arrow function, you must explicitly type the 'return' keyword inside!",
        correctFix: "Add 'return x * 2;' or remove the { } entirely.",
        validate: (code) => {
            try { return new Function(code + "\nreturn calculate();")() === 20; } catch (e) { return false; }
        }
    },
    bug_7: {
        errorType: "TypeError",
        errorMessage: "Cannot destructure property 'data' of 'response' as it is undefined.",
        codeSnippet: `function processData(response) {\n    const { data } = response;\n    return data.id;\n}\n\n// Imagine response comes back undefined!`,
        tactic: "When pulling properties destructively from objects that might fail, assign a default empty object {} fallback!",
        correctFix: "const { data } = response || {};",
        validate: (code) => {
            try { return new Function(code + "\nreturn processData({ data: { id: 777 }});")() === 777; } catch (e) { return false; }
        }
    },
    bug_8: {
        errorType: "ReferenceError",
        errorMessage: "i is not defined",
        codeSnippet: `function countLoops() {\n    let total = 0;\n    for (i = 0; i < 5; i++) {\n        total += i;\n    }\n    return total;\n}`,
        tactic: "Inside strict mode, iterating loops MUST declare their counter variables or they bleed into global scope and crash.",
        correctFix: "Update the loop to 'for (let i = 0...)'",
        validate: (code) => {
            if (!code.includes("let i")) return false; 
            try { return new Function(code + "\nreturn countLoops();")() === 10; } catch (e) { return false; }
        }
    },
    bug_9: {
        errorType: "Logical Fault",
        errorMessage: "Condition failed: NaN equality check",
        codeSnippet: `function checkIsNumber(val) {\n    let result = Number(val);\n    if (result === NaN) {\n        return false;\n    }\n    return true;\n}`,
        tactic: "In Javascript, NaN is NEVER equal to NaN (even with ===). You must use a built-in static Math method to check for it!",
        correctFix: "Use 'if (Number.isNaN(result))' or 'if (isNaN(result))'.",
        validate: (code) => {
            try { return new Function(code + "\nreturn checkIsNumber('abcText') === false;")(); } catch (e) { return false; }
        }
    },
    bug_10: {
        errorType: "RangeError",
        errorMessage: "Invalid array length",
        codeSnippet: `function createBuffer(size) {\n    if (size === 0) {\n        size = -5; // System defaulted negative!\n    }\n    return new Array(size);\n}`,
        tactic: "You cannot initialize a new Array() with a negative number length. It throws a catastrophic memory RangeError.",
        correctFix: "Change 'size = -5' to a positive fallback like 'size = 5'.",
        validate: (code) => {
            try { return new Function(code + "\nreturn createBuffer(0).length;")() > 0; } catch (e) { return false; }
        }
    }
};

export default function BugHunterPage() {
    const [hp, setHp] = useState(3);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState("IDLE"); // IDLE, FIGHTING, COMPILING
    const [combatStatus, setCombatStatus] = useState("IDLE"); // Passed down to Phaser
    const [activeBugId, setActiveBugId] = useState(null);
    const [code, setCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [resetFlag, setResetFlag] = useState(0);

    const activePuzzle = activeBugId ? BUG_PUZZLES[activeBugId] : null;

    // Triggered globally from Phaser Collisions
    const handleBugEngaged = (bugId) => {
        if (BUG_PUZZLES[bugId]) {
            setActiveBugId(bugId);
            setCode(BUG_PUZZLES[bugId].codeSnippet);
            setStatus("FIGHTING");
            setCombatStatus("IDLE");
            setErrorMsg("");
        }
    };

    const handleCompile = () => {
        setStatus("COMPILING");
        setErrorMsg("");

        setTimeout(() => {
            const isFixed = activePuzzle.validate(code);
            if (isFixed) {
                setCombatStatus("DEFEATED");
                setScore(s => s + 100);
                setTimeout(() => {
                    setStatus("IDLE"); // Unmount Modal
                    setActiveBugId(null);
                }, 1000); // Give time for green flash
            } else {
                setCombatStatus("FAILED");
                setHp(h => Math.max(0, h - 1));
                setErrorMsg("Compilation Failed! The Bug rejected your code.");
                setTimeout(() => {
                    setStatus("IDLE");
                    setActiveBugId(null);
                }, 1000); 
            }
        }, 800);
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#020617] relative overflow-hidden font-sans">
            
            {/* TOP HUD */}
            <div className="w-full h-20 bg-[#0f172a] border-b-2 border-slate-800 flex justify-between items-center px-8 z-10 shrink-0 shadow-lg">
                <Link href="/dashboard" className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600">
                    <ArrowLeft className="w-5 h-5 text-cyan-400" />
                </Link>

                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-black tracking-widest text-white flex items-center gap-3 uppercase">
                        <Bug className="w-6 h-6 text-rose-500" />
                        The Bug Hunter
                    </h1>
                    <div className="flex gap-4 items-center mt-1">
                        <span className="text-[10px] text-cyan-500 tracking-[0.2em] font-bold">MAIN_FRAME_EXPLORATION</span>
                        <Link href="/bug-platformer/guide" className="px-3 py-1 bg-rose-950 border border-rose-500 text-[10px] font-bold text-rose-300 tracking-[0.2em] rounded animate-pulse hover:bg-rose-900 transition-colors">OFFICIAL GUIDE</Link>
                    </div>
                </div>

                <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">SCORE</span>
                        <span className="font-mono text-cyan-400 font-bold">{score.toString().padStart(4, '0')}</span>
                    </div>
                    <div className="flex gap-1 h-8 items-center bg-slate-900 border border-slate-800 px-4 rounded-xl">
                        {[1, 2, 3].map(heart => (
                            <Heart key={heart} className={`w-5 h-5 ${hp >= heart ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* GAME CANVAS */}
            <div className="flex-1 w-full relative z-0">
                <BugHunterEngine 
                    onBugEngaged={handleBugEngaged} 
                    combatStatus={combatStatus} 
                    resetFlag={resetFlag} 
                />

                {/* GAME OVER STATE overlay */}
                {hp <= 0 && (
                    <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-md z-40 flex flex-col items-center justify-center p-8">
                        <AlertTriangle className="w-24 h-24 text-rose-500 mb-6 animate-pulse" />
                        <h2 className="text-6xl font-black text-rose-500 tracking-widest uppercase text-center drop-shadow-[0_0_20px_rgba(244,63,94,0.8)]">SYSTEM CRASH</h2>
                        <p className="mt-4 text-rose-300 font-bold tracking-widest text-center text-xl">The Bugs have corrupted the mainframe!</p>
                        <button 
                            onClick={() => { setHp(3); setScore(0); setResetFlag(r => r + 1); setStatus("IDLE"); setCombatStatus("IDLE"); }} 
                            className="mt-10 px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 flex items-center justify-center"
                        >
                            <Cpu className="w-5 h-5 inline-block mr-2" /> Reboot System
                        </button>
                    </div>
                )}

                {/* VICTORY STATE overlay */}
                {score >= 1000 && (
                    <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md z-40 flex flex-col items-center justify-center p-8">
                        <ShieldCheck className="w-32 h-32 text-emerald-400 mb-6 drop-shadow-[0_0_30px_rgba(52,211,153,0.8)]" />
                        <h2 className="text-6xl font-black text-emerald-400 tracking-widest uppercase text-center drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]">SYSTEM RESTORED</h2>
                        <p className="mt-4 text-emerald-200 font-bold tracking-widest text-center text-xl">You have successfully eradicated all 10 Core Logic Bugs.</p>
                        <Link 
                            href="/dashboard"
                            className="mt-10 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(52,211,153,0.4)] flex items-center justify-center"
                        >
                            Log Out to Dashboard
                        </Link>
                    </div>
                )}
            </div>

            {/* LIVE IDE MODAL (Slides up when a Bug is hit) */}
            <div className={`absolute bottom-0 left-0 w-full bg-[#061022] border-t-2 border-slate-800 transition-all duration-500 z-50 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.8)] ${status === 'FIGHTING' || status === 'COMPILING' ? 'h-[60vh] opacity-100 translate-y-0' : 'h-0 opacity-0 translate-y-full'}`}>
                
                {/* Modal Header */}
                {activePuzzle && (
                    <div className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8 shrink-0">
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-rose-950/50 text-rose-400 border border-rose-900 font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2">
                                <Bug className="w-4 h-4" /> Bug Detected
                            </span>
                            <span className="font-mono text-white text-sm">Target: <span className="text-rose-400">{activePuzzle.errorType}</span></span>
                        </div>
                        <span className="font-mono text-rose-400 font-black tracking-wider text-sm animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.3)] bg-rose-950 px-4 py-2 rounded-lg border border-rose-900">
                            {activePuzzle.errorMessage}
                        </span>
                    </div>
                )}

                {/* Main Content Area */}
                {activePuzzle && (
                    <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
                        {/* Prompt & Tactic Side */}
                        <div className="w-full lg:w-[400px] border-b-2 lg:border-r-2 lg:border-b-0 border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto bg-[#020617]/50 shrink-0">
                            <div>
                                <h3 className="text-xs text-slate-500 font-black tracking-widest uppercase mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Stack Trace Engine
                                </h3>
                                <div className="p-4 rounded-lg bg-rose-950/20 border-l-2 border-rose-500 text-sm text-rose-200 leading-relaxed font-mono">
                                    The execution thread crashed with a critical <strong className="text-rose-400">{activePuzzle.errorType}</strong>. 
                                    We intercepted the rogue function logic in the right buffer.
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-xs text-emerald-500 font-black tracking-widest uppercase mb-2 flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4" /> Debugging Tactic
                                </h3>
                                <div className="p-4 rounded-lg bg-emerald-950/20 border-l-2 border-emerald-500 text-sm text-emerald-200 leading-relaxed">
                                    {activePuzzle.tactic}
                                </div>
                            </div>
                        </div>

                        {/* Monaco IDE Side */}
                        <div className="flex-1 flex flex-col h-full bg-[#0a1120]">
                            <div className="flex-1 p-4 relative">
                                <Editor
                                    height="100%"
                                    defaultLanguage="javascript"
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(value) => setCode(value || "")}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 16,
                                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                                        padding: { top: 16 },
                                        scrollBeyondLastLine: false,
                                        wordWrap: "on"
                                    }}
                                />

                                {/* Execution Overlays */}
                                {status === "COMPILING" && (
                                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
                                        <Cpu className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                                        <span className="font-mono font-bold text-cyan-400 tracking-widest uppercase">Compiling Logic...</span>
                                    </div>
                                )}
                                {combatStatus === "DEFEATED" && (
                                    <div className="absolute inset-0 bg-emerald-900/90 z-20 flex flex-col items-center justify-center border-[4px] border-emerald-500 transition-all duration-300">
                                        <ShieldCheck className="w-16 h-16 text-emerald-400 mb-2 scale-150" />
                                        <span className="font-black text-2xl text-emerald-400 tracking-widest uppercase">BUG SQUASHED</span>
                                    </div>
                                )}
                                {combatStatus === "FAILED" && (
                                    <div className="absolute inset-0 bg-rose-950/90 z-20 flex flex-col items-center justify-center border-[4px] border-rose-500 shadow-[inset_0_0_50px_rgba(244,63,94,0.5)] p-8 text-center">
                                        <AlertTriangle className="w-16 h-16 text-rose-500 mb-2" />
                                        <span className="font-black text-xl text-rose-500 tracking-widest uppercase mb-2">COMPILATION FAILED</span>
                                        <span className="text-xs text-rose-300 font-mono mb-4">-1 HEALTH - YOU TOOK DAMAGE</span>
                                        <div className="bg-[#020617] p-4 rounded-lg font-mono text-xs border border-rose-800">
                                            <span className="text-rose-500 font-bold">SOLUTION REQUIRED:</span><br/>
                                            <span className="text-cyan-400">{activePuzzle.correctFix}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="h-16 shrink-0 bg-[#0f172a] border-t border-slate-800 flex items-center justify-between px-6">
                                <div className="text-xs font-mono text-rose-400">
                                    {errorMsg && <span>{errorMsg}</span>}
                                </div>
                                <button 
                                    onClick={handleCompile}
                                    disabled={status !== "FIGHTING"}
                                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black uppercase text-sm rounded transition-all flex items-center gap-2"
                                >
                                    <Terminal className="w-4 h-4" /> COMPILE PATCH
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
