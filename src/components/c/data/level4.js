import { Cpu, Code, Zap, Terminal, Layers, Shield, HelpCircle, CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch, AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Type, Braces, Hash } from 'lucide-react';
// ─────────────────────────────────────────────────────────
// LEVEL 4 — C LANGUAGE: "Strings & Functions" (14 Sub-topics)
// ─────────────────────────────────────────────────────────
export const L4_FOUNDATION = [
  {
    id: 401, title: "WHAT_STRING", subtitle: "What is a String in C?",
    icon: Type,
    content: "C does NOT have a native String type! A string in C is just a 1D array of characters (char[]) that MUST end with a special null terminator '\\0'. This '\\0' is how C knows where the string ends in memory. Without it, functions will read garbage data until they crash.",
    keyPoint: "A C-string is a char array ending with '\\0'. Without '\\0', it's just a raw array."
  },
  {
    id: 402, title: "DECLARE_STR", subtitle: "Declaring Strings",
    icon: Code,
    content: "1) char name[] = \"Alice\"; (Compiler adds '\\0', making size 6). 2) char name[10] = \"Bob\"; (Size 10, remaining 6 bytes are '\\0'). 3) char *name = \"Charlie\"; (Creates a Read-Only string literal in protected memory. Trying to modify this causes a Segmentation Fault!).",
    keyPoint: "char name[] = \"Bob\" is mutable. char *name = \"Bob\" is read-only!"
  },
  {
    id: 403, title: "LENGTH", subtitle: "String Length (strlen)",
    icon: HelpCircle,
    content: "#include <string.h>. Use strlen(str) to get the length. CRITICAL: strlen() counts characters UNTIL it hits '\\0'. It does NOT count the '\\0' itself. So strlen(\"Cat\") is 3, even though it takes 4 bytes of memory.",
    keyPoint: "strlen(str) calculates length by looking for '\\0'. It does not count '\\0'."
  },
  {
    id: 404, title: "ACCESS_CHAR", subtitle: "Accessing Characters",
    icon: Hash,
    content: "Since strings are arrays, access them identically: str[0] is the first char. You CAN modify characters: str[0] = 'B'; (changes \"Cat\" to \"Bat\"). Characters use single quotes ('A'), strings use double quotes(\"A\"). 'A' takes 1 byte, \"A\" takes 2 bytes ('A' + '\\0').",
    keyPoint: "'A' (1 byte char). \"A\" (2 byte string: 'A' + '\\0')."
  },
  {
    id: 405, title: "COMPARE_STR", subtitle: "Comparing Strings (strcmp)",
    icon: ToggleLeft,
    content: "NEVER use == to compare strings in C! == compares the memory addresses (pointers). To compare text, #include <string.h> and use strcmp(s1, s2). It returns 0 if they match exactly! if (strcmp(s1, s2) == 0) { ... }.",
    keyPoint: "if (s1 == s2) is a BUG! Always use: if (strcmp(s1, s2) == 0)"
  },
  {
    id: 406, title: "CONCAT", subtitle: "Concatenation (strcat)",
    icon: Layers,
    content: "C has NO + operator for strings! To join them, #include <string.h> and use strcat(dest, src);. DANGER: The destination array MUST be large enough to hold both strings + '\\0'. If it's too small, strcat writes past the array, causing a Buffer Overflow crash.",
    keyPoint: "strcat(dest, src) copies src to end of dest. dest MUST have enough space!"
  },
  {
    id: 407, title: "STR_MISTAKES", subtitle: "Common String Mistakes",
    icon: AlertCircle,
    content: "1. Forgetting the '\\0'. 2. Using == instead of strcmp(). 3. Using strcat() or strcpy() into arrays that are too small (classic C vulnerability!). 4. Assigning strings with =: str1 = str2 is ILLEGAL for arrays. You must use strcpy(str1, str2).",
    keyPoint: "Arrays cannot be assigned with =. Use strcpy(dest, src)!"
  },
  {
    id: 408, title: "WHAT_FUNC", subtitle: "What are Functions?",
    icon: Braces,
    content: "A function is an independent block of code. Every C program requires at least one function: main(). Functions break large C programs into smaller, testable modules. Like printf() or scanf(), you can write your own custom functions.",
    keyPoint: "Functions are reusable blocks of code. main() is the entry point function."
  },
  {
    id: 409, title: "WHY_FUNC", subtitle: "Prototypes (Declarations)",
    icon: Star,
    content: "C compiles top-to-bottom. If main() calls a function defind BELOW main, the compiler errors because it hasn't seen it yet. Solution: Function Prototypes. Declare the signature at the top (e.g., int add(int, int);), then write the full function below main().",
    keyPoint: "Prototypes tell the compiler 'this function exists, I'll write the body later'."
  },
  {
    id: 410, title: "FUNC_SYNTAX", subtitle: "Function Syntax",
    icon: Code,
    content: "Syntax: returnType name(parameters) { body }. Example: int add(int a, int b) { return a + b; }. If it doesn't return anything, type is 'void'. Always define argument types clearly.",
    keyPoint: "int add(int a, int b) { return a + b; }"
  },
  {
    id: 411, title: "PARAMS", subtitle: "Pass by Value",
    icon: Zap,
    content: "By default, C passes arguments 'by value'. This means a COPY of the data is sent to the function. Modifying the parameter inside the function does NOT change the original variable! To change the original, you must use Pointers (Pass by Reference).",
    keyPoint: "Pass by Value: Functions receive COPIES of variables, not the originals."
  },
  {
    id: 412, title: "RETURN", subtitle: "Return Values",
    icon: Terminal,
    content: "A function can return ONE value. The type must match the signature. int compute() must return an int. The 'return' statement instantly terminates function execution and hands the value back to the caller.",
    keyPoint: "A function can only return ONE value. It exits immediately upon hitting 'return'."
  },
  {
    id: 413, title: "CALL_FUNC", subtitle: "Calling a Function",
    icon: CheckCircle2,
    content: "Call functions by name: int result = add(5, 10);. Note: Passing an array to a function (int arr[5]) actually passes a POINTER to the first element. The function loses the array's size info (array decay). You usually must pass the size as a second parameter!",
    keyPoint: "Arrays decay to pointers when passed to functions. You must also pass the size!"
  },
  {
    id: 414, title: "DEBUG_FUNC", subtitle: "Debugging Functions",
    icon: AlertCircle,
    content: "1. Missing prototype (Implicit declaration warning). 2. Returning a pointer to a local variable (DANGER: local variables are destroyed when the function ends, leaving a dangling pointer!). 3. Argument mismatch in type or count.",
    keyPoint: "NEVER return a pointer to a local variable! It's destroyed when the function exits."
  }
];

