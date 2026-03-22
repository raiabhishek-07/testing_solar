'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Zap, Target, Cpu } from 'lucide-react';
import Navbar from '@/components/Navbar';
import TacticalEngine, { TacticalEngineRef } from '@/components/LogicShooter/TacticalEngine';
import LogicWorkspace from '@/components/LogicShooter/LogicWorkspace';
import { GameAudio } from '@/lib/sounds';

export default function LogicOperativePage() {
    const [stack, setStack] = useState<string[]>([]);
    const [isExecuting, setIsExecuting] = useState(false);
    const [status, setStatus] = useState('OPERATIONAL');
    const [targetsRemaining, setTargetsRemaining] = useState(3);
    const [currentStep, setCurrentStep] = useState(-1);
    const engineRef = useRef<TacticalEngineRef>(null);

    const handleExecute = async () => {
        if (stack.length === 0 || isExecuting) return;
        
        // Reset state before starting
        engineRef.current?.resetScene();
        setTargetsRemaining(3);
        
        setIsExecuting(true);
        GameAudio.setMusicState('executing');
        
        for (let i = 0; i < stack.length; i++) {
            setCurrentStep(i);
            const cmd = stack[i];
            await engineRef.current?.executeCommand(cmd);
        }
        
        setIsExecuting(false);
        setCurrentStep(-1);
        GameAudio.setMusicState('success');
        setStatus('MISSION COMPLETE');
    };

    return (
        <main className="min-h-screen bg-[#020202] text-white relative overflow-hidden flex flex-col">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,200,255,0.05)_0%,_transparent_50%)]" />
                <div className="absolute inset-0 opacity-20 pointer-events-none" 
                     style={{ backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))',
                              backgroundSize: '100% 2px, 3px 100%' }} />
            </div>

            <Navbar user={{ name: 'RECRUIT' }} onStartQuest={() => {}} />

            <div className="relative z-10 flex flex-1 pt-24">
                {/* Left Panel: Status & Info */}
                <div className="w-80 flex flex-col gap-6 p-8 border-r border-white/5 bg-black/40 backdrop-blur-md">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-neon/10 border border-brand-neon/20 text-brand-neon text-[10px] font-black tracking-widest uppercase">
                            <Shield className="w-3 h-3" />
                            Tactical Link Active
                        </div>
                        <h1 className="text-3xl font-black font-pixel text-white uppercase tracking-tighter leading-none shadow-[0_0_15px_#ffffff22]">
                            LOGIC<br />OPERATIVE
                        </h1>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium leading-relaxed">
                            Program your agent to neutralize hostile entities using sequential logic patterns.
                        </p>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">Active Mission</label>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-red-500" />
                                    <span className="text-[11px] font-black text-white uppercase tracking-wider">Sector Alpha Clear</span>
                                </div>
                                <div className="text-[10px] text-white/40 leading-relaxed font-light">
                                    Eliminate <span className="text-red-400 font-bold">{targetsRemaining}</span> hostile drones in the area. Use <span className="text-brand-neon">SCAN</span> to identify and <span className="text-red-400">ENGAGE</span> to neutralize.
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-white/40 uppercase tracking-widest">System Diagnostics</label>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                                    <span className="text-[8px] text-white/30 uppercase font-black">Memory</span>
                                    <span className="text-xs font-pixel text-brand-neon">98.4%</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-1">
                                    <span className="text-[8px] text-white/30 uppercase font-black">Sync</span>
                                    <span className="text-xs font-pixel text-brand-neon">STABLE</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main View: Tactical Engine */}
                <div className="flex-1 p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <Cpu className="w-5 h-5 text-brand-neon shadow-[0_0_10px_#00ff9f]" />
                            </div>
                            <div>
                                <h2 className="text-sm font-black text-white uppercase tracking-widest">Simulator Core</h2>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
                                    <span className="text-[9px] text-white/40 uppercase tracking-[0.1em]">{status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-[8px] text-white/30 uppercase font-black mb-1">Execution Index</div>
                                <div className="text-xl font-pixel text-white">
                                    {currentStep >= 0 ? (currentStep + 1).toString().padStart(2, '0') : '00'}
                                    <span className="text-white/20"> / {stack.length.toString().padStart(2, '0')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TacticalEngine 
                        ref={engineRef} 
                        onStatusUpdate={setStatus} 
                        onTargetDestroyed={setTargetsRemaining}
                    />

                    {/* Quick Tips */}
                    <div className="p-4 rounded-3xl bg-brand-neon/5 border border-brand-neon/10 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-neon/20 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-4 h-4 text-brand-neon" />
                        </div>
                        <p className="text-[10px] text-brand-neon opacity-80 uppercase tracking-wide font-black">
                            Tip: Your operative can only fire if a target has been detected within visual range.
                        </p>
                    </div>
                </div>

                {/* Right Panel: Logic Workspace */}
                <div className="w-96 min-w-96">
                    <LogicWorkspace 
                        stack={stack} 
                        onUpdateStack={setStack}
                        onExecute={handleExecute}
                        isExecuting={isExecuting}
                    />
                </div>
            </div>
        </main>
    );
}
