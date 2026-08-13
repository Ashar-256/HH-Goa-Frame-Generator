/**
 * Hacker House Goa 2026 — HTML5 2D Canvas Frame Rendering Engine (Vibrant Upgrade)
 * 1080x1080 resolution client-side frame generator.
 * Vibrant festival aesthetics with rich color palette, organic photo window, and tropical illustrations.
 */

export const CANVAS_SIZE = 1080;

// Color Palette Tokens
export const COLORS = {
  PINK: '#FF2E8E',
  RED: '#FF4D4D',
  ORANGE: '#FF8A00',
  YELLOW: '#FFD23F',
  GREEN: '#22C55E',
  TEAL: '#00BFA5',
  CREAM: '#FFF3E0',
  DARK_TEAL: '#061a14',
  PURPLE: '#8B5CF6',
  CYAN: '#00E5FF',
};

/**
 * Main rendering function that renders a high-res 1080x1080 canvas frame.
 * 
 * @param {HTMLImageElement|string} imageSource - Cropped square image
 * @param {number} templateIndex - 0: Vibrant Tropical (Hero), 1: Festival Pass, 2: Poster
 * @returns {Promise<string>} Data URL of rendered 1080x1080 PNG image
 */
export const renderHHGoaFrame = async (imageSource, templateIndex = 0) => {
  const canvas = document.createElement('canvas');
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext('2d');

  // Load image element if string passed
  let imgElement = imageSource;
  if (typeof imageSource === 'string') {
    imgElement = await new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = imageSource;
    });
  }

  // Ensure fonts are loaded before canvas rendering
  try {
    await document.fonts.ready;
  } catch (e) {
    // Continue if font API unavailable
  }

  const templateId = Math.abs(templateIndex) % 3;

  if (templateId === 1) {
    renderFestivalPassTemplate(ctx, imgElement);
  } else if (templateId === 2) {
    renderPosterTemplate(ctx, imgElement);
  } else {
    renderVibrantTropicalTemplate(ctx, imgElement); // Primary Hero Template
  }

  return canvas.toDataURL('image/png', 0.95);
};

/**
 * Draws an image onto canvas preserving its natural aspect ratio using object-fit: cover logic.
 * Never stretches or distorts human faces or bodies.
 */
const drawImageAspectCover = (ctx, img, destX, destY, destW, destH) => {
  const imgW = img.naturalWidth || img.width || 1;
  const imgH = img.naturalHeight || img.height || 1;
  const imgRatio = imgW / imgH;
  const destRatio = destW / destH;

  let srcX = 0;
  let srcY = 0;
  let srcW = imgW;
  let srcH = imgH;

  if (imgRatio > destRatio) {
    srcW = imgH * destRatio;
    srcX = (imgW - srcW) / 2;
  } else {
    srcH = imgW / destRatio;
    srcY = (imgH - srcH) / 2;
  }

  ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
};

/* ==========================================================================
   TEMPLATE 01 — VIBRANT TROPICAL (HERO TEMPLATE - UPGRADED)
   ========================================================================== */
const renderVibrantTropicalTemplate = (ctx, img) => {
  // 1. Deep Dark Teal Background
  ctx.fillStyle = COLORS.DARK_TEAL;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // 2. Vibrant Outer Gradient Border
  drawVibrantOuterBorder(ctx);

  // 3. Top Header: Title & Subtitle
  drawTopHeader(ctx);

  // 4. Organic Wavy Photo Window & Hero Image (~80% Canvas Dominance)
  const photoX = 90;
  const photoY = 145;
  const photoW = 900;
  const photoH = 755;

  // Clip and render photo inside custom organic path
  ctx.save();
  drawOrganicPhotoPath(ctx, photoX, photoY, photoW, photoH);
  ctx.clip();
  drawImageAspectCover(ctx, img, photoX, photoY, photoW, photoH);
  ctx.restore();

  // Draw Vibrant Multi-Color Gradient Outline around organic photo window
  drawOrganicPhotoOutline(ctx, photoX, photoY, photoW, photoH);

  // 5. Layered Tropical Elements & Accents
  // Right Sunset & Palm Silhouette
  drawRightSunsetAndPalms(ctx, CANVAS_SIZE - 240, 520);

  // Bottom-Left Layered Pink & Green Palm Fronds (Overlapping Photo Corner)
  drawVibrantPalmLeavesLeft(ctx, 40, 620);

  // Grid Dots Accent (Top-Right & Bottom-Left)
  drawGridDots(ctx, CANVAS_SIZE - 90, 240, 4, 3, COLORS.CYAN);
  drawGridDots(ctx, 550, 780, 2, 4, COLORS.CYAN);

  // 6. Bottom Event Info & Badges
  drawBottomInfoBar(ctx);
};

