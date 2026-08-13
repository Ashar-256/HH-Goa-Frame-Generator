import React from 'react';

export const ResultCard = ({
  imageUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  badgeLevel = 'Lvl 99 Participant',
  titleLine1 = 'SIGNAL',
  titleLine2 = 'ACHIEVED',
  participantId = '#4092',
  timestamp = '14:02:45 UTC'
}) => {
  return (
    <div className="relative w-full aspect-[4/5] bg-surface-container editorial-shadow border border-surface-variant p-4 md:p-8 flex flex-col -rotate-1 origin-bottom-left transition-transform hover:rotate-0 duration-500 group">
      {/* Decorative Pin */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-secondary-fixed border-2 border-background z-10 editorial-shadow"></div>

      {/* Branding Header */}
      <div className="flex justify-between items-start mb-6 font-label-caps text-label-caps text-secondary-fixed uppercase">
        <span className="tracking-widest">HH GOA 2026</span>
        <span className="tracking-widest text-tertiary">AI x CRYPTO x MULTICHAIN</span>
      </div>

      {/* Hero Image Container */}
      <div className="flex-grow relative overflow-hidden bg-background border border-surface-variant shadow-inner">
        <img 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
          alt="HH Goa 2026 Editorial Portrait" 
          src={imageUrl} 
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div className="flex flex-col gap-xs">
            <span className="font-label-caps text-label-caps text-tertiary uppercase border border-tertiary px-2 py-1 self-start bg-background/50 backdrop-blur-sm">
              {badgeLevel}
            </span>
            <h2 className="font-headline-xl text-headline-xl text-secondary-fixed uppercase leading-none mt-2 drop-shadow-md">
              {titleLine1}<br/>{titleLine2}
            </h2>
          </div>

          <div className="text-right">
            <span className="font-label-caps text-label-caps text-primary opacity-70 uppercase block mb-1">
              ID: {participantId}
            </span>
            <span className="material-symbols-outlined text-secondary-fixed text-4xl opacity-80" data-icon="fingerprint">
              fingerprint
            </span>
          </div>
        </div>
      </div>

      {/* Branding Footer */}
      <div className="mt-6 flex justify-between items-center font-label-caps text-label-caps text-on-surface-variant uppercase border-t border-surface-variant pt-4">
        <span>GENERATED ARCHIVE</span>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};
