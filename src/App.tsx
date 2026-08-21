import React, { useState, useEffect, useMemo } from 'react';
import { ShowroomItem, ShowroomCategory, ViewMode } from './types';
import { INITIAL_SHOWROOM_ITEMS } from './data/initialShowroom';
import { ShowroomNavbar } from './components/ShowroomNavbar';
import { ShowroomHero } from './components/ShowroomHero';
import { CategoryFilter } from './components/CategoryFilter';
import { GalleryGrid } from './components/GalleryGrid';
import { ItemDetailModal } from './components/ItemDetailModal';
import { AddEditPhotoModal } from './components/AddEditPhotoModal';
import { EmbedExportModal } from './components/EmbedExportModal';
import { 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Layers,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const STORAGE_KEY = 'cabinet_showroom_gallery_items_v1';

export default function App() {
  // 1. Showroom Items State with LocalStorage persistence
  const [items, setItems] = useState<ShowroomItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading showroom items from localStorage', e);
    }
    return INITIAL_SHOWROOM_ITEMS;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving showroom items to localStorage', e);
    }
  }, [items]);

  // 2. Navigation & Filter States
  const [selectedCategory, setSelectedCategory] = useState<ShowroomCategory>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isManageMode, setIsManageMode] = useState<boolean>(false);

  // 3. Modal States
  const [detailItem, setDetailItem] = useState<ShowroomItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ShowroomItem | null>(null);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState<boolean>(false);

  // 4. Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // 5. Filtered Items Logic
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Finish/Material tag match
      if (selectedTag && !item.materials.includes(selectedTag)) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesStyle = item.style.toLowerCase().includes(q);
        const matchesLocation = item.location?.toLowerCase().includes(q);
        const matchesMaterials = item.materials.some((m) => m.toLowerCase().includes(q));
        const matchesHardware = item.hardware?.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesStyle || matchesLocation || matchesMaterials || matchesHardware;
      }
      return true;
    });
  }, [items, selectedCategory, selectedTag, searchQuery]);

  // 6. Action Handlers
  const handleSaveItem = (itemData: Omit<ShowroomItem, 'id' | 'dateAdded'> & { id?: string }) => {
    if (itemData.id) {
      // Editing existing item
      setItems((prev) =>
        prev.map((i) =>
          i.id === itemData.id
            ? {
                ...i,
                ...itemData,
                id: itemData.id!
              }
            : i
        )
      );
      showToast(`Updated "${itemData.title}" successfully!`);
    } else {
      // Adding new item
      const newItem: ShowroomItem = {
        ...itemData,
        id: `cab-${Date.now()}`,
        dateAdded: new Date().toISOString().slice(0, 10)
      };
      setItems((prev) => [newItem, ...prev]);
      showToast(`Added new project "${newItem.title}" to showroom!`);
    }
  };

  const handleDeleteItem = (id: string) => {
    const itemToDelete = items.find(i => i.id === id);
    if (window.confirm(`Are you sure you want to remove "${itemToDelete?.title || 'this project'}" from the showroom?`)) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      if (detailItem?.id === id) setDetailItem(null);
      showToast('Showroom item removed.');
    }
  };

  const handleToggleFeatured = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, featured: !i.featured } : i))
    );
    showToast('Featured status updated.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset showroom gallery to sample projects? Any custom edits will be replaced.')) {
      setItems(INITIAL_SHOWROOM_ITEMS);
      showToast('Showroom reset to curated sample projects.');
    }
  };

  const handleImportItems = (newItems: ShowroomItem[]) => {
    setItems(newItems);
    showToast(`Loaded ${newItems.length} showroom projects.`);
  };

  const handleOpenEdit = (item: ShowroomItem) => {
    setEditingItem(item);
    setIsAddModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      
      {/* Sticky Navbar */}
      <ShowroomNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isManageMode={isManageMode}
        onToggleManageMode={() => setIsManageMode(!isManageMode)}
        onOpenAddModal={handleOpenAdd}
        onOpenEmbedModal={() => setIsEmbedModalOpen(true)}
        onResetData={handleResetData}
        totalCount={items.length}
        filteredCount={filteredItems.length}
      />

      {/* Hero Showcase Spotlight */}
      <ShowroomHero
        items={items}
        isManageMode={isManageMode}
        onToggleManageMode={() => setIsManageMode(!isManageMode)}
        onOpenAddModal={handleOpenAdd}
      />

      {/* Category & Finish Filter Bar */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        items={items}
      />

      {/* Main Gallery Showcase Grid */}
      <main className="flex-1">
        <GalleryGrid
          items={filteredItems}
          viewMode={viewMode}
          isManageMode={isManageMode}
          onOpenDetail={(item) => setDetailItem(item)}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteItem}
          onToggleFeatured={handleToggleFeatured}
          onOpenAddModal={handleOpenAdd}
          onClearFilters={() => {
            setSelectedCategory('all');
            setSelectedTag(null);
            setSearchQuery('');
          }}
        />
      </main>

      {/* Lightbox / High-Res Specs Modal */}
      <ItemDetailModal
        item={detailItem}
        allItems={filteredItems}
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        onEdit={handleOpenEdit}
        onSelectAnother={(item) => setDetailItem(item)}
      />

      {/* Add / Edit Project Photo Modal */}
      <AddEditPhotoModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        editingItem={editingItem}
      />

      {/* Embed / Connect with Single HTML Homepage Modal */}
      <EmbedExportModal
        isOpen={isEmbedModalOpen}
        onClose={() => setIsEmbedModalOpen(false)}
        items={items}
        onImportItems={handleImportItems}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 border border-amber-500/50 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-neutral-900 border-t border-neutral-800 py-10 px-4 sm:px-6 lg:px-8 text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Bespoke Cabinetry & Joinery Showroom</p>
              <p className="text-neutral-500 text-[11px]">Dynamic gallery designed for custom cabinet makers & interior joiners</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-300">
            <button
              onClick={() => setIsEmbedModalOpen(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Embed / Export Code
            </button>
            <span>•</span>
            <button
              onClick={handleOpenAdd}
              className="hover:text-amber-400 transition-colors"
            >
              Add New Photo
            </button>
            <span>•</span>
            <button
              onClick={handleResetData}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Sample Projects</span>
            </button>
          </div>

          <div className="text-neutral-500 text-[11px]">
            &copy; {new Date().getFullYear()} Cabinet Showroom. All photography & specs protected.
          </div>
        </div>
      </footer>

    </div>
  );
}
