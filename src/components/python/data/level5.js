import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 5 — PYTHON: "Core Problem Solving" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L5_FOUNDATION = [
  {
    id: 501, title: "STRINGS", subtitle: "Strings (multi-line, quote types)",
    icon: Type,
    content: "Python strings can be defined in multiple ways to handle different text needs.",
    examples: [
      {
        title: "Quote Types",
        explanation: "Use 'single' or \"double\" quotes interchangeably.",
        code: "s1 = 'Hello'\ns2 = \"World\""
      },
      {
        title: "Multi-line",
        explanation: "Use triple quotes for text that spans many lines.",
        code: "msg = \"\"\"Line 1\nLine 2\nLine 3\"\"\""
      },
      {
        title: "Quotes in Quotes",
        explanation: "Mix quote types to include quotes in your text.",
        code: "msg = \"He said 'Hi'\""
      }
    ],
    keyPoint: "Triple quotes for multi-line text."
  },
  {
    id: 502, title: "METHODS", subtitle: "String methods (.upper, .lower)",
    icon: RefreshCw,
    content: "Methods are built-in actions you can perform on strings to change their appearance.",
    examples: [
      {
        title: "Casing",
        explanation: "Change text to all caps or all lowercase.",
        code: "name = \"Ash\"\nprint(name.upper()) # ASH\nprint(name.lower()) # ash"
      },
      {
        title: "Cleaning",
        explanation: "Strip removes extra spaces from the ends.",
        code: "text = \"  hello  \"\nprint(text.strip()) # \"hello\""
      },
      {
        title: "Replacing",
        explanation: "Swap one piece of text for another.",
        code: "s = \"I like Java\"\nprint(s.replace(\"Java\", \"Python\"))"
      }
    ],
    keyPoint: "Methods are called using a dot (.)"
  },
  {
    id: 503, title: "SLICING", subtitle: "String slicing (substrings)",
    icon: Filter,
    content: "Slicing allows you to 'cut out' a specific part of a string using indices.",
    examples: [
      {
        title: "The Slice",
        explanation: "[start:stop] - starts at 'start', stops BEFORE 'stop'.",
        code: "word = \"Python\"\nprint(word[0:2]) # \"Py\""
      },
      {
        title: "Shorthand",
        explanation: "Leave a side blank to go from/to the very end.",
        code: "print(word[:3]) # \"Pyt\"\nprint(word[2:]) # \"thon\""
      },
      {
        title: "Step",
        explanation: "The third number [start:stop:step] skips characters.",
        code: "print(word[::2]) # \"Pto\""
      }
    ],
    keyPoint: "start:stop:step"
  },
  {
    id: 504, title: "ESCAPE", subtitle: "Escape characters (\\n, \\t)",
    icon: Zap,
    content: "Escape characters allow you to include special formatting inside your strings.",
    examples: [
      {
        title: "New Line",
        explanation: "\\n jumps to the next line.",
        code: "print(\"Line 1\\nLine 2\")"
      },
      {
        title: "Tab",
        explanation: "\\t adds a large space (like the Tab key).",
        code: "print(\"Name:\\tAsh\")"
      },
      {
        title: "The Backslash",
        explanation: "To print a real backslash, use two of them.",
        code: "print(\"Path: C:\\\\Users\")"
      }
    ],
    keyPoint: "Backslash \\ is the escape key."
  },
  {
    id: 505, title: "TUPLES", subtitle: "Introduction to Tuples",
    icon: Layers,
    content: "A tuple is a collection of items that is ordered and cannot be changed (immutable).",
    examples: [
      {
        title: "The Pack",
        explanation: "Use parentheses () to create a tuple.",
        code: "point = (10, 20)"
      },
      {
        title: "Unpacking",
        explanation: "Extracting tuple values into separate variables.",
        code: "x, y = point"
      },
      {
        title: "Mixed Data",
        explanation: "Tuples can hold different types of data.",
        code: "user = (\"Ash\", 10, True)"
      }
    ],
    keyPoint: "Tuples = Constant Lists."
  },
  {
    id: 506, title: "T_ACCESS", subtitle: "Accessing Tuples",
    icon: HelpCircle,
    content: "Items in a tuple are accessed using index numbers, just like lists.",
    examples: [
      {
        title: "By Index",
        explanation: "Getting the first item (index 0).",
        code: "colors = (\"Red\", \"Green\")\nprint(colors[0])"
      },
      {
        title: "By Slice",
        explanation: "Tuples support slicing just like strings and lists.",
        code: "print(colors[0:1])"
      },
      {
        title: "Finding",
        explanation: "Checking if an item exists in the tuple.",
        code: "if \"Red\" in colors: print(\"Found!\")"
      }
    ],
    keyPoint: "tuple[index] = Read-only access."
  },
  {
    id: 507, title: "T_IMMUTABLE", subtitle: "Immutable nature of Tuples",
    icon: Shield,
    content: "The biggest difference between lists and tuples: Tuples CANNOT be modified.",
    examples: [
      {
        title: "No Change",
        explanation: "You cannot overwrite an item in a tuple.",
        code: "t = (1, 2)\n# t[0] = 5 -> ERROR!"
      },
      {
        title: "No Growth",
        explanation: "You cannot add or remove items from a tuple.",
        code: "# t.append(3) -> ERROR!"
      },
      {
        title: "Why Use It?",
        explanation: "Great for data that should never change (like coordinates).",
        code: "DAYS_OF_WEEK = (\"Mon\", \"Tue\", ...)"
      }
    ],
    keyPoint: "Locked Data = Safety."
  },
  {
    id: 508, title: "DICTS", subtitle: "Introduction to Dictionaries",
    icon: Braces,
    content: "A Dictionary is a collection of data stored in 'Key: Value' pairs.",
    examples: [
      {
        title: "The Map",
        explanation: "Use curly braces {} to create a dictionary.",
        code: "player = {\"name\": \"Ash\", \"level\": 10}"
      },
      {
        title: "Word/Definition",
        explanation: "Think of it like a real dictionary: Word is the Key, Definition is the Value.",
        code: "dict = {\"Key\": \"Value\"}"
      },
      {
        title: "Uniqueness",
        explanation: "Keys must be unique (you can't have two 'name' keys).",
        code: "# name: Ash, name: Red -> Second overwrites first"
      }
    ],
    keyPoint: "Dict = Key-Value Pair."
  },
  {
    id: 509, title: "KEYS", subtitle: "Key-Value pairs (concept)",
    icon: Activity,
    content: "Keys are the 'labels' and Values are the 'data' stored under those labels.",
    examples: [
      {
        title: "Labeling",
        explanation: "Labeling health as 100.",
        code: "stats = {\"hp\": 100, \"mp\": 50}"
      },
      {
        title: "Multiple Types",
        explanation: "Values can be strings, numbers, lists, or even other dicts.",
        code: "data = {\"id\": 1, \"active\": True}"
      },
      {
        title: "Fast Lookup",
        explanation: "Dictionaries are optimized to find values instantly using their keys.",
        code: "# Constant time lookup - O(1)"
      }
    ],
    keyPoint: "Label -> Data."
  },
  {
    id: 510, title: "D_ACCESS", subtitle: "Accessing Dictionary values",
    icon: Search,
    content: "To get a value, you use its Key inside of square brackets.",
    examples: [
      {
        title: "Getting Value",
        explanation: "Pass the key name to see the value.",
        code: "user = {\"id\": \"A1\"}\nprint(user[\"id\"]) # A1"
      },
      {
        title: ".get() method",
        explanation: "A safer way to get data - returns None if key is missing (instead of crashing).",
        code: "print(user.get(\"name\")) # None"
      },
      {
        title: "Missing Key",
        explanation: "Trying to access a key that doesn't exist causes a KeyError.",
        code: "# user[\"age\"] -> CRASH!"
      }
    ],
    keyPoint: "dict[key] = Value."
  },
  {
    id: 511, title: "D_UPDATE", subtitle: "Updating Dictionaries",
    icon: RefreshCw,
    content: "Dictionaries are mutable. You can change values or add new ones at any time.",
    examples: [
      {
        title: "The Update",
        explanation: "Giving a key a new value.",
        code: "player = {\"score\": 10}\nplayer[\"score\"] = 20 # Now 20"
      },
      {
        title: "Adding New",
        explanation: "Simply assign to a key that doesn't exist yet.",
        code: "player[\"rank\"] = \"Hero\" # Added to dict"
      },
      {
        title: "Removing",
        explanation: "Use 'del' to remove a specific pair.",
        code: "del player[\"rank\"]"
      }
    ],
    keyPoint: "Add or Change via assignment."
  },
  {
    id: 512, title: "D_MISTAKES", subtitle: "Common mistakes in Data Structures",
    icon: AlertCircle,
    content: "Common traps when managing complex data in Python.",
    examples: [
      {
        title: "KeyError",
        explanation: "Accessing a dictionary key that hasn't been created yet.",
        code: "d = {}\n# print(d[\"x\"]) -> Error"
      },
      {
        title: "Case Sensitivity",
        explanation: "Keys \"Name\" and \"name\" are treated as different things.",
        code: "d = {\"a\": 1}\n# print(d[\"A\"]) -> Error"
      },
      {
        title: "Tuple Mutation",
        explanation: "Thinking you can change a tuple like a list.",
        code: "t = (1, 2)\n# t[0] = 5 -> Error"
      }
    ],
    keyPoint: "Check your keys and mutability."
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
  },
  {
    id: 521, title: "CODING LAB", subtitle: "String Shift", icon: Type, type: 'coding',
    gameData: {
      title: "Data Transformation",
      objective: "Given s = 'python', transform it to uppercase using .upper() and print it.",
      starterCode: "s = 'python'\n# Transform and print here\n",
      hints: ["s.upper() returns 'PYTHON'", "print(s.upper())"],
      validate: (logs) => logs.some(l => l.includes("PYTHON"))
    }
  },
  {
    id: 522, title: "CODING LAB", subtitle: "Tuple Access", icon: Layers, type: 'coding',
    gameData: {
      title: "Immutable Retrieval",
      objective: "Given point = (10, 20), print the second element (20).",
      starterCode: "point = (10, 20)\n# Access and print index 1\n",
      hints: ["Tuples use index like lists", "print(point[1])"],
      validate: (logs) => logs.some(l => l.includes("20"))
    }
  },
  {
    id: 523, title: "CODING LAB", subtitle: "Dictionary Key", icon: Search, type: 'coding',
    gameData: {
      title: "Map Lookup",
      objective: "Given hero = {'hp': 100, 'lvl': 5}, print the value associated with 'hp'.",
      starterCode: "hero = {'hp': 100, 'lvl': 5}\n# Access 'hp' and print it\n",
      hints: ["hero['hp']", "Use brackets for keys"],
      validate: (logs) => logs.some(l => l.includes("100"))
    }
  }
];
