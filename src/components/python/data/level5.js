import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 5 — PYTHON: "Core Problem Solving" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L5_FOUNDATION = [
  {
    id: 501, title: "ALGO_THINK", subtitle: "Algorithmic Thinking",
    icon: Bot,
    content: "An algorithm is just a step-by-step recipe to solve a problem. Algorithmic thinking is breaking a huge, scary problem ('build a game') into tiny, solvable steps ('draw a circle', 'move it right'). It is the most important skill in programming, regardless of the language.",
    keyPoint: "Break big problems into tiny, manageable steps."
  },
  {
    id: 502, title: "PSEUDO", subtitle: "Pseudocode",
    icon: Code,
    content: "Pseudocode is 'fake code'. It's writing out the logic in plain English before writing actual Python. Example: 'FOR each player, IF health is 0, print Game Over'. It helps you focus on logic without worrying about missing colons or indentation.",
    keyPoint: "Write the logic in English first. Code second."
  },
  {
    id: 503, title: "FLOWCHART", subtitle: "Flowcharts",
    icon: GitBranch,
    content: "A visual map of your algorithm. Ovals = Start/End. Rectangles = Actions (x = x+1). Diamonds = Decisions (is x > 10?). Flowcharts force you to see all the paths your code can take, helping you catch bugs before you even start typing.",
    keyPoint: "Diamonds = 'If' statements. Rectangles = Actions."
  },
  {
    id: 504, title: "BIGO", subtitle: "Big-O Notation",
    icon: Zap,
    content: "Big-O tells us how an algorithm scales as data gets larger. O(1) means it takes the same time no matter what (fastest). O(N) means time grows linearly with data. O(N²) means time grows exponentially (slowest, usually nested loops). It measures worst-case scenario.",
    keyPoint: "Big-O measures how an algorithm slows down as data increases."
  },
  {
    id: 505, title: "TIME_COMP", subtitle: "Time Complexity",
    icon: Activity,
    content: "How long does it take to run? Reading a list item by index: O(1) (instant). Searching an unsorted list for a value: O(N) (you might have to check every single item). A loop inside a loop over the same list: O(N²). Goal: Keep Time Complexity as low as possible.",
    keyPoint: "for loop = O(N). Nested for loops = O(N²). Avoid O(N²) when possible."
  },
  {
    id: 506, title: "SPACE_COMP", subtitle: "Space Complexity",
    icon: Layers,
    content: "How much RAM does your algorithm use? Reversing a list by making a brand new list takes O(N) space. Reversing it in-place (modifying original) takes O(1) space. Sometimes you trade Space for Time, but on memory-constrained systems, Space matters!",
    keyPoint: "Creating new lists inside loops eats Memory (Space Complexity)."
  },
  {
    id: 507, title: "SWAP", subtitle: "Swapping Variables",
    icon: RefreshCw,
    content: "In Java/C, swapping x and y requires a temporary variable: temp = x; x = y; y = temp. But Python is magic! You can do Tuple Unpacking: x, y = y, x. This creates a tuple on the right and unpacks it into the variables on the left. Elegant and Pythonic!",
    keyPoint: "x, y = y, x — The Pythonic way to swap variables!"
  },
  {
    id: 508, title: "REVERSE", subtitle: "Reversing iterables",
    icon: Repeat,
    content: "Python makes reversing easy. Reversing a string: s[::-1] (using slicing with a step of -1). Reversing a list: my_list.reverse() (in-place, O(1) space) or reversed(my_list). Knowing how to do a loop-based reverse helps algorithmic interviews, but slicing is the Python way.",
    keyPoint: "s[::-1] is the fastest, cleanest way to reverse a string in Python."
  },
  {
    id: 509, title: "MINMAX", subtitle: "Finding Min / Max",
    icon: Shield,
    content: "Algorithmically: Set `max_val = list[0]`, loop through the rest, if `item > max_val`, then `max_val = item`. Python provides built-ins: max(list) and min(list). Always know the underlying logic, but use the built-ins for production code.",
    keyPoint: "max() and min() are O(N) — they scan the whole list once."
  },
  {
    id: 510, title: "COUNT", subtitle: "Counting Occurrences",
    icon: Hash,
    content: "How many times does 'A' appear? Algorithm: loop through, if char == 'A', count += 1. Python built-in: s.count('A') or my_list.count(5). Using a Dictionary to count ALL items is a common interview question (creating a frequency map).",
    keyPoint: "list.count(item) gets the occurrences in O(N) time."
  },
  {
    id: 511, title: "SUM_AVG", subtitle: "Sum and Average",
    icon: ListOrdered,
    content: "Summing a list mathematically: total = 0, loop items, total += item. Python built-in: sum(my_list). To find average: sum(my_list) / len(my_list). Always check if len is 0 first to avoid ZeroDivisionError!",
    keyPoint: "Average = sum(lst) / len(lst). Always guard against empty lists."
  },
  {
    id: 512, title: "SEARCH", subtitle: "Linear Search",
    icon: Search,
    content: "Linear search checks every item one by one until it finds the target. It's O(N). In Python, you can use the 'in' keyword: if target in my_list. For finding the index: my_list.index(target). If the list is huge, linear search is slow.",
    keyPoint: "Linear Search scans from start to finish. O(N) Time."
  },
  {
    id: 513, title: "DEBUG", subtitle: "Debugging Strategies",
    icon: AlertCircle,
    content: "When code breaks: 1. Read the error message (it points to the line!). 2. Rubber Duck Debugging (explain your code out loud to a rubber duck). 3. Use print() statements to trace variable values. 4. Binary search your bugs (comment out half the code to isolate the issue).",
    keyPoint: "Don't guess! Use print() to see exactly what your variables hold."
  },
  {
    id: 514, title: "EDGE", subtitle: "Handling Edge Cases",
    icon: Shield,
    content: "Edge cases are the weird inputs that break assumptions. What if the list is empty? What if they input a negative number for age? What if the string is 1 million characters long? A good problem solver tests edge cases before saying 'I'm done'.",
    keyPoint: "Empty inputs, zeros, negative numbers — always test your Edge Cases!"
  },
  {
    id: 515, title: "CLEAN", subtitle: "Clean Code Practices",
    icon: CheckCircle2,
    content: "Code is read 10x more than it is written. Use descriptive variable names (avg_score, not a). Avoid deep nesting (use early returns). Comment WHY, not WHAT. Follow PEP-8 styling standards. Clean code is a sign of a professional.",
    keyPoint: "Write code for HUMANS to read, not just machines."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 5 — PYTHON ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L5_TESTS = [
  {
    id: 516, title: "MCQ ADVENTURE", subtitle: "Problem Solving Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does Big-O notation measure?", options: ["Code length","How execution time scales with data","Memory limits","File size"], a: 1, hint: "It's about scaling." },
      { q: "Time complexity of a single for loop?", options: ["O(1)","O(N)","O(N²)","O(logN)"], a: 1, hint: "Runs N times." },
      { q: "What is the Pythonic way to swap variables?", options: ["temp = a; a = b; b = temp","a,b = b,a","a.swap(b)","swap(a,b)"], a: 1, hint: "Tuple unpacking makes it one line." },
      { q: "What is an Edge Case?", options: ["A corner of the screen","An extreme or unexpected input","A fast algorithm","The last item in a list"], a: 1, hint: "Like passing an empty list." },
      { q: "Python string reverse shorthand?", options: ["s.reverse()","s[::-1]","s.back()","reverse(s)"], a: 1, hint: "Slice with a step of -1." },
      { q: "What is Pseudocode?", options: ["Python 2 code","Fake code written in plain English","Machine code","Hacked code"], a: 1, hint: "English logic." },
      { q: "Average of list L?", options: ["sum(L)/len(L)","avg(L)","mean(L)","math.avg(L)"], a: 0, hint: "Total divided by count." },
      { q: "Time complexity of nested loops (loop inside loop)?", options: ["O(N)","O(1)","O(N²)","O(N*N*N)"], a: 2, hint: "N times N." },
      { q: "Rubber Duck Debugging means?", options: ["Using a debugger tool","Explaining code out loud to an object","Writing tests","Deleting code"], a: 1, hint: "Talking it out helps you hear the logic flaw." },
      { q: "What does O(1) mean?", options: ["1 second to run","Constant time (instant) regardless of data size","Runs once","Slower than O(N)"], a: 1, hint: "The holy grail of speed." }
    ]
  },
  {
    id: 517, title: "MATCH MASTER", subtitle: "Algo Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "O(1)",            match: "Constant time (super fast)" },
      { concept: "O(N)",            match: "Linear time (single loop)" },
      { concept: "O(N²)",           match: "Exponential time (nested loops)" },
      { concept: "a, b = b, a",     match: "Pythonic variable swap" },
      { concept: "s[::-1]",         match: "Pythonic string reverse" },
      { concept: "Edge Case",       match: "Unexpected input (e.g. empty list)" },
      { concept: "Pseudocode",      match: "Drafting logic in plain English" },
      { concept: "Linear Search",   match: "Checking every item one by one" }
    ]
  },
  {
    id: 518, title: "ROBO YES/NO", subtitle: "Algo Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "O(1) algorithms get slower if you feed them more data.", a: false },
      { q: "Python requires a 'temp' variable to swap two variables.", a: false },
      { q: "Nested loops generally have a Time Complexity of O(N²).", a: true },
      { q: "Space Complexity measures how much RAM an algorithm uses.", a: true },
      { q: "s[::-1] reverses a string using Python slicing.", a: true },
      { q: "Linear Search is the fastest way to search through sorted data.", a: false },
      { q: "An empty list is a common 'Edge Case' that breaks poorly written loops.", a: true },
      { q: "Pseudocode must be able to compile in the Python interpreter.", a: false },
      { q: "sum(L) / len(L) correctly calculates the average of a list.", a: true },
      { q: "Code readability (Clean Code) is less important than making algorithms tricky.", a: false }
    ]
  },
  {
    id: 519, title: "ALGO BUILDER", subtitle: "Find Max Algo", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Find Maximum Algorithm",
      steps: [
        { id: 1, text: "max_val = lst[0]", order: 1 },
        { id: 2, text: "for item in lst:", order: 2 },
        { id: 3, text: "    if item > max_val:", order: 3 },
        { id: 4, text: "        max_val = item", order: 4 },
        { id: 5, text: "return max_val", order: 5 }
      ]
    }
  },
  {
    id: 520, title: "PYTHON SORTER", subtitle: "Clean Code", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["a,", "b", "=", "b,", "a"], answer: ["a,", "b", "=", "b,", "a"] },
      { tokens: ["avg", "=", "sum(arr)", "/", "len(arr)"], answer: ["avg", "=", "sum(arr)", "/", "len(arr)"] },
      { tokens: ["rev", "=", "string", "[::-1]"], answer: ["rev", "=", "string", "[::-1]"] }
    ]
  }
];
