import React, { useState, useEffect } from 'react';
import { 
  Settings, Globe, Shield, RefreshCw, Save, Check, CheckCircle2, AlertTriangle, HelpCircle, 
  Search, Eye, EyeOff, Copy, HardDrive, Smartphone, Monitor, ChevronRight, Share2, FileCode, CheckSquare, ListTodo, Activity,
  Lock, Mail
} from 'lucide-react';
import { AppAdminConfig } from '../types';

interface AdminDashboardProps {
  config: AppAdminConfig;
  onUpdateConfig: (newConfig: AppAdminConfig) => void;
  favoritesCount: number;
}

export default function AdminDashboard({
  config,
  onUpdateConfig,
  favoritesCount,
}: AdminDashboardProps) {
  // Session Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_is_logged_in') === 'true';
    }
    return false;
  });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() === 'michchansophaktra@gmail.com' && passwordInput === 'admin@123Tra') {
      setIsLoggedIn(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_is_logged_in', 'true');
      }
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials. Please check your email and password.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_is_logged_in');
    }
    setEmailInput('');
    setPasswordInput('');
  };

  // Temporary local state for editing
  const [localConfig, setLocalConfig] = useState<AppAdminConfig>({ ...config });
  const [activeSubTab, setActiveSubTab] = useState<'design' | 'seo' | 'analytics' | 'sitemap'>('design');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Sync state if prop changes
  useEffect(() => {
    setLocalConfig({ ...config });
  }, [config]);

  // Real-time smooth draft preview of colors as user drags/changes color pickers
  useEffect(() => {
    const styleId = 'dynamic-custom-brand-styles';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    const primaryColor = localConfig.primaryBrandColor;
    const secondaryColor = localConfig.secondaryBrandColor || '#4f46e5';
    
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
  }, [localConfig.primaryBrandColor, localConfig.secondaryBrandColor]);

  // Clean up and restore official config values on unmount (if not saved)
  useEffect(() => {
    return () => {
      const styleId = 'dynamic-custom-brand-styles';
      const styleEl = document.getElementById(styleId);
      if (styleEl) {
        const primaryColor = config.primaryBrandColor;
        const secondaryColor = config.secondaryBrandColor || '#4f46e5';
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
      }
    };
  }, [config]);

  const handleFieldChange = (field: keyof AppAdminConfig, value: any) => {
    setLocalConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onUpdateConfig(localConfig);
    setShowSaveNotification(true);
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all configurations to factory defaults?')) {
      const defaults: AppAdminConfig = {
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
      setLocalConfig(defaults);
      onUpdateConfig(defaults);
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 2000);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // SEO Score calculation logic
  const calculateSeoScore = () => {
    let score = 50; // baseline
    if (localConfig.seoTitle.length >= 30 && localConfig.seoTitle.length <= 60) score += 15;
    if (localConfig.seoDescription.length >= 120 && localConfig.seoDescription.length <= 160) score += 15;
    if (localConfig.seoKeywords.split(',').length >= 4) score += 10;
    if (localConfig.seoCanonicalUrl.startsWith('http')) score += 5;
    if (localConfig.seoOgImage.length > 10) score += 5;
    return Math.min(score, 100);
  };

  const seoScore = calculateSeoScore();

  // Color preset handlers
  const colorPresets = [
    { name: 'Indigo Default', value: '#6366f1' },
    { name: 'Emerald Forest', value: '#10b981' },
    { name: 'Rose Sunset', value: '#f43f5e' },
    { name: 'Violet Cyber', value: '#8b5cf6' },
    { name: 'Amber Glow', value: '#f59e0b' },
    { name: 'Slate Brutalist', value: '#0f172a' },
  ];

  // Dynamic Sitemap generator snippet based on input canonical
  const generateSitemapXml = () => {
    const rawUrl = localConfig.seoCanonicalUrl || 'https://example.com/';
    const dateToday = new Date().toISOString().split('T')[0];
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${rawUrl}</loc>
    <lastmod>${dateToday}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${rawUrl}?tab=directory</loc>
    <lastmod>${dateToday}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${rawUrl}?tab=compare</loc>
    <lastmod>${dateToday}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
  };

  // Dynamic Robots.txt generator snippet
  const generateRobotsTxt = () => {
    const rawUrl = localConfig.seoCanonicalUrl || 'https://example.com/';
    return `# 🌐 Dynamic Robots Settings for Web Typography Playground
User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${rawUrl}sitemap.xml`;
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12" id="admin-login-flow">
        <div className="bg-slate-50 dark:bg-slate-950/40 p-1 sm:p-2 rounded-3xl border border-slate-200/60 dark:border-slate-850 shadow-xl overflow-hidden transition-all duration-300">
          
          {/* Diagnostic Accent Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-950/80 rounded-2xl p-6 text-white text-center border-b border-indigo-900/30">
            <div className="absolute top-0 right-0 -mr-6 -mt-6 h-28 w-28 bg-indigo-500/10 rounded-full blur-xl"></div>
            <div className="absolute -left-12 -bottom-12 h-36 w-36 bg-emerald-500/5 rounded-full blur-2xl"></div>
            
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 animate-pulse">
              <Shield className="h-6 w-6" />
            </div>
            
            <h3 className="text-xl font-bold font-display uppercase tracking-tight">Admin Gatekeeper</h3>
            <p className="text-[11px] text-slate-300 max-w-sm mx-auto mt-1 leading-relaxed font-sans">
              Authenticate via the unified portal secure keysheet to customize system settings, brand, headers, and SEO.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            {authError && (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-rose-200/50 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-450 text-xs font-medium leading-normal">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>{authError}</div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5 font-display">
              <label htmlFor="admin-email" className="block text-[10px] font-black uppercase tracking-widest select-none text-slate-450 dark:text-slate-500">
                Administrator User Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="admin-email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs font-semibold pl-10 pr-4 py-3 bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder="e.g., admin@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 font-display">
              <div className="flex items-center justify-between">
                <label htmlFor="admin-password" className="block text-[10px] font-black uppercase tracking-widest select-none text-slate-450 dark:text-slate-500">
                  Secure Passkey
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full text-xs font-mono font-bold pl-10 pr-10 py-3 bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder="••••••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-250 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-all cursor-pointer mt-2"
            >
              <span>Unlock Admin Panel</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Helper Shortcut Box */}
            <div className="border-t border-slate-200/50 dark:border-slate-800/80 pt-4 mt-3">
              <div className="p-3 bg-indigo-50/50 dark:bg-slate-900/50 rounded-xl border border-indigo-100/50 dark:border-slate-850/80 text-center">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                  💡 Autocomplete Test Credentials
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
                  Sign in instantly with the authorized credentials provided:
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailInput('michchansophaktra@gmail.com');
                      setPasswordInput('admin@123Tra');
                    }}
                    className="text-[9px] font-mono font-bold bg-indigo-200/20 hover:bg-indigo-200/30 text-indigo-700 dark:text-indigo-400 px-2.5 py-1.5 rounded-lg border border-indigo-200/30 transition-all cursor-pointer"
                  >
                    Load Credentials (Instant Fill)
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Overview/Introduction Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Settings className="h-44 w-44 animate-spin-slow text-indigo-400" />
        </div>
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1 bg-indigo-505/10 border border-indigo-500/20 text-indigo-404 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full font-display">
            <Shield className="h-3.5 w-3.5 text-indigo-400" />
            <span>Root Admin Controller</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display">
            CMS Admin Control Terminal
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
            Customize system layout metrics, preset theme controls, edit metadata configurations, and monitor live simulation telemetry logs instantly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 relative z-10 font-display">
          <button
            onClick={handleSave}
            id="admin-save-btn"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer border border-indigo-500/10 shadow-sm transition-all"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Apply Changes</span>
          </button>
          
          <button
            onClick={handleResetToDefault}
            id="admin-reset-btn"
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-red-950 border border-slate-800 hover:border-red-900 text-slate-400 hover:text-red-300 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
            title="Reset system configuration properties to factory defaults"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            onClick={handleLogout}
            id="admin-logout-btn"
            className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
            title="Log out of the administrator control terminal"
          >
            <Lock className="h-3.5 w-3.5 text-slate-500" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Save Notification alert */}
      {showSaveNotification && (
        <div className="bg-emerald-500/10 border-2 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-xl p-4 flex items-center justify-between font-display animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 animate-bounce" />
            <span>SYSTEM UPDATE OK: All brand design and SEO properties applied to preview context storage instantly!</span>
          </div>
          <span className="text-[9px] uppercase font-mono font-black opacity-60">Status: Applied</span>
        </div>
      )}

      {/* Admin Panel Sub Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b-2 border-slate-105 dark:border-slate-900 pb-2.5 font-display">
        <button
          onClick={() => setActiveSubTab('design')}
          className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
            activeSubTab === 'design'
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
              : 'text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Brand & Playground Design</span>
        </button>

        <button
          onClick={() => setActiveSubTab('seo')}
          className={`relative flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
            activeSubTab === 'seo'
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
              : 'text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span>SEO & Meta Configuration</span>
          <span className={`h-2 w-2 rounded-full absolute top-1.5 right-1.5 ${seoScore > 80 ? 'bg-emerald-505' : 'bg-amber-400'}`}></span>
        </button>

        <button
          onClick={() => setActiveSubTab('sitemap')}
          className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
            activeSubTab === 'sitemap'
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
              : 'text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <FileCode className="h-4 w-4" />
          <span>XML Sitemap / Robots Generator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('analytics')}
          className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider px-4.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
            activeSubTab === 'analytics'
              ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
              : 'text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Activity className="h-4 w-4" />
          <span>Simulation Telemetry Log</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive form (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* SubTab 1: Design Settings */}
          {activeSubTab === 'design' && (
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-widest font-display">
                  System Theme & Font Presets
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-550 font-medium">
                  Modify the web typography playhouse preset constants that will instantly take effect around the customizer workspace.
                </p>
              </div>

              {/* Dynamic Playground Headers editing */}
              <div className="space-y-3 font-display">
                <div>
                  <label htmlFor="input-header-title" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    Custom Playground Header Title
                  </label>
                  <input
                    id="input-header-title"
                    type="text"
                    value={localConfig.playgroundHeaderTitle}
                    onChange={(e) => handleFieldChange('playgroundHeaderTitle', e.target.value)}
                    className="w-full text-xs font-bold leading-normal px-3.5 py-3 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., Web Typography Playground"
                  />
                </div>

                <div>
                  <label htmlFor="input-header-subtitle" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    CMS Playground Subtitle Intro Description
                  </label>
                  <textarea
                    id="input-header-subtitle"
                    rows={2}
                    value={localConfig.playgroundHeaderSubtitle}
                    onChange={(e) => handleFieldChange('playgroundHeaderSubtitle', e.target.value)}
                    className="w-full text-xs font-medium leading-relaxed px-3.5 py-3 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter short description..."
                  />
                </div>
              </div>

              {/* BRAND LOGO AND NAME SECTION */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4 font-display">
                <h4 className="text-[11px] font-black uppercase text-slate-900 dark:text-white tracking-widest leading-none mb-1">
                  Brand Identity & Custom Logo
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="input-brand-name" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      Brand Display Name
                    </label>
                    <input
                      id="input-brand-name"
                      type="text"
                      value={localConfig.brandName || ''}
                      onChange={(e) => handleFieldChange('brandName', e.target.value)}
                      className="w-full text-xs font-bold leading-normal px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., CSSFONTS"
                    />
                  </div>

                  <div>
                    <label htmlFor="input-brand-logo-symbol" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      Brand Logo Symbol or Emoji (If link is empty)
                    </label>
                    <input
                      id="input-brand-logo-symbol"
                      type="text"
                      value={localConfig.brandLogoSymbol || ''}
                      onChange={(e) => handleFieldChange('brandLogoSymbol', e.target.value)}
                      className="w-full text-xs font-bold leading-normal px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., ✨, 🔠, 🅰️"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="input-brand-logo-url" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    Logo Image URL (Physical source reference)
                  </label>
                  <input
                    id="input-brand-logo-url"
                    type="url"
                    value={localConfig.brandLogoUrl || ''}
                    onChange={(e) => handleFieldChange('brandLogoUrl', e.target.value)}
                    className="w-full text-xs font-mono px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://images.unsplash.com/photo-example... (leave blank to use symbol)"
                  />
                  <p className="text-[9px] text-slate-400 mt-1">
                    Provide a public CDN image link to display a standard logo graphic instead of text.
                  </p>
                </div>
              </div>

              {/* FOOTER CONFIGURATION SECTION */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4 font-display">
                <h4 className="text-[11px] font-black uppercase text-slate-900 dark:text-white tracking-widest leading-none mb-1">
                  Footer Layout & Content Customization
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="input-footer-copyright-name" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      Footer Host / Copyright Text
                    </label>
                    <input
                      id="input-footer-copyright-name"
                      type="text"
                      value={localConfig.footerCopyrightName || ''}
                      onChange={(e) => handleFieldChange('footerCopyrightName', e.target.value)}
                      className="w-full text-xs font-bold leading-normal px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., cssfonts.net"
                    />
                  </div>

                  <div>
                    <label htmlFor="input-footer-about-title" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      About Column Header Title
                    </label>
                    <input
                      id="input-footer-about-title"
                      type="text"
                      value={localConfig.footerAboutTitle || ''}
                      onChange={(e) => handleFieldChange('footerAboutTitle', e.target.value)}
                      className="w-full text-xs font-bold leading-normal px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., About CSSFonts"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="input-footer-description" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    Footer Main Brand Description Text
                  </label>
                  <textarea
                    id="input-footer-description"
                    rows={2}
                    value={localConfig.footerDescription || ''}
                    onChange={(e) => handleFieldChange('footerDescription', e.target.value)}
                    className="w-full text-xs font-medium leading-relaxed px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter main footer brand text..."
                  />
                </div>

                <div>
                  <label htmlFor="input-footer-about-description" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    Footer About Column Description Paragraph
                  </label>
                  <textarea
                    id="input-footer-about-description"
                    rows={2}
                    value={localConfig.footerAboutDescription || ''}
                    onChange={(e) => handleFieldChange('footerAboutDescription', e.target.value)}
                    className="w-full text-xs font-medium leading-relaxed px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter footer About column description text..."
                  />
                </div>
              </div>

              {/* Color Customization Section */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4 font-display">
                <h4 className="text-[11px] font-black uppercase text-slate-900 dark:text-white tracking-widest leading-none mb-1">
                  Color Customization
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Primary Color Picker */}
                  <div>
                    <label htmlFor="input-brand-color" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      Primary App Brand Color (Accent 1)
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="input-brand-color"
                        type="color"
                        value={localConfig.primaryBrandColor}
                        onChange={(e) => handleFieldChange('primaryBrandColor', e.target.value)}
                        className="h-10 w-16 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
                      />
                      <input
                        id="input-brand-color-hex"
                        type="text"
                        value={localConfig.primaryBrandColor}
                        onChange={(e) => handleFieldChange('primaryBrandColor', e.target.value)}
                        className="flex-1 text-xs font-mono font-bold uppercase px-3 py-2 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl"
                        maxLength={7}
                      />
                    </div>
                  </div>

                  {/* Secondary Color Picker */}
                  <div>
                    <label htmlFor="input-secondary-brand-color" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      Secondary App Brand Color (Accent 2)
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="input-secondary-brand-color"
                        type="color"
                        value={localConfig.secondaryBrandColor || '#4f46e5'}
                        onChange={(e) => handleFieldChange('secondaryBrandColor', e.target.value)}
                        className="h-10 w-16 p-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
                      />
                      <input
                        id="input-secondary-brand-color-hex"
                        type="text"
                        value={localConfig.secondaryBrandColor || '#4f46e5'}
                        onChange={(e) => handleFieldChange('secondaryBrandColor', e.target.value)}
                        className="flex-1 text-xs font-mono font-bold uppercase px-3 py-2 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl"
                        maxLength={7}
                      />
                    </div>
                  </div>
                </div>

                {/* Color presets list */}
                <div className="space-y-1.5">
                  <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    Quick Preset Color Swatches:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {colorPresets.map((preset) => {
                      const isActive = localConfig.primaryBrandColor.toLowerCase() === preset.value.toLowerCase();
                      return (
                        <button
                          key={preset.value}
                          onClick={() => {
                            handleFieldChange('primaryBrandColor', preset.value);
                            if (preset.value === '#6366f1') handleFieldChange('secondaryBrandColor', '#4f46e5');
                            else if (preset.value === '#10b981') handleFieldChange('secondaryBrandColor', '#059669');
                            else if (preset.value === '#f43f5e') handleFieldChange('secondaryBrandColor', '#e11d48');
                            else if (preset.value === '#8b5cf6') handleFieldChange('secondaryBrandColor', '#7c3aed');
                            else if (preset.value === '#f59e0b') handleFieldChange('secondaryBrandColor', '#d97706');
                            else if (preset.value === '#0f172a') handleFieldChange('secondaryBrandColor', '#1e293b');
                          }}
                          className={`flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-wide px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all ${
                            isActive
                              ? 'bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 font-black'
                              : 'bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-800 text-slate-650 dark:text-slate-400'
                          }`}
                        >
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: preset.value }} />
                          <span>{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Slider for playground default font size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-display">
                <div>
                  <label htmlFor="input-default-fontsize" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1">
                    Playground Default Font Size ({localConfig.defaultFontSize}px)
                  </label>
                  <input
                    id="input-default-fontsize"
                    type="range"
                    min="16"
                    max="96"
                    value={localConfig.defaultFontSize}
                    onChange={(e) => handleFieldChange('defaultFontSize', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-850 rounded-lg appearance-none accent-indigo-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                    <span>16px</span>
                    <span>96px</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="input-default-theme" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    Theme Mode Preference
                  </label>
                  <select
                    id="input-default-theme"
                    value={localConfig.defaultPreviewTheme}
                    onChange={(e) => handleFieldChange('defaultPreviewTheme', e.target.value)}
                    className="w-full text-xs font-bold uppercase tracking-wider px-3 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl"
                  >
                    <option value="dark">🌙 Midnight dark default</option>
                    <option value="light">☀️ Clean paper light default</option>
                  </select>
                </div>
              </div>

              {/* Feature toggles */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 font-display">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={localConfig.enableGoogleFonts}
                    onChange={(e) => handleFieldChange('enableGoogleFonts', e.target.checked)}
                    className="mt-1 h-4 w-4 text-indigo-650 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded focus:ring-indigo-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Enable External Google Webfonts APIs
                    </span>
                    <span className="text-[9px] text-slate-450 dark:text-slate-500 leading-tight">
                      When ticked, dynamically resolved google stylesheets injection endpoints are added for loaded models.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={localConfig.enableAnalyticsSimulation}
                    onChange={(e) => handleFieldChange('enableAnalyticsSimulation', e.target.checked)}
                    className="mt-1 h-4 w-4 text-indigo-650 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded focus:ring-indigo-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                      Enable Telemetry Analytics Dashboard Simulation
                    </span>
                    <span className="text-[9px] text-slate-450 dark:text-slate-500 leading-tight">
                      Enables real-time client-side request and conversion simulation log charts in the analytics panel.
                    </span>
                  </div>
                </label>
              </div>

            </div>
          )}

          {/* SubTab 2: SEO Settings */}
          {activeSubTab === 'seo' && (
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-205 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-widest font-display">
                    Metadata & Search Indexing
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-black ${
                    seoScore > 85 ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  }`}>
                    SEO audit score: {seoScore}/100
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-550 font-medium">
                  Optimize website representation dynamically. Changes are immediately injected to the document head elements.
                </p>
              </div>

              {/* Form entries for SEO content */}
              <div className="space-y-4 font-display">
                
                {/* Meta Title */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="input-seo-title" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase">
                      Webpage Header Title tag (Recommended: 30-60 characters)
                    </label>
                    <span className={`text-[9px] font-mono font-bold ${
                      localConfig.seoTitle.length >= 30 && localConfig.seoTitle.length <= 60 ? 'text-emerald-500' : 'text-slate-400'
                    }`}>
                      {localConfig.seoTitle.length} chars
                    </span>
                  </div>
                  <input
                    id="input-seo-title"
                    type="text"
                    value={localConfig.seoTitle}
                    onChange={(e) => handleFieldChange('seoTitle', e.target.value)}
                    className="w-full text-xs font-bold leading-normal px-3.5 py-3 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter SEO title..."
                  />
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="input-seo-description" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase">
                      Meta Description tag (Recommended: 120-160 characters)
                    </label>
                    <span className={`text-[9px] font-mono font-bold ${
                      localConfig.seoDescription.length >= 120 && localConfig.seoDescription.length <= 160 ? 'text-emerald-500' : 'text-slate-400'
                    }`}>
                      {localConfig.seoDescription.length} chars
                    </span>
                  </div>
                  <textarea
                    id="input-seo-description"
                    rows={3}
                    value={localConfig.seoDescription}
                    onChange={(e) => handleFieldChange('seoDescription', e.target.value)}
                    className="w-full text-xs font-semibold leading-relaxed px-3.5 py-3 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="Describe what the application provides..."
                  />
                </div>

                {/* Meta Keywords */}
                <div>
                  <label htmlFor="input-seo-keywords" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    SEO Focus Keywords (Comma separated list)
                  </label>
                  <input
                    id="input-seo-keywords"
                    type="text"
                    value={localConfig.seoKeywords}
                    onChange={(e) => handleFieldChange('seoKeywords', e.target.value)}
                    className="w-full text-xs font-medium px-3.5 py-3 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., fonts, typography, font-styler"
                  />
                </div>

                {/* Canonical URL & OG image */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="input-seo-robots" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      Robots Directive rule
                    </label>
                    <select
                      id="input-seo-robots"
                      value={localConfig.seoRobots}
                      onChange={(e) => handleFieldChange('seoRobots', e.target.value as any)}
                      className="w-full text-xs font-bold uppercase tracking-wider px-3 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="index, follow">🔍 index, follow (Indexing Enabled)</option>
                      <option value="noindex, nofollow">🔒 noindex, nofollow (Private/No search listing)</option>
                      <option value="index, nofollow">🔎 index, nofollow (Disable deep link crawlers)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="input-seo-canonical" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                      Canonical Site Link URL
                    </label>
                    <input
                      id="input-seo-canonical"
                      type="url"
                      value={localConfig.seoCanonicalUrl}
                      onChange={(e) => handleFieldChange('seoCanonicalUrl', e.target.value)}
                      className="w-full text-xs font-semibold px-3.5 py-2.5 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Social Share Image URL */}
                <div>
                  <label htmlFor="input-seo-ogimage" className="block text-[10px] font-black tracking-widest text-slate-450 dark:text-slate-500 uppercase mb-1.5">
                    OpenGraph Social Image URL
                  </label>
                  <input
                    id="input-seo-ogimage"
                    type="url"
                    value={localConfig.seoOgImage}
                    onChange={(e) => handleFieldChange('seoOgImage', e.target.value)}
                    className="w-full text-xs font-mono px-3.5 py-3 border-2 border-slate-150 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

              </div>

            </div>
          )}

          {/* SubTab 3: Sitemap Generation */}
          {activeSubTab === 'sitemap' && (
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-widest font-display">
                  Dynamic Sitemap & Crawler Control
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-550 font-medium">
                  Export valid search engines schemas to automate index crawler discovery routes correctly.
                </p>
              </div>

              {/* Sitemap.xml display block */}
              <div className="space-y-3 font-display">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500">
                    Sitemap.xml Schema File Content
                  </span>
                  <button
                    onClick={() => copyToClipboard(generateSitemapXml(), 'sitemap-xml')}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase cursor-pointer"
                  >
                    {copiedText === 'sitemap-xml' ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        <span className="text-emerald-500 font-extrabold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy XML</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-slate-950 p-4 rounded-xl text-emerald-400 dark:text-emerald-350 border border-slate-800 overflow-x-auto leading-relaxed max-h-[220px]">
                  {generateSitemapXml()}
                </pre>
              </div>

              {/* Robots.txt display block */}
              <div className="space-y-3 font-display">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500">
                    Robots.txt Routing Rules File Code
                  </span>
                  <button
                    onClick={() => copyToClipboard(generateRobotsTxt(), 'robots-txt')}
                    className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-bold uppercase cursor-pointer"
                  >
                    {copiedText === 'robots-txt' ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        <span className="text-emerald-500 font-extrabold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Robots.txt</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] font-mono bg-slate-950 p-4 rounded-xl text-amber-300 dark:text-amber-200 border border-slate-800 overflow-x-auto leading-relaxed max-h-[160px]">
                  {generateRobotsTxt()}
                </pre>
              </div>

            </div>
          )}

          {/* SubTab 4: Telemetry Log Simulation */}
          {activeSubTab === 'analytics' && (
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-widest font-display">
                  Live Admin Request Metrics Simulation
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-550 font-medium">
                  Real-time activity logging generated client-side representing crawler hits, CSS exports, and user interaction signals.
                </p>
              </div>

              {localConfig.enableAnalyticsSimulation ? (
                <div className="space-y-6 font-display">
                  
                  {/* Grid summary cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-150 dark:border-slate-850">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Crawler Hits
                      </span>
                      <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white font-mono">
                        1,424 <small className="text-emerald-500 text-[9px] font-bold font-sans">+12.4%</small>
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-150 dark:border-slate-850">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Sitemap Scrapes
                      </span>
                      <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white font-mono">
                        392
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-150 dark:border-slate-850">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Fav Stacks Saved
                      </span>
                      <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white font-mono">
                        {favoritesCount}
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-150 dark:border-slate-850">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        SEO Score
                      </span>
                      <span className="text-lg font-black tracking-tight text-indigo-600 dark:text-indigo-400 font-mono">
                        {seoScore}%
                      </span>
                    </div>
                  </div>

                  {/* Simulated timeline events log */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500">
                      Live Crawler Request Console Log
                    </span>
                    <div className="bg-slate-950 text-slate-300 font-mono text-[10px] p-4 rounded-xl border border-slate-850 space-y-2 h-[200px] overflow-y-auto leading-relaxed">
                      <div className="text-emerald-400 font-bold">INFO  [07:19:46] Googlebot Initialized Fetch with UA "APIs-Google"</div>
                      <div>GET   [07:19:47] / - 200 OK (Served in 12ms, cache MISS)</div>
                      <div className="text-slate-400">INFO  [07:22:15] Parser identified Title matching text: "{localConfig.seoTitle}"</div>
                      <div className="text-indigo-400 font-semibold text-[9px]">SEO   [07:22:15] Indexing verification OK. Meta tag counts match structural standards.</div>
                      <div className="text-emerald-400 font-bold">INFO  [07:35:01] Bingbot/2.0 request parsing sitemap location</div>
                      <div>GET   [07:35:02] /sitemap.xml - 200 XML schema payload mapped ({favoritesCount} endpoints updated)</div>
                      <div className="text-amber-500">WARN  [07:44:11] Web-Vitals report: LCP 1.1s (Excellent range)</div>
                      <div className="text-slate-400">GET   [07:55:09] /api/health - 200 OK standalone node monitoring status verified</div>
                      <div>GET   [08:01:23] Robots rules read successfully redirect logic applied: {localConfig.seoRobots}</div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-xs text-slate-450 font-medium">
                    Telemetry simulation dashboard is currently disabled. Toggle setting in Brand tab to active logs.
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right Preview columns (Cols 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* SEO Visualizer: Google Mockup card */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-display">
              Live Google SERP Desktop Preview
            </span>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl p-4 space-y-1.5 font-sans leading-normal select-none">
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <span className="bg-slate-200 dark:bg-slate-800 rounded px-1 text-[8px] font-bold">Ad</span>
                <span className="text-xs text-slate-500 truncate max-w-[240px]">{localConfig.seoCanonicalUrl || 'https://google.com'}</span>
              </div>
              
              <h4 className="text-base font-medium text-slate-900 hover:underline cursor-pointer dark:text-indigo-400 border-none p-0 m-0 leading-tight">
                {localConfig.seoTitle || 'Web Typography Playground'}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {localConfig.seoDescription || 'Interactive tool matching best standard typography metrics.'}
              </p>

              {/* Keyword Highlights */}
              <div className="flex flex-wrap gap-1 pt-1">
                {localConfig.seoKeywords.split(',').slice(0, 3).map((kw, i) => (
                  <span key={i} className="text-[8px] bg-slate-200 dark:bg-slate-800 font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 rounded px-1.5 py-0.5">
                    {kw.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media Link Card Preview */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-display">
              Social Media OpenGraph Meta Card Preview
            </span>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden shadow-xs select-none">
              {/* Fake Og Image banner */}
              <div className="h-36 bg-slate-250 dark:bg-slate-900 relative flex items-center justify-center">
                {localConfig.seoOgImage ? (
                  <img
                    src={localConfig.seoOgImage}
                    referrerPolicy="no-referrer"
                    alt="SEO Preview visual og"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-[10px] font-mono text-slate-400">No Image Configured</div>
                )}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-white text-[8px] font-mono font-bold tracking-wider uppercase">
                  OG:IMAGE Preview
                </div>
              </div>

              {/* Meta brief content */}
              <div className="p-4.5 space-y-1.5 font-sans">
                <span className="block text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                  {new URL(localConfig.seoCanonicalUrl || 'https://google.com').hostname.toUpperCase()}
                </span>
                
                <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-white line-clamp-1">
                  {localConfig.seoTitle || 'Web Playground'}
                </h5>

                <p className="text-[11px] text-slate-500 dark:text-slate-450 line-clamp-2 leading-relaxed">
                  {localConfig.seoDescription || 'Interactive typography design inspect helper.'}
                </p>
              </div>
            </div>
          </div>

          {/* Web Design Checklist */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4 font-display">
            <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Crawler Audit Checklist
            </span>

            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2.5">
                <CheckSquare className="h-4 w-4 shrink-0 text-emerald-500 fill-emerald-500/10" />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-slate-800 dark:text-slate-250">Structured Title Loaded</span>
                  <p className="text-[10px] text-slate-450">Tag properly registered in client page layout container.</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <CheckSquare className="h-4 w-4 shrink-0 text-emerald-500 fill-emerald-500/10" />
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-slate-800 dark:text-slate-250">OpenGraph tags enabled</span>
                  <p className="text-[10px] text-slate-450">Mapped properties for interactive Facebook, LinkedIn and Discord embeddings.</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                {localConfig.seoKeywords.split(',').length >= 4 ? (
                  <CheckSquare className="h-4 w-4 shrink-0 text-emerald-500 fill-emerald-500/10" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                )}
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-slate-800 dark:text-slate-250">Focus Keywords Concentration</span>
                  <p className="text-[10px] text-slate-450">Aim for 4 or more key phrases matching standard index indices.</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                {localConfig.seoDescription.length >= 120 && localConfig.seoDescription.length <= 160 ? (
                  <CheckSquare className="h-4 w-4 shrink-0 text-emerald-500 fill-emerald-500/10" />
                ) : (
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 animate-pulse" />
                )}
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-slate-800 dark:text-slate-250">Optimal Description Size</span>
                  <p className="text-[10px] text-slate-450">Optimize description count between 120 and 160 characters to fit standard web sizes.</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
