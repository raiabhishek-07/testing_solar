import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Hammer } from 'lucide-react';
// ─────────────────────────────────────────────
// LEVEL 0 — PYTHON FOUNDATIONS (12 Sub-topics)
// ─────────────────────────────────────────────
export const L0_FOUNDATION = [
  {
    id: 1, title: "HARDWARE", subtitle: "What is a Computer?",
    icon: Cpu,
    content: "A computer is a high-speed machine that processes information. It has physical parts (hardware) and programs (software).",
    examples: [
      {
        title: "The Brain (CPU)",
        explanation: "The Central Processing Unit handles all calculations.",
        code: "# CPU processes: 2 + 2 = 4"
      },
      {
        title: "Memory (RAM)",
        explanation: "Short-term storage for things the computer is currently doing.",
        code: "current_level = 5 # Stored in RAM"
      },
      {
        title: "Input Devices",
        explanation: "Hardware like keyboards and mice that send data to the CPU.",
        code: "# Mouse click -> Input signal"
      }
    ],
    keyPoint: "Hardware = Physical. Software = Instructions."
  },
  {
    id: 2, title: "GHOST", subtitle: "What is a Program?",
    icon: Code,
    content: "A program is a set of instructions that tells the hardware exactly what to do.",
    examples: [
      {
        title: "The Script",
        explanation: "A text file containing commands.",
        code: "print(\"Step 1\")\nprint(\"Step 2\")"
      },
      {
        title: "Automation",
        explanation: "Programs can do tasks much faster than humans.",
        code: "for i in range(100): print(\"Fast!\")"
      },
      {
        title: "Logic Control",
        explanation: "Programs decide what to do based on data.",
        code: "if power_on: run_engine()"
      }
    ],
    keyPoint: "Program = A list of commands."
  },
  {
    id: 3, title: "CRAFT", subtitle: "What is Programming?",
    icon: Zap,
    content: "Programming (coding) is the art of writing those instructions. Python is a versatile choice for this craft.",
    examples: [
      {
        title: "Web Apps",
        explanation: "Creating the back-end logic for websites.",
        code: "# Logic for a login page"
      },
      {
        title: "AI & Data",
        explanation: "Teaching computers to recognize patterns.",
        code: "# Code that recognizes a cat face"
      },
      {
        title: "Game Dev",
        explanation: "Defining the rules and physics of a game world.",
        code: "player.health -= 10 # Damage logic"
      }
    ],
    keyPoint: "Programming = Writing the instructions."
  },
  {
    id: 4, title: "BRIDGE", subtitle: "The Python Language",
    icon: Terminal,
    content: "Python is a high-level programming language, meaning it's designed to be readable by humans.",
    examples: [
      {
        title: "Human Readable",
        explanation: "Python code looks like simplified English.",
        code: "print(\"Hello\") # Very easy to read"
      },
      {
        title: "Minimal Syntax",
        explanation: "You don't need many symbols to get things done.",
        code: "name = \"Agent\" # Simple assignment"
      },
      {
        title: "Universal Bridge",
        explanation: "Python works on almost every operating system.",
        code: "# Runs on Windows, Mac, and Linux"
      }
    ],
    keyPoint: "Python = Human-readable, yet machine-powerful."
  },
  {
    id: 5, title: "LEVELS", subtitle: "High vs Low Level",
    icon: Layers,
    content: "Low-level languages are for machines; high-level languages like Python are for people.",
    examples: [
      {
        title: "Abstraction",
        explanation: "Python hides the complex machine details from you.",
        code: "my_list = [1, 2, 3] # Complex memory handled!"
      },
      {
        title: "The Interpreter",
        explanation: "Python reads your code line by line, on the fly.",
        code: "# No long 'wait to compile' time"
      },
      {
        title: "Portability",
        explanation: "High-level languages are easy to move between computers.",
        code: "# Same code, different PC"
      }
    ],
    keyPoint: "Higher level = More human-readable."
  },
  {
    id: 6, title: "RECIPE", subtitle: "Real-life Instructions",
    icon: Shield,
    content: "An algorithm is a step-by-step plan. Python scripts are algorithms for computers.",
    examples: [
      {
        title: "The To-Do List",
        explanation: "A simple sequence of events.",
        code: "wash_hands()\neat_food()\nclean_up()"
      },
      {
        title: "The Loop Algorithm",
        explanation: "Repeating a task until a goal is met.",
        code: "while tea_is_cold: heat_tea()"
      },
      {
        title: "The Branching path",
        explanation: "Changing the plan based on the situation.",
        code: "if raining: bring_umbrella()"
      }
    ],
    keyPoint: "Algorithm = Step-by-step plan."
  },
  {
    id: 7, title: "INTAKE", subtitle: "Input Concept",
    icon: HelpCircle,
    content: "Input is data going INTO a program. Python uses input() to receive text.",
    examples: [
      {
        title: "User Prompt",
        explanation: "Asking the user for a specific piece of information.",
        code: "name = input(\"What is your name? \")"
      },
      {
        title: "Text Capture",
        explanation: "Storing whatever the user typed into a variable.",
        code: "answer = input() # User types 'Yes'"
      },
      {
        title: "Wait for Action",
        explanation: "Using input() just to pause the program until Enter is pressed.",
        code: "input(\"Press Enter to start...\")"
      }
    ],
    keyPoint: "Python Input: name = input('Enter name:')"
  },
  {
    id: 8, title: "RESULT", subtitle: "Output Concept",
    icon: CheckCircle2,
    content: "Output is information coming OUT of the program. Python uses print().",
    examples: [
      {
        title: "Text Display",
        explanation: "Showing words on the screen.",
        code: "print(\"Mission Complete\")"
      },
      {
        title: "Variable Preview",
        explanation: "Checking what is currently stored inside a variable.",
        code: "score = 500\nprint(score)"
      },
      {
        title: "Combined Output",
        explanation: "Showing text and numbers together.",
        code: "print(\"Score:\", score)"
      }
    ],
    keyPoint: "Python Output: print('Hello World')"
  },
  {
    id: 9, title: "DECISION", subtitle: "What is Logic?",
    icon: Cpu,
    content: "Logic is making choices using conditions (if/else).",
    examples: [
      {
        title: "The Check",
        explanation: "Running code only if a condition is met.",
        code: "if score > 100:\n    print(\"New Record!\")"
      },
      {
        title: "The Alternative",
        explanation: "Doing something else if the check fails.",
        code: "if sunny: play()\nelse: watch_tv()"
      },
      {
        title: "True/False",
        explanation: "Logic depends on 'Boolean' (Yes/No) values.",
        code: "is_ready = True\nif is_ready: start()"
      }
    ],
    keyPoint: "Python Logic: if x > 10: print('big')"
  },
  {
    id: 10, title: "PATHWAY", subtitle: "What is an Algorithm?",
    icon: Code,
    content: "An algorithm must be precise, ordered, and finite.",
    examples: [
      {
        title: "Precision",
        explanation: "Instructions must be perfectly clear.",
        code: "x = 10 # Precise value"
      },
      {
        title: "Ordered Steps",
        explanation: "The computer follows your lines from top to bottom.",
        code: "step1()\nstep2()"
      },
      {
        title: "Finite End",
        explanation: "Algorithms should eventually finish (no 'forever' bugs).",
        code: "for i in range(5): do_task()"
      }
    ],
    keyPoint: "An algorithm must be: precise, ordered, finite."
  },
  {
    id: 11, title: "FIXER", subtitle: "What is Debugging?",
    icon: Zap,
    content: "Debugging is reading error reports (tracebacks) to fix mistakes.",
    examples: [
      {
        title: "Syntax Errors",
        explanation: "Fixing typos or missing symbols (like colons).",
        code: "if True\n    print() # Error: Missing colon!"
      },
      {
        title: "Runtime Errors",
        explanation: "Fixing math that the computer can't do (like 1/0).",
        code: "print(10/0) # Error: ZeroDivision"
      },
      {
        title: "Logic Bugs",
        explanation: "The code runs, but doesn't do what you wanted.",
        code: "if score < 0: win() # Oops, meant > 0"
      }
    ],
    keyPoint: "Python devs say: 'Read the Error Message First!'"
  },
  {
    id: 12, title: "VALUE", subtitle: "Why Learn Python?",
    icon: Star,
    content: "Python is the multi-purpose Swiss Army knife of the tech world.",
    examples: [
      {
        title: "AI Power",
        explanation: "Almost all modern AI (like ChatGPT) is built with Python.",
        code: "# The fuel of future tech"
      },
      {
        title: "Data Science",
        explanation: "Crunching massive numbers for companies like Netflix.",
        code: "# Understanding human patterns"
      },
      {
        title: "Career Tool",
        explanation: "One of the highest-paying and most demanded skills.",
        code: "# Open doors to top tech companies"
      }
    ],
    keyPoint: "Python powers: Instagram, YouTube, NASA, Google."
  }
];

