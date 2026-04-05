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
    { id: 'javascript', label: 'JS',     icon: '🟨' },
    { id: 'python',     label: 'Python', icon: '🐍' },
    { id: 'java',       label: 'Java',   icon: '☕' },
    { id: 'c',          label: 'C',      icon: '⚙️' },
    { id: 'cpp',        label: 'C++',    icon: '🔧' },
];

const getAlgorithms = (order, lang = 'javascript') => {
    const op = order === 'ASC' ? '>' : '<';
    const opRev = order === 'ASC' ? '<' : '>';
    const target = order === 'ASC' ? 'largest' : 'smallest';
    const targetRev = order === 'ASC' ? 'min' : 'max';

    const templates = {
        javascript: {
            BUBBLE: `// BUBBLE SORT: Pushes ${target} elements to the end\nfor (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - 1 - i; j++) {\n        if (arr[j] ${op} arr[j + 1]) {\n            swap(j, j + 1);\n        }\n    }\n}`,
            SELECTION: `// SELECTION SORT: Finds ${targetRev} element and swaps\nfor (let i = 0; i < arr.length; i++) {\n    let targetIdx = i;\n    for (let j = i + 1; j < arr.length; j++) {\n        if (arr[j] ${opRev} arr[targetIdx]) targetIdx = j;\n    }\n    if (targetIdx != i) swap(i, targetIdx);\n}`,
            INSERTION: `// INSERTION SORT: Cascades items backward into place\nfor (let i = 1; i < arr.length; i++) {\n    let j = i;\n    while (j > 0 && arr[j - 1] ${op} arr[j]) {\n        swap(j, j - 1);\n        j--;\n    }\n}`
        },
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
        BUBBLE:    { name: "Bubble Sort",             code: templates[lang]?.BUBBLE || templates['javascript'].BUBBLE },
        SELECTION: { name: "Selection Sort",          code: templates[lang]?.SELECTION || templates['javascript'].SELECTION },
        INSERTION: { name: "Insertion Sort (Swaps)",   code: templates[lang]?.INSERTION || templates['javascript'].INSERTION }
    };
};

