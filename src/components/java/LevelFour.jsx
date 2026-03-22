"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L4_FOUNDATION, L4_TESTS } from './data/level4';

export default function JavaLevelFour({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="JAVA — STRINGS & FUNCTIONS"
      foundationStages={L4_FOUNDATION}
      testStages={L4_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
