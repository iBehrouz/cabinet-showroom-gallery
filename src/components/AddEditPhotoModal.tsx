import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check,
  Layers,
  Palette
} from 'lucide-react';
import { ShowroomItem, ShowroomCategory } from '../types';
import { SAMPLE_IMAGE_PRESETS } from '../data/initialShowroom';

interface AddEditPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Omit<ShowroomItem, 'id' | 'dateAdded'> & { id?: string }) => void;
  editingItem?: ShowroomItem | null;
}

export const AddEditPhotoModal: React.FC<AddEditPhotoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingItem
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Exclude<ShowroomCategory, 'all'>>('kitchen');
  const [imageUrl, setImageUrl] = useState('');
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [newAdditionalUrl, setNewAdditionalUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [style, setStyle] = useState('Modern Minimalist');
  const [materialsString, setMaterialsString] = useState('');
  const [hardware, setHardware] = useState('');
  const [featured, setFeatured] = useState(false);
  const [year, setYear] = useState('2025');
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState<'upload' | 'url' | 'presets'>('upload');

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || '');
      setCategory(editingItem.category || 'kitchen');
      setImageUrl(editingItem.imageUrl || '');
      setAdditionalImages(editingItem.additionalImages || []);
      setDescription(editingItem.description || '');
      setLocation(editingItem.location || '');
      setStyle(editingItem.style || 'Modern Minimalist');
      setMaterialsString((editingItem.materials || []).join(', '));
      setHardware(editingItem.hardware || '');
      setFeatured(!!editingItem.featured);
      setYear(editingItem.year || '2025');
    } else {
      // Defaults for new item
      setTitle('');
      setCategory('kitchen');
      setImageUrl('');
      setAdditionalImages([]);
      setDescription('');
      setLocation('Sydney, NSW');
      setStyle('Modern Minimalist');
      setMaterialsString('American Oak Veneer, Engineered Quartz, Matte 2-Pack Poly');
      setHardware('Blum Soft-Close Concealed Hinges');
      setFeatured(false);
      setYear(new Date().getFullYear().toString());
    }
  }, [editingItem, isOpen]);

  if (!isOpen) return null;

  // Handle local image file upload & convert to base64 data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAdditionalImage = () => {
    if (newAdditionalUrl.trim()) {
      setAdditionalImages([...additionalImages, newAdditionalUrl.trim()]);
      setNewAdditionalUrl('');
    }
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const materialsArray = materialsString
      .split(',')
      .map(m => m.trim())
      .filter(Boolean);

    onSave({
      id: editingItem?.id,
      title: title.trim(),
      category,
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      additionalImages,
      description: description.trim() || 'Custom architectural cabinetry designed and crafted with precision joinery.',
      location: location.trim(),
      style: style.trim() || 'Bespoke Modern',
      materials: materialsArray.length > 0 ? materialsArray : ['Custom Timber Veneer', 'Engineered Stone'],
      hardware: hardware.trim(),
      featured,
      year: year.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-10 flex flex-col max-h-[90vh] my-auto overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-serif">
                {editingItem ? 'Edit Showroom Project' : 'Add New Showroom Photo'}
              </h3>
              <p className="text-xs text-neutral-400">
                Showcase your custom kitchen, vanity, or joinery craft
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Project / Photo Title <span className="text-amber-400">*</span>
              </label>
              <input
                id="form-title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Scandi Fluted Island Kitchen & Bar"
                className="w-full px-3.5 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Room / Category
              </label>
              <select
                id="form-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
              >
                <option value="kitchen">Kitchen</option>
                <option value="bathroom">Bathroom Vanity</option>
                <option value="wardrobe">Wardrobe / Robe</option>
                <option value="living">Living & Media</option>
                <option value="commercial">Commercial</option>
                <option value="custom">Custom & Cellar</option>
              </select>
            </div>
          </div>

          {/* Photo Source Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-300">
                Showroom Photo <span className="text-amber-400">*</span>
              </label>
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveImageTab('upload')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeImageTab === 'upload' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageTab('url')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeImageTab === 'url' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Image URL
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageTab('presets')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activeImageTab === 'presets' ? 'bg-amber-500 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Sample Presets
                </button>
              </div>
            </div>

            {/* Tab: Upload File */}
            {activeImageTab === 'upload' && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-5 text-center transition-colors ${
                  isDragOver 
                    ? 'border-amber-400 bg-amber-950/20' 
                    : 'border-neutral-700 hover:border-neutral-600 bg-neutral-850/50'
                }`}
              >
                <input
                  type="file"
                  id="image-file-input"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-file-input"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-amber-400 shadow">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-neutral-300">
                    <span className="font-semibold text-amber-400">Click to upload photo</span> or drag & drop here
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Supports JPG, PNG, WEBP from your computer/device
                  </p>
                </label>
              </div>
            )}

            {/* Tab: URL */}
            {activeImageTab === 'url' && (
              <div className="space-y-1.5">
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    id="image-url-input"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... or hosted image URL"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            {/* Tab: Presets */}
            {activeImageTab === 'presets' && (
              <div className="grid grid-cols-3 gap-2 pt-1">
                {SAMPLE_IMAGE_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setStyle(preset.style);
                      setCategory(preset.category);
                    }}
                    className={`group relative aspect-video rounded-lg overflow-hidden border text-left p-1.5 flex flex-col justify-end transition-all ${
                      imageUrl === preset.url ? 'border-amber-400 ring-2 ring-amber-400/40' : 'border-neutral-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={preset.url} alt={preset.label} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60" />
                    <span className="relative z-10 text-[10px] font-medium text-white line-clamp-1">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Active Image Preview */}
            {imageUrl && (
              <div className="relative mt-2 rounded-lg overflow-hidden border border-neutral-700 bg-neutral-950 aspect-[16/9] max-h-48 flex items-center justify-center">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImageUrl('')}
                  className="absolute top-2 right-2 p-1 bg-black/70 hover:bg-red-900/90 text-white rounded-md text-xs transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Style & Location & Year */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-300">Design Style</label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="e.g. Japandi, Hamptons, Scandi"
                className="w-full px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-300">Project Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Brighton, Melbourne"
                className="w-full px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-300">Completion Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
                className="w-full px-3 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Materials & Finishes (Comma separated) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
              <span>Materials & Finishes (separated by commas)</span>
              <span className="text-[11px] text-neutral-500 font-normal">Creates interactive filter chips</span>
            </label>
            <input
              type="text"
              value={materialsString}
              onChange={(e) => setMaterialsString(e.target.value)}
              placeholder="e.g. Solid Oak, Calacatta Marble, Brushed Brass, Matte Poly"
              className="w-full px-3.5 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Hardware & Fittings */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">
              Hardware & Runners Spec
            </label>
            <input
              type="text"
              value={hardware}
              onChange={(e) => setHardware(e.target.value)}
              placeholder="e.g. Blum Legrabox soft-close drawers with integrated warm LED"
              className="w-full px-3.5 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">
              Project Description & Joinery Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the cabinet layout, client requirements, grain matching, special appliance integrations, etc."
              className="w-full px-3.5 py-2 text-xs bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Featured Project Checkbox */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
            <input
              type="checkbox"
              id="form-featured-checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded bg-neutral-800 border-neutral-700 text-amber-500 focus:ring-amber-500"
            />
            <label htmlFor="form-featured-checkbox" className="text-xs text-neutral-200 cursor-pointer select-none">
              Mark as <strong>Featured Project</strong> (pinned with highlight badge)
            </label>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            id="save-project-btn"
            onClick={handleSubmit}
            className="px-5 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg transition-colors flex items-center gap-1.5 shadow"
          >
            <Check className="w-4 h-4" />
            <span>{editingItem ? 'Save Changes' : 'Publish to Showroom'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
