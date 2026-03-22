'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoveUp, MoveDown, MoveLeft, MoveRight, Radio, Crosshair, Play, Trash2, Zap } from 'lucide-react';
import { sfxClick, sfxHover, sfxDeleteBlock, sfxDropBlock } from '@/lib/sounds';

export const DIRECTIVES = [
    { id: 'MOVE_UP',    label: 'Move North',    icon: MoveUp,   color: '#00c8ff' },
    { id: 'MOVE_DOWN',  label: 'Move South',    icon: MoveDown, color: '#00c8ff' },
    { id: 'MOVE_LEFT',  label: 'Move West',     icon: MoveLeft, color: '#00c8ff' },
    { id: 'MOVE_RIGHT', label: 'Move East',     icon: MoveRight,color: '#00c8ff' },
    { id: 'SCAN',       label: 'Scan Area',     icon: Radio,    color: '#a78bfa' },
    { id: 'ENGAGE',     label: 'Neutralize',    icon: Crosshair,color: '#ef4444' },
];

interface LogicWorkspaceProps {
    stack: string[];
    onUpdateStack: (s: string[]) => void;
    onExecute: () => void;
    isExecuting: boolean;
}

export default function LogicWorkspace({ stack, onUpdateStack, onExecute, isExecuting }: LogicWorkspaceProps) {
    
    const addDirective = (id: string) => {
        sfxDropBlock();
        onUpdateStack([...stack, id]);
    };

    const removeDirective = (idx: number) => {
        sfxDeleteBlock();
        onUpdateStack(stack.filter((_, i) => i !== idx));
    };

    const clearStack = () => {
        if (stack.length === 0) return;
        sfxDeleteBlock();
        onUpdateStack([]);
    };

    return (
        <div className="flex flex-col h-full bg-black/40 border-l border-white/5 p-6 backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-neon/10 flex items-center justify-center border border-brand-neon/20 shadow-[0_0_15px_#00ff9f33]">
                        <Zap className="w-4 h-4 text-brand-neon" />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-white tracking-widest uppercase font-pixel">Directives</h2>
                        <p className="text-[10px] text-white/30 uppercase tracking-tighter">Tactical Command Input</p>
                    </div>
                </div>
                {stack.length > 0 && (
                    <button 
                        onClick={clearStack}
                        className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-red-400 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Available List */}
            <div className="grid grid-cols-2 gap-3 mb-8">
                {DIRECTIVES.map((d) => (
                    <motion.button
                        key={d.id}
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => sfxHover()}
                        onClick={() => addDirective(d.id)}
                        className="flex flex-col items-center gap-2 p-4 glass border-white/5 hover:border-white/20 transition-all rounded-2xl group"
                    >
                        <d.icon className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: d.color }} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                            {d.label}
                        </span>
                    </motion.button>
                ))}
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            {/* Tactical Stack */}
            <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                <div className="flex flex-col gap-2">
                    <AnimatePresence mode="popLayout">
                        {stack.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-32 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-white/10"
                            >
                                <p className="text-[10px] uppercase font-black tracking-widest">Stack Empty</p>
                            </motion.div>
                        ) : (
                            stack.map((id, i) => {
                                const d = DIRECTIVES.find(x => x.id === id)!;
                                return (
                                    <motion.div
                                        key={`${id}-${i}`}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 20, opacity: 0 }}
                                        className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 rounded-xl group hover:border-white/10"
                                    >
                                        <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-pixel text-white/20 border border-white/5">
                                            {i + 1}
                                        </div>
                                        <d.icon className="w-4 h-4" style={{ color: d.color }} />
                                        <span className="flex-1 text-[10px] font-black uppercase tracking-widest text-white/80">
                                            {d.label}
                                        </span>
                                        <button 
                                            onClick={() => removeDirective(i)}
                                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 rounded-lg text-red-400 transition-all"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Execute Button */}
            <button
                disabled={stack.length === 0 || isExecuting}
                onClick={onExecute}
                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs tracking-[0.2em] transition-all
                    ${isExecuting 
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50 cursor-pulse' 
                        : stack.length === 0
                            ? 'bg-white/5 text-white/20 border border-white/5 cursor-not-allowed'
                            : 'bg-brand-neon text-black shadow-[0_0_20px_#00ff9f66] hover:scale-[1.02] active:scale-[0.98]'
                    }`}
            >
                {isExecuting ? 'TRANSMITTING...' : (
                    <>
                        <Play className="w-4 h-4 fill-current" />
                        ENGAGE SEQUENCE
                    </>
                )}
            </button>
        </div>
    );
}

