"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, GraduationCap, Zap, PlayCircle, Trophy, Box, Monitor, Server, Globe } from 'lucide-react';

const levels = [
  {
    lvl: "0 - 1",
    phase: "Basics Phase",
    title: "Syntax & Placards",
    description: "Learn the core keywords and basic structures of your chosen language through visual guides and guided lessons.",
    icon: GraduationCap,
    color: "brand-cyan"
  },
  {
    lvl: "2 - 5",
    phase: "Battle Phase 1",
    title: "The Classroom Battlefield",
    description: "Face Bug Monsters using multiple-choice logic. Correct answers empower your hero to strike.",
    icon: PlayCircle,
    color: "brand-pink"
  },
  {
    lvl: "6 - 10",
    phase: "Challenge Phase 2",
    title: "Complex Structures",
    description: "Enter the 'Infinite Loop' arena where you encounter 'Debug Dragons' requiring nested logic to defeat.",
    icon: Zap,
    color: "brand-purple"
  },
  {
    lvl: "11 - 15",
    phase: "Master Phase 3",
    title: "Advanced Algorithms",
    description: "Confront the Algorithm Wizard himself. Optimized solutions deal 2x damage, while brute force takes time.",
    icon: Trophy,
    color: "brand-neon"
  }
];

export default function LevelProgression() {
  return (
    <section id="levels" className="py-32 bg-black relative">
      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-brand-neon/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h4 className="text-brand-cyan font-black uppercase tracking-[0.2em] text-xs">YOUR JOURNEY</h4>
          <h2 className="text-6xl font-black uppercase tracking-tighter">THE CORE LEARNING PATH</h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-32 py-20 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-40 w-px bg-white/10 hidden lg:block" />
          
          {levels.map((level, i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-32 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
             >
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  <div className="space-y-4">
                    <span className={`text-${level.color} font-black text-xs uppercase tracking-[0.3em]`}>LEVEL {level.lvl} / {level.phase}</span>
                    <h3 className="text-4xl font-black uppercase tracking-tighter">{level.title}</h3>
                  </div>
                  <p className="text-white/40 leading-relaxed font-light text-lg">
                    {level.description}
                  </p>
                </div>

                <div className={`relative w-40 h-40 flex items-center justify-center shrink-0`}>
                   <div className={`absolute inset-0 bg-${level.color}/20 blur-[60px] rounded-full animate-pulse transition-all`} />
                   <div className={`glass w-full h-full rounded-[40px] flex items-center justify-center border-${level.color}/50 relative hover:scale-110 transition-transform duration-500`}>
                      <level.icon className={`w-16 h-16 text-${level.color} filter drop-shadow-[0_0_10px_currentColor]`} />
                   </div>
                   {i < levels.length - 1 && (
                     <div className="absolute top-[110%] left-1/2 -translate-x-1/2 h-16 w-px bg-brand-neon/20 lg:hidden" />
                   )}
                </div>

                <div className="flex-1 hidden lg:block" />
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