// ─────────────────────────────────────────────────────────
// LEVEL 4 — C ELITE TESTS
// ─────────────────────────────────────────────────────────
export const L4_TESTS = [
  {
    id: 415, title: "MCQ ADVENTURE", subtitle: "C Strings & Functions Quiz", icon: MapPin, type: 'mcq',
    gameData: [
      { q: "How do you compare two strings in C?", options: ["s1 == s2","s1.equals(s2)","strcmp(s1, s2) == 0","s1 = s2"], a: 2, hint: "Include <string.h>." },
      { q: "What does a C-String require at the end?", options: ["A period",";","'\\0' (Null terminator)","Nothing"], a: 2, hint: "It tells string functions where to stop." },
      { q: "How many bytes does the string \"A\" take in C?", options: ["1","2","Depends on compiler","0"], a: 1, hint: "'A' + '\\0'" },
      { q: "What is the purpose of a Function Prototype?", options: ["Compile faster","Declare it before use (top down)","Make it global","Nothing"], a: 1, hint: "Satisfies the top-to-bottom compiler." },
      { q: "Can you assign an array with =? (e.g. str1 = str2)", options: ["Yes","No, must use strcpy()","Only if same size","Yes, but str2 is deleted"], a: 1, hint: "Arrays cannot be assigned directly." },
      { q: "What happens when you pass an array to a C function?", options: ["It is copied","It decays to a pointer (loses size)","It causes an error","Function gets its size"], a: 1, hint: "You must pass the size separately!" },
      { q: "By default, C passes variables to functions by...", options: ["Reference (Pointers)","Value (Copies)","Name","Dynamic link"], a: 1, hint: "Modifying it inside doesn't change the original." },
      { q: "What does strlen() do?", options: ["Counts bytes including \\0","Counts chars up to \\0","Gets array capacity","Compares strings"], a: 1, hint: "Excludes the null terminator." },
      { q: "char *str = \"Hello\"; allows you to change letters (e.g., str[0]='B').", options: ["True","False, it's read-only","Depends on OS","True but slow"], a: 1, hint: "String literals are stored in read-only memory." },
      { q: "Which function concatenates (joins) two strings?", options: ["strjoin()","stradd()","strcat()","strcpy()"], a: 2, hint: "String Concatenate" }
    ]
  },
  {
    id: 416, title: "MATCH MASTER", subtitle: "C String Sync", icon: Layers, type: 'match',
    gameData: [
      { concept: "\\0",            match: "Null terminator, marks end of string" },
      { concept: "strcmp()",        match: "Compares text of two strings safely" },
      { concept: "strcpy()",        match: "Copies a string (cannot use =)" },
      { concept: "strcat()",        match: "Joins strings (Beware buffer overflows!)" },
      { concept: "Prototype",       match: "Declares function signature at top of file" },
      { concept: "Pass by Value",   match: "Function receives a copy of the variable" },
      { concept: "Array Decay",     match: "Array passed to function becomes a pointer" },
      { concept: "char *s = \"Hi\"",  match: "Creates a Read-Only string literal" }
    ]
  },
  {
    id: 417, title: "ROBO YES/NO", subtitle: "C Truths", icon: Bot, type: 'yesno',
    gameData: [
      { q: "C has a built-in 'string' keyword/type.", a: false },
      { q: "strlen(\"Cat\") returns 4 because of the null terminator.", a: false },
      { q: "s1 == s2 safely checks if two strings contain the same text.", a: false },
      { q: "Assigning str1 = str2 is illegal for char arrays in C.", a: true },
      { q: "Function prototypes allow you to define main() at the top of your file.", a: true },
      { q: "When modifying a pass-by-value int parameter, the original variable in main() changes.", a: false },
      { q: "strcat() will automatically resize the destination array if it's too small.", a: false },
      { q: "An array passed to a function loses its size information.", a: true },
      { q: "A function with return type 'void' cannot return a value.", a: true },
      { q: "char name[] = \"Bob\"; is mutable (you can change 'B' to 'M').", a: true }
    ]
  },
  {
    id: 418, title: "C SORTER", subtitle: "Assembly", icon: Code, type: 'sorter',
    gameData: [
      { tokens: ["if", "(strcmp", "(s1,", "s2)", "==", "0)"], answer: ["if", "(strcmp", "(s1,", "s2)", "==", "0)"] },
      { tokens: ["void", "print(", "int", "x)"], answer: ["void", "print(", "int", "x)"] },
      { tokens: ["char", "name[]", "=", "\"Alice\";"], answer: ["char", "name[]", "=", "\"Alice\";"] }
    ]
  },
  {
    id: 419, title: "ALGO BUILDER", subtitle: "Str Funcs", icon: ListOrdered, type: 'algo',
    gameData: {
      title: "Copying Strings in C",
      steps: [
        { id: 1, text: "#include <string.h>", order: 1 },
        { id: 2, text: "char src[] = \"Hello\";", order: 2 },
        { id: 3, text: "char dest[10];", order: 3 },
        { id: 4, text: "strcpy(dest, src);", order: 4 },
        { id: 5, text: "printf(\"%s\", dest);", order: 5 }
      ]
    }
  }
];
