'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { addPlayerXP, unlockBadge } from '../../lib/gamification';
import CertificateModal from '../../components/CertificateModal';

const GAUNTLET_ITEMS = [
  {
    id: 'g1',
    text: '“URGENT SECURITY ALERT: Your MetaMask wallet has been compromised. Verify seed phrase now to save assets.”',
    correctType: 'SCAM',
    explanation: 'Classic phishing social engineering using artificial panic to steal private keys.'
  },
  {
    id: 'g2',
    text: '“Either you support our controversial data retention bill, or you want criminals to freely enter our borders!”',
    correctType: 'FALLACY',
    explanation: 'False dilemma: erases nuanced compromise options into an absurd binary ultimatum.'
  },
  {
    id: 'g3',
    text: '“The World Health Organization reported a 12% global decrease in malaria transmission following vector control initiatives.”',
    correctType: 'FACTUAL',
    explanation: 'Neutral, sober reporting with specific primary institutional attribution and empirical percentages.'
  },
  {
    id: 'g4',
    text: '“Don’t listen to Professor Davis’s economic whitepaper—he drives an expensive European car and is clearly corrupt!”',
    correctType: 'FALLACY',
    explanation: 'Ad Hominem: attacks the author’s personal lifestyle rather than the empirical data in the paper.'
  },
  {
    id: 'g5',
    text: '“Claim your guaranteed $2,500 government grant voucher immediately before the window closes forever!”',
    correctType: 'SCAM',
    explanation: 'Financial scam lure with fake artificial deadlines and guaranteed free money.'
  },
  {
    id: 'g6',
    text: '“Global renewable energy investments reached $1.8 trillion in fiscal year 2025, according to the International Energy Agency.”',
    correctType: 'FACTUAL',
    explanation: 'Factual statistical wire reporting citing a primary international agency (IEA).'
  },
  {
    id: 'g7',
    text: '“Mainstream media is deliberately hiding this miracle herb that cures 100% of illnesses. Share before it is deleted!”',
    correctType: 'FALLACY',
    explanation: 'Conspiracy framing & censorship paranoia used to force emotional viral sharing.'
  },
  {
    id: 'g8',
    text: '“Football superstar with 500M followers swears by this magnetic chakra ring to cleanse metabolic toxins.”',
    correctType: 'FALLACY',
    explanation: 'Halo Effect: transfers celebrity athletic fame to unverified biomedical claims.'
  },
  {
    id: 'g9',
    text: '“Congratulations! Your phone number was selected in the $1,000,000 Apple International Lottery. Click link to claim.”',
    correctType: 'SCAM',
    explanation: 'Lottery fee scam lure requiring upfront advance payments or credentials.'
  },
  {
    id: 'g10',
    text: '“Associated Press verified satellite imagery showing seasonal water level fluctuations across Lake Superior basins.”',
    correctType: 'FACTUAL',
    explanation: 'Empirical geographic reporting from a primary international news cooperative (AP).'
  }
];

