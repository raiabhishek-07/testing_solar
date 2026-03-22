'use client';

import React, { useState, useEffect, useRef } from 'react';
import { notFound, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
    sfxSuccess, sfxError, sfxRun, sfxClick, sfxLevelComplete, sfxLevelFail,
    sfxSidebarOpen, sfxSidebarClose, sfxPageTransition,
    GameAudio
} from '@/lib/sounds';
import { useAudio } from '@/components/AudioProvider';
import { ALL_BLOCK_LEVELS } from '@/data/block-levels';
import { BlockProgrammingEditor } from '@/components/BlockProgramming/BlockProgrammingEditor';

const PhaserEngine = dynamic(() => import('../../GameEngine'), { ssr: false });

export default function PlayLevelPage({ params }: { params: Promise<{ levelId: string }> }) {
    const router = useRouter();
    const resolvedParams = React.use(params);

    const initialLevelId = parseInt(resolvedParams.levelId, 10);
    const initialLevelIndex = ALL_BLOCK_LEVELS.findIndex(l => l.id === initialLevelId);

    if (initialLevelIndex === -1) return notFound();

    const [currentLevelIndex, setCurrentLevelIndex] = useState(initialLevelIndex);
    const level = ALL_BLOCK_LEVELS[currentLevelIndex];

    const [blockCommands, setBlockCommands] = useState<any[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [runTrigger, setRunTrigger] = useState(0);
    const [stopTrigger, setStopTrigger] = useState(0);
    const [gemsCollected, setGemsCollected] = useState(0);
    const [showMission, setShowMission] = useState(true);
    const { isMuted, toggleMute } = useAudio();

    // Sidebar resizing
    const [sidebarWidth, setSidebarWidth] = useState(520);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeTooltip, setResizeTooltip] = useState(false);
    const MIN_SIDEBAR = 280;
    const MAX_SIDEBAR = 860;

    const startResizing = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        setResizeTooltip(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
        setResizeTooltip(false);
    }, []);

    const resize = React.useCallback((e: MouseEvent) => {
        if (isResizing) {
            // Sidebar is on the right: width = window width - mouseX
            const newWidth = Math.max(MIN_SIDEBAR, Math.min(MAX_SIDEBAR, window.innerWidth - e.clientX));
            setSidebarWidth(newWidth);
        }
    }, [isResizing]);

    useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    // Unlock blocks progressively by tier
    const getAllowedCategories = (id: number): any[] => {
        if (id <= 7)  return ['movement', 'action'];                              // Tier 1: basics
        if (id <= 14) return ['movement', 'action', 'control', 'logic'];          // Tier 2: loops+if
        return        ['movement', 'action', 'control', 'logic', 'algorithm'];   // Tier 3: algos
    };

    // Extract concept name from description (after the emoji prefix)
    const conceptLine = level.description?.split('\n')[0] ?? '';
    const conceptMatch = conceptLine.match(/CONCEPT:\s*(.+)/);
    const conceptName = conceptMatch ? conceptMatch[1] : null;

    const difficultyColor: Record<string, string> = {
        easy:   '#4ade80',
        medium: '#fbbf24',
        hard:   '#f87171',
    };
    const diffColor = difficultyColor[level.difficulty ?? 'easy'];

    const onExecuteBlocks = (commands: any[]) => {
        const expanded: string[] = [];
        for (const cmd of commands) {
            if (typeof cmd === 'string') expanded.push(cmd);
            else if (typeof cmd === 'object') {
                if (['wait', 'algorithm', 'condition', 'character'].includes(cmd.type)) expanded.push(cmd as any);
                else if (cmd.type === 'sound') {
                    if (cmd.sound === 'success') sfxSuccess();
                    else if (cmd.sound === 'error') sfxError();
                } else expanded.push(cmd as any);
            }
        }
        sfxRun();
        GameAudio.setMusicState('executing');
        setBlockCommands(expanded);
        setRunTrigger(Date.now());
        setIsPlaying(true);
    };

    const handleStop = () => {
        setStopTrigger(Date.now());
        setIsPlaying(false);
        GameAudio.setMusicState('idle');
    };

    const onFinishSequence = (success: boolean) => {
        setIsPlaying(false);
        if (success) {
            sfxLevelComplete();
            GameAudio.setMusicState('success');
        } else {
            sfxLevelFail();
            GameAudio.setMusicState('fail');
        }
        // Return to idle after sting
        setTimeout(() => GameAudio.setMusicState('idle'), 2000);
    };

    const effectiveSidebarWidth = isSidebarOpen ? sidebarWidth : 0;

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            background: '#050508',
            color: '#fff',
            fontFamily: "'Outfit', sans-serif",
            overflow: 'hidden',
            userSelect: isResizing ? 'none' : 'auto'
        }}>
            {/* ── HEADER HUD (Fixed overlay) ─────────────────────────────── */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                height: '64px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 24px',
                background: 'rgba(4, 4, 8, 0.96)',
                backdropFilter: 'blur(30px)',
                borderBottom: '1px solid rgba(102,126,234,0.18)',
            }}>
                {/* Animated scan line */}
                <div className="header-scan-line" />

                {/* Left: Back + Level info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                        onClick={() => { sfxClick(); router.push('/block-adventure'); }}
                        className="hdr-btn"
                        id="btn-world-map"
                    >
                        <span style={{ fontSize: '15px' }}>🗺️</span>
                        <span>WORLD MAP</span>
                    </button>

                    <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.06)' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div className="pulse-dot" />
                            <span style={{ fontSize: '8px', color: '#667eea', fontWeight: 900, letterSpacing: '3px' }}>
                                SECTOR_0{Math.ceil(level.id / 7)}
                            </span>
                            {/* Difficulty badge */}
                            <span style={{
                                fontSize: '7px', fontWeight: 900, letterSpacing: '1.5px',
                                color: diffColor, background: `${diffColor}18`,
                                border: `1px solid ${diffColor}40`,
                                padding: '1px 6px', borderRadius: '5px'
                            }}>
                                {(level.difficulty ?? 'easy').toUpperCase()}
                            </span>
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '1px', color: '#fff', lineHeight: 1 }}>
                            {level.title.toUpperCase()}
                        </div>
                        {conceptName && (
                            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.5px', marginTop: '1px' }}>
                                {conceptName}
                            </div>
                        )}
                    </div>
                </div>

                {/* Center: Level progress bar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', fontWeight: 900, letterSpacing: '2px' }}>LEVEL PROGRESS</div>
                    <div style={{ width: '200px', height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${((currentLevelIndex + 1) / ALL_BLOCK_LEVELS.length) * 100}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #667eea, #a78bfa)',
                            boxShadow: '0 0 8px #667eea',
                            borderRadius: '10px',
                            transition: 'width 0.5s ease'
                        }} />
                    </div>
                    <div style={{ fontSize: '7px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px', fontWeight: 900 }}>
                        {currentLevelIndex + 1} / {ALL_BLOCK_LEVELS.length}
                    </div>
                </div>

                {/* Right: Stats + Nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Fragments */}
                    <div className="stat-chip">
                        <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.35)', fontWeight: 900, letterSpacing: '1px' }}>FRAGMENTS</div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span style={{ fontSize: '18px', fontWeight: 900, color: gemsCollected > 0 ? '#facc15' : '#fff' }}>{gemsCollected}</span>
                            <span style={{ fontSize: '11px', opacity: 0.2, fontWeight: 900 }}>/</span>
                            <span style={{ fontSize: '12px', opacity: 0.4, fontWeight: 900 }}>{level.gems.length}</span>
                        </div>
                    </div>

                    <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.06)' }} />

                    {/* Sound Toggle */}
                    <button
                        onClick={() => toggleMute()}
                        className="nav-arrow"
                        id="btn-sound-toggle"
                        title={isMuted ? 'Unmute' : 'Mute'}
                        style={{ fontSize: '16px' }}
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>

                    <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.06)' }} />

                    {/* Level Navigation */}
                    <button
                        disabled={currentLevelIndex === 0}
                        onClick={() => { sfxClick(); setCurrentLevelIndex(i => i - 1); setGemsCollected(0); setBlockCommands([]); }}
                        className="nav-arrow"
                        id="btn-prev-level"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>
                    <button
                        disabled={currentLevelIndex === ALL_BLOCK_LEVELS.length - 1}
                        onClick={() => { sfxClick(); setCurrentLevelIndex(i => i + 1); setGemsCollected(0); setBlockCommands([]); }}
                        className="nav-arrow"
                        id="btn-next-level"
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>
            </header>

            {/* ── MAIN BODY (below header) ───────────────────────────────── */}
            <div style={{
                display: 'flex',
                flex: 1,
                marginTop: '64px',
                overflow: 'hidden',
                position: 'relative'
            }}>

                {/* ── GAME AREA (fills all remaining space, now on LEFT) ───── */}
                <div style={{
                    flex: 1,
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'radial-gradient(ellipse at 60% 50%, #12122a 0%, #050508 70%)',
                    minWidth: 0
                }}>
                    {/* Phaser Game */}
                    <div style={{ position: 'absolute', inset: 0 }}>
                        <PhaserEngine
                            blocks={blockCommands}
                            level={level}
                            runTrigger={runTrigger}
                            stopTrigger={stopTrigger}
                            onFinish={onFinishSequence}
                            onGemsUpdate={setGemsCollected}
                        />
                    </div>

                    {/* ── MISSION OBJECTIVE CARD (top-LEFT of game) ────────── */}
                    {showMission && (
                        <div style={{
                            position: 'absolute', top: '20px', left: '20px', zIndex: 30,
                            maxWidth: '300px',
                            background: 'rgba(8,8,18,0.75)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(102,126,234,0.25)',
                            boxShadow: '0 0 0 1px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                            overflow: 'hidden'
                        }}>
                            {/* Gradient top accent */}
                            <div style={{
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, #667eea, #a78bfa, transparent)'
                            }} />
                            <div style={{ padding: '14px 18px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <div style={{
                                            width: '20px', height: '20px', borderRadius: '6px',
                                            background: 'rgba(102,126,234,0.2)',
                                            border: '1px solid rgba(102,126,234,0.4)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '10px'
                                        }}>🎯</div>
                                        <span style={{ fontSize: '9px', color: '#a78bfa', fontWeight: 900, letterSpacing: '2px' }}>
                                            MISSION OBJECTIVE
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setShowMission(false)}
                                        style={{
                                            background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
                                            cursor: 'pointer', fontSize: '12px', padding: '0', lineHeight: 1
                                        }}
                                    >✕</button>
                                </div>

                                {/* Concept badge */}
                                {conceptName && (
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                                        background: `${diffColor}18`,
                                        border: `1px solid ${diffColor}35`,
                                        borderRadius: '6px', padding: '3px 8px',
                                        marginBottom: '8px'
                                    }}>
                                        <span style={{ fontSize: '9px', fontWeight: 900, color: diffColor, letterSpacing: '1px' }}>
                                            🧠 {conceptName}
                                        </span>
                                    </div>
                                )}

                                {/* Mission goal */}
                                <div style={{
                                    background: 'rgba(167,139,250,0.08)',
                                    border: '1px solid rgba(167,139,250,0.2)',
                                    borderRadius: '8px', padding: '8px 12px',
                                    marginBottom: '10px',
                                    display: 'flex', alignItems: 'flex-start', gap: '8px'
                                }}>
                                    <span style={{ fontSize: '13px', flexShrink: 0, marginTop: '1px' }}>🎯</span>
                                    <p style={{ margin: 0, fontSize: '12px', fontWeight: 700, color: '#e2d9fb', lineHeight: 1.5 }}>
                                        {level.mission || 'Complete the level!'}
                                    </p>
                                </div>

                                {/* Description body (skip concept line) */}
                                {level.description && (() => {
                                    const lines = level.description.split('\n').slice(2).join('\n').trim();
                                    return lines ? (
                                        <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>
                                            {lines}
                                        </p>
                                    ) : null;
                                })()}

                                {/* Constraints info */}
                                {level.constraints?.maxBlocks && (
                                    <div style={{
                                        marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px',
                                        fontSize: '9px', color: 'rgba(255,255,255,0.25)', fontWeight: 900, letterSpacing: '1px'
                                    }}>
                                        <span style={{ color: '#fbbf24' }}>⚡</span>
                                        MAX {level.constraints.maxBlocks} BLOCKS
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Mission button if dismissed */}
                    {!showMission && (
                        <button
                            onClick={() => setShowMission(true)}
                            style={{
                                position: 'absolute', top: '20px', right: '20px', zIndex: 30,
                                background: 'rgba(8,8,18,0.85)', backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(102,126,234,0.25)',
                                borderRadius: '10px', color: '#a78bfa',
                                padding: '8px 14px', cursor: 'pointer',
                                fontSize: '10px', fontWeight: 900, letterSpacing: '1.5px',
                                display: 'flex', alignItems: 'center', gap: '6px'
                            }}
                        >
                            🎯 MISSION
                        </button>
                    )}

                    {/* ── KEYBOARD HINT ───────────────────────────────────── */}
                    <div style={{
                        position: 'absolute', bottom: '14px', right: '14px', zIndex: 30,
                        display: 'flex', gap: '6px', alignItems: 'center'
                    }}>
                        {[['Ctrl+Z', 'Undo'], ['Ctrl+Y', 'Redo']].map(([key, label]) => (
                            <div key={key} style={{
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: '6px', padding: '4px 8px',
                                fontSize: '9px', color: 'rgba(255,255,255,0.25)',
                                fontWeight: 700, letterSpacing: '0.5px'
                            }}>
                                <kbd style={{ fontFamily: 'inherit' }}>{key}</kbd>
                                <span style={{ marginLeft: '4px', opacity: 0.6 }}>{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── GAME STATUS OVERLAY (top left of game area) ─────── */}
                    {isPlaying && (
                        <div style={{
                            position: 'absolute', top: '20px', left: '20px', zIndex: 30,
                            background: 'rgba(251,146,60,0.1)',
                            border: '1px solid rgba(251,146,60,0.35)',
                            borderRadius: '10px', padding: '8px 16px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <div style={{
                                width: '8px', height: '8px', borderRadius: '50%',
                                background: '#fb923c',
                                boxShadow: '0 0 8px #fb923c',
                                animation: 'statusPulse 1s infinite'
                            }} />
                            <span style={{ fontSize: '10px', fontWeight: 900, color: '#fb923c', letterSpacing: '2px' }}>
                                EXECUTING
                            </span>
                        </div>
                    )}
                </div>
            {/* ── end game area ── */}

                {/* ── SIDEBAR TOGGLE BUTTON (anchored to LEFT edge of sidebar) ── */}
                <button
                    onClick={() => {
                        setIsSidebarOpen(o => {
                            if (o) sfxSidebarClose(); else sfxSidebarOpen();
                            return !o;
                        });
                    }}
                    id="btn-sidebar-toggle"
                    style={{
                        position: 'absolute',
                        right: isSidebarOpen ? `${sidebarWidth}px` : '0px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 20,
                        width: '22px',
                        height: '60px',
                        background: 'rgba(14,14,22,0.95)',
                        border: '1px solid rgba(102,126,234,0.2)',
                        borderRight: 'none',
                        borderRadius: '10px 0 0 10px',
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: isResizing ? 'none' : 'right 0.35s cubic-bezier(0.4,0,0.2,1)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '-6px 0 20px rgba(0,0,0,0.5)',
                    }}
                >
                    <svg
                        width="10" height="10"
                        viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="3"
                        style={{ transform: isSidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.35s' }}
                    >
                        {/* chevron pointing right when sidebar open (to collapse) */}
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                {/* ── RIGHT SIDEBAR ──────────────────────────────────────────────── */}
                <aside style={{
                    width: isSidebarOpen ? `${sidebarWidth}px` : '0px',
                    minWidth: 0,
                    flexShrink: 0,
                    height: '100%',
                    background: 'rgba(8, 8, 14, 0.97)',
                    borderLeft: isSidebarOpen ? '1px solid rgba(102,126,234,0.12)' : 'none',
                    transition: isResizing ? 'none' : 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 10,
                    boxShadow: isSidebarOpen ? '-8px 0 40px rgba(0,0,0,0.6)' : 'none',
                }}>
                    {/* Sidebar background grid */}
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
                        backgroundImage: 'radial-gradient(rgba(102,126,234,0.04) 1px, transparent 1px)',
                        backgroundSize: '28px 28px'
                    }} />

                    {/* Sidebar Content */}
                    <div style={{ flex: 1, overflow: 'hidden', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
                        <BlockProgrammingEditor
                            onExecute={onExecuteBlocks}
                            isExecuting={isPlaying}
                            onStop={handleStop}
                            levelId={level.id}
                            allowedCategories={getAllowedCategories(level.id)}
                            autoSave={true}
                            sidebarWidth={sidebarWidth}
                        />
                    </div>

                    {/* Sidebar Footer Status */}
                    <div style={{
                        padding: '14px 20px',
                        background: 'rgba(0,0,0,0.4)',
                        borderTop: '1px solid rgba(255,255,255,0.04)',
                        display: 'flex', alignItems: 'center', gap: '14px',
                        flexShrink: 0, position: 'relative', zIndex: 1
                    }}>
                        <div style={{
                            width: '34px', height: '34px', borderRadius: '10px',
                            background: isPlaying ? 'rgba(251,146,60,0.15)' : 'rgba(74,222,128,0.12)',
                            border: `1px solid ${isPlaying ? 'rgba(251,146,60,0.4)' : 'rgba(74,222,128,0.3)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '16px',
                            boxShadow: isPlaying ? '0 0 16px rgba(251,146,60,0.3)' : '0 0 16px rgba(74,222,128,0.2)',
                            animation: isPlaying ? 'statusPulse 1.5s infinite' : 'none'
                        }}>
                            {isPlaying ? '⚡' : '📡'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.3)', fontWeight: 900, letterSpacing: '1.5px', marginBottom: '2px' }}>
                                SYSTEM_CORE_STATUS
                            </div>
                            <div style={{
                                fontSize: '13px', fontWeight: 700,
                                color: isPlaying ? '#fb923c' : '#4ade80',
                                letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px'
                            }}>
                                {isPlaying ? 'EXECUTING COMMANDS...' : 'SYSTEM READY'}
                                {isPlaying && <span className="blink-cursor">▮</span>}
                            </div>
                        </div>
                    </div>

                    {/* Resize Handle — LEFT edge of right sidebar */}
                    {isSidebarOpen && (
                        <div
                            onMouseDown={startResizing}
                            style={{
                                position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px',
                                cursor: 'col-resize', zIndex: 50,
                                background: isResizing ? 'linear-gradient(to bottom, transparent, #667eea55, transparent)' : 'transparent',
                                transition: 'background 0.2s'
                            }}
                        >
                            {/* Resize grip dots */}
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                display: 'flex', flexDirection: 'column', gap: '4px',
                                opacity: isResizing ? 1 : 0,
                                transition: 'opacity 0.2s'
                            }}>
                                {[0,1,2].map(i => (
                                    <div key={i} style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#667eea' }} />
                                ))}
                            </div>

                            {/* Width tooltip */}
                            {resizeTooltip && (
                                <div style={{
                                    position: 'absolute', top: '50%', left: '12px',
                                    transform: 'translateY(-50%)',
                                    background: 'rgba(102,126,234,0.9)',
                                    padding: '4px 10px', borderRadius: '8px',
                                    fontSize: '10px', fontWeight: 900,
                                    color: '#fff', whiteSpace: 'nowrap',
                                    pointerEvents: 'none',
                                    boxShadow: '0 4px 12px rgba(102,126,234,0.5)'
                                }}>
                                    {sidebarWidth}px
                                </div>
                            )}
                        </div>
                    )}
                </aside>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;900&display=swap');

                * { box-sizing: border-box; }

                .hdr-btn {
                    background: rgba(102,126,234,0.08);
                    border: 1px solid rgba(102,126,234,0.2);
                    color: rgba(255,255,255,0.7);
                    height: 36px; padding: 0 14px; border-radius: 10px;
                    font-weight: 900; cursor: pointer;
                    transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
                    display: flex; align-items: center; gap: 8px;
                    font-size: 10px; letter-spacing: 1.5px;
                    font-family: 'Outfit', sans-serif;
                }
                .hdr-btn:hover {
                    background: rgba(102,126,234,0.2);
                    border-color: #667eea;
                    color: #fff;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 14px rgba(102,126,234,0.25);
                }

                .nav-arrow {
                    width: 34px; height: 34px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    color: rgba(255,255,255,0.5);
                    border-radius: 10px; cursor: pointer;
                    transition: all 0.2s; display: flex;
                    align-items: center; justify-content: center;
                }
                .nav-arrow:hover:not(:disabled) {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.18);
                    color: #fff;
                    transform: scale(1.08);
                }
                .nav-arrow:disabled { opacity: 0.12; cursor: not-allowed; }

                .stat-chip {
                    border: 1px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.02);
                    padding: 5px 14px; border-radius: 10px; text-align: center;
                }

                .pulse-dot {
                    width: 6px; height: 6px; border-radius: 50%; background: #667eea;
                    animation: pulseDot 2s infinite;
                    box-shadow: 0 0 8px #667eea;
                }
                @keyframes pulseDot {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50%  { transform: scale(1.6); opacity: 0.4; }
                }

                .header-scan-line {
                    position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
                    background: linear-gradient(90deg, transparent 10%, #667eea 50%, transparent 90%);
                    opacity: 0.5;
                    animation: scanMove 4s linear infinite;
                }
                @keyframes scanMove {
                    0%   { background-position: -100% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes statusPulse {
                    0%, 100% { opacity: 1; }
                    50%  { opacity: 0.4; }
                }

                .blink-cursor {
                    animation: blink 1s step-end infinite;
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }

                #btn-sidebar-toggle:hover {
                    background: rgba(102,126,234,0.15) !important;
                    border-color: rgba(102,126,234,0.4) !important;
                }
            `}} />
        </div>
    );
}
