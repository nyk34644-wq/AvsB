
import { PropertyImage, Property } from './types';

export const INITIAL_PROPERTY: Property = {
  id: 'p1',
  name: '엔젤부동산',
  complex: '전체 매물 분석',
  address: '경상남도 창원시 의창구',
  createdAt: Date.now()
};

export const INITIAL_IMAGES: PropertyImage[] = [
  {
    id: 'img1',
    propertyId: 'p1',
    category: '내부',
    complex: '추천단지A',
    type: '84A',
    space: '거실',
    orientation: '남동향',
    floorLevel: '고층',
    imageUrl: 'https://picsum.photos/id/10/1200/800',
    mediaType: 'image',
    createdAt: Date.now()
  },
  {
    id: 'img2',
    propertyId: 'p1',
    category: '내부',
    complex: '추천단지A',
    type: '84B',
    space: '거실',
    orientation: '남동향',
    floorLevel: '고층',
    imageUrl: 'https://picsum.photos/id/20/1200/800',
    mediaType: 'image',
    createdAt: Date.now() - 1000
  },
  {
    id: 'img3',
    propertyId: 'p1',
    category: '외부',
    complex: '추천단지B',
    type: '단지경관',
    space: '정원',
    imageUrl: 'https://picsum.photos/id/30/1200/800',
    mediaType: 'image',
    createdAt: Date.now() - 2000
  },
  {
    id: 'img5',
    propertyId: 'p1',
    category: '동영상',
    complex: '단지안내',
    type: '홍보영상',
    space: '전체',
    imageUrl: 'https://picsum.photos/id/60/1200/800',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    mediaType: 'youtube',
    createdAt: Date.now() - 4000
  }
];

export const CATEGORIES = ['내부', '외부', '조망', '커뮤니티', '포토존', '동영상'];
