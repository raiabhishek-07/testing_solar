"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
        const target = e.target;
        if (
          target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.closest('button') || 
          target.closest('a') ||
          target.getAttribute('role') === 'button'
        ) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'auto';
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] custom-cursor-element text-brand-neon">
      {/* Container for the cursor */}
      <motion.div
        className="absolute custom-cursor-element"
        style={{
          x: springX,
          y: springY,
          top: 0,
          left: 0,
        }}
      >
        {isHovered ? (
          /* Pixel Hand Cursor (SVG) */
          <motion.svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            initial={{ scale: 1 }}
            animate={{ 
                scale: isClicking ? 0.9 : 1.1,
                rotate: isClicking ? -5 : 0
            }}
            className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
          >
            {/* Outline */}
            <path d="M10 2H14V6H16V2H20V14H22V10H26V22H24V24H22V26H12V24H10V22H8V14H6V10H10V2Z" fill="black"/>
            {/* Main Hand Body */}
            <path d="M11 3H13V7H15V15H17V3H19V15H21V11H25V21H23V23H21V25H13V23H11V21H9V15H7V11H11V3Z" fill="white"/>
            {/* Shading/Depth Bits */}
            <rect x="13" y="21" width="2" height="2" fill="#E0E0E0"/>
            <rect x="15" y="21" width="2" height="2" fill="#E0E0E0"/>
            <rect x="17" y="21" width="2" height="2" fill="#E0E0E0"/>
          </motion.svg>
        ) : (
          /* Pixel Arrow Cursor (SVG) */
          <motion.svg 
            width="32" 
            height="32" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]"
            animate={{ 
                scale: isClicking ? 0.9 : 1,
            }}
          >
            {/* Outline */}
            <path d="M2 2V22L8 16L12 24L16 22L12 14L20 14L2 2Z" fill="black" stroke="black" strokeWidth="2" strokeLinejoin="round"/>
            {/* Main Arrow Body */}
            <path d="M4 5V18L8.5 13.5L12.5 21L14.5 20L10.5 12.5L16 12.5L4 5Z" fill="white"/>
          </motion.svg>
        )}
      </motion.div>
    </div>
  );
}
