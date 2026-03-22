import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 3 — JAVA: "Loops & Arrays" (15 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L3_FOUNDATION = [
  {
    id: 301, title: "LOOP", subtitle: "What is a Loop?",
    icon: Repeat,
    content: "A loop repeats an action. Java has 3 main types depending on your needs: 'for' loop (when you know exactly how many times), 'while' loop (when repeating based on a condition), and 'do-while' (run at least once, then check condition).",
    keyPoint: "for = known count. while = condition-based. do-while = run at least once."
  },
  {
    id: 302, title: "FOR", subtitle: "The for Loop",
    icon: Repeat,
    content: "The classic Java for loop has 3 parts: setup, condition, update. Syntax: for(int i=0; i<5; i++) { } . 1) int i=0 (starts here). 2) i<5 (loops while true). 3) i++ (after each iteration). It cleanly bundles the variable lifecycle.",
    keyPoint: "for(int i = 0; i < 5; i++) → initialization; condition; update"
  },
  {
    id: 303, title: "WHILE", subtitle: "The while Loop",
    icon: Repeat,
    content: "A while loop only has the condition part inside the parenthesis: while (score < 100) { play(); }. You must declare variables BEFORE the loop, and update them INSIDE the loop. If you forget to update them, you create an infinite loop!",
    keyPoint: "while (condition) { /* must update variables here! */ }"
  },
  {
    id: 304, title: "DOWHILE", subtitle: "do-while Loop",
    icon: AlertCircle,
    content: "The do-while loop guarantees the loop runs AT LEAST ONCE before checking the condition. Useful for menus and input validation. do { showMenu(); choice = get(); } while (choice != 0);. It ends with a semicolon after the while condition!",
    keyPoint: "do { } while (condition);  — guaranteed to run at least once!"
  },
  {
    id: 305, title: "CONDITIONS", subtitle: "break & continue",
    icon: Filter,
    content: "'break' forcefully EXITS the nearest containing loop. 'continue' abruptly STOPS the current iteration and jumps to the update/condition for the next round. Use sparingly, as excessive break/continue can lead to 'spaghetti code'.",
    keyPoint: "break = exit loop entirely. continue = skip to next round."
  },
  {
    id: 306, title: "INFINITE", subtitle: "Infinite Loops in Java",
    icon: Zap,
    content: "A loop that never terminates. Common causes: for(int i=0; i<10; i--) (subtracting instead of adding so it's always <10). while(true) can be intentional (exited via a break), but accidental infinites freeze your program.",
    keyPoint: "If your Java program 'hangs' and does nothing, suspect an infinite loop!"
  },
  {
    id: 307, title: "NESTED", subtitle: "Nested Loops",
    icon: Layers,
    content: "Placing a loop inside a loop. Useful for 2D grids (rows and cols). for(int row=0; row<3; row++) { for(int col=0; col<3; col++) }. The inner loop runs FULLY for every single step of the outer loop. Beware of performance — O(n²) complexity!",
    keyPoint: "for (row) { for (col) { ... } } — used for multi-dimensional data."
  },
  {
    id: 308, title: "ARRAY", subtitle: "What is an Array?",
    icon: ListIcon,
    content: "An array is a fixed-size container that holds multiple items of the SAME TYPE in continuous memory. int[] scores = new int[5];. Java arrays are strictly typed (only ints here!) and their size cannot change once created.",
    keyPoint: "Java Arrays = FIXED size + SAME data type. Size cannot change!"
  },
  {
    id: 309, title: "DECLARE", subtitle: "Array Declaration",
    icon: Code,
    content: "Two common ways: 1) Specify size: int[] nums = new int[5]; (all initialized to 0). 2) Provide data: int[] nums = {10, 20, 30};. Never confuse the two! Once you say size is 5, you can't magically fit 6 items in it.",
    keyPoint: "int[] arr = new int[5];  |  int[] arr = {1, 2, 3};"
  },
  {
    id: 310, title: "INDEXING", subtitle: "0-Based Indexing",
    icon: Hash,
    content: "Arrays are 0-indexed. The first item is at index 0. If size is 5, valid indices are 0, 1, 2, 3, 4. Attempting to access at index 5 causes an ArrayIndexOutOfBoundsException! Java bounds-checks every access to protect memory.",
    keyPoint: "Size N → valid indices are 0 to N-1. Index N is an ERROR!"
  },
  {
    id: 311, title: "SIZE", subtitle: "Array .length",
    icon: HelpCircle,
    content: "Every Java array knows its own size via the 'length' property. Notice there are no parentheses! int size = myArr.length;. This is a property, not a method (unlike String.length()). Always use .length in your loops instead of hardcoding sizes.",
    keyPoint: "myArr.length (Array property, NO parentheses) vs str.length() (String method)"
  },
  {
    id: 312, title: "UPDATE", subtitle: "Access & Update",
    icon: Zap,
    content: "Reading: int x = arr[2]; (gets 3rd item). Writing: arr[2] = 50; (overwrites 3rd item). Accessing an array element is extremely fast (O(1)) because it's precisely calculated using continuous memory addresses.",
    keyPoint: "arr[0] = 10;  — Fast, memory-direct writing."
  },
  {
    id: 313, title: "FOR-EACH", subtitle: "Enhanced for Loop",
    icon: Repeat,
    content: "Java has a cleaner way to loop arrays without index variables: the enhanced for loop. for (int val : arr) { System.out.println(val); }. It means 'for each int val in arr'. Use this when you only need to READ values, not MODIFY the array or know the index.",
    keyPoint: "for(int x : arr) { } — clean READ-ONLY array looping!"
  },
  {
    id: 314, title: "MISTAKES", subtitle: "ArrayIndexOut... Exception",
    icon: AlertCircle,
    content: "The #1 Java Array error: ArrayIndexOutOfBoundsException. Usually caused by: for(int i=0; i <= arr.length; i++). The <= includes the index equal to length, which is 1 step too far! Always use < arr.length.",
    keyPoint: "i < arr.length ✅  |  i <= arr.length ❌ CRASH!"
  },
  {
    id: 315, title: "TRACE", subtitle: "Tracing Array Updates",
    icon: CheckCircle2,
    content: "In a traditional for loop: arr[i] = arr[i] * 2; successfully doubles values in the array. But in enhanced: for(int x : arr) { x = x*2; }, the array is UNCHANGED! 'x' is just a copy of the value, not the array slot itself.",
    keyPoint: "Enhanced loop 'x' is just a copy! Modify array slots using standard for loop."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 3 — JAVA ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L3_TESTS = [
  {
    id: 316, title: "MCQ ADVENTURE", subtitle: "Loops & Arrays Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "A Java array's size is?", options: ["Dynamic","Fixed","Unlimited","Determined at runtime dynamically"], a: 1, hint: "Once created, size cannot change." },
      { q: "How to get size of int[] arr?", options: ["arr.size()","arr.size","arr.length()","arr.length"], a: 3, hint: "Array property, no brackets." },
      { q: "What exception is thrown for invalid index?", options: ["NullPointerException","IndexOutOfBoundsException","ArrayIndexOutOfBoundsException","MemoryError"], a: 2, hint: "A specific bounds error." },
      { q: "A do-while loop in Java always executes?", options: ["Never","At least once","Continuously","Only if true"], a: 1, hint: "Checks condition AFTER block." },
      { q: "Valid array syntax?", options: ["int nums[] = {1};","int[] nums = {1};","Both","Neither"], a: 2, hint: "C-style brackets or Java-style (preferred). Both work." },
      { q: "What does 'continue' do?", options: ["Stops loop","Skips to next iteration","Jumps out of method","Ends program"], a: 1, hint: "Continues the loop, skipping current block." },
      { q: "When size is 5, valid indices are?", options: ["1 to 5","0 to 5","0 to 4","1 to 4"], a: 2, hint: "0-based." },
      { q: "A Java array can hold mixed data types?", options: ["Yes","No","Only with Objects","Only primitves"], a: 1, hint: "Arrays are strictly homogeneous (same type)." },
      { q: "Enhanced for loop 'for(int x:arr)' is best for?", options: ["Modifying elements","Iterating backwards","Reading all elements","Changing array size"], a: 2, hint: "It provides a read-only copy of elements." },
      { q: "Cause of infinite loop?", options: ["Missing break","Condition never falls False","Updating variable incorrectly","All of the above"], a: 3, hint: "Anything that stops condition from being met." }
    ]
  },
  {
    id: 317, title: "MATCH MASTER", subtitle: "Java Loop Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "for loop",        match: "Loop with init, condition, update" },
      { concept: "do-while",        match: "Guaranteed to execute at least once" },
      { concept: "arr.length",      match: "Property for array size" },
      { concept: "continue",        match: "Skips to the next round of the loop" },
      { concept: "fixed size",      match: "Arrays cannot be resized after creation!" },
      { concept: "ArrayIndexOutOfBounds", match: "Accessing an invalid array index" },
      { concept: "for(int x: arr)", match: "Enhanced for loop (read-only copy)" },
      { concept: "0-based",         match: "The first index of a Java array" }
    ]
  },
  {
    id: 318, title: "ROBO YES/NO", subtitle: "Java Loop Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "Java arrays can dynamically resize themselves.", a: false },
      { q: "The condition in a do-while loop is checked at the end.", a: true },
      { q: "arr.length() (with parentheses) gets the size of a Java array.", a: false },
      { q: "Valid indices for an array of size 10 are 0-9.", a: true },
      { q: "The enhanced loop 'for(int val : arr) { val = 5; }' modifies the array.", a: false },
      { q: "A completely empty array initialization 'int[] a = new int[5];' fills it with zeros.", a: true },
      { q: "Using '<= arr.length' in a for loop condition is a common bug.", a: true },
      { q: "The continue statement exits a loop entirely.", a: false },
      { q: "A while loop requires variables to be updated manually within its block.", a: true },
      { q: "Java arrays can hold mixed data types (a String and an int).", a: false }
    ]
  },
  {
    id: 319, title: "ALGO BUILDER", subtitle: "Array Max Value", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Find Maximum Value in Java Array",
      steps: [
        { id: 1, text: "int[] arr = {4, 9, 2, 7};", order: 1 },
        { id: 2, text: "int max = arr[0];", order: 2 },
        { id: 3, text: "for(int i = 1; i < arr.length; i++) {", order: 3 },
        { id: 4, text: "    if (arr[i] > max) max = arr[i];", order: 4 },
        { id: 5, text: "}", order: 5 }
      ]
    }
  },
  {
    id: 320, title: "JAVA SORTER", subtitle: "Array Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["int[]", "arr", "=", "new int[5];"], answer: ["int[]", "arr", "=", "new int[5];"] },
      { tokens: ["for(int i=0;", "i", "<", "arr.length;", "i++)"], answer: ["for(int i=0;", "i", "<", "arr.length;", "i++)"] },
      { tokens: ["for(", "int", "val", ":", "arr)"], answer: ["for(", "int", "val", ":", "arr)"] }
    ]
  }
];
