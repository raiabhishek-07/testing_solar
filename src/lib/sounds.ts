/**
 * CodeClash — Premium Procedural Audio System
 * All sounds generated via Web Audio API — high-fidelity, zero assets.
 * Features: Multi-layered BGM, Adaptive soundscapes, Mechanical UI SFX.
 */

type MusicState = 'idle' | 'coding' | 'executing' | 'success' | 'fail' | 'battle';

class GameAudioSystem {
    private ctx: AudioContext | null = null;
    public isMuted: boolean = true;
    public isMusicMuted: boolean = false;
    public isSfxMuted: boolean = false;
    private initialized: boolean = false;

    // BGM state
    private bgmNodes: AudioNode[] = [];
    private bgmGain: GainNode | null = null;
    private bgmInterval: ReturnType<typeof setInterval> | null = null;
    private currentTheme: string = '';
    private musicState: MusicState = 'idle';

    // Ambient
    private ambientNodes: AudioNode[] = [];
    private ambientGain: GainNode | null = null;
    private currentAmbientTheme: string = '';

    // Master volume
    private masterGain: GainNode | null = null;
    public volume: number = 0.5;

    /* ──────────────────────────────────────────────────────
     * INIT
     * ──────────────────────────────────────────────────── */

    public init() {
        if (this.initialized) return;
        if (typeof window === 'undefined') return;

        const AC = window.AudioContext || (window as any).webkitAudioContext;
        if (!AC) return;

        try {
            this.ctx = new AC();
            this.masterGain = this.ctx.createGain();
            this.masterGain.connect(this.ctx.destination);
            this.masterGain.gain.value = this.volume;

            this.bgmGain = this.ctx.createGain();
            const bgmCompressor = this.ctx.createDynamicsCompressor();
            bgmCompressor.threshold.value = -24;
            bgmCompressor.knee.value = 30;
            bgmCompressor.attack.value = 0.003;
            bgmCompressor.release.value = 0.25;
            
            this.bgmGain.connect(bgmCompressor);
            bgmCompressor.connect(this.masterGain);
            this.bgmGain.gain.value = 0.35;

            this.ambientGain = this.ctx.createGain();
            this.ambientGain.connect(this.masterGain);
            this.ambientGain.gain.value = 0.12;

            this.initialized = true;

            // Load prefs
            const savedMuted = localStorage.getItem('codequest-muted');
            if (savedMuted === 'false') this.isMuted = false;
            const savedVol = localStorage.getItem('codequest-volume');
            if (savedVol) this.volume = parseFloat(savedVol);
            if (this.masterGain) this.masterGain.gain.value = this.volume;

            // Interaction resume
            const resume = () => { if (this.ctx?.state === 'suspended') this.ctx.resume(); };
            ['click', 'keydown', 'mousedown'].forEach(ev => window.addEventListener(ev, resume, { once: true }));
        } catch (e) { console.warn("Audio init failed", e); }
    }

    /* ──────────────────────────────────────────────────────
     * CONTROLS
     * ──────────────────────────────────────────────────── */

    public toggleMute(): boolean {
        this.init();
        this.isMuted = !this.isMuted;
        localStorage.setItem('codequest-muted', String(!this.isMuted));
        if (this.isMuted) { this.stopBGM(); this.stopAmbient(); }
        else {
            if (this.ctx?.state === 'suspended') this.ctx.resume();
            if (this.currentTheme) this.startThemeBGM(this.currentTheme);
        }
        return this.isMuted;
    }

    public syncMuteState(muted: boolean) {
        this.isMuted = muted;
        if (muted) { this.stopBGM(); this.stopAmbient(); }
        else { this.init(); if (this.currentTheme) this.startThemeBGM(this.currentTheme); }
    }

    /* ──────────────────────────────────────────────────────
     * LOW-LEVEL SYNTHESIS
     * ──────────────────────────────────────────────────── */

