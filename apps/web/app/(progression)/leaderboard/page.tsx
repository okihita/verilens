'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerProfile, getRankFromXP } from '../../../lib/gamification';

const PEER_LEADERBOARD = [
  { rank: 1, name: 'Sari Rahmawati', country: 'Indonesia', xp: 4820, league: 'Grandmaster', badge: 'UNESCO Fellow' },
  { rank: 2, name: 'Tariq Al-Mansoor', country: 'Jordan', xp: 4410, league: 'Grandmaster', badge: 'Speed Sifter' },
  { rank: 3, name: 'Clara Dupont', country: 'France', xp: 3950, league: 'Diamond', badge: 'Dialectical Master' },
  { rank: 4, name: 'April Wang', country: 'Indonesia', xp: 3450, league: 'Diamond', badge: 'Lateral Pioneer' },
  { rank: 5, name: 'Mateo Silva', country: 'Brazil', xp: 3120, league: 'Platinum', badge: 'Cognitive Inquisitor' },
  { rank: 6, name: 'Amina Diallo', country: 'Senegal', xp: 2890, league: 'Platinum', badge: 'Scam Resistance' },
  { rank: 7, name: 'Kenji Takahashi', country: 'Japan', xp: 2450, league: 'Gold', badge: 'Skeptic Adept' },
  { rank: 8, name: 'Elena Rossi', country: 'Italy', xp: 2100, league: 'Gold', badge: 'Logic Guard' }
];

export default function LeaderboardPage() {
  const [profile, setProfile] = useState({ xp: 120 });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic' });

  useEffect(() => {
    const p = getPlayerProfile();
    setProfile(p);
    setRank(getRankFromXP(p.xp));
  }, []);

  return (
    <div className="container" style={{ maxWidth: '860px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>GLOBAL YOUTH LEAGUE</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-main)', marginBottom: '8px' }}>
          UNESCO Cognitive Immunity Ladder
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
          Real-time international student ranking based on SIFT verification accuracy, Daily Gauntlet streaks, and cognitive badges.
        </p>
      </div>

      {/* Your Rank Pin */}
      <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-elevated) 100%)', border: '1.5px solid var(--accent-amber)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '13px' }}>
            YOU
          </div>
          <div>
            <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-main)' }}>Your Active Profile</div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Level {rank.level} {rank.name}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--accent-amber)' }}>{profile.xp} XP</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Current Score</div>
          </div>
          <Link href="/gauntlet" className="btn btn-amber" style={{ padding: '7px 16px', fontSize: '13px' }}>
            Climb Ladder
          </Link>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 110px', padding: '12px 18px', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          <span>Rank</span>
          <span>Student / Country</span>
          <span style={{ textAlign: 'center' }}>Division</span>
          <span style={{ textAlign: 'right' }}>Total XP</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {PEER_LEADERBOARD.map((user) => (
            <div
              key={user.rank}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 120px 110px',
                padding: '14px 18px',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-subtle)',
                background: user.rank <= 3 ? 'rgba(245, 158, 11, 0.03)' : 'transparent'
              }}
            >
              <span style={{ fontSize: '14.5px', fontWeight: '900', color: user.rank === 1 ? '#F59E0B' : user.rank === 2 ? '#94A3B8' : user.rank === 3 ? '#B45309' : 'var(--text-muted)' }}>
                #{user.rank}
              </span>

              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-main)' }}>{user.name}</div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{user.country} • <span style={{ color: 'var(--accent-emerald-light)' }}>{user.badge}</span></div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', padding: '3px 8px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', color: 'var(--accent-blue-light)' }}>
                  {user.league}
                </span>
              </div>

              <span style={{ textAlign: 'right', fontSize: '14.5px', fontWeight: '900', color: 'var(--text-main)' }}>
                {user.xp} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
