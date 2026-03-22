"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Cpu, Database, Cloud, Zap, Shield, Trophy } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color, delay, id }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="glass p-8 rounded-[40px] border-white/5 hover:border-white/20 transition-all group overflow-hidden relative"
  >
    <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full bg-white" style={{ backgroundColor: color }} />
    
    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10" style={{ backgroundColor: `${color}15` }}>
      <Icon className="w-7 h-7" style={{ color }} />
    </div>
    
    <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{title}</h3>
    <p className="text-white/40 text-sm leading-relaxed mb-6">
      {description}
    </p>
    
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
      <div className="w-8 h-px bg-current" />
      <span>System Module {id}</span>
    </div>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
      id: "042",
      icon: Terminal,
      title: "Interactive Play",
      description: "Write real code to cast spells and defeat enemies. No drag-and-drop blocks, just pure syntax mastery.",
      color: "#00ffff",
      delay: 0.1
    },
    {
      id: "089",
      icon: Shield,
      title: "Secure Sandbox",
      description: "Test your algorithms in a safe, high-performance execution environment with real-time feedback.",
      color: "#a855f7",
      delay: 0.2
    },
    {
      id: "137",
      icon: Trophy,
      title: "Path of Glory",
      description: "Earn unique badges and climb the global leaderboard as you conquer increasingly complex challenges.",
      color: "#f472b6",
      delay: 0.3
    },
    {
      id: "256",
      icon: Cpu,
      title: "Core Mechanics",
      description: "Understand low-level concepts like memory management and data structures through gameplay.",
      color: "#ffd43b",
      delay: 0.4
    }
  ];

  return (
    <section id="features" className="py-32 px-6 bg-[#020202]">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-brand-neon font-black tracking-[0.5em] text-xs uppercase">
              System Capabilities
            </span>
            <h2 className="text-4xl md:text-6xl font-pixel text-white uppercase tracking-tighter leading-none line-clamp-2">
              The Arsenal of <br/>
              <span className="text-brand-purple">A Developer</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs font-medium uppercase tracking-widest leading-relaxed border-l-2 border-brand-neon pl-6">
            Equip yourself with the tools needed to navigate the digital frontier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
