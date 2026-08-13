import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

export const UploadWorkspace = ({ onFileSelect }) => {
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
    <div className="w-full flex flex-col items-center">
      {/* Large Square Dropzone Container */}
      <div
        onClick={triggerFileInput}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative w-full aspect-square bg-[#f7f6f0] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 md:p-8 cursor-pointer transition-all duration-300 ${
          isDragOver 
            ? 'border-[#ff007a] bg-[#ffdb3c]/5 scale-[1.01]' 
            : 'border-[#35352f] hover:border-[#ffe16d]'
        }`}
      >
        {/* Inner Dashed Line Frame matching reference */}
        <div className="absolute inset-3 border border-[#35352f]/30 border-dashed pointer-events-none rounded"></div>

        {/* Upload Icon & Instructions */}
        <div className="flex flex-col items-center gap-4 text-center z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0a2d1d]/10 flex items-center justify-center text-[#0a2d1d]">
            <Upload size={30} strokeWidth={2} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bebas-bold text-xl md:text-2xl text-[#13140f] tracking-wide">
              DRAG & DROP YOUR PHOTO
            </span>
            <span className="font-mono-labels text-[11px] text-[#35352f] opacity-80 uppercase">
              OR CLICK TO BROWSE
            </span>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/heic,image/heif,image/webp"
        className="hidden"
      />
    </div>
  );
};
