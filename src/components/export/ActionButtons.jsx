import React from 'react';

export const ActionButtons = ({ onDownload, onShare, onGenerateAnother }) => {
  return (
    <div className="w-full flex flex-col gap-6 mt-12">
      {/* Primary & Secondary Action Buttons */}
      <div className="w-full flex flex-col md:flex-row gap-6">
        <button 
          onClick={onDownload}
          className="flex-1 bg-secondary-container text-on-secondary-container font-button text-button py-4 px-6 uppercase flex items-center justify-center gap-2 btn-primary-shadow hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all border border-background cursor-pointer"
        >
          <span className="material-symbols-outlined" data-icon="download">download</span>
          DOWNLOAD ARTIFACT
        </button>

        <button 
          onClick={onShare}
          className="flex-1 bg-transparent border-2 border-secondary-container text-secondary-container font-button text-button py-4 px-6 uppercase flex items-center justify-center gap-2 hover:bg-secondary-container/10 transition-all cursor-pointer"
        >
          <svg aria-hidden="true" className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961h-1.91z"></path>
          </svg>
          SHARE TO X
        </button>
      </div>

      {/* Secondary Action */}
      <div className="w-full flex justify-center mt-2">
        <a 
          onClick={(e) => { e.preventDefault(); if (onGenerateAnother) onGenerateAnother(); }}
          className="font-label-caps text-label-caps text-primary hover:text-secondary-fixed transition-colors underline decoration-primary hover:decoration-secondary-fixed underline-offset-4 uppercase flex items-center gap-2 cursor-pointer" 
          href="#"
        >
          <span className="material-symbols-outlined text-sm" data-icon="refresh">refresh</span>
          Generate Another
        </a>
      </div>
    </div>
  );
};
