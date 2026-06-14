import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Square, Circle, Sliders, Copy, Check, RotateCcw, Compass, 
  Lightbulb, HelpCircle, Palette, Sparkles, Code, Layout, 
  Layers, Volume2, Play, SkipBack, SkipForward, ArrowUpLeft, 
  ArrowUpRight, ArrowDownLeft, ArrowDownRight, Sun, Moon, Info
} from 'lucide-react';

type ShapeStyle = 'flat' | 'concave' | 'convex' | 'pressed';
type LightDirection = 'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

interface ColorPreset {
  name: string;
  hex: string;
  description: string;
  isDark: boolean;
}

const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Classic Slate', hex: '#e0e0e0', description: 'Standard light-gray soft surface', isDark: false },
  { name: 'Sand Cream', hex: '#f0ebd8', description: 'Warm organic linen sand style', isDark: false },
  { name: 'Mint Ice', hex: '#ebf5ee', description: 'Cool refreshing pale green', isDark: false },
  { name: 'Deep Space', hex: '#1e1e24', description: 'Modern sleek dark graphite', isDark: true },
  { name: 'Cyber Navy', hex: '#2b3a4a', description: 'Sophisticated tech-navy blue', isDark: true },
  { name: 'Clay Peach', hex: '#f7d6c8', description: 'Earthy premium baked coral terracotta', isDark: false },
  { name: 'Dreamy Lavender', hex: '#eae4f2', description: 'Elegant soft violet tint', isDark: false },
  { name: 'Charcoal Night', hex: '#23272a', description: 'Deep low-contrast industrial neon background', isDark: true }
];

