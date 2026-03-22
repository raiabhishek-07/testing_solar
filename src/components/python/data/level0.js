import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Hammer } from 'lucide-react';
// ─────────────────────────────────────────────
// LEVEL 0 — PYTHON FOUNDATIONS (12 Sub-topics)
// ─────────────────────────────────────────────
export const L0_FOUNDATION = [
  {
    id: 1, title: "HARDWARE", subtitle: "What is a computer",
    icon: Cpu,
    content: "A computer is an electronic machine that takes data as input, processes it, and gives output.",
    examples: [
      {
        title: "Input Devices",
        explanation: "Keyboard, Mouse, Mic - How we give data.",
        code: "# Giving data to the system"
      },
      {
        title: "Processing (CPU)",
        explanation: "The 'brain' that does all the work.",
        code: "# CPU handles 2 + 2"
      },
      {
        title: "Output Devices",
        explanation: "Monitor, Speaker, Printer - How we see results.",
        code: "# System shows result as 4"
      }
    ],
    keyPoint: "Computer = Input -> Process -> Output."
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
    id: 5, title: "LEVELS", subtitle: "Types of languages (low vs high level – simple idea)",
    icon: Layers,
    content: "Languages are either Low-Level (for machines) or High-Level (for humans, like Python).",
    examples: [
      {
        title: "High-Level",
        explanation: "Easy to read, looks like English.",
        code: "print(\"Hello world\")"
      },
      {
        title: "Low-Level",
        explanation: "Difficult to read, looks like math and symbols.",
        code: "# 01010100 01100101"
      },
      {
        title: "The Choice",
        explanation: "Most people choose High-Level for faster building.",
        code: "# Code that runs everywhere"
      }
    ],
    keyPoint: "High-Level = Human Friendly."
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
    id: 9, title: "LOGIC", subtitle: "What is logic (simple meaning)",
    icon: HelpCircle,
    content: "Logic is the 'If-This-Then-That' way of thinking used to solve problems.",
    examples: [
      {
        title: "Simple Decision",
        explanation: "Is it dark? If yes, turn on lights.",
        code: "if is_dark: lights_on()"
      },
      {
        title: "The Alternative",
        explanation: "If not dark, keep lights off.",
        code: "else: lights_off()"
      },
      {
        title: "Boolean Logic",
        explanation: "Everything is either True or False.",
        code: "ready = True\nif ready: launch()"
      }
    ],
    keyPoint: "Logic = Making choices."
  },
  {
    id: 10, title: "ALGO", subtitle: "What is an algorithm (step-by-step idea)",
    icon: MapPin,
    content: "An algorithm is a step-by-step method to solve a problem correctly.",
    examples: [
      {
        title: "Tea Algorithm",
        explanation: "1. Boil, 2. Add sugar, 3. Stir.",
        code: "# The process of making tea"
      },
      {
        title: "Search Algorithm",
        explanation: "Looking for a name in a list one by one.",
        code: "# Find 'Alex' in ['Bob', 'Alex', 'Zane']"
      },
      {
        title: "Math Algorithm",
        explanation: "How we learn to do long division.",
        code: "# 10 / 2 = 5 (Step-by-step)"
      }
    ],
    keyPoint: "Algorithm = A plan for the computer."
  },
  {
    id: 11, title: "DEBUG", subtitle: "What is debugging (finding mistakes)",
    icon: Hammer,
    content: "Debugging is the process of finding and fixing mistakes in your program.",
    examples: [
      {
        title: "The Typo",
        explanation: "Correcting 'prnit' to 'print'.",
        code: "prnit(\"Hi\") # Error!\nprint(\"Hi\") # Clean!"
      },
      {
        title: "Logic Bug",
        explanation: "When you win with 0 points when you should need 100.",
        code: "if points < 100: win() # Oops!"
      },
      {
        title: "Error Messages",
        explanation: "Reading what the computer says is wrong.",
        code: "# Traceback (most recent call last)..."
      }
    ],
    keyPoint: "Debug = Detect and Destroy bugs."
  },
  {
    id: 12, title: "USEFUL", subtitle: "Why coding is useful",
    icon: Sparkles,
    content: "Coding gives you the power to automate tasks and build your own digital tools.",
    examples: [
      {
        title: "Daily Tasks",
        explanation: "Sort files or send emails automatically.",
        code: "# Automated file sorting script"
      },
      {
        title: "Creativity",
        explanation: "Build your own games or drawing apps.",
        code: "# Creating a player object"
      },
      {
        title: "Global Scale",
        explanation: "Write once, used by millions worldwide.",
        code: "# Launching a web server"
      }
    ],
    keyPoint: "Coding = Digital Superpowers."
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
