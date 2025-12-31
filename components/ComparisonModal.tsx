
import React from 'react';
import { PropertyImage } from '../types';

interface Props {
  images: PropertyImage[];
  onClose: () => void;
}

const ComparisonModal: React.FC<Props> = ({ images, onClose }) => {
  if (images.length !== 2) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-0 md:p-8 animate-fade-in">
      <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex flex-col gap-0">
            <h3 className="luxury-font text-2xl md:text-3xl text-[#c5a059]">Comparison Studio (비교 스튜디오)</h3>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-black">Direct Side-by-Side Visualizer (1:1 매칭 분석)</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-[#c5a059] transition-all group"
          >
            <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
             <div className="relative w-full max-w-5xl aspect-video bg-[#111] shadow-2xl overflow-hidden rounded-lg border border-white/10">
                {/* Information Labels */}
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md border-l-4 border-[#c5a059] p-3 pointer-events-none rounded-r-md">
                   <p className="text-[9px] text-[#c5a059] font-black uppercase tracking-widest mb-1">Item A (선택 1)</p>
                   <p className="text-sm font-bold text-white leading-tight">{images[0].complex}<br/><span className="text-[11px] opacity-70">{images[0].type} ({images[0].space})</span></p>
                </div>
                <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-md border-r-4 border-[#c5a059] p-3 text-right pointer-events-none rounded-l-md">
                   <p className="text-[9px] text-[#c5a059] font-black uppercase tracking-widest mb-1">Item B (선택 2)</p>
                   <p className="text-sm font-bold text-white leading-tight">{images[1].complex}<br/><span className="text-[11px] opacity-70">{images[1].type} ({images[1].space})</span></p>
                </div>

                {/* The Slider */}
                <img-comparison-slider class="w-full h-full">
                  {images[0].mediaType === 'image' ? (
                    <img slot="first" src={images[0].imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <video slot="first" src={images[0].mediaUrl} className="w-full h-full object-cover" muted autoPlay loop />
                  )}
                  {images[1].mediaType === 'image' ? (
                    <img slot="second" src={images[1].imageUrl} className="w-full h-full object-cover" />
                  ) : (
                    <video slot="second" src={images[1].mediaUrl} className="w-full h-full object-cover" muted autoPlay loop />
                  )}
                  <div slot="handle" className="w-1.5 h-full bg-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.8)] relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#c5a059] rounded-full flex items-center justify-center shadow-xl cursor-ew-resize">
                       <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M14 6l6 6-6 6M10 18l-6-6 6-6" />
                       </svg>
                    </div>
                  </div>
                </img-comparison-slider>
             </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-8 flex flex-col md:flex-row gap-8 justify-center items-center border-t border-white/10 bg-[#0f0f0f]">
           <div className="flex items-center gap-6">
              <div className="text-center">
                 <p className="text-[9px] text-[#c5a059] font-black uppercase mb-1 tracking-widest">Floor (층수)</p>
                 <p className="text-sm text-gray-400 font-bold">{images[0].floorLevel || 'N/A'} vs {images[1].floorLevel || 'N/A'}</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                 <p className="text-[9px] text-[#c5a059] font-black uppercase mb-1 tracking-widest">Orientation (향)</p>
                 <p className="text-sm text-gray-400 font-bold">{images[0].orientation || 'N/A'} vs {images[1].orientation || 'N/A'}</p>
              </div>
           </div>
           <p className="text-[11px] text-white/40 italic max-w-lg text-center font-bold leading-relaxed">
              * 드래그 핸들을 좌우로 움직여 두 매물의 디테일을 비교해 보세요. 조명, 자재, 공간감을 한눈에 파악할 수 있습니다.<br/>
              (Move the handle left/right to compare details, lighting, materials, and space.)
           </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
