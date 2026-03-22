"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Code, Shield, Cpu, Zap, Trophy, ChevronRight } from 'lucide-react';

const LevelCard = ({ id, title, subtitle, desc, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="glass p-8 rounded-[40px] border-white/5 flex flex-col md:flex-row gap-8 items-center group hover:border-white/10 transition-all"
  >
    <div className={`w-24 h-24 shrink-0 rounded-3xl flex items-center justify-center relative`} style={{ backgroundColor: `${color}20` }}>
       <div className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" style={{ backgroundColor: color }} />
       <Icon className="w-10 h-10 relative z-10" style={{ color }} />
    </div>
    
    <div className="flex-grow text-center md:text-left space-y-2">
       <div className="text-[10px] font-black tracking-[0.3em] uppercase opacity-40">Phase {id}</div>
       <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{title}</h3>
       <p className="text-white/50 text-sm leading-relaxed max-w-xl">{desc}</p>
    </div>

    <div className="shrink-0 flex flex-col items-center gap-1">
       <div className="text-[9px] font-black uppercase tracking-widest text-brand-neon">Status</div>
       <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
          Standalone
       </div>
    </div>
  </motion.div>
);

export default function LevelsInfoPage() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('clash_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const levels = [
    {
      id: 0,
      title: "NOOB ZONE",
      subtitle: "Foundations",
      desc: "Perfect for absolute beginners. Understand what computers, programs, and logic truly are through real-world analogies.",
      icon: Terminal,
      color: "#00ffff"
    },
    {
      id: 1,
      title: "SYNTAX SORCERY",
      subtitle: "Basic Structure",
      desc: "Variable manipulation and basic arithmetic. Command the fundamental building blocks of memory.",
      icon: Code,
      color: "#a855f7"
    },
    {
      id: 2,
      title: "LOGIC LOOPS",
      subtitle: "Flow Control",
      desc: "Branching paths and repetitive cycles. Master the 'if' and the 'while'.",
      icon: Shield,
      color: "#f472b6"
    },
    {
       id: 3,
       title: "ARRAY ARENA",
       subtitle: "Data Lists",
       desc: "Store and iterate over collections of data. Prepare for the complexity of multi-layered structures.",
       icon: Cpu,
       color: "#3776ab"
    },
    {
      id: 4,
      title: "ALGO ABYSS",
      subtitle: "Complex Logic",
      desc: "Optimizing code execution. Where true legends of the keyboard are forged.",
      icon: Zap,
      color: "#ffd43b"
    },
    {
      id: 5,
      title: "FINAL EXECUTION",
      subtitle: "The Master Boss",
      desc: "The ultimate challenge. Apply every skill to defeat the compiler-corruption.",
      icon: Trophy,
      color: "#fbbf24"
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-brand-neon selection:text-black font-sans overflow-x-hidden">
      <Navbar user={user} />
      
      <section className="relative pt-40 pb-20 px-6 min-h-screen">
        {/* Pixel Art Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40 fixed"
          style={{
            backgroundImage: 'url("/assets/levels_bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3) saturate(1.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-0" />

        <div className="container mx-auto max-w-5xl relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center mb-24 space-y-6"
           >
              <h1 className="text-4xl md:text-7xl font-pixel text-white tracking-tighter uppercase">
                 Curriculum <span className="text-brand-neon">Path</span>
              </h1>
              <p className="text-white/40 uppercase tracking-[0.5em] text-xs font-black">
                 6 Stages of Neural Upload
              </p>
           </motion.div>

           <div className="space-y-6">
              {levels.map((lvl, index) => (
                <LevelCard key={lvl.id} {...lvl} delay={index * 0.1} />
              ))}
           </div>

           <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="mt-20 p-12 glass rounded-[50px] border-white/5 text-center space-y-6 bg-gradient-to-b from-brand-neon/5 to-transparent"
           >
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Ready to Begin?</h2>
              <p className="text-white/40 text-sm max-w-md mx-auto">
                 The first 100 lines of code are the hardest. Choose your weapon and enter the arena.
              </p>
              <button 
                onClick={() => window.location.href='/dashboard'}
                className="pixel-btn pixel-btn-primary scale-110"
              >
                 Initialize Terminal
              </button>
           </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
