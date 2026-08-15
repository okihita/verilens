'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerProfile, getRankFromXP } from '../../lib/gamification';

const PEER_LEADERBOARD = [
  { rank: 1, name: 'Sari Rahmawati', country: '🇮🇩 Indonesia', xp: 4820, league: 'Grandmaster', badge: '👑 UNESCO Fellow' },
  { rank: 2, name: 'Tariq Al-Mansoor', country: '🇯🇴 Jordan', xp: 4410, league: 'Grandmaster', badge: '⚡ Speed Sifter' },
  { rank: 3, name: 'Clara Dupont', country: '🇫🇷 France', xp: 3950, league: 'Diamond', badge: '🛡️ Dialectical Master' },
  { rank: 4, name: 'Mateo Santos', country: '🇵🇭 Philippines', xp: 3620, league: 'Diamond', badge: '🔥 Streak Legend' },
  { rank: 5, name: 'Zainab Kimani', country: '🇰🇪 Kenya', xp: 3100, league: 'Platinum', badge: '🃏 Codex Scholar' },
  { rank: 6, name: 'Lucas Silva', country: '🇧🇷 Brazil', xp: 2840, league: 'Platinum', badge: '💰 Scam Shield' },
  { rank: 7, name: 'Yuki Tanaka', country: '🇯🇵 Japan', xp: 2450, league: 'Gold', badge: '🧪 Lab Scientist' },
  { rank: 8, name: 'Elena Rostova', country: '🇺🇦 Ukraine', xp: 1980, league: 'Gold', badge: '⭐ Bias Spotter' }
];

export default function LeaderboardPage() {
  const [playerProfile, setPlayerProfile] = useState({ xp: 120 });
  const [playerRank, setPlayerRank] = useState({ level: 1, name: 'Novice Skeptic' });

  useEffect(() => {
    const p = getPlayerProfile();
    setPlayerProfile(p);
    setPlayerRank(getRankFromXP(p.xp));
  }, []);

  // Compute player's simulated global rank position
  const sortedBoard = [...PEER_LEADERBOARD, {
    rank: 9,
    name: 'You (Local Citizen)',
    country: '🌐 Active Player',
    xp: playerProfile.xp,
    league: playerProfile.xp >= 4000 ? 'Grandmaster' : playerProfile.xp >= 3000 ? 'Diamond' : playerProfile.xp >= 2000 ? 'Platinum' : playerProfile.xp >= 1000 ? 'Gold' : 'Silver',
    badge: `Lv.${playerRank.level} ${playerRank.name}`,
    isCurrentPlayer: true
  }].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="container" style={{ maxWidth: '900px', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '12px' }}>
          <span>🏆 Global UNESCO Youth League</span>
        </div>
        <h1 style={{ fontSize: '34px', fontWeight: '900', color: '#FFFFFF', marginBottom: '8px' }}>
          Media Literacy Leaderboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', maxWidth: '600px', margin: '0 auto' }}>
          Compete with fellow digital citizens worldwide. Complete the Daily Gauntlet and Spotter Arena to climb the UNESCO ranks!
        </p>
      </div>

      {/* Leaderboard Table Card */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.5fr 1fr 1fr', padding: '16px 20px', background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          <span>Rank</span>
          <span>Citizen / Student</span>
          <span>Country</span>
          <span>League</span>
          <span style={{ textAlign: 'right' }}>Score</span>
        </div>

        <div>
          {sortedBoard.map((row) => (
            <div
              key={row.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 2fr 1.5fr 1fr 1fr',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-subtle)',
                alignItems: 'center',
                background: row.isCurrentPlayer ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
                borderLeft: row.isCurrentPlayer ? '4px solid var(--accent-amber)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '16px', fontWeight: '900', color: row.rank === 1 ? '#FBBF24' : row.rank === 2 ? '#94A3B8' : row.rank === 3 ? '#B45309' : '#FFFFFF' }}>
                  {row.rank === 1 ? '🥇 1' : row.rank === 2 ? '🥈 2' : row.rank === 3 ? '🥉 3' : `#${row.rank}`}
                </span>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: row.isCurrentPlayer ? 'var(--accent-amber)' : '#FFFFFF' }}>
                  {row.name}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{row.badge}</div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {row.country}
              </div>

              <div>
                <span style={{ fontSize: '10.5px', fontWeight: '800', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: row.league === 'Grandmaster' ? '#FBBF24' : row.league === 'Diamond' ? '#38BDF8' : '#A855F7', textTransform: 'uppercase' }}>
                  {row.league}
                </span>
              </div>

              <div style={{ textAlign: 'right', fontSize: '15px', fontWeight: '900', color: '#FFFFFF' }}>
                {row.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick CTAs */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link href="/gauntlet" className="btn btn-amber" style={{ padding: '10px 24px' }}>
          ⚔️ Play Gauntlet to Climb Rank
        </Link>
        <Link href="/arena" className="btn btn-primary" style={{ padding: '10px 24px' }}>
          🎮 Enter 5-Round Arena
        </Link>
      </div>
    </div>
  );
}
