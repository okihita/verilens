'use client';

import { useState } from 'react';
import Link from 'next/link';
import scenariosData from '../../lib/shared/scenarios.json';
import { addPlayerXP, unlockBadge } from '../../lib/gamification';

export default function CognitiveDuelPage() {
  const [p1Hp, setP1Hp] = useState(100);
  const [p2Hp, setP2Hp] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [roundFeedback, setRoundFeedback] = useState(null);

  const scenario = scenariosData.scenarios[currentIndex % scenariosData.scenarios.length];

  const handlePlayerChoice = (playerNumber, choiceId) => {
    if (winner) return;

    const isCorrect = choiceId === scenario.correct_fallacy_id;

    if (isCorrect) {
      if (playerNumber === 1) {
        const nextP2Hp = Math.max(0, p2Hp - 25);
        setP2Hp(nextP2Hp);
        setRoundFeedback(`⚡ Player 1 struck first! Correct: ${scenario.correct_fallacy_name}`);
        if (nextP2Hp === 0) {
          setWinner('Player 1 (Blue)');
          addPlayerXP(250);
          unlockBadge('first_shield');
        }
      } else {
        const nextP1Hp = Math.max(0, p1Hp - 25);
        setP1Hp(nextP1Hp);
        setRoundFeedback(`⚡ Player 2 struck first! Correct: ${scenario.correct_fallacy_name}`);
        if (nextP1Hp === 0) {
          setWinner('Player 2 (Red)');
          addPlayerXP(250);
          unlockBadge('first_shield');
        }
      }
      setTimeout(() => {
        setRoundFeedback(null);
        setCurrentIndex(prev => prev + 1);
      }, 1200);
    } else {
      // Recoil penalty for wrong guess
      if (playerNumber === 1) {
        const nextP1Hp = Math.max(0, p1Hp - 15);
        setP1Hp(nextP1Hp);
        setRoundFeedback('❌ Player 1 misfired! Recoil penalty (-15 HP)');
        if (nextP1Hp === 0) setWinner('Player 2 (Red)');
      } else {
        const nextP2Hp = Math.max(0, p2Hp - 15);
        setP2Hp(nextP2Hp);
        setRoundFeedback('❌ Player 2 misfired! Recoil penalty (-15 HP)');
        if (nextP2Hp === 0) setWinner('Player 1 (Blue)');
      }
    }
  };

  const restartDuel = () => {
    setP1Hp(100);
    setP2Hp(100);
    setCurrentIndex(0);
    setWinner(null);
    setRoundFeedback(null);
  };

  return (
    <div className="container" style={{ maxWidth: '1040px', padding: '36px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: '#F87171', textTransform: 'uppercase', marginBottom: '8px' }}>
          <span>⚔️ 2-Player Local Battle Arena</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#FFFFFF' }}>
          Cognitive 1v1 Duel
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Split keyboard or shared screen. First player to spot the correct fallacy deals 25 damage!
        </p>
      </div>

      {/* Health Bars HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
        {/* Player 1 Health */}
        <div className="card" style={{ padding: '14px 18px', borderLeft: '4px solid #3B82F6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <strong style={{ color: '#60A5FA', fontSize: '14px' }}>Player 1 (Blue)</strong>
            <span style={{ fontWeight: '900', color: '#FFFFFF' }}>{p1Hp} / 100 HP</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.4)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${p1Hp}%`, height: '100%', background: '#3B82F6', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '22px', fontWeight: '900', color: 'var(--accent-amber)' }}>
          VS
        </div>

        {/* Player 2 Health */}
        <div className="card" style={{ padding: '14px 18px', borderRight: '4px solid #EF4444', textAlign: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontWeight: '900', color: '#FFFFFF' }}>{p2Hp} / 100 HP</span>
            <strong style={{ color: '#F87171', fontSize: '14px' }}>Player 2 (Red)</strong>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.4)', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: `${p2Hp}%`, height: '100%', background: '#EF4444', transition: 'width 0.3s ease', marginLeft: 'auto' }}></div>
          </div>
        </div>
      </div>

      {/* Target Claim in Center */}
      <div className="card" style={{ textAlign: 'center', padding: '28px', marginBottom: '24px', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
          Target Headline #{currentIndex + 1}
        </span>
        <blockquote style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.4', margin: '10px 0' }}>
          {scenario.headline}
        </blockquote>

        {roundFeedback && (
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#FBBF24', marginTop: '8px', animation: 'fadeIn 0.2s ease' }}>
            {roundFeedback}
          </div>
        )}
      </div>

      {/* Winner Screen or Split Control Panels */}
      {winner ? (
        <div className="card" style={{ textAlign: 'center', padding: '36px', borderColor: 'var(--accent-amber)' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>👑</div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#FFFFFF', marginBottom: '8px' }}>
            {winner} Wins the Duel!
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Flawless rhetorical defense awarded +250 XP to the champion.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button onClick={restartDuel} className="btn btn-amber">
              🔄 Rematch
            </button>
            <Link href="/arena" className="btn btn-primary">
              🎮 Solo Arena
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Player 1 Choices */}
          <div className="card" style={{ borderColor: '#3B82F6' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#60A5FA', marginBottom: '12px' }}>
              👤 Player 1 Controls
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scenario.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handlePlayerChoice(1, opt.id)}
                  className="btn btn-outline"
                  style={{ padding: '12px', fontSize: '13px', justifyContent: 'flex-start', textAlign: 'left' }}
                >
                  ⚡ {opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* Player 2 Choices */}
          <div className="card" style={{ borderColor: '#EF4444' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#F87171', marginBottom: '12px', textAlign: 'right' }}>
              👤 Player 2 Controls
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scenario.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handlePlayerChoice(2, opt.id)}
                  className="btn btn-outline"
                  style={{ padding: '12px', fontSize: '13px', justifyContent: 'flex-end', textAlign: 'right' }}
                >
                  {opt.name} ⚡
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
