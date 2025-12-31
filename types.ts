
export type CategoryType = '내부' | '외부' | '조망' | '커뮤니티' | '포토존' | '동영상';
export type MediaType = 'image' | 'video' | 'youtube';

export interface PropertyImage {
  id: string;
  propertyId: string;
  category: CategoryType;
  complex: string; // Dynamic input: e.g. "사화지구", "용지호수"
  type: string; // Dynamic input: e.g. "84A", "102B"
  space: string; // Dynamic input: e.g. "거실", "주방"
  orientation?: string;
  floorLevel?: string;
  imageUrl: string; // For images or thumbnail for videos
  mediaUrl?: string; // Direct video file URL
  youtubeUrl?: string; // YouTube embed link
  mediaType: MediaType;
  createdAt: number;
}

export interface Property {
  id: string;
  name: string;
  complex: string;
  address: string;
  createdAt: number;
}
