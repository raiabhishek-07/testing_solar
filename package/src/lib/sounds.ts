/**
 * CodeQuest — Full Audio System
 * All sounds generated via Web Audio API — zero audio files needed.
 * Features: SFX, Theme-based BGM, Ambient layers, Adaptive music states.
 */

type MusicState = 'idle' | 'coding' | 'executing' | 'success' | 'fail';

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

        this.ctx = new AC();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = this.volume;

        this.bgmGain = this.ctx.createGain();
        this.bgmGain.connect(this.masterGain);
        this.bgmGain.gain.value = 0.4;

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.connect(this.masterGain);
        this.ambientGain.gain.value = 0.15;

        this.initialized = true;

        // Read saved preferences
        const savedMuted = localStorage.getItem('codequest-muted');
        if (savedMuted === 'false') this.isMuted = false;
        const savedVol = localStorage.getItem('codequest-volume');
        if (savedVol) this.volume = parseFloat(savedVol);
        if (this.masterGain) this.masterGain.gain.value = this.volume;

        // Resume on first interaction
        const resume = () => {
            if (this.ctx?.state === 'suspended') this.ctx.resume();
        };
        window.addEventListener('click', resume, { once: true });
        window.addEventListener('keydown', resume, { once: true });
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

    public setVolume(v: number) {
        this.volume = Math.max(0, Math.min(1, v));
        if (this.masterGain) this.masterGain.gain.value = this.volume;
        localStorage.setItem('codequest-volume', String(this.volume));
    }

    public toggleMusic(): boolean {
        this.isMusicMuted = !this.isMusicMuted;
        if (this.isMusicMuted) this.stopBGM();
        else if (this.currentTheme) this.startThemeBGM(this.currentTheme);
        return this.isMusicMuted;
    }

    public syncMuteState(muted: boolean) {
        this.isMuted = muted;
        if (muted) { this.stopBGM(); this.stopAmbient(); }
        else { this.init(); if (this.currentTheme) this.startThemeBGM(this.currentTheme); }
    }

    /* ──────────────────────────────────────────────────────
     * LOW-LEVEL TONE GENERATORS
     * ──────────────────────────────────────────────────── */

    public playTone(
        frequency: number, duration: number,
        type: OscillatorType = 'sine', gainValue = 0.3,
        delay = 0, slideFreq?: number
    ) {
        if (!this.initialized) this.init();
        if ((this.isMuted || this.isSfxMuted) && !this.bgmInterval) return;
        if (!this.ctx || !this.masterGain) return;

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.type = type;
            const now = this.ctx.currentTime + delay;
            osc.frequency.setValueAtTime(frequency, now);
            if (slideFreq) osc.frequency.exponentialRampToValueAtTime(slideFreq, now + duration);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(gainValue, now + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.005);

            osc.start(now);
            osc.stop(now + duration);
        } catch { /* suppress */ }
    }

    public playNoise(duration: number, vol = 0.1, filterFreq = 800) {
        if (!this.initialized) this.init();
        if (this.isMuted || this.isSfxMuted || !this.ctx || !this.masterGain) return;

        try {
            const bufferSize = Math.floor(this.ctx.sampleRate * duration);
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
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(vol, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

            src.connect(filter);
            filter.connect(gain);
            gain.connect(this.masterGain);
            src.start();
        } catch { }
    }

    private playSfxTone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.08, delay = 0, slide?: number) {
        if (this.isMuted || this.isSfxMuted) return;
        this.playTone(freq, dur, type, vol, delay, slide);
    }

    /* ──────────────────────────────────────────────────────
     * THEME-BASED BGM  (Phase 2)
     * ──────────────────────────────────────────────────── */

    private themeConfigs: Record<string, {
        notes: number[], tempo: number, type: OscillatorType,
        vol: number, bassNote: number, bassType: OscillatorType
    }> = {
        menu: {
            notes: [261, 329, 392, 329, 261, 220, 261, 329], // C major ambient
            tempo: 500, type: 'sine', vol: 0.012,
            bassNote: 65, bassType: 'sine'
        },
        beach: {
            notes: [440, 554, 659, 554, 440, 494, 554, 659], // A major bright
            tempo: 380, type: 'triangle', vol: 0.015,
            bassNote: 110, bassType: 'sine'
        },
        forest: {
            notes: [293, 349, 440, 349, 293, 261, 293, 349], // D minor mysterious
            tempo: 420, type: 'sine', vol: 0.012,
            bassNote: 73, bassType: 'sine'
        },
        abyss: {
            notes: [185, 220, 277, 220, 185, 165, 185, 220], // F# minor dark
            tempo: 520, type: 'sawtooth', vol: 0.008,
            bassNote: 46, bassType: 'sawtooth'
        },
    };

    public startThemeBGM(theme: string) {
        if (!this.initialized) this.init();
        if (!this.ctx || this.isMuted || this.isMusicMuted) return;
        if (this.ctx.state === 'suspended') this.ctx.resume();

        // If same theme is already playing, don't restart
        if (this.bgmInterval && this.currentTheme === theme) return;

        this.stopBGM();
        this.currentTheme = theme;

        const cfg = this.themeConfigs[theme] || this.themeConfigs.menu;

        // Sub-bass drone
        try {
            const drone = this.ctx.createOscillator();
            const droneGain = this.ctx.createGain();
            drone.type = cfg.bassType;
            drone.frequency.value = cfg.bassNote;
            drone.connect(droneGain);
            droneGain.connect(this.bgmGain!);
            droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
            droneGain.gain.linearRampToValueAtTime(0.025, this.ctx.currentTime + 2);
            drone.start();
            this.bgmNodes.push(drone, droneGain);
        } catch { }

        // Melodic arp
        let noteIdx = 0;
        this.bgmInterval = setInterval(() => {
            if (this.isMuted || this.isMusicMuted) { this.stopBGM(); return; }

            const vol = this.musicState === 'executing' ? cfg.vol * 2 :
                        this.musicState === 'coding' ? cfg.vol * 0.5 : cfg.vol;

            this.playBGMNote(cfg.notes[noteIdx], 0.18, cfg.type, vol);

            // Occasional harmony
            if (noteIdx % 4 === 0) {
                this.playBGMNote(cfg.notes[noteIdx] * 1.5, 0.25, 'sine', vol * 0.3, 0.1);
            }

            noteIdx = (noteIdx + 1) % cfg.notes.length;
        }, this.musicState === 'executing' ? cfg.tempo * 0.6 : cfg.tempo);
    }

    private playBGMNote(freq: number, dur: number, type: OscillatorType, vol: number, delay = 0) {
        if (!this.ctx || !this.bgmGain) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.connect(gain);
            gain.connect(this.bgmGain);
            osc.type = type;
            const now = this.ctx.currentTime + delay;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(vol, now + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
            osc.start(now);
            osc.stop(now + dur + 0.01);
        } catch { }
    }

    public stopBGM() {
        if (this.bgmInterval) { clearInterval(this.bgmInterval); this.bgmInterval = null; }
        this.bgmNodes.forEach(n => { try { (n as any).stop?.(); (n as any).disconnect?.(); } catch { } });
        this.bgmNodes = [];
    }

    // Legacy compat
    public startBGM() { this.startThemeBGM(this.currentTheme || 'menu'); }

    /* ──────────────────────────────────────────────────────
     * ADAPTIVE MUSIC STATE  (Phase 5)
     * ──────────────────────────────────────────────────── */

    public setMusicState(state: MusicState) {
        if (state === this.musicState) return;
        const prev = this.musicState;
        this.musicState = state;

        // Restart BGM at new tempo/volume if theme is playing
        if (this.currentTheme && !this.isMuted && !this.isMusicMuted) {
            if (state === 'executing' || state === 'idle' || (prev === 'executing' && state === 'coding')) {
                // Restart with new tempo
                const theme = this.currentTheme;
                this.stopBGM();
                this.currentTheme = ''; // force restart
                this.startThemeBGM(theme);
            }
        }

        // State transition stings
        if (state === 'executing') {
            this.playSfxTone(440, 0.08, 'square', 0.04);
            this.playSfxTone(660, 0.08, 'square', 0.04, 0.08);
            this.playSfxTone(880, 0.1, 'square', 0.05, 0.16);
        }
        if (state === 'success') {
            [523, 659, 784, 1047].forEach((f, i) => this.playSfxTone(f, 0.3, 'sine', 0.12, i * 0.1));
        }
        if (state === 'fail') {
            this.playSfxTone(300, 0.15, 'sawtooth', 0.08);
            this.playSfxTone(200, 0.25, 'sawtooth', 0.06, 0.15);
        }
    }

    /* ──────────────────────────────────────────────────────
     * AMBIENT SOUNDS  (per theme)
     * ──────────────────────────────────────────────────── */

    public startAmbient(theme: string) {
        if (!this.initialized) this.init();
        if (!this.ctx || this.isMuted || !this.ambientGain) return;
        // Skip if same ambient is already playing
        if (this.ambientNodes.length > 0 && this.currentAmbientTheme === theme) return;
        this.stopAmbient();
        this.currentAmbientTheme = theme;

        if (theme === 'beach') this.ambientOceanWaves();
        else if (theme === 'forest') this.ambientForestWind();
        else if (theme === 'abyss') this.ambientAbyssRumble();
    }

    private ambientOceanWaves() {
        if (!this.ctx || !this.ambientGain) return;
        // Filtered noise with slow LFO for wave-like sound
        const bufSec = 4;
        const bufferSize = Math.floor(this.ctx.sampleRate * bufSec);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        src.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.15; // Wave rhythm
        lfoGain.gain.value = 200;
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        src.connect(filter);
        filter.connect(this.ambientGain);

        lfo.start();
        src.start();
        this.ambientNodes.push(src, lfo, filter, lfoGain);
    }

    private ambientForestWind() {
        if (!this.ctx || !this.ambientGain) return;
        const bufSec = 3;
        const bufferSize = Math.floor(this.ctx.sampleRate * bufSec);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const src = this.ctx.createBufferSource();
        src.buffer = buffer;
        src.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 600;
        filter.Q.value = 0.7;

        src.connect(filter);
        filter.connect(this.ambientGain);
        src.start();
        this.ambientNodes.push(src, filter);
    }

    private ambientAbyssRumble() {
        if (!this.ctx || !this.ambientGain) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = 30;

        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 0.3;
        lfoGain.gain.value = 8;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 100;

        osc.connect(filter);
        filter.connect(this.ambientGain);

        osc.start();
        lfo.start();
        this.ambientNodes.push(osc, lfo, filter, lfoGain);
    }

    public stopAmbient() {
        this.ambientNodes.forEach(n => { try { (n as any).stop?.(); (n as any).disconnect?.(); } catch { } });
        this.ambientNodes = [];
        this.currentAmbientTheme = '';
    }
}

