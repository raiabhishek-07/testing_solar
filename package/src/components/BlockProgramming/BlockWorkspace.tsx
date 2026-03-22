/**
 * Block Workspace Component
 * Main area where blocks are assembled and edited
 */

import React, { useState } from 'react';
import { BlockInstance, BlockDefinition, BLOCK_LIBRARY, BlockCategory } from './BlockTypes';
import { Block, BlockPlaceholder } from './Block';
import { sfxDragBlock, sfxDropBlock, sfxDeleteBlock } from '@/lib/sounds';

interface BlockWorkspaceProps {
  blocks: BlockInstance[];
  onBlocksChange: (blocks: BlockInstance[]) => void;
  onExecute: () => void;
  isExecuting: boolean;
}

export function BlockWorkspace({
  blocks,
  onBlocksChange,
  onExecute,
  isExecuting
}: BlockWorkspaceProps) {
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const generateBlockId = () => {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    setDraggedBlockId(blockId);
    e.dataTransfer.effectAllowed = 'move';
    sfxDragBlock();
  };

  const handleDragOver = (e: React.DragEvent, blockId?: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (blockId) setDropTargetId(blockId);
  };

  const handleDragLeave = () => {
    setDropTargetId(null);
  };

  const handleDrop = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    setDropTargetId(null);

    const blockType = e.dataTransfer.getData('blockType');

    if (blockType) {
      const definition = BLOCK_LIBRARY[blockType];
      if (!definition) return;

      const newBlock: BlockInstance = {
        id: generateBlockId(),
        blockType,
        params: {},
        children: [],
        parentId: null,
        x: 0,
        y: 0
      };

      if (definition.params) {
        definition.params.forEach(p => newBlock.params[p.name] = p.default);
      }

      const currentBlocks = JSON.parse(JSON.stringify(blocks));
      if (targetIndex !== undefined) {
        currentBlocks.splice(targetIndex, 0, newBlock);
      } else {
        currentBlocks.push(newBlock);
      }
      onBlocksChange(currentBlocks);
      sfxDropBlock();
      return;
    }

    if (!draggedBlockId) return;

    const currentBlocks = JSON.parse(JSON.stringify(blocks));

    const removeFromTree = (tree: BlockInstance[]): BlockInstance | null => {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].id === draggedBlockId) {
          return tree.splice(i, 1)[0];
        }
        const found = removeFromTree(tree[i].children);
        if (found) return found;
      }
      return null;
    };

    const draggedBlock = removeFromTree(currentBlocks);

    if (draggedBlock) {
      if (targetIndex !== undefined) {
        currentBlocks.splice(targetIndex, 0, draggedBlock);
      } else {
        currentBlocks.push(draggedBlock);
      }
      onBlocksChange(currentBlocks);
      sfxDropBlock();
    }

    setDraggedBlockId(null);
  };

  const handleRemoveBlock = (blockId: string) => {
    const removeRecursive = (arr: BlockInstance[]): BlockInstance[] => {
      return arr
        .filter((b) => b.id !== blockId)
        .map((b) => ({
          ...b,
          children: removeRecursive(b.children)
        }));
    };
    onBlocksChange(removeRecursive(blocks));
    sfxDeleteBlock();
  };

  const handleParamChange = (blockId: string, paramName: string, value: string | number) => {
    const updateRecursive = (arr: BlockInstance[]): BlockInstance[] => {
      return arr.map((b) => {
        if (b.id === blockId) {
          return { ...b, params: { ...b.params, [paramName]: value } };
        }
        return { ...b, children: updateRecursive(b.children) };
      });
    };
    onBlocksChange(updateRecursive(blocks));
  };

  const renderBlock = (block: BlockInstance, index: number) => {
    const definition = BLOCK_LIBRARY[block.blockType];
    if (!definition) return null;

    return (
      <div
        key={block.id}
        onDragOver={(e) => handleDragOver(e, block.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
        style={{ position: 'relative', padding: '2px 0' }}
      >
        {/* Drop indicator */}
        {dropTargetId === block.id && (
          <div style={{
            position: 'absolute', top: '-3px', left: '16px', right: '16px', height: '3px',
            background: 'linear-gradient(90deg, transparent, #f1c40f, transparent)',
            borderRadius: '2px',
            boxShadow: '0 0 10px #f1c40f',
            zIndex: 10
          }} />
        )}
        <Block
          block={block}
          definition={definition}
          onDragStart={handleDragStart}
          onRemove={handleRemoveBlock}
          onParamChange={handleParamChange}
          isDragging={draggedBlockId === block.id}
          isDropTarget={dropTargetId === block.id}
        />
      </div>
    );
  };

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'transparent',
      position: 'relative',
      backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
      backgroundSize: '36px 36px',
      overflow: 'hidden',
      minHeight: 0
    }}>
      {/* Workspace status bar */}
      <div style={{
        background: 'rgba(0,0,0,0.2)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '8px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexShrink: 0,
        zIndex: 2
      }}>
        <div style={{
          fontSize: '9px', color: 'rgba(255,255,255,0.25)',
          fontWeight: 900, letterSpacing: '1.5px', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: blocks.length > 0 ? '#a78bfa' : 'rgba(255,255,255,0.1)',
            boxShadow: blocks.length > 0 ? '0 0 6px #a78bfa' : 'none'
          }} />
          SCRIPT WORKSPACE
        </div>

        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', fontWeight: 900, letterSpacing: '1px' }}>
          {blocks.length} MODULE{blocks.length !== 1 ? 'S' : ''} LOADED
        </div>
      </div>

      {/* Script area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: blocks.length === 0 ? '0' : '20px 20px 80px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          minHeight: 0
        }}
      >
        {blocks.length === 0 ? (
          /* ── EMPTY STATE ─────────────────────────────────────────── */
          <div
            onDragOver={(e) => handleDragOver(e, 'workspace_root')}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px',
              border: dropTargetId === 'workspace_root'
                ? '2px dashed rgba(241,196,15,0.6)'
                : '2px dashed rgba(255,255,255,0.05)',
              borderRadius: '20px',
              margin: '20px',
              transition: 'all 0.2s',
              background: dropTargetId === 'workspace_root'
                ? 'rgba(241,196,15,0.04)'
                : 'transparent',
              gap: '16px'
            }}
          >
            {/* Animated icon */}
            <div style={{
              fontSize: '40px',
              animation: 'floatIcon 3s ease-in-out infinite',
              filter: 'drop-shadow(0 0 12px rgba(167,139,250,0.4))'
            }}>
              🧩
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '12px', fontWeight: 900, letterSpacing: '2px',
                color: 'rgba(255,255,255,0.35)', marginBottom: '6px', textTransform: 'uppercase'
              }}>
                Script Core Empty
              </div>
              <div style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.15)',
                fontWeight: 600,
                lineHeight: 1.6
              }}>
                Click or drag modules from<br />the left panel to get started
              </div>
            </div>

            {/* Animated arrows pointing left */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', opacity: 0.3 }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    fontSize: '12px',
                    animation: `arrowPulse 1.5s ease-in-out ${i * 0.2}s infinite`
                  }}
                >
                  ◀
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {blocks.map((block, index) => renderBlock(block, index))}

            {/* End-of-script drop zone */}
            <div
              onDragOver={(e) => handleDragOver(e, 'end_zone')}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e)}
              style={{
                height: '80px',
                width: '100%',
                border: dropTargetId === 'end_zone'
                  ? '2px dashed rgba(241,196,15,0.6)'
                  : '2px dashed transparent',
                borderRadius: '12px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f1c40f',
                fontSize: '10px',
                fontWeight: 900,
                opacity: dropTargetId === 'end_zone' ? 1 : 0,
                transition: 'all 0.2s',
                letterSpacing: '1px',
                background: dropTargetId === 'end_zone' ? 'rgba(241,196,15,0.04)' : 'transparent'
              }}
            >
              ➕ APPEND MODULE HERE
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes arrowPulse {
          0%, 100% { transform: translateX(0); opacity: 0.3; }
          50%       { transform: translateX(-4px); opacity: 0.7; }
        }
      `}} />
    </div>
  );
}
