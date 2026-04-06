'use client';
import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from './AudioProvider';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * GlobalMuteButton — always visible bottom-right corner on every page.
 * Connects to AudioProvider context.
 */
export default function GlobalMuteButton() {
  const { isMuted, toggleMute } = useAudio();
  const [showLabel, setShowLabel] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2">
      <AnimatePresence>
        {showLabel && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-[9px] font-black uppercase tracking-widest text-white/50 bg-black/80 border border-white/10 rounded-full px-3 py-1.5 pointer-events-none"
          >
            {isMuted ? 'AUDIO OFF' : 'AUDIO ON'}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMute}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-sfx-wired="true"
        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-lg backdrop-blur-sm sfx-skip ${
          isMuted
            ? 'bg-black/60 border-white/10 text-white/30 hover:border-white/30'
            : 'bg-brand-neon/10 border-brand-neon/40 text-brand-neon shadow-[0_0_12px_rgba(0,255,204,0.2)]'
        }`}
        title={isMuted ? 'Unmute audio' : 'Mute audio'}
      >
        {isMuted
          ? <VolumeX className="w-4 h-4" />
          : <Volume2 className="w-4 h-4" />
        }
      </motion.button>
    </div>
  );
}
