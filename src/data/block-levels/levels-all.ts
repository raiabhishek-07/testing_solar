import { BlockLevel } from '../blockLevelTypes';

// ════════════════════════════════════════════════════════════════════════════
// BLOCK ADVENTURE — 21-LEVEL CODING CURRICULUM
// ════════════════════════════════════════════════════════════════════════════
//
// TIER 1  — Levels  1–7  : Beach  / Beginner   — Sequential instructions
// TIER 2  — Levels  8–14 : Forest / Intermediate — Loops & Conditions
// TIER 3  — Levels 15–21 : Abyss  / Advanced   — Functions & Algorithms
// ════════════════════════════════════════════════════════════════════════════

// ────────────────────────────────────────────────────────────────────────────
// TIER 1 — Sequential Instructions (no blocks other than move/action)
// ────────────────────────────────────────────────────────────────────────────

/** Level 1 — Execute a single command (RIGHT) */
export const level1: BlockLevel = {
  id: 1, title: 'First Command', theme: 'beach', difficulty: 'easy',
  width: 8, height: 8,
  mission: 'Run your first line of code!',
  description:
    '🟢 CONCEPT: Sequential Execution\n\nA computer runs instructions one by one, from top to bottom. Place a single MOVE RIGHT block to advance to the gem. This is your first line of code!',
  start: { x: 2, y: 4 },
  gems: [{ id: 101, x: 5, y: 4, collected: false }],
  obstacles: [],
  constraints: { maxBlocks: 1 },
};

/** Level 2 — Sequence of 3 moves */
export const level2: BlockLevel = {
  id: 2, title: 'Step by Step', theme: 'beach', difficulty: 'easy',
  width: 9, height: 8,
  mission: 'Collect both gems in one run.',
  description:
    '🟢 CONCEPT: Program Flow\n\nCode executes line by line. Use RIGHT + DOWN + RIGHT in that order to trace the path to both gems. Order matters!',
  start: { x: 1, y: 2 },
  gems: [
    { id: 201, x: 4, y: 2, collected: false },
    { id: 202, x: 4, y: 5, collected: false },
  ],
  obstacles: [{ x: 2, y: 4 }, { x: 3, y: 4 }],
  constraints: { maxBlocks: 6 },
};

/** Level 3 — Navigate around a wall (obstacles) */
export const level3: BlockLevel = {
  id: 3, title: 'Around the Wall', theme: 'beach', difficulty: 'easy',
  width: 9, height: 9,
  mission: 'Navigate around the obstacle.',
  description:
    '🟢 CONCEPT: Data Path & Routing\n\nWalls block movement — you must go around them! Plan the full move sequence before running: down, right ×3, up.',
  start: { x: 2, y: 4 },
  gems: [{ id: 301, x: 6, y: 2, collected: false }],
  obstacles: [
    { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 },
  ],
  constraints: { maxBlocks: 8 },
};

/** Level 4 — Multi-gem collect with ordering */
export const level4: BlockLevel = {
  id: 4, title: 'Collect All', theme: 'beach', difficulty: 'easy',
  width: 10, height: 9,
  mission: 'Collect all 3 gems in one run.',
  description:
    '🟢 CONCEPT: Multiple Instructions\n\nChain many commands together. Real programs can have thousands of lines! Plan your path to touch all three gems without backtracking unnecessarily.',
  start: { x: 1, y: 4 },
  gems: [
    { id: 401, x: 3, y: 2, collected: false },
    { id: 402, x: 6, y: 4, collected: false },
    { id: 403, x: 3, y: 6, collected: false },
  ],
  obstacles: [{ x: 5, y: 2 }, { x: 5, y: 3 }, { x: 5, y: 5 }, { x: 5, y: 6 }],
  constraints: { maxBlocks: 14 },
};

