'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { scenarios } from '@verilens/shared';
import { addPlayerXP, unlockBadge } from '../../../lib/gamification';
import { useTranslation } from '../../../lib/i18n';
import { playStart, playCorrect, playIncorrect, playComplete } from '../../../lib/audio';

export default function DuelPage() {
  const { t, lang, getLocalizedScenario } = useTranslation();
  const [deck, setDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [p1Hp, setP1Hp] = useState(100);
  const [p2Hp, setP2Hp] = useState(100);
  const [winner, setWinner] = useState(null);
  const [roundFeedback, setRoundFeedback] = useState(null);

  useEffect(() => {
    if (scenarios && scenarios.length > 0) {
      setDeck([...scenarios].sort(() => 0.5 - Math.random()));
    }
  }, []);

  const handlePlayerAnswer = (player, selectedOptionId) => {
    if (winner || roundFeedback) return;

    const rawScenario = deck[currentIndex % deck.length];
    const currentScenario = getLocalizedScenario(rawScenario);
    const isCorrect = selectedOptionId === currentScenario.correct_fallacy_id;

    if (isCorrect) {
      if (player === 1) {
        const nextHp = Math.max(0, p2Hp - 25);
        setP2Hp(nextHp);
        setRoundFeedback(`Player 1 struck Player 2! (${currentScenario.correct_fallacy_name})`);
        if (nextHp === 0) {
          playComplete();
          setWinner('Player 1');
          addPlayerXP(250);
          unlockBadge('first_shield');
        } else {
          playCorrect();
        }
      } else {
        const nextHp = Math.max(0, p1Hp - 25);
        setP1Hp(nextHp);
        setRoundFeedback(`Player 2 struck Player 1! (${currentScenario.correct_fallacy_name})`);
        if (nextHp === 0) {
          playComplete();
          setWinner('Player 2');
          addPlayerXP(250);
          unlockBadge('first_shield');
        } else {
          playCorrect();
        }
      }
    } else {
      setRoundFeedback(`Wrong guess by Player ${player}!`);
      playIncorrect();
    }

    setTimeout(() => {
      setRoundFeedback(null);
      setCurrentIndex((prev) => prev + 1);
    }, 1200);
  };

  const restartDuel = () => {
    playStart();
    setP1Hp(100);
    setP2Hp(100);
    setWinner(null);
    setCurrentIndex(0);
    setRoundFeedback(null);
    setDeck([...scenarios].sort(() => 0.5 - Math.random()));
  };

  if (deck.length === 0) {
    return <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>Loading duel arena...</div>;
  }

  const rawScenario = deck[currentIndex % deck.length];
  const scenario = getLocalizedScenario(rawScenario);

  return (
    <div className="container" style={{ maxWidth: '1040px', padding: '30px 16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: '#F87171', textTransform: 'uppercase', marginBottom: '6px' }}>
          <span>2-Player Local Battle Arena</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '900', color: 'var(--text-main)' }}>
          Cognitive 1v1 Duel
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          Split keyboard or shared phone. First player to spot the correct fallacy deals 25 damage!
        </p>
      </div>

      {/* Health Bars HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
        {/* Player 1 Health */}
        <div className="card" style={{ padding: '12px 14px', borderLeft: '4px solid #3B82F6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <strong style={{ color: '#60A5FA', fontSize: '14px' }}>Player 1 (Blue)</strong>
            <span style={{ fontWeight: '900', color: 'var(--text-main)', fontSize: '14px' }}>{p1Hp} / 100 HP</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${p1Hp}%`, height: '100%', background: '#3B82F6', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>

        {/* Player 2 Health */}
        <div className="card" style={{ padding: '12px 14px', borderRight: '4px solid #EF4444', textAlign: 'right' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontWeight: '900', color: 'var(--text-main)', fontSize: '14px' }}>{p2Hp} / 100 HP</span>
            <strong style={{ color: '#F87171', fontSize: '14px' }}>Player 2 (Red)</strong>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${p2Hp}%`, height: '100%', background: '#EF4444', transition: 'width 0.3s ease', marginLeft: 'auto' }}></div>
          </div>
        </div>
      </div>

      {/* Target Claim in Center */}
      <div className="card" style={{ textAlign: 'center', padding: '20px', marginBottom: '20px', background: 'var(--bg-surface)' }}>
        <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
          Target Headline #{currentIndex + 1}
        </span>
        <blockquote style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: '800', color: 'var(--text-main)', lineHeight: '1.4', margin: '8px 0' }}>
          {scenario.headline}
        </blockquote>

        {roundFeedback && (
          <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent-amber)', marginTop: '6px', animation: 'fadeIn 0.2s ease' }}>
            {roundFeedback}
          </div>
        )}
      </div>

      {/* Winner Screen or Split Control Panels */}
      {winner ? (
        <div className="card" style={{ textAlign: 'center', padding: '28px', borderColor: 'var(--accent-amber)' }}>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-amber)', marginBottom: '8px' }}>VICTORY</div>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 26px)', fontWeight: '900', color: 'var(--text-main)', marginBottom: '6px' }}>
            {winner} Wins the Duel!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '18px' }}>
            Flawless rhetorical defense awarded +250 XP to the champion.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button onClick={restartDuel} className="btn btn-amber" style={{ padding: '9px 18px', fontSize: '14px' }}>
              Rematch
            </button>
            <Link href="/arena" className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '14px' }}>
              Solo Arena
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {/* Player 1 Choices */}
          <div className="card" style={{ borderColor: '#3B82F6' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#60A5FA', marginBottom: '10px' }}>
              PLAYER 1 (LEFT / A-D)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scenario.options.map((opt, i) => (
                <button
                  key={`p1-${opt.id}`}
                  onClick={() => handlePlayerAnswer(1, opt.id)}
                  className="btn btn-outline"
                  style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13.5px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}
                >
                  <span>{opt.name}</span>
                  <span style={{ color: 'var(--accent-blue)', fontWeight: '800' }}>[{['Q', 'W', 'E', 'R'][i]}]</span>
                </button>
              ))}
            </div>
          </div>

          {/* Player 2 Choices */}
          <div className="card" style={{ borderColor: '#EF4444' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#F87171', marginBottom: '10px' }}>
              PLAYER 2 (RIGHT / U-P)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {scenario.options.map((opt, i) => (
                <button
                  key={`p2-${opt.id}`}
                  onClick={() => handlePlayerAnswer(2, opt.id)}
                  className="btn btn-outline"
                  style={{ textAlign: 'left', padding: '10px 12px', fontSize: '13.5px', display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)' }}
                >
                  <span>{opt.name}</span>
                  <span style={{ color: '#EF4444', fontWeight: '800' }}>[{['U', 'I', 'O', 'P'][i]}]</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
