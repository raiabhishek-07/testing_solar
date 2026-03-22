import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash, Type } from 'lucide-react'; 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 3 — C LANGUAGE: "Loops & Arrays" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L3_FOUNDATION = [
  {
    id: 301, title: "LOOP", subtitle: "What is a Loop?",
    icon: Repeat,
    content: "A loop repeats an action. C provides 3 loops: 'for' (count-controlled), 'while' (condition-controlled), and 'do-while' (post-test condition). They are the engines of C programs, powering everything from reading files to rendering game frames.",
    keyPoint: "for, while, do-while: The core repetition structures in C."
  },
  {
    id: 302, title: "FOR", subtitle: "The for Loop",
    icon: Repeat,
    content: "Syntax: for (initialization; condition; update) {}. Example: for(int i=0; i<5; i++). Note: Declaring 'int i' inside the for-loop was added in C99. In older C (C89), 'int i' had to be declared at the top of the function!",
    keyPoint: "for(int i=0; i<N; i++) — Standard C loop. (int i inside loop requires C99+)."
  },
  {
    id: 303, title: "WHILE", subtitle: "The while Loop",
    icon: Repeat,
    content: "A while loop checks its condition BEFORE running. while (x > 0) { ... }. If x is 0 to start, the loop never runs. Because C uses ints for booleans, while(1) is the standard way to write an infinite loop in C. You must manually update loop variables inside.",
    keyPoint: "while (1) { ... }  — This is the classic C infinite loop!"
  },
  {
    id: 304, title: "DOWHILE", subtitle: "The do-while Loop",
    icon: AlertCircle,
    content: "The do-while loop runs the body FIRST, then checks the condition. do { ... } while (condition);. Very common in C for reading user input (prompting at least once) or reading data from hardware sensors until a valid reading is found. Don't forget the semicolon at the end!",
    keyPoint: "do { /* runs at least once */ } while (condition);  — don't forget the semicolon!"
  },
  {
    id: 305, title: "CONDITIONS", subtitle: "break & continue",
    icon: Filter,
    content: "'break' exits the innermost loop immediately. 'continue' skips the rest of the loop body and jumps to the update step (in a for loop) or condition check (in while). In complex C code, these are used frequently to handle error conditions cleanly.",
    keyPoint: "break escapes the loop. continue skips the current iteration."
  },
  {
    id: 306, title: "INFINITE", subtitle: "Infinite Loops in C",
    icon: Zap,
    content: "Accidental infinite loops freeze programs. Common C bug: for(int i=0; i<10; i--) (decrements instead of increments). Also: while(x = 10) (assignment instead of ==) — since 10 is non-zero, this is an infinite loop that assigns 10 to x forever!",
    keyPoint: "DANGER: while(x = 1) is an infinite loop because = is assignment, not ==."
  },
  {
    id: 307, title: "NESTED", subtitle: "Nested Loops",
    icon: Layers,
    content: "Loops inside loops. Commonly used in C for 2D arrays (matrices) and image processing (pixels in rows and columns). The inner loop completes all its iterations for every single iteration of the outer loop. Beware of deep nesting making code hard to maintain.",
    keyPoint: "for (int y=0; y<height; y++) { for (int x=0; x<width; x++) { ... } }"
  },
  {
    id: 308, title: "ARRAY", subtitle: "What is an Array in C?",
    icon: ListIcon,
    content: "A C array is a contiguous block of memory holding elements of the same type. int arr[5]; creates space for 5 integers. Unlike Java or Python, a C array is DUMB — it is just raw memory. It doesn't know its own size, and there are NO bounds checks!",
    keyPoint: "C arrays are RAW MEMORY. They don't know their size. No safety nets!"
  },
  {
    id: 309, title: "DECLARE", subtitle: "Array Declaration & Initialization",
    icon: Code,
    content: "Declare: int scores[5]; (contains garbage values!). Initialize: int scores[5] = {10, 20, 30, 40, 50};. Auto-size: int scores[] = {1, 2, 3}; (compiler sees size is 3). Partial init: int scores[5] = {0}; (sets ALL elements to 0).",
    keyPoint: "int arr[5] = {0};  — Easiest way to safely initialize an array to all zeros."
  },
  {
    id: 310, title: "INDEXING", subtitle: "0-Based Indexing in C",
    icon: Hash,
    content: "C arrays are strictly 0-indexed. Array of size 5 has valid indices 0, 1, 2, 3, 4. arr[2] accesses the 3rd element. Under the hood, arr[2] is just pointer arithmetic: *(arr + 2). This is why C is 0-indexed: index is the 'offset' from the start address.",
    keyPoint: "Size N → Valid indices 0 to N-1. Index = memory offset."
  },
  {
    id: 311, title: "SIZE", subtitle: "Finding Array Size in C",
    icon: HelpCircle,
    content: "C arrays don't have a .length property! To find the number of elements, you must use the sizeof operator: int size = sizeof(arr) / sizeof(arr[0]);. This divides the total bytes of the array by the bytes of one element. This ONLY works in the scope where the array was declared!",
    keyPoint: "size = sizeof(arr) / sizeof(arr[0]);  — The C way to find array length."
  },
  {
    id: 312, title: "UPDATE", subtitle: "Access & Update",
    icon: Zap,
    content: "Arrays are fast because C computes exactly where in RAM the data lives. int val = arr[3]; reads. arr[3] = 42; writes. But if you do arr[100] = 5 on a size-5 array, C will happily let you write to that RAM, corrupting it! This is a Buffer Overflow.",
    keyPoint: "Buffer Overflow: Writing past the end of an array. A huge security risk in C!"
  },
  {
    id: 313, title: "STRINGS", subtitle: "Strings are char Arrays",
    icon: Type,
    content: "C has no string type! A string is just an array of chars ending in a null terminator ('\\0'). char name[] = \"Alice\"; is actually a 6-element array: 'A', 'l', 'i', 'c', 'e', '\\0'. If you forget the '\\0', string functions like printf(\"%s\") will read garbage until they crash.",
    keyPoint: "\"Alice\" takes 6 bytes! 5 for the letters, 1 for the '\\0'."
  },
  {
    id: 314, title: "MISTAKES", subtitle: "Common Array Mistakes in C",
    icon: AlertCircle,
    content: "1. Out-of-bounds access (Buffer Overflow) causes crashes or weird bugs (Undefined Behavior). 2. Forgetting to initialize (using garbage values). 3. Passing arrays to functions (they 'decay' into pointers, losing their size information!).",
    keyPoint: "C will NOT stop you from accessing arr[1000]. Undefined Behavior!"
  },
  {
    id: 315, title: "TRACE", subtitle: "Tracing C Loops",
    icon: CheckCircle2,
    content: "Trace: int arr[3]={1,2,3}; for(int i=0; i<=3; i++) arr[i]=0; → BUG! i grows to 3, but valid indices are 0,1,2. arr[3]=0 writes to memory OUTSIDE the array, corrupting whatever variable happens to live next to it in RAM.",
    keyPoint: "for(int i=0; i<=N; i++) is a fatal bug in C! Always use i<N."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 — C ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L3_TESTS = [
  {
    id: 316, title: "MCQ ADVENTURE", subtitle: "C Loops & Arrays Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "How does C know an array's size?", options: ["It has a .length property","It is stored at index 0","It doesn't. C arrays are raw memory.","Null terminator defines array size"], a: 2, hint: "C arrays are dumb blocks of memory." },
      { q: "Classic infinite loop in C?", options: ["for(;;)","while(1)","Both A and B","loop {}"], a: 2, hint: "Both are standard C idioms." },
      { q: "Calculate number of elements in C array arr?", options: ["sizeof(arr)","arr.size()","sizeof(arr)/sizeof(arr[0])","length(arr)"], a: 2, hint: "Total bytes / bytes per element." },
      { q: "What happens if you access arr[10] on a 5-element array?", options: ["Compile Error","Runtime Exception","Undefined Behavior (Buffer Overflow)","Returns 0"], a: 2, hint: "C trusts you blindly." },
      { q: "How to initialize all elements to 0?", options: ["int arr[5] = 0;","int arr[5] = {0};","int arr[5] = {};","Both B and C (in modern C)"], a: 1, hint: "Provide one zero, rest default to zero." },
      { q: "What happens in: while (x = 0)?", options: ["Infinite loop","Never runs","Depends on x","Valid C comparison"], a: 1, hint: "= assigns 0 to x. 0 is false. Loop skips." },
      { q: "A string in C is specifically?", options: ["A struct","A char array ending in '\0'","A dynamic pointer array","A native type"], a: 1, hint: "Null terminator is required." },
      { q: "Declaring 'int i' inside 'for(int i=0...)' requires?", options: ["C89 Standard","C99 Standard or newer","GCC only feature","Illegal in C"], a: 1, hint: "Added in 1999." },
      { q: "What does 'break' do?", options: ["Ends the function","Exits the nearest loop","Skips one iteration","Stops the program"], a: 1, hint: "Breaks out of the loop construct." },
      { q: "Valid indices for int arr[10];?", options: ["1 to 10","0 to 10","0 to 9","Undefined"], a: 2, hint: "0-based." }
    ]
  },
  {
    id: 317, title: "MATCH MASTER", subtitle: "C Type Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "while(1)",         match: "Standard infinite loop in C" },
      { concept: "do-while",         match: "Executes loop body at least once" },
      { concept: "sizeof(arr)/sizeof(arr[0])", match: "Idiom to find array length" },
      { concept: "Buffer Overflow",  match: "Writing past the end of an array" },
      { concept: "int arr[5] = {0};", match: "Initialize all elements to zero" },
      { concept: "char[]",           match: "How strings are stored in C" },
      { concept: "\\0",              match: "Null terminator for strings" },
      { concept: "continue",         match: "Jumps to next iteration of loop" }
    ]
  },
  {
    id: 318, title: "ROBO YES/NO", subtitle: "C Logic Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "C throws an 'Index out of bounds' exception if you access an invalid array index.", a: false },
      { q: "A C array knows its own length.", a: false },
      { q: "while(x = 1) is an infinite loop because 1 is assigned to x and is true.", a: true },
      { q: "int arr[5] = {0}; safely sets all 5 integers to zero.", a: true },
      { q: "The characters \"Hello\" require a 5-element char array to store properly.", a: false },
      { q: "The condition in a do-while loop ends with a semicolon.", a: true },
      { q: "Declaring loop variables inside the for() parentheses is allowed in C99.", a: true },
      { q: "break exits all nested loops simultaneously.", a: false },
      { q: "C arrays can hold mixed data types (an int and a float).", a: false },
      { q: "Buffer overflows are a major security vulnerability purely due to C arrays.", a: true }
    ]
  },
  {
    id: 319, title: "ALGO BUILDER", subtitle: "C Array Init", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Zeroing an Array in C",
      steps: [
        { id: 1, text: "int arr[5];", order: 1 },
        { id: 2, text: "int n = sizeof(arr) / sizeof(arr[0]);", order: 2 },
        { id: 3, text: "for (int i = 0; i < n; i++) {", order: 3 },
        { id: 4, text: "    arr[i] = 0;", order: 4 },
        { id: 5, text: "}", order: 5 }
      ]
    }
  },
  {
    id: 320, title: "C SORTER", subtitle: "C Condition Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["int", "arr[5]", "=", "{0};"], answer: ["int", "arr[5]", "=", "{0};"] },
      { tokens: ["while", "(1)", "{", "break;", "}"], answer: ["while", "(1)", "{", "break;", "}"] },
      { tokens: ["int", "sz", "=", "sizeof(arr)/sizeof(arr[0]);"], answer: ["int", "sz", "=", "sizeof(arr)/sizeof(arr[0]);"] }
    ]
  }
];
