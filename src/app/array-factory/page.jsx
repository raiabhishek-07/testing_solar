"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Play, RefreshCw, Code, Box, AlertTriangle } from 'lucide-react';

const ArrayFactoryEngine = dynamic(() => import('@/components/games/array-factory/ArrayFactoryEngine'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-black flex items-center justify-center font-mono text-brand-neon">BOOTING FACTORY...</div>
});

const LANGS = [
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'java',   label: 'Java',   icon: '☕' },
    { id: 'c',      label: 'C',      icon: '⚙️' },
    { id: 'cpp',    label: 'C++',    icon: '🔧' },
];

const getAlgorithms = (order, lang = 'python') => {
    const op = order === 'ASC' ? '>' : '<';
    const opRev = order === 'ASC' ? '<' : '>';
    const target = order === 'ASC' ? 'largest' : 'smallest';
    const targetRev = order === 'ASC' ? 'min' : 'max';

    const templates = {
        python: {
            BUBBLE: `# BUBBLE SORT: Pushes ${target} elements to the end\nfor i in range(len(arr)):\n    for j in range(len(arr) - 1 - i):\n        if arr[j] ${op} arr[j + 1]:\n            swap(j, j + 1)`,
            SELECTION: `# SELECTION SORT: Finds ${targetRev} element and swaps it to the front\nfor i in range(len(arr)):\n    target_idx = i\n    for j in range(i + 1, len(arr)):\n        if arr[j] ${opRev} arr[target_idx]:\n            target_idx = j\n    if target_idx != i:\n        swap(i, target_idx)`,
            INSERTION: `# INSERTION SORT: Cascades items backward into their sorted place\nfor i in range(1, len(arr)):\n    j = i\n    while j > 0 and arr[j - 1] ${op} arr[j]:\n        swap(j, j - 1)\n        j -= 1`
        },
        java: {
            BUBBLE: `// BUBBLE SORT: Pushes ${target} elements to the end\nfor (int i = 0; i < arr.length; i++) {\n    for (int j = 0; j < arr.length - 1 - i; j++) {\n        if (arr[j] ${op} arr[j + 1]) {\n            swap(j, j + 1);\n        }\n    }\n}`,
            SELECTION: `// SELECTION SORT: Finds ${targetRev} element and swaps\nfor (int i = 0; i < arr.length; i++) {\n    int targetIdx = i;\n    for (int j = i + 1; j < arr.length; j++) {\n        if (arr[j] ${opRev} arr[targetIdx]) targetIdx = j;\n    }\n    if (targetIdx != i) swap(i, targetIdx);\n}`,
            INSERTION: `// INSERTION SORT: Cascades items backward into place\nfor (int i = 1; i < arr.length; i++) {\n    int j = i;\n    while (j > 0 && arr[j - 1] ${op} arr[j]) {\n        swap(j, j - 1);\n        j--;\n    }\n}`
        },
        c: {
            BUBBLE: `/* BUBBLE SORT: Pushes ${target} elements to the end */\nfor (int i = 0; i < n; i++) {\n    for (int j = 0; j < n - 1 - i; j++) {\n        if (arr[j] ${op} arr[j + 1]) {\n            swap(j, j + 1);\n        }\n    }\n}`,
            SELECTION: `/* SELECTION SORT: Finds ${targetRev} element */\nfor (int i = 0; i < n; i++) {\n    int target_idx = i;\n    for (int j = i + 1; j < n; j++) {\n        if (arr[j] ${opRev} arr[target_idx]) target_idx = j;\n    }\n    if (target_idx != i) swap(i, target_idx);\n}`,
            INSERTION: `/* INSERTION SORT: Cascades items backward */\nfor (int i = 1; i < n; i++) {\n    int j = i;\n    while (j > 0 && arr[j - 1] ${op} arr[j]) {\n        swap(j, j - 1);\n        j--;\n    }\n}`
        },
        cpp: {
            BUBBLE: `// BUBBLE SORT: Pushes ${target} elements to the end\nfor (int i = 0; i < arr.size(); i++) {\n    for (int j = 0; j < arr.size() - 1 - i; j++) {\n        if (arr[j] ${op} arr[j + 1]) {\n            swap(j, j + 1);\n        }\n    }\n}`,
            SELECTION: `// SELECTION SORT: Finds ${targetRev} element\nfor (int i = 0; i < arr.size(); i++) {\n    int targetIdx = i;\n    for (int j = i + 1; j < arr.size(); j++) {\n        if (arr[j] ${opRev} arr[targetIdx]) targetIdx = j;\n    }\n    if (targetIdx != i) swap(i, targetIdx);\n}`,
            INSERTION: `// INSERTION SORT: Cascades items backward\nfor (int i = 1; i < arr.size(); i++) {\n    int j = i;\n    while (j > 0 && arr[j - 1] ${op} arr[j]) {\n        swap(j, j - 1);\n        j--;\n    }\n}`
        }
    };

    return {
        BUBBLE:    { name: "Bubble Sort",             code: templates[lang].BUBBLE },
        SELECTION: { name: "Selection Sort",          code: templates[lang].SELECTION },
        INSERTION: { name: "Insertion Sort (Swaps)",   code: templates[lang].INSERTION }
    };
};

