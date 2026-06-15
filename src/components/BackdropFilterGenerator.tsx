import React, { useState } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Layers, Code, Palette, HelpCircle, 
  Copy, Check, Image, Grid, Eye, CheckCircle, Smartphone, Compass,
  User, Lock, Play, SkipBack, SkipForward, Volume2, Sun, RefreshCw
} from 'lucide-react';

interface FilterPreset {
  name: string;
  description: string;
  blur: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  hueRotate: number;
  saturate: number;
  sepia: number;
  invert: number;
  overlayColor: string;
  overlayOpacity: number;
}

const BACKDROP_PRESETS: FilterPreset[] = [
  {
    name: 'Frosted Glass',
    description: 'Clean Apple-inspired soft frosted diffusion surface',
    blur: 16, brightness: 110, contrast: 100, grayscale: 0, hueRotate: 0, saturate: 125, sepia: 0, invert: 0,
    overlayColor: '#ffffff',
    overlayOpacity: 0.3
  },
  {
    name: 'Obsidian Velvet',
    description: 'Deep sleek high-contrast dark-mode filter glass',
    blur: 24, brightness: 60, contrast: 110, grayscale: 0, hueRotate: 0, saturate: 100, sepia: 0, invert: 0,
    overlayColor: '#0f172a',
    overlayOpacity: 0.65
  },
  {
    name: 'Saturated Cyberpunk',
    description: 'Ultravivid color-shift neon party glass',
    blur: 8, brightness: 105, contrast: 120, grayscale: 0, hueRotate: 140, saturate: 240, sepia: 0, invert: 0,
    overlayColor: '#ffffff',
    overlayOpacity: 0.15
  },
  {
    name: 'Warm Sepia Amber',
    description: 'Rich nostalgic organic baked-terracotta tint',
    blur: 10, brightness: 95, contrast: 105, grayscale: 0, hueRotate: 10, saturate: 110, sepia: 75, invert: 0,
    overlayColor: '#f59e0b',
    overlayOpacity: 0.15
  },
  {
    name: 'Ethereal Mint',
    description: 'Refreshing cool pale emerald atmosphere',
    blur: 16, brightness: 105, contrast: 95, grayscale: 0, hueRotate: 90, saturate: 130, sepia: 0, invert: 0,
    overlayColor: '#ecfdf5',
    overlayOpacity: 0.25
  },
  {
    name: 'Inverted X-Ray',
    description: 'Subversive artistic full phase reversal filter',
    blur: 8, brightness: 100, contrast: 105, grayscale: 0, hueRotate: 180, saturate: 100, sepia: 0, invert: 100,
    overlayColor: '#000000',
    overlayOpacity: 0.2
  },
  {
    name: 'Dreamy Lavender',
    description: 'Elegant soft holographic pale-violet aura',
    blur: 20, brightness: 115, contrast: 100, grayscale: 0, hueRotate: 275, saturate: 150, sepia: 0, invert: 0,
    overlayColor: '#faf5ff',
    overlayOpacity: 0.35
  },
  {
    name: 'Subtle Haze',
    description: 'Ultra minimal diffusion with maximum clarity',
    blur: 4, brightness: 100, contrast: 100, grayscale: 10, hueRotate: 0, saturate: 100, sepia: 0, invert: 0,
    overlayColor: '#ffffff',
    overlayOpacity: 0.1
  }
];

type BackgroundType = 'aurora' | 'cyber' | 'stripes' | 'geometric';
type MockupType = 'profile' | 'login' | 'music' | 'empty';

