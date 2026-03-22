'use client';

/**
 * Global Audio Provider
 * Lives in the root layout — persists across all page navigations.
 * Detects the current route and switches BGM theme automatically.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { GameAudio } from '@/lib/sounds';

interface AudioContextType {
    isMuted: boolean;
    toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextType>({ isMuted: true, toggleMute: () => {} });

export function useAudio() { return useContext(AudioCtx); }

/** Map pathname → BGM theme */
function getThemeForPath(pathname: string): string {
    if (pathname.match(/\/block-adventure\/play\/(\d+)/)) {
        const id = parseInt(pathname.split('/').pop() || '1');
        if (id <= 7) return 'beach';
        if (id <= 14) return 'forest';
        return 'abyss';
    }
    if (pathname.startsWith('/game/')) return 'forest';
    if (pathname.startsWith('/multiplayer')) return 'abyss';
    return 'menu'; // home, block-adventure map, algo-quest, trophies, etc.
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const pathname = usePathname();

    // Initialize audio system once
    useEffect(() => {
        GameAudio.init();
        setIsMuted(GameAudio.isMuted);
    }, []);

    // Detect first user interaction (browsers block autoplay)
    useEffect(() => {
        const handleInteraction = () => {
            setHasInteracted(true);
            if (!GameAudio.isMuted) {
                const theme = getThemeForPath(window.location.pathname);
                GameAudio.startThemeBGM(theme);
                GameAudio.startAmbient(theme);
            }
        };
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });
        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    // Switch theme when route changes (no stop → restart gap)
    useEffect(() => {
        if (!hasInteracted || GameAudio.isMuted) return;
        const newTheme = getThemeForPath(pathname);
        GameAudio.startThemeBGM(newTheme);   // internally skips if same theme
        GameAudio.startAmbient(newTheme);
    }, [pathname, hasInteracted]);

    const toggleMute = useCallback(() => {
        const muted = GameAudio.toggleMute();
        setIsMuted(muted);
        if (!muted) {
            setHasInteracted(true);
            const theme = getThemeForPath(pathname);
            GameAudio.startThemeBGM(theme);
            GameAudio.startAmbient(theme);
        }
    }, [pathname]);

    return (
        <AudioCtx.Provider value={{ isMuted, toggleMute }}>
            {children}
        </AudioCtx.Provider>
    );
}
