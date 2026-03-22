/**
 * Block Programming Editor
 * Combined Blocks + Code editor with tab switcher
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { BlockPalette } from './BlockPalette';
import { BlockWorkspace } from './BlockWorkspace';
import { BlockInstance, BLOCK_LIBRARY, BlockCategory } from './BlockTypes';
import {
  compileBlocks, flattenCompiledBlocks, validateBlocks,
  estimateExecutionTime, serializeBlocks, deserializeBlocks
} from './BlockCompiler';
import {
  sfxTabSwitch, sfxDropBlock, sfxDeleteBlock, sfxCodeType, sfxScriptStart,
  GameAudio
} from '@/lib/sounds';

interface BlockProgrammingEditorProps {
  onExecute: (commands: any[]) => void;
  isExecuting: boolean;
  onStop: () => void;
  levelId?: number;
  autoSave?: boolean;
  allowedCategories?: BlockCategory[];
  sidebarWidth?: number;
}

// ── Block → pseudocode generator ─────────────────────────────────
function blocksToCode(blocks: BlockInstance[]): string {
  const actionMap: Record<string, string> = {
    moveUp:        'hero.moveUp()',
    moveDown:      'hero.moveDown()',
    moveLeft:      'hero.moveLeft()',
    moveRight:     'hero.moveRight()',
    attack:        'hero.attack()',
    scan:          'hero.scan()',
    collectManual: 'hero.collect()',
    runBFS:        'hero.findPath("bfs")',
    runDFS:        'hero.findPath("dfs")',
    runAStar:      'hero.findPath("astar")',
  };

  function blockToLines(block: BlockInstance, indent = 0): string[] {
    const pad = '  '.repeat(indent);
    if (actionMap[block.blockType]) {
      return [`${pad}${actionMap[block.blockType]};`];
    }
    if (block.blockType === 'repeat') {
      const n = block.params['times'] ?? 2;
      const inner = (block.children || []).flatMap(c => blockToLines(c, indent + 1));
      return [`${pad}for (let i = 0; i < ${n}; i++) {`, ...inner, `${pad}}`];
    }
    if (block.blockType === 'ifThen') {
      const cond = block.params['condition'] ?? 'canMoveForward';
      const inner = (block.children || []).flatMap(c => blockToLines(c, indent + 1));
      return [`${pad}if (hero.sense("${cond}")) {`, ...inner, `${pad}}`];
    }
    if (block.blockType === 'wait') {
      return [`${pad}hero.wait(${block.params['seconds'] ?? 1});`];
    }
    return [`${pad}// ${block.blockType}`];
  }

  if (blocks.length === 0) {
    return [
      '// ─────────────────────────────',
      '// Block Adventure Code Editor',
      '// ─────────────────────────────',
      '//',
      '// Commands you can use:',
      '//   hero.moveRight()  hero.moveLeft()',
      '//   hero.moveUp()     hero.moveDown()',
      '//   hero.attack()     hero.collect()',
      '//   hero.scan()',
      '//',
      '// Example:',
      'hero.moveRight();',
      'hero.moveRight();',
      'hero.collect();',
    ].join('\n');
  }

  const lines = [
    '// ─────────────────────────────────',
    `// Level code — ${blocks.length} block(s)`,
    '// ─────────────────────────────────',
    '',
  ];
  blocks.forEach(b => lines.push(...blockToLines(b, 0)));
  return lines.join('\n');
}

// ── Parse raw code text → flat commands ──────────────────────────
function parseCodeToCommands(code: string): any[] {
  const commands: any[] = [];
  const commandMap: Record<string, string> = {
    'hero.moveright':    'RIGHT',
    'hero.moveleft':     'LEFT',
    'hero.moveup':       'UP',
    'hero.movedown':     'DOWN',
    'hero.attack':       'ATTACK',
    'hero.scan':         'SCAN',
    'hero.collect':      'COLLECT',
  };

  // Simple line-by-line parse — handle for loops
  const lines = code.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//'));
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].toLowerCase().replace(/\s/g, '');

    // for loop: for(let i=0;i<N;i++){
    const forMatch = line.match(/^for\(.*i<(\d+).*\)\{?$/);
    if (forMatch) {
      const count = parseInt(forMatch[1]);
      i++;
      const innerCmds: any[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('}')) {
        const inner = lines[i].toLowerCase().replace(/\s/g, '');
        const cmd = Object.entries(commandMap).find(([k]) => inner.startsWith(k));
        if (cmd) innerCmds.push(cmd[1]);
        i++;
      }
      for (let x = 0; x < count; x++) commands.push(...innerCmds);
      i++;
      continue;
    }

    // Simple command
    const cmd = Object.entries(commandMap).find(([k]) => line.startsWith(k));
    if (cmd) commands.push(cmd[1]);

    // algo shorthand
    if (line.includes('findpath("bfs")'))   commands.push({ type: 'algorithm', algorithm: 'bfs',   target: 'nearestGem' });
    if (line.includes('findpath("dfs")'))   commands.push({ type: 'algorithm', algorithm: 'dfs',   target: 'nearestGem' });
    if (line.includes('findpath("astar")')) commands.push({ type: 'algorithm', algorithm: 'astar', target: 'nearestGem' });

    i++;
  }
  return commands;
}

// ── Syntax highlighter (simple regex based) ──────────────────────
function highlight(code: string): string {
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // comments
    .replace(/(\/\/[^\n]*)/g, '<span style="color:#6a9955">$1</span>')
    // keywords
    .replace(/\b(for|let|if|else|const|return|while)\b/g, '<span style="color:#c586c0">$1</span>')
    // hero object
    .replace(/\bhero\b/g, '<span style="color:#9cdcfe">hero</span>')
    // methods
    .replace(/\.(moveRight|moveLeft|moveUp|moveDown|attack|scan|collect|findPath|wait|sense)\b/g,
      '.<span style="color:#dcdcaa">$1</span>')
    // strings
    .replace(/"([^"]*)"/g, '<span style="color:#ce9178">"$1"</span>')
    // numbers
    .replace(/\b(\d+)\b/g, '<span style="color:#b5cea8">$1</span>')
    // semicolons & braces
    .replace(/([{};])/g, '<span style="color:#888">$1</span>');
}

export function BlockProgrammingEditor({
  onExecute,
  isExecuting,
  onStop,
  levelId,
  autoSave = true,
  allowedCategories,
  sidebarWidth = 520
}: BlockProgrammingEditorProps) {
  const [blocks, setBlocks] = useState<BlockInstance[]>([]);
  const [activeTab, setActiveTab] = useState<'blocks' | 'code'>('blocks');
  const [codeText, setCodeText] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [history, setHistory] = useState<BlockInstance[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const storageKey = `blockProgram_${levelId || 'default'}`;

  const generateBlockId = useCallback(() =>
    `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const loaded = deserializeBlocks(saved);
          setBlocks(loaded);
          setHistory([loaded]);
          setHistoryIndex(0);
          setCodeText(blocksToCode(loaded));
        }
      } catch (e) { console.error('Failed to load blocks:', e); }
    }
  }, [storageKey]);

  // Sync code view when switching to code tab
  useEffect(() => {
    if (activeTab === 'code' && blocks.length > 0) {
      setCodeText(blocksToCode(blocks));
    }
  }, [activeTab]);

  // Auto-save
  useEffect(() => {
    if (!autoSave || typeof window === 'undefined') return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, serializeBlocks(blocks));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch (e) { console.error('Failed to save blocks:', e); }
    }, 1000);
    return () => clearTimeout(timer);
  }, [blocks, storageKey, autoSave]);

  // History helpers
  const addToHistory = useCallback((newBlocks: BlockInstance[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setBlocks(newBlocks);
  }, [history, historyIndex]);

  const handleAddBlock = useCallback((blockType: string) => {
    const newBlock: BlockInstance = {
      id: generateBlockId(), blockType, params: {}, children: [], parentId: null, x: 0, y: 0
    };
    const definition = BLOCK_LIBRARY[blockType];
    if (definition?.params) {
      definition.params.forEach(param => { newBlock.params[param.name] = param.default; });
    }
    addToHistory([...blocks, newBlock]);
    sfxDropBlock();
  }, [blocks, generateBlockId, addToHistory]);

  // Execute — blocks mode
  const handleExecuteBlocks = useCallback(() => {
    const issues = validateBlocks(blocks);
    if (issues.filter(i => i.severity === 'error').length > 0) { setShowValidation(true); return; }
    onExecute(flattenCompiledBlocks(compileBlocks(blocks)));
  }, [blocks, onExecute]);

  // Execute — code mode
  const handleExecuteCode = useCallback(() => {
    const commands = parseCodeToCommands(codeText);
    if (commands.length === 0) return;
    onExecute(commands);
  }, [codeText, onExecute]);

  const handleExecute = activeTab === 'code' ? handleExecuteCode : handleExecuteBlocks;
  const canRun = activeTab === 'code' ? codeText.trim().length > 0 : blocks.length > 0;

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setBlocks(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleClear = useCallback(() => {
    if (activeTab === 'code') { setCodeText(''); sfxDeleteBlock(); return; }
    if (blocks.length === 0) return;
    if (window.confirm('Wipe system core? All unsaved modules will be lost.')) {
      addToHistory([]);
      setCodeText('');
      sfxDeleteBlock();
      onStop();
    }
  }, [blocks.length, addToHistory, onStop, activeTab]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); handleUndo(); }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) { e.preventDefault(); handleRedo(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const handleBlocksChange = useCallback((newBlocks: BlockInstance[]) => {
    setBlocks(newBlocks);
    addToHistory(newBlocks);
    GameAudio.setMusicState('coding');
  }, [addToHistory]);

  const validationIssues = validateBlocks(blocks);
  const executionTimeEstimate = estimateExecutionTime(blocks);
  const errorCount = validationIssues.filter(i => i.severity === 'error').length;
  const warningCount = validationIssues.filter(i => i.severity === 'warning').length;

  // Line numbers for code editor
  const codeLines = codeText.split('\n').length;

  return (
    <div style={{
      display: 'flex', height: '100%', background: 'transparent',
      color: '#e0e0e0', flexDirection: 'column', fontFamily: "'Outfit', sans-serif"
    }}>
      {/* ── TOOLBAR ──────────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(4, 4, 8, 0.6)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '8px 14px',
        display: 'flex', gap: '8px', alignItems: 'center',
        flexShrink: 0, zIndex: 100
      }}>
        {/* Tab switcher */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.04)',
          borderRadius: '8px', padding: '3px', gap: '3px', flexShrink: 0
        }}>
          {(['blocks', 'code'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { sfxTabSwitch(); setActiveTab(tab); }}
              style={{
                padding: '4px 12px', border: 'none', borderRadius: '6px',
                fontSize: '9px', fontWeight: 900, letterSpacing: '1.5px',
                cursor: 'pointer', transition: 'all 0.2s',
                fontFamily: "'Outfit', sans-serif",
                background: activeTab === tab ? (tab === 'code' ? '#667eea' : '#a78bfa') : 'transparent',
                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.35)',
              }}
            >
              {tab === 'blocks' ? '🧩 BLOCKS' : '💻 CODE'}
            </button>
          ))}
        </div>

        {/* Undo / Redo — only for block mode */}
        {activeTab === 'blocks' && (
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={handleUndo} disabled={historyIndex <= 0} className="tool-btn" title="Undo (Ctrl+Z)" id="btn-editor-undo">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 7v6h6" /><path d="M3 13C5 8 9.5 5 15 5a9 9 0 0 1 0 18" />
              </svg>
            </button>
            <button onClick={handleRedo} disabled={historyIndex >= history.length - 1} className="tool-btn" title="Redo (Ctrl+Y)" id="btn-editor-redo">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 7v6h-6" /><path d="M21 13C19 8 14.5 5 9 5a9 9 0 0 0 0 18" />
              </svg>
            </button>
          </div>
        )}

        <div style={{ flex: 1 }} />

        {/* Save status */}
        {saveStatus === 'saved' && (
          <div style={{ fontSize: '9px', color: '#4ade80', fontWeight: 900, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '4px', opacity: 0.7 }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80' }} />SAVED
          </div>
        )}

        {/* Clear */}
        <button onClick={handleClear} disabled={activeTab === 'blocks' && blocks.length === 0} className="tool-btn danger" id="btn-editor-clear">
          CLEAR
        </button>

        {/* RUN / STOP */}
        <button
          onClick={isExecuting ? onStop : handleExecute}
          disabled={!isExecuting && !canRun}
          id="btn-run-script"
          className={`run-btn ${isExecuting ? 'stop' : 'run'}`}
        >
          {isExecuting ? (
            <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>STOP</>
          ) : (
            <><svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>RUN</>
          )}
        </button>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

        {/* ── BLOCKS TAB ── */}
        {activeTab === 'blocks' && (
          <>
            <BlockPalette
              onBlockAdd={handleAddBlock}
              allowedCategories={allowedCategories}
              width={Math.max(160, Math.round(sidebarWidth * 0.36))}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
              <BlockWorkspace
                blocks={blocks}
                onBlocksChange={handleBlocksChange}
                onExecute={isExecuting ? onStop : handleExecuteBlocks}
                isExecuting={isExecuting}
              />
              {showValidation && validationIssues.length > 0 && (
                <div style={{
                  background: 'rgba(239,68,68,0.08)', borderTop: '1px solid rgba(239,68,68,0.25)',
                  padding: '10px 16px', maxHeight: '110px', overflowY: 'auto',
                  fontSize: '11px', flexShrink: 0
                }}>
                  <div style={{ marginBottom: '6px', fontWeight: 900, color: '#ef4444', fontSize: '9px', letterSpacing: '1px' }}>
                    ⚠ {errorCount} ERRORS · {warningCount} WARNINGS
                  </div>
                  {validationIssues.map((issue, i) => (
                    <div key={i} style={{ marginBottom: '4px', color: issue.severity === 'error' ? '#f87171' : '#fbbf24', fontSize: '11px' }}>
                      [{issue.severity.toUpperCase()}] {issue.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── CODE TAB ── */}
        {activeTab === 'code' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#1e1e2e' }}>
            {/* Code editor header */}
            <div style={{
              background: '#2a2a3e', borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0
            }}>
              <span style={{ fontSize: '9px', color: '#667eea', fontWeight: 900, letterSpacing: '2px' }}>
                💻 JAVASCRIPT
              </span>
              <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
                hero.js
              </span>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => setCodeText(blocksToCode(blocks))}
                style={{
                  background: 'rgba(102,126,234,0.12)', border: '1px solid rgba(102,126,234,0.3)',
                  color: '#a78bfa', padding: '3px 10px', borderRadius: '6px',
                  fontSize: '8px', fontWeight: 900, letterSpacing: '1px', cursor: 'pointer',
                  fontFamily: "'Outfit', sans-serif"
                }}
                title="Convert current blocks to code"
              >
                ← FROM BLOCKS
              </button>
            </div>

            {/* Editor body */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', display: 'flex' }}>
              {/* Line numbers */}
              <div style={{
                background: '#1e1e2e', padding: '14px 10px 14px 16px',
                borderRight: '1px solid rgba(255,255,255,0.05)',
                fontFamily: "'Fira Code', 'Courier New', monospace",
                fontSize: '12px', lineHeight: '1.7',
                color: 'rgba(255,255,255,0.18)',
                userSelect: 'none', flexShrink: 0,
                textAlign: 'right', minWidth: '42px',
                overflowY: 'hidden'
              }}>
                {Array.from({ length: codeLines }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={codeText}
                onChange={e => { setCodeText(e.target.value); sfxCodeType(); GameAudio.setMusicState('coding'); }}
                spellCheck={false}
                style={{
                  flex: 1, padding: '14px 16px',
                  background: 'transparent',
                  color: '#d4d4d4',
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                  fontSize: '12px', lineHeight: '1.7',
                  border: 'none', outline: 'none', resize: 'none',
                  caretColor: '#667eea',
                }}
                placeholder={`// Type your hero commands here\nhero.moveRight();\nhero.moveRight();\nhero.collect();`}
                onKeyDown={e => {
                  // Tab → 2 spaces
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = e.currentTarget.selectionStart;
                    const end = e.currentTarget.selectionEnd;
                    const newText = codeText.substring(0, start) + '  ' + codeText.substring(end);
                    setCodeText(newText);
                    requestAnimationFrame(() => {
                      if (textareaRef.current) {
                        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
                      }
                    });
                  }
                }}
              />
            </div>

            {/* Code quick-reference */}
            <div style={{
              background: '#16162a', borderTop: '1px solid rgba(255,255,255,0.05)',
              padding: '8px 16px', flexShrink: 0,
              display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center'
            }}>
              <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.2)', fontWeight: 900, letterSpacing: '1px', marginRight: '4px' }}>
                QUICK:
              </span>
              {[
                ['hero.moveRight()', '#9cdcfe'],
                ['hero.moveLeft()', '#9cdcfe'],
                ['hero.moveUp()', '#9cdcfe'],
                ['hero.moveDown()', '#9cdcfe'],
                ['hero.attack()', '#f87171'],
                ['hero.collect()', '#fbbf24'],
                ['hero.scan()', '#4ade80'],
              ].map(([cmd, col]) => (
                <button
                  key={cmd}
                  onClick={() => {
                    const ta = textareaRef.current;
                    if (!ta) { setCodeText(t => t + '\n' + cmd + ';'); return; }
                    const start = ta.selectionStart;
                    const newText = codeText.substring(0, start) + cmd + ';\n' + codeText.substring(start);
                    setCodeText(newText);
                    requestAnimationFrame(() => { if (ta) ta.selectionStart = ta.selectionEnd = start + cmd.length + 2; });
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: `1px solid ${col}30`,
                    color: col, padding: '2px 8px', borderRadius: '5px',
                    fontSize: '9px', fontFamily: "'Fira Code', monospace", cursor: 'pointer',
                  }}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── STATS FOOTER ─────────────────────────────────────────── */}
      <div style={{
        background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.04)',
        padding: '6px 18px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', fontSize: '9px', color: 'rgba(255,255,255,0.25)',
        fontWeight: 800, letterSpacing: '1px', flexShrink: 0, fontFamily: 'monospace'
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ opacity: 0.5 }}>ACTIVE_MODULES:</span>
            <span style={{ color: '#a78bfa', fontWeight: 900 }}>{blocks.length.toString().padStart(2, '0')}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ opacity: 0.5 }}>COMPUTE_TIME:</span>
            <span style={{ color: '#a78bfa', fontWeight: 900 }}>{executionTimeEstimate.toFixed(1)}s</span>
          </div>
          {activeTab === 'code' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ opacity: 0.5 }}>LINES:</span>
              <span style={{ color: '#667eea', fontWeight: 900 }}>{codeLines}</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
          AUTOSAVE_ACTIVE
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');

        .tool-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.5);
          padding: 5px 10px; border-radius: 7px;
          font-size: 9px; font-weight: 900; letter-spacing: 1px;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; gap: 5px;
          font-family: 'Outfit', sans-serif;
        }
        .tool-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.07); color: #fff;
          border-color: rgba(255,255,255,0.15);
        }
        .tool-btn:disabled { opacity: 0.18; cursor: not-allowed; }
        .tool-btn.danger { border-color: rgba(239,68,68,0.2); color: rgba(239,68,68,0.6); }
        .tool-btn.danger:hover:not(:disabled) {
          background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.5); color: #ef4444;
        }

        .run-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 6px 16px; border-radius: 9px;
          font-size: 10px; font-weight: 900; letter-spacing: 1.5px;
          cursor: pointer; border: none;
          transition: all 0.25s cubic-bezier(0.175,0.885,0.32,1.275);
          font-family: 'Outfit', sans-serif;
        }
        .run-btn.run {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: #fff; box-shadow: 0 4px 16px rgba(34,197,94,0.35);
        }
        .run-btn.run:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 8px 22px rgba(34,197,94,0.5); filter: brightness(1.1);
        }
        .run-btn.stop {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: #fff; box-shadow: 0 4px 16px rgba(239,68,68,0.35);
          animation: runPulse 1.5s ease-in-out infinite;
        }
        .run-btn:disabled {
          opacity: 0.25; cursor: not-allowed;
          background: rgba(255,255,255,0.05); box-shadow: none; transform: none !important;
        }
        @keyframes runPulse {
          0%, 100% { box-shadow: 0 4px 16px rgba(239,68,68,0.35); }
          50%       { box-shadow: 0 4px 26px rgba(239,68,68,0.65); }
        }
      `}} />
    </div>
  );
}