export const GameAudio = new GameAudioSystem();

/* ──────────────────────────────────────────────────────
 * SFX WRAPPERS  (Phase 1)
 * ──────────────────────────────────────────────────── */

// ── UI Navigation ──
export function sfxHover()    { GameAudio.playTone(400, 0.04, 'sine', 0.015); }
export function sfxClick()    { GameAudio.playTone(600, 0.06, 'square', 0.025, 0, 800); }
export function sfxLocked()   { GameAudio.playTone(220, 0.1, 'square', 0.04); }

export function sfxPageTransition() {
    GameAudio.playNoise(0.12, 0.03, 2000);
    GameAudio.playTone(800, 0.08, 'sine', 0.02, 0.02, 1200);
}

export function sfxSidebarOpen() {
    GameAudio.playTone(300, 0.1, 'sine', 0.02, 0, 500);
}

export function sfxSidebarClose() {
    GameAudio.playTone(500, 0.1, 'sine', 0.02, 0, 300);
}

export function sfxTabSwitch() {
    GameAudio.playTone(700, 0.05, 'triangle', 0.03);
    GameAudio.playTone(900, 0.04, 'triangle', 0.02, 0.05);
}

// ── Block Editor ──
export function sfxDragBlock() {
    GameAudio.playTone(500, 0.04, 'triangle', 0.03);
}

