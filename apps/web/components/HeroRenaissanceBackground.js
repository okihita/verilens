'use client';

export default function HeroRenaissanceBackground() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        maskImage: 'radial-gradient(ellipse 760px 360px at center, transparent 0%, transparent 42%, black 88%)',
        WebkitMaskImage: 'radial-gradient(ellipse 760px 360px at center, transparent 0%, transparent 42%, black 88%)'
      }}
      aria-hidden="true"
    >
      <div
        className="hero-renaissance-art"
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/assets/images/renaissance-scholars-hero.jpg)',
          backgroundPosition: 'center 35%',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  );
}
