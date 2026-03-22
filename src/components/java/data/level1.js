import { Terminal, Code, Zap, Cpu, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Type, ToggleLeft } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 1 — JAVA: "First Code" (13 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L1_FOUNDATION = [
  {
    id: 101, title: "STRUCTURE", subtitle: "Structure of a Java Program",
    icon: Layers,
    content: "Every Java program lives inside a class. The class name must match the filename. Every program starts from the 'public static void main(String[] args)' method — this is mandatory.",
    examples: [
      {
        title: "The Minimal Class",
        explanation: "Every Java file must have at least one class that matches the filename.",
        code: "public class MyApp {\n  // Code goes here\n}"
      },
      {
        title: "The Main Entry Point",
        explanation: "The 'main' method is where the JVM starts executing your program.",
        code: "public static void main(String[] args) {\n  // JVM starts here\n}"
      },
      {
        title: "Complete Hello World",
        explanation: "A full program combining the class and the main method to print text.",
        code: "public class MyApp {\n  public static void main(String[] args) {\n    System.out.println(\"Hello World\");\n  }\n}"
      }
    ],
    keyPoint: "Class Name = Filename. Main method is the entry point."
  },
  {
    id: 102, title: "PRINT", subtitle: "Output Statements",
    icon: Terminal,
    content: "Java uses System.out to talk to the console. println adds a new line, while print stays on the same line.",
    examples: [
      {
        title: "Basic Printline",
        explanation: "System.out.println prints a message and moves the cursor to the next line.",
        code: "System.out.println(\"Line One\");\nSystem.out.println(\"Line Two\");"
      },
      {
        title: "Print without Newline",
        explanation: "System.out.print keeps following outputs on the same line.",
        code: "System.out.print(\"This stays \");\nSystem.out.print(\"on one line.\");"
      },
      {
        title: "Printing Numbers",
        explanation: "You can print numbers directly without quotes.",
        code: "System.out.println(100);\nSystem.out.println(50 + 50);"
      }
    ],
    keyPoint: "println = new line. Strings need \"Double Quotes\"."
  },
  {
    id: 103, title: "FORMAT", subtitle: "Output Formatting",
    icon: Code,
    content: "For complex output, printf allowing using specifiers like %d for integers and %s for strings.",
    examples: [
      {
        title: "String Formatting",
        explanation: "Using %s as a placeholder for a String variable.",
        code: "String name = \"Agent\";\nSystem.out.printf(\"Welcome, %s\", name);"
      },
      {
        title: "Numeric Specifiers",
        explanation: "Using %d for integers and %f for decimal numbers.",
        code: "int level = 5;\nSystem.out.printf(\"Protocol Level: %d\", level);"
      },
      {
        title: "Multiple Placeholders",
        explanation: "You can use multiple % symbols in a single line.",
        code: "System.out.printf(\"%s is level %d\", \"Java\", 17);"
      }
    ],
    keyPoint: "%s = String, %d = Integer, %f = Float/Double."
  },
  {
    id: 104, title: "VARIABLES", subtitle: "Defining Variables",
    icon: Hash,
    content: "Variables store data. In Java, you MUST define the data type before the name.",
    examples: [
      {
        title: "Declaration",
        explanation: "Create a box for data by specifying its type and name.",
        code: "int dataSync;\nString userProtocol;"
      },
      {
        title: "Initialization",
        explanation: "Give the variable its first value using the = sign.",
        code: "int energy = 100;\nboolean isActive = true;"
      },
      {
        title: "Naming Rules",
        explanation: "Must start with a letter, $ or _. Use camelCase.",
        code: "int playerLevel; // Good\nint _internalCount; // Allowed"
      }
    ],
    keyPoint: "Type + Name + Value. Statically typed!"
  },
  {
    id: 105, title: "NAMING", subtitle: "Java Naming Conventions",
    icon: Shield,
    content: "Consistency is key in Java. Classes, Variables, and Constants have specific rules.",
    examples: [
      {
        title: "CamelCase Variables",
        explanation: "Start with lowercase, then Capitalize each new word.",
        code: "int myBatteryLife = 100;\nString currentMissionStatus = \"Active\";"
      },
      {
        title: "PascalCase Classes",
        explanation: "Class names always start with a Capital letter.",
        code: "public class LogicCore {\n  // code\n}"
      },
      {
        title: "UPPER_SNAKE_CASE Constants",
        explanation: "Use final and all caps for values that never change.",
        code: "final int MAX_SPEED = 250;\nfinal String SYSTEM_KEY = \"ZX-99\";"
      }
    ],
    keyPoint: "Classes = Capital, Variables = lowerCamel, Constants = ALL_CAPS."
  },
  {
    id: 106, title: "INT", subtitle: "Integer Math",
    icon: Cpu,
    content: "Int stores whole numbers. Division is special: 7/2 in Java is 3, not 3.5!",
    examples: [
      {
        title: "Basic Math",
        explanation: "Support for +, -, *, / and % (remainder).",
        code: "int x = 10;\nint y = 5;\nint sum = x + y;"
      },
      {
        title: "Integer Division",
        explanation: "When dividing two ints, the decimal part is cut off.",
        code: "int result = 5 / 2; // Result is 2\nint result2 = 10 / 3; // Result is 3"
      },
      {
        title: "Modulo Operator",
        explanation: "Get the remainder of a division using %.",
        code: "int remainder = 10 % 3; // Result is 1\nint isEven = 4 % 2; // Result is 0"
      }
    ],
    keyPoint: "No decimals in int. Division truncates."
  },
  {
    id: 107, title: "FLOAT", subtitle: "Decimal Numbers",
    icon: Cpu,
    content: "Float and Double store decimals. To use float, you MUST add 'f' at the end.",
    examples: [
      {
        title: "The Double Type",
        explanation: "The default type for decimals. Very precise.",
        code: "double pi = 3.14159;\ndouble gravity = 9.8;"
      },
      {
        title: "The Float Type",
        explanation: "Saves memory but requires an 'f' suffix.",
        code: "float temp = 98.6f;\nfloat speed = 25.55f;"
      },
      {
        title: "Mixing Types",
        explanation: "To get a decimal result from division, use a double.",
        code: "double ratio = 5.0 / 2.0; // Result is 2.5"
      }
    ],
    keyPoint: "double is default. float needs 'f' suffix."
  },
  {
    id: 108, title: "STRING", subtitle: "Text Handling",
    icon: Type,
    content: "Strings store words. In Java, String is a Class, not a primitive type.",
    examples: [
      {
        title: "Concatenation",
        explanation: "Join strings together using the + operator.",
        code: "String first = \"Code\";\nString last = \"Clash\";\nString full = first + last;"
      },
      {
        title: "String Length",
        explanation: "Find out how many characters are in a string.",
        code: "String text = \"Java\";\nint len = text.length(); // 4"
      },
      {
        title: "Upper & Lower Case",
        explanation: "Transform text easily with built-in methods.",
        code: "String ui = \"system\";\nString loud = ui.toUpperCase(); // \"SYSTEM\""
      }
    ],
    keyPoint: "Double quotes only. Use .equals() to compare text!"
  },
  {
    id: 109, title: "BOOLEAN", subtitle: "Logic States",
    icon: ToggleLeft,
    content: "Booleans can only be true or false. They are the heart of decision making.",
    examples: [
      {
        title: "Simple Flags",
        explanation: "Creating indicators for status.",
        code: "boolean isHacked = false;\nboolean missionComplete = true;"
      },
      {
        title: "Comparisons",
        explanation: "Comparison operators result in a boolean value.",
        code: "boolean isGreater = 10 > 5; // true\nboolean isEqual = 5 == 5; // true"
      },
      {
        title: "NOT Operator",
        explanation: "Flip a boolean value using the ! symbol.",
        code: "boolean locked = true;\nboolean unlocked = !locked; // false"
      }
    ],
    keyPoint: "Lowercase true/false. No 1/0 shortcuts in Java."
  },
  {
    id: 110, title: "ASSIGN", subtitle: "Updating Values",
    icon: Zap,
    content: "Variables can change, but their type stays the same forever.",
    examples: [
      {
        title: "Reassignment",
        explanation: "Give an existing variable a new value.",
        code: "int health = 100;\nhealth = 80; // value updated"
      },
      {
        title: "Shortcut Math",
        explanation: "Combine math and assignment using symbols like +=.",
        code: "int score = 0;\nscore += 10; // score is now 10\nscore++; // score is now 11"
      },
      {
        title: "Safety with Final",
        explanation: "Use final to prevent a variable from ever changing.",
        code: "final int CORE_ID = 8821;\nCORE_ID = 123; // ERROR! Cannot change."
      }
    ],
    keyPoint: "assign = change value. final = permanent value."
  },
  {
    id: 111, title: "INPUT", subtitle: "Reading User Input",
    icon: HelpCircle,
    content: "To read from the keyboard, Java uses the Scanner class from java.util.",
    examples: [
      {
        title: "Setting up Scanner",
        explanation: "Import the tool and create a Scanner instance.",
        code: "import java.util.Scanner;\nScanner sc = new Scanner(System.in);"
      },
      {
        title: "Reading Strings",
        explanation: "Use nextLine() to capture a full line of text.",
        code: "System.out.println(\"Enter name:\");\nString name = sc.nextLine();"
      },
      {
        title: "Reading Numbers",
        explanation: "Use nextInt() or nextDouble() for numeric inputs.",
        code: "System.out.println(\"Enter age:\");\nint age = sc.nextInt();"
      }
    ],
    keyPoint: "import java.util.Scanner then sc.nextLine() / sc.nextInt()."
  },
  {
    id: 112, title: "COMMENTS", subtitle: "Code Documentation",
    icon: Code,
    content: "Comments are for humans. The computer ignores them completely.",
    examples: [
      {
        title: "Single Line",
        explanation: "Use // for quick notes.",
        code: "// This is a comment\nint x = 5; // note at end of line"
      },
      {
        title: "Multi-line",
        explanation: "Use /* and */ for longer explanations.",
        code: "/* This code is for\n   synchronizing the \n   logic core. */"
      },
      {
        title: "Javadoc",
        explanation: "Special /** comments used to generate official docs.",
        code: "/** \n * This method starts the mission\n * @param id The mission ID\n */"
      }
    ],
    keyPoint: "// for lines. /* */ for blocks. /** */ for docs."
  },
  {
    id: 113, title: "KEYWORDS", subtitle: "Reserved Words",
    icon: Star,
    content: "Java has 53 words that you CANNOT use as your own variable names.",
    examples: [
      {
        title: "Forbidden Names",
        explanation: "Words like 'class', 'int', and 'public' are reserved.",
        code: "int class = 5; // ERROR!\nString public = \"no\"; // ERROR!"
      },
      {
        title: "Case Sensitivity",
        explanation: "Keywords are lowercase. 'Int' is not 'int'.",
        code: "int x = 5; // correct\nInt y = 10; // ERROR (unless Int is a class you made)"
      },
      {
        title: "Modifier Keywords",
        explanation: "Words that describe how code behaves, like 'static' and 'final'.",
        code: "public static void main..."
      }
    ],
    keyPoint: "53 reserved words. Always lowercase. Case sensitive!"
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 1 — JAVA ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────────────────
export const L1_TESTS = [
  {
    id: 113, title: "MCQ ADVENTURE", subtitle: "First Code Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "Java output statement is?",                           options: ["print()","console.log()","System.out.println()","echo"],                    a: 2, hint: "More verbose than Python." },
      { q: "Java String comparison uses?",                        options: ["==","equals()","compare()","is()"],                                         a: 1, hint: "NEVER use == for Strings in Java." },
      { q: "Which is a valid Java variable declaration?",         options: ["x = 5","int x = 5","var x = 5 (Java 9+)","Both B and C"],                  a: 3, hint: "Both are valid in modern Java." },
      { q: "Java boolean values are?",                            options: ["True/False","TRUE/FALSE","true/false","1/0"],                               a: 2, hint: "Lowercase in Java, unlike Python." },
      { q: "Float literals in Java need?",                        options: ["No suffix","d suffix","f suffix","L suffix"],                               a: 2, hint: "float pi = 3.14f; — needs 'f'!" },
      { q: "Java reads input using?",                             options: ["Keyboard class","System.in directly","Scanner","Reader.read()"],            a: 2, hint: "Import java.util.Scanner." },
      { q: "Which is a Java single-line comment?",               options: ["# comment","// comment","/* comment */","-- comment"],                      a: 1, hint: "Same as C and C++." },
      { q: "Java is ___ typed.",                                 options: ["Dynamically","Weakly","Statically","Loosely"],                               a: 2, hint: "Must declare type before use." },
      { q: "String is a ___ in Java.",                           options: ["Primitive","Keyword","Class (reference type)","Method"],                    a: 2, hint: "Not a primitive — it's a class!" },
      { q: "Java class name must match?",                        options: ["Package name","Filename (.java)","Variable name","Method name"],            a: 1, hint: "MyApp.java must have: class MyApp" },
      { q: "System.out.print() vs println() difference?",        options: ["No diff","print has newline","println has newline","Both have newline"],    a: 2, hint: "ln = line (adds newline at end)." },
      { q: "Java constant is declared with?",                    options: ["const","final","constant","static"],                                        a: 1, hint: "final int MAX = 100;" }
    ]
  },
  {
    id: 114, title: "MATCH MASTER", subtitle: "Java Type Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "System.out.println()", match: "Outputs a line in Java" },
      { concept: "int",                   match: "32-bit whole number" },
      { concept: "double",                match: "64-bit decimal number" },
      { concept: "String",                match: "Text class in Java" },
      { concept: "boolean",               match: "true or false type" },
      { concept: "Scanner",               match: "Java input reading class" },
      { concept: "// comment",            match: "Single-line comment in Java" },
      { concept: "final",                 match: "Makes a variable constant" }
    ]
  },
  {
    id: 115, title: "ROBO YES/NO", subtitle: "Java Syntax Truth", icon: Bot, type: 'yesno',
    gameData: [
      { q: "Java is statically typed — you must declare the type.", a: true  },
      { q: "Java boolean uses True/False (capital).",              a: false },
      { q: "String comparison in Java uses .equals().",           a: true  },
      { q: "Java programs don't need a class.",                   a: false },
      { q: "Scanner is used to read user input in Java.",         a: true  },
      { q: "float values in Java need an 'L' suffix.",            a: false },
      { q: "// is a valid single-line comment in Java.",          a: true  },
      { q: "Java allows changing a variable's type after declaration.", a: false },
      { q: "System.out.println() adds a newline after output.",  a: true  },
      { q: "String in Java is a primitive type.",                 a: false }
    ]
  },
  {
    id: 116, title: "ALGO BUILDER", subtitle: "Java Program Steps", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Write a Java 'Hello User' Program",
      steps: [
        { id: 1, text: "Create MyApp.java file",                                        order: 1 },
        { id: 2, text: "Write: import java.util.Scanner;",                              order: 2 },
        { id: 3, text: "Write: public class MyApp { public static void main... }",     order: 3 },
        { id: 4, text: "Inside main: Scanner sc = new Scanner(System.in);",            order: 4 },
        { id: 5, text: "Write: System.out.println(\"Hello \" + sc.nextLine());",       order: 5 }
      ]
    }
  },
  {
    id: 117, title: "JAVA SORTER", subtitle: "Syntax Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["int", "age", "=", "25;"],                                           answer: ["int", "age", "=", "25;"] },
      { tokens: ["System.out.println(", "\"Hello\"", ");"],                            answer: ["System.out.println(", "\"Hello\"", ");"] },
      { tokens: ["String", "name", "=", "\"Alice\";"],                                answer: ["String", "name", "=", "\"Alice\";"] }
    ]
  }
];
