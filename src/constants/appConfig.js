/**
 * Hacker House Goa 2026 — Frame Generator Architecture & Configuration
 */

export const APP_INFO = {
  name: 'Hacker House Goa 2026 Frame Generator',
  shortName: 'HH Goa Frame Generator',
  edition: 'Goa 2026 Edition',
  version: '0.1.0-foundation',
  status: 'Foundation Ready',
};

export const MODULE_ARCHITECTURE = [
  {
    id: 'upload',
    name: 'Photo Upload',
    status: 'Ready for Implementation',
    description: 'Handles drag-and-drop, file picker, file size validation, and format support.',
    icon: 'UploadCloud',
    phase: 'Task 2'
  },
  {
    id: 'processing',
    name: 'Image Processing',
    status: 'Ready for Implementation',
    description: 'Client-side image scaling, rotation, brightness, and contrast adjustments.',
    icon: 'Sliders',
    phase: 'Task 2'
  },
  {
    id: 'detection',
    name: 'Face Detection',
    status: 'Ready for Implementation',
    description: 'Client-side AI detection for automatically identifying human faces and facial bounding boxes.',
    icon: 'Scan',
    phase: 'Task 3'
  },
  {
    id: 'selection',
    name: 'Subject Selection',
    status: 'Ready for Implementation',
    description: 'Interactive selection for targeting key subjects in multi-person or complex photos.',
    icon: 'UserCheck',
    phase: 'Task 3'
  },
  {
    id: 'crop',
    name: 'Focal-Point Cropping',
    status: 'Ready for Implementation',
    description: 'Smart auto-centering on key face/subject features across square, story, and banner aspect ratios.',
    icon: 'Crop',
    phase: 'Task 3'
  },
  {
    id: 'canvas',
    name: 'Canvas Rendering',
    status: 'Ready for Implementation',
    description: 'High-performance HTML5 2D Canvas engine for real-time composite rendering.',
    icon: 'Layers',
    phase: 'Task 4'
  },
  {
    id: 'frame',
    name: 'HH Goa Frame Rendering',
    status: 'Ready for Implementation',
    description: 'Dynamic overlay of official Hacker House Goa 2026 branded graphics, badges, and text.',
    icon: 'Sparkles',
    phase: 'Task 4'
  },
  {
    id: 'download',
    name: 'Image Download',
    status: 'Ready for Implementation',
    description: 'Exporting crisp PNG/JPEG graphics with custom filename generation.',
    icon: 'Download',
    phase: 'Task 5'
  },
  {
    id: 'share',
    name: 'X (Twitter) Sharing',
    status: 'Ready for Implementation',
    description: 'One-click tweet intent generation with pre-populated event hashtags and share text.',
    icon: 'Share2',
    phase: 'Task 5'
  }
];

export const SYSTEM_SPECS = [
  { label: 'Framework', value: 'React 18.3' },
  { label: 'Build Tool', value: 'Vite 6.0' },
  { label: 'Architecture', value: 'Client-Only (Zero Backend)' },
  { label: 'Responsive Strategy', value: 'Mobile-First Glassmorphism' },
  { label: 'Target Event', value: 'Hacker House Goa 2026' }
];
