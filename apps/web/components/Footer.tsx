'use client';

import Link from 'next/link';
import { useTranslation } from '../lib/i18n';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <img
                src="/logo.png"
                alt="VeriLens Logo"
                style={{ height: '24px', width: 'auto', display: 'block' }}
              />
              <strong style={{ color: 'var(--text-main)', fontSize: '15px', fontWeight: '800', letterSpacing: '-0.02em' }}>
                VeriLens Platform
              </strong>
            </div>
            <p style={{ lineHeight: '1.55', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
              {t('footer_desc')}
            </p>
          </div>

          <div className="footer-col">
            <h4>{t('footer_train_title')}</h4>
            <ul>
              <li><Link href="/">{t('nav_codex')}</Link></li>
              <li><Link href="/arena">{t('nav_spotter_arena')}</Link></li>
              <li><Link href="/gauntlet">{t('nav_daily_gauntlet')}</Link></li>
              <li><Link href="/forge">{t('nav_fallacy_forge')}</Link></li>
              <li><Link href="/feed">{t('nav_feed_sim')}</Link></li>
              <li><Link href="/duel">{t('nav_duel')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer_prog_title')}</h4>
            <ul>
              <li><Link href="/skills">{t('nav_skills')}</Link></li>
              <li><Link href="/leaderboard">{t('nav_league')}</Link></li>
              <li><Link href="/profile">{t('nav_trophy')}</Link></li>
              <li><Link href="/classroom">{t('nav_classroom')}</Link></li>
              <li><Link href="/sandbox">{t('nav_sandbox')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>{t('footer_eco_title')}</h4>
            <ul>
              <li><Link href="/educator">{t('nav_educator')}</Link></li>
              <li><Link href="/extension">{t('nav_extension')}</Link></li>
              <li><Link href="/privacy">{t('nav_privacy')}</Link></li>
              <li>
                <a href="https://github.com/okihita/verilens" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('footer_copy')}</span>
          <span>{t('footer_privacy_note')}</span>
        </div>
      </div>
    </footer>
  );
}
