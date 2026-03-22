import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Shield, Crosshair, Zap, BrainCircuit } from 'lucide-react';

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-[#02050a] text-white font-mono relative overflow-y-auto w-full selection:bg-brand-neon selection:text-black">
            
            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-neon blur-[150px] mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500 blur-[150px] mix-blend-screen" />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto p-8 pt-12 pb-32">
                <div className="flex items-center gap-6 mb-12">
                    <Link href="/logic-defender" className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-neon rounded-2xl transition-all">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase flex items-center gap-3">
                            <BookOpen className="text-brand-neon w-8 h-8" /> 
                            Logic Gates Defender 
                            <span className="text-white/30 px-2">|</span> 
                            <span className="text-brand-neon">Handbook</span>
                        </h1>
                        <p className="text-white/50 text-sm mt-2">Official Strategic Guide & Logic Reference</p>
                    </div>
                </div>

                {/* Section 1: Core Rules */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-8 h-8 text-blue-400" />
                        <h2 className="text-2xl font-black uppercase tracking-widest text-blue-400">The Objective</h2>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 leading-relaxed">
                        <p className="mb-4">
                            You are tasked with defending the <strong className="text-brand-neon">CPU Core</strong> from incoming waves of <strong className="text-red-500">Glitch Bugs</strong>. 
                        </p>
                        <ul className="list-disc pl-6 text-white/70 space-y-2">
                            <li><strong>The Core</strong> has 100% Integrity. If 10 bugs touch it, the Core crashes violently and you lose the game.</li>
                            <li><strong>The Grid</strong> allows you to build defenses absolutely anywhere on the <strong className="text-green-400">Grass</strong>. You cannot build directly on the Dirt path.</li>
                            <li><strong>Logic Cores</strong> (<Zap className="w-4 h-4 inline text-yellow-500" />) are your currency. You start with 500, and earn +15 for each exact bug termination.</li>
                        </ul>
                    </div>
                </section>

                {/* Section 2: Towers */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <BrainCircuit className="w-8 h-8 text-brand-orange" />
                        <h2 className="text-2xl font-black uppercase tracking-widest text-brand-orange">The Gate Arsenal</h2>
                    </div>
                    <p className="text-white/50 mb-8 max-w-2xl">
                        Your turrets follow exact Boolean Logic. Master these conditionals to architect the ultimate bottleneck grid. 
                        A perfectly placed gate destroys armies, while a poorly placed gate will refuse to fire!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* OR GATE */}
                        <div className="bg-black/50 border border-brand-neon/40 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/10 blur-3xl rounded-full" />
                            <h3 className="text-xl font-black text-brand-neon mb-1 font-mono uppercase">OR Gate <span className="text-white/20 text-sm ml-2 font-medium">Turret</span></h3>
                            <code className="bg-black/50 px-3 py-1 rounded text-brand-neon text-xs border border-brand-neon/20 block mb-4 w-max">if (bugs &gt; 0)</code>
                            <p className="text-white/70 text-sm">
                                The bread and butter. Very reliable standard firing unit. It fires upon ANY bug that penetrates its radius. Highly effective at cleaning up weakened glitches.
                            </p>
                            <div className="mt-6 flex justify-between items-center text-xs font-bold text-white/40">
                                <span>COST: 100 ⚡</span>
                                <span>DMG: 15</span>
                            </div>
                        </div>

                        {/* AND GATE */}
                        <div className="bg-black/50 border border-brand-orange/40 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-3xl rounded-full" />
                            <h3 className="text-xl font-black text-brand-orange mb-1 font-mono uppercase">AND Gate <span className="text-white/20 text-sm ml-2 font-medium">Heavy Blaster</span></h3>
                            <code className="bg-black/50 px-3 py-1 rounded text-brand-orange text-xs border border-brand-orange/20 block mb-4 w-max">if (bugs &gt;= 2)</code>
                            <p className="text-white/70 text-sm">
                                Ignores solitary bugs completely. It stubbornly waits until at least TWO bugs physically clump together inside its radius. When the condition returns True, it fires a devastating splash-damage shot!
                            </p>
                            <div className="mt-6 flex justify-between items-center text-xs font-bold text-white/40">
                                <span>COST: 200 ⚡</span>
                                <span>DMG: 60 (SPLASH)</span>
                            </div>
                        </div>

                        {/* NOT GATE */}
                        <div className="bg-black/50 border border-brand-success/40 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-success/10 blur-3xl rounded-full" />
                            <h3 className="text-xl font-black text-brand-success mb-1 font-mono uppercase">NOT Gate <span className="text-white/20 text-sm ml-2 font-medium">Global Sniper</span></h3>
                            <code className="bg-black/50 px-3 py-1 rounded text-brand-success text-xs border border-brand-success/20 block mb-4 w-max">if NOT (bug_nearby)</code>
                            <p className="text-white/70 text-sm">
                                Features infinite global range! It shoots anywhere. HOWEVER, if ANY bug enters its personal radius (tile distance 2), the condition flips False and it instantly short circuits until the bug leaves.
                            </p>
                            <div className="mt-6 flex justify-between items-center text-xs font-bold text-white/40">
                                <span>COST: 150 ⚡</span>
                                <span>DMG: 45</span>
                            </div>
                        </div>

                        {/* XOR GATE */}
                        <div className="bg-black/50 border border-purple-400/40 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 blur-3xl rounded-full" />
                            <h3 className="text-xl font-black text-purple-400 mb-1 font-mono uppercase">XOR Gate <span className="text-white/20 text-sm ml-2 font-medium">Precision Assassin</span></h3>
                            <code className="bg-black/50 px-3 py-1 rounded text-purple-400 text-xs border border-purple-400/20 block mb-4 w-max">if (bugs == 1)</code>
                            <p className="text-white/70 text-sm">
                                Deals staggering colossal damage to heavily armored bugs, but dictates absolute isolation. If two or more bugs clump deeply into its zone, the logic returns False and it violently jams up!
                            </p>
                            <div className="mt-6 flex justify-between items-center text-xs font-bold text-white/40">
                                <span>COST: 250 ⚡</span>
                                <span>DMG: 120</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <Crosshair className="w-8 h-8 text-red-500" />
                        <h2 className="text-2xl font-black uppercase tracking-widest text-red-500">How to Win</h2>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8">
                        <p className="text-red-200 text-lg leading-relaxed">
                            Survive exactly <strong className="text-white">10 Threat Waves</strong>. Farm the early waves quickly using standard OR gates, and secure your corners with devastating AND traps combined with long-range NOT snipers. Do not let your CPU Core hit 0%!
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
