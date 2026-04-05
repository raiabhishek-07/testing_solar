"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// PIXEL HERO — SVG cyan knight with sword
// ─────────────────────────────────────────────────────────────────────────────
const HeroSvg = ({ walkFrame = 0, flash = false }) => (
  <div className="relative" style={{ imageRendering: 'pixelated' }}>
    <svg width="56" height="76" viewBox="0 0 28 38">
      {/* Hair */}
      <rect x="9" y="0" width="10" height="3" fill="#44BBFF"/>
      <rect x="8" y="1" width="1" height="3" fill="#3399DD"/>
      <rect x="19" y="1" width="1" height="3" fill="#3399DD"/>
      {/* Head */}
      <rect x="9" y="2" width="10" height="8" fill="#FFCC88"/>
      {/* Eyes */}
      <rect x="11" y="5" width="2" height="2" fill="#115599"/>
      <rect x="15" y="5" width="2" height="2" fill="#115599"/>
      {/* Mouth */}
      <rect x="12" y="8" width="4" height="1" fill="#DD9966"/>
      {/* Body armor */}
      <rect x="8" y="10" width="12" height="10" fill="#00BBAA" rx="1"/>
      <rect x="10" y="11" width="3" height="4" fill="#00DDCC" opacity="0.5"/>
      {/* Belt */}
      <rect x="8" y="19" width="12" height="2" fill="#008866"/>
      {/* Arms */}
      <rect x="4" y="10" width="4" height="8" fill="#00BBAA"/>
      <rect x="20" y="10" width="4" height="8" fill="#00BBAA"/>
      {/* Hands */}
      <rect x="3" y="17" width="5" height="3" fill="#FFCC88"/>
      <rect x="20" y="17" width="5" height="3" fill="#FFCC88"/>
      {/* Sword */}
      <rect x="24" y="8" width="2" height="14" fill="#CCDDEE"/>
      <rect x="23" y="10" width="4" height="2" fill="#CCAA33"/>
      {/* Legs — alternate for walk */}
      {walkFrame === 0 ? (
        <>
          <rect x="9" y="21" width="5" height="9" fill="#3355BB"/>
          <rect x="14" y="21" width="5" height="9" fill="#2244AA"/>
          <rect x="8" y="29" width="6" height="3" fill="#553311"/>
          <rect x="14" y="29" width="6" height="3" fill="#443300"/>
        </>
      ) : walkFrame === 1 ? (
        <>
          <rect x="7" y="21" width="5" height="8" fill="#3355BB" transform="rotate(-15 9 21)"/>
          <rect x="16" y="21" width="5" height="8" fill="#2244AA" transform="rotate(15 18 21)"/>
          <rect x="5" y="28" width="6" height="3" fill="#553311"/>
          <rect x="18" y="28" width="6" height="3" fill="#443300"/>
        </>
      ) : (
        <>
          <rect x="11" y="21" width="5" height="8" fill="#3355BB" transform="rotate(15 13 21)"/>
          <rect x="12" y="21" width="5" height="8" fill="#2244AA" transform="rotate(-15 14 21)"/>
          <rect x="13" y="28" width="6" height="3" fill="#553311"/>
          <rect x="8" y="28" width="6" height="3" fill="#443300"/>
        </>
      )}
    </svg>
    {flash && <div className="absolute inset-0 bg-red-400/70 mix-blend-screen rounded"/>}
    {/* Ground shadow */}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full bg-black/40"/>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// PIXEL VILLAIN — RED demon boss
// ─────────────────────────────────────────────────────────────────────────────
const VillainSvg = ({ walkFrame = 0, flash = false }) => (
  <div className="relative" style={{ imageRendering: 'pixelated', transform: 'scaleX(-1)' }}>
    <svg width="68" height="86" viewBox="0 0 34 43">
      {/* Horns */}
      <rect x="7" y="0" width="3" height="6" fill="#CC0000"/>
      <rect x="24" y="0" width="3" height="6" fill="#CC0000"/>
      <rect x="5" y="2" width="3" height="3" fill="#990000"/>
      <rect x="26" y="2" width="3" height="3" fill="#990000"/>
      {/* Head */}
      <rect x="8" y="4" width="18" height="12" fill="#DD2222"/>
      {/* Face plate */}
      <rect x="9" y="6" width="16" height="9" fill="#BB1111"/>
      {/* Eyes — glowing */}
      <rect x="10" y="7" width="4" height="4" fill="#FFDD00"/>
      <rect x="20" y="7" width="4" height="4" fill="#FFDD00"/>
      <rect x="11" y="8" width="2" height="2" fill="#FF6600"/>
      <rect x="21" y="8" width="2" height="2" fill="#FF6600"/>
      {/* Teeth */}
      <rect x="12" y="13" width="10" height="2" fill="#770000"/>
      <rect x="13" y="14" width="2" height="2" fill="#FFEEEE"/>
      <rect x="19" y="14" width="2" height="2" fill="#FFEEEE"/>
      {/* Shoulder spikes */}
      <rect x="3" y="14" width="5" height="6" fill="#AA0000"/>
      <rect x="2" y="13" width="2" height="3" fill="#770000"/>
      <rect x="26" y="14" width="5" height="6" fill="#AA0000"/>
      <rect x="30" y="13" width="2" height="3" fill="#770000"/>
      {/* Armor body */}
      <rect x="7" y="16" width="20" height="12" fill="#990000"/>
      <rect x="8" y="17" width="18" height="10" fill="#BB0000"/>
      <rect x="10" y="18" width="6" height="4" fill="#DD1111"/>
      <rect x="18" y="18" width="6" height="4" fill="#DD1111"/>
      {/* Claws */}
      <rect x="2" y="19" width="5" height="8" fill="#AA0000"/>
      <rect x="1" y="26" width="2" height="3" fill="#FFAA00"/>
      <rect x="3" y="26" width="2" height="3" fill="#FFAA00"/>
      <rect x="5" y="26" width="2" height="3" fill="#FFAA00"/>
      <rect x="27" y="19" width="5" height="8" fill="#AA0000"/>
      <rect x="27" y="26" width="2" height="3" fill="#FFAA00"/>
      <rect x="29" y="26" width="2" height="3" fill="#FFAA00"/>
      <rect x="31" y="26" width="2" height="3" fill="#FFAA00"/>
      {/* Waist belt */}
      <rect x="7" y="28" width="20" height="2" fill="#550000"/>
      {/* Legs — walk cycle */}
      {walkFrame === 0 ? (
        <>
          <rect x="9" y="30" width="7" height="9" fill="#880000"/>
          <rect x="18" y="30" width="7" height="9" fill="#880000"/>
          <rect x="8" y="38" width="8" height="3" fill="#440000"/>
          <rect x="18" y="38" width="8" height="3" fill="#440000"/>
        </>
      ) : walkFrame === 1 ? (
        <>
          <rect x="7" y="30" width="7" height="8" fill="#880000" transform="rotate(-12 10 30)"/>
          <rect x="20" y="30" width="7" height="8" fill="#880000" transform="rotate(12 23 30)"/>
          <rect x="5" y="37" width="8" height="3" fill="#440000"/>
          <rect x="22" y="37" width="8" height="3" fill="#440000"/>
        </>
      ) : (
        <>
          <rect x="11" y="30" width="7" height="8" fill="#880000" transform="rotate(12 14 30)"/>
          <rect x="16" y="30" width="7" height="8" fill="#880000" transform="rotate(-12 19 30)"/>
          <rect x="12" y="37" width="8" height="3" fill="#440000"/>
          <rect x="14" y="37" width="8" height="3" fill="#440000"/>
        </>
      )}
    </svg>
    {flash && <div className="absolute inset-0 bg-white/80 mix-blend-screen rounded"/>}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-2 rounded-full bg-black/40"/>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN BATTLE ARENA — CSS Transition State Machine
// ─────────────────────────────────────────────────────────────────────────────
export default function BattleArena({ actionTrigger, arenaHeight = 320 }) {
  // Hero position in % from left
  const [heroLeft, setHeroLeft]      = useState(18);
  const [heroBottom, setHeroBottom]  = useState(12);
  const [heroRotate, setHeroRotate]  = useState(0);
  const [heroWalk, setHeroWalk]      = useState(0);
  const [heroFlash, setHeroFlash]    = useState(false);
  const [heroSpeed, setHeroSpeed]    = useState(0.5);

  // Villain position in % from right (we convert to left)
  const [villLeft, setVillLeft]      = useState(75);
  const [villBottom, setVillBottom]  = useState(12);
  const [villRotate, setVillRotate]  = useState(0);
  const [villWalk, setVillWalk]      = useState(0);
  const [villFlash, setVillFlash]    = useState(false);
  const [villSpeed, setVillSpeed]    = useState(0.5);

  // Effects
  const [fireball, setFireball]      = useState(null); // { left, bottom }
  const [impactFx, setImpactFx]      = useState(null); // { left, color, key }
  const [comboText, setComboText]    = useState(null);
  const [shaking, setShaking]        = useState(false);

  const busyRef = useRef(false);
  const walkIntervalRef = useRef(null);

  // Walking leg animation
  const startWalk = (who) => {
    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    let frame = 0;
    walkIntervalRef.current = setInterval(() => {
      frame = frame === 1 ? 2 : 1;
      if (who === 'hero') setHeroWalk(frame);
      else setVillWalk(frame);
    }, 120);
  };
  const stopWalk = (who) => {
    if (walkIntervalRef.current) clearInterval(walkIntervalRef.current);
    walkIntervalRef.current = null;
    if (who === 'hero') setHeroWalk(0);
    else setVillWalk(0);
  };

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  const shake = () => { setShaking(true); setTimeout(() => setShaking(false), 400); };

  const showImpact = (left, color) => {
    setImpactFx({ left, color, key: 'i_' + Date.now() });
    setTimeout(() => setImpactFx(null), 600);
  };

  const showCombo = (text, color) => {
    setComboText({ text, color, key: 'c_' + Date.now() });
    setTimeout(() => setComboText(null), 1400);
  };

  // ════════════════════════════════════════════════════════════════════
  // ✅ CORRECT: Hero runs → jumps → slams villain → villain knocked back
  // ════════════════════════════════════════════════════════════════════
  const doPlayerAttack = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;

    // 1. Hero RUNS toward villain
    startWalk('hero');
    setHeroSpeed(0.35);
    setHeroLeft(62);        // Run to villain's position
    await wait(380);
    
    // 2. Hero JUMPS up
    stopWalk('hero');
    setHeroSpeed(0.2);
    setHeroBottom(55);      // Jump high
    await wait(220);

    // 3. Hero SLAMS down
    setHeroSpeed(0.12);
    setHeroBottom(14);
    setHeroLeft(66);
    await wait(150);

    // === IMPACT ===
    setVillFlash(true);
    shake();
    showImpact(72, '#00ffcc');
    showCombo('💥 CRITICAL HIT!', '#00ffcc');

    // 4. Villain KNOCKED BACK
    setVillSpeed(0.25);
    setVillLeft(88);
    setVillBottom(4);
    setVillRotate(35);
    await wait(300);

    setVillFlash(false);

    // 5. Villain RECOVERS
    setVillSpeed(0.4);
    setVillLeft(75);
    setVillBottom(12);
    setVillRotate(0);

    // 6. Hero WALKS back
    startWalk('hero');
    setHeroSpeed(0.35);
    setHeroLeft(18);
    setHeroBottom(12);
    await wait(400);

    stopWalk('hero');
    busyRef.current = false;
  }, []);

  // ════════════════════════════════════════════════════════════════════
  // ❌ WRONG: Villain charges → fireball → hero stumbles + falls
  // ════════════════════════════════════════════════════════════════════
  const doEnemyAttack = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;

    // 1. Villain LEANS forward (charging)
    setVillSpeed(0.15);
    setVillLeft(70);
    await wait(200);

    // 2. Villain back + FIRE
    setVillLeft(75);
    
    // 3. FIREBALL travels across
    setFireball({ left: 70, bottom: 38 });
    await wait(50);
    setFireball({ left: 50, bottom: 35 });
    await wait(80);
    setFireball({ left: 35, bottom: 32 });
    await wait(80);
    setFireball({ left: 22, bottom: 30 });
    await wait(80);
    setFireball(null);

    // === IMPACT ON HERO ===
    setHeroFlash(true);
    shake();
    showImpact(22, '#ff4400');
    showCombo('⚡ ENEMY STRIKES!', '#ff4444');

    // 4. Hero STUMBLES back
    setHeroSpeed(0.2);
    setHeroLeft(8);
    setHeroBottom(25);
    setHeroRotate(-30);
    await wait(250);

    // 5. Hero FALLS
    setHeroSpeed(0.15);
    setHeroBottom(3);
    setHeroRotate(-50);
    await wait(200);

    setHeroFlash(false);
    await wait(250);

    // 6. Hero GETS UP
    setHeroSpeed(0.4);
    setHeroLeft(18);
    setHeroBottom(12);
    setHeroRotate(0);
    await wait(450);

    busyRef.current = false;
  }, []);

  // ── Listen to action triggers ──────────────────────────────────────
  useEffect(() => {
    if (!actionTrigger) return;
    if (actionTrigger.type === 'player_attack') doPlayerAttack();
    else if (actionTrigger.type === 'enemy_attack') doEnemyAttack();
  }, [actionTrigger, doPlayerAttack, doEnemyAttack]);

  // Cleanup
  useEffect(() => () => { if (walkIntervalRef.current) clearInterval(walkIntervalRef.current); }, []);

  return (
    <div className="relative w-full overflow-hidden select-none" style={{ height: arenaHeight }}>
      {/* ── Screen shake wrapper ─────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          animation: shaking ? 'battleShake 0.35s ease-out' : 'none',
        }}
      >
        {/* ── BACKGROUND ───────────────────────────────────────────── */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d2240 45%, #081830 70%, #050d1a 100%)' }}>
          {/* Moon */}
          <div className="absolute top-5 right-20 w-8 h-8 rounded-full"
            style={{ background: 'radial-gradient(circle, #fffde888 30%, #ffc86088 100%)', boxShadow: '0 0 30px #ffd07044' }} />
          
          {/* Stars */}
          {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: i % 4 === 0 ? 2 : 1,
                height: i % 4 === 0 ? 2 : 1,
                left: `${(i * 3.3 + 2) % 95}%`,
                top: `${(i * 5.7 + 3) % 50}%`,
                opacity: 0.15 + (i % 6) * 0.08,
                animationDuration: `${1.2 + (i % 5) * 0.4}s`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}

          {/* Hills silhouette */}
          <svg className="absolute bottom-0 w-full" height="70" viewBox="0 0 400 70" preserveAspectRatio="none" style={{ opacity: 0.6 }}>
            <path d="M0,45 Q50,15 110,30 Q170,50 230,20 Q290,5 340,25 Q375,40 400,30 L400,70 L0,70Z" fill="#0a1830"/>
            <path d="M0,55 Q70,30 140,45 Q200,60 270,40 Q330,20 400,42 L400,70 L0,70Z" fill="#06101e"/>
          </svg>

          {/* Ground */}
          <div className="absolute bottom-0 w-full h-12" style={{ background: 'linear-gradient(180deg, #15100a 0%, #0a0805 100%)' }} />
          
          {/* Ground glow */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2/3 h-3 rounded-full" style={{ background: 'radial-gradient(ellipse, #00ddbb12 0%, transparent 70%)' }}/>

          {/* Pixel trees & bushes */}
          {[5, 12, 18, 82, 88, 95].map((x, i) => (
            <div key={i} className="absolute z-10" 
              style={{ 
                bottom: '12%', 
                left: `${x}%`, 
                imageRendering: 'pixelated',
                transform: `translateX(-50%) scale(${0.7 + (i % 3) * 0.3})`,
                opacity: 0.9,
                width: 50, height: 40 // Anchor point for layering
              }}>
              {/* Ground contact shadow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/40 rounded-full blur-[1px]"/>
              
              {/* Trunk */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-16 bg-amber-950/90 shadow-sm"/>
              
              {/* Foliage - layered upwards */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full flex flex-col-reverse items-center">
                <div className="w-14 h-5 bg-[#0a2e1d] rounded-full shadow-inner"/>
                <div className="w-11 h-5 bg-[#0d3d27] -mt-2.5 rounded-full"/>
                <div className="w-8 h-5 bg-[#125235] -mt-2.5 rounded-full"/>
                <div className="w-4 h-4 bg-[#1a704a] -mt-2 rounded-full"/>
              </div>
            </div>
          ))}
        </div>

        {/* VS text */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white/[0.06] font-black text-3xl tracking-widest select-none">VS</div>

        {/* ── HERO ───────────────────────────────────────────────────── */}
        <div
          className="absolute z-20"
          style={{
            left: `${heroLeft}%`,
            bottom: `${heroBottom}%`,
            transform: `rotate(${heroRotate}deg)`,
            transition: `left ${heroSpeed}s ease, bottom ${heroSpeed}s ease, transform ${heroSpeed}s ease`,
          }}
        >
          <HeroSvg walkFrame={heroWalk} flash={heroFlash} />
          <div className="text-[7px] font-black text-cyan-400 text-center mt-0.5 tracking-widest opacity-60">⚔ HERO</div>
        </div>

        {/* ── VILLAIN ────────────────────────────────────────────────── */}
        <div
          className="absolute z-20"
          style={{
            left: `${villLeft}%`,
            bottom: `${villBottom}%`,
            transform: `rotate(${villRotate}deg)`,
            transition: `left ${villSpeed}s ease, bottom ${villSpeed}s ease, transform ${villSpeed}s ease`,
          }}
        >
          <VillainSvg walkFrame={villWalk} flash={villFlash} />
          <div className="text-[7px] font-black text-red-400 text-center mt-0.5 tracking-widest opacity-60" style={{ transform: 'scaleX(-1)' }}>👾 BOSS</div>
        </div>

        {/* ── FIREBALL ───────────────────────────────────────────────── */}
        {fireball && (
          <div
            className="absolute z-30 pointer-events-none"
            style={{
              left: `${fireball.left}%`,
              bottom: `${fireball.bottom}%`,
              transition: 'left 0.07s linear, bottom 0.07s linear',
            }}
          >
            <div className="w-7 h-7 rounded-full animate-spin"
              style={{
                background: 'radial-gradient(circle, #fff 0%, #ffdd00 20%, #ff6600 50%, #ff2200 100%)',
                boxShadow: '0 0 16px #ff660099, 0 0 32px #ff220044',
                animationDuration: '0.2s',
              }}
            />
            {/* Trail */}
            {[6, 14, 22].map((off, i) => (
              <div key={i} className="absolute rounded-full"
                style={{
                  width: 5 - i, height: 5 - i,
                  right: -off, top: '40%',
                  background: i === 0 ? '#ffaa00' : '#ff660066',
                  opacity: 0.8 - i * 0.25,
                }}
              />
            ))}
          </div>
        )}

        {/* ── IMPACT RING ────────────────────────────────────────────── */}
        {impactFx && (
          <div key={impactFx.key} className="absolute z-40 pointer-events-none"
            style={{ left: `${impactFx.left}%`, bottom: '22%' }}>
            {/* Expanding ring */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 animate-ping"
              style={{ width: 60, height: 60, borderColor: impactFx.color, opacity: 0.7 }} />
            {/* White flash */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white animate-ping" style={{ opacity: 0.5 }} />
            {/* Spark particles */}
            {[...Array(8)].map((_, i) => {
              const a = (i / 8) * 360;
              const tx = Math.cos(a * Math.PI / 180) * 50;
              const ty = Math.sin(a * Math.PI / 180) * 50;
              return (
                <div key={i} className="absolute w-2 h-2 rounded-full animate-ping"
                  style={{
                    background: impactFx.color,
                    transform: `translate(${tx}px, ${ty}px)`,
                    opacity: 0.8,
                    animationDuration: '0.4s',
                    animationDelay: `${i * 30}ms`,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* ── COMBO TEXT ──────────────────────────────────────────────── */}
        {comboText && (
          <div key={comboText.key}
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none font-black text-xl animate-bounce"
            style={{
              top: '18%',
              color: comboText.color,
              textShadow: `0 0 12px ${comboText.color}, 0 2px 4px #00000088`,
              animation: 'comboFloat 1.2s ease-out forwards',
            }}
          >
            {comboText.text}
          </div>
        )}
      </div>

      {/* KEYFRAME STYLES */}
      <style jsx>{`
        @keyframes battleShake {
          0%   { transform: translate(0,0); }
          15%  { transform: translate(-8px, -4px); }
          30%  { transform: translate(8px, 4px); }
          45%  { transform: translate(-6px, 3px); }
          60%  { transform: translate(5px, -3px); }
          75%  { transform: translate(-3px, 2px); }
          100% { transform: translate(0,0); }
        }
        @keyframes comboFloat {
          0%   { opacity: 0; transform: translate(-50%, 0) scale(0.5); }
          20%  { opacity: 1; transform: translate(-50%, -10px) scale(1.15); }
          50%  { opacity: 1; transform: translate(-50%, -35px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -65px) scale(0.8); }
        }
      `}</style>
    </div>
  );
}
