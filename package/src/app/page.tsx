'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ALL_LEVELS } from '@/lib/levels/index';
import { useGameStore } from '@/store/gameStore';
import { sfxClick, sfxHover, sfxLocked } from '@/lib/sounds';
import { useAudio } from '@/components/AudioProvider';

const WORLD_META = [
  { id: 1, name: 'The Awakening Forest', icon: '🌲', theme: 'forest', color: '#00d4aa', firstLevel: '1-1' },
  { id: 2, name: 'Village of Logic', icon: '🏰', theme: 'village', color: '#ff6b35', firstLevel: '2-1' },
  { id: 3, name: 'The Mage Tower', icon: '🔮', theme: 'tower', color: '#9b5de5', firstLevel: '3-1' },
  { id: 4, name: 'The Ancient Vault', icon: '🏺', theme: 'vault', color: '#ffd700', firstLevel: '4-1' },
  { id: 5, name: 'The Inferno Keep', icon: '🌋', theme: 'inferno', color: '#ff4757', firstLevel: '5-1' },
  { id: 6, name: 'The Shadow Realm', icon: '👁️', theme: 'shadow', color: '#a855f7', firstLevel: '6-1' },
];

const NAV_ITEMS = [
  { label: 'Multiplayer Duel', icon: '⚔️', path: '/multiplayer', color: '#ff5000' },
  { label: 'AlgoQuest', icon: '🧩', path: '/algo-quest', color: '#00c8ff' },
  { label: 'Block Adventure', icon: '🏝️', path: '/block-adventure', color: '#22c55e' },
  { label: 'Trophies', icon: '🏆', path: '/trophies', color: '#ffd700' },
];

