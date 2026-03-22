import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, Hash, ToggleLeft } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 2 — PYTHON: "Decisions" (12 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L2_FOUNDATION = [
  {
    id: 201, title: "CONDITION", subtitle: "The Logic Question",
    icon: HelpCircle,
    content: "A condition is a boolean expression that the computer evaluates to make a decision.",
    examples: [
      {
        title: "Comparison Quest",
        explanation: "The simplest condition compares two values.",
        code: "x = 10\nprint(x > 5) # True"
      },
      {
        title: "Equality Test",
        explanation: "Use double equals == to check if values match.",
        code: "status = \"Active\"\nready = (status == \"Active\")"
      },
      {
        title: "Not Equal",
        explanation: "Use != to check if values are different.",
        code: "score = 0\ngame_over = (score != 100)"
      }
    ],
    keyPoint: "Condition = a question with a True or False answer."
  },
  {
    id: 202, title: "BOOLEAN", subtitle: "True & False",
    icon: ToggleLeft,
    content: "Python booleans are True and False. Capitalization is mandatory.",
    examples: [
      {
        title: "Direct Assignment",
        explanation: "Storing a truth value directly in a variable.",
        code: "is_valid = True\nis_error = False"
      },
      {
        title: "The bool() function",
        explanation: "Python can convert almost any value to a boolean.",
        code: "print(bool(1)) # True\nprint(bool(0)) # False\nprint(bool(\"\")) # False"
      },
      {
        title: "Logic Flipping",
        explanation: "Using 'not' to reverse a boolean value.",
        code: "shield_up = True\nshield_down = not shield_up"
      }
    ],
    keyPoint: "is_hot = True | is_raining = False | 5 > 3 evaluates to True"
  },
  {
    id: 203, title: "IF", subtitle: "Branching Paths",
    icon: GitBranch,
    content: "The if statement runs code ONLY if its condition is True. Indentation defines the block.",
    examples: [
      {
        title: "Basic If",
        explanation: "A simple check that triggers an action.",
        code: "energy = 100\nif energy == 100:\n    print(\"Full Power\")"
      },
      {
        title: "Indentation Rule",
        explanation: "All lines inside the IF must be indented (usually 4 spaces).",
        code: "if True:\n    print(\"Step A\")\n    print(\"Step B\")"
      },
      {
        title: "Skipped Block",
        explanation: "If the condition is False, the code block is ignored.",
        code: "if 1 > 10:\n    print(\"This won't print\")"
      }
    ],
    keyPoint: "if temperature > 30:\\n    print('Hot!') — colon + indentation!"
  },
  {
    id: 204, title: "IF-ELSE", subtitle: "The Dual Path",
    icon: GitBranch,
    content: "If-else provides a fallback for when the initial condition is False.",
    examples: [
      {
        title: "Standard Choice",
        explanation: "Define two mutually exclusive options.",
        code: "password = \"123\"\nif password == \"123\":\n    print(\"Welcome\")\nelse:\n    print(\"Access Denied\")"
      },
      {
        title: "The Ternary Expression",
        explanation: "A compact one-line way to choose a value.",
        code: "status = \"Safe\" if health > 20 else \"Critical\""
      },
      {
        title: "Always One",
        explanation: "Either the if runs, or the else runs, never both.",
        code: "if False:\n    print(\"No\")\nelse:\n    print(\"Yes\")"
      }
    ],
    keyPoint: "Exactly ONE block always runs."
  },
  {
    id: 205, title: "ELIF", subtitle: "Multi-Path Logic",
    icon: GitBranch,
    content: "Elif (else if) allows you to check multiple independent conditions.",
    examples: [
      {
        title: "The Rating System",
        explanation: "Check ranges of values sequentially.",
        code: "score = 85\nif score > 90: grade = 'A'\nelif score > 80: grade = 'B'\nelse: grade = 'C'"
      },
      {
        title: "Exclusive Chains",
        explanation: "Once a true condition is found, the rest are ignored.",
        code: "x = 10\nif x > 5: print(\"Big\")\nelif x > 2: print(\"Small\") # Won't run!"
      },
      {
        title: "Default Fallback",
        explanation: "Always end with an else for total coverage.",
        code: "if color == 'red': stop()\nelif color == 'green': go()\nelse: wait()"
      }
    ],
    keyPoint: "if ... elif ... else — only FIRST true block runs!"
  },
  {
    id: 206, title: "NESTED", subtitle: "Internal Decisions",
    icon: Layers,
    content: "Nesting lets you implement complex, multi-layered rules.",
    examples: [
      {
        title: "Two-Factor Auth",
        explanation: "Checking one thing, then another inside it.",
        code: "if logged_in:\n    if has_permission:\n        edit_system()"
      },
      {
        title: "Indent Levels",
        explanation: "Each level of nesting adds 4 more spaces to the left.",
        code: "if outer:\n    if inner:\n        print(\"Target hit\")"
      },
      {
        title: "The Ladder of Logic",
        explanation: "Careful nesting can model sophisticated flows.",
        code: "if day == \"Mon\":\n    if task_count > 0:\n        start_work()"
      }
    ],
    keyPoint: "Indentation tracks the depth of your logic."
  },
  {
    id: 207, title: "COMPARE", subtitle: "Relational Tools",
    icon: Code,
    content: "Comparison operators form the backbone of all program logic.",
    examples: [
      {
        title: "The Basic Six",
        explanation: "==, !=, >, <, >=, <=",
        code: "a = 5\nb = 10\nprint(a <= b) # True"
      },
      {
        title: "Mixing Types",
        explanation: "You can compare different numeric types easily.",
        code: "print(5 == 5.0) # True in Python"
      },
      {
        title: "String Identity",
        explanation: "In Python, == is used for content matching even for strings.",
        code: "print(\"hello\" == \"hello\") # True"
      }
    ],
    keyPoint: "== equal | != not equal | > > | < < | >= >= | <= <= "
  },
  {
    id: 208, title: "LOGICAL", subtitle: "And, Or, Not",
    icon: Filter,
    content: "Logical operators combine multiple conditions into one result.",
    examples: [
      {
        title: "The Tight Requirement (AND)",
        explanation: "Both halves must be True.",
        code: "if age > 18 and has_ticket: enter()"
      },
      {
        title: "The Flexible Choice (OR)",
        explanation: "The block runs if either side is True.",
        code: "if is_admin or is_owner: grant_access()"
      },
      {
        title: "The Flip (NOT)",
        explanation: "Invert a boolean result.",
        code: "if not is_locked: open_door()"
      }
    ],
    keyPoint: "and → both True | or → either True | not → flips the boolean"
  },
  {
    id: 209, title: "MULTIPLE", subtitle: "Pythonic Conditions",
    icon: CheckCircle2,
    content: "Python has unique shortcuts that make conditions more readable.",
    examples: [
      {
        title: "Chained Comparisons",
        explanation: "Compare a value against a range in one line.",
        code: "score = 85\nif 80 < score < 90:\n    print(\"B Grade\")"
      },
      {
        title: "Membership (IN)",
        explanation: "Check if a value exists in a list or string.",
        code: "if \"virus\" in file_data:\n    quarantine()"
      },
      {
        title: "Empty Checks",
        explanation: "Use the value itself as a boolean.",
        code: "data = []\nif not data:\n    print(\"List is empty\")"
      }
    ],
    keyPoint: "if 0 < age < 18: | if name in ['Alice', 'Bob']:"
  },
  {
    id: 210, title: "REALLIFE", subtitle: "System Architecture",
    icon: Star,
    content: "If-else transforms simple data into complex behaviors.",
    examples: [
      {
        title: "Traffic Controller",
        explanation: "Modeling real-world timing and logic.",
        code: "if car_detected and phase == \"Red\":\n    timer = 0"
      },
      {
        title: "Enemy AI",
        explanation: "Deciding what a game NPC does based on player distance.",
        code: "if distance < 5: attack()\nelif distance < 20: chase()\nelse: patrol()"
      },
      {
        title: "Health Monitor",
        explanation: "Automated alerts based on threshold variables.",
        code: "if heart_rate > 150: alert_user()"
      }
    ],
    keyPoint: "Every app feature is built from layers of logic."
  },
  {
    id: 211, title: "DEBUG_IF", subtitle: "Logic Hunters",
    icon: AlertCircle,
    content: "Learn the 3 common bugs that trip up even veteran coders.",
    examples: [
      {
        title: "The Assignment Bug",
        explanation: "accidentally using = in a condition (SyntaxError in Python).",
        code: "# if score = 100: # ERROR\nif score == 100: # CORRECT"
      },
      {
        title: "Off-By-One",
        explanation: "Using > 10 when you really meant >= 10.",
        code: "if age > 18: # 18 is not included\nif age >= 18: # 18 IS included"
      },
      {
        title: "Indent Error",
        explanation: "Forgetting to indent or mixing tabs and spaces.",
        code: "if True:\nprint(\"Fail\") # Error: Expected indent"
      }
    ],
    keyPoint: "= vs ==, wrong operator, bad indentation."
  },
  {
    id: 212, title: "PREDICT", subtitle: "The Mental Engine",
    icon: Zap,
    content: "Trace code mentally to prevent bugs before you even write them.",
    examples: [
      {
        title: "Sequential Trace",
        explanation: "Step through conditions in order.",
        code: "x = 10\nif x > 5: # YES -> Entry\n    print(\"Pass\")"
      },
      {
        title: "False Path Trace",
        explanation: "Tracing what happens when an if is skipped.",
        code: "x = 5\nif x > 10: # NO -> Skip block\n    reboot()\nprint(\"Ready\") # Runs always"
      },
      {
        title: "Logical Chain Trace",
        explanation: "Calculating complex boolean results in your head.",
        code: "a, b = True, False\nif a or b: # True or False is True\n    launch()"
      }
    ],
    keyPoint: "Trace code -> x=15 -> 15>10? Yes -> prints 'Big' — think before you run!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 2 — PYTHON ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L2_TESTS = [
  {
    id: 213, title: "MCQ ADVENTURE", subtitle: "Decisions Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does 5 == 5 evaluate to?",                     options: ["5","True","False","Error"],                                                  a: 1, hint: "== comparison returns a boolean." },
      { q: "Python uses ___ for logical AND.",                   options: ["&&","AND","and","&"],                                                        a: 2, hint: "Python uses English words." },
      { q: "What runs if the if condition is False?",           options: ["if block","elif block","else block","Nothing always"],                        a: 2, hint: "The else block handles False." },
      { q: "Output: x=5; if x>3: print('Yes') else: print('No')?", options: ["No","Yes","Error","Nothing"],                                           a: 1, hint: "Is 5 > 3?" },
      { q: "Which checks equality in Python?",                  options: ["=","==","===","equals()"],                                                    a: 1, hint: "Single = assigns, double == compares." },
      { q: "What does 'not True' evaluate to?",                 options: ["True","1","False","None"],                                                    a: 2, hint: "not flips the boolean." },
      { q: "is 0 < 5 < 10 valid Python?",                      options: ["No, invalid","Yes, and it's True","Yes, but it's False","Syntax Error"],     a: 1, hint: "Python supports chained comparisons!" },
      { q: "Python uses ___ for else-if.",                      options: ["elsif","elseif","elif","else if"],                                            a: 2, hint: "Uniquely Python." },
      { q: "A condition always returns?",                        options: ["int","str","bool","float"],                                                  a: 2, hint: "True or False." },
      { q: "What is 'a' in ['a','b','c']?",                    options: ["False","Error","True","None"],                                               a: 2, hint: "Python 'in' checks membership." },
      { q: "Output: if False: print('A') else: print('B')?",   options: ["A","B","AB","Nothing"],                                                      a: 1, hint: "Condition is False, so else runs." },
      { q: "Python condition blocks are defined by?",           options: ["{}","()","Indentation","BEGIN/END"],                                          a: 2, hint: "Python is unique — uses whitespace." }
    ]
  },
  {
    id: 214, title: "MATCH MASTER", subtitle: "Decision Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "if",         match: "Runs block when condition is True" },
      { concept: "else",       match: "Runs when if condition is False" },
      { concept: "elif",       match: "Checks next condition if previous was False" },
      { concept: "==",         match: "Checks equality (not assignment)" },
      { concept: "!=",         match: "Not equal comparison operator" },
      { concept: "and",        match: "Both conditions must be True" },
      { concept: "or",         match: "At least one condition must be True" },
      { concept: "not",        match: "Flips True to False and vice versa" }
    ]
  },
  {
    id: 215, title: "ROBO YES/NO", subtitle: "Logic Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "In Python, conditions use indentation (not {}).",       a: true  },
      { q: "= and == do the same thing in Python.",                a: false },
      { q: "'and' requires BOTH conditions to be True.",           a: true  },
      { q: "else block runs when the if condition is True.",       a: false },
      { q: "Python uses 'elif' for else-if.",                     a: true  },
      { q: "not False evaluates to True.",                         a: true  },
      { q: "0 < x < 10 is invalid Python syntax.",                a: false },
      { q: "A condition always returns True or False.",            a: true  },
      { q: "'or' requires ALL conditions to be True.",            a: false },
      { q: "Nested if means placing an if inside another if.",     a: true  }
    ]
  },
  {
    id: 216, title: "ALGO BUILDER", subtitle: "Decision Flow", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Grade Calculator (A/B/C/F)",
      steps: [
        { id: 1, text: "Get score from user: score = int(input())", order: 1 },
        { id: 2, text: "Check: if score >= 90 → grade = 'A'",      order: 2 },
        { id: 3, text: "Check: elif score >= 80 → grade = 'B'",    order: 3 },
        { id: 4, text: "Check: elif score >= 60 → grade = 'C'",    order: 4 },
        { id: 5, text: "Otherwise: else → grade = 'F'",            order: 5 }
      ]
    }
  },
  {
    id: 217, title: "PYTHON SORTER", subtitle: "Condition Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["if", "x", ">", "10:"],                                       answer: ["if", "x", ">", "10:"] },
      { tokens: ["elif", "x", "==", "10:"],                                     answer: ["elif", "x", "==", "10:"] },
      { tokens: ["if", "a", "and", "b:"],                                       answer: ["if", "a", "and", "b:"] }
    ]
  }
];


