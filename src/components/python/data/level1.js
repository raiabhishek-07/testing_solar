import { Terminal, Code, Zap, Cpu, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Type, ToggleLeft } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 1 — PYTHON: "First Code" (13 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L1_FOUNDATION = [
  {
    id: 101, title: "STRUCTURE", subtitle: "Structure of a basic program",
    icon: Layout,
    content: "A Python program is a sequence of instructions executed one by one from top to bottom.",
    examples: [
      {
        title: "Top-Down",
        explanation: "Python starts at line 1 and moves down.",
        code: "print('Line 1')\nprint('Line 2')"
      },
      {
        title: "No Boilerplate",
        explanation: "You don't need complex 'main' functions to start.",
        code: "print('Just start coding!')"
      },
      {
        title: "File Extension",
        explanation: "Python files always end with .py",
        code: "# script.py"
      }
    ],
    keyPoint: "Execution is sequential and direct."
  },
  {
    id: 102, title: "PRINT", subtitle: "Print statements",
    icon: MessageSquare,
    content: "The print() function sends data to your screen so you can see what's happening.",
    examples: [
      {
        title: "Text",
        explanation: "Use quotes for words.",
        code: "print(\"Hello\")"
      },
      {
        title: "Numbers",
        explanation: "No quotes needed for math.",
        code: "print(10 + 5)"
      },
      {
        title: "Multiple",
        explanation: "Use commas to print several things.",
        code: "print(\"Score:\", 100)"
      }
    ],
    keyPoint: "print() = Output."
  },
  {
    id: 103, title: "FORMAT", subtitle: "Output formatting",
    icon: Filter,
    content: "Formatting makes your output look professional and easy to read.",
    examples: [
      {
        title: "F-Strings",
        explanation: "Insert variables directly into text.",
        code: "name = \"Ash\"\nprint(f\"Hi {name}\")"
      },
      {
        title: "Joining Text",
        explanation: "Using + to glue strings together.",
        code: "print(\"Part 1 \" + \"Part 2\")"
      },
      {
        title: "New Lines",
        explanation: "Use \\n to jump to a new line.",
        code: "print(\"Line 1\\nLine 2\")"
      }
    ],
    keyPoint: "F-strings are the best way to format."
  },
  {
    id: 104, title: "VARIABLES", subtitle: "Variables (what & why)",
    icon: Box,
    content: "A variable is a named container that stores data for later use.",
    examples: [
      {
        title: "Storage",
        explanation: "Saving a value with a name.",
        code: "lives = 3"
      },
      {
        title: "Retrieval",
        explanation: "Using the name to get the value back.",
        code: "print(lives) # Shows 3"
      },
      {
        title: "Efficiency",
        explanation: "Change the value in one place, it updates everywhere.",
        code: "lives = lives - 1"
      }
    ],
    keyPoint: "Variable = Label for data."
  },
  {
    id: 105, title: "NAMING", subtitle: "Naming rules for variables",
    icon: Shield,
    content: "Variable names must follow specific rules to be valid in Python.",
    examples: [
      {
        title: "Valid Names",
        explanation: "Start with a letter or underscore.",
        code: "score = 0\n_id = 1"
      },
      {
        title: "Invalid Names",
        explanation: "Cannot start with a number or use spaces.",
        code: "# 1score = 0 (BAD)\n# my score = 0 (BAD)"
      },
      {
        title: "Snake Case",
        explanation: "Use underscores for multiple words.",
        code: "high_score_total = 500"
      }
    ],
    keyPoint: "Letters, numbers, underscores only."
  },
  {
    id: 106, title: "DATATYPES", subtitle: "Data types (int, float, string, boolean)",
    icon: Database,
    content: "Python has different types of data for different purposes.",
    examples: [
      {
        title: "Numbers",
        explanation: "int (whole) and float (decimal).",
        code: "age = 10 # int\npi = 3.14 # float"
      },
      {
        title: "Text",
        explanation: "string (text in quotes).",
        code: "msg = \"Hello\" # str"
      },
      {
        title: "Logic",
        explanation: "boolean (True or False).",
        code: "is_won = False # bool"
      }
    ],
    keyPoint: "Type determines what you can do with data."
  },
  {
    id: 107, title: "ASSIGN", subtitle: "Assigning values",
    icon: Zap,
    content: "Assignment uses the = operator to put data into a variable.",
    examples: [
      {
        title: "Basic Assignment",
        explanation: "Right side moves to the left side.",
        code: "x = 5"
      },
      {
        title: "Variable to Variable",
        explanation: "Copying value from one container to another.",
        code: "y = x"
      },
      {
        title: "Math Assignment",
        explanation: "Solving an equation then storing result.",
        code: "total = 10 + 20"
      }
    ],
    keyPoint: "= means 'stores', not 'equals'."
  },
  {
    id: 108, title: "REASSIGN", subtitle: "Reassigning variables",
    icon: Repeat,
    content: "Variables can change their stored value at any time.",
    examples: [
      {
        title: "The Update",
        explanation: "Giving a new value to an old name.",
        code: "score = 0\nscore = 10 # Now it is 10"
      },
      {
        title: "Self-Update",
        explanation: "Using the old value to calculate the new one.",
        code: "level = 1\nlevel = level + 1 # Now 2"
      },
      {
        title: "Shortcut",
        explanation: "Using += as a quick way to update.",
        code: "gold = 50\ngold += 10 # Same as gold = gold + 10"
      }
    ],
    keyPoint: "Variables are 'variable' (they change)."
  },
  {
    id: 109, title: "INPUT", subtitle: "Basic input (concept only)",
    icon: ArrowRight,
    content: "Input is how a program gets information from the outside world.",
    examples: [
      {
        title: "The Command",
        explanation: "In Python, we use input().",
        code: "name = input(\"Name?\")"
      },
      {
        title: "Wait State",
        explanation: "The program stops and waits for the user.",
        code: "# Program pauses here..."
      },
      {
        title: "String Return",
        explanation: "Input always comes in as text.",
        code: "age = input() # User types 10, but it is '10'"
      }
    ],
    keyPoint: "Input = Data entering the system."
  },
  {
    id: 110, title: "COMMENTS", subtitle: "Comments in code",
    icon: Info,
    content: "Comments are notes for humans that the computer ignores.",
    examples: [
      {
        title: "Single Line",
        explanation: "Use the # symbol.",
        code: "# This is a comment"
      },
      {
        title: "Explanations",
        explanation: "Describe why you wrote certain code.",
        code: "x = 10 # Starting health"
      },
      {
        title: "Disabling Code",
        explanation: "Hide code without deleting it.",
        code: "# print(\"Hidden\")"
      }
    ],
    keyPoint: "# is for humans, not machines."
  },
  {
    id: 111, title: "KEYWORDS", subtitle: "Keywords (basic idea)",
    icon: Shield,
    content: "Keywords are special words reserved by Python for its own use.",
    examples: [
      {
        title: "The List",
        explanation: "Words like if, for, while, and def.",
        code: "# You cannot name your variable 'if'"
      },
      {
        title: "Booleans",
        explanation: "True and False are keywords.",
        code: "is_on = True"
      },
      {
        title: "Function Defs",
        explanation: "def is used to create actions.",
        code: "def move(): pass"
      }
    ],
    keyPoint: "Don't use keywords as variable names."
  },
  {
    id: 112, title: "CASE", subtitle: "Case sensitivity",
    icon: AlertCircle,
    content: "In Python, capitalization matters. 'Score' is different from 'score'.",
    examples: [
      {
        title: "The Identity",
        explanation: "X and x are treated as totally separate containers.",
        code: "score = 100\nScore = 200\nprint(score) # Shows 100"
      },
      {
        title: "Keyword Case",
        explanation: "Keywords must use the exact correct case.",
        code: "# true = False (ERROR, should be True)"
      },
      {
        title: "Consistency",
        explanation: "Always use the same name you created.",
        code: "MyVar = 5\nprint(myvar) # ERROR: myvar not found"
      }
    ],
    keyPoint: "Python is very picky about case."
  },
  {
    id: 113, title: "PREDICT", subtitle: "Simple output prediction",
    icon: HelpCircle,
    content: "Prediction is the skill of guessing what a code block will do before running it.",
    examples: [
      {
        title: "Tracing",
        explanation: "Follow variables as they change.",
        code: "x = 5\nx = 10\nprint(x) # Prediction: 10"
      },
      {
        title: "Math Logic",
        explanation: "Calculating results in your head.",
        code: "a = 2\nb = 3\nprint(a + b) # Prediction: 5"
      },
      {
        title: "String Join",
        explanation: "Predicting how text glues together.",
        code: "print(\"Hi \" + \"User\") # Prediction: Hi User"
      }
    ],
    keyPoint: "Think like the computer."
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
  },
  {
    id: 118, title: "CODING LAB", subtitle: "Print Protocol", icon: Terminal, type: 'coding',
    gameData: {
      title: "Standard Output",
      objective: "Use the print() function to display: 'Python is fun'",
      starterCode: "# Write your code below\n",
      hints: ["The function is print()", "Put text inside quotes: \"Python is fun\""],
      validate: (logs) => logs.some(l => l.includes("Python is fun"))
    }
  },
  {
    id: 119, title: "CODING LAB", subtitle: "Variable Shift", icon: Zap, type: 'coding',
    gameData: {
      title: "Data Containers",
      objective: "Create a variable named 'score' and set it to 100. Then print it.",
      starterCode: "# Create variable 'score' here\n",
      hints: ["score = 100", "Use print(score)"],
      validate: (logs) => logs.some(l => l.includes("100"))
    }
  },
  {
    id: 120, title: "CODING LAB", subtitle: "The F-String", icon: Star, type: 'coding',
    gameData: {
      title: "Formatted Output",
      objective: "Given name = 'Bug Hunter', print: 'Game: Bug Hunter' using an f-string.",
      starterCode: "name = 'Bug Hunter'\n# Print the f-string below\n",
      hints: ["Use f'Game: {name}'", "Don't forget the print()"],
      validate: (logs) => logs.some(l => l.includes("Game: Bug Hunter"))
    }
  }
];
