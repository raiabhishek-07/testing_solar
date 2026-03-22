import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Hammer } from 'lucide-react';
// ─────────────────────────────────────────────
// LEVEL 0 — C LANGUAGE FOUNDATIONS (12 Topics)
// ─────────────────────────────────────────────
export const L0_FOUNDATION = [
  { id: 1,  title: "CORE",        subtitle: "What is a Computer?",        icon: Cpu,          content: "A computer processes data using the CPU, memory (RAM), and storage. C is one of the few languages that directly controls these hardware resources.", keyPoint: "C = Direct hardware control language." },
  { id: 2,  title: "PROGRAM",     subtitle: "What is a Program?",         icon: Code,         content: "A C program is a text file with a .c extension containing instructions. The compiler translates it directly into machine code (binary) that the CPU executes.", keyPoint: "C programs compile directly to machine code." },
  { id: 3,  title: "CRAFT",       subtitle: "What is Programming?",       icon: Zap,          content: "Programming in C means writing low-level instructions that closely mirror what the hardware actually does. You control memory, pointers, and the CPU directly.", keyPoint: "C Programming = Getting close to the machine." },
  { id: 4,  title: "MOTHER",      subtitle: "The C Language",             icon: Terminal,     content: "C was created in 1972 and is the mother of most modern languages. Python, Java, JavaScript are all built with C under the hood. Learning C teaches you how computers truly work.", keyPoint: "C powers: Linux kernel, Windows kernel, Python itself." },
  { id: 5,  title: "LEVELS",      subtitle: "High vs Low Level",          icon: Layers,       content: "C is often called a 'middle-level' language. It has high-level constructs (functions, loops) but also low-level access (pointers, memory). This makes it uniquely powerful.", keyPoint: "C = Best of both high and low-level worlds." },
  { id: 6,  title: "RECIPE",      subtitle: "Real-life Instructions",     icon: Shield,       content: "In C, a function is a set of instructions with a name. The main() function is mandatory — it's where every C program begins its execution.", keyPoint: "main() is the mandatory starting function in C." },
  { id: 7,  title: "INTAKE",      subtitle: "Input Concept",              icon: HelpCircle,   content: "C reads user input using scanf(). It requires a format specifier (%d for int, %s for string, %f for float) and the address of the variable using the & operator.", keyPoint: "scanf(\"%d\", &x); — reads an integer into variable x." },
  { id: 8,  title: "RESULT",      subtitle: "Output Concept",             icon: CheckCircle2, content: "C outputs using printf(). It also uses format specifiers. printf(\"Hello %s\", name) substitutes the variable into the string. The \\n character creates a new line.", keyPoint: "printf(\"Value: %d\\n\", x); — displays x on screen." },
  { id: 9,  title: "DECISION",    subtitle: "What is Logic?",             icon: Cpu,         content: "C uses if/else and switch statements for decisions. Because C is close to the hardware, logic translates to actual CPU branch instructions.", keyPoint: "if (x > 0) { printf(\"Positive\"); }" },
  { id: 10, title: "PATHWAY",     subtitle: "What is an Algorithm?",      icon: Code,        content: "C executes algorithms one instruction at a time from the main() function. Algorithms in C often use pointers for complex operations, which is very efficient.", keyPoint: "C algorithms fully control processor and memory." },
  { id: 11, title: "FIXER",       subtitle: "What is Debugging?",         icon: Zap,         content: "C errors are often 'Segmentation Faults' (accessing memory you shouldn't) or 'Undefined Behavior'. Tools like GDB (GNU Debugger) help locate these issues.", keyPoint: "C Debugging: Most errors are memory-related." },
  { id: 12, title: "VALUE",       subtitle: "Why Learn C?",               icon: Star,        content: "C is the foundation of computing. The Linux kernel, Windows NT, and Python itself are written in C. It teaches you to think about performance, memory, and efficiency.", keyPoint: "C knowledge makes every other language easier to learn." }
];

// ─────────────────────────────────────────────
// LEVEL 0 — C ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────
export const L0_TESTS = [
  {
    id: 13,
    title: "MCQ ADVENTURE",
    subtitle: "C Foundation Quiz",
    icon: MapPin,
    type: 'mcq',
    gameData: [
      { q: "The starting function in every C program is?",  options: ["start()","begin()","main()","run()"],                                                       a: 2, hint: "Every C program must have this function." },
      { q: "C programs compile directly to?",              options: ["Bytecode","Machine Code","Python","Java"],                                                   a: 1, hint: "No virtual machine needed." },
      { q: "C output function is?",                        options: ["print()","System.out.println()","printf()","echo()"],                                       a: 2, hint: "printf stands for 'print formatted'." },
      { q: "C input function is?",                         options: ["scanf()","input()","read()","get()"],                                                       a: 0, hint: "Reads formatted input from keyboard." },
      { q: "Which created C language?",                    options: ["Linus Torvalds","Dennis Ritchie","James Gosling","Guido van Rossum"],                       a: 1, hint: "He also co-created Unix." },
      { q: "What year was C created?",                     options: ["1960","1985","1972","2000"],                                                                a: 2, hint: "At Bell Labs." },
      { q: "C is often called a ___ level language.",      options: ["High","Low","Middle","Assembly"],                                                           a: 2, hint: "It connects hardware and high-level logic." },
      { q: "Format specifier for integer in C?",           options: ["%s","%d","%f","%c"],                                                                       a: 1, hint: "d stands for decimal integer." }
    ]
  },
  {
    id: 14,
    title: "MATCH MASTER",
    subtitle: "C Concept Sync",
    icon: Layers,
    type: 'match',
    gameData: [
      { concept: "printf()",    match: "Displays formatted output" },
      { concept: "scanf()",     match: "Reads formatted user input" },
      { concept: "main()",      match: "Program entry point" },
      { concept: "Pointer",     match: "Variable storing memory address" },
      { concept: "%d",          match: "Integer format specifier" },
      { concept: "Seg Fault",   match: "Invalid memory access error" },
      { concept: "GDB",         match: "GNU Debugger tool" },
      { concept: "malloc()",    match: "Allocates memory dynamically" }
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
    subtitle: "Instruction Flow",
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
    subtitle: "Memory Safety Scan",
    icon: Hammer,
    type: 'bug',
    gameData: {
      scenario: "Tea is not getting ready",
      lines: ["Add tea powder", "Serve", "Boil water"],
      correctOrder: ["Boil water", "Add tea powder", "Serve"]
    }
  }
];
