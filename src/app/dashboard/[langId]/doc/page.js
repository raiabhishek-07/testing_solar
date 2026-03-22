"use client";
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, Book, Star, Code, Cpu, Terminal as PythonIcon, 
  Terminal, Shield, Zap, Search, Layers, Box, Coffee, Rocket, 
  BookOpen, Info, MessageSquare, Layout, Sparkles, AlertCircle,
  Database, GitBranch, ArrowRight, Eye, EyeOff, HelpCircle
} from 'lucide-react';
import { languages } from "@/components/LanguageSelector";
import GameContainer from '@/components/doc/MiniGames';

// Helper to load the main structure index
const getDetailedDocsIndex = async (langId) => {
  try {
    let module;
    switch(langId) {
      case 'python': module = await import('@/components/python/data/docs'); break;
      case 'java':   module = await import('@/components/java/data/docs'); break;
      case 'c':      module = await import('@/components/c/data/docs'); break;
      case 'cpp':    module = await import('@/components/cpp/data/docs'); break;
      default: return null;
    }
    const key = `${langId.toUpperCase().replace('C++', 'CPP')}_DOCS`;
    return module[key] || module.default || Object.values(module).find(v => Array.isArray(v));
  } catch (e) {
    console.error(`CRITICAL: Static Documentation Index Breach for ${langId}:`, e);
    return null;
  }
};

// HELPER: Slugify topic titles for JSON file lookup
const slugify = (text) => text?.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');

// HELPER: Fetch detailed content from JSON
const getTopicDetail = async (langId, categoryIndex, topicSlug) => {
  try {
     const response = await fetch(`/data/docs/${langId}/${categoryIndex}/${topicSlug}.json`);
     if (!response.ok) return null;
     return await response.json();
  } catch (e) {
     return null;
  }
};

