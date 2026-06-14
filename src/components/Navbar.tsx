import React from 'react';
import { Type, Sliders, Grid, Columns, Laptop, BookOpen, Sun, Moon, Menu, X, Sparkles, Heart, Shield, LogIn, ChevronDown, ExternalLink, Box, Droplet, Scissors, Compass, Layers, Maximize, HelpCircle, MousePointer, Move } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  favoritesCount?: number;
  brandName?: string;
  brandLogoSymbol?: string;
  brandLogoUrl?: string;
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  favoritesCount = 0,
  brandName = 'FREECSS',
  brandLogoSymbol = '✨',
  brandLogoUrl = 'https://freecss.net/favicon-32x32.png'}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [fontStylerDropdownOpen, setFontStylerDropdownOpen] = React.useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = React.useState(false);
  const [effectsDropdownOpen, setEffectsDropdownOpen] = React.useState(false);
  const [isLoadingMoreEffects, setIsLoadingMoreEffects] = React.useState(false);
  const [extraEffectsLoaded, setExtraEffectsLoaded] = React.useState(false);

  const fontDropdownItems = [
    { id: 'styler' as ActiveTab, label: 'Font Styler', icon: Sliders, description: 'Analyze, customize, and generate high-performance typography styles' },
    { id: 'directory' as ActiveTab, label: 'Font Directory', icon: Grid, description: 'Browse web-safe stacks and Google Web Font collections' },
    { id: 'compare' as ActiveTab, label: 'Font Compare', icon: Columns, description: 'Compare multiple font configurations side-by-side' },
    { id: 'compatibility' as ActiveTab, label: 'Browser Safety', icon: Laptop, description: 'OS, device & browser safety fallback compatibility index' },
    { id: 'cheatsheet' as ActiveTab, label: 'CSS Cheat Sheet', icon: BookOpen, description: 'Copy-paste handy CSS font templates and fallback code' },
  ];

  const mainNavItems = [
    { id: 'favorites' as ActiveTab, label: 'Favorites', icon: Heart },
  ];

  const effectItems = [
    { id: 'transform-playground' as ActiveTab, label: 'Transform Playground', icon: Move, description: 'Interactive 3D transform tool controlling rotational angles, perspective, axial scales, and transit times' },
    { id: 'background-pattern' as ActiveTab, label: 'Background Pattern', icon: Grid, description: 'Interactive CSS grid, dots, stripes, waves, and geometric background pattern builder with direct CSS export' },
    { id: 'cursor' as ActiveTab, label: 'Custom CSS Cursor', icon: MousePointer, description: 'Creative custom cursor designer with trailing ripples, custom pointers, and hover animation logic' },
    { id: 'tooltip' as ActiveTab, label: 'Tooltip Generator', icon: HelpCircle, description: 'Visual interactive custom CSS tooltip bubble playground with arrow controllers' },
    { id: 'neumorphism' as ActiveTab, label: 'Neumorphism', icon: Compass, description: 'Skeuomorphic soft-shadow playground with dynamic light angle control' },
    { id: 'border-radius' as ActiveTab, label: 'Border Radius', icon: Maximize, description: '8-point asymmetrical border radius generator for organic morphing shapes' },
    { id: 'glass' as ActiveTab, label: 'Liquid Glass', icon: Droplet, description: 'Frosted Glassmorphism engine with floating fluid background layers' },
    { id: 'backdrop-filter' as ActiveTab, label: 'Backdrop Filter', icon: Layers, description: 'Translucent glassmorphism controller altering areas directly behind components' },
    { id: 'effects' as ActiveTab, label: 'Hover Effect', icon: Sparkles, description: 'Interactive CSS hover action & animation creator' },
    { id: 'shadow' as ActiveTab, label: 'Box Shadow', icon: Box, description: 'Sophisticated multi-layered CSS shadow generator' },
    { id: 'clippath' as ActiveTab, label: 'Clip-Path', icon: Scissors, description: 'Interactive CSS clip-path polygon generator with draggable control points' },
  ];

  const designPartners = [
    { label: 'Free Advance Font Generator', url: 'https://genfonts.com/' },
    { label: 'Free Advance Color Palettes', url: 'https://flatpalette.com/' },
    { label: 'Favicon Studio', url: 'https://faviconexpert.com/' },
    { label: 'Free Resource UI', url: 'https://templatemind.com/' },
    { label: 'Image Watermarker', url: 'https://templatemind.com/tools/watermark' },
    { label: 'Image Converter', url: 'https://templatemind.com/tools/image-converter' },
    { label: 'Image Cropper', url: 'https://templatemind.com/tools/image-cropper' },
    { label: 'Image Compressor', url: 'https://templatemind.com/tools/image-compressor' },
    { label: 'Word Count', url: 'https://templatemind.com/tools/word-counter' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('styler')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-pink-550 text-white border-2 border-indigo-600/30 shadow-sm overflow-hidden relative group">
              <span className="text-[12px] font-black tracking-tighter leading-none text-white font-mono z-10 transition-transform group-hover:scale-110 duration-200">
                CSS
              </span>
              <div className="absolute -bottom-1 -right-1 text-lg opacity-25 font-mono font-bold leading-none select-none text-white">
                #
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white font-display uppercase">
                {brandName}
              </span>
              <span className="ml-1.5 text-[9px] font-bold tracking-widest uppercase bg-indigo-100 dark:bg-indigo-950/80 text-indigo-750 dark:text-indigo-300 px-2 py-0.5 rounded-lg border border-indigo-200/50 dark:border-indigo-900/50 font-display font-display">
                .NET
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1.5 items-center">
            
            {/* Font Styler Dropdown (Mouse Hover Active) */}
            <div 
              className="relative"
              onMouseEnter={() => setFontStylerDropdownOpen(true)}
              onMouseLeave={() => setFontStylerDropdownOpen(false)}
            >
              <button
                type="button"
                id="nav-fontstyler-dropdown-btn"
                onClick={() => {
                  setActiveTab('styler');
                  setFontStylerDropdownOpen(!fontStylerDropdownOpen);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all duration-150 cursor-pointer ${
                  activeTab === 'styler' || activeTab === 'directory' || activeTab === 'compare' || activeTab === 'compatibility' || activeTab === 'cheatsheet'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border border-transparent'
                    : 'text-slate-650 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>Font Styler</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${fontStylerDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {fontStylerDropdownOpen && (
                <>
                  {/* Invisible Backdrop */}
                  <div 
                    className="fixed inset-0 z-40 cursor-default animate-fade-in" 
                    onClick={() => setFontStylerDropdownOpen(false)} 
                  />
                  
                  {/* Dropdown Card */}
                  <div className="absolute left-0 mt-2 w-72 origin-top-left rounded-2xl border-2 border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 shadow-xl ring-1 ring-black/5 z-50 focus:outline-none animate-in fade-in duration-100 slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/60 mb-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-550 block">
                        Font Tools & Directories
                      </span>
                    </div>
                    {fontDropdownItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          id={`nav-font-dropdown-item-${item.id}`}
                          onClick={() => {
                            setActiveTab(item.id);
                            setFontStylerDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 rounded-xl p-2 px-2.5 text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-750 dark:text-slate-300'
                          }`}
                        >
                          <div className={`mt-0.5 p-1.5 rounded-lg border ${
                            isActive 
                              ? 'border-transparent bg-white/20 text-white' 
                              : 'border-slate-150 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-indigo-650 dark:text-indigo-400'
                          }`}>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black leading-normal uppercase tracking-wide font-display">
                              {item.label}
                            </p>
                            <p className={`text-[10px] whitespace-normal leading-relaxed mt-0.5 ${
                              isActive ? 'text-indigo-100' : 'text-slate-450'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Effects Dropdown Button */}
            <div 
              className="relative"
              onMouseEnter={() => setEffectsDropdownOpen(true)}
              onMouseLeave={() => {
                setEffectsDropdownOpen(false);
                setExtraEffectsLoaded(false);
              }}
            >
              <button
                type="button"
                id="nav-effects-dropdown-btn"
                onClick={() => {
                  setEffectsDropdownOpen(false);
                  const effectsTabs = ['effects', 'shadow', 'glass', 'clippath', 'neumorphism', 'backdrop-filter', 'border-radius', 'tooltip', 'cursor', 'background-pattern', 'transform-playground'];
                  if (!effectsTabs.includes(activeTab)) {
                    setActiveTab('effects');
                  }
                  setTimeout(() => {
                    const relatedSection = document.getElementById('related-css-effects-section');
                    if (relatedSection) {
                      relatedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all duration-150 cursor-pointer ${
                  ['effects', 'shadow', 'glass', 'clippath', 'neumorphism', 'backdrop-filter', 'border-radius', 'tooltip', 'cursor', 'background-pattern', 'transform-playground'].includes(activeTab)
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border border-transparent'
                    : 'text-slate-650 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>Effects</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${effectsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {effectsDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40 cursor-default animate-fade-in" 
                    onClick={() => {
                      setEffectsDropdownOpen(false);
                      setExtraEffectsLoaded(false);
                    }} 
                  />
                  
                  <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border-2 border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 shadow-xl ring-1 ring-black/5 z-50 focus:outline-none animate-in fade-in duration-100 slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/60 mb-1.5 flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-550 block">
                        Visual Effects & Animations
                      </span>
                      <span className="text-[8px] font-mono font-bold bg-indigo-55 dark:bg-indigo-950/40 text-indigo-750 dark:text-indigo-400 px-1.5 py-0.5 rounded">
                        {extraEffectsLoaded ? "11 of 11 loaded" : "5 of 11 loaded"}
                      </span>
                    </div>
                    
                    <div className="max-h-[380px] overflow-y-auto space-y-0.5 scrollbar-thin">
                      {(extraEffectsLoaded ? effectItems : effectItems.slice(0, 5)).map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            id={`nav-dropdown-item-${item.id}`}
                            onClick={() => {
                              setActiveTab(item.id);
                              setEffectsDropdownOpen(false);
                            }}
                            className={`w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                              isActive
                                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-750 dark:text-slate-300'
                            }`}
                          >
                            <div className={`mt-0.5 p-1.5 rounded-lg border ${
                              isActive 
                                ? 'border-transparent bg-white/20 text-white' 
                                : 'border-slate-150 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-indigo-650 dark:text-indigo-400'
                            }`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold leading-normal uppercase tracking-wide font-display">
                                {item.label}
                              </p>
                              <p className={`text-[10px] whitespace-normal leading-relaxed mt-0.5 ${
                                isActive ? 'text-indigo-100' : 'text-slate-450'
                              }`}>
                                {item.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* INTERACTIVE 'LOAD MORE' LOADER SECTION */}
                    <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/60 px-1 pb-1">
                      <button
                        onClick={() => {
                          setIsLoadingMoreEffects(true);
                          setTimeout(() => {
                            setIsLoadingMoreEffects(false);
                            setExtraEffectsLoaded(true);
                          }, 800);
                        }}
                        disabled={isLoadingMoreEffects || extraEffectsLoaded}
                        className="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-5/50 dark:bg-indigo-950/20 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-all cursor-pointer font-display disabled:opacity-60"
                      >
                        {isLoadingMoreEffects ? (
                          <span className="flex items-center gap-1.5 animate-pulse mx-auto text-indigo-780 dark:text-indigo-300 text-center font-bold">
                            <span className="w-3 h-3 rounded-full border-2 border-indigo-650 dark:border-indigo-400 border-t-transparent animate-spin inline-block" />
                            Loading premium presets...
                          </span>
                        ) : extraEffectsLoaded ? (
                          <span className="text-emerald-600 dark:text-emerald-450 text-center w-full block font-bold">
                            ✓ All 11 custom filters optimized!
                          </span>
                        ) : (
                          <>
                            <span>Load More Effects ↓</span>
                            <span className="text-[9px] font-mono normal-case bg-indigo-600 text-white px-2 py-0.5 rounded">6 remaining</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>

            {/* Tools (Companions) Dropdown Button */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                id="nav-tools-dropdown-btn"
                onClick={() => {
                  setToolsDropdownOpen(!toolsDropdownOpen);
                  const companionSection = document.getElementById('companion-designer-tools-section');
                  if (companionSection) {
                    companionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all duration-150 cursor-pointer ${
                  toolsDropdownOpen
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/55'
                    : 'text-slate-650 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>Free Tools</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <>
                  {/* Invisible Backdrop to handle click outs gracefully */}
                  <div 
                    className="fixed inset-0 z-40 cursor-default animate-fade-in" 
                    onClick={() => setToolsDropdownOpen(false)} 
                  />
                  
                  {/* Dropdown Card */}
                  <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border-2 border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 shadow-xl ring-1 ring-black/5 z-50 focus:outline-none animate-in fade-in duration-100 slide-in-from-top-2">
                    <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/60 mb-1.5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-550 block">
                        Free Tools
                      </span>
                    </div>
                    
                    <div className="space-y-0.5 px-1 pb-1 font-display">
                      {designPartners.map((partner, pIdx) => (
                        <a
                          key={pIdx}
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors"
                        >
                          <span>{partner.label}</span>
                          <ExternalLink className="h-3 w-3 opacity-60 text-indigo-500" />
                        </a>
                      ))}
                    </div>
                    
                    <div className="pt-2 mt-1.5 border-t border-slate-100 dark:border-slate-800/60 px-1 pb-1">
                      <button
                        onClick={() => {
                          setToolsDropdownOpen(false);
                          const sec = document.getElementById('companion-designer-tools-section');
                          if (sec) {
                            sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 dark:hover:text-indigo-300 transition-all cursor-pointer font-display"
                      >
                        <span>Load More Tools ↓</span>
                        <span className="text-[9px] font-mono normal-case bg-indigo-600 text-white px-1.5 py-0.5 rounded">16 Total</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Settings & Toggle Actions */}
          <div className="flex items-center space-x-2">
            {/* Desktop-only Favorites icon button */}
            <button
              id="nav-tab-favorites-icon"
              onClick={() => setActiveTab('favorites')}
              className={`hidden md:flex p-2.5 rounded-xl border transition-all cursor-pointer items-center justify-center relative ${
                activeTab === 'favorites'
                  ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-white dark:text-slate-950 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
              title="View Favorites"
              aria-label="View Favorites List"
            >
              <Heart className={`h-4.5 w-4.5 transition-colors ${activeTab === 'favorites' ? 'fill-red-500 text-red-500' : 'text-red-400 hover:text-red-500'}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-black bg-red-500 text-white border border-white dark:border-slate-950 shadow-sm leading-none transition-all animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Desktop-only Admin Login icon button */}
            <button
              id="admin-nav-login"
              onClick={() => setActiveTab('admin')}
              className={`hidden md:flex p-2.5 rounded-xl border transition-all cursor-pointer items-center justify-center ${
                activeTab === 'admin'
                  ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-white dark:text-slate-950 shadow-sm'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
              title="Administrator Login"
              aria-label="Admin Customizer Login"
            >
              <LogIn className="h-4.5 w-4.5" />
            </button>

            {/* Dark Mode toggle button */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-650" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-150">
          <div className="space-y-1.5 px-3 py-4">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold uppercase tracking-wider font-display transition-all ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${item.id === 'favorites' && isActive ? 'fill-red-500 text-red-500' : item.id === 'favorites' ? 'text-red-400' : ''}`} />
                  <span className="flex-1">{item.label}</span>
                  {item.id === 'favorites' && favoritesCount > 0 && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-red-500 text-white leading-none shadow-sm">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Mobile Tools section divider */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                const sec = document.getElementById('companion-designer-tools-section');
                if (sec) {
                  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-4 py-2 mt-2 border-t border-slate-150 dark:border-slate-800/60 font-display cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center justify-between"
            >
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                Advanced Tools
              </span>
              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Scroll ↓</span>
            </div>

            {fontDropdownItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold uppercase tracking-wider font-display transition-all ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                      : 'text-slate-650 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5 text-indigo-650 dark:text-indigo-400" />
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Effects and Shadows Section */}
            <div className="px-4 py-2 mt-2 border-t border-slate-150 dark:border-slate-800/60 font-display flex items-center justify-between">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-550 block">
                Effects & Shadows
              </span>
            </div>

            {effectItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-tab-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold uppercase tracking-wider font-display transition-all ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                      : 'text-slate-650 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5 text-indigo-650 dark:text-indigo-400" />
                  <span className="flex-1">{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Design Companions divider & links */}
            <div 
              onClick={() => {
                setMobileMenuOpen(false);
                const sec = document.getElementById('companion-designer-tools-section');
                if (sec) {
                  sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-4 py-2 mt-2 border-t border-slate-150 dark:border-slate-800/60 font-display cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center justify-between"
            >
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                Free Tools
              </span>
              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Scroll ↓</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 px-2">
              {designPartners.map((partner, pIdx) => (
                <a
                  key={pIdx}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-850 font-display transition-all"
                >
                  <span>{partner.label}</span>
                  <ExternalLink className="h-4 w-4 text-indigo-500" />
                </a>
              ))}
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const sec = document.getElementById('companion-designer-tools-section');
                  if (sec) {
                    sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-indigo-605 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-150/40 dark:border-indigo-900/50 font-display transition-all cursor-pointer"
              >
                <span>Load More Tools ↓</span>
                <span className="text-[9px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">More ↓</span>
              </button>
            </div>

            {/* Dedicated mobile layout admin login item */}
            <div className="pt-2 border-t border-slate-150 dark:border-slate-800/60 mt-2">
              <button
                id="mobile-nav-tab-admin"
                onClick={() => {
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-bold uppercase tracking-wider font-display transition-all ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                    : 'text-slate-650 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <LogIn className="h-5 w-5 text-indigo-650" />
                <span className="flex-1">Admin Portal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