/* ─────────────────────────────────────────────
 * INTRO / SPLASH SCREEN
 * ───────────────────────────────────────────── */
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);
  // 0=boot, 1=loading, 2=title reveal, 3=features, 4=press start
  const [loadProgress, setLoadProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const bootLines = [
    '> Initializing CodeQuest Engine v3.2.1...',
    '> Loading JavaScript runtime...',
    '> Compiling warrior abilities...',
    '> Generating world terrain...',
    '> Establishing neural link...',
    '> System ready.',
  ];

  // Phase 0: Boot sequence
  useEffect(() => {
    if (phase !== 0) return;
    let line = 0;
    const timer = setInterval(() => {
      line++;
      if (line >= bootLines.length) {
        clearInterval(timer);
        setTimeout(() => setPhase(1), 400);
      }
      setTypedText(bootLines.slice(0, line + 1).join('\n'));
    }, 350);
    return () => clearInterval(timer);
  }, [phase]);

  // Phase 1: Loading bar
  useEffect(() => {
    if (phase !== 1) return;
    const timer = setInterval(() => {
      setLoadProgress(p => {
        if (p >= 100) { clearInterval(timer); setTimeout(() => setPhase(2), 300); return 100; }
        return p + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(timer);
  }, [phase]);

  // Phase 2: Title reveal → Phase 3 → Phase 4
  useEffect(() => {
    if (phase === 2) setTimeout(() => setPhase(3), 1800);
    if (phase === 3) setTimeout(() => setPhase(4), 2500);
  }, [phase]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 10000,
      background: '#030308',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      overflow: 'hidden',
    }}>
      {/* Particle field background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            background: ['#4f8fff', '#9b5de5', '#00d4aa', '#ff6b35'][i % 4],
            borderRadius: '50%',
            opacity: 0.3 + Math.random() * 0.4,
            animation: `introFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }} />
        ))}
      </div>

      {/* Scan line */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)',
        pointerEvents: 'none', zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', width: '90%', textAlign: 'center' }}>

        {/* Phase 0: Boot text */}
        {phase === 0 && (
          <pre style={{
            textAlign: 'left', fontSize: '11px', color: '#4f8fff',
            lineHeight: 1.8, whiteSpace: 'pre-wrap',
            opacity: 0.9, animation: 'introFadeIn 0.3s ease',
          }}>
            {typedText}<span style={{ animation: 'introBlink 0.6s step-end infinite' }}>█</span>
          </pre>
        )}

        {/* Phase 1: Loading bar */}
        {phase === 1 && (
          <div style={{ animation: 'introFadeIn 0.4s ease' }}>
            <div style={{ fontSize: '9px', color: '#667eea', letterSpacing: '4px', fontWeight: 900, marginBottom: '20px' }}>
              LOADING ASSETS
            </div>
            <div style={{
              width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)',
              borderRadius: '2px', overflow: 'hidden', marginBottom: '12px',
            }}>
              <div style={{
                height: '100%', borderRadius: '2px',
                background: 'linear-gradient(90deg, #4f8fff, #9b5de5, #00d4aa)',
                width: `${Math.min(loadProgress, 100)}%`,
                transition: 'width 0.1s',
                boxShadow: '0 0 20px rgba(79,143,255,0.5)',
              }} />
            </div>
            <div style={{ fontSize: '10px', color: '#333', letterSpacing: '2px' }}>
              {Math.min(Math.round(loadProgress), 100)}%
            </div>
          </div>
        )}

        {/* Phase 2: Title reveal */}
        {phase >= 2 && (
          <div style={{ animation: 'introTitleReveal 1.2s cubic-bezier(0.16,1,0.3,1)' }}>
            <div style={{
              fontSize: '64px', marginBottom: '8px',
              filter: phase === 2 ? 'drop-shadow(0 0 40px rgba(79,143,255,0.6))' : 'none',
              transition: 'filter 1s',
            }}>
              ⚔️
            </div>
            <h1 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: 'clamp(22px, 4vw, 38px)',
              background: 'linear-gradient(135deg, #4f8fff 0%, #9b5de5 50%, #00d4aa 100%)',
              backgroundSize: '200% 200%',
              animation: 'introGradient 3s ease-in-out infinite',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: '16px', lineHeight: 1.4,
            }}>
              CodeQuest
            </h1>
            <div style={{
              fontSize: '10px', color: '#555', letterSpacing: '6px', fontWeight: 900,
              marginBottom: '8px',
            }}>
              JAVASCRIPT WARRIOR
            </div>
          </div>
        )}

        {/* Phase 3: Feature highlights */}
        {phase >= 3 && (
          <div style={{
            marginTop: '40px', display: 'flex', gap: '24px', justifyContent: 'center',
            animation: 'introFadeIn 0.8s ease',
          }}>
            {[
              { icon: '📜', title: 'Learn Real Code', desc: 'JavaScript & Algorithms' },
              { icon: '⚔️', title: '30+ Levels', desc: '6 Worlds to Conquer' },
              { icon: '🧩', title: 'Block & Code', desc: 'Visual + Text Editor' },
            ].map((f, i) => (
              <div key={i} style={{
                textAlign: 'center', padding: '16px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px', width: '140px',
                animation: `introSlideUp 0.6s ease ${i * 0.15}s both`,
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{f.icon}</div>
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#a78bfa', marginBottom: '4px', letterSpacing: '1px' }}>
                  {f.title}
                </div>
                <div style={{ fontSize: '9px', color: '#555' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* Phase 4: Press to start */}
        {phase >= 4 && (
          <button
            onClick={onComplete}
            style={{
              marginTop: '50px',
              background: 'linear-gradient(135deg, #4f8fff, #9b5de5)',
              border: 'none', borderRadius: '14px',
              padding: '16px 48px', color: '#fff',
              cursor: 'pointer', fontSize: '13px', fontWeight: 900,
              fontFamily: "'Press Start 2P', monospace",
              letterSpacing: '2px',
              boxShadow: '0 4px 30px rgba(79,143,255,0.4), 0 0 60px rgba(155,93,229,0.15)',
              animation: 'introPulse 2s ease-in-out infinite, introFadeIn 0.5s ease',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => { sfxHover(); e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            ▶ ENTER GAME
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;700;900&display=swap');
        @keyframes introFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes introBlink { 50% { opacity: 0; } }
        @keyframes introFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes introTitleReveal {
          0% { opacity: 0; transform: scale(0.5) translateY(30px); filter: blur(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        @keyframes introGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes introSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes introPulse {
          0%, 100% { box-shadow: 0 4px 30px rgba(79,143,255,0.4), 0 0 60px rgba(155,93,229,0.15); }
          50% { box-shadow: 0 4px 40px rgba(79,143,255,0.6), 0 0 80px rgba(155,93,229,0.25); }
        }
      `}} />
    </div>
  );
}

/* ─────────────────────────────────────────────
 * HOME PAGE
 * ───────────────────────────────────────────── */
export default function HomePage() {
  const router = useRouter();
  const { levelProgress, xp, gems, streak } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [hoveredLevel, setHoveredLevel] = useState<string | null>(null);
  const { isMuted, toggleMute } = useAudio();
  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Only show intro once per session
    const seen = sessionStorage.getItem('codequest-intro-seen');
    if (seen) setShowIntro(false);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const isLevelUnlocked = (levelId: string): boolean => {
    if (levelId === '1-1') return true;
    const allIds = ALL_LEVELS.map(l => l.id);
    const idx = allIds.indexOf(levelId);
    if (idx <= 0) return true;
    const prevId = allIds[idx - 1];
    return levelProgress[prevId]?.completed === true;
  };

  const isWorldUnlocked = (worldId: number): boolean => {
    const worldLevels = ALL_LEVELS.filter(l => l.world === worldId);
    if (worldLevels.length === 0) return false;
    return isLevelUnlocked(worldLevels[0].id);
  };

  const getStars = (levelId: string) => levelProgress[levelId]?.stars || 0;
  const totalCompleted = Object.values(levelProgress).filter(p => p.completed).length;
  const playerLevel = Math.floor(xp / 500) + 1;

  if (!mounted) return null;

  // Show intro screen
  if (showIntro) {
    return <IntroScreen onComplete={() => {
      sfxClick();
      setShowIntro(false);
      sessionStorage.setItem('codequest-intro-seen', '1');
    }} />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      height: 'auto',
      background: '#080810',
      color: '#e8e8ff',
      fontFamily: 'Inter, sans-serif',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>
      {/* Animated background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 20% 20%, rgba(79,143,255,0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(155,93,229,0.05) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Header */}
        <div style={{
          textAlign: 'center', padding: '60px 20px 40px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
        }}>
          {/* Top Right: Sound + Burger */}
          <div style={{
            position: 'absolute', top: '24px', right: '24px',
            display: 'flex', gap: '10px', alignItems: 'center',
          }}>
            {/* Sound toggle */}
            <button
              onClick={() => toggleMute()}
              style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', padding: '10px 12px',
                color: '#e8e8ff', fontSize: '16px', cursor: 'pointer',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center',
              }}
              onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>

            {/* Burger Menu */}
            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => { sfxClick(); setMenuOpen(o => !o); }}
                style={{
                  background: menuOpen ? 'rgba(79,143,255,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${menuOpen ? 'rgba(79,143,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '12px', padding: '10px 12px',
                  cursor: 'pointer', transition: 'all 0.2s',
                  display: 'flex', flexDirection: 'column', gap: '4px',
                  alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px',
                }}
                onMouseEnter={(e) => { sfxHover(); e.currentTarget.style.background = 'rgba(79,143,255,0.12)'; }}
                onMouseLeave={(e) => { if (!menuOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              >
                <div style={{
                  width: '18px', height: '2px', borderRadius: '1px',
                  background: menuOpen ? '#4f8fff' : '#888',
                  transition: 'all 0.3s',
                  transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
                }} />
                <div style={{
                  width: '18px', height: '2px', borderRadius: '1px',
                  background: menuOpen ? '#4f8fff' : '#888',
                  transition: 'all 0.3s',
                  opacity: menuOpen ? 0 : 1,
                }} />
                <div style={{
                  width: '18px', height: '2px', borderRadius: '1px',
                  background: menuOpen ? '#4f8fff' : '#888',
                  transition: 'all 0.3s',
                  transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
                }} />
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: 'rgba(10,10,20,0.95)', backdropFilter: 'blur(30px)',
                  border: '1px solid rgba(79,143,255,0.15)',
                  borderRadius: '16px', padding: '8px',
                  minWidth: '220px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(79,143,255,0.08)',
                  animation: 'menuSlideIn 0.25s cubic-bezier(0.16,1,0.3,1)',
                  zIndex: 100,
                }}>
                  {NAV_ITEMS.map((item, i) => (
                    <button
                      key={item.path}
                      onClick={() => { sfxClick(); setMenuOpen(false); router.push(item.path); }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 16px', border: 'none', borderRadius: '10px',
                        background: 'transparent', color: '#e8e8ff',
                        fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                        transition: 'all 0.15s', fontFamily: 'Inter, sans-serif',
                        animation: `menuItemIn 0.3s ease ${i * 0.05}s both`,
                      }}
                      onMouseEnter={(e) => {
                        sfxHover();
                        e.currentTarget.style.background = `${item.color}15`;
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <span style={{
                        fontSize: '18px', width: '32px', height: '32px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${item.color}12`, borderRadius: '8px',
                      }}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                      <svg style={{ marginLeft: 'auto', opacity: 0.3 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  ))}
                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '8px 12px' }} />
                  <div style={{ padding: '8px 16px', fontSize: '10px', color: '#444', letterSpacing: '1px' }}>
                    v3.2.1 · CodeQuest Engine
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ fontSize: '48px', marginBottom: '12px', animation: 'float 3s ease-in-out infinite' }}>⚔️</div>
          <h1 style={{
            fontFamily: "'Press Start 2P'",
            fontSize: 'clamp(16px, 3vw, 28px)',
            background: 'linear-gradient(135deg, #4f8fff, #9b5de5)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '12px', lineHeight: 1.4,
          }}>
            CodeQuest
          </h1>
          <p style={{ fontSize: '16px', color: '#888', marginBottom: '30px' }}>
            Learn JavaScript by controlling a warrior with real code
          </p>

          {/* Stats bar */}
          <div style={{
            display: 'inline-flex', gap: '20px', alignItems: 'center',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px', padding: '12px 24px',
          }}>
            {[
              { icon: '🧙‍♂️', label: 'Level', value: playerLevel, color: '#4f8fff' },
              { icon: '⭐', label: 'XP', value: xp, color: '#9b5de5' },
              { icon: '💎', label: 'Gems', value: gems, color: '#ffd700' },
              { icon: '🔥', label: 'Streak', value: streak + 'd', color: '#ff6b35' },
              { icon: '🏆', label: 'Done', value: `${totalCompleted}/${ALL_LEVELS.length}`, color: '#00d4aa' },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div style={{ width: '1px', height: '30px', background: '#222' }} />}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '18px' }}>{s.icon}</div>
                  <div style={{ fontSize: '10px', color: '#666' }}>{s.label}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* World Map */}
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '14px', fontFamily: "'Press Start 2P'", color: '#555', marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            — World Map —
          </h2>

          {WORLD_META.map(world => {
            const worldLevels = ALL_LEVELS.filter(l => l.world === world.id);
            const worldCompleted = worldLevels.filter(l => levelProgress[l.id]?.completed).length;
            const worldUnlocked = isWorldUnlocked(world.id);

            return (
              <div key={world.id} style={{
                marginBottom: '32px',
                opacity: worldUnlocked ? 1 : 0.4,
                transition: 'opacity 0.3s',
              }}>
                {/* World Header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px',
                  padding: '12px 16px',
                  background: `linear-gradient(135deg, ${world.color}10, transparent)`,
                  border: `1px solid ${world.color}30`,
                  borderRadius: '10px',
                }}>
                  <span style={{ fontSize: '24px' }}>{world.icon}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: world.color }}>
                      World {world.id}: {world.name}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      {!worldUnlocked
                        ? '🔒 Locked — Complete previous world to unlock'
                        : `${worldCompleted}/${worldLevels.length} levels complete`}
                    </div>
                  </div>
                  {worldUnlocked && worldCompleted > 0 && (
                    <div style={{ marginLeft: 'auto' }}>
                      <div style={{ width: '120px', height: '6px', background: '#1a1a2e', borderRadius: '3px' }}>
                        <div style={{
                          height: '100%', borderRadius: '3px',
                          width: `${(worldCompleted / worldLevels.length) * 100}%`,
                          background: world.color, transition: 'width 0.5s',
                        }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Level Nodes */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {worldLevels.length > 0 ? worldLevels.map(level => {
                    const unlocked = worldUnlocked && isLevelUnlocked(level.id);
                    const prog = levelProgress[level.id];
                    const stars = getStars(level.id);
                    const isHovered = hoveredLevel === level.id;

                    return (
                      <div
                        key={level.id}
                        id={`level-${level.id}`}
                        onClick={() => {
                          if (unlocked) { sfxClick(); router.push(`/game/${level.id}`); }
                          else sfxLocked();
                        }}
                        onMouseEnter={() => { if (unlocked) sfxHover(); setHoveredLevel(level.id); }}
                        onMouseLeave={() => setHoveredLevel(null)}
                        style={{
                          width: '160px',
                          background: isHovered && unlocked
                            ? `linear-gradient(135deg, ${world.color}20, ${world.color}10)`
                            : 'rgba(255,255,255,0.03)',
                          border: `2px solid ${prog?.completed ? world.color : unlocked ? world.color + '44' : '#222'}`,
                          borderRadius: '12px', padding: '14px',
                          cursor: unlocked ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                          transform: isHovered && unlocked ? 'translateY(-3px)' : 'none',
                          boxShadow: isHovered && unlocked ? `0 8px 24px ${world.color}22` : 'none',
                          position: 'relative',
                        }}
                      >
                        <div style={{ fontSize: '10px', fontFamily: "'Press Start 2P'", color: world.color, marginBottom: '6px', opacity: 0.8 }}>
                          L{level.level}
                        </div>
                        <div style={{ fontSize: '11px', fontWeight: 600, color: '#ccc', marginBottom: '4px', lineHeight: 1.3 }}>
                          {level.title}
                        </div>
                        <div style={{ fontSize: '9px', color: world.color, opacity: 0.7, fontFamily: 'JetBrains Mono', marginBottom: '8px' }}>
                          {level.concept.split('—')[0].split('&')[0].trim()}
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {[1, 2, 3].map(s => (
                            <span key={s} style={{ fontSize: '12px', opacity: s <= stars ? 1 : 0.2 }}>⭐</span>
                          ))}
                        </div>
                        {!unlocked && (
                          <div style={{
                            position: 'absolute', inset: 0, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            borderRadius: '12px', background: 'rgba(0,0,0,0.5)',
                          }}>
                            <span style={{ fontSize: '18px' }}>🔒</span>
                          </div>
                        )}
                        {prog?.completed && (
                          <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '14px' }}>✅</div>
                        )}
                      </div>
                    );
                  }) : (
                    <div style={{ fontSize: '12px', color: '#333', fontFamily: 'JetBrains Mono', padding: '10px' }}>
                      🚧 Coming soon...
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div style={{
          textAlign: 'center', padding: '30px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <button
            id="start-quest-btn"
            onClick={() => {
              sfxClick();
              const next = ALL_LEVELS.find(l => !levelProgress[l.id]?.completed && isLevelUnlocked(l.id));
              router.push(`/game/${next?.id || '1-1'}`);
            }}
            style={{
              background: 'linear-gradient(135deg, #4f8fff, #9b5de5)',
              border: 'none', borderRadius: '10px',
              padding: '14px 40px', color: '#fff',
              cursor: 'pointer', fontSize: '14px', fontWeight: 700,
              fontFamily: 'Inter', boxShadow: '0 4px 20px rgba(79,143,255,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { sfxHover(); e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {totalCompleted > 0 ? '▶ Continue Quest' : '⚔️ Start Your Quest'}
          </button>
          <p style={{ marginTop: '16px', color: '#333', fontSize: '12px' }}>
            {30 - totalCompleted} levels remaining · Progress auto-saved
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes menuSlideIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes menuItemIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </div>
  );
}
