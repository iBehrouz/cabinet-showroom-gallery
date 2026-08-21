import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Layers, 
  Wrench, 
  Star, 
  Share2, 
  Edit3, 
  Sparkles,
  PhoneCall,
  Check
} from 'lucide-react';
import { ShowroomItem } from '../types';

interface ItemDetailModalProps {
  item: ShowroomItem | null;
  allItems: ShowroomItem[];
  isOpen: boolean;
  onClose: () => void;
  onEdit: (item: ShowroomItem) => void;
  onSelectAnother: (item: ShowroomItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  allItems,
  isOpen,
  onClose,
  onEdit,
  onSelectAnother
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showInquirySent, setShowInquirySent] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    setCopiedLink(false);
    setShowInquirySent(false);
  }, [item?.id]);

  if (!isOpen || !item) return null;

  const allImages = [item.imageUrl, ...(item.additionalImages || [])];
  const currentImage = allImages[activeImageIndex] || item.imageUrl;

  // Find index in filtered or all items for Prev / Next navigation
  const currentIndex = allItems.findIndex(i => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allItems.length - 1;

  const handlePrev = () => {
    if (hasPrev) onSelectAnother(allItems[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) onSelectAnother(allItems[currentIndex + 1]);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Lightbox Card */}
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh] my-auto">
        
        {/* Top Header Bar */}
        <div className="px-6 py-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 capitalize">
              {item.category}
            </span>
            {item.featured && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 flex items-center gap-1">
                <Star className="w-3 h-3 fill-neutral-950" /> Featured
              </span>
            )}
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline">
              Project #{item.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors text-xs flex items-center gap-1.5"
              title="Copy link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onEdit(item);
              }}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors text-xs flex items-center gap-1.5"
              title="Edit project details"
            >
              <Edit3 className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Edit</span>
            </button>

            <button
              onClick={onClose}
              id="close-lightbox-modal"
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left Column: Image Viewer */}
          <div className="lg:col-span-7 bg-neutral-950 flex flex-col justify-center relative min-h-[320px] lg:min-h-[500px]">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={currentImage}
                alt={item.title}
                className="max-h-[55vh] lg:max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />

              {/* Prev / Next Image Carousel Buttons if multiple images */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1))}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white border border-neutral-700 shadow-md transition-transform active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0))}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white border border-neutral-700 shadow-md transition-transform active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip if multiple images */}
            {allImages.length > 1 && (
              <div className="p-3 bg-neutral-900/80 border-t border-neutral-800 flex items-center justify-center gap-2 overflow-x-auto">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-neutral-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Project Specifications & Story */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6 bg-neutral-900">
            <div className="space-y-4">
              <div>
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  {item.style}
                </span>
                <h2 className="text-2xl font-bold text-white font-serif mt-1">
                  {item.title}
                </h2>
                
                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{item.location}</span>
                    {item.year && (
                      <>
                        <span className="text-neutral-600">•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-neutral-500" />
                          {item.year}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Design & Craftsmanship Notes
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Material Specifications */}
              {item.materials && item.materials.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-neutral-800">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" /> Selected Materials & Surfaces
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {item.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs px-2.5 py-1 rounded-md"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Hardware & Fittings */}
              {item.hardware && (
                <div className="space-y-1 pt-2 border-t border-neutral-800">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" /> Internal Hardware & Mechanisms
                  </h4>
                  <p className="text-xs text-neutral-300 bg-neutral-850 p-2.5 rounded-lg border border-neutral-800">
                    {item.hardware}
                  </p>
                </div>
              )}
            </div>

            {/* Inquire CTA & Item Carousel Nav */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              {showInquirySent ? (
                <div className="bg-green-950/40 border border-green-700/50 p-3 rounded-lg text-center text-xs text-green-300 font-medium flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Inquiry reference noted! We will prepare the joinery specification sheet.</span>
                </div>
              ) : (
                <button
                  id="inquire-specs-btn"
                  onClick={() => setShowInquirySent(true)}
                  className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Inquire About This Custom Joinery</span>
                </button>
              )}

              {/* Previous / Next Project Switcher */}
              <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  className="flex items-center gap-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Project</span>
                </button>

                <span className="font-mono text-[11px] text-neutral-500">
                  {currentIndex + 1} / {allItems.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  className="flex items-center gap-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next Project</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
