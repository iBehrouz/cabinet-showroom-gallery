import React from 'react';
import { 
  Sparkles, 
  Plus, 
  Settings2, 
  ShieldCheck, 
  Award, 
  Maximize2 
} from 'lucide-react';
import { ShowroomItem } from '../types';

interface ShowroomHeroProps {
  items: ShowroomItem[];
  isManageMode: boolean;
  onToggleManageMode: () => void;
  onOpenAddModal: () => void;
}

export const ShowroomHero: React.FC<ShowroomHeroProps> = ({
  items,
  isManageMode,
  onToggleManageMode,
  onOpenAddModal
}) => {
  const featuredItem = items.find(i => i.featured) || items[0];
  const totalProjects = items.length;
  const kitchenCount = items.filter(i => i.category === 'kitchen').length;
  const vanityCount = items.filter(i => i.category === 'bathroom').length;
  const wardrobeCount = items.filter(i => i.category === 'wardrobe').length;

  return (
    <div className="border-b border-neutral-800 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Bespoke Cabinetry & Architectural Joinery Portfolio</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif text-neutral-100">
              Interactive Showroom & Project Showcase
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              Explore our curated portfolio of handcrafted luxury kitchens, custom bathroom vanities, walk-in dressing suites, and architectural media joinery. Easily updated in real-time.
            </p>

            {/* Quick Summary Pill Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-neutral-850/80 border border-neutral-800 rounded-xl p-3">
                <span className="text-xs text-neutral-400">Total Projects</span>
                <p className="text-xl font-bold text-white font-mono">{totalProjects}</p>
              </div>
              <div className="bg-neutral-850/80 border border-neutral-800 rounded-xl p-3">
                <span className="text-xs text-neutral-400">Gourmet Kitchens</span>
                <p className="text-xl font-bold text-amber-400 font-mono">{kitchenCount}</p>
              </div>
              <div className="bg-neutral-850/80 border border-neutral-800 rounded-xl p-3">
                <span className="text-xs text-neutral-400">Vanity Suites</span>
                <p className="text-xl font-bold text-amber-400 font-mono">{vanityCount}</p>
              </div>
              <div className="bg-neutral-850/80 border border-neutral-800 rounded-xl p-3">
                <span className="text-xs text-neutral-400">Custom Robes</span>
                <p className="text-xl font-bold text-amber-400 font-mono">{wardrobeCount}</p>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-add-photo-btn"
                onClick={onOpenAddModal}
                className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Add Showroom Photo</span>
              </button>

              <button
                id="hero-manage-toggle-btn"
                onClick={onToggleManageMode}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium border transition-colors flex items-center gap-2 ${
                  isManageMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                    : 'bg-neutral-800 hover:bg-neutral-750 text-neutral-200 border-neutral-700'
                }`}
              >
                <Settings2 className="w-4 h-4" />
                <span>{isManageMode ? 'Done Editing' : 'Manage / Edit Photos'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Showcase Spotlight */}
          {featuredItem && (
            <div className="lg:col-span-5">
              <div className="relative group rounded-2xl overflow-hidden border border-neutral-750 bg-neutral-850 shadow-2xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={featuredItem.imageUrl}
                    alt={featuredItem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                <div className="absolute top-3 left-3 bg-amber-400 text-neutral-950 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                  <Sparkles className="w-3 h-3" />
                  <span>Spotlight Project</span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 space-y-1">
                  <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">
                    {featuredItem.style}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white font-serif line-clamp-1">
                    {featuredItem.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2">
                    {featuredItem.description}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
