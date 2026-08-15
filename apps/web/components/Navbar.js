'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPlayerProfile, getRankFromXP } from '../lib/gamification';

export default function Navbar() {
  const [profile, setProfile] = useState({ xp: 120 });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic', color: '#94A3B8', icon: '🌱', nextXP: 150 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const progressPercent = Math.min(100, Math.round((profile.xp / rank.nextXP) * 100));

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Brand Group */}
        <Link href="/" className="brand-group">
          <div className="brand-logo">VL</div>
          <div className="brand-text">
            <h1>VeriLens</h1>
            <span className="brand-badge">UNESCO MIL 2026</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links desktop-only">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>🃏 Codex</Link>
          <Link href="/arena" className={`nav-link ${pathname === '/arena' ? 'active' : ''}`}>🎮 Arena</Link>
          <Link href="/gauntlet" className={`nav-link ${pathname === '/gauntlet' ? 'active' : ''}`} style={{ color: 'var(--accent-amber)' }}>⚔️ Gauntlet</Link>
          <Link href="/skills" className={`nav-link ${pathname === '/skills' ? 'active' : ''}`}>🌳 Skills</Link>
          <Link href="/forge" className={`nav-link ${pathname === '/forge' ? 'active' : ''}`}>🧪 Forge</Link>
          <Link href="/feed" className={`nav-link ${pathname === '/feed' ? 'active' : ''}`}>📱 Feed</Link>
          <Link href="/duel" className={`nav-link ${pathname === '/duel' ? 'active' : ''}`}>⚔️ Duel</Link>
          <Link href="/leaderboard" className={`nav-link ${pathname === '/leaderboard' ? 'active' : ''}`}>🏆 League</Link>
          <Link href="/classroom" className={`nav-link ${pathname === '/classroom' ? 'active' : ''}`}>🏫 Class</Link>

          {/* Desktop Player Rank & XP Pill */}
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

        {/* Mobile Right Controls: Compact XP + Hamburger Button */}
        <div className="mobile-only-controls">
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', border: `1px solid ${rank.color}`, padding: '4px 8px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px' }}>{rank.icon}</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#FFFFFF' }}>{profile.xp} XP</span>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-section">
            <span className="mobile-nav-label">🎮 Training Games</span>
            <div className="mobile-nav-grid">
              <Link href="/" className="mobile-nav-item">🃏 Bias Codex</Link>
              <Link href="/arena" className="mobile-nav-item">🎮 Bias Spotter Arena</Link>
              <Link href="/gauntlet" className="mobile-nav-item" style={{ color: 'var(--accent-amber)' }}>⚔️ 60s Daily Gauntlet</Link>
              <Link href="/forge" className="mobile-nav-item">🧪 The Fallacy Forge</Link>
              <Link href="/feed" className="mobile-nav-item">📱 Feed Simulator</Link>
              <Link href="/duel" className="mobile-nav-item">⚔️ 1v1 Cognitive Duel</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">🏆 Progression & Learning</span>
            <div className="mobile-nav-grid">
              <Link href="/skills" className="mobile-nav-item">🌳 Skill Tree</Link>
              <Link href="/leaderboard" className="mobile-nav-item">🏆 Global League</Link>
              <Link href="/profile" className="mobile-nav-item">🎖️ Trophy Room</Link>
              <Link href="/classroom" className="mobile-nav-item">🏫 Classroom Showdown</Link>
              <Link href="/sandbox" className="mobile-nav-item">🧪 Article Sandbox</Link>
            </div>
          </div>

          <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '10px' }}>
            <Link href="/extension" className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '13px' }}>
              🧩 Get Chrome Extension
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
