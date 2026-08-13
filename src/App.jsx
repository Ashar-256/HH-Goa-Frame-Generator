import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/common/Header';
import { UploadWorkspace } from './components/upload/UploadWorkspace';
import { FaceSelectionWorkspace } from './components/detection/FaceSelectionWorkspace';
import { ResultWorkspace } from './components/canvas/ResultWorkspace';
import { initFaceDetector, detectFaces } from './services/faceDetection';
import { validateImageFile, loadImageElement, revokeImageObjectUrl } from './utils/fileHelpers';
import { cropImageToSquare } from './utils/canvasHelpers';
import { renderHHGoaFrame } from './services/canvas';
import { getRandomShareText } from './utils/shareHelpers';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [workspaceState, setWorkspaceState] = useState('UPLOAD'); // 'UPLOAD', 'SELECT', 'RESULT'
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const [renderedFrameUrl, setRenderedFrameUrl] = useState(null);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const [selectedFocalPoint, setSelectedFocalPoint] = useState({ centerX: 0.5, centerY: 0.5 });
  const [selectedFaceId, setSelectedFaceId] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [templateIndex, setTemplateIndex] = useState(0); // Rotates templates automatically (0, 1, 2)

  // Store active decoded HTMLImageElement reference for fast smart-cropping
  const activeImageRef = useRef(null);

  // Initialize MediaPipe detector in background after UI is interactive
  useEffect(() => {
    const timer = setTimeout(() => {
      initFaceDetector().catch((err) => {
        console.warn('[App] MediaPipe background pre-init warning:', err);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const generateFinalFrame = async (croppedUrl, currentTplIndex) => {
    try {
      const frameUrl = await renderHHGoaFrame(croppedUrl, currentTplIndex);
      setRenderedFrameUrl(frameUrl);
    } catch (err) {
      console.warn('[App] Frame rendering warning:', err);
      setRenderedFrameUrl(croppedUrl); // Fallback to cropped image if canvas fails
    }
  };

  const handleFileSelect = async (file) => {
    setUploadError(null);

    // 1. Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      return;
    }

    try {
      // 2. Decode image file into loaded HTMLImageElement
      const imgElement = await loadImageElement(file);
      activeImageRef.current = imgElement;

      const objectUrl = imgElement._objectUrl || URL.createObjectURL(file);
      setUploadedImageSrc(objectUrl);

      // 3. Run real MediaPipe face detection
      const result = await detectFaces(imgElement);
      const faces = result.faces || [];
      const focalPoint = result.focalPoint || { centerX: 0.5, centerY: 0.5 };

      if (faces.length >= 2) {
        // Multi-face photo: show selection UI
        setDetectedFaces(faces);
        setSelectedFocalPoint(focalPoint);
        setWorkspaceState('SELECT');
      } else {
        // Single face or 0 faces: auto-crop & render HH Goa frame
        setDetectedFaces(faces);
        setSelectedFocalPoint(focalPoint);
        setSelectedFaceId(faces[0]?.id || 'face_1');

        // Execute deterministic smart crop to 1080x1080 square
        const croppedUrl = cropImageToSquare(imgElement, focalPoint);
        setCroppedImageSrc(croppedUrl);

        // Render 1080x1080 HTML5 2D Canvas frame
        await generateFinalFrame(croppedUrl, templateIndex);

        setWorkspaceState('RESULT');
      }
    } catch (err) {
      console.error('[App] File processing error:', err);
      setUploadError(err.message || 'Failed to process photo. Please try another image.');
    }
  };

  const handleSelectFace = async (face) => {
    if (face && activeImageRef.current) {
      const focalPoint = { centerX: face.centerX, centerY: face.centerY };
      setSelectedFaceId(face.id);
      setSelectedFocalPoint(focalPoint);

      // Smart-crop square centered on user-selected face
      const croppedUrl = cropImageToSquare(activeImageRef.current, focalPoint);
      setCroppedImageSrc(croppedUrl);

      // Render 1080x1080 HTML5 2D Canvas frame
      await generateFinalFrame(croppedUrl, templateIndex);
    }
    // Proceed directly to Result State
    setWorkspaceState('RESULT');
  };

  const handleResetWorkspace = () => {
    if (uploadedImageSrc) {
      revokeImageObjectUrl(uploadedImageSrc);
    }
    activeImageRef.current = null;
    setUploadedImageSrc(null);
    setCroppedImageSrc(null);
    setRenderedFrameUrl(null);
    setDetectedFaces([]);
    setSelectedFocalPoint({ centerX: 0.5, centerY: 0.5 });
    setSelectedFaceId(null);
    setUploadError(null);
    
    // Automatically rotate to next template on Create Another
    setTemplateIndex((prev) => (prev + 1) % 3);
    setWorkspaceState('UPLOAD');
  };

  const [shareNotice, setShareNotice] = useState(false);

  const handleDownload = () => {
    if (!renderedFrameUrl) return;
    const link = document.createElement('a');
    link.download = `hh-goa-2026-pfp-${Date.now()}.png`;
    link.href = renderedFrameUrl;
    link.click();
  };

  const handleShare = async () => {
    if (renderedFrameUrl) {
      // 1. Auto-download PNG image to user's device
      const link = document.createElement('a');
      link.download = `hh-goa-2026-pfp-${Date.now()}.png`;
      link.href = renderedFrameUrl;
      link.click();

      // 2. Copy PNG image blob to clipboard if supported by browser
      try {
        const res = await fetch(renderedFrameUrl);
        const blob = await res.blob();
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
        }
      } catch (e) {
        // Fallback silently if clipboard write permissions unavailable
      }
    }

    // 3. Open X compose interface with randomized caption
    const isMultiFace = detectedFaces.length >= 2;
    const rawText = getRandomShareText(isMultiFace);
    const text = encodeURIComponent(rawText);

    setShareNotice(true);
    setTimeout(() => setShareNotice(false), 10000);

    window.open(`https://x.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col grid-lines bg-background text-on-background">
      {/* Persistent Header */}
      <Header />

      {/* Main Generator Composition (Fixed Page Structure) */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-12 w-full max-w-[1440px] mx-auto">
        
        {/* Persistent Green Framed Container */}
        <div className="w-full max-w-[1100px] bg-[#0a2d1d] p-6 md:p-8 lg:p-12 double-drawn-border relative overflow-hidden flex flex-col justify-between shadow-2xl">
          
          {/* Top Frame Header */}
          <div className="flex justify-between items-center mb-8 border-b border-[#35352f]/40 pb-4 font-mono-labels text-xs text-secondary-fixed uppercase">
            <span className="tracking-widest">HH GOA 26</span>
            <div className="flex items-center gap-1.5">
              <span className="tracking-widest text-[#ffb1c4]">AI × CRYPTO × MULTICHAIN</span>
              <svg width="18" height="6" viewBox="0 0 18 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5c1-1.5 2-1.5 3 0s2 1.5 3 0 2-1.5 3 0" stroke="#ff007a" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Persistent Two-Column Layout */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[420px]">
            
            {/* FIXED LEFT SIDE: Branding, Headlines, CTA, & Sunset Illustration */}
            <div className="lg:col-span-5 flex flex-col justify-between text-left h-full">
              <div className="flex flex-col">
                <h2 className="font-display-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.9] text-secondary-fixed mb-4 tracking-tight">
                  FRAME YOUR<br />
                  IDENTITY<br />
                  BUILDER<span className="text-[#ff007a]">.</span>
                </h2>

                <p className="font-body-lg text-[#e5e2da] opacity-90 text-lg mb-6 leading-relaxed">
                  Create your Hacker House Goa 2026 profile frame.
                </p>

                {/* Pink Wave Divider */}
                <svg width="48" height="8" viewBox="0 0 48 8" className="mb-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6c3-3 5-3 8 0s5 3 8 0 5-3 8 0 5-3 8 0 5-3 8 0" stroke="#ff007a" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* Left Side Trigger Button */}
                <label className="upload-btn-dashed flex items-center justify-center gap-3 py-4 px-8 uppercase w-full sm:w-auto self-start mb-4 rounded cursor-pointer">
                  <span>UPLOAD YOUR PHOTO</span>
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelect(file);
                    }}
                    accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
                    className="hidden"
                  />
                </label>

                <p className="font-mono-labels text-[11px] text-[#bfc9bf] opacity-80 uppercase tracking-widest">
                  JPG &bull; PNG &bull; HEIC
                </p>
              </div>

              {/* Sunset Beach SVG Illustration at bottom-left */}
              <div className="mt-8 lg:mt-auto pt-6 border-t border-[#35352f]/40">
                <SunsetIllustration />
              </div>
            </div>

            {/* DYNAMIC RIGHT SIDE: Generator Workspace */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full">
              
              {/* Dynamic Content Slot based on workspaceState */}
              <div className="w-full flex-grow flex flex-col justify-center">
                {uploadError && (
                  <div className="mb-4 bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffb4ab] p-3 rounded flex items-center gap-2.5 font-mono-labels text-xs">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {workspaceState === 'UPLOAD' && (
                  <UploadWorkspace onFileSelect={handleFileSelect} />
                )}

                {workspaceState === 'SELECT' && (
                  <FaceSelectionWorkspace 
                    imageSrc={uploadedImageSrc}
                    detectedFaces={detectedFaces}
                    onSelectFace={handleSelectFace}
                  />
                )}

                {workspaceState === 'RESULT' && (
                  <ResultWorkspace 
                    renderedFrameUrl={renderedFrameUrl}
                    imageSrc={croppedImageSrc || uploadedImageSrc}
                    selectedFaceId={selectedFaceId}
                    focalPoint={selectedFocalPoint}
                    shareNotice={shareNotice}
                    onDownload={handleDownload}
                    onShare={handleShare}
                    onCreateAnother={handleResetWorkspace}
                  />
                )}
              </div>

              {/* Temple SVG Illustration at bottom-right */}
              <div className="mt-8 lg:mt-auto pt-6 border-t border-[#35352f]/40 flex justify-end">
                <TempleIllustration />
              </div>
            </div>

          </div>

          {/* Bottom Frame Footer */}
          <div className="flex justify-between items-center mt-12 border-t border-[#35352f]/40 pt-4 font-mono-labels text-[11px] text-[#bfc9bf] uppercase">
            <span>GOA, INDIA</span>
            <div className="flex flex-col items-center gap-1">
              <svg width="24" height="6" viewBox="0 0 24 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5c1.5-1.5 3-1.5 4.5 0s3 1.5 4.5 0 3-1.5 4.5 0" stroke="#ff007a" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="tracking-widest text-[#bfc9bf]/70">LESS NOISE. MORE SIGNAL.</span>
            </div>
            <span>28 - 31 OCT 2026</span>
          </div>

        </div>
      </main>
    </div>
  );
}

/* --- Persistent Vector Illustrations --- */

const SunsetIllustration = () => (
  <svg viewBox="0 0 400 120" className="w-full h-auto max-h-[100px] opacity-85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="120" cy="80" r="28" fill="#ffdb3c" />
    <path d="M85 86h70 M75 93h90 M90 100h60 M105 107h30" stroke="#ff007a" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 110c30 0 60-10 100-10s80 10 120 10 70-3 100-3M10 110h380v10H10z" fill="#061d12" />
    <path d="M10 110c30 0 60-10 100-10s80 10 120 10 70-3 100-3" stroke="#ffe16d" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="52" y="90" width="6" height="18" rx="3" transform="rotate(15 52 90)" fill="#ffe16d" stroke="#ff007a" strokeWidth="1.2" />
    <rect x="22" y="88" width="24" height="16" fill="#ffe16d" stroke="#ffe16d" strokeWidth="1.2" />
    <polygon points="18,88 34,74 50,88" fill="#ff007a" stroke="#ff007a" strokeWidth="1.2" />
    <rect x="30" y="95" width="6" height="9" fill="#0a2d1d" />
    <path d="M350 105c-12-20-8-50 8-70" stroke="#ffe16d" strokeWidth="3" strokeLinecap="round" />
    <path d="M358 35c-12-8-28-4-36 4 M358 35c-4-16 8-28 20-32 M358 35c12-12 28-8 36 4 M358 35c8 12 4 28-4 36" stroke="#92d5a9" strokeWidth="2" strokeLinecap="round" />
    <path d="M150 30c3-3 6 0 9-3M220 38c3-3 6 0 9-3" stroke="#ffe16d" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const TempleIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-auto max-h-[100px] opacity-85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 110c30 0 50-8 80-8s60 8 100 8M10 110h180v10H10z" fill="#061d12" />
    <path d="M10 110c30 0 50-8 80-8s60 8 100 8" stroke="#ffe16d" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M25 102c-6-16-4-36 6-48" stroke="#ffe16d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M31 54c-8-6-20-3-25 3 M31 54c-3-12 6-20 14-24 M31 54c8-8 20-6 25 3" stroke="#92d5a9" strokeWidth="2" strokeLinecap="round" />
    <path d="M42 104c-4-12-2-28 5-38" stroke="#ffe16d" strokeWidth="2" strokeLinecap="round" />
    <path d="M47 66c-6-5-16-2-20 2 M47 66c-2-10 5-16 11-20 M47 66c6-6 16-5 20 2" stroke="#92d5a9" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="120" y="78" width="40" height="24" fill="#0a2d1d" stroke="#ffe16d" strokeWidth="1.5" />
    <polygon points="116,78 140,58 164,78" fill="#ff007a" stroke="#ff007a" strokeWidth="1.5" />
    <path d="M140 58v-12M136 50h8" stroke="#ffe16d" strokeWidth="1.5" />
    <path d="M128 102v-8c0-2 1-4 4-4s4 2 4 4v8" fill="#ffe16d" />
    <path d="M148 102v-8c0-2 1-4 4-4s4 2 4 4v8" fill="#ffe16d" />
  </svg>
);
