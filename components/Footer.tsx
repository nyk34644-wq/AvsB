
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-[#c5a059] rounded-lg rotate-45 flex items-center justify-center">
                  <span className="text-black font-bold text-xl -rotate-45">A</span>
               </div>
               <span className="luxury-font text-3xl tracking-tighter text-white uppercase">Angel Estate</span>
            </div>
            <div className="space-y-1 mb-8">
               <p className="text-[#c5a059] font-black text-lg">엔젤부동산 대표 김나영소장 (Kim Na-young)</p>
               <a href="tel:01091090555" className="text-2xl text-white font-black tracking-tight hover:text-[#c5a059] transition-colors">010-9109-0555</a>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed font-bold opacity-80">
              고객님의 소중한 자산을 위한 맞춤형 분석 시스템을 제공합니다. 최상의 주거 가치를 엔젤부동산과 함께 경험해 보세요.<br/>
              <span className="text-[10px] text-gray-600 font-black mt-2 inline-block">(Experience the best residential value with Angel Real Estate's customized analysis system.)</span>
            </p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-6">
             <div className="flex gap-10">
                <div className="flex flex-col gap-3">
                   <p className="text-[10px] text-[#c5a059] font-black uppercase tracking-[0.2em] mb-2">Service (서비스)</p>
                   <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors font-bold">매물 비교 분석 (Analysis)</a>
                   <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors font-bold">단지별 뷰 (View)</a>
                   <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors font-bold">타입별 VR (VR Tour)</a>
                </div>
                <div className="flex flex-col gap-3">
                   <p className="text-[10px] text-[#c5a059] font-black uppercase tracking-[0.2em] mb-2">Company (회사)</p>
                   <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors font-bold">중개사무소 (Office)</a>
                   <a href="#" className="text-gray-400 hover:text-white text-xs transition-colors font-bold">찾아오시는 길 (Maps)</a>
                </div>
             </div>
             
             <div className="mt-8 pt-8 border-t border-white/5 w-full text-center md:text-right">
                <p className="text-gray-600 text-xs font-bold">© 2024 ANGEL REAL ESTATE. All rights reserved.</p>
                <p className="text-gray-700 text-[9px] mt-2 tracking-[0.3em] uppercase font-black">Professional Real Estate Agent Kim Na-young</p>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
