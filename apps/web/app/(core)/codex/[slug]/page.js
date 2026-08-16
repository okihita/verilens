'use client';

import { use, useState, useMemo } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fallacies, FALLACY_ILLUSTRATIONS, idToSlug, slugToId } from '@verilens/shared';
import { useTranslation } from '../../../../lib/i18n';

export default function FallacyDossierPage({ params }) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.slug;
  const targetId = slugToId(rawSlug);

  const fallacyIndex = fallacies.findIndex(f => f.id === targetId || f.id === rawSlug);
  if (fallacyIndex === -1) {
    notFound();
  }

  const rawFallacy = fallacies[fallacyIndex];
  const { t, lang, getLocalizedFallacy } = useTranslation();
  const fallacy = getLocalizedFallacy(rawFallacy);

  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeCaseStudyTab, setActiveCaseStudyTab] = useState(0);

  const imageSrc = `/assets/images/fallacies/${rawFallacy.id}.jpg`;
  const svgIllustration = (FALLACY_ILLUSTRATIONS && FALLACY_ILLUSTRATIONS[rawFallacy.id]) || '';

  const prevIndex = (fallacyIndex - 1 + fallacies.length) % fallacies.length;
  const nextIndex = (fallacyIndex + 1) % fallacies.length;
  const prevFallacy = getLocalizedFallacy(fallacies[prevIndex]);
  const nextFallacy = getLocalizedFallacy(fallacies[nextIndex]);
  const prevSlug = idToSlug(fallacies[prevIndex].id);
  const nextSlug = idToSlug(fallacies[nextIndex].id);

  // Allegorical Anatomy symbols
  const allegoricalSymbols = useMemo(() => {
    return rawFallacy.allegorical_symbols || [
      {
        title: 'The Central Allegorical Motif',
        desc: 'A singular Renaissance metaphor codifying this cognitive vulnerability into an enduring visual emblem.'
      },
      {
        title: 'Chiaroscuro Illumination',
        desc: 'Dramatic contrast of light and shadow illustrating empirical truth piercing through rhetorical deception.'
      },
      {
        title: 'The Stone Plinth of Truth',
        desc: 'The unyielding foundation of lateral cross-referencing and verification.'
      }
    ];
  }, [rawFallacy]);

  // 5 Case Studies
  const caseStudies = useMemo(() => {
    return rawFallacy.case_studies || [];
  }, [rawFallacy]);

  // WhatsApp share text & link
  const currentUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://verilens.aprilwang.id/codex/${idToSlug(rawFallacy.id)}`;
    
  const shareText = `VeriLens Codex: Learn how to spot and debunk the "${fallacy.name}" fallacy (${fallacy.subtitle}): ${currentUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', paddingBottom: '80px' }}>
      {/* Top Breadcrumb Header Bar */}
      <section style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', padding: '16px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600' }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/#codex" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '600' }}>
              {t('codex_dossier_breadcrumb')}
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--text-main)', fontWeight: '800' }}>
              {fallacy.name}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{
                padding: '6px 14px',
                fontSize: '12.5px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderColor: '#25D366',
                color: 'var(--text-main)'
              }}
              title="Share on WhatsApp"
            >
              <span style={{ color: '#25D366', fontWeight: '900' }}>●</span>
              <span>{t('codex_share_whatsapp')}</span>
            </a>
            <Link
              href="/#codex"
              className="btn btn-outline"
              style={{ padding: '6px 14px', fontSize: '12.5px', textDecoration: 'none' }}
            >
              ← {t('codex_dossier_back_btn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Exhibition Stage */}
      <div className="container" style={{ maxWidth: '1100px', marginTop: '36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', alignItems: 'start' }}>
          
          {/* Left Column: Grand Artwork Exhibition */}
          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: `2px solid ${fallacy.color ? fallacy.color + '60' : 'var(--border-card)'}`,
                boxShadow: '0 12px 36px -8px rgba(0, 0, 0, 0.35)',
                background: 'var(--bg-surface-elevated)',
                aspectRatio: '1 / 1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'zoom-in'
              }}
              onClick={() => setIsZoomed(!isZoomed)}
              title="Click to zoom artwork"
            >
              {!imageError ? (
                <img
                  src={imageSrc}
                  alt={`${fallacy.name} Renaissance Allegorical Fresco`}
                  onError={() => setImageError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transform: isZoomed ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform 0.4s ease'
                  }}
                />
              ) : svgIllustration ? (
                <div
                  style={{ width: '60%', height: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  dangerouslySetInnerHTML={{ __html: svgIllustration }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <span style={{ fontSize: '48px', fontWeight: '900', color: fallacy.color }}>
                    {fallacy.name.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Executive Dossier & Taxonomy Data */}
          <div>
            {/* Header Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: fallacy.color ? fallacy.color + '20' : 'rgba(255,255,255,0.06)',
                  color: fallacy.color || 'var(--accent-red)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                {fallacy.category}
              </span>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-muted)' }}>
                {t('codex_dossier_archetype_label')} #{String(fallacyIndex + 1).padStart(2, '0')} / {fallacies.length}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.15', marginBottom: '8px' }}>
              {fallacy.name}
            </h1>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '18px' }}>
              {fallacy.subtitle}
            </div>

            {/* Core Definition Card */}
            <div className="card" style={{ padding: '20px', marginBottom: '20px', borderLeft: `4px solid ${fallacy.color || 'var(--accent-red)'}` }}>
              <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: '1.55', fontWeight: '500' }}>
                {fallacy.description}
              </p>
            </div>

            {/* UNESCO Law Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'var(--bg-surface)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '0.08em' }}>
                UNESCO MIL
              </span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '600' }}>
                {fallacy.mil_competency}
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/sandbox?sample=${encodeURIComponent(fallacy.name)}`}
                className="btn btn-primary"
                style={{
                  flex: '1 1 200px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none'
                }}
              >
                <span>{t('codex_dossier_try_sandbox_btn')}</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Section 1: Allegorical Symbolism & Anatomy */}
        <section style={{ marginTop: '56px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>
              {t('codex_dossier_allegorical_title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('codex_dossier_allegorical_desc')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
            {allegoricalSymbols.map((sym, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '20px',
                  background: 'var(--bg-surface)',
                  borderTop: `3px solid ${fallacy.color || 'var(--accent-amber)'}`
                }}
              >
                <div style={{ fontSize: '12px', fontWeight: '800', color: fallacy.color || 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Symbol #{idx + 1}
                </div>
                <h3 style={{ fontSize: '16.5px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '6px' }}>
                  {sym.title}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {sym.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Cognitive Mechanism & Psychology */}
        <section style={{ marginTop: '48px' }}>
          <div className="card" style={{ padding: '28px', background: 'var(--bg-surface)' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-purple)', letterSpacing: '0.08em' }}>
              Psychological Anatomy
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '12px' }}>
              {t('codex_dossier_psychology_title')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {fallacy.psychology}
            </p>
          </div>
        </section>

        {/* Section 3: 5 Real-World Case Studies & Field Deconstructions */}
        <section style={{ marginTop: '48px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '4px' }}>
              {t('codex_case_studies_title')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              {t('codex_case_studies_desc')}
            </p>
          </div>

          {/* Case Study Tab Selectors */}
          {caseStudies.length > 0 && (
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', overflowX: 'auto', paddingBottom: '4px', WebkitOverflowScrolling: 'touch' }}>
                {caseStudies.map((cs, idx) => (
                  <button
                    key={cs.id || idx}
                    onClick={() => setActiveCaseStudyTab(idx)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '800',
                      border: '1px solid',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease',
                      borderColor: activeCaseStudyTab === idx ? 'var(--accent-blue-light)' : 'var(--border-card)',
                      background: activeCaseStudyTab === idx ? 'var(--accent-blue)' : 'var(--bg-surface)',
                      color: activeCaseStudyTab === idx ? '#FFFFFF' : 'var(--text-secondary)'
                    }}
                  >
                    Case {idx + 1}: {cs.domain}
                  </button>
                ))}
              </div>

              {/* Active Case Study Card */}
              {caseStudies[activeCaseStudyTab] && (
                <div
                  className="card"
                  style={{
                    padding: '28px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-card)',
                    borderLeft: `4px solid ${fallacy.color || 'var(--accent-blue)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-blue-light)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {caseStudies[activeCaseStudyTab].domain}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>
                      Case Study {activeCaseStudyTab + 1} of {caseStudies.length}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>
                    {caseStudies[activeCaseStudyTab].title}
                  </h3>

                  {/* Deceptive Claim Box */}
                  <div
                    style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderLeft: '4px solid var(--accent-red)',
                      padding: '16px 20px',
                      borderRadius: '8px',
                      marginBottom: '16px'
                    }}
                  >
                    <div style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--accent-red)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {t('codex_claim_label')}
                    </div>
                    <p style={{ fontSize: '15px', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: '1.5', margin: 0 }}>
                      {caseStudies[activeCaseStudyTab].claim}
                    </p>
                  </div>

                  {/* Manipulative Deconstruction */}
                  <div style={{ background: 'var(--bg-surface)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '14px' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {t('codex_deconstruction_label')}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
                      {caseStudies[activeCaseStudyTab].deconstruction}
                    </p>
                  </div>

                  {/* SIFT Lateral Correction */}
                  <div style={{ background: 'var(--bg-surface)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {t('codex_correction_label')}
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.55', margin: 0, fontWeight: '600' }}>
                      {caseStudies[activeCaseStudyTab].correction}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Section 4: SIFT Lateral Defense Protocol */}
        <section style={{ marginTop: '48px' }}>
          <div className="card" style={{ padding: '28px', background: 'var(--bg-surface)', borderLeft: '4px solid var(--accent-blue)' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-blue)', letterSpacing: '0.08em' }}>
              Stanford SHEG Framework
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '12px' }}>
              {t('codex_dossier_sift_title')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: '1.6', fontWeight: '600' }}>
              {fallacy.sift_strategy}
            </p>
          </div>
        </section>

        {/* Section 5: Adjacent Navigation Bar */}
        <section style={{ marginTop: '56px', paddingTop: '28px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link
              href={`/codex/${prevSlug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--text-secondary)'
              }}
            >
              <span style={{ fontSize: '20px' }}>←</span>
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('codex_dossier_prev')}
                </div>
                <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-main)' }}>
                  {prevFallacy.name}
                </div>
              </div>
            </Link>

            <Link
              href={`/codex/${nextSlug}`}
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                textAlign: 'right',
                color: 'var(--text-secondary)'
              }}
            >
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {t('codex_dossier_next')}
                </div>
                <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-main)' }}>
                  {nextFallacy.name}
                </div>
              </div>
              <span style={{ fontSize: '20px' }}>→</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
