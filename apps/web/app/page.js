'use client';

import { useState } from 'react';
import Link from 'next/link';
import fallaciesData from '../lib/shared/fallacies.json';
import { FALLACY_ILLUSTRATIONS } from '../lib/shared/illustrations.js';
import { recordCardFlipped } from '../lib/gamification.js';
import { useTranslation, INDONESIAN_FALLACIES } from '../lib/i18n.js';

export default function HomePage() {
  const { t, lang } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCardId, setFlippedCardId] = useState(null);

  const categories = ['All', 'Logic', 'Emotional', 'Attribution', 'Cognitive', 'Scam'];
  const categoryLabels = {
    All: t('cat_all'),
    Logic: t('cat_logic'),
    Emotional: t('cat_emotional'),
    Attribution: t('cat_attribution'),
    Cognitive: t('cat_cognitive'),
    Scam: t('cat_scam')
  };

  const filteredFallacies = fallaciesData.fallacies.filter((item) => {
    const idData = INDONESIAN_FALLACIES[item.id] || {};
    const name = lang === 'id' && idData.name ? idData.name : item.name;
    const desc = lang === 'id' && idData.description ? idData.description : item.description;
    const sub = lang === 'id' && idData.subtitle ? idData.subtitle : item.subtitle;

    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFlip = (id) => {
    setFlippedCardId(flippedCardId === id ? null : id);
    recordCardFlipped(id);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '40px 0 30px', textAlign: 'center', background: 'radial-gradient(ellipse at top, #141E33 0%, #080C16 70%)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', fontSize: '11.5px', fontWeight: '700', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '14px' }}>
            <span>{t('hackathon_badge')}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(26px, 5.5vw, 42px)', fontWeight: '900', letterSpacing: '-0.8px', lineHeight: '1.2', marginBottom: '14px', color: '#FFFFFF' }}>
            {t('hero_title')}
          </h1>

          <p style={{ fontSize: 'clamp(14px, 3.5vw, 17px)', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '24px', maxWidth: '720px', margin: '0 auto 24px' }}>
            {t('hero_desc')}
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/arena" className="btn btn-amber" style={{ padding: '10px 18px', fontSize: '14px' }}>
              {t('hero_cta_arena')}
            </Link>
            <Link href="/gauntlet" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '14px', background: '#DC2626', borderColor: '#EF4444' }}>
              {t('hero_cta_gauntlet')}
            </Link>
            <Link href="/skills" className="btn btn-outline" style={{ padding: '10px 18px', fontSize: '14px' }}>
              {t('hero_cta_skills')}
            </Link>
            <Link href="/extension" className="btn btn-outline" style={{ padding: '10px 16px', fontSize: '14px' }}>
              {t('hero_cta_extension')}
            </Link>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-amber)' }}>12</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>{t('metrics_archetypes')}</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-blue-light)' }}>SIFT</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>{t('metrics_framework')}</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-emerald-light)' }}>&lt; 300ms</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>{t('metrics_latency')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Module 1: The Interactive Fallacy Codex */}
      <section style={{ padding: '40px 0' }} id="codex">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-amber)' }}>{t('codex_badge')}</span>
              <h2 style={{ fontSize: 'clamp(22px, 4.5vw, 28px)', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>
                {t('codex_title')}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>
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
                style={{ width: '100%', padding: '9px 12px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
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
                  padding: '5px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
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
              const svgIllustration = FALLACY_ILLUSTRATIONS[item.id] || '';
              
              const idData = INDONESIAN_FALLACIES[item.id] || {};
              const fallacyName = lang === 'id' && idData.name ? idData.name : item.name;
              const fallacySubtitle = lang === 'id' && idData.subtitle ? idData.subtitle : item.subtitle;
              const fallacyDescription = lang === 'id' && idData.description ? idData.description : item.description;
              const fallacyViralExample = lang === 'id' && idData.viral_example ? idData.viral_example : item.viral_example;
              const fallacyPrompt = lang === 'id' && idData.reflection_prompt ? idData.reflection_prompt : item.reflection_prompt;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleFlip(item.id)}
                  style={{
                    perspective: '1000px',
                    minHeight: '380px',
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
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-card)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'hidden'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div
                            style={{ width: '74px', height: '74px', borderRadius: '12px', background: 'var(--bg-surface-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                            dangerouslySetInnerHTML={{ __html: svgIllustration }}
                          />
                          <span style={{ fontSize: '10.5px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: item.color, textTransform: 'uppercase' }}>
                            {item.category}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', marginBottom: '2px' }}>
                          {fallacyName}
                        </h3>
                        <div style={{ fontSize: '11.5px', fontWeight: '600', color: 'var(--accent-amber)', marginBottom: '8px' }}>
                          {fallacySubtitle}
                        </div>

                        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '10px' }}>
                          {fallacyDescription}
                        </p>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--accent-blue-light)', fontWeight: '600' }}>
                        <span>{t('card_tap_front')}</span>
                        <span>➔</span>
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: 'var(--bg-surface-elevated)',
                        border: `1.5px solid ${item.color}`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '18px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflowY: 'auto'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{fallacyName}</strong>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{t('card_tap_back')}</span>
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '9.5px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>{t('card_viral_scenario')}</span>
                          <div style={{ fontSize: '11.5px', fontStyle: 'italic', background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', marginTop: '2px', color: '#E2E8F0' }}>
                            {fallacyViralExample}
                          </div>
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '9.5px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase' }}>{t('card_reflection')}</span>
                          <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                            {fallacyPrompt}
                          </p>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.mil_competency}</span>
                        <Link
                          href={`/sandbox?sample=${encodeURIComponent(fallacyName)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-primary"
                          style={{ padding: '4px 8px', fontSize: '10.5px' }}
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
