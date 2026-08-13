import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const FaceSelectionState = ({ imageSrc, onSelectFace, onCancel }) => {
  // Configurable mock face coordinates for the face selection UI representation
  const mockFaces = [
    { id: 'face_1', name: 'Builder #1', x: 25, y: 30, size: 28 },
    { id: 'face_2', name: 'Builder #2', x: 60, y: 25, size: 30 },
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[420px]">
      {/* Left Column: Brand Copy & Interactive Instructions */}
      <div className="lg:col-span-5 flex flex-col justify-between text-left h-full">
        <div className="flex flex-col">
          <h2 className="font-display-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.9] text-secondary-fixed mb-4 tracking-tight">
            WHICH ONE<br />
            ARE YOU<span className="text-[#ff007a]">?</span>
          </h2>

          <p className="font-body-lg text-[#e5e2da] opacity-90 text-lg mb-6 leading-relaxed">
            We detected multiple builders in your photo. Tap your face to generate your profile.
          </p>

          {/* Simple Pink Wave Divider */}
          <svg width="48" height="8" viewBox="0 0 48 8" className="mb-8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6c3-3 5-3 8 0s5 3 8 0 5-3 8 0 5 3 8 0 5-3 8 0" stroke="#ff007a" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Cancel & Back Button */}
          <button
            onClick={onCancel}
            className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#ffdb3c]/40 hover:border-[#ffdb3c] text-secondary-fixed font-button text-button py-3 px-6 uppercase self-start rounded cursor-pointer transition-all duration-200"
          >
            <ArrowLeft size={18} />
            UPLOAD DIFFERENT PHOTO
          </button>
        </div>

        {/* Sunset Beach Illustration */}
        <div className="mt-8 lg:mt-auto pt-6 border-t border-[#35352f]/40">
          <SunsetIllustration />
        </div>
      </div>

      {/* Right Column: Uploaded Image with Interactive Bounding Boxes */}
      <div className="lg:col-span-7 flex flex-col justify-between h-full">
        <div className="relative w-full aspect-square bg-[#20201b] border border-[#35352f] rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
          
          {/* The Uploaded Image */}
          <img 
            src={imageSrc} 
            alt="Multi-person source" 
            className="w-full h-full object-cover opacity-75"
          />

          {/* Instruction Overlay Banner */}
          <div className="absolute top-4 left-4 right-4 bg-background/85 backdrop-blur-sm border border-[#ffdb3c]/30 px-4 py-2 text-center rounded">
            <span className="font-mono-labels text-[10px] text-[#ffe16d] uppercase tracking-widest">
              TAP OR CLICK YOUR FACE TO SELECT
            </span>
          </div>

          {/* Interactive Bounding Rings */}
          {mockFaces.map((face) => (
            <button
              key={face.id}
              onClick={() => onSelectFace(face.id)}
              style={{
                left: `${face.x}%`,
                top: `${face.y}%`,
                width: `${face.size}%`,
                height: `${face.size}%`,
              }}
              className="absolute group flex items-center justify-center rounded-full border-2 border-dashed border-[#ffe16d] hover:border-[#ff007a] hover:border-solid hover:scale-105 bg-black/10 hover:bg-black/30 transition-all duration-250 cursor-pointer shadow-lg"
              title={`Select ${face.name}`}
            >
              {/* Outer pulsing ring */}
              <span className="absolute inset-0 rounded-full border border-[#ffe16d] opacity-50 scale-110 group-hover:scale-120 group-hover:opacity-100 transition-all duration-300"></span>
              
              {/* Center dot/label */}
              <div className="bg-[#ffe16d] group-hover:bg-[#ff007a] text-black font-mono-labels text-[9px] px-2 py-0.5 rounded uppercase tracking-wider scale-90 group-hover:scale-100 transition-all duration-200">
                {face.name}
              </div>
            </button>
          ))}
        </div>

        {/* Temple Illustration at bottom right */}
        <div className="mt-8 lg:mt-auto pt-6 border-t border-[#35352f]/40 flex justify-end">
          <TempleIllustration />
        </div>
      </div>
    </div>
  );
};

/* --- Simple Vector Illustrations --- */

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
