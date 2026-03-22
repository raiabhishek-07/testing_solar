"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L3_FOUNDATION, L3_TESTS } from './data/level3';

export default function CppLevelThree({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="C++ — LOOPS & ARRAYS"
      foundationStages={L3_FOUNDATION}
      testStages={L3_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
