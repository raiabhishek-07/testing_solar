"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Bug, ShieldCheck, Terminal, AlertTriangle, Cpu, Code2 } from 'lucide-react';

export default function BugHunterGuide() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-rose-500/30">
            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur-md border-b-2 border-slate-800">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href="/bug-platformer" className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600">
                            <ArrowLeft className="w-5 h-5 text-cyan-400" />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black tracking-widest text-white flex items-center gap-3 uppercase">
                                <BookOpen className="w-6 h-6 text-rose-500" />
                                Official Field Guide
                            </h1>
                            <span className="text-[10px] text-rose-500 tracking-[0.2em] font-bold mt-1">THE BUG HUNTER PROTOCOLS</span>
                        </div>
                    </div>
                    <Link href="/bug-platformer" className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-rose-900/50">
                        Launch Game
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

                {/* Game Overview */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                        <div className="p-3 bg-cyan-950/50 border border-cyan-800 text-cyan-400 rounded-xl">
                            <Cpu className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-wider">What is The Bug Hunter?</h2>
                            <p className="text-cyan-500 font-mono text-sm mt-1">Game Type: Action Side-Scroller & Real-Time IDE Debugging</p>
                        </div>
                    </div>
                    <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8 leading-relaxed text-slate-400">
                        <p className="mb-4">
                            <strong className="text-white">The Bug Hunter</strong> is a hybrid platforming game that fuses reflex-based jumping mechanics with live Javascript code diagnosis.
                        </p>
                        <p>
                            You explore the massive dark web server mainframe as a Neon Green Code Pointer. As you jump across corrupted memory platforms, you will encounter dangerous <strong className="text-rose-400">Red Pixel Bugs</strong>. Touching a bug immediately suspends physics and opens the powerful Monaco Javascript IDE right on top of your screen!
                        </p>
                    </div>
                </section>

                {/* How To Play */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                        <div className="p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-400 rounded-xl">
                            <Terminal className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-wider">Movement & Mechanics</h2>
                            <p className="text-emerald-500 font-mono text-sm mt-1">Navigating the Mainframe Grid</p>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                                <span className="bg-slate-800 p-1 rounded">⌨️</span> Basic Controls
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center"><span className="text-slate-400">Move Left/Right</span><span className="font-mono bg-slate-800 text-white px-3 py-1 rounded">A / D</span></li>
                                <li className="flex justify-between items-center"><span className="text-slate-400">Jump</span><span className="font-mono bg-slate-800 text-white px-3 py-1 rounded">W / Space</span></li>
                            </ul>
                        </div>

                        <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                                <Bug className="w-5 h-5 text-rose-500" /> Bug Combat
                            </h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                When you hit a Bug, the game pauses. You must read the <strong className="text-rose-400 font-mono">Stack Trace Error</strong> on the left panel, and fix the broken Javascript code inside the IDE.
                            </p>
                            <p className="text-sm text-slate-400 leading-relaxed mt-2">
                                Once you patch the code, click <strong className="text-emerald-400">COMPILE PATCH</strong>. If your fix works, the bug is eradicated. If you fail, you lose <strong className="text-rose-500">1 HP</strong>!
                            </p>
                        </div>
                    </div>
                </section>

                {/* Example Questions Panel */}
                <section className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-rose-900/50 pb-4">
                        <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-500 rounded-xl">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-rose-500 uppercase tracking-wider">Common Bugs & Solutions</h2>
                            <p className="text-rose-400 font-mono text-sm mt-1">Study these examples to survive the mainframe.</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        
                        {/* Example 1: ReferenceError */}
                        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/50">
                            <div className="bg-slate-800/80 px-6 py-4 flex items-center gap-3">
                                <span className="bg-rose-500 text-white text-xs font-black px-2 py-1 rounded uppercase">Bug Type 01</span>
                                <span className="font-mono font-bold text-rose-400 tracking-wider">ReferenceError: x is not defined</span>
                            </div>
                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Broken Code Segment</h4>
                                    <pre className="bg-[#020617] p-4 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 overflow-x-auto">
{`function getCoordinates() {
    let y = 20;
    
    // ERROR HAPPENS HERE!
    return { x: x, y: y };
}`}
                                    </pre>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">
                                        <ShieldCheck className="w-4 h-4" /> Correct Fix
                                    </h4>
                                    <p className="text-sm text-slate-400 mb-4">
                                        A <code className="bg-slate-800 px-1 rounded text-rose-300">ReferenceError</code> occurs when your code attempts to use a variable that hasn't been declared yet. To fix this, simply declare the variable <code className="text-cyan-300 bg-slate-800 px-1 rounded">x</code> before using it!
                                    </p>
                                    <div className="bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500">
                                        <code className="font-mono text-emerald-400">let x = 10;</code>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Example 2: SyntaxError */}
                        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/50">
                            <div className="bg-slate-800/80 px-6 py-4 flex items-center gap-3">
                                <span className="bg-orange-500 text-white text-xs font-black px-2 py-1 rounded uppercase">Bug Type 02</span>
                                <span className="font-mono font-bold text-orange-400 tracking-wider">SyntaxError: Unexpected token 'else'</span>
                            </div>
                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Broken Code Segment</h4>
                                    <pre className="bg-[#020617] p-4 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 overflow-x-auto">
{`function checkAge(age) {
    if (age >= 18)
        return "Adult";
        console.log("Checking!");
    else {
        return "Minor";
    }
}`}
                                    </pre>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">
                                        <ShieldCheck className="w-4 h-4" /> Correct Fix
                                    </h4>
                                    <p className="text-sm text-slate-400 mb-4">
                                        A <code className="bg-slate-800 px-1 rounded text-orange-300">SyntaxError</code> means structural syntax rules were broken. If an <code className="text-cyan-300 bg-slate-800 px-1 rounded">if</code> statement controls multiple lines of code, it MUST be wrapped in curly braces!
                                    </p>
                                    <div className="bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500 font-mono text-sm text-emerald-400">
{`if (age >= 18) {
    return "Adult";
    console.log("Checking!");
}`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Example 3: TypeError */}
                        <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-black/50">
                            <div className="bg-slate-800/80 px-6 py-4 flex items-center gap-3">
                                <span className="bg-purple-500 text-white text-xs font-black px-2 py-1 rounded uppercase">Bug Type 03</span>
                                <span className="font-mono font-bold text-purple-400 tracking-wider">TypeError: user.getName is not a function</span>
                            </div>
                            <div className="p-6 grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Broken Code Segment</h4>
                                    <pre className="bg-[#020617] p-4 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 overflow-x-auto">
{`const user = {
    name: "Alex",
    age: 25
};

function greetUser() {
    return "Hello, " + user.getName();
}`}
                                    </pre>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h4 className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3">
                                        <ShieldCheck className="w-4 h-4" /> Correct Fix
                                    </h4>
                                    <p className="text-sm text-slate-400 mb-4">
                                        A <code className="bg-slate-800 px-1 rounded text-purple-300">TypeError</code> occurs when a method is called on an object that doesn't actually possess that method. To fix this, you need to add the valid function binding into the data object!
                                    </p>
                                    <div className="bg-emerald-950/30 p-4 rounded-xl border-l-4 border-emerald-500 font-mono text-sm text-emerald-400 overflow-x-auto">
{`const user = {
    name: "Alex",
    age: 25,
    getName: function() {
        return this.name;
    }
};`}
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </section>

            </main>
        </div>
    );
}
