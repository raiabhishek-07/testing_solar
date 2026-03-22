import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, Hash, ToggleLeft } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 2 — PYTHON: "Decisions" (12 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L2_FOUNDATION = [
  {
    id: 201, title: "CONDITION", subtitle: "What is condition",
    icon: HelpCircle,
    content: "A condition is a question that results in either True or False, used to make decisions.",
    examples: [
      {
        title: "The Question",
        explanation: "Asking the computer 'Is this higher than 10?'.",
        code: "print(15 > 10) # Result: True"
      },
      {
        title: "Equality",
        explanation: "Checking if two things are exactly the same.",
        code: "print(5 == 5) # Result: True"
      },
      {
        title: "Difference",
        explanation: "Checking if two things are not the same.",
        code: "print(10 != 5) # Result: True"
      }
    ],
    keyPoint: "Condition = Boolean Result (True/False)."
  },
  {
    id: 202, title: "BOOLEAN", subtitle: "Boolean values (true/false)",
    icon: ToggleLeft,
    content: "Booleans are the simplest data type, having only two possible values: True and False.",
    examples: [
      {
        title: "True",
        explanation: "Represents 'Yes', 'Correct', or 'On'.",
        code: "is_light_on = True"
      },
      {
        title: "False",
        explanation: "Represents 'No', 'Incorrect', or 'Off'.",
        code: "is_game_over = False"
      },
      {
        title: "Capitalization",
        explanation: "In Python, True and False must always start with a Capital letter.",
        code: "# true = False (ERROR, should be True)"
      }
    ],
    keyPoint: "True and False are keywords."
  },
  {
    id: 203, title: "IF", subtitle: "if statement",
    icon: GitBranch,
    content: "The if statement runs a block of code only when its condition is True.",
    examples: [
      {
        title: "The Check",
        explanation: "If the condition is met, do the task.",
        code: "if score > 100:\n    print(\"New Record!\")"
      },
      {
        title: "The Indent",
        explanation: "Lines inside the if must be pushed forward (indented).",
        code: "if True:\n    print(\"Inside the if\")"
      },
      {
        title: "Skipping",
        explanation: "If condition is False, the code just skips that block.",
        code: "if False:\n    print(\"Hidden\")"
      }
    ],
    keyPoint: "if [condition]: [indent] [code]"
  },
  {
    id: 204, title: "IFELSE", subtitle: "if-else",
    icon: GitBranch,
    content: "The else block provides an alternative path when the if condition is False.",
    examples: [
      {
        title: "The Choice",
        explanation: "Either the first or the second, but never both.",
        code: "if is_sunny:\n    print(\"Go out\")\nelse:\n    print(\"Stay in\")"
      },
      {
        title: "Binary Logic",
        explanation: "Modeling simple yes/no situations.",
        code: "if age >= 18:\n    status = \"Adult\"\nelse:\n    status = \"Minor\""
      },
      {
        title: "The Fallback",
        explanation: "Else handles every case where the if failed.",
        code: "if score == 10:\n    print(\"Win\")\nelse:\n    print(\"Keep playing\")"
      }
    ],
    keyPoint: "One of the two must run."
  },
  {
    id: 205, title: "NESTED", subtitle: "nested if (basic idea)",
    icon: Filter,
    content: "A nested if is an if statement placed inside another if statement for complex checks.",
    examples: [
      {
        title: "Multi-Layer",
        explanation: "Check one thing, then only check the next if the first was True.",
        code: "if has_key:\n    if door_locked:\n        print(\"Unlock\")"
      },
      {
        title: "Double Indent",
        explanation: "Each level of nesting adds more spaces to the left.",
        code: "if A:\n    if B:\n        print(\"Both are True\")"
      },
      {
        title: "Precision",
        explanation: "Used for drill-down logic (Age > 18 AND Has ID).",
        code: "if age > 18:\n    if has_id:\n        print(\"Entry allowed\")"
      }
    ],
    keyPoint: "Nesting = Decisions within decisions."
  },
  {
    id: 206, title: "OPERATORS", subtitle: "Comparison operators (>, <, ==, !=)",
    icon: CheckCircle2,
    content: "Comparison operators allow you to mathematically compare two values.",
    examples: [
      {
        title: "Greater/Smaller",
        explanation: "> and < check the magnitude.",
        code: "print(10 > 5) # True\nprint(3 < 1) # False"
      },
      {
        title: "Exactly Equal",
        explanation: "== checks if values are identical.",
        code: "print(5 == 5) # True"
      },
      {
        title: "Not Equal",
        explanation: "!= checks if values are different.",
        code: "print(5 != 3) # True"
      }
    ],
    keyPoint: "Returns a Boolean result."
  },
  {
    id: 207, title: "LOGICAL", subtitle: "Logical operators (AND, OR)",
    icon: FlaskConical,
    content: "Logical operators combine multiple conditions into a single True/False result.",
    examples: [
      {
        title: "AND",
        explanation: "Result is True only if BOTH sides are True.",
        code: "if age > 18 and has_ticket: enter()"
      },
      {
        title: "OR",
        explanation: "Result is True if AT LEAST ONE side is True.",
        code: "if is_admin or is_owner: grant_access()"
      },
      {
        title: "Combining",
        explanation: "Building complex requirements.",
        code: "if (A or B) and C: run()"
      }
    ],
    keyPoint: "and (Both), or (Either)."
  },
  {
    id: 208, title: "MULTI_COND", subtitle: "Checking multiple conditions",
    icon: Layers,
    content: "Using 'elif' (else if) to check a series of different conditions in order.",
    examples: [
      {
        title: "The Chain",
        explanation: "If the first is False, check the second, then the third.",
        code: "if x > 100: print(\"Huge\")\nelif x > 50: print(\"Big\")\nelse: print(\"Small\")"
      },
      {
        title: "Stop at First",
        explanation: "Once one true condition is found, the rest of the elifs are skipped.",
        code: "x = 10\nif x > 5: print(\"A\")\nelif x > 2: print(\"B\") # Skipped!"
      },
      {
        title: "The Default",
        explanation: "Using else at the end to catch everything else.",
        code: "if a: do()\nelif b: do()\nelse: reset()"
      }
    ],
    keyPoint: "elif = 'If the previous failed, try this'."
  },
  {
    id: 209, title: "REAL_DECISION", subtitle: "Real-life decision examples",
    icon: MapPin,
    content: "Programming logic mimics how we make decisions in the physical world.",
    examples: [
      {
        title: "Atmosphere",
        explanation: "If it's cold, wear a jacket. Else, wear a shirt.",
        code: "if temp < 15: wear(\"jacket\")"
      },
      {
        title: "Finance",
        explanation: "If balance >= price, buy. Else, save.",
        code: "if balance >= 50: buy_pizza()"
      },
      {
        title: "Traffic",
        explanation: "If light is Green, Go. If Red, Stop.",
        code: "if light == \"green\": move()"
      }
    ],
    keyPoint: "Logic models reality."
  },
  {
    id: 210, title: "DEBUG_COND", subtitle: "Simple debugging in conditions",
    icon: Hammer,
    content: "Finding why a decision path isn't being taken correctly.",
    examples: [
      {
        title: "Print Debugging",
        explanation: "Print the variable value right before the if to see its state.",
        code: "print(score)\nif score > 10: print(\"Win\")"
      },
      {
        title: "Trace Steps",
        explanation: "Verify which block is actually running.",
        code: "if color == 'red': print('In Red block')"
      },
      {
        title: "Boolean Check",
        explanation: "Testing the expression itself in isolation.",
        code: "print(x == y) # Is it actually True or False?"
      }
    ],
    keyPoint: "Verify data before deciding."
  },
  {
    id: 211, title: "PREDICT_IF", subtitle: "Output prediction with if",
    icon: HelpCircle,
    content: "Mentally calculating which path the program will take based on data values.",
    examples: [
      {
        title: "Variable Trace",
        explanation: "x=10. if x > 5? Yes. Output: Pass.",
        code: "x = 10\nif x > 5: print(\"Pass\")"
      },
      {
        title: "Else Prediction",
        explanation: "x=2. if x > 5? No. Goto Else. Output: Fail.",
        code: "x = 2\nif x > 5: print(\"Pass\")\nelse: print(\"Fail\")"
      },
      {
        title: "Multi Trace",
        explanation: "x=7. Match elif x > 5. Output: Medium.",
        code: "x = 7\nif x > 10: print(\"Hi\")\nelif x > 5: print(\"Med\")"
      }
    ],
    keyPoint: "Follow the data path."
  },
  {
    id: 212, title: "MISTAKES", subtitle: "Common mistakes in conditions",
    icon: AlertCircle,
    content: "Common errors that cause logic to fail or crash in Python.",
    examples: [
      {
        title: "Assignment Error",
        explanation: "Using = instead of == by mistake.",
        code: "# if x = 10: (ERROR)\nif x == 10: (GOOD)"
      },
      {
        title: "Colon Missing",
        explanation: "Forgetting the colon : at the end of the if line.",
        code: "# if x > 5 (ERROR)"
      },
      {
        title: "Indentation",
        explanation: "Not pushing the code block forward correctly.",
        code: "if True:\nprint(\"Crash!\") # Error!"
      }
    ],
    keyPoint: "Watch for =, :, and spaces."
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
  },
  {
    id: 218, title: "CODING LAB", subtitle: "Positive Protocol", icon: Terminal, type: 'coding',
    gameData: {
      title: "Binary Decisions",
      objective: "Given n = 10, write an if-statement that prints 'Positive' if n is greater than 0.",
      starterCode: "n = 10\n# Write your if-statement below\n",
      hints: ["if n > 0:", "Remember the indentation and print('Positive')"],
      validate: (logs) => logs.some(l => l.includes("Positive"))
    }
  },
  {
    id: 219, title: "CODING LAB", subtitle: "Pass/Fail Logic", icon: Zap, type: 'coding',
    gameData: {
      title: "The Divider",
      objective: "Given score = 45, check if score >= 50. If true, print 'Pass', else print 'Fail'.",
      starterCode: "score = 45\n# Write if-else logic here\n",
      hints: ["Use if score >= 50:", "Use else: for the alternative"],
      validate: (logs) => logs.some(l => l.includes("Fail"))
    }
  },
  {
    id: 220, title: "CODING LAB", subtitle: "Teenager Range", icon: Star, type: 'coding',
    gameData: {
      title: "Logical AND",
      objective: "Given age = 15, print 'Teen' if age is between 13 and 19 (inclusive).",
      starterCode: "age = 15\n# Use 'and' to check the range\n",
      hints: ["if age >= 13 and age <= 19:", "Print 'Teen' if it matches"],
      validate: (logs) => logs.some(l => l.includes("Teen"))
    }
  }
];


