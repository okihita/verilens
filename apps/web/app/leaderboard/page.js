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
    <div className="container" style={{ maxWidth: '900px', padding: '30px 16px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', fontSize: '11px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '8px' }}>
          <span>🏆 Global UNESCO Youth League</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 34px)', fontWeight: '900', color: '#FFFFFF', marginBottom: '6px' }}>
          Media Literacy Leaderboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', maxWidth: '600px', margin: '0 auto' }}>
          Compete with fellow digital citizens worldwide. Complete the Daily Gauntlet to climb ranks!
        </p>
      </div>

      {/* Leaderboard Table Card */}
      <div className="card" style={{ padding: '0', overflow: 'hidden', marginBottom: '24px' }}>
        <div>
          {sortedBoard.map((row) => (
            <div
              key={row.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                borderBottom: '1px solid var(--border-subtle)',
                background: row.isCurrentPlayer ? 'rgba(245, 158, 11, 0.12)' : 'transparent',
                borderLeft: row.isCurrentPlayer ? '4px solid var(--accent-amber)' : 'none',
                gap: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '15px', fontWeight: '900', color: row.rank === 1 ? '#FBBF24' : row.rank === 2 ? '#94A3B8' : row.rank === 3 ? '#B45309' : '#FFFFFF', minWidth: '28px' }}>
                  {row.rank === 1 ? '🥇1' : row.rank === 2 ? '🥈2' : row.rank === 3 ? '🥉3' : `#${row.rank}`}
                </span>

                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: '800', color: row.isCurrentPlayer ? 'var(--accent-amber)' : '#FFFFFF' }}>
                    {row.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {row.country} • <span style={{ color: row.league === 'Grandmaster' ? '#FBBF24' : '#38BDF8' }}>{row.league}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '14.5px', fontWeight: '900', color: '#FFFFFF', flexShrink: 0 }}>
                {row.xp} XP
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick CTAs */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/gauntlet" className="btn btn-amber" style={{ padding: '8px 18px', fontSize: '13px' }}>
          ⚔️ Play Gauntlet
        </Link>
        <Link href="/arena" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
          🎮 Play Arena
        </Link>
      </div>
    </div>
  );
}
