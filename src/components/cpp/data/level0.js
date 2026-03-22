import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Hammer } from 'lucide-react';
// ─────────────────────────────────────────────
// LEVEL 0 — C++ FOUNDATIONS (12 Sub-topics)
// ─────────────────────────────────────────────
export const L0_FOUNDATION = [
  { id: 1,  title: "HARDWARE",    subtitle: "What is a Computer?",        icon: Cpu,          content: "A computer is a hardware system that runs programs. C++ can directly address memory and CPU registers — it's as close to the metal as you can get without Assembly.", keyPoint: "C++ = Direct hardware control + Object-oriented power." },
  { id: 2,  title: "PROGRAM",     subtitle: "What is a Program?",         icon: Code,         content: "A C++ program is a .cpp file. It's compiled by the compiler (g++) into a native executable. No virtual machine — it runs directly on the CPU.", keyPoint: "C++ executables run directly — no JVM, no interpreter." },
  { id: 3,  title: "CRAFT",       subtitle: "What is Programming?",       icon: Zap,          content: "C++ programming combines two powerful paradigms: C-style procedural programming (functions and pointers) and Object-Oriented Programming (classes and inheritance).", keyPoint: "C++ = C (performance) + OOP (organization)." },
  { id: 4,  title: "HYBRID",      subtitle: "The C++ Language",           icon: Terminal,     content: "C++ was created in 1983 by Bjarne Stroustrup as 'C with Classes'. It's the language behind game engines (Unreal Engine), operating systems, browsers, and embedded systems.", keyPoint: "C++ powers: Unreal Engine, Chrome browser, Adobe Photoshop." },
  { id: 5,  title: "LEVELS",      subtitle: "High vs Low Level",          icon: Layers,       content: "C++ is a middle-level language. It supports high-level abstractions like templates and classes while retaining low-level power like manual memory management.", keyPoint: "C++ gives you both luxury and raw power simultaneously." },
  { id: 6,  title: "RECIPE",      subtitle: "Real-life Instructions",     icon: Shield,       content: "In C++, functions and methods contain ordered instructions. The main() function is the mandatory entry point. Inside, you call other functions to accomplish tasks.", keyPoint: "Objects in C++ have methods = functions tied to data." },
  { id: 7,  title: "INTAKE",      subtitle: "Input Concept",              icon: HelpCircle,   content: "C++ reads input using 'cin'. It's part of the iostream library. cin >> x reads a value into variable x. You must include <iostream> at the top of your file.", keyPoint: "#include <iostream>\\ncin >> x; — reads input." },
  { id: 8,  title: "RESULT",      subtitle: "Output Concept",             icon: CheckCircle2, content: "C++ uses 'cout' for output. cout << \"Hello\" << endl; prints text and moves to the next line. cout is stream-based, so you chain multiple outputs with <<.", keyPoint: "cout << \"Hello C++\" << endl;" },
  { id: 9,  title: "DECISION",    subtitle: "What is Logic?",             icon: Cpu,         content: "C++ uses if/else, switch, and ternary operators for logic. Because it's type-safe, comparing values of different types can produce compiler warnings — a good safety feature.", keyPoint: "C++ logic: if (x > 0) { cout << \"Positive\"; }" },
  { id: 10, title: "PATHWAY",     subtitle: "What is an Algorithm?",      icon: Code,        content: "C++ is the go-to language for algorithm competitions (Competitive Programming) because of its speed. The STL (Standard Template Library) provides ready-made algorithms like sort() and binary_search().", keyPoint: "C++ STL: sort(), min(), max(), binary_search() built-in." },
  { id: 11, title: "FIXER",       subtitle: "What is Debugging?",         icon: Zap,         content: "C++ debugging is challenging — memory leaks, dangling pointers, and undefined behavior are common traps. Tools like Valgrind and GDB help find these issues.", keyPoint: "C++ Debugging: Check memory management first." },
  { id: 12, title: "VALUE",       subtitle: "Why Learn C++?",             icon: Star,        content: "C++ is essential for game development, system programming, embedded systems, and high-performance computing. It's the language of AAA game studios (EA, Activision, Epic Games) and robotics.", keyPoint: "C++ = Max performance + Control. The king of systems programming." }
];

// ─────────────────────────────────────────────
// LEVEL 0 — C++ ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────
export const L0_TESTS = [
  {
    id: 13,
    title: "MCQ ADVENTURE",
    subtitle: "C++ Foundation Quiz",
    icon: MapPin,
    type: 'mcq',
    gameData: [
      { q: "C++ was originally called?",                  options: ["C with Classes","C Plus","C Extra","C Advanced"],                                            a: 0, hint: "Bjarne Stroustrup's original name for it." },
      { q: "C++ output uses?",                            options: ["print()","printf()","cout","System.out"],                                                    a: 2, hint: "Part of the iostream library." },
      { q: "C++ input uses?",                             options: ["scanf()","cin","input()","readline()"],                                                     a: 1, hint: "The stream for input in C++." },
      { q: "What must be included for cin/cout?",         options: ["<stdio.h>","<stdlib.h>","<iostream>","<string>"],                                          a: 2, hint: "The standard input/output library." },
      { q: "C++ game engine?",                            options: ["Unity (C#)","Unreal Engine (C++)","Godot (GDScript)","GameMaker (GML)"],                    a: 1, hint: "Epic Games' professional engine." },
      { q: "What does STL stand for?",                    options: ["Standard Template Library","Simple Type Library","System Tool Layer","String Table List"],  a: 0, hint: "C++ has these built-in algorithms built in." },
      { q: "C++ entry point is?",                         options: ["start()","main()","begin()","init()"],                                                      a: 1, hint: "Same as C." },
      { q: "C++ is which type of language?",              options: ["Purely OOP","Purely Procedural","Multi-paradigm","Scripting"],                              a: 2, hint: "It supports both OOP and procedural." }
    ]
  },
  {
    id: 14,
    title: "MATCH MASTER",
    subtitle: "C++ Concept Sync",
    icon: Layers,
    type: 'match',
    gameData: [
      { concept: "cout",        match: "Standard C++ output stream" },
      { concept: "cin",         match: "Standard C++ input stream" },
      { concept: "main()",      match: "Program entry point" },
      { concept: "STL",         match: "Standard Template Library" },
      { concept: "endl",        match: "Newline + buffer flush" },
      { concept: "Unreal",      match: "C++ based game engine" },
      { concept: "Valgrind",    match: "Memory leak detection tool" },
      { concept: "<iostream>",  match: "Required header for I/O" }
    ]
  },
  {
    id: 15,
    title: "ROBOT COMMANDER",
    subtitle: "Logic Pathfinding",
    icon: Bot,
    type: 'robot',
    gameData: {
      start: { x: 0, y: 0 },
      goal: { x: 3, y: 0 }
    }
  },
  {
    id: 16,
    title: "FACTORY SYSTEM",
    subtitle: "Stream Processing",
    icon: Cpu,
    type: 'factory',
    gameData: {
      target: "Make Banana Shake",
      tasks: ["🍌", "🥛", "🌀", "Serve"]
    }
  },
  {
    id: 17,
    title: "BUG HUNTER",
    subtitle: "Memory Safety Check",
    icon: Hammer,
    type: 'bug',
    gameData: {
      scenario: "Tea is not getting ready",
      lines: ["Add tea powder", "Serve", "Boil water"],
      correctOrder: ["Boil water", "Add tea powder", "Serve"]
    }
  }
];
