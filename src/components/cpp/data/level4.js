import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 4 — C++: "Strings & Functions" (14 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L4_FOUNDATION = [
  {
    id: 401, title: "WHAT_STRING", subtitle: "std::string in C++",
    icon: Type,
    content: "C++ has a proper string class: std::string (#include <string>). It completely replaces the dangerous C-style char arrays. Unlike Java/Python strings, C++ std::strings are MUTABLE — you can freely modify their contents without creating copies!",
    keyPoint: "std::string is a safe, dynamically resizing container for text. It is MUTABLE."
  },
  {
    id: 402, title: "DECLARE_STR", subtitle: "Declaring Strings",
    icon: Code,
    content: "Declare and initialize: std::string name = \"Alice\";. Or: std::string name(\"Alice\");. Modern C++14 adds string literals: auto s = \"Bob\"s; (the 's' suffix ensures it's a std::string, not a C-array pointer!).",
    keyPoint: "string s = \"Alice\"; is the standard way. Or use auto s = \"Alice\"s; (C++14)."
  },
  {
    id: 403, title: "LENGTH", subtitle: "String Length (.length / .size)",
    icon: HelpCircle,
    content: "To get the number of characters, use s.length() OR s.size(). Both do exactly the same thing and return a size_t (unsigned integer). Because it's a class, they are method calls with parentheses.",
    keyPoint: "s.length() and s.size() are identical."
  },
  {
    id: 404, title: "ACCESS_CHAR", subtitle: "Access & Modify",
    icon: Hash,
    content: "Since C++ strings are mutable, you can do: s[0] = 'B'; to change \"Cat\" into \"Bat\". Accessing out of bounds compiled but crashes (undefined behavior). For safe access with bounds checking, use s.at(0) = 'B';.",
    keyPoint: "s[0] is fast but unsafe. s.at(0) is bounds-checked. Strings ARE mutable!"
  },
  {
    id: 405, title: "COMPARE_STR", subtitle: "String Comparison (==)",
    icon: ToggleLeft,
    content: "Unlike Java or C, C++ makes string comparison highly intuitive. s1 == s2 compares the CONTENT of the strings. s1 < s2 compares them alphabetically. You don't need .equals() or strcmp() anymore!",
    keyPoint: "s1 == s2 works exactly as expected in C++. It compares the text content."
  },
  {
    id: 406, title: "CONCAT", subtitle: "String Concatenation (+)",
    icon: Layers,
    content: "You can glue strings together simply using the + operator. string full = \"Hot\" + \"dog\";. You can even use += to append: s += \" appending\";. To convert a number to a string, use std::to_string(42). Note: \"A\" + \"B\" (two raw literals) is a compile error, one must be a std::string!",
    keyPoint: "Use + or += to combine strings. Convert numbers with std::to_string(num)."
  },
  {
    id: 407, title: "STR_MISTAKES", subtitle: "Common String Mistakes",
    icon: AlertCircle,
    content: "1. Confusing \"A\" (C-string literal) with std::string. 2. Trying to concatenate two raw literals: \"A\" + \"B\" (the compiler sees them as pointer arrays!). 3. Passing strings to functions by value (creates an expensive copy — use const string& instead!).",
    keyPoint: "Pass strings as 'const std::string& arg' to avoid expensive copying."
  },
  {
    id: 408, title: "WHAT_FUNC", subtitle: "Functions in C++",
    icon: Braces,
    content: "Functions break code into reusable modules. Every C++ program starts at main(). C++ strongly enforces type checking. Functions must be declared before they are called, typically using Prototypes in header files (.h) and Definitions in source files (.cpp).",
    keyPoint: "Header files (.h) hold prototypes. Source files (.cpp) hold the bodies."
  },
  {
    id: 409, title: "PASS_VALUE", subtitle: "Pass by Value (Default)",
    icon: Zap,
    content: "By default, C++ passes arguments by value (making a COPY). If you write void modify(int x) { x = 10; } and pass a variable, the original variable outside the function does NOT change. This is safe, but copying large objects (like big strings or vectors) is slow.",
    keyPoint: "Pass by Value makes a copy. Modifying the copy doesn't affect the original."
  },
  {
    id: 410, title: "PASS_REF", subtitle: "Pass by Reference (&)",
    icon: Code,
    content: "C++ (unlike C) supports Pass by Reference using the '&' symbol. void modify(int& x) { x = 10; }. Now, you are passing the ORIGINAL memory address. The function CAN change the caller's variable! Also used as `const string& str` to pass big objects fast without copying them, safely preventing modification.",
    keyPoint: "int& x (allows modification). const string& str (fast passing, read-only)."
  },
  {
    id: 411, title: "DEFAULT", subtitle: "Default Arguments",
    icon: Star,
    content: "C++ functions can have default values for parameters. void print(int x, int base = 10);. You can call print(5) (uses base 10) or print(5, 16) (overrides default to 16). Default arguments must always be at the END of the parameter list.",
    keyPoint: "void func(int a, int b = 0) — Default arguments make parameters optional."
  },
  {
    id: 412, title: "OVERLOAD", subtitle: "Function Overloading",
    icon: Layers,
    content: "C++ allows multiple functions to have the EXACT SAME NAME, as long as their parameter lists are different (number or types of arguments). Example: int add(int a, int b) AND double add(double a, double b). The compiler figures out which one to call based on the arguments provided.",
    keyPoint: "Function Overloading: Same name, different parameters. Makes intuitive APIs."
  },
  {
    id: 413, title: "RETURN", subtitle: "Return Values",
    icon: Terminal,
    content: "A function returns a single value. C++17 added Structured Bindings which let you easily return multiple values using std::tuple or std::pair. Example: auto [x, y] = getCoordinates();. If a function returns nothing, it is 'void'.",
    keyPoint: "C++17 can effectively return multiple variables at once using auto [x, y]!"
  },
  {
    id: 414, title: "DEBUG_FUNC", subtitle: "Debugging Functions",
    icon: AlertCircle,
    content: "1. Forgetting to use '&' when you intended to modify a parameter. 2. Not returning a value in a non-void function (Undefined Behavior!). 3. Returning a reference (&) to a LOCAL variable (it gets destroyed when the function ends, leaving a dangling reference!).",
    keyPoint: "NEVER return a reference (or pointer) to a local variable created inside the function."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 4 — C++ ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L4_TESTS = [
  {
    id: 415, title: "MCQ ADVENTURE", subtitle: "C++ Strings & Functions Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "How to compare two std::strings in C++?", options: ["s1.equals(s2)","strcmp(s1, s2) == 0","s1 == s2","s1 = s2"], a: 2, hint: "C++ makes it intuitive." },
      { q: "Are std::strings mutable (changeable) in C++?", options: ["Yes, you can modify characters directly","No, they are like Java strings","Only if declared static","No, only C-strings are mutable"], a: 0, hint: "s[0] = 'B'; works!" },
      { q: "What does 'void update(int& x)' signify?", options: ["Pass by Value","Pass by Reference","Pass by Pointer","Pass by Name"], a: 1, hint: "The & symbol." },
      { q: "How do you safely pass a large string to a function just to read it?", options: ["void f(string s)","void f(string* s)","void f(const string& s)","void f(string& s)"], a: 2, hint: "Fast (no copy) + Read Only." },
      { q: "Function Overloading means?", options: ["Functions with the same name but different parameters","Calling a function too many times","A recursive function bug","Returning multiple values"], a: 0, hint: "int add(int,int) and double add(double,double)" },
      { q: "Can a C++ function have default arguments?", options: ["No","Yes, but only the first argument","Yes, but they must be at the end of the parameter list","Yes, anywhere"], a: 2, hint: "void f(int a, int b=0);" },
      { q: "What happens if you return a reference to a local variable?", options: ["It works perfectly","It copies the variable","Undefined behavior (Dangling reference)","Compiler error always"], a: 2, hint: "The variable dies when the function ends." },
      { q: "How to safely access string character with bounds check?", options: ["s[0]","s(0)","s.at(0)","s.get(0)"], a: 2, hint: "Throws out_of_range exception." },
      { q: "What does std::to_string(42) do?", options: ["Outputs \"42\"","Converts string to int","Causes error","Nothing"], a: 0, hint: "Converts numbers to strings." },
      { q: "How to get the length of std::string s?", options: ["strlen(s)","s.length()","s.length","sizeof(s)"], a: 1, hint: "Method call." }
    ]
  },
  {
    id: 416, title: "MATCH MASTER", subtitle: "C++ String Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "s1 == s2",        match: "Correct way to compare string content" },
      { concept: "std::string",     match: "Mutable text container class" },
      { concept: "const string&",   match: "Pass object quickly and read-only" },
      { concept: "int& x",          match: "Pass by Reference (allows modification)" },
      { concept: "std::to_string()", match: "Converts numbers to strings" },
      { concept: "Overloading",     match: "Same function name, different parameters" },
      { concept: "Default argument",match: "Optional parameter at end of list" },
      { concept: "Dangling Reference", match: "Returning a reference to a local variable" }
    ]
  },
  {
    id: 417, title: "ROBO YES/NO", subtitle: "C++ Functions Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "C++ std::strings are immutable (cannot be modified after creation).", a: false },
      { q: "s1 == s2 compares the text of two std::strings correctly.", a: true },
      { q: "Pass by Value (default) creates a copy of the argument passed.", a: true },
      { q: "You can have two functions named 'calculate' if their parameters are different.", a: true },
      { q: "Default arguments can be placed anywhere in the parameter list.", a: false },
      { q: "Returning a reference (&) to a local function variable is safe.", a: false },
      { q: "Accessing s[100] on a 5-char string will always throw a safe exception.", a: false },
      { q: "Pass by Reference (int& x) allows the function to modify the caller's variable.", a: true },
      { q: "\"A\" + \"B\" (adding two string literals) is perfectly valid C++.", a: false },
      { q: "std::to_string() converts integers and floats into strings.", a: true }
    ]
  },
  {
    id: 418, title: "C++ SORTER", subtitle: "Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["void", "modify(", "int&", "x)"], answer: ["void", "modify(", "int&", "x)"] },
      { tokens: ["if", "(s1", "==", "s2)"], answer: ["if", "(s1", "==", "s2)"] },
      { tokens: ["string", "s", "=", "to_string(", "42", ");"], answer: ["string", "s", "=", "to_string(", "42", ");"] }
    ]
  },
  {
    id: 419, title: "ALGO BUILDER", subtitle: "Pass by Ref", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Write a Swap Function (Pass by Reference)",
      steps: [
        { id: 1, text: "void swapOut(int& a, int& b) {", order: 1 },
        { id: 2, text: "    int temp = a;", order: 2 },
        { id: 3, text: "    a = b;", order: 3 },
        { id: 4, text: "    b = temp;", order: 4 },
        { id: 5, text: "}", order: 5 }
      ]
    }
  }
];
