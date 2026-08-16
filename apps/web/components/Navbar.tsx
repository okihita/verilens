'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Monitor, Globe } from 'lucide-react';
import { getPlayerProfile, getRankFromXP } from '../lib/gamification';
import { useTranslation, SUPPORTED_LANGUAGES } from '../lib/i18n';
import { useTheme } from '../lib/theme';

export default function Navbar() {
  const { t, lang, setLanguage } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<any>({ xp: 120 });
  const [rank, setRank] = useState<any>({ level: 1, name: 'Novice Skeptic', color: '#94A3B8', nextXP: 150 });
  const [simsOpen, setSimsOpen] = useState(false);
  const [educatorsOpen, setEducatorsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const simsRef = useRef<HTMLDivElement | null>(null);
  const educatorsRef = useRef<HTMLDivElement | null>(null);
  const langDesktopRef = useRef<HTMLDivElement | null>(null);
  const langMobileRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function refresh() {
      const p = getPlayerProfile();
      setProfile(p);
      setRank(getRankFromXP(p.xp));
    }
    refresh();
    window.addEventListener('verilens_profile_updated', refresh);
    return () => {
      window.removeEventListener('verilens_profile_updated', refresh);
    };
  }, []);

  useEffect(() => {
    setSimsOpen(false);
    setEducatorsOpen(false);
    setLangOpen(false);
    setProfileOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (simsRef.current && !simsRef.current.contains(event.target)) setSimsOpen(false);
      if (educatorsRef.current && !educatorsRef.current.contains(event.target)) setEducatorsOpen(false);
      const clickedInsideLang =
        (langDesktopRef.current && langDesktopRef.current.contains(event.target)) ||
        (langMobileRef.current && langMobileRef.current.contains(event.target));
      if (!clickedInsideLang) setLangOpen(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const progressPercent = Math.min(100, Math.round((profile.xp / rank.nextXP) * 100));
  const isSimRoute = ['/gauntlet', '/arena', '/feed', '/forge', '/duel', '/sandbox', '/extension'].includes(pathname);
  const isEducatorRoute = ['/classroom', '/educator'].includes(pathname);
  const isProgressionRoute = ['/profile', '/skills', '/leaderboard'].includes(pathname);
  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        
        {/* Left: Brand Identity */}
        <Link href="/" className="brand-group">
          <img
            src="/logo.png"
            alt="VeriLens Logo"
            style={{ height: '28px', width: 'auto', display: 'block', flexShrink: 0 }}
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
              onClick={() => { setSimsOpen(!simsOpen); setEducatorsOpen(false); setLangOpen(false); setProfileOpen(false); }}
              className={`nav-link nav-dropdown-btn ${isSimRoute ? 'active' : ''}`}
            >
              <span>{lang === 'id' ? 'Simulasi' : lang === 'es' ? 'Simulaciones' : lang === 'fr' ? 'Simulations' : lang === 'zh' ? '模拟体验' : 'Simulations'}</span>
              <span style={{ fontSize: '12px', transform: simsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {simsOpen && (
              <div className="nav-dropdown-menu" style={{ width: '320px' }}>
                <div style={{ padding: '6px 12px 4px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {lang === 'id' ? 'Pelatihan & Peralatan' : lang === 'zh' ? '交互实验室' : 'Interactive Labs'}
                </div>

                <Link href="/gauntlet" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#F87171', fontWeight: '800' }}>60s</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_daily_gauntlet')}</strong>
                      <span style={{ fontSize: '12px', background: '#DC2626', color: '#FFF', padding: '1px 5px', borderRadius: '3px', fontWeight: '800' }}>SPEED</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Sortir cepat dengan kombo' : lang === 'zh' ? '极速连击识别挑战' : 'Rapid-fire triage with combos'}
                    </div>
                  </div>
                </Link>

                <Link href="/arena" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', fontWeight: '800' }}>5R</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_spotter_arena')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pertarungan analisis 5 skenario' : lang === 'zh' ? '5局情景实战对决' : '5-round scenario battle'}
                    </div>
                  </div>
                </Link>

                <Link href="/sandbox" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA', fontWeight: '800' }}>SIFT</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_sandbox')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Disetor artikel langsung & Gemini AI' : lang === 'zh' ? '实时文章侧向核查' : 'Live article dissector & AI scan'}
                    </div>
                  </div>
                </Link>

                <Link href="/feed" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', fontWeight: '800' }}>Feed</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_feed_sim')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Moderasi beranda sosial & SIFT' : lang === 'zh' ? '社交信息流模拟审核' : 'Simulated social feed moderation'}
                    </div>
                  </div>
                </Link>

                <Link href="/forge" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', fontWeight: '800' }}>Lab</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_fallacy_forge')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Sintesis argumen interaktif' : lang === 'zh' ? '逆向论证重构实验室' : 'Interactive fallacy synthesis'}
                    </div>
                  </div>
                </Link>

                <Link href="/duel" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#F87171', fontWeight: '800' }}>PvP</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_duel')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Duel debat PvP berbasis giliran' : lang === 'zh' ? '双人对决辩论演练' : 'Turn-based debate showdown'}
                    </div>
                  </div>
                </Link>

                <Link href="/extension" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', fontWeight: '800' }}>CRX</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_extension')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pelindung browser waktu-nyata' : lang === 'zh' ? 'Chrome 浏览器实时伴侣' : 'Real-time Chrome companion'}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Anchor 2: Cognitive Codex Direct Link */}
          <Link href="/#codex" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            {t('nav_codex')}
          </Link>

          {/* Anchor 3: Educators & Classroom */}
          <div className="nav-dropdown-wrapper" ref={educatorsRef}>
            <button
              onClick={() => { setEducatorsOpen(!educatorsOpen); setSimsOpen(false); setLangOpen(false); setProfileOpen(false); }}
              className={`nav-link nav-dropdown-btn ${isEducatorRoute ? 'active' : ''}`}
            >
              <span>{lang === 'id' ? 'Pendidik' : lang === 'es' ? 'Educadores' : lang === 'fr' ? 'Éducateurs' : lang === 'zh' ? '教学专区' : 'Educators'}</span>
              <span style={{ fontSize: '12px', transform: educatorsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {educatorsOpen && (
              <div className="nav-dropdown-menu" style={{ width: '280px' }}>
                <div style={{ padding: '6px 12px 4px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  {lang === 'id' ? 'Peralatan Kelas UNESCO' : lang === 'zh' ? '联合国教科文组织教学套件' : 'UNESCO Classroom Tools'}
                </div>

                <Link href="/classroom" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#FBBF24', fontWeight: '800' }}>Live</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_classroom')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Tampilan smartboard proyektor' : lang === 'zh' ? '智能大屏互动教学模式' : 'Smartboard presenter showdown'}
                    </div>
                  </div>
                </Link>

                <Link href="/educator" className="dropdown-item">
                  <div className="dropdown-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', fontWeight: '800' }}>RPP</div>
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>
                      {lang === 'id' ? 'Generator RPP 1-Klik' : lang === 'zh' ? '一键生成教案及工作表' : 'Lesson Plan Generator'}
                    </strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Lembar kerja kelas siap cetak' : lang === 'zh' ? '支持 PDF 直接打印' : 'Printable workshop worksheets'}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Column 3: Controls, Language, Profile (Aligned to End with Exactly Equal 36px Heights) */}
        <div className="nav-controls-desktop desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          
          {/* Light / Dark / System Segmented Switcher (Height: 36px) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '36px',
              boxSizing: 'border-box',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-card)',
              borderRadius: '8px',
              padding: '2px',
              gap: '2px'
            }}
          >
            {/* Sun (Light Mode) */}
            <button
              onClick={() => setTheme('light')}
              style={{
                height: '30px',
                padding: '0 8px',
                borderRadius: '6px',
                background: theme === 'light' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'light' ? '#D97706' : 'var(--text-muted)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: theme === 'light' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
              title="Light Mode (Sun)"
              aria-label="Light Mode"
            >
              <Sun size={15} strokeWidth={2.2} />
            </button>

            {/* Moon (Dark Mode) */}
            <button
              onClick={() => setTheme('dark')}
              style={{
                height: '30px',
                padding: '0 8px',
                borderRadius: '6px',
                background: theme === 'dark' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'dark' ? 'var(--accent-blue-light)' : 'var(--text-muted)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: theme === 'dark' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
              title="Dark Mode (Moon)"
              aria-label="Dark Mode"
            >
              <Moon size={15} strokeWidth={2.2} />
            </button>

            {/* System (Monitor) */}
            <button
              onClick={() => setTheme('system')}
              style={{
                height: '30px',
                padding: '0 8px',
                borderRadius: '6px',
                background: theme === 'system' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'system' ? 'var(--text-main)' : 'var(--text-muted)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: theme === 'system' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease'
              }}
              title="System Theme (Auto)"
              aria-label="System Theme"
            >
              <Monitor size={15} strokeWidth={2.2} />
            </button>
          </div>

          {/* Language Dropdown (Height: 36px) */}
          <div className="nav-dropdown-wrapper" ref={langDesktopRef}>
            <button
              onClick={() => { setLangOpen(!langOpen); setSimsOpen(false); setEducatorsOpen(false); setProfileOpen(false); }}
              style={{
                height: '36px',
                boxSizing: 'border-box',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-main)',
                padding: '0 10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                fontSize: '12.5px',
                fontWeight: '800'
              }}
              title="Change Language / 切换语言"
              aria-label="Change Language"
            >
              <Globe size={15} strokeWidth={2.2} style={{ color: 'var(--text-secondary)' }} />
              <span>{activeLangObj.code.toUpperCase()}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {langOpen && (
              <div className="nav-dropdown-menu dropdown-right" style={{ left: 'auto', right: 0, width: '180px' }}>
                <div style={{ padding: '6px 10px 4px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>
                  Language / 语言
                </div>
                {SUPPORTED_LANGUAGES.map((l) => {
                  const isSelected = l.code === lang;
                  return (
                    <button
                      key={l.code}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangOpen(false);
                      }}
                      style={{
                        background: isSelected ? 'var(--bg-surface-elevated)' : 'transparent',
                        color: isSelected ? 'var(--accent-blue)' : 'var(--text-main)',
                        border: 'none',
                        textAlign: 'left',
                        padding: '7px 10px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: isSelected ? '800' : '500',
                        width: '100%'
                      }}
                    >
                      <span>{l.native}</span>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                        {l.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* RPG Progression Pill (Height: 36px) */}
          <div className="nav-dropdown-wrapper" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(!profileOpen); setSimsOpen(false); setEducatorsOpen(false); setLangOpen(false); }}
              style={{
                height: '36px',
                boxSizing: 'border-box',
                background: 'var(--bg-surface-elevated)',
                border: `1.5px solid ${isProgressionRoute ? 'var(--accent-amber)' : rank.color}`,
                padding: '0 12px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: '800', color: rank.color }}>
                {t('level_prefix')}{rank.level}
              </span>
              <span style={{ color: 'var(--border-card)' }}>•</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-main)' }}>
                {profile.xp} {t('xp_label')}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', transform: profileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }}>▼</span>
            </button>

            {profileOpen && (
              <div className="nav-dropdown-menu dropdown-right" style={{ left: 'auto', right: 0, width: '260px' }}>
                <div style={{ padding: '8px 12px 6px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '13px', color: rank.color }}>Level {rank.level} {rank.name}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{profile.xp}/{rank.nextXP} XP</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: 'rgba(0,0,0,0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                    <div style={{ width: `${progressPercent}%`, height: '100%', background: rank.color }}></div>
                  </div>
                </div>

                <Link href="/profile" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_trophy')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Lencana & Statistik Akurasi' : lang === 'zh' ? '徽章与准确率战报' : 'Badges & Accuracy Stats'}
                    </div>
                  </div>
                </Link>

                <Link href="/skills" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_skills')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Pohon Keterampilan Kognitif' : lang === 'zh' ? '解锁思维防御分支' : 'Unlock Defense Branches'}
                    </div>
                  </div>
                </Link>

                <Link href="/leaderboard" className="dropdown-item">
                  <div>
                    <strong style={{ fontSize: '13.5px', color: 'var(--text-main)' }}>{t('nav_league')}</strong>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {lang === 'id' ? 'Papan Peringkat Pemuda' : lang === 'zh' ? '全球青年思辨天梯' : 'Youth Leaderboard Ladder'}
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Header Controls (Unified 32px Equal Height & Zero Sound Icon) */}
        <div className="mobile-only-controls" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          
          {/* Mobile Theme Switcher (Height: 32px) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '32px',
              boxSizing: 'border-box',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-card)',
              borderRadius: '6px',
              padding: '2px',
              gap: '1px'
            }}
          >
            <button
              onClick={() => setTheme('light')}
              style={{
                height: '26px',
                padding: '0 5px',
                borderRadius: '4px',
                background: theme === 'light' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'light' ? '#D97706' : 'var(--text-muted)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              title="Light"
            >
              <Sun size={13} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => setTheme('dark')}
              style={{
                height: '26px',
                padding: '0 5px',
                borderRadius: '4px',
                background: theme === 'dark' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'dark' ? 'var(--accent-blue-light)' : 'var(--text-muted)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              title="Dark"
            >
              <Moon size={13} strokeWidth={2.2} />
            </button>
            <button
              onClick={() => setTheme('system')}
              style={{
                height: '26px',
                padding: '0 5px',
                borderRadius: '4px',
                background: theme === 'system' ? 'var(--bg-surface)' : 'transparent',
                color: theme === 'system' ? 'var(--text-main)' : 'var(--text-muted)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              title="System"
            >
              <Monitor size={13} strokeWidth={2.2} />
            </button>
          </div>

          {/* Mobile Language Selector (Height: 32px) */}
          <div className="nav-dropdown-wrapper" ref={langMobileRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              style={{
                height: '32px',
                boxSizing: 'border-box',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-main)',
                padding: '0 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '800',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Globe size={13} strokeWidth={2.2} style={{ color: 'var(--text-secondary)' }} />
              <span>{activeLangObj.code.toUpperCase()}</span>
            </button>

            {langOpen && (
              <div className="nav-dropdown-menu dropdown-right" style={{ left: 'auto', right: 0, width: '160px' }}>
                {SUPPORTED_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setLanguage(l.code);
                      setLangOpen(false);
                    }}
                    onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                    style={{
                      background: l.code === lang ? 'var(--bg-surface-elevated)' : 'transparent',
                      color: l.code === lang ? 'var(--accent-blue)' : 'var(--text-main)',
                      border: 'none',
                      textAlign: 'left',
                      padding: '6px 10px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12.5px',
                      fontWeight: l.code === lang ? '800' : '500',
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{l.native}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{l.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Profile XP (Height: 32px) */}
          <Link href="/profile" style={{ textDecoration: 'none' }}>
            <div
              style={{
                height: '32px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                background: 'var(--bg-surface-elevated)',
                border: `1px solid ${rank.color}`,
                padding: '0 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '800',
                color: 'var(--text-main)'
              }}
            >
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
            <span className="mobile-nav-label">{lang === 'id' ? 'Simulasi' : lang === 'zh' ? '模拟体验' : 'Simulations'}</span>
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
            <span className="mobile-nav-label">{lang === 'id' ? 'Pendidik & Kodeks' : lang === 'zh' ? '教学与图鉴' : 'Educators & Codex'}</span>
            <div className="mobile-nav-grid">
              <Link href="/#codex" className="mobile-nav-item">{t('nav_codex')}</Link>
              <Link href="/classroom" className="mobile-nav-item">{t('nav_classroom')}</Link>
              <Link href="/educator" className="mobile-nav-item">{lang === 'id' ? 'RPP Guru' : lang === 'zh' ? '教师教案' : 'Lesson Plans'}</Link>
              <Link href="/extension" className="mobile-nav-item">{t('nav_extension')}</Link>
            </div>
          </div>

          <div className="mobile-nav-section">
            <span className="mobile-nav-label">{lang === 'id' ? 'Perkembangan' : lang === 'zh' ? '个人进阶' : 'Progression'}</span>
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
