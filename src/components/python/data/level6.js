import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 6 — PYTHON: "Project & Best Practices" (10 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L6_FOUNDATION = [
  {
    id: 601, title: "STRUCTURE", subtitle: "Project Structure",
    icon: Layers,
    content: "Professional Python isn't just one giant script! Best practice: Separate code into Modules (.py files). Have a main.py that acts as the entry point. Create a 'src' folder for code, 'tests' folder for testing, and a requirements.txt file for dependencies. Structure keeps your brain organized.",
    keyPoint: "Separate concerns! Don't write 10,000 lines in one file."
  },
  {
    id: 602, title: "CLEAN_CODE", subtitle: "Clean, Readable Code (PEP 8)",
    icon: CheckCircle2,
    content: "Code is read more often than it is written. Python has an official style guide called PEP 8. Use snake_case for variables (player_health). Use 4 spaces for indentation. Leave 2 blank lines before a function. 'Readability counts' is a core principle of Python.",
    keyPoint: "Follow PEP 8: the official style guide for writing beautiful Python."
  },
  {
    id: 603, title: "COMMENTS", subtitle: "The Importance of Comments",
    icon: Code,
    content: "Use # for single-line comments and ''' ''' for docstrings under functions. Good code explains WHAT and HOW. Good comments explain WHY. Don't write: # adds 1 to x. Write: # Offset by 1 to fix 0-based array alignment. Don't over-comment obvious code.",
    keyPoint: "Comments should explain WHY the code exists, not WHAT it does."
  },
  {
    id: 604, title: "BUGS", subtitle: "What is a Bug Exactly?",
    icon: AlertCircle,
    content: "A bug is a flaw in logic or syntax that causes unexpected behavior. Syntax Errors (missing colon) stop code from running. Runtime Errors (divide by zero) crash running code. Logical Errors (wrong math formula) run fine but give the wrong answer. Logical errors are the hardest to fix!",
    keyPoint: "Logical Errors are invisible to the compiler. They produce silently wrong data."
  },
  {
    id: 605, title: "TESTING", subtitle: "How to Test Code",
    icon: Shield,
    content: "You can't test entirely by hand. Automated testing saves projects! Python uses the 'pytest' or 'unittest' libraries. You write small scripts that run your functions with fake data and 'assert' that the output matches expectations. If it doesn't, the test fails.",
    keyPoint: "Write tests! If you change code later, tests prove you didn't break anything."
  },
  {
    id: 606, title: "RUBBER_DUCK", subtitle: "Rubber Duck Debugging",
    icon: Bot,
    content: "A legendary debugging technique. When you are stuck, explain your code line-by-line out loud to an inanimate object (like a rubber duck). Forcing your brain to slow down and translate code into spoken words almost always reveals the flaw in your logic.",
    keyPoint: "Explain your code out loud. Your ears will catch what your eyes missed."
  },
  {
    id: 607, title: "GIT_BASICS", subtitle: "Source Control (Git)",
    icon: GitBranch,
    content: "Git is a time machine for your code. It saves 'commits' (snapshots) of your work. If you break something, you can 'checkout' the older version. GitHub is a website that hosts your Git repositories so you can share them. It is MANDATORY for professional developers.",
    keyPoint: "Git tracks changes. GitHub shares them. Always commit your code!"
  },
  {
    id: 608, title: "COLLAB", subtitle: "Collaboration in Coding",
    icon: Layers,
    content: "Teamwork makes the dream work. When working on GitHub, developers use 'Branches' to work on features safely without breaking the main game. Then they open a 'Pull Request' (PR) for teammates to review the code before merging it in.",
    keyPoint: "Branches isolate changes. Pull Requests allow for Code Review."
  },
  {
    id: 609, title: "DRY", subtitle: "Don't Repeat Yourself",
    icon: Repeat,
    content: "The fundamental rule of engineering. If you copy and paste code 3 times, you are doing it wrong. Put that code into a function or a loop. When code is duplicated, bugs are duplicated, meaning you have to fix the same bug in 3 different places.",
    keyPoint: "DRY: Group repetitive code into reusable functions."
  },
  {
    id: 610, title: "KISS", subtitle: "Keep It Simple, Stupid",
    icon: Star,
    content: "Developers love to show off by writing overly clever, condensed, confusing code. Don't do it. Simple code is robust code. If an algorithm is too clever to understand, it is too clever to debug. Simplicity is the ultimate sophistication.",
    keyPoint: "KISS: Clever code is hard to maintain. Simple code is professional code."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 6 — PYTHON ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L6_TESTS = [
  {
    id: 611, title: "MCQ ADVENTURE", subtitle: "Best Practices", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does the DRY principle stand for?", options: ["Do Right Yesterday","Don't Repeat Yourself","Data Recovery Yield","Develop, Run, Yield"], a: 1, hint: "Avoid copy-pasting code." },
      { q: "What is the official style guide for writing Python code?", options: ["PEP 8","Python Guidelines 101","The Zen of Python","CleanCode.py"], a: 0, hint: "Python Enhancement Proposal 8." },
      { q: "What should good code comments explain?", options: ["What the syntax does","Why the code exists (intent)","Who wrote it","The whole algorithm"], a: 1, hint: "Code tells you 'what'. Comments tell you 'why'." },
      { q: "What is the hardest type of bug to track down?", options: ["Syntax Error","Logical Error","Compile Error","Typo"], a: 1, hint: "The code runs perfectly, but gives the wrong answer." },
      { q: "What does Git do?", options: ["Tests code","Tracks changes and saves history snapshots","Compiles Python","Deletes bugs"], a: 1, hint: "A time machine for code." },
      { q: "What is 'Rubber Duck Debugging'?", options: ["A software tool","Explaining your code out loud to find flaws","Ignoring a bug","A type of unit test"], a: 1, hint: "Talk to the duck." },
      { q: "What does KISS stand for?", options: ["Keep It Simple, Stupid","Keep Iterating Standard Scripts","Know If Systems Start","Killing Isolated System Scripts"], a: 0, hint: "Don't overcomplicate things." },
      { q: "What is a 'Pull Request'?", options: ["Pulling code from the server","A request for teammates to review your code before merging","A demand for more time","Deleting a branch"], a: 1, hint: "Review process." },
      { q: "Instead of writing a 10,000 line Python script, you should...", options: ["Compress it into a ZIP","Separate responsibilities into different Module (.py) files","Make the font smaller","Stop coding"], a: 1, hint: "Modularity." },
      { q: "Automated testing requires you to...", options: ["Click every button manually","Write scripts that feed fake data into functions and assert the output","Hire QA testers","Use Git"], a: 1, hint: "Tests run tests." }
    ]
  },
  {
    id: 612, title: "MATCH MASTER", subtitle: "Theory Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "PEP 8",           match: "Python's official readability style guide" },
      { concept: "DRY",             match: "Don't Repeat Yourself (use functions)" },
      { concept: "KISS",            match: "Keep It Simple, Stupid (avoid cleverness)" },
      { concept: "Logical Error",   match: "Code runs but produces the wrong answer" },
      { concept: "Syntax Error",    match: "Code fails to run due to typos/grammar" },
      { concept: "Git",             match: "Version control to track history snapshots" },
      { concept: "Pull Request",    match: "Asking peers for a code review" },
      { concept: "Rubber Duck",     match: "Explaining code out loud to spot errors" }
    ]
  },
  {
    id: 613, title: "ROBO YES/NO", subtitle: "Practices Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "The DRY principle says you should copy-paste code instead of using functions.", a: false },
      { q: "Good comments should simply translate the Python syntax into English.", a: false },
      { q: "Logical errors are usually flagged by the compiler before the program runs.", a: false },
      { q: "Git allows you to revert your code to a previous snapshot if you break something.", a: true },
      { q: "Testing everything by hand is the industry standard for large software projects.", a: false },
      { q: "PEP 8 recommends using 'snake_case' for Python variable names.", a: true },
      { q: "The KISS principle encourages writing overly clever and complex code.", a: false },
      { q: "Rubber Duck debugging involves explaining your code out loud to slow down your brain.", a: true },
      { q: "A 'Branch' in Git allows you to test out ideas without modifying the main codebase.", a: true },
      { q: "'assert' is a keyword commonly used in Python automated testing frameworks.", a: true }
    ]
  },
  {
    id: 614, title: "PYTHON SORTER", subtitle: "Code Structure", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["def", "add(", "a, b):"], answer: ["def", "add(", "a, b):"] },
      { tokens: ["# ", "Offset", "to", "fix", "alignment"], answer: ["# ", "Offset", "to", "fix", "alignment"] },
      { tokens: ["assert", "add(", "2, 3)", "==", "5"], answer: ["assert", "add(", "2, 3)", "==", "5"] }
    ]
  },
  {
    id: 615, title: "ALGO BUILDER", subtitle: "Git Workflow", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "The Standard Git Workflow",
      steps: [
        { id: 1, text: "Create a new Branch for your feature", order: 1 },
        { id: 2, text: "Write your code and tests", order: 2 },
        { id: 3, text: "Commit your changes and Push to GitHub", order: 3 },
        { id: 4, text: "Open a Pull Request for Code Review", order: 4 },
        { id: 5, text: "Merge the Branch into Main", order: 5 }
      ]
    }
  }
];
