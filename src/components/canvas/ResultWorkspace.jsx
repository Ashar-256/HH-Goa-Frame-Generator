import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

export const ResultWorkspace = ({
  renderedFrameUrl,
  imageSrc,
  shareNotice,
  onDownload,
  onShare,
  onCreateAnother
}) => {
  const displayImage = renderedFrameUrl || imageSrc;

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Official HH Goa 2026 Generated Frame Asset */}
      <div className="relative w-full aspect-square bg-[#061a14] border border-[#35352f]/40 rounded-lg overflow-hidden shadow-2xl flex flex-col p-1 group">
        
        {/* Rendered 1080x1080 Canvas Output */}
        <div className="flex-grow relative overflow-hidden bg-background rounded shadow-inner">
          <img 
            src={displayImage} 
            alt="Hacker House Goa 2026 Profile Frame" 
            className="w-full h-full object-cover transition-all duration-300"
          />
        </div>
      </div>

      {/* Share Helper Guidance Notice */}
      {shareNotice && (
        <div className="w-full bg-[#0a2d1d] border border-[#ffe16d]/50 text-[#ffe16d] p-3 rounded text-center font-mono-labels text-[11px] uppercase tracking-wide shadow-lg">
          📸 <strong>Frame saved to your device & copied to clipboard!</strong><br />
          Press <strong>Ctrl+V</strong> (or click the 🖼️ photo icon on X) to attach your image to the post.
        </div>
      )}

      {/* Action Buttons directly below the workspace */}
      <div className="w-full flex flex-col gap-3 mt-1">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Download Button */}
          <button 
            onClick={onDownload}
            className="bg-secondary-container text-on-secondary-container font-button text-button py-3 px-4 uppercase flex items-center justify-center gap-2 btn-primary-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all border border-background rounded cursor-pointer"
          >
            <Download size={18} strokeWidth={2.5} />
            DOWNLOAD
          </button>

          {/* Share to X Button */}
          <button 
            onClick={onShare}
            className="bg-transparent border-2 border-secondary-container text-secondary-container font-button text-button py-3 px-4 uppercase flex items-center justify-center gap-2 hover:bg-secondary-container/10 transition-all rounded cursor-pointer"
          >
            <svg aria-hidden="true" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z"></path>
            </svg>
            SHARE TO X
          </button>
        </div>

        {/* Persistent Sharing Note */}
        <div className="w-full bg-[#0a2d1d]/80 border border-[#ffe16d]/30 text-[#ffe16d] p-2.5 rounded text-center font-mono-labels text-[10px] sm:text-[11px] uppercase tracking-wide">
          💡 <strong>Pro-Tip:</strong> Share to X copies your frame to clipboard & downloads it! Press <strong>Ctrl+V</strong> on X to paste your photo.
        </div>

        {/* Create Another Reset Link */}
        <div className="w-full flex justify-center mt-0.5">
          <button 
            onClick={onCreateAnother}
            className="font-mono-labels text-[11px] text-primary hover:text-secondary-fixed transition-colors underline decoration-primary hover:decoration-secondary-fixed underline-offset-4 uppercase flex items-center gap-1.5 cursor-pointer bg-transparent border-none py-1"
          >
            <RefreshCw size={12} />
            CREATE ANOTHER
          </button>
        </div>
      </div>
    </div>
  );
};
