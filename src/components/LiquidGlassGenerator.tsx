import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Copy, Check, Sliders, Palette, Code, RefreshCw, 
  Eye, Droplet, Wand2, Info, Moon, Sun, ArrowRight, HelpCircle,
  Box, BadgeInfo
} from 'lucide-react';

interface GlassPreset {
  name: string;
  description: string;
  tintColor: string;
  tintOpacity: number;
  blur: number; // px
  saturate: number; // %
  borderWidth: number; // px
  borderColor: string;
  borderOpacity: number;
  borderRadius: number; // px
  sheen: boolean;
  sheenOpacity: number;
  sheenAngle: number; // deg
  blob1Color: string;
  blob2Color: string;
  blob3Color: string;
  blobSize: number; // px
  containerBg: string;
}

const PRESETS: Record<string, GlassPreset> = {
  frostedIce: {
    name: 'Frosted Crystal Ice',
    description: 'Fresh clean white translucent glass layered with cool glacial teal details.',
    tintColor: '#ffffff',
    tintOpacity: 0.22,
    blur: 20,
    saturate: 140,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderOpacity: 0.45,
    borderRadius: 24,
    sheen: true,
    sheenOpacity: 0.35,
    sheenAngle: 135,
    blob1Color: '#06b6d4', // cyan
    blob2Color: '#3b82f6', // blue
    blob3Color: '#818cf8', // indigo
    blobSize: 220,
    containerBg: '#0f172a'
  },
  midnightSlag: {
    name: 'Obsidian Midnight',
    description: 'Sleek dark smoked glass layered on high-energy fluorescent violet flow layers.',
    tintColor: '#0a0f1d',
    tintOpacity: 0.65,
    blur: 16,
    saturate: 180,
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderOpacity: 0.3,
    borderRadius: 20,
    sheen: true,
    sheenOpacity: 0.15,
    sheenAngle: 215,
    blob1Color: '#ec4899', // pink-glow
    blob2Color: '#7c3aed', // purple-glow
    blob3Color: '#06b6d4', // cyan-glow
    blobSize: 240,
    containerBg: '#020617'
  },
  solarSunset: {
    name: 'Vibrant Solar Amber',
    description: 'Hot dynamic glass that captures setting-sun orange vibes with smooth contrast.',
    tintColor: '#7c2d12',
    tintOpacity: 0.2,
    blur: 24,
    saturate: 220,
    borderWidth: 1.5,
    borderColor: '#ea580c',
    borderOpacity: 0.5,
    borderRadius: 28,
    sheen: true,
    sheenOpacity: 0.5,
    sheenAngle: 45,
    blob1Color: '#f97316', // orange
    blob2Color: '#eab308', // yellow
    blob3Color: '#ef4444', // red
    blobSize: 200,
    containerBg: '#1c0500'
  },
  emeraldAurora: {
    name: 'Boreal Aurora Flow',
    description: 'Ethereal forest and cosmic solar flares trapped in dense neon green crystal elements.',
    tintColor: '#022c22',
    tintOpacity: 0.35,
    blur: 30,
    saturate: 160,
    borderWidth: 1,
    borderColor: '#10b981',
    borderOpacity: 0.4,
    borderRadius: 32,
    sheen: true,
    sheenOpacity: 0.25,
    sheenAngle: 120,
    blob1Color: '#10b981', // emerald
    blob2Color: '#84cc16', // lime
    blob3Color: '#047857', // forest
    blobSize: 230,
    containerBg: '#020804'
  },
  hologramCandy: {
    name: 'Toxic Electro Candy',
    description: 'Electric neon pastel gradients blending under highly saturated micro-glitched glass filters.',
    tintColor: '#2e1065',
    tintOpacity: 0.15,
    blur: 14,
    saturate: 280,
    borderWidth: 2,
    borderColor: '#f43f5e',
    borderOpacity: 0.6,
    borderRadius: 16,
    sheen: true,
    sheenOpacity: 0.65,
    sheenAngle: 90,
    blob1Color: '#ff007f', // hot pink
    blob2Color: '#00ffff', // electric cyan
    blob3Color: '#ffff00', // electric yellow
    blobSize: 180,
    containerBg: '#050212'
  }
};

