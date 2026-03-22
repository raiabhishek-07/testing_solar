import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 4 — PYTHON: "Strings & Functions" (14 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L4_FOUNDATION = [
  {
    id: 401, title: "WHAT", subtitle: "What is function",
    icon: Braces,
    content: "A function is a reusable block of code designed to perform a specific task.",
    examples: [
      {
        title: "The Pack",
        explanation: "Grouping instructions under one name.",
        code: "def shout():\n    print(\"HEY!\")"
      },
      {
        title: "Mini-Program",
        explanation: "Like a recipe you can follow whenever you need it.",
        code: "# One definition, many uses"
      },
      {
        title: "Organization",
        explanation: "Keeps your main code clean and easy to read.",
        code: "# move_player()\n# check_collision()"
      }
    ],
    keyPoint: "Function = Reusable Action."
  },
  {
    id: 402, title: "CREATE", subtitle: "Creating a function",
    icon: Code,
    content: "Creating a function is called 'defining'. In Python, we use the 'def' keyword.",
    examples: [
      {
        title: "Definition",
        explanation: "Start with def, then the name, then ().",
        code: "def my_move():\n    print(\"Moving...\")"
      },
      {
        title: "Colon & Indent",
        explanation: "Like loops and if, functions need a colon and spaces.",
        code: "def say_hi():\n    # Body starts here"
      },
      {
        title: "Placement",
        explanation: "Usually defined at the top of your script.",
        code: "# def comes before the call"
      }
    ],
    keyPoint: "def name(): [indent] [code]"
  },
  {
    id: 403, title: "CALL", subtitle: "Calling a function",
    icon: Zap,
    content: "Defining a function doesn't run it. You 'call' the function to execute its code.",
    examples: [
      {
        title: "The Trigger",
        explanation: "Type the name followed by parentheses.",
        code: "def hi(): print(\"Hi\")\nhi() # The call"
      },
      {
        title: "Multiple Calls",
        explanation: "You can run the same function as many times as you want.",
        code: "hi()\nhi()\nhi()"
      },
      {
        title: "Parentheses",
        explanation: "Even if it's empty, you MUST use the ().",
        code: "# hi -> shows the function object\n# hi() -> runs the function"
      }
    ],
    keyPoint: "Call = name()."
  },
  {
    id: 404, title: "PARAMS", subtitle: "Function parameters",
    icon: Terminal,
    content: "Parameters are placeholders that allow functions to receive data when they are called.",
    examples: [
      {
        title: "Placeholders",
        explanation: "Putting a name inside the parentheses.",
        code: "def greet(player):\n    print(f\"Hi {player}\")"
      },
      {
        title: "Requirements",
        explanation: "The function now 'expects' one item of data.",
        code: "greet(\"Ash\")"
      },
      {
        title: "Multiple Params",
        explanation: "Functions can have many placeholders.",
        code: "def add(a, b):\n    print(a + b)"
      }
    ],
    keyPoint: "Variable in definition."
  },
  {
    id: 405, title: "ARGS", subtitle: "Function arguments",
    icon: Code,
    content: "Arguments are the actual pieces of data you 'pass' into the function's parameters.",
    examples: [
      {
        title: "The Data",
        explanation: "The real value used in the call.",
        code: "def move(steps):\n    print(steps)\n\nmove(5) # 5 is the argument"
      },
      {
        title: "Position",
        explanation: "Arguments match parameters in the order they are written.",
        code: "def info(name, age):\n    # name=Ash, age=10\ninfo(\"Ash\", 10)"
      },
      {
        title: "Literal vs Variable",
        explanation: "Arguments can be raw data or existing variables.",
        code: "x = \"Neo\"\ngreet(x) # x's value is the argument"
      }
    ],
    keyPoint: "Value in the call."
  },
  {
    id: 406, title: "RETURN", subtitle: "return statement",
    icon: ArrowRight,
    content: "Returns allow a function to send data back to the place where it was called.",
    examples: [
      {
        title: "Sending Back",
        explanation: "Using return instead of print.",
        code: "def double(x):\n    return x * 2"
      },
      {
        title: "The Catch",
        explanation: "Storing the result of a function in a variable.",
        code: "result = double(10)\nprint(result) # 20"
      },
      {
        title: "Early Exit",
        explanation: "A function stops instantly when it hits a return.",
        code: "def test():\n    return \"Done\"\n    print(\"Hidden\")"
      }
    ],
    keyPoint: "Return = Result of function."
  },
  {
    id: 407, title: "SCOPE", subtitle: "Scope (Home vs Outside)",
    icon: Shield,
    content: "Scope determines where a variable can be seen and used. Inside vs Outside.",
    examples: [
      {
        title: "Local (Home)",
        explanation: "Variables created inside a function stay inside.",
        code: "def f(): x = 5\nprint(x) # ERROR: x is local to f"
      },
      {
        title: "Global (Outside)",
        explanation: "Variables outside are visible but hard to change inside.",
        code: "y = 10\ndef f(): print(y) # Works"
      },
      {
        title: "The Wall",
        explanation: "Functions act like private houses for their data.",
        code: "# Local variables die when function ends"
      }
    ],
    keyPoint: "Local is private, Global is public."
  },
  {
    id: 408, title: "WHY", subtitle: "Why use functions",
    icon: Star,
    content: "Functions help you solve complex problems by breaking them into manageable pieces.",
    examples: [
      {
        title: "DRY",
        explanation: "Don't Repeat Yourself. Fix bugs in one place.",
        code: "# One function to calculate tax\n# Use it 100 times"
      },
      {
        title: "Readability",
        explanation: "If code is long, give sections names like action_move().",
        code: "# main() -> load() -> play() -> save()"
      },
      {
        title: "Teamwork",
        explanation: "One person writes a function, others can use it without knowing how it works.",
        code: "# just call render_3d()"
      }
    ],
    keyPoint: "Reuse, Read, Repair."
  },
  {
    id: 409, title: "BUILTIN", subtitle: "Built-in functions (range, len)",
    icon: Cpu,
    content: "Python comes with many pre-made functions that help you every day.",
    examples: [
      {
        title: "len()",
        explanation: "Gives the total count of items in a list or string.",
        code: "print(len(\"Hi\")) # Output: 2"
      },
      {
        title: "range()",
        explanation: "Generates a sequence of numbers for loops.",
        code: "for i in range(3): # 0, 1, 2"
      },
      {
        title: "type()",
        explanation: "Tells you what kind of data you are looking at.",
        code: "print(type(5)) # Output: <class 'int'>"
      }
    ],
    keyPoint: "Tools ready to use."
  },
  {
    id: 410, title: "IO_FUNC", subtitle: "Input/Output in functions",
    icon: Layers,
    content: "Functions can interact with users through input and print commands.",
    examples: [
      {
        title: "Input Inside",
        explanation: "Getting user data inside the function block.",
        code: "def ask(): name = input(\"?\")"
      },
      {
        title: "Print Inside",
        explanation: "Showing results immediately.",
        code: "def shout(msg): print(msg + \"!\")"
      },
      {
        title: "The Flow",
        explanation: "Ask -> Process -> Return/Show.",
        code: "# input() -> function() -> print()"
      }
    ],
    keyPoint: "Interface within actions."
  },
  {
    id: 411, title: "LOGIC", subtitle: "Logic building with functions",
    icon: GitBranch,
    content: "Using if and for inside functions to create powerful tools.",
    examples: [
      {
        title: "Validater",
        explanation: "A function that checks if data is 'good'.",
        code: "def is_adult(age):\n    return age >= 18"
      },
      {
        title: "Calculator",
        explanation: "Complex math wrapped in a simple name.",
        code: "def area(r):\n    return 3.14 * r * r"
      },
      {
        title: "Searcher",
        explanation: "Looking for something in a collection.",
        code: "def has_apple(list):\n    return \"apple\" in list"
      }
    ],
    keyPoint: "Functions + Logic = AI."
  },
  {
    id: 412, title: "PREDICT_FUNC", subtitle: "Output prediction (functions)",
    icon: HelpCircle,
    content: "Tracing how data goes into a function and what comes out the other side.",
    examples: [
      {
        title: "Input Trace",
        explanation: "f(a,b) { return a+b }. call f(2,3) -> Result 5.",
        code: "def f(a, b): return a + b\nprint(f(2, 3))"
      },
      {
        title: "State Trace",
        explanation: "x=0. def g() { x=5 }. call g(). print(x). What is x?",
        code: "x = 0\ndef g(): x = 5\ng()\nprint(x) # Prediction: 0 (local scope!)"
      },
      {
        title: "Nested Call",
        explanation: "Predict result of print(f(f(2))).",
        code: "def f(n): return n * 2\n# f(2)=4 -> f(4)=8"
      }
    ],
    keyPoint: "Track variables across def walls."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 4 — PYTHON ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L4_TESTS = [
  {
    id: 415, title: "MCQ ADVENTURE", subtitle: "Strings & Functions Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does len('Python') return?", options: ["5","6","7","Error"], a: 1, hint: "Count the characters." },
      { q: "Strings in Python are...", options: ["Mutable","Replaceable","Immutable","Dynamically sizable"], a: 2, hint: "They cannot be changed after creation." },
      { q: "What word defines a function in Python?", options: ["function","func","def","define"], a: 2, hint: "Short for define." },
      { q: "Output of 'Hi' + 'Bye'?", options: ["Hi Bye","HiBye","Error","Hi + Bye"], a: 1, hint: "Concatenation joins without adding spaces." },
      { q: "What handles sending data BACK from a function?", options: ["send","output","return","print"], a: 2, hint: "It RETURNS the value." },
      { q: "Output of s='Cat'; s[1]?", options: ["C","a","t","Error"], a: 1, hint: "0 = C, 1 = a, 2 = t." },
      { q: "Difference between parameter and argument?", options: ["None","Param is passed, Arg is defined","Param is the variable placeholder, Arg is the actual value","Arg is for math only"], a: 2, hint: "def f(param): ... f(arg)" },
      { q: "Result of 'Apple' == 'apple'?", options: ["True","False","SyntaxError","1"], a: 1, hint: "Case-sensitive!" },
      { q: "If a function lacks a return statement, it returns?", options: ["0","False","None","Error"], a: 2, hint: "Python's null equivalent." },
      { q: "How to call a function named 'run'?", options: ["call run","run","run()","invoke run"], a: 2, hint: "Parentheses are mandatory." }
    ]
  },
  {
    id: 416, title: "MATCH MASTER", subtitle: "String/Func Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "def",             match: "Keyword to define a Python function" },
      { concept: "return",          match: "Sends data back and ends function" },
      { concept: "Immutable",       match: "Properties of strings (cannot be changed)" },
      { concept: "Concatenation",   match: "Joining strings using +" },
      { concept: "len()",           match: "Gets the length of a string or list" },
      { concept: "Parameter",       match: "Variable placeholder in function definition" },
      { concept: "Argument",        match: "Actual value passed into a function" },
      { concept: "s[0:2]",          match: "String slicing (substring)" }
    ]
  },
  {
    id: 417, title: "ROBO YES/NO", subtitle: "Function Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "In Python, you can mutate a string like this: s[0] = 'A'.", a: false },
      { q: "The 'def' keyword is used to create a function.", a: true },
      { q: "A function can only return one value at a time.", a: false },
      { q: "String concatenation uses the + operator.", a: true },
      { q: "Negative indexing like s[-1] is invalid in Python strings.", a: false },
      { q: "Variables declared inside a function can be accessed globally.", a: false },
      { q: "Function parameters are the real values passed during a call.", a: false },
      { q: "len('a v') returns 3.", a: true },
      { q: "You must define a function before you call it in Python.", a: true },
      { q: "'return' stops the function execution immediately.", a: true }
    ]
  },
  {
    id: 418, title: "PYTHON SORTER", subtitle: "Function Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["def", "greet(", "name", "):"], answer: ["def", "greet(", "name", "):"] },
      { tokens: ["return", "a", "+", "b"], answer: ["return", "a", "+", "b"] },
      { tokens: ["result", "=", "add(", "5, 3", ")"], answer: ["result", "=", "add(", "5, 3", ")"] }
    ]
  },
  {
    id: 419, title: "ALGO BUILDER", subtitle: "Function Flow", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Create returning function",
      steps: [
        { id: 1, text: "def get_greeting(name):", order: 1 },
        { id: 2, text: "    msg = 'Hello ' + name", order: 2 },
        { id: 3, text: "    return msg", order: 3 },
        { id: 4, text: "text = get_greeting('Alice')", order: 4 },
        { id: 5, text: "print(text)", order: 5 }
      ]
    }
  },
  {
    id: 420, title: "CODING LAB", subtitle: "Greeting Function", icon: Terminal, type: 'coding',
    gameData: {
      title: "Functional Hello",
      objective: "Define a function named 'say_hi()' that prints 'Hello!'. Then CALL the function.",
      starterCode: "# Define function here\n\n# Call it below\n",
      hints: ["def say_hi():", "    print('Hello!')", "Finally, add: say_hi() on a new line."],
      validate: (logs) => logs.some(l => l.includes("Hello!"))
    }
  },
  {
    id: 421, title: "CODING LAB", subtitle: "Square Calculator", icon: Zap, type: 'coding',
    gameData: {
      title: "Parameter Power",
      objective: "Define 'square(n)' that prints n * n. Then call square(5).",
      starterCode: "# Define square(n) here\n\n# Call square(5) below\n",
      hints: ["def square(n):", "    print(n * n)", "Call it: square(5)"],
      validate: (logs) => logs.some(l => l.includes("25"))
    }
  },
  {
    id: 422, title: "CODING LAB", subtitle: "Additive Return", icon: Star, type: 'coding',
    gameData: {
      title: "The Return Statement",
      objective: "Create a function 'add(a, b)' that returns a + b. Then print add(10, 20).",
      starterCode: "# Define add(a, b)\n\n# print add(10, 20)\n",
      hints: ["return a + b", "print(add(10, 20))"],
      validate: (logs) => logs.some(l => l.includes("30"))
    }
  }
];
