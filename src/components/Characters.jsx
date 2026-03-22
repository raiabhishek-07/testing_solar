"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { User, Skull, Swords, Zap, Bug, Gamepad2, Brain, Flame, Activity } from 'lucide-react';

const characters = [
  {
    name: "Student-Hero",
    role: "Hero",
    hp: 100,
    special: "Code Bolt / Fireball",
    desc: "Your avatar in the classroom battlefield. Every correct answer fuels your power, turning syntax into magic.",
    icon: User,
    color: "brand-neon"
  },
  {
    name: "Bug Monster",
    role: "Lvl 2-5 Enemy",
    hp: 100,
    special: "Error Blast / Claws",
    desc: "A common pest in early levels. Vulnerable to basic logic and correct syntax.",
    icon: Bug,
    color: "brand-pink"
  },
  {
    name: "Debug Dragon",
    role: "Lvl 6-10 Boss",
    hp: 250,
    special: "Binary Breath",
    desc: "A formidable opponent that tests your multi-step logic and error-handling capabilities.",
    icon: Flame,
    color: "brand-purple"
  },
  {
    name: "Algorithm Wizard",
    role: "Lvl 11-15 Master",
    hp: 400,
    special: "Sorting Storm",
    desc: "Attacks with complex data structures and O(n) complexity. Requires refined algorithmic thinking to defeat.",
    icon: Brain,
    color: "brand-cyan"
  },
  {
    name: "Runtime Reaper",
    role: "Ultimat Boss",
    hp: 999,
    special: "Stack Overflow",
    desc: "The final barrier. Mastering system-level thinking and efficiency is the only path to victory.",
    icon: Skull,
    color: "brand-danger"
  }
];

export default function Characters() {
  return (
    <section id="characters" className="py-32 bg-[#080808]">
       <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h4 className="text-brand-pink font-black uppercase tracking-[0.2em] text-xs">MEET YOUR ADVERSARIES</h4>
          <h2 className="text-5xl font-black uppercase tracking-tighter">THE BATTLEFIELD ROSTER</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          {characters.map((char, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="w-full md:w-[350px] space-y-8"
             >
                <div className={`aspect-square rounded-[40px] glass p-10 flex flex-col items-center justify-center relative group`}>
                   <div className={`absolute inset-0 bg-${char.color}/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                   <char.icon className={`w-32 h-32 mb-8 text-${char.color} group-hover:drop-shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all`} />
                   
                   <div className="space-y-2 text-center relative z-10 w-full">
                      <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-white/40 mb-2">
                        <span>HP</span>
                        <span className={`text-${char.color}`}>{char.hp}</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full bg-${char.color}/50`} 
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl font-black uppercase tracking-tighter">{char.name}</h3>
                    <span className={`text-[10px] font-black uppercase px-2 py-1 bg-${char.color}/20 text-${char.color} border border-${char.color}/50 rounded-md`}>
                      {char.role}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed min-h-[60px]">
                    {char.desc}
                  </p>
                  <div className="flex items-center gap-4 pt-4 text-xs font-black uppercase tracking-tighter text-white/60">
                    <Activity className={`w-4 h-4 text-${char.color}`} />
                    <span>Special Attack: {char.special}</span>
                  </div>
                </div>
             </motion.div>
          ))}
        </div>
       </div>
    </section>
  );
}
