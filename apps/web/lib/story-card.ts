/**
 * VeriLens Solid Civic Editorial Social & Story Card Engine
 * Generates high-contrast editorial posters directly on HTML5 Canvas.
 * Default: High-contrast Civic Light Mode using Plus Jakarta Sans typography.
 * Strict No Glassmorphism: Crisp, solid, tactile editorial surfaces.
 */

export interface StoryCardOptions {
  fallacyId: string;
  name: string;
  subtitle: string;
  category: string;
  color?: string;
  description: string;
  psychology: string;
  format?: 'story' | 'feed' | 'portrait';
  theme?: 'light' | 'dark';
}

const FONT_FAMILY = '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

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

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  length: number,
  color: string,
  lineWidth: number
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(x, y + length);
  ctx.lineTo(x, y);
  ctx.lineTo(x + length, y);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(x + width - length, y);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x + width, y + length);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(x + width, y + height - length);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x + width - length, y + height);
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(x + length, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y + height - length);
  ctx.stroke();
}

export async function generateStoryCardBlob(options: StoryCardOptions): Promise<Blob> {
  // Pre-flight check & load Plus Jakarta Sans weights before rendering
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await Promise.all([
        document.fonts.load(`800 20px ${FONT_FAMILY}`),
        document.fonts.load(`900 52px ${FONT_FAMILY}`),
        document.fonts.load(`700 26px ${FONT_FAMILY}`),
        document.fonts.load(`500 21px ${FONT_FAMILY}`)
      ]);
      await document.fonts.ready;
    } catch {
      // Continue with system sans-serif fallback if font load fails
    }
  }

  const format = options.format || 'story';
  const width = 1080;
  let height = 1920; // default 9:16 story
  if (format === 'feed') height = 1080; // 1:1 square
  if (format === 'portrait') height = 1350; // 4:5 portrait

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not supported');
  }

  // Light Mode Color Tokens (Default)
  const isDark = options.theme === 'dark';
  const bgBase = isDark ? '#0A0D14' : '#F8FAFC';
  const borderOuter = isDark ? '#1E293B' : '#CBD5E1';
  const goldAccent = '#D97706';
  const headerMuted = isDark ? '#94A3B8' : '#64748B';
  const titleColor = isDark ? '#FFFFFF' : '#0F172A';
  const subtitleColor = isDark ? '#F59E0B' : '#D97706';
  const cardBg = isDark ? '#111827' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#E2E8F0';
  const cardTextColor = isDark ? '#E2E8F0' : '#334155';
  const pillBg = isDark ? '#111827' : '#F1F5F9';
  const pillBorder = isDark ? '#334155' : '#CBD5E1';
  const themeColor = options.color || (isDark ? '#3B82F6' : '#2563EB');

  // 1. Solid Canvas Base Fill
  ctx.fillStyle = bgBase;
  ctx.fillRect(0, 0, width, height);

  // 2. Architectural Structural Border
  const pad = 36;
  ctx.strokeStyle = borderOuter;
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, width - pad * 2, height - pad * 2);

  // 3. Gold Corner Brackets for Museum Archival Touch
  drawCornerBrackets(ctx, pad + 8, pad + 8, width - (pad + 8) * 2, height - (pad + 8) * 2, 28, goldAccent, 3.5);

  // 4. Solid Header Eyebrow Ribbon
  const headerY = format === 'story' ? 95 : format === 'portrait' ? 85 : 75;
  ctx.font = `800 20px ${FONT_FAMILY}`;
  ctx.fillStyle = headerMuted;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.14em';
  ctx.fillText('VERILENS • CIVIC COGNITIVE DEFENSE', width / 2, headerY);

  // 5. Solid Category Pill
  const pillY = headerY + 30;
  const categoryText = (options.category || 'LOGICAL FALLACY').toUpperCase();
  ctx.font = `800 18px ${FONT_FAMILY}`;
  ctx.letterSpacing = '0.08em';
  const textWidth = ctx.measureText(categoryText).width;
  const pillW = textWidth + 36;
  const pillH = 34;
  const pillX = (width - pillW) / 2;

  ctx.fillStyle = pillBg;
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 8);
  ctx.fill();
  ctx.strokeStyle = pillBorder;
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 8);
  ctx.stroke();

  ctx.fillStyle = themeColor;
  ctx.textAlign = 'center';
  ctx.fillText(categoryText, width / 2, pillY + 23);

  // 6. Museum Framed Artwork Exhibition
  let artSize = 600;
  if (format === 'feed') artSize = 420;
  if (format === 'portrait') artSize = 500;

  const artX = (width - artSize) / 2;
  const artY = pillY + pillH + (format === 'story' ? 36 : format === 'portrait' ? 24 : 16);

  try {
    const img = await loadImage(`/assets/images/fallacies/${options.fallacyId}.jpg`);
    ctx.save();
    drawRoundedRect(ctx, artX, artY, artSize, artSize, 16);
    ctx.clip();
    ctx.drawImage(img, artX, artY, artSize, artSize);
    ctx.restore();

    // Solid Double Frame
    ctx.strokeStyle = goldAccent;
    ctx.lineWidth = 3.5;
    drawRoundedRect(ctx, artX, artY, artSize, artSize, 16);
    ctx.stroke();

    ctx.strokeStyle = borderOuter;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, artX - 4, artY - 4, artSize + 8, artSize + 8, 20);
    ctx.stroke();
  } catch {
    ctx.fillStyle = cardBg;
    drawRoundedRect(ctx, artX, artY, artSize, artSize, 16);
    ctx.fill();
    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 2;
    drawRoundedRect(ctx, artX, artY, artSize, artSize, 16);
    ctx.stroke();

    ctx.font = `900 72px ${FONT_FAMILY}`;
    ctx.fillStyle = themeColor;
    ctx.textAlign = 'center';
    ctx.fillText(options.name.substring(0, 2).toUpperCase(), width / 2, artY + artSize / 2 + 25);
  }

  // 7. Title & Subtitle
  const titleY = artY + artSize + (format === 'story' ? 62 : format === 'portrait' ? 48 : 42);
  ctx.font = `900 50px ${FONT_FAMILY}`;
  ctx.fillStyle = titleColor;
  ctx.textAlign = 'center';
  ctx.letterSpacing = '-0.02em';
  ctx.fillText(options.name, width / 2, titleY);

  const subtitleY = titleY + 38;
  ctx.font = `700 26px ${FONT_FAMILY}`;
  ctx.fillStyle = subtitleColor;
  ctx.fillText(options.subtitle, width / 2, subtitleY);

  // 8. Solid Deconstruction Card
  if (format === 'story' || format === 'portrait') {
    const cardY = subtitleY + 36;
    const cardMargin = 72;
    const cardWidth = width - cardMargin * 2;
    const cardPadding = 32;
    const cardHeight = format === 'story' ? 360 : 260;

    // Solid container with subtle shadow
    ctx.fillStyle = cardBg;
    drawRoundedRect(ctx, cardMargin, cardY, cardWidth, cardHeight, 14);
    ctx.fill();

    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, cardMargin, cardY, cardWidth, cardHeight, 14);
    ctx.stroke();

    // Solid Left Accent Bar
    ctx.fillStyle = themeColor;
    drawRoundedRect(ctx, cardMargin, cardY, 6, cardHeight, 3);
    ctx.fill();

    // Card Header
    ctx.font = `800 20px ${FONT_FAMILY}`;
    ctx.fillStyle = titleColor;
    ctx.textAlign = 'left';
    ctx.letterSpacing = '0.02em';
    ctx.fillText('WHY YOUR BRAIN FALLS FOR THIS', cardMargin + cardPadding, cardY + cardPadding + 6);

    // Card Body
    ctx.font = `500 21px ${FONT_FAMILY}`;
    ctx.fillStyle = cardTextColor;
    wrapText(
      ctx,
      options.psychology || options.description,
      cardMargin + cardPadding,
      cardY + cardPadding + 42,
      cardWidth - cardPadding * 2,
      33,
      'left'
    );
  } else {
    // 1:1 Feed Post Short Definition
    const descY = subtitleY + 36;
    ctx.font = `500 20px ${FONT_FAMILY}`;
    ctx.fillStyle = cardTextColor;
    wrapText(ctx, options.description, width / 2, descY, width - 160, 30, 'center');
  }

  // 9. Solid Footer Watermark Bar
  const footerY = height - (format === 'story' ? 85 : 55);
  ctx.font = `700 18px ${FONT_FAMILY}`;
  ctx.fillStyle = headerMuted;
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

/**
 * Triggers native Instagram Story / Social Image Share or downloads file
 */
export async function shareStoryImage(options: StoryCardOptions): Promise<'shared' | 'downloaded' | 'copied'> {
  // Default to light theme if not specified
  const theme = options.theme || 'light';
  const blob = await generateStoryCardBlob({ ...options, theme });
  const formatSuffix = options.format || 'story';
  const fileName = `${options.fallacyId}-verilens-${formatSuffix}.png`;
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
    }
  }

  // 2. Fallback: Trigger direct high-resolution PNG file download
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
