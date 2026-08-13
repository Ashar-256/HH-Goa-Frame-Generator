import React from 'react';

export const FaceSelectionWorkspace = ({ imageSrc, onSelectFace }) => {
  const mockFaces = [
    { id: 'face_1', name: 'Builder #1', x: 25, y: 30, size: 28 },
    { id: 'face_2', name: 'Builder #2', x: 60, y: 25, size: 30 },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full aspect-square bg-[#20201b] border border-[#35352f] rounded-lg overflow-hidden shadow-inner flex items-center justify-center">
        {/* Uploaded Image */}
        <img 
          src={imageSrc} 
          alt="Multi-person source" 
          className="w-full h-full object-cover opacity-80"
        />

        {/* Top Instruction Banner */}
        <div className="absolute top-3 left-3 right-3 bg-background/90 backdrop-blur-sm border border-[#ffdb3c]/40 px-3 py-1.5 text-center rounded shadow-md z-20">
          <span className="font-mono-labels text-[10px] md:text-[11px] text-[#ffe16d] uppercase tracking-widest block">
            WHICH ONE ARE YOU? TAP YOUR FACE
          </span>
        </div>

        {/* Selectable Face Indicators */}
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
            className="absolute group flex items-center justify-center rounded-full border-2 border-dashed border-[#ffe16d] hover:border-[#ff007a] hover:border-solid hover:scale-105 bg-black/10 hover:bg-black/30 transition-all duration-250 cursor-pointer shadow-lg z-10"
            title={`Select ${face.name}`}
          >
            <span className="absolute inset-0 rounded-full border border-[#ffe16d] opacity-50 scale-110 group-hover:scale-120 group-hover:opacity-100 transition-all duration-300"></span>
            <div className="bg-[#ffe16d] group-hover:bg-[#ff007a] text-black font-mono-labels text-[9px] px-2 py-0.5 rounded uppercase tracking-wider scale-90 group-hover:scale-100 transition-all duration-200">
              {face.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
