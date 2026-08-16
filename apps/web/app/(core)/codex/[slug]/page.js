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

  const imageSrc = `/assets/images/fallacies/${rawFallacy.id}.jpg`;
  const svgIllustration = (FALLACY_ILLUSTRATIONS && FALLACY_ILLUSTRATIONS[rawFallacy.id]) || '';

  const prevIndex = (fallacyIndex - 1 + fallacies.length) % fallacies.length;
  const nextIndex = (fallacyIndex + 1) % fallacies.length;
  const prevFallacy = getLocalizedFallacy(fallacies[prevIndex]);
  const nextFallacy = getLocalizedFallacy(fallacies[nextIndex]);
  const prevSlug = idToSlug(fallacies[prevIndex].id);
  const nextSlug = idToSlug(fallacies[nextIndex].id);

  // Allegorical Anatomy symbols dictionary
  const allegoricalSymbols = useMemo(() => {
    const symbolMap = {
      ad_hominem: [
        {
          title: 'The Silver Dagger',
          desc: 'Represents the aggressive, malicious strike directed at the person\'s private character rather than addressing the substance of their argument.'
        },
        {
          title: 'The Shattered Mirror',
          desc: 'Symbolizes the distorted perception and public deflection created by personal insults, fracturing objective scrutiny.'
        },
        {
          title: 'The Pristine Truth Codex',
          desc: 'The open illuminated manuscript resting upon the marble altar—radiating calm, empirical truth that remains completely unread and ignored by the attacker.'
        }
      ],
      false_dilemma: [
        {
          title: 'The Blazing Monolith (Ignis)',
          desc: 'The catastrophic extreme manufactured to induce panic and force an artificial decision.'
        },
        {
          title: 'The Glacial Monolith (Glacies)',
          desc: 'The rigid, opposite extreme that erases all nuanced third alternatives and middle grounds.'
        },
        {
          title: 'The Golden Olive Pathway',
          desc: 'The sunlit, tranquil path of reasoned compromise and complex reality opening right between the artificial extremes.'
        }
      ],
      ad_metum: [
        {
          title: 'The Luminous Celestial Sphere',
          desc: 'The steady, verifiable laws of reality and factual consensus projecting peaceful, predictable orbits.'
        },
        {
          title: 'The Storm Claw & Smoking Torch',
          desc: 'The apocalyptic smoke used by demagogues to trigger instinctual fight-or-flight panic and bypass logical scrutiny.'
        }
      ]
    };

    return symbolMap[rawFallacy.id] || [
      {
        title: 'The Central Allegorical Motif',
        desc: 'A singular Renaissance metaphor codifying the cognitive vulnerability into an enduring visual emblem.'
      },
      {
        title: 'Chiaroscuro Illumination',
        desc: 'Light rays symbolizing empirical evidence piercing through shadowy clouds of rhetorical manipulation.'
      }
    ];
  }, [rawFallacy.id]);

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

          <Link
            href="/#codex"
            className="btn btn-outline"
            style={{ padding: '6px 14px', fontSize: '12.5px', textDecoration: 'none' }}
          >
            ← {t('codex_dossier_back_btn')}
          </Link>
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
              title="Click to view full resolution artwork"
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

              {/* Artwork Label Ribbon */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(9, 13, 26, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                Direction 1: Master Renaissance Emblem
              </div>
            </div>

            {/* Artwork Metadata Caption */}
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
              <span>Style: Raphael & Michelangelo Chiaroscuro</span>
              <span>1:1 High-Resolution Aspect Ratio</span>
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

            {/* 1-Click Sandbox Action */}
            <Link
              href={`/sandbox?sample=${encodeURIComponent(fallacy.name)}`}
              className="btn btn-primary"
              style={{
                width: '100%',
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

        {/* Section 3: Viral Case Study & Media Breakdown */}
        <section style={{ marginTop: '48px' }}>
          <div className="card" style={{ padding: '28px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-red)', letterSpacing: '0.08em' }}>
              Media Inoculation
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '14px' }}>
              {t('codex_dossier_media_title')}
            </h2>

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
                Viral Claim Example
              </div>
              <p style={{ fontSize: '15.5px', fontStyle: 'italic', color: 'var(--text-main)', lineHeight: '1.5' }}>
                {fallacy.viral_example}
              </p>
            </div>

            <div style={{ background: 'var(--bg-surface)', padding: '16px 20px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Metacognitive Reflection Question
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {fallacy.reflection_prompt}
              </p>
            </div>
          </div>
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
