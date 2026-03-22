"use client";
import React from 'react';
import LevelTemplate from '@/components/games/LevelTemplate';
import { L7_FOUNDATION, L7_TESTS } from './data/level7';

export default function CppLevelSeven({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
        langLabel="C++ — ULTIMATE CLASH"
        foundationStages={L7_FOUNDATION}
        testStages={L7_TESTS}
        onComplete={onComplete}
        onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
