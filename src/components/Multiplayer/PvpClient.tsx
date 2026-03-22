'use client';

import React, { useState, useEffect, useRef } from 'react';
import { findMatch, checkMatchState, submitScore, finishPlayer } from '@/app/actions/pvpActions';
import { sfxRun, sfxSuccess, sfxError, sfxClick } from '@/lib/sounds';

type MatchStatus = 'idle' | 'waiting' | 'battle' | 'results';

export default function PvpClient() {
    const [status, setStatus] = useState<MatchStatus>('idle');
    const [roomCode, setRoomCode] = useState('');
    const [matchId, setMatchId] = useState<string | null>(null);
    const [role, setRole] = useState<'player1' | 'player2'>('player1');
    const [questions, setQuestions] = useState<any[]>([]);

    // Gameplay states
    const [qIndex, setQIndex] = useState(0);
    const [myScore, setMyScore] = useState(0);
    const [theirScore, setTheirScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [winner, setWinner] = useState<string | null>(null);
    const [waitingFinish, setWaitingFinish] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    const pollRef = useRef<NodeJS.Timeout | null>(null);

    const handleFindMatch = async (isPrivate: boolean = false) => {
        sfxClick();
        setStatus('waiting');
        const code = isPrivate ? roomCode : undefined;
        const result = await findMatch(code);

        setMatchId(result.matchId);
        setRole(result.role as 'player1' | 'player2');
        setQuestions(result.questions);
        setMyScore(0);
        setTheirScore(0);
        setQIndex(0);
        setTimeLeft(60);
        setWaitingFinish(false);
        setWinner(null);
        setStartTime(null);

        if (result.role === 'player2') {
            // Instantly joined! Wait for the polling loop to catch up and set to battle
        }
    };

    // The Synchronization Engine
    useEffect(() => {
        if (!matchId) return;

        pollRef.current = setInterval(async () => {
            const state = await checkMatchState(matchId);
            if (!state) return;

            // Opponent joined! Start battle
            if (state.state === 'active' && status === 'waiting') {
                setStatus('battle');
                setStartTime(state.startedAt);
                sfxRun();
            }

            // Sync scores
            if (state.state === 'active' || state.state === 'finished') {
                const theirData = role === 'player1' ? state.player2 : state.player1;
                if (theirData) setTheirScore(theirData.score);
            }

            // Game over logic triggered by opponent completing or both finishing
            if (state.state === 'finished' && status !== 'results') {
                setStatus('results');
                // Determine winner locally (could also be returned from server)
                const me = state[role];
                const them = role === 'player1' ? state.player2 : state.player1;
                if (me && them) {
                    if (me.score > them.score) setWinner('YOU WON! 🎉');
                    else if (them.score > me.score) setWinner('OPPONENT WON 💀');
                    else setWinner('TIE!');
                }
            }
        }, 2000);

        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, [matchId, status, role]);

    // The Match Timer
    useEffect(() => {
        if (status === 'battle' && !waitingFinish && startTime) {
            const timer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const remaining = Math.max(0, 60 - elapsed);
                setTimeLeft(remaining);
                if (remaining <= 0) {
                    handleFinish();
                    clearInterval(timer);
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [status, waitingFinish, startTime]);

    const handleAnswer = async (index: number) => {
        if (waitingFinish) return;

        const currentQ = questions[qIndex];
        if (index === currentQ.correctIndex) {
            sfxSuccess();
            setMyScore((s) => s + 100);
            await submitScore(matchId!, role, 100);
        } else {
            sfxError();
            setMyScore((s) => Math.max(0, s - 20)); // minor penalty
            await submitScore(matchId!, role, -20);
        }

        if (qIndex + 1 < questions.length) {
            setQIndex(qIndex + 1);
        } else {
            handleFinish();
        }
    };

    const handleFinish = async () => {
        setWaitingFinish(true);
        if (matchId) {
            await finishPlayer(matchId, role);
        }
    };

    if (status === 'idle') {
        return (
            <div className="max-w-xl mx-auto glass p-10 md:p-14 rounded-[40px] border-white/10 text-center space-y-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass border-brand-neon/20 text-brand-neon text-[10px] font-black tracking-widest uppercase">
                        ⚔️ ARENA_SYNC_ONLINE
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black font-pixel text-white uppercase tracking-tighter shadow-brand-neon/20 leading-tight italic">
                        MCQ <span className="text-brand-neon">PVP</span> ARENA
                    </h1>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">
                        Duel with other archmages in real-time MCQ battles.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => handleFindMatch(false)}
                        className="w-full py-5 bg-brand-neon text-black font-black rounded-2xl text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_#00ffff44] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        ⚔️ SEARCH PUBLIC MATCH
                    </button>
                    
                    <div className="flex items-center gap-4 py-4">
                        <div className="flex-1 h-px bg-white/5" />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">OR PRIVATE REALM</span>
                        <div className="flex-1 h-px bg-white/5" />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            placeholder="ROOM CODE..."
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-black tracking-widest focus:border-brand-neon/50 outline-none transition-all placeholder:text-white/10 uppercase"
                        />
                        <button
                            onClick={() => handleFindMatch(true)}
                            className="px-10 py-4 glass border-brand-neon/30 text-brand-neon font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-brand-neon/10 transition-all font-pixel"
                        >
                            JOIN
                        </button>
                    </div>
                </div>

                <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] pt-8">
                    SYNCHRONIZING RECRUITMENT DATA...
                </div>
            </div>
        );
    }

    if (status === 'waiting') {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-12">
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-neon/20 blur-3xl animate-pulse rounded-full" />
                    <div className="text-6xl md:text-8xl relative animate-bounce">📡</div>
                </div>
                
                <div className="space-y-6">
                    <h2 className="text-brand-neon font-pixel text-lg md:text-2xl animate-pulse uppercase tracking-widest">
                        WAITING FOR OPPONENT...
                    </h2>
                    {role === 'player1' && roomCode && (
                        <div className="glass p-8 rounded-3xl border-dashed border-brand-neon/30 inline-block">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-4">RECRUITMENT_SIGNAL_CODE</p>
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-[0.2em]">{roomCode}</h1>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (status === 'battle') {
        const currentQ = questions[qIndex];

        return (
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Score & Timer Header */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center glass p-8 rounded-[35px] border-white/10">
                    <div className="text-center md:text-left space-y-1">
                        <p className="text-[10px] text-brand-neon font-black tracking-widest uppercase">RECRUIT_YOU</p>
                        <h2 className="text-4xl md:text-5xl font-black font-pixel text-white shadow-brand-neon/20">{myScore}</h2>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                        <div className="glass px-6 py-2 rounded-full border-white/10 flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${timeLeft <= 10 ? 'bg-red-500 animate-ping' : 'bg-brand-neon animate-pulse'}`} />
                            <span className={`text-xl font-black font-mono tracking-widest ${timeLeft <= 10 ? 'text-red-500' : 'text-white'}`}>
                                00:{timeLeft.toString().padStart(2, '0')}
                            </span>
                        </div>
                        <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">MISSION_PHASE {qIndex + 1}/{questions.length}</div>
                    </div>

                    <div className="text-center md:text-right space-y-1">
                        <p className="text-[10px] text-red-500 font-black tracking-widest uppercase">HOSTILE_OPPONENT</p>
                        <h2 className="text-4xl md:text-5xl font-black font-pixel text-white/60">{theirScore}</h2>
                    </div>
                </div>

                {waitingFinish ? (
                    <div className="glass p-20 rounded-[40px] border-brand-neon/20 text-center space-y-6">
                        <div className="w-16 h-16 bg-brand-neon/10 rounded-full flex items-center justify-center mx-auto border border-brand-neon/30">
                            <div className="w-4 h-4 bg-brand-neon rounded-full animate-ping" />
                        </div>
                        <h2 className="text-brand-neon font-pixel text-xl uppercase tracking-widest">MISSION_COMPLETE</h2>
                        <p className="text-white/40 text-[10px] uppercase font-black tracking-widest">Awaiting opponent to finalize cognitive analysis...</p>
                    </div>
                ) : (
                    <div className="glass p-8 md:p-14 rounded-[50px] border-white/5 space-y-10 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-neon to-transparent opacity-20" />
                        
                        <h3 className="text-2xl md:text-3xl font-light italic leading-relaxed text-white pr-10">
                            <span className="text-brand-neon font-black font-pixel text-xl mr-4">Q.</span>
                            {currentQ?.question}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQ?.options.map((opt: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className="p-8 glass bg-white/2 border-white/5 rounded-[30px] text-left hover:bg-brand-neon hover:text-black hover:border-brand-neon hover:scale-[1.02] active:scale-[0.98] transition-all group/btn"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center font-black text-xs font-pixel group-hover/btn:bg-black/10 transition-colors">
                                            {['A', 'B', 'C', 'D'][i]}
                                        </div>
                                        <span className="text-sm md:text-base font-black uppercase tracking-tight leading-tight">{opt}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (status === 'results') {
        const isWin = winner === 'YOU WON! 🎉';
        const isTie = winner === 'TIE!';
        const color = isWin ? '#00FFFF' : isTie ? '#f1c40f' : '#ff4757';

        return (
            <div className="h-[70vh] flex flex-col items-center justify-center text-center p-8 space-y-14">
                <div className="relative group">
                    <div className={`absolute inset-0 blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity`} style={{ backgroundColor: color }} />
                    <h1 
                        className="text-5xl md:text-[8rem] font-black italic uppercase tracking-tighter leading-none relative drop-shadow-2xl"
                        style={{ color }}
                    >
                        {winner?.split('!')[0]}<span className="animate-bounce inline-block">!</span>
                    </h1>
                </div>

                <div className="flex gap-12 md:gap-24 items-center">
                    <div className="space-y-2">
                        <div className="text-[10px] font-black text-brand-neon uppercase tracking-widest">FINAL_SCORE_RECRUIT</div>
                        <div className="text-4xl md:text-6xl font-black font-pixel text-white">{myScore}</div>
                    </div>
                    <div className="w-px h-20 bg-white/10" />
                    <div className="space-y-2 text-white/40">
                        <div className="text-[10px] font-black uppercase tracking-widest">FINAL_SCORE_OPPONENT</div>
                        <div className="text-4xl md:text-6xl font-black font-pixel">{theirScore}</div>
                    </div>
                </div>

                <button
                    onClick={() => setStatus('idle')}
                    className="px-16 py-6 rounded-full font-black text-sm uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-2xl"
                    style={{ backgroundColor: color, color: '#000' }}
                >
                    INITIALIZE NEW DUEL
                </button>
            </div>
        );
    }

    return null;
}
