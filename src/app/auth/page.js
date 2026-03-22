"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Auth from "@/components/Auth";
import { motion } from 'framer-motion';

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    // If user already logged in, redirect to realm
    const savedUser = localStorage.getItem('clash_user');
    if (savedUser) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleAuthSuccess = (userData) => {
    localStorage.setItem('clash_user', JSON.stringify(userData));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Auth onAuthSuccess={handleAuthSuccess} />
      </motion.div>
    </div>
  );
}
