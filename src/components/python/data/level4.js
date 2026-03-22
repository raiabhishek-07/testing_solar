import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 4 — PYTHON: "Strings & Functions" (14 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L4_FOUNDATION = [
  {
    id: 401, title: "WHAT_STRING", subtitle: "What is a String?",
    icon: Type,
    content: "A string is a sequence of characters used to store text. In Python, strings are enclosed in either single quotes ('Hello') or double quotes (\"Hello\"). Strings are immutable — once created, they cannot be changed. Any 'change' actually creates a new string.",
    keyPoint: "Strings are IMMUTABLE sequences of text."
  },
  {
    id: 402, title: "DECLARE_STR", subtitle: "Declaring Strings",
    icon: Code,
    content: "s1 = 'Hello'; s2 = \"World\". Multi-line strings use triple quotes: '''Line 1\\nLine 2'''. Python is flexible; choose single or double quotes, just be consistent. If you need a quote INSIDE a string: s = \"It's raining\".",
    keyPoint: "s = 'text' | s = \"text\" | s = '''multi-line text'''"
  },
  {
    id: 403, title: "LENGTH", subtitle: "String Length",
    icon: HelpCircle,
    content: "To get the number of characters in a string, use the built-in len() function. Ex: len('Python') returns 6. Spaces and punctuation count! len('a b') returns 3. This is identical to getting the length of a list.",
    keyPoint: "len('Hello') → 5 (Spaces and punctuation count!)"
  },
  {
    id: 404, title: "ACCESS_CHAR", subtitle: "Accessing Characters",
    icon: Hash,
    content: "Strings are indexed like lists, starting at 0. s = 'Python'. s[0] is 'P', s[1] is 'y'. Negative indexing works too: s[-1] is 'n'. Slicing gets you a substring: s[0:2] is 'Py' (gets indices 0 and 1, stops before 2).",
    keyPoint: "s = 'Cat' → s[0] is 'C', s[-1] is 't'. Python supports Slicing: [start:stop]"
  },
  {
    id: 405, title: "COMPARE_STR", subtitle: "String Comparison",
    icon: ToggleLeft,
    content: "Compare strings using == and !=. 'Apple' == 'Apple' is True. Python compares strings lexicographically (alphabetically, using ASCII values). So 'A' < 'B'. Beware: 'apple' == 'Apple' is False (case-sensitive!). You can use .lower() to ignore case.",
    keyPoint: "== checks if content is exact match. Case-sensitive!"
  },
  {
    id: 406, title: "CONCAT", subtitle: "String Concatenation",
    icon: Layers,
    content: "Joining strings together is called concatenation. Use the + operator: 'Hot' + 'dog' → 'Hotdog'. You cannot concatenate a string and an integer directly ('Age: ' + 25 is a TypeError). You must convert numbers first: 'Age: ' + str(25).",
    keyPoint: "Use + to combine strings. Convert numbers with str(num) first!"
  },
  {
    id: 407, title: "STR_MISTAKES", subtitle: "Common String Mistakes",
    icon: AlertCircle,
    content: "1. Trying to change a character: s = 'Cat'; s[0] = 'B' (TypeError: string does not support item assignment). 2. Off-by-one errors when slicing. 3. Forgetting to convert numbers before concatenation. 4. Confusing string length with highest index.",
    keyPoint: "Strings are immutable. You cannot do: s[0] = 'a'."
  },
  {
    id: 408, title: "WHAT_FUNC", subtitle: "What is a Function?",
    icon: Braces,
    content: "A function is a reusable block of code that performs a specific task. Like a mini-program within your program. When you call len() or print(), you are using built-in functions. You can also write your own!",
    keyPoint: "A function is a named block of code you can execute any time."
  },
  {
    id: 409, title: "WHY_FUNC", subtitle: "Why Use Functions?",
    icon: Star,
    content: "1. Reusability: Write once, use everywhere. 2. Readability: Breaking long code into smaller, named functions makes it easier to read. 3. Maintainability: If there's a bug, you only fix it in one place. Functions embody the DRY principle (Don't Repeat Yourself).",
    keyPoint: "DRY Principle: Don't Repeat Yourself. Functions exist to reuse code."
  },
  {
    id: 410, title: "FUNC_SYNTAX", subtitle: "Function Syntax (def)",
    icon: Code,
    content: "In Python, define functions using the 'def' keyword. Syntax: def my_function(): print('Hello'). The code block must be indented. This just CREATES the function; it doesn't run it yet. You must define it BEFORE you call it.",
    keyPoint: "def my_func(): \\n    # Indented body"
  },
  {
    id: 411, title: "PARAMS", subtitle: "Function Parameters",
    icon: Zap,
    content: "Parameters are variables that act as placeholders for the data you pass into a function. def greet(name): print(f'Hello {name}'). Here 'name' is the parameter. When you call greet('Alice'), 'Alice' is the argument passed to the parameter.",
    keyPoint: "Parameter = variable in definition. Argument = actual value passed."
  },
  {
    id: 412, title: "RETURN", subtitle: "Return Values",
    icon: Terminal,
    content: "Functions can send data BACK to where they were called using 'return'. def add(a, b): return a + b. Then: result = add(5, 3). The return statement immediately ends the function execution. Functions without return implicitly return 'None'.",
    keyPoint: "'return' gives data back and exits the function."
  },
  {
    id: 413, title: "CALL_FUNC", subtitle: "Calling a Function",
    icon: CheckCircle2,
    content: "To execute a function, type its name followed by parentheses. my_function(). If it takes parameters, pass arguments: add(10, 20). If it returns a value, save it to a variable or print it: x = add(10, 20).",
    keyPoint: "function_name() — the () are required to execute it!"
  },
  {
    id: 414, title: "DEBUG_FUNC", subtitle: "Debugging Functions",
    icon: AlertCircle,
    content: "Common bugs: 1. Infinite recursion (function calls itself forever). 2. Variable Scope errors: Trying to use a variable created inside a function on the outside. 3. Forgetting the 'return' statement. 4. Argument mismatch: calling add(5) when it expects two arguments.",
    keyPoint: "Local Scope: Variables defined inside a function die when the function ends."
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
  }
];