/* ==========================================================================
   TEMPLATE 02 — FESTIVAL PASS (VIBRANT REFINEMENT)
   ========================================================================== */
const renderFestivalPassTemplate = (ctx, img) => {
  ctx.fillStyle = COLORS.DARK_TEAL;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  drawVibrantOuterBorder(ctx);

  // Header Badge
  ctx.font = '700 44px "Bebas Neue", sans-serif';
  ctx.fillStyle = COLORS.YELLOW;
  ctx.textAlign = 'center';
  ctx.fillText('HACKER HOUSE GOA 2026', CANVAS_SIZE / 2, 75);

  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillStyle = COLORS.PINK;
  ctx.fillText('OFFICIAL BUILDER PASS  •  AI × CRYPTO × MULTICHAIN', CANVAS_SIZE / 2, 105);

  // Photo Box
  const photoX = 100;
  const photoY = 130;
  const photoW = 880;
  const photoH = 750;

  ctx.save();
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 20);
  ctx.clip();
  drawImageAspectCover(ctx, img, photoX, photoY, photoW, photoH);
  ctx.restore();

  ctx.strokeStyle = COLORS.YELLOW;
  ctx.lineWidth = 4;
  drawRoundedRect(ctx, photoX, photoY, photoW, photoH, 20);
  ctx.stroke();

  // Accents
  drawVibrantPalmLeavesLeft(ctx, 50, 680);
  drawRightSunsetAndPalms(ctx, CANVAS_SIZE - 200, 580);

  // Footer
  drawBottomInfoBar(ctx);
};

/* ==========================================================================
   TEMPLATE 03 — POSTER (VIBRANT REFINEMENT)
   ========================================================================== */
const renderPosterTemplate = (ctx, img) => {
  ctx.fillStyle = COLORS.DARK_TEAL;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  drawVibrantOuterBorder(ctx);

  // Large Title
  ctx.font = '700 76px "Bebas Neue", sans-serif';
  ctx.fillStyle = COLORS.YELLOW;
  ctx.textAlign = 'center';
  ctx.fillText('HH GOA 2026', CANVAS_SIZE / 2, 90);

  // Photo Box
  const photoX = 90;
  const photoY = 120;
  const photoW = 900;
  const photoH = 770;

  ctx.save();
  drawOrganicPhotoPath(ctx, photoX, photoY, photoW, photoH);
  ctx.clip();
  drawImageAspectCover(ctx, img, photoX, photoY, photoW, photoH);
  ctx.restore();

  drawOrganicPhotoOutline(ctx, photoX, photoY, photoW, photoH);

  // Accents
  drawVibrantPalmLeavesLeft(ctx, 40, 650);
  drawRightSunsetAndPalms(ctx, CANVAS_SIZE - 220, 550);

  // Footer
  drawBottomInfoBar(ctx);
};

/* ==========================================================================
   CANVAS VECTOR & PATH DRAWING UTILITIES
   ========================================================================== */

/**
 * Vibrant Outer Gradient Border (Sleek & Thinner)
 */
