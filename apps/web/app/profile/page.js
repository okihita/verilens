'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerProfile, getRankFromXP, RANKS, BADGES } from '../../lib/gamification';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    xp: 120,
    streak: 0,
    maxStreak: 3,
    quizzesCompleted: 1,
    cardsFlipped: [],
    unlockedBadgeIds: ['first_shield']
  });
  const [rank, setRank] = useState(RANKS[0]);

  useEffect(() => {
    const p = getPlayerProfile();
    setProfile(p);
    setRank(getRankFromXP(p.xp));
  }, []);

  const nextRank = RANKS.find(r => r.level === rank.level + 1) || rank;
  const currentLevelMin = rank.minXP;
  const nextLevelMin = nextRank.minXP;
  const progressInLevel = profile.xp - currentLevelMin;
  const levelTotalDistance = Math.max(1, nextLevelMin - currentLevelMin);
  const progressPercent = Math.min(100, Math.max(5, Math.round((progressInLevel / levelTotalDistance) * 100)));

  return (
    <div className="container" style={{ maxWidth: '960px', padding: '30px 16px' }}>
      {/* Top Banner */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #101726 0%, #172554 100%)', border: `1.5px solid ${rank.color}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0,0,0,0.3)', border: `2px solid ${rank.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', flexShrink: 0 }}>
              {rank.icon}
            </div>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', color: rank.color, letterSpacing: '0.6px' }}>
                UNESCO MIL Rank • Level {rank.level}
              </div>
              <h1 style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: '900', color: '#FFFFFF', marginTop: '2px' }}>
                {rank.name}
              </h1>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                Total Score: <strong style={{ color: '#FFFFFF' }}>{profile.xp} XP</strong> • Next rank at {nextRank.minXP} XP
              </div>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div style={{ width: '100%', maxWidth: '260px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '700' }}>
              <span>LVL {rank.level}</span>
              <span>{profile.xp} / {nextRank.minXP} XP</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.4)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPercent}%`, height: '100%', background: rank.color, transition: 'width 0.4s ease' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Stats Overview Grid (Fluid for mobile) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '22px', marginBottom: '2px' }}>⭐</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#FFFFFF' }}>{profile.xp}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Total XP Earned</div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '22px', marginBottom: '2px' }}>🔥</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-amber)' }}>{profile.maxStreak}x</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Highest Streak</div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '22px', marginBottom: '2px' }}>🃏</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-blue-light)' }}>{profile.cardsFlipped.length}/12</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Cards Mastered</div>
        </div>

        <div className="card" style={{ textAlign: 'center', padding: '14px' }}>
          <div style={{ fontSize: '22px', marginBottom: '2px' }}>🏆</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--accent-emerald-light)' }}>{profile.unlockedBadgeIds.length}/{BADGES.length}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Badges Unlocked</div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ marginBottom: '14px' }}>
          <h2 style={{ fontSize: 'clamp(18px, 4vw, 20px)', fontWeight: '800', color: '#FFFFFF' }}>
            🎖️ Cognitive Achievement Badges
          </h2>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            Complete challenges across the Arena, Gauntlet, and Codex to unlock badges and earn bonus XP.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {BADGES.map((b) => {
            const isUnlocked = profile.unlockedBadgeIds.includes(b.id);
            return (
              <div
                key={b.id}
                className="card"
                style={{
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: isUnlocked ? 'var(--bg-surface)' : 'rgba(16, 23, 38, 0.4)',
                  borderColor: isUnlocked ? 'var(--accent-amber)' : 'var(--border-subtle)',
                  opacity: isUnlocked ? 1 : 0.6
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: isUnlocked ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {isUnlocked ? b.icon : '🔒'}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '13px', color: isUnlocked ? '#FFFFFF' : 'var(--text-muted)' }}>{b.name}</strong>
                    {isUnlocked && <span style={{ fontSize: '10px', color: 'var(--accent-amber)', fontWeight: '800' }}>+{b.xpReward} XP</span>}
                  </div>
                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Play CTAs */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#FFFFFF' }}>Ready to climb to the next rank?</h3>
          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Play the 60-second Gauntlet or jump into the 5-round Arena.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link href="/gauntlet" className="btn btn-amber" style={{ padding: '8px 16px', fontSize: '13px' }}>
            ⚔️ Gauntlet
          </Link>
          <Link href="/arena" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
            🎮 Arena
          </Link>
        </div>
      </div>
    </div>
  );
}