// ─────────────────────────────────────────────
// LEVEL 0 — PYTHON ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────
export const L0_TESTS = [
  {
    id: 13,
    title: "MCQ ADVENTURE",
    subtitle: "Python Foundation Quiz",
    icon: MapPin,
    type: 'mcq',
    gameData: [
      { q: "What is a computer?",                options: ["A machine that processes information","A type of animal","A book","A chair"],           a: 0, hint: "It handles data through hardware." },
      { q: "What is a program?",                  options: ["A movie","A set of instructions for a computer","A keyboard","A mouse"],               a: 1, hint: "Commands that drive hardware." },
      { q: "What is programming?",                options: ["Playing games","Giving instructions to a computer","Drawing pictures","Watching videos"], a: 1, hint: "The act of writing command sequences." },
      { q: "What is a programming language?",     options: ["Language to talk to computers","A music language","A body language","A drawing language"], a: 0, hint: "The bridge between human and machine." },
      { q: "Which is a programming language?",   options: ["Python","Banana","Chair","Pencil"],                                                       a: 0, hint: "Named after a British comedy group!" },
      { q: "What is Input?",                      options: ["Data given to a computer","Computer sleeping","Computer dancing","Computer flying"],      a: 0, hint: "Feeding the system with data." },
      { q: "What is Output?",                     options: ["Result produced by computer","Computer noise","Computer color","Computer battery"],       a: 0, hint: "The result of processing." },
      { q: "What is Logic?",                      options: ["Thinking step by step","Random guessing","Sleeping","Jumping"],                          a: 0, hint: "If-this-then-that thinking." }
    ]
  },
  {
    id: 14,
    title: "MATCH MASTER",
    subtitle: "Python Concept Sync",
    icon: Layers,
    type: 'match',
    gameData: [
      { concept: "Computer",    match: "Machine that processes data" },
      { concept: "Program",     match: "Set of instructions" },
      { concept: "Python",      match: "High-level programming language" },
      { concept: "print()",     match: "Displays output on screen" },
      { concept: "input()",     match: "Reads user input" },
      { concept: "Algorithm",   match: "Step-by-step solution" },
      { concept: "Debugging",   match: "Finding and fixing errors" },
      { concept: "Logic",       match: "Thinking with conditions" }
    ]
  },
  {
    id: 15,
    title: "ROBOT COMMANDER",
    subtitle: "Instruction Mapping",
    icon: Bot,
    type: 'robot',
    gameData: {
      start: { x: 0, y: 0 },
      goal: { x: 3, y: 0 }
    }
  },
  {
    id: 16,
    title: "FACTORY SYSTEM",
    subtitle: "The IPO Model",
    icon: Cpu,
    type: 'factory',
    gameData: {
      target: "Make Orange Juice",
      tasks: ["🍊", "🔪", "🌀", "Serve"]
    }
  },
  {
    id: 17,
    title: "BUG HUNTER",
    subtitle: "Traceback Repair",
    icon: Hammer,
    type: 'bug',
    gameData: {
      scenario: "Tea is not getting ready",
      lines: ["Add tea powder", "Serve", "Boil water"],
      correctOrder: ["Boil water", "Add tea powder", "Serve"]
    }
  }
];
