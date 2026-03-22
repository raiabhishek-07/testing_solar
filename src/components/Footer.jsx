"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, Code2, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="about" className="py-20 bg-black relative">
       <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />
       
       <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
             <div className="flex items-center gap-2">
                <Code2 className="text-brand-neon w-8 h-8" />
                <span className="font-bold text-2xl tracking-tighter">CODE CLASH</span>
             </div>
             <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
                Our major project presents Code Clash: From Syntax to Algorithms, an interactive game designed to make programming education engaging and fun.
             </p>
          </div>

          <div className="space-y-6">
             <h4 className="text-sm font-black uppercase tracking-widest text-white/50">PLATFORM</h4>
             <ul className="space-y-3 text-xs font-medium uppercase tracking-widest text-white/40">
                <li className="hover:text-brand-neon cursor-pointer transition-colors">Play Now</li>
                <li className="hover:text-brand-neon cursor-pointer transition-colors">Developer Blog</li>
                <li className="hover:text-brand-neon cursor-pointer transition-colors">Syllabus</li>
                <li className="hover:text-brand-neon cursor-pointer transition-colors">Tutorials</li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="text-sm font-black uppercase tracking-widest text-white/50">LEGAL</h4>
             <ul className="space-y-3 text-xs font-medium uppercase tracking-widest text-white/40">
                <li className="hover:text-brand-neon cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-brand-neon cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-brand-neon cursor-pointer transition-colors">Cookie Policy</li>
             </ul>
          </div>

          <div className="space-y-6">
             <h4 className="text-sm font-black uppercase tracking-widest text-white/50">GET IN TOUCH</h4>
             <div className="flex gap-4">
                <motion.a whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-brand-neon transition-colors"><Github className="w-5 h-5" /></motion.a>
                <motion.a whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-brand-purple transition-colors"><Twitter className="w-5 h-5" /></motion.a>
                <motion.a whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-brand-cyan transition-colors"><Linkedin className="w-5 h-5" /></motion.a>
                <motion.a whileHover={{ y: -5 }} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/50 hover:text-brand-pink transition-colors"><Mail className="w-5 h-5" /></motion.a>
             </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
           <div className="flex items-center gap-2">
              MADE WITH <Heart className="w-3 h-3 text-brand-pink fill-current" /> BY THE CODE CLASH DEV TEAM
           </div>
           <p>© 2026 CODE CLASH. ALL RIGHTS RESERVED.</p>
        </div>
       </div>
    </footer>
  );
}