export default function ArrayFactoryPage() {
    const [selectedAlgo, setSelectedAlgo] = useState("BUBBLE");
    const [targetOrder, setTargetOrder] = useState("ASC");
    const [selectedLang, setSelectedLang] = useState('javascript');
    const [code, setCode] = useState("");
    const [initialArray, setInitialArray] = useState([8, 2, 9, 1, 5]);
    const [operations, setOperations] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("AWAITING_CODE"); 
    const [triggerAnimation, setTriggerAnimation] = useState(0);

    // Sync initial code
    useEffect(() => {
        const defaultCode = getAlgorithms(targetOrder, selectedLang)[selectedAlgo].code;
        setCode(defaultCode);
    }, []);

    const generateNewArray = () => {
        const newArr = Array.from({length: 5}, () => Math.floor(Math.random() * 9) + 1);
        setInitialArray([...newArr]);
        setOperations(null);
        setError(null);
        setStatus("AWAITING_CODE");
        setTriggerAnimation(Date.now());
    };

    const handleExecute = () => {
        setError(null);
        setStatus("RUNNING");

        let testArr = [...initialArray];
        let ops = [];
        let loopCount = 0;

        const swap = (i, j) => {
            if (loopCount++ > 1000) throw new Error("Infinite loop detected.");
            if (i < 0 || i >= testArr.length || j < 0 || j >= testArr.length) throw new Error("Index Out Of Bounds!");
            if (i === j) return; 

            let temp = testArr[i];
            testArr[i] = testArr[j];
            testArr[j] = temp;
            ops.push({ i, j });
        };

        const preprocessCode = (rawCode, lang) => {
            let processed = rawCode.replace(/\u00A0/g, ' ');
            if (lang === 'javascript') return processed;

            if (lang === 'python') {
                let lines = processed.split('\n');
                let jsLines = [];
                let indentStack = [0];

                for (let line of lines) {
                    const indent = line.search(/\S/);
                    let fullLine = line;
                    let commentIdx = fullLine.indexOf('#');
                    let comment = '';
                    if (commentIdx !== -1) {
                        comment = ' // ' + fullLine.substring(commentIdx + 1).trim();
                        fullLine = fullLine.substring(0, commentIdx);
                    }

                    let trimmed = fullLine.trim();
                    if (!trimmed) {
                        jsLines.push(line.replace(/#/g, '//'));
                        continue;
                    }

                    while (indentStack.length > 1 && indent < indentStack[indentStack.length - 1]) {
                        indentStack.pop();
                        jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
                    }

                    let content = trimmed;
                    if (content.endsWith(':')) {
                        content = content.slice(0, -1).trim();
                        if (content.startsWith('for ')) {
                            content = content.replace(/for\s+(\w+)\s+in\s+range\((.*)\)/g, (m, p1, p2) => {
                                let params = p2.split(',').map(s => s.trim());
                                let start = '0', end = '0';
                                if (params.length === 1) end = params[0].replace(/len\(arr\)/g, 'arr.length');
                                else { start = params[0]; end = params[1].replace(/len\(arr\)/g, 'arr.length'); }
                                return `for (let ${p1} = ${start}; ${p1} < ${end}; ${p1}++)`;
                            });
                        } else if (content.startsWith('if ')) {
                            let cond = content.substring(3).trim();
                            cond = cond.replace(/len\(arr\)/g, 'arr.length').replace(/\band\b/g, ' && ').replace(/\bor\b/g, ' || ').replace(/\bnot\b/g, ' !');
                            content = `if (${cond})`;
                        } else if (content.startsWith('while ')) {
                            let cond = content.substring(6).trim();
                            cond = cond.replace(/len\(arr\)/g, 'arr.length').replace(/\band\b/g, ' && ').replace(/\bor\b/g, ' || ').replace(/\bnot\b/g, ' !');
                            content = `while (${cond})`;
                        } else if (content.startsWith('elif ')) {
                            let cond = content.substring(5).trim();
                            cond = cond.replace(/len\(arr\)/g, 'arr.length').replace(/\band\b/g, ' && ').replace(/\bor\b/g, ' || ').replace(/\bnot\b/g, ' !');
                            content = `else if (${cond})`;
                        } else if (content.startsWith('else')) {
                            content = `else`;
                        }
                        content += ' {';
                        indentStack.push(indent + 4);
                    } else {
                        if (/^\w+\s*=[^=]/.test(content)) content = 'let ' + content;
                    }
                    jsLines.push(' '.repeat(indent) + content + comment);
                }
                while (indentStack.length > 1) {
                    indentStack.pop();
                    jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
                }
                processed = jsLines.join('\n');
            } else if (['java', 'c', 'cpp'].includes(lang)) {
                processed = processed.replace(/\b(int|long|float|double|size_t|var)\b/g, 'let');
                processed = processed.replace(/\((int|long|float|double)\)/g, '');
                processed = processed.replace(/\.size\(?\)?[^;]*/g, '.length');
                if (!processed.includes('const n =') && processed.includes(' < n')) processed = `const n = arr.length;\n${processed}`;
            }
            return processed;
        };

        try {
            const runnableCode = preprocessCode(code, selectedLang);
            const func = new Function('arr', 'swap', runnableCode);
            func(testArr, swap);

            let isSorted = true;
            for(let k=0; k < testArr.length - 1; k++) {
                if (targetOrder === 'ASC' && testArr[k] > testArr[k+1]) isSorted = false;
                if (targetOrder === 'DESC' && testArr[k] < testArr[k+1]) isSorted = false;
                if (!isSorted) break;
            }

            if (!isSorted) {
                setStatus("FAILED");
                setError(`Algorithm finished, but the array is NOT properly sorted!`);
            } else {
                setStatus("SUCCESS");
            }
            setOperations(ops);
        } catch (err) {
            setStatus("FAILED");
            setError(`${err.message} (Is your syntax correct?)`);
        }
    };

    return (
        <div className="w-screen h-screen bg-[#061014] text-white flex flex-col font-mono overflow-hidden">
            <div className="w-full p-6 pb-2 flex justify-between items-start z-10 shrink-0">
                <div className="flex gap-4">
                    <Link href="/dashboard" className="p-3 bg-black/50 border border-white/10 rounded-xl hover:border-cyan-400 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="p-3 px-6 bg-black/60 backdrop-blur-md border border-cyan-400/30 rounded-xl flex items-center gap-4">
                        <Box className="w-5 h-5 text-cyan-400" />
                        <span className="text-xl font-black tracking-widest uppercase">SORT ARRAY</span>
                    </div>
                </div>
                
                <div className="flex gap-4 items-center">
                    {/* LANGUAGE PICKER - 5 BUTTONS (JS, PYTHON, JAVA, C, CPP) */}
                    <div className="flex gap-1 p-1 bg-black/60 border border-white/10 rounded-xl z-20">
                        {LANGS.map(l => (
                            <button key={l.id} onClick={() => { setSelectedLang(l.id); setCode(getAlgorithms(targetOrder, l.id)[selectedAlgo].code); }}
                                className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                    selectedLang === l.id ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                                }`}>
                                <span className="mr-1.5">{l.icon}</span>{l.label}
                            </button>
                        ))}
                    </div>

                    <button onClick={generateNewArray} className="p-3 px-6 bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/50 rounded-xl flex items-center gap-3 transition-colors text-cyan-400">
                        <RefreshCw className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">New Load</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full relative z-0">
                <div className="absolute inset-0">
                    <ArrayFactoryEngine initialArray={initialArray} operations={operations} resetTrigger={triggerAnimation} />
                </div>
            </div>

            <div className="w-full h-[400px] bg-[#050B14] border-t-2 border-cyan-500/30 relative z-10 shrink-0">
                <div className="flex h-full">
                    <div className="flex-1 flex flex-col p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <Code className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Algorithms Cache</h2>
                                    <p className="text-[10px] text-cyan-500 font-bold uppercase">{selectedLang.toUpperCase()} Mode Active</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <select value={targetOrder} onChange={(e) => { setTargetOrder(e.target.value); setCode(getAlgorithms(e.target.value, selectedLang)[selectedAlgo].code); }}
                                    className="bg-[#091524] text-cyan-400 font-black uppercase text-[10px] px-4 py-3 rounded-xl border border-cyan-900 outline-none">
                                    <option value="ASC">Ascending</option>
                                    <option value="DESC">Descending</option>
                                </select>
                                <select value={selectedAlgo} onChange={(e) => { setSelectedAlgo(e.target.value); setCode(getAlgorithms(targetOrder, selectedLang)[e.target.value].code); }}
                                    className="bg-[#091524] text-cyan-400 font-black uppercase text-[10px] px-6 py-3 rounded-xl border border-cyan-900 outline-none">
                                    {Object.keys(getAlgorithms(targetOrder, selectedLang)).map(k => (
                                        <option key={k} value={k}>{getAlgorithms(targetOrder, selectedLang)[k].name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex-1 rounded-2xl bg-[#03070C] border border-white/5 p-6 shadow-inner ring-1 ring-white/5">
                            <textarea className="w-full h-full bg-transparent text-green-400 font-mono text-sm leading-relaxed outline-none resize-none"
                                spellCheck="false" value={code} onChange={(e) => setCode(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="w-[420px] flex flex-col p-10 bg-[#091524] border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
                        <h3 className="text-xs text-cyan-500 font-black uppercase tracking-widest mb-10 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-sm bg-cyan-400 animate-pulse" /> TERMINAL
                        </h3>
                        <button onClick={handleExecute} disabled={status === "RUNNING"}
                            className="w-full py-6 mb-8 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg tracking-widest uppercase rounded-2xl transition-all">
                            EXECUTE SORT
                        </button>
                        <div className="flex-1 flex flex-col justify-end">
                            {error && (
                                <div className="p-6 bg-red-950/20 border-l-4 border-red-500 rounded-lg">
                                    <p className="text-xs font-black uppercase text-red-500 mb-1">System Error</p>
                                    <p className="text-xs text-red-400">{error}</p>
                                </div>
                            )}
                            {status === "SUCCESS" && !error && (
                                <div className="p-6 bg-green-950/20 border-l-4 border-green-500 rounded-lg flex justify-between items-center">
                                    <span className="font-black text-xs uppercase text-green-500">Operation Successful</span>
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-ping" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
