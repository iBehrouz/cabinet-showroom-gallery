import React, { useState } from 'react';
import { 
  X, 
  Code, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  ExternalLink, 
  Layers, 
  FileText,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { ShowroomItem } from '../types';

interface EmbedExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ShowroomItem[];
  onImportItems: (newItems: ShowroomItem[]) => void;
}

export const EmbedExportModal: React.FC<EmbedExportModalProps> = ({
  isOpen,
  onClose,
  items,
  onImportItems
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'iframe' | 'backup'>('link');
  const [copiedLinkSnippet, setCopiedLinkSnippet] = useState(false);
  const [copiedIframeSnippet, setCopiedIframeSnippet] = useState(false);
  const [copiedJsonSnippet, setCopiedJsonSnippet] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // HTML Link Snippet for single-file homepage
  const linkSnippet = `<!-- Add this button/link in your single-file index.html navigation or hero section -->
<a href="${currentUrl}" target="_blank" class="showroom-btn" style="
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #f59e0b;
  color: #0a0a0a;
  padding: 12px 24px;
  font-family: sans-serif;
  font-weight: 600;
  font-size: 15px;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);
  transition: transform 0.2s, background-color 0.2s;
">
  <span>Explore Our Dynamic Showroom Gallery &rarr;</span>
</a>`;

  // Iframe snippet to embed showroom directly inside the single-page HTML
  const iframeSnippet = `<!-- Paste this inside your single-file index.html where you want your showroom gallery to appear -->
<section id="showroom-section" style="width: 100%; padding: 40px 0; background: #121212;">
  <div style="max-width: 1280px; margin: 0 auto; padding: 0 20px;">
    <h2 style="color: #ffffff; font-family: serif; font-size: 32px; margin-bottom: 12px;">
      Cabinetry & Joinery Showroom
    </h2>
    <p style="color: #a3a3a3; font-size: 16px; margin-bottom: 24px;">
      Interactive gallery with real-time category filtering and material specifications.
    </p>
    <iframe 
      src="${currentUrl}" 
      style="width: 100%; height: 850px; border: 1px solid #262626; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.5);"
      title="Cabinet Showroom Gallery"
      loading="lazy"
      allowfullscreen
    ></iframe>
  </div>
</section>`;

  const copyToClipboard = (text: string, type: 'link' | 'iframe' | 'json') => {
    navigator.clipboard?.writeText(text);
    if (type === 'link') {
      setCopiedLinkSnippet(true);
      setTimeout(() => setCopiedLinkSnippet(false), 2500);
    } else if (type === 'iframe') {
      setCopiedIframeSnippet(true);
      setTimeout(() => setCopiedIframeSnippet(false), 2500);
    } else {
      setCopiedJsonSnippet(true);
      setTimeout(() => setCopiedJsonSnippet(false), 2500);
    }
  };

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cabinet_showroom_gallery_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (Array.isArray(parsed) && parsed.length > 0) {
        onImportItems(parsed);
        setImportStatus(`Successfully imported ${parsed.length} showroom projects!`);
        setTimeout(() => {
          setImportStatus(null);
          onClose();
        }, 1800);
      } else {
        setImportStatus('Invalid JSON: Must be an array of showroom items.');
      }
    } catch (err) {
      setImportStatus('Syntax Error: Please check that your JSON is properly formatted.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-10 flex flex-col max-h-[90vh] my-auto overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Code className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white font-serif">
                Integrate with Your Single-File Homepage
              </h3>
              <p className="text-xs text-neutral-400">
                Connect your homepage to this dynamic showroom without messing up your main HTML
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

        {/* Tab Switcher */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/50 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('link')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'link'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Option 1: Link Button</span>
          </button>

          <button
            onClick={() => setActiveTab('iframe')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'iframe'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Option 2: Embed Iframe</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'backup'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup & Export JSON</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: Link Button */}
          {activeTab === 'link' && (
            <div className="space-y-3">
              <div className="bg-neutral-850 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-300 space-y-2">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Keep your homepage super fast & lightweight
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  Since your homepage is a single HTML file, the cleanest approach is to keep it fast and uncluttered, and simply add a styled link or navigation item pointing to this dynamic showroom gallery.
                </p>
              </div>

              <div className="relative">
                <pre className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
                  {linkSnippet}
                </pre>
                <button
                  onClick={() => copyToClipboard(linkSnippet, 'link')}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-medium border border-neutral-700 flex items-center gap-1.5 transition-colors shadow"
                >
                  {copiedLinkSnippet ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLinkSnippet ? 'Copied to Clipboard!' : 'Copy HTML Snippet'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Iframe Embed */}
          {activeTab === 'iframe' && (
            <div className="space-y-3">
              <div className="bg-neutral-850 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-300 space-y-2">
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" /> Embed inside your single HTML homepage
                </p>
                <p className="text-neutral-400 leading-relaxed">
                  Paste this snippet directly into your <code className="text-amber-300 bg-neutral-900 px-1 py-0.5 rounded">index.html</code> where you want the gallery section to live. Visitors will experience the full dynamic filter and lightbox right on your homepage!
                </p>
              </div>

              <div className="relative">
                <pre className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-300 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
                  {iframeSnippet}
                </pre>
                <button
                  onClick={() => copyToClipboard(iframeSnippet, 'iframe')}
                  className="absolute top-3 right-3 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-medium border border-neutral-700 flex items-center gap-1.5 transition-colors shadow"
                >
                  {copiedIframeSnippet ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIframeSnippet ? 'Copied to Clipboard!' : 'Copy Iframe Code'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Backup & JSON Export */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-850 border border-neutral-800 rounded-xl">
                <div>
                  <h4 className="text-xs font-semibold text-white">Export All Showroom Data</h4>
                  <p className="text-xs text-neutral-400">
                    Download all your photos, categories, and material tags as a JSON file backup.
                  </p>
                </div>
                <button
                  onClick={handleDownloadBackup}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .JSON</span>
                </button>
              </div>

              {/* Import JSON */}
              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <label className="text-xs font-semibold text-neutral-300">
                  Import / Restore JSON Data
                </label>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste exported JSON array of showroom projects here..."
                  className="w-full px-3.5 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-xl text-white font-mono placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />

                {importStatus && (
                  <p className={`text-xs font-medium ${importStatus.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}>
                    {importStatus}
                  </p>
                )}

                <button
                  onClick={handleImportJson}
                  disabled={!importJsonText.trim()}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Import & Replace Current Showroom</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
