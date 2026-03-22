"use client";
import LevelTemplate from '@/components/games/LevelTemplate';
import { L2_FOUNDATION, L2_TESTS } from './data/level2';
export default function CLevelTwo({ onComplete, onBack, onViewDoc }) {
  return <LevelTemplate langLabel="C LANGUAGE — DECISIONS" foundationStages={L2_FOUNDATION} testStages={L2_TESTS} onComplete={onComplete} onBack={onBack} onViewDoc={onViewDoc} />;
}
