/**
 * Story & Social Card Generator for VeriLens
 * Renders high-resolution 1080x1920 (Instagram Story / WhatsApp Status)
 * and 1080x1080 (Square Feed) images directly in browser canvas for viral sharing.
 */

export interface StoryCardOptions {
  fallacyId: string;
  name: string;
  subtitle: string;
  category: string;
  color?: string;
  description: string;
  psychology: string;
  format?: 'story' | 'square';
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image at: ${src}`));
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  align: CanvasTextAlign = 'left'
): number {
  ctx.textAlign = align;
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export async function generateStoryCardBlob(options: StoryCardOptions): Promise<Blob> {
  const isStory = options.format !== 'square';
  const width = 1080;
  const height = isStory ? 1920 : 1080;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  const themeColor = options.color || '#3B82F6';

  // 1. Background Fill (Deep Luxury Editorial Dark #0B0F19)
  ctx.fillStyle = '#0B0F19';
  ctx.fillRect(0, 0, width, height);

  // 2. Radial Ambient Color Glow at the top
  const radialGlow = ctx.createRadialGradient(
    width / 2,
    isStory ? 480 : 360,
    50,
    width / 2,
    isStory ? 480 : 360,
    width * 0.75
  );
  radialGlow.addColorStop(0, hexToRgba(themeColor, 0.28));
  radialGlow.addColorStop(1, 'rgba(11, 15, 25, 0)');
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, width, height);

  // 3. Subtle Outer Inner Border Frame
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, 36, 36, width - 72, height - 72, 32);
  ctx.stroke();

  // 4. Header Eyebrow
  ctx.font = '800 22px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.12em';
  const topY = isStory ? 100 : 70;
  ctx.fillText('VERILENS • COGNITIVE DEFENSE CODEX', width / 2, topY);

  // 5. Category Pill
  const pillY = isStory ? 140 : 100;
  const categoryText = (options.category || 'LOGICAL FALLACY').toUpperCase();
  ctx.font = '800 20px system-ui, -apple-system, sans-serif';
  ctx.letterSpacing = '0.06em';
  const pillWidth = ctx.measureText(categoryText).width + 36;
  const pillHeight = 36;
  const pillX = (width - pillWidth) / 2;

  ctx.fillStyle = hexToRgba(themeColor, 0.18);
  drawRoundedRect(ctx, pillX, pillY, pillWidth, pillHeight, 18);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(themeColor, 0.5);
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, pillX, pillY, pillWidth, pillHeight, 18);
  ctx.stroke();

  ctx.fillStyle = themeColor;
  ctx.textAlign = 'center';
  ctx.fillText(categoryText, width / 2, pillY + 25);

  // 6. Renaissance Fresco Artwork Image
  const artSize = isStory ? 640 : 420;
  const artX = (width - artSize) / 2;
  const artY = isStory ? 210 : 155;

  try {
    const img = await loadImage(`/assets/images/fallacies/${options.fallacyId}.jpg`);
    ctx.save();
    drawRoundedRect(ctx, artX, artY, artSize, artSize, 28);
    ctx.clip();
    ctx.drawImage(img, artX, artY, artSize, artSize);
    ctx.restore();

    // Artwork Border & Glow
    ctx.strokeStyle = hexToRgba(themeColor, 0.65);
    ctx.lineWidth = 4;
    drawRoundedRect(ctx, artX, artY, artSize, artSize, 28);
    ctx.stroke();
  } catch {
    // Fallback if image fails to load
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    drawRoundedRect(ctx, artX, artY, artSize, artSize, 28);
    ctx.fill();
    ctx.font = '900 80px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = themeColor;
    ctx.textAlign = 'center';
    ctx.fillText(options.name.substring(0, 2).toUpperCase(), width / 2, artY + artSize / 2 + 30);
  }

  // 7. Title & Subtitle
  const titleY = isStory ? artY + artSize + 70 : artY + artSize + 55;
  ctx.font = '900 52px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '-0.02em';
  ctx.fillText(options.name, width / 2, titleY);

  const subtitleY = titleY + 44;
  ctx.font = '700 28px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#F59E0B';
  ctx.fillText(options.subtitle, width / 2, subtitleY);

  // 8. Core Deconstruction Card / 3-Sentence Cognitive Breakdown
  if (isStory) {
    const cardY = subtitleY + 45;
    const cardMargin = 80;
    const cardWidth = width - cardMargin * 2;
    const cardPadding = 36;
    const cardHeight = 360;

    // Card background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
    drawRoundedRect(ctx, cardMargin, cardY, cardWidth, cardHeight, 20);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, cardMargin, cardY, cardWidth, cardHeight, 20);
    ctx.stroke();

    // Accent left stripe
    ctx.fillStyle = themeColor;
    drawRoundedRect(ctx, cardMargin, cardY, 6, cardHeight, 3);
    ctx.fill();

    // Card Title: "Why Your Brain Falls for This"
    ctx.font = '800 24px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText('Why Your Brain Falls for This', cardMargin + cardPadding, cardY + cardPadding + 10);

    // Card Body Text (Psychology 3-sentence explanation)
    ctx.font = '500 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#CBD5E1';
    ctx.letterSpacing = '0.01em';
    wrapText(
      ctx,
      options.psychology || options.description,
      cardMargin + cardPadding,
      cardY + cardPadding + 52,
      cardWidth - cardPadding * 2,
      36,
      'left'
    );
  } else {
    // Square mode short description
    const descY = subtitleY + 42;
    ctx.font = '500 21px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = '#CBD5E1';
    wrapText(ctx, options.description, width / 2, descY, width - 180, 32, 'center');
  }

  // 9. Footer Watermark
  const footerY = isStory ? height - 90 : height - 55;
  ctx.font = '700 19px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.04em';
  ctx.fillText('UNESCO MIL 2026 Reference • Spot fallacies at verilens.aprilwang.id', width / 2, footerY);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to generate image Blob from canvas'));
      }
    }, 'image/png');
  });
}

function hexToRgba(hex: string, alpha: number): string {
  let c = hex.replace('#', '');
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
  }
  const r = parseInt(c.substring(0, 2), 16) || 59;
  const g = parseInt(c.substring(2, 4), 16) || 130;
  const b = parseInt(c.substring(4, 6), 16) || 246;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Triggers native Instagram Story / Social Image Share or downloads file
 */
export async function shareStoryImage(options: StoryCardOptions): Promise<'shared' | 'downloaded' | 'copied'> {
  const blob = await generateStoryCardBlob(options);
  const fileName = `${options.fallacyId}-verilens-story.png`;
  const file = new File([blob], fileName, { type: 'image/png' });

  // 1. Mobile Web Share API Level 2 (Direct to Instagram Stories / WhatsApp / Camera Roll)
  if (typeof navigator !== 'undefined' && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `${options.name} (${options.subtitle})`,
        text: `How to spot and debunk the "${options.name}" fallacy: https://verilens.aprilwang.id/codex/${options.fallacyId}`
      });
      return 'shared';
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        return 'shared';
      }
      // Fall through to download if share fails
    }
  }

  // 2. Fallback: Trigger direct file download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  return 'downloaded';
}
