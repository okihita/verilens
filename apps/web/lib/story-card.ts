/**
 * VeriLens Solid Civic Editorial Social & Story Card Engine
 * Generates high-contrast editorial posters directly on HTML5 Canvas.
 * Default: High-contrast Civic Light Mode using Plus Jakarta Sans typography.
 * Decorative Framing: Classical Cartography Inlay Frame (Outer canvas only).
 * Clean Artwork: 100% Frameless uncropped Renaissance artwork.
 * Optical Geometry: Generous spacing between category pills, titles, and containers.
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
  siftStrategy?: string;
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

function calculateWrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let n = 0; n < words.length; n++) {
    const testLine = currentLine ? `${currentLine} ${words[n]}` : words[n];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[n];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    lines.push(currentLine);
  }
  return lines;
}

interface DynamicFitResult {
  fontSize: number;
  lineHeight: number;
  lines: string[];
  totalHeight: number;
}

function findOptimalTextFit(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxHeight: number,
  minFontSize: number,
  maxFontSize: number,
  fontWeight: number = 500,
  lineHeightRatio: number = 1.46
): DynamicFitResult {
  for (let size = maxFontSize; size >= minFontSize; size -= 0.5) {
    ctx.font = `${fontWeight} ${size}px ${FONT_FAMILY}`;
    const lines = calculateWrappedLines(ctx, text, maxWidth);
    const lineHeight = Math.round(size * lineHeightRatio);
    const totalHeight = lines.length * lineHeight;
    if (totalHeight <= maxHeight) {
      return { fontSize: size, lineHeight, lines, totalHeight };
    }
  }

  ctx.font = `${fontWeight} ${minFontSize}px ${FONT_FAMILY}`;
  const lines = calculateWrappedLines(ctx, text, maxWidth);
  const lineHeight = Math.round(minFontSize * lineHeightRatio);
  return { fontSize: minFontSize, lineHeight, lines, totalHeight: lines.length * lineHeight };
}

function fitSingleLineText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxFontSize: number,
  minFontSize: number,
  fontWeight: number = 900
): number {
  for (let size = maxFontSize; size >= minFontSize; size -= 1) {
    ctx.font = `${fontWeight} ${size}px ${FONT_FAMILY}`;
    if (ctx.measureText(text).width <= maxWidth) {
      return size;
    }
  }
  return minFontSize;
}

function renderLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  x: number,
  startY: number,
  lineHeight: number,
  align: CanvasTextAlign = 'left'
): number {
  ctx.textAlign = align;
  let currentY = startY;
  for (const line of lines) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
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
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawDiamond(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.lineTo(cx + size, cy);
  ctx.lineTo(cx, cy + size);
  ctx.lineTo(cx - size, cy);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawUncroppedImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number,
  radius: number
) {
  ctx.save();
  drawRoundedRect(ctx, dx, dy, dWidth, dHeight, radius);
  ctx.clip();
  ctx.drawImage(img, 0, 0, img.width, img.height, dx, dy, dWidth, dHeight);
  ctx.restore();
}

function drawCartographyFrame(
  ctx: CanvasRenderingContext2D,
  outerPad: number,
  canvasWidth: number,
  canvasHeight: number,
  goldColor: string,
  borderColor: string
) {
  const outerW = canvasWidth - outerPad * 2;
  const outerH = canvasHeight - outerPad * 2;

  // 1. Outer Architectural Hairline
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(outerPad, outerPad, outerW, outerH);

  // 2. Inner Gilded Channel
  const innerMargin = 10;
  const innerX = outerPad + innerMargin;
  const innerY = outerPad + innerMargin;
  const innerW = outerW - innerMargin * 2;
  const innerH = outerH - innerMargin * 2;

  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(innerX, innerY, innerW, innerH);

  // 3. Four Corner Diamonds
  const diamondSize = 7.5;
  drawDiamond(ctx, innerX, innerY, diamondSize, goldColor);
  drawDiamond(ctx, innerX + innerW, innerY, diamondSize, goldColor);
  drawDiamond(ctx, innerX + innerW, innerY + innerH, diamondSize, goldColor);
  drawDiamond(ctx, innerX, innerY + innerH, diamondSize, goldColor);

  // 4. Stepped Corner Serif Ticks
  const tickLen = 14;
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;

  // Top-Left
  ctx.beginPath();
  ctx.moveTo(innerX + diamondSize + 2, innerY);
  ctx.lineTo(innerX + diamondSize + tickLen, innerY);
  ctx.moveTo(innerX, innerY + diamondSize + 2);
  ctx.lineTo(innerX, innerY + diamondSize + tickLen);
  ctx.stroke();

  // Top-Right
  ctx.beginPath();
  ctx.moveTo(innerX + innerW - (diamondSize + 2), innerY);
  ctx.lineTo(innerX + innerW - (diamondSize + tickLen), innerY);
  ctx.moveTo(innerX + innerW, innerY + diamondSize + 2);
  ctx.lineTo(innerX + innerW, innerY + diamondSize + tickLen);
  ctx.stroke();

  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(innerX + innerW - (diamondSize + 2), innerY + innerH);
  ctx.lineTo(innerX + innerW - (diamondSize + tickLen), innerY + innerH);
  ctx.moveTo(innerX + innerW, innerY + innerH - (diamondSize + 2));
  ctx.lineTo(innerX + innerW, innerY + innerH - (diamondSize + tickLen));
  ctx.stroke();

  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(innerX + diamondSize + 2, innerY + innerH);
  ctx.lineTo(innerX + diamondSize + tickLen, innerY + innerH);
  ctx.moveTo(innerX, innerY + innerH - (diamondSize + 2));
  ctx.lineTo(innerX, innerY + innerH - (diamondSize + tickLen));
  ctx.stroke();

  // 5. Four Midpoint Registration Diamonds
  const midPipSize = 4.5;
  drawDiamond(ctx, canvasWidth / 2, innerY, midPipSize, goldColor);
  drawDiamond(ctx, canvasWidth / 2, innerY + innerH, midPipSize, goldColor);
  drawDiamond(ctx, innerX, canvasHeight / 2, midPipSize, goldColor);
  drawDiamond(ctx, innerX + innerW, canvasHeight / 2, midPipSize, goldColor);
}

export async function generateStoryCardBlob(options: StoryCardOptions): Promise<Blob> {
  if (typeof document !== 'undefined' && document.fonts) {
    try {
      await Promise.all([
        document.fonts.load(`800 24px ${FONT_FAMILY}`),
        document.fonts.load(`900 58px ${FONT_FAMILY}`),
        document.fonts.load(`700 30px ${FONT_FAMILY}`),
        document.fonts.load(`600 26px ${FONT_FAMILY}`),
        document.fonts.load(`500 26px ${FONT_FAMILY}`)
      ]);
      await document.fonts.ready;
    } catch {
      // Fallback
    }
  }

  const format = options.format || 'story';
  const width = 1080;
  let height = 1920; // 9:16 story
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
  const cardTextColor = isDark ? '#E2E8F0' : '#1E293B';
  const pillBg = isDark ? '#111827' : '#F1F5F9';
  const pillBorder = isDark ? '#334155' : '#CBD5E1';
  const themeColor = options.color || (isDark ? '#3B82F6' : '#2563EB');

  // 1. Solid Canvas Base Fill
  ctx.fillStyle = bgBase;
  ctx.fillRect(0, 0, width, height);

  if (format === 'story') {
    // =========================================================================
    // 9:16 STORY: GENEROUS PILL-TO-TITLE SPACING & FRAMELESS ARTWORK
    // =========================================================================
    const outerPad = 34;
    drawCartographyFrame(ctx, outerPad, width, height, goldAccent, borderOuter);

    const contentMargin = 72;
    const contentWidth = width - contentMargin * 2; // 936px wide

    // Top Category Pill (e.g. DIALECTICAL)
    const categoryText = (options.category || 'LOGICAL FALLACY').toUpperCase();
    ctx.font = `800 16px ${FONT_FAMILY}`;
    ctx.letterSpacing = '0.08em';
    const textWidth = ctx.measureText(categoryText).width;
    const pillW = textWidth + 32;
    const pillH = 34;
    const pillY = 68;

    ctx.fillStyle = pillBg;
    drawRoundedRect(ctx, contentMargin, pillY, pillW, pillH, 8);
    ctx.fill();
    ctx.strokeStyle = pillBorder;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, contentMargin, pillY, pillW, pillH, 8);
    ctx.stroke();

    ctx.fillStyle = themeColor;
    ctx.textAlign = 'center';
    ctx.fillText(categoryText, contentMargin + pillW / 2, pillY + 23);

    // Title (Fallacy Name) — Increased bottom padding from category pill (56px space)
    const titleAvailableWidth = contentWidth;
    const dynamicTitleSize = fitSingleLineText(ctx, options.name, titleAvailableWidth, 56, 38, 900);
    const titleY = pillY + pillH + 54;
    ctx.font = `900 ${dynamicTitleSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = titleColor;
    ctx.textAlign = 'left';
    ctx.letterSpacing = '-0.02em';
    ctx.fillText(options.name, contentMargin, titleY);

    // Subtitle
    const dynamicSubtitleSize = fitSingleLineText(ctx, options.subtitle, titleAvailableWidth, 26, 18, 700);
    const subtitleY = titleY + 34;
    ctx.font = `700 ${dynamicSubtitleSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = subtitleColor;
    ctx.fillText(options.subtitle, contentMargin, subtitleY);

    // Full-Width UNCROPPED Frameless Artwork Window (Square 936 × 936 px, Zero Outer Stroke Frame)
    const artX = contentMargin;
    const artY = subtitleY + 20;
    const artSize = contentWidth; // 936px

    try {
      const img = await loadImage(`/assets/images/fallacies/${options.fallacyId}.jpg`);
      // Pure frameless uncropped artwork with smooth aesthetic rounded corners
      drawUncroppedImage(ctx, img, artX, artY, artSize, artSize, 16);
    } catch {
      ctx.fillStyle = cardBg;
      drawRoundedRect(ctx, artX, artY, artSize, artSize, 16);
      ctx.fill();
      ctx.strokeStyle = cardBorder;
      ctx.lineWidth = 2;
      drawRoundedRect(ctx, artX, artY, artSize, artSize, 16);
      ctx.stroke();

      ctx.font = `900 80px ${FONT_FAMILY}`;
      ctx.fillStyle = themeColor;
      ctx.textAlign = 'center';
      ctx.fillText(options.name.substring(0, 2).toUpperCase(), width / 2, artY + artSize / 2 + 28);
    }

    // High-Legibility Deconstruction Box (936 × 630 px)
    const cardY = artY + artSize + 22;
    const cardHeight = 630;
    const innerPadding = 32;
    const innerContentWidth = contentWidth - innerPadding * 2;

    // Solid Container Surface
    ctx.fillStyle = cardBg;
    drawRoundedRect(ctx, contentMargin, cardY, contentWidth, cardHeight, 16);
    ctx.fill();

    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, contentMargin, cardY, contentWidth, cardHeight, 16);
    ctx.stroke();

    // Solid Left Accent Bar
    ctx.fillStyle = themeColor;
    drawRoundedRect(ctx, contentMargin, cardY, 6, cardHeight, 3);
    ctx.fill();

    // Section 1 Header: Why Your Brain Falls for This
    ctx.font = `800 22px ${FONT_FAMILY}`;
    ctx.fillStyle = titleColor;
    ctx.textAlign = 'left';
    ctx.letterSpacing = '0.03em';
    ctx.fillText('WHY YOUR BRAIN FALLS FOR THIS', contentMargin + innerPadding, cardY + innerPadding + 4);

    // Section 1 Body: Dynamic Body Text (22px - 26px)
    const psychText = options.psychology || options.description;
    const psychFit = findOptimalTextFit(ctx, psychText, innerContentWidth, 290, 20, 26, 500, 1.48);

    ctx.font = `500 ${psychFit.fontSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = cardTextColor;
    const psychEndY = renderLines(
      ctx,
      psychFit.lines,
      contentMargin + innerPadding,
      cardY + innerPadding + 42,
      psychFit.lineHeight,
      'left'
    );

    // Section Divider
    const dividerY = Math.max(psychEndY + 18, cardY + 430);
    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(contentMargin + innerPadding, dividerY);
    ctx.lineTo(contentMargin + contentWidth - innerPadding, dividerY);
    ctx.stroke();

    // Section 2 Header: SIFT Defense Header
    const siftHeaderY = dividerY + 32;
    ctx.font = `800 20px ${FONT_FAMILY}`;
    ctx.fillStyle = '#059669';
    ctx.letterSpacing = '0.03em';
    ctx.fillText('HOW TO VERIFY (SIFT DEFENSE)', contentMargin + innerPadding, siftHeaderY);

    // Section 2 Body: SIFT Rule Body (20px - 25px)
    const defaultSift = options.siftStrategy || 'Trace the primary source data independent of rhetorical distraction.';
    const siftFit = findOptimalTextFit(ctx, defaultSift, innerContentWidth, 110, 19, 25, 600, 1.44);

    ctx.font = `600 ${siftFit.fontSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = titleColor;
    renderLines(
      ctx,
      siftFit.lines,
      contentMargin + innerPadding,
      siftHeaderY + 32,
      siftFit.lineHeight,
      'left'
    );

    // Footer Watermark
    const footerY = height - 48;
    ctx.font = `700 15px ${FONT_FAMILY}`;
    ctx.fillStyle = headerMuted;
    ctx.textAlign = 'center';
    ctx.letterSpacing = '0.04em';
    ctx.fillText('UNESCO MIL 2026 Reference • verilens.aprilwang.id', width / 2, footerY);

  } else if (format === 'portrait') {
    // ==========================================
    // 4:5 PORTRAIT FORMAT
    // ==========================================
    const outerPad = 30;
    drawCartographyFrame(ctx, outerPad, width, height, goldAccent, borderOuter);

    const contentMargin = 64;
    const contentWidth = width - contentMargin * 2; // 952px

    const categoryText = (options.category || 'LOGICAL FALLACY').toUpperCase();
    ctx.font = `800 16px ${FONT_FAMILY}`;
    ctx.letterSpacing = '0.08em';
    const textWidth = ctx.measureText(categoryText).width;
    const pillW = textWidth + 30;
    const pillH = 32;
    const pillY = 60;
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
    ctx.fillText(categoryText, width / 2, pillY + 22);

    const artSize = 540;
    const artX = (width - artSize) / 2;
    const artY = pillY + pillH + 22;

    try {
      const img = await loadImage(`/assets/images/fallacies/${options.fallacyId}.jpg`);
      drawUncroppedImage(ctx, img, artX, artY, artSize, artSize, 14);
    } catch {
      // Fallback
    }

    const titleY = artY + artSize + 52;
    const titleSize = fitSingleLineText(ctx, options.name, width - 160, 50, 36, 900);
    ctx.font = `900 ${titleSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = titleColor;
    ctx.textAlign = 'center';
    ctx.fillText(options.name, width / 2, titleY);

    const subtitleY = titleY + 34;
    ctx.font = `700 24px ${FONT_FAMILY}`;
    ctx.fillStyle = subtitleColor;
    ctx.fillText(options.subtitle, width / 2, subtitleY);

    const cardY = subtitleY + 28;
    const cardHeight = 400;
    const cardPad = 28;

    ctx.fillStyle = cardBg;
    drawRoundedRect(ctx, contentMargin, cardY, contentWidth, cardHeight, 14);
    ctx.fill();
    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, contentMargin, cardY, contentWidth, cardHeight, 14);
    ctx.stroke();

    ctx.fillStyle = themeColor;
    drawRoundedRect(ctx, contentMargin, cardY, 6, cardHeight, 3);
    ctx.fill();

    ctx.font = `800 20px ${FONT_FAMILY}`;
    ctx.fillStyle = titleColor;
    ctx.textAlign = 'left';
    ctx.fillText('WHY YOUR BRAIN FALLS FOR THIS', contentMargin + cardPad, cardY + cardPad + 4);

    const psychText = options.psychology || options.description;
    const psychFit = findOptimalTextFit(ctx, psychText, contentWidth - cardPad * 2, 290, 20, 25, 500, 1.48);

    ctx.font = `500 ${psychFit.fontSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = cardTextColor;
    renderLines(ctx, psychFit.lines, contentMargin + cardPad, cardY + cardPad + 38, psychFit.lineHeight, 'left');

    const footerY = height - 44;
    ctx.font = `700 16px ${FONT_FAMILY}`;
    ctx.fillStyle = headerMuted;
    ctx.textAlign = 'center';
    ctx.fillText('UNESCO MIL 2026 Reference • verilens.aprilwang.id', width / 2, footerY);

  } else {
    // ==========================================
    // 1:1 SQUARE FEED POST
    // ==========================================
    const outerPad = 26;
    drawCartographyFrame(ctx, outerPad, width, height, goldAccent, borderOuter);

    const contentMargin = 60;
    const contentWidth = width - contentMargin * 2; // 960px

    const categoryText = (options.category || 'LOGICAL FALLACY').toUpperCase();
    ctx.font = `800 15px ${FONT_FAMILY}`;
    const textWidth = ctx.measureText(categoryText).width;
    const pillW = textWidth + 28;
    const pillH = 30;
    const pillY = 50;
    const pillX = (width - pillW) / 2;

    ctx.fillStyle = pillBg;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 6);
    ctx.fill();
    ctx.strokeStyle = pillBorder;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 6);
    ctx.stroke();

    ctx.fillStyle = themeColor;
    ctx.textAlign = 'center';
    ctx.fillText(categoryText, width / 2, pillY + 20);

    const artSize = 500;
    const artX = (width - artSize) / 2;
    const artY = pillY + pillH + 18;

    try {
      const img = await loadImage(`/assets/images/fallacies/${options.fallacyId}.jpg`);
      drawUncroppedImage(ctx, img, artX, artY, artSize, artSize, 14);
    } catch {
      // Fallback
    }

    const titleY = artY + artSize + 44;
    const titleSize = fitSingleLineText(ctx, options.name, width - 140, 46, 34, 900);
    ctx.font = `900 ${titleSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = titleColor;
    ctx.textAlign = 'center';
    ctx.fillText(options.name, width / 2, titleY);

    const subtitleY = titleY + 30;
    ctx.font = `700 22px ${FONT_FAMILY}`;
    ctx.fillStyle = subtitleColor;
    ctx.fillText(options.subtitle, width / 2, subtitleY);

    const cardY = subtitleY + 22;
    const cardHeight = 240;
    const cardPad = 24;

    ctx.fillStyle = cardBg;
    drawRoundedRect(ctx, contentMargin, cardY, contentWidth, cardHeight, 12);
    ctx.fill();
    ctx.strokeStyle = cardBorder;
    ctx.lineWidth = 1.5;
    drawRoundedRect(ctx, contentMargin, cardY, contentWidth, cardHeight, 12);
    ctx.stroke();

    ctx.fillStyle = themeColor;
    drawRoundedRect(ctx, contentMargin, cardY, 6, cardHeight, 3);
    ctx.fill();

    const descFit = findOptimalTextFit(ctx, options.description, contentWidth - cardPad * 2, 180, 19, 24, 500, 1.46);
    ctx.font = `500 ${descFit.fontSize}px ${FONT_FAMILY}`;
    ctx.fillStyle = cardTextColor;
    renderLines(ctx, descFit.lines, contentMargin + cardPad, cardY + cardPad + 14, descFit.lineHeight, 'left');

    const footerY = height - 36;
    ctx.font = `700 15px ${FONT_FAMILY}`;
    ctx.fillStyle = headerMuted;
    ctx.textAlign = 'center';
    ctx.fillText('UNESCO MIL 2026 Reference • verilens.aprilwang.id', width / 2, footerY);
  }

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
  const theme = options.theme || 'light';
  const blob = await generateStoryCardBlob({ ...options, theme });
  const formatSuffix = options.format || 'story';
  const fileName = `${options.fallacyId}-verilens-${formatSuffix}.png`;
  const file = new File([blob], fileName, { type: 'image/png' });

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