/** Level 5 — Zig-zag path */
export const level5: BlockLevel = {
  id: 5, title: 'Zig Zag Path', theme: 'beach', difficulty: 'easy',
  width: 10, height: 10,
  mission: 'Follow the winding path to the gem.',
  description:
    '🟢 CONCEPT: Sequences & Patterns\n\nPatterns appear everywhere in programming. Notice the zig-zag: RIGHT × 2, DOWN, RIGHT × 2, DOWN, RIGHT × 2 — a repeating pattern you\'ll soon replace with a Loop!',
  start: { x: 1, y: 2 },
  gems: [{ id: 501, x: 7, y: 8, collected: false }],
  obstacles: [
    { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 },
    { x: 3, y: 3 }, { x: 3, y: 4 },
    { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 },
    { x: 7, y: 5 }, { x: 7, y: 6 },
  ],
  constraints: { maxBlocks: 16 },
};

/** Level 6 — Two-path choice (understand branching intro) */
export const level6: BlockLevel = {
  id: 6, title: 'Two Roads', theme: 'beach', difficulty: 'easy',
  width: 11, height: 9,
  mission: 'Choose the open path and grab both gems.',
  description:
    '🟢 CONCEPT: Decision Making\n\nSometimes you need to decide which way to go. Try the upper path first. If it\'s blocked, take the lower path. You\'re about to learn how to let the computer decide automatically!',
  start: { x: 1, y: 4 },
  gems: [
    { id: 601, x: 8, y: 2, collected: false },
    { id: 602, x: 8, y: 6, collected: false },
  ],
  obstacles: [
    { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 6, y: 4 },
    { x: 4, y: 3 }, { x: 4, y: 5 },
    { x: 6, y: 3 }, { x: 6, y: 5 },
  ],
  constraints: { maxBlocks: 18 },
};

/** Level 7 — Intro to SCAN command before enemy encounters */
export const level7: BlockLevel = {
  id: 7, title: 'Scout Ahead', theme: 'beach', difficulty: 'easy',
  width: 10, height: 8,
  mission: 'Use SCAN then collect safely.',
  description:
    '🟡 CONCEPT: Functions\n\nSCAN is your first "built-in function" — it runs a complex detection routine in one command. After scanning, you can safely navigate. Functions wrap complex work into a single reusable call!',
  start: { x: 1, y: 4 },
  gems: [
    { id: 701, x: 5, y: 2, collected: false },
    { id: 702, x: 5, y: 6, collected: false },
  ],
  obstacles: [{ x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }],
  constraints: { maxBlocks: 12, requiredBlockTypes: ['scan'] },
};

// ────────────────────────────────────────────────────────────────────────────
// TIER 2 — Loops & Conditions
// ────────────────────────────────────────────────────────────────────────────

/** Level 8 — First loop (repeat × 4) */
export const level8: BlockLevel = {
  id: 8, title: 'Loop Intro', theme: 'forest', difficulty: 'easy',
  width: 10, height: 8,
  mission: 'Use a REPEAT block to move 5 steps right.',
  description:
    '🟡 CONCEPT: for-Loop\n\nInstead of writing RIGHT × 5, put ONE RIGHT inside a REPEAT(5) block. A loop runs its inner code N times. This is the most fundamental tool for avoiding repetitive code — DRY principle!',
  start: { x: 1, y: 4 },
  gems: [{ id: 801, x: 6, y: 4, collected: false }],
  obstacles: [],
  constraints: { maxBlocks: 3, requiredBlockTypes: ['repeat'] },
};

/** Level 9 — Loop with direction change */
export const level9: BlockLevel = {
  id: 9, title: 'Loop the Grid', theme: 'forest', difficulty: 'easy',
  width: 10, height: 10,
  mission: 'Use nested moves inside a loop to collect all gems.',
  description:
    '🟡 CONCEPT: Loop Body\n\nA loop body can hold MULTIPLE commands. Put RIGHT + DOWN inside REPEAT(3) to staircase down and collect all gems. Think of a loop like a chest of drawers — everything inside runs multiple times!',
  start: { x: 1, y: 1 },
  gems: [
    { id: 901, x: 3, y: 3, collected: false },
    { id: 902, x: 5, y: 5, collected: false },
    { id: 903, x: 7, y: 7, collected: false },
  ],
  obstacles: [],
  constraints: { maxBlocks: 4, requiredBlockTypes: ['repeat'] },
};

