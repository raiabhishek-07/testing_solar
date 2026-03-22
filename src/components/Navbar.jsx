"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Code2, Zap, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { sfxHover, sfxClick } from '@/lib/sounds';

export default function Navbar({ user, onStartQuest }) {
  const router = useRouter();

  const handleNav = (path) => {
    sfxClick();
    router.push(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass rounded-full px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-4 md:gap-12 max-w-[95%] sm:max-w-none"
      >
        <Link 
            href="/" 
            onMouseEnter={() => sfxHover()}
            onClick={() => sfxClick()}
            className="flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Code2 className="text-brand-neon w-5 h-5 sm:w-6 sm:h-6" />
          <span className="font-bold text-base sm:text-xl tracking-tighter text-white hidden xs:block">CODE CLASH</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-[10px] font-black uppercase tracking-widest text-white/50">
          <Link href="/#features" onMouseEnter={() => sfxHover()} onClick={() => sfxClick()} className="hover:text-brand-neon transition-colors cursor-pointer">Features</Link>
          <Link href="/level-info" onMouseEnter={() => sfxHover()} onClick={() => sfxClick()} className="hover:text-brand-neon transition-colors cursor-pointer">Levels</Link>
          <Link href="/about" onMouseEnter={() => sfxHover()} onClick={() => sfxClick()} className="hover:text-brand-neon transition-colors cursor-pointer">About</Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <motion.button 
            onMouseEnter={() => sfxHover()}
            onClick={() => handleNav(user ? '/dashboard' : '/auth')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-neon text-black font-black px-4 sm:px-6 py-2 rounded-full flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-widest whitespace-nowrap"
          >
            <Zap className="fill-current w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">{user ? 'DASHBOARD' : 'GET RECRUITED'}</span>
            <span className="xs:hidden">{user ? 'MAP' : 'START'}</span>
          </motion.button>

          {user && (
            <motion.button
              onMouseEnter={() => sfxHover()}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleNav('/profile')}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:border-brand-neon transition-colors shadow-inner"
            >
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
