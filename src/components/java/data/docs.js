import { 
  Cpu, Code, Terminal, Zap, Layers, Shield, HelpCircle, 
  CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch,
  AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash,
  Box, Expand, Type, Skull, Crosshair, BookOpen, Info,
  MessageSquare, Layout, Sparkles, Database, Search, 
  Binary, Hammer, FlaskConical, Target, ArrowRight
} from 'lucide-react';

export const JAVA_DOCS = [
  {
    category: "🟢 LEVEL 0 — NOOB ZONE (Foundations)",
    topics: [
      { title: "What is a Computer?", icon: Cpu },
      { title: "What is a Program?", icon: Terminal },
      { title: "What is Programming?", icon: Zap },
      { title: "What is a Programming Language?", icon: Shield },
      { title: "Types of Languages?", icon: Layers },
      { title: "Real-Life Instructions", icon: ListOrdered },
      { title: "Input Concept", icon: Database },
      { title: "Output Concept", icon: CheckCircle2 },
      { title: "Logic", icon: GitBranch },
      { title: "Algorithm", icon: MapPin },
      { title: "Debugging", icon: Hammer },
      { title: "Why Coding is Useful", icon: Sparkles }
    ]
  },
  {
    category: "🔵 LEVEL 1 — FIRST CODE (Basic Syntax)",
    topics: [
      { title: "STRUCTURE", icon: Layout },
      { title: "PRINTLN", icon: MessageSquare },
      { title: "PRINT", icon: Layout },
      { title: "VARIABLES", icon: Box },
      { title: "NAMING", icon: Shield },
      { title: "INT", icon: Cpu },
      { title: "DOUBLE", icon: Cpu },
      { title: "FLOAT", icon: Cpu },
      { title: "STRING", icon: Type },
      { title: "BOOLEAN", icon: ToggleLeft },
      { title: "ASSIGN", icon: Zap },
      { title: "SCANNER", icon: HelpCircle },
      { title: "COMMENTS", icon: Info },
      { title: "KEYWORDS", icon: Shield }
    ]
  },
  {
    category: "🟡 LEVEL 2 — DECISIONS (Logic)",
    topics: [
      { title: "IF_STMT", icon: GitBranch },
      { title: "IF_ELSE", icon: GitBranch },
      { title: "ELSE_IF", icon: ListOrdered },
      { title: "COMPARE", icon: Filter },
      { title: "LOGICAL", icon: FlaskConical },
      { title: "SWITCH", icon: Layout }
    ]
  },
  {
    category: "🟠 LEVEL 3 — LOOPS & ARRAYS (Repetition)",
    topics: [
      { title: "For Loops", icon: Repeat },
      { title: "While Loops", icon: Repeat },
      { title: "Java Arrays", icon: ListIcon },
      { title: "Indexing & Errors", icon: Hash },
      { title: "Array Iteration", icon: Repeat }
    ]
  },
  {
    category: "🟣 LEVEL 4 — STRINGS & FUNCTIONS (Structure)",
    topics: [
      { title: "String Methods", icon: Type },
      { title: "String Comparison (.equals)", icon: Filter },
      { title: "Methods (Functions)", icon: FlaskConical },
      { title: "Parameter Passing", icon: Layout }
    ]
  },
  {
    category: "🔴 LEVEL 5 — CORE PROBLEM SOLVING (Algorithms)",
    topics: [
      { title: "Recursive Logic", icon: Repeat },
      { title: "Linear Search", icon: Search }
    ]
  },
  {
    category: "⚫ LEVEL 6 — LOGIC MASTER (Pro Logic)",
    topics: [
      { title: "Binary Search in Java", icon: Binary },
      { title: "Algorithm Efficiency (O)", icon: Zap }
    ]
  },
  {
    category: "👾 FINAL BOSS — ULTIMATE CLASH",
    topics: [
      { title: "Ultimate JVM Integration", icon: Skull }
    ]
  }
];
