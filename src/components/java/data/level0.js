import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, Hash, Hammer } from 'lucide-react';
// ─────────────────────────────────────────────
// LEVEL 0 — JAVA FOUNDATIONS (12 Sub-topics)
// ─────────────────────────────────────────────
export const L0_FOUNDATION = [
  {
    id: 1, title: "JVM", subtitle: "What is a Computer?",
    icon: Cpu,
    content: "A computer executes instructions through hardware. Java programs talk to a special layer called the JVM (Java Virtual Machine).",
    examples: [
      {
        title: "The Sandbox",
        explanation: "JVM acts as a secure container for your code.",
        code: "// JVM handles memory while you code\nSystem.out.println(\"Running in JVM\");"
      },
      {
        title: "Bytecode",
        explanation: "Java code turns into .class files that the JVM reads.",
        code: "// Source: MyFile.java\n// Bytecode: MyFile.class"
      },
      {
        title: "Portability",
        explanation: "The same .class file runs on Windows, Mac, or Linux.",
        code: "// Write Once, Run Anywhere"
      }
    ],
    keyPoint: "Java Motto: Write Once, Run Anywhere."
  },
  {
    id: 2, title: "CLASS", subtitle: "What is a Program?",
    icon: Code,
    content: "A Java program is a collection of Classes. Every Java program starts from a special method called 'main'.",
    examples: [
      {
        title: "The Template",
        explanation: "A class specifies what an object 'is' and what it 'does'.",
        code: "public class Robot {\n  // blueprints go here\n}"
      },
      {
        title: "The Starting Gun",
        explanation: "The main method is the first thing that runs.",
        code: "public static void main(String[] args) {\n  // Code starts here\n}"
      },
      {
        title: "The File Match",
        explanation: "The public class name must match the .java file name.",
        code: "public class MyApp { /* MyFile.java */ }"
      }
    ],
    keyPoint: "Every Java program needs: public static void main()."
  },
  {
    id: 3, title: "CRAFT", subtitle: "What is Programming?",
    icon: Zap,
    content: "Programming in Java means writing blueprints (Classes) that define how objects behave.",
    examples: [
      {
        title: "Logic Design",
        explanation: "Translating human needs into machine steps.",
        code: "// Need: Print status\nSystem.out.println(\"Online\");"
      },
      {
        title: "Solving Problems",
        explanation: "Using code to automate tasks.",
        code: "int total = price + tax;"
      },
      {
        title: "Blueprinting",
        explanation: "Defining a 'Player' once and creating many instances.",
        code: "Player p1 = new Player();\nPlayer p2 = new Player();"
      }
    ],
    keyPoint: "Java Programming = Designing objects and their behaviors."
  },
  {
    id: 4, title: "OOP", subtitle: "The Java Language",
    icon: Terminal,
    content: "Java is a strongly-typed, object-oriented language designed for large, reliable systems.",
    examples: [
      {
        title: "Strict Rules",
        explanation: "Java checks your math and types before the program even starts.",
        code: "int x = 5;\n// x = \"Hello\"; // NOT ALLOWED!"
      },
      {
        title: "Object Focus",
        explanation: "Instead of just functions, we think in terms of entities (Objects).",
        code: "Car myCar = new Car();\nmyCar.drive();"
      },
      {
        title: "Reliability",
        explanation: "Designed to handle massive amounts of data without crashing.",
        code: "// Banking and Server power"
      }
    ],
    keyPoint: "Java powers: Android, enterprise servers, big banking systems."
  },
  {
    id: 5, title: "LEVELS", subtitle: "High vs Low Level",
    icon: Layers,
    content: "Java is a high-level language that compiles to intermediate 'bytecode' for the JVM.",
    examples: [
      {
        title: "Readable Code",
        explanation: "Java uses English-like words instead of complex binary.",
        code: "if (available) { use(); }"
      },
      {
        title: "The Middle Man",
        explanation: "Bytecode is halfway between human language and machine bits.",
        code: "// Compile: javac File.java\n// Result: File.class"
      },
      {
        title: "Memory Control",
        explanation: "Java handles memory automatically (Garbage Collection).",
        code: "// No manual memory cleanup needed!"
      }
    ],
    keyPoint: "Java → Bytecode → JVM → Any Machine."
  },
  {
    id: 6, title: "RECIPE", subtitle: "Real-life Instructions",
    icon: Shield,
    content: "A method in Java is a named set of instructions that performs a specific task.",
    examples: [
      {
        title: "The Action",
        explanation: "Naming a group of steps to reuse them later.",
        code: "void fireLaser() {\n  charge();\n  shoot();\n}"
      },
      {
        title: "Input Requirements",
        explanation: "Methods can ask for data to help them work.",
        code: "void sayHello(String name) {\n  print(\"Hi \" + name);\n}"
      },
      {
        title: "The Return",
        explanation: "Methods can give you back a result when finished.",
        code: "int sum(int a, int b) {\n  return a + b;\n}"
      }
    ],
    keyPoint: "Java Methods = Named sets of instructions."
  },
  {
    id: 7, title: "INTAKE", subtitle: "Input Concept",
    icon: HelpCircle,
    content: "Java reads user input by using a 'Scanner' to watch the keyboard stream.",
    examples: [
      {
        title: "Setting the Watcher",
        explanation: "Creating a Scanner that listens to System.in (the keyboard).",
        code: "Scanner sc = new Scanner(System.in);"
      },
      {
        title: "Capturing Text",
        explanation: "Waiting for the user to type a line and press enter.",
        code: "String input = sc.nextLine();"
      },
      {
        title: "Getting Numbers",
        explanation: "Specifically grabbing an integer from the user.",
        code: "int num = sc.nextInt();"
      }
    ],
    keyPoint: "Scanner sc = new Scanner(System.in); sc.nextLine();"
  },
  {
    id: 8, title: "RESULT", subtitle: "Output Concept",
    icon: CheckCircle2,
    content: "Java outputs text to the standard output using System.out.println().",
    examples: [
      {
        title: "Basic Print",
        explanation: "The 'ln' adds a new line automatically after the text.",
        code: "System.out.println(\"Hello World\");"
      },
      {
        title: "The Side-by-Side",
        explanation: "Using print() keeps the cursor on the same line for the next message.",
        code: "System.out.print(\"X: \");\nSystem.out.print(10);"
      },
      {
        title: "Data Concatenation",
        explanation: "Joining text and variables together in one output.",
        code: "System.out.println(\"Level: \" + 5);"
      }
    ],
    keyPoint: "System.out.println(\"Hello Java\");"
  },
  {
    id: 9, title: "DECISION", subtitle: "What is Logic?",
    icon: Cpu,
    content: "Logic allows programs to choose paths based on data using if/else statements.",
    examples: [
      {
        title: "The Crossroads",
        explanation: "Checking a variable to decide which path to take.",
        code: "if (energy > 0) {\n  run();\n} else {\n  stop();\n}"
      },
      {
        title: "Equality Test",
        explanation: "Checking if a value matches a specific target.",
        code: "if (status.equals(\"Active\")) {\n  proceed();\n}"
      },
      {
        title: "Multi-Choice",
        explanation: "Handling more than two options using else-if.",
        code: "if (a) doA();\nelse if (b) doB();\nelse doC();"
      }
    ],
    keyPoint: "if (x > 10) { System.out.println(\"Big\"); }"
  },
  {
    id: 10, title: "PATHWAY", subtitle: "What is an Algorithm?",
    icon: Code,
    content: "An algorithm is a step-by-step sequence of operations that solve a specific problem.",
    examples: [
      {
        title: "The Sequence",
        explanation: "Instructions followed precisely in order.",
        code: "int x = 1;\nx = x + 1;\nprint(x);"
      },
      {
        title: "The Loop (Pattern)",
        explanation: "Repeating an algorithm many times automatically.",
        code: "for (int i=0; i<5; i++) {\n  ping();\n}"
      },
      {
        title: "Reusable Steps",
        explanation: "Wrapping an algorithm in a method to use it anywhere.",
        code: "int calc(int x) {\n  return x * x;\n}"
      }
    ],
    keyPoint: "Method = A reusable algorithm block in Java."
  },
  {
    id: 11, title: "FIXER", subtitle: "What is Debugging?",
    icon: Zap,
    content: "Debugging is the process of finding and removing bugs (errors) from your code.",
    examples: [
      {
        title: "Reading Stack Traces",
        explanation: "The computer's error report tells you exactly which line failed.",
        code: "Exception at line 42: NullPointer"
      },
      {
        title: "Safety Net",
        explanation: "Using try/catch to keep the program running even when an error happens.",
        code: "try { login(); }\ncatch (Exception e) { print(\"Fail\"); }"
      },
      {
        title: "Manual Inspection",
        explanation: "Printing variable values to see where the logic went wrong.",
        code: "System.out.println(\"DEBUG: hp is \" + hp);"
      }
    ],
    keyPoint: "Java Debugging: Read the Stack Trace!"
  },
  {
    id: 12, title: "VALUE", subtitle: "Why Learn Java?",
    icon: Star,
    content: "Java is the professional backbone of global business and mobile application development.",
    examples: [
      {
        title: "Android Dominance",
        explanation: "Billions of phones run on Java-based code.",
        code: "// Build apps for the world"
      },
      {
        title: "Enterprise Power",
        explanation: "Banks, airlines, and tech giants rely on Java for stability.",
        code: "// Amazon and Google scale"
      },
      {
        title: "Huge Ecosystem",
        explanation: "Millions of free libraries (pre-written code) are available for Java.",
        code: "// Don't reinvent the wheel"
      }
    ],
    keyPoint: "Java powers: Android OS, LinkedIn, Amazon backend, Netflix."
  }
];

