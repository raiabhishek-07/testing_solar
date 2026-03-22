import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 6 — C LANGUAGE: "Project & Best Practices" (10 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L6_FOUNDATION = [
  {
    id: 601, title: "STRUCTURE", subtitle: "Project Structure",
    icon: Layers,
    content: "Professional C projects separate logic into independent files. Header files (.h) contain function prototypes, macros, and struct definitions. Source files (.c) contain the actual code. To build the project, you use a Makefile to compile each .c file into an object file (.o), then link them together into an executable.",
    keyPoint: "Use .h files for declarations (prototypes) and .c files for definitions (logic). Build with Makefiles."
  },
  {
    id: 602, title: "CLEAN_CODE", subtitle: "Clean, Safe Code",
    icon: CheckCircle2,
    content: "C is powerful but dangerous. Clean code means defensive programming. Always initialize variables (int x = 0;). Use exact-width integer types (#include <stdint.h> -> uint32_t instead of int) when cross-platform size matters. Never use 'Magic Numbers'—always use #define or enums.",
    keyPoint: "Initialize everything. Use #define for constants. Trust no pointers unconditionally."
  },
  {
    id: 603, title: "COMMENTS", subtitle: "Comments vs Clutter",
    icon: Code,
    content: "In C, tricky bit-manipulation and pointer arithmetic are common. Comments MUST explain WHY the code exists and the algorithmic intent. 'Shifting left by 3' is a terrible comment. 'Multiply by 8 using bitshift for performance' is a great comment.",
    keyPoint: "C code can look cryptic. Comments must translate 'HOW the syntax works' into 'WHY the logic exists'."
  },
  {
    id: 604, title: "BUGS", subtitle: "Segfaults & Memory Leaks",
    icon: AlertCircle,
    content: "A Segmentation Fault means your C code tried to access memory it doesn't own (like dereferencing a NULL pointer). A Memory Leak means you allocated memory (malloc) but forgot to free it (free), causing RAM usage to grow continuously until the system crashes.",
    keyPoint: "Segfaults crash immediately. Memory leaks crash your program days later."
  },
  {
    id: 605, title: "TESTING", subtitle: "Valgrind & Assert",
    icon: Shield,
    content: "To test C code logic, use #include <assert.h> and write assert(add(2,3) == 5);. If false, the program aborts instantly, proving the bug. To test for memory leaks and invalid pointer reads, run your compiled program through Valgrind (a memory debugging tool).",
    keyPoint: "Use assert() for logic checks. Use Valgrind to catch invisible memory leaks."
  },
  {
    id: 606, title: "RUBBER_DUCK", subtitle: "Rubber Duck Debugging",
    icon: Bot,
    content: "C forces you to think like a computer. When staring at a broken algorithm, explain pointer movements and loop conditions out loud to a rubber duck. Speaking forces your brain to translate complex mechanics into logical concepts, exposing the flaw.",
    keyPoint: "Talking out loud bridges the gap between mechanical C syntax and logical intent."
  },
  {
    id: 607, title: "GIT_BASICS", subtitle: "Source Control (Git)",
    icon: GitBranch,
    content: "Git takes historical snapshots of your project. Before attempting a massive C refactor or adding a new feature, commit your working code! If your new changes cause a Segfault, you can easily revert to the previous working commit.",
    keyPoint: "Git allows fearless refactoring. Commit before making risky changes."
  },
  {
    id: 608, title: "COLLAB", subtitle: "Collaboration (Review)",
    icon: Layers,
    content: "When working in a team on GitHub, you create a Pull Request (PR). Because C code can introduce severe security vulnerabilities (buffer overflows), thorough Code Reviews by senior engineers on PRs are mandatory before merging code into the main project.",
    keyPoint: "Code Review protects systems from crippling security vulnerabilities."
  },
  {
    id: 609, title: "DRY", subtitle: "Don't Repeat Yourself (DRY)",
    icon: Repeat,
    content: "If you copy and paste 20 lines of pointer manipulation, you are copying bugs. Extract that code into a helper function in a .c file, put its prototype in a .h file, and reuse it everywhere. Modular code is easier to maintain and test.",
    keyPoint: "Functions exist to prevent repeated code. If you copy/paste, you failed DRY."
  },
  {
    id: 610, title: "KISS", subtitle: "Keep It Simple, Stupid (KISS)",
    icon: Star,
    content: "C allows incredibly cryptic one-liners using macros and pointer arithmetic (*p++ = *q++). Just because you CAN write it doesn't mean you SHOULD. Such code is impossible for junior developers to read and hard to debug. Write clear, explicit, step-by-step logic.",
    keyPoint: "Boring, readable C code is vastly superior to 'clever' one-liners."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 6 — C ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L6_TESTS = [
  {
    id: 611, title: "MCQ ADVENTURE", subtitle: "C Best Practices", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does the DRY principle mean?", options: ["Do Random Yields","Don't Repeat Yourself","Data Recovery Yield","Develop Resiliently Yielding"], a: 1, hint: "Avoid code duplication." },
      { q: "What tool helps catch Memory Leaks in C?", options: ["GCC","Make","Valgrind","GDB"], a: 2, hint: "A memory debugger." },
      { q: "What should go in a C header (.h) file?", options: ["Full function logic","Function prototypes and macros","Main function","Loops"], a: 1, hint: "Declarations only." },
      { q: "What happens when assert(1 == 0) runs?", options: ["Nothing","Program prints a warning","Program instantly aborts (crashes to prove logic failure)","Returns 0"], a: 2, hint: "Asserts prove logic conditions." },
      { q: "What causes a Segmentation Fault?", options: ["Missing semicolon","Dividing by float","Accessing memory you do not own (like a NULL pointer)","Infinite loop"], a: 2, hint: "Memory protection error." },
      { q: "What is 'Rubber Duck Debugging'?", options: ["A C library","Explaining code out loud to find flaws privately","Ignoring a bug","Cleaning old code"], a: 1, hint: "Talk to the duck." },
      { q: "What does KISS stand for?", options: ["Keep It Simple, Stupid","Keep Iterating System Scripts","Know If Systems Start","Keep Implementing Single Scripts"], a: 0, hint: "Simplicity over cleverness." },
      { q: "What is a 'Pull Request' (PR)?", options: ["Downloading a file","A request for peers to review your code before merging into main","Deleting a Git branch","A network command"], a: 1, hint: "Code Review process." },
      { q: "Instead of 'Magic Numbers' (like 100), you should use:", options: ["#define MAX 100","Variables everywhere","Pointers","Hexadecimal"], a: 0, hint: "Give numbers readable names at compile time." },
      { q: "Why use Git?", options: ["It compiles C code","It tracks historical snapshots and allows reverting mistakes","It runs Valgrind","It formats code"], a: 1, hint: "A time machine for your project." }
    ]
  },
  {
    id: 612, title: "MATCH MASTER", subtitle: "C Theory Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "Valgrind",        match: "Tool that detects memory leaks and bad pointers" },
      { concept: "DRY",             match: "Don't Repeat Yourself (Extract to functions)" },
      { concept: "KISS",            match: "Keep It Simple, Stupid (Avoid clever one-liners)" },
      { concept: "Segfault",        match: "Crashing because of invalid memory access" },
      { concept: "Memory Leak",     match: "Allocating RAM but forgetting to free() it" },
      { concept: "Header (.h)",     match: "Contains function prototypes and macros" },
      { concept: "Makefile",        match: "Build automation tool to compile large projects" },
      { concept: "assert.h",        match: "Used to test logic (aborts program if false)" }
    ]
  },
  {
    id: 613, title: "ROBO YES/NO", subtitle: "C Practices Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "The DRY principle says you should copy-paste code instead of creating new functions.", a: false },
      { q: "Good C comments should explain WHY a complex bitwise operation is needed, not just what it does.", a: true },
      { q: "A Segmentation Fault is a syntax error caught by the compiler.", a: false },
      { q: "Git allows you to revert your C project to a stable state if a new feature causes segfaults.", a: true },
      { q: "Valgrind is a memory debugging tool that helps you locate forgotten free() calls.", a: true },
      { q: "Header files (.h) should contain the complete logic for all functions in the project.", a: false },
      { q: "The KISS principle encourages writing overly clever pointer arithmetic tricks.", a: false },
      { q: "Using #define for Magic Numbers makes code easier to maintain if values change later.", a: true },
      { q: "A 'Branch' in Git allows you to test out ideas without modifying the main codebase.", a: true },
      { q: "assert(x == y) will silently continue execution if x does not equal y.", a: false }
    ]
  },
  {
    id: 614, title: "C SORTER", subtitle: "Defensive Code", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["#define", "MAX_BUFFER", "1024"], answer: ["#define", "MAX_BUFFER", "1024"] },
      { tokens: ["if", "(ptr", "==", "NULL)", "return;"], answer: ["if", "(ptr", "==", "NULL)", "return;"] },
      { tokens: ["assert(", "add(2, 3)", "==", "5", ");"], answer: ["assert(", "add(2, 3)", "==", "5", ");"] }
    ]
  },
  {
    id: 615, title: "ALGO BUILDER", subtitle: "C Workflow", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "C Development Workflow",
      steps: [
        { id: 1, text: "Write prototype in header (.h)", order: 1 },
        { id: 2, text: "Write function logic in source (.c)", order: 2 },
        { id: 3, text: "Compile project using Makefile", order: 3 },
        { id: 4, text: "Run extensive tests with assert()", order: 4 },
        { id: 5, text: "Profile with Valgrind for memory leaks", order: 5 }
      ]
    }
  }
];
