import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 5 — C++: "Core Problem Solving" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L5_FOUNDATION = [
  {
    id: 501, title: "ALGO_THINK", subtitle: "Algorithmic Thinking & STL",
    icon: Bot,
    content: "An algorithm is step-by-step logic. C++ gives you two choices: write it yourself (great for learning) or use the Standard Template Library (STL) via #include <algorithm>. Modern C++ developers almost ALWAYS use the STL because those algorithms are heavily optimized.",
    keyPoint: "#include <algorithm> — The superpower of C++ developers."
  },
  {
    id: 502, title: "PSEUDO", subtitle: "Pseudocode & Logic",
    icon: Code,
    content: "C++ syntax can be verbose and complex (templates, iterators, references). Pseudocode lets you sketch the logic in plain English first. 'For each item, if it matches, return true'. This prevents you from getting bogged down in syntax errors before your logic is sound.",
    keyPoint: "Sketch logic in English: Pseudocode saves hours of debugging syntax."
  },
  {
    id: 503, title: "FLOWCHART", subtitle: "Flowcharts",
    icon: GitBranch,
    content: "Visualizing execution paths. In C++, understanding the exact path is crucial because memory MUST be managed properly if you aren't using smart pointers. Flowcharts help identify paths where variables might not be initialized or returned.",
    keyPoint: "Map every path to ensure all functions return what they promise."
  },
  {
    id: 504, title: "BIGO", subtitle: "Big-O Notation",
    icon: Zap,
    content: "Big-O measures how an algorithm slows down as data grows. O(1) is instant (accessing vector index). O(N) grows linearly (linear search). O(N²) grows exponentially (nested loops). Because C++ is used for high-performance systems (games, trading), Big-O is obsessed over.",
    keyPoint: "C++ developers must master Big-O. High performance demands O(1) or O(N log N)."
  },
  {
    id: 505, title: "TIME_COMP", subtitle: "Time Complexity & Vectors",
    icon: Activity,
    content: "Inserting at the END of a std::vector (push_back) is O(1) (instant). Inserting at the BEGINNING (insert) is O(N) because every existing element must be shifted in memory! Knowing this difference is what separates an average C++ dev from a senior dev.",
    keyPoint: "Vector push_back = O(1). Vector insert at front = O(N) (Slow!)."
  },
  {
    id: 506, title: "SPACE_COMP", subtitle: "Space Complexity & References",
    icon: Layers,
    content: "RAM usage. Passing a 1,000,000 item vector to a function by value creates a full COPY (O(N) space and time). Passing it by const reference `const vector<int>& v` takes O(1) space (just passing the address safely). Space complexity is why Pass by Reference dominates C++.",
    keyPoint: "Pass by Value = O(N) Space. Pass by Reference (&) = O(1) Space."
  },
  {
    id: 507, title: "SWAP", subtitle: "Swapping Elements",
    icon: RefreshCw,
    content: "You could build a swap manually with a `temp` variable. But modern C++ provides std::swap(a, b) in <utility>. It's heavily optimized (using C++11 Move Semantics under the hood) and should always be your preferred way to swap variables.",
    keyPoint: "std::swap(a, b); — Fast, generic, and uses modern C++ Move Semantics."
  },
  {
    id: 508, title: "REVERSE", subtitle: "Reversing an Array",
    icon: Repeat,
    content: "To reverse a container in C++, use the STL: std::reverse(v.begin(), v.end()). It operates in-place, meaning O(1) Space Complexity. It takes Iterators (pointers to the start and end of the container) to know what to reverse.",
    keyPoint: "std::reverse(v.begin(), v.end()); — The STL method for reversing."
  },
  {
    id: 509, title: "MINMAX", subtitle: "Finding Min / Max",
    icon: Shield,
    content: "Manually: `int max=v[0]; for(int x : v) if(x>max) max=x;`. STL way: auto it = std::max_element(v.begin(), v.end());. Note that it returns an ITERATOR (a pointer type), so you must dereference it using `*it` to get the actual value.",
    keyPoint: "int max_val = *std::max_element(v.begin(), v.end()); (Don't forget the *!)"
  },
  {
    id: 510, title: "COUNT", subtitle: "Counting Occurrences",
    icon: Hash,
    content: "Manually: loop and an if statement. STL way: int c = std::count(v.begin(), v.end(), 10);. The STL algorithms are usually faster than manually written loops because compiler writers heavily optimize them for specific hardware architectures.",
    keyPoint: "std::count(v.begin(), v.end(), target); gets the count in O(N)."
  },
  {
    id: 511, title: "SUM_AVG", subtitle: "Summing via std::accumulate",
    icon: ListOrdered,
    content: "To sum a vector, #include <numeric> and use `int total = std::accumulate(v.begin(), v.end(), 0);`. The `0` is the starting value. For average: `float avg = (float)total / v.size();`. Remember to cast to float to prevent Integer Division truncation!",
    keyPoint: "std::accumulate requires <numeric>, not <algorithm>. And cast to float for averages!"
  },
  {
    id: 512, title: "SEARCH", subtitle: "std::find (Linear Search)",
    icon: Search,
    content: "STL Linear Search: auto it = std::find(v.begin(), v.end(), target);. It returns an iterator pointing to the item. If the item isn't found, it returns `v.end()`. You check success like this: `if (it != v.end()) { // found }`.",
    keyPoint: "std::find returns v.end() if the target is NOT found. Always check it!"
  },
  {
    id: 513, title: "DEBUG", subtitle: "Debugging C++ STL",
    icon: AlertCircle,
    content: "1. Segmentation Fault: Caused by dereferencing invalid iterators (like accessing `*v.end()`). 2. Massive template errors when you forget an `#include` or pass the wrong type to an STL algorithm. Read compile errors from the TOP.",
    keyPoint: "v.end() points to ONE PAST the last element. Dereferencing it crashes your program!"
  },
  {
    id: 514, title: "EDGE", subtitle: "Defensive Programming",
    icon: Shield,
    content: "Checking for empty vectors: `if (v.empty()) return;`. Never call `v.front()` or `v.back()` or `v[0]` on an empty vector — it causes undefined behavior! Always validate your inputs before running algorithms on them.",
    keyPoint: "v.empty() — Always check this before assessing elements in a vector!"
  },
  {
    id: 515, title: "CLEAN", subtitle: "Modern C++ Clean Code",
    icon: CheckCircle2,
    content: "Use `auto` to avoid typing massive iterator names. Use Range-based for loops for readability. Prefer STL algorithms over manual raw loops (`std::find` instead of a manual for loop). C++ is complex, so self-documenting code is mandatory.",
    keyPoint: "STL Algorithms > Raw Loops. They are cleaner and often faster."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 5 — C++ ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L5_TESTS = [
  {
    id: 516, title: "MCQ ADVENTURE", subtitle: "C++ Algo & STL", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does Big-O notation measure?", options: ["Disk space used","Template compilation time","How algorithms scale with more data","Memory leaks"], a: 2, hint: "Growth rate of execution time." },
      { q: "Why pass a large std::vector as 'const vector<int>& v'?", options: ["To modify it","O(1) Space (Prevents copying)","It requires a pointer later","Compile error"], a: 1, hint: "Pass by const reference." },
      { q: "Time complexity of std::vector.insert at the FRONT of the vector?", options: ["O(N)","O(1)","O(N²)","O(logN)"], a: 0, hint: "Every element must shift down 1 spot." },
      { q: "What does std::max_element return?", options: ["The max integer","A boolean","An iterator (must dereference with *)","0"], a: 2, hint: "It points to the location." },
      { q: "What evaluates to 2.5 in C++?", options: ["5 / 2","(float)5 / 2","int(5/2)","None"], a: 1, hint: "Integer division throws away decimals. Need a float cast." },
      { q: "What does std::find return if the target is NOT found?", options: ["0","NULL","v.begin()","v.end()"], a: 3, hint: "The iterator representing 'one past the end'." },
      { q: "What is an Edge Case (Defensive Programming)?", options: ["A GUI border","An unexpected input like an empty vector","The optimal path","A recursive template"], a: 1, hint: "Protect your function from bad inputs." },
      { q: "Which STL algorithm reverses a container in-place?", options: ["std::swap()","std::count()","std::reverse()","std::back()"], a: 2, hint: "Takes begin and end iterators." },
      { q: "Dereferencing v.end() (e.g. *v.end()) causes?", options: ["Undefined Behavior / Segfault","Returns the last element","Returns 0","Compile error"], a: 0, hint: "It points ONE PAST the last element." },
      { q: "What header is required for std::accumulate?", options: ["<algorithm>","<numeric>","<vector>","<math>"], a: 1, hint: "It is a numeric operation." }
    ]
  },
  {
    id: 517, title: "MATCH MASTER", subtitle: "C++ Algo Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "std::swap(a, b)",  match: "Heavily optimized modern variable swapping" },
      { concept: "const vector& v",  match: "Pass large objects efficiently (O(1) space)" },
      { concept: "std::accumulate",  match: "Sums elements in a range (#include <numeric>)" },
      { concept: "v.end()",          match: "Returned by std::find if item is not found" },
      { concept: "v.empty()",        match: "Guard Clause: Check before accessing elements" },
      { concept: "Integer Division", match: "5/2 resulting in 2 (must cast to float!)" },
      { concept: "O(1) Access",      match: "Vector indexing speed (v[100])" },
      { concept: "std::reverse",     match: "Reverses container in-place (O(1) Space)" }
    ]
  },
  {
    id: 518, title: "ROBO YES/NO", subtitle: "C++ Algo Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "Passing a std::vector by Value creates a complete copy and takes O(N) Space.", a: true },
      { q: "To calculate an accurate decimal average, you must cast an operand to float.", a: true },
      { q: "Dereferencing v.end() gives you the last element of the vector safely.", a: false },
      { q: "std::max_element returns the actual maximum integer, not an iterator.", a: false },
      { q: "std::find returns v.end() if the item you are searching for does not exist.", a: true },
      { q: "v.empty() is safer than checking if v.size() == 0.", a: true },
      { q: "Inserting an element at the BEGINNING of a vector is as fast as the END (O(1)).", a: false },
      { q: "std::reverse modifies the original vector in-place.", a: true },
      { q: "std::accumulate requires the <algorithm> header, not <numeric>.", a: false },
      { q: "Modern C++ encourages using STL algorithms instead of writing raw loops manually.", a: true }
    ]
  },
  {
    id: 519, title: "ALGO BUILDER", subtitle: "STL Function", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "STL Finding & Checking",
      steps: [
        { id: 1, text: "auto it = std::find(v.begin(), v.end(), target);", order: 1 },
        { id: 2, text: "if (it != v.end()) {", order: 2 },
        { id: 3, text: "    std::cout << \"Found: \" << *it;", order: 3 },
        { id: 4, text: "} else {", order: 4 },
        { id: 5, text: "    std::cout << \"Not found\"; }", order: 5 }
      ]
    }
  },
  {
    id: 520, title: "C++ SORTER", subtitle: "STL Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["std::swap(", "a,", "b);"], answer: ["std::swap(", "a,", "b);"] },
      { tokens: ["int", "max", "=", "*std::max_element(", "v.begin(), v.end());"], answer: ["int", "max", "=", "*std::max_element(", "v.begin(), v.end());"] },
      { tokens: ["std::reverse(", "v.begin(),", "v.end());"], answer: ["std::reverse(", "v.begin(),", "v.end());"] }
    ]
  }
];
