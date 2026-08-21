import React from 'react';
import { 
  Eye, 
  Edit3, 
  Trash2, 
  Star, 
  MapPin, 
  Layers, 
  Sparkles, 
  Image as ImageIcon 
} from 'lucide-react';
import { ShowroomItem } from '../types';

interface ShowroomItemCardProps {
  item: ShowroomItem;
  isManageMode: boolean;
  onOpenDetail: (item: ShowroomItem) => void;
  onEdit: (item: ShowroomItem) => void;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

export const ShowroomItemCard: React.FC<ShowroomItemCardProps> = ({
  item,
  isManageMode,
  onOpenDetail,
  onEdit,
  onDelete,
  onToggleFeatured,
}) => {
  const categoryLabels: Record<string, string> = {
    kitchen: 'Kitchen',
    bathroom: 'Bathroom Vanity',
    wardrobe: 'Wardrobe & Robe',
    living: 'Living & Media Wall',
    commercial: 'Commercial Joinery',
    custom: 'Custom Joinery'
  };

  return (
    <div 
      id={`showroom-card-${item.id}`}
      className="group relative bg-neutral-850 rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col shadow-md hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Image Showcase Container */}
      <div 
        onClick={() => onOpenDetail(item)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 cursor-pointer"
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Fallback placeholder if broken URL
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Gradient shadow on image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/20 opacity-70 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-neutral-900/85 backdrop-blur-sm border border-neutral-700/80 text-amber-300 text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
          <span>{categoryLabels[item.category] || item.category}</span>
        </div>

        {/* Featured Star or Multiple Photos Indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {item.featured && (
            <div className="bg-amber-500 text-neutral-950 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
              <Star className="w-3 h-3 fill-neutral-950" />
              <span>Featured</span>
            </div>
          )}
          {item.additionalImages && item.additionalImages.length > 0 && (
            <div className="bg-neutral-900/85 text-neutral-300 text-xs px-2 py-0.5 rounded-full flex items-center gap-1 border border-neutral-700">
              <ImageIcon className="w-3 h-3" />
              <span>+{item.additionalImages.length}</span>
            </div>
          )}
        </div>

        {/* Quick Hover Inspect Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="bg-neutral-900/90 text-white text-xs font-medium px-3.5 py-1.5 rounded-full shadow-lg border border-neutral-700 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>View Full Specs</span>
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Style & Location */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
            <span className="text-amber-400/90 font-medium">{item.style}</span>
            {item.location && (
              <span className="flex items-center gap-1 text-neutral-400 truncate max-w-[140px]" title={item.location}>
                <MapPin className="w-3 h-3 text-neutral-500 shrink-0" />
                <span className="truncate">{item.location}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenDetail(item)}
            className="text-base font-semibold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1 mb-2 font-serif"
          >
            {item.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-3">
            {item.description}
          </p>

          {/* Material Tags */}
          {item.materials && item.materials.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {item.materials.slice(0, 3).map((mat, i) => (
                <span 
                  key={i} 
                  className="bg-neutral-800 text-neutral-300 text-[11px] px-2 py-0.5 rounded border border-neutral-700/60"
                >
                  {mat}
                </span>
              ))}
              {item.materials.length > 3 && (
                <span className="bg-neutral-800 text-neutral-400 text-[11px] px-1.5 py-0.5 rounded border border-neutral-700/60">
                  +{item.materials.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer / Manage Action Bar */}
        <div className="pt-3 mt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
          <button
            onClick={() => onOpenDetail(item)}
            className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 group/btn"
          >
            <span>Explore Details</span>
            <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
          </button>

          {/* Active Manage Mode Controls */}
          {isManageMode ? (
            <div className="flex items-center gap-1.5 animate-fadeIn">
              <button
                id={`toggle-featured-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFeatured(item.id);
                }}
                className={`p-1.5 rounded text-xs border transition-colors ${
                  item.featured
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                }`}
                title={item.featured ? 'Remove featured' : 'Mark as featured'}
              >
                <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                id={`edit-item-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white border border-neutral-700 rounded text-xs transition-colors"
                title="Edit item details"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              </button>

              <button
                id={`delete-item-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="p-1.5 bg-neutral-800 hover:bg-red-950/80 text-neutral-400 hover:text-red-400 border border-neutral-700 hover:border-red-800 rounded text-xs transition-colors"
                title="Delete photo/project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-neutral-400 text-[11px] font-mono">
              {item.year || 'Bespoke'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
