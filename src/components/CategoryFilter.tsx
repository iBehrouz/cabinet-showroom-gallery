import React from 'react';
import { 
  UtensilsCrossed, 
  Bath, 
  Shirt, 
  Tv, 
  Briefcase, 
  Sparkles, 
  LayoutGrid,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { ShowroomCategory, ShowroomItem } from '../types';

interface CategoryFilterProps {
  selectedCategory: ShowroomCategory;
  onSelectCategory: (category: ShowroomCategory) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  items: ShowroomItem[];
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedTag,
  onSelectTag,
  items
}) => {
  const getCategoryCount = (cat: ShowroomCategory) => {
    if (cat === 'all') return items.length;
    return items.filter(item => item.category === cat).length;
  };

  const categories: { id: ShowroomCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Projects', icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'kitchen', label: 'Kitchens', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { id: 'bathroom', label: 'Bathrooms', icon: <Bath className="w-3.5 h-3.5" /> },
    { id: 'wardrobe', label: 'Robes & Closets', icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: 'living', label: 'Media & Living', icon: <Tv className="w-3.5 h-3.5" /> },
    { id: 'commercial', label: 'Commercial', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'custom', label: 'Custom & Cellars', icon: <Sparkles className="w-3.5 h-3.5" /> }
  ];

  // Extract popular material tags
  const allMaterials = Array.from(
    new Set<string>(items.flatMap(item => item.materials || []))
  ).slice(0, 10);

  return (
    <div className="bg-neutral-900 border-b border-neutral-800 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Category Main Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-neutral-700">
          {categories.map((cat) => {
            const count = getCategoryCount(cat.id);
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => {
                  onSelectCategory(cat.id);
                  onSelectTag(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 shadow-md font-semibold'
                    : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-750 hover:text-white border border-neutral-700/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-amber-950/20 text-neutral-950 font-bold' : 'bg-neutral-700 text-neutral-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Material Filter Chips */}
        {allMaterials.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1 text-xs text-neutral-400">
            <span className="flex items-center gap-1 text-neutral-400 font-medium mr-1">
              <Tag className="w-3 h-3 text-amber-500" /> Finishes:
            </span>
            {allMaterials.map(mat => {
              const isTagSelected = selectedTag === mat;
              return (
                <button
                  key={mat}
                  id={`tag-btn-${mat.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => onSelectTag(isTagSelected ? null : mat)}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors border ${
                    isTagSelected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-medium'
                      : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                  }`}
                >
                  {mat}
                </button>
              );
            })}
            {selectedTag && (
              <button
                onClick={() => onSelectTag(null)}
                className="text-amber-400 hover:underline ml-1"
              >
                Clear finish filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
