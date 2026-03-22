"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Rocket, Cpu, Terminal, Shield, Zap, Terminal as PythonIcon } from 'lucide-react';
import { sfxHover, sfxClick } from '@/lib/sounds';

export const languages = [
  {
    id: 'python',
    name: 'Python',
    subtitle: 'Elegant & Powerful',
    icon: PythonIcon,
    color: '#3776ab',
    gradient: 'from-[#3776ab] to-[#ffd43b]',
    desc: 'Perfect for beginners and AI masters alike.'
  },
  {
    id: 'java',
    name: 'Java',
    subtitle: 'Write Once, Run Anywhere',
    icon: Coffee,
    color: '#f8981d',
    gradient: 'from-[#f8981d] to-[#5382a1]',
    desc: 'The backbone of enterprise systems.'
  },
  {
    id: 'c',
    name: 'C',
    subtitle: 'Close to the Metal',
    icon: Cpu,
    color: '#a8b9cc',
    gradient: 'from-[#a8b9cc] to-[#555555]',
    desc: 'The mother of all modern languages.'
  },
  {
    id: 'cpp',
    name: 'C++',
    subtitle: 'Performance Unleashed',
    icon: Rocket,
    color: '#00599c',
    gradient: 'from-[#00599c] to-[#004482]',
    desc: 'When speed is the only thing that matters.'
  }
];

export default function LanguageSelector({ onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-transparent p-4 sm:p-6 pt-24 sm:pt-20 overflow-x-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-purple/5 -z-10 blur-[150px]" />
      
      <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-20 max-w-2xl px-2">
         <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full glass text-brand-neon text-[10px] sm:text-xs font-black tracking-widest uppercase mb-2 sm:mb-4"
         >
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            SELECT YOUR FIGHTING STYLE
         </motion.div>
         <h2 className="text-3xl sm:text-5xl md:text-7xl font-black font-pixel text-white uppercase tracking-tighter shadow-brand-neon/20 leading-tight">
            CHOOSE YOUR WEAPON
         </h2>
         <p className="text-white/40 text-[10px] sm:text-sm uppercase tracking-widest">
            Select a programming language to begin your quest.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl w-full">
        {languages.map((lang, i) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            onMouseEnter={() => sfxHover()}
            onClick={() => { sfxClick(); onSelect(lang); }}
            className="group relative glass p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] cursor-pointer border-white/5 hover:border-white/20 transition-all flex flex-col items-center space-y-6 sm:space-y-8"
          >
             <div className={`absolute inset-0 bg-gradient-to-tr ${lang.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-[30px] sm:rounded-[40px]`} />
             
             <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-br ${lang.gradient} blur-2xl opacity-20 group-hover:opacity-60 transition-opacity`} />
                <lang.icon className="w-12 h-12 sm:w-16 sm:h-16 text-white group-hover:scale-110 transition-transform relative z-10" />
             </div>

             <div className="text-center space-y-1 sm:space-y-2 relative z-10">
                <h3 className="text-2xl sm:text-3xl font-black font-pixel uppercase tracking-tighter text-white">
                   {lang.name}
                </h3>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/40">
                   {lang.subtitle}
                </p>
             </div>

             <p className="text-xs sm:text-sm text-center text-white/30 leading-relaxed font-light mt-2 sm:mt-4">
                {lang.desc}
             </p>

             <div className="w-full pt-4 sm:pt-6 border-t border-white/5 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-white font-black uppercase text-[9px] sm:text-[10px] tracking-widest">
                   START QUEST <Zap className="w-3 h-3 text-brand-neon fill-current" />
                </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
