
import React from 'react';
import { PropertyImage } from '../types';

interface Props {
  image: PropertyImage;
  isSelected: boolean;
  onToggle: () => void;
}

const GalleryItem: React.FC<Props> = ({ image, isSelected, onToggle }) => {
  const categoryEn: Record<string, string> = {
    '내부': 'Interior',
    '외부': 'Exterior',
    '조망': 'View',
    '커뮤니티': 'Community',
    '포토존': 'Photo Zone',
    '동영상': 'Media'
  };

  const renderMedia = () => {
    switch (image.mediaType) {
      case 'youtube':
        return (
          <div className="relative w-full h-full">
            <img 
              src={image.imageUrl || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'} 
              alt={image.type} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white flex items-center gap-1 font-black">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> YouTube
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="relative w-full h-full">
            <video 
              src={image.mediaUrl} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              muted
              playsInline
              loop
              onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
              onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
               <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
               </div>
            </div>
          </div>
        );
      default:
        return (
          <img 
            src={image.imageUrl} 
            alt={image.type} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        );
    }
  };

  return (
    <div 
      onClick={onToggle}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 border-2 ${
        isSelected ? 'border-[#c5a059] ring-4 ring-[#c5a059]/20 scale-[1.02] z-10 shadow-2xl' : 'border-transparent hover:border-white/20'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-[#111]">
        {renderMedia()}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
        
        {/* Selection Marker */}
        <div className={`absolute top-4 right-4 w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center z-20 ${
          isSelected ? 'bg-[#c5a059] border-[#c5a059] text-black shadow-xl scale-110' : 'bg-black/30 border-white/50 text-transparent'
        }`}>
          <svg className="w-5 h-5 font-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Info Tags */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 z-20">
          <div className="flex items-center gap-2">
            <span className="bg-[#c5a059] text-black text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
              {image.category} ({categoryEn[image.category]})
            </span>
            <span className="text-white/80 text-[10px] tracking-widest font-black uppercase drop-shadow-md">
              {image.complex}
            </span>
          </div>
          <h4 className="text-lg font-black text-white group-hover:text-[#c5a059] transition-colors truncate drop-shadow-lg">
            {image.type} | {image.space}
          </h4>
          <div className="flex gap-4 text-[9px] text-gray-300 font-black drop-shadow-md uppercase tracking-widest">
            {image.orientation && <span>{image.orientation}</span>}
            {image.floorLevel && <span>{image.floorLevel}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;
