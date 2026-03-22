"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('clash_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleStartQuest = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth');
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-brand-neon selection:text-black font-sans overflow-x-hidden">
      <Navbar user={user} />
      
      <Hero onStartQuest={handleStartQuest} />
      
      <FeaturesSection />
      
      <Footer />
    </main>
  );
}
