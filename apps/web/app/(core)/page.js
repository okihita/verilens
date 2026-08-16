'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { fallacies, FALLACY_ILLUSTRATIONS, idToSlug } from '@verilens/shared';
import { recordCardFlipped } from '../../lib/gamification';
import { useTranslation } from '../../lib/i18n';
import HeroParallaxBackground from '../../components/HeroParallaxBackground';

function FrescoCardBackdrop({ fallacyId }) {
  const [loaded, setLoaded] = useState(true);
  const imageSrc = `/assets/images/fallacies/${fallacyId}.jpg`;

  if (!loaded) return null;

  return (
    <>
      <div
        className="fallacy-card-fresco-bg"
        style={{
          backgroundImage: `url(${imageSrc})`
        }}
      />
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        style={{ display: 'none' }}
        onError={() => setLoaded(false)}
      />
      <div className="fallacy-card-fresco-scrim" />
    </>
  );
}

export default function HomePage() {
  const { t, lang, getLocalizedFallacy } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCardId, setFlippedCardId] = useState(null);

  const categories = ['ALL', 'Logic', 'Emotional', 'Cognitive', 'Attribution', 'Scam', 'Dialectical'];
  const categoryLabels = {
    'ALL': t('cat_all'),
    'Logic': t('cat_logic'),
    'Emotional': t('cat_emotional'),
    'Cognitive': t('cat_cognitive'),
    'Attribution': t('cat_attribution'),
    'Scam': t('cat_scam'),
    'Dialectical': t('cat_dialectical')
  };

  const localizedFallacies = useMemo(() => {
    return fallacies.map((f) => getLocalizedFallacy(f));
  }, [lang, getLocalizedFallacy]);

  const filteredFallacies = useMemo(() => {
    return localizedFallacies.filter((f) => {
      const matchesCat = selectedCategory === 'ALL' || f.category === selectedCategory;
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [localizedFallacies, selectedCategory, searchQuery]);

  const toggleFlip = (id) => {
    setFlippedCardId(flippedCardId === id ? null : id);
    recordCardFlipped(id);
  };

  return (
    <div>
      {/* Grand Full-Bleed Sistine Fresco Hero Section with Parallax */}
      <section
        style={{
          position: 'relative',
          padding: '104px 0 88px',
          minHeight: '620px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'var(--bg-app)',
          borderBottom: '1px solid var(--border-subtle)',
          overflow: 'hidden'
        }}
      >
        {/* Full-Bleed Colored Sistine Chapel Fresco Background with Scroll Parallax */}
        <HeroParallaxBackground />

        <div className="container" style={{ maxWidth: '880px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ width: '18px', height: '1.5px', background: 'var(--accent-red)', opacity: 0.6 }} />
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-red)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {t('hackathon_badge')}
            </span>
            <span style={{ width: '18px', height: '1.5px', background: 'var(--accent-red)', opacity: 0.6 }} />
          </div>

          <h1 style={{ fontSize: 'clamp(30px, 5.5vw, 46px)', fontWeight: '900', letterSpacing: '-0.035em', lineHeight: '1.18', marginBottom: '16px', color: 'var(--text-main)' }}>
            {t('hero_title')}
          </h1>

          <p style={{ fontSize: 'clamp(15px, 3.5vw, 17.5px)', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '28px', maxWidth: '720px', margin: '0 auto 28px', letterSpacing: '-0.01em' }}>
            {t('hero_desc')}
          </p>

          {/* 2 High-Contrast Action CTAs */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/gauntlet" className="btn btn-amber" style={{ padding: '12px 24px', fontSize: '15px', fontWeight: '800' }}>
              {t('hero_cta_primary')}
            </Link>
            <a href="#codex" className="btn btn-outline" style={{ padding: '12px 20px', fontSize: '15px' }}>
              {t('hero_cta_secondary')}
            </a>
          </div>
        </div>
      </section>

      {/* Slim Consumer Reality Strip (What's at Stake) */}
      <section style={{ background: 'var(--bg-surface-elevated)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', textAlign: 'center' }}>
            <div style={{ padding: '8px 12px' }}>
              <div style={{ fontSize: '17px', fontWeight: '900', color: 'var(--accent-red)', letterSpacing: '-0.02em' }}>
                {t('stat_faster_title')}
              </div>
              <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                {t('stat_faster_desc')}
              </div>
            </div>

            <div style={{ padding: '8px 12px', borderLeft: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '17px', fontWeight: '900', color: 'var(--accent-amber)', letterSpacing: '-0.02em' }}>
                {t('stat_window_title')}
              </div>
              <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                {t('stat_window_desc')}
              </div>
            </div>

            <div style={{ padding: '8px 12px', borderLeft: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '17px', fontWeight: '900', color: 'var(--accent-emerald)', letterSpacing: '-0.02em' }}>
                {t('stat_local_title')}
              </div>
              <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                {t('stat_local_desc')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Guided Learning Pathway */}
      <section style={{ padding: '32px 0 20px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            
            {/* Step 1 */}
            <a href="#codex" className="card" style={{ padding: '20px', textDecoration: 'none', borderLeft: '3px solid var(--accent-amber)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="mono-tag" style={{ color: 'var(--accent-amber)', fontSize: '12px' }}>
                  {t('step1_badge')}
                </span>
                <h3 style={{ fontSize: '16.5px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '6px' }}>
                  {t('step1_title')}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                  {t('step1_desc')}
                </p>
              </div>
              <div style={{ marginTop: '14px', fontSize: '13px', fontWeight: '700', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{t('step1_action')}</span>
              </div>
            </a>

            {/* Step 2 */}
            <Link href="/gauntlet" className="card" style={{ padding: '20px', textDecoration: 'none', borderLeft: '3px solid var(--accent-red)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="mono-tag" style={{ color: 'var(--accent-red)', fontSize: '12px' }}>
                  {t('step2_badge')}
                </span>
                <h3 style={{ fontSize: '16.5px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '6px' }}>
                  {t('step2_title')}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                  {t('step2_desc')}
                </p>
              </div>
              <div style={{ marginTop: '14px', fontSize: '13px', fontWeight: '700', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{t('step2_action')}</span>
                <span>➔</span>
              </div>
            </Link>

            {/* Step 3 */}
            <Link href="/sandbox" className="card" style={{ padding: '20px', textDecoration: 'none', borderLeft: '3px solid var(--accent-blue)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="mono-tag" style={{ color: 'var(--accent-blue)', fontSize: '12px' }}>
                  {t('step3_badge')}
                </span>
                <h3 style={{ fontSize: '16.5px', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px', marginBottom: '6px' }}>
                  {t('step3_title')}
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                  {t('step3_desc')}
                </p>
              </div>
              <div style={{ marginTop: '14px', fontSize: '13px', fontWeight: '700', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>{t('step3_action')}</span>
                <span>➔</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Flagship Module: The Interactive Fallacy Codex */}
      <section style={{ padding: '40px 0' }} id="codex">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-amber)' }}>{t('codex_badge')}</span>
              <h2 style={{ fontSize: 'clamp(22px, 4.5vw, 28px)', fontWeight: '900', color: 'var(--text-main)', marginTop: '2px' }}>
                {t('codex_title')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '2px' }}>
                {t('codex_desc')}
              </p>
            </div>

            {/* Search Input */}
            <div style={{ width: '100%', maxWidth: '300px' }}>
              <input
                type="text"
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: 'var(--text-main)', fontSize: '14px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Horizontally Scrollable Category Filter Pills for Mobile */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px', WebkitOverflowScrolling: 'touch' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '700',
                  border: '1px solid',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                  borderColor: selectedCategory === cat ? 'var(--accent-blue-light)' : 'var(--border-card)',
                  background: selectedCategory === cat ? 'var(--accent-blue)' : 'var(--bg-surface)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)'
                }}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {/* Fallacy Card Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {filteredFallacies.map((item) => {
              const isFlipped = flippedCardId === item.id;
              const svgIllustration = (FALLACY_ILLUSTRATIONS && FALLACY_ILLUSTRATIONS[item.id]) || '';
              
              const fallacyName = item.name;
              const fallacySubtitle = item.subtitle;
              const fallacyDescription = item.description;
              const fallacyViralExample = item.viral_example;
              const fallacyPrompt = item.reflection_prompt;

              return (
                <div
                  key={item.id}
                  className="fallacy-card-flip-wrapper"
                  onClick={() => toggleFlip(item.id)}
                  style={{
                    perspective: '1000px',
                    minHeight: '390px',
                    cursor: 'pointer'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'none'
                    }}
                  >
                    {/* Front Face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-card)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'hidden',
                        pointerEvents: isFlipped ? 'none' : 'auto',
                        zIndex: isFlipped ? 1 : 2
                      }}
                    >
                      {/* Washed Renaissance Fresco Canvas & Atmospheric Scrim */}
                      <FrescoCardBackdrop fallacyId={item.id} />

                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div
                            style={{
                              width: '74px',
                              height: '74px',
                              borderRadius: '12px',
                              background: 'var(--bg-surface-elevated)',
                              border: `1.5px solid ${item.color ? item.color + '40' : 'var(--border-card)'}`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '2px',
                              overflow: 'hidden',
                              flexShrink: 0
                            }}
                          >
                            <img
                              src={`/assets/images/fallacies/${item.id}.jpg`}
                              alt={fallacyName}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '10px'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                if (e.currentTarget.nextSibling) {
                                  e.currentTarget.nextSibling.style.display = 'flex';
                                }
                              }}
                            />
                            {svgIllustration ? (
                              <div
                                style={{ width: '100%', height: '100%', display: 'none', alignItems: 'center', justifyContent: 'center' }}
                                dangerouslySetInnerHTML={{ __html: svgIllustration }}
                              />
                            ) : (
                              <div style={{ textAlign: 'center', display: 'none' }}>
                                <span style={{ fontSize: '15px', fontWeight: '900', color: item.color, letterSpacing: '-0.02em', display: 'block' }}>
                                  {fallacyName ? fallacyName.substring(0, 2).toUpperCase() : 'VL'}
                                </span>
                                <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)' }}>
                                  #{String(fallacies.findIndex(f => f.id === item.id) + 1).padStart(2, '0')}
                                </span>
                              </div>
                            )}
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: item.color, textTransform: 'uppercase' }}>
                            {item.category}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '2px' }}>
                          {fallacyName}
                        </h3>
                        <div style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--accent-amber)', marginBottom: '8px' }}>
                          {fallacySubtitle}
                        </div>

                        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '10px' }}>
                          {fallacyDescription}
                        </p>
                      </div>

                      <div style={{ position: 'relative', zIndex: 3, borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12.5px' }}>
                        <span style={{ color: 'var(--text-muted)', fontSize: '11.5px', fontWeight: '600' }}>
                          {t('card_tap_front')} ➔
                        </span>
                        <Link
                          href={`/codex/${idToSlug(item.id)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-outline"
                          style={{ padding: '3px 8px', fontSize: '11px', textDecoration: 'none', fontWeight: '700', cursor: 'pointer', position: 'relative', zIndex: 10 }}
                        >
                          {t('card_view_dossier')}
                        </Link>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'var(--bg-surface-elevated)',
                        border: `1.5px solid ${item.color}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflowY: 'auto',
                        pointerEvents: isFlipped ? 'auto' : 'none',
                        zIndex: isFlipped ? 2 : 1
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <strong style={{ fontSize: '15px', color: 'var(--text-main)' }}>{fallacyName}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('card_tap_back')}</span>
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>{t('card_viral_scenario')}</span>
                          <div style={{ fontSize: '12.5px', fontStyle: 'italic', background: 'rgba(0,0,0,0.15)', padding: '6px 8px', borderRadius: '6px', marginTop: '2px', color: 'var(--text-main)' }}>
                            {fallacyViralExample}
                          </div>
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase' }}>{t('card_reflection')}</span>
                          <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                            {fallacyPrompt}
                          </p>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 10 }}>
                        <Link
                          href={`/codex/${idToSlug(item.id)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-outline"
                          style={{ padding: '4px 8px', fontSize: '11px', textDecoration: 'none', fontWeight: '700', cursor: 'pointer' }}
                        >
                          {t('card_view_dossier')}
                        </Link>
                        <Link
                          href={`/sandbox?sample=${encodeURIComponent(fallacyName)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-primary"
                          style={{ padding: '4px 8px', fontSize: '11px', textDecoration: 'none', cursor: 'pointer' }}
                        >
                          {t('card_sandbox_btn')}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
