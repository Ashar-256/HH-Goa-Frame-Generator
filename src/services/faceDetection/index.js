/**
 * MediaPipe Face Detection Service
 * Dynamically resolves MediaPipe Tasks Vision (local package or ESM CDN fallback)
 * Non-blocking, resilient, and graceful fallback to center focal point.
 */

let detectorInstance = null;
let initPromise = null;
let isInitializing = false;
let initFailed = false;

// Dynamic loader for MediaPipe Tasks Vision
const loadMediaPipeVision = async () => {
  try {
    const cdnUrl = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/+esm';
    const visionModule = await import(/* @vite-ignore */ cdnUrl);
    return visionModule;
  } catch (err) {
    console.warn('[MediaPipe] ESM CDN import failed, trying window global:', err);
    if (window.tasksVision) return window.tasksVision;
    return null;
  }
};

/**
 * Initialize MediaPipe FaceDetector singleton with 0.50 confidence threshold.
 */
export const initFaceDetector = async () => {
  if (detectorInstance) return detectorInstance;
  if (initPromise) return initPromise;

  isInitializing = true;
  initFailed = false;

  initPromise = (async () => {
    try {
      const vision = await loadMediaPipeVision();
      if (!vision || !vision.FaceDetector || !vision.FilesetResolver) {
        console.warn('[MediaPipe] Tasks Vision modules not loaded.');
        initFailed = true;
        isInitializing = false;
        return null;
      }

      const { FaceDetector, FilesetResolver } = vision;

      const fileset = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm'
      );

      // Try GPU delegate first, fallback to CPU
      try {
        detectorInstance = await FaceDetector.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: 'GPU'
          },
          runningMode: 'IMAGE',
          minDetectionConfidence: 0.50,
          minSuppressionThreshold: 0.30
        });
        console.log('[MediaPipe] FaceDetector GPU initialized successfully.');
      } catch (gpuErr) {
        console.warn('[MediaPipe] GPU init failed, trying CPU:', gpuErr);
        detectorInstance = await FaceDetector.createFromOptions(fileset, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: 'CPU'
          },
          runningMode: 'IMAGE',
          minDetectionConfidence: 0.45,
          minSuppressionThreshold: 0.30
        });
        console.log('[MediaPipe] FaceDetector CPU fallback initialized.');
      }

      isInitializing = false;
      return detectorInstance;
    } catch (err) {
      console.error('[MediaPipe] Detector initialization failed:', err);
      initFailed = true;
      isInitializing = false;
      initPromise = null;
      return null;
    }
  })();

  return initPromise;
};

/**
 * Creates an offscreen Canvas rescaled to max 1024px dimension for optimal detection sensitivity.
 */
