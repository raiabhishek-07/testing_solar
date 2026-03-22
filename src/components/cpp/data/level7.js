import { Skull, AlertTriangle, ShieldAlert, Crosshair, Terminal, Code, Zap, Layers, MapPin, Bot, ListOrdered } from 'lucide-react';

export const L7_FOUNDATION = [
  {
    id: 701, title: "FINAL BOSS", subtitle: "System Core Compromised",
    icon: Skull,
    content: "WARNING! The central mainframe has been infected. You are the last programmer standing. To purge the infection, you must demonstrate total mastery over variables, loops, vectors, iterators, generic programming, algorithms, classes, memory management, and modern C++. If you fail, the system falls.",
    keyPoint: "No new lessons. Just survival. Good luck, C++ Developer."
  }
];

export const L7_TESTS = [
  {
    id: 702, title: "BOSS MCQ", subtitle: "The Ultimate Gauntlet", icon: Crosshair, type: 'mcq',
    gameData: [
      { q: "What is the Big-O time complexity of std::binary_search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], a: 2, hint: "It halves the search space each time." },
      { q: "What is RAII in C++?", options: ["Random Access Inline Interface", "Resource Acquisition Is Initialization", "Recursive Algorithm Iterative Implementation", "A compiler"], a: 1, hint: "A C++ idiom for resource management." },
      { q: "Which smart pointer implies exclusive ownership?", options: ["std::shared_ptr", "std::weak_ptr", "std::unique_ptr", "std::auto_ptr"], a: 2, hint: "Only one pointer can own the resource." },
      { q: "How do you allocate memory dynamically in C++?", options: ["new int", "malloc()", "alloc()", "create()"], a: 0, hint: "Modern C++ uses the 'new' keyword." },
      { q: "Which data structure uses LIFO (Last In, First Out)?", options: ["std::queue", "std::stack", "std::list", "std::map"], a: 1, hint: "Like a stack of plates." },
      { q: "What does 'auto' do in modern C++?", options: ["Creates a car", "Defines a macro", "Deduces the type automatically", "A standard library feature"], a: 2, hint: "The compiler figures out the type." },
      { q: "Which standard algorithm should you prefer to raw loops when sorting?", options: ["std::sort", "std::order", "qsort", "std::organize"], a: 0, hint: "The Standard Template Library's sorting algorithm." },
      { q: "What is a segmentation fault?", options: ["A syntax error", "Accessing memory you don't own", "A compiler bug", "A slow loop"], a: 1, hint: "Core dumped!" },
      { q: "Every modern C++ class should respect the Rule of...", options: ["One", "Three / Five", "Seven", "Ten"], a: 1, hint: "Destructor, Copy Constructor, Copy Assignment Operator..." },
      { q: "What does 'constexpr' mean?", options: ["The same as const", "Evaluated at compile-time", "Evaluated at link-time", "A global variable"], a: 1, hint: "Evaluated by the compiler." }
    ]
  },
  {
    id: 703, title: "BOSS MATCH", subtitle: "Concept Singularity", icon: Layers, type: 'match',
    gameData: [
      { concept: "O(1)",           match: "Constant time complexity" },
      { concept: "O(n)",           match: "Linear time complexity (e.g., simple loop)" },
      { concept: "O(log n)",       match: "Logarithmic time (e.g., binary search)" },
      { concept: "RAII",           match: "Tying resource lifecycle to object lifetime" },
      { concept: "std::vector",    match: "Dynamic size array that grows" },
      { concept: "std::unique_ptr",match: "Smart pointer with exclusive ownership" },
      { concept: "std::move()",    match: "Transfers ownership of resources efficiently" },
      { concept: "auto",           match: "Compiler deduced type" }
    ]
  },
  {
    id: 704, title: "ROBO OVERLORD", subtitle: "Logical Paradox", icon: Bot, type: 'yesno',
    gameData: [
      { q: "std::binary_search only works efficiently on sorted ranges.", a: true },
      { q: "In C++, std::string automatically manages its own memory.", a: true },
      { q: "A recursive function without a base case will eventually crash due to a Stack Overflow.", a: true },
      { q: "The 'continue' keyword completely exits a loop.", a: false },
      { q: "O(log n) is generally faster than O(n) for large datasets.", a: true },
      { q: "When you pass a large std::vector by value to a function, it generates a slow copy.", a: true },
      { q: "std::unique_ptr uses reference counting to share ownership.", a: false },
      { q: "A segmentation fault usually means your code is running perfectly.", a: false },
      { q: "A std::queue operates on the FIFO (First In, First Out) principle.", a: true },
      { q: "Destructors in C++ are called automatically when an object goes out of scope.", a: true }
    ]
  },
  {
    id: 705, title: "ALGO MASTER", subtitle: "Binary Search", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Assemble the Binary Search Algorithm",
      steps: [
        { id: 1, text: "int binarySearch(const std::vector<int>& arr, int target) {", order: 1 },
        { id: 2, text: "    int left = 0, right = arr.size() - 1;", order: 2 },
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
