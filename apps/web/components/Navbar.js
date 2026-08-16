'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getPlayerProfile, getRankFromXP } from '../lib/gamification';
import { useTranslation } from '../lib/i18n';
import { useTheme } from '../lib/theme';

export default function Navbar() {
  const { t, lang, setLanguage } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState({ xp: 120 });
  const [rank, setRank] = useState({ level: 1, name: 'Novice Skeptic', color: '#94A3B8', nextXP: 150 });
  const [simsOpen, setSimsOpen] = useState(false);
  const [educatorsOpen, setEducatorsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const simsRef = useRef(null);
  const educatorsRef = useRef(null);
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
    setSimsOpen(false);
    setEducatorsOpen(false);
    setProfileOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (simsRef.current && !simsRef.current.contains(event.target)) setSimsOpen(false);
      if (educatorsRef.current && !educatorsRef.current.contains(event.target)) setEducatorsOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const progressPercent = Math.min(100, Math.round((profile.xp / rank.nextXP) * 100));
  const isSimRoute = ['/gauntlet', '/arena', '/feed', '/forge', '/duel', '/sandbox', '/extension'].includes(pathname);
  const isEducatorRoute = ['/classroom', '/educator'].includes(pathname);
  const isProgressionRoute = ['/profile', '/skills', '/leaderboard'].includes(pathname);

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        
        {/* Left: Brand Identity */}
        <Link href="/" className="brand-group">
          <img
            src="/logo.png"
            alt="VeriLens Logo"
            width={28}
            height={28}
            style={{ borderRadius: '6px', objectFit: 'cover', display: 'block' }}
          />
          <div className="brand-text">
            <h1 style={{ fontSize: '17px', fontWeight: '900', letterSpacing: '-0.03em', margin: 0 }}>VeriLens</h1>
          </div>
        </Link>

        {/* Center: 3 Streamlined Anchors (Desktop) */}
        <div className="nav-links desktop-only">
          
          {/* Anchor 1: Simulations & Tools Dropdown */}
          <div className="nav-dropdown-wrapper" ref={simsRef}>
            <button
              onClick={() => { setSimsOpen(!simsOpen); setEducatorsOpen(false); setProfileOpen(false); }}
              className={`nav-link nav-dropdown-btn ${isSimRoute ? 'active' : ''}`}
            >
              <span>{lang === 'id' ? 'Simulasi' : 'Simulations'}</span>
              <span style={{ fontSize: '9px', transform: simsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {simsOpen && (
              <div className="nav-dropdown-menu" style={{ width: '320px' }}>
                <div style={{ padding: '6px 12px 4px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {lang === 'id' ? 'Pelatihan & Peralatan' : 'Interactive Labs'}
                </div>

                <Link href="/gauntlet" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#F87171', fontWeight: '800' }}>60s</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_daily_gauntlet')}</strong>
                      <span style={{ fontSize: '9px', background: '#DC2626', color: '#FFF', padding: '1px 4px', borderRadius: '3px', fontWeight: '800' }}>SPEED</span>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Sortir cepat dengan kombo' : 'Rapid-fire triage with combos'}
                    </div>
                  </div>
                </Link>

                <Link href="/arena" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', fontWeight: '800' }}>5R</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_spotter_arena')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pertarungan analisis 5 skenario' : '5-round scenario battle'}
                    </div>
                  </div>
                </Link>

                <Link href="/sandbox" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA', fontWeight: '800' }}>SIFT</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_sandbox')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Disetor artikel langsung & Gemini AI' : 'Live article dissector & AI scan'}
                    </div>
                  </div>
                </Link>

                <Link href="/feed" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', fontWeight: '800' }}>Feed</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_feed_sim')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Moderasi beranda sosial & SIFT' : 'Simulated social feed moderation'}
                    </div>
                  </div>
                </Link>

                <Link href="/forge" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', fontWeight: '800' }}>Lab</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_fallacy_forge')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Balik fakta untuk pelajari manipulasi' : 'Reverse-spin neutral facts'}
                    </div>
                  </div>
                </Link>

                <Link href="/duel" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#F87171', fontWeight: '800' }}>1v1</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_duel')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pertarungan layar bagi 2 pemain' : '2-player split screen battle'}
                    </div>
                  </div>
                </Link>

                <div style={{ borderTop: '1px solid var(--border-subtle)', margin: '4px 0', paddingTop: '4px' }}>
                  <Link href="/extension" className="dropdown-item">
                    <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', fontWeight: '800' }}>Ext</div>
                    <div>
                      <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_extension')}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        {lang === 'id' ? 'Perisai browser Chrome <300ms' : 'Chrome Browser Armor (<300ms)'}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Anchor 2: The Fallacy Codex */}
          <Link href="/#codex" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            {t('nav_codex')}
          </Link>

          {/* Anchor 3: Educators & Classroom Dropdown */}
          <div className="nav-dropdown-wrapper" ref={educatorsRef}>
            <button
              onClick={() => { setEducatorsOpen(!educatorsOpen); setSimsOpen(false); setProfileOpen(false); }}
              className={`nav-link nav-dropdown-btn ${isEducatorRoute ? 'active' : ''}`}
            >
              <span>{lang === 'id' ? 'Pendidik' : 'Educators'}</span>
              <span style={{ fontSize: '9px', transform: educatorsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {educatorsOpen && (
              <div className="nav-dropdown-menu" style={{ width: '280px' }}>
                <div style={{ padding: '6px 12px 4px', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {lang === 'id' ? 'Peralatan Kelas UNESCO' : 'UNESCO Classroom Tools'}
                </div>

                <Link href="/classroom" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', fontWeight: '800' }}>Live</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_classroom')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Tampilan smartboard proyektor' : 'Smartboard presenter showdown'}
                    </div>
                  </div>
                </Link>

                <Link href="/educator" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', fontWeight: '800' }}>RPP</div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>
                      {lang === 'id' ? 'Generator RPP 1-Klik' : 'Lesson Plan Generator'}
                    </strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Lembar kerja kelas siap cetak' : 'Printable workshop worksheets'}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Controls: Compact Hub (Desktop) */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Light / Dark / System Segmented Icon Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '8px', padding: '2px', gap: '2px' }}>
            {/* Sun (Light Mode) */}
            <button
              onClick={() => setTheme('light')}
              style={{
                background: theme === 'light' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'light' ? 'var(--accent-amber)' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: theme === 'light' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
              title="Light Theme"
              aria-label="Light Theme"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </button>

            {/* Moon (Dark Mode) */}
            <button
              onClick={() => setTheme('dark')}
              style={{
                background: theme === 'dark' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'dark' ? 'var(--accent-blue-light)' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
              title="Dark Theme"
              aria-label="Dark Theme"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </button>

            {/* System / Screen */}
            <button
              onClick={() => setTheme('system')}
              style={{
                background: theme === 'system' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'system' ? 'var(--text-main)' : 'var(--text-secondary)',
                border: 'none',
                padding: '4px 6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: theme === 'system' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
              title="System Theme"
              aria-label="System Theme"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </button>
          </div>

          {/* Clean Language Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '8px', padding: '1px', overflow: 'hidden' }}>
            <button
              onClick={() => setLanguage('en')}
              style={{
                background: lang === 'en' ? 'var(--accent-blue)' : 'transparent',
                color: lang === 'en' ? '#FFFFFF' : 'var(--text-secondary)',
                border: 'none',
                padding: '3px 7px',
                borderRadius: '6px',
                fontSize: '11px',
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
                padding: '3px 7px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              ID
            </button>
          </div>

          {/* Compact RPG Progression Hub */}
          <div className="nav-dropdown-wrapper" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(!profileOpen); setSimsOpen(false); setEducatorsOpen(false); }}
              style={{
                background: 'var(--bg-surface-elevated)',
                border: `1.5px solid ${isProgressionRoute ? 'var(--accent-amber)' : rank.color}`,
                padding: '4px 10px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: '800', color: rank.color }}>
                {t('level_prefix')}{rank.level}
              </span>
              <span style={{ color: 'var(--border-card)' }}>•</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-main)' }}>
                {profile.xp} {t('xp_label')}
              </span>
              <span style={{ fontSize: '8px', color: 'var(--text-muted)', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {profileOpen && (
              <div className="nav-dropdown-menu dropdown-right" style={{ left: 'auto', right: 0, width: '250px' }}>
                <div style={{ padding: '8px 12px 6px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '12px', color: rank.color }}>Level {rank.level} {rank.name}</strong>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{profile.xp}/{rank.nextXP} XP</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ width: `${progressPercent}%`, height: '100%', background: rank.color }}></div>
                  </div>
                </div>

                <Link href="/profile" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_trophy')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Lencana & Statistik Akurasi' : 'Badges & Accuracy Stats'}
                    </div>
                  </div>
                </Link>

                <Link href="/skills" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_skills')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pohon Keterampilan Kognitif' : 'Unlock Defense Branches'}
                    </div>
                  </div>
                </Link>

                <Link href="/leaderboard" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-main)' }}>{t('nav_league')}</strong>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Papan Peringkat Pemuda' : 'Youth Leaderboard Ladder'}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Header Controls */}
        <div className="mobile-only-controls">
          <div style={{ display: 'flex', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '6px', padding: '1px' }}>
            <button onClick={() => setTheme('light')} style={{ background: theme === 'light' ? 'var(--bg-surface)' : 'transparent', color: theme === 'light' ? 'var(--accent-amber)' : 'var(--text-secondary)', border: 'none', padding: '2px 4px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Light">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="5"></circle></svg>
            </button>
            <button onClick={() => setTheme('dark')} style={{ background: theme === 'dark' ? 'var(--bg-surface)' : 'transparent', color: theme === 'dark' ? 'var(--accent-blue-light)' : 'var(--text-secondary)', border: 'none', padding: '2px 4px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Dark">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </button>
          </div>

          <div style={{ display: 'flex', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: '6px', padding: '1px' }}>
            <button onClick={() => setLanguage('en')} style={{ background: lang === 'en' ? 'var(--accent-blue)' : 'transparent', color: lang === 'en' ? '#FFFFFF' : 'var(--text-secondary)', border: 'none', padding: '2px 5px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '800', cursor: 'pointer' }}>EN</button>
            <button onClick={() => setLanguage('id')} style={{ background: lang === 'id' ? 'var(--accent-blue)' : 'transparent', color: lang === 'id' ? '#FFFFFF' : 'var(--text-secondary)', border: 'none', padding: '2px 5px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '800', cursor: 'pointer' }}>ID</button>
          </div>

          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'var(--bg-surface-elevated)', border: `1px solid ${rank.color}`, padding: '3px 6px', borderRadius: '12px', fontSize: '10.5px', fontWeight: '800', color: 'var(--text-main)' }}>
              {profile.xp} XP
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
            <span className="mobile-nav-label">{lang === 'id' ? 'Simulasi' : 'Simulations'}</span>
            <div className="mobile-nav-grid">
              <Link href="/gauntlet" className="mobile-nav-item" style={{ color: 'var(--accent-amber)' }}>{t('nav_daily_gauntlet')}</Link>
              <Link href="/arena" className="mobile-nav-item">{t('nav_spotter_arena')}</Link>
              <Link href="/sandbox" className="mobile-nav-item">{t('nav_sandbox')}</Link>
              <Link href="/feed" className="mobile-nav-item">{t('nav_feed_sim')}</Link>
              <Link href="/forge" className="mobile-nav-item">{t('nav_fallacy_forge')}</Link>
              <Link href="/duel" className="mobile-nav-item">{t('nav_duel')}</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">{lang === 'id' ? 'Pendidik & Kodeks' : 'Educators & Codex'}</span>
            <div className="mobile-nav-grid">
              <Link href="/#codex" className="mobile-nav-item">{t('nav_codex')}</Link>
              <Link href="/classroom" className="mobile-nav-item">{t('nav_classroom')}</Link>
              <Link href="/educator" className="mobile-nav-item">{lang === 'id' ? 'RPP Guru' : 'Lesson Plans'}</Link>
              <Link href="/extension" className="mobile-nav-item">{t('nav_extension')}</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">{lang === 'id' ? 'Perkembangan' : 'Progression'}</span>
            <div className="mobile-nav-grid">
              <Link href="/profile" className="mobile-nav-item">{t('nav_trophy')}</Link>
              <Link href="/skills" className="mobile-nav-item">{t('nav_skills')}</Link>
              <Link href="/leaderboard" className="mobile-nav-item">{t('nav_league')}</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
