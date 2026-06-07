import React from 'react';
import { Type, Sliders, Grid, Columns, Laptop, BookOpen, Sun, Moon, Menu, X, Sparkles, Heart, Shield, LogIn, ChevronDown } from 'lucide-react';
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
  brandName = 'CSSFONTS',
  brandLogoSymbol = '✨',
  brandLogoUrl = ''}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = React.useState(false);

  const mainNavItems = [
    { id: 'styler' as ActiveTab, label: 'Font Styler', icon: Sliders },
    { id: 'directory' as ActiveTab, label: 'Font Directory', icon: Grid },
    { id: 'compare' as ActiveTab, label: 'Font Compare', icon: Columns },
    { id: 'favorites' as ActiveTab, label: 'Favorites', icon: Heart },
  ];

  const toolItems = [
    { id: 'compatibility' as ActiveTab, label: 'Browser Safety', icon: Laptop, description: 'OS & device compatibility score checker' },
    { id: 'cheatsheet' as ActiveTab, label: 'CSS Cheat Sheet', icon: BookOpen, description: 'Copy-paste handy CSS font templates' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => setActiveTab('styler')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 border-2 border-slate-900 dark:border-white shadow-sm overflow-hidden">
              {brandLogoUrl ? (
                <img src={brandLogoUrl} alt="Logo" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="text-base font-bold font-display">{brandLogoSymbol}</span>
              )}
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
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all duration-150 ${
                    isActive
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 border border-transparent'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${item.id === 'favorites' && isActive ? 'fill-red-500 text-red-550' : item.id === 'favorites' ? 'text-red-400 hover:text-red-500' : ''}`} />
                  <span>{item.label}</span>
                  {item.id === 'favorites' && favoritesCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-red-500 text-white dark:bg-red-650 leading-none shadow-sm transition-all animate-pulse">
                      {favoritesCount}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Tools Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                id="nav-tools-dropdown-btn"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all duration-150 cursor-pointer ${
                  activeTab === 'compatibility' || activeTab === 'cheatsheet'
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/55'
                    : 'text-slate-650 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-900 border border-transparent'
                }`}
              >
                <span>Tools</span>
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
                        Advanced Utilities
                      </span>
                    </div>
                    {toolItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          id={`nav-dropdown-item-${item.id}`}
                          onClick={() => {
                            setActiveTab(item.id);
                            setToolsDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-750 dark:text-slate-300'
                          }`}
                        >
                          <div className={`mt-0.5 p-1.5 rounded-lg border ${
                            isActive 
                              ? 'border-transparent bg-white/10 dark:bg-black/5 text-currentColor' 
                              : 'border-slate-150 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 text-indigo-650 dark:text-indigo-400'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold leading-normal uppercase tracking-wide font-display">
                              {item.label}
                            </p>
                            <p className={`text-[10px] whitespace-normal leading-relaxed mt-0.5 ${
                              isActive ? 'text-slate-200 dark:text-slate-400' : 'text-slate-450'
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
          </nav>

          {/* Settings & Toggle Actions */}
          <div className="flex items-center space-x-2">
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
            <div className="px-4 py-2 mt-2 border-t border-slate-150 dark:border-slate-800/60 font-display">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block">
                Advanced Tools
              </span>
            </div>

            {toolItems.map((item) => {
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