export function sfxDropBlock() {
    GameAudio.playTone(800, 0.06, 'sine', 0.04);
    GameAudio.playTone(1000, 0.04, 'sine', 0.03, 0.04);
}

export function sfxDeleteBlock() {
    GameAudio.playTone(400, 0.08, 'sawtooth', 0.03, 0, 200);
}

export function sfxCodeType() {
    const freq = 300 + Math.random() * 200;
    GameAudio.playTone(freq, 0.02, 'square', 0.008);
}

// ── Game Execution ──
export function sfxRun() {
    GameAudio.playTone(440, 0.08, 'square', 0.04);
    GameAudio.playTone(660, 0.08, 'square', 0.04, 0.08);
    GameAudio.playTone(880, 0.1, 'square', 0.05, 0.16);
}

export function sfxScriptStart() {
    [330, 440, 554, 660].forEach((f, i) =>
        GameAudio.playTone(f, 0.08, 'square', 0.04, i * 0.06)
    );
}

export function sfxMove() {
    GameAudio.playTone(180, 0.04, 'square', 0.02);
    GameAudio.playTone(200, 0.04, 'square', 0.018, 0.06);
}

export function sfxWalk() { sfxMove(); } // alias

export function sfxGemCollect() {
    GameAudio.playTone(1200, 0.06, 'sine', 0.06);
    GameAudio.playTone(1600, 0.08, 'sine', 0.05, 0.05);
    GameAudio.playTone(2000, 0.1, 'sine', 0.04, 0.1);
}