/** Level 10 — IF condition: gemAhead */
export const level10: BlockLevel = {
  id: 10, title: 'If Gem Ahead', theme: 'forest', difficulty: 'medium',
  width: 10, height: 8,
  mission: 'Use IF to only collect when a gem is nearby.',
  description:
    '🟡 CONCEPT: if-Statement\n\nAn if-statement runs code ONLY when a condition is true. Use IF (gem detected) → COLLECT. This way your hero won\'t blindly reach for nothing. Boolean logic: true or false!',
  start: { x: 1, y: 4 },
  gems: [
    { id: 1001, x: 4, y: 4, collected: false },
    { id: 1002, x: 7, y: 4, collected: false },
  ],
  enemies: [{ id: 10001, x: 3, y: 4, type: 'robot', health: 1 }],
  obstacles: [],
  constraints: { maxBlocks: 8, requiredBlockTypes: ['ifThen'] },
};

/** Level 11 — Loop + Condition combo */
export const level11: BlockLevel = {
  id: 11, title: 'Loop & Check', theme: 'forest', difficulty: 'medium',
  width: 11, height: 9,
  mission: 'Combine a loop with a condition to collect scattered gems.',
  description:
    '🟡 CONCEPT: Loop + Condition\n\nPut an IF block INSIDE a REPEAT. Each iteration the robot scans ahead and grabs a gem only if it\'s there. This is the foundation of all search algorithms!',
  start: { x: 1, y: 4 },
  gems: [
    { id: 1101, x: 3, y: 4, collected: false },
    { id: 1102, x: 6, y: 4, collected: false },
    { id: 1103, x: 9, y: 4, collected: false },
  ],
  obstacles: [{ x: 4, y: 4 }, { x: 7, y: 4 }],
  constraints: { maxBlocks: 6, requiredBlockTypes: ['repeat', 'ifThen'] },
};

/** Level 12 — Enemy patrol (use ATTACK inside IF) */
export const level12: BlockLevel = {
  id: 12, title: 'Guard the Path', theme: 'forest', difficulty: 'medium',
  width: 12, height: 9,
  mission: 'Defeat enemies and reach the gem.',
  description:
    '🟡 CONCEPT: Conditional Actions\n\nIF (enemy detected) → ATTACK, ELSE → MOVE. This is if-else logic! Real programs constantly check conditions and branch into different code paths. Plan for every case.',
  start: { x: 1, y: 4 },
  gems: [{ id: 1201, x: 10, y: 4, collected: false }],
  enemies: [
    { id: 12001, x: 4, y: 4, type: 'robot', health: 1 },
    { id: 12002, x: 7, y: 4, type: 'guardian', health: 2 },
  ],
  obstacles: [{ x: 3, y: 3 }, { x: 5, y: 5 }, { x: 6, y: 3 }, { x: 8, y: 5 }],
  constraints: { maxBlocks: 10, requiredBlockTypes: ['ifThen'] },
};

/** Level 13 — WHILE-style loop: keep moving until gem */
export const level13: BlockLevel = {
  id: 13, title: 'Keep Going', theme: 'forest', difficulty: 'medium',
  width: 12, height: 10,
  mission: 'Use a large repeat loop to sweep the row.',
  description:
    '🟡 CONCEPT: while-Loop Pattern\n\nA large REPEAT loop that checks conditions each time simulates a while loop — "keep going while path is clear." This is how robots and AI agents navigate unknown spaces.',
  start: { x: 1, y: 5 },
  gems: [
    { id: 1301, x: 4, y: 2, collected: false },
    { id: 1302, x: 4, y: 8, collected: false },
    { id: 1303, x: 9, y: 5, collected: false },
  ],
  obstacles: [
    { x: 2, y: 4 }, { x: 2, y: 6 }, { x: 6, y: 3 }, { x: 6, y: 7 },
    { x: 7, y: 4 }, { x: 7, y: 6 },
  ],
  constraints: { maxBlocks: 10 },
};

