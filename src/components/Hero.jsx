"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Shield, Trophy, Globe } from 'lucide-react';

const Hero = ({ onStartQuest }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-20 px-4 overflow-hidden">
      {/* Pixel Art Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/pixel_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5) contrast(1.1)'
        }}
      />
      
      {/* Overlay for gradients and fade effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#020202] z-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-0" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-brand-neon font-black tracking-[0.5em] text-[10px] sm:text-xs uppercase drop-shadow-lg">
                Start Your
              </span>
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-brand-neon to-transparent opacity-50" />
            </div>

            <h1 className="text-4xl md:text-8xl font-pixel uppercase tracking-tighter leading-none text-white drop-shadow-[0_8px_0_rgba(0,0,0,0.8)] filter">
              CODE <br/>
              <span className="text-[#FFD700] block mt-4">CLASH</span>
            </h1>
            
            <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-xl font-black leading-relaxed drop-shadow-md uppercase tracking-[0.2em] mt-4">
              FROM SYNTAX TO ALGORITHMS <span className="inline-block animate-bounce ml-2 text-yellow-400">✨</span>
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            onClick={onStartQuest}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group transition-all"
          >
            <div className="absolute -inset-6 bg-yellow-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="bg-[#FFD700] hover:bg-white text-[#1a1a1a] font-black text-lg md:text-2xl px-12 py-5 rounded-2xl
                          border-b-[10px] border-[#B8860B] active:border-b-0 active:translate-y-2 
                          transition-all duration-75 shadow-2xl uppercase tracking-tighter font-pixel
                          flex items-center gap-4">
              Get started
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
