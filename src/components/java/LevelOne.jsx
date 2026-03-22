"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L1_FOUNDATION, L1_TESTS } from './data/level1';

export default function JavaLevelOne({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="JAVA — FIRST CODE"
      foundationStages={L1_FOUNDATION}
      testStages={L1_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
