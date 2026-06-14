import React, { useState, useEffect } from 'react';
import { Sliders, Copy, Check, Sparkles, RefreshCw, Undo, Eye, Code, Type, Layout, X, Maximize2, Minimize2, Laptop, FileText, Download, Info, Heart, Smartphone, Tablet, Monitor } from 'lucide-react';
import { ALL_FONTS, SAMPLE_TEXTS, SHADOW_PRESETS, GOOGLE_FONTS, SYSTEM_FONTS } from '../data/fontsData';
import { StyleState, FontItem } from '../types';
import SpecimenModal from './SpecimenModal';

// Helper functions for WCAG 2.0 contrast checking
const getLuminance = (hex: string): number => {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map((char) => char + char).join('');
  }
  if (cleanHex.length !== 6) return 1; // Default fallback

  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (color1: string, color2: string): number => {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

interface FontStylerProps {
  initialFontId?: string;
  favorites?: string[];
  toggleFavorite?: (fontId: string) => void;
}

export default function FontStyler({ 
  initialFontId = 'inter',
  favorites = [],
  toggleFavorite,
}: FontStylerProps) {
  // Find current font based on id
  const [selectedFont, setSelectedFont] = useState<FontItem>(
    ALL_FONTS.find((f) => f.id === initialFontId) || ALL_FONTS[0]
  );

  const isFavorited = favorites.includes(selectedFont?.id || '');

  // If initialFontId changes, update state
  useEffect(() => {
    const f = ALL_FONTS.find((font) => font.id === initialFontId);
    if (f) {
      setSelectedFont(f);
      // Reset font weight if not supported by new font
      if (!f.weights.includes(styles.fontWeight)) {
        setStyles(prev => ({ ...prev, fontWeight: f.defaultWeight }));
      }
    }
  }, [initialFontId]);

  // Style properties
  const [styles, setStyles] = useState<StyleState>(() => {
    let initialFontSize = 48;
    if (typeof window !== 'undefined') {
      const savedAdmin = localStorage.getItem('app_admin_config');
      if (savedAdmin) {
        try {
          const parsed = JSON.parse(savedAdmin);
          if (parsed && typeof parsed.defaultFontSize === 'number') {
            initialFontSize = parsed.defaultFontSize;
          }
        } catch (e) {
          // fallback
        }
      }
    }
    return {
      fontSize: initialFontSize,
      fontWeight: 400,
      fontStyle: 'normal',
      letterSpacing: 0,
      lineHeight: 1.2,
      color: '#312e81', // indigo-900 default
      backgroundColor: '#ffffff',
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: 'none',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 8,
      shadowColor: '#6366f1',
      shadowOpacity: 0.6,
    };
  });

  // Preview Text
  const [previewText, setPreviewText] = useState<string>(SAMPLE_TEXTS[2].text);
  const [activeCodeTab, setActiveCodeTab] = useState<'standard' | 'tailwind' | 'import'>('standard');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState<boolean>(false);
  const [activePreviewTemplate, setActivePreviewTemplate] = useState<'saas' | 'editorial' | 'ui-cards'>('saas');
  const [previewThemeMode, setPreviewThemeMode] = useState<'dark' | 'light' | 'custom'>('dark');
  const [isSpecimenModalOpen, setIsSpecimenModalOpen] = useState<boolean>(false);
  const [isCssResetActive, setIsCssResetActive] = useState<boolean>(false);
  const [responsiveBreakpoint, setResponsiveBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Dynamic Web Font Load Effect to load selected Google Fonts on-demand
  useEffect(() => {
    if (selectedFont && selectedFont.isGoogleFont) {
      const fontName = selectedFont.googleFontUrlName || selectedFont.name.replace(/ /g, '+');
      const linkId = `google-font-${selectedFont.id}`;
      
      if (!document.getElementById(linkId)) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`;
        document.head.appendChild(link);
      }
    }
  }, [selectedFont]);

  // Download Google Font as .woff2 (or matching Webfont format)
  const handleDownloadFont = async () => {
    if (!selectedFont.isGoogleFont) return;
    setIsDownloading(true);
    setDownloadError(null);
    setDownloadSuccess(false);

    try {
      const cleanFontName = selectedFont.googleFontUrlName || selectedFont.name.replace(/ /g, '+');
      const cssUrl = `https://fonts.googleapis.com/css2?family=${cleanFontName}:wght@${styles.fontWeight}&display=swap`;

      // 1. Fetch Google CSS
      const cssResponse = await fetch(cssUrl, {
        headers: {
          'Accept': 'text/css,*/*;q=0.1'
        }
      });
      if (!cssResponse.ok) {
        throw new Error('Failed to retrieve font stylesheet from Google API.');
      }
      const cssText = await cssResponse.text();

      // 2. Extract font URL from CSS (looking for woff2, woff, or ttf)
      let fontUrl = '';
      
      // Try 'latin' section first
      const latinIndex = cssText.indexOf('/* latin */');
      if (latinIndex !== -1) {
        const borderStart = cssText.indexOf('{', latinIndex);
        const borderEnd = cssText.indexOf('}', borderStart);
        if (borderStart !== -1 && borderEnd !== -1) {
          const section = cssText.slice(borderStart, borderEnd);
          const match = section.match(/url\(['"]?(https:\/\/[^'")]+)['"]?\)/);
          if (match) fontUrl = match[1];
        }
      }

      // Secondary check if latin not found or didn't match
      if (!fontUrl) {
         const match = cssText.match(/url\(['"]?(https:\/\/[^'")]+)['"]?\)/);
         if (match) fontUrl = match[1];
      }

      if (!fontUrl) {
        throw new Error('Could not find font URL in the Google font stylesheet.');
      }

      // 3. Fetch the actual font file binary
      const fontFileResponse = await fetch(fontUrl);
      if (!fontFileResponse.ok) {
        throw new Error('Failed to download the webfont binary file from gstatic.');
      }
      const blob = await fontFileResponse.blob();

      // 4. Trigger download in browser
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      
      const extension = fontUrl.split('.').pop()?.split('?')[0] || 'woff2';
      const safeFileName = `${selectedFont.name.replace(/\s+/g, '-')}-${styles.fontWeight}.${extension}`;
      link.download = safeFileName;
      
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err: any) {
      console.error('Font download error:', err);
      setDownloadError(err.message || 'An error occurred during font download.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Reset helper
  const handleReset = () => {
    setStyles({
      fontSize: 48,
      fontWeight: selectedFont.defaultWeight,
      fontStyle: 'normal',
      letterSpacing: 0,
      lineHeight: 1.2,
      color: '#312e81',
      backgroundColor: '#ffffff',
      textAlign: 'center',
      textTransform: 'none',
      textDecoration: 'none',
      textShadow: 'none',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowBlur: 8,
      shadowColor: '#6366f1',
      shadowOpacity: 0.6,
    });
    setPreviewText(SAMPLE_TEXTS[2].text);
    setIsCssResetActive(false);
  };

  // Updates custom text shadow properties dynamically
  const updateShadowStyle = (updates: Partial<StyleState>) => {
    setStyles((prev) => {
      const next = { ...prev, ...updates };
      const colorStr = next.shadowColor !== undefined ? next.shadowColor : (prev.shadowColor || '#6366f1');
      const opacity = next.shadowOpacity !== undefined ? next.shadowOpacity : (prev.shadowOpacity !== undefined ? prev.shadowOpacity : 0.6);
      
      let finalColor = colorStr;
      if (colorStr.startsWith('#')) {
        const hex = colorStr.replace('#', '');
        if (hex.length === 6) {
          const r = parseInt(hex.substring(0, 2), 16) || 0;
          const g = parseInt(hex.substring(2, 4), 16) || 0;
          const b = parseInt(hex.substring(4, 6), 16) || 0;
          finalColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        } else if (hex.length === 3) {
          const r = parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16) || 0;
          const g = parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16) || 0;
          const b = parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16) || 0;
          finalColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
      }

      const shadowOffsetX = next.shadowOffsetX !== undefined ? next.shadowOffsetX : (prev.shadowOffsetX !== undefined ? prev.shadowOffsetX : 0);
      const shadowOffsetY = next.shadowOffsetY !== undefined ? next.shadowOffsetY : (prev.shadowOffsetY !== undefined ? prev.shadowOffsetY : 0);
      const shadowBlur = next.shadowBlur !== undefined ? next.shadowBlur : (prev.shadowBlur !== undefined ? prev.shadowBlur : 8);

      const shadowStr = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${finalColor}`;

      return {
        ...next,
        textShadow: shadowStr,
      };
    });
  };

  // Parses CSS text-shadow on preset select to sync sliders if possible
  const parsePresetAndSetShadow = (presetValue: string) => {
    if (presetValue === 'none') {
      setStyles(prev => ({
        ...prev,
        textShadow: 'none',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
      }));
      return;
    }

    setStyles(prev => {
      const next = { ...prev, textShadow: presetValue };
      const shadowRegex = /^(-?\d+)(?:px)?\s+(-?\d+)(?:px)?\s+(\d+)(?:px)?\s+(.+)$/;
      const match = presetValue.trim().match(shadowRegex);
      
      if (match) {
        const x = parseInt(match[1]) || 0;
        const y = parseInt(match[2]) || 0;
        const blur = parseInt(match[3]) || 0;
        const colorPart = match[4];
        
        let colorHex = prev.shadowColor || '#6366f1';
        let opacity = prev.shadowOpacity !== undefined ? prev.shadowOpacity : 0.6;
        
        const rgbaRegex = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/;
        const rgbaMatch = colorPart.match(rgbaRegex);
        if (rgbaMatch) {
          const r = parseInt(rgbaMatch[1]);
          const g = parseInt(rgbaMatch[2]);
          const b = parseInt(rgbaMatch[3]);
          opacity = parseFloat(rgbaMatch[4]) || 1;
          colorHex = '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
          }).join('');
        } else {
          const hexRegex = /(#[0-9a-fA-F]{3,8})/;
          const hexMatch = colorPart.match(hexRegex);
          if (hexMatch) {
            colorHex = hexMatch[1];
            opacity = 1;
          }
        }
        
        return {
          ...next,
          shadowOffsetX: x,
          shadowOffsetY: y,
          shadowBlur: blur,
          shadowColor: colorHex,
          shadowOpacity: opacity,
        };
      }
      
      return next;
    });
  };

  // Safe color picker helper
  const handleColorChange = (key: 'color' | 'backgroundColor', value: string) => {
    setStyles((prev) => ({ ...prev, [key]: value }));
  };

  // Generate CSS Output
  const getStandardCSS = () => {
    const resetHeader = isCssResetActive
      ? `/* 🛠️ Modern CSS Reset Code Block */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n}\n\n/* ℹ️ Custom Typographic Styles */\n`
      : '';

    const lines = [
      `font-family: ${selectedFont.stack};`,
      `font-size: ${styles.fontSize}px;`,
      `font-weight: ${styles.fontWeight};`,
    ];
    if (styles.fontStyle !== 'normal') lines.push(`font-style: ${styles.fontStyle};`);
    if (styles.letterSpacing !== 0) lines.push(`letter-spacing: ${styles.letterSpacing}px;`);
    if (styles.lineHeight !== 1.2) lines.push(`line-height: ${styles.lineHeight};`);
    if (styles.color !== '#000000') lines.push(`color: ${styles.color};`);
    if (styles.backgroundColor && styles.backgroundColor !== '#ffffff' && styles.backgroundColor !== 'transparent') {
      lines.push(`background-color: ${styles.backgroundColor};`);
    }
    if (styles.textAlign !== 'left') lines.push(`text-align: ${styles.textAlign};`);
    if (styles.textTransform !== 'none') lines.push(`text-transform: ${styles.textTransform};`);
    if (styles.textDecoration !== 'none') lines.push(`text-decoration: ${styles.textDecoration};`);
    if (styles.textShadow !== 'none') lines.push(`text-shadow: ${styles.textShadow};`);

    return resetHeader + lines.join('\n');
  };

  const getImportCSS = () => {
    if (!selectedFont.isGoogleFont) {
      return `/* System safe fonts require no external @import statement */\nfont-family: ${selectedFont.stack};`;
    }
    const cleanFontName = selectedFont.googleFontUrlName || selectedFont.name.replace(' ', '+');
    const importUrl = `@import url('https://fonts.googleapis.com/css2?family=${cleanFontName}:wght@${styles.fontWeight}&display=swap');`;
    const resetBlock = isCssResetActive
      ? `\n\n/* 🛠️ Modern CSS Reset */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n}`
      : '';
    const cssBody = `.font-custom {\n  font-family: ${selectedFont.stack};\n  font-weight: ${styles.fontWeight};\n}`;
    return `${importUrl}${resetBlock}\n\n${cssBody}`;
  };

  const getTailwindCSS = () => {
    const weightMap: Record<number, string> = {
      100: 'font-thin',
      200: 'font-extralight',
      300: 'font-light',
      400: 'font-normal',
      500: 'font-medium',
      600: 'font-semibold',
      700: 'font-bold',
      800: 'font-extrabold',
      900: 'font-black',
    };
    const tailwindStyles = [];
    if (isCssResetActive) {
      tailwindStyles.push('m-0', 'p-0', 'box-border', 'antialiased');
    }
    tailwindStyles.push(`font-['${selectedFont.name}']`);
    tailwindStyles.push(weightMap[styles.fontWeight] || 'font-normal');
    if (styles.fontStyle === 'italic') tailwindStyles.push('italic');
    if (styles.textAlign !== 'left') tailwindStyles.push(`text-${styles.textAlign}`);
    if (styles.textTransform !== 'none') tailwindStyles.push(styles.textTransform);
    if (styles.textDecoration !== 'none') tailwindStyles.push(styles.textDecoration);

    return `<div className="${tailwindStyles.join(' ')}" style={{ fontSize: '${styles.fontSize}px', letterSpacing: '${styles.letterSpacing}px', lineHeight: ${styles.lineHeight} }}>\n  ${previewText}\n</div>`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // WCAG contrast calculation
  const isDocDark = typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false;
  const currentBgColor = styles.backgroundColor === 'transparent' ? (isDocDark ? '#0f172a' : '#ffffff') : styles.backgroundColor;
  const contrastRatio = getContrastRatio(styles.color, currentBgColor);
  
  const isLargeText = styles.fontSize >= 24 || (styles.fontSize >= 18.66 && styles.fontWeight >= 650);
  
  const aaNormalPass = contrastRatio >= 4.5;
  const aaaNormalPass = contrastRatio >= 7.0;
  const aaLargePass = contrastRatio >= 3.0;
  const aaaLargePass = contrastRatio >= 4.5;
  
  const currentSizeCompliantAA = isLargeText ? aaLargePass : aaNormalPass;
  const currentSizeCompliantAAA = isLargeText ? aaaLargePass : aaaNormalPass;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* 1. Control Panel (Left column - xl:span-4 lg:span-5) */}
      <div id="styler-controls" className="lg:col-span-4 bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-6 justify-between transition-all">
        <div>
          <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-slate-100 dark:border-slate-800/80 font-display">
            <h2 className="text-sm font-extrabold tracking-wider text-slate-900 dark:text-white uppercase flex items-center gap-2">
              <Sliders className="h-4.5 w-4.5 text-indigo-500" /> Font Customizer
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const el = document.getElementById('faq-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                  const input = document.getElementById('faq-search-input') as HTMLInputElement;
                  if (input) {
                    setTimeout(() => {
                      input.focus();
                      const container = document.getElementById('faq-search-container');
                      if (container) {
                        container.classList.add('ring-4', 'ring-indigo-500/35', 'dark:ring-indigo-500/20');
                        setTimeout(() => {
                          container.classList.remove('ring-4', 'ring-indigo-500/35', 'dark:ring-indigo-500/20');
                        }, 1500);
                      }
                    }, 650);
                  }
                }}
                className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider transition-colors"
                title="Scroll and focus typography FAQs"
              >
                <Info className="h-3 w-3" /> FAQ
              </button>
              <span className="text-slate-200 dark:text-slate-800">|</span>
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider transition-colors"
                title="Reset to default styles"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
            </div>
          </div>

          <div className="space-y-5 animate-fade-in">
            
            {/* Font Family Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="font-family-select" className="text-xs font-bold uppercase tracking-widest text-slate-405 dark:text-slate-500 font-display">
                  Font Family
                </label>
                {toggleFavorite && (
                  <button
                    onClick={() => toggleFavorite(selectedFont.id)}
                    className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 hover:text-red-500 cursor-pointer font-display transition-all"
                    title={isFavorited ? "Remove from Favorites" : "Save to Favorites"}
                  >
                    <Heart className={`h-3 w-3 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                    <span>{isFavorited ? "Favorited" : "Save Font"}</span>
                  </button>
                )}
              </div>
              <select
                id="font-family-select"
                value={selectedFont.id}
                onChange={(e) => {
                  const font = ALL_FONTS.find((f) => f.id === e.target.value);
                  if (font) {
                    setSelectedFont(font);
                    // Adjust supported weights
                    if (!font.weights.includes(styles.fontWeight)) {
                      setStyles(prev => ({ ...prev, fontWeight: font.defaultWeight }));
                    }
                  }
                }}
                className="w-full text-xs font-bold uppercase tracking-wider px-3.5 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 font-display cursor-pointer"
              >
                <optgroup label="✨ Google Web Fonts (Loaded)">
                  {GOOGLE_FONTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.category})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="💻 Web Safe System Fonts">
                  {SYSTEM_FONTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} (Safety: {f.safetyScore}%)
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Font Size Selector */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">Font Size</span>
                <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{styles.fontSize}px</span>
              </div>
              <input
                id="font-size-slider"
                type="range"
                min="12"
                max="120"
                value={styles.fontSize}
                onChange={(e) => setStyles((prev) => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
              />
            </div>

            {/* Font Weight Selector */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">Weight</span>
                <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{styles.fontWeight}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {selectedFont.weights.map((wt) => (
                  <button
                    key={wt}
                    id={`weight-btn-${wt}`}
                    onClick={() => setStyles((prev) => ({ ...prev, fontWeight: wt }))}
                    className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium cursor-pointer transition-all ${
                      styles.fontWeight === wt
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>

            {/* Stylings Posture, Transform & Decoration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Style
                </label>
                <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button
                    id="style-normal-btn"
                    onClick={() => setStyles((prev) => ({ ...prev, fontStyle: 'normal' }))}
                    className={`text-xs py-1.5 rounded-lg font-medium cursor-pointer transition-all ${
                      styles.fontStyle === 'normal'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-750'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    id="style-italic-btn"
                    onClick={() => setStyles((prev) => ({ ...prev, fontStyle: 'italic' }))}
                    className={`text-xs py-1.5 rounded-lg font-medium cursor-pointer italic transition-all ${
                      styles.fontStyle === 'italic'
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-750'
                    }`}
                  >
                    Italic
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-display">
                  Transform
                </label>
                <select
                  id="text-transform-select"
                  value={styles.textTransform}
                  onChange={(e) => setStyles((prev) => ({ ...prev, textTransform: e.target.value as StyleState['textTransform'] }))}
                  className="w-full text-xs font-medium px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  <option value="none">None</option>
                  <option value="uppercase">UPPERCASE</option>
                  <option value="lowercase">lowercase</option>
                  <option value="capitalize">Capitalize</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 font-display">
                  Decoration
                </label>
                <select
                  id="text-decoration-select"
                  value={styles.textDecoration}
                  onChange={(e) => setStyles((prev) => ({ ...prev, textDecoration: e.target.value as StyleState['textDecoration'] }))}
                  className="w-full text-xs font-medium px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  <option value="none">None</option>
                  <option value="underline">Underline</option>
                  <option value="line-through">Line-Through</option>
                  <option value="overline">Overline</option>
                </select>
              </div>
            </div>

            {/* Letter Spacing & Line Height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">Letter Spacing</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{styles.letterSpacing}px</span>
                </div>
                <input
                  id="letter-spacing-slider"
                  type="range"
                  min="-4"
                  max="16"
                  value={styles.letterSpacing}
                  onChange={(e) => setStyles((prev) => ({ ...prev, letterSpacing: parseFloat(e.target.value) }))}
                  className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="uppercase tracking-wider text-slate-500 dark:text-slate-400">Line Height</span>
                  <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{styles.lineHeight}</span>
                </div>
                <input
                  id="line-height-slider"
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={styles.lineHeight}
                  onChange={(e) => setStyles((prev) => ({ ...prev, lineHeight: parseFloat(e.target.value) }))}
                  className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* Text Alignments */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Text Align
              </label>
              <div className="grid grid-cols-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-center">
                {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                  <button
                    key={align}
                    id={`align-btn-${align}`}
                    onClick={() => setStyles((prev) => ({ ...prev, textAlign: align }))}
                    className={`text-xs py-1.5 rounded-lg capitalize font-medium cursor-pointer transition-all ${
                      styles.textAlign === align
                        ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-semibold'
                        : 'text-slate-500 hover:text-slate-750'
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            {/* Text Shadow Presets & Custom Glow Customizer */}
            <div className="space-y-3">
              <div>
                <label htmlFor="text-shadow-select" className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1.5 font-display">
                  Text Shadow Glow
                </label>
                <select
                  id="text-shadow-select"
                  value={styles.textShadow}
                  onChange={(e) => parsePresetAndSetShadow(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 cursor-pointer"
                >
                  {SHADOW_PRESETS.map((sh) => (
                    <option key={sh.label} value={sh.value}>
                      {sh.label}
                    </option>
                  ))}
                  {!SHADOW_PRESETS.some((sh) => sh.value === styles.textShadow) && styles.textShadow !== 'none' && (
                    <option value={styles.textShadow}>Custom Shadow</option>
                  )}
                </select>
              </div>

              {/* Custom Shadow Glow Value Sliders */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 font-display">
                  Custom Glow Parameters
                </span>

                {/* Blur Radius */}
                <div>
                  <div className="flex justify-between text-[11px] font-medium mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Blur Radius</span>
                    <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{styles.shadowBlur ?? 8}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={styles.shadowBlur ?? 8}
                    onChange={(e) => updateShadowStyle({ shadowBlur: parseInt(e.target.value) })}
                    className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* X & Y Offsets */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">X Offset</span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{styles.shadowOffsetX ?? 0}px</span>
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={styles.shadowOffsetX ?? 0}
                      onChange={(e) => updateShadowStyle({ shadowOffsetX: parseInt(e.target.value) })}
                      className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Y Offset</span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{styles.shadowOffsetY ?? 0}px</span>
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={styles.shadowOffsetY ?? 0}
                      onChange={(e) => updateShadowStyle({ shadowOffsetY: parseInt(e.target.value) })}
                      className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                  </div>
                </div>

                {/* Color & Opacity */}
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100 dark:border-slate-800/40">
                  <div>
                    <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">Color</span>
                    <div className="flex items-center gap-1.5">
                      <div className="relative h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-xs animate-fade-in">
                        <input
                          type="color"
                          value={styles.shadowColor ?? '#6366f1'}
                          onChange={(e) => updateShadowStyle({ shadowColor: e.target.value })}
                          className="absolute inset-0 h-10 w-10 -translate-x-1.5 -translate-y-1.5 cursor-pointer"
                        />
                      </div>
                      <input
                        type="text"
                        value={(styles.shadowColor ?? '#6366f1').toUpperCase()}
                        onChange={(e) => updateShadowStyle({ shadowColor: e.target.value })}
                        className="w-full text-[10px] font-mono px-1.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className="text-slate-500 dark:text-slate-400">Opacity</span>
                      <span className="text-slate-700 dark:text-slate-300 font-mono font-medium">{Math.round((styles.shadowOpacity ?? 0.6) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={styles.shadowOpacity ?? 0.6}
                      onChange={(e) => updateShadowStyle({ shadowOpacity: parseFloat(e.target.value) })}
                      className="w-full accent-indigo-600 cursor-pointer h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Colors Pickers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="text-color-picker" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Text Color
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-xs">
                    <input
                      id="text-color-picker"
                      type="color"
                      value={styles.color}
                      onChange={(e) => handleColorChange('color', e.target.value)}
                      className="absolute inset-0 h-16 w-16 -translate-x-3 -translate-y-3 cursor-pointer"
                    />
                  </div>
                  <input
                    id="text-color-input"
                    type="text"
                    value={styles.color.toUpperCase()}
                    onChange={(e) => handleColorChange('color', e.target.value)}
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bg-color-picker" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Bg Canvas
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0 shadow-xs">
                    <input
                      id="bg-color-picker"
                      type="color"
                      value={styles.backgroundColor === 'transparent' ? '#ffffff' : styles.backgroundColor}
                      onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                      className="absolute inset-0 h-16 w-16 -translate-x-3 -translate-y-3 cursor-pointer"
                    />
                  </div>
                  <select
                    id="bg-mode-select"
                    value={styles.backgroundColor}
                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                    className="w-full text-[11px] font-medium px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 cursor-pointer"
                  >
                    <option value="transparent">Transparent</option>
                    <option value="#ffffff">White (#FFF)</option>
                    <option value="#f8fafc">Slate-50</option>
                    <option value="#0f172a">Slate-900</option>
                    <option value="#1e1b4b">Indigo-950</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Contrast Helpers */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setStyles(prev => ({
                    ...prev,
                    color: prev.backgroundColor === 'transparent' ? '#ffffff' : prev.backgroundColor,
                    backgroundColor: prev.color === 'transparent' ? '#000000' : prev.color
                  }));
                }}
                className="flex-1 py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer flex items-center justify-center gap-1 font-display"
                title="Swap text and background colors"
              >
                <RefreshCw className="h-3 w-3" /> Swap Colors
              </button>
              <button
                type="button"
                onClick={() => {
                  const isDark = document.documentElement.classList.contains('dark');
                  setStyles(prev => ({
                    ...prev,
                    color: isDark ? '#ffffff' : '#1e1b4b',
                    backgroundColor: isDark ? '#0f172a' : '#ffffff'
                  }));
                }}
                className="flex-1 py-1.5 px-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 cursor-pointer flex items-center justify-center gap-1 font-display"
                title="Match current website theme"
              >
                <Sparkles className="h-3 w-3" /> Auto Contrast
              </button>
            </div>

            {/* CSS Reset Toggle widget */}
            <div className="pt-4 border-t border-slate-105 dark:border-slate-800/80">
              <label htmlFor="css-reset-toggle-chk" className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  id="css-reset-toggle-chk"
                  type="checkbox"
                  checked={isCssResetActive}
                  onChange={(e) => setIsCssResetActive(e.target.checked)}
                  className="mt-1 h-4 w-4 bg-white dark:bg-slate-950 border border-slate-350 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 rounded cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-750 dark:text-slate-300 font-display">
                    Modern CSS Reset
                  </span>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 leading-tight mt-0.5">
                    Toggle active properties reset (removes browser margins, sets box-sizing layout, cleans rendering/font-smoothing defaults).
                  </p>
                </div>
              </label>
            </div>

          </div>
        </div>

        {/* Font Info Sheet */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-850 text-xs text-slate-700 dark:text-slate-350">
          <span className="font-semibold text-slate-850 dark:text-slate-300">About {selectedFont.name}:</span>
          <p className="text-slate-500 dark:text-slate-400 mt-1 italic font-light leading-relaxed">
            "{selectedFont.description}"
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2 font-mono text-[10px]">
            <span className="px-1.5 py-1 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-medium">
              Category: {selectedFont.category}
            </span>
            <span className="px-1.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-medium">
              Safety Score: {selectedFont.safetyScore}%
            </span>
          </div>

          {/* Download Font Block */}
          {selectedFont.isGoogleFont && (
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-col gap-1.5">
                <span className="font-bold text-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider font-display flex items-center gap-1.5">
                  <Download className="h-3 w-3 text-indigo-500" /> Download Webfont Asset
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                  Download the official <strong>.woff2</strong> file for <strong>{selectedFont.name}</strong> at weight <strong>{styles.fontWeight}</strong>.
                </p>
                <button
                  id="download-styler-font-btn"
                  onClick={handleDownloadFont}
                  disabled={isDownloading}
                  className={`mt-1.5 py-2 px-3 rounded-xl font-bold uppercase text-[10px] tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isDownloading
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                      : downloadSuccess
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm shadow-emerald-500/20'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:shadow-indigo-500/10'
                  }`}
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      Retrieving Font Binary...
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Success! Downloaded
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" />
                      Get {selectedFont.name}-{styles.fontWeight}.woff2
                    </>
                  )}
                </button>
                {downloadError && (
                  <p className="text-red-500 dark:text-red-400 font-medium text-[10px] mt-1 bg-red-50 dark:bg-red-950/20 p-2 rounded-lg border border-red-100/50 dark:border-red-900/40">
                    ⚠️ {downloadError}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Specimen Sheet Block */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 text-[10px] uppercase tracking-wider font-display flex items-center gap-1.5">
                <FileText className="h-3 w-3 text-indigo-500" /> Type Specimen Proof
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Generate high-definition print proof specimens with character maps, typographic sizes, and custom headings.
              </p>
              <button
                id="generate-styler-specimen-btn"
                onClick={() => setIsSpecimenModalOpen(true)}
                className="mt-1.5 py-2 px-3 rounded-xl font-bold uppercase text-[10px] tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 shadow-xs"
              >
                <Type className="h-3.5 w-3.5 text-indigo-500" />
                Generate Specimen Sheet
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Live Preview and Code Output (Right column - lg:span-7 / span-8) */}
      <div id="styler-display" className="lg:col-span-8 flex flex-col gap-6">
        
        {/* Real-time preview section */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-slate-100 dark:border-slate-800/85 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4.5 w-4.5 text-emerald-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white font-display">Real-Time Interactive Preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsFullscreenOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 hover:bg-slate-900 hover:text-white dark:bg-indigo-950/40 dark:hover:bg-slate-150 dark:hover:text-slate-950 text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-200/50 dark:border-indigo-900/40 transition-all cursor-pointer shadow-xs font-display"
                title="Launch mock landing page with these font parameters"
              >
                <Maximize2 className="h-3 w-3" /> Fullscreen Preview
              </button>
            </div>
            
            {/* Quick Presets Text selectors */}
            <div className="flex flex-wrap gap-1">
              {SAMPLE_TEXTS.map((t, index) => (
                <button
                  key={t.label}
                  id={`sample-preset-${index}`}
                  onClick={() => setPreviewText(t.text)}
                  className={`text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg font-bold uppercase font-display cursor-pointer transition-colors ${
                    previewText === t.text
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-950/40'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* User editable live preview textbox */}
          <div className="relative">
            <textarea
              id="preview-custom-textbox"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="w-full text-xs font-mono px-3.5 py-2 rounded-xl border border-slate-150 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-600 dark:text-slate-400 focus:ring-1 focus:ring-indigo-500 placeholder-slate-400"
              placeholder="Type anything here to test in real-time..."
              rows={2}
            />
          </div>

          {/* Responsive Breakpoint Toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
              <Laptop className="h-3.5 w-3.5 text-indigo-500" />
              <span>Simulated Viewport Size</span>
            </div>
            
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 border border-slate-180 dark:border-slate-800 p-0.5 rounded-lg font-display">
              <button
                type="button"
                id="breakpoint-desktop-btn"
                onClick={() => setResponsiveBreakpoint('desktop')}
                className={`flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  responsiveBreakpoint === 'desktop'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-300'
                }`}
                title="Desktop Layout (100% width)"
              >
                <Monitor className="h-3 w-3" />
                <span>Desktop (100%)</span>
              </button>

              <button
                type="button"
                id="breakpoint-tablet-btn"
                onClick={() => setResponsiveBreakpoint('tablet')}
                className={`flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  responsiveBreakpoint === 'tablet'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-300'
                }`}
                title="Tablet simulated layout (768px width)"
              >
                <Tablet className="h-3 w-3" />
                <span>Tablet (768px)</span>
              </button>

              <button
                type="button"
                id="breakpoint-mobile-btn"
                onClick={() => setResponsiveBreakpoint('mobile')}
                className={`flex items-center gap-1.5 text-[10px] uppercase font-black tracking-wider px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${
                  responsiveBreakpoint === 'mobile'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-850 dark:hover:text-slate-300'
                }`}
                title="Mobile simulated layout (375px width)"
              >
                <Smartphone className="h-3 w-3" />
                <span>Mobile (375px)</span>
              </button>
            </div>
          </div>

          {/* Live Render Canvas Container */}
          <div 
            id="live-render-canvas"
            className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden min-h-[300px] flex items-center justify-center p-6 relative select-all scrollbar-thin transition-colors"
            style={{ backgroundColor: styles.backgroundColor }}
          >
            {/* Transparent checkerboard background indicator */}
            {styles.backgroundColor === 'transparent' && (
              <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 20%, transparent 20%), radial-gradient(#000 20%, transparent 20%)', backgroundPosition: '0 0, 8px 8px', backgroundSize: '16px 16px' }} />
            )}

            {/* Visual Margin Guides for "No CSS Reset" Mode */}
            {!isCssResetActive && (
              <>
                <div className="absolute top-0 inset-x-0 h-5 bg-amber-500/5 dark:bg-amber-500/[0.03] border-b border-dashed border-amber-500/20 flex items-center justify-center text-[9px] text-amber-600/70 dark:text-amber-500/60 font-mono tracking-wider select-none pointer-events-none">
                  ⚡ NATIVE BROWSER MARGIN SIMULATED (1.25em)
                </div>
                <div className="absolute bottom-0 inset-x-0 h-5 bg-amber-500/5 dark:bg-amber-500/[0.03] border-t border-dashed border-amber-500/20 flex items-center justify-center text-[9px] text-amber-600/70 dark:text-amber-500/60 font-mono tracking-wider select-none pointer-events-none">
                  ⚡ NATIVE BROWSER MARGIN SIMULATED (1.25em)
                </div>
              </>
            )}
            
            {isCssResetActive && (
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold tracking-wider select-none pointer-events-none uppercase">
                ⚡ CSS Reset Active
              </div>
            )}

            {/* Simulated Width guide rulers */}
            {responsiveBreakpoint !== 'desktop' && (
              <>
                <div 
                  className="absolute inset-y-0 border-x border-dashed border-indigo-400/30 dark:border-indigo-400/15 pointer-events-none mx-auto left-0 right-0 transition-all duration-300 z-0 bg-indigo-500/[0.015] dark:bg-indigo-550/[0.01]"
                  style={{
                    width: responsiveBreakpoint === 'mobile' ? '375px' : '768px',
                    maxWidth: '100%',
                  }}
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-indigo-500/10 border border-indigo-400/20 text-[9px] text-indigo-600 dark:text-indigo-400 font-mono font-bold tracking-wider select-none pointer-events-none uppercase z-20">
                  ⚡ Simulated: {responsiveBreakpoint === 'mobile' ? '375px (Mobile)' : '768px (Tablet)'}
                </div>
              </>
            )}

            {/* Breakpoint Simulation Frame Wrapper */}
            <div
              style={{
                width: responsiveBreakpoint === 'mobile' ? '375px' : responsiveBreakpoint === 'tablet' ? '768px' : '100%',
                maxWidth: '100%',
              }}
              className="w-full h-full flex flex-col justify-center mx-auto transition-all duration-300 ease-out relative z-10"
            >
              {/* Actual Animated text content */}
              <p
                id="live-preview-paragraph"
                style={{
                  fontFamily: selectedFont.stack,
                  fontSize: `${styles.fontSize}px`,
                  fontWeight: styles.fontWeight,
                  fontStyle: styles.fontStyle,
                  letterSpacing: `${styles.letterSpacing}px`,
                  lineHeight: styles.lineHeight,
                  color: styles.color,
                  textAlign: styles.textAlign,
                  textTransform: styles.textTransform,
                  textDecoration: styles.textDecoration,
                  textShadow: styles.textShadow,
                  wordBreak: 'break-word',
                  width: '100%',
                  // Dynamic CSS reset / simulated browser defaults
                  margin: isCssResetActive ? '0' : '1.25em 0',
                  padding: '0',
                  boxSizing: isCssResetActive ? 'border-box' : 'content-box',
                  WebkitFontSmoothing: isCssResetActive ? 'antialiased' : 'subpixel-antialiased',
                  MozOsxFontSmoothing: isCssResetActive ? 'grayscale' : 'auto',
                  textRendering: isCssResetActive ? 'optimizeLegibility' : 'auto',
                }}
                className="font-display select-text outline-hidden transition-all duration-300"
              >
                {previewText || "Please type standard typeface."}
              </p>
            </div>
          </div>
        </div>

        {/* CSS Code Generator & Copy functionality */}
        <div className="bg-slate-900 border-2 border-slate-950 rounded-2xl p-5 text-slate-100 flex flex-col gap-4 shadow-lg shadow-indigo-950/15">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Code className="h-4.5 w-4.5 text-indigo-400" />
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-white font-display">Copy HTML & CSS Snippet</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Perfect format for rapid projects integration</span>
              </div>
            </div>

            {/* Code type Selector tabs */}
            <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                id="code-tab-standard"
                onClick={() => setActiveCodeTab('standard')}
                className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer font-display ${
                  activeCodeTab === 'standard' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Standard CSS
              </button>
              <button
                id="code-tab-tailwind"
                onClick={() => setActiveCodeTab('tailwind')}
                className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer font-display ${
                  activeCodeTab === 'tailwind' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                React JSX
              </button>
              {selectedFont.isGoogleFont && (
                <button
                  id="code-tab-import"
                  onClick={() => setActiveCodeTab('import')}
                  className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer font-display ${
                    activeCodeTab === 'import' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  @import CSS
                </button>
              )}
            </div>
          </div>

          <div className="relative font-mono text-[11px] sm:text-xs leading-relaxed text-indigo-200/90 bg-slate-950 border border-slate-850 p-4 rounded-xl min-h-[140px] overflow-auto select-all max-h-[220px]">
            <pre className="whitespace-pre-wrap select-all">
              {activeCodeTab === 'standard' && getStandardCSS()}
              {activeCodeTab === 'tailwind' && getTailwindCSS()}
              {activeCodeTab === 'import' && getImportCSS()}
            </pre>

            {/* Clipboard Copy Button */}
            <button
              id="clipboard-copy-btn"
              onClick={() => {
                const targetText =
                  activeCodeTab === 'standard'
                    ? getStandardCSS()
                    : activeCodeTab === 'tailwind'
                    ? getTailwindCSS()
                    : getImportCSS();
                copyToClipboard(targetText);
              }}
              className="absolute top-3 right-3 flex items-center gap-1 bg-slate-850 hover:bg-slate-800 text-slate-100 hover:text-white px-3 py-2 rounded-lg text-[11px] border border-slate-750 cursor-pointer shadow-md transition-colors"
            >
              {copiedCode ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy CSS</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 italic">
            <Sparkles className="h-3 w-3 text-indigo-400 shrink-0" />
            <span>Hint: Dynamic fallback rendering helps ensure that when users do not possess standard fonts, clean alternatives are active.</span>
          </div>
        </div>

        {/* WCAG Contrast Auditor Block */}
        <div className="p-4 bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl space-y-3 shadow-xs">
          <div className="flex items-center justify-between border-b pb-2.5 border-slate-100 dark:border-slate-850">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#6366f1] dark:text-[#818cf8] font-display flex items-center gap-1.5">
              <Info className="h-4 w-4" /> WCAG 2.0 Web Contrast Ratio Audit
            </span>
            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl ${
              contrastRatio >= 7.0 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200/35 dark:border-emerald-800/35' 
                : contrastRatio >= 4.5 
                ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-650 dark:text-blue-400 border border-blue-200/35 dark:border-blue-805/35' 
                : contrastRatio >= 3.0 
                ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200/35 dark:border-amber-800/35' 
                : 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200/35 dark:border-rose-900/35'
            }`}>
              {contrastRatio >= 7.0 ? 'AAA Pass' : contrastRatio >= 4.5 ? 'AA Pass' : contrastRatio >= 3.0 ? 'Large Only' : 'Poor Rating'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-1">
            <div className="space-y-1">
              <span className="block text-[24px] font-black font-display tracking-tight text-slate-850 dark:text-slate-100 leading-none">
                {contrastRatio.toFixed(2)} <span className="text-xs font-normal text-slate-400">: 1</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-medium whitespace-nowrap">
                Luminance calculation vs {styles.backgroundColor === 'transparent' ? 'fallback template bg' : 'canvas bg'}
              </span>
            </div>

            <div className="text-right">
              <span className="block text-[10px] uppercase font-black tracking-widest text-slate-400 font-display">Your Size Class:</span>
              <span className={`text-xs font-black uppercase tracking-wider ${currentSizeCompliantAA ? 'text-emerald-500' : 'text-rose-500 bg-rose-500/10 px-1.5 py-0.5 rounded-lg border border-rose-500/20'}`}>
                {styles.fontSize}px ({currentSizeCompliantAA ? 'Passes' : 'Fails'})
              </span>
            </div>
          </div>

          {/* Progress visual gauge */}
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                contrastRatio >= 7.0 
                  ? 'bg-emerald-500' 
                  : contrastRatio >= 4.5 
                  ? 'bg-indigo-500' 
                  : contrastRatio >= 3.0 
                  ? 'bg-amber-500' 
                  : 'bg-rose-500'
              }`}
              style={{ width: `${Math.min((contrastRatio / 21) * 100, 100)}%` }}
            />
          </div>

          {/* Criteria Detailed Grid Map */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-medium font-sans">
            <div className="flex items-center justify-between p-1.5 px-2 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
              <span className="text-slate-400 font-bold">Body (AA)</span>
              <span className={`font-black ${aaNormalPass ? 'text-emerald-500' : 'text-rose-500'}`}>
                {aaNormalPass ? '✔ PASS' : '✘ FAIL'}
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 px-2 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
              <span className="text-slate-400 font-bold">Body (AAA)</span>
              <span className={`font-black ${aaaNormalPass ? 'text-emerald-500' : 'text-rose-500'}`}>
                {aaaNormalPass ? '✔ PASS' : '✘ FAIL'}
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 px-2 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
              <span className="text-slate-400 font-bold">Large (AA)</span>
              <span className={`font-black ${aaLargePass ? 'text-emerald-500' : 'text-rose-500'}`}>
                {aaLargePass ? '✔ PASS' : '✘ FAIL'}
              </span>
            </div>

            <div className="flex items-center justify-between p-1.5 px-2 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
              <span className="text-slate-400 font-bold">Large (AAA)</span>
              <span className={`font-black ${aaaLargePass ? 'text-emerald-500' : 'text-rose-500'}`}>
                {aaaLargePass ? '✔ PASS' : '✘ FAIL'}
              </span>
            </div>
          </div>

          {/* Dynamic Tip Paragraph */}
          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal italic font-light font-sans text-center bg-slate-100/30 dark:bg-slate-900/10 px-2 py-1 rounded-xl">
            {contrastRatio >= 7.0 
              ? "✓ Perfect for both small body copy and large design headers." 
              : contrastRatio >= 4.5 
              ? "✓ Ideal contrast. Fully complies with regular text guidelines." 
              : contrastRatio >= 3.0 
              ? "⚠ Only suitable for bold or large display headings (above 24px)." 
              : "✗ Warning: Extremely low contrast! Try other colors or backgrounds."}
          </p>
        </div>

      </div>

      {/* Fullscreen Full-Context Typography Preview Modal Overlay */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md overflow-hidden animate-fade-in p-2 md:p-6 select-none font-sans text-slate-100">
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl w-full h-full max-w-7xl flex flex-col overflow-hidden shadow-2xl relative select-text">
            
            {/* Modal Header bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 md:px-8 border-b-2 border-slate-800 bg-slate-900/60 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-md tracking-tighter">FF</div>
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-widest text-white font-display flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" /> Fullpage Typography Canvas
                  </h2>
                  <p className="text-[10px] text-slate-400">Inspecting <span className="text-indigo-400 font-bold">{selectedFont.name}</span> in live mockup context</p>
                </div>
              </div>

              {/* Central Controller: Template & Theme Pickers */}
              <div className="flex flex-wrap items-center gap-3 select-none">
                {/* Template switchers */}
                <div className="flex p-0.5 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActivePreviewTemplate('saas')}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer font-display ${
                      activePreviewTemplate === 'saas' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    SaaS Landing
                  </button>
                  <button
                    onClick={() => setActivePreviewTemplate('editorial')}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer font-display ${
                      activePreviewTemplate === 'editorial' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Editorial Blog
                  </button>
                  <button
                    onClick={() => setActivePreviewTemplate('ui-cards')}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all cursor-pointer font-display ${
                      activePreviewTemplate === 'ui-cards' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    UI Cards
                  </button>
                </div>

                {/* Theme mode selectors */}
                <div className="flex p-0.5 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setPreviewThemeMode('dark')}
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md transition-all cursor-pointer font-display ${
                      previewThemeMode === 'dark' ? 'bg-slate-800 text-white font-extrabold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Render in dark space layout"
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setPreviewThemeMode('light')}
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md transition-all cursor-pointer font-display ${
                      previewThemeMode === 'light' ? 'bg-white text-slate-900 font-extrabold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Render in clean crisp light layout"
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setPreviewThemeMode('custom')}
                    className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md transition-all cursor-pointer font-display ${
                      previewThemeMode === 'custom' ? 'bg-indigo-600 text-white font-extrabold' : 'text-slate-500 hover:text-slate-300'
                    }`}
                    title="Apply your custom color selection dynamically"
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsFullscreenOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer shrink-0 border border-transparent hover:border-slate-700"
                title="Exit fullscreen preview"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Container (split view: Config panel left, Viewport right) */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 bg-slate-950">
              
              {/* Left Column: Quick inline adjuster bar */}
              <div className="w-full lg:w-80 bg-slate-900/65 border-b lg:border-b-0 lg:border-r-2 border-slate-800 p-5 overflow-y-auto shrink-0 space-y-5 select-none scrollbar-thin">
                <div className="pb-3 border-b border-slate-800/80">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-300 font-display flex items-center gap-1.5">
                    <Sliders className="h-3.5 w-3.5 text-indigo-400" /> Fast-Tune In-Context
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-1">Adjust and view changes recursively</p>
                </div>

                {/* Font Selector */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">Font Family</label>
                    {toggleFavorite && (
                      <button
                        onClick={() => toggleFavorite(selectedFont.id)}
                        className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-500 hover:text-red-400 cursor-pointer font-display transition-all"
                        title={isFavorited ? "Remove from Favorites" : "Save to Favorites"}
                      >
                        <Heart className={`h-2.5 w-2.5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-500'}`} />
                        <span>{isFavorited ? "Saved" : "Save Font"}</span>
                      </button>
                    )}
                  </div>
                  <select
                    value={selectedFont.id}
                    onChange={(e) => {
                      const font = ALL_FONTS.find((f) => f.id === e.target.value);
                      if (font) {
                        setSelectedFont(font);
                        if (!font.weights.includes(styles.fontWeight)) {
                          setStyles(prev => ({ ...prev, fontWeight: font.defaultWeight }));
                        }
                      }
                    }}
                    className="w-full text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg border border-slate-700 bg-slate-950 text-slate-100 font-display"
                  >
                    <optgroup label="Google Web Fonts">
                      {GOOGLE_FONTS.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="System Safe">
                      {SYSTEM_FONTS.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Size slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">
                    <span>Base Size</span>
                    <span className="font-mono text-indigo-300">{styles.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="16"
                    max="96"
                    value={styles.fontSize}
                    onChange={(e) => setStyles(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                    className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Weight selector */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">Font Weight</label>
                  <div className="flex flex-wrap gap-1">
                    {selectedFont.weights.map((wt) => (
                      <button
                        key={wt}
                        onClick={() => setStyles(prev => ({ ...prev, fontWeight: wt }))}
                        className={`text-[10px] px-2 py-1 rounded-md border font-bold transition-all cursor-pointer ${
                          styles.fontWeight === wt
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {wt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Posture, Transform & Decoration */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">Posture</label>
                    <div className="grid grid-cols-2 p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                      <button
                        onClick={() => setStyles(prev => ({ ...prev, fontStyle: 'normal' }))}
                        className={`text-[9px] py-1 rounded-md font-bold transition-all ${
                          styles.fontStyle === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Reg
                      </button>
                      <button
                        onClick={() => setStyles(prev => ({ ...prev, fontStyle: 'italic' }))}
                        className={`text-[9px] py-1 rounded-md font-bold italic transition-all ${
                          styles.fontStyle === 'italic' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Ital
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">Transform</label>
                    <select
                      value={styles.textTransform}
                      onChange={(e) => setStyles(prev => ({ ...prev, textTransform: e.target.value as StyleState['textTransform'] }))}
                      className="w-full text-[10px] font-bold px-2 py-1.5 rounded-md border border-slate-800 bg-slate-950 text-slate-300 cursor-pointer"
                    >
                      <option value="none">Normal</option>
                      <option value="uppercase">Uppercase</option>
                      <option value="capitalize">Capitalize</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">Decor</label>
                    <select
                      value={styles.textDecoration}
                      onChange={(e) => setStyles(prev => ({ ...prev, textDecoration: e.target.value as StyleState['textDecoration'] }))}
                      className="w-full text-[10px] font-bold px-2 py-1.5 rounded-md border border-slate-800 bg-slate-950 text-slate-300 cursor-pointer"
                    >
                      <option value="none">None</option>
                      <option value="underline">Underline</option>
                      <option value="line-through">Line</option>
                      <option value="overline">Overline</option>
                    </select>
                  </div>
                </div>

                {/* Letter Spacing */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">
                    <span>Letter Spacing</span>
                    <span className="font-mono text-indigo-300">{styles.letterSpacing}px</span>
                  </div>
                  <input
                    type="range"
                    min="-2"
                    max="10"
                    value={styles.letterSpacing}
                    onChange={(e) => setStyles(prev => ({ ...prev, letterSpacing: parseInt(e.target.value) }))}
                    className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Line Height */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">
                    <span>Line Height</span>
                    <span className="font-mono text-indigo-300">{styles.lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="2.5"
                    step="0.1"
                    value={styles.lineHeight}
                    onChange={(e) => setStyles(prev => ({ ...prev, lineHeight: parseFloat(e.target.value) }))}
                    className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                 {/* Shadow Glow option */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-display">Shadow Glow</label>
                    <select
                      value={styles.textShadow}
                      onChange={(e) => parsePresetAndSetShadow(e.target.value)}
                      className="w-full text-[10px] font-bold py-1.5 px-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 cursor-pointer"
                    >
                      {SHADOW_PRESETS.map((sh) => (
                        <option key={sh.label} value={sh.value}>{sh.label}</option>
                      ))}
                      {!SHADOW_PRESETS.some((sh) => sh.value === styles.textShadow) && styles.textShadow !== 'none' && (
                        <option value={styles.textShadow}>Custom Shadow</option>
                      )}
                    </select>
                  </div>

                  {/* Inline sliders in dark theme styling for Fullscreen custom glow settings */}
                  <div className="p-2 border border-slate-800/85 bg-slate-950/40 rounded-lg space-y-2">
                    <span className="block text-[9px] font-extrabold uppercase tracking-widest text-indigo-400 font-display">
                      Custom Glow Params
                    </span>

                    {/* Blur Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400">
                        <span>Blur Radius</span>
                        <span className="font-mono text-indigo-300">{styles.shadowBlur ?? 8}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={styles.shadowBlur ?? 8}
                        onChange={(e) => updateShadowStyle({ shadowBlur: parseInt(e.target.value) })}
                        className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                      />
                    </div>

                    {/* Offsets inputs */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400">
                          <span>X Offset</span>
                          <span className="font-mono text-indigo-300">{styles.shadowOffsetX ?? 0}px</span>
                        </div>
                        <input
                          type="range"
                          min="-20"
                          max="20"
                          value={styles.shadowOffsetX ?? 0}
                          onChange={(e) => updateShadowStyle({ shadowOffsetX: parseInt(e.target.value) })}
                          className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400">
                          <span>Y Offset</span>
                          <span className="font-mono text-indigo-300">{styles.shadowOffsetY ?? 0}px</span>
                        </div>
                        <input
                          type="range"
                          min="-20"
                          max="20"
                          value={styles.shadowOffsetY ?? 0}
                          onChange={(e) => updateShadowStyle({ shadowOffsetY: parseInt(e.target.value) })}
                          className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                        />
                      </div>
                    </div>

                    {/* Color and Opacity */}
                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-900">
                      <div className="space-y-0.5">
                        <span className="block text-[8px] font-extrabold uppercase tracking-wider text-slate-500">Color</span>
                        <div className="flex items-center gap-1">
                          <div className="relative h-5 w-5 rounded border border-slate-800 overflow-hidden shrink-0">
                            <input
                              type="color"
                              value={styles.shadowColor ?? '#6366f1'}
                              onChange={(e) => updateShadowStyle({ shadowColor: e.target.value })}
                              className="absolute inset-0 h-8 w-8 -translate-x-1.5 -translate-y-1.5 cursor-pointer"
                            />
                          </div>
                          <input
                            type="text"
                            value={(styles.shadowColor ?? '#6366f1').toUpperCase()}
                            onChange={(e) => updateShadowStyle({ shadowColor: e.target.value })}
                            className="w-full text-[8px] font-mono px-1 py-0.5 rounded border border-slate-800 bg-slate-950 text-slate-300 animate-fade-in"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400">
                          <span>Opacity</span>
                          <span className="font-mono text-indigo-300">{Math.round((styles.shadowOpacity ?? 0.6) * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={styles.shadowOpacity ?? 0.6}
                          onChange={(e) => updateShadowStyle({ shadowOpacity: parseFloat(e.target.value) })}
                          className="w-full accent-indigo-500 cursor-pointer h-1 bg-slate-800 rounded-lg appearance-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Swapper */}
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 active:bg-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all flex items-center justify-center gap-1.5 font-display cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" /> Restore Default Parameters
                  </button>
                </div>

                {/* Download Font Block (Fullscreen Sidebar version) */}
                {selectedFont.isGoogleFont && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                    <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#818cf8] font-display">
                      Font Asset Export
                    </span>
                    <button
                      id="download-styler-fullscreen-font-btn"
                      onClick={handleDownloadFont}
                      disabled={isDownloading}
                      className={`w-full py-2 px-3 rounded-xl font-bold uppercase text-[10px] tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isDownloading
                          ? 'bg-slate-900 border border-slate-850 text-slate-500 cursor-not-allowed'
                          : downloadSuccess
                          ? 'bg-emerald-600 border border-emerald-600 text-white'
                          : 'bg-indigo-650 hover:bg-indigo-700 text-white shadow-xs'
                      }`}
                    >
                      {isDownloading ? (
                        <>
                          <RefreshCw className="h-3 w-3 animate-spin" />
                          Downloading...
                        </>
                      ) : downloadSuccess ? (
                        <>
                          <Check className="h-3 w-3" />
                          Downloaded!
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          Download .woff2
                        </>
                      )}
                    </button>
                    {downloadError && (
                      <p className="text-red-400 font-semibold text-[9px] mt-1 bg-red-950/25 p-1 px-2 rounded-lg border border-red-900/40 text-center">
                        ⚠️ {downloadError}
                      </p>
                    )}
                  </div>
                )}

                {/* Specimen Proof Block (Fullscreen Sidebar version) */}
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
                  <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#818cf8] font-display">
                    Type Specimen Proof
                  </span>
                  <button
                    id="generate-styler-fullscreen-specimen-btn"
                    onClick={() => setIsSpecimenModalOpen(true)}
                    className="w-full py-2 px-3 rounded-xl font-bold uppercase text-[10px] tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-slate-300 hover:text-white"
                  >
                    <Type className="h-3.5 w-3.5 text-indigo-405" />
                    <span>Specimen Sheet</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Custom Rendering Viewport */}
              <div 
                className={`flex-1 overflow-y-auto p-6 md:p-12 relative ${
                  previewThemeMode === 'dark' 
                    ? 'bg-slate-950 text-slate-100' 
                    : previewThemeMode === 'light' 
                    ? 'bg-slate-50 text-slate-900' 
                    : ''
                }`}
                style={previewThemeMode === 'custom' ? {
                  backgroundColor: styles.backgroundColor,
                  color: styles.color
                } : undefined}
              >
                
                {/* Visual feedback notice of layout zoom styling ratio */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider select-none bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Laptop className="h-3 w-3" /> Live Context
                </div>

                {/* Render Selected Template */}
                
                {/* SaaS Marketing Layout */}
                {activePreviewTemplate === 'saas' && (
                  <div className="max-w-4xl mx-auto space-y-16 animate-fade-in py-6">
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                        ✨ Next-Generation Product Launch
                      </span>
                      
                      {/* Main Giant Heading with user styled typography config */}
                      <h1 
                        className={`leading-tight uppercase tracking-tight`}
                        style={{
                          fontFamily: selectedFont.stack,
                          fontSize: `${styles.fontSize * 1.1}px`,
                          fontWeight: styles.fontWeight,
                          fontStyle: styles.fontStyle,
                          letterSpacing: `${styles.letterSpacing}px`,
                          lineHeight: styles.lineHeight,
                          textTransform: styles.textTransform,
                          textDecoration: styles.textDecoration,
                          textShadow: styles.textShadow,
                        }}
                      >
                        Unleash your visual ideas into the cloud
                      </h1>

                      {/* Paragraph styled elegantly */}
                      <p 
                        className="max-w-2xl mx-auto opacity-80 animate-fade-in"
                        style={{
                          fontFamily: selectedFont.stack,
                          fontSize: `${Math.max(15, styles.fontSize * 0.38)}px`,
                          fontWeight: styles.fontWeight > 500 ? 300 : styles.fontWeight,
                          fontStyle: styles.fontStyle,
                          letterSpacing: `${styles.letterSpacing * 0.5}px`,
                          lineHeight: styles.lineHeight,
                        }}
                      >
                        A developer environment for prototyping interactive interfaces and inspecting local safe font metrics instantly. Seamless deployment pathways for high-concurrency web assets.
                      </p>

                      {/* CTA Action button with matching font configuration */}
                      <div className="pt-4 flex flex-wrap justify-center gap-4 select-none">
                        <button 
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-xs text-white uppercase font-black tracking-widest rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                          style={{
                            fontFamily: selectedFont.stack,
                            letterSpacing: `${styles.letterSpacing * 0.5}px`,
                          }}
                        >
                          Initialize Live Suite
                        </button>
                        <button 
                          className={`px-6 py-3 border text-xs uppercase font-black tracking-widest rounded-xl transition-all cursor-pointer ${
                            previewThemeMode === 'light' 
                              ? 'border-slate-300 hover:bg-slate-100 text-slate-800' 
                              : 'border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white'
                          }`}
                          style={{
                            fontFamily: selectedFont.stack,
                            letterSpacing: `${styles.letterSpacing * 0.5}px`,
                          }}
                        >
                          Read Documentation
                        </button>
                      </div>
                    </div>

                    {/* Bento Features Area */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-4xl">
                      {[
                        { title: "Real-time Auditing", desc: "View security scores and strict OS compatibility tables immediately without leaving your coding setup." },
                        { title: "Developer Exports", desc: "Instantly copy standard responsive CSS properties, React components containing props, and inline utility wrappers." },
                        { title: "Zero Latency Build", desc: "Pre-compiled system frameworks and Google safe subsets that prevent page-flickering and rendering blockades." }
                      ].map((item, index) => (
                        <div 
                          key={index} 
                          className={`p-6 border-2 rounded-2xl flex flex-col justify-between ${
                            previewThemeMode === 'light' 
                              ? 'bg-white border-slate-200' 
                              : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          <h3 
                            className="text-lg font-black tracking-tight"
                            style={{
                              fontFamily: selectedFont.stack,
                              fontSize: `${Math.max(16, styles.fontSize * 0.42)}px`,
                              fontWeight: styles.fontWeight,
                              fontStyle: styles.fontStyle,
                              textTransform: styles.textTransform !== 'none' ? styles.textTransform : undefined,
                              textDecoration: styles.textDecoration !== 'none' ? styles.textDecoration : undefined
                            }}
                          >
                            {item.title}
                          </h3>
                          <p 
                            className="mt-3 text-xs leading-relaxed opacity-75"
                            style={{ fontFamily: selectedFont.stack }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Editorial Layout */}
                {activePreviewTemplate === 'editorial' && (
                  <div className="max-w-3xl mx-auto space-y-10 animate-fade-in py-4">
                    {/* Issue Label */}
                    <div className="text-center font-mono text-[10px] tracking-widest uppercase opacity-75 select-none text-slate-500">
                      THE TYPOGRAPHICAL CHRONICLE &bull; ISSUE NO. IV
                    </div>

                    {/* Rich Article Title */}
                    <h1 
                      className="text-center leading-tight tracking-tight"
                      style={{
                        fontFamily: selectedFont.stack,
                        fontSize: `${styles.fontSize * 0.95}px`,
                        fontWeight: styles.fontWeight,
                        fontStyle: styles.fontStyle,
                        letterSpacing: `${styles.letterSpacing}px`,
                        lineHeight: styles.lineHeight,
                        textTransform: styles.textTransform,
                        textDecoration: styles.textDecoration,
                        textShadow: styles.textShadow,
                      }}
                    >
                      How Fine-Tuning Type Alters the Subconscious Perception of a Brand
                    </h1>

                    {/* Byline */}
                    <div className="flex justify-center items-center gap-3 text-xs opacity-85 py-1 border-y border-dashed border-slate-800/40">
                      <span>Article by <strong>Harrison Cole</strong></span>
                      <span>&bull;</span>
                      <span>Published Summer 2026</span>
                    </div>

                    {/* Large Quote / Lead Text */}
                    <p 
                      className="text-lg italic leading-relaxed border-l-4 border-indigo-500 pl-4 opacity-90 max-w-2xl mx-auto font-display"
                      style={{
                        fontFamily: selectedFont.stack,
                        fontWeight: styles.fontWeight > 500 ? 500 : styles.fontWeight,
                        lineHeight: styles.lineHeight,
                      }}
                    >
                      "The visual atmosphere is forged entirely in the shapes of your characters. To neglect alignment, weight posture, and letter-spacing is to build a beautiful room and turn off the lights."
                    </p>

                    {/* Main Body Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-justify opacity-80">
                      <p style={{ fontFamily: selectedFont.stack }}>
                        Every character carries a historical weight. When we render text on high-density displays, the spacing between stems and the rhythm of ascenders dictates reading speed, user fatigue, and emotional resonance. The font selection determines whether readers perceive information as trusted journalism, advanced technical data, or artwork.
                      </p>
                      <p style={{ fontFamily: selectedFont.stack }}>
                        By offering responsive CSS playgrounds where creators customize and inspect falling arrays immediately, developers bridge the critical gap between visual designers and layout engineers. It guarantees that our aesthetic intent remains crisp, robust, and safe across multiple operating system variants globally.
                      </p>
                    </div>
                  </div>
                )}

                {/* UI Bento Card Layout */}
                {activePreviewTemplate === 'ui-cards' && (
                  <div className="max-w-5xl mx-auto space-y-12 animate-fade-in py-6">
                    <div className="text-center space-y-2">
                      <h2 
                        className="tracking-tight uppercase font-black font-display"
                        style={{
                          fontFamily: selectedFont.stack,
                          fontSize: `${styles.fontSize * 0.8}px`,
                          fontWeight: styles.fontWeight,
                        }}
                      >
                        Choose your workflow
                      </h2>
                      <p className="text-xs opacity-75 max-w-md mx-auto" style={{ fontFamily: selectedFont.stack }}>
                        Scale up seamlessly from lightweight sandboxes to full-stack team workspaces.
                      </p>
                    </div>

                    {/* Grid cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      {[
                        { tier: "Freelance", price: "$12", isNew: false, desc: "Perfect for single practitioners exploring local font combinations recursively." },
                        { tier: "Creative Agency", price: "$49", isNew: true, desc: "Collaborate in real-time, save unlimited customized snippets, and sync with Teams." },
                        { tier: "Enterprise Scale", price: "$189", isNew: false, desc: "Fully isolated custom databases, dedicated API metrics, and premier safety ratios." }
                      ].map((card, i) => (
                        <div 
                          key={i} 
                          className={`p-6 border-2 rounded-3xl relative flex flex-col justify-between ${
                            card.isNew 
                              ? 'border-indigo-650 bg-indigo-950/20 ring-1 ring-indigo-500/50' 
                              : previewThemeMode === 'light' 
                              ? 'bg-white border-slate-200' 
                              : 'bg-slate-900 border-slate-800'
                          }`}
                        >
                          {card.isNew && (
                            <span className="absolute -top-3 left-6 inline-flex px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase text-white bg-indigo-600 tracking-wider font-display">
                              POPULAR
                            </span>
                          )}

                          <div className="space-y-4">
                            <h3 
                              className="text-md uppercase"
                              style={{
                                fontFamily: selectedFont.stack,
                                fontWeight: styles.fontWeight,
                                letterSpacing: `${styles.letterSpacing * 0.5}px`
                              }}
                            >
                              {card.tier}
                            </h3>
                            <div className="flex items-baseline gap-1">
                              <span 
                                className="text-4xl font-extrabold font-display leading-none"
                                style={{ fontFamily: selectedFont.stack }}
                              >
                                {card.price}
                              </span>
                              <span className="text-xs opacity-70 font-sans">/ mo</span>
                            </div>
                            <p 
                              className="text-xs leading-relaxed opacity-75 animate-fade-in"
                              style={{ fontFamily: selectedFont.stack }}
                            >
                              {card.desc}
                            </p>
                          </div>

                          <div className="pt-6">
                            <button 
                              className={`w-full py-2.5 rounded-xl text-xs uppercase font-extrabold tracking-wider transition-all cursor-pointer ${
                                card.isNew 
                                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                                  : 'bg-slate-800 hover:bg-slate-705 text-slate-100'
                              }`}
                              style={{
                                fontFamily: selectedFont.stack,
                                letterSpacing: `${styles.letterSpacing * 0.5}px`
                              }}
                            >
                              Select {card.tier}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Modal Footer status bar */}
            <div className="p-4 bg-slate-900 border-t-2 border-slate-800 flex justify-between items-center text-xs text-slate-400 font-display shrink-0 select-none">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Context rendering active</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span>Font Family: <strong>{selectedFont.stack}</strong></span>
              </div>
            </div>

          </div>
        </div>
      )}

      <SpecimenModal
        isOpen={isSpecimenModalOpen}
        onClose={() => setIsSpecimenModalOpen(false)}
        font={selectedFont}
        styleState={styles}
      />
    </div>
  );
}
