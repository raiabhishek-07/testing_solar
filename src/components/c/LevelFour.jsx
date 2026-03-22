"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L4_FOUNDATION, L4_TESTS } from './data/level4';

export default function CLevelFour({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="C LANGUAGE — STRINGS & FUNCTIONS"
      foundationStages={L4_FOUNDATION}
      testStages={L4_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
