import { Terminal, Code, Zap, Cpu, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Type, ToggleLeft } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 1 — C++: "First Code" (13 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L1_FOUNDATION = [
  {
    id: 101, title: "STRUCTURE", subtitle: "C++ Program Skeleton",
    icon: Layers,
    content: "A C++ program relies on headers, namespaces, and the main entry point to function correctly.",
    examples: [
      {
        title: "The Minimalist",
        explanation: "The shortest possible C++ program that compiles.",
        code: "int main() {\n  return 0;\n}"
      },
      {
        title: "The Header Inclusion",
        explanation: "Using #include to bring in input/output tools.",
        code: "#include <iostream>\nint main() {\n  std::cout << \"Ready\";\n  return 0;\n}"
      },
      {
        title: "Using Namespace",
        explanation: "Avoid typing 'std::' every time by declaring a namespace.",
        code: "#include <iostream>\nusing namespace std;\nint main() {\n  cout << \"Simplified\";\n  return 0;\n}"
      }
    ],
    keyPoint: "#include <iostream>  using namespace std;  int main() { return 0; }"
  },
  {
    id: 102, title: "COUT", subtitle: "Stream Output",
    icon: Terminal,
    content: "The cout stream (Character OUTput) is the standard way to send data to the console.",
    examples: [
      {
        title: "Basic String",
        explanation: "Send a literal string to the console stream.",
        code: "cout << \"Hello World\";"
      },
      {
        title: "Chaining Operators",
        explanation: "Join multiple pieces of data into a single line output.",
        code: "int score = 100;\ncout << \"Score: \" << score << endl;"
      },
      {
        title: "Endline Control",
        explanation: "Using endl to move the cursor to a new line and clear the output memory.",
        code: "cout << \"Line 1\" << endl << \"Line 2\";"
      }
    ],
    keyPoint: "cout << \"Hello C++\" << endl; — chain with << operator"
  },
  {
    id: 103, title: "FORMAT", subtitle: "I/O Manipulation",
    icon: Code,
    content: "The <iomanip> library allows you to style your output with precision and alignment.",
    examples: [
      {
        title: "Decimal Precision",
        explanation: "Round a floating point number to a specific number of places.",
        code: "#include <iomanip>\ncout << fixed << setprecision(2) << 3.14159;"
      },
      {
        title: "Field Width",
        explanation: "Create aligned columns by setting the character width.",
        code: "cout << setw(10) << \"Player\" << setw(10) << \"Score\";"
      },
      {
        title: "Alignment",
        explanation: "Force text to the left or right of its reserved space.",
        code: "cout << left << setw(20) << \"Agent Name\";"
      }
    ],
    keyPoint: "cout << fixed << setprecision(2) << 3.14159; → 3.14"
  },
  {
    id: 104, title: "VARIABLES", subtitle: "Object Storage",
    icon: Hash,
    content: "Variables hold data in memory. C++ requires you to name the type before the variable.",
    examples: [
      {
        title: "Classic Declaration",
        explanation: "Reserve a named spot in memory for an integer.",
        code: "int base_power = 9000;"
      },
      {
        title: "Modern Init (C++11)",
        explanation: "Using curly braces { } prevents accidental data loss during assignment.",
        code: "int energy{100};"
      },
      {
        title: "Auto Type Discovery",
        explanation: "Let the compiler guess the type based on the initial value.",
        code: "auto data = 3.14; // Compiler sees double"
      }
    ],
    keyPoint: "int age = 25; auto x = 3.14; int y{100}; (C++11)"
  },
  {
    id: 105, title: "NAMING", subtitle: "Variable Rules",
    icon: Shield,
    content: "Identifiers must be unique and follow C++ naming conventions.",
    examples: [
      {
        title: "Camel Case",
        explanation: "Preferred style for many C++ developers (start small, then big).",
        code: "int currentUserLevel = 5;"
      },
      {
        title: "Snake Case",
        explanation: "Using underscores to separate words.",
        code: "int max_armor_value = 250;"
      },
      {
        title: "Case Sensitivity",
        explanation: "Uppercase and lowercase are distinct.",
        code: "int key = 1; int KEY = 2; // Separate variables"
      }
    ],
    keyPoint: "✅ myAge, user_name, Score ❌ 1var, class, int"
  },
  {
    id: 106, title: "INT", subtitle: "Whole Numbers",
    icon: Cpu,
    content: "The int type stores integers. Modern C++ also offers exact-width types.",
    examples: [
      {
        title: "Basic Int",
        explanation: "Standard 32-bit whole numbers.",
        code: "int x = 10, y = -5;"
      },
      {
        title: "Large Numbers",
        explanation: "Use long long for values exceeding 2 billion.",
        code: "long long big_num = 9000000000LL;"
      },
      {
        title: "Fixed Width",
        explanation: "Ensuring a variable is exactly 16 bits regardless of computer.",
        code: "#include <cstdint>\nint16_t small_val = 32000;"
      }
    ],
    keyPoint: "int x = 42; | int64_t for large values | auto n = 5;"
  },
  {
    id: 107, title: "FLOAT", subtitle: "Decimal Precision",
    icon: Cpu,
    content: "C++ uses float, double, and long double for numbers with points.",
    examples: [
      {
        title: "Float Literal",
        explanation: "Use the 'f' suffix to tell C++ you want a float, not a double.",
        code: "float speed = 25.5f;"
      },
      {
        title: "The Double Default",
        explanation: "Doubles are the standard choice for decimal math in C++.",
        code: "double gravity = 9.80665;"
      },
      {
        title: "Scientific Notation",
        explanation: "Representing powers of 10 easily.",
        code: "double light = 3.0e8;"
      }
    ],
    keyPoint: "double pi = 3.14159; | float temp = 36.6f; (needs 'f'!)"
  },
  {
    id: 108, title: "STRING", subtitle: "True Text Class",
    icon: Type,
    content: "Unlike C, C++ includes a powerful 'string' class for handling text with ease.",
    examples: [
      {
        title: "The String Class",
        explanation: "Modern way to store words without using character arrays.",
        code: "#include <string>\nstring user = \"Commander\";"
      },
      {
        title: "Combining Words",
        explanation: "Use the + operator to glue strings together.",
        code: "string full = \"Alpha\" + \" \" + \"Squad\";"
      },
      {
        title: "Text Length",
        explanation: "Ask a string exactly how many characters it holds.",
        code: "string msg = \"Java\";\nint len = msg.length(); // 4"
      }
    ],
    keyPoint: "string name = \"Alice\"; name == \"Alice\" → true ✅"
  },
  {
    id: 109, title: "BOOL", subtitle: "Logical State",
    icon: ToggleLeft,
    content: "The bool type represents true and false directly.",
    examples: [
      {
        title: "Native Boolean",
        explanation: "Booleans can be assigned True or False directly.",
        code: "bool is_active = true;\nbool is_locked = false;"
      },
      {
        title: "Numeric Conversion",
        explanation: "In C++, 0 is false and any other number is true.",
        code: "bool check = 5; // true\nbool fail = 0; // false"
      },
      {
        title: "Alpha Output",
        explanation: "Make cout print 'true' instead of '1'.",
        code: "cout << boolalpha << true;"
      }
    ],
    keyPoint: "bool flag = true; | prints as 1/0 unless using boolalpha."
  },
  {
    id: 110, title: "ASSIGN", subtitle: "Value Updates",
    icon: Zap,
    content: "Update variables as your program runs using assignment operators.",
    examples: [
      {
        title: "Standard Reassign",
        explanation: "Overwrite the previous value.",
        code: "int level = 10;\nlevel = 11;"
      },
      {
        title: "Math Shortcut",
        explanation: "Perform an operation and store the result in one symbol.",
        code: "int hp = 100;\nhp -= 10; // hp is 90"
      },
      {
        title: "Increment",
        explanation: "The famous C++ operator (++) adds 1.",
        code: "int count = 0;\ncount++; // count is 1"
      }
    ],
    keyPoint: "int x = 5; x += 3; x++; — concise updates."
  },
  {
    id: 111, title: "CIN", subtitle: "Stream Input",
    icon: HelpCircle,
    content: "The cin stream (Character INput) reads keyboard data into your variables.",
    examples: [
      {
        title: "Basic Extraction",
        explanation: "Pull data from the stream into a variable.",
        code: "int age;\ncin >> age;"
      },
      {
        title: "Multi-Input",
        explanation: "Read multiple values separated by spaces in one go.",
        code: "int x, y;\ncin >> x >> y;"
      },
      {
        title: "Full Line Read",
        explanation: "Read a sentence including spaces (cin alone stops at space).",
        code: "string text;\ngetline(cin, text);"
      }
    ],
    keyPoint: "cin >> x; | getline(cin, name); — inputs made easy."
  },
  {
    id: 112, title: "COMMENTS", subtitle: "Developer Documentation",
    icon: Code,
    content: "Write notes to explain your logic for yourself and your team.",
    examples: [
      {
        title: "Single Line",
        explanation: "The modern C++ way to write short notes.",
        code: "// This is a note"
      },
      {
        title: "Docstrings (///)",
        explanation: "Special comments used by tools to build help manuals.",
        code: "/// Starts the main engine protocol"
      },
      {
        title: "Block Note",
        explanation: "Classic C-style for long explanations.",
        code: "/* Line 1\n   Line 2 */"
      }
    ],
    keyPoint: "// single line | /* multi-line */ | /// Doxygen"
  },
  {
    id: 113, title: "KEYWORDS", subtitle: "Language Vocabulary",
    icon: Star,
    content: "Reserved words that form the skeleton of the C++ language.",
    examples: [
      {
        title: "Prohibited Names",
        explanation: "You cannot name your variables after language features.",
        code: "int class = 1; // ERROR!\nint void = 0; // ERROR!"
      },
      {
        title: "The Null Pointer",
        explanation: "In modern C++, use nullptr instead of 0 or NULL.",
        code: "int* ptr = nullptr;"
      },
      {
        title: "Const Mode",
        explanation: "The 'const' keyword makes a value permanent.",
        code: "const double PI = 3.14159;"
      }
    ],
    keyPoint: "nullptr for pointers, auto for inference, range-for loops."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 1 — C++ ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L1_TESTS = [
  {
    id: 113, title: "MCQ ADVENTURE", subtitle: "C++ First Code Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "C++ output uses?",                                    options: ["printf()","System.out.println()","cout","print()"],                        a: 2, hint: "Stream-based output." },
      { q: "C++ input uses?",                                     options: ["scanf()","cin","input()","readline()"],                                   a: 1, hint: "Character input stream." },
      { q: "C++ real string class is?",                           options: ["char[]","String","string (std)","TEXT"],                                  a: 2, hint: "#include <string> — easier than C!" },
      { q: "In C++, == for std::string does?",                   options: ["Error","Compares content (works!)","Compares address","Undefined"],        a: 1, hint: "Unlike Java, C++ string == works!" },
      { q: "endl does what in C++?",                             options: ["Only newline","Newline + flush buffer","Flush only","Exit program"],       a: 1, hint: "Newline AND buffer flush." },
      { q: "C++11 auto keyword does what?",                      options: ["Auto-runs code","Type inference","Automatic memory","Loop shortcut"],     a: 1, hint: "Compiler deduces the type." },
      { q: "C++ bool type is?",                                  options: ["int based (like C)","Native type (true/false)","String 'true'/'false'","Only 0/1 ints"], a: 1, hint: "C++ has native bool unlike classic C." },
      { q: "getline(cin, name) does?",                           options: ["Reads one word","Reads entire line","Reads one char","Reads a number"],   a: 1, hint: "cin >> stops at space, getline reads all." },
      { q: "List initialization (C++11) syntax?",               options: ["int x(5)","int x{5}","int x=5","int x[5]"],                               a: 1, hint: "Prevents narrowing conversions." },
      { q: "C++ string concatenation uses?",                    options: ["+","&","concat()","+="],                                                   a: 0, hint: "\"Hello\" + name — just like Python!" },
      { q: "Which header is needed for cout?",                   options: ["<stdio.h>","<iostream>","<output>","<conio.h>"],                           a: 1, hint: "Input/Output stream library." },
      { q: "nullptr in C++ replaces?",                           options: ["void","0","NULL","false"],                                                 a: 2, hint: "Type-safe null pointer constant." }
    ]
  },
  {
    id: 114, title: "MATCH MASTER", subtitle: "C++ Type Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "cout",          match: "C++ output stream" },
      { concept: "cin",           match: "C++ input stream" },
      { concept: "endl",          match: "Newline + buffer flush" },
      { concept: "string",        match: "C++ string class (not char[])" },
      { concept: "bool",          match: "Native true/false type in C++" },
      { concept: "auto",          match: "Type inference (C++11)" },
      { concept: "getline()",     match: "Reads entire line of input" },
      { concept: "<iostream>",    match: "Required header for cout/cin" }
    ]
  },
  {
    id: 115, title: "ROBO YES/NO", subtitle: "C++ Syntax Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "C++ uses cout for output.",                            a: true  },
      { q: "C++ std::string uses .equals() for comparison.",      a: false },
      { q: "auto in C++11 infers the variable type.",             a: true  },
      { q: "endl only adds a newline, nothing else.",             a: false },
      { q: "C++ has a native bool type.",                         a: true  },
      { q: "cin >> reads an entire line including spaces.",       a: false },
      { q: "C++ string + operator concatenates strings.",         a: true  },
      { q: "<stdio.h> is needed for cout in C++.",               a: false },
      { q: "nullptr is preferred over NULL in modern C++.",       a: true  },
      { q: "int x{3.14} is valid (no error) in C++.",            a: false }
    ]
  },
  {
    id: 116, title: "ALGO BUILDER", subtitle: "C++ Program Steps", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Write a C++ 'Hello User' Program",
      steps: [
        { id: 1, text: "#include <iostream> and #include <string>",      order: 1 },
        { id: 2, text: "using namespace std;",                           order: 2 },
        { id: 3, text: "Write: int main() {",                           order: 3 },
        { id: 4, text: "string name; getline(cin, name);",              order: 4 },
        { id: 5, text: "cout << \"Hello \" << name << endl;",           order: 5 }
      ]
    }
  },
  {
    id: 117, title: "C++ SORTER", subtitle: "Syntax Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["int", "age", "=", "25;"],                                    answer: ["int", "age", "=", "25;"] },
      { tokens: ["cout", "<<", "\"Hello\"", "<<", "endl;"],                    answer: ["cout", "<<", "\"Hello\"", "<<", "endl;"] },
      { tokens: ["string", "name", "=", "\"Alice\";"],                         answer: ["string", "name", "=", "\"Alice\";"] }
    ]
  }
];
