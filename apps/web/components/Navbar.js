'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlayerProfile, getRankFromXP } from '../lib/gamification';

export default function Navbar() {
  const [profile, setProfile] = useState({ xp: 120 });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic', color: '#94A3B8', icon: '🌱', nextXP: 150 });

  useEffect(() => {
    function refresh() {
      const p = getPlayerProfile();
      setProfile(p);
      setRank(getRankFromXP(p.xp));
    }
    refresh();
    window.addEventListener('verilens_profile_updated', refresh);
    return () => window.removeEventListener('verilens_profile_updated', refresh);
  }, []);

  const progressPercent = Math.min(100, Math.round((profile.xp / rank.nextXP) * 100));

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="brand-group">
          <div className="brand-logo">VL</div>
          <div className="brand-text">
            <h1>VeriLens</h1>
            <span className="brand-badge">UNESCO MIL 2026</span>
          </div>
        </Link>

        <div className="nav-links">
          <Link href="/" className="nav-link">🃏 Codex</Link>
          <Link href="/arena" className="nav-link">🎮 Arena</Link>
          <Link href="/gauntlet" className="nav-link" style={{ color: 'var(--accent-amber)' }}>⚔️ Gauntlet</Link>
          <Link href="/skills" className="nav-link">🌳 Skills</Link>
          <Link href="/forge" className="nav-link">🧪 Forge</Link>
          <Link href="/feed" className="nav-link">📱 Feed</Link>
          <Link href="/duel" className="nav-link">⚔️ Duel</Link>
          <Link href="/leaderboard" className="nav-link">🏆 League</Link>
          <Link href="/classroom" className="nav-link">🏫 Class</Link>

          {/* Live Player Rank & XP Pill */}
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', border: `1px solid ${rank.color}`, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px' }}>{rank.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: rank.color, textTransform: 'uppercase', lineHeight: '1.1' }}>
                  Lv.{rank.level} {rank.name}
                </span>
                <div style={{ width: '55px', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: rank.color }}></div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#FFFFFF' }}>{profile.xp} XP</span>
            </div>
          </Link>

          <Link href="/extension" className="btn btn-primary" style={{ padding: '6px 10px', fontSize: '12.5px' }}>
            🧩 Armor
          </Link>
        </div>
      </div>
    </nav>
  );
}
