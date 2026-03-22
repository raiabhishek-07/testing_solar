"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L6_FOUNDATION, L6_TESTS } from './data/level6';

export default function CppLevelSix({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="C++ — PROJECT & BEST PRACTICES"
      foundationStages={L6_FOUNDATION}
      testStages={L6_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
