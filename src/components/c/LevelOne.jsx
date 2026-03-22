"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L1_FOUNDATION, L1_TESTS } from './data/level1';

export default function CLevelOne({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="C LANGUAGE — FIRST CODE"
      foundationStages={L1_FOUNDATION}
      testStages={L1_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
