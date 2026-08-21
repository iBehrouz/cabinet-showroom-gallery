import React from 'react';
import { 
  Plus, 
  Search, 
  Settings2, 
  Code2, 
  RotateCcw, 
  LayoutGrid, 
  Columns3, 
  ListFilter,
  Sparkles,
  Layers
} from 'lucide-react';
import { ViewMode } from '../types';

interface ShowroomNavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isManageMode: boolean;
  onToggleManageMode: () => void;
  onOpenAddModal: () => void;
  onOpenEmbedModal: () => void;
  onResetData: () => void;
  totalCount: number;
  filteredCount: number;
}

export const ShowroomNavbar: React.FC<ShowroomNavbarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  isManageMode,
  onToggleManageMode,
  onOpenAddModal,
  onOpenEmbedModal,
  onResetData,
  totalCount,
  filteredCount
}) => {
  return (
    <header className="sticky top-0 z-30 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 text-neutral-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Showroom Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-inner border border-amber-500/30 text-amber-100">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white font-serif">
                  SHOWROOM GALLERY
                </h1>
                <span className="bg-amber-950/80 border border-amber-700/50 text-amber-400 text-xs px-2 py-0.5 rounded font-mono font-medium">
                  {totalCount} Projects
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Custom Cabinetry, Bespoke Joinery & Architectural Finishes
              </p>
            </div>
          </div>

          {/* Quick Search & Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-64 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                id="search-showroom-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search woods, quartz, styles..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-800/90 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg p-0.5">
              <button
                id="view-grid-btn"
                onClick={() => onViewModeChange('grid')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-neutral-700 text-white shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Standard Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                id="view-masonry-btn"
                onClick={() => onViewModeChange('masonry')}
                className={`p-1.5 rounded text-xs transition-colors ${
                  viewMode === 'masonry' 
                    ? 'bg-neutral-700 text-white shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
                title="Masonry Gallery"
              >
                <Columns3 className="w-4 h-4" />
              </button>
            </div>

            {/* Manage Mode Toggle Switch */}
            <button
              id="manage-mode-toggle"
              onClick={onToggleManageMode}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                isManageMode
                  ? 'bg-amber-600/20 text-amber-300 border-amber-500/60 shadow-sm'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
              }`}
              title={isManageMode ? 'Exit edit mode' : 'Enable edit & delete mode'}
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>{isManageMode ? 'Editing Active' : 'Edit Mode'}</span>
            </button>

            {/* Embed / Connect to Single HTML helper */}
            <button
              id="embed-modal-trigger-btn"
              onClick={onOpenEmbedModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors"
              title="Connect with your single HTML homepage"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Connect to HTML</span>
            </button>

            {/* Add Photo / Project Button */}
            <button
              id="add-new-project-btn"
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg shadow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Photo</span>
            </button>
          </div>
        </div>

        {/* Live Filter Counter Banner when filtered */}
        {(searchQuery || filteredCount < totalCount) && (
          <div className="pb-3 pt-1 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800/80">
            <span>
              Showing <strong className="text-amber-400">{filteredCount}</strong> of {totalCount} showcase entries
              {searchQuery && <span> matching "{searchQuery}"</span>}
            </span>
            <button
              onClick={() => onSearchChange('')}
              className="text-amber-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
