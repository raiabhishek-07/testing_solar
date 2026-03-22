import { Skull, AlertTriangle, ShieldAlert, Crosshair, Terminal, Code, Zap, Layers, MapPin, Bot, ListOrdered } from 'lucide-react';

export const L7_FOUNDATION = [
  {
    id: 701, title: "FINAL BOSS", subtitle: "System Core Compromised",
    icon: Skull,
    content: "WARNING! The central mainframe has been infected. You are the last programmer standing. To purge the infection, you must demonstrate total mastery over variables, loops, conditionals, arrays, pointers, memory allocation, algorithms, and structs. If you fail, the system falls.",
    keyPoint: "No new lessons. Just survival. Good luck, C Developer."
  }
];

export const L7_TESTS = [
  {
    id: 702, title: "BOSS MCQ", subtitle: "The Ultimate Gauntlet", icon: Crosshair, type: 'mcq',
    gameData: [
      { q: "What is the Big-O time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], a: 2, hint: "It halves the search space each time." },
      { q: "Which tool detects memory leaks in C?", options: ["gcc", "gdb", "Valgrind", "Make"], a: 2, hint: "It's an instrumentation framework for memory debugging." },
      { q: "What operator is used to get the memory address of a variable?", options: ["*", "&", "->", "%"], a: 1, hint: "The address-of operator." },
      { q: "How do you allocate memory dynamically in C?", options: ["new int", "malloc()", "alloc()", "create()"], a: 1, hint: "Memory ALLOCation." },
      { q: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Tree", "Graph"], a: 1, hint: "Like a stack of plates." },
      { q: "What does 'void *' represent in C?", options: ["A function pointer", "A generic object", "A generic pointer", "An empty string"], a: 2, hint: "A pointer with no associated data type." },
      { q: "Which sorting algorithm repeatedly swaps adjacent elements?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"], a: 2, hint: "The largest elements 'bubble' up." },
      { q: "What is a segmentation fault?", options: ["A syntax error", "Accessing memory you don't own", "A compiler bug", "A slow loop"], a: 1, hint: "Core dumped!" },
      { q: "Recursive functions must have a...", options: ["For loop", "Base Case", "While loop", "Interface"], a: 1, hint: "So they know when to stop!" },
      { q: "What is passed when an array name is used as an argument to a function in C?", options: ["The size", "A copy of the array", "The base address", "The last element"], a: 2, hint: "It decays to a pointer." }
    ]
  },
  {
    id: 703, title: "BOSS MATCH", subtitle: "Concept Singularity", icon: Layers, type: 'match',
    gameData: [
      { concept: "O(1)",           match: "Constant time complexity" },
      { concept: "O(n)",           match: "Linear time complexity (e.g., simple loop)" },
      { concept: "O(log n)",       match: "Logarithmic time (e.g., binary search)" },
      { concept: "Base Case",      match: "Condition to stop recursion" },
      { concept: "*ptr",           match: "Dereferences a pointer" },
      { concept: "malloc()",       match: "Allocates memory dynamically on the heap" },
      { concept: "free()",         match: "Releases dynamically allocated memory" },
      { concept: "Segmentation Fault", match: "Attempting to access restricted memory" }
    ]
  },
  {
    id: 704, title: "ROBO OVERLORD", subtitle: "Logical Paradox", icon: Bot, type: 'yesno',
    gameData: [
      { q: "A Binary Search can be performed efficiently on an unsorted array.", a: false },
      { q: "In C, strings are represented as arrays of characters terminated by a null character '\\0'.", a: true },
      { q: "A recursive function without a base case will eventually crash due to a Stack Overflow.", a: true },
      { q: "The 'continue' keyword completely exits a loop.", a: false },
      { q: "O(log n) is generally faster than O(n) for large datasets.", a: true },
      { q: "When you pass a pointer to a function, modifying the value it points to will affect the original variable.", a: true },
      { q: "Using malloc() guarantees that the memory is initialized to zero.", a: false },
      { q: "A segmentation fault usually means your code is running perfectly.", a: false },
      { q: "A Queue operates on the FIFO (First In, First Out) principle.", a: true },
      { q: "sizeof() evaluates at compile time.", a: true }
    ]
  },
  {
    id: 705, title: "ALGO MASTER", subtitle: "Binary Search", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Assemble the Binary Search Algorithm",
      steps: [
        { id: 1, text: "int binarySearch(int arr[], int n, int target) {", order: 1 },
        { id: 2, text: "    int left = 0, right = n - 1;", order: 2 },
        { id: 3, text: "    while (left <= right) {", order: 3 },
        { id: 4, text: "        int mid = left + (right - left) / 2;", order: 4 },
        { id: 5, text: "        if (arr[mid] == target) return mid;", order: 5 },
        { id: 6, text: "        else if (arr[mid] < target) left = mid + 1;", order: 6 },
        { id: 7, text: "        else right = mid - 1; }", order: 7 },
        { id: 8, text: "    return -1; }", order: 8 }
      ]
    }
  },
  {
    id: 706, title: "SYNTAX GOD", subtitle: "Recursive Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["int", "factorial(", "int n", ")", "{"], answer: ["int", "factorial(", "int n", ")", "{"] },
      { tokens: ["if", "(", "n", "==", "0)", "{"], answer: ["if", "(", "n", "==", "0)", "{"] },
      { tokens: ["return", "1;", "}"], answer: ["return", "1;", "}"] },
      { tokens: ["return", "n", "*", "factorial(", "n - 1", ");", "}"], answer: ["return", "n", "*", "factorial(", "n - 1", ");", "}"] }
    ]
  }
];
