import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 6 — C++: "Project & Best Practices" (10 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L6_FOUNDATION = [
  {
    id: 601, title: "STRUCTURE", subtitle: "Project Structure (CMake)",
    icon: Layers,
    content: "C++ separates interfaces from implementations. Header files (.hpp) declare classes and function prototypes. Source files (.cpp) define the actual logic. Modern C++ projects use CMake, a build system generator that manages how hundreds of .cpp files compile into libraries or executables across Mac, Windows, and Linux.",
    keyPoint: "Use .hpp for declarations and .cpp for logic. Use CMake to manage builds cross-platform."
  },
  {
    id: 602, title: "CLEAN_CODE", subtitle: "Clean (Modern) Code",
    icon: CheckCircle2,
    content: "Modern C++ (C++11/14/17/20) is fundamentally different from 'C with Classes'. Clean C++ means preferring std::vector over raw arrays, std::string over char*, and algorithms over raw for-loops. Write code that expresses intent clearly without unnecessary low-level pointer juggling.",
    keyPoint: "Let the STL do the heavy lifting! It's cleaner, safer, and usually faster than manual code."
  },
  {
    id: 603, title: "COMMENTS", subtitle: "Self-Documenting Code",
    icon: Code,
    content: "If you need a paragraph to explain a C++ function, it should probably be broken into smaller functions. Comments should explain WHY logic exists (e.g., 'Workaround for rendering engine bug'). DO NOT comment what the code does: `x++; // increments x` is considered an anti-pattern.",
    keyPoint: "Comments explain WHY. Variable and function names should explain WHAT."
  },
  {
    id: 604, title: "BUGS", subtitle: "RAII & Smart Pointers",
    icon: Shield,
    content: "The #1 cause of C++ crashes is manually managing memory (calling `new` and `delete`). Modern C++ uses RAII (Resource Acquisition Is Initialization). This means wrapping raw pointers in Smart Pointers (std::unique_ptr). When the smart pointer goes out of scope, it automatically deletes its memory, killing Memory Leaks forever.",
    keyPoint: "Stop using 'new' and 'delete' manually! Use std::make_unique to prevent memory leaks."
  },
  {
    id: 605, title: "TESTING", subtitle: "Google Test (gtest)",
    icon: Filter,
    content: "Automated testing guarantees that changing one system doesn't unexpectedly break another. The industry standard C++ testing framework is Google Test (gtest). You write TEST(Math, Addition) { EXPECT_EQ(2 + 2, 4); }. CMake integrates perfectly with gtest.",
    keyPoint: "EXPECT_EQ(calc(), 5); — Automated testing proves your code's correctness over time."
  },
  {
    id: 606, title: "RUBBER_DUCK", subtitle: "Rubber Duck Debugging",
    icon: Bot,
    content: "C++ requires balancing high-level architecture with low-level execution speed. When you hit an incredibly weird compiler template error or a silent logical bug, explain your code line-by-line out loud to a rubber duck. It forces your brain out of 'skimming mode' and into 'parsing mode'.",
    keyPoint: "Talking out loud exposes flawed assumptions that your eyes skimmed over."
  },
  {
    id: 607, title: "GIT_BASICS", subtitle: "Source Control (Git)",
    icon: GitBranch,
    content: "Git tracks historical snapshots (Commits) of your project. Before upgrading the renderer in your game engine, commit the working model. If your upgrade destroys the framerate, you can revert safely! Git is mandatory for software engineers.",
    keyPoint: "Git allows fearless refactoring. Commit before making risky architecture changes."
  },
  {
    id: 608, title: "COLLAB", subtitle: "Collaboration (Pull Requests)",
    icon: Layers,
    content: "You work on 'Branches' in Git. Once your feature is ready, you open a Pull Request (PR) on GitHub. In C++, senior developers review your PR to ensure you aren't passing massive objects by value, creating cyclic dependencies, or introducing undefined behavior.",
    keyPoint: "Code Review catches performance bottlenecks before they reach the main application."
  },
  {
    id: 609, title: "DRY", subtitle: "Don't Repeat Yourself (DRY)",
    icon: Repeat,
    content: "If you copy/paste 50 lines of C++ code, you duplicate any hidden bugs. C++ provides countless tools for DRY: Functions, Object-Oriented Inheritance, and Templates (Generic Programming). Extract repeated logic into reusable, tested components.",
    keyPoint: "Templates and Functions exist to prevent copy/pasting. Duplication is the enemy of maintenance."
  },
  {
    id: 610, title: "KISS", subtitle: "Keep It Simple, Stupid (KISS)",
    icon: Star,
    content: "C++ allows developers to write insanely complex metaprogramming code that runs at compile time. Just because you CAN does not mean you SHOULD. If your team cannot understand your clever code, they cannot fix it when it breaks at 3 A.M. Simple code dominates the industry.",
    keyPoint: "Clever code is a liability. Simple, readable code is a massive asset."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 6 — C++ ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L6_TESTS = [
  {
    id: 611, title: "MCQ ADVENTURE", subtitle: "C++ Best Practices", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does the DRY principle mean?", options: ["Do Random Yields","Don't Repeat Yourself","Data Recovery Yield","Develop Resiliently Yielding"], a: 1, hint: "Avoid code duplication." },
      { q: "What tool manages the build process for modern C++ projects?", options: ["GCC","CMake","Valgrind","GDB"], a: 1, hint: "Cross-platform generator." },
      { q: "What should go in a C++ header (.hpp) file?", options: ["Full function logic","Declarations for Classes and functions","Main function","Compile scripts"], a: 1, hint: "Interfaces, not implementations." },
      { q: "What replaces the dangerous manual 'new' and 'delete' in modern C++?", options: ["Nothing","malloc() and free()","Smart Pointers like std::unique_ptr (RAII)","Garbage Collector"], a: 2, hint: "Automatically deletes memory when it goes out of scope." },
      { q: "What is Google Test (gtest)?", options: ["A web browser","A tool that searches C++ code","The industry standard automated testing framework","A compiler"], a: 2, hint: "EXPECT_EQ" },
      { q: "What is 'Rubber Duck Debugging'?", options: ["A C++ library","Explaining code out loud to find flaws privately","Ignoring a bug","Cleaning old code"], a: 1, hint: "Talk to the duck." },
      { q: "What does KISS stand for?", options: ["Keep It Simple, Stupid","Keep Iterating System Scripts","Know If Systems Start","Keep Implementing Single Scripts"], a: 0, hint: "Simplicity over cleverness." },
      { q: "What is a 'Pull Request' (PR)?", options: ["Downloading a file","A request for peers to review your code before merging into main","Deleting a Git branch","A network command"], a: 1, hint: "Code Review process." },
      { q: "What is RAII in C++?", options: ["Rapid AI Integration","Resource Acquisition Is Initialization (tying resource lifespan to object scope)","Random Access Int Interface","Run And Init Iterators"], a: 1, hint: "Smart Pointers use this!" },
      { q: "Why use Git?", options: ["It compiles C++ code","It tracks historical snapshots and allows reverting mistakes","It runs memory tests","It formats code"], a: 1, hint: "A time machine for your project." }
    ]
  },
  {
    id: 612, title: "MATCH MASTER", subtitle: "C++ Theory Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "CMake",           match: "Build system generator for cross-platform C++" },
      { concept: "DRY",             match: "Don't Repeat Yourself (Extract to functions/templates)" },
      { concept: "KISS",            match: "Keep It Simple, Stupid (Avoid excessive metaprogramming)" },
      { concept: "RAII",            match: "Memory management technique tying lifespan to scope" },
      { concept: "std::unique_ptr", match: "Smart pointer that automatically cleans up memory" },
      { concept: "Header (.hpp)",   match: "Contains class declarations and function prototypes" },
      { concept: "gtest",           match: "Google Test framework for automated validation" },
      { concept: "EXPECT_EQ",       match: "Assert macro used in Google Test" }
    ]
  },
  {
    id: 613, title: "ROBO YES/NO", subtitle: "C++ Practices Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "The DRY principle says you should copy-paste code instead of using functions or templates.", a: false },
      { q: "Good C++ comments should explain WHY a complex algorithm was chosen, rather than just WHAT it does.", a: true },
      { q: "Modern C++ heavily discourages the manual use of raw 'new' and 'delete' for memory management.", a: true },
      { q: "Git allows you to safely revert your C++ project if a refactor breaks the system.", a: true },
      { q: "RAII is the concept that memory or files should be automatically cleaned up when their wrapper object is destroyed.", a: true },
      { q: "Header files (.hpp) should ideally contain thousands of lines of implementation logic.", a: false },
      { q: "The KISS principle encourages writing unreadable, overly clever metaprogramming tricks to show dominance.", a: false },
      { q: "Automated testing with Google Test ensures that your C++ functions output exactly what you expect over time.", a: true },
      { q: "A 'Branch' in Git allows you to build features safely without affecting the main working game engine base.", a: true },
      { q: "A std::unique_ptr will intentionally crash your program if you forget to manually call delete on it.", a: false }
    ]
  },
  {
    id: 614, title: "C++ SORTER", subtitle: "Clean Memory", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["auto", "ptr", "=", "std::make_unique<int>(", "5", ");"], answer: ["auto", "ptr", "=", "std::make_unique<int>(", "5", ");"] },
      { tokens: ["EXPECT_EQ(", "add(2, 2)", ",", "4);"], answer: ["EXPECT_EQ(", "add(2, 2)", ",", "4);"] },
      { tokens: ["#include", "<memory>"], answer: ["#include", "<memory>"] }
    ]
  },
  {
    id: 615, title: "ALGO BUILDER", subtitle: "C++ Workflow", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "C++ Development Flow",
      steps: [
        { id: 1, text: "Declare class interface in (.hpp)", order: 1 },
        { id: 2, text: "Define logic in (.cpp)", order: 2 },
        { id: 3, text: "Configure CMakeLists.txt", order: 3 },
        { id: 4, text: "Write assertions using Google Test", order: 4 },
        { id: 5, text: "Commit working tests into Git", order: 5 }
      ]
    }
  }
];
