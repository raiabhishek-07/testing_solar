/**
 * Block Palette Component
 * Shows all available blocks organized by category with a premium game UI
 */

import React, { useState } from 'react';
import { BLOCK_CATEGORIES, BLOCK_LIBRARY, BlockCategory } from './BlockTypes';

interface BlockPaletteProps {
  onBlockAdd: (blockType: string) => void;
  allowedCategories?: BlockCategory[];
  width?: number;
}

export function BlockPalette({ onBlockAdd, allowedCategories, width = 300 }: BlockPaletteProps) {
  const [activeCategory, setActiveCategory] = useState<BlockCategory>('movement');
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  const categories = (Object.entries(BLOCK_CATEGORIES) as Array<[BlockCategory, typeof BLOCK_CATEGORIES[BlockCategory]]>)
    .filter(([key]) => !allowedCategories || allowedCategories.includes(key));

  React.useEffect(() => {
    if (allowedCategories && !allowedCategories.includes(activeCategory) && categories.length > 0) {
      setActiveCategory(categories[0][0]);
    }
  }, [allowedCategories, activeCategory, categories]);

  const getBlockCount = (categoryKey: BlockCategory) =>
    Object.values(BLOCK_LIBRARY).filter(b => b.category === categoryKey).length;

  const activeCategoryBlocks = Object.values(BLOCK_LIBRARY).filter(b => b.category === activeCategory);
  const categoryInfo = BLOCK_CATEGORIES[activeCategory];

  // Tab strip width
  const TAB_WIDTH = 58;
  const listWidth = width - TAB_WIDTH;

  return (
    <div style={{
      width: `${width}px`,
      minWidth: `${width}px`,
      background: 'rgba(4, 4, 10, 0.5)',
      borderRight: '1px solid rgba(255,255,255,0.04)',
      display: 'flex',
      height: '100%',
      overflow: 'hidden',
      flexShrink: 0
    }}>
      {/* ── LEFT TAB STRIP ─────────────────────────────────────────── */}
      <div style={{
        width: `${TAB_WIDTH}px`,
        minWidth: `${TAB_WIDTH}px`,
        background: 'rgba(0,0,0,0.25)',
        borderRight: '1px solid rgba(255,255,255,0.03)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '16px',
        paddingBottom: '16px',
        gap: '4px',
        overflowY: 'auto'
      }}>
        {categories.map(([categoryKey, catInfo]) => {
          const isActive = activeCategory === categoryKey;
          const count = getBlockCount(categoryKey);
          return (
            <button
              key={categoryKey}
              onClick={() => setActiveCategory(categoryKey)}
              title={catInfo.label}
              style={{
                position: 'relative',
                width: '42px',
                padding: '10px 4px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '10px',
                background: isActive
                  ? `${catInfo.color}18`
                  : 'transparent',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                outline: 'none',
              }}
            >
              {/* Active indicator bar on left */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: 0, top: '25%', bottom: '25%',
                  width: '3px',
                  borderRadius: '0 3px 3px 0',
                  background: catInfo.color,
                  boxShadow: `0 0 8px ${catInfo.color}`,
                }} />
              )}

              {/* Icon container */}
              <div style={{
                width: '30px', height: '30px', borderRadius: '9px',
                background: isActive ? catInfo.color : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '15px',
                boxShadow: isActive ? `0 0 16px ${catInfo.color}66` : 'none',
                border: isActive ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.04)',
                transition: 'all 0.2s',
              }}>
                {catInfo.icon}
              </div>

              {/* Block count badge */}
              <div style={{
                fontSize: '8px',
                fontWeight: 900,
                color: isActive ? catInfo.color : 'rgba(255,255,255,0.2)',
                letterSpacing: '0.5px',
                transition: 'color 0.2s',
                lineHeight: 1,
              }}>
                {count}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── BLOCK LIST ─────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minWidth: 0
      }}>
        {/* Category header */}
        <div style={{
          padding: '14px 14px 10px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <div style={{
              width: '4px', height: '14px', borderRadius: '2px',
              background: categoryInfo.color,
              boxShadow: `0 0 8px ${categoryInfo.color}`
            }} />
            <div>
              <div style={{
                fontSize: '10px', fontWeight: 900, letterSpacing: '2px',
                color: categoryInfo.color, textTransform: 'uppercase'
              }}>
                {categoryInfo.label}
              </div>
              <div style={{
                fontSize: '8px', color: 'rgba(255,255,255,0.25)',
                fontWeight: 600, letterSpacing: '0.5px', marginTop: '1px'
              }}>
                {activeCategoryBlocks.length} modules available
              </div>
            </div>
          </div>
        </div>

        {/* Block items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}>
          {activeCategoryBlocks.map(block => {
            const isHovered = hoveredBlock === block.id;
            return (
              <div
                key={block.id}
                onClick={() => onBlockAdd(block.id)}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('blockType', block.id);
                  e.dataTransfer.effectAllowed = 'copy';
                }}
                onMouseEnter={() => setHoveredBlock(block.id)}
                onMouseLeave={() => setHoveredBlock(null)}
                style={{
                  background: isHovered
                    ? `${block.color}14`
                    : 'rgba(255,255,255,0.02)',
                  borderTop: `1px solid ${isHovered ? block.color + '44' : 'rgba(255,255,255,0.05)'}`,
                  borderRight: `1px solid ${isHovered ? block.color + '44' : 'rgba(255,255,255,0.05)'}`,
                  borderBottom: `1px solid ${isHovered ? block.color + '44' : 'rgba(255,255,255,0.05)'}`,
                  borderLeft: `3px solid ${block.color}`,
                  color: '#fff',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '11px',
                  transition: 'all 0.18s cubic-bezier(0.4,0,0.2,1)',
                  transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                  boxShadow: isHovered ? `0 4px 14px rgba(0,0,0,0.3), 0 0 0 1px ${block.color}22` : 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  userSelect: 'none',
                }}
              >
                {/* Subtle shimmer on hover */}
                {isHovered && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(100deg, transparent 30%, ${block.color}08 50%, transparent 70%)`,
                    pointerEvents: 'none'
                  }} />
                )}

                <span style={{ fontSize: '15px', flexShrink: 0 }}>{block.icon}</span>
                <span style={{
                  flex: 1,
                  letterSpacing: '0.3px',
                  color: isHovered ? '#fff' : 'rgba(255,255,255,0.8)',
                  transition: 'color 0.15s',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  {block.label}
                </span>
                {/* + badge on hover */}
                <span style={{
                  fontSize: '13px',
                  color: block.color,
                  opacity: isHovered ? 1 : 0,
                  transition: 'opacity 0.15s',
                  fontWeight: 900,
                  flexShrink: 0
                }}>
                  +
                </span>
              </div>
            );
          })}
        </div>

        {/* Palette footer hint */}
        <div style={{
          padding: '8px 12px',
          borderTop: '1px solid rgba(255,255,255,0.03)',
          fontSize: '8px',
          color: 'rgba(255,255,255,0.15)',
          fontWeight: 700,
          letterSpacing: '0.5px',
          flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          <span>CLICK OR DRAG</span>
          <span style={{ opacity: 0.5 }}>to add modules</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .palette-scroll::-webkit-scrollbar { width: 4px; }
        .palette-scroll::-webkit-scrollbar-track { background: transparent; }
        .palette-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
        }
      `}} />
    </div>
  );
}