const PracticeItem = ({ question, solution, index }) => {
  const [showSolution, setShowSolution] = useState(false);
  
  return (
    <div className="glass p-8 rounded-[40px] border-white/5 bg-white/2 hover:border-brand-neon/20 transition-all space-y-6">
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-xl font-pixel text-brand-neon">
          {index}
        </div>
        <div className="space-y-4 flex-1 pt-2">
          <p className="text-xl text-white font-medium leading-relaxed italic line-clamp-3">
            {question}
          </p>
          
          <button 
            onClick={() => setShowSolution(!showSolution)}
            className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-brand-neon transition-colors"
          >
            {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showSolution ? "Hide Intelligence" : "Decrypt Solution"}
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showSolution && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 border-t border-white/5">
              <div className="bg-brand-neon/10 p-6 rounded-3xl border border-brand-neon/20 text-brand-neon font-mono text-sm leading-relaxed">
                <span className="block mb-2 text-[9px] font-black uppercase tracking-widest opacity-50"># Result_Buffer:</span>
                {solution}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function DocumentationPage({ params }) {
  const unwrappedParams = use(params);
  const langId = unwrappedParams.langId;
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [langInfo, setLangInfo] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicDetail, setTopicDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const init = async () => {
      const lang = languages.find(l => l.id === langId);
      if (!lang) {
        router.push('/dashboard');
        return;
      }
      setLangInfo(lang);
      
      const docsIndex = await getDetailedDocsIndex(langId);
      if (docsIndex) {
        setChapters(docsIndex);
        
        const queryParams = new URLSearchParams(window.location.search);
        const topicQuery = queryParams.get('topic');
        
        let found = null;
        if (topicQuery) {
           docsIndex.forEach((ch, cIndex) => {
              ch.topics.forEach(t => {
                 if (t.title.toLowerCase().includes(topicQuery.toLowerCase())) {
                    if (!found) found = { ...t, cIndex };
                 }
              });
           });
        }

        if (found) {
           handleTopicSelection(found, found.cIndex);
           setSearchQuery(""); 
        } else if (docsIndex.length > 0 && docsIndex[0].topics.length > 0) {
           handleTopicSelection(docsIndex[0].topics[0], 0);
        }
      }
      setLoading(false);
    };
    init();
  }, [langId, router]);

  const handleTopicSelection = async (topic, cIndex) => {
     setSelectedTopic(topic);
     setTopicDetail(null);
     
     const slug = slugify(topic.title);
     const detail = await getTopicDetail(langId, cIndex, slug);
     
     if (detail) {
        setTopicDetail(detail);
     } else {
        setTopicDetail(topic);
     }
  };

  if (loading || !langInfo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-pixel text-brand-neon animate-pulse uppercase tracking-[0.5em]">
        SYNCHING_CORE_LIBRARIES...
      </div>
    );
  }

  const allFilteredTopics = searchQuery 
    ? chapters.flatMap((ch, cIdx) => 
        ch.topics.filter(t => 
           t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           t.content?.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(t => ({ ...t, category: ch.category, cIdx }))
      )
    : [];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-neon selection:text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 glass border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5 }}
            onClick={() => router.push(`/dashboard/${langId}`)}
            className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white/50 hover:text-brand-neon hover:border-brand-neon/30 transition-all font-black text-xs uppercase"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <langInfo.icon className="w-5 h-5" style={{ color: langInfo.color }} />
              <h1 className="text-xl font-black font-pixel uppercase tracking-tighter shadow-sm">{langInfo.name} DIGITAL_MANUAL</h1>
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">VERSION_4.0_STABLE</div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-12">
           <div className="w-full relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-brand-neon transition-colors" />
              <input 
                 type="text"
                 placeholder="Search manual, commands, logic..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-neon/50 focus:bg-white/10 transition-all px-14 py-4 rounded-[30px] text-sm uppercase font-black tracking-widest outline-none"
              />
           </div>
        </div>

        <div className="flex items-center gap-4">
           <div className="glass px-6 py-2 rounded-full border-brand-neon/20 flex items-center gap-3">
              <Database className="w-3.5 h-3.5 text-brand-neon animate-pulse" />
              <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">Direct_Access</span>
           </div>
        </div>
      </nav>

      <div className="flex h-screen pt-28">
        <aside className="w-[320px] border-r border-white/5 bg-[#070707] flex flex-col overflow-hidden hidden lg:flex">
          <div className="p-8 text-[11px] font-black uppercase tracking-[0.5em] text-white/30 border-b border-white/5 flex items-center justify-between">
             <span>Navigation_Idx</span>
             <Book className="w-4 h-4 opacity-30" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
             {chapters.map((chapter, cIdx) => (
                <div key={cIdx} className="space-y-4">
                   <div className="px-4 text-[9px] font-black text-brand-purple uppercase tracking-widest flex items-center gap-3">
                      <span className="whitespace-nowrap">{chapter.category}</span>
                      <span className="w-full h-px bg-current opacity-10" />
                   </div>
                   <div className="space-y-1">
                      {chapter.topics.map(topic => (
                         <button
                            key={topic.title}
                            onClick={() => { handleTopicSelection(topic, cIdx); setSearchQuery(""); }}
                            className={`w-full p-3.5 rounded-2xl text-left flex items-center gap-4 transition-all group ${
                              selectedTopic?.title === topic.title 
                                ? 'bg-brand-neon/10 border border-brand-neon/30 text-brand-neon' 
                                : 'hover:bg-white/5 border border-transparent text-white/30 hover:text-white'
                            }`}
                         >
                            <topic.icon className={`w-4 h-4 shrink-0 transition-all group-hover:scale-110 ${selectedTopic?.title === topic.title ? 'scale-110' : ''}`} />
                            <span className="text-[11px] font-black uppercase tracking-widest truncate">{topic.title}</span>
                         </button>
                      ))}
                   </div>
                </div>
             ))}
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#050505] via-[#080808] to-black relative scroll-smooth">
           <AnimatePresence>
              {searchQuery && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-0 z-40 bg-black/95 backdrop-blur-3xl overflow-y-auto p-12"
                 >
                    <div className="max-w-4xl mx-auto space-y-12">
                       <h2 className="text-3xl font-black font-pixel text-white uppercase tracking-tighter underline decoration-brand-neon decoration-4 underline-offset-8">Search Results [{allFilteredTopics.length}]</h2>
                       <div className="grid grid-cols-1 gap-6 pb-20">
                          {allFilteredTopics.map((topic, i) => (
                             <button 
                                key={i}
                                onClick={() => { handleTopicSelection(topic, topic.cIdx); setSearchQuery(""); }}
                                className="glass p-8 rounded-[40px] text-left border-white/5 hover:border-brand-neon/40 transition-all space-y-4 group relative overflow-hidden"
                             >
                                <div className="flex items-center gap-6">
                                   <div className="p-4 bg-white/5 rounded-2xl">
                                      <topic.icon className="w-8 h-8 text-white group-hover:text-brand-neon transition-colors" />
                                   </div>
                                   <div>
                                      <span className="text-[10px] font-black text-brand-neon/40 uppercase tracking-[0.4em]">{topic.category}</span>
                                      <h3 className="text-3xl font-black text-white italic uppercase">{topic.title}</h3>
                                   </div>
                                </div>
                             </button>
                          ))}
                       </div>
                    </div>
                 </motion.div>
              )}
           </AnimatePresence>

           <AnimatePresence mode="wait">
             {selectedTopic && topicDetail && (
                <motion.article
                  key={selectedTopic.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="max-w-4xl mx-auto p-8 md:p-12 space-y-16 pb-40"
                >
                  <div className="space-y-8 text-center">
                    <div className="glass px-4 py-1.5 inline-block rounded-full border-brand-purple/20 text-brand-purple text-[10px] font-black uppercase tracking-[0.3em] font-pixel">
                        Module://{selectedTopic.title.replace(/\s+/g, '_').toUpperCase()}
                    </div>
                    <div className="space-y-4">
                       <h1 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter drop-shadow-2xl leading-none">
                          {selectedTopic.title}
                       </h1>
                       <div className="flex items-center justify-center gap-4 text-brand-neon text-xs font-black uppercase tracking-[0.4em] opacity-80">
                          <Zap className="w-4 h-4 fill-current" /> Mastery_Node
                       </div>
                    </div>
                  </div>

                  <div className="space-y-20">
                    <section className="space-y-6">
                      <div className="flex items-center gap-4 text-brand-neon underline decoration-4 underline-offset-8">
                        <Star className="w-5 h-5 fill-current" />
                        <h2 className="text-2xl font-black uppercase tracking-widest italic">Concept</h2>
                      </div>
                      <div className="glass p-8 rounded-[30px] border-brand-neon/20 bg-brand-neon/5 relative overflow-hidden group">
                        <p className="text-xl text-white font-medium leading-relaxed italic">
                          {topicDetail.learning?.concept || topicDetail.content}
                        </p>
                      </div>
                    </section>

                    <section className="space-y-6">
                      <div className="flex items-center gap-4 text-blue-400">
                        <BookOpen className="w-5 h-5" />
                        <h2 className="text-2xl font-black uppercase tracking-widest italic">Explanation</h2>
                      </div>
                      <div className="text-white/70 text-lg leading-relaxed space-y-4 font-light border-l-2 border-white/5 pl-8 whitespace-pre-wrap">
                        {topicDetail.learning?.explanation || topicDetail.details}
                      </div>
                    </section>

                    {topicDetail.learning?.analogy && (
                      <section className="space-y-6">
                        <div className="flex items-center gap-4 text-brand-purple">
                          <Rocket className="w-5 h-5" />
                          <h2 className="text-2xl font-black uppercase tracking-widest italic">Real-World Analogy</h2>
                        </div>
                        <div className="glass p-10 rounded-[40px] border-brand-purple/20 bg-brand-purple/5 relative group">
                          <h3 className="text-white text-2xl font-black italic uppercase group-hover:text-brand-purple transition-colors mb-6">
                             {topicDetail.learning.analogy.title}
                          </h3>
                          <p className="text-white/60 text-lg leading-relaxed font-light whitespace-pre-wrap">
                             {topicDetail.learning.analogy.body}
                          </p>
                        </div>
                      </section>
                    )}

                    {/* Simulation Section */}
                    {topicDetail.game && (
                      <section className="space-y-10 py-12 border-y border-white/5 relative">
                         <div className="absolute inset-0 bg-brand-neon/2 opacity-20 pointer-events-none blur-3xl" />
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-brand-neon animate-pulse">
                               <Zap className="w-6 h-6 fill-current" />
                               <h2 className="text-2xl font-black uppercase tracking-[0.4em] italic font-pixel">Simulation_Initiated</h2>
                            </div>
                            <div className="text-[10px] font-black text-white/20 uppercase tracking-widest italic">Foundation_Game_Engine_v1.0</div>
                         </div>

                         <GameContainer 
                            type={topicDetail.game.type} 
                            config={topicDetail.game.config} 
                         />
                      </section>
                    )}

                    {topicDetail.examples && topicDetail.examples.length > 0 && (
                      <section className="space-y-8">
                         <div className="flex items-center gap-4 text-white/40">
                            <Code className="w-5 h-5" />
                            <h2 className="text-2xl font-black uppercase tracking-widest italic">Live Code Extractions</h2>
                         </div>
                         <div className="grid grid-cols-1 gap-6">
                            {topicDetail.examples.map((ex, i) => (
                               <div key={i} className="glass rounded-[30px] border-white/5 overflow-hidden">
                                  <div className="bg-white/5 px-8 h-12 border-b border-white/5 flex items-center">
                                     <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">{ex.name}</span>
                                  </div>
                                  <div className="p-8 bg-black/40 font-mono text-brand-neon text-sm leading-relaxed overflow-x-auto">
                                     <pre>{ex.code}</pre>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </section>
                    )}

                    {topicDetail.learning?.practice && (
                      <section className="space-y-8 pt-12 border-t border-white/5">
                        <div className="flex items-center gap-4 text-yellow-500">
                          <HelpCircle className="w-6 h-6" />
                          <h2 className="text-2xl font-black uppercase tracking-widest italic">Practice Questions</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6">
                          {topicDetail.learning.practice.map((p, i) => (
                            <PracticeItem key={i} question={p.q} solution={p.a} index={i + 1} />
                          ))}
                        </div>
                      </section>
                    )}
                  </div>

                  <div className="pt-20 text-center space-y-12">
                     <button className="max-w-md mx-auto w-full h-20 group relative rounded-[30px] overflow-hidden transition-all shadow-2xl shadow-brand-neon/10">
                        <div className="absolute inset-0 bg-brand-neon group-hover:scale-105 transition-transform" />
                        <div className="relative z-10 flex items-center justify-center gap-4 text-black font-black uppercase tracking-[0.3em] text-sm">
                           <span>Start Arena Trial</span>
                           <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </div>
                     </button>
                  </div>

                  <div className="relative py-20 px-12 glass rounded-[60px] border-white/5 overflow-hidden text-center space-y-8 mt-20">
                     <h3 className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20">Knowledge_Synchronization</h3>
                     <p className="text-3xl text-white font-pixel uppercase tracking-tighter italic opacity-40 leading-none">
                        Mastery is not final, failure is not fatal:<br/>It is the courage to continue that counts.
                     </p>
                  </div>
                </motion.article>
             )}
           </AnimatePresence>
        </main>
      </div>
      
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-soft-light" />
      <div className="fixed inset-0 pointer-events-none animate-scanline h-full w-full bg-gradient-to-b from-transparent via-brand-neon/5 to-transparent z-[100] opacity-10" />
    </div>
  );
}
