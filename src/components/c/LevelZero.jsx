"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L0_FOUNDATION, L0_TESTS } from './data/level0';

export default function CLevelZero({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="C_MEMORY_SYSTEMS_ARCADE"
      foundationStages={L0_FOUNDATION}
      testStages={L0_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