export default function NeumorphismGenerator() {
  const [baseColor, setBaseColor] = useState<string>('#e0e0e0');
  const [size, setSize] = useState<number>(180);
  const [radius, setRadius] = useState<number>(36);
  const [distance, setDistance] = useState<number>(16);
  const [blur, setBlur] = useState<number>(32);
  const [intensity, setIntensity] = useState<number>(15); // Percentage shadow intensity / delta color shift
  const [opacity, setOpacity] = useState<number>(1); // Shadow opacity scale for fine-grained alpha control
  const [shapeStyle, setShapeStyle] = useState<ShapeStyle>('flat');
  const [lightDir, setLightDir] = useState<LightDirection>('top-left');
  
  // Interactive preview child options
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [previewAddon, setPreviewAddon] = useState<'text' | 'music-player' | 'icon' | 'blank'>('text');
  
  // Exporter statuses
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);

  // Auto-blur sync lock standard (true by default: blur = 2x distance)
  const [syncBlur, setSyncBlur] = useState<boolean>(true);

  // Sync blur value when distance changes if sync lock enabled
  useEffect(() => {
    if (syncBlur) {
      setBlur(distance * 2);
    }
  }, [distance, syncBlur]);

  // Color modification helper
  const adjustColor = (hex: string, amount: number): string => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
    }
    let r = parseInt(cleanHex.substring(0, 2), 16);
    let g = parseInt(cleanHex.substring(2, 4), 16);
    let b = parseInt(cleanHex.substring(4, 6), 16);

    r = Math.min(255, Math.max(0, r + amount));
    g = Math.min(255, Math.max(0, g + amount));
    b = Math.min(255, Math.max(0, b + amount));

    const rr = r.toString(16).padStart(2, '0');
    const gg = g.toString(16).padStart(2, '0');
    const bb = b.toString(16).padStart(2, '0');

    return `#${rr}${gg}${bb}`;
  };

  // Convert Hex to RGBA for Opacity control
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

  // Calculate coordinates based on light direction
  const getShadowCoords = (dist: number) => {
    switch (lightDir) {
      case 'top-left':
        return { x1: dist, y1: dist, x2: -dist, y2: -dist };
      case 'top-right':
        return { x1: -dist, y1: dist, x2: dist, y2: -dist };
      case 'bottom-right':
        return { x1: -dist, y1: -dist, x2: dist, y2: dist };
      case 'bottom-left':
        return { x1: dist, y1: -dist, x2: -dist, y2: -dist };
    }
  };

  // Shadow generation math
  const calculateShadowColors = () => {
    // Dynamic offsets based on light direction
    const { x1, y1, x2, y2 } = getShadowCoords(distance);
    
    // Scale intensity delta based on shade
    // For very bright colors we adjust parameters for safe contrasts
    const colorInt = Math.round(intensity * 1.5);
    
    // Compute dark and light shadows
    const darkShadowColorHex = adjustColor(baseColor, -colorInt);
    const lightShadowColorHex = adjustColor(baseColor, colorInt);

    const darkShadow = hexToRgba(darkShadowColorHex, opacity);
    const lightShadow = hexToRgba(lightShadowColorHex, opacity);

    return {
      darkShadow,
      lightShadow,
      darkShadowColorHex,
      lightShadowColorHex,
      x1,
      y1,
      x2,
      y2
    };
  };

  const { darkShadow, lightShadow, darkShadowColorHex, lightShadowColorHex, x1, y1, x2, y2 } = calculateShadowColors();

  // Generate background style for flat, concave, convex
  const getBackgroundStyle = () => {
    const shift = Math.round(intensity * 0.7);
    const lighter = adjustColor(baseColor, shift);
    const darker = adjustColor(baseColor, -shift);

    switch (shapeStyle) {
      case 'concave':
        // Linear gradient depending on direction of light
        return `linear-gradient(145deg, ${darker}, ${lighter})`;
      case 'convex':
        return `linear-gradient(145deg, ${lighter}, ${darker})`;
      case 'pressed':
      case 'flat':
      default:
        return baseColor;
    }
  };

  // Generate dynamic CSS box shadow property
  const getBoxShadowProperty = () => {
    if (shapeStyle === 'pressed') {
      return `inset ${x1}px ${y1}px ${blur}px ${darkShadow}, inset ${x2}px ${y2}px ${blur}px ${lightShadow}`;
    }
    return `${x1}px ${y1}px ${blur}px ${darkShadow}, ${x2}px ${y2}px ${blur}px ${lightShadow}`;
  };

  // Complete style object for rendering preview
  const getPreviewStyle = (): React.CSSProperties => {
    const bg = getBackgroundStyle();
    return {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${radius}px`,
      boxShadow: getBoxShadowProperty(),
      background: bg,
      transition: 'background 0.2s ease, box-shadow 0.1s ease, border-radius 0.2s ease, width 0.1s ease, height 0.1s ease'
    };
  };

  // Raw CSS exporter string
  const cssCode = `/* Base background of container */
background: ${baseColor};

/* Neumorphic Shape Element CSS Style */
border-radius: ${radius}px;
background: ${shapeStyle === 'concave' || shapeStyle === 'convex' ? getBackgroundStyle() : baseColor};
box-shadow: ${getBoxShadowProperty()};`;

  // Tailwind CSS exporter string (custom bracket theme or arbitrary values)
  const tailwindCode = `<!-- Custom Neumorphic Wrapper -->
<div class="bg-[${baseColor}] p-12 flex justify-center">
  <div class="w-[${size}px] h-[${size}px] rounded-[${radius}px] bg-[${shapeStyle === 'concave' || shapeStyle === 'convex' ? 'linear-gradient(145deg,' + adjustColor(baseColor, Math.round(intensity * 0.7)) + ',' + adjustColor(baseColor, -Math.round(intensity * 0.7)) + ')' : baseColor}] shadow-[${shapeStyle === 'pressed' ? 'inset_' : ''}${x1}px_${y1}px_${blur}px_${darkShadow.replace(/\s+/g, '')},_${shapeStyle === 'pressed' ? 'inset_' : ''}${x2}px_${y2}px_${blur}px_${lightShadow.replace(/\s+/g, '')}]">
    <!-- Component Content -->
  </div>
</div>`;

  // React inline style exporter string
  const reactCode = `const neumorphicStyle = {
  width: '${size}px',
  height: '${size}px',
  borderRadius: '${radius}px',
  background: '${shapeStyle === 'concave' || shapeStyle === 'convex' ? getBackgroundStyle() : baseColor}',
  boxShadow: '${getBoxShadowProperty()}'
};

// Render
<div style={neumorphicStyle} />`;

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

  const applyPreset = (idx: number) => {
    setActivePresetIndex(idx);
    const preset = COLOR_PRESETS[idx];
    setBaseColor(preset.hex);
    // Auto-tweak parameters based on dark or light for optimal aesthetics
    if (preset.isDark) {
      setIntensity(12);
      setOpacity(0.4);
      setDistance(12);
    } else {
      setIntensity(15);
      setOpacity(0.9);
      setDistance(16);
    }
  };

  // Reset parameters to defaults
  const handleReset = () => {
    setBaseColor('#e0e0e0');
    setSize(180);
    setRadius(36);
    setDistance(16);
    setBlur(32);
    setIntensity(15);
    setOpacity(0.9);
    setShapeStyle('flat');
    setLightDir('top-left');
    setSyncBlur(true);
    setActivePresetIndex(0);
  };

  // Directions mapping array
  const DIRECTIONS = [
    { value: 'top-left' as LightDirection, icon: ArrowUpLeft, label: 'Sun Top-Left' },
    { value: 'top-right' as LightDirection, icon: ArrowUpRight, label: 'Sun Top-Right' },
    { value: 'bottom-right' as LightDirection, icon: ArrowDownRight, label: 'Sun Bottom-Right' },
    { value: 'bottom-left' as LightDirection, icon: ArrowDownLeft, label: 'Sun Bottom-Left' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6 sm:py-10 animate-fade-in" id="neumorphism-workspace">
      
      {/* HEADER UNIT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-display font-black text-xs uppercase tracking-widest mb-1.5 animate-pulse">
            <Sparkles className="h-4 w-4" /> soft ui styling studio
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-display sm:text-4xl">
            Neumorphism Soft-Shadow Generator
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-display font-medium uppercase tracking-wider">
            Sophisticated dual-shadow modeling playground for flat, concave, convex, and pressed design system components
          </p>
        </div>

        {/* Reset actions */}
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase tracking-wider font-display rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer self-start md:self-center transition-all shadow-2xs"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restore Defaults
        </button>
      </div>

      {/* QUICK COLOR THEMES PALETTE */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-550 flex items-center gap-2 font-display">
            <Palette className="h-4 w-4 text-indigo-505" /> Choose Neumorphic Canvas Theme
          </h3>
          <span className="text-[9px] font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold uppercase px-2 py-0.5 rounded-full">
            Recommended contrast levels
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
          {COLOR_PRESETS.map((preset, idx) => {
            const isSelected = baseColor.toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.name}
                onClick={() => applyPreset(idx)}
                style={{ backgroundColor: preset.hex }}
                className={`group p-2.5 rounded-xl border-2 transition-all text-left flex flex-col justify-between h-20 relative cursor-pointer overflow-hidden ${
                  isSelected 
                    ? 'border-indigo-500 scale-[1.03] shadow-md ring-2 ring-indigo-500/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:scale-[1.01]'
                }`}
              >
                <div className="absolute right-1 top-1">
                  {preset.isDark ? (
                    <Moon className="h-3 w-3 text-white/50" />
                  ) : (
                    <Sun className="h-3 w-3 text-slate-600/40" />
                  )}
                </div>
                <div className="flex-1" />
                <div className="space-y-0.5 z-10">
                  <p className={`text-[8.5px] font-black uppercase tracking-wider leading-none ${
                    preset.isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {preset.name}
                  </p>
                  <p className={`text-[8.5px] font-mono font-medium opacity-75 ${
                    preset.isDark ? 'text-slate-300' : 'text-slate-550'
                  }`}>
                    {preset.hex}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* WORKSPACE SECTIONS: 12-COLUMN MULTI-PANEL VIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: CONTROL DECK (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* COLOR AND LIGHT ANGLE CONTROLS */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
                <Sliders className="h-4 w-4 text-indigo-500" /> Chromatic Surface & Lighting Angle
              </h3>
              <span className="text-[9px] font-mono font-extrabold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                Step 1: Base settings
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Manual Color Picker */}
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-150 dark:border-slate-850">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 font-display">
                    Base Hex Color
                  </span>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={baseColor}
                      onChange={(e) => {
                        let val = e.target.value;
                        if (!val.startsWith('#') && val.length > 0) val = '#' + val;
                        setBaseColor(val);
                        setActivePresetIndex(-1);
                      }}
                      className="w-20 px-1 py-0.5 text-xs font-mono font-bold text-center uppercase tracking-wide bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded hover:ring-1 hover:ring-indigo-500 duration-100"
                    />
                    <input
                      type="color"
                      value={baseColor}
                      onChange={(e) => {
                        setBaseColor(e.target.value);
                        setActivePresetIndex(-1);
                      }}
                      className="w-7 h-7 rounded border border-slate-200 cursor-pointer overflow-hidden p-0"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-150 dark:border-slate-850 bg-slate-50 dark:bg-slate-955 p-3.5 text-left text-slate-505 leading-normal space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-650 dark:text-indigo-400 font-extrabold text-[10px] uppercase font-display">
                    <Info className="h-3.5 w-3.5" /> Neumorphic Notice
                  </div>
                  <p className="text-[10.5px]">
                    Neumorphism depends on soft, low-contrast differentials. Choosing total white <b>(#ffffff)</b> or pitch black <b>(#000000)</b> eliminates light/dark highlights.
                  </p>
                </div>
              </div>

              {/* Light Source quadrant angle select buttons */}
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">
                  Solar Light Angle Direction
                </span>
                
                <div className="grid grid-cols-2 gap-2">
                  {DIRECTIONS.map((dir) => {
                    const DirIcon = dir.icon;
                    const isSelected = lightDir === dir.value;
                    return (
                      <button
                        key={dir.value}
                        onClick={() => setLightDir(dir.value)}
                        className={`px-3 py-2 text-[10px] items-center justify-center font-bold uppercase tracking-wider font-display rounded-xl border text-center flex gap-1.5 cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-305 font-extrabold'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-500 hover:bg-slate-100'
                        }`}
                      >
                        <DirIcon className="h-4 w-4" />
                        <span>{dir.value.replace('-', ' ')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* SLIDERS FOR SIZING AND CONTRAST HEIGHT */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-805 dark:text-slate-250 flex items-center gap-2 font-display">
                <Layers className="h-4 w-4 text-indigo-500" /> Sculpting & Shadow Controls
              </h3>
              <span className="text-[9px] font-mono font-extrabold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded uppercase">
                Step 2: Shadow Dimensions
              </span>
            </div>

            <div className="space-y-4">
              
              {/* Size slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider font-display">
                  <span>Component Dimension (PX)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{size}px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="350"
                  step="5"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Radius slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider font-display">
                  <span>Border Corner Radius (PX / %)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{radius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="175"
                  step="1"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Distance slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider font-display">
                  <span>Shadow Distance Height (Offset)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{distance}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="45"
                  step="1"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Blur slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-655 dark:text-slate-400 uppercase tracking-wider font-display">
                  <span>Shadow Softness (Blur Radius)</span>
                  <div className="flex items-center gap-2">
                    {syncBlur && (
                      <span className="text-[9px] font-mono text-emerald-600 bg-emerald-55/60 dark:bg-emerald-950/40 px-1 py-0.5 rounded font-black">
                        AUTO (2X)
                      </span>
                    )}
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{blur}px</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="90"
                    step="1"
                    value={blur}
                    disabled={syncBlur}
                    onChange={(e) => setBlur(Number(e.target.value))}
                    className="flex-1 h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setSyncBlur(!syncBlur)}
                    className={`px-2 py-1 text-[9px] font-black uppercase rounded cursor-pointer border ${
                      syncBlur
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                    title="Toggle auto blur locked to index double of shadow distance"
                  >
                    {syncBlur ? 'LOCKED' : 'FREE'}
                  </button>
                </div>
              </div>

              {/* Shadow Intensity Color Shift Delta slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider font-display">
                  <span>Highlight Contrast (Luminance Shift)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">Shift amount: {intensity}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  step="1"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Shadow Opacity alpha fine tuning slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-bold text-slate-650 dark:text-slate-400 uppercase tracking-wider font-display">
                  <span>Shadow Opacity (Alpha Fine-Tune)</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400">{Math.round(opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: PREVIEW STAGE & CODE EXPORTERS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* ACTIVE PREVIEW STAGE BOARD (Has same color as background of container in Neumorphism rules) */}
          <div 
            className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-hidden relative"
            style={{ backgroundColor: baseColor }}
          >
            
            {/* Soft backdrop metadata headers */}
            <div className="flex items-center justify-between w-full mb-8 z-10">
              <div className="flex items-center gap-1.5 bg-slate-900/10 dark:bg-white/10 px-2 py-1 rounded-lg">
                <Layout className="h-3.5 w-3.5 text-slate-800 dark:text-white" />
                <span className="text-[9px] font-black uppercase tracking-wider font-display text-slate-800 dark:text-white-80">
                  Surface Studio Live View
                </span>
              </div>

              {/* Sizing toggle options */}
              <div className="flex gap-1">
                {(['flat', 'concave', 'convex', 'pressed'] as ShapeStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setShapeStyle(style)}
                    className={`px-2 py-1 text-[9px] font-extrabold uppercase rounded cursor-pointer transition-all ${
                      shapeStyle === style
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black shadow-xs'
                        : 'bg-slate-900/5 dark:bg-white/5 hover:bg-slate-900/10 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN RENDER STAGE BOX */}
            <div className="flex-1 flex items-center justify-center py-20 relative">
              <div 
                id="neumorphism-target-preview"
                style={getPreviewStyle()}
                className="flex flex-col items-center justify-center p-4 relative text-center overflow-hidden"
              >
                {/* PREVIEW CONTENT TYPES CONTROLLER */}
                {previewAddon === 'text' && (
                  <div className="animate-fade-in space-y-1 pointer-events-none select-none">
                    <h4 className="text-xs uppercase font-black tracking-widest text-indigo-755/90">
                      Soft Card
                    </h4>
                    <p className="text-[10px] font-mono text-slate-550 leading-none">
                      {shapeStyle === 'pressed' ? 'Pressed-in' : 'Pristine'}
                    </p>
                  </div>
                )}

                {/* MUSIC CONTROLLER INTERACTIVE MOCK */}
                {previewAddon === 'music-player' && (
                  <div className="animate-fade-in space-y-3 pointer-events-none select-none w-full flex flex-col items-center">
                    <div className="flex items-center gap-1">
                      <Volume2 className="h-3 w-3 text-indigo-500 animate-bounce" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">NOW PLAYING</span>
                    </div>
                    
                    {/* Tiny continuous mock slider */}
                    <div className="w-16 h-1 bg-slate-900/10 dark:bg-white/10 rounded overflow-hidden">
                      <div className="w-9 h-full bg-indigo-550" />
                    </div>

                    {/* Controller dials */}
                    <div className="flex space-x-3 items-center">
                      <SkipBack className="h-3 w-3 text-slate-450" />
                      <div 
                        className="rounded-full flex items-center justify-center"
                        style={{
                          width: '24px',
                          height: '24px',
                          boxShadow: `inset 1px 1px 2px ${darkShadow}, inset -1px -1px 2px ${lightShadow}`,
                          background: baseColor
                        }}
                      >
                        <Play className="h-2 w-2 text-indigo-600 fill-indigo-600 ml-0.5 animate-pulse" />
                      </div>
                      <SkipForward className="h-3 w-3 text-slate-450" />
                    </div>
                  </div>
                )}

                {/* PREMIUM ICON RENDERER */}
                {previewAddon === 'icon' && (
                  <div className="animate-fade-in p-2">
                    <div 
                      className="rounded-full p-2.5 flex items-center justify-center animate-spin"
                      style={{
                        animationDuration: '10s',
                        boxShadow: `2px 2px 4px ${darkShadow}, -2px -2px 4px ${lightShadow}`,
                        background: baseColor
                      }}
                    >
                      <Compass className="h-6 w-6 text-indigo-600 animate-pulse" />
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* PREVIEW BOTTOM SWITCHES */}
            <div className="flex items-center justify-between mt-4 border-t border-slate-9gd/10 pt-4 z-10">
              <span className="text-[9.5px] font-black font-display uppercase tracking-widest text-slate-500">
                Interactive Addons
              </span>
              <div className="flex gap-1.5 p-0.5 rounded-lg bg-slate-900/5 dark:bg-white/5 border border-slate-900/10">
                {(['blank', 'text', 'icon', 'music-player'] as const).map((addon) => (
                  <button
                    key={addon}
                    onClick={() => setPreviewAddon(addon)}
                    className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded transition-all cursor-pointer ${
                      previewAddon === addon
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {addon.split('-')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FULL-WIDTH REAL TIME EXPORT PANEL */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6 font-display animate-fade-in">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <Code className="h-5 w-5 text-indigo-500" /> Real-time Export Panel
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Copy generated softneumorphism shadow parameters instantly in your preferred format
            </p>
          </div>
          <span className="self-start sm:self-center text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/50 dark:border-emerald-900/55 px-3 py-1 rounded-xl uppercase tracking-wider animate-pulse flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Live Synced
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* RAW CSS BOX */}
          <div className="space-y-3 flex flex-col justify-between h-full bg-slate-50/55 dark:bg-slate-950/40 p-4.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-300">
                <span>1. Standard CSS3</span>
                <button
                  onClick={() => copyToClipboard(cssCode, 'css')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 duration-150 flex items-center gap-1 cursor-pointer font-display"
                >
                  {copiedCSS ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> COPY CSS
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-indigo-200 overflow-x-auto select-all whitespace-pre h-[140px] flex items-start justify-start">
                <code className="w-full text-left block">{cssCode}</code>
              </div>
            </div>
          </div>

          {/* TAILWIND CSS BOX */}
          <div className="space-y-3 flex flex-col justify-between h-full bg-slate-50/55 dark:bg-slate-950/40 p-4.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-300">
                <span>2. Tailwind Arbitrary Class</span>
                <button
                  onClick={() => copyToClipboard(tailwindCode, 'tailwind')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 duration-150 flex items-center gap-1 cursor-pointer font-display"
                >
                  {copiedTailwind ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> COPY TAILWIND
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-purple-200 overflow-x-auto select-all whitespace-pre h-[140px] flex items-start justify-start">
                <code className="w-full text-left block">{tailwindCode}</code>
              </div>
            </div>
          </div>

          {/* REACT CONST DECLARATION BOX */}
          <div className="space-y-3 flex flex-col justify-between h-full bg-slate-50/55 dark:bg-slate-950/40 p-4.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-655 dark:text-slate-300">
                <span>3. React Inline Style</span>
                <button
                  onClick={() => copyToClipboard(reactCode, 'react')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-655 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 duration-150 flex items-center gap-1 cursor-pointer font-display"
                >
                  {copiedReact ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-555" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> COPY INLINE JS
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-blue-250 overflow-x-auto select-all whitespace-pre h-[140px] flex items-start justify-start">
                <code className="w-full text-left block">{reactCode}</code>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER EDUCATION COMPASS */}
      <div className="bg-slate-55 dark:bg-slate-955 rounded-2xl border-2 border-slate-200 dark:border-slate-850 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="bg-indigo-50 dark:bg-indigo-950 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900">
            <Compass className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h4 className="text-xs uppercase font-black tracking-wider text-slate-850 dark:text-white">
              About Soft Neumorphism Architecture
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500 max-w-xl">
              An elegant design system based on soft-ui skeuomorphic elements. The component shares its exact background color with its container, extruded or pressed using physical-looking double shadows to mock soft realistic 3D plastic/felt molds.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