/** Level 14 — Multi-enemy + loop (compound loop body) */
export const level14: BlockLevel = {
  id: 14, title: 'Enemy Wave', theme: 'forest', difficulty: 'medium',
  width: 12, height: 10,
  mission: 'Clear all enemies and collect the gem.',
  description:
    '🟡 CONCEPT: Nested Logic\n\nNested loops and conditions: outer loop moves, inner IF checks for enemy and attacks. Nesting is how you build complex, layered behavior from simple building blocks.',
  start: { x: 1, y: 5 },
  gems: [{ id: 1401, x: 10, y: 5, collected: false }],
  enemies: [
    { id: 14001, x: 3, y: 5, type: 'robot', health: 1 },
    { id: 14002, x: 5, y: 5, type: 'robot', health: 1 },
    { id: 14003, x: 7, y: 5, type: 'guardian', health: 2 },
    { id: 14004, x: 9, y: 5, type: 'guardian', health: 2 },
  ],
  obstacles: [{ x: 4, y: 4 }, { x: 4, y: 6 }, { x: 8, y: 4 }, { x: 8, y: 6 }],
  constraints: { maxBlocks: 8, requiredBlockTypes: ['repeat', 'ifThen'] },
};

// ────────────────────────────────────────────────────────────────────────────
// TIER 3 — Functions & Search Algorithms
// ────────────────────────────────────────────────────────────────────────────

/** Level 15 — Intro to BFS algorithm block */
export const level15: BlockLevel = {
  id: 15, title: 'Breadth First', theme: 'abyss', difficulty: 'hard',
  width: 12, height: 12,
  mission: 'Use BFS to find and collect all gems.',
  description:
    '🔴 CONCEPT: BFS — Breadth First Search\n\nBFS explores layer by layer outward from the start, guaranteeing the shortest path. It\'s like ripples on water! Use the BFS block to automatically navigate the maze to the nearest gem.',
  start: { x: 1, y: 6 },
  gems: [
    { id: 1501, x: 9, y: 3, collected: false },
    { id: 1502, x: 9, y: 9, collected: false },
  ],
  obstacles: [
    { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 },
    { x: 5, y: 3 }, { x: 5, y: 4 }, { x: 5, y: 5 },
    { x: 5, y: 7 }, { x: 5, y: 8 }, { x: 5, y: 9 },
    { x: 7, y: 4 }, { x: 7, y: 5 }, { x: 7, y: 8 }, { x: 7, y: 9 },
  ],
  algorithm: 'bfs',
  constraints: { maxBlocks: 4, requiredBlockTypes: ['runBFS'] },
};

/** Level 16 — BFS vs maze with longer path */
export const level16: BlockLevel = {
  id: 16, title: 'The Maze', theme: 'abyss', difficulty: 'hard',
  width: 13, height: 12,
  mission: 'Navigate the abyss maze using BFS.',
  description:
    '🔴 CONCEPT: Graph Traversal\n\nA maze is a graph where each cell is a node and moves are edges. BFS visits every reachable node at distance 1 first, then distance 2, etc. It never misses the shortest route!',
  start: { x: 1, y: 1 },
  gems: [{ id: 1601, x: 11, y: 10, collected: false }],
  obstacles: [
    { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 },
    { x: 2, y: 4 }, { x: 4, y: 4 }, { x: 5, y: 4 }, { x: 7, y: 4 }, { x: 8, y: 4 }, { x: 9, y: 4 },
    { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 5, y: 6 }, { x: 7, y: 6 }, { x: 9, y: 6 }, { x: 10, y: 6 },
    { x: 4, y: 8 }, { x: 5, y: 8 }, { x: 6, y: 8 }, { x: 8, y: 8 }, { x: 9, y: 8 },
    { x: 2, y: 9 }, { x: 3, y: 9 }, { x: 6, y: 10 }, { x: 7, y: 10 },
  ],
  algorithm: 'bfs',
  constraints: { maxBlocks: 4, requiredBlockTypes: ['runBFS'] },
};

