'use client';

import { useEffect, useState } from 'react';

export default function HeroParallaxBackground() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffsetY(window.scrollY * 0.32);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: -20,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
      aria-hidden="true"
    >
      {/* Full-Bleed Parallax Fresco Canvas */}
      <div
        className="hero-fresco-parallax"
        style={{
          position: 'absolute',
          top: -40,
          left: 0,
          right: 0,
          bottom: -40,
          backgroundImage: 'url(/assets/images/sistine-scholars-fresco.jpg)',
          backgroundPosition: 'center 30%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: `translate3d(0, ${offsetY}px, 0) scale(1.06)`,
          willChange: 'transform',
          transition: 'transform 0.1s cubic-bezier(0,0,0.2,1)'
        }}
      />

      {/* Atmospheric Radial Scrim for 100% Text Readability across Light and Dark Themes */}
      <div
        className="hero-fresco-scrim"
        style={{
          position: 'absolute',
          inset: 0
        }}
      />
    </div>
  );
}
