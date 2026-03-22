"use client";
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { ArrowLeft, Shield, Zap, CircleDashed } from 'lucide-react';
import Link from 'next/link';

const TowerDefenseEngine = dynamic(() => import('@/components/games/logic-defender/TowerDefenseEngine'), { 
    ssr: false,
    loading: () => <div className="absolute inset-0 z-0 bg-black flex items-center justify-center font-mono text-brand-neon">BOOTING DEFENSE GRID...</div>
});

export default function LogicDefenderPage() {
    const [coreHp, setCoreHp] = useState(100);
    const [wave, setWave] = useState(1);
    const [credits, setCredits] = useState(500);
    const [selectedTower, setSelectedTower] = useState('OR'); // OR, AND, NOT, XOR
    const [gameOver, setGameOver] = useState(false);

    const towers = [
        { id: 'OR', name: 'OR GATE', desc: 'Standard Turret. Fires if ANY enemy is in range (enemies > 0).', cost: 100, color: 'text-brand-neon', border: 'border-brand-neon' },
        { id: 'AND', name: 'AND GATE', desc: 'Heavy Blaster. Fires ONLY if TWO OR MORE enemies are in range simultaneously.', cost: 200, color: 'text-brand-orange', border: 'border-brand-orange' },
        { id: 'NOT', name: 'NOT GATE', desc: 'Continuous Beam. Fires continuously, but SHUTS DOWN instantly if an enemy is adjacent (!enemy_near).', cost: 150, color: 'text-brand-success', border: 'border-brand-success' },
        { id: 'XOR', name: 'XOR GATE', desc: 'Precision Sniper. Fires ONLY if EXACTLY ONE enemy is in range. Jams if crowded (enemies == 1).', cost: 250, color: 'text-purple-400', border: 'border-purple-400' }
    ];

    return (
        <div className="w-screen h-screen bg-[#02050a] text-white flex flex-col font-mono overflow-hidden">
            
            {/* TOP HUD */}
            <div className="w-full p-6 pb-2 flex justify-between items-start z-10 shrink-0">
                <div className="flex gap-4">
                    <Link href="/dashboard" className="p-3 bg-black/50 border border-white/10 rounded-xl hover:border-brand-neon hover:bg-white/5 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="p-3 px-6 bg-black/60 backdrop-blur-md border border-brand-neon/30 rounded-xl flex items-center gap-4">
                        <div className="text-[10px] text-brand-neon uppercase tracking-widest">Core Integrity</div>
                        <div className="flex items-center gap-2">
                            <Shield className={`w-5 h-5 ${coreHp > 30 ? 'text-brand-neon' : 'text-red-500 animate-pulse'}`} />
                            <span className="text-xl font-black">{coreHp}%</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="p-3 px-6 bg-black/60 backdrop-blur-md border border-brand-orange/30 rounded-xl text-right">
                        <div className="text-[10px] text-brand-orange uppercase tracking-widest">Threat Wave</div>
                        <div className="text-xl font-black">{wave} / 10</div>
                    </div>
                    <div className="p-3 px-6 bg-black/60 backdrop-blur-md border border-yellow-500/30 rounded-xl flex items-center gap-4">
                        <div className="text-[10px] text-yellow-500 uppercase tracking-widest">Logic Cores</div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            <span className="text-xl font-black">{credits}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* PHASER BACKGROUND ENGINE - Takes all remaining vertical space safely! */}
            <div className="flex-1 w-full relative z-0">
                <div className="absolute inset-0">
                    <TowerDefenseEngine 
                        selectedTower={selectedTower} 
                        onUpdateHp={setCoreHp}
                        onUpdateCredits={setCredits}
                        onUpdateWave={setWave}
                        onGameOver={() => setGameOver(true)}
                    />
                </div>

                {/* GAME OVER MODAL OVERLAY */}
                {gameOver && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-500">
                        <div className="bg-[#02050a] border border-red-500/50 rounded-2xl p-8 max-w-md w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.2)] scale-in duration-300">
                            <Shield className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
                            <h2 className="text-3xl font-black text-red-500 tracking-widest mb-2">SYSTEM FAILURE</h2>
                            <p className="text-white/60 mb-8">CPU Core Integrity reached 0%. The Glitch Bugs have overrun the motherboard.</p>
                            <button 
                                onClick={() => window.location.reload()}
                                className="w-full py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold tracking-widest uppercase border border-red-500/50 rounded-xl transition-all active:scale-95"
                            >
                                Initiate Reboot
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* BOTTOM HUD - TOWER PALETTE */}
            <div className="w-full p-4 shrink-0 z-10">
                <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                        <CircleDashed className="w-6 h-6 text-brand-neon" />
                        <h2 className="text-xl font-black tracking-widest uppercase">Logic Gate Compiler</h2>
                        <span className="text-xs text-white/40 ml-auto">SELECT A GATE AND CLICK THE GRID TO DEPLOY</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {towers.map(tower => (
                            <button 
                                key={tower.id}
                                onClick={() => setSelectedTower(tower.id)}
                                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col gap-2 relative overflow-hidden group 
                                    ${selectedTower === tower.id ? `bg-white/10 ${tower.border}` : 'bg-white/5 border-transparent hover:border-white/20'}`}
                            >
                                <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 blur-xl rounded-full bg-current ${tower.color}`} />
                                <div className="flex justify-between items-center w-full">
                                    <span className={`font-black text-lg ${tower.color}`}>{tower.name}</span>
                                    <span className="text-xs font-bold text-yellow-500 flex items-center gap-1"><Zap className="w-3 h-3"/> {tower.cost}</span>
                                </div>
                                <p className="text-[10px] text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                                    {tower.desc}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
