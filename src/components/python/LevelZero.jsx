"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L0_FOUNDATION, L0_TESTS } from './data/level0';

export default function PythonLevelZero({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="PYTHON_SYSTEMS_ARCADE"
      foundationStages={L0_FOUNDATION}
      testStages={L0_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
