import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 5 — JAVA: "Core Problem Solving" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L5_FOUNDATION = [
  {
    id: 501, title: "ALGO_THINK", subtitle: "Algorithmic Thinking",
    icon: Bot,
    content: "An algorithm is just a step-by-step recipe to solve a problem. It transcends language syntax. In Java, algorithmic thinking means figuring out the logic before you write any class or method structures. The logic remains the same whether it's Java 8 or Java 21.",
    keyPoint: "Algorithms = Logic. Syntax = Implementation."
  },
  {
    id: 502, title: "PSEUDO", subtitle: "Pseudocode",
    icon: Code,
    content: "Pseudocode is writing out your algorithm in plain English before writing Java. 'FOR every number, IF it is even, print it'. It frees you from worrying about semicolons or brackets so you can focus purely on the problem structure.",
    keyPoint: "Sketching logic in plain English saves hours of debugging Java brackets."
  },
  {
    id: 503, title: "FLOWCHART", subtitle: "Flowcharts",
    icon: GitBranch,
    content: "A flowchart visualizes algorithmic paths. Ovals = Start/End. Rectangles = Actions (assignments). Diamonds = Decisions (if statements). Flowcharts help you see Edge Cases — 'Wait, what if the user enters a negative number here?'",
    keyPoint: "Diamonds = 'If' statements. Rectangles = Variable updates."
  },
  {
    id: 504, title: "BIGO", subtitle: "Big-O Notation",
    icon: Zap,
    content: "Big-O tells us how an algorithm's performance degrades as the input data grows. O(1) means constant time (fastest). O(N) means time grows linearly with the input size (e.g., standard for loop). O(N²) means time grows exponentially (e.g., nested for loops).",
    keyPoint: "Big-O measures worst-case scaling behavior, not exact milliseconds."
  },
  {
    id: 505, title: "TIME_COMP", subtitle: "Time Complexity",
    icon: Activity,
    content: "Accessing an array by index arr[5] is O(1) in Java. Searching an unsorted array for a value takes O(N) because you might have to check every slot. Sorting an array usually takes O(N log N). A loop inside a loop over the array takes O(N²). Avoid O(N²) for large data!",
    keyPoint: "Nested loops over the same array = O(N²). Performance nightmare for big data!"
  },
  {
    id: 506, title: "SPACE_COMP", subtitle: "Space Complexity",
    icon: Layers,
    content: "Space Complexity measures RAM consumption. If you need to reverse a 1M-element array, creating a NEW array to hold the reversed values takes O(N) space. Reversing the array in-place (swapping elements) takes O(1) extra space. Mobile apps require tight space limits.",
    keyPoint: "In-place algorithms modify original data to save RAM (O(1) space)."
  },
  {
    id: 507, title: "SWAP", subtitle: "Swapping Variables",
    icon: RefreshCw,
    content: "In Java, swapping two variables REQUIRES a temporary third variable! You cannot do a = b; b = a; (they both end up with the value of b). Correct logic: int temp = a; a = b; b = temp;.",
    keyPoint: "int temp = a; a = b; b = temp; — The only safe way to swap in Java."
  },
  {
    id: 508, title: "REVERSE", subtitle: "Reversing an Array",
    icon: Repeat,
    content: "To reverse an array in Java IN-PLACE, you use the Two-Pointer technique. One pointer at the start (int i=0), one at the end (int j=arr.length-1). Swap arr[i] and arr[j], then move pointers inward (i++, j--) until they meet in the middle.",
    keyPoint: "Two-Pointer Swap: Move from outside inwards to reverse efficiently."
  },
  {
    id: 509, title: "MINMAX", subtitle: "Finding Min / Max",
    icon: Shield,
    content: "Standard algorithm: Start by assuming the first element is the max. int max = arr[0]; Loop through the rest of the array. If the current element is larger than max, update max. Do not initialize max to 0! What if the array only has negative numbers?",
    keyPoint: "Initialize max with the FIRST element, not 0! Ex: int max = arr[0];"
  },
  {
    id: 510, title: "COUNT", subtitle: "Counting Occurrences",
    icon: Hash,
    content: "How many times does '10' appear? Initialize int count = 0;. Loop through the array. If arr[i] == 10, count++. This is a simple O(N) algorithm fundamental to data analysis.",
    keyPoint: "Set a counter variable to 0, loop, increment when condition is met."
  },
  {
    id: 511, title: "SUM_AVG", subtitle: "Sum and Average",
    icon: ListOrdered,
    content: "To average an array, compute the total sum first using a loop: total += arr[i]. Then compute average = (double)total / arr.length. Crucial Java detail: If total and length are both ints, dividing them does Integer Division (truncates decimals). Cast one to double!",
    keyPoint: "Integer Division Bug: 5/2 is 2! Cast to double: (double)5/2 is 2.5."
  },
  {
    id: 512, title: "SEARCH", subtitle: "Linear Search",
    icon: Search,
    content: "Linear Search means checking every element one by one from start to finish. It is O(N) time complexity. It works on unsorted arrays. If you need to search a massive array quickly, you sort it first and use Binary Search O(log N).",
    keyPoint: "Linear Search = Check every item. Slow but simple. O(N) time."
  },
  {
    id: 513, title: "DEBUG", subtitle: "Debugging Strategies",
    icon: AlertCircle,
    content: "1. Read Stack Traces from the TOP DOWN. The first line usually tells you exactly which line of YOUR code crashed. 2. Use System.out.println() to print variables before loops so you know what goes in. 3. Use an IDE Debugger to step through code line by line.",
    keyPoint: "Stack Trace = Road map to your bug. Read it top-down."
  },
  {
    id: 514, title: "EDGE", subtitle: "Handling Edge Cases",
    icon: Shield,
    content: "Algorithms fail on Edge Cases. What if the array passed to your method is empty (arr.length == 0)? Finding the max of an empty array will crash if you use int max = arr[0];. Always validate inputs at the top of your function (Guard Clauses).",
    keyPoint: "Guard Clause: if (arr == null || arr.length == 0) return 0; — Protects against crashes."
  },
  {
    id: 515, title: "CLEAN", subtitle: "Clean Code Practices",
    icon: CheckCircle2,
    content: "Java is famously verbose. Write clean code to compensate. Use meaningful variable names (totalScore instead of ts). Write short methods that do exactly ONE thing. Name your methods as actions (calculateTotal()). Use Standard Java CamelCase naming conventions.",
    keyPoint: "Write code to be read by HUMANS, not just the JVM compiler."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 5 — JAVA ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L5_TESTS = [
  {
    id: 516, title: "MCQ ADVENTURE", subtitle: "Java Problem Solving Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does Big-O notation measure?", options: ["Disk space","How algorithms scale with more data","Java Compilation speed","Array length limits"], a: 1, hint: "It indicates scaling performance." },
      { q: "Time complexity of nested (loop inside loop) array traversal?", options: ["O(N)","O(1)","O(N²)","O(N!)"], a: 2, hint: "For every N, do N operations." },
      { q: "How to swap variables 'a' and 'b' correctly in Java?", options: ["a=b; b=a;","int t=a; a=b; b=t;","swap(a,b);","a.swap(b);"], a: 1, hint: "A temporary variable is strictly required." },
      { q: "Why is initializing 'int max = 0;' dangerous when finding an array maximum?", options: ["0 is not an int","If the array only has negative numbers, 0 is incorrectly returned as max","It causes a compile error","Max must be a double"], a: 1, hint: "What if the numbers are -5, -10, -3?" },
      { q: "What evaluates to 2.5 in Java?", options: ["5 / 2","5.0 / 2","(int)5.0 / 2","Neither"], a: 1, hint: "Integer division throws away decimals. Need a double." },
      { q: "Optimal space complexity for reversing an array?", options: ["O(N) (create new array)","O(1) (swap items in-place)","O(N²)","O(logN)"], a: 1, hint: "In-place requires no extra RAM." },
      { q: "What is an Edge Case?", options: ["The first element of an array","A GUI border","An unexpected/extreme input (e.g. empty array)","The optimal path"], a: 2, hint: "They break naive algorithms." },
      { q: "Linear Search Time Complexity?", options: ["O(1)","O(logN)","O(N)","O(N²)"], a: 2, hint: "Checks every item one by one." },
      { q: "What is a 'Guard Clause'?", options: ["A try-catch block","Checking inputs (e.g. null check) at the top of a method and exiting fast","A security class in Java","A loop condition"], a: 1, hint: "Guards the method from bad input." },
      { q: "Pseudocode is...", options: ["A Java library for AI","Writing logic in plain English before coding","Decompiled class files","Code that doesn't work"], a: 1, hint: "English blueprint." }
    ]
  },
  {
    id: 517, title: "MATCH MASTER", subtitle: "Algo Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "temp variable",    match: "Required to swap two variables in Java" },
      { concept: "O(1) Space",       match: "Modifying variables in-place without new arrays" },
      { concept: "O(N²)",            match: "Time complexity of nested loops" },
      { concept: "Linear Search",    match: "Checking every item from index 0 to end" },
      { concept: "Edge Case",        match: "Testing an empty array or null input" },
      { concept: "Integer Division", match: "5/2 resulting in 2 (losing the decimal)" },
      { concept: "Guard Clause",     match: "Exiting early if input is invalid" },
      { concept: "Two-pointer",      match: "Technique used to reverse an array in-place" }
    ]
  },
  {
    id: 518, title: "ROBO YES/NO", subtitle: "Java Algo Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "In Java, a = b; b = a; correctly swaps the values of the two variables.", a: false },
      { q: "To accurately calculate an average as a decimal, at least one number in the division must be a double.", a: true },
      { q: "An O(1) algorithm's execution time depends heavily on the size of the array.", a: false },
      { q: "When finding the maximum value in an array, initializing max to arr[0] is safer than initializing to 0.", a: true },
      { q: "Linear Search is the most efficient way to search a sorted sequence.", a: false },
      { q: "A Guard Clause placed at the top of a method prevents NullPointerExceptions.", a: true },
      { q: "Pseudocode must contain perfectly placed brackets and semicolons.", a: false },
      { q: "Reversing an array via swapping requires a temporary variable.", a: true },
      { q: "Nested for-loops over an array of size N will execute N*N times.", a: true },
      { q: "Reading a Stack Trace from bottom-to-top is the recommended debugging method.", a: false }
    ]
  },
  {
    id: 519, title: "ALGO BUILDER", subtitle: "Array Reverse", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "In-Place Array Reversal",
      steps: [
        { id: 1, text: "int i = 0;", order: 1 },
        { id: 2, text: "int j = arr.length - 1;", order: 2 },
        { id: 3, text: "while (i < j) {", order: 3 },
        { id: 4, text: "    int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;", order: 4 },
        { id: 5, text: "    i++; j--; }", order: 5 }
      ]
    }
  },
  {
    id: 520, title: "JAVA SORTER", subtitle: "MinMax", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["int", "temp", "=", "a;", "a = b;", "b = temp;"], answer: ["int", "temp", "=", "a;", "a = b;", "b = temp;"] },
      { tokens: ["int", "max", "=", "arr[0];"], answer: ["int", "max", "=", "arr[0];"] },
      { tokens: ["double", "avg", "=", "(double)sum", "/", "len;"], answer: ["double", "avg", "=", "(double)sum", "/", "len;"] }
    ]
  }
];
