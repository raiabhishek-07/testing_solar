import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 5 — C LANGUAGE: "Core Problem Solving" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L5_FOUNDATION = [
  {
    id: 501, title: "ALGO_THINK", subtitle: "Algorithmic Thinking in C",
    icon: Bot,
    content: "Algorithms are step-by-step logic. In C, you don't have magic built-in functions like Python's max() or sum(). You must write the logic yourself! This makes C the perfect language for learning how algorithms truly work at a mechanical level.",
    keyPoint: "C forces you to build algorithms from scratch, making you a stronger programmer."
  },
  {
    id: 502, title: "PSEUDO", subtitle: "Pseudocode",
    icon: Code,
    content: "Pseudocode is sketching the logic in English. For C, this is critical because writing syntax (pointers, memory) before logic leads to spaghetti code. '1. Set temp = a. 2. Set a = b. 3. Set b = temp'. Nail the logic, then translate to C.",
    keyPoint: "Write Pseudocode first. C syntax second."
  },
  {
    id: 503, title: "FLOWCHART", subtitle: "Flowcharts",
    icon: GitBranch,
    content: "Visualizing loops and if-statements. In C, flowcharts help identify memory leaks — 'Does this path exit early without freeing memory?' Ovals=Start/End, Diamonds=Decisions, Rectangles=Actions. Map out edge cases visually.",
    keyPoint: "Flowcharts help predict missing return paths and memory leaks."
  },
  {
    id: 504, title: "BIGO", subtitle: "Big-O Notation",
    icon: Zap,
    content: "Big-O measures worst-case scaling. O(1) is instant. O(N) grows linearly (like a loop). O(N²) grows exponentially (like nested loops). In C, performance is king. You use C specifically to write O(1) or O(N) code that runs in nanoseconds.",
    keyPoint: "Big-O is vocabulary for speed. C programmers care about speed above all."
  },
  {
    id: 505, title: "TIME_COMP", subtitle: "Time Complexity",
    icon: Activity,
    content: "Array access: arr[i] is O(1) — instant math on memory addresses! Searching unsorted array: O(N). Sorting: usually O(N log N). Nested loops over a 10,000-item array: O(N²) = 100 million operations (slow!).",
    keyPoint: "arr[i] is O(1) because C jumps directly to the memory address."
  },
  {
    id: 506, title: "SPACE_COMP", subtitle: "Space Complexity",
    icon: Layers,
    content: "RAM usage. C array of 1,000 ints takes exactly 4,000 bytes. O(1) Space means using no extra memory (like swapping array elements in-place). O(N) Space means making a copy of the array (wastes RAM). C programmers optimize for O(1) Space.",
    keyPoint: "In-place algorithms use O(1) space. Making copies uses O(N) space."
  },
  {
    id: 507, title: "SWAP", subtitle: "Swapping (Pointer Preview)",
    icon: RefreshCw,
    content: "To swap values in main(), a function needs to change original memory. By default, C passes by value (copies). To swap `a` and `b`, you pass their ADDRESSES using `&` (pointers): void swap(int *a, int *b) { int temp = *a; *a = *b; *b = temp; }.",
    keyPoint: "To modify variables inside a function, pass their addresses (pointers)!"
  },
  {
    id: 508, title: "REVERSE", subtitle: "Reversing an Array In-Place",
    icon: Repeat,
    content: "Two-pointer technique. `int left = 0, right = size - 1;`. Loop while `left < right`: swap `arr[left]` and `arr[right]`, then `left++, right--`. Because C arrays decay to pointers, you only need to pass the array and its size to the function.",
    keyPoint: "Two-pointer swap traverses the array from outside-in. O(N) Time, O(1) Space."
  },
  {
    id: 509, title: "MINMAX", subtitle: "Finding Min / Max",
    icon: Shield,
    content: "To find max: `int max = arr[0];` then loop from `i=1` to `size-1`. If `arr[i] > max`, `max = arr[i]`. CRITICAL: Do NOT initialize max to 0! If the array holds only negative numbers (e.g., {-5, -10}), 0 will falsely be reported as max.",
    keyPoint: "Always initialize min/max to the FIRST element of the array."
  },
  {
    id: 510, title: "COUNT", subtitle: "Counting Occurrences",
    icon: Hash,
    content: "How many times does '10' appear? Set `int count = 0`. Loop through array `if (arr[i] == 10) count++;`. O(N) complexity. In C, building counting mechanisms from scratch is fundamental to data processing like reading sensor inputs.",
    keyPoint: "Initialize a counter, loop, increment when the condition is met."
  },
  {
    id: 511, title: "SUM_AVG", subtitle: "Sum and Average",
    icon: ListOrdered,
    content: "Loop to sum: `total += arr[i]`. For average, divide by size. DANGER (Integer Division): If total is 5 and size is 2, `5 / 2` calculates to `2` (decimals lost!). You MUST cast to float: `float avg = (float)total / size;`.",
    keyPoint: "(float)total / size — Cast to float to prevent Integer Division data loss!"
  },
  {
    id: 512, title: "SEARCH", subtitle: "Linear Search",
    icon: Search,
    content: "A for-loop that checks every element: `for(int i=0; i<n; i++) if (arr[i] == target) return i;`. It returns the index if found. If the loop finishes without returning, `return -1;` (standard C idiom for 'not found'). O(N) complexity.",
    keyPoint: "Return -1 is the standard C way to signal 'target not found'."
  },
  {
    id: 513, title: "DEBUG", subtitle: "Debugging Strategies",
    icon: AlertCircle,
    content: "1. Printf Debugging: `printf(\"max is currently: %d\\n\", max);`. 2. Read Compiler Warnings: Fix ALL warnings (implicit declarations, type mismatch). 3. GDB/Valgrind: Tools to catch Segmentation Faults (buffer overflows/bad pointers).",
    keyPoint: "Treat C compiler warnings as errors. They usually point to actual bugs!"
  },
  {
    id: 514, title: "EDGE", subtitle: "Defensive Programming",
    icon: Shield,
    content: "C does not hold your hand. Check inputs! Array function? `if (size <= 0) return 0;`. Passed a pointer string? `if (str == NULL) return;`. 'Guard Clauses' at the top of functions prevent Null Pointer Dereferences and Segfaults.",
    keyPoint: "Trust nobody. Verify sizes > 0 and pointers != NULL before proceeding."
  },
  {
    id: 515, title: "CLEAN", subtitle: "Clean Code Practices",
    icon: CheckCircle2,
    content: "1. One function = ONE task. 2. Self-documenting names (`calculateAvg()`, not `ca()`). 3. Hardcoded Magic Numbers are evil: use `#define MAX 100` instead of typing 100 everywhere. If limits change, you only update it in one place.",
    keyPoint: "#define MAX 100 — Eliminate 'Magic Numbers' from your C code!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 5 — C ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L5_TESTS = [
  {
    id: 516, title: "MCQ ADVENTURE", subtitle: "C Algo & Solving", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does Big-O notation measure?", options: ["Disk space used","Pointer addresses","How algorithms scale with more data","Memory leaks"], a: 2, hint: "Growth rate of execution time." },
      { q: "To swap two variables inside a C function so the caller sees the change, you must pass by:", options: ["Value","Name","Reference (Pointers)","String"], a: 2, hint: "Pass the memory address." },
      { q: "Time complexity of nested (loop inside loop) array traversal?", options: ["O(N)","O(1)","O(N²)","O(logN)"], a: 2, hint: "For every N, do N operations." },
      { q: "Why is initializing 'int max = 0;' dangerous when finding an array maximum?", options: ["0 is an invalid int","If the array only has negative numbers, 0 is falsely returned as max","It causes a float error","A negative cannot be max"], a: 1, hint: "What if the numbers are -5, -10, -3?" },
      { q: "What evaluates to 2.5 in C?", options: ["5 / 2","(float)5 / 2","int(5/2)","None"], a: 1, hint: "Integer division throws away decimals. Need a float cast." },
      { q: "Standard return value for a C Linear Search if target is NOT found?", options: ["0","NULL","Error","-1"], a: 3, hint: "Because 0 is a valid array index!" },
      { q: "What is an Edge Case (Defensive Programming)?", options: ["A GUI border","An unexpected input like a NULL pointer or empty array","The optimal path","A recursive loop"], a: 1, hint: "Protect your function from bad inputs." },
      { q: "Array access like arr[5] is what Time Complexity?", options: ["O(N)","O(N²)","O(1)","O(logN)"], a: 2, hint: "Instant math on physical memory." },
      { q: "What does #define MAX 100 prevent?", options: ["Compiler errors","Memory leaks","'Magic Numbers' scattered everywhere (hard to maintain)","Buffer overflows automatically"], a: 2, hint: "Variables for constants." },
      { q: "Pseudocode is...", options: ["A C99 feature","Writing logic in plain English before coding","Machine readable code","Linux binary"], a: 1, hint: "English blueprint." }
    ]
  },
  {
    id: 517, title: "MATCH MASTER", subtitle: "C Algo Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "Pointers (int *a)",match: "Required to swap variables inside a C function" },
      { concept: "O(1) Access",      match: "Array indexing speed (instant memory math)" },
      { concept: "O(N²)",            match: "Time complexity of nested loops" },
      { concept: "return -1",        match: "Standard signal that a value was not found" },
      { concept: "Guard Clause",     match: "if (ptr == NULL) return; — early protection" },
      { concept: "Integer Division", match: "5/2 resulting in 2 (must cast to float!)" },
      { concept: "Magic Numbers",    match: "Hardcoded values (Fix with #define)" },
      { concept: "Two-pointer",      match: "Technique used to reverse an array in O(1) space" }
    ]
  },
  {
    id: 518, title: "ROBO YES/NO", subtitle: "C Algo Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "A C function can correctly swap caller variables without using pointers.", a: false },
      { q: "To calculate an accurate decimal average in C, you must cast an operand to float.", a: true },
      { q: "O(1) means the execution time scales linearly with the array size.", a: false },
      { q: "When finding the maximum value in an array, initialize max to arr[0].", a: true },
      { q: "Linear Search requires the array to be sorted first.", a: false },
      { q: "A Guard Clause testing if (size <= 0) prevents out of bounds loops.", a: true },
      { q: "Nested for-loops over an array of size N will execute N*2 times.", a: false },
      { q: "Reversing an array using two pointers modifying elements in-place takes O(1) space.", a: true },
      { q: "Returning -1 is the standard idiom in C to say an index was not found.", a: true },
      { q: "C compiler warnings should be ignored if the code still runs.", a: false }
    ]
  },
  {
    id: 519, title: "ALGO BUILDER", subtitle: "Defensive Function", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Defensive Linear Search",
      steps: [
        { id: 1, text: "int search(int arr[], int size, int target) {", order: 1 },
        { id: 2, text: "    if (size <= 0) return -1; // Guard Clause", order: 2 },
        { id: 3, text: "    for (int i = 0; i < size; i++) {", order: 3 },
        { id: 4, text: "        if (arr[i] == target) return i;", order: 4 },
        { id: 5, text: "    } return -1; }" , order: 5 }
      ]
    }
  },
  {
    id: 520, title: "C SORTER", subtitle: "MinMax Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["void", "swap(", "int", "*a,", "int", "*b)"], answer: ["void", "swap(", "int", "*a,", "int", "*b)"] },
      { tokens: ["int", "max", "=", "arr[0];"], answer: ["int", "max", "=", "arr[0];"] },
      { tokens: ["float", "avg", "=", "(float)sum", "/", "size;"], answer: ["float", "avg", "=", "(float)sum", "/", "size;"] }
    ]
  }
];