const createDetectionCanvas = (imageElement) => {
  const naturalWidth = imageElement.naturalWidth || imageElement.width || 1024;
  const naturalHeight = imageElement.naturalHeight || imageElement.height || 1024;

  const MAX_DIM = 1024;
  let targetWidth = naturalWidth;
  let targetHeight = naturalHeight;

  if (naturalWidth > MAX_DIM || naturalHeight > MAX_DIM) {
    if (naturalWidth > naturalHeight) {
      targetWidth = MAX_DIM;
      targetHeight = Math.round((naturalHeight / naturalWidth) * MAX_DIM);
    } else {
      targetHeight = MAX_DIM;
      targetWidth = Math.round((naturalWidth / naturalHeight) * MAX_DIM);
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageElement, 0, 0, targetWidth, targetHeight);

  return { canvas, naturalWidth, naturalHeight, targetWidth, targetHeight };
};

/**
 * Computes Intersection-over-Union (IoU) of two normalized bounding boxes.
 */
const calculateIoU = (boxA, boxB) => {
  const ax1 = boxA.x;
  const ay1 = boxA.y;
  const ax2 = boxA.x + boxA.width;
  const ay2 = boxA.y + boxA.height;

  const bx1 = boxB.x;
  const by1 = boxB.y;
  const bx2 = boxB.x + boxB.width;
  const by2 = boxB.y + boxB.height;

  const interX1 = Math.max(ax1, bx1);
  const interY1 = Math.max(ay1, by1);
  const interX2 = Math.min(ax2, bx2);
  const interY2 = Math.min(ay2, by2);

  const interWidth = Math.max(0, interX2 - interX1);
  const interHeight = Math.max(0, interY2 - interY1);
  const interArea = interWidth * interHeight;

  const areaA = boxA.width * boxA.height;
  const areaB = boxB.width * boxB.height;

  const unionArea = areaA + areaB - interArea;
  if (unionArea <= 0) return 0;

  return interArea / unionArea;
};

/**
 * Filter duplicate overlapping detection boxes using Non-Maximum Suppression (NMS).
 */
const applyNMS = (faces, iouThreshold = 0.35) => {
  if (faces.length <= 1) return faces;

  // Sort faces descending by confidence score
  const sorted = [...faces].sort((a, b) => b.confidence - a.confidence);
  const selected = [];

  for (const candidate of sorted) {
    let keep = true;
    for (const approved of selected) {
      const iou = calculateIoU(candidate.normBox, approved.normBox);

      // Check if candidate center is inside an already approved face box
      const isCenterInside = (
        candidate.centerX * 100 >= approved.normBox.x &&
        candidate.centerX * 100 <= approved.normBox.x + approved.normBox.width &&
        candidate.centerY * 100 >= approved.normBox.y &&
        candidate.centerY * 100 <= approved.normBox.y + approved.normBox.height
      );

      if (iou > iouThreshold || isCenterInside) {
        keep = false;
        break;
      }
    }
    if (keep) {
      selected.push(candidate);
    }
  }

  // Sort left-to-right (by centerX)
  selected.sort((a, b) => a.centerX - b.centerX);

  // Re-index face labels cleanly (Builder #1, Builder #2)
  return selected.map((face, i) => ({
    ...face,
    id: `face_${i + 1}`,
    name: `Builder #${i + 1}`
  }));
};

/**
 * Detect faces in an HTMLImageElement, HTMLCanvasElement, or ImageBitmap.
 * @param {HTMLImageElement} imageElement 
 * @returns {Promise<{ faces: Array, focalPoint: { centerX: number, centerY: number }, fallbackUsed: boolean }>}
 */
export const detectFaces = async (imageElement) => {
  const fallbackFocalPoint = { centerX: 0.5, centerY: 0.5 };

  if (!imageElement) {
    return { faces: [], focalPoint: fallbackFocalPoint, error: 'No image element provided' };
  }

  try {
    // 1. Prepare detection canvas optimized to 1024px max dimension
    const { canvas, naturalWidth, naturalHeight, targetWidth, targetHeight } = createDetectionCanvas(imageElement);

    // 2. Ensure detector is initialized
    const detector = await initFaceDetector();
    
    if (!detector) {
      console.warn('[FaceDetection] Detector unavailable. Using center focal point fallback.');
      return { faces: [], focalPoint: fallbackFocalPoint, fallbackUsed: true };
    }

    // 3. Run MediaPipe detector on rescaled canvas
    const detectionResult = detector.detect(canvas);
    const rawDetections = detectionResult?.detections || [];

    if (rawDetections.length === 0) {
      console.log('[FaceDetection] 0 faces detected. Using center focal point fallback.');
      return { faces: [], focalPoint: fallbackFocalPoint, fallbackUsed: true };
    }

    // 4. Normalize detection coordinates & filter non-face aspect ratio noise
    const rawFaces = rawDetections
      .map((detection, index) => {
        const bbox = detection.boundingBox;
        const confidence = detection.categories?.[0]?.score || 0.9;

        const originX = Math.max(0, bbox.originX);
        const originY = Math.max(0, bbox.originY);
        const width = Math.min(targetWidth - originX, bbox.width);
        const height = Math.min(targetHeight - originY, bbox.height);

        const centerX = Math.min(1, Math.max(0, (originX + width / 2) / targetWidth));
        const centerY = Math.min(1, Math.max(0, (originY + height / 2) / targetHeight));

        const normX = (originX / targetWidth) * 100;
        const normY = (originY / targetHeight) * 100;
        const normWidth = (width / targetWidth) * 100;
        const normHeight = (height / targetHeight) * 100;

        const aspectRatio = width / (height || 1);

        return {
          id: `raw_face_${index + 1}`,
          name: `Builder #${index + 1}`,
          confidence,
          aspectRatio,
          boundingBox: { 
            originX: (originX / targetWidth) * naturalWidth, 
            originY: (originY / targetHeight) * naturalHeight, 
            width: (width / targetWidth) * naturalWidth, 
            height: (height / targetHeight) * naturalHeight 
          },
          normBox: { x: normX, y: normY, width: normWidth, height: normHeight },
          centerX,
          centerY
        };
      })
      // Filter out non-face shapes (faces generally have aspect ratio between 0.6 and 1.6)
      .filter((f) => f.confidence >= 0.45 && f.aspectRatio >= 0.55 && f.aspectRatio <= 1.7);

    if (rawFaces.length === 0) {
      console.log('[FaceDetection] No face candidates passed confidence/shape filters.');
      return { faces: [], focalPoint: fallbackFocalPoint, fallbackUsed: true };
    }

    // 5. Apply IoU Non-Maximum Suppression to filter duplicate overlapping boxes
    const faces = applyNMS(rawFaces, 0.35);

    // 6. Select primary face with highest area / confidence
    let primaryFace = faces[0];
    let bestScore = -1;

    for (const face of faces) {
      const areaScore = (face.normBox.width * face.normBox.height) / 1000;
      const centerDistScore = 1 - Math.hypot(face.centerX - 0.5, face.centerY - 0.5);
      const score = face.confidence * 0.5 + areaScore * 0.3 + centerDistScore * 0.2;
      if (score > bestScore) {
        bestScore = score;
        primaryFace = face;
      }
    }

    console.log(`[FaceDetection] Filtered ${faces.length} real faces:`, faces);

    return {
      faces,
      primaryFace,
      focalPoint: { centerX: primaryFace.centerX, centerY: primaryFace.centerY },
      fallbackUsed: false
    };
  } catch (err) {
    console.warn('[FaceDetection] Detection processing error:', err);
    return { faces: [], focalPoint: fallbackFocalPoint, fallbackUsed: true, error: err.message };
  }
};
