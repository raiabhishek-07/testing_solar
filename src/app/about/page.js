"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Terminal, Users, Code, Sword } from 'lucide-react';

export default function AboutPage() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('clash_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-brand-neon selection:text-black font-sans overflow-x-hidden">
      <Navbar user={user} />
      
      <section className="relative pt-40 pb-20 px-6 min-h-screen">
        {/* Pixel Art Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'url("/assets/about_bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6) saturate(1.2) sepia(0.2)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-0" />
        
        <div className="container mx-auto max-w-4xl relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center mb-16"
           >
              <h1 className="text-4xl md:text-7xl font-pixel text-white mb-8 tracking-tighter uppercase">
                 Our <span className="text-brand-neon">Mission</span>
              </h1>
              <p className="text-xl text-white/70 italic font-medium leading-relaxed">
                "Gamifying the journey from beginner to master architect."
              </p>
           </motion.div>

           <div className="space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="glass p-8 rounded-[40px] border-white/5"
              >
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-neon/20 rounded-2xl flex items-center justify-center">
                       <Terminal className="text-brand-neon w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight">The Vision</h2>
                 </div>
                 <p className="text-white/60 leading-relaxed text-lg">
                    Code Clash started as a rebellion against traditional, dry coding tutorials. We believe that learning the foundations of computer science should feel like playing your favorite RPG. By combining high-stakes battles with real-world syntax, we've created an environment where failure is just a 'Game Over' screen away from a retry, not a discouragement.
                 </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-brand-purple/20 rounded-full flex items-center justify-center border border-brand-purple/30">
                       <Users className="text-brand-purple w-8 h-8" />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-sm">Community Led</h3>
                    <p className="text-xs text-white/40">Built for students, by developers who remember what it was like to start.</p>
                 </div>
                 <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-brand-neon/20 rounded-full flex items-center justify-center border border-brand-neon/30">
                       <Code className="text-brand-neon w-8 h-8" />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-sm">Real Syntax</h3>
                    <p className="text-xs text-white/40">We don't use blocks. You write real code used by pros every day.</p>
                 </div>
                 <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-brand-pink/20 rounded-full flex items-center justify-center border border-brand-pink/30">
                       <Sword className="text-brand-pink w-8 h-8" />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-sm">Strategic Depth</h3>
                    <p className="text-xs text-white/40">It's not just about typing; it's about solving logic puzzles to win.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
