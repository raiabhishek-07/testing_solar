import { Skull, AlertTriangle, ShieldAlert, Crosshair, Terminal, Code, Zap, Layers, MapPin, Bot, ListOrdered } from 'lucide-react';

export const L7_FOUNDATION = [
  {
    id: 701, title: "FINAL BOSS", subtitle: "System Core Compromised",
    icon: Skull,
    content: "WARNING! The central mainframe has been infected. You are the last programmer standing. To purge the infection, you must demonstrate total mastery over variables, loops, conditionals, arrays, functions, recursion, and object-oriented principles. If you fail, the system falls.",
    keyPoint: "No new lessons. Just survival. Good luck, Java Developer."
  }
];

export const L7_TESTS = [
  {
    id: 702, title: "BOSS MCQ", subtitle: "The Ultimate Gauntlet", icon: Crosshair, type: 'mcq',
    gameData: [
      { q: "What is the Big-O time complexity of binary search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], a: 2, hint: "It halves the search space each time." },
      { q: "What is a 'Constructor' in Java?", options: ["A loop", "A special method to initialize objects", "A global variable", "A decorator"], a: 1, hint: "It shares the name of the class." },
      { q: "What keyword is used to inherit from a class in Java?", options: ["implements", "inherits", "extends", "super"], a: 2, hint: "class Dog ___ Animal" },
      { q: "How do you access the length of an array in Java?", options: ["arr.length()", "arr.size()", "arr.length", "arr.size"], a: 2, hint: "It's a property, not a method for arrays." },
      { q: "Which data structure uses LIFO (Last In, First Out)?", options: ["Queue", "Stack", "Tree", "Graph"], a: 1, hint: "Like a stack of plates." },
      { q: "What does 'static' mean in Java?", options: ["Unchanging variable", "Belongs to the class, not instances", "Private method", "Constant"], a: 1, hint: "You don't need to instantiate an object to use it." },
      { q: "Which sorting algorithm repeatedly swaps adjacent elements?", options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"], a: 2, hint: "The largest elements 'bubble' up." },
      { q: "What keyword is used to handle exceptions?", options: ["catch", "try", "except", "throws"], a: 1, hint: "try ... catch" },
      { q: "Recursive functions must have a...", options: ["For loop", "Base Case", "While loop", "Interface"], a: 1, hint: "So they know when to stop!" },
      { q: "What does DRY stand for?", options: ["Do Repeat Yourself", "Don't Repeat Yourself", "Data Request Yield", "None"], a: 1, hint: "A best practice principle." }
    ]
  },
  {
    id: 703, title: "BOSS MATCH", subtitle: "Concept Singularity", icon: Layers, type: 'match',
    gameData: [
      { concept: "O(1)",           match: "Constant time complexity" },
      { concept: "O(n)",           match: "Linear time complexity (e.g., simple loop)" },
      { concept: "O(log n)",       match: "Logarithmic time (e.g., binary search)" },
      { concept: "Base Case",      match: "Condition to stop recursion" },
      { concept: "Polymorphism",   match: "Multiple classes treated as a common parent type" },
      { concept: "Encapsulation",  match: "Hiding internal state (e.g., private fields)" },
      { concept: "Interface",      match: "A contract that implementing classes must follow" },
      { concept: "DRY",            match: "Don't Repeat Yourself" }
    ]
  },
  {
    id: 704, title: "ROBO OVERLORD", subtitle: "Logical Paradox", icon: Bot, type: 'yesno',
    gameData: [
      { q: "A Binary Search can be performed on an unsorted array.", a: false },
      { q: "In Java, a String object is immutable (cannot be changed).", a: true },
      { q: "A recursive function without a base case will cause a StackOverflowError.", a: true },
      { q: "The 'continue' keyword completely exits a loop.", a: false },
      { q: "O(log n) is generally faster than O(n) for large datasets.", a: true },
      { q: "Java variables can change their type after they are declared.", a: false },
      { q: "A class in Java can extend multiple parent classes using comma separation.", a: false },
      { q: "Static methods can safely access non-static instance variables directly.", a: false },
      { q: "A Queue operates on the FIFO (First In, First Out) principle.", a: true },
      { q: "System.out.println() requires you to write a newline character manually.", a: false }
    ]
  },
  {
    id: 705, title: "ALGO MASTER", subtitle: "Binary Search", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Assemble the Binary Search Algorithm",
      steps: [
        { id: 1, text: "public int binarySearch(int[] arr, int target) {", order: 1 },
        { id: 2, text: "    int left = 0, right = arr.length - 1;", order: 2 },
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
      { tokens: ["public", "int", "factorial(", "int n", ")", "{"], answer: ["public", "int", "factorial(", "int n", ")", "{"] },
      { tokens: ["if", "(", "n", "==", "0)", "{"], answer: ["if", "(", "n", "==", "0)", "{"] },
      { tokens: ["return", "1;", "}"], answer: ["return", "1;", "}"] },
      { tokens: ["return", "n", "*", "factorial(", "n - 1", ");", "}"], answer: ["return", "n", "*", "factorial(", "n - 1", ");", "}"] }
    ]
  }
];
