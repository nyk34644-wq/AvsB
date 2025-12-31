
import React from 'react';

interface Props {
  onAdminClick: () => void;
  isAdmin: boolean;
}

const Navbar: React.FC<Props> = ({ onAdminClick, isAdmin }) => {
  return (
    <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#c5a059] rounded-lg flex items-center justify-center transform rotate-45 group hover:rotate-90 transition-transform duration-500">
            <span className="text-black font-bold text-xl -rotate-45 group-hover:-rotate-90 transition-transform duration-500">A</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white leading-tight uppercase">
              Angel Real Estate
            </h1>
            <p className="text-[10px] text-[#c5a059] tracking-[0.2em] font-black uppercase">엔젤부동산 (Premium Agent)</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 px-6 border-x border-white/10 h-10">
           <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#c5a059] font-black tracking-widest uppercase">Contact Agent (대표 연락처)</span>
              <a href="tel:01091090555" className="text-white font-black hover:text-[#c5a059] transition-colors tracking-tight">
                010-9109-0555
              </a>
           </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onAdminClick}
            className={`flex flex-col items-center justify-center gap-0 text-[11px] font-black tracking-widest uppercase transition-colors px-5 py-2 rounded-xl border leading-none ${
              isAdmin 
              ? 'bg-[#c5a059] text-black border-[#c5a059]' 
              : 'text-gray-400 hover:text-[#c5a059] border-white/10 hover:border-[#c5a059]'
            }`}
          >
            <span>{isAdmin ? 'Exit Admin' : 'Admin'}</span>
            <span className="text-[8px] font-bold opacity-60">{isAdmin ? '관리자 종료' : '관리자'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
