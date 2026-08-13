import React from 'react';
import { Download, RefreshCw } from 'lucide-react';

export const ResultWorkspace = ({
  imageSrc,
  selectedFaceId,
  onDownload,
  onShare,
  onCreateAnother
}) => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Generated Result Artifact Frame inside the right workspace */}
      <div className="relative w-full aspect-square bg-[#20201b] border-2 border-[#35352f] rounded-lg overflow-hidden shadow-2xl flex flex-col p-4 md:p-6 group">
        
        {/* Decorative Top Pin */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-secondary-fixed border-2 border-background z-20 editorial-shadow"></div>

        {/* Branding Header inside frame */}
        <div className="flex justify-between items-start mb-3 font-mono-labels text-[10px] text-secondary-fixed uppercase z-10">
          <span className="tracking-widest">HH GOA 2026</span>
          <span className="tracking-widest text-[#ffb1c4]">AI × CRYPTO × MULTICHAIN</span>
        </div>

        {/* Hero Image Container */}
        <div className="flex-grow relative overflow-hidden bg-background border border-[#35352f] rounded shadow-inner">
          <img 
            src={imageSrc || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80'} 
            alt="Hacker House Goa PFP" 
            className="w-full h-full object-cover transition-all duration-500"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
          
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div className="flex flex-col gap-1">
              <span className="font-mono-labels text-[9px] text-[#ffb1c4] uppercase border border-[#ffb1c4] px-1.5 py-0.5 self-start bg-background/60 backdrop-blur-sm rounded">
                {selectedFaceId === 'face_2' ? 'Lvl 99 Teammate' : 'Lvl 99 Participant'}
              </span>
              <h3 className="font-headline-xl text-3xl md:text-4xl text-secondary-fixed uppercase leading-none mt-1 drop-shadow-md">
                SIGNAL<br />ACHIEVED
              </h3>
            </div>

            <div className="text-right">
              <span className="font-mono-labels text-[9px] text-primary opacity-80 uppercase block mb-0.5">
                ID: {selectedFaceId === 'face_2' ? '#4093' : '#4092'}
              </span>
              <span className="material-symbols-outlined text-secondary-fixed text-3xl opacity-90" data-icon="fingerprint">
                fingerprint
              </span>
            </div>
          </div>
        </div>

        {/* Branding Footer inside frame */}
        <div className="mt-3 flex justify-between items-center font-mono-labels text-[9px] text-[#bfc9bf] uppercase border-t border-[#35352f] pt-2 z-10">
          <span>GENERATED ARCHIVE</span>
          <span>14:02:45 UTC</span>
        </div>
      </div>

      {/* Action Buttons directly below the workspace */}
      <div className="w-full flex flex-col gap-3 mt-2">
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

        {/* Create Another Reset Link */}
        <div className="w-full flex justify-center mt-1">
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