export default function BackdropFilterGenerator() {
  // Backdrop filter individual sliders
  const [blur, setBlur] = useState<number>(12);
  const [brightness, setBrightness] = useState<number>(105);
  const [contrast, setContrast] = useState<number>(100);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [hueRotate, setHueRotate] = useState<number>(0);
  const [saturate, setSaturate] = useState<number>(120);
  const [sepia, setSepia] = useState<number>(0);
  const [invert, setInvert] = useState<number>(0);

  // Card parameters
  const [overlayColor, setOverlayColor] = useState<string>('#ffffff');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.3);
  const [cornerRadius, setCornerRadius] = useState<number>(24);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [borderColor, setBorderColor] = useState<string>('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState<number>(0.4);
  
  // App states
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('aurora');
  const [mockupType, setMockupType] = useState<MockupType>('profile');
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);

  // Copy statuses
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react'>('css');

  // Hex color to RGBA helper
  const hexToRgba = (hex: string, alpha: number): string => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
    }
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
  };

  // String builder for filter declarations
  const buildFilterCssString = () => {
    const parts = [];
    if (blur > 0) parts.push(`blur(${blur}px)`);
    if (brightness !== 100) parts.push(`brightness(${brightness}%)`);
    if (contrast !== 100) parts.push(`contrast(${contrast}%)`);
    if (grayscale > 0) parts.push(`grayscale(${grayscale}%)`);
    if (hueRotate > 0) parts.push(`hue-rotate(${hueRotate}deg)`);
    if (saturate !== 100) parts.push(`saturate(${saturate}%)`);
    if (sepia > 0) parts.push(`sepia(${sepia}%)`);
    if (invert > 0) parts.push(`invert(${invert}%)`);
    return parts.length > 0 ? parts.join(' ') : 'none';
  };

  const currentFilterString = buildFilterCssString();
  const bgOverlayRgba = hexToRgba(overlayColor, overlayOpacity);
  const borderRgba = hexToRgba(borderColor, borderOpacity);

  // Presets trigger
  const applyPreset = (index: number) => {
    setActivePresetIndex(index);
    const p = BACKDROP_PRESETS[index];
    setBlur(p.blur);
    setBrightness(p.brightness);
    setContrast(p.contrast);
    setGrayscale(p.grayscale);
    setHueRotate(p.hueRotate);
    setSaturate(p.saturate);
    setSepia(p.sepia);
    setInvert(p.invert);
    setOverlayColor(p.overlayColor);
    setOverlayOpacity(p.overlayOpacity);

    // Contextually match aesthetic border triggers
    if (p.overlayColor === '#0f172a') {
      setBorderColor('#475569');
      setBorderOpacity(0.3);
    } else {
      setBorderColor('#ffffff');
      setBorderOpacity(0.4);
    }
  };

  // Reset function
  const handleReset = () => {
    setBlur(12);
    setBrightness(105);
    setContrast(100);
    setGrayscale(0);
    setHueRotate(0);
    setSaturate(120);
    setSepia(0);
    setInvert(0);
    setOverlayColor('#ffffff');
    setOverlayOpacity(0.3);
    setCornerRadius(24);
    setBorderWidth(1);
    setBorderColor('#ffffff');
    setBorderOpacity(0.4);
    setBackgroundType('aurora');
    setMockupType('profile');
    setActivePresetIndex(0);
  };

  // Exporters formatting
  const cssCode = `/* CSS Backdrop Filter Container styling */
background-color: ${bgOverlayRgba};
border-radius: ${cornerRadius}px;
border: ${borderWidth}px solid ${borderRgba};

/* Dynamic modern backdrop filtering declarations */
backdrop-filter: ${currentFilterString};
-webkit-backdrop-filter: ${currentFilterString};`;

  // Dynamic Tailwind construction
  const getTailwindCode = () => {
    const bgVal = `bg-[${bgOverlayRgba.replace(/\s+/g, '')}]`;
    const borderVal = `border-[${borderWidth}px] border-[${borderRgba.replace(/\s+/g, '')}]`;
    const radiusVal = `rounded-[${cornerRadius}px]`;
    
    // Arbitrary background filter string setup
    const twBackdrop = `backdrop-filter-[${currentFilterString.replace(/\s+/g, '_')}]`;

    return `<div class="${bgVal} ${radiusVal} ${borderVal} ${twBackdrop} p-8 shadow-2xl">\n  <!-- Interactive Card Content -->\n</div>`;
  };

  const reactCode = `const glassBackdropStyle = {
  backgroundColor: '${bgOverlayRgba}',
  borderRadius: '${cornerRadius}px',
  border: '${borderWidth}px solid ${borderRgba}',
  backdropFilter: '${currentFilterString}',
  WebkitBackdropFilter: '${currentFilterString}'
};

// Render React component
<div style={glassBackdropStyle}>
  <p>Overlay Content</p>
</div>`;

  const copyToClipboard = (text: string, format: 'css' | 'tailwind' | 'react') => {
    navigator.clipboard.writeText(text);
    if (format === 'css') {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } else if (format === 'tailwind') {
      setCopiedTailwind(true);
      setTimeout(() => setCopiedTailwind(false), 2000);
    } else {
      setCopiedReact(true);
      setTimeout(() => setCopiedReact(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="backdrop-filter-workspace">
      
      {/* QUICK PRESETS CAROUSEL */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Palette className="h-4.5 w-4.5 text-indigo-500" />
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-205 font-display">
                Tactical Glass Presets
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display font-medium mt-0.5">
                Switch category and load sample backdrop filter parameters
              </p>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-55 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-black uppercase tracking-wider transition-all duration-150 cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="h-3 w-3" /> Reset Playground
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {BACKDROP_PRESETS.map((preset, idx) => {
            const isSelected = activePresetIndex === idx;
            return (
              <button
                key={preset.name}
                onClick={() => applyPreset(idx)}
                className={`p-3 rounded-xl border-2 transition-all text-left flex flex-col justify-between h-24 relative cursor-pointer ${
                  isSelected 
                    ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-md ring-2 ring-indigo-500/25' 
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 hover:bg-white hover:scale-[1.01]'
                }`}
              >
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-900 dark:text-white leading-tight">
                    {preset.name}
                  </p>
                  <p className="text-[9px] text-slate-500 leading-normal leading-tight line-clamp-2">
                    {preset.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[8px] font-mono text-indigo-600 dark:text-indigo-400 font-extrabold pb-0.5 mt-2">
                  <span>blur: {preset.blur}px</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE WORKSPACE SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* CONTROL DECK (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* BACKDROP FILTER CONTROLS */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
                <Sliders className="h-4 w-4 text-indigo-500" /> Backdrop Filter Coefficients
              </h3>
              <span className="text-[9px] font-mono font-extrabold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                Filter layers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Blur slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-400">
                  <span>Blur (Hard To Soft)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{blur}px</span>
                </div>
                <input
                  type="range" min="0" max="40" step="1" value={blur}
                  onChange={(e) => { setBlur(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Brightness slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-400">
                  <span>Brightness</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{brightness}%</span>
                </div>
                <input
                  type="range" min="0" max="250" step="5" value={brightness}
                  onChange={(e) => { setBrightness(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Contrast slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-400">
                  <span>Contrast</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{contrast}%</span>
                </div>
                <input
                  type="range" min="0" max="250" step="5" value={contrast}
                  onChange={(e) => { setContrast(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Saturation slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-400">
                  <span>Saturation</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{saturate}%</span>
                </div>
                <input
                  type="range" min="0" max="300" step="5" value={saturate}
                  onChange={(e) => { setSaturate(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Hue Rotate slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-400">
                  <span>Hue Rotate</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{hueRotate}°</span>
                </div>
                <input
                  type="range" min="0" max="360" step="5" value={hueRotate}
                  onChange={(e) => { setHueRotate(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Grayscale slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-400">
                  <span>Grayscale</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{grayscale}%</span>
                </div>
                <input
                  type="range" min="0" max="100" step="5" value={grayscale}
                  onChange={(e) => { setGrayscale(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Sepia slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-655 dark:text-slate-400">
                  <span>Sepia</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{sepia}%</span>
                </div>
                <input
                  type="range" min="0" max="100" step="5" value={sepia}
                  onChange={(e) => { setSepia(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Invert slider */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                <div className="flex justify-between items-center text-[10.5px] font-black uppercase tracking-wider text-slate-655 dark:text-slate-400">
                  <span>Invert Colors</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{invert}%</span>
                </div>
                <input
                  type="range" min="0" max="100" step="5" value={invert}
                  onChange={(e) => { setInvert(Number(e.target.value)); setActivePresetIndex(-1); }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

            </div>

          </div>

          {/* OVERLAY SURFACE MODIFIERS */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5 animate-fade-in">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
                <Layers className="h-4 w-4 text-indigo-500" /> Card Glass Surface Fine-Tuning
              </h3>
              <span className="text-[9px] font-mono font-extrabold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                Surface border & mask
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Overlay Glass and border Colors */}
              <div className="space-y-4">
                
                {/* Surface background color */}
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Glass Surface Hex</span>
                    <span className="text-[9px] text-slate-400">overlay tint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text" value={overlayColor}
                      onChange={(e) => { setOverlayColor(e.target.value); setActivePresetIndex(-1); }}
                      className="w-20 px-1 py-0.5 text-xs font-mono font-bold text-center uppercase tracking-wide bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded"
                    />
                    <input
                      type="color" value={overlayColor}
                      onChange={(e) => { setOverlayColor(e.target.value); setActivePresetIndex(-1); }}
                      className="w-7 h-7 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>

                {/* Glass opacity alpha */}
                <div className="bg-slate-55 dark:bg-slate-1000 p-3 rounded-lg border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                    <span>Glass opacity tint</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{Math.round(overlayOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range" min="0" max="1.0" step="0.05" value={overlayOpacity}
                    onChange={(e) => { setOverlayOpacity(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-830 rounded"
                  />
                </div>

              </div>

              {/* Borders, Corners radius, Width parameters */}
              <div className="space-y-4">
                
                {/* Border thickness color */}
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">High contrast frame</span>
                    <span className="text-[9px] text-slate-400">border thickness</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setBorderWidth(prev => Math.max(0, prev - 1))}
                      className="w-6 h-6 rounded bg-slate-150 dark:bg-slate-800 text-xs font-black cursor-pointer"
                    >-</button>
                    <span className="font-mono text-xs font-bold w-6 text-center">{borderWidth}px</span>
                    <button 
                      onClick={() => setBorderWidth(prev => Math.min(6, prev + 1))}
                      className="w-6 h-6 rounded bg-slate-150 dark:bg-slate-800 text-xs font-black cursor-pointer"
                    >+</button>
                  </div>
                </div>

                {/* Corners curves */}
                <div className="bg-slate-55 dark:bg-slate-1000 p-3 rounded-lg border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                    <span>corner curvature</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{cornerRadius}px</span>
                  </div>
                  <input
                    type="range" min="0" max="48" step="1" value={cornerRadius}
                    onChange={(e) => setCornerRadius(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-830 rounded"
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* PREVIEW STAGE (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* DYNAMIC BACKDROP PREVIEW AREA */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between overflow-hidden relative">
            
            <div className="flex items-center justify-between w-full mb-4 z-10">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                <Eye className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[9.5px] font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-350">
                  Interactive Glass Stage
                </span>
              </div>

              {/* Sizing options */}
              <div className="flex gap-1">
                {(['aurora', 'cyber', 'geometric', 'stripes'] as BackgroundType[]).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBackgroundType(bg)}
                    className={`px-1.5 py-0.5 text-[8.5px] font-black uppercase rounded cursor-pointer transition-all ${
                      backgroundType === bg
                        ? 'bg-indigo-600 text-white font-black shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN PORTAL AREA WITH SELECTED BACKDROP PATTERN */}
            <div className="relative w-full h-[370px] rounded-xl overflow-hidden shadow-inner border border-slate-200/80 dark:border-slate-800 flex items-center justify-center">
              
              {/* BACKGROUND MOTIF 1: AURORA AMBIENT ORBS */}
              {backgroundType === 'aurora' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-450 via-zinc-900 to-indigo-900 overflow-hidden">
                  <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-cyan-400 filter blur-3xl opacity-60 animate-pulse" />
                  <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-fuchsia-500 filter blur-3xl opacity-50" />
                  <div className="absolute top-1/4 left-1/3 w-36 h-36 rounded-full bg-yellow-450 filter blur-3xl opacity-40 animate-bounce" style={{ animationDuration: '8s' }} />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              {/* BACKGROUND MOTIF 2: CYBER BRIGHT GRADIENT */}
              {backgroundType === 'cyber' && (
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-pink-500 to-emerald-400">
                  <div className="absolute top-0 right-0 w-full h-full opacity-35 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                  <div className="absolute inset-x-0 top-1/3 h-40 bg-gradient-to-r from-blue-600 to-amber-400 blur-2xl rotate-12 scale-110" />
                </div>
              )}

              {/* BACKGROUND MOTIF 3: GEOMETRIC RETRO GRID */}
              {backgroundType === 'geometric' && (
                <div className="absolute inset-0 bg-slate-950 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4px_24px] filter blur-xs" />
                  <div className="w-80 h-80 rounded-full border-[32px] border-indigo-500/20 animate-spin" style={{ animationDuration: '24s' }} />
                  <div className="absolute w-40 h-40 bg-amber-500 rounded-none rotate-45 opacity-60 mix-blend-color-dodge blur-lg" />
                  <div className="absolute bottom-4 left-6 w-16 h-16 bg-rose-500 rounded-full opacity-40 filter blur-md" />
                </div>
              )}

              {/* BACKGROUND MOTIF 4: COLLAPSING VERTICAL STRIPES */}
              {backgroundType === 'stripes' && (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-rose-500 to-violet-900 flex justify-between px-10">
                  <div className="w-1.5 h-full bg-white/20 transform -skew-x-12" />
                  <div className="w-1.5 h-full bg-white/25 transform -skew-x-12" />
                  <div className="w-1.5 h-full bg-white/10 transform -skew-x-12" />
                  <div className="w-12 h-full bg-yellow-450 opacity-20 transform -skew-x-12" />
                  <div className="w-1.5 h-full bg-white/30 transform -skew-x-12" />
                  <div className="w-1.5 h-full bg-white/15 transform -skew-x-12" />
                </div>
              )}

              {/* DRAGGABLE / FIXED OVERLAY INTERACTIVE GLASS COMPONENT */}
              <div 
                style={{
                  backgroundColor: bgOverlayRgba,
                  borderRadius: `${cornerRadius}px`,
                  border: `${borderWidth}px solid ${borderRgba}`,
                  backdropFilter: currentFilterString,
                  WebkitBackdropFilter: currentFilterString,
                  width: '90%',
                  maxWidth: '300px',
                  transition: 'background-color 0.1s ease, border-radius 0.1s ease, backdrop-filter 0.15s ease'
                }}
                className="p-5 shadow-2xl relative select-none cursor-default text-left z-20 space-y-4"
              >
                
                {/* PROFILE CARD PREVIEW */}
                {mockupType === 'profile' && (
                  <div className="space-y-4 text-slate-800 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/35 border border-white/60 flex items-center justify-center font-bold font-display text-white shadow-sm overflow-hidden">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wide text-slate-900 dark:text-white leading-none">
                          Clarissa Vance
                        </h4>
                        <p className="text-[10px] text-slate-655 dark:text-slate-350 font-medium font-mono leading-none mt-1">
                          Platform Designer
                        </p>
                      </div>
                    </div>
                    <p className="text-[10.5px] leading-relaxed text-slate-700/90 dark:text-slate-200/90">
                      Generating premium glass panels directly inside client-side view grids using advanced CSS filter layers.
                    </p>
                    <div className="flex gap-2.5 pt-0.5">
                      <span className="text-[8px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-755 dark:text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded">
                        Vector mask
                      </span>
                      <span className="text-[8px] font-bold uppercase tracking-wider bg-white/20 text-slate-800 dark:text-slate-100 border border-white/20 px-2 py-0.5 rounded">
                        Acrylic UI
                      </span>
                    </div>
                  </div>
                )}

                {/* LOGIN CARD PREVIEW */}
                {mockupType === 'login' && (
                  <div className="space-y-3.5 text-slate-805 dark:text-white-90 pr-1">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wide text-slate-900 dark:text-white leading-none">
                        Access Console
                      </h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-300 font-medium leading-none mt-1.5">
                        Please insert authorization token key
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-1.5 px-2 bg-white/20 dark:bg-slate-950/20 border border-white/30 dark:border-slate-800 rounded-lg text-[9.5px]">
                        <User className="h-3 w-3 text-slate-500" />
                        <span className="opacity-75 text-slate-800 dark:text-slate-100 block">clarissa@design.dev</span>
                      </div>
                      <div className="flex items-center gap-2 p-1.5 px-2 bg-white/20 dark:bg-slate-950/20 border border-white/30 dark:border-slate-800 rounded-lg text-[9.5px]">
                        <Lock className="h-3 w-3 text-slate-500" />
                        <span className="opacity-55 block">••••••••••••••••</span>
                      </div>
                    </div>

                    <button 
                      type="button"
                      className="w-full py-1.5 text-[10px] font-bold text-center uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 duration-100 rounded-lg shadow-sm font-display cursor-pointer"
                    >
                      Establish Connection
                    </button>
                  </div>
                )}

                {/* MUSIC PLAYER PREVIEW */}
                {mockupType === 'music' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center relative overflow-hidden shadow-md">
                        <Play className="h-4 w-4 text-white fill-white animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-black uppercase tracking-wide text-slate-900 dark:text-white leading-none">
                          Hologram Sunset
                        </h4>
                        <p className="text-[9px] text-indigo-705 dark:text-indigo-400 font-bold font-mono leading-none mt-1.5">
                          Neon Coast Arcades
                        </p>
                      </div>
                    </div>

                    {/* Progress multi slider */}
                    <div className="space-y-1">
                      <div className="w-full h-1 bg-white/20 rounded overflow-hidden relative">
                        <div className="w-1/3 h-full bg-indigo-600 block" />
                      </div>
                      <div className="flex justify-between items-center text-[7.5px] font-mono opacity-75 font-bold">
                        <span>1:04</span>
                        <span>3:40</span>
                      </div>
                    </div>

                    {/* Player buttons */}
                    <div className="flex justify-center items-center gap-4 pt-1 border-t border-slate-900/5 dark:border-white/5">
                      <SkipBack className="h-3.5 w-3.5 text-slate-650 dark:text-slate-350 cursor-pointer" />
                      <div className="w-7 h-7 rounded-full bg-indigo-600/25 flex items-center justify-center cursor-pointer border border-indigo-500/20 shadow-xs">
                        <Play className="h-3 w-3 text-indigo-700 fill-indigo-750 ml-0.5 dark:text-indigo-400 dark:fill-indigo-400" />
                      </div>
                      <SkipForward className="h-3.5 w-3.5 text-slate-655 dark:text-slate-355 cursor-pointer" />
                    </div>
                  </div>
                )}

                {/* EMPTY BLANK BOX TO FOCUS PURE SHADOWS */}
                {mockupType === 'empty' && (
                  <div className="h-32 flex items-center justify-center">
                    <span className="text-[10px] font-black font-display text-slate-500 tracking-widest uppercase">
                      Pristine Filter Focus
                    </span>
                  </div>
                )}

              </div>

            </div>

            {/* PREVIEW BOTTOM SWITCHES */}
            <div className="flex items-center justify-between mt-4 border-t border-slate-100 dark:border-slate-800 pt-4 z-10">
              <span className="text-[10px] font-black font-display uppercase tracking-widest text-slate-500">
                Mockup Layout type
              </span>
              <div className="flex gap-1.5 p-0.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-150 dark:border-slate-850">
                {(['profile', 'login', 'music', 'empty'] as MockupType[]).map((val) => (
                  <button
                    key={val}
                    onClick={() => setMockupType(val)}
                    className={`px-2 py-0.5 text-[8.5px] font-black uppercase rounded transition-all cursor-pointer ${
                      mockupType === val
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CODE EXPORTER PANEL - Full Width 12-column Section */}
      <div className="bg-white dark:bg-slate-955 border-2 border-slate-205 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden animate-fade-in mt-8" id="backdrop-exporter">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Code className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              Real-time Export Panel
            </h3>
          </div>

          {/* Code format toggle buttons */}
          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1">
            {[
              { id: 'css', label: 'Standard CSS' },
              { id: 'tailwind', label: 'Tailwind CSS' },
              { id: 'react', label: 'React Inline' }
            ].map((recipeTab) => (
              <button
                key={recipeTab.id}
                onClick={() => setActiveCodeTab(recipeTab.id as any)}
                className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider font-display rounded-lg transition-all cursor-pointer ${
                  activeCodeTab === recipeTab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {recipeTab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Code presentation stage */}
        <div className="relative rounded-2xl bg-slate-950 p-5 mt-4 min-h-[140px] border border-slate-800 overflow-x-auto animate-fade-in animate-duration-150">
          
          {/* Float Copy Button */}
          <button
            onClick={() => {
              let textToCopy = '';
              if (activeCodeTab === 'css') textToCopy = cssCode;
              if (activeCodeTab === 'tailwind') textToCopy = getTailwindCode();
              if (activeCodeTab === 'react') textToCopy = reactCode;
              copyToClipboard(textToCopy, activeCodeTab);
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400 cursor-pointer transition-all z-10 flex items-center gap-1.5"
          >
            {(activeCodeTab === 'css' ? copiedCSS : activeCodeTab === 'tailwind' ? copiedTailwind : copiedReact) ? (
              <>
                <Check className="h-4.5 w-4.5 text-emerald-500" />
                <span className="text-[10px] font-black uppercase text-emerald-500 font-display">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4.5 w-4.5 text-indigo-400" />
                <span className="text-[10px] font-black uppercase font-display text-slate-300">Copy Code</span>
              </>
            )}
          </button>

          {/* Print Code segment */}
          <pre className="text-xs font-mono font-bold text-slate-300 text-left whitespace-pre select-all pt-4 leading-normal max-h-[350px] scrollbar-thin">
            {activeCodeTab === 'css' && cssCode}
            {activeCodeTab === 'tailwind' && getTailwindCode()}
            {activeCodeTab === 'react' && reactCode}
          </pre>
        </div>

      </div>

      {/* COMPACT INTUITIVE DESCRIPTION SECTION */}
      <div className="bg-slate-50 dark:bg-slate-955 rounded-2xl border-2 border-slate-205 dark:border-slate-850 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-left">
          <div className="bg-indigo-55 dark:bg-indigo-950 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900">
            <Compass className="h-6 w-6 text-indigo-600 dark:text-indigo-450" />
          </div>
          <div>
            <h4 className="text-xs uppercase font-black tracking-wider text-slate-850 dark:text-white">
              Understanding backdrop-filter Mechanics
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-550 dark:text-slate-400 max-w-2xl">
              Unlike normal filters which apply properties directly to an element itself, <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">backdrop-filter</span> alters everything lying in the layout layers directly *behind* the element. This makes it possible to create immersive translucent interfaces that stay fully readable over vivid gradients.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
