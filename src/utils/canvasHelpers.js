/**
 * Canvas Math and Aspect Ratio Utilities
 */

export const ASPECT_RATIOS = {
  SQUARE: { width: 1080, height: 1080, ratio: 1 / 1, label: '1:1 Square (Feed)' },
  STORY: { width: 1080, height: 1920, ratio: 9 / 16, label: '9:16 Story / Reel' },
  BANNER: { width: 1200, height: 630, ratio: 1.91 / 1, label: '1.91:1 Banner / X Header' },
};

export const getCanvasDimensions = (aspectRatioKey = 'SQUARE') => {
  return ASPECT_RATIOS[aspectRatioKey] || ASPECT_RATIOS.SQUARE;
};
