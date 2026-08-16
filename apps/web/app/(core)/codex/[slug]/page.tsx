'use client';

import { use, useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fallacies, FALLACY_ILLUSTRATIONS, idToSlug, slugToId } from '@verilens/shared';
import { useTranslation } from '../../../../lib/i18n';

export default function FallacyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [instagramFeedback, setInstagramFeedback] = useState(false);

  const imageSrc = `/assets/images/fallacies/${rawFallacy.id}.jpg`;
  const svgIllustration = (FALLACY_ILLUSTRATIONS && FALLACY_ILLUSTRATIONS[rawFallacy.id]) || '';

  const prevIndex = (fallacyIndex - 1 + fallacies.length) % fallacies.length;
  const nextIndex = (fallacyIndex + 1) % fallacies.length;
  const prevFallacy = getLocalizedFallacy(fallacies[prevIndex]);
  const nextFallacy = getLocalizedFallacy(fallacies[nextIndex]);
  const prevSlug = idToSlug(fallacies[prevIndex].id);
  const nextSlug = idToSlug(fallacies[nextIndex].id);

  // 5 Real-World Case Studies
  const caseStudies = useMemo(() => {
    return rawFallacy.case_studies || [];
  }, [rawFallacy]);

  // Clean, organic, non-branded share URLs
  const canonicalUrl = `https://verilens.aprilwang.id/codex/${idToSlug(rawFallacy.id)}`;
  const shareHeadline = `How to spot and debunk the "${fallacy.name}" (${fallacy.subtitle}) fallacy`;
  const shareTextWithUrl = `${shareHeadline} — Explore 5 case studies & breakdown: ${canonicalUrl}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTextWithUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareHeadline)}&url=${encodeURIComponent(canonicalUrl)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(shareHeadline)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;

  // Hybrid Share Handler: Native System Share on Mobile + Modal on Desktop
  const handleOpenShare = async () => {
    const isMobile = typeof navigator !== 'undefined' && /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent || '');
    if (isMobile && navigator?.share) {
      try {
        await navigator.share({
          title: `${fallacy.name} (${fallacy.subtitle})`,
          text: `Spot and debunk the "${fallacy.name}" fallacy — 5 case studies & breakdown:`,
          url: canonicalUrl
        });
        return;
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setIsShareModalOpen(true);
        }
        return;
      }
    }
    setIsShareModalOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(canonicalUrl);
      } else {
        const input = document.createElement('textarea');
        input.value = canonicalUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      setIsCopied(false);
    }
  };

  const handleInstagramShare = async () => {
    await handleCopyLink();
    setInstagramFeedback(true);
    setTimeout(() => setInstagramFeedback(false), 5000);
  };

  // Close share modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsShareModalOpen(false);
      }
    };
    if (isShareModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isShareModalOpen]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', paddingBottom: '80px' }}>
      {/* Top Breadcrumb & Actions Bar */}
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
            <button
              onClick={handleOpenShare}
              className="btn btn-outline"
              style={{
                padding: '6px 14px',
                fontSize: '12.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderColor: 'var(--accent-blue-light)',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
              title="Share this Card on WhatsApp, Instagram, X, LinkedIn, Telegram"
            >
              <span style={{ color: 'var(--accent-blue-light)', fontWeight: '900' }}>↗</span>
              <span>{t('codex_share_btn')}</span>
            </button>
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

          {/* Right Column: Card Breakdown & Taxonomy Data */}
          <div>
            {/* Header Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
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
            </div>

            {/* Title & Subtitle */}
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.15', marginBottom: '8px' }}>
              {fallacy.name}
            </h1>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '18px' }}>
              {fallacy.subtitle}
            </div>

            {/* Core Definition Card */}
            <div className="card" style={{ padding: '20px', marginBottom: '24px', borderLeft: `4px solid ${fallacy.color || 'var(--accent-red)'}` }}>
              <p style={{ fontSize: '15px', color: 'var(--text-main)', lineHeight: '1.55', fontWeight: '500' }}>
                {fallacy.description}
              </p>
            </div>

            {/* Primary Action Button (Single, full-width, clean) */}
            <div>
              <Link
                href={`/sandbox?sample=${encodeURIComponent(fallacy.name)}`}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px 24px',
                  fontSize: '14.5px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  textDecoration: 'none'
                }}
              >
                <span>{t('codex_dossier_try_sandbox_btn')}</span>
                <span>➔</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Section 1: Cognitive Mechanism & Psychology */}
        <section style={{ marginTop: '48px' }}>
          <div className="card" style={{ padding: '28px', background: 'var(--bg-surface)', borderLeft: `4px solid ${fallacy.color || 'var(--accent-purple)'}` }}>
            <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--accent-purple)', letterSpacing: '0.08em' }}>
              Psychological Anatomy
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '12px' }}>
              {t('codex_dossier_psychology_title')}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              {fallacy.psychology}
            </p>
          </div>
        </section>

        {/* Section 2: 5 Real-World Case Studies & Field Deconstructions */}
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

        {/* Footnote: UNESCO MIL Standard Reference */}
        {fallacy.mil_competency && (
          <div
            style={{
              marginTop: '44px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Curriculum Standard:
              </span>
              <span>UNESCO Global Media & Information Literacy (MIL) — {fallacy.mil_competency}</span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Open Cognitive Defense Framework
            </span>
          </div>
        )}

        {/* Section 3: Adjacent Archetype Navigation Bar */}
        <section style={{ marginTop: '28px', paddingTop: '28px', borderTop: '1px solid var(--border-subtle)' }}>
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

      {/* Interactive Social Share Modal */}
      {isShareModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '16px'
          }}
          onClick={() => setIsShareModalOpen(false)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '480px',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.5)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                  {t('share_modal_title')}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  {t('share_modal_desc')}
                </p>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '20px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Fallacy Mini Card Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px'
              }}
            >
              <img
                src={imageSrc}
                alt={fallacy.name}
                style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {fallacy.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--accent-amber)', fontWeight: '600' }}>
                  {fallacy.subtitle}
                </div>
              </div>
            </div>

            {/* Social Share Channels Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#25D366',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '800',
                  transition: 'opacity 0.15s ease'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Instagram (Copy Link for Bio / Stories) */}
              <button
                onClick={handleInstagramShare}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </button>

              {/* X / Twitter */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#0F1419',
                  border: '1px solid var(--border-card)',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '800'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '900' }}>𝕏</span>
                <span>X / Twitter</span>
              </a>

              {/* Telegram */}
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#24A1DE',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '800'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
                </svg>
                <span>Telegram</span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#0A66C2',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '800'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: '#1877F2',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: '800'
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>

            {/* Instagram Link Sticker Tip Feedback */}
            {instagramFeedback && (
              <div
                style={{
                  padding: '10px 12px',
                  background: 'rgba(221, 42, 123, 0.15)',
                  border: '1px solid rgba(221, 42, 123, 0.4)',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  color: 'var(--text-main)',
                  marginBottom: '16px',
                  fontWeight: '600',
                  lineHeight: '1.4'
                }}
              >
                ✓ {t('share_instagram_tip')}
              </div>
            )}

            {/* Direct Canonical Link Copy Field */}
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                {t('share_copy_link')}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  readOnly
                  value={canonicalUrl}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-card)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    fontSize: '12.5px',
                    outline: 'none'
                  }}
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={handleCopyLink}
                  className="btn btn-primary"
                  style={{ padding: '8px 14px', fontSize: '12.5px', fontWeight: '800', cursor: 'pointer', whiteSpace: 'nowrap' }}
                >
                  {isCopied ? t('share_link_copied') : t('share_copy_link')}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
