"use client";
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import * as LucideIcons from 'lucide-react';

// ── Generic Level Template & New Battle Engine ─────────
import LevelTemplate from '@/components/games/LevelTemplate';
import BattlePipeline from '@/components/games/BattlePipeline';
import SublevelDashboard from '@/components/games/SublevelDashboard';

export default function PlayPage({ params }) {
  const unwrappedParams = use(params);
  const { langId, levelId } = unwrappedParams;
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Generic state for old template
  const [levelData, setLevelData] = useState(null);
  
  // State for new gamified Sublevel pipeline
  const [sublevelsData, setSublevelsData] = useState(null);
  const [activePipeline, setActivePipeline] = useState(null);
  
  // Active Pipeline completed IDs (for the dashboard)
  const [completedSublevels, setCompletedSublevels] = useState([]);

  // HELPER: Map icon strings to Lucide components
  const getIcon = (iconName) => {
    return LucideIcons[iconName] || LucideIcons.HelpCircle;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('clash_user');
    if (!savedUser) {
      router.push('/auth');
      return;
    }
    setUser(JSON.parse(savedUser));

    const fetchLevelData = async () => {
      try {
        const response = await fetch(`/data/levels/${langId}/${levelId}/index.json?v=${Date.now()}`, {
          cache: 'no-store'
        });
        if (!response.ok) throw new Error("Level Index Breach");
        
        const data = await response.json();
        
        // CHECK ARCHITECTURE TYPE (Legacy Array vs New Sublevel Dashboard)
        if (data.sublevels) {
           setSublevelsData({ 
             ...data,
             sublevels: data.sublevels 
           });
           
           // Load sub-progress
           const localProgRaw = localStorage.getItem('clash_local_progress');
           let cloudProgress = {};
           if (localProgRaw && localProgRaw !== 'undefined') {
               try { cloudProgress = JSON.parse(localProgRaw); } catch(e) {}
           }
           
           const savedSub = cloudProgress[`sub_${langId}_${levelId}`];
           if (savedSub) {
               setCompletedSublevels(savedSub);
           }
           
           // DEV OVERRIDE: Unlock all Sublevels for test account
           if (savedUser && JSON.parse(savedUser).email === 'test@example.com') {
               setCompletedSublevels(data.sublevels.map(s => s.id));
           }

        } else if (data.pipeline) {
           // Direct single pipeline (fallback)
           setSublevelsData({
              label: data.label,
              sublevels: [{ id: "main", title: "Main", icon: "Cpu", pipeline: data.pipeline }]
           });
        } else {
           // LEGACY MAP VIEW
           const mappedFoundation = data.foundation?.map(f => ({
             ...f,
             icon: getIcon(f.icon)
           })) || [];
           
           const mappedTests = data.tests?.map(t => ({
             ...t,
             icon: getIcon(t.icon)
           })) || [];

           setLevelData({
             foundation: mappedFoundation,
             tests: mappedTests,
             label: data.label || `${langId.toUpperCase()}_ARCADE`
           });
        }
      } catch (err) {
        console.error("Failed to load Level Data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [langId, levelId, router]);

  const handleSaveProgress = async (progressData) => {
    if (!user) return;
    
    try {
      const { db } = await import('@/lib/firebase');
      const { doc, updateDoc, setDoc, getDoc } = await import('firebase/firestore');

      const rawLocal = localStorage.getItem('clash_local_progress');
      let localProgress = {};
      if (rawLocal && rawLocal !== 'undefined') {
         try { localProgress = JSON.parse(rawLocal); } catch(e) {}
      }
      
      const updatedLocal = { ...localProgress, ...progressData };
      localStorage.setItem('clash_local_progress', JSON.stringify(updatedLocal));

      const updatedUser = { 
        ...user, 
        progress: { ...user.progress, ...progressData } 
      };
      localStorage.setItem('clash_user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      if (user.uid) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
              await updateDoc(userRef, { progress: updatedLocal });
          } else {
              await setDoc(userRef, { progress: updatedLocal }, { merge: true });
          }
      }
    } catch (err) {
      console.error("Cloud sync or Storage failed:", err);
    }
  };

  const handleViewDoc = (topic) => {
    router.push(`/dashboard/${langId}/doc?topic=${encodeURIComponent(topic)}`);
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center font-pixel text-brand-neon animate-pulse uppercase text-sm tracking-widest">
      SYNCING_LEVEL_DATA...
    </div>
  );

  if (!levelData && !sublevelsData) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 text-center space-y-6">
       <LucideIcons.AlertTriangle className="w-12 h-12 text-brand-orange animate-bounce" />
       <h1 className="text-4xl font-black text-white uppercase italic">Level Not Found</h1>
       <p className="text-white/30 text-xs">The requested sector {levelId} is currently out of range.</p>
       <button onClick={() => router.push(`/dashboard/${langId}`)} className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 text-white font-black text-xs uppercase">Return to Hub</button>
    </div>
  );

  const completeActivePipeline = () => {
     try {
       // Find which sublevel we just finished
       const currentSublevel = sublevelsData.sublevels.find(s => s.pipeline === activePipeline);
       
       if (currentSublevel && !completedSublevels.includes(currentSublevel.id)) {
          const newCompleted = [...completedSublevels, currentSublevel.id];
          setCompletedSublevels(newCompleted);
          localStorage.setItem(`clash_sub_${langId}_${levelId}`, JSON.stringify(newCompleted));
          
          handleSaveProgress({ [`sub_${langId}_${levelId}`]: newCompleted });

          // If ALL sublevels are done, mark the whole Level complete!
          if (newCompleted.length === sublevelsData.sublevels.length) {
              const xpGain = 1000 + (parseInt(levelId) * 500);
              const progressKey = `level${levelId}`;
              handleSaveProgress({ 
                  [progressKey]: 'completed', 
                  totalXP: (user.progress?.totalXP || 0) + xpGain,
                  [`sub_${langId}_${levelId}`]: newCompleted
              });
          }
       }
     } catch (err) {
       console.error("Critical error inside completeActivePipeline:", err);
     } finally {
       // ALWAYS forcefully route back to the dashboard even on error
       setActivePipeline(null);
     }
  };

  const completeLegacyLevel = () => {
    const xpGain = 300 + (parseInt(levelId) * 100);
    const progressKey = `level${levelId}`;
    handleSaveProgress({ [progressKey]: 'completed', totalXP: (user.progress?.totalXP || 0) + xpGain });
    router.push(`/dashboard/${langId}`);
  };

  // ── NEW BATTLE ENGINE ROUTING ──────────────────────
  if (sublevelsData) {
    if (activePipeline) {
       return (
          <BattlePipeline 
            pipelineData={activePipeline}
            langLabel={sublevelsData.label}
            onComplete={completeActivePipeline}
            onBack={() => setActivePipeline(null)}
          />
       );
    }

    return (
       <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/assets/lab_bg.png')] opacity-30 pointer-events-none" style={{ backgroundSize: 'cover', imageRendering: 'pixelated' }} />
          <SublevelDashboard 
            label={sublevelsData.label}
            sublevels={sublevelsData.sublevels}
            completedIds={completedSublevels}
            onSelectSublevel={(pipe) => setActivePipeline(pipe)}
            onBack={() => router.push(`/dashboard/${langId}`)}
          />
       </div>
    );
  }

  // ── LEGACY LEVEL TEMPLATE (For unmigrated levels) ──
  return (
    <main className="min-h-screen bg-[#020202] text-white relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-50 fixed pointer-events-none"
        style={{
          backgroundImage: 'url("/assets/lab_bg.png")',
          backgroundSize: 'cover',
          imageRendering: 'pixelated'
        }}
      />
      <div className="relative z-10">
        <LevelTemplate
          langLabel={levelData.label}
          foundationStages={levelData.foundation}
          testStages={levelData.tests}
          onComplete={completeLegacyLevel}
          onBack={() => router.push(`/dashboard/${langId}`)}
          onViewDoc={handleViewDoc}
        />
      </div>
    </main>
  );
}