const drawVibrantOuterBorder = (ctx) => {
  const margin = 10;
  const w = CANVAS_SIZE - margin * 2;
  const h = CANVAS_SIZE - margin * 2;

  const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  gradient.addColorStop(0, COLORS.PINK);
  gradient.addColorStop(0.3, COLORS.ORANGE);
  gradient.addColorStop(0.6, COLORS.YELLOW);
  gradient.addColorStop(0.8, COLORS.GREEN);
  gradient.addColorStop(1, COLORS.TEAL);

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2.5;
  drawRoundedRect(ctx, margin, margin, w, h, 20);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 243, 224, 0.2)';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, margin + 4, margin + 4, w - 8, h - 8, 16);
  ctx.stroke();
};

/**
 * Top Header Rendering
 */
const drawTopHeader = (ctx) => {
  // HH GOA 26 Title
  ctx.font = '700 68px "Bebas Neue", sans-serif';
  ctx.textAlign = 'left';

  ctx.fillStyle = COLORS.CREAM;
  ctx.fillText('HH', 42, 82);

  const hhWidth = ctx.measureText('HH').width;
  ctx.fillStyle = COLORS.TEAL;
  ctx.fillText('GOA', 42 + hhWidth + 10, 82);

  const goaWidth = ctx.measureText('GOA').width;
  ctx.fillStyle = COLORS.PINK;
  ctx.fillText('26', 42 + hhWidth + 10 + goaWidth + 10, 82);

  // Flying Birds Silhouette under title
  drawFlyingBirds(ctx, 270, 44);

  // Top Right Subtitle
  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillStyle = COLORS.CREAM;
  ctx.textAlign = 'right';
  ctx.fillText('AI × CRYPTO × MULTICHAIN', CANVAS_SIZE - 42, 58);

  // Wavy pink & cyan accent line
  drawPinkCyanWave(ctx, CANVAS_SIZE - 235, 70, 192);
};

/**
 * Organic Flowing Photo Window Path
 */
const drawOrganicPhotoPath = (ctx, x, y, w, h) => {
  ctx.beginPath();
  ctx.moveTo(x + 50, y);
  ctx.quadraticCurveTo(x + w / 2, y - 16, x + w - 50, y + 12);
  ctx.quadraticCurveTo(x + w + 18, y + h / 2, x + w - 30, y + h - 40);
  ctx.quadraticCurveTo(x + w / 2 + 40, y + h + 22, x + 50, y + h - 12);
  ctx.quadraticCurveTo(x - 20, y + h / 2 - 10, x + 50, y);
  ctx.closePath();
};

/**
 * Organic Photo Window Multi-Color Gradient Outline (Sleek 3px Stroke)
 */
const drawOrganicPhotoOutline = (ctx, x, y, w, h) => {
  ctx.save();

  const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
  gradient.addColorStop(0, COLORS.TEAL);
  gradient.addColorStop(0.35, COLORS.YELLOW);
  gradient.addColorStop(0.7, COLORS.ORANGE);
  gradient.addColorStop(1, COLORS.PINK);

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 3;
  drawOrganicPhotoPath(ctx, x, y, w, h);
  ctx.stroke();

  ctx.restore();
};

/**
 * Bottom Info Bar & Badges
 */
