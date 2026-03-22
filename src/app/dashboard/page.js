"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageSelector, { languages } from "@/components/LanguageSelector";
import Navbar from "@/components/Navbar";
import SpecialZones from "@/components/SpecialZones";

export default function DashboardIndex() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('clash_user');
    if (!savedUser) {
      router.push('/auth');
    } else {
      setUser(JSON.parse(savedUser));
      const savedLangId = sessionStorage.getItem('clash_lang_id');
      if (savedLangId) {
        // Automatically route to their last selected language if desired
        router.push(`/dashboard/${savedLangId}`);
      }
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    document.title = "SELECT YOUR REALM | CODE CLASH";
  }, []);

  const handleLanguageSelect = (lang) => {
    sessionStorage.setItem('clash_lang_id', lang.id);
    router.push(`/dashboard/${lang.id}`);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-pixel text-brand-neon animate-pulse uppercase gap-4">
      <div className="w-12 h-12 border-4 border-brand-neon border-t-transparent rounded-full animate-spin" />
      SYNCHRONIZING RECRUITMENT DATA...
    </div>
  );
  
  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#020202] text-white relative flex flex-col items-center justify-center p-4">
      {/* Pixel Art Background */}
      <div 
        className="absolute inset-0 z-0 opacity-80 fixed pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/dashboard_bg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6) saturate(1.2)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-0 pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar user={user} />
        
        <AnimatePresence mode="wait">
          <motion.div 
            key="select"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full h-full pt-10 px-4 sm:px-10"
          >
            {/* Language Selection - CORE QUEST */}
            <LanguageSelector onSelect={handleLanguageSelect} />

            {/* Specialized Zones - NEW EXPANSIONS (the 4 friend's pages) */}
            <SpecialZones />
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
