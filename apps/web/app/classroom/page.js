'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import scenariosData from '../../lib/shared/scenarios.json';
import { speakText } from '../../lib/speech';
import { useTranslation } from '../../lib/i18n';

export default function ClassroomPage() {
  const { lang } = useTranslation();
  const [deck, setDeck] = useState(scenariosData.scenarios);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [teamAlphaScore, setTeamAlphaScore] = useState(0);
  const [teamBetaScore, setTeamBetaScore] = useState(0);
  const [debateTimer, setDebateTimer] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (timerRunning && debateTimer > 0) {
      interval = setInterval(() => {
        setDebateTimer((prev) => prev - 1);
      }, 1000);
    } else if (debateTimer === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, debateTimer]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsAnswerRevealed((prev) => !prev);
      } else if (e.code === 'ArrowRight') {
        nextQuestion();
      } else if (e.key === 'a' || e.key === 'A') {
        setTeamAlphaScore((prev) => prev + 100);
      } else if (e.key === 'b' || e.key === 'B') {
        setTeamBetaScore((prev) => prev + 100);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const currentScenario = deck[currentIndex];

  const nextQuestion = () => {
    setIsAnswerRevealed(false);
    setDebateTimer(30);
    setTimerRunning(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const prevQuestion = () => {
    setIsAnswerRevealed(false);
    setDebateTimer(30);
    setTimerRunning(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleSpeak = () => {
    speakText(currentScenario.headline, lang);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 70px)', background: '#050811', padding: '30px 20px', color: '#FFFFFF' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Top Presenter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ padding: '4px 10px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--accent-amber)', borderRadius: '6px', fontSize: '11px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
              SMARTBOARD SHOWDOWN
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Scenario {currentIndex + 1} of {deck.length}
            </span>
          </div>

          {/* Classroom Scoreboard */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1.5px solid #EF4444', padding: '6px 14px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#F87171', textTransform: 'uppercase' }}>Team Alpha [A]</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF' }}>{teamAlphaScore} pts</div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1.5px solid #3B82F6', padding: '6px 14px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#60A5FA', textTransform: 'uppercase' }}>Team Beta [B]</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#FFFFFF' }}>{teamBetaScore} pts</div>
            </div>

            {/* 30s Debate Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface-elevated)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
              <span style={{ fontSize: '16px', fontWeight: '900', color: debateTimer <= 5 ? '#EF4444' : 'var(--accent-amber)' }}>
                Timer: {debateTimer}s
              </span>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="btn btn-outline"
                style={{ padding: '2px 8px', fontSize: '11px' }}
              >
                {timerRunning ? 'Pause' : 'Start'}
              </button>
            </div>
          </div>
        </div>

        {/* Projector Scenario Display */}
        <div className="card" style={{ padding: '36px 30px', marginBottom: '20px', background: 'var(--bg-surface)', border: '2px solid var(--border-card)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>
              Platform: {currentScenario.platform}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={handleSpeak} className="btn btn-outline" style={{ padding: '3px 10px', fontSize: '11.5px' }}>
                Read Aloud (TTS)
              </button>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Press [Space] to Reveal • [Right Arrow] Next
              </span>
            </div>
          </div>

          <blockquote style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.45', marginBottom: '16px' }}>
            {currentScenario.headline}
          </blockquote>

          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            <strong>Context for Debate:</strong> {currentScenario.context}
          </div>

          {/* Multiple Choice Options Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {currentScenario.options.map((opt, i) => (
              <div
                key={opt.id}
                style={{
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1.5px solid',
                  borderColor: isAnswerRevealed && opt.id === currentScenario.correct_fallacy_id ? '#10B981' : 'var(--border-card)',
                  background: isAnswerRevealed && opt.id === currentScenario.correct_fallacy_id ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface-elevated)',
                  color: isAnswerRevealed && opt.id === currentScenario.correct_fallacy_id ? '#34D399' : '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                  {['A', 'B', 'C', 'D'][i]}
                </span>
                <span>{opt.name}</span>
                {isAnswerRevealed && opt.id === currentScenario.correct_fallacy_id && (
                  <span style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: '900', color: '#10B981' }}>CORRECT</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Revealed Pedagogical Breakdown */}
        {isAnswerRevealed && (
          <div className="card" style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1.5px solid #10B981', marginBottom: '20px', animation: 'fadeIn 0.3s ease' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#34D399', marginBottom: '6px' }}>
              Pedagogical Breakdown: {currentScenario.correct_fallacy_name}
            </h3>
            <p style={{ fontSize: '13.5px', color: '#FFFFFF', lineHeight: '1.5', marginBottom: '10px' }}>
              {currentScenario.explanation}
            </p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '6px', fontSize: '12.5px', color: '#93C5FD' }}>
              <strong>UNESCO SIFT Recommendation:</strong> {currentScenario.sift_recommendation}
            </div>
          </div>
        )}

        {/* Presenter Controls Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={prevQuestion} className="btn btn-outline" style={{ fontSize: '12px' }}>
              Previous
            </button>
            <button
              onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
              className="btn btn-amber"
              style={{ fontSize: '12px' }}
            >
              {isAnswerRevealed ? 'Hide Answer [Space]' : 'Reveal Answer [Space]'}
            </button>
            <button onClick={nextQuestion} className="btn btn-primary" style={{ fontSize: '12px' }}>
              Next Question
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setTeamAlphaScore((prev) => prev + 100)} className="btn" style={{ background: '#DC2626', color: '#FFF', fontSize: '12px', padding: '6px 12px' }}>
              +100 Alpha [A]
            </button>
            <button onClick={() => setTeamBetaScore((prev) => prev + 100)} className="btn" style={{ background: '#2563EB', color: '#FFF', fontSize: '12px', padding: '6px 12px' }}>
              +100 Beta [B]
            </button>
            <button onClick={() => { setTeamAlphaScore(0); setTeamBetaScore(0); }} className="btn btn-outline" style={{ fontSize: '12px', padding: '6px 12px' }}>
              Reset Scores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
