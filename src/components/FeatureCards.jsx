"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Swords, BookOpen, Target, Shield, Cpu, Code } from 'lucide-react';

const features = [
  {
    title: "Language Legion",
    desc: "Choose your weapon: Java, Python, C, or C++. Each language has unique magical code bolts and fireball mechanics.",
    icon: Code,
    color: "cyan"
  },
  {
    title: "Teaching Phase",
    desc: "Learn from Level 0 and 1. Mastering syntax and fundamental structures through placards and guided lessons.",
    icon: BookOpen,
    color: "purple"
  },
  {
    title: "The Battle Arena",
    desc: "From Level 2 onwards, enter the classroom battlefield. 100 HP, multiple-choice rounds, and high-stakes coding.",
    icon: Swords,
    color: "pink"
  },
  {
    title: "Syntax Sorcery",
    desc: "Correct answers empower your student-hero for devastating attacks. Incorrect logic gets you clawed by Bugs.",
    icon: Target,
    color: "neon"
  },
  {
    title: "Boss Evolution",
    desc: "Face off against the Debug Dragon, Algorithm Wizard, and the ultimate Runtime Reaper.",
    icon: Shield,
    color: "danger"
  },
  {
    title: "Progressive Path",
    desc: "Basics → Syntax → Algorithms. A structured journey that transforms traditional study into immersive play.",
    icon: Cpu,
    color: "success"
  }
];

const colorMap = {
  cyan: "text-brand-cyan group-hover:bg-brand-cyan/20",
  purple: "text-brand-purple group-hover:bg-brand-purple/20",
  pink: "text-brand-pink group-hover:bg-brand-pink/20",
  neon: "text-brand-neon group-hover:bg-brand-neon/20",
  danger: "text-brand-danger group-hover:bg-brand-danger/20",
  success: "text-brand-success group-hover:bg-brand-success/20"
};

export default function FeatureCards() {
  return (
    <section id="features" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-2xl mx-auto space-y-4">
          <h4 className="text-brand-neon font-black uppercase tracking-[0.2em] text-xs">REINFORCED LEARNING</h4>
          <h2 className="text-5xl font-black uppercase tracking-tighter">GAMIFIED BATTLE MECHANICS</h2>
          <p className="text-white/40 leading-relaxed font-light mt-4">
            Master the core concepts of computer science through our meticulously designed level system 
            that ensures you don't just learn, but survive the Code Clash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[32px] group hover:border-brand-neon/40 transition-all duration-300 flex flex-col items-center text-center space-y-6"
            >
              <div className={`w-16 h-16 rounded-2xl flex justify-center p-4 transition-colors duration-500 ${colorMap[feature.color]}`}>
                <feature.icon className="w-full h-full" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-brand-neon transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
