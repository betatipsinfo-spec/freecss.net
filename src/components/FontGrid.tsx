import React, { useState, useEffect } from 'react';
import { Search, Grid, Eye, Copy, Check, Filter, Compass, SlidersHorizontal, Sliders, Heart, ArrowDown } from 'lucide-react';
import { ALL_FONTS, SAMPLE_TEXTS } from '../data/fontsData';
import { FontItem } from '../types';
import { motion } from 'motion/react';

interface FontGridProps {
  onSelectFont: (fontId: string) => void;
  favorites?: string[];
  toggleFavorite?: (fontId: string) => void;
}

export default function FontGrid({ onSelectFont, favorites = [], toggleFavorite }: FontGridProps) {
  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [fontSource, setFontSource] = useState<'all' | 'system' | 'google'>('all');
  
  // Pagination State
  const [visibleCount, setVisibleCount] = useState(30);

  // Reset visibleCount limit whenever filter options change
  useEffect(() => {
    setVisibleCount(30);
  }, [searchQuery, selectedCategory, fontSource]);
  
  // Preview configuration
  const [globalPreviewText, setGlobalPreviewText] = useState('Typing live preview stylesheet.');
  const [globalFontSize, setGlobalFontSize] = useState(24); // in px
  const [copiedFontId, setCopiedFontId] = useState<string | null>(null);

  // Filtered Fonts list calculation
  const filteredFonts = ALL_FONTS.filter((font) => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          font.stack.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory;
    
    const matchesSource = 
      fontSource === 'all' ||
      (fontSource === 'system' && !font.isGoogleFont) ||
      (fontSource === 'google' && font.isGoogleFont);

    return matchesSearch && matchesCategory && matchesSource;
  });

  const displayedFonts = filteredFonts.slice(0, visibleCount);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'sans-serif', label: 'Sans-Serif' },
    { value: 'serif', label: 'Serif' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'cursive', label: 'Cursive / Handwriting' },
    { value: 'display', label: 'Display' },
  ];

  const handleCopyStack = (font: FontItem) => {
    const stackSnippet = `font-family: ${font.stack};`;
    navigator.clipboard.writeText(stackSnippet);
    setCopiedFontId(font.id);
    setTimeout(() => setCopiedFontId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Filtering Controls Header Bar */}
      <div id="dir-filters" className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        
        {/* Search and preview settings inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search text input */}
          <div className="md:col-span-4 relative font-display">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
            <input
              id="directory-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fonts (e.g. Arial, Inter, Georgia)..."
              className="w-full text-xs font-bold uppercase tracking-wider pl-11 pr-4 py-3.5 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Real-time Custom Preview typing text */}
          <div className="md:col-span-5 relative font-display">
            <input
              id="directory-preview-input"
              type="text"
              value={globalPreviewText}
              onChange={(e) => setGlobalPreviewText(e.target.value)}
              placeholder="Type custom text to preview here..."
              className="w-full text-xs font-bold uppercase tracking-wider px-4 py-3.5 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Size slider controller */}
          <div className="md:col-span-3 flex flex-col justify-center font-display">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
              <span>Preview Size</span>
              <span className="font-mono text-slate-900 dark:text-white">{globalFontSize}px</span>
            </div>
            <input
              id="directory-size-slider"
              type="range"
              min="14"
              max="64"
              value={globalFontSize}
              onChange={(e) => setGlobalFontSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-155 dark:bg-slate-800 rounded-lg appearance-none accent-indigo-600 cursor-pointer"
            />
          </div>

        </div>

        {/* Categories togglers selection and Source tags */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t-2 border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto font-display">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2 flex items-center gap-1.5 col-span-1">
              <Filter className="h-3 w-3" /> Categories:
            </span>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  id={`cat-filter-${cat.value}`}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`text-[10px] uppercase font-black tracking-wider px-3.5 py-2 rounded-lg cursor-pointer transition-colors ${
                    selectedCategory === cat.value
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-800/85 border border-slate-200/50 dark:border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* System Safe vs Web Loaded Selection toggles */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl shrink-0 font-display border border-slate-200 dark:border-slate-800">
            {(['all', 'system', 'google'] as const).map((source) => (
              <button
                key={source}
                id={`source-filter-${source}`}
                onClick={() => setFontSource(source)}
                className={`text-[10px] uppercase px-3 py-1.5 rounded-lg font-black cursor-pointer transition-all ${
                  fontSource === source
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'text-slate-550 dark:text-slate-400'
                }`}
              >
                {source === 'all' ? 'All Web Fonts' : source === 'system' ? 'Web Safe' : 'Google Fonts'}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* 2. Responsive Font Grid Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayedFonts.map((font) => {
          const isCopied = copiedFontId === font.id;
          const isFavorited = favorites.includes(font.id);
          return (
            <div
              key={font.id}
              id={`font-card-${font.id}`}
              className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 shadow-sm hover:-translate-y-0.5 rounded-2xl p-5 flex flex-col justify-between group hover:border-slate-800 dark:hover:border-slate-300 transition-all duration-200"
            >
              <div>
                
                {/* Font Card Header Details */}
                <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-850 pb-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 font-display uppercase tracking-tight">
                        {font.name}
                      </h4>
                      {toggleFavorite && (
                        <button
                          id={`favorite-toggle-${font.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(font.id);
                          }}
                          className="p-1 rounded-full hover:bg-slate-105 dark:hover:bg-slate-800 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
                        >
                          <Heart className={`h-3.5 w-3.5 transition-all ${isFavorited ? 'fill-red-505 text-red-500 scale-110' : 'text-slate-400'}`} />
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500 font-bold">
                      {font.category} • {font.isGoogleFont ? 'Google API' : 'OS Font'}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded ${
                    font.isGoogleFont 
                      ? 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' 
                      : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {font.isGoogleFont ? 'Dynamic Web' : `Safety: ${font.safetyScore}%`}
                  </span>
                </div>

                {/* Real-time rendered live preview text */}
                <div className="py-4 overflow-hidden text-clip min-h-[105px] border-b border-subtle border-dashed">
                  <p
                    id={`preview-text-${font.id}`}
                    style={{
                      fontFamily: font.stack,
                      fontSize: `${globalFontSize}px`,
                      lineHeight: 1.3,
                      wordBreak: 'break-word',
                    }}
                    className="text-slate-800 dark:text-slate-100"
                  >
                    {globalPreviewText || 'Sample typography line.'}
                  </p>
                </div>

                {/* Technical CSS Font Stack snippet */}
                <div className="mt-4">
                  <span className="block text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 font-mono">
                    CSS Font-Family Stack
                  </span>
                  <div className="text-[11px] font-mono bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 p-2.5 rounded-lg truncate text-slate-500 dark:text-slate-400 select-all">
                    font-family: {font.stack};
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-3 text-xs">
                
                {/* Select & Style button sends font id back to parent */}
                <button
                  id={`select-style-btn-${font.id}`}
                  onClick={() => onSelectFont(font.id)}
                  className="flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white dark:bg-indigo-950/30 dark:hover:bg-indigo-600 dark:text-indigo-400 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all border border-indigo-150/10"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Styler Tool</span>
                </button>

                {/* Copy Family Stack directly to clipboard */}
                <button
                  id={`copy-stack-btn-${font.id}`}
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

      {/* Interactive Load More Button for Pagination */}
      {filteredFonts.length > visibleCount && (
        <div id="dir-load-more" className="flex flex-col items-center justify-center pt-8 pb-4 font-display">
          <p className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">
            Showing <span className="text-slate-800 dark:text-slate-200">{visibleCount}</span> of <span className="text-slate-800 dark:text-slate-200">{filteredFonts.length}</span> Web Fonts
          </p>
          <motion.button
            id="load-more-btn"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setVisibleCount((prev) => Math.min(prev + 30, filteredFonts.length))}
            className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-650/15 cursor-pointer transition-all border border-indigo-500/10"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />
            <span>Load More Fonts</span>
          </motion.button>
        </div>
      )}

      {/* No Results Fallback state */}
      {filteredFonts.length === 0 && (
        <div id="no-results" className="text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-12">
          <p className="text-slate-450 dark:text-slate-550 font-mono text-sm leading-relaxed mb-2">
            No typography matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setFontSource('all');
            }}
            className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
          >
            Reset filter criteria
          </button>
        </div>
      )}

    </div>
  );
}
