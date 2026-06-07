import React, { useState, useEffect } from 'react';
import { Search, Heart, Sliders, Trash2, Copy, Check, Filter, Database, Link as LinkIcon, Sparkles } from 'lucide-react';
import { ALL_FONTS } from '../data/fontsData';
import { FontItem } from '../types';

interface FavoritesViewProps {
  favorites: string[];
  toggleFavorite: (fontId: string) => void;
  clearAllFavorites: () => void;
  onSelectFont: (fontId: string) => void;
}

export default function FavoritesView({
  favorites,
  toggleFavorite,
  clearAllFavorites,
  onSelectFont,
}: FavoritesViewProps) {
  // Query state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Custom Typography preview settings
  const [globalPreviewText, setGlobalPreviewText] = useState('Inspect and style this favorited font.');
  const [globalFontSize, setGlobalFontSize] = useState(24);
  const [copiedFontId, setCopiedFontId] = useState<string | null>(null);
  const [bulkCopied, setBulkCopied] = useState(false);

  // Filter full fonts metadata based on what exists in our favorites list
  const favoritedFonts = ALL_FONTS.filter((font) => favorites.includes(font.id));

  // Dynamically load Google Webfonts on-demand if they are in favorites
  useEffect(() => {
    favoritedFonts.forEach((font) => {
      if (font.isGoogleFont) {
        const fontName = font.googleFontUrlName || font.name.replace(/ /g, '+');
        const linkId = `google-font-${font.id}`;
        if (!document.getElementById(linkId)) {
          const link = document.createElement('link');
          link.id = linkId;
          link.rel = 'stylesheet';
          link.href = `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`;
          document.head.appendChild(link);
        }
      }
    });
  }, [favoritedFonts]);

  // Apply filters to our favorited subset
  const filteredFavorites = favoritedFonts.filter((font) => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          font.stack.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All Favorites' },
    { value: 'sans-serif', label: 'Sans-Serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'cursive', label: 'Cursive' },
    { value: 'display', label: 'Display' },
  ];

  const handleCopyStack = (font: FontItem) => {
    const stackSnippet = `font-family: ${font.stack};`;
    navigator.clipboard.writeText(stackSnippet);
    setCopiedFontId(font.id);
    setTimeout(() => setCopiedFontId(null), 2000);
  };

  const handleBulkCopy = () => {
    if (favoritedFonts.length === 0) return;
    const allStacks = favoritedFonts
      .map(font => `/* ${font.name} (${font.category}) */\n--font-${font.id}: ${font.stack};`)
      .join('\n\n');
    
    navigator.clipboard.writeText(allStacks);
    setBulkCopied(true);
    setTimeout(() => setBulkCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Card with count & quick actions */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-display">
            <Heart className="h-3.5 w-3.5 fill-indigo-400" />
            <span>Curated Collection</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display">
            My Favorites ({favoritedFonts.length})
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
            Your customized list of preferred typeface stacks saved securely to your browser storage. Analyze properties, copy CSS, or style them inside the interactive tools.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 font-display">
            <button
              onClick={handleBulkCopy}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border border-indigo-500/20 shadow-sm"
              title="Copy CSS variables for all favorites"
            >
              {bulkCopied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>All Stacks Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy CSS Variables</span>
                </>
              )}
            </button>
            <button
              onClick={clearAllFavorites}
              className="flex items-center gap-1.5 bg-slate-905 hover:bg-red-950 hover:text-red-300 border border-slate-800 hover:border-red-900 text-slate-400 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear Collection</span>
            </button>
          </div>
        )}
      </div>

      {/* Main content split */}
      {favorites.length > 0 ? (
        <div className="space-y-6">
          
          {/* Filters & Previews Bar */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Search favorites */}
              <div className="md:col-span-4 relative font-display">
                <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  id="favorites-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtered search..."
                  className="w-full text-xs font-bold uppercase tracking-wider pl-11 pr-4 py-3.5 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Editable preview text */}
              <div className="md:col-span-5 relative font-display">
                <input
                  id="favorites-preview-input"
                  type="text"
                  value={globalPreviewText}
                  onChange={(e) => setGlobalPreviewText(e.target.value)}
                  placeholder="Type preview text..."
                  className="w-full text-xs font-bold uppercase tracking-wider px-4 py-3.5 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Font sizing slider */}
              <div className="md:col-span-3 flex flex-col justify-center font-display">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                  <span>Preview Size</span>
                  <span className="font-mono text-slate-900 dark:text-white">{globalFontSize}px</span>
                </div>
                <input
                  id="favorites-size-slider"
                  type="range"
                  min="14"
                  max="64"
                  value={globalFontSize}
                  onChange={(e) => setGlobalFontSize(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-155 dark:bg-slate-800 rounded-lg appearance-none accent-indigo-600 cursor-pointer"
                />
              </div>

            </div>

            {/* Categories filter list */}
            <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t-2 border-slate-100 dark:border-slate-800/80 font-display">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2 flex items-center gap-1.5">
                <Filter className="h-3 w-3" /> Filter Categories:
              </span>
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    id={`fav-cat-filter-${cat.value}`}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`text-[10px] uppercase font-black tracking-wider px-3.5 py-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-indigo-650 text-white dark:bg-indigo-600'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-800/85 border border-slate-200/50 dark:border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Grid list of favorited entries */}
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((font) => {
                const isCopied = copiedFontId === font.id;
                return (
                  <div
                    key={font.id}
                    id={`fav-font-card-${font.id}`}
                    className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 shadow-sm rounded-2xl p-5 flex flex-col justify-between group hover:border-slate-800 dark:hover:border-slate-350 transition-all duration-150"
                  >
                    <div>
                      {/* Top Header details with Favorite Switch toggle */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                        <div>
                          <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase font-display select-none">
                            {font.name}
                          </h4>
                          <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 font-bold leading-none">
                            {font.category} • {font.isGoogleFont ? 'Google API' : 'System Stack'}
                          </span>
                        </div>

                        <button
                          id={`fav-star-toggle-${font.id}`}
                          onClick={() => toggleFavorite(font.id)}
                          className="h-8.5 w-8.5 rounded-full bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40 text-red-500 flex items-center justify-center transition-all cursor-pointer border border-red-200/30"
                          title="Remove from favorites list"
                        >
                          <Heart className="h-4.5 w-4.5 fill-red-500 text-red-500" />
                        </button>
                      </div>

                      {/* Font Render box */}
                      <div className="py-4 overflow-hidden text-clip min-h-[95px] border-b border-subtle border-dashed">
                        <p
                          id={`fav-render-text-${font.id}`}
                          style={{
                            fontFamily: font.stack,
                            fontSize: `${globalFontSize}px`,
                            lineHeight: 1.3,
                            wordBreak: 'break-word',
                          }}
                          className="text-slate-900 dark:text-slate-100"
                        >
                          {globalPreviewText || 'Sample preview.'}
                        </p>
                      </div>

                      {/* Stack inspect */}
                      <div className="mt-4">
                        <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                          Font Stack Syntax
                        </span>
                        <div className="text-[11px] font-mono bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-2.5 rounded-lg truncate text-slate-500 dark:text-slate-400 select-all">
                          font-family: {font.stack};
                        </div>
                      </div>

                    </div>

                    {/* Bottom action handlers */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs font-display">
                      <button
                        id={`fav-select-style-${font.id}`}
                        onClick={() => onSelectFont(font.id)}
                        className="flex items-center gap-1.5 bg-indigo-55 hover:bg-indigo-600 text-indigo-600 hover:text-white dark:bg-indigo-950/40 dark:hover:bg-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                      >
                        <Sliders className="h-3.5 w-3.5" />
                        <span>Open Styler</span>
                      </button>

                      <button
                        id={`fav-copy-stack-${font.id}`}
                        onClick={() => handleCopyStack(font)}
                        className="flex items-center gap-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 dark:border-slate-800 px-3 py-2 rounded-xl font-medium cursor-pointer transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy CSS</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl py-12 px-6">
              <p className="text-slate-450 dark:text-slate-550 font-mono text-sm leading-relaxed mb-3">
                No favorited fonts match your filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer uppercase tracking-wider"
              >
                Reset filter query
              </button>
            </div>
          )}

        </div>
      ) : (
        /* Cozy, premium empty state with directory redirect CTAs */
        <div id="favorites-empty-state" className="text-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800/80 rounded-3xl p-12 max-w-lg mx-auto space-y-6 shadow-sm">
          <div className="mx-auto h-16 w-16 bg-indigo-50 dark:bg-indigo-950/40 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Heart className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight font-display">
              Collection is Empty
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
              Any standard system typeface stack or Google loaded font with custom weights can be saved here for quick layout reviews.
            </p>
          </div>

          <div className="pt-2 font-display">
            <button
              onClick={() => onSelectFont('inter')} // fallback navigates to active directories / styler
              className="inline-flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm transition-all"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Browse Font Directory</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