export default function ArrayFactoryPage() {
    const [selectedAlgo, setSelectedAlgo] = useState("BUBBLE");
    const [targetOrder, setTargetOrder] = useState("ASC");
    const [selectedLang, setSelectedLang] = useState('python');
    const [code, setCode] = useState(getAlgorithms("ASC", 'python')["BUBBLE"].code);
    const [initialArray, setInitialArray] = useState([8, 2, 9, 1, 5]);
    const [operations, setOperations] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("AWAITING_CODE"); // AWAITING_CODE, RUNNING, SUCCESS, FAILED
    const [triggerAnimation, setTriggerAnimation] = useState(0);

    const generateNewArray = () => {
        const newArr = Array.from({length: 5}, () => Math.floor(Math.random() * 9) + 1);
        setInitialArray([...newArr]);
        setOperations(null);
        setError(null);
        setStatus("AWAITING_CODE");
        setTriggerAnimation(Date.now()); // Re-mount or reset phaser boxes
    };

    const handleExecute = () => {
        setError(null);
        setStatus("RUNNING");

        let testArr = [...initialArray];
        let ops = [];
        let loopCount = 0;

        const swap = (i, j) => {
            if (loopCount++ > 1000) throw new Error("Infinite loop detected.");
            if (i < 0 || i >= testArr.length || j < 0 || j >= testArr.length) throw new Error("Array Index out of Bounds!");
            if (i === j) return; // No point animating a swap with itself

            let temp = testArr[i];
            testArr[i] = testArr[j];
            testArr[j] = temp;
            
            ops.push({ i, j });
        };

        try {
            // Strictly sandbox the code evaluation
            const func = new Function('arr', 'swap', code);
            func(testArr, swap);

            // Verify if sorted correctly
            let isSorted = true;
            for(let k=0; k < testArr.length - 1; k++) {
                if (targetOrder === 'ASC' && testArr[k] > testArr[k+1]) {
                    isSorted = false;
                    break;
                }
                if (targetOrder === 'DESC' && testArr[k] < testArr[k+1]) {
                    isSorted = false;
                    break;
                }
            }

            if (!isSorted) {
                setStatus("FAILED");
                setError(`Algorithm finished, but the array is NOT properly sorted in ${targetOrder === 'ASC' ? 'ASCENDING' : 'DESCENDING'} format!`);
            } else {
                setStatus("SUCCESS");
            }
            
            // Pass the operations to Phaser engine to animate
            setOperations(ops);

        } catch (err) {
            setStatus("FAILED");
            setError(err.message);
        }
    };

    return (
        <div className="w-screen h-screen bg-[#061014] text-white flex flex-col font-mono overflow-hidden">
            
            {/* TOP HUD */}
            <div className="w-full p-6 pb-2 flex justify-between items-start z-10 shrink-0">
                <div className="flex gap-4">
                    <Link href="/dashboard" className="p-3 bg-black/50 border border-white/10 rounded-xl hover:border-cyan-400 hover:bg-white/5 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="p-3 px-6 bg-black/60 backdrop-blur-md border border-cyan-400/30 rounded-xl flex items-center gap-4">
                        <div className="text-[10px] text-cyan-400 uppercase tracking-widest">Target Objective</div>
                        <div className="flex items-center gap-2">
                            <Box className="w-5 h-5 text-cyan-400" />
                            <span className="text-xl font-black tracking-widest">SORT ARRAY</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-4 items-center">
                    {/* Language Picker */}
                    <div className="flex gap-1 p-1 bg-black/60 backdrop-blur-md border border-cyan-400/20 rounded-xl">
                        {LANGS.map(l => (
                            <button key={l.id} onClick={() => { setSelectedLang(l.id); setCode(getAlgorithms(targetOrder, l.id)[selectedAlgo].code); }}
                                className={`px-3 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                                    selectedLang === l.id ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                                }`}>
                                <span>{l.icon}</span> {l.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={generateNewArray} className="p-3 px-6 bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/50 rounded-xl flex items-center gap-3 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase">Generate New Load</span>
                    </button>
                </div>
            </div>

            {/* PHASER BACKGROUND ENGINE (Upper Half) */}
            <div className="flex-1 w-full relative z-0 border-b border-cyan-900/50">
                <div className="absolute inset-0">
                    <ArrayFactoryEngine 
                        initialArray={initialArray}
                        operations={operations}
                        resetTrigger={triggerAnimation}
                    />
                </div>
            </div>

            {/* BOTTOM HUD - CODE EDITOR */}
            <div className="w-full h-96 shrink-0 z-10 relative bg-[#050B14]">
                {/* Top Glowing Trim */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#22d3ee]" />
                
                <div className="flex h-full">
                    {/* Editor Box */}
                    <div className="flex-1 flex flex-col p-8 pr-10">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-cyan-950 rounded-xl border border-cyan-800/50">
                                    <Code className="w-6 h-6 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-black tracking-widest uppercase text-white">Algorithms Cache</h2>
                                    <p className="text-[10px] text-cyan-500/70 font-bold uppercase tracking-widest">Steampunk Factory Override</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <select 
                                    value={targetOrder}
                                    onChange={(e) => {
                                        setTargetOrder(e.target.value);
                                        setCode(getAlgorithms(e.target.value, selectedLang)[selectedAlgo].code);
                                    }}
                                    className="bg-[#091524] text-cyan-400 font-bold tracking-widest uppercase text-xs px-4 py-3 rounded-xl outline-none border border-cyan-900 cursor-pointer hover:border-cyan-500 transition-colors focus:ring-2 focus:ring-cyan-500/20"
                                >
                                    <option value="ASC">Ascending</option>
                                    <option value="DESC">Descending</option>
                                </select>

                                <select 
                                    value={selectedAlgo}
                                    onChange={(e) => {
                                        setSelectedAlgo(e.target.value);
                                        setCode(getAlgorithms(targetOrder, selectedLang)[e.target.value].code);
                                    }}
                                    className="bg-[#091524] text-cyan-400 font-bold tracking-widest uppercase text-xs px-6 py-3 rounded-xl outline-none border border-cyan-900 cursor-pointer hover:border-cyan-500 transition-colors focus:ring-2 focus:ring-cyan-500/20"
                                >
                                    {Object.keys(getAlgorithms(targetOrder, selectedLang)).map(k => (
                                        <option key={k} value={k}>{getAlgorithms(targetOrder, selectedLang)[k].name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex-1 relative rounded-2xl bg-[#03070C] border border-white/5 p-6 shadow-inner ring-1 ring-white/5 overflow-hidden group">
                            {/* Editor Scanline Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(transparent,transparent_2px,#fff_2px,#fff_4px)]" />

                            <textarea 
                                className="w-full h-full bg-transparent text-green-400 font-mono text-[15px] leading-relaxed outline-none resize-none placeholder-white/20 selection:bg-cyan-900 relative z-10"
                                spellCheck="false"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Hide annoying scrollbars
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    {/* Execution Panel */}
                    <div className="w-[420px] flex flex-col p-10 bg-[#091524] border-l border-white/5 relative shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
                        <h3 className="text-xs text-cyan-500 font-black uppercase tracking-widest mb-10 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" /> 
                            Execution Terminal
                        </h3>
                        
                        <button 
                            onClick={handleExecute}
                            className="w-full py-6 mb-8 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg tracking-widest uppercase rounded-2xl shadow-lg hover:shadow-cyan-500/50 flex justify-center items-center gap-3 transition-all active:scale-95 disabled:opacity-50 disabled:bg-gray-800 disabled:text-gray-500 disabled:shadow-none"
                            disabled={status === "RUNNING"}
                        >
                            <Play className="w-6 h-6 fill-current" />
                            EXECUTE SORT
                        </button>

                        <div className="flex-1 flex flex-col justify-end">
                            {error && (
                                <div className="p-6 bg-[#2d0f14] border-l-4 border-red-500 rounded-r-xl text-red-400">
                                    <div className="flex items-center gap-3 mb-2">
                                        <AlertTriangle className="w-5 h-5 text-red-500" />
                                        <span className="font-black text-xs tracking-widest uppercase text-red-500">System Error</span>
                                    </div>
                                    <p className="text-xs font-medium leading-relaxed opacity-90">{error}</p>
                                </div>
                            )}

                            {status === "SUCCESS" && !error && (
                                <div className="p-6 bg-[#0f2d1e] border-l-4 border-green-500 rounded-r-xl text-green-400 flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-black text-xs tracking-widest uppercase text-green-500 mb-1">Logic Compiled</span>
                                        <span className="text-xs font-medium opacity-80">Execution successful.</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-ping" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
