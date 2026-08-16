'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { fallacies, idToSlug } from '@verilens/shared';
import { generateStoryCardBlob, shareStoryImage } from '../../../lib/story-card';
import { useTranslation } from '../../../lib/i18n';

export default function ImagesGalleryPage() {
  const { t, lang, getLocalizedFallacy } = useTranslation();
  const [selectedFormat, setSelectedFormat] = useState<'story' | 'portrait' | 'feed'>('story');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [renderedUrls, setRenderedUrls] = useState<Record<string, string>>({});
  const [isRendering, setIsRendering] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    fallacies.forEach(f => {
      if (f.category) cats.add(f.category);
    });
    return ['all', ...Array.from(cats)];
  }, []);

  // Filtered fallacies (Localized)
  const filteredFallacies = useMemo(() => {
    const list = selectedCategory === 'all' 
      ? fallacies 
      : fallacies.filter(f => f.category?.toLowerCase() === selectedCategory.toLowerCase());
    return list.map(f => getLocalizedFallacy(f));
  }, [selectedCategory, lang, getLocalizedFallacy]);

  // Render images for the filtered list in current format
  useEffect(() => {
    let isCancelled = false;

    async function renderAll() {
      setIsRendering(true);
      const newUrls: Record<string, string> = {};

      for (const f of filteredFallacies) {
        if (isCancelled) break;
        const key = `${f.id}-${selectedFormat}`;
        if (renderedUrls[key]) {
          newUrls[f.id] = renderedUrls[key];
          continue;
        }

        try {
          const blob = await generateStoryCardBlob({
            fallacyId: f.id,
            name: f.name,
            subtitle: f.subtitle,
            category: f.category,
            color: f.color,
            description: f.description,
            psychology: f.psychology,
            siftStrategy: f.sift_strategy,
            format: selectedFormat,
            theme: 'light'
          });
          const url = URL.createObjectURL(blob);
          newUrls[f.id] = url;
          if (!isCancelled) {
            setRenderedUrls(prev => ({ ...prev, [key]: url }));
          }
        } catch (err) {
          console.error(`Failed to render ${f.id}`, err);
        }
      }

      if (!isCancelled) {
        setIsRendering(false);
      }
    }

    renderAll();

    return () => {
      isCancelled = true;
    };
  }, [filteredFallacies, selectedFormat]);

  // Lightbox Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((lightboxIndex - 1 + filteredFallacies.length) % filteredFallacies.length);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((lightboxIndex + 1) % filteredFallacies.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredFallacies.length]);

  const handleDownload = async (fallacy: typeof fallacies[0]) => {
    setDownloadingId(fallacy.id);
    try {
      await shareStoryImage({
        fallacyId: fallacy.id,
        name: fallacy.name,
        subtitle: fallacy.subtitle,
        category: fallacy.category,
        color: fallacy.color,
        description: fallacy.description,
        psychology: fallacy.psychology,
        siftStrategy: fallacy.sift_strategy,
        format: selectedFormat,
        theme: 'light'
      });
    } catch (e) {
      console.error('Download failed', e);
    } finally {
      setDownloadingId(null);
    }
  };

  const activeLightboxFallacy = lightboxIndex !== null ? filteredFallacies[lightboxIndex] : null;
  const activeLightboxUrl = activeLightboxFallacy ? renderedUrls[`${activeLightboxFallacy.id}-${selectedFormat}`] : null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-app)', paddingBottom: '80px' }}>
      {/* Top Header Controls Bar */}
      <section style={{ borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-blue)', background: 'var(--bg-surface-elevated)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-card)' }}>
                Internal Audit
              </span>
              <h1 style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text-main)', margin: 0 }}>
                Share-Ready Social Cards Gallery
              </h1>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              Visual inspection gallery for all 24 archetypes across 9:16 Story, 4:5 Portrait, and 1:1 Feed formats.
            </p>
          </div>

          {/* Global Format Selector */}
          <div style={{ display: 'inline-flex', gap: '4px', background: 'var(--bg-surface-elevated)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
            {(['story', 'portrait', 'feed'] as const).map(fmt => {
              const isActive = selectedFormat === fmt;
              const label = fmt === 'story' ? 'Story (9:16)' : fmt === 'portrait' ? 'Portrait (4:5)' : 'Square (1:1)';
              return (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: '800',
                    border: 'none',
                    cursor: 'pointer',
                    background: isActive ? 'var(--accent-blue)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="container" style={{ maxWidth: '1400px', marginTop: '28px' }}>
        {/* Category Filters Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '4px' }}>
            Filter:
          </span>
          {categories.map(cat => {
            const isSel = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: '1px solid',
                  cursor: 'pointer',
                  borderColor: isSel ? 'var(--accent-blue-light)' : 'var(--border-card)',
                  background: isSel ? 'var(--accent-blue)' : 'var(--bg-surface)',
                  color: isSel ? '#FFFFFF' : 'var(--text-secondary)',
                  textTransform: 'capitalize'
                }}
              >
                {cat === 'all' ? `All (${fallacies.length})` : cat}
              </button>
            );
          })}
          {isRendering && (
            <span style={{ fontSize: '12px', color: 'var(--accent-amber)', fontWeight: '700', marginLeft: 'auto' }}>
              Rendering cards...
            </span>
          )}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {filteredFallacies.map((f, idx) => {
            const key = `${f.id}-${selectedFormat}`;
            const imgUrl = renderedUrls[key];
            const isDownloading = downloadingId === f.id;

            return (
              <div
                key={f.id}
                className="card"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Image Display Area (Click to open Lightbox) */}
                <div
                  style={{
                    position: 'relative',
                    background: 'var(--bg-surface-elevated)',
                    cursor: 'zoom-in',
                    aspectRatio: selectedFormat === 'story' ? '9 / 16' : selectedFormat === 'portrait' ? '4 / 5' : '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                  onClick={() => setLightboxIndex(idx)}
                  title="Click to view in Fullscreen Lightbox"
                >
                  {imgUrl ? (
                    <img
                      src={imgUrl}
                      alt={f.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>
                        Generating {f.name}...
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Meta & Actions Footer */}
                <div style={{ padding: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
                        {f.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--accent-amber)', fontWeight: '600' }}>
                        {f.subtitle}
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: f.color || 'var(--text-muted)', textTransform: 'uppercase' }}>
                      {f.category}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
                    <button
                      onClick={() => handleDownload(f)}
                      disabled={isDownloading}
                      style={{
                        padding: '7px 10px',
                        borderRadius: '6px',
                        background: 'var(--accent-blue)',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: '800',
                        cursor: isDownloading ? 'wait' : 'pointer'
                      }}
                    >
                      {isDownloading ? 'Saving...' : 'Download PNG'}
                    </button>
                    <Link
                      href={`/codex/${idToSlug(f.id)}`}
                      target="_blank"
                      style={{
                        padding: '7px 10px',
                        borderRadius: '6px',
                        background: 'var(--bg-surface-elevated)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-card)',
                        fontSize: '12px',
                        fontWeight: '800',
                        textAlign: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      Open Codex ↗
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal (Solid, Zero Glassmorphism) */}
      {activeLightboxFallacy && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.94)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '16px'
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Navigation Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '1000px',
              width: '100%',
              margin: '0 auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--text-main)' }}>
                {activeLightboxFallacy.name} ({activeLightboxFallacy.subtitle})
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                ({(lightboxIndex ?? 0) + 1} of {filteredFallacies.length})
              </span>
            </div>

            {/* Lightbox Format Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'inline-flex', gap: '2px', background: 'var(--bg-surface-elevated)', padding: '2px', borderRadius: '6px' }}>
                {(['story', 'portrait', 'feed'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      background: selectedFormat === fmt ? 'var(--accent-blue)' : 'transparent',
                      color: selectedFormat === fmt ? '#FFFFFF' : 'var(--text-secondary)'
                    }}
                  >
                    {fmt.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleDownload(activeLightboxFallacy)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: 'var(--accent-blue)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Download PNG
              </button>

              <button
                onClick={() => setLightboxIndex(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '22px',
                  cursor: 'pointer',
                  padding: '0 6px'
                }}
                aria-label="Close Lightbox"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Lightbox Center Exhibition (With Left/Right Nav Arrows) */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              padding: '12px 0',
              minHeight: 0
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              onClick={() => setLightboxIndex(((lightboxIndex ?? 0) - 1 + filteredFallacies.length) % filteredFallacies.length)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-main)',
                fontSize: '24px',
                fontWeight: '900',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={`${t('nav_prev')} (←)`}
            >
              ←
            </button>

            {/* Fullscreen Rendered Image Container */}
            <div
              style={{
                height: '100%',
                maxHeight: 'calc(100vh - 150px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.8)'
              }}
            >
              {activeLightboxUrl ? (
                <img
                  src={activeLightboxUrl}
                  alt={activeLightboxFallacy.name}
                  style={{
                    maxHeight: 'calc(100vh - 150px)',
                    maxWidth: '90vw',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              ) : (
                <div style={{ color: '#FFFFFF', padding: '40px', textAlign: 'center' }}>
                  Rendering high-resolution {activeLightboxFallacy.name}...
                </div>
              )}
            </div>

            {/* Next Arrow */}
            <button
              onClick={() => setLightboxIndex(((lightboxIndex ?? 0) + 1) % filteredFallacies.length)}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-main)',
                fontSize: '24px',
                fontWeight: '900',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={`${t('nav_next')} (→)`}
            >
              →
            </button>
          </div>

          {/* Lightbox Footer Shortcut Tip */}
          <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
            Use Left / Right Arrow keys to browse • Press ESC to close
          </div>
        </div>
      )}
    </div>
  );
}
