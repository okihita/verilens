'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addPlayerXP, unlockBadge } from '../../../lib/gamification';
import { scanText, calculateSensationalismIndex } from '@verilens/shared';

const FORGE_CHALLENGES = [
  {
    id: 'f1',
    neutralFact: 'The municipal transit authority voted to adjust off-peak bus frequencies by 5 minutes starting next month.',
    targetFallacy: 'Appeal to Fear (Catastrophizing)',
    targetFallacyId: 'ad_metum',
    targetKeywords: ['catastrophe', 'chaos', 'ruin', 'disaster', 'nightmare', 'destroy', 'annihilation', 'collapse'],
    hint: 'Use apocalyptic doom words to make a minor schedule change sound like the collapse of society.'
  },
  {
    id: 'f2',
    neutralFact: 'A university physics lab published preliminary findings on lithium-ion battery cathode degradation.',
    targetFallacy: 'Conspiracy Framing (Suppression Myth)',
    targetFallacyId: 'urgency_scarcity',
    targetKeywords: ['censored', 'mainstream media', 'hiding', 'secret', 'cover-up', 'refuses to report', 'truth about'],
    hint: 'Claim that mainstream media is deliberately hiding this secret battery cure from the public.'
  },
  {
    id: 'f3',
    neutralFact: 'A regional economic report noted modest 1.2% seasonal changes in consumer retail sales.',
    targetFallacy: 'Artificial Urgency & Scam Lure',
    targetFallacyId: 'scam_urgency',
    targetKeywords: ['act now', 'urgent', 'guaranteed', 'loophole', 'free money', 'limited time', 'claim your'],
    hint: 'Frame this normal financial report as an urgent loophole offering guaranteed instant profits.'
  }
];

export default function FallacyForgePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSubmission, setUserSubmission] = useState('');
  const [evalResult, setEvalResult] = useState(null);
  const [totalForged, setTotalForged] = useState(0);

  const challenge = FORGE_CHALLENGES[currentIndex];

  const handleEvaluate = () => {
    if (!userSubmission.trim()) return;

    const matches = scanText(userSubmission);
    const score = calculateSensationalismIndex(userSubmission, matches);
    
    // Check if target keywords or heuristic triggers are present
    const hasTargetTriggers = challenge.targetKeywords.some(kw => 
      userSubmission.toLowerCase().includes(kw.toLowerCase())
    ) || matches.some(m => m.id === challenge.targetFallacyId);

    const isSuccess = hasTargetTriggers || score >= 40;

    if (isSuccess) {
      addPlayerXP(150);
      setTotalForged(prev => prev + 1);
      unlockBadge('first_shield');
    }

    setEvalResult({
      isSuccess,
      score,
      matches,
      feedback: isSuccess 
        ? `🔥 Deconstruction Success! You weaponized '${challenge.targetFallacy}' and generated a Sensationalism Index of ${score}/100.` 
        : `⚠️ Not quite sharp enough. Try incorporating stronger emotional panic keywords from the hint!`
    });
  };

  const nextChallenge = () => {
    setUserSubmission('');
    setEvalResult(null);
    setCurrentIndex((prev) => (prev + 1) % FORGE_CHALLENGES.length);
  };

  return (
    <div className="container" style={{ maxWidth: '840px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>🧪 Reverse Disinformation Laboratory</span>
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#FFFFFF', marginBottom: '8px' }}>
          The Fallacy Forge
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '640px', margin: '0 auto' }}>
          To defeat manipulation, you must understand how it is constructed. Take an innocent neutral fact and spin it into a weaponized viral headline!
        </p>
      </div>

      {/* The Challenge Card */}
      <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--accent-amber)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Mission {currentIndex + 1} of {FORGE_CHALLENGES.length}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--accent-emerald-light)', fontWeight: '700' }}>
            Forged: {totalForged} Headlines
          </span>
        </div>

        <div style={{ marginBottom: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-blue-light)', textTransform: 'uppercase' }}>📰 Neutral Raw Fact:</span>
          <div style={{ fontSize: '16px', color: '#FFFFFF', fontStyle: 'italic', background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', marginTop: '4px' }}>
            "{challenge.neutralFact}"
          </div>
        </div>

        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#F87171', textTransform: 'uppercase' }}>🎯 Target Weaponized Fallacy to Forge:</span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>
            {challenge.targetFallacy}
          </h2>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            <strong>💡 Hint:</strong> {challenge.hint}
          </p>
        </div>
      </div>

      {/* Input Text Area */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Your Crafted Headline / Post:
        </label>
        <textarea
          rows={3}
          value={userSubmission}
          onChange={(e) => setUserSubmission(e.target.value)}
          placeholder={`Craft your spun headline here (e.g. "SHOCKING SECRET: Mainstream media is hiding the total collapse...")`}
          style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '14px', lineHeight: '1.5', outline: 'none', resize: 'vertical' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {userSubmission.trim().split(/\s+/).filter(Boolean).length} words
          </span>
          <button
            onClick={handleEvaluate}
            className="btn btn-amber"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            🔥 Evaluate Spin Weaponization
          </button>
        </div>
      </div>

      {/* Evaluation Results */}
      {evalResult && (
        <div className="card" style={{ background: evalResult.isSuccess ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', borderColor: evalResult.isSuccess ? '#10B981' : '#EF4444', marginBottom: '24px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>{evalResult.isSuccess ? '🏆' : '⚠️'}</span>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: evalResult.isSuccess ? '#34D399' : '#F87171' }}>
              {evalResult.feedback}
            </h3>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '13px' }}>
            <div><strong>Generated Sensationalism Heat:</strong> <span style={{ color: '#FBBF24' }}>{evalResult.score}/100</span></div>
            <div><strong>Heuristic Triggers Flagged:</strong> <span style={{ color: '#60A5FA' }}>{evalResult.matches.length}</span></div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
            {evalResult.isSuccess && (
              <button onClick={nextChallenge} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
                Next Fact to Forge ➔
              </button>
            )}
            <Link href="/arena" className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12.5px' }}>
              Back to Arena Mode
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
