import { Terminal, Code, Zap, Cpu, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Type, ToggleLeft } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 1 — PYTHON: "First Code" (13 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L1_FOUNDATION = [
  {
    id: 101, title: "STRUCTURE", subtitle: "Structure of a Python Program",
    icon: Layers,
    content: "A Python program is a simple .py file executed line-by-line. Unlike many other languages, it doesn't require a main() function to start.",
    examples: [
      {
        title: "The Single Line Program",
        explanation: "Python can run a single line of code with no overhead.",
        code: "print(\"Hello Python\")"
      },
      {
        title: "Sequential Execution",
        explanation: "Code runs from top to bottom, one statement at a time.",
        code: "print(\"Step 1: Initiation\")\nprint(\"Step 2: Analysis\")\nprint(\"Step 3: Completion\")"
      },
      {
        title: "Simple Logic Block",
        explanation: "Even simple logic can be written at the top level of a file.",
        code: "status = \"Active\"\nprint(f\"The system is currently {status}\")"
      }
    ],
    keyPoint: "Runs top to bottom. No special setup required."
  },
  {
    id: 102, title: "PRINT", subtitle: "Output Command",
    icon: Terminal,
    content: "The print() function is the primary way to output data to the user console.",
    examples: [
      {
        title: "Printing Strings",
        explanation: "Use single or double quotes to print text.",
        code: "print('Single quotes')\nprint(\"Double quotes\")"
      },
      {
        title: "Multiple Items",
        explanation: "Print multiple things separated by commas — Python adds a space automatically.",
        code: "print(\"Level:\", 5, \"Score:\", 1000)"
      },
      {
        title: "Numeric Output",
        explanation: "Numbers can be printed without any quotes.",
        code: "print(123456)\nprint(10 + 20)"
      }
    ],
    keyPoint: "print() sends data to the standard output."
  },
  {
    id: 103, title: "FORMAT", subtitle: "F-Strings & Formatting",
    icon: Code,
    content: "F-strings (Formatted String Literals) are the most modern and readable way to format text in Python.",
    examples: [
      {
        title: "Basic F-String",
        explanation: "Put variables inside curly braces {} within a string prefixed with f.",
        code: "player = \"Neo\"\nprint(f\"Welcome to the realm, {player}\")"
      },
      {
        title: "Math in F-Strings",
        explanation: "You can even perform simple math right inside the braces.",
        code: "level = 10\nprint(f\"Next level is {level + 1}\")"
      },
      {
        title: "Controlling Decimals",
        explanation: "Format floats to a specific number of decimal places.",
        code: "pi = 3.14159\nprint(f\"Pi rounded: {pi:.2f}\")"
      }
    ],
    keyPoint: "f'Text {variable}' is the standard for modern Python."
  },
  {
    id: 104, title: "VARIABLES", subtitle: "Dynamic Containers",
    icon: Hash,
    content: "Variables store data. Python is dynamically typed, meaning you don't need to specify the type yourself.",
    examples: [
      {
        title: "Assignment",
        explanation: "Use the = sign to store a value in a name.",
        code: "username = \"CyberKnight\"\nhealth = 100"
      },
      {
        title: "Dynamic Typing",
        explanation: "A variable can change from a number to text instantly.",
        code: "data = 42\ndata = \"Now I am a string\""
      },
      {
        title: "Reading Variables",
        explanation: "Simply use the name to access the stored value.",
        code: "x = 5\ny = x + 10\nprint(y) # Outputs 15"
      }
    ],
    keyPoint: "Name = Value. No int/str keywords needed!"
  },
  {
    id: 105, title: "NAMING", subtitle: "Variable Naming Rules",
    icon: Shield,
    content: "Names should be descriptive and follow Python's snake_case convention.",
    examples: [
      {
        title: "Snake Case",
        explanation: "Lowercase words separated by underscores.",
        code: "max_power_level = 9000\ncurrent_user_score = 150"
      },
      {
        title: "Allowed Characters",
        explanation: "Can use letters, numbers, and underscores, but cannot start with a number.",
        code: "_private_total = 10\ncount1 = 5\n# 1count = 10 (ERROR!)"
      },
      {
        title: "Case Sensitivity",
        explanation: "Python sees lowercase and uppercase names as different variables.",
        code: "score = 10\nScore = 20\nSCORE = 30\n# These are 3 different variables!"
      }
    ],
    keyPoint: "Lowercase and underscores (snake_case) is best practice."
  },
  {
    id: 106, title: "INT", subtitle: "Integers (Whole Numbers)",
    icon: Cpu,
    content: "Python handles whole numbers of any size automatically.",
    examples: [
      {
        title: "Unlimited Size",
        explanation: "Python integers can grow as large as your computer's memory.",
        code: "huge_number = 10**100\nprint(huge_number)"
      },
      {
        title: "Underscores",
        explanation: "Use underscores to make large numbers easier to read.",
        code: "trillion = 1_000_000_000_000"
      },
      {
        title: "Checking Types",
        explanation: "Use type() to confirm a variable is an integer.",
        code: "x = 5\nprint(type(x)) # <class 'int'>"
      }
    ],
    keyPoint: "Whole numbers, no limit on size."
  },
  {
    id: 107, title: "FLOAT", subtitle: "Floats (Decimals)",
    icon: Cpu,
    content: "Floats represent real numbers with decimal points.",
    examples: [
      {
        title: "Float Notation",
        explanation: "Any number with a dot . is a float.",
        code: "price = 19.99\ngravity = 9.8"
      },
      {
        title: "Scientific Notation",
        explanation: "Use 'e' for very large or small numbers.",
        code: "nano = 1e-9 # 0.000000001"
      },
      {
        title: "Integer to Float",
        explanation: "Adding a dot or using float() converts the type.",
        code: "f = float(5) # 5.0\nf2 = 5.0"
      }
    ],
    keyPoint: "Numbers with a decimal point. default precision."
  },
  {
    id: 108, title: "STRING", subtitle: "Handling Text",
    icon: Type,
    content: "Strings are sequences of characters. They are immutable (cannot be changed line-by-line).",
    examples: [
      {
        title: "Triple Quotes",
        explanation: "Use ''' or \"\"\" for text that spans multiple lines.",
        code: "multiline = '''Line 1\nLine 2\nLine 3'''"
      },
      {
        title: "Multiplication",
        explanation: "Multiplying a string repeats it!",
        code: "echo = \"Go! \" * 3 # \"Go! Go! Go! \""
      },
      {
        title: "Escaping",
        explanation: "Use backslash \\ to include special characters like quotes.",
        code: "quote = \"He said, \\\"Stay back!\\\"\""
      }
    ],
    keyPoint: "Strings are immutable. Triple quotes for multi-line."
  },
  {
    id: 109, title: "BOOLEAN", subtitle: "True or False",
    icon: ToggleLeft,
    content: "Booleans represent the two truth values of logic: True and False.",
    examples: [
      {
        title: "Capitalization",
        explanation: "Crucial: True and False MUST start with capital letters.",
        code: "connected = True\nready = False"
      },
      {
        title: "The bool() Function",
        explanation: "Check the truth of any value. Empty things are usually False.",
        code: "print(bool(0)) # False\nprint(bool(1)) # True\nprint(bool(\"\")) # False"
      },
      {
        title: "Logical Result",
        explanation: "Comparison operators always return a boolean.",
        code: "check = (10 < 5) # False"
      }
    ],
    keyPoint: "Boolean values start with Capital letters."
  },
  {
    id: 110, title: "ASSIGN", subtitle: "Multi-Assignment",
    icon: Zap,
    content: "Python has powerful assignment shortcuts beyond simple =.",
    examples: [
      {
        title: "Unpacking",
        explanation: "Assign multiple variables in one line.",
        code: "x, y, z = 1, 2, 3"
      },
      {
        title: "The Swap Trick",
        explanation: "Exchange values between variables without a temporary one.",
        code: "a = 5\nb = 10\na, b = b, a # a is 10, b is 5"
      },
      {
        title: "Same Value",
        explanation: "Give multiple variables the same initial value.",
        code: "p1 = p2 = p3 = 0"
      }
    ],
    keyPoint: "= assigns a value. a, b = b, a swaps them."
  },
  {
    id: 111, title: "INPUT", subtitle: "User Input",
    icon: HelpCircle,
    content: "The input() function stops the program and waits for the user to type something.",
    examples: [
      {
        title: "Basic Prompt",
        explanation: "Ask the user a question.",
        code: "name = input(\"Enter username: \")"
      },
      {
        title: "Number Input",
        explanation: "input() always gives a string. Wrap it in int() to get a number.",
        code: "age = int(input(\"Enter age: \"))"
      },
      {
        title: "Float Input",
        explanation: "Use float() if the user might type decimals.",
        code: "height = float(input(\"Enter height (m): \"))"
      }
    ],
    keyPoint: "input() always returns a string. Cast it if needed!"
  },
  {
    id: 112, title: "COMMENTS", subtitle: "Writing Notes",
    icon: Code,
    content: "Comments help explain your code to yourself and others.",
    examples: [
      {
        title: "The Hash Symbol",
        explanation: "Single line comments start with #.",
        code: "# This is ignored by Python\nx = 1 # Inline comment"
      },
      {
        title: "Temporary Disable",
        explanation: "Use # to 'comment out' code you don't want to run.",
        code: "# print(\"This won't run\")\nprint(\"This will\")"
      },
      {
        title: "Docstrings",
        explanation: "Strings at the top of functions meant for documentation.",
        code: "def quest():\n    \"\"\"Official Quest Log\"\"\"\n    pass"
      }
    ],
    keyPoint: "# for short notes. Docstrings for formal documentation."
  },
  {
    id: 113, title: "KEYWORDS", subtitle: "Reserved Keywords",
    icon: Star,
    content: "Python has a set of protected words that have built-in meanings.",
    examples: [
      {
        title: "Identifying Keywords",
        explanation: "Common ones include: for, while, if, True, None, def.",
        code: "# You can't use these as names:\nwhile = 5 # SyntaxError!"
      },
      {
        title: "Lowercase vs Uppercase",
        explanation: "Most keywords are lowercase, except True, False, and None.",
        code: "true = 5 # OK (variable)\nTrue = 5 # ERROR (keyword)"
      },
      {
        title: "Importing Keywords",
        explanation: "You can see all keywords with the keyword module.",
        code: "import keyword\nprint(keyword.kwlist)"
      }
    ],
    keyPoint: "35 protected words. Case sensitive!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 1 — PYTHON ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L1_TESTS = [
  {
    id: 113, title: "MCQ ADVENTURE", subtitle: "First Code Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does print('Hello') do?",                     options: ["Stores 'Hello'","Displays Hello on screen","Deletes Hello","Reads input"],       a: 1, hint: "print() is Python's output command." },
      { q: "Which is a valid Python variable name?",           options: ["2name","my-var","_score","class"],                                                a: 2, hint: "Must start with letter or underscore." },
      { q: "What type is: x = 3.14?",                         options: ["int","str","float","bool"],                                                       a: 2, hint: "It has a decimal point." },
      { q: "What type is: name = 'Alice'?",                   options: ["int","str","float","bool"],                                                       a: 1, hint: "Text in quotes = string." },
      { q: "What type is: is_on = True?",                     options: ["int","str","float","bool"],                                                       a: 3, hint: "True/False are boolean values." },
      { q: "input() always returns what type?",               options: ["int","float","str","bool"],                                                       a: 2, hint: "Always a string — convert if needed!" },
      { q: "Which is a Python comment?",                      options: ["// comment","/* comment */","# comment","-- comment"],                            a: 2, hint: "Python uses the # symbol." },
      { q: "What is an f-string?",                            options: ["A file type","Format string with {}","A function","A boolean"],                   a: 1, hint: "f'Hello {name}'" },
      { q: "Can Python variables change type?",               options: ["No","Yes, dynamically typed","Only with cast","Never"],                           a: 1, hint: "x=5 then x='hi' is valid." },
      { q: "Which is a Python keyword?",                      options: ["score","_name","while","value"],                                                  a: 2, hint: "Reserved words can't be variable names." },
      { q: "Output of: print(2 + 3)?",                        options: ["'2+3'","23","5","Error"],                                                         a: 2, hint: "Python evaluates math inside print()." },
      { q: "How to convert input() to integer?",              options: ["input(int)","str(input())","int(input())","float(str())"],                        a: 2, hint: "Wrap with int()." }
    ]
  },
  {
    id: 114, title: "MATCH MASTER", subtitle: "Type Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "print()",    match: "Outputs text to screen" },
      { concept: "int",        match: "Whole number type" },
      { concept: "float",      match: "Decimal number type" },
      { concept: "str",        match: "Text sequence type" },
      { concept: "bool",       match: "True or False type" },
      { concept: "input()",    match: "Reads keyboard input (returns str)" },
      { concept: "# comment",  match: "Single-line code comment" },
      { concept: "f-string",   match: "Formatted string with {variables}" }
    ]
  },
  {
    id: 115, title: "ROBO YES/NO", subtitle: "Syntax Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "Python is case-sensitive (Name ≠ name).",              a: true  },
      { q: "print() requires a semicolon in Python.",              a: false },
      { q: "Variables in Python must declare a type first.",       a: false },
      { q: "input() always returns a string.",                     a: true  },
      { q: "3.14 is a float in Python.",                          a: true  },
      { q: "True and true are the same in Python.",               a: false },
      { q: "# is used for single-line comments in Python.",       a: true  },
      { q: "Variable names can start with a number in Python.",   a: false },
      { q: "Python programs need a main() function to start.",    a: false },
      { q: "f-strings allow embedding variables in strings.",     a: true  }
    ]
  },
  {
    id: 116, title: "ALGO BUILDER", subtitle: "Program Order", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Write a Python 'Hello User' Program",
      steps: [
        { id: 1, text: "Open a new .py file",                     order: 1 },
        { id: 2, text: "Write: name = input('Enter name: ')",    order: 2 },
        { id: 3, text: "Write: print(f'Hello, {name}!')",        order: 3 },
        { id: 4, text: "Save the file",                           order: 4 },
        { id: 5, text: "Run with: python filename.py",            order: 5 }
      ]
    }
  },
  {
    id: 117, title: "PYTHON SORTER", subtitle: "Code Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["name", "=", "input(", "'Enter name: '", ")"],          answer: ["name", "=", "input(", "'Enter name: '", ")"] },
      { tokens: ["print(", "f'Hello", "{name}!'", ")"],                   answer: ["print(", "f'Hello", "{name}!'", ")"] },
      { tokens: ["age", "=", "int(", "input(", "'Age: '", ")", ")"],     answer: ["age", "=", "int(", "input(", "'Age: '", ")", ")"] }
    ]
  }
];
