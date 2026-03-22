import { 
  Cpu, Code, Terminal, Zap, Layers, Shield, HelpCircle, 
  CheckCircle2, Star, MapPin, Bot, ListOrdered, GitBranch,
  AlertCircle, Filter, ToggleLeft, Repeat, ListIcon, Hash,
  Box, Expand, Type, Skull, Crosshair, BookOpen, Info,
  MessageSquare, Layout, Sparkles, Database, Search, 
  Binary, Hammer, FlaskConical, Target, ArrowRight
} from 'lucide-react';

export const C_DOCS = [
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
      { title: "PRINTF", icon: MessageSquare },
      { title: "FORMAT", icon: Code },
      { title: "VARIABLES", icon: Box },
      { title: "NAMING", icon: Shield },
      { title: "INT", icon: Cpu },
      { title: "FLOAT", icon: Cpu },
      { title: "CHAR/STRING", icon: Type },
      { title: "INT_BOOL", icon: ToggleLeft },
      { title: "ASSIGN", icon: Zap },
      { title: "SCANF", icon: HelpCircle },
      { title: "COMMENTS", icon: Info },
      { title: "KEYWORDS", icon: Shield }
    ]
  },
  {
    category: "🟡 LEVEL 2 — DECISIONS (Logic)",
    topics: [
      { title: "IF_STMT", icon: GitBranch },
      { title: "IF_ELSE", icon: GitBranch },
      { title: "ELSE_IF", icon: GitBranch },
      { title: "COMPARE", icon: Filter },
      { title: "LOGICAL", icon: FlaskConical },
      { title: "MISTAKES", icon: AlertCircle }
    ]
  },
  {
    category: "🟠 LEVEL 3 — LOOPS & ARRAYS (Repetition)",
    topics: [
      { title: "For Loops", icon: Repeat },
      { title: "While Loops", icon: Repeat },
      { title: "C Arrays", icon: ListIcon },
      { title: "Indexing & Updating", icon: Hash },
      { title: "Looping through Arrays", icon: Repeat }
    ]
  },
  {
    category: "🟣 LEVEL 4 — STRINGS & FUNCTIONS (Structure)",
    topics: [
      { title: "C Strings", icon: Type },
      { title: "String Library <string.h>", icon: Hash },
      { title: "Functions (Structure)", icon: FlaskConical },
      { title: "Params & Return", icon: ArrowRight }
    ]
  },
  {
    category: "🔴 LEVEL 5 — CORE PROBLEM SOLVING (Algorithms)",
    topics: [
      { title: "Recursion in C", icon: Repeat },
      { title: "Linear Search", icon: Search }
    ]
  },
  {
    category: "⚫ LEVEL 6 — LOGIC MASTER (Pro Logic)",
    topics: [
      { title: "Binary Search", icon: Binary },
      { title: "Code Optimization", icon: Zap }
    ]
  },
  {
    category: "👾 FINAL BOSS — ULTIMATE CLASH",
    topics: [
      { title: "Ultimate Assembly", icon: Skull }
    ]
  }
];
