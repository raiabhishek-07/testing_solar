"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft as AL, Bug as B, Heart as H, Terminal as T, AlertTriangle as AT, ShieldCheck as SC, Cpu as C } from 'lucide-react';
import Editor from '@monaco-editor/react';

const BugHunterEngine = dynamic(
    () => import('@/components/games/bug-platformer/BugHunterEngine'), 
    { ssr: false, loading: () => <div className="absolute inset-0 bg-[#020617] flex items-center justify-center font-mono text-cyan-500">BOOTING MAINFRAME...</div> }
);

const LANGS = [
    { id: 'javascript', label: 'JS',     icon: '🟨', monacoLang: 'javascript' },
    { id: 'python',     label: 'Python', icon: '🐍', monacoLang: 'python' },
    { id: 'java',       label: 'Java',   icon: '☕', monacoLang: 'java' },
    { id: 'c',          label: 'C',      icon: '⚙️', monacoLang: 'c' },
    { id: 'cpp',        label: 'C++',    icon: '🔧', monacoLang: 'cpp' },
];

const BUG_PUZZLES = {
    bug_1: {
        errorType: { javascript: "ReferenceError", python: "NameError", java: "Compiler Error", c: "Compiler Error", cpp: "Compiler Error" },
        errorMessage: { 
            javascript: "x is not defined", 
            python: "name 'x' is not defined", 
            java: "cannot find symbol 'x'", 
            c: "error: 'x' undeclared", 
            cpp: "error: 'x' was not declared in this scope" 
        },
        snippets: {
            javascript: `function getCoordinates() {\n    let y = 20;\n    \n    return { x: x, y: y };\n}`,
            python: `def get_coordinates():\n    y = 20\n    \n    return {"x": x, "y": y}`,
            java: `public class Game {\n    public int check() {\n        int y = 20;\n        return x + y;\n    }\n}`,
            c: `int check() {\n    int y = 20;\n    return x + y;\n}`,
            cpp: `int check() {\n    int y = 20;\n    return x + y;\n}`
        },
        tactic: "This variable was used before being declared. Declare the missing variable (e.g. 'x = 10' or 'int x = 10') before it is used!",
        correctFix: { javascript: "let x = 10;", python: "x = 10", java: "int x = 10;", c: "int x = 10;", cpp: "int x = 10;" },
        validate: (code, lang) => {
            const normalized = code.replace(/\s/g, '');
            if (lang === 'javascript') {
                return normalized.includes('letx=') || normalized.includes('constx=') || normalized.includes('varx=');
            }
            return normalized.includes('x=') || normalized.includes('intx=');
        }
    },
    bug_2: {
        errorType: { javascript: "SyntaxError", python: "IndentationError", java: "Syntax Error", c: "Syntax Error", cpp: "Syntax Error" },
        errorMessage: { 
            javascript: "Unexpected token 'else'", 
            python: "expected an indented block", 
            java: "'else' without 'if'", 
            c: "else without a previous if", 
            cpp: "else without a previous if" 
        },
        snippets: {
            javascript: `function checkAge(age) {\n    if (age >= 18)\n        return "Adult";\n        console.log("Checking!");\n    else {\n        return "Minor";\n    }\n}`,
            python: `def check_age(age):\nif age >= 18:\nreturn "Adult"\nelse:\nreturn "Minor"`,
            java: `if (age >= 18)\n    return "Adult";\n    System.out.println("Wait!");\nelse {\n    return "Minor";\n}`,
            c: `if (age >= 18)\n    return "Adult";\n    printf("Wait!");\nelse {\n    return "Minor";\n}`,
            cpp: `if (age >= 18)\n    return "Adult";\n    std::cout << "Wait!";\nelse {\n    return "Minor";\n}`
        },
        tactic: "Check the block structure. Multiple lines inside an 'if' condition require braces { } in most languages, or correct indentation in Python!",
        correctFix: { javascript: "Add { } around the if block", python: "Fix indentation", java: "Add { } around the if block", c: "Add { } around the if block", cpp: "Add { } around the if block" },
        validate: (code, lang) => {
            if (lang === 'python') return code.startsWith('    ') || code.includes('\n    ');
            return code.includes('{') || code.includes(':');
        }
    },
    bug_3: {
        errorType: "TypeError",
        errorMessage: "Object property is not a function",
        snippets: {
            javascript: `const user = {\n    name: "Alex",\n    age: 25\n};\n\nfunction greetUser() {\n    return "Hello, " + user.getName();\n}`,
            python: `user = {\n    "name": "Alex",\n    "age": 25\n}\n\ndef greet_user():\n    return "Hello, " + user.get_name()`,
            java: `class User {\n    String name = "Alex";\n}\n\n// user.getName() is missing implementation!`,
            c: `struct User {\n    char* name;\n};\n\n// user.getName() doesn't exist in C structs!`,
            cpp: `class User {\npublic:\n    string name = "Alex";\n};\n\n// user.getName() is missing!`
        },
        tactic: "Define the missing getName() method inside the object or class to resolve the property access error!",
        correctFix: "Implement the missing getName() method.",
        validate: (code) => code.toLowerCase().includes('getname') || code.toLowerCase().includes('get_name')
    },
    bug_4: {
        errorType: "TypeError",
        errorMessage: "Assignment to constant variable",
        snippets: {
            javascript: `function inc() {\n    const score = 100;\n    score += 50;\n    return score;\n}`,
            python: `def inc():\n    SCORE = 100\n    SCORE += 50`,
            java: `public int inc() {\n    final int score = 100;\n    score += 50;\n    return score;\n}`,
            c: `int inc() {\n    const int score = 100;\n    score += 50;\n    return score;\n}`,
            cpp: `int inc() {\n    const int score = 100;\n    score += 50;\n    return score;\n}`
        },
        tactic: "You cannot mutate a variable marked as a constant (const or final). Use let or a mutable type!",
        correctFix: "Remove 'const' or 'final' to allow changes.",
        validate: (code) => !code.includes('const') && !code.includes('final') && code.toLowerCase().includes('score')
    },
    bug_5: {
        errorType: "IndexOutOfBounds",
        errorMessage: "Array index out of range",
        snippets: {
            javascript: `function process(arr) {\n    for (let i = 0; i <= arr.length; i++) {\n        arr[i] = arr[i] + 1;\n    }\n}`,
            python: `for i in range(len(arr) + 1):\n    print(arr[i])`,
            java: `for (int i = 0; i <= arr.length; i++) {\n    arr[i]++;\n}`,
            c: `for (int i = 0; i <= n; i++) {\n    arr[i]++;\n}`,
            cpp: `for (int i = 0; i <= arr.size(); i++) {\n    arr[i]++;\n}`
        },
        tactic: "The loop iterates one step beyond the array's boundary. Fix the condition (e.g. use < instead of <=)!",
        correctFix: "Change <= to < in the loop condition.",
        validate: (code) => !code.includes('<=') && (code.includes('<') || code.includes('range(len(arr))'))
    },
    bug_6: {
        errorType: "Logic Error",
        errorMessage: "Missing return value",
        snippets: {
            javascript: `const sum = (a, b) => {\n    a + b;\n};`,
            python: `def sum(a, b):\n    a + b`,
            java: `public int sum(int a, int b) {\n    a + b;\n}`,
            c: `int sum(int a, int b) {\n    a + b;\n}`,
            cpp: `int sum(int a, int b) {\n    a + b;\n}`
        },
        tactic: "The function calculates a result but forgot to return it to the caller!",
        correctFix: "Add the 'return' keyword before the calculation.",
        validate: (code) => code.toLowerCase().includes('return')
    },
    bug_7: {
        errorType: "NullPointerException",
        errorMessage: "Cannot access property of null/undefined",
        snippets: {
            javascript: `function get(obj) {\n    return obj.data.id;\n}\n// obj might be null!`,
            python: `def get(obj):\n    return obj['data']['id']\n# obj might be None!`,
            java: `public String get(User u) {\n    return u.data.id;\n}`,
            c: `char* get(User* u) {\n    return u->data->id;\n}`,
            cpp: `string get(User* u) {\n    return u->data->id;\n}`
        },
        tactic: "Always check if an object exists (!= null) before accessing its nested properties!",
        correctFix: "Add a null check: if (obj != null) or similar.",
        validate: (code) => code.includes('if') && (code.includes('!=') || code.includes('not None') || code.includes('|| {}'))
    },
    bug_8: {
        errorType: "Scope Error",
        errorMessage: "Variable used before definition",
        snippets: {
            javascript: `function test() {\n    total = 0;\n    return total;\n}`,
            python: `def test():\n    total = total + 1\n    return total`,
            java: `int test() {\n    total = 10;\n    return total;\n}`,
            c: `int test() {\n    total = 10;\n    return total;\n}`,
            cpp: `int test() {\n    total = 10;\n    return total;\n}`
        },
        tactic: "Declare your variable with a type (e.g. let, int, static) before assigning values!",
        correctFix: "Declare the variable properly.",
        validate: (code) => code.includes('let ') || code.includes('int ') || (code.includes('total') && code.includes('='))
    },
    bug_9: {
        errorType: "Logical Fault",
        errorMessage: "Strict equality check failed",
        snippets: {
            javascript: `if (val === NaN) return false;`,
            python: `if val == float('nan'): return False`,
            java: `if (val == Double.NaN) return false;`,
            c: `if (val == NAN) return false;`,
            cpp: `if (val == NAN) return false;`
        },
        tactic: "NaN is uniquely not equal to itself. Use isNaN() or specialized math checks to detect it!",
        correctFix: "Use isNaN(val) or similar.",
        validate: (code) => code.toLowerCase().includes('isnan')
    },
    bug_10: {
        errorType: "RangeError",
        errorMessage: "Negative array size",
        snippets: {
            javascript: `return new Array(-1);`,
            python: `return [0] * -1`,
            java: `return new int[-1];`,
            c: `return malloc(-1);`,
            cpp: `return new int[-1];`
        },
        tactic: "Memory allocation cannot use a negative size. Ensure the boundary value is always positive!",
        correctFix: "Ensure the size is a positive number.",
        validate: (code) => !code.includes('-1') && (code.match(/\[\s*\d+\s*\]/) || code.match(/\(\s*\d+\s*\)/) || code.includes('size') || code.includes('*') || code.includes('Array'))
    }
};

