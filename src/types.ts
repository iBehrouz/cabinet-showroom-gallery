export type ShowroomCategory = 
  | 'all'
  | 'kitchen'
  | 'bathroom'
  | 'wardrobe'
  | 'living'
  | 'commercial'
  | 'custom';

export interface ShowroomItem {
  id: string;
  title: string;
  category: 'kitchen' | 'bathroom' | 'wardrobe' | 'living' | 'commercial' | 'custom';
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  location?: string;
  style: string;
  materials: string[];
  hardware?: string;
  featured?: boolean;
  year?: string;
  dateAdded: string;
}

export type ViewMode = 'grid' | 'compact' | 'masonry';
