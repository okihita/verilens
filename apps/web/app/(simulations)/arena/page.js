'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { scenarios } from '@verilens/shared';
import { addPlayerXP, unlockBadge } from '../../../lib/gamification';
import { useTranslation } from '../../../lib/i18n';
import { playStart, playCorrect, playStreak, playIncorrect, playComplete, playClick } from '../../../lib/audio';
import CertificateModal from '../../../components/CertificateModal';

export default function ArenaPage() {
  const { t, lang, getLocalizedScenario } = useTranslation();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [showCertificate, setShowCertificate] = useState(false);

  useEffect(() => {
    if (scenarios && scenarios.length > 0) {
      const shuffled = [...scenarios].sort(() => 0.5 - Math.random()).slice(0, 5);
      setShuffledQuestions(shuffled);
    }
  }, []);

  const handleStartGame = () => {
    playStart();
    const shuffled = [...scenarios].sort(() => 0.5 - Math.random()).slice(0, 5);
    setShuffledQuestions(shuffled);
    setCurrentRound(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setGameFinished(false);
    setGameStarted(true);
  };

  const handleSelectOption = (optionId) => {
    if (showFeedback) return;

    setSelectedOption(optionId);
    setShowFeedback(true);

    const scenario = shuffledQuestions[currentRound];
    const isCorrect = optionId === scenario.correct_fallacy_id;

    if (isCorrect) {
      const newStreak = streak + 1;
      const roundScore = 100 + (newStreak * 25);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
      setScore((prev) => prev + roundScore);
      addPlayerXP(roundScore);

      if (newStreak >= 3) {
        playStreak(newStreak);
        unlockBadge('streak_master');
      } else {
        playCorrect();
      }
    } else {
      setStreak(0);
      playIncorrect();
    }
  };

  const handleNextRound = () => {
    if (currentRound + 1 < shuffledQuestions.length) {
      playClick();
      setCurrentRound((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      playComplete();
      setGameFinished(true);
      unlockBadge('first_shield');
    }
  };

  if (!gameStarted) {
    return (
      <div className="container" style={{ maxWidth: '800px', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '16px' }}>
          <span>{t('arena_badge')}</span>
        </div>

        <h1 style={{ fontSize: '38px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '14px' }}>
          {t('arena_title')}
        </h1>

        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
          {t('arena_desc')}
        </p>

        <div className="card" style={{ maxWidth: '520px', margin: '0 auto 32px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>{t('arena_rules_title')}</h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '14.5px', lineHeight: '1.8' }}>
            <li>{t('arena_rule_1')}</li>
            <li>{t('arena_rule_2')}</li>
            <li>{t('arena_rule_3')}</li>
          </ul>
        </div>

        <button onClick={handleStartGame} className="btn btn-amber" style={{ padding: '14px 36px', fontSize: '16px' }}>
          {t('arena_start_btn')}
        </button>
      </div>
    );
  }

  if (gameFinished) {
    const accuracy = Math.round((score / (shuffledQuestions.length * 150)) * 100);
    let rank = t('rank_master');
    let rankColor = '#10B981';

    if (accuracy < 50) {
      rank = t('rank_developing');
      rankColor = '#F59E0B';
    } else if (accuracy < 80) {
      rank = t('rank_proficient');
      rankColor = '#3B82F6';
    }

    return (
      <div className="container" style={{ maxWidth: '680px', padding: '60px 20px', textAlign: 'center' }}>
        <div className="card" style={{ padding: '40px 32px' }}>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-amber)', marginBottom: '8px' }}>{t('arena_finished_badge')}</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '6px' }}>{t('arena_finished_title')}</h2>
          <div style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {t('arena_finished_desc')}
          </div>

          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: '28px' }}>
            <div style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: '700', color: 'var(--text-muted)' }}>{t('arena_grade_label')}</div>
            <div style={{ fontSize: '26px', fontWeight: '900', color: rankColor, margin: '4px 0 12px' }}>{rank}</div>

            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>{score} {t('xp_label')}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('arena_score_label')}</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-amber)' }}>{maxStreak}x</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('arena_max_streak_label')}</div>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-emerald-light)' }}>{shuffledQuestions.length}/5</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('arena_completed_label')}</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowCertificate(true)} className="btn btn-amber" style={{ padding: '10px 20px', fontSize: '14px' }}>
              {t('arena_cert_btn')}
            </button>
            <button onClick={handleStartGame} className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
              {t('arena_replay_btn')}
            </button>
            <Link href="/sandbox" className="btn btn-outline" style={{ padding: '10px 20px', fontSize: '14px' }}>
              {t('arena_test_live_btn')}
            </Link>
          </div>
        </div>

        {showCertificate && (
          <CertificateModal
            score={score}
            accuracy={accuracy}
            mode={t('arena_title')}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </div>
    );
  }

  const rawScenario = shuffledQuestions[currentRound];
  const scenario = getLocalizedScenario(rawScenario);
  const isAnswered = showFeedback;
  const isCorrect = selectedOption === scenario.correct_fallacy_id;

  return (
    <div className="container" style={{ maxWidth: '820px', padding: '40px 20px' }}>
      {/* Top Header & Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-amber)' }}>
            {t('arena_round_label')} {currentRound + 1} {t('arena_of_label')} {shuffledQuestions.length}
          </span>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)' }}>{t('arena_round_title')}</h2>
        </div>

        <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', padding: '5px 14px', borderRadius: '20px', fontSize: '13.5px', fontWeight: '700', color: 'var(--accent-amber)' }}>
            {t('arena_streak')}: {streak}x
          </div>
          <div style={{ background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', padding: '5px 14px', borderRadius: '20px', fontSize: '13.5px', fontWeight: '700', color: 'var(--accent-emerald-light)' }}>
            {score} {t('xp_label')}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ width: '100%', height: '6px', background: 'var(--bg-surface-elevated)', borderRadius: '3px', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ width: `${((currentRound + 1) / shuffledQuestions.length) * 100}%`, height: '100%', background: 'var(--accent-amber)', transition: 'width 0.3s ease' }}></div>
      </div>

      {/* The Scenario Card */}
      <div className="card" style={{ marginBottom: '24px', borderLeft: '4px solid var(--accent-amber)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            {t('arena_medium')} {scenario.platform}
          </span>
        </div>

        <blockquote style={{ fontSize: '17.5px', fontWeight: '600', color: 'var(--text-main)', lineHeight: '1.5', margin: '8px 0 14px', fontStyle: 'italic' }}>
          {scenario.headline}
        </blockquote>

        <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
          <strong>{t('arena_context')}</strong> {scenario.context}
        </div>
      </div>

      {/* Multiple Choice Options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {(scenario.options || []).map((opt) => {
          let btnStyle = {
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--border-card)',
            background: 'var(--bg-surface)',
            color: 'var(--text-main)',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: isAnswered ? 'default' : 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease'
          };

          if (isAnswered) {
            if (opt.id === scenario.correct_fallacy_id) {
              btnStyle.background = 'rgba(16, 185, 129, 0.15)';
              btnStyle.borderColor = '#10B981';
              btnStyle.color = 'var(--accent-emerald-light)';
            } else if (opt.id === selectedOption) {
              btnStyle.background = 'rgba(239, 68, 68, 0.15)';
              btnStyle.borderColor = '#EF4444';
              btnStyle.color = '#EF4444';
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt.id)}
              style={btnStyle}
              disabled={isAnswered}
            >
              {opt.name}
            </button>
          );
        })}
      </div>

      {/* Pedagogical Feedback Section */}
      {showFeedback && (
        <div className="card" style={{ background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)', border: `1.5px solid ${isCorrect ? '#10B981' : '#EF4444'}`, marginBottom: '24px', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '13.5px', fontWeight: '900', color: isCorrect ? 'var(--accent-emerald-light)' : '#EF4444' }}>
              {isCorrect ? t('arena_correct_spot') : t('arena_manipulation_missed')}
            </span>
          </div>

          <h3 style={{ fontSize: '17px', fontWeight: '800', color: isCorrect ? 'var(--accent-emerald-light)' : '#EF4444', marginBottom: '6px' }}>
            {scenario.correct_fallacy_name}
          </h3>

          <p style={{ fontSize: '14.5px', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '14px' }}>
            {scenario.explanation}
          </p>

          <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: '18px' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '2px' }}>
              {t('arena_sift_label')}
            </div>
            <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
              {scenario.sift_recommendation}
            </div>
          </div>

          <button onClick={handleNextRound} className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14.5px' }}>
            {currentRound + 1 < shuffledQuestions.length ? `${t('arena_next_btn')} ➔` : `${t('arena_eval_btn')} ➔`}
          </button>
        </div>
      )}
    </div>
  );
}
