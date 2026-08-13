/**
 * Canvas Math, Aspect Ratio & Automatic Smart-Crop Utilities
 */

export const ASPECT_RATIOS = {
  SQUARE: { width: 1080, height: 1080, ratio: 1 / 1, label: '1:1 Square (Feed)' },
  STORY: { width: 1080, height: 1920, ratio: 9 / 16, label: '9:16 Story / Reel' },
  BANNER: { width: 1200, height: 630, ratio: 1.91 / 1, label: '1.91:1 Banner / X Header' },
};

export const getCanvasDimensions = (aspectRatioKey = 'SQUARE') => {
  return ASPECT_RATIOS[aspectRatioKey] || ASPECT_RATIOS.SQUARE;
};

/**
 * Deterministic focal-point smart crop function.
 * Crops a 1:1 square from imageElement centered around focalPoint { centerX, centerY }
 * and clamped safely to source image boundaries.
 * 
 * @param {HTMLImageElement} imageElement 
 * @param {{ centerX: number, centerY: number }} focalPoint 
 * @param {number} targetOutputSize Output canvas square size (default 1080)
 * @returns {string} Data URL of the cropped square image
 */
export const cropImageToSquare = (imageElement, focalPoint = { centerX: 0.5, centerY: 0.5 }, targetOutputSize = 1080) => {
  if (!imageElement) return '';

  const naturalWidth = imageElement.naturalWidth || imageElement.width || 1080;
  const naturalHeight = imageElement.naturalHeight || imageElement.height || 1080;

  // 1. Determine crop square size (maximum possible square from source image)
  const cropSize = Math.min(naturalWidth, naturalHeight);

  // 2. Determine target focal point in source image pixels
  const cX = Math.max(0, Math.min(1, focalPoint?.centerX ?? 0.5));
  const cY = Math.max(0, Math.min(1, focalPoint?.centerY ?? 0.5));

  const targetX = cX * naturalWidth;
  const targetY = cY * naturalHeight;

  // 3. Calculate ideal crop top-left origin centered at focal point
  const idealCropX = targetX - cropSize / 2;
  const idealCropY = targetY - cropSize / 2;

  // 4. Clamp crop origin against source image boundaries [0, naturalWidth - cropSize] & [0, naturalHeight - cropSize]
  const cropX = Math.max(0, Math.min(naturalWidth - cropSize, idealCropX));
  const cropY = Math.max(0, Math.min(naturalHeight - cropSize, idealCropY));

  // 5. Draw onto 1080x1080 2D Offscreen Canvas
  const canvas = document.createElement('canvas');
  canvas.width = targetOutputSize;
  canvas.height = targetOutputSize;
  const ctx = canvas.getContext('2d');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    imageElement,
    cropX,
    cropY,
    cropSize,
    cropSize,
    0,
    0,
    targetOutputSize,
    targetOutputSize
  );

  return canvas.toDataURL('image/jpeg', 0.92);
};
