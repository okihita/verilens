# 05. VeriLens Visual Identity & Hero Fresco Generation Prompts

This document stores the exact master image generation prompts, negative prompts, art direction parameters, and CSS implementation guidelines for the VeriLens landing page hero artwork.

---

## 1. Master Hero Illustration: Sistine Chapel Renaissance Fresco

### Master Prompt
```text
Masterpiece Renaissance fresco painting in the majestic style of Michelangelo's Sistine Chapel ceiling and Raphael's School of Athens. A grand classical Renaissance basilica and scholarly rotunda with high vaulted frescoed ceilings, where young philosophers and thinkers gather in deep study, cross-referencing manuscripts, examining celestial globes and optical instruments under heavenly light rays. Rich, luminous classical Renaissance color palette: deep lapis lazuli azure, warm Venetian gold, terracotta ochre, sage green, and noble crimson drapery. Volumetric atmospheric chiaroscuro lighting, delicate Renaissance fresco plaster texture and fine craquelure. Grand panoramic 16:9 wide composition with majestic architectural depth and intellectual dignity. No modern computers, no cartoons, no glossy 3D plastic, zero emojis.
```

### Generation Parameters
* **Aspect Ratio:** `16:9` (Panoramic horizontal)
* **Style Model:** Renaissance Fresco / Chiaroscuro / Classical Plaster Texture
* **Primary Palette:** Lapis Lazuli (`#1E3A8A`), Venetian Ochre Gold (`#D97706`), Terracotta Crimson (`#DC2626`), Sage Emerald (`#059669`), Aged Parchment (`#F8FAFC`).
* **Target File Path:** `apps/web/public/assets/images/sistine-scholars-fresco.jpg`

### Negative Constraints
```text
modern computers, laptops, smartphone screens, cartoons, anime, 3D bobblehead, glossy plastic rendering, cyberpunk neon glow, purple synthwave, stock photography watermark, emojis, deformed anatomy, blurry low-resolution textures
```

---

## 2. Alternative Hero Illustration: The Prismatic Truth Lens (Concept A)

### Master Prompt
```text
High-end editorial civic illustration in the conceptual style of The Atlantic, The Economist, and Wired investigative essays. 16:9 wide panoramic horizontal composition. Positioned in the right two-thirds of the frame is a sleek, multi-faceted precision optical glass prism and crystalline lens. From the upper right, a turbulent, deconstructed vortex of volatile red-orange digital noise, jagged notification spikes, and distorted social feed fragments enters the lens. Passing through the borosilicate crystalline facets, the chaotic noise is refracted, sorted, and clarified into pristine, architectural blueprint linework, calm emerald-cyan and warm amber-gold geometric data streams, and elegant luminous light paths. The entire left half of the composition is expansive, clean negative space in deep obsidian navy (#0A0F1D) and charcoal slate with subtle ambient studio falloff and fine tactile editorial offset litho grain. Sophisticated, minimalist, high contrast, elegant glass caustics, subtle volumetric ray tracing, zero clutter on the left.
```

### Target File Path
* `apps/web/public/assets/images/hero-prismatic-lens.jpg`

---

## 3. Alternative Hero Illustration: Renaissance Etching / Study Hall (Dürer Style)

### Master Prompt
```text
High-end Renaissance etching and copperplate engraving illustration in the style of Leonardo da Vinci anatomical notebooks, Albrecht Dürer woodcuts, and Raphael's School of Athens. A group of scholarly young thinkers and scholars gathered in an open classical Renaissance study hall, examining manuscripts, comparing documents under magnifying lenses, using optical measuring tools, and engaged in thoughtful critical discussion and evidence verification. Fine cross-hatching linework, detailed ink drawing, subtle warm charcoal and antique sepia tones on aged parchment texture. Masterful chiaroscuro lighting, intellectual dignity, rich academic atmosphere, wide 16:9 panoramic composition. No modern computers, no cartoons, no 3D glossy plastic, no purple cyberpunk neon, zero emojis.
```

### Target File Path
* `apps/web/public/assets/images/renaissance-scholars-hero.jpg`

---

## 4. Front-End Parallax & Scrim Tuning Guide

All hero backdrop blending is centralized in **`apps/web/app/globals.css`** (Lines 60–80):

### Light Theme (Sun)
```css
.hero-fresco-parallax {
  opacity: 0.50; /* Adjust between 0.35 and 0.75 for desired intensity */
  filter: contrast(1.08) saturate(1.15) brightness(1.02);
  transition: opacity 0.3s ease;
}

.hero-fresco-scrim {
  /* Controls the center radial fade to ensure 100% WCAG AAA headline contrast */
  background: radial-gradient(ellipse 980px 480px at center, rgba(248, 250, 252, 0.88) 0%, rgba(248, 250, 252, 0.65) 50%, var(--bg-app) 100%),
              linear-gradient(to bottom, transparent 60%, var(--bg-app) 100%);
}
```

### Dark Theme (Moon)
```css
[data-theme="dark"] .hero-fresco-parallax {
  opacity: 0.42;
  filter: contrast(1.15) saturate(1.2) brightness(0.9);
}

[data-theme="dark"] .hero-fresco-scrim {
  background: radial-gradient(ellipse 980px 480px at center, rgba(6, 9, 19, 0.86) 0%, rgba(6, 9, 19, 0.62) 50%, var(--bg-app) 100%),
              linear-gradient(to bottom, transparent 60%, var(--bg-app) 100%);
}
```

### Parallax Engine (`apps/web/components/HeroParallaxBackground.js`)
* **Scroll Factor:** `window.scrollY * 0.32`
* **Scale Margin:** `scale(1.06)` with `top: -40px, bottom: -40px` to prevent edge gaps during rapid scroll acceleration.