export default function LiquidGlassGenerator() {
  const [activePreset, setActivePreset] = useState<string>('frostedIce');
  
  // States of glass customization
  const [tintColor, setTintColor] = useState<string>('#ffffff');
  const [tintOpacity, setTintOpacity] = useState<number>(0.22);
  const [blur, setBlur] = useState<number>(20);
  const [saturate, setSaturate] = useState<number>(140);
  
  // Border structure
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [borderColor, setBorderColor] = useState<string>('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState<number>(0.45);
  const [borderRadius, setBorderRadius] = useState<number>(24);
  
  // Sheen reflection
  const [sheen, setSheen] = useState<boolean>(true);
  const [sheenOpacity, setSheenOpacity] = useState<number>(0.35);
  const [sheenAngle, setSheenAngle] = useState<number>(135);
  
  // Blob customization
  const [blob1Color, setBlob1Color] = useState<string>('#06b6d4');
  const [blob2Color, setBlob2Color] = useState<string>('#3b82f6');
  const [blob3Color, setBlob3Color] = useState<string>('#818cf8');
  const [blobSize, setBlobSize] = useState<number>(220);
  
  // Global backdrop
  const [containerBg, setContainerBg] = useState<string>('#0f172a');
  const [animateBlobs, setAnimateBlobs] = useState<boolean>(true);
  const [activeTab, setActiveTab2] = useState<'preview' | 'code'>('preview');

  // Exporters statuses
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react'>('css');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const applyPreset = (presetKey: string) => {
    const p = PRESETS[presetKey];
    if (p) {
      setActivePreset(presetKey);
      setTintColor(p.tintColor);
      setTintOpacity(p.tintOpacity);
      setBlur(p.blur);
      setSaturate(p.saturate);
      setBorderWidth(p.borderWidth);
      setBorderColor(p.borderColor);
      setBorderOpacity(p.borderOpacity);
      setBorderRadius(p.borderRadius);
      setSheen(p.sheen);
      setSheenOpacity(p.sheenOpacity);
      setSheenAngle(p.sheenAngle);
      setBlob1Color(p.blob1Color);
      setBlob2Color(p.blob2Color);
      setBlob3Color(p.blob3Color);
      setBlobSize(p.blobSize);
      setContainerBg(p.containerBg);
    }
  };

  const getHexToRgba = (hex: string, alpha: number) => {
    // Check for shorthand hex
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
  };

  const getGlassStyle = () => {
    const bgRgba = getHexToRgba(tintColor, tintOpacity);
    const borderRgba = getHexToRgba(borderColor, borderOpacity);
    
    let baseStyle: React.CSSProperties = {
      backgroundColor: bgRgba,
      backdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(${saturate}%)`,
      borderRadius: `${borderRadius}px`,
      borderWidth: `${borderWidth}px`,
      borderColor: borderRgba,
      borderStyle: 'solid',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
      position: 'relative',
      overflow: 'hidden'
    };

    return baseStyle;
  };

  const getSheenLinearGradient = () => {
    return `linear-gradient(${sheenAngle}deg, rgba(255, 255, 255, ${sheenOpacity}) 0%, rgba(255, 255, 255, 0.05) 45%, rgba(0, 0, 0, 0) 60%, rgba(255, 255, 255, 0.02) 100%)`;
  };

  const generateCSSCode = () => {
    const bgRgba = getHexToRgba(tintColor, tintOpacity);
    const borderRgba = getHexToRgba(borderColor, borderOpacity);
    let code = `.liquid-glass-pane {
  background: ${bgRgba};
  backdrop-filter: blur(${blur}px) saturate(${saturate}%);
  -webkit-backdrop-filter: blur(${blur}px) saturate(${saturate}%);
  border-radius: ${borderRadius}px;
  border: ${borderWidth}px solid ${borderRgba};
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.35);
`;

    if (sheen) {
      code += `  /* Sheen glint overlay */
  background-image: ${getSheenLinearGradient()};
`;
    }
    
    code += `}`;
    return code;
  };

  const generateTailwindCode = () => {
    // Generate inline tailwind config classes
    const roundedClass = `rounded-[${borderRadius}px]`;
    const borderWeightClass = borderWidth === 0 ? 'border-0' : `border-[${borderWidth}px]`;
    const bgOpacityPct = Math.round(tintOpacity * 100);
    const borderOpacityPct = Math.round(borderOpacity * 100);
    
    // We construct Tailwind arbitrary classes
    const output = `bg-[${tintColor}]/${bgOpacityPct} backdrop-blur-[${blur}px] backdrop-saturate-[${saturate}%] ${roundedClass} ${borderWeightClass} border-[${borderColor}]/${borderOpacityPct} shadow-2xl`;
    return output;
  };

  const generateReactCode = () => {
    const bgRgba = getHexToRgba(tintColor, tintOpacity);
    const borderRgba = getHexToRgba(borderColor, borderOpacity);
    return `const glassStyle = {
  backgroundColor: '${bgRgba}',
  backdropFilter: 'blur(${blur}px) saturate(${saturate}%)',
  WebkitBackdropFilter: 'blur(${blur}px) saturate(${saturate}%)',
  borderRadius: '${borderRadius}px',
  border: '${borderWidth}px solid ${borderRgba}',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.35)',
  position: 'relative',
  overflow: 'hidden'
};

// Render in JSX
<div style={glassStyle}>
  {/* Content */}
</div>`;
  };

  const copyToClipboard = (text: string, format: 'css' | 'tailwind' | 'react') => {
    navigator.clipboard.writeText(text);
    setCopiedText(format);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="animate-fade-in relative space-y-8" id="liquid-glass-workspace">
      
      {/* CORE 12 COLUMN WORKPSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset detailed block selection */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display mb-4">
              <Wand2 className="h-4 w-4 text-indigo-500" /> Core Composition Presets
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(PRESETS).map(([key, val]) => (
                <div
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`border-[2px] rounded-xl p-3.5 cursor-pointer text-left transition-all duration-150 pr-4 ${
                    activePreset === key
                      ? 'border-indigo-600 bg-indigo-50/20 dark:border-indigo-400 dark:bg-indigo-950/25 shadow-sm'
                      : 'border-slate-200 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-100 font-display">
                      {val.name}
                    </span>
                    <div className="flex gap-1">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: val.blob1Color }} />
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: val.blob2Color }} />
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1 block">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PARAMETER CONTROLS TAB */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
                <Sliders className="h-4 w-4 text-indigo-500" /> Physical Spec Customizers
              </h3>
              <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">
                Active: {PRESETS[activePreset]?.name || 'Custom'}
              </span>
            </div>

            {/* Sub-section 1: Glass Tinting */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                  1. Glass Acrylic Plate
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Plate Color Picker */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Acrylic Tint Color</span>
                    <span className="font-mono text-xs uppercase text-indigo-650 dark:text-indigo-400">{tintColor}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={tintColor}
                      onChange={(e) => {
                        setTintColor(e.target.value);
                        setActivePreset('custom');
                      }}
                      className="h-9 w-12 bg-transparent cursor-pointer rounded border border-slate-250 dark:border-slate-750"
                    />
                    <div className="flex-1 flex gap-1 items-center pr-2">
                      {['#ffffff', '#0a0f1d', '#7c2d12', '#022c22', '#2e1065', '#f43f5e'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setTintColor(c);
                            setActivePreset('custom');
                          }}
                          className={`h-6 w-6 rounded-full border border-slate-300 dark:border-slate-750 transition-transform ${
                            tintColor === c ? 'scale-115 ring-2 ring-indigo-500' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Opacity slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Tint Glass Opacity</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{(tintOpacity * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={tintOpacity * 100}
                    onChange={(e) => {
                      setTintOpacity(Number(e.target.value) / 100);
                      setActivePreset('custom');
                    }}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Backdrop Blur */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Backdrop Blur Filter</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{blur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={blur}
                    onChange={(e) => {
                      setBlur(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Saturation */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Color Saturation</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{saturate}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="300"
                    step="5"
                    value={saturate}
                    onChange={(e) => {
                      setSaturate(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Sub-section 2: Glass Border and Bevel */}
            <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                  2. Edge Bevel & Border Frame
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Border Width */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Border Width</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="6"
                    step="0.5"
                    value={borderWidth}
                    onChange={(e) => {
                      setBorderWidth(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Border Radius */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Corner Border Radius</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{borderRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="48"
                    step="2"
                    value={borderRadius}
                    onChange={(e) => {
                      setBorderRadius(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Border Color */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Border Tint Color</span>
                    <span className="font-mono text-xs uppercase text-indigo-650 dark:text-indigo-400">{borderColor}</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={borderColor}
                      onChange={(e) => {
                        setBorderColor(e.target.value);
                        setActivePreset('custom');
                      }}
                      className="h-9 w-12 bg-transparent cursor-pointer rounded border border-slate-250 dark:border-slate-750"
                    />
                    <div className="flex-1 flex gap-1 items-center pr-2">
                      {['#ffffff', '#3b82f6', '#ea580c', '#10b981', '#f43f5e', '#000000'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setBorderColor(c);
                            setActivePreset('custom');
                          }}
                          className={`h-6 w-6 rounded-full border border-slate-300 dark:border-slate-750 transition-transform ${
                            borderColor === c ? 'scale-115 ring-2 ring-indigo-500' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Border Opacity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Border Opacity</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{(borderOpacity * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={borderOpacity * 100}
                    onChange={(e) => {
                      setBorderOpacity(Number(e.target.value) / 100);
                      setActivePreset('custom');
                    }}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>

            {/* Sub-section 3: Reflection & Sheen */}
            <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                    3. Sheen Reflection Overlay
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sheen}
                    onChange={(e) => setSheen(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                  />
                  <span className="text-[10px] font-extrabold uppercase font-display text-slate-500 dark:text-slate-400">Enable Sheen</span>
                </label>
              </div>

              {sheen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                  {/* Sheen Opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                      <span>Sheen Intensity</span>
                      <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{(sheenOpacity * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={sheenOpacity * 100}
                      onChange={(e) => {
                        setSheenOpacity(Number(e.target.value) / 100);
                        setActivePreset('custom');
                      }}
                      className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Sheen Angle */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                      <span>Sheen Sweep Angle</span>
                      <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{sheenAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="15"
                      value={sheenAngle}
                      onChange={(e) => {
                        setSheenAngle(Number(e.target.value));
                        setActivePreset('custom');
                      }}
                      className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Sub-section 4: Liquid Background Blobs */}
            <div className="space-y-4 pt-3 border-t border-slate-100 dark:border-slate-800/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Droplet className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                    4. Behind-Glass Fluid Liquid Blobs
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={animateBlobs}
                    onChange={(e) => setAnimateBlobs(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                  />
                  <span className="text-[10px] font-extrabold uppercase font-display text-slate-500 dark:text-slate-400">Animate Fluid</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Blob size */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Fluid Volume (Size)</span>
                    <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400">{blobSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="350"
                    step="10"
                    value={blobSize}
                    onChange={(e) => {
                      setBlobSize(Number(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Container/Workspace BG */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-slate-650 dark:text-slate-400 font-display uppercase tracking-wider">
                    <span>Workspace Matrix BG</span>
                    <span className="font-mono text-xs uppercase text-indigo-650 dark:text-indigo-400">{containerBg}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {['#0f172a', '#020617', '#1c0500', '#020804', '#050212', '#f1f5f9', '#ffffff'].map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setContainerBg(bg)}
                        title={`Switch view contrast background to ${bg}`}
                        className={`h-6 w-6 rounded-md border border-slate-350 dark:border-slate-800 transition-all ${
                          containerBg === bg ? 'ring-2 ring-indigo-500 scale-105' : 'hover:scale-102'
                        }`}
                        style={{ backgroundColor: bg }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Blob Pickers */}
              <div className="grid grid-cols-3 gap-2 pt-1.5">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Blob 1 Flux</span>
                  <input
                    type="color"
                    value={blob1Color}
                    onChange={(e) => {
                      setBlob1Color(e.target.value);
                      setActivePreset('custom');
                    }}
                    className="h-7 w-full bg-transparent cursor-pointer rounded"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Blob 2 Flux</span>
                  <input
                    type="color"
                    value={blob2Color}
                    onChange={(e) => {
                      setBlob2Color(e.target.value);
                      setActivePreset('custom');
                    }}
                    className="h-7 w-full bg-transparent cursor-pointer rounded"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">Blob 3 Flux</span>
                  <input
                    type="color"
                    value={blob3Color}
                    onChange={(e) => {
                      setBlob3Color(e.target.value);
                      setActivePreset('custom');
                    }}
                    className="h-7 w-full bg-transparent cursor-pointer rounded"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive High-Res Sandbox Rendering (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Main sandbox element container */}
          <div 
            className="w-full flex flex-col justify-center items-center py-16 px-6 sm:px-10 rounded-3xl relative overflow-hidden transition-all duration-300 shadow-inner border border-slate-200 dark:border-slate-850"
            style={{ 
              backgroundColor: containerBg,
              minHeight: '440px'
            }}
          >
            {/* Ambient grid backdrop lines to stress test transparency */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="text-[9rem] font-black text-slate-500/10 tracking-widest uppercase font-display select-none">
                GLASS
              </span>
            </div>

            {/* THREE FLUID LIQUID BLOCKS LAYER */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
              {/* Blob 1 */}
              <motion.div
                className="absolute rounded-full filter blur-[40px] opacity-[0.80]"
                style={{
                  backgroundColor: blob1Color,
                  width: `${blobSize}px`,
                  height: `${blobSize}px`,
                  left: '15%',
                  top: '15%'
                }}
                animate={animateBlobs ? {
                  x: [0, 80, -40, 0],
                  y: [0, -50, 70, 0],
                  scale: [1, 1.25, 0.85, 1],
                  borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "50% 60% 40% 60%", "40% 60% 70% 30%"]
                } : {}}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Blob 2 */}
              <motion.div
                className="absolute rounded-full filter blur-[42px] opacity-[0.75]"
                style={{
                  backgroundColor: blob2Color,
                  width: `${blobSize * 0.95}px`,
                  height: `${blobSize * 0.95}px`,
                  right: '10%',
                  bottom: '15%'
                }}
                animate={animateBlobs ? {
                  x: [0, -70, 60, 0],
                  y: [0, 60, -50, 0],
                  scale: [1, 0.8, 1.2, 1],
                  borderRadius: ["50% 50% 50% 50%", "70% 30% 50% 50%", "40% 80% 30% 70%", "50% 50% 50% 50%"]
                } : {}}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              />

              {/* Blob 3 */}
              <motion.div
                className="absolute rounded-full filter blur-[45px] opacity-[0.65]"
                style={{
                  backgroundColor: blob3Color,
                  width: `${blobSize * 0.8}px`,
                  height: `${blobSize * 0.8}px`,
                  left: '40%',
                  top: '40%'
                }}
                animate={animateBlobs ? {
                  x: [0, 50, -60, 0],
                  y: [0, 70, -60, 0],
                  scale: [1, 1.15, 0.9, 1],
                  borderRadius: ["40% 60% 50% 50%", "50% 50% 70% 30%", "30% 70% 40% 60%", "40% 60% 50% 50%"]
                } : {}}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3
                }}
              />
            </div>

            {/* THE FROSTED LIQUID GLASS INTERACTIVE CARD */}
            <motion.div
              style={getGlassStyle()}
              className="w-full max-w-[340px] p-6 text-slate-900 transition-all z-10 select-none shadow-2xl overflow-hidden group hover:scale-[1.025] duration-300"
              whileHover={{ rotateY: 5, rotateX: -5 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Optional sheen overlay element */}
              {sheen && (
                <div 
                  className="absolute inset-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                  style={{ backgroundImage: getSheenLinearGradient() }}
                />
              )}

              {/* Display text contents on the glasspane */}
              <div className="flex flex-col h-full justify-between space-y-10">
                {/* Upper banner */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#2563eb]/70 bg-white/40 dark:bg-black/35 px-2 py-0.5 rounded-full border border-white/20 backdrop-blur-sm shadow-xs block w-max">
                      Liquid Glass Std
                    </span>
                    <h4 className="text-lg font-black tracking-tight font-display text-white mix-blend-difference">
                      Aesthetic Plate
                    </h4>
                  </div>
                  {/* Frosted glint badge */}
                  <span className="h-6 w-6 rounded-full flex items-center justify-center bg-white/25 border border-white/35 shadow-xs font-sans text-xs">
                    💎
                  </span>
                </div>

                {/* Middle dummy metrics */}
                <div className="text-left space-y-1">
                  <div className="text-[10px] font-bold text-slate-205 mix-blend-difference font-display flex items-center gap-1">
                    <Droplet className="h-3 w-3 text-cyan-400" /> FROST SPEC
                  </div>
                  <div className="font-mono text-xs text-white mix-blend-difference space-y-0.5 opacity-90">
                    <p>Blur radius: <span className="text-cyan-400 font-extrabold">{blur}px</span></p>
                    <p>Saturation: <span className="text-indigo-300 font-extrabold">{saturate}%</span></p>
                    <p>Transmission: <span className="text-teal-400 font-extrabold">{(100 - tintOpacity * 100).toFixed(0)}% opacity</span></p>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between border-t border-white/10 dark:border-black/10 pt-3.5">
                  <span className="text-[8px] font-black text-white/60 font-mono tracking-widest">
                    SYSTEM: COMPLIANT
                  </span>
                  <div className="flex items-center gap-1.5 text-[9px] font-black bg-white/25 hover:bg-white/45 text-white border border-white/40 rounded-lg px-2.5 py-1 transition-all pointer-events-auto cursor-pointer">
                    Preview Interactive <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Matrix indicator */}
            <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5 text-[9px] font-mono text-slate-500 uppercase font-black tracking-widest bg-white/20 dark:bg-black/25 px-2 py-0.5 rounded-full backdrop-blur-xs select-none">
              <span className={`h-1.5 w-1.5 rounded-full ${animateBlobs ? 'bg-emerald-500 animate-ping' : 'bg-slate-450'}`} />
              Matrix Shield: {blur}px Glass
            </div>

          </div>

        </div>

      </div>

      {/* CODE COMPILER EXPORT COMPONENT - 12 Column full-width section below grid, above Explore Other Generators */}
      <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-100 dark:border-slate-850 pb-3">
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-indigo-500" />
            <div>
              <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
                Export Liquid Glass Styles
              </h3>
              <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                Deploy lightweight, high-performance glassmorphism layers directly into your web applications
              </p>
            </div>
          </div>

          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-1">
            {[
              { id: 'css', label: 'css' },
              { id: 'tailwind', label: 'tailwind' },
              { id: 'react', label: 'react / jsx' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id as 'css' | 'tailwind' | 'react')}
                className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider font-display rounded-lg transition-all cursor-pointer ${
                  activeCodeTab === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-755'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Compiled code block */}
        <div className="relative rounded-2xl bg-slate-950 p-5 mt-4 min-h-[140px] border border-slate-850 overflow-x-auto">
          
          {/* Copy keyboard */}
          <button
            onClick={() => {
              const targetCode = activeCodeTab === 'css' 
                ? generateCSSCode()
                : activeCodeTab === 'tailwind' 
                ? generateTailwindCode() 
                : generateReactCode();
              copyToClipboard(targetCode, activeCodeTab);
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-355 cursor-pointer transition-all z-10 flex items-center gap-1.5"
          >
            {copiedText === activeCodeTab ? (
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
          <pre className="text-xs font-mono font-bold text-slate-350 text-left whitespace-pre select-all pt-4 leading-normal">
            {activeCodeTab === 'css' && generateCSSCode()}
            {activeCodeTab === 'tailwind' && generateTailwindCode()}
            {activeCodeTab === 'react' && generateReactCode()}
          </pre>

        </div>

        {/* Informational helpful tips */}
        <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-100/50 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed flex gap-3">
          <BadgeInfo className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-850 dark:text-slate-300 mb-0.5">Aesthetic Implementation Guideline</p>
            <p>
              To achieve authentic Liquid Glass aesthetics in your designs, ensure parent containers possess dynamic vibrant background gradients or floating graphic panels. The translucent frosted plate relies on high backdrop-blur vectors to isolate foreground typography layers.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
