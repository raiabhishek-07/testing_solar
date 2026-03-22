import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 4 — JAVA: "Strings & Functions" (14 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L4_FOUNDATION = [
  {
    id: 401, title: "WHAT_STRING", subtitle: "What is a String?",
    icon: Type,
    content: "In Java, String is an OBJECT, not a primitive (notice the capital 'S'!). It holds text. Like Python, Java Strings are IMMUTABLE. Once you create String s = \"Java\";, that specific object cannot change. If you do s = \"Better\";, you're creating a new object and moving the reference.",
    keyPoint: "String is an Object (capital S) and it is IMMUTABLE."
  },
  {
    id: 402, title: "DECLARE_STR", subtitle: "Declaring Strings",
    icon: Code,
    content: "Two ways: 1) String Literal (common): String name = \"Alice\";. 2) Using 'new': String name = new String(\"Alice\");. Prefer literals! Java uses a 'String Pool' for memory efficiency. Literals with the same text share memory; 'new' forces a brand new object.",
    keyPoint: "Always use: String s = \"text\"; (Avoid 'new String()'). Double quotes required!"
  },
  {
    id: 403, title: "LENGTH", subtitle: "String Length",
    icon: HelpCircle,
    content: "To get the length of a String, use the length() METHOD. String s = \"Hello\"; int len = s.length();. Remember, Arrays use a property (arr.length), but Strings use a method with parentheses (). Important Java distinction!",
    keyPoint: "str.length() (method with parens) vs arr.length (property without parens)"
  },
  {
    id: 404, title: "ACCESS_CHAR", subtitle: "Accessing Characters",
    icon: Hash,
    content: "You CANNOT use brackets to get a character in Java! s[0] is illegal for Strings! You must use the charAt() method. char first = s.charAt(0); returns 'H'. Characters in Java are primitives (char) enclosed in single quotes ('H').",
    keyPoint: "s[0] is EROR! Use s.charAt(0) to get the first character."
  },
  {
    id: 405, title: "COMPARE_STR", subtitle: "String Comparison (.equals)",
    icon: ToggleLeft,
    content: "NEVER use == to compare string content in Java! == checks if they are the EXACT SAME OBJECT in memory. To check if the text matches, you MUST use .equals(). if (s1.equals(s2)) { ... }. To ignore case, use s1.equalsIgnoreCase(s2).",
    keyPoint: "String comparison: ALWAYS use .equals(), NEVER =="
  },
  {
    id: 406, title: "CONCAT", subtitle: "String Concatenation",
    icon: Layers,
    content: "You can glue strings together using the + operator. \"Java\" + 17 becomes \"Java17\". Java automatically converts numbers to Strings during concatenation. For building large strings inside loops, use StringBuilder instead of + for massive performance gains.",
    keyPoint: "Use + for simple concatenations. Use StringBuilder in loops!"
  },
  {
    id: 407, title: "STR_MISTAKES", subtitle: "Common String Mistakes",
    icon: AlertCircle,
    content: "1. The huge == mistake (leads to bugs that pass some tests but fail others). 2. Single vs Double quotes: 'A' is a char (primitive), \"A\" is a String (Object). They are totally different in Java! 3. Calling methods on a null String (causes NullPointerException!).",
    keyPoint: "'A' (char) is NOT the same as \"A\" (String object)!"
  },
  {
    id: 408, title: "WHAT_FUNC", subtitle: "What are Methods?",
    icon: Braces,
    content: "In Java, a function is always attached to a Class, so we call it a 'Method'. A method is a named block of code that performs an action. The 'main' method is where your program starts. Methods allow code reuse and better organization.",
    keyPoint: "In Java, functions are called 'Methods' because they live inside Classes."
  },
  {
    id: 409, title: "WHY_FUNC", subtitle: "Why Use Methods?",
    icon: Star,
    content: "Methods organize chaos. Instead of a 1000-line main(), you have loadFile(), processData(), printResults(). Methods make code readable, testable, and reusable (DRY - Don't Repeat Yourself principle).",
    keyPoint: "Break complex problems into small, manageable methods."
  },
  {
    id: 410, title: "FUNC_SYNTAX", subtitle: "Method Syntax",
    icon: Code,
    content: "Syntax: public static returnType name(parameters) { body }. Examples:\npublic static int add(int a, int b) { ... }.\n'public' means accessible anywhere. 'static' means it belongs to the class, not an instance. Valid for basic procedural Java.",
    keyPoint: "public static void sayHello() { System.out.println(\"Hi\"); }"
  },
  {
    id: 411, title: "PARAMS", subtitle: "Parameters & Arguments",
    icon: Zap,
    content: "Methods declare what data they need (Parameters) and their EXACT type! void greet(String name, int age). When you call the method: greet(\"Alice\", 25), \"Alice\" and 25 are the Arguments. Types MUST match exactly. Java is strongly typed.",
    keyPoint: "You must define the data type for every parameter!"
  },
  {
    id: 412, title: "RETURN", subtitle: "Return Types",
    icon: Terminal,
    content: "If a method calculates a value, it must state the type it returns. int calculateAge(). Inside the method, you must use the keyword 'return' with an int. If a method does not return anything, its return type MUST be 'void'.",
    keyPoint: "Return a value: 'int calc()'. Return nothing: 'void calc()'."
  },
  {
    id: 413, title: "CALL_FUNC", subtitle: "Calling a Method",
    icon: CheckCircle2,
    content: "To execute a method, use its name and parentheses. sayHello();. If it returns a value, you usually store or use it: int sum = add(5, 10);. Calling a method interrupts the current flow, jumps to the method, runs it, and jumps BACK.",
    keyPoint: "Store the returned value:   double area = calculateArea(5.0);"
  },
  {
    id: 414, title: "DEBUG_FUNC", subtitle: "Debugging Methods",
    icon: AlertCircle,
    content: "1. Missing return statement (Compiler error: 'missing return statement'). 2. Unreachable code (putting code AFTER a return statement). 3. Passing wrong data types. 4. Scope: Variables declared inside a method cannot be seen outside of it!",
    keyPoint: "A variable created inside a method dies when the method ends (Local Scope)."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 4 — JAVA ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L4_TESTS = [
  {
    id: 415, title: "MCQ ADVENTURE", subtitle: "Strings & Methods Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "How do you compare two Strings for text equality in Java?", options: ["s1 == s2","s1.equals(s2)","s1 = s2","s1.compare(s2)"], a: 1, hint: "== checks memory location, not text content." },
      { q: "How to get the first character of String s?", options: ["s[0]","s.first()","s.charAt(0)","s(0)"], a: 2, hint: "Bracket notation [] is only for arrays." },
      { q: "What is String in Java?", options: ["An Object","A primitive type","A keyword","A method"], a: 0, hint: "Notice the capital 'S'." },
      { q: "Functions inside a class are called?", options: ["Subroutines","Procedures","Methods","Blocks"], a: 2, hint: "Object-oriented term." },
      { q: "What is the return type if a method returns nothing?", options: ["null","empty","void","none"], a: 2, hint: "public static void..." },
      { q: "How to get length of String s?", options: ["s.length","s.length()","s.size()","len(s)"], a: 1, hint: "It is a method call." },
      { q: "Single quotes ('A') create a __, while double quotes (\"A\") create a __.", options: ["String, char","char, String","String, String","char, char"], a: 1, hint: "Primitives vs Objects." },
      { q: "A String is mutable (changeable).", options: ["True","False","Only if not static","Depends on compiler"], a: 1, hint: "Strings cannot be changed once created." },
      { q: "What does putting code after a return statement cause?", options: ["Nothing","A compiler error (unreachable code)","A warning","Runs next time"], a: 1, hint: "Return immediately exits." },
      { q: "Difference between argument and parameter?", options: ["None","Param is definition placeholder, Arg is actual value passed","Arg is definition, Param is value","Math only terms"], a: 1, hint: "def(param) ... call(arg)" }
    ]
  },
  {
    id: 416, title: "MATCH MASTER", subtitle: "Java Method/String Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "void",            match: "Return type for a method that returns nothing" },
      { concept: "return",          match: "Exits method and sends data back" },
      { concept: "s.equals(x)",     match: "Correct way to compare String text" },
      { concept: "s == x",          match: "Checks if Strings are the exact same memory object" },
      { concept: "s.charAt(0)",     match: "Gets the first character of a String" },
      { concept: "s.length()",      match: "Gets the number of characters in a String" },
      { concept: "'A'",             match: "Primitive char (single quotes)" },
      { concept: "Immutable",       match: "Property of String: cannot be changed" }
    ]
  },
  {
    id: 417, title: "ROBO YES/NO", subtitle: "Java Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "In Java, s1 == s2 is the correct way to compare if two Strings contain the same text.", a: false },
      { q: "A method declared with a 'void' return type cannot use the keyword 'return' to send data back.", a: true },
      { q: "Java Strings are mutable objects.", a: false },
      { q: "You must specify the data type of every parameter in a Java method.", a: true },
      { q: "The expression \"Text\" + 5 results in the String \"Text5\".", a: true },
      { q: "'Hello' (single quotes) is a valid way to create a String in Java.", a: false },
      { q: "s[0] gets the first character of String s in Java.", a: false },
      { q: "The 'main' method must be declared public static void.", a: true },
      { q: "Variables declared inside a method are destroyed when the method finishes.", a: true },
      { q: "A method can return multiple primitive values at once using commas.", a: false }
    ]
  },
  {
    id: 418, title: "JAVA SORTER", subtitle: "Method Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["public", "static", "int", "add(", "int a, int b", ")", "{"], answer: ["public", "static", "int", "add(", "int a, int b", ")", "{"] },
      { tokens: ["return", "a", "+", "b;"], answer: ["return", "a", "+", "b;"] },
      { tokens: ["if", "(s1", ".equals(", "s2))"], answer: ["if", "(s1", ".equals(", "s2))"] }
    ]
  },
  {
    id: 419, title: "ALGO BUILDER", subtitle: "Build a Method", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Create an Area Method",
      steps: [
        { id: 1, text: "public static double calcArea(double radius) {", order: 1 },
        { id: 2, text: "    double area = 3.14 * radius * radius;", order: 2 },
        { id: 3, text: "    return area;", order: 3 },
        { id: 4, text: "}", order: 4 },
        { id: 5, text: "double result = calcArea(5.0);", order: 5 }
      ]
    }
  }
];