const drawBottomInfoBar = (ctx) => {
  const footerY = 965;

  // 1. Location Info (Bottom-Left)
  drawLocationPinIcon(ctx, 48, footerY - 14, COLORS.ORANGE);
  
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillStyle = COLORS.YELLOW;
  ctx.textAlign = 'left';
  ctx.fillText('GOA, INDIA', 80, footerY - 6);

  ctx.font = '600 12px "JetBrains Mono", monospace';
  ctx.fillStyle = COLORS.TEAL;
  ctx.fillText('WHERE BUILDERS MEET PARADISE', 80, footerY + 14);

  // Vertical Separator
  ctx.strokeStyle = 'rgba(255, 243, 224, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(350, footerY - 24);
  ctx.lineTo(350, footerY + 22);
  ctx.stroke();

  // 2. Event Date (Bottom-Center)
  drawCalendarIcon(ctx, 375, footerY - 16, COLORS.RED);

  ctx.font = '700 22px "Bebas Neue", sans-serif';
  ctx.fillStyle = COLORS.CREAM;
  ctx.fillText('28–31', 415, footerY - 6);

  ctx.font = '700 18px "Bebas Neue", sans-serif';
  ctx.fillStyle = COLORS.YELLOW;
  ctx.fillText('OCT 2026', 415, footerY + 14);

  // 3. "LESS NOISE. MORE SIGNAL." Dual-Color Brush Banner (Bottom-Right)
  drawVibrantSignalBadge(ctx, CANVAS_SIZE - 280, footerY - 35);
};

/**
 * Dual-Color Brush Badge: "LESS NOISE. MORE SIGNAL."
 */
const drawVibrantSignalBadge = (ctx, x, y) => {
  const w = 230;
  const h = 58;

  // Top Pink Brush Bar
  ctx.fillStyle = COLORS.PINK;
  ctx.beginPath();
  ctx.roundRect(x, y, w, 28, [6, 6, 0, 0]);
  ctx.fill();

  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.fillText('LESS NOISE.', x + w / 2, y + 19);

  // Bottom Yellow Brush Bar
  ctx.fillStyle = COLORS.YELLOW;
  ctx.beginPath();
  ctx.roundRect(x - 6, y + 26, w + 12, 30, [0, 0, 8, 8]);
  ctx.fill();

  ctx.font = '800 15px "JetBrains Mono", monospace';
  ctx.fillStyle = COLORS.DARK_TEAL;
  ctx.fillText('MORE SIGNAL.', x + w / 2, y + 47);
};

/**
 * Layered Pink & Green Palm Fronds (Bottom-Left)
 */
const drawVibrantPalmLeavesLeft = (ctx, x, y) => {
  ctx.save();

  // Pink Palm Frond
  ctx.strokeStyle = COLORS.PINK;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y + 160);
  ctx.quadraticCurveTo(x + 40, y + 60, x + 160, y + 20);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 160, y + 20); ctx.quadraticCurveTo(x + 120, y + 50, x + 70, y + 100);
  ctx.moveTo(x + 160, y + 20); ctx.quadraticCurveTo(x + 140, y - 20, x + 90, y - 10);
  ctx.moveTo(x + 160, y + 20); ctx.quadraticCurveTo(x + 180, y + 60, x + 210, y + 90);
  ctx.stroke();

  // Bright Green Palm Frond Overlapping
  ctx.strokeStyle = COLORS.GREEN;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.moveTo(x - 20, y + 200);
  ctx.quadraticCurveTo(x + 20, y + 100, x + 120, y + 50);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x + 120, y + 50); ctx.quadraticCurveTo(x + 80, y + 10, x + 20, y + 30);
  ctx.moveTo(x + 120, y + 50); ctx.quadraticCurveTo(x + 150, y + 10, x + 170, y - 20);
  ctx.moveTo(x + 120, y + 50); ctx.quadraticCurveTo(x + 130, y + 100, x + 150, y + 130);
  ctx.stroke();

  ctx.restore();
};

/**
 * Right Setting Sun & Palm Silhouette
 */
