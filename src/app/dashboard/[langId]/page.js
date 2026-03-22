"use client";
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { languages } from "@/components/LanguageSelector";
import GameMap from "@/components/GameMap";

export default function LanguageDashboardPage({ params }) {
  const unwrappedParams = use(params);
  const langId = unwrappedParams.langId;
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('clash_user');
    if (!savedUser) {
      router.push('/auth');
      return;
    }
    
    // Load local progress backup to ensure mapping is always accurate
    const initialUser = JSON.parse(savedUser);
    const localProgress = JSON.parse(localStorage.getItem('clash_local_progress') || '{}');
    
    let mergedUser = {
      ...initialUser,
      progress: { ...initialUser.progress, ...localProgress }
    };

    // DEV OVERRIDE: Unlock all levels for the main test account
    if (mergedUser.email === 'test@example.com') {
      mergedUser.progress = {
        ...mergedUser.progress,
        level0: 'completed',
        level1: 'completed',
        level2: 'completed',
        level3: 'completed',
        level4: 'completed',
        level5: 'completed',
        level6: 'completed',
        level7: 'completed'
      };
    }

    setUser(mergedUser);
    
    const lang = languages.find(l => l.id === langId);
    if (!lang) {
      router.push('/dashboard');
    } else {
      setSelectedLanguage(lang);
      sessionStorage.setItem('clash_lang_id', langId);
      document.title = `${lang.name.toUpperCase()} REALM | CODE CLASH`;
    }
    setLoading(false);
  }, [langId, router]);

  if (loading || !selectedLanguage) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-pixel text-brand-neon animate-pulse uppercase gap-4">
      <div className="w-12 h-12 border-4 border-brand-neon border-t-transparent rounded-full animate-spin" />
      REALM_SYNCHRONIZING[{langId?.toUpperCase()}]...
    </div>
  );

  const realmBackgrounds = {
    'python': '/assets/realm_python_bg.png',
    'java': '/assets/realm_java_bg.png',
    'c': '/assets/realm_c_bg.png',
    'cpp': '/assets/realm_cpp_bg.png',
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white relative">
      <div 
        className="absolute inset-0 z-0 opacity-40 fixed pointer-events-none"
        style={{
          backgroundImage: `url("${realmBackgrounds[langId] || '/assets/dashboard_bg.png'}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.4) saturate(1.2)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-0 pointer-events-none" />

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <GameMap 
          user={user}
          selectedLanguage={selectedLanguage}
          onEnterLevel={(lvlId) => router.push(`/dashboard/${langId}/lvl/${lvlId}`)}
          onViewDocs={() => router.push(`/dashboard/${langId}/doc`)}
          onBack={() => {
            sessionStorage.removeItem('clash_lang_id');
            router.push('/dashboard');
          }}
          toggleProfile={() => router.push('/profile')}
        />
      </motion.div>
    </main>
  );
}
