import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 3 — PYTHON: "Loops & Arrays" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L3_FOUNDATION = [
  {
    id: 301, title: "LOOP", subtitle: "What is a Loop?",
    icon: Repeat,
    content: "A loop is a programming construct that repeats a block of code multiple times. Without loops, if you wanted to print 'Hello' 100 times, you'd have to write 100 print statements. With a loop, you write it once and tell Python to repeat it.",
    keyPoint: "Loops = Do not repeat yourself! Write once, execute many times."
  },
  {
    id: 302, title: "FOR", subtitle: "The for Loop",
    icon: Repeat,
    content: "Python's for loop is a 'for-each' loop. It steps through items in a collection (like a list or a range). Syntax: for i in range(5): print(i). It means 'for each item i in this sequence, do something'. range(5) generates 0, 1, 2, 3, 4.",
    keyPoint: "for i in range(5):  →  Loops 5 times (i goes from 0 to 4)."
  },
  {
    id: 303, title: "WHILE", subtitle: "The while Loop",
    icon: Repeat,
    content: "A while loop repeats AS LONG AS a condition is True. Syntax: while x < 10: print(x); x += 1. You MUST change the condition inside the loop (like x += 1), or it will loop forever. It's used when you don't know exactly how many times to loop.",
    keyPoint: "while condition_is_true:  →  Requires manual variable update!"
  },
  {
    id: 304, title: "DOWHILE", subtitle: "Does Python have do-while?",
    icon: AlertCircle,
    content: "Unlike C or Java, Python does NOT have a do-while loop. But you can simulate it! You use an infinite loop and a break statement: while True: ... if condition: break. This ensures the loop runs at least once before checking the exit condition.",
    keyPoint: "Python has no do-while! Use: while True: ... if stop: break."
  },
  {
    id: 305, title: "CONDITIONS", subtitle: "Loop Flow: break & continue",
    icon: Filter,
    content: "'break' immediately exits the entire loop. 'continue' stops the current iteration and jumps back to the top for the next one. Example: if i == 3: continue (skips printing 3). if i == 8: break (stops loop early at 8).",
    keyPoint: "break = EXITS loop entirely. continue = SKIPS to next iteration."
  },
  {
    id: 306, title: "INFINITE", subtitle: "Infinite Loops",
    icon: Zap,
    content: "An infinite loop never stops running because its condition never becomes False. while True: print('A'). This usually crashes your program or freezes your computer! It happens when you forget to update the loop variable (like forgetting x += 1).",
    keyPoint: "Infinite Loop = Bug where condition never becomes False."
  },
  {
    id: 307, title: "NESTED", subtitle: "Nested Loops",
    icon: Layers,
    content: "A loop inside a loop! For every 1 step of the outer loop, the inner loop runs completely. if outer runs 3 times, and inner runs 5 times, the total runs = 3 * 5 = 15. Nested loops are used for grids, matrices, and multi-dimensional data.",
    keyPoint: "for i in range(3): for j in range(5): → Total 15 executions."
  },
  {
    id: 308, title: "LIST", subtitle: "What is a List (Array)?",
    icon: ListIcon,
    content: "Python doesn't have native 'arrays', it uses 'Lists'. A list holds multiple values in a single variable: scores = [90, 85, 95]. Unlike arrays in C, Python lists can hold mixed types: data = [1, 'Alice', True]. Lists are ordered and changeable.",
    keyPoint: "scores = [90, 85, 95]  — Python calls them Lists, not Arrays."
  },
  {
    id: 309, title: "DECLARE", subtitle: "List Declaration",
    icon: Code,
    content: "Create a list using square brackets []. Empty list: my_list = []. Or with data: colors = ['red', 'blue', 'green']. You can add items later using .append() or .insert(). To remove, use .remove() or .pop().",
    keyPoint: "colors = [] (empty)  |  colors.append('red') (adds to end)"
  },
  {
    id: 310, title: "INDEXING", subtitle: "0-Based Indexing",
    icon: Hash,
    content: "Lists are ordered by index. The FIRST item is ALWAYS at index 0. If size is 5, indices are 0, 1, 2, 3, 4. Python also has negative indexing: -1 is the LAST item! This is a super handy Python feature.",
    keyPoint: "First item: index 0. Last item: index -1 (Python special!)."
  },
  {
    id: 311, title: "ACCESS", subtitle: "Accessing Elements",
    icon: HelpCircle,
    content: "Get an item using its index: print(colors[0]) prints 'red'. Accessing an index that doesn't exist (like colors[10] when size is 3) causes an IndexError: list index out of range. Always check len() first!",
    keyPoint: "IndexError = you tried to access an item that doesn't exist!"
  },
  {
    id: 312, title: "UPDATE", subtitle: "Updating Elements",
    icon: Zap,
    content: "Lists are mutable (changeable). To change an item, assign a new value to its index: colors[1] = 'yellow'. The old value is overwritten. You cannot assign to an index that doesn't exist yet — use .append() for new items.",
    keyPoint: "colors[1] = 'yellow'  →  Changes the second item."
  },
  {
    id: 313, title: "ITERATE", subtitle: "Looping Through a List",
    icon: Repeat,
    content: "The best way to read a Python list is a for-in loop: for color in colors: print(color). It automatically reads every item from start to finish. If you need the index too, use enumerate: for i, color in enumerate(colors):.",
    keyPoint: "for item in my_list:  — Cleanest way to loop through a list!"
  },
  {
    id: 314, title: "MISTAKES", subtitle: "Common List Mistakes",
    icon: AlertCircle,
    content: "Top bugs: 1. Off-by-one errors (looping to index 5 in a size-5 list causes error since max is 4). 2. Modifying a list while looping through it (causes items to shift and loop misses them!). 3. Misunderstanding mixed types.",
    keyPoint: "NEVER modify (remove items from) a list while looping over it!"
  },
  {
    id: 315, title: "TRACE", subtitle: "Output Tracing",
    icon: CheckCircle2,
    content: "Trace this: nums=[1,2]; for n in nums: n=n+1; print(nums). What prints? It still prints [1,2]! Changing the loop variable 'n' doesn't change the list. To change the list: for i in range(len(nums)): nums[i]+=1.",
    keyPoint: "Modifying 'n' in 'for n in list' does NOT modify the original list!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 — PYTHON ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L3_TESTS = [
  {
    id: 316, title: "MCQ ADVENTURE", subtitle: "Loops & Lists Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What is the first index of a Python list?", options: ["1","0","-1","None"], a: 1, hint: "Arrays/lists are 0-based." },
      { q: "Which gets the LAST item in Python?", options: ["list[last]","list[-1]","list[0]","list.last()"], a: 1, hint: "Python negative indexing." },
      { q: "What loop runs as long as a condition is true?", options: ["for","while","do-while","switch"], a: 1, hint: "while condition:" },
      { q: "Output: list=[10,20]; print(list[2]);", options: ["20","10","0","IndexError"], a: 3, hint: "Indices are 0 and 1. 2 doesn't exist!" },
      { q: "What does 'break' do?", options: ["Pauses loop","Skips iteration","Exits loop entirely","Fixes errors"], a: 2, hint: "It breaks out of the loop." },
      { q: "How to add an item to a Python list?", options: ["list.add()","list.insert()","list.push()","list.append()"], a: 3, hint: "Append adds to the end." },
      { q: "Does Python have a do-while loop?", options: ["Yes","No","Only in classes","Yes, as while-do"], a: 1, hint: "Python lacks a built-in do-while." },
      { q: "range(3) generates what numbers?", options: ["1,2,3","0,1,2,3","0,1,2","0,3"], a: 2, hint: "Starts at 0, stops BEFORE 3." },
      { q: "An infinite loop occurs when?", options: ["No break used","List is too big","Condition is never False","Using while loop"], a: 2, hint: "It never knows when to stop." },
      { q: "How to loop WITH index in Python?", options: ["for i in list:","enum()","enumerate()","for index in:"], a: 2, hint: "enumerate() gives both index and value." }
    ]
  },
  {
    id: 317, title: "MATCH MASTER", subtitle: "Loop Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "for loop",        match: "Iterates over a sequence (list/range)" },
      { concept: "while loop",      match: "Repeats while condition is True" },
      { concept: "break",           match: "Exits the loop immediately" },
      { concept: "continue",        match: "Skips to the next loop iteration" },
      { concept: "list[0]",         match: "Accesses the primary (first) element" },
      { concept: "list[-1]",        match: "Accesses the last element" },
      { concept: ".append()",       match: "Adds an element to the end" },
      { concept: "IndexError",      match: "Trying to access an invalid position" }
    ]
  },
  {
    id: 318, title: "ROBO YES/NO", subtitle: "List Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "Python lists can hold mixed data types (int, string, bool).", a: true },
      { q: "A while loop will crash if you use a True condition.", a: false },
      { q: "The break statement skips one cycle and continues the loop.", a: false },
      { q: "Python does not have a native do-while loop.", a: true },
      { q: "range(5) goes from 1 to 5.", a: false },
      { q: "Modifying 'x' inside 'for x in list:' modifies the list.", a: false },
      { q: "list[-1] safely returns the last item of a non-empty list.", a: true },
      { q: "It is safe to remove items from a list while looping over it.", a: false },
      { q: "Nested loops are illegal in Python.", a: false },
      { q: "Lists in Python are mutable (you can change their elements).", a: true }
    ]
  },
  {
    id: 319, title: "ALGO BUILDER", subtitle: "Sum Array", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Calculate the Sum of a List",
      steps: [
        { id: 1, text: "total = 0", order: 1 },
        { id: 2, text: "nums = [10, 20, 30]", order: 2 },
        { id: 3, text: "for n in nums:", order: 3 },
        { id: 4, text: "    total = total + n", order: 4 },
        { id: 5, text: "print(total)", order: 5 }
      ]
    }
  },
  {
    id: 320, title: "PYTHON SORTER", subtitle: "Loop Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["for", "i", "in", "range(5):"], answer: ["for", "i", "in", "range(5):"] },
      { tokens: ["nums", ".", "append(", "42", ")"], answer: ["nums", ".", "append(", "42", ")"] },
      { tokens: ["while", "x", "<", "10:"], answer: ["while", "x", "<", "10:"] }
    ]
  }
];