const drawRightSunsetAndPalms = (ctx, x, y) => {
  ctx.save();

  // Gradient Sun
  const sunGrad = ctx.createRadialGradient(x + 60, y + 40, 10, x + 60, y + 40, 75);
  sunGrad.addColorStop(0, COLORS.YELLOW);
  sunGrad.addColorStop(0.7, COLORS.ORANGE);
  sunGrad.addColorStop(1, COLORS.PINK);

  ctx.fillStyle = sunGrad;
  ctx.beginPath();
  ctx.arc(x + 60, y + 40, 70, 0, Math.PI * 2);
  ctx.fill();

  // Sea Horizon Lines
  ctx.strokeStyle = COLORS.TEAL;
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.moveTo(x - 40, y + 85); ctx.lineTo(x + 160, y + 85);
  ctx.moveTo(x - 20, y + 96); ctx.lineTo(x + 140, y + 96);
  ctx.moveTo(x + 10, y + 107); ctx.lineTo(x + 110, y + 107);
  ctx.stroke();

  // Dark Palm Tree Silhouette
  ctx.strokeStyle = COLORS.DARK_TEAL;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(x + 120, y + 160);
  ctx.quadraticCurveTo(x + 110, y + 60, x + 80, y - 20);
  ctx.stroke();

  ctx.lineWidth = 3.5;
  const px = x + 80;
  const py = y - 20;
  ctx.beginPath();
  ctx.moveTo(px, py); ctx.quadraticCurveTo(px - 40, py - 10, px - 60, py + 20);
  ctx.moveTo(px, py); ctx.quadraticCurveTo(px - 20, py - 35, px + 10, py - 40);
  ctx.moveTo(px, py); ctx.quadraticCurveTo(px + 30, py - 20, px + 50, py + 10);
  ctx.stroke();

  ctx.restore();
};

/**
 * Flying Birds Vector Silhouette
 */
const drawFlyingBirds = (ctx, x, y) => {
  ctx.strokeStyle = COLORS.YELLOW;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  // Bird 1
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 8, y - 8, x + 16, y);
  ctx.quadraticCurveTo(x + 24, y - 8, x + 32, y);
  // Bird 2
  ctx.moveTo(x + 35, y + 12);
  ctx.quadraticCurveTo(x + 41, y + 6, x + 47, y + 12);
  ctx.quadraticCurveTo(x + 53, y + 6, x + 59, y + 12);
  ctx.stroke();
};

/**
 * Pink & Cyan Wavy Accent Line
 */
const drawPinkCyanWave = (ctx, x, y, w) => {
  ctx.lineWidth = 3;
  const step = w / 6;

  ctx.strokeStyle = COLORS.PINK;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let i = 0; i < 3; i++) {
    ctx.quadraticCurveTo(x + i * step * 2 + step / 2, y - 5, x + i * step * 2 + step, y);
  }
  ctx.stroke();

  ctx.strokeStyle = COLORS.CYAN;
  ctx.beginPath();
  ctx.moveTo(x + step, y);
  for (let i = 0.5; i < 3; i++) {
    ctx.quadraticCurveTo(x + i * step * 2 + step / 2, y + 5, x + i * step * 2 + step, y);
  }
  ctx.stroke();
};

/**
 * Grid Dot Matrix Accent
 */
const drawGridDots = (ctx, x, y, rows, cols, color) => {
  ctx.fillStyle = color;
  const spacing = 10;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      ctx.arc(x + c * spacing, y + r * spacing, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

/**
 * Location Pin Icon
 */
const drawLocationPinIcon = (ctx, x, y, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 9, Math.PI, 0);
  ctx.quadraticCurveTo(x + 9, y + 10, x, y + 20);
  ctx.quadraticCurveTo(x - 9, y + 10, x - 9, y);
  ctx.fill();

  ctx.fillStyle = COLORS.DARK_TEAL;
  ctx.beginPath();
  ctx.arc(x, y, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
};

/**
 * Calendar Pass Icon
 */
const drawCalendarIcon = (ctx, x, y, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  drawRoundedRect(ctx, x, y, 24, 24, 4);
  ctx.stroke();

  ctx.fillRect(x + 4, y + 6, 16, 3);
  ctx.fillRect(x + 5, y - 3, 3, 5);
  ctx.fillRect(x + 16, y - 3, 3, 5);

  ctx.restore();
};

/**
 * Helper rounded rectangle
 */
const drawRoundedRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};
