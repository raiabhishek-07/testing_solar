import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash, Box, Expand } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 3 — C++: "Loops & Arrays" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L3_FOUNDATION = [
  {
    id: 301, title: "LOOP", subtitle: "What is a Loop?",
    icon: Repeat,
    content: "A loop repeats an action. C++ provides traditional 'for', 'while', and 'do-while' loops (inherited from C). More importantly, C++11 introduced the highly readable 'Range-based for loop' (similar to Python's for-in), which is the modern standard for iterating over collections.",
    keyPoint: "C++ has 4 loops: for, while, do-while, and modern range-based for."
  },
  {
    id: 302, title: "TRAD_FOR", subtitle: "Traditional for & while",
    icon: Repeat,
    content: "The C-style loop: for (int i = 0; i < N; ++i). Pre-increment (++i) is often preferred in C++ over post-increment (i++) for iterators because it avoids making a copy of the object, though for raw ints compilers optimize both to be identical. while(true) replaces C's while(1).",
    keyPoint: "for (int i = 0; i < n; ++i)  — prefer ++i over i++ in C++ for iterators."
  },
  {
    id: 303, title: "RANGE_FOR", subtitle: "Modern Range-based for",
    icon: Repeat,
    content: "C++11 added Range-based loops. Simplest way to read an array: for (int x : myArr) { cout << x; }. Remember: this makes a COPY of x. To MODIFY the array, you must use a reference (&): for (int& x : myArr) { x *= 2; }. To read safely without copying complex objects: for (const auto& x : myData).",
    keyPoint: "for (auto& x : arr) modifies elements. for (const auto& x : arr) reads safely."
  },
  {
    id: 304, title: "DOWHILE", subtitle: "do-while Loop",
    icon: AlertCircle,
    content: "do-while runs the body AT LEAST ONCE before checking the condition. do { showMenu(); } while(choice != 0);. It is less common than 'while' but perfect for interactive prompts where user input is required to decide whether to loop again.",
    keyPoint: "do { } while(condition);  — guaranteed to run once!"
  },
  {
    id: 305, title: "CONDITIONS", subtitle: "break & continue",
    icon: Filter,
    content: "'break' exits the innermost loop immediately. 'continue' skips the rest of the loop block and jumps to the update step (in a for loop) or condition check (in while). In complex C++ algorithms, these are heavily used to filter out invalid data fast.",
    keyPoint: "break escapes loop entirely. continue skips the current iteration."
  },
  {
    id: 306, title: "INFINITE", subtitle: "Infinite Loops in C++",
    icon: Zap,
    content: "In C++, while(true) is the idiomatic way to write an infinite loop (replaces C's while(1)). A common bug: for (size_t i = 5; i >= 0; --i). Because size_t is unsigned (cannot be negative), 0 minus 1 becomes 4 billion! The loop never stops. This is an unsigned underflow bug.",
    keyPoint: "DANGER: size_t is unsigned. Counting down to >= 0 causes infinite loops!"
  },
  {
    id: 307, title: "NESTED", subtitle: "Nested Loops",
    icon: Layers,
    content: "Loops inside loops. In C++, traversing 2D matrices is common. Performance tip: always traverse arrays the way they are stored in memory! C++ stores 2D arrays row-by-row (row-major order). So outer loop = row, inner loop = col. Doing it backwards destroys CPU cache efficiency.",
    keyPoint: "C++ Performance: Traverse 2D arrays row by row to maximize CPU cache!"
  },
  {
    id: 308, title: "C_ARRAY", subtitle: "The Evil C-Array",
    icon: AlertCircle,
    content: "C++ inherits raw C-arrays: int arr[5];. They don't know their size. You must use sizeof(arr)/sizeof(arr[0]). Passing them to functions 'decays' them into pointers, losing size info. Modern C++ rule: AVOID C-ARRAYS! Use std::array or std::vector instead.",
    keyPoint: "Modern C++ Core Guideline: Do NOT use raw C-arrays. They decay to pointers."
  },
  {
    id: 309, title: "STD_ARRAY", subtitle: "std::array (Fixed Size)",
    icon: Box,
    content: "C++11 introduced <array>. Syntax: std::array<int, 5> arr = {1, 2, 3, 4, 5};. It's safe, knows its size via arr.size(), doesn't decay to a pointer, and has zero performance overhead compared to C-arrays. Use it when size is known at compile time.",
    keyPoint: "std::array<int, 5> arr;  — Fixed size, knows its size, no overhead."
  },
  {
    id: 310, title: "VECTOR", subtitle: "std::vector (Dynamic Size)",
    icon: Expand,
    content: "The workhorse of C++! From <vector>. std::vector<int> v; It grows automatically! v.push_back(10); adds 10 to the end. It manages its own memory. Use it for 95% of your array needs in C++. You can access elements like v[0] or safely with v.at(0).",
    keyPoint: "std::vector<int> v; v.push_back(10); — Dynamic, safe, the default container."
  },
  {
    id: 311, title: "INDEXING", subtitle: "0-Based & Bounds Checking",
    icon: Hash,
    content: "Arrays and vectors are 0-indexed. Accessing v[100] on a 5-element vector compiles but causes undefined behavior (just like C). However, using v.at(100) throws a safe std::out_of_range exception! Use [] for performance, .at() for safety.",
    keyPoint: "v[idx] is fast but unsafe. v.at(idx) is safe but slightly slower."
  },
  {
    id: 312, title: "SIZE", subtitle: "Getting the Size",
    icon: HelpCircle,
    content: "Unlike C, modern C++ containers know their size. arr.size() or v.size() returns a size_t (unsigned int representing the count). This completely eliminates the need for the dangerous sizeof() macros from C.",
    keyPoint: "container.size() returns an unsigned size_t. Safe and reliable."
  },
  {
    id: 313, title: "UPDATE", subtitle: "Access & Update",
    icon: Zap,
    content: "Using vector: v[0] = 42; updates the first element. To remove the last element efficiently, use v.pop_back(). Inserting/erasing from the middle of a vector is slow O(N) because elements must shift. Adding to the end is fast O(1).",
    keyPoint: "push_back() and pop_back() are very fast at the end of a vector."
  },
  {
    id: 314, title: "MISTAKES", subtitle: "Common Array/Loop Mistakes",
    icon: AlertCircle,
    content: "1. Vector reallocation: appending to a vector might cause it to move to new memory, invalidating old references/pointers to its elements. 2. Range-based loops copying large objects (use const auto&). 3. Off-by-one errors (i <= size instead of i < size).",
    keyPoint: "for(auto x: vec) triggers a copy! Use 'auto&' to modify or 'const auto&' to read."
  },
  {
    id: 315, title: "TRACE", subtitle: "Tracing C++ Range Loops",
    icon: CheckCircle2,
    content: "Trace: vector<int> v={1,2,3}; for(auto x : v) x=x*2; cout<<v[0]; → Output is 1! Why? 'auto x' takes a COPY. The vector is unchanged. To double the vector values, trace this: for(auto& x : v) x=x*2; cout<<v[0]; → Output is 2. The reference '&' modifies the original.",
    keyPoint: "Without '&', you are only modifying a local copy of the element!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 — C++ ELITE TESTS
// ─────────────────────────────────────────────────────────


export const L3_TESTS = [
  {
    id: 316, title: "MCQ ADVENTURE", subtitle: "C++ Loops & Containers", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What is the recommended dynamic array in modern C++?", options: ["int[]","std::array","std::vector","C-Array"], a: 2, hint: "Grows automatically. Includes <vector>." },
      { q: "How to safely access a vector element with bounds checking?", options: ["v[i]","v.at(i)","v(i)","v.get(i)"], a: 1, hint: "Throws out_of_range exception if invalid." },
      { q: "How to add an element to the end of a std::vector?", options: ["v.add()","v.push_back()","v.append()","v += element"], a: 1, hint: "Pushes an element to the back." },
      { q: "What does 'for (auto& x : vec)' do?", options: ["Reads safely","Causes an error","Modifies elements in vec directly","Copies elements"], a: 2, hint: "The '&' means reference!" },
      { q: "C++ equivalent of an infinite loop?", options: ["while(1)","while(true)","Both A and B (Both work)","forever {}"], a: 2, hint: "while(true) is the modern way." },
      { q: "Why avoid raw C-arrays (int arr[5]) in C++?", options: ["Too slow","Don't know their size (decays to pointer)","They crash","Deprecated feature"], a: 1, hint: "Use std::array instead." },
      { q: "std::array vs std::vector difference?", options: ["array is fixed size, vector is dynamic","array is dynamic, vector is fixed","Both are dynamic","No difference"], a: 0, hint: "Array = compile time size. Vector = runtime size." },
      { q: "What does v.size() return?", options: ["int","float","unsigned size_t","bool"], a: 2, hint: "Size cannot be negative." },
      { q: "Why is 'for(size_t i=5; i>=0; --i)' an infinite loop?", options: ["size_t is unsigned (never < 0)","Loop syntax is wrong","Operator --i is wrong","It isn't an infinite loop"], a: 0, hint: "0 - 1 = 4 billion (underflow)." },
      { q: "In C++, 'continue' does what?", options: ["Pauses execution","Skips rest of current iteration","Exits the loop","Deletes loop variable"], a: 1, hint: "Jumps to the next iteration." }
    ]
  },
  {
    id: 317, title: "MATCH MASTER", subtitle: "C++ Container Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "std::vector",      match: "Dynamic size array that grows" },
      { concept: "std::array",       match: "Fixed size safe array container" },
      { concept: "v.push_back(x)",   match: "Adds element 'x' to end of vector" },
      { concept: "v.at(i)",          match: "Bounds-checked safe access" },
      { concept: "v[i]",             match: "Fast but unsafe access (no bounds check)" },
      { concept: "for(auto& x: v)",  match: "Range loop that MODIFIES original elements" },
      { concept: "for(const auto& x: v)", match: "Range loop that safely READS elements without copying" },
      { concept: "size_t",           match: "Unsigned integer type used for sizes" }
    ]
  },
  {
    id: 318, title: "ROBO YES/NO", subtitle: "C++ Container Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "std::vector can automatically resize itself when you add elements.", a: true },
      { q: "Using v[100] on a size-5 vector will throw a safe exception.", a: false },
      { q: "The loop 'for(auto x : vec) { x = 0; }' modifies the original vector.", a: false },
      { q: "Raw C-arrays (e.g., int arr[5]) lose their size information when passed to a function.", a: true },
      { q: "std::array allows you to add elements using push_back().", a: false },
      { q: "size_t is an unsigned integer type, so it can never be negative.", a: true },
      { q: "++i (pre-increment) is often preferred over i++ for C++ iterators.", a: true },
      { q: "It's faster to traverse a 2D array column-by-column rather than row-by-row in C++.", a: false },
      { q: "v.at(100) on a size-5 vector will safely throw an std::out_of_range exception.", a: true },
      { q: "A do-while loop always executes its body at least once.", a: true }
    ]
  },
  {
    id: 319, title: "ALGO BUILDER", subtitle: "Vector Creation", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Fill and Print a Vector",
      steps: [
        { id: 1, text: "#include <vector> and <iostream>", order: 1 },
        { id: 2, text: "std::vector<int> nums;", order: 2 },
        { id: 3, text: "for (int i = 1; i <= 3; ++i) nums.push_back(i);", order: 3 },
        { id: 4, text: "for (const auto& num : nums) {", order: 4 },
        { id: 5, text: "    std::cout << num << std::endl; }", order: 5 }
      ]
    }
  },
  {
    id: 320, title: "C++ SORTER", subtitle: "Modern Loop Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["std::vector<int>", "v", "=", "{1,2,3};"], answer: ["std::vector<int>", "v", "=", "{1,2,3};"] },
      { tokens: ["for(", "const auto&", "x", ":", "v)"], answer: ["for(", "const auto&", "x", ":", "v)"] },
      { tokens: ["v", ".", "push_back(", "42", ");"], answer: ["v", ".", "push_back(", "42", ");"] }
    ]
  }
];
