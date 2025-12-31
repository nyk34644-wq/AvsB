
import React, { useState, useEffect, useMemo } from 'react';
import { PropertyImage, CategoryType } from './types';
import { INITIAL_IMAGES, INITIAL_PROPERTY, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import GalleryItem from './components/GalleryItem';
import ComparisonModal from './components/ComparisonModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [images, setImages] = useState<PropertyImage[]>(() => {
    const saved = localStorage.getItem('lotte_castle_images');
    return saved ? JSON.parse(saved) : INITIAL_IMAGES;
  });
  
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType | '전체'>('전체');
  const [activeComplex, setActiveComplex] = useState<string | '전체'>('전체');
  const [activeType, setActiveType] = useState<string | '전체'>('전체');
  
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Save to local storage on changes
  useEffect(() => {
    localStorage.setItem('lotte_castle_images', JSON.stringify(images));
  }, [images]);

  // Dynamically extract unique values for filters
  const uniqueComplexes = useMemo(() => {
    const complexes = images.map(img => img.complex).filter(Boolean);
    return Array.from(new Set(complexes)).sort();
  }, [images]);

  const uniqueTypes = useMemo(() => {
    const types = images
      .filter(img => activeCategory === '전체' || img.category === activeCategory)
      .map(img => img.type)
      .filter(Boolean);
    return Array.from(new Set(types)).sort();
  }, [images, activeCategory]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const filteredImages = useMemo(() => {
    return images.filter(img => {
      const matchCat = activeCategory === '전체' || img.category === activeCategory;
      const matchComp = activeComplex === '전체' || img.complex === activeComplex;
      const matchType = activeType === '전체' || img.type === activeType;
      return matchCat && matchComp && matchType;
    }).sort((a, b) => b.createdAt - a.createdAt);
  }, [images, activeCategory, activeComplex, activeType]);

  const handleAdminAuth = () => {
    if (passwordInput === '1234') {
      setIsAdminMode(true);
      setIsAuthModalOpen(false);
      setPasswordInput('');
    } else {
      alert('비밀번호가 틀렸습니다. (Wrong Password)');
    }
  };

  const deleteImage = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까? (Are you sure you want to delete?)')) {
      setImages(prev => prev.filter(img => img.id !== id));
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const addImage = (newImg: PropertyImage) => {
    setImages(prev => [newImg, ...prev]);
  };

  const updateImage = (updatedImg: PropertyImage) => {
    setImages(prev => prev.map(img => img.id === updatedImg.id ? updatedImg : img));
  };

  const categoryTranslations: Record<string, string> = {
    '전체': 'All',
    '내부': 'Interior',
    '외부': 'Exterior',
    '조망': 'View',
    '커뮤니티': 'Community',
    '포토존': 'Photo Zone',
    '동영상': 'Media/Video'
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white selection:bg-[#c5a059] selection:text-black">
      <Navbar 
        onAdminClick={() => isAdminMode ? setIsAdminMode(false) : setIsAuthModalOpen(true)} 
        isAdmin={isAdminMode}
      />

      <main className="flex-grow container mx-auto px-4 py-12">
        {isAdminMode ? (
          <AdminPanel 
            images={images} 
            onAdd={addImage} 
            onDelete={deleteImage} 
            onUpdate={updateImage} 
            onExit={() => setIsAdminMode(false)}
          />
        ) : (
          <>
            {/* Hero Section */}
            <section className="mb-16 text-center animate-fade-in">
              <div className="inline-block mb-6 px-4 py-1 border border-[#c5a059]/30 rounded-full text-[10px] text-[#c5a059] tracking-[0.5em] uppercase font-bold">
                Premium Real Estate Solution
              </div>
              <div className="flex flex-col items-center justify-center mb-8">
                <h2 className="text-6xl md:text-8xl font-black mb-2 text-[#c5a059] tracking-tighter">
                  {INITIAL_PROPERTY.name}
                </h2>
                <span className="text-xl md:text-3xl font-black text-white/90 tracking-[0.2em] uppercase">
                  Angel Real Estate
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 mb-10">
                <p className="text-gray-300 text-xl font-bold tracking-tight">
                  대표 김나영소장 <span className="text-[#c5a059]/60 mx-2">|</span> 010. 9109. 0555
                </p>
                <p className="text-gray-500 text-sm tracking-widest uppercase opacity-80 font-bold">
                  실시간 단지 및 타입별 비교 분석 시스템<br/>
                  <span className="text-[10px]">Real-time Estate Comparison & Analysis System</span>
                </p>
              </div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent mx-auto"></div>
            </section>

            {/* Filters */}
            <section className="mb-12 sticky top-20 z-30 bg-[#0a0a0a]/80 backdrop-blur-md py-4 border-y border-white/10">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex flex-wrap justify-center gap-2">
                  <button 
                    onClick={() => { setActiveCategory('전체'); setActiveType('전체'); }}
                    className={`px-5 py-2 rounded-full border transition-all duration-300 text-xs tracking-tighter flex flex-col items-center leading-none ${activeCategory === '전체' ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold shadow-lg shadow-[#c5a059]/20' : 'border-white/10 hover:border-[#c5a059] hover:text-[#c5a059]'}`}
                  >
                    <span>전체</span>
                    <span className="en-subtext opacity-40">All</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => { setActiveCategory(cat as CategoryType); setActiveType('전체'); }}
                      className={`px-5 py-2 rounded-full border transition-all duration-300 text-xs tracking-tighter flex flex-col items-center leading-none ${activeCategory === cat ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold shadow-lg shadow-[#c5a059]/20' : 'border-white/10 hover:border-[#c5a059] hover:text-[#c5a059]'}`}
                    >
                      <span>{cat}</span>
                      <span className="en-subtext opacity-40">{categoryTranslations[cat]}</span>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col text-right">
                       <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Complex:</span>
                       <span className="text-[8px] text-gray-600 font-bold -mt-1">단지명</span>
                    </div>
                    <select 
                      value={activeComplex}
                      onChange={(e) => setActiveComplex(e.target.value)}
                      className="bg-transparent border-b border-[#c5a059]/30 text-[#c5a059] px-2 py-1 focus:outline-none cursor-pointer text-xs hover:border-[#c5a059] transition-colors min-w-[120px] font-bold"
                    >
                      <option value="전체" className="bg-[#1a1a1a]">전체 단지 (All Complexes)</option>
                      {uniqueComplexes.map(comp => (
                        <option key={comp} value={comp} className="bg-[#1a1a1a]">{comp}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col text-right">
                       <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Type:</span>
                       <span className="text-[8px] text-gray-600 font-bold -mt-1">타입</span>
                    </div>
                    <select 
                      value={activeType}
                      onChange={(e) => setActiveType(e.target.value)}
                      className="bg-transparent border-b border-[#c5a059]/30 text-[#c5a059] px-2 py-1 focus:outline-none cursor-pointer text-xs hover:border-[#c5a059] transition-colors min-w-[120px] font-bold"
                    >
                      <option value="전체" className="bg-[#1a1a1a]">전체 타입 (All Types)</option>
                      {uniqueTypes.map(t => (
                        <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Gallery Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32">
              {filteredImages.length > 0 ? (
                filteredImages.map(img => (
                  <GalleryItem 
                    key={img.id} 
                    image={img} 
                    isSelected={selectedIds.includes(img.id)}
                    onToggle={() => toggleSelect(img.id)}
                  />
                ))
              ) : (
                <div className="col-span-full py-32 text-center text-gray-600 italic border border-dashed border-white/5 rounded-3xl">
                  해당 필터 조건에 등록된 매물이 없습니다.<br/>
                  <span className="text-[10px] uppercase font-bold tracking-widest">No listings found for the selected filters.</span>
                </div>
              )}
            </section>

            {/* Selection Status & Compare Trigger */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 transform ${selectedIds.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className="bg-[#1a1a1a]/95 backdrop-blur-xl border border-[#c5a059]/30 rounded-2xl px-8 py-4 shadow-2xl flex items-center gap-8 ring-1 ring-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#c5a059]/30 flex items-center justify-center text-[#c5a059] font-bold">
                    {selectedIds.length}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-300 hidden sm:inline text-sm font-bold">사진 선택됨</span>
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Photo Selected</span>
                  </div>
                </div>
                <button 
                  disabled={selectedIds.length !== 2}
                  onClick={() => setIsComparisonOpen(true)}
                  className={`px-10 py-3 rounded-xl font-bold transition-all duration-300 text-sm flex flex-col items-center leading-tight ${selectedIds.length === 2 ? 'bg-[#c5a059] text-black hover:scale-105 shadow-lg shadow-[#c5a059]/20 active:scale-95' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                >
                  <span>비교 슬라이더 실행</span>
                  <span className="text-[9px] opacity-70 uppercase font-black">Run Compare Slider</span>
                </button>
                <button 
                  onClick={() => setSelectedIds([])}
                  className="text-gray-500 hover:text-white transition-colors text-xs flex flex-col items-center"
                >
                  <span className="font-bold">초기화</span>
                  <span className="en-subtext font-black">Reset</span>
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-[#c5a059]/40 p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="luxury-font text-2xl text-[#c5a059] mb-1 text-center">Admin Access</h3>
            <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mb-6 font-bold">관리자 접속 (Admin Login)</p>
            <input 
              type="password" 
              placeholder="Password (비밀번호)"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminAuth()}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 mb-6 focus:border-[#c5a059] outline-none transition-colors text-center tracking-widest font-bold"
              autoFocus
            />
            <div className="flex gap-4">
              <button 
                onClick={handleAdminAuth}
                className="flex-1 bg-[#c5a059] text-black font-bold py-3 rounded-lg hover:bg-[#b08d4a] transition-colors uppercase text-sm"
              >
                Login (접속)
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-colors uppercase text-sm font-bold"
              >
                Cancel (취소)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {isComparisonOpen && selectedIds.length === 2 && (
        <ComparisonModal 
          images={images.filter(img => selectedIds.includes(img.id))} 
          onClose={() => setIsComparisonOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default App;
