import React from 'react';
import { Plus, ImageOff, FilterX } from 'lucide-react';
import { ShowroomItem, ViewMode } from '../types';
import { ShowroomItemCard } from './ShowroomItemCard';

interface GalleryGridProps {
  items: ShowroomItem[];
  viewMode: ViewMode;
  isManageMode: boolean;
  onOpenDetail: (item: ShowroomItem) => void;
  onEdit: (item: ShowroomItem) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onOpenAddModal: () => void;
  onClearFilters: () => void;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  items,
  viewMode,
  isManageMode,
  onOpenDetail,
  onEdit,
  onDelete,
  onToggleFeatured,
  onOpenAddModal,
  onClearFilters
}) => {
  if (items.length === 0) {
    return (
      <div className="py-20 text-center px-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-neutral-850 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
          <ImageOff className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Showroom Items Found</h3>
        <p className="text-sm text-neutral-400 mb-6">
          No projects match your current search or category filters. You can clear your filters or add a new showroom photo right away.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors"
          >
            Clear Filters
          </button>
          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Grid or Masonry Layout */}
      <div 
        className={
          viewMode === 'masonry'
            ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        }
      >
        {items.map((item) => (
          <div 
            key={item.id} 
            className={viewMode === 'masonry' ? 'break-inside-avoid' : ''}
          >
            <ShowroomItemCard
              item={item}
              isManageMode={isManageMode}
              onOpenDetail={onOpenDetail}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFeatured={onToggleFeatured}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
