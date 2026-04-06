'use client';

/**
 * Global Audio Provider
 * Lives in the root layout — persists across all page navigations.
 * Features:
 *   1. Route-based BGM switching
 *   2. Global event delegation: ALL buttons/links get hover/click sounds automatically
 *   3. Keyboard: Enter/Space on focused buttons fires sfxClick
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { GameAudio, sfxClick, sfxHover } from '@/lib/sounds';

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
    if (pathname.startsWith('/multiplayer/')) return 'stadium';
    if (pathname.startsWith('/multiplayer')) return 'stadium';
    if (pathname.startsWith('/algo-quest')) return 'stadium';
    return 'menu';
}

// Tags that should get global hover/click sounds
const INTERACTIVE_TAGS = new Set(['BUTTON', 'A', 'SUMMARY']);
// Classes that indicate an already-wired element (skip to avoid double-fire)
const SKIP_CLASSES = ['sfx-skip'];

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
    const pathname = usePathname();

    // ── Init audio system once ─────────────────────────────────
    useEffect(() => {
        GameAudio.init();
        setIsMuted(GameAudio.isMuted);
    }, []);

    // ── Global delegation: hover + click → sfx ────────────────
    useEffect(() => {
        // Throttle hover to once per 80ms per element to avoid spam
        let lastHoverTarget: EventTarget | null = null;
        let hoverThrottle: ReturnType<typeof setTimeout> | null = null;

        const handleMouseOver = (e: MouseEvent) => {
            if (GameAudio.isMuted) return;
            const el = (e.target as HTMLElement).closest(
                'button, a[href], [role="button"], [role="tab"], [role="menuitem"], summary'
            ) as HTMLElement | null;
            if (!el) return;
            if (SKIP_CLASSES.some(c => el.classList.contains(c))) return;
            if (el === lastHoverTarget) return;
            lastHoverTarget = el;
            if (hoverThrottle) clearTimeout(hoverThrottle);
            hoverThrottle = setTimeout(() => { lastHoverTarget = null; }, 80);
            sfxHover();
        };

        const handleClick = (e: MouseEvent) => {
            if (GameAudio.isMuted) return;
            const el = (e.target as HTMLElement).closest(
                'button, a[href], [role="button"], [role="tab"], [role="menuitem"], summary'
            ) as HTMLElement | null;
            if (!el) return;
            // Skip if it has its own sfx (already calls sfxClick explicitly)
            if (SKIP_CLASSES.some(c => el.classList.contains(c))) return;
            // Don't double-fire if element has inline onClick that already calls sfxClick
            // (We check a data attribute set by wired components)
            if (el.dataset.sfxWired) return;
            sfxClick();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (GameAudio.isMuted) return;
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const el = document.activeElement as HTMLElement;
            if (!el) return;
            if (INTERACTIVE_TAGS.has(el.tagName) || el.getAttribute('role') === 'button') {
                sfxClick();
            }
        };

        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('click', handleClick, { passive: true });
        document.addEventListener('keydown', handleKeyDown, { passive: true });

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
            if (hoverThrottle) clearTimeout(hoverThrottle);
        };
    }, []); // no deps — runs once, reads isMuted live from GameAudio

    // ── First user interaction → start BGM ────────────────────
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

    // ── Route change → switch BGM theme ───────────────────────
    useEffect(() => {
        if (!hasInteracted || GameAudio.isMuted) return;
        const newTheme = getThemeForPath(pathname);
        GameAudio.startThemeBGM(newTheme);
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
