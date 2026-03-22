import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 2 — C++: "Decisions" (12 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L2_FOUNDATION = [
  {
    id: 201, title: "CONDITION", subtitle: "Branching Logic",
    icon: HelpCircle,
    content: "C++ conditions can be boolean expressions OR integers (0 = false, non-zero = true).",
    examples: [
      {
        title: "The Boolean Test",
        explanation: "The standard way to check a condition in C++.",
        code: "bool ready = true;\nif (ready) start();"
      },
      {
        title: "Integer Truthiness",
        explanation: "Like C, integers can be used directly as conditions.",
        code: "int count = 5;\nif (count) cout << \"Non-zero!\";"
      },
      {
        title: "The Initializer (C++17)",
        explanation: "Declare a variable specifically for the if-check.",
        code: "if (int x = get_code(); x > 100) {\n  process(x);\n}"
      }
    ],
    keyPoint: "C++17: if (auto x = func(); x > 0) { } — declare and check in one!"
  },
  {
    id: 202, title: "BOOLEAN", subtitle: "True & False States",
    icon: ToggleLeft,
    content: "C++ has a native bool type that represents true and false directly.",
    examples: [
      {
        title: "Flag Setup",
        explanation: "Setting status variables to track program state.",
        code: "bool is_active = true;\nbool has_error = false;"
      },
      {
        title: "Conversion from Int",
        explanation: "Converting numbers into true/false values.",
        code: "bool val = (bool)1; // true"
      },
      {
        title: "Better Output",
        explanation: "Printing words instead of 0/1 for booleans.",
        code: "cout << boolalpha << is_active; // prints 'true'"
      }
    ],
    keyPoint: "bool flag = true; | cout << boolalpha << flag; → 'true'"
  },
  {
    id: 203, title: "IF", subtitle: "Single-Path Decision",
    icon: GitBranch,
    content: "The if statement runs a block of code only if its condition is true.",
    examples: [
      {
        title: "Condition Check",
        explanation: "Most basic form of program decision making.",
        code: "if (level == 10) unlock_door();"
      },
      {
        title: "Scoped Variables",
        explanation: "C++17 allows you to keep the if-variable hidden from the rest of the code.",
        code: "if (auto result = query(); !result.empty()) {\n  print(result);\n}"
      },
      {
        title: "Indented Blocks",
        explanation: "Always use braces for multi-line instructions.",
        code: "if (hp < 20) {\n  beep();\n  alert();\n}"
      }
    ],
    keyPoint: "C++17: if (auto x = getVal(); x > 0) { } — x only lives in if block!"
  },
  {
    id: 204, title: "IF-ELSE", subtitle: "Dual-Path Decision",
    icon: GitBranch,
    content: "If-else defines what happens when a condition is met, and what happens when it isn't.",
    examples: [
      {
        title: "A/B Choice",
        explanation: "Deciding between two different code paths.",
        code: "if (logged_in) show_user();\nelse show_login();"
      },
      {
        title: "Modern Ternary",
        explanation: "An expression that returns a value based on a condition.",
        code: "string status = (hp > 0) ? \"Alive\" : \"Dead\";"
      },
      {
        title: "Braced Choice",
        explanation: "Grouping logic together for both paths.",
        code: "if (A) { setup(); x(); }\nelse { cleanup(); y(); }"
      }
    ],
    keyPoint: "auto max = (a > b) ? a : b; | if constexpr (C++17 templates only)"
  },
  {
    id: 205, title: "ELSE-IF", subtitle: "The Decision Chain",
    icon: GitBranch,
    content: "Chain multiple else-if statements to handle several possible outcomes.",
    examples: [
      {
        title: "Range Logic",
        explanation: "Checking a scale of values from top to bottom.",
        code: "if (x > 90) rank = 'S';\nelse if (x > 80) rank = 'A';\nelse rank = 'F';"
      },
      {
        title: "Multiple Options",
        explanation: "Once one true condition is found, the rest are skipped.",
        code: "if (red) stop();\nelse if (green) go();"
      },
      {
        title: "The Reset",
        explanation: "Using a final else to reset or handle errors.",
        code: "else { reset_system(); }"
      }
    ],
    keyPoint: "C++: switch works on int, char, enum. C++20 adds better patterns."
  },
  {
    id: 206, title: "NESTED", subtitle: "Internal Rules",
    icon: Layers,
    content: "Nesting if statements handles complex logic involving multiple dependencies.",
    examples: [
      {
        title: "Double Lock",
        explanation: "One check must pass before the second is even tried.",
        code: "if (is_valid) {\n    if (is_admin) open_vault();\n}"
      },
      {
        title: "Guard Clauses",
        explanation: "Flipping logic to keep the code 'flat' and readable.",
        code: "if (!ready) return;\n// continue with main logic..."
      },
      {
        title: "Inner Scoping",
        explanation: "Using nesting to define logic within a specific context.",
        code: "if (game_active) {\n  if (player_hit) damage();\n}"
      }
    ],
    keyPoint: "Modern C++: use guard clauses (early return) instead of deep nesting."
  },
  {
    id: 207, title: "COMPARE", subtitle: "Logic Operators",
    icon: Code,
    content: "C++ provides standard comparison and the modern 'spaceship' operator.",
    examples: [
      {
        title: "String Compare",
        explanation: "In C++, == checks the actual text of strings.",
        code: "string a = \"test\";\nif (a == \"test\") cout << \"Match\";"
      },
      {
        title: "Spaceship (C++20)",
        explanation: "The <=> returns if one value is less, greater, or equal in one go.",
        code: "auto res = (a <=> b);\nif (res < 0) cout << \"A is less\";"
      },
      {
        title: "Inequality",
        explanation: "Using != to check for different values.",
        code: "if (id != current) update();"
      }
    ],
    keyPoint: "C++ string: 'str1 == str2' WORKS (unlike Java)! C++20: <=> three-way."
  },
  {
    id: 208, title: "LOGICAL", subtitle: "Connecting Logic",
    icon: Filter,
    content: "Connect multiple boolean statements using AND, OR, and NOT.",
    examples: [
      {
        title: "AND Requirement",
        explanation: "Both halves must be non-zero.",
        code: "if (has_id && is_adult) enter();"
      },
      {
        title: "OR Requirement",
        explanation: "At least one half must be non-zero.",
        code: "if (is_admin || is_owner) edit();"
      },
      {
        title: "C++ Word Icons",
        explanation: "C++ also lets you use literal words like 'and' or 'or'.",
        code: "if (valid and active) run();"
      }
    ],
    keyPoint: "C++: && = and | || = or | ! = not — BOTH syntaxes valid!"
  },
  {
    id: 209, title: "SWITCH", subtitle: "Efficient Matching",
    icon: CheckCircle2,
    content: "The switch statement maps a single variable to many possible constant results.",
    examples: [
      {
        title: "Enum Switch",
        explanation: "Perfect for handling states in a game or system.",
        code: "switch (state) {\n  case State::IDLE: wait(); break;\n  case State::RUN: move(); break;\n}"
      },
      {
        title: "Initializer Switch",
        explanation: "Declare the value specifically for the switch (C++17).",
        code: "switch (int c = read(); c) {\n  case 'q': quit(); break;\n}"
      },
      {
        title: "Fall-through Marker",
        explanation: "Telling the compiler that a missing 'break' is on purpose.",
        code: "case 1:\ncase 2: // purposefully grouping\n  start();\n  break;"
      }
    ],
    keyPoint: "C++ switch on enum: compiler warns if you forget a case — great safety!"
  },
  {
    id: 210, title: "REALLIFE", subtitle: "Engine Decisions",
    icon: Star,
    content: "C++ logic runs high-performance systems from browser engines to game platforms.",
    examples: [
      {
        title: "Game Controller",
        explanation: "Handling input and environment state.",
        code: "if (jump_pressed && is_grounded) jump();"
      },
      {
        title: "Browser Engine",
        explanation: "Deciding how to render a page element.",
        code: "if (display == \"none\") hide();"
      },
      {
        title: "Robotics",
        explanation: "Real-time decisions for mechanical movement.",
        code: "if (dist < 10) stop_servos();"
      }
    ],
    keyPoint: "Unreal Engine, Chrome, Photoshop — all C++ if-else at the core!"
  },
  {
    id: 211, title: "DEBUG_IF", subtitle: "Common Traps",
    icon: AlertCircle,
    content: "Avoid these common mistakes to keep your logic paths clean and functional.",
    examples: [
      {
        title: "The Equality Slip",
        explanation: "Don't use = (assignment) when you want == (comparison).",
        code: "if (score = 10) // Always true, sets score to 10!"
      },
      {
        title: "Switch Fall-through",
        explanation: "Forgetting 'break' is the #1 switch bug.",
        code: "case 1: start(); // Runs case 2 as well if no break!"
      },
      {
        title: "NULL Comparison",
        explanation: "Always use nullptr instead of the old NULL or 0.",
        code: "if (ptr == nullptr) exit();"
      }
    ],
    keyPoint: "C++: nullptr over NULL | string == works | use [[nodiscard]] on returns."
  },
  {
    id: 212, title: "PREDICT", subtitle: "Mental Engine",
    icon: Zap,
    content: "Learn to predict exactly what path your code will take before running it.",
    examples: [
      {
        title: "Complex Or",
        explanation: "Tracing multiple logical connections.",
        code: "if (false || (true && 1)) // results in true"
      },
      {
        title: "Negative Logic",
        explanation: "Using 'not' (!) to flip your expectations.",
        code: "bool dead = false;\nif (!dead) respawn(); // Runs"
      },
      {
        title: "Chained Else If",
        explanation: "Seeing which block catches the variable first.",
        code: "int val = 20;\nif (val > 30) a();\nelse if (val > 10) b(); // Match!"
      }
    ],
    keyPoint: "C++ string == works! 'hello' == 'hello' → true — no .equals() needed!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 2 — C++ ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L2_TESTS = [
  {
    id: 213, title: "MCQ ADVENTURE", subtitle: "C++ Decisions Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "C++ std::string == does what?",                        options: ["Compares address","Compares content","Error","Always false"],             a: 1, hint: "Unlike Java, C++ string == works!" },
      { q: "C++ logical AND can be written as?",                   options: ["and only","&& only","Both and and &&","and() function"],                  a: 2, hint: "Both are valid C++ syntax." },
      { q: "C++17 if with initializer: if (auto x = f(); x>0)?",  options: ["Syntax Error","Valid — x scoped to if","x is global","Compile error"],   a: 1, hint: "C++17 feature for cleaner scope." },
      { q: "C++ spaceship operator <=> returns?",                  options: ["bool","Three-way comparison","int","string"],                             a: 1, hint: "C++20 addition." },
      { q: "C++ bool output with boolalpha shows?",               options: ["1/0","true/false","YES/NO","T/F"],                                        a: 1, hint: "cout << boolalpha << true;" },
      { q: "In C++, string s = 'hi'; s == 'hi' is?",             options: ["Error","Always false","True (content match)","Undefined"],                a: 2, hint: "std::string == compares content!" },
      { q: "C++ switch works on?",                                options: ["int, char, enum","float only","string only","All types"],                  a: 0, hint: "Not float or string directly." },
      { q: "Guard clause in C++ means?",                          options: ["Big nested ifs","Early return if condition fails","Guards memory","Locks thread"], a: 1, hint: "Flat code philosophy." },
      { q: "nullptr vs NULL in modern C++?",                      options: ["Same thing","nullptr is type-safe preferred","NULL is preferred","No diff"], a: 1, hint: "nullptr introduced in C++11." },
      { q: "C++ 'not' keyword is equivalent to?",                 options: ["&&","||","!","~"],                                                         a: 2, hint: "Keyword alternative for !." },
      { q: "Output: if (0) cout<<'A'; else cout<<'B';?",          options: ["A","B","AB","Error"],                                                     a: 1, hint: "0 = false → else runs." },
      { q: "[[nodiscard]] in C++ means?",                         options: ["No return value","Compiler warns if return value ignored","Mark as const","Thread safe"], a: 1, hint: "Prevents silently ignoring results." }
    ]
  },
  {
    id: 214, title: "MATCH MASTER", subtitle: "C++ Decision Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "&&",             match: "Logical AND (also: 'and')" },
      { concept: "||",             match: "Logical OR (also: 'or')" },
      { concept: "!",              match: "Logical NOT (also: 'not')" },
      { concept: "string ==",      match: "Content comparison (works in C++!)" },
      { concept: "nullptr",        match: "Type-safe null pointer (C++11)" },
      { concept: "<=>",            match: "Three-way comparison (C++20)" },
      { concept: "boolalpha",      match: "Makes cout print true/false (not 1/0)" },
      { concept: "if constexpr",   match: "Compile-time condition (C++17)" }
    ]
  },
  {
    id: 215, title: "ROBO YES/NO", subtitle: "C++ Logic Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "C++ std::string == compares content correctly.",            a: true  },
      { q: "C++ 'and' and '&&' do the same thing.",                   a: true  },
      { q: "C++ requires .equals() for string comparison like Java.",  a: false },
      { q: "C++17 allows variable declaration inside if condition.",   a: true  },
      { q: "nullptr is type-safe while NULL is not in C++.",          a: true  },
      { q: "C++ bool type ONLY allows 0 and 1 (not true/false).",     a: false },
      { q: "C++ switch works directly on float type.",                 a: false },
      { q: "boolalpha makes cout print 'true'/'false' not 1/0.",      a: true  },
      { q: "Guard clauses use early return to avoid deep nesting.",    a: true  },
      { q: "C++20 spaceship <=> does three-way comparison.",          a: true  }
    ]
  },
  {
    id: 216, title: "ALGO BUILDER", subtitle: "C++ Grade Calculator", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "C++ Grade Calculator",
      steps: [
        { id: 1, text: "#include <iostream> using namespace std;",    order: 1 },
        { id: 2, text: "int score; cin >> score;",                    order: 2 },
        { id: 3, text: "if (score >= 90) cout << 'A';",              order: 3 },
        { id: 4, text: "else if (score >= 80) cout << 'B';",         order: 4 },
        { id: 5, text: "else cout << 'F' << endl;",                  order: 5 }
      ]
    }
  },
  {
    id: 217, title: "C++ SORTER", subtitle: "C++ Condition Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["if", "(x", ">", "10)", "{"],                                answer: ["if", "(x", ">", "10)", "{"] },
      { tokens: ["bool", "flag", "=", "true;"],                               answer: ["bool", "flag", "=", "true;"] },
      { tokens: ["if", "(str1", "==", "str2)"],                               answer: ["if", "(str1", "==", "str2)"] }
    ]
  }
];
