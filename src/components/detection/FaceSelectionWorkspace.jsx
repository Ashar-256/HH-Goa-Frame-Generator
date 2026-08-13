import React from 'react';

export const FaceSelectionWorkspace = ({ imageSrc, detectedFaces = [], onSelectFace }) => {
  // If no faces passed, generate default center ring as fallback
  const facesToRender = detectedFaces.length > 0 ? detectedFaces : [
    {
      id: 'face_1',
      name: 'Builder #1',
      normBox: { x: 35, y: 30, width: 30, height: 35 },
      centerX: 0.5,
      centerY: 0.45
    }
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full aspect-square bg-[#20201b] border border-[#35352f] rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
        {/* Uploaded Source Image */}
        <img 
          src={imageSrc} 
          alt="Multi-person source" 
          className="w-full h-full object-cover opacity-85"
        />

        {/* Instruction Banner */}
        <div className="absolute top-3 left-3 right-3 bg-background/90 backdrop-blur-sm border border-[#ffdb3c]/40 px-3 py-2 text-center rounded shadow-md z-20">
          <span className="font-mono-labels text-[10px] md:text-[11px] text-[#ffe16d] uppercase tracking-widest block">
            WHICH ONE ARE YOU? TAP YOUR FACE
          </span>
        </div>

        {/* Real Detected Face Selection Rings Centered on Face Center Points */}
        {facesToRender.map((face, index) => {
          const normBox = face.normBox || { x: 30, y: 30, width: 25, height: 25 };
          const size = Math.max(14, Math.min(45, Math.max(normBox.width, normBox.height)));
          
          return (
            <button
              key={face.id || index}
              onClick={() => onSelectFace(face)}
              style={{
                left: `${(face.centerX ?? 0.5) * 100}%`,
                top: `${(face.centerY ?? 0.5) * 100}%`,
                width: `${size}%`,
                height: `${size}%`,
                transform: 'translate(-50%, -50%)',
                minWidth: '48px',
                minHeight: '48px'
              }}
              className="absolute group flex items-center justify-center rounded-full border-2 border-dashed border-[#ffe16d] hover:border-[#ff007a] hover:border-solid hover:scale-110 bg-black/20 hover:bg-black/40 transition-all duration-200 cursor-pointer shadow-2xl z-10 touch-manipulation"
              aria-label={`Select ${face.name || `Builder #${index + 1}`}`}
            >
              {/* Outer pulsing ring */}
              <span className="absolute inset-0 rounded-full border border-[#ffe16d] opacity-50 scale-110 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300"></span>
              
              {/* Builder Badge */}
              <div className="bg-[#ffe16d] group-hover:bg-[#ff007a] text-black font-mono-labels text-[9px] md:text-[10px] px-2 py-0.5 rounded uppercase tracking-wider scale-95 group-hover:scale-105 transition-all duration-200 shadow-md">
                {face.name || `Builder #${index + 1}`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
