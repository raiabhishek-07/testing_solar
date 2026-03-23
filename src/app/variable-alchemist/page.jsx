"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Play, FlaskConical, Code, AlertTriangle, Sparkles } from 'lucide-react';

const AlchemistEngine = dynamic(() => import('@/components/games/variable-alchemist/AlchemistEngine'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#1e1b4b] flex items-center justify-center font-mono text-purple-400">BREWING ALCHEMY ENGINE...</div>
});

const LANGS = [
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'java',   label: 'Java',   icon: '☕' },
    { id: 'c',      label: 'C',      icon: '⚙️' },
    { id: 'cpp',    label: 'C++',    icon: '🔧' },
];

const QUESTS = {
    python: [
        {
            id: 1, desc: "I need a pure Integer potion with exactly the value 8.",
            targetType: "number", targetValue: 8,
            ingredients: [{ var: 'item1', val: "5", type: 'String' },{ var: 'item2', val: 3, type: 'Number' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `# item1 is "5" (String)\n# item2 is 3 (Number)\n# item3 is True (Boolean)\n\n# Brew the 'potion' variable to output exactly int 8\npotion = int(item1) + item2`
        },
        {
            id: 2, desc: "I require a bizarre String potion that says exactly '53True'.",
            targetType: "string", targetValue: "53True",
            ingredients: [{ var: 'item1', val: 5, type: 'Number' },{ var: 'item2', val: "3", type: 'String' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `# Combine the elements to generate the exact string.\n# Remember how Python concatenates types!\npotion = `
        },
        {
            id: 3, desc: "I need a Boolean potion of True, using only the string!",
            targetType: "boolean", targetValue: true,
            ingredients: [{ var: 'item1', val: "false", type: 'String' },{ var: 'item2', val: 0, type: 'Number' },{ var: 'item3', val: false, type: 'Boolean' }],
            defaultCode: `# Hint: "false" is a non-empty string. Is bool("false") truthy?\npotion = `
        }
    ],
    java: [
        {
            id: 1, desc: "I need a pure Integer potion with exactly the value 8.",
            targetType: "number", targetValue: 8,
            ingredients: [{ var: 'item1', val: "5", type: 'String' },{ var: 'item2', val: 3, type: 'Number' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `// item1 is "5" (String)\n// item2 is 3 (int)\n// item3 is true (boolean)\n\n// Brew the 'potion' variable to output exactly int 8\nint potion = Integer.parseInt(item1) + item2;`
        },
        {
            id: 2, desc: "I require a bizarre String potion that says exactly '53true'.",
            targetType: "string", targetValue: "53true",
            ingredients: [{ var: 'item1', val: 5, type: 'Number' },{ var: 'item2', val: "3", type: 'String' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `// Combine the elements to create the exact string.\n// Remember how Java concatenates with +\nString potion = `
        },
        {
            id: 3, desc: "I need a Boolean potion of true!",
            targetType: "boolean", targetValue: true,
            ingredients: [{ var: 'item1', val: "false", type: 'String' },{ var: 'item2', val: 0, type: 'Number' },{ var: 'item3', val: false, type: 'Boolean' }],
            defaultCode: `// Hint: A non-empty string is not automatically truthy in Java\nboolean potion = `
        }
    ],
    c: [
        {
            id: 1, desc: "I need a pure Integer potion with exactly the value 8.",
            targetType: "number", targetValue: 8,
            ingredients: [{ var: 'item1', val: "5", type: 'String' },{ var: 'item2', val: 3, type: 'Number' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `/* item1 is "5" (char*) */\n/* item2 is 3 (int)    */\n/* item3 is 1 (bool)   */\n\n/* Brew the 'potion' to output exactly int 8 */\nint potion = atoi(item1) + item2;`
        },
        {
            id: 2, desc: "I need a Number potion of 6.",
            targetType: "number", targetValue: 6,
            ingredients: [{ var: 'item1', val: 5, type: 'Number' },{ var: 'item2', val: "1", type: 'String' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `/* Combine int and char* to get 6 */\nint potion = `
        },
        {
            id: 3, desc: "I need a Boolean potion of 1 (true)!",
            targetType: "number", targetValue: 1,
            ingredients: [{ var: 'item1', val: "false", type: 'String' },{ var: 'item2', val: 0, type: 'Number' },{ var: 'item3', val: false, type: 'Boolean' }],
            defaultCode: `/* Hint: In C, any non-zero is truthy */\nint potion = `
        }
    ],
    cpp: [
        {
            id: 1, desc: "I need a pure Integer potion with exactly the value 8.",
            targetType: "number", targetValue: 8,
            ingredients: [{ var: 'item1', val: "5", type: 'String' },{ var: 'item2', val: 3, type: 'Number' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `// item1 is "5" (string)\n// item2 is 3 (int)\n// item3 is true (bool)\n\n// Brew the 'potion' to output exactly int 8\nint potion = stoi(item1) + item2;`
        },
        {
            id: 2, desc: "I require a String potion that says exactly '53true'.",
            targetType: "string", targetValue: "53true",
            ingredients: [{ var: 'item1', val: 5, type: 'Number' },{ var: 'item2', val: "3", type: 'String' },{ var: 'item3', val: true, type: 'Boolean' }],
            defaultCode: `// Combine using to_string() and string concat\nstring potion = `
        },
        {
            id: 3, desc: "I need a Boolean potion of true!",
            targetType: "boolean", targetValue: true,
            ingredients: [{ var: 'item1', val: "false", type: 'String' },{ var: 'item2', val: 0, type: 'Number' },{ var: 'item3', val: false, type: 'Boolean' }],
            defaultCode: `// Hint: A non-empty string is truthy when cast to bool\nbool potion = `
        }
    ]
};

export default function VariableAlchemistPage() {
    const [selectedLang, setSelectedLang] = useState('python');
    const [questIdx, setQuestIdx] = useState(0);
    const quest = (QUESTS[selectedLang] || QUESTS.python)[questIdx];
    
    const [code, setCode] = useState(quest.defaultCode);
    const [status, setStatus] = useState("IDLE"); // IDLE, RUNNING, SUCCESS, FAILED
    const [error, setError] = useState(null);
    const [triggerAnimation, setTriggerAnimation] = useState(0);

    const handleLangChange = (lang) => {
        setSelectedLang(lang);
        const quests = QUESTS[lang] || QUESTS.python;
        const idx = Math.min(questIdx, quests.length - 1);
        setQuestIdx(idx);
        setCode(quests[idx].defaultCode);
        setStatus("IDLE");
        setError(null);
        setTriggerAnimation(Date.now());
    };

    const handleNextQuest = () => {
        const quests = QUESTS[selectedLang] || QUESTS.python;
        const next = (questIdx + 1) % quests.length;
        setQuestIdx(next);
        setCode(quests[next].defaultCode);
        setStatus("IDLE");
        setError(null);
        setTriggerAnimation(Date.now());
    };

    const handleBrew = () => {
        setError(null);
        setStatus("RUNNING");
        
        const { ingredients } = quest;

        // Synchronize with Phaser 3 bottle tween time (approx 1500ms)
        setTimeout(() => {
            try {
                // Evaluator strictly forces them to declare 'let potion'
                if (!code.includes("let potion") && !code.includes("const potion") && !code.includes("var potion")) {
                    throw new Error("You must declare a variable named 'potion'.");
                }

                const evalString = `${code}\nreturn potion;`;
                const func = new Function(ingredients[0].var, ingredients[1].var, ingredients[2].var, evalString);
                
                const result = func(ingredients[0].val, ingredients[1].val, ingredients[2].val);

                // Rigorous strict type and value checking
                if (typeof result !== quest.targetType) {
                    setStatus("FAILED");
                    setError(`TYPE COLLISION! You yielded a [${typeof result}] instead of a [${quest.targetType}]. Value was: ${result}`);
                } else if (result !== quest.targetValue) {
                    setStatus("FAILED");
                    setError(`INCORRECT POTENCY! Type was correct, but you yielded the value [${result}] instead of [${quest.targetValue}].`);
                } else {
                    setStatus("SUCCESS");
                }
            } catch (err) {
                setStatus("FAILED");
                setError(`SYNTAX EXPLOSION! ${err.message}`);
            }
        }, 1500);
    };

    return (
        <div className="w-screen h-screen bg-[#0a0512] text-white flex flex-col font-mono overflow-hidden">
            
            {/* TOP HUD */}
            <div className="w-full p-6 pb-2 flex justify-between items-start z-10 shrink-0">
                <div className="flex gap-4 items-center">
                    <Link href="/dashboard" className="p-4 bg-purple-900/30 border border-purple-500/30 rounded-2xl hover:border-purple-400 hover:bg-purple-900/50 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <ArrowLeft className="w-6 h-6 text-purple-300" />
                    </Link>
                    
                    <div className="p-6 bg-[#160b24] border border-purple-500/20 rounded-2xl flex flex-col gap-1 shadow-[inset_0_0_30px_rgba(168,85,247,0.05)] relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-purple-400 to-fuchsia-600 h-full" />
                        <div className="text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
                            <Sparkles className="w-3 h-3" />
                            Active Customer Request
                        </div>
                        <div className="text-sm font-medium text-purple-100 max-w-md">
                            "{quest.desc}"
                        </div>
                        <div className="flex gap-4 mt-3">
                            <div className="px-3 py-1 bg-purple-950/50 rounded text-[10px] font-black tracking-widest text-purple-300 border border-purple-500/20">TARGET TYPE: {quest.targetType.toUpperCase()}</div>
                            <div className="px-3 py-1 bg-fuchsia-950/50 rounded text-[10px] font-black tracking-widest text-fuchsia-300 border border-fuchsia-500/20">TARGET VALUE: {quest.targetValue.toString()}</div>
                        </div>
                    </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                    {/* Language Picker */}
                    <div className="flex gap-1 p-1 bg-black/60 backdrop-blur-md border border-purple-400/20 rounded-xl">
                        {LANGS.map(l => (
                            <button key={l.id} onClick={() => handleLangChange(l.id)}
                                className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                                    selectedLang === l.id ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                                }`}>
                                <span>{l.icon}</span> {l.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNextQuest} className="p-3 px-6 bg-[#160b24] border border-purple-500/20 hover:border-purple-400/50 rounded-xl flex items-center gap-3 transition-colors text-purple-300">
                        <span className="text-xs font-bold uppercase tracking-widest">Next Customer</span>
                    </button>
                </div>
            </div>

            {/* PHASER CAULDRON ENGINE (Middle Half) */}
            <div className="flex-1 w-full relative z-0 border-b border-purple-900/50 shadow-[0_10px_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-purple-950/20 to-black">
                <div className="absolute inset-0">
                    <AlchemistEngine 
                        ingredients={quest.ingredients}
                        status={status}
                        resetTrigger={triggerAnimation}
                    />
                </div>
            </div>

            {/* BOTTOM HUD - SPELLBOOK */}
            <div className="w-full h-80 shrink-0 z-10 relative bg-[#0a0512]">
                {/* Glowing Top line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_20px_#a855f7]" />
                
                <div className="flex h-full">
                    
                    {/* INGREDIENTS TRAY */}
                    <div className="w-80 border-r border-purple-900/30 p-6 flex flex-col bg-[#0d0718]">
                        <h3 className="text-[10px] text-purple-400 font-black tracking-widest uppercase mb-4 opacity-70 border-b border-purple-900/50 pb-2">Active Ingredients</h3>
                        <div className="flex-1 flex flex-col gap-3">
                            {quest.ingredients.map((ing, i) => (
                                <div key={i} className="p-3 bg-black/40 border border-white/5 rounded-xl flex justify-between items-center group hover:border-purple-500/30 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-purple-500 font-bold uppercase tracking-widest">{ing.var}</span>
                                        <span className="font-mono text-white text-sm">
                                            {typeof ing.val === 'string' ? `"${ing.val}"` : ing.val.toString()}
                                        </span>
                                    </div>
                                    <span className={`text-[10px] px-2 py-1 rounded font-black uppercase tracking-widest ${
                                        ing.type === 'String' ? 'bg-red-950/50 text-red-400 border border-red-900' :
                                        ing.type === 'Number' ? 'bg-blue-950/50 text-blue-400 border border-blue-900' :
                                        'bg-green-950/50 text-green-400 border border-green-900'
                                    }`}>
                                        {ing.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SPELLBOOK EDITOR */}
                    <div className="flex-1 flex flex-col p-8 bg-[#0a0512]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-950/50 border border-purple-500/30 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                                <Code className="w-5 h-5 text-purple-400" />
                            </div>
                            <h2 className="text-sm font-black tracking-widest uppercase text-purple-300 drop-shadow-md">Alchemist Spellbook</h2>
                        </div>
                        
                        <div className="flex-1 relative rounded-2xl bg-[#030106] border border-purple-900/30 p-6 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
                            <textarea 
                                className="w-full h-full bg-transparent text-fuchsia-300 font-mono text-sm leading-8 outline-none resize-none placeholder-purple-500/30 selection:bg-purple-900 relative z-10"
                                spellCheck="false"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {/* BREWING PANEL */}
                    <div className="w-[350px] flex flex-col p-8 bg-gradient-to-l from-[#0d0718] to-[#0a0512] border-l border-purple-900/30 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
                        <button 
                            onClick={handleBrew}
                            className="w-full py-6 mt-4 mb-6 bg-purple-600 hover:bg-purple-500 text-white hover:text-white font-black text-lg tracking-widest uppercase rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] flex justify-center items-center gap-3 transition-all active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-500 disabled:shadow-none"
                            disabled={status === "RUNNING" || status === "SUCCESS"}
                        >
                            <FlaskConical className="w-6 h-6" />
                            BREW POTION
                        </button>

                        <div className="flex-1 flex flex-col justify-end">
                            {status === "FAILED" && (
                                <div className="p-5 bg-[#2d0f14] border-l-4 border-red-500 rounded-r-xl text-red-400">
                                    <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-red-500" />
                                        <span className="font-black text-xs tracking-widest uppercase text-red-500">Brew Failed</span>
                                    </div>
                                    <p className="text-[11px] font-medium leading-relaxed opacity-90">{error}</p>
                                </div>
                            )}

                            {status === "SUCCESS" && (
                                <div className="p-5 bg-purple-950/40 border-l-4 border-fuchsia-500 rounded-r-xl text-fuchsia-300">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-4 h-4 text-fuchsia-400" />
                                        <span className="font-black text-xs tracking-widest uppercase text-fuchsia-400">Perfect Resonance</span>
                                    </div>
                                    <p className="text-[11px] font-medium leading-relaxed opacity-90">The exact required Data Type and Value were synthesized successfully.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
