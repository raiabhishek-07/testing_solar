import { Skull, AlertTriangle, ShieldAlert, Crosshair, Terminal, Code, Zap, Layers, MapPin, Bot, ListOrdered } from 'lucide-react';

export const L7_FOUNDATION = [
  {
    id: 701, title: "FINAL BOSS", subtitle: "System Core Compromised",
    icon: Skull,
    content: "WARNING! The central mainframe has been infected. You are the last programmer standing. To purge the infection, you must demonstrate total mastery over variables, loops, conditionals, lists, functions, recursion, and object-oriented principles. If you fail, the system falls.",
    keyPoint: "No new lessons. Just survival. Good luck, Python Developer."
  }
];

export const L7_TESTS = [
  {
    id: 702, title: "BOSS MCQ", subtitle: "The Ultimate Gauntlet", icon: Crosshair, type: 'mcq',
    gameData: [
      { q: "What is the Big-O time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], a: 2, hint: "It halves the search space each time." },
      { q: "What is `__init__` in Python?", options: ["A loop", "A constructor method", "A global variable", "A decorator"], a: 1, hint: "It initializes objects." },
      { q: "What is the output of print(2 ** 3)?", options: ["6", "8", "9", "5"], a: 1, hint: "Exponentiation operator." },
      { q: "How do you access the last element in a list?", options: ["list[-1]", "list[0]", "list.last()", "list[-0]"], a: 0, hint: "Negative indexing." },
      { q: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Tree", "Graph"], a: 1, hint: "Like a stack of plates." },
      { q: "What does `self` represent in a Python class?", options: ["The parent class", "A global library", "The instance of the class", "A private method"], a: 2, hint: "It refers to the object itself." },
      { q: "Which sorting algorithm repeatedly swaps adjacent elements?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"], a: 2, hint: "The largest elements 'bubble' up." },
      { q: "What keyword is used to handle exceptions?", options: ["catch", "try", "except", "throws"], a: 2, hint: "try ... except" },
      { q: "Recursive functions must have a...", options: ["For loop", "Base Case", "While loop", "Decorator"], a: 1, hint: "So they know when to stop!" },
      { q: "What does KISS stand for?", options: ["Keep It Simple, Stupid", "Keep Iterating Sequential Sorts", "Kernel Internal System State", "None"], a: 0, hint: "A best practice principle." }
    ]
  },
  {
    id: 703, title: "BOSS MATCH", subtitle: "Concept Singularity", icon: Layers, type: 'match',
    gameData: [
      { concept: "O(1)",           match: "Constant time complexity" },
      { concept: "O(n)",           match: "Linear time complexity (e.g., simple loop)" },
      { concept: "O(log n)",       match: "Logarithmic time (e.g., binary search)" },
      { concept: "Base Case",      match: "Condition to stop recursion" },
      { concept: "Polymorphism",   match: "Functions behaving differently based on input types" },
      { concept: "Encapsulation",  match: "Hiding internal state and requiring methods to access it" },
      { concept: "PEP 8",          match: "Python's style guide" },
      { concept: "DRY",            match: "Don't Repeat Yourself" }
    ]
  },
  {
    id: 704, title: "ROBO OVERLORD", subtitle: "Logical Paradox", icon: Bot, type: 'yesno',
    gameData: [
      { q: "A Binary Search can be performed on an unsorted list.", a: false },
      { q: "In Python, a string is mutable (can be changed in place).", a: false },
      { q: "A recursive function without a base case will cause a StackOverflow Error.", a: true },
      { q: "The 'continue' keyword completely exits a loop.", a: false },
      { q: "O(log n) is generally faster than O(n) for large datasets.", a: true },
      { q: "Python variables must be declared with a strict type before use.", a: false },
      { q: "An instance method in Python must take 'self' as its first parameter.", a: true },
      { q: "Global variables are always considered a best practice.", a: false },
      { q: "A Queue operates on the FIFO (First In, First Out) principle.", a: true },
      { q: "Dictionaries in Python store data as Key-Value pairs.", a: true }
    ]
  },
  {
    id: 705, title: "ALGO MASTER", subtitle: "Binary Search", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Assemble the Binary Search Algorithm",
      steps: [
        { id: 1, text: "def binary_search(arr, target):", order: 1 },
        { id: 2, text: "    low, high = 0, len(arr) - 1", order: 2 },
        { id: 3, text: "    while low <= high:", order: 3 },
        { id: 4, text: "        mid = (low + high) // 2", order: 4 },
        { id: 5, text: "        if arr[mid] == target: return mid", order: 5 },
        { id: 6, text: "        elif arr[mid] < target: low = mid + 1", order: 6 },
        { id: 7, text: "        else: high = mid - 1", order: 7 },
        { id: 8, text: "    return -1", order: 8 }
      ]
    }
  },
  {
    id: 706, title: "SYNTAX GOD", subtitle: "Recursive Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["def", "factorial(", "n", "):"], answer: ["def", "factorial(", "n", "):"] },
      { tokens: ["if", "n", "==", "0:"], answer: ["if", "n", "==", "0:"] },
      { tokens: ["return", "1"], answer: ["return", "1"] },
      { tokens: ["return", "n", "*", "factorial(", "n - 1", ")"], answer: ["return", "n", "*", "factorial(", "n - 1", ")"] }
    ]
  }
];
