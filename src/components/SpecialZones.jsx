"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Swords, Binary, Boxes, ArrowRight, Shield, FlaskConical, Bug } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { sfxHover, sfxClick } from '@/lib/sounds';

const ZONES = [
  {
    id: 'algo-quest',
    name: 'Algo Dojo',
    subtitle: 'Visual Algorithms',
    icon: Binary,
    color: '#00c8ff',
    gradient: 'from-[#00c8ff] to-[#004482]',
    desc: 'Master BFS, DFS, and Sorting through interactive visual battles.',
    path: '/algo-quest'
  },
  {
    id: 'block-adventure',
    name: 'Logic Lab',
    subtitle: 'Block Programming',
    icon: Boxes,
    color: '#ff6b35',
    gradient: 'from-[#ff6b35] to-[#9b5de5]',
    desc: 'Build logic without syntax. Perfect for rapid algorithm prototyping.',
    path: '/block-adventure'
  },
  {
    id: 'multiplayer',
    name: 'Stadium',
    subtitle: 'PVP Arena',
    icon: Swords,
    color: '#ff4757',
    gradient: 'from-[#ff4757] to-[#8a2be2]',
    desc: 'Challenge other Archmages in real-time coding duels.',
    path: '/multiplayer'
  },
  {
    id: 'trophies',
    name: 'Hall of Fame',
    subtitle: 'Your Achievements',
    icon: Trophy,
    color: '#ffd700',
    gradient: 'from-[#ffd700] to-[#ff6b35]',
    desc: 'View your earned trophies and climb the global leaderboard.',
    path: '/trophies'
  },
  {
    id: 'logic-defender',
    name: 'Logic Defender',
    subtitle: 'Boolean Gateway',
    icon: Shield,
    color: '#10b981',
    gradient: 'from-[#10b981] to-[#047857]',
    desc: 'Defend your CPU Core using literal Programming Logic Gates.',
    path: '/logic-defender'
  },
  {
    id: 'array-factory',
    name: 'Array Factory',
    subtitle: 'Sorting Algorithms',
    icon: Boxes,
    color: '#22d3ee',
    gradient: 'from-[#22d3ee] to-[#0f172a]',
    desc: 'Write custom JavaScript loops to power the robotic sorting arms.',
    path: '/array-factory'
  },
  {
    id: 'variable-alchemist',
    name: 'Alchemist',
    subtitle: 'Type Coercion',
    icon: FlaskConical,
    color: '#a855f7',
    gradient: 'from-[#a855f7] to-[#1e1b4b]',
    desc: 'Brew magic potions by writing precise JavaScript Data Type casts.',
    path: '/variable-alchemist'
  },
  {
    id: 'function-spellslinger',
    name: 'Spellslinger',
    subtitle: 'Functions & Params',
    icon: Swords,
    color: '#f43f5e',
    gradient: 'from-[#f43f5e] to-[#4c1d95]',
    desc: 'Cast powerful RPG magic by correctly invoking JavaScript functions with exact arguments.',
    path: '/function-spellslinger'
  },
  {
    id: 'bug-platformer',
    name: 'Bug Hunter',
    subtitle: 'Run & Debug',
    icon: Bug,
    color: '#e11d48',
    gradient: 'from-[#e11d48] to-[#4c0519]',
    desc: 'Sprint through the mainframe and terminate runtime Javascript errors live.',
    path: '/bug-platformer'
  }
];

export default function SpecialZones() {
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-32">
      <div className="flex items-center gap-6 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-purple/20" />
        <h2 className="text-2xl sm:text-3xl font-black font-pixel text-white uppercase tracking-tighter shadow-brand-neon/20 px-8 py-3 glass rounded-2xl border-brand-purple/20">
           SPECIALIZED REALMS
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-purple/20" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ZONES.map((zone, i) => (
          <motion.div
            key={zone.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            onMouseEnter={() => sfxHover()}
            onClick={() => { sfxClick(); router.push(zone.path); }}
            className="group relative glass p-8 rounded-[30px] cursor-pointer border-white/5 hover:border-white/20 transition-all overflow-hidden"
          >
             <div className={`absolute inset-0 bg-gradient-to-tr ${zone.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
             
             <div className="flex flex-col h-full space-y-4">
                <div className="flex items-start justify-between">
                   <div className="relative w-14 h-14 flex items-center justify-center">
                      <div className={`absolute inset-0 bg-gradient-to-br ${zone.gradient} blur-xl opacity-20 group-hover:opacity-60 transition-opacity`} />
                      <zone.icon className="w-10 h-10 text-white transition-transform group-hover:rotate-12" />
                   </div>
                   <div className="glass px-3 py-1 rounded-lg border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-white" />
                   </div>
                </div>

                <div className="space-y-1">
                   <h3 className="text-xl font-black font-pixel uppercase tracking-tighter text-white">
                      {zone.name}
                   </h3>
                   <p className="text-[10px] font-black uppercase tracking-widest text-brand-neon opacity-70">
                      {zone.subtitle}
                   </p>
                </div>

                <p className="text-xs text-white/40 leading-relaxed font-light flex-1">
                   {zone.desc}
                </p>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