export default function GauntletPage() {
  const [gameState, setGameState] = useState('IDLE'); // 'IDLE', 'PLAYING', 'FINISHED'
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [history, setHistory] = useState([]);
  const [feedbackFlash, setFeedbackFlash] = useState(null); // 'CORRECT', 'WRONG'
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    let timer;
    if (gameState === 'PLAYING' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    setTimeLeft(60);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setMultiplier(1);
    setHistory([]);
    setFeedbackFlash(null);
    setShowCertificate(false);
    setGameState('PLAYING');
  };

  const endGame = () => {
    setGameState('FINISHED');
  };

  const handleAnswer = (choice) => {
    if (gameState !== 'PLAYING') return;

    const currentItem = GAUNTLET_ITEMS[currentIndex % GAUNTLET_ITEMS.length];
    const isCorrect = choice === currentItem.correctType;

    if (isCorrect) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const newMultiplier = newStreak >= 6 ? 4 : newStreak >= 4 ? 3 : newStreak >= 2 ? 2 : 1;
      setMultiplier(newMultiplier);
      const points = 50 * newMultiplier;
      setScore((prev) => prev + points);
      setFeedbackFlash('CORRECT');

      if (newStreak >= 5) {
        unlockBadge('streak_five');
      }
    } else {
      setStreak(0);
      setMultiplier(1);
      setFeedbackFlash('WRONG');
    }

    setHistory((prev) => [...prev, { item: currentItem, choice, isCorrect }]);

    setTimeout(() => {
      setFeedbackFlash(null);
      setCurrentIndex((prev) => prev + 1);
    }, 250);
  };

  useEffect(() => {
    if (gameState === 'FINISHED') {
      const totalAnswers = history.length;
      const correctAnswers = history.filter((h) => h.isCorrect).length;
      const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) : 0;

      addPlayerXP(score);
      unlockBadge('first_shield');

      if (accuracy >= 0.8 && totalAnswers >= 5) {
        unlockBadge('speed_sifter');
      }
    }
  }, [gameState]);

  const currentItem = GAUNTLET_ITEMS[currentIndex % GAUNTLET_ITEMS.length];

  if (gameState === 'IDLE') {
    return (
      <div className="container" style={{ maxWidth: '780px', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(220, 38, 38, 0.15)', border: '1px solid rgba(220, 38, 38, 0.4)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: '#F87171', textTransform: 'uppercase', marginBottom: '16px' }}>
          <span>⚔️ 60-Second Timed Survival Mode</span>
        </div>

        <h1 style={{ fontSize: '38px', fontWeight: '900', color: '#FFFFFF', marginBottom: '14px' }}>
          The Daily Bias Gauntlet
        </h1>

        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
          Test your cognitive reflexes! You have <strong>60 seconds</strong> to triage breaking headlines into <strong>Fallacy</strong>, <strong>Factual</strong>, or <strong>Scam</strong>. Build combos for massive XP!
        </p>

        <div className="card" style={{ maxWidth: '480px', margin: '0 auto 32px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF', marginBottom: '10px' }}>🎯 Gauntlet Rules:</h3>
          <ul style={{ paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '13.5px', lineHeight: '1.8' }}>
            <li><strong>60s Speed Run:</strong> Answer as many claims as you can.</li>
            <li><strong>Combos:</strong> 2x, 3x, and 4x multiplier on consecutive streaks!</li>
            <li><strong>Certification:</strong> Earn high scores to unlock your UNESCO Certificate.</li>
          </ul>
        </div>

        <button onClick={startGame} className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '17px', background: '#DC2626', borderColor: '#EF4444' }}>
          ⚔️ Start 60s Challenge
        </button>
      </div>
    );
  }

  if (gameState === 'FINISHED') {
    const total = history.length;
    const correct = history.filter((h) => h.isCorrect).length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return (
      <div className="container" style={{ maxWidth: '720px', padding: '50px 20px', textAlign: 'center' }}>
        <div className="card" style={{ padding: '36px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>⏱️</div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#FFFFFF', marginBottom: '6px' }}>Gauntlet Time Up!</h2>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            60-Second Cognitive Reflex Performance
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '26px', fontWeight: '900', color: '#FFFFFF' }}>{score}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>XP Earned</div>
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: '900', color: accuracy >= 80 ? '#10B981' : '#F59E0B' }}>{accuracy}%</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Accuracy ({correct}/{total})</div>
              </div>
              <div>
                <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--accent-amber)' }}>{total}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Claims Sorted</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button onClick={() => setShowCertificate(true)} className="btn btn-amber" style={{ padding: '10px 20px' }}>
              📜 Claim UNESCO Certificate
            </button>
            <button onClick={startGame} className="btn btn-primary" style={{ padding: '10px 20px' }}>
              🔄 Replay Gauntlet
            </button>
            <Link href="/profile" className="btn btn-outline" style={{ padding: '10px 20px' }}>
              🏆 View Trophy Room
            </Link>
          </div>
        </div>

        {showCertificate && (
          <CertificateModal
            score={score}
            accuracy={accuracy}
            mode="Daily Bias Gauntlet"
            onClose={() => setShowCertificate(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '780px', padding: '40px 20px' }}>
      {/* Top Header & HUD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: timeLeft <= 10 ? '#EF4444' : 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', padding: '6px 14px', borderRadius: '20px', fontSize: '15px', fontWeight: '900', color: '#FFFFFF', transition: 'background 0.3s ease' }}>
            ⏱️ {timeLeft}s
          </div>
          {multiplier > 1 && (
            <div style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid var(--accent-amber)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '900', color: 'var(--accent-amber)' }}>
              🔥 {multiplier}x COMBO
            </div>
          )}
        </div>

        <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--accent-emerald-light)' }}>
          ⭐ {score} XP
        </div>
      </div>

      {/* Target Claim Card */}
      <div
        className="card"
        style={{
          minHeight: '180px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          marginBottom: '24px',
          borderWidth: '2px',
          borderColor: feedbackFlash === 'CORRECT' ? '#10B981' : feedbackFlash === 'WRONG' ? '#EF4444' : 'var(--border-card)',
          transition: 'border-color 0.15s ease, background-color 0.15s ease',
          background: feedbackFlash === 'CORRECT' ? 'rgba(16, 185, 129, 0.1)' : feedbackFlash === 'WRONG' ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-surface)'
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
          Claim #{currentIndex + 1}
        </span>
        <blockquote style={{ fontSize: '19px', fontWeight: '700', color: '#FFFFFF', lineHeight: '1.45', margin: '0 auto', maxWidth: '620px' }}>
          {currentItem.text}
        </blockquote>
      </div>

      {/* 3-Way Triage Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
        <button
          onClick={() => handleAnswer('FALLACY')}
          className="btn"
          style={{ padding: '18px', background: '#D97706', borderColor: '#F59E0B', color: '#FFFFFF', fontSize: '15px', fontWeight: '900' }}
        >
          🚩 FALLACY / BIAS
        </button>

        <button
          onClick={() => handleAnswer('FACTUAL')}
          className="btn btn-primary"
          style={{ padding: '18px', background: '#059669', borderColor: '#10B981', color: '#FFFFFF', fontSize: '15px', fontWeight: '900' }}
        >
          📰 FACTUAL REPORT
        </button>

        <button
          onClick={() => handleAnswer('SCAM')}
          className="btn"
          style={{ padding: '18px', background: '#DC2626', borderColor: '#EF4444', color: '#FFFFFF', fontSize: '15px', fontWeight: '900' }}
        >
          ⚠️ SCAM / PHISHING
        </button>
      </div>
    </div>
  );
}
