'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '../lib/i18n';
import { playComplete, playClick } from '../lib/audio';

export default function CertificateModal({ score, accuracy, mode, onClose }) {
  const { t, lang } = useTranslation();
  const [userName, setUserName] = useState('April Wang');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    playComplete();
  }, []);

  const certId = `VL-${Math.random().toString(36).substring(2, 9).toUpperCase()}-2026`;
  const localeMap = { id: 'id-ID', es: 'es-ES', fr: 'fr-FR', zh: 'zh-CN', en: 'en-US' };
  const dateStr = new Date().toLocaleDateString(localeMap[lang] || 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const getShareText = () => {
    return (t('cert_share_text') || '')
      .replace('{accuracy}', accuracy)
      .replace('{score}', score);
  };

  const handleCopyShare = async () => {
    playClick();
    const text = getShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: t('cert_title'),
          text: text,
          url: 'https://verilens.okihita.dev'
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was cancelled or failed
      }
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0, 0, 0, 0.88)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', overflowY: 'auto' }}>
      <div style={{ background: 'var(--bg-surface)', border: '2px solid var(--accent-amber)', borderRadius: '16px', maxWidth: '780px', width: '100%', padding: '24px 16px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', maxHeight: '90vh', overflowY: 'auto' }}>
        
        {/* Close Button */}
        <button
          onClick={() => { playClick(); onClose(); }}
          style={{ position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '20px', cursor: 'pointer' }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Certificate Container */}
        <div id="printable-certificate" style={{ border: '2px solid rgba(245, 158, 11, 0.4)', borderRadius: '12px', padding: '24px 16px', textAlign: 'center', background: 'var(--bg-surface-elevated)', position: 'relative' }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--accent-amber)' }}>
              {t('cert_badge')}
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(20px, 4.5vw, 26px)', fontWeight: '900', color: 'var(--text-main)', letterSpacing: '-0.5px', marginBottom: '2px' }}>
            {t('cert_title')}
          </h2>
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '16px' }}>
            {t('cert_subtitle')}
          </div>

          <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '2px' }}>
            {t('cert_certifies_that')}
          </div>
          
          {/* Editable Name Field */}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ fontSize: 'clamp(20px, 5vw, 28px)', fontWeight: '900', color: 'var(--accent-amber)', textAlign: 'center', background: 'transparent', border: 'none', borderBottom: '2px dashed rgba(245, 158, 11, 0.5)', outline: 'none', width: '90%', margin: '2px auto 14px', fontFamily: 'serif' }}
          />

          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 18px', lineHeight: '1.5' }}>
            {mode ? <strong>{mode}: </strong> : null}
            {t('cert_body')}
          </p>

          {/* Certificate Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '12px', maxWidth: '500px', margin: '0 auto 16px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                {t('cert_score_label')}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: 'var(--text-main)' }}>{score} {t('xp_label')}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                {t('cert_accuracy_label')}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#10B981' }}>{accuracy}%</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>
                {t('cert_issued_label')}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)', marginTop: '2px' }}>{dateStr}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', maxWidth: '500px', margin: '0 auto', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '6px' }}>
            <span>ID: {certId}</span>
            <span style={{ color: 'var(--accent-amber)', fontWeight: '700' }}>
              {t('cert_verified_by')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
          <button onClick={handlePrint} className="btn btn-amber" style={{ padding: '9px 18px', fontSize: '13.5px' }}>
            {t('cert_print_btn')}
          </button>
          <button onClick={handleCopyShare} className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '13.5px' }}>
            {copied ? t('cert_copied_btn') : t('cert_copy_btn')}
          </button>
          <button onClick={() => { playClick(); onClose(); }} className="btn btn-outline" style={{ padding: '9px 18px', fontSize: '13.5px' }}>
            {t('close_btn') || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
