
import React, { useState, useRef } from 'react';
import { PropertyImage, CategoryType, MediaType } from '../types';
import { CATEGORIES } from '../constants';

interface Props {
  images: PropertyImage[];
  onAdd: (img: PropertyImage) => void;
  onDelete: (id: string) => void;
  onUpdate: (img: PropertyImage) => void;
  onExit: () => void;
}

const AdminPanel: React.FC<Props> = ({ images, onAdd, onDelete, onUpdate, onExit }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<PropertyImage>>({
    category: '내부',
    complex: '',
    type: '',
    space: '',
    orientation: '남동향',
    floorLevel: '중층',
    imageUrl: '',
    mediaUrl: '',
    youtubeUrl: '',
    mediaType: 'image'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({
      category: '내부',
      complex: '',
      type: '',
      space: '',
      orientation: '남동향',
      floorLevel: '중층',
      imageUrl: '',
      mediaUrl: '',
      youtubeUrl: '',
      mediaType: 'image'
    });
    setIsAdding(false);
    setEditingId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      if (form.mediaType === 'image') {
        setForm(prev => ({ ...prev, imageUrl: base64String }));
      } else if (form.mediaType === 'video') {
        setForm(prev => ({ ...prev, mediaUrl: base64String, imageUrl: '' }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.complex || !form.type) {
      alert('단지명과 타입은 필수입니다. (Complex and Type are required.)');
      return;
    }

    if (form.mediaType === 'image' && !form.imageUrl) {
      alert('이미지 파일을 선택해주세요. (Please select an image file.)');
      return;
    }
    
    if (form.mediaType === 'video' && !form.mediaUrl) {
      alert('영상 파일을 선택해주세요. (Please select a video file.)');
      return;
    }

    if (form.mediaType === 'youtube' && !form.youtubeUrl) {
      alert('유튜브 링크를 입력해주세요. (Please enter a YouTube link.)');
      return;
    }

    if (editingId) {
      onUpdate({ ...form, id: editingId, createdAt: Date.now() } as PropertyImage);
    } else {
      const newImg: PropertyImage = {
        ...form,
        id: Math.random().toString(36).substr(2, 9),
        propertyId: 'p1',
        createdAt: Date.now()
      } as PropertyImage;
      onAdd(newImg);
    }
    resetForm();
  };

  const startEdit = (img: PropertyImage) => {
    setForm(img);
    setEditingId(img.id);
    setIsAdding(true);
  };

  const categoryEn: Record<string, string> = {
    '내부': 'Interior',
    '외부': 'Exterior',
    '조망': 'View',
    '커뮤니티': 'Community',
    '포토존': 'Photo Zone',
    '동영상': 'Media'
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/10">
        <div className="flex flex-col gap-1">
          <h2 className="luxury-font text-4xl text-[#c5a059] leading-none">Media Management</h2>
          <p className="text-gray-500 uppercase tracking-widest text-[10px] font-black">매물 자산 관리 패널 (Property Administration)</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-[#c5a059] text-black px-8 py-3 rounded-xl font-black hover:scale-105 transition-transform flex flex-col items-center justify-center gap-0 shadow-xl shadow-[#c5a059]/10 uppercase tracking-widest leading-none"
        >
          <span className="text-xs">ADD NEW PROJECT</span>
          <span className="text-[9px] opacity-70">신규 프로젝트 업로드</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111] border border-[#c5a059]/30 rounded-2xl p-8 mb-12 shadow-3xl overflow-hidden relative animate-slide-up">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#c5a059]" />
          <h3 className="text-xl font-bold mb-8 flex items-center justify-between">
            <span className="flex items-center gap-3">
              {editingId ? 'Edit Asset' : 'Upload New Project'}
              <span className="text-[9px] font-black text-[#c5a059] uppercase border border-[#c5a059]/30 px-2 py-0.5 rounded tracking-widest">
                {editingId ? '항목 수정' : '신규 업로드'}
              </span>
            </span>
          </h3>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">미디어 타입 (Media Type)</label>
              <select 
                value={form.mediaType}
                onChange={(e) => setForm({...form, mediaType: e.target.value as MediaType, imageUrl: '', mediaUrl: '', youtubeUrl: ''})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-[#c5a059] outline-none text-sm font-bold transition-all"
              >
                <option value="image">일반 이미지 (Image Upload)</option>
                <option value="video">동영상 (MP4 Video Upload)</option>
                <option value="youtube">유튜브 (YouTube Link)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">카테고리 (Category)</label>
              <select 
                value={form.category}
                onChange={(e) => setForm({...form, category: e.target.value as CategoryType})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-[#c5a059] outline-none text-sm font-bold transition-all"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c} ({categoryEn[c]})</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">단지명 (Complex Name)</label>
              <input 
                placeholder="예: 용지아이파크, 사화캐슬 등 (Ex: Landmark A)"
                value={form.complex}
                onChange={(e) => setForm({...form, complex: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-[#c5a059] outline-none text-sm font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">타입 (Type)</label>
              <input 
                placeholder="예: 84A, 102B (Ex: 34-Pyung)"
                value={form.type}
                onChange={(e) => setForm({...form, type: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-[#c5a059] outline-none text-sm font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">공간 (Space)</label>
              <input 
                placeholder="예: 거실, 침실1 (Ex: Living Room)"
                value={form.space}
                onChange={(e) => setForm({...form, space: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-[#c5a059] outline-none text-sm font-bold"
              />
            </div>

            {/* Media Inputs */}
            {form.mediaType === 'image' && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">이미지 업로드 (Image File)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="w-full opacity-0 absolute inset-0 cursor-pointer z-10"
                  />
                  <div className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 flex items-center justify-between font-bold">
                    <span>{form.imageUrl ? '✓ 파일 준비됨 (Ready)' : '파일 선택 (Choose File)'}</span>
                    <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {form.mediaType === 'video' && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">영상 업로드 (Video MP4)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept="video/mp4"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="w-full opacity-0 absolute inset-0 cursor-pointer z-10"
                  />
                  <div className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 flex items-center justify-between font-bold">
                    <span>{form.mediaUrl ? '✓ 파일 준비됨 (Ready)' : '파일 선택 (Choose File)'}</span>
                    <svg className="w-5 h-5 text-[#c5a059]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {form.mediaType === 'youtube' && (
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-gray-500 font-black tracking-[0.2em]">YouTube Embed URL</label>
                <input 
                  placeholder="https://www.youtube.com/embed/..."
                  value={form.youtubeUrl}
                  onChange={(e) => setForm({...form, youtubeUrl: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 focus:border-[#c5a059] outline-none text-sm font-bold"
                />
              </div>
            )}

            <div className="col-span-full flex gap-4 pt-10 border-t border-white/10">
              <button type="submit" className="bg-[#c5a059] text-black font-black px-12 py-3.5 rounded-xl hover:bg-white transition-all transform active:scale-95 text-xs tracking-widest uppercase flex flex-col items-center leading-none">
                <span>{editingId ? 'Save Changes' : 'Confirm Registration'}</span>
                <span className="text-[9px] opacity-60">{editingId ? '변경사항 저장' : '등록 확인'}</span>
              </button>
              <button 
                type="button" 
                onClick={resetForm}
                className="bg-white/5 hover:bg-white/10 text-white px-10 py-3.5 rounded-xl transition-colors text-xs tracking-widest uppercase font-black flex flex-col items-center leading-none"
              >
                <span>Cancel</span>
                <span className="text-[9px] opacity-60">취소</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Asset List */}
      <div className="grid grid-cols-1 gap-4">
        {images.length > 0 ? images.map(img => (
          <div key={img.id} className="bg-[#111] hover:bg-[#151515] border border-white/5 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-8 transition-all group relative overflow-hidden">
            <div className="w-40 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-black shadow-inner ring-1 ring-white/5">
              {img.mediaType === 'image' ? (
                <img src={img.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              ) : img.mediaType === 'video' ? (
                <video src={img.mediaUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" muted />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-red-900/10">
                   <svg className="w-8 h-8 text-red-600/50" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                </div>
              )}
            </div>
            <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-6 text-sm py-2">
              <div>
                <p className="text-[9px] text-[#c5a059] font-black uppercase tracking-[0.2em] mb-1">Status (유형)</p>
                <span className="bg-white/5 px-2 py-0.5 rounded text-white text-[10px] uppercase font-bold border border-white/10 tracking-widest">
                  {img.mediaType}
                </span>
              </div>
              <div>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Complex / Type (단지/타입)</p>
                <p className="text-white font-bold truncate max-w-[150px]">{img.complex} <span className="text-[#c5a059] mx-1">/</span> {img.type}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Space (공간)</p>
                <p className="text-gray-300 font-bold">{img.space || '미지정'}</p>
              </div>
              <div className="text-right pr-4">
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.2em] mb-1">Upload Date (등록일)</p>
                <p className="text-gray-500 text-xs font-bold">{new Date(img.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-2 p-2 bg-black/20 rounded-xl border border-white/5">
              <button 
                onClick={() => startEdit(img)}
                className="p-3 hover:bg-[#c5a059] hover:text-black text-gray-400 rounded-lg transition-all duration-300"
                title="Edit 항목 수정"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={() => onDelete(img.id)}
                className="p-3 hover:bg-red-500 hover:text-white text-gray-400 rounded-lg transition-all duration-300"
                title="Delete 항목 삭제"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        )) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl text-gray-600 uppercase tracking-widest text-xs font-black">
            No assets registered yet. (등록된 자산이 없습니다.)
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