export function sfxCollect() { sfxGemCollect(); } // alias

export function sfxObstacleHit() {
    GameAudio.playNoise(0.15, 0.08, 500);
    GameAudio.playTone(100, 0.15, 'sawtooth', 0.06, 0, 50);
}

export function sfxAttack() {
    GameAudio.playNoise(0.08, 0.06, 3000);
    GameAudio.playTone(800, 0.1, 'sawtooth', 0.04, 0, 200);
}

export function sfxHit() {
    GameAudio.playNoise(0.2, 0.08, 600);
    GameAudio.playTone(100, 0.2, 'sawtooth', 0.04, 0, 50);
}

export function sfxFight() {
    GameAudio.playTone(880, 0.12, 'square', 0.035, 0, 110);
}

// ── Game Results ──
export function sfxSuccess() {
    [523, 659, 784, 1047].forEach((f, i) => GameAudio.playTone(f, 0.3, 'sine', 0.1, i * 0.1));
}

export function sfxError() {
    GameAudio.playTone(200, 0.12, 'sawtooth', 0.08);
    GameAudio.playTone(150, 0.18, 'sawtooth', 0.06, 0.12);
}

export function sfxLevelComplete() {
    [392, 523, 659, 784, 1047, 784, 1047].forEach((f, i) =>
        GameAudio.playTone(f, 0.25, 'sine', 0.12, i * 0.1)
    );
}

export function sfxLevelFail() {
    GameAudio.playTone(300, 0.2, 'sawtooth', 0.08, 0, 100);
    GameAudio.playTone(200, 0.3, 'sawtooth', 0.06, 0.2);
    GameAudio.playNoise(0.15, 0.04);
}

export function sfxUnlock() {
    GameAudio.playTone(600, 0.1, 'sine', 0.06);
    GameAudio.playTone(900, 0.12, 'sine', 0.07, 0.1);
    GameAudio.playTone(1200, 0.15, 'sine', 0.08, 0.2);
}

// ── Progress / Rewards ──
export function sfxStars(n: number) {
    for (let i = 0; i < n; i++) {
        GameAudio.playTone(880 + i * 220, 0.12, 'sine', 0.08, i * 0.2);
    }
}

export function sfxStreak() {
    [440, 550, 660, 880, 1100].forEach((f, i) =>
        GameAudio.playTone(f, 0.12, 'triangle', 0.06, i * 0.07)
    );
}

export function sfxHint() {
    GameAudio.playTone(880, 0.08, 'sine', 0.08);
    GameAudio.playTone(1100, 0.12, 'sine', 0.06, 0.1);
}

export function sfxAchievement() {
    [523, 659, 784, 1047, 1319].forEach((f, i) =>
        GameAudio.playTone(f, 0.2, 'sine', 0.1, i * 0.08)
    );
}
