import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 3 — PYTHON: "Loops & Arrays" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L3_FOUNDATION = [
  {
    id: 301, title: "LOOP", subtitle: "What is loop",
    icon: Repeat,
    content: "A loop is a programming tool that repeats a block of code multiple times automatically.",
    examples: [
      {
        title: "Repetition",
        explanation: "Doing the same thing over and over.",
        code: "for i in range(100):\n    print(\"Hello\")"
      },
      {
        title: "Efficiency",
        explanation: "Write once, run a thousand times.",
        code: "# No need to copy-paste code"
      },
      {
        title: "Automation",
        explanation: "Loops handle boring, repetitive tasks for you.",
        code: "# Automated data processing"
      }
    ],
    keyPoint: "Loops = Smart Repetition."
  },
  {
    id: 302, title: "FOR", subtitle: "for loop syntax",
    icon: Code,
    content: "The for loop is used when you know exactly how many times you want to repeat something.",
    examples: [
      {
        title: "Range",
        explanation: "Looping through a set of numbers.",
        code: "for i in range(5):\n    print(i) # 0, 1, 2, 3, 4"
      },
      {
        title: "Block",
        explanation: "Code inside the for loop must be indented.",
        code: "for x in range(3):\n    print(\"Looping...\")"
      },
      {
        title: "Variable",
        explanation: "The variable (like i) changes in each step.",
        code: "for i in range(3):\n    # i will be 0, then 1, then 2"
      }
    ],
    keyPoint: "for [var] in [sequence]:"
  },
  {
    id: 303, title: "WHILE", subtitle: "while loop",
    icon: Repeat,
    content: "A while loop repeats as long as a certain condition remains True.",
    examples: [
      {
        title: "Condition",
        explanation: "Check first, then run.",
        code: "while energy > 0:\n    play()\n    energy -= 1"
      },
      {
        title: "The Update",
        explanation: "You must change the condition inside, or it never stops.",
        code: "x = 0\nwhile x < 5:\n    x += 1"
      },
      {
        title: "Unknown Count",
        explanation: "Best used when you don't know how many loops are needed.",
        code: "while user_active:\n    wait()"
      }
    ],
    keyPoint: "while [condition]: [code]"
  },
  {
    id: 304, title: "DOWHILE", subtitle: "do-while (basic idea)",
    icon: ArrowRight,
    content: "A do-while loop runs the code once BEFORE checking the condition.",
    examples: [
      {
        title: "The Concept",
        explanation: "Run -> Check -> Repeat.",
        code: "# Python doesn't have 'do-while' directly"
      },
      {
        title: "Simulation",
        explanation: "Using while True and a break to mimic it.",
        code: "while True:\n    run_code()\n    if not condition: break"
      },
      {
        title: "Use Case",
        explanation: "Menu systems that must show at least once.",
        code: "# Show menu -> get input -> exit if 'q'"
      }
    ],
    keyPoint: "Run first, check later."
  },
  {
    id: 305, title: "CONDITIONS", subtitle: "Loop conditions",
    icon: Filter,
    content: "Loop conditions determine exactly when a loop should start and stop.",
    examples: [
      {
        title: "Entrance",
        explanation: "Condition is checked before entering the loop.",
        code: "x = 10\nwhile x < 5: # False - never enters"
      },
      {
        title: "Exit",
        explanation: "Condition becomes False to end the loop.",
        code: "while lives > 0:\n    # Game runs..."
      },
      {
        title: "Flexibility",
        explanation: "Any boolean expression can be a loop condition.",
        code: "while count < 10 and not found:"
      }
    ],
    keyPoint: "Condition controls the loop life."
  },
  {
    id: 306, title: "INFINITE", subtitle: "Infinite loop (concept)",
    icon: AlertCircle,
    content: "An infinite loop is a loop that never ends because its condition is always True.",
    examples: [
      {
        title: "The Mistake",
        explanation: "Forgetting to update the variable.",
        code: "x = 0\nwhile x < 5:\n    print(x) # x is always 0!"
      },
      {
        title: "The Intentional",
        explanation: "Sometimes used for servers or game engines with a 'break'.",
        code: "while True: # Always running"
      },
      {
        title: "The Crash",
        explanation: "Infinite loops can freeze programs and use all CPU power.",
        code: "# Computer goes BRRRRR..."
      }
    ],
    keyPoint: "Infinite = Condition is always True."
  },
  {
    id: 307, title: "NESTED", subtitle: "Nested loops (intro)",
    icon: Layers,
    content: "A nested loop is simply a loop inside of another loop.",
    examples: [
      {
        title: "Multiplication",
        explanation: "For every 1 outer loop, the inner loop runs completely.",
        code: "for i in range(3):\n    for j in range(2):\n        print(i, j)"
      },
      {
        title: "The Grid",
        explanation: "Used to build rows and columns.",
        code: "for row in range(5):\n    for col in range(5):\n        draw_pixel()"
      },
      {
        title: "Tracing",
        explanation: "3 outer * 2 inner = 6 total executions.",
        code: "# 0,0 | 0,1 | 1,0 | 1,1 | 2,0 | 2,1"
      }
    ],
    keyPoint: "Loop inside a loop."
  },
  {
    id: 308, title: "ARRAY", subtitle: "What is array",
    icon: Database,
    content: "An array (called a 'List' in Python) is an ordered collection of many values in one name.",
    examples: [
      {
        title: "The Bundle",
        explanation: "Group related items together.",
        code: "fruits = [\"Apple\", \"Banana\", \"Cherry\"]"
      },
      {
        title: "Dynamic",
        explanation: "Can grow or shrink as needed.",
        code: "inventory = [\"Sword\", \"Shield\"]"
      },
      {
        title: "Mixed Types",
        explanation: "Python lists can hold different types of data.",
        code: "data = [1, \"Hello\", True]"
      }
    ],
    keyPoint: "Array = List = Collection."
  },
  {
    id: 309, title: "DECLARE", subtitle: "Array declaration",
    icon: Code,
    content: "Declaration is the process of creating a new list using square brackets [].",
    examples: [
      {
        title: "Empty List",
        explanation: "Creating a container for future use.",
        code: "my_list = []"
      },
      {
        title: "Pre-filled",
        explanation: "Starting with values.",
        code: "scores = [10, 20, 30]"
      },
      {
        title: "Constructor",
        explanation: "Using the list() function.",
        code: "letters = list(\"ABC\") # ['A', 'B', 'C']"
      }
    ],
    keyPoint: "Use [ ] to declare."
  },
  {
    id: 310, title: "INDEX", subtitle: "Indexing (0-based)",
    icon: Hash,
    content: "Python starts counting at 0. The first item is always index 0.",
    examples: [
      {
        title: "The Start",
        explanation: "[10, 20, 30] -> index 0 contains 10.",
        code: "nums = [10, 20, 30]\nprint(nums[0]) # 10"
      },
      {
        title: "The Sequence",
        explanation: "Indices: 0, 1, 2, 3...",
        code: "print(nums[1]) # 20\nprint(nums[2]) # 30"
      },
      {
        title: "Reverse Index",
        explanation: "Python can count backwards from -1.",
        code: "print(nums[-1]) # 30 (the last one)"
      }
    ],
    keyPoint: "Standard: Count from zero."
  },
  {
    id: 311, title: "ACCESS", subtitle: "Accessing elements",
    icon: HelpCircle,
    content: "Accessing is the act of reading a value from a specific position in the list.",
    examples: [
      {
        title: "The Fetch",
        explanation: "Ask for value at position 2.",
        code: "names = [\"Ash\", \"Misty\", \"Brock\"]\nprint(names[2])"
      },
      {
        title: "Calculated Index",
        explanation: "Using math to find an index.",
        code: "last_index = len(names) - 1\nprint(names[last_index])"
      },
      {
        title: "IndexError",
        explanation: "Trying to reach an index that doesn't exist.",
        code: "# names[10] -> CRASH!"
      }
    ],
    keyPoint: "list[index] = Value."
  },
  {
    id: 312, title: "UPDATE", subtitle: "Updating elements",
    icon: Zap,
    content: "Updating means changing the value stored at a specific index.",
    examples: [
      {
        title: "The Swap",
        explanation: "Replace the old value with a new one.",
        code: "items = [\"Log\", \"Stick\"]\nitems[0] = \"Torch\""
      },
      {
        title: "In-Place Math",
        explanation: "Update based on the current value.",
        code: "scores = [100, 200]\nscores[0] += 50 # Now 150"
      },
      {
        title: "Append",
        explanation: "Adding a totally new item to the end.",
        code: "items.append(\"Rope\")"
      }
    ],
    keyPoint: "Assigning to index changes it."
  },
  {
    id: 313, title: "LOOP_ARRAY", subtitle: "Loop through array",
    icon: Repeat,
    content: "Combining loops and lists allows you to process entire collections of data.",
    examples: [
      {
        title: "For-In",
        explanation: "The easiest way to see everything.",
        code: "for fruit in fruits:\n    print(fruit)"
      },
      {
        title: "With Index",
        explanation: "Using range and len to track positions.",
        code: "for i in range(len(fruits)):\n    print(f\"#{i}: {fruits[i]}\")"
      },
      {
        title: "Transformation",
        explanation: "Applying changes to every item.",
        code: "for i in range(len(nums)):\n    nums[i] *= 2"
      }
    ],
    keyPoint: "Automate list processing."
  },
  {
    id: 314, title: "MISTAKES_ARR", subtitle: "Common array mistakes",
    icon: AlertCircle,
    content: "Common traps when working with collections in Python.",
    examples: [
      {
        title: "Out of Bounds",
        explanation: "Trying to access list[len(list)].",
        code: "nums = [1, 2, 3]\n# print(nums[3]) -> ERROR"
      },
      {
        title: "One-Off",
        explanation: "Thinking the first item is index 1.",
        code: "nums[1] # This is the SECOND item"
      },
      {
        title: "Append Error",
        explanation: "Forgetting brackets in declare, or misusing append.",
        code: "# nums.append(1, 2) -> ERROR"
      }
    ],
    keyPoint: "Watch your indices!"
  },
  {
    id: 315, title: "TRACE_ALL", subtitle: "Output tracing (loops + arrays)",
    icon: Shield,
    content: "The final step: tracing exactly how data flows through loops and lists.",
    examples: [
      {
        title: "The Sum Trace",
        explanation: "Total start 0. Add 10. Add 20. Total 30.",
        code: "total = 0\nfor x in [10, 20]:\n    total += x"
      },
      {
        title: "The Filter Trace",
        explanation: "Only numbers > 5 get printed.",
        code: "for n in [2, 8, 4]:\n    if n > 5: print(n)"
      },
      {
        title: "State Change",
        explanation: "Tracing the list as it mutates.",
        code: "a = [0, 0]\nfor i in range(2):\n    a[i] = i # a becomes [0, 1]"
      }
    ],
    keyPoint: "Predict the final state."
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
  },
  {
    id: 321, title: "CODING LAB", subtitle: "Loop 1-5", icon: Terminal, type: 'coding',
    gameData: {
      title: "For Loop Power",
      objective: "Use a for loop and range() to print numbers from 1 to 5.",
      starterCode: "# Write your for loop here\n",
      hints: ["for i in range(1, 6):", "print(i)"],
      validate: (logs) => logs.length >= 5 && logs.includes("1") && logs.includes("5")
    }
  },
  {
    id: 322, title: "CODING LAB", subtitle: "While Echo", icon: Zap, type: 'coding',
    gameData: {
      title: "Conditional Repeater",
      objective: "Use a while loop to print 'Coding' exactly 3 times.",
      starterCode: "count = 0\n# Write your while loop below\n",
      hints: ["while count < 3:", "Inside the loop, increment: count += 1"],
      validate: (logs) => logs.filter(l => l.includes("Coding")).length === 3
    }
  },
  {
    id: 323, title: "CODING LAB", subtitle: "List Picker", icon: Star, type: 'coding',
    gameData: {
      title: "Index Mastery",
      objective: "Given fruits = ['Apple', 'Banana', 'Cherry', 'Date'], print 'Cherry' using its index.",
      starterCode: "fruits = ['Apple', 'Banana', 'Cherry', 'Date']\n# Print 'Cherry' here\n",
      hints: ["Index 0 is Apple, 1 is Banana...", "Use print(fruits[2])"],
      validate: (logs) => logs.some(l => l.includes("Cherry"))
    }
  }
];
