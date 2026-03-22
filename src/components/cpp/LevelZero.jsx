"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L0_FOUNDATION, L0_TESTS } from './data/level0';

export default function CppLevelZero({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="CPP_OBJECT_MODEL_ARCADE"
      foundationStages={L0_FOUNDATION}
      testStages={L0_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
