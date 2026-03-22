"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L5_FOUNDATION, L5_TESTS } from './data/level5';

export default function CLevelFive({ onComplete, onBack, onViewDoc }) {
  return (
    <LevelTemplate
      langLabel="C LANGUAGE — CORE PROBLEM SOLVING"
      foundationStages={L5_FOUNDATION}
      testStages={L5_TESTS}
      onComplete={onComplete}
      onBack={onBack} onViewDoc={onViewDoc}
    />
  );
}