    public playTone(
        frequency: number, duration: number,
        type: OscillatorType = 'sine', gainValue = 0.3,
        delay = 0, slideFreq?: number, filter?: {type: BiquadFilterType, freq: number}
    ) {
        if (!this.initialized) this.init();
        if ((this.isMuted || this.isSfxMuted) && !this.bgmInterval) return;
        if (!this.ctx || !this.masterGain) return;

        try {
            const now = this.ctx.currentTime + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            let lastNode: AudioNode = osc;
            if (filter) {
                const f = this.ctx.createBiquadFilter();
                f.type = filter.type;
                f.frequency.value = filter.freq;
                lastNode.connect(f);
                lastNode = f;
            }

            lastNode.connect(gain);
            gain.connect(this.masterGain);

            osc.type = type;
            osc.frequency.setValueAtTime(frequency, now);
            if (slideFreq) osc.frequency.exponentialRampToValueAtTime(slideFreq, now + duration);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(gainValue, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            osc.start(now);
            osc.stop(now + duration + 0.1);
        } catch { }
    }

    public playNoise(duration: number, vol = 0.1, filterFreq = 800, fadeOut = true) {
        if (!this.initialized) this.init();
        if (this.isMuted || this.isSfxMuted || !this.ctx || !this.masterGain) return;

        try {
            const bufferSize = this.ctx.sampleRate * duration;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

            const src = this.ctx.createBufferSource();
            src.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = filterFreq;

            const gain = this.ctx.createGain();
            const now = this.ctx.currentTime;
            gain.gain.setValueAtTime(vol, now);
            if (fadeOut) gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            src.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            src.start();
        } catch { }
    }

    /* ──────────────────────────────────────────────────────
     * THEME-BASED BGM (Procedural Orchestration)
     * ──────────────────────────────────────────────────── */

    private themeConfigs: Record<string, {
        notes: number[], tempo: number, type: OscillatorType,
        vol: number, bassNote: number, bassType: OscillatorType,
        harmonic?: number
    }> = {
        menu: {
            notes: [261.63, 329.63, 392.00, 493.88, 523.25, 392.00, 329.63, 261.63], // Cmaj7 add9
            tempo: 650, type: 'sine', vol: 0.008,
            bassNote: 65.41, bassType: 'sine'
        },
        beach: {
            notes: [440.00, 554.37, 659.25, 739.99, 880.00, 739.99, 659.25, 554.37], // A Major bright
            tempo: 380, type: 'triangle', vol: 0.012,
            bassNote: 110.00, bassType: 'sine'
        },
        forest: {
            notes: [293.66, 349.23, 440.00, 523.25, 587.33, 440.00, 349.23, 293.66], // D Minor lush
            tempo: 450, type: 'sine', vol: 0.01,
            bassNote: 73.42, bassType: 'sine', harmonic: 1.5
        },
        abyss: {
            notes: [185.00, 220.00, 277.18, 311.13, 185.00, 164.81, 138.59, 185.00], // F# Minor dark
            tempo: 580, type: 'sawtooth', vol: 0.006,
            bassNote: 46.25, bassType: 'sawtooth'
        },
        stadium: {
            notes: [220.00, 261.63, 293.66, 311.13, 329.63, 392.00, 440.00, 493.88], // Phrygian Battle
            tempo: 320, type: 'square', vol: 0.007,
            bassNote: 55.00, bassType: 'triangle'
        }
    };

    public startThemeBGM(theme: string) {
        if (!this.initialized) this.init();
        if (!this.ctx || this.isMuted || this.isMusicMuted) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        if (this.bgmInterval && this.currentTheme === theme) return;

        this.stopBGM();
        this.currentTheme = theme;
        const cfg = this.themeConfigs[theme] || this.themeConfigs.menu;

        // Layer 1: Sub-bass Pad
        try {
            const drone = this.ctx.createOscillator();
            const droneGain = this.ctx.createGain();
            const lfo = this.ctx.createOscillator();
            const lfoGain = this.ctx.createGain();

            drone.type = cfg.bassType;
            drone.frequency.value = cfg.bassNote;
            
            lfo.frequency.value = 0.2;
            lfoGain.gain.value = 2;
            lfo.connect(lfoGain);
            lfoGain.connect(drone.frequency);

            drone.connect(droneGain);
            droneGain.connect(this.bgmGain!);
            droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
            droneGain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 3);
            
            drone.start();
            lfo.start();
            this.bgmNodes.push(drone, lfo, droneGain, lfoGain);
        } catch { }

        // Layer 2: Harmonic Arpeggiator
        let idx = 0;
        this.bgmInterval = setInterval(() => {
            if (this.isMuted || this.isMusicMuted) { this.stopBGM(); return; }
            const modVol = this.musicState === 'executing' ? cfg.vol * 2.5 : 
                         this.musicState === 'battle' ? cfg.vol * 2 :
                         this.musicState === 'coding' ? cfg.vol * 0.4 : cfg.vol;

            const freq = cfg.notes[idx];
            this.playBGMNote(freq, 0.4, cfg.type, modVol);

            // Occasional Glitter
            if (idx % 4 === 0) {
                this.playBGMNote(freq * 2, 0.2, 'sine', modVol * 0.5, 0.05);
            }
            if (cfg.harmonic && idx % 3 === 0) {
                this.playBGMNote(freq * cfg.harmonic, 0.6, 'sine', modVol * 0.3, 0.1);
            }

            idx = (idx + 1) % cfg.notes.length;
        }, this.musicState === 'executing' ? cfg.tempo * 0.5 : 
           this.musicState === 'battle' ? cfg.tempo * 0.8 : cfg.tempo);
    }

