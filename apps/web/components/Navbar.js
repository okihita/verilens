'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPlayerProfile, getRankFromXP } from '../lib/gamification';
import { useTranslation } from '../lib/i18n';

export default function Navbar() {
  const { t, lang, setLanguage } = useTranslation();
  const [profile, setProfile] = useState({ xp: 120 });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic', color: '#94A3B8', nextXP: 150 });
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
            <span className="brand-badge">{t('brand_sub')}</span>
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
              <span>{t('nav_games')}</span>
              <span style={{ fontSize: '10px', transform: gamesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {gamesOpen && (
              <div className="nav-dropdown-menu" style={{ width: '320px' }}>
                <div style={{ padding: '8px 12px 6px', fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {lang === 'id' ? 'Simulasi Interaktif' : 'Interactive Simulations'}
                </div>

                <Link href="/gauntlet" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#F87171', fontWeight: '800', fontSize: '11px' }}>60s</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_daily_gauntlet')}</strong>
                      <span style={{ fontSize: '9.5px', background: '#DC2626', color: '#FFF', padding: '1px 5px', borderRadius: '4px', fontWeight: '800' }}>
                        {lang === 'id' ? 'UJI CEPAT' : 'SPEED TRIAL'}
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Sortir cepat dengan pengali kombo' : 'Rapid-fire triage with combo multipliers'}
                    </div>
                  </div>
                </Link>

                <Link href="/arena" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', fontWeight: '800', fontSize: '11px' }}>5R</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_spotter_arena')}</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pertarungan analisis 5 skenario berita' : '5-round scenario analysis battle'}
                    </div>
                  </div>
                </Link>

                <Link href="/feed" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', fontWeight: '800', fontSize: '11px' }}>Feed</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_feed_sim')}</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Moderasi beranda sosial & SIFT' : 'Simulated social feed moderation & SIFT'}
                    </div>
                  </div>
                </Link>

                <Link href="/forge" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', fontWeight: '800', fontSize: '11px' }}>Lab</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_fallacy_forge')}</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pelajari manipulasi dengan membalik fakta' : 'Reverse-spin neutral facts to learn deception'}
                    </div>
                  </div>
                </Link>

                <Link href="/duel" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA', fontWeight: '800', fontSize: '11px' }}>1v1</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_duel')}</strong>
                    <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pertarungan layar bagi 2 pemain' : '2-player split screen battle'}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Pillar 2: The Fallacy Codex */}
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            {t('nav_codex')}
          </Link>

          {/* Pillar 3: Real-Time Article Sandbox */}
          <Link href="/sandbox" className={`nav-link ${pathname === '/sandbox' ? 'active' : ''}`}>
            {t('nav_sandbox')}
          </Link>

          {/* Pillar 4: Classroom Showdown */}
          <Link href="/classroom" className={`nav-link ${pathname === '/classroom' ? 'active' : ''}`}>
            {t('nav_classroom')}
          </Link>
        </div>

        {/* Right: Language Switcher, RPG Profile Hub & Action CTA (Desktop) */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Top-Right Language Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '2px', overflow: 'hidden' }}>
            <button
              onClick={() => setLanguage('en')}
              style={{
                background: lang === 'en' ? 'var(--accent-blue)' : 'transparent',
                color: lang === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              style={{
                background: lang === 'id' ? 'var(--accent-blue)' : 'transparent',
                color: lang === 'id' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                padding: '3px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              ID
            </button>
          </div>

          {/* Progression Hub Dropdown */}
          <div className="nav-dropdown-wrapper" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(!profileOpen); setGamesOpen(false); }}
              style={{ background: 'var(--bg-surface-elevated)', border: `1.5px solid ${isProgressionRoute ? 'var(--accent-amber)' : rank.color}`, padding: '4px 10px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', outline: 'none' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '10px', fontWeight: '800', color: rank.color, textTransform: 'uppercase', lineHeight: '1.1' }}>
                  {t('level_prefix')}{rank.level} {rank.name}
                </span>
                <div style={{ width: '55px', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '2px' }}>
                  <div style={{ width: `${progressPercent}%`, height: '100%', background: rank.color }}></div>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#FFFFFF' }}>{profile.xp} {t('xp_label')}</span>
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {profileOpen && (
              <div className="nav-dropdown-menu" style={{ right: 0, width: '240px' }}>
                <div style={{ padding: '8px 12px 6px', fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {lang === 'id' ? 'Pertumbuhan Metakognitif' : 'Metacognitive Growth'}
                </div>

                <Link href="/profile" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_trophy')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Lencana & Statistik Akurasi' : 'Badges & Accuracy Stats'}
                    </div>
                  </div>
                </Link>

                <Link href="/skills" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_skills')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Buka 4 Cabang Pertahanan' : 'Unlock 4 Defense Branches'}
                    </div>
                  </div>
                </Link>

                <Link href="/leaderboard" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFFFFF' }}>{t('nav_league')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Papan Peringkat Pemuda' : 'Youth Leaderboard Ladder'}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/extension" className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '12.5px' }}>
            {t('nav_extension')}
          </Link>
        </div>

        {/* Mobile Right Controls: Language Toggle + Compact XP + Hamburger */}
        <div className="mobile-only-controls">
          <div style={{ display: 'flex', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '14px', padding: '1px' }}>
            <button
              onClick={() => setLanguage('en')}
              style={{
                background: lang === 'en' ? 'var(--accent-blue)' : 'transparent',
                color: lang === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                padding: '2px 6px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              style={{
                background: lang === 'id' ? 'var(--accent-blue)' : 'transparent',
                color: lang === 'id' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                padding: '2px 6px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              ID
            </button>
          </div>

          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', border: `1px solid ${rank.color}`, padding: '4px 8px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#FFFFFF' }}>{profile.xp} {t('xp_label')}</span>
            </div>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? 'X' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-section">
            <span className="mobile-nav-label">{t('nav_games')}</span>
            <div className="mobile-nav-grid">
              <Link href="/gauntlet" className="mobile-nav-item" style={{ color: 'var(--accent-amber)' }}>{t('nav_daily_gauntlet')}</Link>
              <Link href="/arena" className="mobile-nav-item">{t('nav_spotter_arena')}</Link>
              <Link href="/feed" className="mobile-nav-item">{t('nav_feed_sim')}</Link>
              <Link href="/forge" className="mobile-nav-item">{t('nav_fallacy_forge')}</Link>
              <Link href="/duel" className="mobile-nav-item">{t('nav_duel')}</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">{lang === 'id' ? 'Alat Utama UNESCO' : 'Core UNESCO Tools'}</span>
            <div className="mobile-nav-grid">
              <Link href="/" className="mobile-nav-item">{t('nav_codex')}</Link>
              <Link href="/sandbox" className="mobile-nav-item">{t('nav_sandbox')}</Link>
              <Link href="/classroom" className="mobile-nav-item">{t('nav_classroom')}</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">{lang === 'id' ? 'Perkembangan & Peringkat' : 'Progression & Ranks'}</span>
            <div className="mobile-nav-grid">
              <Link href="/profile" className="mobile-nav-item">{t('nav_trophy')}</Link>
              <Link href="/skills" className="mobile-nav-item">{t('nav_skills')}</Link>
              <Link href="/leaderboard" className="mobile-nav-item">{t('nav_league')}</Link>
            </div>
          </div>

          <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
            <Link href="/extension" className="btn btn-primary" style={{ flex: 1, padding: '10px', fontSize: '13px' }}>
              {t('hero_cta_extension')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
