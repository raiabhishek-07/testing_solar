import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Search, Activity, RefreshCw, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 6 — JAVA: "Project & Best Practices" (10 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L6_FOUNDATION = [
  {
    id: 601, title: "STRUCTURE", subtitle: "Java Project Structure",
    icon: Layers,
    content: "Java enforces strict organization. Code must live in Classes, and Classes live in Packages (folders). Professional Java projects use Maven or Gradle to manage folders. The standard layout: `src/main/java` for your code, and `src/test/java` for your tests. This keeps production code separate from testing code.",
    keyPoint: "Packages organize Classes. Maven/Gradle organizes Packages. Use src/main and src/test."
  },
  {
    id: 602, title: "CLEAN_CODE", subtitle: "Clean, Readable Code",
    icon: CheckCircle2,
    content: "Java uses CamelCase conventions. Classes are PascalCase (`PlayerHealth`). Variables and Methods are camelCase (`calculateHealth()`). Keep classes small (Single Responsibility Principle). If a class is 2,000 lines long, it's doing too much and needs to be split up.",
    keyPoint: "Naming conventions and small classes are the hallmarks of professional Java."
  },
  {
    id: 603, title: "COMMENTS", subtitle: "Javadoc & Intent",
    icon: Code,
    content: "Java has `/** Javadoc */` comments for generating official documentation for your classes. Inside methods, use `//` to explain WHY the code exists, not WHAT it does. `// Adding 1 to x` is useless. `// Array is 0-indexed, offsetting by 1 to match UI` is excellent.",
    keyPoint: "Good comments explain WHY. Javadoc documents public APIs for other developers."
  },
  {
    id: 604, title: "BUGS", subtitle: "What is a Bug Exactly?",
    icon: AlertCircle,
    content: "Bugs are logic flaws. In Java, the compiler catches Syntax Errors (missing semicolons) immediately. Runtime Errors (NullPointerException, ArrayIndexOutOfBounds) crash the program. Logical Errors run perfectly but give the wrong answer. Logical errors require debugging to trace variable states.",
    keyPoint: "The Java compiler catches typos. You must test for Logical Errors."
  },
  {
    id: 605, title: "TESTING", subtitle: "JUnit Testing",
    icon: Shield,
    content: "You cannot test enterprise software manually. Java uses JUnit. You write a @Test method that feeds your code inputs and calls `assertEquals(expected, actual)`. When you change code next year, you run thousands of JUnit tests in seconds to ensure you didn't break anything.",
    keyPoint: "JUnit: Automated tests that prove your code works today AND tomorrow."
  },
  {
    id: 606, title: "RUBBER_DUCK", subtitle: "Rubber Duck Debugging",
    icon: Bot,
    content: "A legendary software engineering technique. When stuck on a logical error, explain your Java method line-by-line out loud to an inanimate object (like a rubber duck). Speaking forces your brain to slow down, and you will almost always hear the flaw in your logic.",
    keyPoint: "Explain your code out loud. Your ears will catch what your eyes missed."
  },
  {
    id: 607, title: "GIT_BASICS", subtitle: "Source Control (Git)",
    icon: GitBranch,
    content: "Git tracks historical snapshots (Commits) of your project. If you write a bug, you can revert to a working commit. GitHub hosts Git repositories online, allowing teams to collaborate. Knowing Git is an absolute requirement for modern software development.",
    keyPoint: "Git tracks changes locally. GitHub shares them globally. Commit often!"
  },
  {
    id: 608, title: "COLLAB", subtitle: "Collaboration (Pull Requests)",
    icon: Layers,
    content: "Teams use Git Branches to work on features without breaking the 'main' codebase. Once done, you open a Pull Request (PR) on GitHub. Your senior developers will Code Review your PR, leaving comments, before it is merged into the main application.",
    keyPoint: "Branches isolate your work. Pull Requests enforce Code Quality via reviews."
  },
  {
    id: 609, title: "DRY", subtitle: "Don't Repeat Yourself (DRY)",
    icon: Repeat,
    content: "If you copy and paste code in Java, you have failed the DRY principle. Extract duplicated code into a new private method. If you copy a bug to three places, you have to fix it in three places. Functions and OOP Inheritance exist to keep your code DRY.",
    keyPoint: "DRY: Group repetitive code into reusable Methods or Classes."
  },
  {
    id: 610, title: "KISS", subtitle: "Keep It Simple, Stupid (KISS)",
    icon: Star,
    content: "Junior Java developers often overuse design patterns just to show off (AbstractSingletonProxyFactoryBean). This leads to unreadable, unmaintainable code. Simple code is robust code. If an algorithm is too clever to understand, it is too clever to debug.",
    keyPoint: "KISS: Write boring, simple, readable code. Avoid 'clever' tricks."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 6 — JAVA ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L6_TESTS = [
  {
    id: 611, title: "MCQ ADVENTURE", subtitle: "Java Best Practices", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "What does the DRY principle mean?", options: ["Do Random Yields","Don't Repeat Yourself","Data Recovery Yield","Develop Resiliently Yielding"], a: 1, hint: "Avoid code duplication." },
      { q: "What is the standard folder for Java tests in Maven/Gradle?", options: ["src/tests","src/main/test","src/test/java","java/tests"], a: 2, hint: "Keeps testing separate from production code." },
      { q: "What type of comment creates official Java documentation?", options: ["//","/* */","/** Javadoc */","#"], a: 2, hint: "Starts with two asterisks." },
      { q: "Which error is caught by the Java Compiler BEFORE running?", options: ["NullPointerException","Logical Error","Syntax Error (missing semicolon)","ArrayIndexOutOfBounds"], a: 2, hint: "The compiler checks grammar." },
      { q: "What framework is most common for automated Java testing?", options: ["JTest","JUnit","JavaAssert","TestNG"], a: 1, hint: "Starts with J, ends with Unit." },
      { q: "What is 'Rubber Duck Debugging'?", options: ["A JVM plugin","Explaining your code out loud to find a flaw","Ignoring a bug","A garbage collection tactic"], a: 1, hint: "Talk to the duck." },
      { q: "What does KISS stand for in programming?", options: ["Keep It Simple, Stupid","Keep Iterating System Scripts","Know If Systems Start","Keep Implementing Single Scripts"], a: 0, hint: "Simplicity over cleverness." },
      { q: "What is a 'Pull Request' (PR)?", options: ["Pulling code from the server","A request for peers to review your code before merging","A demand for higher performance","Deleting a branch"], a: 1, hint: "Code Review process." },
      { q: "How should Java class names be formatted?", options: ["camelCase","snake_case","PascalCase","UPPERCASE"], a: 2, hint: "First letter of every word capitalized." },
      { q: "Why use Git?", options: ["It compiles Java faster","It tracks historical snapshots and allows reverting mistakes","It runs JUnit tests","It formats code"], a: 1, hint: "A time machine for your project." }
    ]
  },
  {
    id: 612, title: "MATCH MASTER", subtitle: "Java Theory Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "JUnit",           match: "Automated testing framework for Java" },
      { concept: "DRY",             match: "Don't Repeat Yourself (Extract to Methods)" },
      { concept: "KISS",            match: "Keep It Simple, Stupid (Avoid cleverness)" },
      { concept: "Logical Error",   match: "Code runs but produces the wrong answer" },
      { concept: "Syntax Error",    match: "Code fails to compile due to bad grammar" },
      { concept: "Git",             match: "Version control to track history snapshots" },
      { concept: "Pull Request",    match: "Asking peers for a code review on GitHub" },
      { concept: "Javadoc",         match: "/** Comments to generate official documentation */" }
    ]
  },
  {
    id: 613, title: "ROBO YES/NO", subtitle: "Java Practices Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "The DRY principle says you should copy-paste code instead of creating new methods.", a: false },
      { q: "Good Java comments should explain HOW the syntax works, not WHY the code exists.", a: false },
      { q: "Logical errors represent flaws in your math or logic, but the Java compiler will not warn you about them.", a: true },
      { q: "Git allows you to revert your Java project to a working state if you break something.", a: true },
      { q: "Testing everything manually by clicking through the application is better than writing JUnit tests.", a: false },
      { q: "Java class names traditionally start with a capital letter (PascalCase).", a: true },
      { q: "The KISS principle encourages writing highly abstracted, over-architected, clever code.", a: false },
      { q: "Rubber Duck debugging involves explaining your code out loud to slow down your analytical brain.", a: true },
      { q: "A 'Branch' in Git allows you to build a new feature without potentially ruining the main codebase.", a: true },
      { q: "assertEquals() is a common method used inside JUnit to verify code output.", a: true }
    ]
  },
  {
    id: 614, title: "JAVA SORTER", subtitle: "Code Structure", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["/**", "*", "Calculates", "Score", "*/"], answer: ["/**", "*", "Calculates", "Score", "*/"] },
      { tokens: ["assertEquals(", "5,", "add(", "2, 3)", ");"], answer: ["assertEquals(", "5,", "add(", "2, 3)", ");"] },
      { tokens: ["public", "class", "PlayerHealth", "{"], answer: ["public", "class", "PlayerHealth", "{"] }
    ]
  },
  {
    id: 615, title: "ALGO BUILDER", subtitle: "Git Workflow", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "The Standard Git Workflow",
      steps: [
        { id: 1, text: "Create a new Branch for your feature", order: 1 },
        { id: 2, text: "Write your Java code and JUnit tests", order: 2 },
        { id: 3, text: "Commit your changes and Push to GitHub", order: 3 },
        { id: 4, text: "Open a Pull Request for Code Review", order: 4 },
        { id: 5, text: "Merge the Branch into Main", order: 5 }
      ]
    }
  }
];
