import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 2 — JAVA: "Decisions" (12 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L2_FOUNDATION = [
  {
    id: 201, title: "CONDITION", subtitle: "What is a Condition?",
    icon: HelpCircle,
    content: "A condition is a logic test that yields true or false. In Java, conditions MUST be boolean expressions.",
    examples: [
      {
        title: "Equality Check",
        explanation: "The == operator checks if two primitive values are exactly the same.",
        code: "int level = 5;\nboolean isMax = (level == 100);"
      },
      {
        title: "Inequality Check",
        explanation: "The != operator checks if two values are different.",
        code: "int health = 0;\nboolean isAlive = (health != 0);"
      },
      {
        title: "Magnitude Check",
        explanation: "Using > and < to compare sizes of numbers.",
        code: "int speed = 88;\nboolean fast = (speed > 80);"
      }
    ],
    keyPoint: "Java conditions MUST be boolean — if(1) is ILLEGAL in Java!"
  },
  {
    id: 202, title: "BOOLEAN", subtitle: "Lower-case Logic",
    icon: ToggleLeft,
    content: "Java's boolean type only permits lowercase 'true' and 'false'. It is strictly enforced.",
    examples: [
      {
        title: "Standard Boolean",
        explanation: "Simple declaration and assignment of logic values.",
        code: "boolean isHacked = false;\nboolean fireWallActive = true;"
      },
      {
        title: "Strict Type",
        explanation: "Unlike other languages, you cannot use numbers as flags.",
        code: "// boolean x = 1; // ERROR in Java\nboolean x = true; // Correct"
      },
      {
        title: "Boolean Variables",
        explanation: "Booleans are used mostly for status indicators.",
        code: "boolean systemStable = true;\nif (systemStable) {\n  System.out.println(\"Online\");\n}"
      }
    ],
    keyPoint: "boolean flag = true;  |  false (lowercase!)  |  0/1 NOT valid!"
  },
  {
    id: 203, title: "IF", subtitle: "Single Path Decisions",
    icon: GitBranch,
    content: "The if statement executes a block of code ONLY if the condition inside is true.",
    examples: [
      {
        title: "Simple If",
        explanation: "Action taken only when the condition is met.",
        code: "int key = 7;\nif (key == 7) {\n  System.out.println(\"Access Granted\");\n}"
      },
      {
        title: "Curly Braces",
        explanation: "Braces group multiple lines of code to run under one if.",
        code: "if (shieldPower < 10) {\n  alert(\"Low Power\");\n  recharge();\n}"
      },
      {
        title: "The Single-Line If",
        explanation: "If only one line follows, braces are optional (but recommended).",
        code: "if (active) ping();"
      }
    ],
    keyPoint: "if (x > 10) { ... } — parentheses and braces are best practice!"
  },
  {
    id: 204, title: "IF-ELSE", subtitle: "The Fork in the Road",
    icon: GitBranch,
    content: "If-else provides an alternative path for when the condition is false.",
    examples: [
      {
        title: "Standard Else",
        explanation: "Defining two clear paths for execution.",
        code: "if (temp > 100) {\n  System.out.println(\"Critical\");\n} else {\n  System.out.println(\"Safe\");\n}"
      },
      {
        title: "The Ternary Shortcut",
        explanation: "A compact way to choose between two values based on a condition.",
        code: "String mode = (energy > 50) ? \"High\" : \"Eco\";"
      },
      {
        title: "Ternary Math",
        explanation: "You can use ternary for simple logic assignments.",
        code: "int speed = fast ? 100 : 20;"
      }
    ],
    keyPoint: "int max = (a > b) ? a : b; — Java ternary operator shortcut!"
  },
  {
    id: 205, title: "ELSE-IF", subtitle: "Multi-Choice Chains",
    icon: GitBranch,
    content: "When you have more than two possibilities, use else-if chains.",
    examples: [
      {
        title: "Grade Evaluation",
        explanation: "Checking multiple ranges of numbers.",
        code: "if (score >= 90) rank = \"A\";\nelse if (score >= 80) rank = \"B\";\nelse rank = \"C\";"
      },
      {
        title: "Weather logic",
        explanation: "Handle different scenarios sequentially.",
        code: "if (isRainy) pack(\"Umbrella\");\nelse if (isSunny) pack(\"Shades\");\nelse pack(\"Hat\");"
      },
      {
        title: "Exclusivity",
        explanation: "Only ONE block in an if/else-if chain will ever run.",
        code: "if (x > 0) sout(\"Positive\");\nelse if (x == 0) sout(\"Zero\");"
      }
    ],
    keyPoint: "Java: else if (two words!) vs Python's elif."
  },
  {
    id: 206, title: "NESTED", subtitle: "Decisions within Decisions",
    icon: Layers,
    content: "You can put an if statement inside another if statement for complex logic.",
    examples: [
      {
        title: "Two-Tier Auth",
        explanation: "Checking username first, then password.",
        code: "if (userExists) {\n  if (passCorrect) {\n    grantAccess();\n  }\n}"
      },
      {
        title: "Inside Else",
        explanation: "Nesting inside the else block is also common.",
        code: "if (found) {\n  process();\n} else {\n  if (searchAgain) retry();\n}"
      },
      {
        title: "Indentation",
        explanation: "Keeping layers distinct helps human readers follow the flow.",
        code: "if (a) {\n    if (b) {\n        if (c) win();\n    }\n}"
      }
    ],
    keyPoint: "Indentation is vital for keeping nested logic readable."
  },
  {
    id: 207, title: "COMPARE", subtitle: "Equality and Identity",
    icon: Code,
    content: "Comparing integers is simple, but comparing Strings requires special care in Java.",
    examples: [
      {
        title: "Integer Comparison",
        explanation: "Simple math equality works as expected.",
        code: "int a = 5, b = 5;\nboolean match = (a == b);"
      },
      {
        title: "String Comparison (.equals)",
        explanation: "CRITICAL: To compare text, you MUST use .equals().",
        code: "String s1 = \"Java\";\nif (s1.equals(\"Java\")) {\n  System.out.println(\"Welcome\");\n}"
      },
      {
        title: "The == Trap (Strings)",
        explanation: "Using == on Strings checks where they live in memory, not what ellos dice.",
        code: "String s1 = new String(\"Hi\");\nString s2 = new String(\"Hi\");\nboolean fail = (s1 == s2); // FALSE! Use .equals()"
      }
    ],
    keyPoint: "Primitives: == ok | Objects/Strings: MUST use .equals()!"
  },
  {
    id: 208, title: "LOGICAL", subtitle: "Combining Conditions",
    icon: Filter,
    content: "Logical operators like AND (&&) and OR (||) let you test multiple conditions at once.",
    examples: [
      {
        title: "Double Requirement (AND)",
        explanation: "Both sides must be true for the whole thing to be true.",
        code: "if (hasKey && doorUnlocked) enterRoom();"
      },
      {
        title: "Either Requirement (OR)",
        explanation: "The block runs if at least one side is true.",
        code: "if (isWeekend || isHoliday) sleepIn();"
      },
      {
        title: "Short Circuiting",
        explanation: "Java stops checking if the result is already certain.",
        code: "if (user != null && user.isActive()) {\n  // won't crash if user is null\n}"
      }
    ],
    keyPoint: "&& = Both. || = Either. ! = Not."
  },
  {
    id: 209, title: "MULTIPLE", subtitle: "The Switch Statement",
    icon: CheckCircle2,
    content: "Switch is a cleaner way to compare one value against many specific options.",
    examples: [
      {
        title: "Basic Case",
        explanation: "Map values to simple actions.",
        code: "switch (digit) {\n  case 1: sout(\"One\"); break;\n  case 2: sout(\"Two\"); break;\n}"
      },
      {
        title: "Default Case",
        explanation: "The fallback block that runs if no other case matches.",
        code: "switch (rank) {\n  case 1: win(); break;\n  default: tryAgain();\n}"
      },
      {
        title: "Switch Expressions",
        explanation: "Modern Java shortcut for assigning values from a switch.",
        code: "String name = switch (id) {\n  case 0 -> \"Alpha\";\n  case 1 -> \"Beta\";\n  default -> \"Guest\";\n};"
      }
    ],
    keyPoint: "switch(x) { case 1: ... break; default: ... } — break is essential!"
  },
  {
    id: 210, title: "REALLIFE", subtitle: "Security Protocols",
    icon: Star,
    content: "Decision systems power everything from banking to satellite logic.",
    examples: [
      {
        title: "ATM Verification",
        explanation: "Checking multiple rules before letting money out.",
        code: "if (hasCard && pinCorrect) {\n  if (balance >= withdrawAmount) dispense();\n}"
      },
      {
        title: "Game Health",
        explanation: "Triggering game-over states based on variables.",
        code: "if (hp <= 0 && lives == 0) {\n  gameOver();\n}"
      },
      {
        title: "Smart Home",
        explanation: "Automated decisions based on sensor input.",
        code: "if (lightLevel < 20 && motionDetected) lightsOn();"
      }
    ],
    keyPoint: "Code translates human rules into machine actions."
  },
  {
    id: 211, title: "DEBUG_IF", subtitle: "Common Logic Pitfalls",
    icon: AlertCircle,
    content: "Many bugs come from subtle logic errors. Learn to spot them early.",
    examples: [
      {
        title: "The Assignment Trap",
        explanation: "Don't confuse = (giving a value) with == (checking a value).",
        code: "// if (x = 5) // Error: can't assign in if\nif (x == 5) // Correct: checks if 5"
      },
      {
        title: "The String Error",
        explanation: "Forgetting that Strings are objects and need .equals().",
        code: "if (name == \"Admin\") // Bug! Might be false even if text matches"
      },
      {
        title: "Missing Breaks",
        explanation: "In a switch, code will 'fall through' to the next case without a break.",
        code: "case 1: sout(\"A\"); // MISSING BREAK\ncase 2: sout(\"B\"); // Runs for both 1 and 2!"
      }
    ],
    keyPoint: "String: never ==, always .equals(). Switch: always break!"
  },
  {
    id: 212, title: "PREDICT", subtitle: "Mental Debugging",
    icon: Zap,
    content: "Always trace your variables before clicking run. Be the compiler.",
    examples: [
      {
        title: "The Ladder Trace",
        explanation: "Step through an else-if chain one by one.",
        code: "int t = 25;\nif (t > 30) hot();\nelse if (t > 20) warm(); // STOPS HERE\nelse cold();"
      },
      {
        title: "Negative Logic",
        explanation: "Mental trace involving NOT (!) operators.",
        code: "boolean ready = false;\nif (!ready) wait(); // runs because !false is true"
      },
      {
        title: "Combined Trace",
        explanation: "Complex chain involving multiple variables.",
        code: "int a = 10, b = 2;\nif (a > 5 && b < 1) sout(\"No\");\nelse if (a > 5 || b < 1) sout(\"Yes\"); // Runs"
      }
    ],
    keyPoint: "Mental trace first! Predict the output to master the logic."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 2 — JAVA ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L2_TESTS = [
  {
    id: 213, title: "MCQ ADVENTURE", subtitle: "Java Decisions Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "Java String comparison should use?",                  options: ["==","equals()","compare()","==="],                                         a: 1, hint: "== checks reference, not content!" },
      { q: "Java logical AND operator is?",                       options: ["and","AND","&&","&only"],                                                  a: 2, hint: "Java uses symbols, not words." },
      { q: "Java boolean uses?",                                  options: ["True/False","true/false","1/0","YES/NO"],                                  a: 1, hint: "Lowercase in Java." },
      { q: "if(1) in Java is?",                                  options: ["true","false","Valid Java","Compile error"],                               a: 3, hint: "Java only allows boolean conditions!" },
      { q: "Java else-if is written as?",                        options: ["elif","else if","elseif","elsif"],                                          a: 1, hint: "Two words in Java." },
      { q: "What does break do in switch?",                      options: ["Skips case","Ends program","Prevents fall-through","Continues loop"],       a: 2, hint: "Without break, next case runs too." },
      { q: "Java ternary operator syntax?",                      options: ["x if cond else y","cond ? x : y","cond ?? x","if ? x; y"],                a: 1, hint: "(a > b) ? a : b" },
      { q: "! in Java does?",                                    options: ["Increments","Negates boolean","Divides","Declares"],                        a: 1, hint: "!true → false" },
      { q: "Short-circuit in A && B means?",                     options: ["Always checks both","Skips B if A is false","Skips A always","Reverses order"], a: 1, hint: "If A fails, B doesn't matter." },
      { q: "Java condition MUST be of type?",                    options: ["int","String","boolean","Object"],                                          a: 2, hint: "Strict boolean only — not 0/1." },
      { q: "switch default case runs when?",                     options: ["Always","No case matches","First","Never"],                                 a: 1, hint: "Fallback when nothing matches." },
      { q: "Output: int x=8; if(x>10) sout('A') else if(x>5) sout('B') else sout('C')?", options: ["A","B","C","Error"],                             a: 1, hint: "8>10? No. 8>5? Yes → B." }
    ]
  },
  {
    id: 214, title: "MATCH MASTER", subtitle: "Java Decision Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "&&",          match: "Logical AND in Java" },
      { concept: "||",          match: "Logical OR in Java" },
      { concept: "!",           match: "Logical NOT in Java" },
      { concept: ".equals()",   match: "String content comparison" },
      { concept: "==",          match: "Reference equality (not for Strings)" },
      { concept: "switch",      match: "Multi-value comparison statement" },
      { concept: "break",       match: "Prevents switch fall-through" },
      { concept: "? :",         match: "Ternary (shorthand if-else)" }
    ]
  },
  {
    id: 215, title: "ROBO YES/NO", subtitle: "Java Logic Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "Java boolean values are lowercase true/false.",             a: true  },
      { q: "== correctly compares String content in Java.",            a: false },
      { q: "&& is Java's logical AND operator.",                       a: true  },
      { q: "if(0) is valid Java — 0 means false.",                    a: false },
      { q: "Java uses 'else if' (two words) not 'elif'.",             a: true  },
      { q: "Forgetting break in switch causes fall-through.",          a: true  },
      { q: "! flips false to true and true to false.",                 a: true  },
      { q: "Short-circuit means A && B always evaluates B.",          a: false },
      { q: "The ternary operator is: condition ? ifTrue : ifFalse.",  a: true  },
      { q: "switch default case is mandatory.",                        a: false }
    ]
  },
  {
    id: 216, title: "ALGO BUILDER", subtitle: "Java Grade Calculator", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Java Grade Calculator Program",
      steps: [
        { id: 1, text: "Scanner sc = new Scanner(System.in);",        order: 1 },
        { id: 2, text: "int score = sc.nextInt();",                    order: 2 },
        { id: 3, text: "if (score >= 90) grade = 'A';",               order: 3 },
        { id: 4, text: "else if (score >= 80) grade = 'B';",          order: 4 },
        { id: 5, text: "else grade = 'F'; System.out.println(grade);", order: 5 }
      ]
    }
  },
  {
    id: 217, title: "JAVA SORTER", subtitle: "Java Condition Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["if", "(x", ">", "10)", "{"],                              answer: ["if", "(x", ">", "10)", "{"] },
      { tokens: ["boolean", "flag", "=", "true;"],                          answer: ["boolean", "flag", "=", "true;"] },
      { tokens: ["str1.equals(", "str2", ")"],                              answer: ["str1.equals(", "str2", ")"] }
    ]
  }
];