/** Level 17 — DFS to explore deep */
export const level17: BlockLevel = {
  id: 17, title: 'Deep Dive', theme: 'abyss', difficulty: 'hard',
  width: 12, height: 12,
  mission: 'Use DFS to explore deeply and collect the hidden gem.',
  description:
    '🔴 CONCEPT: DFS — Depth First Search\n\nDFS dives as deep as possible down one branch before backtracking. It\'s like exploring a cave — go all the way in before trying another tunnel. Great for detecting reachability!',
  start: { x: 1, y: 1 },
  gems: [{ id: 1701, x: 10, y: 10, collected: false }],
  obstacles: [
    { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 8, y: 3 },
    { x: 4, y: 4 }, { x: 4, y: 5 }, { x: 4, y: 6 }, { x: 4, y: 7 },
    { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 6, y: 7 }, { x: 6, y: 8 },
    { x: 8, y: 6 }, { x: 8, y: 7 }, { x: 8, y: 8 }, { x: 8, y: 9 },
    { x: 2, y: 8 }, { x: 3, y: 8 }, { x: 3, y: 9 }, { x: 3, y: 10 },
  ],
  algorithm: 'dfs',
  constraints: { maxBlocks: 4, requiredBlockTypes: ['runDFS'] },
};

/** Level 18 — A* pathfinding with enemies */
export const level18: BlockLevel = {
  id: 18, title: 'Optimal Path', theme: 'abyss', difficulty: 'hard',
  width: 13, height: 11,
  mission: 'Use A* to find the optimal path through enemy territory.',
  description:
    '🔴 CONCEPT: A* Algorithm\n\nA* combines BFS\'s completeness with a heuristic (estimated distance to goal) to find the shortest path faster. It\'s used in GPS navigation and game AI! The heuristic guides it toward the goal.',
  start: { x: 1, y: 5 },
  gems: [{ id: 1801, x: 11, y: 5, collected: false }],
  enemies: [
    { id: 18001, x: 5, y: 3, type: 'guardian', health: 2 },
    { id: 18002, x: 5, y: 7, type: 'guardian', health: 2 },
    { id: 18003, x: 8, y: 5, type: 'golem', health: 3 },
  ],
  obstacles: [
    { x: 3, y: 4 }, { x: 3, y: 6 },
    { x: 7, y: 4 }, { x: 7, y: 6 },
    { x: 9, y: 3 }, { x: 9, y: 4 }, { x: 9, y: 6 }, { x: 9, y: 7 },
  ],
  algorithm: 'astar',
  constraints: { maxBlocks: 6, requiredBlockTypes: ['runAStar'] },
};

/** Level 19 — Mixed algo + combat loop */
export const level19: BlockLevel = {
  id: 19, title: 'Hunt & Gather', theme: 'abyss', difficulty: 'hard',
  width: 13, height: 13,
  mission: 'Use BFS to reach gems and defeat enemies on the way.',
  description:
    '🔴 CONCEPT: Algorithm + Logic Combo\n\nCombine BFS pathfinding with if-attack logic: BFS finds the gem, but enemies block the way — use a condition to attack before advancing. This is how real game AI works!',
  start: { x: 1, y: 6 },
  gems: [
    { id: 1901, x: 7, y: 2, collected: false },
    { id: 1902, x: 11, y: 6, collected: false },
    { id: 1903, x: 7, y: 10, collected: false },
  ],
  enemies: [
    { id: 19001, x: 4, y: 4, type: 'robot', health: 1 },
    { id: 19002, x: 7, y: 6, type: 'guardian', health: 2 },
    { id: 19003, x: 4, y: 9, type: 'robot', health: 1 },
    { id: 19004, x: 9, y: 4, type: 'guardian', health: 2 },
    { id: 19005, x: 9, y: 9, type: 'guardian', health: 2 },
  ],
  obstacles: [
    { x: 3, y: 3 }, { x: 3, y: 9 }, { x: 5, y: 3 }, { x: 5, y: 9 },
    { x: 9, y: 3 }, { x: 9, y: 10 }, { x: 11, y: 3 }, { x: 11, y: 10 },
  ],
  algorithm: 'bfs',
  constraints: { maxBlocks: 8, requiredBlockTypes: ['runBFS', 'ifThen'] },
};

