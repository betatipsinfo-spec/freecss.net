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
import CubicBezierGenerator from './components/CubicBezierGenerator';
import CssLoaders from './components/CssLoaders';
import FilterEffects from './components/FilterEffects';
import RelatedEffects from './components/RelatedEffects';
import BackToTop from './components/BackToTop';
import { ActiveTab, AppAdminConfig } from './types';
import { Type, Sparkles, Wand2, ArrowRight, Grid, Columns, Laptop, BookOpen, Heart, Shield, Aperture, Loader, Activity, Move, Box, Droplet, Scissors, Compass, Layers, Maximize, HelpCircle, MousePointer } from 'lucide-react';

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

  const getHeaderDetails = () => {
    switch (activeTab) {
      case 'styler':
        return {
          icon: <Sparkles className="h-3.5 w-3.5" />,
          tag: 'Professional Font Styler Sandbox',
          title: adminConfig.playgroundHeaderTitle,
          subtitle: adminConfig.playgroundHeaderSubtitle,
          theme: {
            fromBg: 'from-indigo-950',
            viaBg: 'via-slate-900',
            toBg: 'to-fuchsia-950',
            bgBadge: 'bg-pink-500/20',
            textBadge: 'text-pink-300',
            borderBadge: 'border-pink-500/30',
            textHighlight: 'text-pink-400',
            glowColor1: 'bg-pink-500/10',
            glowColor2: 'bg-violet-500/10',
          }
        };
      case 'directory':
        return {
          icon: <Grid className="h-3.5 w-3.5" />,
          tag: 'Global Typography Directory Index',
          title: 'Web Safe & Google Fonts Catalog',
          subtitle: 'Search, test, and filter across hundreds of standard web safe font configurations and Google Font definitions.',
          theme: {
            fromBg: 'from-sky-950',
            viaBg: 'via-slate-900',
            toBg: 'to-emerald-900/50',
            bgBadge: 'bg-emerald-500/20',
            textBadge: 'text-emerald-300',
            borderBadge: 'border-emerald-500/30',
            textHighlight: 'text-emerald-400',
            glowColor1: 'bg-sky-500/10',
            glowColor2: 'bg-emerald-500/10',
          }
        };
      case 'compare':
        return {
          icon: <Columns className="h-3.5 w-3.5" />,
          tag: 'Comparative Rendering Sandbox',
          title: 'Side-by-Side Typography Contrast',
          subtitle: 'Compare letter spacing, weights, kerning, line-height constraints, and reading flow in real-time side-by-side viewports.',
          theme: {
            fromBg: 'from-orange-950',
            viaBg: 'via-slate-900',
            toBg: 'to-red-950',
            bgBadge: 'bg-orange-500/20',
            textBadge: 'text-orange-300',
            borderBadge: 'border-orange-500/30',
            textHighlight: 'text-orange-400',
            glowColor1: 'bg-orange-500/10',
            glowColor2: 'bg-rose-500/10',
          }
        };
      case 'compatibility':
        return {
          icon: <Laptop className="h-3.5 w-3.5" />,
          tag: 'Platform Support Safety Matrix',
          title: 'Universal Browser Safety Index',
          subtitle: 'Detailed coverage calculations across Apple iOS, Google Android, Windows, macOS, and Linux system-safe presets.',
          theme: {
            fromBg: 'from-purple-950',
            viaBg: 'via-slate-900',
            toBg: 'to-yellow-950',
            bgBadge: 'bg-yellow-500/20',
            textBadge: 'text-yellow-300',
            borderBadge: 'border-yellow-500/30',
            textHighlight: 'text-yellow-400',
            glowColor1: 'bg-yellow-500/10',
            glowColor2: 'bg-purple-500/10',
          }
        };
      case 'cheatsheet':
        return {
          icon: <BookOpen className="h-3.5 w-3.5" />,
          tag: 'CSS Typography Code Snippets',
          title: 'CSS Font-Family Cheat Sheet',
          subtitle: 'Grab production-ready modular boilerplate configurations, safe cascading fallbacks, and standard template styles.',
          theme: {
            fromBg: 'from-slate-900',
            viaBg: 'via-zinc-900',
            toBg: 'to-neutral-900',
            bgBadge: 'bg-slate-500/20',
            textBadge: 'text-slate-300',
            borderBadge: 'border-slate-500/30',
            textHighlight: 'text-white',
            glowColor1: 'bg-slate-500/10',
            glowColor2: 'bg-neutral-500/10',
          }
        };
      case 'favorites':
        return {
          icon: <Heart className="h-3.5 w-3.5 text-rose-500" />,
          tag: 'Saved Typography Workspace',
          title: 'My Saved Fonts Portfolio',
          subtitle: 'Your hand-picked selection of high-fidelity fonts. Review, adjust custom parameters, and generate consolidated stylesheets.',
          theme: {
            fromBg: 'from-rose-950',
            viaBg: 'via-slate-900',
            toBg: 'to-amber-950',
            bgBadge: 'bg-rose-500/20',
            textBadge: 'text-rose-300',
            borderBadge: 'border-rose-500/30',
            textHighlight: 'text-rose-400',
            glowColor1: 'bg-rose-500/10',
            glowColor2: 'bg-red-500/10',
          }
        };
      case 'admin':
        return {
          icon: <Shield className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />,
          tag: 'Administrative Control Center',
          title: 'System Preferences & CMS Customizer',
          subtitle: 'Fine-tune branding identities, custom site slogans, logo paths, meta headers, and SEO declarations in real-time.',
          theme: {
            fromBg: 'from-blue-950',
            viaBg: 'via-slate-900',
            toBg: 'to-indigo-950',
            bgBadge: 'bg-blue-500/20',
            textBadge: 'text-blue-300',
            borderBadge: 'border-blue-500/30',
            textHighlight: 'text-blue-400',
            glowColor1: 'bg-blue-500/10',
            glowColor2: 'bg-indigo-500/10',
          }
        };
      case 'filter-effects':
        return {
          icon: <Aperture className="h-3.5 w-3.5 text-amber-500 animate-spin-slow" />,
          tag: 'GPU Accelerated Filter Effects',
          title: 'CSS Filter Effects Workbench',
          subtitle: 'Design, coordinate, and export optimized CSS image styles by layering contrast, brightness, sepia, hue-rotation, saturation, and blur.',
          theme: {
            fromBg: 'from-amber-950',
            viaBg: 'via-slate-900',
            toBg: 'to-orange-950',
            bgBadge: 'bg-amber-500/20',
            textBadge: 'text-amber-300',
            borderBadge: 'border-amber-500/30',
            textHighlight: 'text-amber-400',
            glowColor1: 'bg-amber-500/10',
            glowColor2: 'bg-orange-500/10',
          }
        };
      case 'css-loaders':
        return {
          icon: <Loader className="h-3.5 w-3.5 text-violet-500 animate-spin" />,
          tag: 'Procedural Keyframe Indicators',
          title: 'Pure CSS Loaders & Spinner Studio',
          subtitle: 'Build fluid, lightweight high-performance loading rings, spinner loops, bouncing indicators, and glowing loaders.',
          theme: {
            fromBg: 'from-violet-950',
            viaBg: 'via-slate-900',
            toBg: 'to-fuchsia-950',
            bgBadge: 'bg-fuchsia-500/20',
            textBadge: 'text-fuchsia-300',
            borderBadge: 'border-fuchsia-500/30',
            textHighlight: 'text-fuchsia-400',
            glowColor1: 'bg-fuchsia-500/10',
            glowColor2: 'bg-violet-500/10',
          }
        };
      case 'cubic-bezier':
        return {
          icon: <Activity className="h-3.5 w-3.5 text-emerald-500" />,
          tag: 'Temporal Velocity Interpolator',
          title: 'Cubic Bezier Easing Designer',
          subtitle: 'Construct beautiful transitions with springy custom easing parameters. Test and race kinetic objects on synchronized speed tracks.',
          theme: {
            fromBg: 'from-emerald-950',
            viaBg: 'via-slate-900',
            toBg: 'to-green-950',
            bgBadge: 'bg-emerald-500/20',
            textBadge: 'text-emerald-300',
            borderBadge: 'border-emerald-500/30',
            textHighlight: 'text-emerald-400',
            glowColor1: 'bg-emerald-500/10',
            glowColor2: 'bg-teal-500/10',
          }
        };

      case 'tooltip':
        return {
          icon: <HelpCircle className="h-3.5 w-3.5 text-amber-500" />,
          tag: 'Responsive Contextual Bubbles',
          title: 'CSS Tooltip & Arrow Customizer',
          subtitle: 'Build beautifully animated tooltip overlays with customized alignment positions, arrow anchors, and seamless entry loops.',
          theme: {
            fromBg: 'from-amber-950',
            viaBg: 'via-slate-900',
            toBg: 'to-violet-950',
            bgBadge: 'bg-amber-500/20',
            textBadge: 'text-amber-300',
            borderBadge: 'border-amber-500/30',
            textHighlight: 'text-yellow-400',
            glowColor1: 'bg-amber-500/10',
            glowColor2: 'bg-purple-500/10',
          }
        };
      case 'border-radius':
        return {
          icon: <Maximize className="h-3.5 w-3.5 text-teal-500" />,
          tag: '8-Point Asymmetrical Geometry',
          title: 'Organic Border-Radius Shape Maker',
          subtitle: 'Slide 8 coordinates independently to sculpt gorgeous, morphing liquid cards, abstract avatars, and fluid button anchors.',
          theme: {
            fromBg: 'from-teal-950',
            viaBg: 'via-slate-900',
            toBg: 'to-emerald-950',
            bgBadge: 'bg-teal-500/20',
            textBadge: 'text-teal-300',
            borderBadge: 'border-teal-500/30',
            textHighlight: 'text-teal-400',
            glowColor1: 'bg-teal-500/10',
            glowColor2: 'bg-emerald-500/10',
          }
        };
      case 'backdrop-filter':
        return {
          icon: <Layers className="h-3.5 w-3.5 text-indigo-500" />,
          tag: 'Compositor Backdrop Processing',
          title: 'Backdrop Filter & Glassmorphism Lab',
          subtitle: 'Calibrate frosted overlays that dynamically colorize and blur whatever renders directly behind them in real-time.',
          theme: {
            fromBg: 'from-purple-950',
            viaBg: 'via-slate-900',
            toBg: 'to-pink-950',
            bgBadge: 'bg-purple-500/20',
            textBadge: 'text-purple-300',
            borderBadge: 'border-purple-500/30',
            textHighlight: 'text-fuchsia-400',
            glowColor1: 'bg-purple-500/10',
            glowColor2: 'bg-pink-500/10',
          }
        };
      case 'neumorphism':
        return {
          icon: <Compass className="h-3.5 w-3.5 text-orange-500" />,
          tag: 'Skeuomorphic Soft UI Coordinates',
          title: 'Neumorphic Shadow & Accent Studio',
          subtitle: 'Create tactile extrusion layers and soft-shadow recesses by mapping dynamic light sources and custom luminance angles.',
          theme: {
            fromBg: 'from-slate-900',
            viaBg: 'via-zinc-900',
            toBg: 'to-orange-950',
            bgBadge: 'bg-orange-500/20',
            textBadge: 'text-orange-300',
            borderBadge: 'border-orange-500/30',
            textHighlight: 'text-orange-400',
            glowColor1: 'bg-amber-500/10',
            glowColor2: 'bg-yellow-500/10',
          }
        };
      case 'clippath':
        return {
          icon: <Scissors className="h-3.5 w-3.5 text-pink-500" />,
          tag: 'Vector Mask Path Intersection',
          title: 'CSS Clip-Path Polygon Designer',
          subtitle: 'Design custom geometric crop masks by dragging viewport nodes to create stars, badges, arrows, or custom vectors.',
          theme: {
            fromBg: 'from-pink-950',
            viaBg: 'via-slate-900',
            toBg: 'to-purple-900',
            bgBadge: 'bg-pink-500/20',
            textBadge: 'text-pink-300',
            borderBadge: 'border-pink-500/30',
            textHighlight: 'text-pink-400',
            glowColor1: 'bg-pink-500/10',
            glowColor2: 'bg-indigo-500/10',
          }
        };
      case 'glass':
        return {
          icon: <Droplet className="h-3.5 w-3.5 text-sky-500" />,
          tag: 'Frosted Glass Layering Workspace',
          title: 'Liquid Glassmorphism Designer',
          subtitle: 'Layer specular highlight reflections, translucency, base blurs, and glass layers behind responsive vectors.',
          theme: {
            fromBg: 'from-blue-950',
            viaBg: 'via-slate-900',
            toBg: 'to-teal-950',
            bgBadge: 'bg-blue-500/20',
            textBadge: 'text-blue-300',
            borderBadge: 'border-blue-500/30',
            textHighlight: 'text-sky-400',
            glowColor1: 'bg-blue-500/10',
            glowColor2: 'bg-teal-500/10',
          }
        };
      case 'shadow':
        return {
          icon: <Box className="h-3.5 w-3.5 text-indigo-500" />,
          tag: 'Concentric Layered Ambient Lighting',
          title: 'Advanced CSS Box Shadow Architect',
          subtitle: 'Layer up to 5 individual shadow layers to build realistic physical depth, soft penumbral spreads, and dark glows.',
          theme: {
            fromBg: 'from-indigo-950',
            viaBg: 'via-slate-900',
            toBg: 'to-violet-950',
            bgBadge: 'bg-indigo-500/20',
            textBadge: 'text-indigo-300',
            borderBadge: 'border-indigo-500/30',
            textHighlight: 'text-violet-400',
            glowColor1: 'bg-indigo-500/10',
            glowColor2: 'bg-purple-500/10',
          }
        };
      case 'effects':
        return {
          icon: <Sparkles className="h-3.5 w-3.5 text-fuchsia-500" />,
          tag: 'Tactile Browser Interactions',
          title: 'CSS Hover Effects & Animation Engine',
          subtitle: 'Coordinate smooth hover state transitions, custom background fills, scaling offsets, and subtle border highlights.',
          theme: {
            fromBg: 'from-fuchsia-950',
            viaBg: 'via-slate-900',
            toBg: 'to-amber-950',
            bgBadge: 'bg-fuchsia-500/20',
            textBadge: 'text-fuchsia-300',
            borderBadge: 'border-fuchsia-500/30',
            textHighlight: 'text-fuchsia-400',
            glowColor1: 'bg-fuchsia-500/10',
            glowColor2: 'bg-orange-500/10',
          }
        };
      case 'about':
        return {
          icon: <BookOpen className="h-3.5 w-3.5 text-emerald-500" />,
          tag: 'Platform Evolution & Mission',
          title: 'About Our Creative Suite',
          subtitle: 'Learn more about the technology stack, core features, styling architecture, and engineering principles behind our playground.',
          theme: {
            fromBg: 'from-emerald-950',
            viaBg: 'via-slate-900',
            toBg: 'to-cyan-950',
            bgBadge: 'bg-emerald-500/20',
            textBadge: 'text-emerald-300',
            borderBadge: 'border-emerald-500/30',
            textHighlight: 'text-emerald-400',
            glowColor1: 'bg-emerald-500/10',
            glowColor2: 'bg-cyan-500/10',
          }
        };
      case 'privacy':
        return {
          icon: <Shield className="h-3.5 w-3.5 text-blue-500" />,
          tag: 'User Trust & Safety Standards',
          title: 'Platform Privacy Protection Policy',
          subtitle: 'Learn how we secure your custom configurations, browser memory persistence, safety preferences, and workspace designs.',
          theme: {
            fromBg: 'from-blue-950',
            viaBg: 'via-slate-900',
            toBg: 'to-indigo-950',
            bgBadge: 'bg-blue-500/20',
            textBadge: 'text-blue-300',
            borderBadge: 'border-blue-500/30',
            textHighlight: 'text-blue-400',
            glowColor1: 'bg-blue-500/10',
            glowColor2: 'bg-indigo-500/10',
          }
        };
      case 'terms':
        return {
          icon: <BookOpen className="h-3.5 w-3.5 text-amber-500" />,
          tag: 'Workspace Rules & Guidelines',
          title: 'Interactive Terms of Service',
          subtitle: 'Guidelines, rights, usage boundaries, and sandbox specifications for our public utility modules.',
          theme: {
            fromBg: 'from-amber-955',
            viaBg: 'via-slate-900',
            toBg: 'to-rose-955',
            bgBadge: 'bg-amber-500/20',
            textBadge: 'text-amber-300',
            borderBadge: 'border-amber-500/30',
            textHighlight: 'text-amber-400',
            glowColor1: 'bg-amber-500/10',
            glowColor2: 'bg-rose-500/10',
          }
        };
      case 'background-pattern':
        return {
          icon: <Sparkles className="h-3.5 w-3.5 text-violet-500" />,
          tag: 'CSS Studio Engine',
          title: 'Background Patterns Generator',
          subtitle: 'Architect custom grids, blueprint meshes, waves, and diagonal stripe background textures. Combine linear gradients and inlined SVGs into performant css assets instantly.',
          theme: {
            fromBg: 'from-violet-950',
            viaBg: 'via-slate-900',
            toBg: 'to-indigo-950',
            bgBadge: 'bg-violet-500/20',
            textBadge: 'text-violet-300',
            borderBadge: 'border-violet-500/30',
            textHighlight: 'text-violet-400',
            glowColor1: 'bg-violet-500/10',
            glowColor2: 'bg-indigo-500/10',
          }
        };
      case 'cursor':
        return {
          icon: <MousePointer className="h-3.5 w-3.5 text-indigo-500" />,
          tag: 'CSS Customization Engine',
          title: 'Custom CSS Cursor Generator',
          subtitle: 'Create high-performance, dynamic custom cursors with fluid lag interpolation filters, reactive click animations, tail nodes, and clean CSS + React hooks.',
          theme: {
            fromBg: 'from-indigo-950',
            viaBg: 'via-slate-900',
            toBg: 'to-blue-950',
            bgBadge: 'bg-indigo-500/20',
            textBadge: 'text-indigo-300',
            borderBadge: 'border-indigo-500/30',
            textHighlight: 'text-indigo-400',
            glowColor1: 'bg-indigo-500/10',
            glowColor2: 'bg-purple-500/10',
          }
        };
      case 'transform-playground':
        return {
          icon: <Move className="h-3.5 w-3.5 text-pink-500" />,
          tag: 'Interactive 3D Engine',
          title: 'CSS Transform Playground',
          subtitle: 'Deconstruct spatial matrix operations in vanilla CSS. Manipulate dimensional yaw, roll, rotational tilt, translation points, and perspective vectors with automatic rendering fallback configurations.',
          theme: {
            fromBg: 'from-indigo-950',
            viaBg: 'via-slate-900',
            toBg: 'to-fuchsia-950',
            bgBadge: 'bg-pink-500/20',
            textBadge: 'text-pink-300',
            borderBadge: 'border-pink-500/30',
            textHighlight: 'text-pink-400',
            glowColor1: 'bg-pink-500/10',
            glowColor2: 'bg-violet-500/10',
          }
        };
      default:
        return null;
    }
  };

  const headerDetails = getHeaderDetails();

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
        
        {/* Dynamic Premium Hero Greeting Header - displays prominently on main views and sub-tool interfaces */}
        {headerDetails && (() => {
          const titleWords = headerDetails.title.split(' ');
          const lastWord = titleWords.pop() || '';
          const restOfTitle = titleWords.join(' ');
          const configTheme = headerDetails.theme || {
            fromBg: 'from-indigo-950',
            viaBg: 'via-slate-900',
            toBg: 'to-fuchsia-950',
            bgBadge: 'bg-pink-500/20',
            textBadge: 'text-pink-300',
            borderBadge: 'border-pink-500/30',
            textHighlight: 'text-pink-400',
            glowColor1: 'bg-pink-500/10',
            glowColor2: 'bg-violet-500/10',
          };
          return (
            <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-linear-to-r ${configTheme.fromBg} ${configTheme.viaBg} ${configTheme.toBg} border-2 border-slate-200 dark:border-slate-800 text-white shadow-xl relative overflow-hidden mb-10 animate-fade-in`}>
              <div className={`absolute top-0 right-0 h-40 w-40 ${configTheme.glowColor1} blur-3xl rounded-full`} />
              <div className={`absolute -bottom-10 left-1/3 h-48 w-48 ${configTheme.glowColor2} blur-3xl rounded-full`} />

              <div className="z-10 flex-1">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${configTheme.bgBadge} ${configTheme.textBadge} border ${configTheme.borderBadge} text-[10px] font-black uppercase tracking-widest font-display mb-4 hover:scale-[1.02] transition-transform`}>
                  {headerDetails.icon}
                  <span>{headerDetails.tag}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight font-display text-white mt-1 uppercase">
                  {restOfTitle} <span className={configTheme.textHighlight}>{lastWord}</span>
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-2.5 max-w-3xl leading-relaxed">
                  {headerDetails.subtitle}
                </p>
              </div>
            </div>
          );
        })()}

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

          {activeTab === 'cubic-bezier' && (
            <CubicBezierGenerator />
          )}

          {activeTab === 'css-loaders' && (
            <CssLoaders />
          )}

          {activeTab === 'filter-effects' && (
            <FilterEffects />
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
