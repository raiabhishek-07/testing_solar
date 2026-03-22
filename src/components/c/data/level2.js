import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 2 — C LANGUAGE: "Decisions" (12 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L2_FOUNDATION = [
  {
    id: 201, title: "CONDITION", subtitle: "C Logic Foundation",
    icon: HelpCircle,
    content: "In C, a condition is any expression that evaluates to zero (false) or non-zero (true).",
    examples: [
      {
        title: "Integer Truth",
        explanation: "Numbers are used directly as truth values in C.",
        code: "int speed = 100;\nif (speed) printf(\"Moving\");"
      },
      {
        title: "Zero is False",
        explanation: "The number 0 is the only integer that means false.",
        code: "int ammo = 0;\nif (ammo) printf(\"Fire!\"); // Won't run"
      },
      {
        title: "Comparison Result",
        explanation: "A comparison boils down to 1 (true) or 0 (false).",
        code: "int result = (10 > 5); // result is 1"
      }
    ],
    keyPoint: "C: 0 = false, any non-zero = true. if(1) is valid — no strict bool!"
  },
  {
    id: 202, title: "BOOLEAN", subtitle: "The <stdbool.h> Library",
    icon: ToggleLeft,
    content: "Modern C uses stdbool.h to define human-readable truth values.",
    examples: [
      {
        title: "The Modern Way",
        explanation: "Using actual 'bool' names instead of just 1 and 0.",
        code: "#include <stdbool.h>\nbool is_game_over = false;"
      },
      {
        title: "The Legacy Way",
        explanation: "How older C handles flags before the bool type existed.",
        code: "int enabled = 1;\nif (enabled) reboot();"
      },
      {
        title: "Conditional Bool",
        explanation: "Storing a true/false state from a test.",
        code: "bool large = count > 1000;"
      }
    ],
    keyPoint: "Classic: int flag = 1; | C99: #include <stdbool.h> bool flag = true;"
  },
  {
    id: 203, title: "IF", subtitle: "Branching Logic",
    icon: GitBranch,
    content: "The if statement executes a block only when its condition is not zero.",
    examples: [
      {
        title: "Single Statement",
        explanation: "If you only have one line, braces are optional but risky.",
        code: "if (score > 10) printf(\"Win\");"
      },
      {
        title: "Braced Block",
        explanation: "Use curly braces to group multiple lines under one if.",
        code: "if (shield < 10) {\n  alert();\n  recharge();\n}"
      },
      {
        title: "Parentheses Rule",
        explanation: "In C, the condition MUST be wrapped in ( ).",
        code: "if (1) { /* legal */ }\n// if 1 { /* error */ }"
      }
    ],
    keyPoint: "if (x > 10) { printf(\"Big\\n\"); } — always use {} in C!"
  },
  {
    id: 204, title: "IF-ELSE", subtitle: "Binary Decisions",
    icon: GitBranch,
    content: "If-else defines two mutually exclusive paths for your program.",
    examples: [
      {
        title: "Access Logic",
        explanation: "Provide a specific alternative if the check fails.",
        code: "if (pin == 1234) grant();\nelse deny();"
      },
      {
        title: "The Ternary C",
        explanation: "A compact way to pick one of two values.",
        code: "int max = (a > b) ? a : b;"
      },
      {
        title: "Dangling Else Trap",
        explanation: "Without braces, 'else' matches the nearest 'if' above it.",
        code: "if (A) {\n  if (B) doX(); \n} else doY(); // Fixes the trap!"
      }
    ],
    keyPoint: "Dangling else! if(A) if(B) X; else Y; — else belongs to if(B)!"
  },
  {
    id: 205, title: "ELSE-IF", subtitle: "The Decision Chain",
    icon: GitBranch,
    content: "Chain multiple conditions to handle complex scenarios.",
    examples: [
      {
        title: "Rank Checker",
        explanation: "Handling various numeric ranges sequentially.",
        code: "if (s > 90) r='S';\nelse if (s > 80) r='A';\nelse r='B';"
      },
      {
        title: "Independent Checks",
        explanation: "Each 'else if' is only reached if previous ones failed.",
        code: "if (a) x();\nelse if (b) y();"
      },
      {
        title: "Default Fallback",
        explanation: "The final 'else' catches anything not matched before.",
        code: "else { printf(\"Unknown Error\"); }"
      }
    ],
    keyPoint: "C switch works on int/char only — NOT strings! Always use break."
  },
  {
    id: 206, title: "NESTED", subtitle: "Internal Logic",
    icon: Layers,
    content: "Wrap an if statement inside another to handle layered rules.",
    examples: [
      {
        title: "Permission Layers",
        explanation: "Checking multiple levels of access.",
        code: "if (is_admin) {\n  if (has_key) edit();\n}"
      },
      {
        title: "Deep Bracing",
        explanation: "Indent your braces to keep nested logic readable.",
        code: "if (outer) {\n    if (inner) {\n        hit();\n    }\n}"
      },
      {
        title: "Validation Flow",
        explanation: "Check one fact after another in sequence.",
        code: "if (connected) {\n  if (available) start();\n}"
      }
    ],
    keyPoint: "In C, else always belongs to the NEAREST unmatched if — use {}!"
  },
  {
    id: 207, title: "COMPARE", subtitle: "Equality & Relational",
    icon: Code,
    content: "C operators check the relationship between two values.",
    examples: [
      {
        title: "Relational Set",
        explanation: "Using <, >, <=, and >= to check ranges.",
        code: "if (hp <= 0) respawn();"
      },
      {
        title: "The Equality Bug",
        explanation: "Careful! = is for setting, == is for checking.",
        code: "if (score == 100) win(); // compare\nscore = 100; // assignment"
      },
      {
        title: "Yoda Conditions",
        explanation: "Writing numbers first to prevent accidental assignment bugs.",
        code: "if (5 == x) { /* avoids x=5 error */ }"
      }
    ],
    keyPoint: "=== DANGER: if (x = 5) always true! (assigns) vs if (x == 5) (compares)"
  },
  {
    id: 208, title: "LOGICAL", subtitle: "Logical Bridges",
    icon: Filter,
    content: "Connect conditions using AND (&&), OR (||), and NOT (!).",
    examples: [
      {
        title: "Multiple Requirements",
        explanation: "Both conditions must be non-zero (True).",
        code: "if (has_key && at_door) open();"
      },
      {
        title: "Short-Circuit Safety",
        explanation: "If the first part fails, C skips the second part.",
        code: "if (ptr != NULL && ptr->val > 0) process();"
      },
      {
        title: "The Inverter",
        explanation: "Flip a truth value using the ! operator.",
        code: "if (!is_locked) enter();"
      }
    ],
    keyPoint: "if (ptr != NULL && ptr->data) — NULL check first saves crashes!"
  },
  {
    id: 209, title: "SWITCH", subtitle: "Case-Based Logic",
    icon: CheckCircle2,
    content: "The switch statement is an efficient way to check a variable against many constants.",
    examples: [
      {
        title: "Menu System",
        explanation: "Selecting an option directly by its ID.",
        code: "switch (choice) {\n  case 1: start(); break;\n  case 2: quit(); break;\n}"
      },
      {
        title: "Character Switch",
        explanation: "Matching symbols like + or - using their char values.",
        code: "switch (op) {\n  case '+': add(); break;\n}"
      },
      {
        title: "Fall-through Logic",
        explanation: "Omitting 'break' on purpose to group multiple cases.",
        code: "case 'a':\ncase 'A':\n    printf(\"Input is A\");\n    break;"
      }
    ],
    keyPoint: "Fall-through can be intentional! case 'A': case 'a': /* same code */"
  },
  {
    id: 210, title: "REALLIFE", subtitle: "Machine Applications",
    icon: Star,
    content: "C decisions power engines, medical tools, and entire operating systems.",
    examples: [
      {
        title: "Sensor Monitoring",
        explanation: "Reacting to hardware signals.",
        code: "if (temp_sensor > CRITICAL) shutdown();"
      },
      {
        title: "File Access",
        explanation: "Checking permissions before reading data.",
        code: "if (permission == READ_ONLY) block_write();"
      },
      {
        title: "Network Handler",
        explanation: "Dispatching packets based on their header type.",
        code: "switch (packet_type) {\n  case TCP: handle_tcp();\n}"
      }
    ],
    keyPoint: "Linux kernel, car ECUs, medical devices — all C if-else at the core."
  },
  {
    id: 211, title: "DEBUG_IF", subtitle: "Logic Bug Hunting",
    icon: AlertCircle,
    content: "Spot and fix the errors that commonly break C decision trees.",
    examples: [
      {
        title: "String Compare Error",
        explanation: "You MUST use strcmp() for text comparison in C.",
        code: "if (strcmp(p, \"123\") == 0) grant();\n// if (p == \"123\") // NO! Compares memory addresses"
      },
      {
        title: "Assignment Trap",
        explanation: "Accidentally turning a check into a command.",
        code: "if (x = 0) { } // Incorrect, makes x zero AND fails the check"
      },
      {
        title: "Switch Missing Break",
        explanation: "Forgetting break causes the computer to run the next case too.",
        code: "case 1: play(); // Runs play() THEN next case!"
      }
    ],
    keyPoint: "String compare in C: strcmp(s1,s2)==0, NOT s1==s2 (compares pointers!)"
  },
  {
    id: 212, title: "PREDICT", subtitle: "Mental Execution",
    icon: Zap,
    content: "Practice tracing code in your mind to avoid common logic pitfalls.",
    examples: [
      {
        title: "Sequential Trace",
        explanation: "Following the path through a nested structure.",
        code: "x = 5;\nif (x > 0) {\n  if (x < 10) win(); // YES\n}"
      },
      {
        title: "Else-If Trace",
        explanation: "Deciding which block is the ONLY one to run.",
        code: "int p = 5;\nif (p > 10) a();\nelse if (p > 0) b(); // THIS ONE RUNS\nelse c();"
      },
      {
        title: "Ternary Resolve",
        explanation: "Calculating a quick decision formula.",
        code: "int final = (10 > 5) ? 100 : 0; // final is 100"
      }
    ],
    keyPoint: "Always trace: is x > 20? No → is x > 10? Yes → 'B' prints!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 2 — C ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L2_TESTS = [
  {
    id: 213, title: "MCQ ADVENTURE", subtitle: "C Decisions Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "In C, 0 means?",                                       options: ["true","false","error","null"],                                            a: 1, hint: "C: zero = false, non-zero = true." },
      { q: "C logical AND operator is?",                           options: ["and","AND","&&","and()"],                                                 a: 2, hint: "Symbol-based, not word-based." },
      { q: "C switch works on which type?",                        options: ["float","string","int and char","bool only"],                              a: 2, hint: "Not floating point or strings!" },
      { q: "String comparison in C uses?",                         options: ["==","equals()","strcmp()","strcompare()"],                                a: 2, hint: "From <string.h>" },
      { q: "if (x = 5) in C is?",                                 options: ["Compare x to 5","Error","Assign 5 to x (always true!)","Valid equals"], a: 2, hint: "= is assignment, not comparison!" },
      { q: "Without break in switch, C does?",                    options: ["Exits switch","Error","Falls through to next case","Skips default"],     a: 2, hint: "Fall-through behavior in C!" },
      { q: "Dangling else problem in C?",                          options: ["else has no if","else attaches to nearest if","Multiple elses","No problem at all"], a: 1, hint: "Use {} to be explicit!" },
      { q: "stdbool.h in C provides?",                             options: ["Boolean operations","Sorting","Printf","Memory"],                        a: 0, hint: "bool, true, false — C99 addition." },
      { q: "if (ptr != NULL && ptr->val) — why check NULL first?", options: ["Style only","Prevents crash via short-circuit","Optimization","Required by C"],  a: 1, hint: "Short-circuit saves you!" },
      { q: "C ternary operator syntax?",                           options: ["a if cond else b","cond ? a : b","if(cond,a,b)","cond ?? a : b"],       a: 1, hint: "(a > b) ? a : b" },
      { q: "Output: if (0) printf('A'); else printf('B');?",       options: ["A","B","AB","Nothing"],                                                  a: 1, hint: "0 = false → else runs." },
      { q: "To include bool in classic C, use?",                   options: ["<bool.h>","<stdbool.h>","<types.h>","No need"],                         a: 1, hint: "C99 addition." }
    ]
  },
  {
    id: 214, title: "MATCH MASTER", subtitle: "C Decision Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "&&",           match: "Logical AND in C" },
      { concept: "||",           match: "Logical OR in C" },
      { concept: "!",            match: "Logical NOT in C" },
      { concept: "strcmp()",     match: "String comparison in C" },
      { concept: "stdbool.h",    match: "Header for bool type in C99" },
      { concept: "break",        match: "Prevents switch fall-through" },
      { concept: "== vs =",      match: "Compare vs assign (critical C bug)" },
      { concept: "dangling else", match: "else attaches to nearest if" }
    ]
  },
  {
    id: 215, title: "ROBO YES/NO", subtitle: "C Logic Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "In C, 0 means false and non-zero means true.",              a: true  },
      { q: "C switch statement works directly on strings.",             a: false },
      { q: "strcmp(s1, s2) == 0 means s1 and s2 are equal.",           a: true  },
      { q: "if (x = 5) compares x to 5 in C.",                        a: false },
      { q: "Without break, C switch falls through to next case.",       a: true  },
      { q: "stdbool.h is needed for bool in classic C.",               a: true  },
      { q: "else always attaches to the farthest unmatched if in C.",  a: false },
      { q: "In A && B, if A is 0, B is never evaluated.",              a: true  },
      { q: "C uses 'and' keyword for logical AND.",                    a: false },
      { q: "The ternary operator works in C: a > b ? a : b.",          a: true  }
    ]
  },
  {
    id: 216, title: "ALGO BUILDER", subtitle: "C Grade Calculator", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "C Grade Calculator Program",
      steps: [
        { id: 1, text: "#include <stdio.h> at top",                      order: 1 },
        { id: 2, text: "int score; scanf(\"%d\", &score);",              order: 2 },
        { id: 3, text: "if (score >= 90) printf(\"A\");",                order: 3 },
        { id: 4, text: "else if (score >= 80) printf(\"B\");",           order: 4 },
        { id: 5, text: "else printf(\"F\");",                            order: 5 }
      ]
    }
  },
  {
    id: 217, title: "C SORTER", subtitle: "C Condition Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["if", "(x", ">", "10)", "{"],                               answer: ["if", "(x", ">", "10)", "{"] },
      { tokens: ["switch", "(grade)", "{"],                                   answer: ["switch", "(grade)", "{"] },
      { tokens: ["if", "(strcmp(s1,", "s2)", "==", "0)"],                    answer: ["if", "(strcmp(s1,", "s2)", "==", "0)"] }
    ]
  }
];