/** Level 20 — Multi-algo challenge */
export const level20: BlockLevel = {
  id: 20, title: 'Algorithm Arena', theme: 'abyss', difficulty: 'hard',
  width: 14, height: 13,
  mission: 'Chain BFS, DFS and A* to clear the arena.',
  description:
    '🔴 CONCEPT: Algorithm Selection\n\nDifferent problems call for different algorithms. BFS = shortest path. DFS = deep exploration. A* = fastest informed search. Chain them: BFS to gem 1, DFS to gem 2, A* to gem 3!',
  start: { x: 1, y: 6 },
  gems: [
    { id: 2001, x: 3, y: 2, collected: false },
    { id: 2002, x: 12, y: 6, collected: false },
    { id: 2003, x: 3, y: 10, collected: false },
  ],
  enemies: [
    { id: 20001, x: 5, y: 5, type: 'guardian', health: 2 },
    { id: 20002, x: 5, y: 7, type: 'guardian', health: 2 },
    { id: 20003, x: 8, y: 4, type: 'golem', health: 3 },
    { id: 20004, x: 8, y: 8, type: 'golem', health: 3 },
    { id: 20005, x: 10, y: 6, type: 'guardian', health: 2 },
  ],
  obstacles: [
    { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 8 }, { x: 4, y: 9 },
    { x: 6, y: 3 }, { x: 6, y: 9 }, { x: 9, y: 3 }, { x: 9, y: 9 },
    { x: 11, y: 4 }, { x: 11, y: 5 }, { x: 11, y: 7 }, { x: 11, y: 8 },
  ],
  algorithm: 'astar',
  constraints: { maxBlocks: 10, requiredBlockTypes: ['runBFS', 'runDFS', 'runAStar'] },
};

/** Level 21 — Final boss: everything combined */
export const level21: BlockLevel = {
  id: 21, title: 'Code Master', theme: 'abyss', difficulty: 'hard',
  width: 14, height: 14,
  mission: 'Defeat the Void Dragon and claim the final gem!',
  description:
    '🔴 CONCEPT: Full Synthesis\n\nThis level tests everything: loops, conditions, functions (SCAN), and algorithms. The Void Dragon has 10 HP — you need a REPEAT(10) { ATTACK } loop. Use A* to navigate to it first. You\'re now a Code Master!',
  start: { x: 1, y: 7 },
  enemies: [
    { id: 21001, x: 5, y: 4, type: 'guardian', health: 2 },
    { id: 21002, x: 5, y: 10, type: 'guardian', health: 2 },
    { id: 21003, x: 9, y: 4, type: 'golem', health: 3 },
    { id: 21004, x: 9, y: 10, type: 'golem', health: 3 },
    { id: 21005, x: 11, y: 7, type: 'dragon', health: 10, isBoss: true },
  ],
  gems: [{ id: 2101, x: 12, y: 7, collected: false }],
  obstacles: [
    { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 8 }, { x: 3, y: 9 },
    { x: 6, y: 3 }, { x: 7, y: 3 }, { x: 6, y: 11 }, { x: 7, y: 11 },
    { x: 4, y: 7 }, { x: 8, y: 3 }, { x: 8, y: 11 },
    { x: 10, y: 5 }, { x: 10, y: 6 }, { x: 10, y: 8 }, { x: 10, y: 9 },
  ],
  algorithm: 'astar',
  constraints: {
    maxBlocks: 16,
    requiredBlockTypes: ['repeat', 'ifThen', 'runAStar'],
  },
};