// ─────────────────────────────────────────────
// LEVEL 0 — JAVA ELITE TESTS (5 Challenges)
// ─────────────────────────────────────────────
export const L0_TESTS = [
  {
    id: 13,
    title: "MCQ ADVENTURE",
    subtitle: "Java Foundation Quiz",
    icon: MapPin,
    type: 'mcq',
    gameData: [
      { q: "What does JVM stand for?",                    options: ["Java Virtual Machine","Java Visual Mode","Java Voice Manager","Java Version Module"],         a: 0, hint: "It's the runtime that executes Java bytecode." },
      { q: "What is the entry point of every Java program?", options: ["start()","main()","begin()","run()"],                                                      a: 1, hint: "It's the first method the JVM looks for." },
      { q: "Java output statement is?",                   options: ["print()","console.log()","System.out.println()","echo()"],                                    a: 2, hint: "Java syntax is more verbose than Python." },
      { q: "Java is which type of language?",             options: ["Low-level","Object-Oriented High-level","Assembly","Machine language"],                       a: 1, hint: "Everything in Java is a class." },
      { q: "Java programs first compile to?",             options: ["Machine code","Python code","Bytecode","Binary"],                                             a: 2, hint: "The JVM reads this intermediate format." },
      { q: "Which is used to read user input in Java?",   options: ["Reader","Keyboard","Scanner","Input"],                                                       a: 2, hint: "import java.util.Scanner;" },
      { q: "What is an Exception in Java?",               options: ["A feature","A runtime error","A variable","A loop"],                                         a: 1, hint: "Java uses try/catch to handle these." },
      { q: "What is a Method in Java?",                   options: ["A named set of instructions","A data type","A variable","A file"],                           a: 0, hint: "Like a function in other languages." }
    ]
  },
  {
    id: 14,
    title: "MATCH MASTER",
    subtitle: "Java Concept Sync",
    icon: Layers,
    type: 'match',
    gameData: [
      { concept: "JVM",                    match: "Executes Java bytecode" },
      { concept: "Class",                  match: "Blueprint for objects" },
      { concept: "main()",                 match: "Program entry point" },
      { concept: "System.out.println()",   match: "Displays output in Java" },
      { concept: "Scanner",                match: "Reads user input in Java" },
      { concept: "Exception",              match: "Runtime error in Java" },
      { concept: "Bytecode",               match: "Intermediate Java compilation" },
      { concept: "Method",                 match: "Named block of instructions" }
    ]
  },
  {
    id: 15,
    title: "ROBOT COMMANDER",
    subtitle: "Algorithm Training",
    icon: Bot,
    type: 'robot',
    gameData: {
      start: { x: 0, y: 0 },
      goal: { x: 3, y: 0 }
    }
  },
  {
    id: 16,
    title: "FACTORY SYSTEM",
    subtitle: "Input -> Process -> Output",
    icon: Cpu,
    type: 'factory',
    gameData: {
      target: "Make Banana Shake",
      tasks: ["🍌", "🥛", "🌀", "Serve"]
    }
  },
  {
    id: 17,
    title: "BUG HUNTER",
    subtitle: "Repair Logic",
    icon: Hammer,
    type: 'bug',
    gameData: {
      scenario: "Tea is not getting ready",
      lines: ["Add tea powder", "Serve", "Boil water"],
      correctOrder: ["Boil water", "Add tea powder", "Serve"]
    }
  }
];
