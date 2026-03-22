"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Swords, Zap, Shield, Sparkles, TerminalSquare } from 'lucide-react';

export default function SpellslingerGuidePage() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-300 font-mono p-8 lg:p-16">
            
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 flex items-center gap-6">
                    <Link href="/function-spellslinger" className="p-4 bg-slate-800/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600">
                        <ArrowLeft className="w-6 h-6 text-cyan-400" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black tracking-widest text-white uppercase flex items-center gap-4">
                            <BookOpen className="w-10 h-10 text-rose-500" />
                            Spires of Magic: Official Tome
                        </h1>
                        <p className="text-slate-400 mt-2">The Comprehensive Guide to the Function Spellslinger Engine.</p>
                    </div>
                </div>

                <div className="space-y-12">
                    
                    {/* Core Mechanics */}
                    <section className="bg-[#0f172a] border-l-4 border-cyan-500 p-8 rounded-r-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Swords className="text-cyan-400" />
                            How to Defeat Monsters
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            Unlike traditional RPGs where you click a sword icon, you are a master of the **Javascript Arcane Arts**. You deal damage by executing strict, perfectly-formatted code commands.
                        </p>
                        <ol className="list-decimal list-inside space-y-3 text-emerald-400 font-medium bg-[#020617] p-6 rounded-xl border border-slate-800">
                            <li>Read the <strong className="text-rose-400">BOSS TACTIC</strong> to discover the monster's weakness.</li>
                            <li>Consult the <strong className="text-cyan-400">API Documentation</strong> on the left to see which Function you need.</li>
                            <li>Type the exact function name into the center Terminal.</li>
                            <li>Pass the exact requested **Parameters** (Arguments) mathematically matching what the boss requires.</li>
                            <li>Hit <strong>EXECUTE TURN</strong>. If you made a syntax error or a Data Type mismatch, your turn is forfeited!</li>
                        </ol>
                    </section>

                    {/* API Dictionary */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <TerminalSquare className="text-rose-500" />
                            The Spellslinger API Reference
                        </h2>
                        
                        <div className="grid gap-6">
                            
                            {/* Blizzard */}
                            <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-cyan-300 mb-2">castBlizzard()</h3>
                                <p className="text-sm text-slate-400 mb-4">Summons a freezing storm. Highly effective against fiery beasts.</p>
                                <div className="bg-[#020617] p-4 rounded-xl border border-cyan-900/30">
                                    <code className="text-emerald-400 font-black">castBlizzard(element, power)</code>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        <li><span className="text-rose-400 font-bold">element</span>: <span className="text-slate-500">(String)</span> The type of ice. Always perfectly capitalized: <code className="text-cyan-200">"Ice"</code></li>
                                        <li><span className="text-rose-400 font-bold">power</span>: <span className="text-slate-500">(Number)</span> The total output damage. Usually requires <code className="text-cyan-200">999</code> for critical hits.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Thunder */}
                            <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-yellow-300 mb-2">castThunder()</h3>
                                <p className="text-sm text-slate-400 mb-4">Summons consecutive lightning strikes. Excellent for breaking shields.</p>
                                <div className="bg-[#020617] p-4 rounded-xl border border-yellow-900/30">
                                    <code className="text-emerald-400 font-black">castThunder(strikes, target)</code>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        <li><span className="text-rose-400 font-bold">strikes</span>: <span className="text-slate-500">(Number)</span> How many consecutive lightning bolts to call down. (E.g., <code className="text-yellow-200">3</code>)</li>
                                        <li><span className="text-rose-400 font-bold">target</span>: <span className="text-slate-500">(String)</span> The exact physical body part to target. (E.g., <code className="text-yellow-200">"Head"</code>)</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Heal */}
                            <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-green-400 mb-2">healParty()</h3>
                                <p className="text-sm text-slate-400 mb-4">Channels nature energy to rapidly restore your team's HP during critical emergencies.</p>
                                <div className="bg-[#020617] p-4 rounded-xl border border-green-900/30">
                                    <code className="text-emerald-400 font-black">healParty(amount)</code>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        <li><span className="text-rose-400 font-bold">amount</span>: <span className="text-slate-500">(Number)</span> The exact integer output of health to restore. Read the BOSS TACTIC to know what number to pass!</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Data Types Warning */}
                    <section className="bg-rose-950/20 border-l-4 border-rose-500 p-8 rounded-r-2xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl flex items-center justify-center">
                            <Shield className="w-32 h-32 text-rose-500/20" />
                        </div>
                        <h2 className="text-2xl font-bold text-rose-400 mb-4 flex items-center gap-3">
                            <Zap />
                            Warning: Strict Parameter Enforcement
                        </h2>
                        <p className="text-slate-300 leading-relaxed mb-4">
                            This game forces rigorous Javascript Parameter verification. 
                        </p>
                        <ul className="list-none space-y-3">
                            <li className="flex gap-3">
                                <span className="text-rose-500 font-black">✕</span>
                                <span>Typing <code className="text-white">castBlizzard(999, "Ice")</code> will <strong>Fizzle</strong>! You swapped the data types around.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-rose-500 font-black">✕</span>
                                <span>Typing <code className="text-white">castThunder("3", "Head")</code> will <strong>Fizzle</strong>! You passed "3" as a String, not an Integer!</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-emerald-500 font-black">✓</span>
                                <span>Typing <code className="text-white">castThunder(3, "Head")</code> <strong>Succeeds!</strong></span>
                            </li>
                        </ul>
                    </section>

                </div>
                
                <div className="mt-16 text-center border-t border-slate-800 pt-8">
                    <Link href="/function-spellslinger" className="inline-flex px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all gap-3 items-center hover:scale-105 active:scale-95">
                        <Sparkles />
                        RETURN TO BATTLE
                    </Link>
                </div>

            </div>
        </div>
    );
}
