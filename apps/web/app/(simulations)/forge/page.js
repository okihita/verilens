'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addPlayerXP, unlockBadge } from '../../../lib/gamification';
import { scanText, calculateSensationalismIndex } from '@verilens/shared';

const FORGE_CHALLENGES = [
  {
    id: 'f1',
    neutralFact: 'The city council voted 5-4 to approve a $2 million bike lane expansion over the next 3 years.',
    targetFallacy: 'Appeal to Fear / Catastrophizing',
    hint: 'Use words like "total bankruptcy", "irreversible economic doom", or "catastrophe" to terrify residents.',
    targetKeywords: ['catastrophe', 'doom', 'destroy', 'bankrupt', 'ruin', 'disaster', 'collapse']
  },
  {
    id: 'f2',
    neutralFact: 'A study of 1,200 participants found that drinking green tea was associated with a modest 4% reduction in LDL cholesterol.',
    targetFallacy: 'Weasel Words & Fake Authority',
    hint: 'Use vague phrases like "leading doctors all agree", "miracle secret", or "eliminate 100% of toxins".',
    targetKeywords: ['leading', 'experts', 'secret', 'miracle', '100%', 'cure', 'scientists']
  },
  {
    id: 'f3',
    neutralFact: 'Professor Chen published an academic paper analyzing trade tariff impacts on agricultural exports.',
    targetFallacy: 'Ad Hominem Smear',
    hint: 'Do not talk about trade or agriculture—attack Professor Chen’s salary, personal life, or background.',
    targetKeywords: ['corrupt', 'paid', 'shill', 'hypocrite', 'discredited', 'fraud']
  }
];

export default function ForgePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSubmission, setUserSubmission] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [totalForged, setTotalForged] = useState(0);

  const challenge = FORGE_CHALLENGES[currentIndex];

  const handleTestForge = () => {
    if (!userSubmission.trim()) return;

    const lower = userSubmission.toLowerCase();
    const matchedKeywords = challenge.targetKeywords.filter((kw) => lower.includes(kw));
    const heuristicMatches = scanText(userSubmission);
    const sensationalism = calculateSensationalismIndex(userSubmission, heuristicMatches);

    const isSuccess = matchedKeywords.length >= 1 || sensationalism >= 40;

    setEvaluation({
      isSuccess,
      sensationalism,
      matchedKeywords,
      feedback: isSuccess
        ? `Brilliant manipulation craft! Your headline achieved a Sensationalism Index of ${sensationalism}/100 and successfully weaponized the "${challenge.targetFallacy}". (+150 XP)`
        : `Too neutral or missing the target psychological weapon. Try using more emotionally charged keywords to trigger the ${challenge.targetFallacy}.`
    });

    if (isSuccess) {
      addPlayerXP(150);
      unlockBadge('first_shield');
      setTotalForged((prev) => prev + 1);
    }
  };

  const handleNextChallenge = () => {
    setUserSubmission('');
    setEvaluation(null);
    setCurrentIndex((prev) => (prev + 1) % FORGE_CHALLENGES.length);
  };

  return (
    <div className="container" style={{ maxWidth: '840px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>Reverse Disinformation Laboratory</span>
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
          The Fallacy Forge
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
          To defeat manipulation, you must understand how it is constructed. Take an innocent neutral fact and spin it into a weaponized viral headline!
        </p>
      </div>

      {/* The Challenge Card */}
      <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--accent-amber)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Mission {currentIndex + 1} of {FORGE_CHALLENGES.length}
          </span>
          <span style={{ fontSize: '12px', color: 'var(--accent-emerald-light)', fontWeight: '700' }}>
            Forged: {totalForged} Headlines
          </span>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-blue-light)', textTransform: 'uppercase' }}>Neutral Raw Fact:</span>
          <div style={{ fontSize: '16px', color: 'var(--text-main)', fontStyle: 'italic', background: 'var(--bg-surface-elevated)', padding: '10px 14px', borderRadius: '6px', marginTop: '4px' }}>
            "{challenge.neutralFact}"
          </div>
        </div>

        <div>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#F87171', textTransform: 'uppercase' }}>Target Weaponized Fallacy to Forge:</span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
            {challenge.targetFallacy}
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <strong>Hint:</strong> {challenge.hint}
          </p>
        </div>
      </div>

      {/* Input Text Area */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Your Crafted Headline / Post:
        </label>
        <textarea
          rows={3}
          value={userSubmission}
          onChange={(e) => setUserSubmission(e.target.value)}
          placeholder={`Craft your spun headline here (e.g. "SHOCKING SECRET: Mainstream media is hiding the total collapse...")`}
          style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '14.5px', lineHeight: '1.5', outline: 'none', resize: 'vertical' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <button onClick={handleTestForge} className="btn btn-amber" style={{ padding: '10px 22px' }}>
            Test Manipulation Power
          </button>
          {evaluation?.isSuccess && (
            <button onClick={handleNextChallenge} className="btn btn-primary" style={{ padding: '10px 22px' }}>
              Next Mission ➔
            </button>
          )}
        </div>
      </div>

      {/* Evaluation Results */}
      {evaluation && (
        <div className="card" style={{ background: evaluation.isSuccess ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1.5px solid ${evaluation.isSuccess ? '#10B981' : '#EF4444'}`, animation: 'fadeIn 0.3s ease' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: evaluation.isSuccess ? 'var(--accent-emerald-light)' : '#EF4444', marginBottom: '6px' }}>
            {evaluation.isSuccess ? 'Disinformation Craft Successful' : 'Needs More Weaponized Spin'}
          </h3>
          <p style={{ fontSize: '14.5px', color: 'var(--text-main)', lineHeight: '1.5' }}>
            {evaluation.feedback}
          </p>
        </div>
      )}
    </div>
  );
}
