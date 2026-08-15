'use client';

import { useState } from 'react';
import Link from 'next/link';
import fallaciesData from '../lib/shared/fallacies.json';
import { FALLACY_ILLUSTRATIONS } from '../lib/shared/illustrations.js';
import { recordCardFlipped } from '../lib/gamification.js';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [flippedCardId, setFlippedCardId] = useState(null);

  const categories = ['All', 'Logic', 'Emotional', 'Attribution', 'Cognitive', 'Scam'];

  const filteredFallacies = fallaciesData.fallacies.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
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
            <span>⚡ UNESCO Global MIL Youth Hackathon 2026</span>
          </div>

          <h1 style={{ fontSize: 'clamp(26px, 5.5vw, 42px)', fontWeight: '900', letterSpacing: '-0.8px', lineHeight: '1.2', marginBottom: '14px', color: '#FFFFFF' }}>
            The AI-Powered Cognitive Shield for the Next Generation
          </h1>

          <p style={{ fontSize: 'clamp(14px, 3.5vw, 17px)', color: 'var(--text-secondary)', lineHeight: '1.55', marginBottom: '24px', maxWidth: '720px', margin: '0 auto 24px' }}>
            Master the 12 rhetorical fallacies and cognitive biases weaponized by modern outrage algorithms. Train in the <strong>Dojo</strong>, conquer the <strong>Gauntlet</strong>, and protect your live browsing with <strong>Browser Armor</strong>.
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/arena" className="btn btn-amber" style={{ padding: '10px 18px', fontSize: '14px' }}>
              🎮 Play "Bias Spotter" Arena
            </Link>
            <Link href="/gauntlet" className="btn btn-primary" style={{ padding: '10px 18px', fontSize: '14px', background: '#DC2626', borderColor: '#EF4444' }}>
              ⚔️ 60s Daily Gauntlet
            </Link>
            <Link href="/skills" className="btn btn-outline" style={{ padding: '10px 18px', fontSize: '14px' }}>
              🌳 Skill Tree
            </Link>
            <Link href="/extension" className="btn btn-outline" style={{ padding: '10px 16px', fontSize: '14px' }}>
              🧩 Get Chrome Extension
            </Link>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginTop: '36px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-amber)' }}>12</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Illustrated Archetypes</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-blue-light)' }}>SIFT</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>UNESCO Framework</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--accent-emerald-light)' }}>&lt; 300ms</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Gemini Flash-Lite</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Module 1: The Interactive Fallacy Codex */}
      <section style={{ padding: '40px 0' }} id="codex">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-amber)' }}>Interactive Learning Dojo</span>
              <h2 style={{ fontSize: 'clamp(22px, 4.5vw, 28px)', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>
                🃏 The Illustrated Fallacy & Bias Codex
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '2px' }}>
                Inspired by <em>yourlogicalfallacyis.com</em>. Tap any card to flip it and reveal the psychological anatomy.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ width: '100%', maxWidth: '300px' }}>
              <input
                type="text"
                placeholder="Search fallacies..."
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
                {cat}
              </button>
            ))}
          </div>

          {/* Fallacy Card Grid (Fluid for mobile) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {filteredFallacies.map((item) => {
              const isFlipped = flippedCardId === item.id;
              const svgIllustration = FALLACY_ILLUSTRATIONS[item.id] || '';

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
                          {item.name}
                        </h3>
                        <div style={{ fontSize: '11.5px', fontWeight: '600', color: 'var(--accent-amber)', marginBottom: '8px' }}>
                          {item.subtitle}
                        </div>

                        <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '10px' }}>
                          {item.description}
                        </p>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--accent-blue-light)', fontWeight: '600' }}>
                        <span>💡 Tap to flip anatomy</span>
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
                          <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{item.name}</strong>
                          <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Tap to flip back</span>
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '9.5px', fontWeight: '800', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>📱 Viral Scenario:</span>
                          <div style={{ fontSize: '11.5px', fontStyle: 'italic', background: 'rgba(0,0,0,0.3)', padding: '6px 8px', borderRadius: '6px', marginTop: '2px', color: '#E2E8F0' }}>
                            {item.viral_example}
                          </div>
                        </div>

                        <div style={{ marginBottom: '8px' }}>
                          <span style={{ fontSize: '9.5px', fontWeight: '800', color: 'var(--accent-emerald-light)', textTransform: 'uppercase' }}>💡 Metacognition Prompt:</span>
                          <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.35' }}>
                            {item.reflection_prompt}
                          </p>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.mil_competency}</span>
                        <Link
                          href={`/sandbox?sample=${encodeURIComponent(item.name)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-primary"
                          style={{ padding: '4px 8px', fontSize: '10.5px' }}
                        >
                          🧪 Sandbox
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

      {/* Game Modes Showcase (Fluid for mobile) */}
      <section style={{ padding: '40px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 28px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-amber)' }}>The Gamified Ecosystem</span>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: '800', color: '#FFFFFF', marginTop: '2px' }}>
              Choose Your Training Mode
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13.5px', marginTop: '4px' }}>
              From fast 60-second speed trials to 1v1 local duels, master lateral reasoning.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚔️</div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>The Daily Gauntlet</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '12px' }}>
                  60-second rapid triage. Sort claims into Fallacy, Fact, or Scam for combo multipliers.
                </p>
              </div>
              <Link href="/gauntlet" className="btn btn-amber" style={{ alignSelf: 'flex-start', fontSize: '12px', padding: '6px 12px' }}>
                Enter Gauntlet ➔
              </Link>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🎮</div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>Spotter Arena</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '12px' }}>
                  5-round scenario battle. Deconstruct crypto schemes and outrage clips with instant SIFT feedback.
                </p>
              </div>
              <Link href="/arena" className="btn btn-primary" style={{ alignSelf: 'flex-start', fontSize: '12px', padding: '6px 12px' }}>
                Launch Arena ➔
              </Link>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌳</div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>Skill Tree</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.45', marginBottom: '12px' }}>
                  Unlock 4 cognitive branches (Dialectical, Statistical, Emotional, Scam) with passive perks.
                </p>
              </div>
              <Link href="/skills" className="btn btn-outline" style={{ alignSelf: 'flex-start', fontSize: '12px', padding: '6px 12px' }}>
                Open Skill Tree ➔
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
