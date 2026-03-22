import { 
  Cpu, Code, Terminal, Zap, Layers, Shield, HelpCircle, 
  CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch,
  AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash,
  Box, Expand, Type, Skull, Crosshair, BookOpen, Info,
  MessageSquare, Layout, Sparkles, Database, Search, 
  Binary, Hammer, FlaskConical, Target, ArrowRight
} from 'lucide-react';

export const PYTHON_DOCS = [
  {
    category: "🟢 LEVEL 0 — NOOB ZONE (Foundations)",
    topics: [
      { title: "What is a computer", icon: Cpu },
      { title: "What is a program", icon: Terminal },
      { title: "What is programming", icon: Code },
      { title: "What is a programming language", icon: BookOpen },
      { title: "Types of languages", icon: Layers },
      { title: "Real-life examples of instructions", icon: ListOrdered },
      { title: "Input concept", icon: ArrowRight },
      { title: "Output concept", icon: MessageSquare },
      { title: "What is logic", icon: HelpCircle },
      { title: "What is an algorithm", icon: MapPin },
      { title: "What is debugging", icon: Hammer },
      { title: "Why coding is useful", icon: Sparkles }
    ]
  },
  {
    category: "🔵 LEVEL 1 — FIRST CODE",
    topics: [
      { title: "Structure of a basic program", icon: Layout },
      { title: "Print statements", icon: MessageSquare },
      { title: "Output formatting", icon: Filter },
      { title: "Variables (what & why)", icon: Box },
      { title: "Naming rules for variables", icon: Shield },
      { title: "Data types (int, float, string, boolean)", icon: Database },
      { title: "Assigning values", icon: Zap },
      { title: "Reassigning variables", icon: Repeat },
      { title: "Basic input (concept only)", icon: ArrowRight },
      { title: "Comments in code", icon: Info },
      { title: "Keywords (basic idea)", icon: Shield },
      { title: "Case sensitivity", icon: AlertCircle },
      { title: "Simple output prediction", icon: HelpCircle }
    ]
  },
  {
    category: "🟡 LEVEL 2 — DECISIONS",
    topics: [
      { title: "What is condition", icon: HelpCircle },
      { title: "Boolean values (true/false)", icon: ToggleLeft },
      { title: "if statement", icon: GitBranch },
      { title: "if-else", icon: GitBranch },
      { title: "nested if (basic idea)", icon: Filter },
      { title: "Comparison operators (>, <, ==, !=)", icon: CheckCircle2 },
      { title: "Logical operators (AND, OR)", icon: FlaskConical },
      { title: "Checking multiple conditions", icon: Layers },
      { title: "Real-life decision examples", icon: MapPin },
      { title: "Simple debugging in conditions", icon: Hammer },
      { title: "Output prediction with if", icon: HelpCircle },
      { title: "Common mistakes in conditions", icon: AlertCircle }
    ]
  },
  {
    category: "🟠 LEVEL 3 — LOOPS & ARRAYS",
    topics: [
      { title: "What is loop", icon: Repeat },
      { title: "for loop syntax", icon: Repeat },
      { title: "while loop", icon: Repeat },
      { title: "do-while (basic idea)", icon: Repeat },
      { title: "Loop conditions", icon: Filter },
      { title: "Infinite loop (concept)", icon: AlertCircle },
      { title: "Nested loops (intro)", icon: Layers },
      { title: "What is array", icon: ListIcon },
      { title: "Array declaration", icon: Box },
      { title: "Indexing (0-based)", icon: Hash },
      { title: "Accessing elements", icon: Target },
      { title: "Updating elements", icon: Zap },
      { title: "Loop through array", icon: Repeat },
      { title: "Common array mistakes", icon: AlertCircle },
      { title: "Output tracing (loops + arrays)", icon: Search }
    ]
  },
  {
    category: "🟣 LEVEL 4 — FUNCTION & LOGIC",
    topics: [
      { title: "What is function", icon: Braces },
      { title: "Creating a function", icon: Code },
      { title: "Calling a function", icon: Zap },
      { title: "Function parameters", icon: Terminal },
      { title: "Function arguments", icon: Code },
      { title: "return statement", icon: ArrowRight },
      { title: "Scope (Home vs Outside)", icon: Shield },
      { title: "Why use functions", icon: Star },
      { title: "Built-in functions (range, len)", icon: Cpu },
      { title: "Input/Output in functions", icon: Layers },
      { title: "Logic building with functions", icon: GitBranch },
      { title: "Output prediction (functions)", icon: HelpCircle }
    ]
  },
  {
    category: "🔴 LEVEL 5 — DATA POWER",
    topics: [
      { title: "Strings (multi-line, quote types)", icon: Type },
      { title: "String methods (.upper, .lower)", icon: RefreshCw },
      { title: "String slicing (substrings)", icon: Filter },
      { title: "Escape characters (\\n, \\t)", icon: Zap },
      { title: "Introduction to Tuples", icon: Layers },
      { title: "Accessing Tuples", icon: HelpCircle },
      { title: "Immutable nature of Tuples", icon: Shield },
      { title: "Introduction to Dictionaries", icon: Braces },
      { title: "Key-Value pairs (concept)", icon: Activity },
      { title: "Accessing Dictionary values", icon: Search },
      { title: "Updating Dictionaries", icon: RefreshCw },
      { title: "Common mistakes in Data Structures", icon: AlertCircle }
    ]
  },
  {
    category: "⚫ LEVEL 6 — LOGIC MASTER",
    topics: [
      { title: "Binary search (concept)", icon: Binary },
      { title: "Sorted array requirement", icon: Shield },
      { title: "Mid calculation", icon: Hash },
      { title: "Divide and conquer idea", icon: GitBranch },
      { title: "Comparing search methods", icon: Filter },
      { title: "Sorting comparison", icon: Filter },
      { title: "Edge cases", icon: AlertCircle },
      { title: "Advanced debugging", icon: Hammer },
      { title: "Code optimization (simple idea)", icon: Zap },
      { title: "Mixed problem solving", icon: Layers },
      { title: "Identifying patterns", icon: Search },
      { title: "Logical thinking improvement", icon: Sparkles },
      { title: "Error handling basics", icon: Shield }
    ]
  },
  {
    category: "👾 FINAL BOSS LEVEL — ULTIMATE CLASH",
    topics: [
      { title: "Mixed from all levels", icon: Target },
      { title: "Syntax", icon: Code },
      { title: "Conditions", icon: GitBranch },
      { title: "Loops", icon: Repeat },
      { title: "Arrays", icon: ListIcon },
      { title: "Strings", icon: Type },
      { title: "Functions", icon: FlaskConical },
      { title: "Searching", icon: Search },
      { title: "Sorting", icon: ListOrdered },
      { title: "Debugging", icon: Hammer }
    ]
  }
];
