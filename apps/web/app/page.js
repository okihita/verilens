'use client';

import { useState } from 'react';
import Link from 'next/link';
import fallaciesData from '../../../packages/shared/src/fallacies.json';

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
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '60px 0 40px', textAlign: 'center', background: 'radial-gradient(ellipse at top, #141E33 0%, #080C16 70%)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '20px', fontSize: '12px', fontWeight: '700', color: 'var(--accent-amber)', textTransform: 'uppercase', marginBottom: '18px' }}>
            <span>⚡ UNESCO Global MIL Youth Hackathon 2026</span>
          </div>

          <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-1px', lineHeight: '1.15', marginBottom: '16px', color: '#FFFFFF' }}>
            The AI-Powered Cognitive Shield for the Next Generation
          </h1>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '28px', maxWidth: '720px', margin: '0 auto 28px' }}>
            Master the 12 rhetorical fallacies and cognitive biases weaponized by modern outrage algorithms. Practice with interactive scenarios in the <strong>Dojo</strong>, and protect your browsing in the wild with our <strong>Browser Armor</strong>.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/arena" className="btn btn-amber" style={{ padding: '12px 24px', fontSize: '15px' }}>
              🎮 Play "Bias Spotter" Arena
            </Link>
            <Link href="/sandbox" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
              🧪 Dissect Article in Sandbox
            </Link>
            <Link href="/extension" className="btn btn-outline" style={{ padding: '12px 20px', fontSize: '15px' }}>
              🧩 Get Chrome Extension
            </Link>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '48px', paddingTop: '28px', borderTop: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-amber)' }}>12</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Cognitive Biases & Fallacies</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-blue-light)' }}>SIFT</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>UNESCO Lateral Framework</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-emerald-light)' }}>&lt; 300ms</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: '600' }}>Gemini Flash-Lite Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Module 1: The Interactive Fallacy Codex */}
      <section style={{ padding: '60px 0' }} id="codex">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-amber)' }}>Interactive Learning Dojo</span>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#FFFFFF', marginTop: '4px' }}>
                🃏 The Cognitive Bias & Fallacy Codex
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>
                Click any card to flip it and reveal the psychological anatomy, viral social media examples, and UNESCO reflection prompts.
              </p>
            </div>

            {/* Search Input */}
            <div style={{ width: '280px' }}>
              <input
                type="text"
                placeholder="Search fallacies (e.g. fear, scam, halo)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface-elevated)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '12.5px',
                  fontWeight: '700',
                  border: '1px solid',
                  cursor: 'pointer',
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

          {/* Fallacy Card Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {filteredFallacies.map((item) => {
              const isFlipped = flippedCardId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => toggleFlip(item.id)}
                  style={{
                    perspective: '1000px',
                    minHeight: '340px',
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
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                          <span style={{ fontSize: '28px' }}>{item.icon}</span>
                          <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', color: item.color, textTransform: 'uppercase' }}>
                            {item.category}
                          </span>
                        </div>

                        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '4px' }}>
                          {item.name}
                        </h3>
                        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent-amber)', marginBottom: '12px' }}>
                          {item.subtitle}
                        </div>

                        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                          {item.description}
                        </p>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--accent-blue-light)', fontWeight: '600' }}>
                        <span>💡 Click to view anatomy & viral examples</span>
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
                        padding: '22px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflowY: 'auto'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <strong style={{ fontSize: '14px', color: '#FFFFFF' }}>{item.name}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Click to flip back</span>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--accent-amber)', textTransform: 'uppercase' }}>📱 Viral Social Example:</span>
                          <div style={{ fontSize: '12px', fontStyle: 'italic', background: 'rgba(0,0,0,0.25)', padding: '6px 10px', borderRadius: '6px', marginTop: '3px', color: '#E2E8F0' }}>
                            {item.viral_example}
                          </div>
                        </div>

                        <div style={{ marginBottom: '10px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--accent-emerald-light)', textTransform: 'uppercase' }}>💡 UNESCO Metacognition Prompt:</span>
                          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.4' }}>
                            {item.reflection_prompt}
                          </p>
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{item.mil_competency}</span>
                        <Link
                          href={`/sandbox?sample=${encodeURIComponent(item.name)}`}
                          onClick={(e) => e.stopPropagation()}
                          className="btn btn-primary"
                          style={{ padding: '4px 10px', fontSize: '11px' }}
                        >
                          🧪 Test in Sandbox
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

      {/* Dual Ecosystem Callout */}
      <section style={{ padding: '60px 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--accent-amber)' }}>The Complete System</span>
            <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#FFFFFF', marginTop: '4px' }}>
              From the Training Dojo to the Live Web
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '8px' }}>
              VeriLens is not just an informational website—it is a live cognitive armor that accompanies you as you browse.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎮</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>The "Bias Spotter" Arena</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                  Test your critical thinking instincts in our 5-round speed quiz. Dissect realistic crypto schemes, health hoaxes, and manipulated outrage banners.
                </p>
              </div>
              <Link href="/arena" className="btn btn-amber" style={{ alignSelf: 'flex-start' }}>
                Launch Arena Mode ➔
              </Link>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🧩</div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', marginBottom: '8px' }}>The Chrome Extension (MV3)</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                  Take your cognitive shield to live websites. Highlight any sentence, right-click to verify, and stream Gemini Flash-Lite neural reasoning instantly.
                </p>
              </div>
              <Link href="/extension" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                Get Browser Extension ➔
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
