'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPlayerProfile, getRankFromXP } from '../lib/gamification';

export default function Navbar() {
  const [profile, setProfile] = useState({ xp: 120 });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic', color: '#94A3B8', icon: '🌱', nextXP: 150 });
  const [gamesOpen, setGamesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const gamesRef = useRef(null);
  const profileRef = useRef(null);
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

  // Close menus on route change or outside click
  useEffect(() => {
    setGamesOpen(false);
    setProfileOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (gamesRef.current && !gamesRef.current.contains(event.target)) {
        setGamesOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const progressPercent = Math.min(100, Math.round((profile.xp / rank.nextXP) * 100));
  const isGameRoute = ['/gauntlet', '/arena', '/feed', '/forge', '/duel'].includes(pathname);
  const isProgressionRoute = ['/profile', '/skills', '/leaderboard'].includes(pathname);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Left: Brand Identity */}
        <Link href="/" className="brand-group">
          <div className="brand-logo">VL</div>
          <div className="brand-text">
            <h1>VeriLens</h1>
            <span className="brand-badge">UNESCO MIL 2026</span>
          </div>
        </Link>

        {/* Center: 4 Clean Pillars (Desktop) */}
        <div className="nav-links desktop-only">
          {/* Pillar 1: Training Games Dropdown */}
          <div className="nav-dropdown-wrapper" ref={gamesRef}>
            <button
              onClick={() => { setGamesOpen(!gamesOpen); setProfileOpen(false); }}
              className={`nav-link nav-dropdown-btn ${isGameRoute ? 'active' : ''}`}
            >
              <span>🎮 Training Games</span>
              <span style={{ fontSize: '10px', transform: gamesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {gamesOpen && (
              <div className="nav-dropdown-menu" style={{ width: '320px' }}>
                <div style={{ padding: '8px 12px 6px', fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  Interactive Simulations
                </div>

                <Link href="/gauntlet" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#F87171' }}>⚔️</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>Daily Gauntlet</strong>
                      <span style={{ fontSize: '9.5px', background: '#DC2626', color: '#FFF', padding: '1px 5px', borderRadius: '4px', fontWeight: '800' }}>60s SPEED</span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Rapid-fire triage with combo multipliers</div>
                  </div>
                </Link>

                <Link href="/arena" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' }}>🎮</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>Spotter Arena</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>5-round real-world news scenario battle</div>
                  </div>
                </Link>

                <Link href="/feed" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>📱</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>Feed Simulator</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Simulated social feed moderation & SIFT</div>
                  </div>
                </Link>

                <Link href="/forge" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24' }}>🧪</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>The Fallacy Forge</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Reverse-spin neutral facts to learn deception</div>
                  </div>
                </Link>

                <Link href="/duel" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA' }}>⚔️</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>1v1 Cognitive Duel</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>2-player split screen keyboard battle</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Pillar 2: The Fallacy Codex */}
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            🃏 Codex
          </Link>

          {/* Pillar 3: Real-Time Article Sandbox */}
          <Link href="/sandbox" className={`nav-link ${pathname === '/sandbox' ? 'active' : ''}`}>
            🧪 Sandbox
          </Link>

          {/* Pillar 4: Classroom Showdown */}
          <Link href="/classroom" className={`nav-link ${pathname === '/classroom' ? 'active' : ''}`}>
            🏫 Classroom
          </Link>
        </div>

        {/* Right: RPG Profile Hub & Action CTA (Desktop) */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Progression Hub Dropdown */}
          <div className="nav-dropdown-wrapper" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(!profileOpen); setGamesOpen(false); }}
              style={{ background: 'var(--bg-surface-elevated)', border: `1.5px solid ${isProgressionRoute ? 'var(--accent-amber)' : rank.color}`, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', outline: 'none' }}
            >
              <span style={{ fontSize: '13px' }}>{rank.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: rank.color, textTransform: 'uppercase', lineHeight: '1.1' }}>
                  Lv.{rank.level} {rank.name}
                </span>
                <div style={{ width: '55px', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: rank.color }}></div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#FFFFFF' }}>{profile.xp} XP</span>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {profileOpen && (
              <div className="nav-dropdown-menu" style={{ right: 0, width: '240px' }}>
                <div style={{ padding: '8px 12px 6px', fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  Metacognitive Growth
                </div>

                <Link href="/profile" className="dropdown-item">
                  <span style={{ fontSize: '16px' }}>🎖️</span>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>Trophy Room</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Badges & Accuracy Stats</div>
                  </div>
                </Link>

                <Link href="/skills" className="dropdown-item">
                  <span style={{ fontSize: '16px' }}>🌳</span>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>Skill Tree</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Unlock 4 Defense Branches</div>
                  </div>
                </Link>

                <Link href="/leaderboard" className="dropdown-item">
                  <span style={{ fontSize: '16px' }}>🏆</span>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>Global League</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Youth Leaderboard Ladder</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/extension" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12.5px' }}>
            🧩 Get Armor
          </Link>
        </div>

        {/* Mobile Right Controls: Compact XP + Hamburger Toggle */}
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-section">
            <span className="mobile-nav-label">🎮 Training Simulations</span>
            <div className="mobile-nav-grid">
              <Link href="/gauntlet" className="mobile-nav-item" style={{ color: 'var(--accent-amber)' }}>⚔️ 60s Daily Gauntlet</Link>
              <Link href="/arena" className="mobile-nav-item">🎮 Spotter Arena</Link>
              <Link href="/feed" className="mobile-nav-item">📱 Feed Simulator</Link>
              <Link href="/forge" className="mobile-nav-item">🧪 The Fallacy Forge</Link>
              <Link href="/duel" className="mobile-nav-item">⚔️ 1v1 Cognitive Duel</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">🔍 Core UNESCO Tools</span>
            <div className="mobile-nav-grid">
              <Link href="/" className="mobile-nav-item">🃏 Fallacy Codex</Link>
              <Link href="/sandbox" className="mobile-nav-item">🧪 Article Sandbox</Link>
              <Link href="/classroom" className="mobile-nav-item">🏫 Classroom Showdown</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">🏆 Progression & Ranks</span>
            <div className="mobile-nav-grid">
              <Link href="/profile" className="mobile-nav-item">🎖️ Trophy Room</Link>
              <Link href="/skills" className="mobile-nav-item">🌳 Skill Tree</Link>
              <Link href="/leaderboard" className="mobile-nav-item">🏆 Global League</Link>
            </div>
          </div>

          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
            <Link href="/extension" className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '13px' }}>
              🧩 Get Chrome Extension
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
