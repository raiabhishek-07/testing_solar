import { Terminal, Code, Zap, Cpu, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Type, ToggleLeft } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 1 — C LANGUAGE: "First Code" (13 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L1_FOUNDATION = [
  {
    id: 101, title: "STRUCTURE", subtitle: "C Program Anatomy",
    icon: Layers,
    content: "A C program starts with the main() function and relies on #include directives for basic tools like input and output.",
    examples: [
      {
        title: "The Hello Shell",
        explanation: "The minimum code required to run a C program.",
        code: "int main() {\n  return 0;\n}"
      },
      {
        title: "Including Library",
        explanation: "To use printf, you must include the standard I/O library.",
        code: "#include <stdio.h>\nint main() {\n  printf(\"Ready.\");\n  return 0;\n}"
      },
      {
        title: "Block Scope",
        explanation: "C code blocks are wrapped in curly braces { }.",
        code: "int main() {\n  {\n    // Nested block\n  }\n  return 0;\n}"
      }
    ],
    keyPoint: "#include <stdio.h> int main() { /* code */ return 0; }"
  },
  {
    id: 102, title: "PRINTF", subtitle: "Console Output",
    icon: Terminal,
    content: "The printf() function is used to send text and variables to the screen.",
    examples: [
      {
        title: "Simple String",
        explanation: "Printing literal text with a newline character \\n.",
        code: "printf(\"Hello Commander\\n\");"
      },
      {
        title: "Integer Placeholder",
        explanation: "Using %d to insert a whole number into your text.",
        code: "int kills = 42;\nprintf(\"Targets: %d\\n\", kills);"
      },
      {
        title: "Character Output",
        explanation: "Use %c for individual characters (single quotes).",
        code: "char rank = 'S';\nprintf(\"Rank: %c\\n\", rank);"
      }
    ],
    keyPoint: "printf(\"Hello World\\n\"); | printf(\"%d\\n\", 42);"
  },
  {
    id: 103, title: "FORMAT", subtitle: "Output Precision",
    icon: Code,
    content: "Format specifiers give you total control over how numbers and text appear.",
    examples: [
      {
        title: "Decimal Alignment",
        explanation: "Force a number to show exactly two decimal places.",
        code: "float ratio = 3.14159;\nprintf(\"Pi: %.2f\", ratio);"
      },
      {
        title: "Field Width",
        explanation: "Reserve space for a number to keep columns straight.",
        code: "printf(\"Score: %10d\", 500);"
      },
      {
        title: "Scientific Notation",
        explanation: "Use %e for very large mathematical figures.",
        code: "double e = 2.71828;\nprintf(\"Euler: %e\", e);"
      }
    ],
    keyPoint: "printf(\"%.2f\", 3.14159); → 3.14"
  },
  {
    id: 104, title: "VARIABLES", subtitle: "Data Storage",
    icon: Hash,
    content: "Variables must be declared with a specific type before they can store information.",
    examples: [
      {
        title: "Declaration",
        explanation: "Tell the compiler to reserve memory for a specific type.",
        code: "int armor_level;\nfloat shield_percent;"
      },
      {
        title: "Initialization",
        explanation: "Set an initial value to avoid 'garbage' data from memory.",
        code: "int ammo = 30;\ndouble version = 1.0;"
      },
      {
        title: "Memory Values",
        explanation: "Variables without initial values contain random bits of data.",
        code: "int ghost; // Content is random until set!"
      }
    ],
    keyPoint: "int age = 25; float temp; — uninitialized temp = garbage!"
  },
  {
    id: 105, title: "NAMING", subtitle: "Variable Labels",
    icon: Shield,
    content: "C is case-sensitive and has strict rules for what makes a valid name.",
    examples: [
      {
        title: "Case Sensitivity",
        explanation: "Names with different capitalization are separate variables.",
        code: "int data = 1;\nint DATA = 2;\nint DaTa = 3;"
      },
      {
        title: "Snake Case",
        explanation: "Common C convention is to use underscores for multi-word names.",
        code: "int current_speed_limit = 60;"
      },
      {
        title: "Starting with Underscore",
        explanation: "Avoid starting names with _ as they are often used by systems.",
        code: "int _sys_total = 0; // Legal but risky"
      }
    ],
    keyPoint: "✅ my_age, score1, _count ❌ 1score, my-var, int, return"
  },
  {
    id: 106, title: "INT", subtitle: "Whole Numbers",
    icon: Cpu,
    content: "The int type stores positive and negative whole numbers.",
    examples: [
      {
        title: "Integer Math",
        explanation: "Basic arithmetic operations result in integers.",
        code: "int a = 10, b = 3;\nint res = a / b; // res is 3"
      },
      {
        title: "Overflow Point",
        explanation: "Standard ints have a max limit (approx 2 billion).",
        code: "int max = 2147483647;"
      },
      {
        title: "Unsigned Ints",
        explanation: "Use unsigned to store only positive numbers (doubles the max).",
        code: "unsigned int score = 0;"
      }
    ],
    keyPoint: "int x = 42; | unsigned int count = 0; | 7/2 = 3"
  },
  {
    id: 107, title: "FLOAT", subtitle: "Decimal Types",
    icon: Cpu,
    content: "Floats and doubles handle numbers with decimal points.",
    examples: [
      {
        title: "Float Precision",
        explanation: "Use 'f' suffix when assigning direct float values.",
        code: "float temp = 98.6f;"
      },
      {
        title: "The Double Type",
        explanation: "Offers twice the precision of float (default for decimals).",
        code: "double precise_v = 0.0000000001;"
      },
      {
        title: "Mixed Math",
        explanation: "Dividing by a float ensures a float result.",
        code: "float avg = 10 / 3.0; // 3.333333"
      }
    ],
    keyPoint: "float pi = 3.14f; | double pi = 3.14159; | printf(\"%f\", pi);"
  },
  {
    id: 108, title: "CHAR/STRING", subtitle: "Characters & Arrays",
    icon: Type,
    content: "C uses char for single symbols and arrays of chars for text.",
    examples: [
      {
        title: "Single Char",
        explanation: "Use single quotes for one character.",
        code: "char grade = 'A';"
      },
      {
        title: "Character Array",
        explanation: "A string in C is just a group of characters.",
        code: "char user[] = \"Neo\";"
      },
      {
        title: "The Null Terminator",
        explanation: "Every C string ends with a invisible \\0 character.",
        code: "char word[4] = {'H','i','!','\\0'};"
      }
    ],
    keyPoint: "char name[] = \"Alice\"; | 'A' = char | \"Alice\" = char array"
  },
  {
    id: 109, title: "INT_BOOL", subtitle: "Legacy Logic",
    icon: ToggleLeft,
    content: "Older C used 0 for false and 1 for true. Modern C uses <stdbool.h>.",
    examples: [
      {
        title: "Integer Truth",
        explanation: "Anything that isn't zero is considered true in C.",
        code: "int active = 5;\nif (active) printf(\"Running\");"
      },
      {
        title: "The New Bool",
        explanation: "Importing modern boolean names.",
        code: "#include <stdbool.h>\nbool is_alive = true;"
      },
      {
        title: "Logical Toggle",
        explanation: "Simple logic using integers.",
        code: "int flag = 0;\nflag = !flag; // flag is now 1"
      }
    ],
    keyPoint: "Old C: int flag = 0; (0=false) | C99: #include <stdbool.h>"
  },
  {
    id: 110, title: "ASSIGN", subtitle: "Variable Updates",
    icon: Zap,
    content: "Modify stored values using assignment operators.",
    examples: [
      {
        title: "Reassignment",
        explanation: "Simply give an old variable a brand new value.",
        code: "int hp = 100;\nhp = 50;"
      },
      {
        title: "Compound Updates",
        explanation: "Quickly perform math and store the result.",
        code: "int score = 10;\nscore += 5; // score is 15"
      },
      {
        title: "Inc/Dec",
        explanation: "Add or subtract exactly one.",
        code: "int count = 0;\ncount++; // count is 1\ncount--; // count is 0"
      }
    ],
    keyPoint: "x = 5; (assign) vs x == 5 (compare) | x++ | x += 5;"
  },
  {
    id: 111, title: "SCANF", subtitle: "Keyboard Input",
    icon: HelpCircle,
    content: "The scanf() function waits for the user to type data into the console.",
    examples: [
      {
        title: "Integer Input",
        explanation: "You MUST use the ampersand & to tell scanf where the variable is.",
        code: "int age;\nscanf(\"%d\", &age);"
      },
      {
        title: "Float Input",
        explanation: "Use %f to read decimal numbers.",
        code: "float price;\nscanf(\"%f\", &price);"
      },
      {
        title: "String Input",
        explanation: "For arrays, the & symbol is not used.",
        code: "char name[30];\nscanf(\"%s\", name);"
      }
    ],
    keyPoint: "scanf(\"%d\", &x); — the & is critical!"
  },
  {
    id: 112, title: "COMMENTS", subtitle: "Developer Notes",
    icon: Code,
    content: "Comments help you document how your machine works.",
    examples: [
      {
        title: "Block Comment",
        explanation: "The traditional C way to write notes.",
        code: "/* This covers\n   multiple lines */"
      },
      {
        title: "Line Comment",
        explanation: "Modern C (C99+) way to write quick notes.",
        code: "// One line only"
      },
      {
        title: "Disabled Code",
        explanation: "Use comments to temporarily stop code from running.",
        code: "// delete_all_files();\nprintf(\"Safe.\");"
      }
    ],
    keyPoint: "/* multi-line */ | // single-line (C99+)"
  },
  {
    id: 113, title: "KEYWORDS", subtitle: "Protected Words",
    icon: Star,
    content: "These words belong to the C language and cannot be used as variable names.",
    examples: [
      {
        title: "Keyword Error",
        explanation: "Attempting to use a reserved word for a variable name.",
        code: "int float = 5; // ERROR!\nint int = 10; // ERROR!"
      },
      {
        title: "Case in Keywords",
        explanation: "Keywords must be lowercase.",
        code: "RETURN 0; // ERROR\nreturn 0; // CORRECT"
      },
      {
        title: "Common Reserved",
        explanation: "Includes static, void, const, for, if, and break.",
        code: "const int MAX = 100;"
      }
    ],
    keyPoint: "int ≠ INT ≠ Int in C."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 1 — C ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L1_TESTS = [
  {
    id: 113, title: "MCQ ADVENTURE", subtitle: "C First Code Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "C output function is?",                               options: ["print()","System.out.println()","printf()","cout"],                        a: 2, hint: "Formatted print from stdio.h." },
      { q: "What does & mean in scanf(\"%d\", &x)?",             options: ["Multiply","AND operator","Address of x","Reference"],                      a: 2, hint: "scanf needs to know WHERE to write." },
      { q: "C string terminator is?",                            options: ["\\r","\\t","\\n","\\0"],                                                   a: 3, hint: "Null terminator marks string end." },
      { q: "For a char variable, use?",                          options: ["double quotes","single quotes","backticks","no quotes"],                   a: 1, hint: "char c = 'A'; — single quotes!'" },
      { q: "C bool type needs which header?",                    options: ["<bool.h>","<stdbool.h>","<stdlib.h>","No header, built-in"],              a: 1, hint: "C99 addition for boolean support." },
      { q: "In C, 7/2 equals?",                                  options: ["3.5","3","4","Error"],                                                     a: 1, hint: "Integer division truncates!" },
      { q: "Which is a C comment?",                              options: ["# comment","// comment","-- comment","Both A and B"],                      a: 1, hint: "// added in C99, /* */ always valid." },
      { q: "Uninitialized variables in C hold?",                 options: ["Zero","null","Garbage value","False"],                                    a: 2, hint: "Always initialize in C!" },
      { q: "printf format for float is?",                        options: ["%i","%d","%f","%s"],                                                      a: 2, hint: "f = floating point." },
      { q: "C language string type is?",                         options: ["string","String","char[]","str"],                                          a: 2, hint: "C has no built-in string type." },
      { q: "Every C statement ends with?",                       options: ["newline","{}","semicolon (;)","period"],                                  a: 2, hint: "Missing ; = compile error." },
      { q: "x++ vs ++x difference?",                             options: ["No difference","x++ post-increment (use, then add)","++x adds first","Both B and C"], a: 3, hint: "Matters inside expressions." }
    ]
  },
  {
    id: 114, title: "MATCH MASTER", subtitle: "C Type Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "printf()",      match: "Formatted output in C" },
      { concept: "scanf()",       match: "Reads formatted user input" },
      { concept: "int",           match: "Whole number (32-bit typical)" },
      { concept: "double",        match: "64-bit decimal precision" },
      { concept: "char[]",        match: "String representation in C" },
      { concept: "\\0",           match: "String null terminator character" },
      { concept: "/* */",         match: "Multi-line comment in C" },
      { concept: "&x",            match: "Address of variable x" }
    ]
  },
  {
    id: 115, title: "ROBO YES/NO", subtitle: "C Syntax Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "Every C statement must end with a semicolon.",         a: true  },
      { q: "C has a built-in string data type.",                   a: false },
      { q: "scanf() needs & before the variable for integers.",    a: true  },
      { q: "In C, 0 means false and non-zero means true.",        a: true  },
      { q: "printf() needs no format specifiers.",                 a: false },
      { q: "char holds a single character in C.",                  a: true  },
      { q: "C is case-insensitive (INT = int).",                   a: false },
      { q: "7/2 in C integer division equals 3.",                  a: true  },
      { q: "C programs must start from the main() function.",      a: true  },
      { q: "Uninitialized variables in C default to 0.",           a: false }
    ]
  },
  {
    id: 116, title: "ALGO BUILDER", subtitle: "C Program Steps", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Write a C 'Hello User' Program",
      steps: [
        { id: 1, text: "#include <stdio.h> at the top",                   order: 1 },
        { id: 2, text: "Write: int main() {",                             order: 2 },
        { id: 3, text: "Declare: char name[50];",                         order: 3 },
        { id: 4, text: "Use: scanf(\"%s\", name); to read input",        order: 4 },
        { id: 5, text: "Use: printf(\"Hello %s\\n\", name); for output", order: 5 }
      ]
    }
  },
  {
    id: 117, title: "C SORTER", subtitle: "C Syntax Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["int", "age", "=", "25;"],                                      answer: ["int", "age", "=", "25;"] },
      { tokens: ["printf(", "\"%d\\n\"", ",", "age", ");"],                       answer: ["printf(", "\"%d\\n\"", ",", "age", ");"] },
      { tokens: ["scanf(", "\"%d\"", ",", "&age", ");"],                          answer: ["scanf(", "\"%d\"", ",", "&age", ");"] }
    ]
  }
];
