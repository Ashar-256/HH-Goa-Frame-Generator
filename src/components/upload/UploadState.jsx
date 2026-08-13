import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

export const UploadState = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch min-h-[420px]">
      {/* Left Column: Brand Copy & CTA & Sunset SVG */}
      <div className="lg:col-span-5 flex flex-col justify-between text-left h-full">
        <div className="flex flex-col">
          {/* Main Title matching reference image */}
          <h2 className="font-display-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.9] text-secondary-fixed mb-4 tracking-tight">
            FRAME YOUR<br />
            IDENTITY<br />
            BUILDER<span className="text-[#ff007a]">.</span>
          </h2>

          <p className="font-body-lg text-[#e5e2da] opacity-90 text-lg mb-6 leading-relaxed">
            Create your Hacker House Goa 2026 profile frame.
          </p>

          {/* Simple Pink Wave Divider */}
          <svg width="48" height="8" viewBox="0 0 48 8" className="mb-8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6c3-3 5-3 8 0s5 3 8 0 5-3 8 0 5 3 8 0 5-3 8 0" stroke="#ff007a" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* CTA Button */}
          <button
            onClick={triggerFileInput}
            className="upload-btn-dashed flex items-center justify-center gap-3 py-4 px-8 uppercase w-full sm:w-auto self-start mb-4 rounded cursor-pointer"
          >
            <Upload size={20} strokeWidth={2.5} />
            UPLOAD YOUR PHOTO
          </button>

          <p className="font-mono-labels text-[11px] text-[#bfc9bf] opacity-80 uppercase tracking-widest">
            JPG &bull; PNG &bull; HEIC
          </p>
        </div>

        {/* Sunset Beach CSS/SVG Illustration */}
        <div className="mt-8 lg:mt-auto pt-6 border-t border-[#35352f]/40">
          <SunsetIllustration />
        </div>
      </div>

      {/* Right Column: Square Dropzone & Temple SVG */}
      <div className="lg:col-span-7 flex flex-col justify-between h-full">
        {/* Large Square Dropzone Container */}
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative w-full aspect-square bg-[#f7f6f0] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-300 ${
            isDragOver 
              ? 'border-[#ff007a] bg-[#ffdb3c]/5 scale-[1.01]' 
              : 'border-[#35352f] hover:border-[#ffe16d]'
          }`}
        >
          {/* Inner Dashed Line Frame matching reference */}
          <div className="absolute inset-4 border border-[#35352f]/30 border-dashed pointer-events-none rounded"></div>

          {/* Upload Icon & Instructions */}
          <div className="flex flex-col items-center gap-4 text-center z-10">
            <div className="w-16 h-16 rounded-full bg-[#0a2d1d]/10 flex items-center justify-center text-[#0a2d1d]">
              <Upload size={32} strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-bebas-bold text-2xl text-[#13140f] tracking-wide">
                DRAG & DROP YOUR PHOTO
              </span>
              <span className="font-mono-labels text-[11px] text-[#35352f] opacity-80">
                OR CLICK TO BROWSE
              </span>
            </div>
          </div>
        </div>

        {/* Hidden Input file picker */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
          className="hidden"
        />

        {/* Temple Beach SVG Illustration at bottom right */}
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
    {/* Sun */}
    <circle cx="120" cy="80" r="28" fill="#ffdb3c" />
    
    {/* Reflections/Waves */}
    <path d="M85 86h70 M75 93h90 M90 100h60 M105 107h30" stroke="#ff007a" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Ground / Sand shoreline */}
    <path d="M10 110c30 0 60-10 100-10s80 10 120 10 70-3 100-3M10 110h380v10H10z" fill="#061d12" />
    <path d="M10 110c30 0 60-10 100-10s80 10 120 10 70-3 100-3" stroke="#ffe16d" strokeWidth="1.5" strokeLinecap="round" />

    {/* Surfboard */}
    <rect x="52" y="90" width="6" height="18" rx="3" transform="rotate(15 52 90)" fill="#ffe16d" stroke="#ff007a" strokeWidth="1.2" />

    {/* Beach Shack */}
    <rect x="22" y="88" width="24" height="16" fill="#ffe16d" stroke="#ffe16d" strokeWidth="1.2" />
    <polygon points="18,88 34,74 50,88" fill="#ff007a" stroke="#ff007a" strokeWidth="1.2" />
    <rect x="30" y="95" width="6" height="9" fill="#0a2d1d" />

    {/* Left Palm tree */}
    <path d="M350 105c-12-20-8-50 8-70" stroke="#ffe16d" strokeWidth="3" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M358 35c-12-8-28-4-36 4 M358 35c-4-16 8-28 20-32 M358 35c12-12 28-8 36 4 M358 35c8 12 4 28-4 36" stroke="#92d5a9" strokeWidth="2" strokeLinecap="round" />

    {/* Tiny decorative birds */}
    <path d="M150 30c3-3 6 0 9-3M220 38c3-3 6 0 9-3" stroke="#ffe16d" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const TempleIllustration = () => (
  <svg viewBox="0 0 200 120" className="w-full h-auto max-h-[100px] opacity-85" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hills */}
    <path d="M10 110c30 0 50-8 80-8s60 8 100 8M10 110h180v10H10z" fill="#061d12" />
    <path d="M10 110c30 0 50-8 80-8s60 8 100 8" stroke="#ffe16d" strokeWidth="1.5" strokeLinecap="round" />

    {/* Palm Trees */}
    <path d="M25 102c-6-16-4-36 6-48" stroke="#ffe16d" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M31 54c-8-6-20-3-25 3 M31 54c-3-12 6-20 14-24 M31 54c8-8 20-6 25 3" stroke="#92d5a9" strokeWidth="2" strokeLinecap="round" />
    
    <path d="M42 104c-4-12-2-28 5-38" stroke="#ffe16d" strokeWidth="2" strokeLinecap="round" />
    <path d="M47 66c-6-5-16-2-20 2 M47 66c-2-10 5-16 11-20 M47 66c6-6 16-5 20 2" stroke="#92d5a9" strokeWidth="1.5" strokeLinecap="round" />

    {/* Temple/Church Icon matching reference */}
    <rect x="120" y="78" width="40" height="24" fill="#0a2d1d" stroke="#ffe16d" strokeWidth="1.5" />
    {/* Dome/Roof */}
    <polygon points="116,78 140,58 164,78" fill="#ff007a" stroke="#ff007a" strokeWidth="1.5" />
    {/* Cross/Spire */}
    <path d="M140 58v-12M136 50h8" stroke="#ffe16d" strokeWidth="1.5" />
    {/* Arched windows/door */}
    <path d="M128 102v-8c0-2 1-4 4-4s4 2 4 4v8" fill="#ffe16d" />
    <path d="M148 102v-8c0-2 1-4 4-4s4 2 4 4v8" fill="#ffe16d" />
  </svg>
);