    private playBGMNote(freq: number, dur: number, type: OscillatorType, vol: number, delay = 0) {
        if (!this.ctx || !this.bgmGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.type = type;
        const now = this.ctx.currentTime + delay;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(vol, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
        osc.start(now);
        osc.stop(now + dur + 0.1);
    }

    public stopBGM() {
        if (this.bgmInterval) { clearInterval(this.bgmInterval); this.bgmInterval = null; }
        this.bgmNodes.forEach(n => { try { (n as any).stop?.(); (n as any).disconnect?.(); } catch { } });
        this.bgmNodes = [];
    }

    // Legacy compat
    public startBGM() { this.startThemeBGM(this.currentTheme || 'menu'); }

    /* ──────────────────────────────────────────────────────
     * AMBIENT SOUNDSCAPES
     * ──────────────────────────────────────────────────── */

    public startAmbient(theme: string) {
        if (!this.initialized) this.init();
        if (!this.ctx || this.isMuted || !this.ambientGain) return;
        if (this.currentAmbientTheme === theme) return;
        this.stopAmbient();
        this.currentAmbientTheme = theme;

        const ambi = {
            beach: () => this.noiseLayer(0.2, 500, 0.1, 'beach'),
            forest: () => this.noiseLayer(0.15, 800, 0.08, 'forest'),
            abyss: () => this.droneLayer(40, 'sawtooth', 0.05),
            menu: () => this.droneLayer(60, 'sine', 0.03) // Neon Hum
        };
        (ambi as any)[theme]?.();
    }

    private noiseLayer(hz: number, filter: number, vol: number, type: string) {
        if (!this.ctx || !this.ambientGain) return;
        const bufferSize = this.ctx.sampleRate * 4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const src = this.ctx.createBufferSource();
        src.buffer = buffer; src.loop = true;
        
        const f = this.ctx.createBiquadFilter();
        f.type = 'lowpass'; f.frequency.value = filter;
        
        const lfo = this.ctx.createOscillator();
        const lfoG = this.ctx.createGain();
        lfo.frequency.value = type === 'beach' ? 0.12 : 0.25;
        lfoG.gain.value = filter * 0.4;
        lfo.connect(lfoG); lfoG.connect(f.frequency);

        src.connect(f); f.connect(this.ambientGain);
        src.start(); lfo.start();
        this.ambientNodes.push(src, f, lfo, lfoG);
    }

    private droneLayer(freq: number, type: OscillatorType, vol: number) {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = type; osc.frequency.value = freq;
        g.gain.value = vol;
        osc.connect(g); g.connect(this.ambientGain);
        osc.start();
        this.ambientNodes.push(osc, g);
    }

    public stopAmbient() {
        this.ambientNodes.forEach(n => { try { (n as any).stop?.(); (n as any).disconnect?.(); } catch { } });
        this.ambientNodes = [];
        this.currentAmbientTheme = '';
    }

    public setMusicState(state: MusicState) {
        if (state === this.musicState) return;
        const prev = this.musicState;
        this.musicState = state;
        if (this.currentTheme && !this.isMuted) {
            const theme = this.currentTheme;
            this.stopBGM(); this.currentTheme = ''; this.startThemeBGM(theme);
        }
    }
}

export const GameAudio = new GameAudioSystem();

/* ──────────────────────────────────────────────────────
 * SFX MASTER WRAPPERS
 * ──────────────────────────────────────────────────── */

// ── UI High Fidelity ──
export function sfxHover() { 
    GameAudio.playTone(880, 0.05, 'sine', 0.015, 0, 1200); 
}
export function sfxClick() { 
    GameAudio.playTone(600, 0.08, 'square', 0.03, 0, 200, {type: 'lowpass', freq: 1000}); 
}
export function sfxLocked() { 
    GameAudio.playTone(150, 0.15, 'sawtooth', 0.05); 
}
export function sfxPageTransition() {
    GameAudio.playNoise(0.4, 0.025, 3000);
    GameAudio.playTone(120, 0.3, 'sine', 0.03, 0, 60);
}

// ── Coding Mechanical ──
export function sfxCodeType() {
    const f = 400 + Math.random() * 600;
    GameAudio.playTone(f, 0.02, 'square', 0.006, 0, f - 100);
}

// ── Combat & Action ──
export function sfxAttack() {
    GameAudio.playNoise(0.12, 0.08, 4000);
    GameAudio.playTone(1200, 0.1, 'sawtooth', 0.05, 0, 200);
}
export function sfxHit() {
    GameAudio.playNoise(0.25, 0.12, 400);
    GameAudio.playTone(80, 0.2, 'sawtooth', 0.08, 0, 40);
}
export function sfxGemCollect() {
    [1046, 1318, 1568, 2093].forEach((f, i) => 
        GameAudio.playTone(f, 0.15, 'sine', 0.08, i * 0.05, f + 200)
    );
}

// ── Game States ──
export function sfxSuccess() {
    const chords = [523, 659, 784, 1047]; // C Major
    chords.forEach((f, i) => GameAudio.playTone(f, 0.8, 'sine', 0.1, i * 0.08));
}
export function sfxError() {
    GameAudio.playTone(220, 0.2, 'sawtooth', 0.1);
    GameAudio.playTone(164, 0.3, 'sawtooth', 0.08, 0.1);
}
export function sfxLevelComplete() {
    const theme = [523, 587, 659, 698, 784, 880, 987, 1047];
    theme.forEach((f, i) => GameAudio.playTone(f, 0.4, 'sine', 0.1, i * 0.1, f + 50));
}

// ── Shared Aliases for compatibility ──
export const sfxRun = sfxAttack;
export const sfxMove = () => GameAudio.playTone(200, 0.05, 'triangle', 0.02, 0, 150);
export const sfxWalk = sfxMove;
export const sfxCollect = sfxGemCollect;
export const sfxObstacleHit = sfxHit;
export const sfxSidebarOpen = () => GameAudio.playTone(400, 0.15, 'sine', 0.03, 0, 800);
export const sfxSidebarClose = () => GameAudio.playTone(800, 0.15, 'sine', 0.03, 0, 400);
export const sfxHint = () => GameAudio.playTone(1100, 0.3, 'sine', 0.06, 0, 1500);
export const sfxAchievement = sfxLevelComplete;
export const sfxStars = (count: number = 1) => {
    for (let i = 0; i < count; i++) {
        GameAudio.playTone(880 + (i * 220), 0.2, 'sine', 0.1, i * 0.1, 1200);
    }
};

// Missing Legacy Aliases
export const sfxLevelFail = () => {
    GameAudio.playTone(300, 0.4, 'sawtooth', 0.05, 0, 50);
    GameAudio.playTone(200, 0.6, 'sawtooth', 0.08, 0.1, 30);
};
export const sfxDeleteBlock = () => GameAudio.playTone(400, 0.08, 'sawtooth', 0.03, 0, 200);
export const sfxTabSwitch = () => GameAudio.playTone(700, 0.05, 'triangle', 0.03);
export const sfxScriptStart = () => [330, 440, 554, 660].forEach((f, i) => GameAudio.playTone(f, 0.08, 'square', 0.04, i * 0.06));
export const sfxDropBlock = () => GameAudio.playTone(1000, 0.06, 'sine', 0.04);
export const sfxDragBlock = () => GameAudio.playTone(500, 0.04, 'triangle', 0.03);
