import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FontStyler from './components/FontStyler';
import FontGrid from './components/FontGrid';
import FontComparison from './components/FontComparison';
import CompatibilityTable from './components/CompatibilityTable';
import CheatSheet from './components/CheatSheet';
import FavoritesView from './components/FavoritesView';
import AdminDashboard from './components/AdminDashboard';
import CompanionTools from './components/CompanionTools';
import FAQ from './components/FAQ';
import AboutView from './components/AboutView';
import PrivacyView from './components/PrivacyView';
import TermsView from './components/TermsView';
import HoverEffectsGenerator from './components/HoverEffectsGenerator';
import BoxShadowGenerator from './components/BoxShadowGenerator';
import LiquidGlassGenerator from './components/LiquidGlassGenerator';
import ClipPathGenerator from './components/ClipPathGenerator';
import NeumorphismGenerator from './components/NeumorphismGenerator';
import BackdropFilterGenerator from './components/BackdropFilterGenerator';
import BorderRadiusGenerator from './components/BorderRadiusGenerator';
import TooltipGenerator from './components/TooltipGenerator';
import CustomCursorGenerator from './components/CustomCursorGenerator';
import BackgroundPatternGenerator from './components/BackgroundPatternGenerator';
import TransformPlayground from './components/TransformPlayground';
import RelatedEffects from './components/RelatedEffects';
import BackToTop from './components/BackToTop';
import { ActiveTab, AppAdminConfig } from './types';
import { Type, Sparkles, Wand2, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('styler');
  const [selectedFontId, setSelectedFontId] = useState<string>('inter');

  // Favorites Local Storage State
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('font_favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Keep Favorites Synced
  useEffect(() => {
    localStorage.setItem('font_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (fontId: string) => {
    setFavorites((prev) =>
      prev.includes(fontId) ? prev.filter((id) => id !== fontId) : [...prev, fontId]
    );
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to clear your entire favorites list?')) {
      setFavorites([]);
    }
  };

  // Admin Dashboard Configuration State
  const [adminConfig, setAdminConfig] = useState<AppAdminConfig>(() => {
    const defaultConfig: AppAdminConfig = {
      defaultFontSize: 48,
      brandName: 'FREECSS',
      brandLogoSymbol: '✨',
      brandLogoUrl: 'https://freecss.net/favicon-32x32.png',
      primaryBrandColor: '#6366f1', // indigo-500
      secondaryBrandColor: '#4f46e5', // indigo-600
      defaultPreviewTheme: 'dark',
      enableAnalyticsSimulation: true,
      playgroundHeaderTitle: 'Web Typography Playground',
      playgroundHeaderSubtitle: 'Analyze, compare, customize, and copy high-performance typography styles instantly. Built specifically for developers inspecting local system safe stacks or Google Web Font declarations seamlessly.',
      enableGoogleFonts: true,
      seoTitle: 'FREECSS | Interactive design suite for web typography.',
      seoDescription: 'Analyze, compare, customize, and copy high-performance typography styles instantly. Built specifically for developers inspecting local system safe stacks or Google Web Font declarations seamlessly.',
      seoKeywords: 'fonts, typography, css font-family, web safe fonts, google fonts, responsive typography, browser compatibility, font styler',
      seoOgImage: 'https://freecss.net/og-image.png',
      seoRobots: 'index, follow',
      seoCanonicalUrl: 'https://freecss.net/',
      footerCopyrightName: 'cssfonts.net',
      footerDescription: 'Interactive design suite for web typography. Preview standard and Google fonts, generate copy-to-clipboard clean CSS code, compare rendering side-by-side, and inspect universal web safety index scores.',
      footerAboutTitle: 'About CSSFonts',
      footerAboutDescription: 'This interactive suite is designed and published under premium guidelines. Optimized for lightning-fast styling with standard fallback stacks.',
    };

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_admin_config');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const loaded = {
            ...defaultConfig,
            ...parsed
          };
          if (loaded.brandName === 'CSSFONTS' || loaded.brandName === 'FreeCSS') {
            loaded.brandName = 'FREECSS';
          }
          if (loaded.brandLogoUrl === '' || loaded.brandLogoUrl === 'https://freecss.net/logo.png') {
            loaded.brandLogoUrl = 'https://freecss.net/favicon-32x32.png';
          }
          return loaded;
        } catch (e) {
          // fallback to defaults
        }
      }
    }
    return defaultConfig;
  });

  // Keep Admin Config Synced & Inject Real-time Head SEO/Meta tags and Brand Colors
  useEffect(() => {
    localStorage.setItem('app_admin_config', JSON.stringify(adminConfig));

    // Dynamic brand color styles override
    const styleId = 'dynamic-custom-brand-styles';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    const primaryColor = adminConfig.primaryBrandColor;
    const secondaryColor = adminConfig.secondaryBrandColor || '#4f46e5';
    
    styleEl.innerHTML = `
      :root {
        --primary-brand-override: ${primaryColor};
        --primary-brand-hover-override: ${primaryColor}cc;
        --secondary-brand-override: ${secondaryColor};
        --secondary-brand-hover-override: ${secondaryColor}cc;
      }
      .dynamic-accent-color {
        color: var(--primary-brand-override) !important;
      }
      .dynamic-bg-color {
        background-color: var(--primary-brand-override) !important;
      }
      .dynamic-bg-hover:hover {
        background-color: var(--primary-brand-hover-override) !important;
      }
      .dynamic-border-color {
        border-color: var(--primary-brand-override) !important;
      }
      
      /* Overriding standard Indigo utilities for complete coverage of customized colors */
      .bg-indigo-600 {
        background-color: var(--primary-brand-override) !important;
      }
      .hover\\:bg-indigo-500:hover {
        background-color: var(--primary-brand-hover-override) !important;
      }
      .active\\:bg-indigo-700:active {
        background-color: var(--secondary-brand-override) !important;
      }
      .text-indigo-600, .text-indigo-100, .text-indigo-700, .text-indigo-750, .text-indigo-650 {
        color: var(--primary-brand-override) !important;
      }
      .text-indigo-400 {
        color: var(--primary-brand-override) !important;
        opacity: 0.9;
      }
      .bg-indigo-50, .bg-indigo-950\\/50, .bg-indigo-100 {
        background-color: var(--primary-brand-override)15 !important;
      }
      .border-indigo-200\\/50, .border-indigo-900\\/50 {
        border-color: var(--primary-brand-override)30 !important;
      }
      .focus\\:ring-indigo-500:focus, .focus\\:ring-indigo-600:focus {
        --tw-ring-color: var(--primary-brand-override) !important;
        border-color: var(--primary-brand-override) !important;
      }
      .accent-indigo-650, .accent-indigo-600, .accent-indigo-500 {
        accent-color: var(--primary-brand-override) !important;
      }
    `;

    // Real-time document SEO integration
    if (typeof document !== 'undefined') {
      document.title = adminConfig.seoTitle;

      const setMetaTag = (attributeName: string, attributeValue: string, contentValue: string) => {
        let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute(attributeName, attributeValue);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', contentValue);
      };

      setMetaTag('name', 'description', adminConfig.seoDescription);
      setMetaTag('name', 'keywords', adminConfig.seoKeywords);
      setMetaTag('name', 'robots', adminConfig.seoRobots);

      // Link canonical tag
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', adminConfig.seoCanonicalUrl);

      // OpenGraph social media preview tag headers
      setMetaTag('property', 'og:title', adminConfig.seoTitle);
      setMetaTag('property', 'og:description', adminConfig.seoDescription);
      setMetaTag('property', 'og:image', adminConfig.seoOgImage);
      setMetaTag('property', 'og:url', adminConfig.seoCanonicalUrl);
      setMetaTag('property', 'og:type', 'website');
    }
  }, [adminConfig]);

  // Dark Mode Persistence init
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Dark mode effect syncer
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle direct tab navigation with specific target font
  const navigateToStylerWithFont = (fontId: string) => {
    setSelectedFontId(fontId);
    handleSetActiveTab('styler');
  };

  const handleSetActiveTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* 1. Universal Top Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        favoritesCount={favorites.length}
        brandName={adminConfig.brandName}
        brandLogoSymbol={adminConfig.brandLogoSymbol}
        brandLogoUrl={adminConfig.brandLogoUrl}
      />

      {/* 2. Main Layout Shell */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dynamic Premium Hero Greeting Header - displays prominently on main views */}
        {(activeTab === 'styler' || activeTab === 'directory' || activeTab === 'favorites' || activeTab === 'admin') && (
          <div className="mb-10 text-center space-y-4 max-w-4xl mx-auto py-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-100 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-900/50 uppercase tracking-wider font-display">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Free Interactive CSS Font Tools & Generator Suite</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-tight uppercase">
              {adminConfig.playgroundHeaderTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
              {adminConfig.playgroundHeaderSubtitle}
            </p>
          </div>
        )}

        {/* 3. Render Active view with animations */}
        <section className="transition-all duration-200" id="main-content-section">
          {activeTab === 'styler' && (
            <FontStyler 
              initialFontId={selectedFontId} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}

          {activeTab === 'directory' && (
            <FontGrid 
              onSelectFont={navigateToStylerWithFont} 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView 
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              clearAllFavorites={clearAllFavorites}
              onSelectFont={navigateToStylerWithFont}
            />
          )}

          {activeTab === 'compare' && (
            <FontComparison />
          )}

          {activeTab === 'effects' && (
            <HoverEffectsGenerator />
          )}

          {activeTab === 'shadow' && (
            <BoxShadowGenerator />
          )}

          {activeTab === 'glass' && (
            <LiquidGlassGenerator />
          )}

          {activeTab === 'clippath' && (
            <ClipPathGenerator />
          )}

          {activeTab === 'neumorphism' && (
            <NeumorphismGenerator />
          )}

          {activeTab === 'backdrop-filter' && (
            <BackdropFilterGenerator />
          )}

          {activeTab === 'border-radius' && (
            <BorderRadiusGenerator />
          )}

          {activeTab === 'tooltip' && (
            <TooltipGenerator />
          )}

          {activeTab === 'cursor' && (
            <CustomCursorGenerator />
          )}

          {activeTab === 'background-pattern' && (
            <BackgroundPatternGenerator />
          )}

          {activeTab === 'transform-playground' && (
            <TransformPlayground />
          )}

          {activeTab === 'compatibility' && (
            <CompatibilityTable />
          )}

          {activeTab === 'cheatsheet' && (
            <CheatSheet />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard 
              config={adminConfig}
              onUpdateConfig={setAdminConfig}
              favoritesCount={favorites.length}
            />
          )}

          {activeTab === 'about' && (
            <AboutView 
              brandName={adminConfig.brandName}
              footerCopyrightName={adminConfig.footerCopyrightName}
            />
          )}

          {activeTab === 'privacy' && (
            <PrivacyView 
              brandName={adminConfig.brandName}
              footerCopyrightName={adminConfig.footerCopyrightName}
            />
          )}

          {activeTab === 'terms' && (
            <TermsView 
              brandName={adminConfig.brandName}
              footerCopyrightName={adminConfig.footerCopyrightName}
            />
          )}
        </section>

        <RelatedEffects activeTab={activeTab} setActiveTab={handleSetActiveTab} />
        <FAQ activeTab={activeTab} />
        <CompanionTools />

      </main>

      {/* 4. Beautiful Footer Wrapper */}
      <Footer 
        setActiveTab={handleSetActiveTab} 
        brandName={adminConfig.brandName}
        brandLogoSymbol={adminConfig.brandLogoSymbol}
        brandLogoUrl={adminConfig.brandLogoUrl}
        footerCopyrightName={adminConfig.footerCopyrightName}
        footerDescription={adminConfig.footerDescription}
        footerAboutTitle={adminConfig.footerAboutTitle}
        footerAboutDescription={adminConfig.footerAboutDescription}
      />

      {/* Floating Back to Top Control */}
      <BackToTop />

    </div>
  );
}
