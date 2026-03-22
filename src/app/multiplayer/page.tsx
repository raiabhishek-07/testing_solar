'use client';

import PvpClient from '@/components/Multiplayer/PvpClient';
import Navbar from '@/components/Navbar';

export default function MultiplayerPage() {
    return (
        <main className="min-h-screen bg-[#020202] text-white relative">
            {/* Themed Background Overlay */}
            <div 
                className="absolute inset-0 z-0 opacity-40 fixed pointer-events-none"
                style={{
                  backgroundImage: 'url("/assets/battle_bg.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.3) saturate(1.2)'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202] z-0 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
                <Navbar user={{ name: 'RECRUIT' }} onStartQuest={() => {}} />
                <div className="pt-32 pb-20 px-4">
                    <PvpClient />
                </div>
            </div>
        </main>
    );
}