export default function BugHunterPage() {
    const [selectedLang, setSelectedLang] = useState('javascript');
    const [hp, setHp] = useState(3);
    const [score, setScore] = useState(0);
    const [status, setStatus] = useState("IDLE"); // IDLE, FIGHTING, COMPILING
    const [combatStatus, setCombatStatus] = useState("IDLE"); 
    const [activeBugId, setActiveBugId] = useState(null);
    const [code, setCode] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [resetFlag, setResetFlag] = useState(0);

    const getLocalizedBug = (bugId, lang) => {
        const base = BUG_PUZZLES[bugId];
        if (!base) return null;
        return {
            ...base,
            errorType: typeof base.errorType === 'object' ? (base.errorType[lang] || base.errorType.javascript) : base.errorType,
            errorMessage: typeof base.errorMessage === 'object' ? (base.errorMessage[lang] || base.errorMessage.javascript) : base.errorMessage,
            codeSnippet: base.snippets?.[lang] || base.snippets?.javascript,
            correctFix: typeof base.correctFix === 'object' ? (base.correctFix[lang] || base.correctFix.javascript) : base.correctFix
        };
    };

    const localizedPuzzle = activeBugId ? getLocalizedBug(activeBugId, selectedLang) : null;

    const handleBugEngaged = (bugId) => {
        const localized = getLocalizedBug(bugId, selectedLang);
        if (localized) {
            setActiveBugId(bugId);
            setCode(localized.codeSnippet);
            setStatus("FIGHTING");
            setCombatStatus("IDLE");
            setErrorMsg("");
        }
    };

    const handleCompile = () => {
        setStatus("COMPILING");
        setTimeout(() => {
            const isFixed = BUG_PUZZLES[activeBugId].validate(code, selectedLang);
            if (isFixed) {
                setCombatStatus("DEFEATED");
                setScore(s => s + 100);
                setTimeout(() => { setStatus("IDLE"); setActiveBugId(null); }, 1500);
            } else {
                setCombatStatus("FAILED");
                setHp(h => Math.max(0, h - 1));
                setErrorMsg("Compilation Failed! The Bug rejected your patch.");
                // Removed the auto-close setTimeout here so the user can actually read the answer!
            }
        }, 800);
    };

    return (
        <div className="w-full h-screen flex flex-col bg-[#020617] relative overflow-hidden font-sans text-white">
            <div className="w-full h-20 bg-[#0f172a] border-b-2 border-slate-800 flex justify-between items-center px-8 z-10 shrink-0">
                <Link href="/dashboard" className="p-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                    <AL className="w-5 h-5 text-cyan-400" />
                </Link>

                <div className="flex gap-1 p-1 bg-black/60 border border-slate-700 rounded-xl">
                    {LANGS.map(l => (
                        <button key={l.id} onClick={() => setSelectedLang(l.id)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-1.5 ${
                                selectedLang === l.id ? 'bg-rose-500 text-white' : 'text-white/40 hover:text-white/70'
                            }`}>
                            <span>{l.icon}</span> {l.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-black tracking-widest text-white flex items-center gap-3 uppercase">
                        <B className="w-6 h-6 text-rose-500" /> Bug Hunter
                    </h1>
                </div>

                <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">XP SCORE</span>
                        <span className="font-mono text-cyan-400 font-bold">{score.toString().padStart(4, '0')}</span>
                    </div>
                    <div className="flex gap-1 h-8 items-center bg-slate-900 px-4 rounded-xl border border-slate-800">
                        {[1, 2, 3].map(heart => (
                            <H key={heart} className={`w-5 h-5 ${hp >= heart ? 'text-rose-500 fill-rose-500' : 'text-slate-700'}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full relative z-0">
                <BugHunterEngine onBugEngaged={handleBugEngaged} combatStatus={combatStatus} resetFlag={resetFlag} />
                {hp <= 0 && (
                    <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-md z-40 flex flex-col items-center justify-center p-8">
                        <AT className="w-24 h-24 text-rose-500 mb-6" />
                        <h2 className="text-6xl font-black text-rose-500 tracking-widest uppercase">SYSTEM CRASH</h2>
                        <button onClick={() => { setHp(3); setScore(0); setResetFlag(r => r + 1); setStatus("IDLE"); setCombatStatus("IDLE"); }} 
                            className="mt-10 px-8 py-4 bg-rose-600 text-white font-black uppercase rounded-xl">
                            <C className="w-5 h-5 inline-block mr-2" /> Reboot Mainframe
                        </button>
                    </div>
                )}
            </div>

            <div className={`absolute bottom-0 left-0 w-full bg-[#061022] border-t-2 border-slate-800 transition-all duration-500 z-50 flex flex-col ${status === 'FIGHTING' || status === 'COMPILING' ? 'h-[60vh] opacity-100' : 'h-0 opacity-0 translate-y-full'}`}>
                {localizedPuzzle && (
                    <>
                        <div className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-rose-950/50 text-rose-400 border border-rose-900 font-bold text-xs uppercase rounded flex items-center gap-2">
                                    <B className="w-4 h-4" /> Bug Detected
                                </span>
                                <span className="font-mono text-white text-sm">Type: <span className="text-rose-400">{localizedPuzzle.errorType}</span></span>
                            </div>
                            <span className="font-mono text-rose-400 font-black tracking-wider text-sm bg-rose-950 px-4 py-2 rounded-lg border border-rose-900">
                                {localizedPuzzle.errorMessage}
                            </span>
                        </div>

                        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
                            <div className="w-full lg:w-[400px] border-r-2 border-slate-800 p-6 flex flex-col gap-6 overflow-y-auto bg-[#020617]/50">
                                <h3 className="text-xs text-slate-500 font-black tracking-widest uppercase flex items-center gap-2"><AT className="w-4 h-4" /> Trace Diagnostics</h3>
                                <div className="p-4 rounded-lg bg-rose-950/20 border-l-2 border-rose-500 text-sm text-rose-200 leading-relaxed font-mono">
                                    Logic failure in <strong className="text-rose-400">{localizedPuzzle.errorType}</strong> sector. Apply patch in {selectedLang.toUpperCase()}.
                                </div>
                                <h3 className="text-xs text-emerald-500 font-black tracking-widest uppercase flex items-center gap-2"><SC className="w-4 h-4" /> Debugging Tactic</h3>
                                <div className="p-4 rounded-lg bg-emerald-950/20 border-l-2 border-emerald-500 text-sm text-emerald-200 leading-relaxed">
                                    {localizedPuzzle.tactic}
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col bg-[#0a1120]">
                                <div className="flex-1 p-4 relative">
                                    <Editor height="100%" language={LANGS.find(l => l.id === selectedLang)?.monacoLang || 'javascript'} theme="vs-dark" value={code} onChange={(v) => setCode(v || "")} />
                                    {status === "COMPILING" && (
                                        <div className="absolute inset-0 bg-slate-900/80 z-10 flex flex-col items-center justify-center font-bold text-cyan-400 uppercase">
                                            <C className="w-12 h-12 mb-4 animate-spin" /> Compiling {selectedLang.toUpperCase()} Patch...
                                        </div>
                                    )}
                                    {combatStatus === "DEFEATED" && (
                                        <div className="absolute inset-0 bg-emerald-900/90 z-20 flex flex-col items-center justify-center border-4 border-emerald-500">
                                            <SC className="w-16 h-16 text-emerald-400 mb-2 scale-150" />
                                            <span className="font-black text-2xl text-emerald-400 uppercase">BUG SQUASHED</span>
                                        </div>
                                    )}
                                    {combatStatus === "FAILED" && (
                                        <div className="absolute inset-0 bg-rose-950/90 z-20 flex flex-col items-center justify-center border-4 border-rose-500 p-8 text-center">
                                            <AT className="w-16 h-16 text-rose-500 mb-2" />
                                            <span className="font-black text-xl text-rose-500 mb-2 uppercase tracking-widest">PATCH REJECTED</span>
                                            <div className="bg-[#020617] p-4 rounded-lg font-mono text-xs border border-rose-800 mb-4 shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                                                <span className="text-rose-500 font-bold uppercase underline">Expected Fix:</span><br/>
                                                <span className="text-cyan-400 mt-2 block text-sm">{localizedPuzzle.correctFix}</span>
                                            </div>
                                            <button 
                                                onClick={() => { setStatus("IDLE"); setActiveBugId(null); }}
                                                className="px-8 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-sm rounded-lg shadow-md transition-transform active:scale-95"
                                            >
                                                Acknowledge & Retreat
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="h-16 shrink-0 bg-[#0f172a] border-t border-slate-800 flex items-center justify-between px-6">
                                    <div className="text-xs font-mono text-rose-400">{errorMsg}</div>
                                    <button onClick={handleCompile} disabled={status !== "FIGHTING"}
                                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black uppercase text-sm rounded flex items-center gap-2">
                                        <T className="w-4 h-4" /> DEPLOY PATCH
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
