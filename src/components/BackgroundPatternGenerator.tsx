import React, { useState, useEffect } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Palette, HelpCircle, Copy, Check, 
  Eye, Monitor, Smartphone, Maximize2, Zap, Layout, Paintbrush, Contrast,
  FolderSync, Grid, Info, ShieldAlert, BadgeInfo
} from 'lucide-react';

interface ColorPreset {
  name: string;
  bgColor: string;
  patternColor: string;
  isGradient: boolean;
  bgGradientEnd?: string;
  description: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Cyberpunk Grid',
    bgColor: '#090514',
    patternColor: '#ff007f',
    isGradient: true,
    bgGradientEnd: '#03010c',
    description: 'Vibrant neon pink on a deep cyber twilight canvas'
  },
  {
    name: 'Architect Blueprint',
    bgColor: '#0f172a',
    patternColor: '#38bdf8',
    isGradient: false,
    description: 'Engineering cyan on slate gray'
  },
  {
    name: 'Poison Ivy',
    bgColor: '#022c22',
    patternColor: '#10b981',
    isGradient: true,
    bgGradientEnd: '#064e3b',
    description: 'Emerald green elements matching deep forest base'
  },
  {
    name: 'Solar Eclipse',
    bgColor: '#171717',
    patternColor: '#fbbf24',
    isGradient: true,
    bgGradientEnd: '#0a0a0a',
    description: 'Bright amber dots overlaying a pitch black background'
  },
  {
    name: 'Clean Editorial',
    bgColor: '#ffffff',
    patternColor: '#e2e8f0',
    isGradient: false,
    description: 'High-end soft gray grid on crisp white'
  },
  {
    name: 'Royal Nebula',
    bgColor: '#1e1b4b',
    patternColor: '#818cf8',
    isGradient: true,
    bgGradientEnd: '#311042',
    description: 'Ultraviolet glow layout supporting responsive layers'
  }
];

type PatternType = 'dotted' | 'grid' | 'blueprint' | 'stripes' | 'plus' | 'zigzag' | 'waves' | 'checker' | 'rings' | 'hexagons';

interface PatternConfig {
  id: PatternType;
  name: string;
  description: string;
}

const PATTERN_TYPES: PatternConfig[] = [
  { id: 'dotted', name: 'Dotted Matrix', description: 'Clean radial dots' },
  { id: 'grid', name: 'Standard Grid', description: 'Square engineering lines' },
  { id: 'blueprint', name: 'Blueprint Graph', description: 'Double engineering lines' },
  { id: 'stripes', name: 'Diagonal Stripes', description: 'Dynamic repeating stripes' },
  { id: 'plus', name: 'Plus Symbols', description: 'Minimalist crosses' },
  { id: 'zigzag', name: 'Chevron Wave', description: 'Symmetrical sawtooth layout' },
  { id: 'waves', name: 'Liquid Wave', description: 'Fluid sinusoidal sine loop' },
  { id: 'checker', name: 'Checkerboard', description: 'Classic checker panels' },
  { id: 'rings', name: 'Concentric Rings', description: 'Circular ripples' },
  { id: 'hexagons', name: 'Islamic Hex Mesh', description: 'Organic honeycomb structure' }
];

export default function BackgroundPatternGenerator() {
  // Pattern Variables State
  const [patternType, setPatternType] = useState<PatternType>('dotted');
  const [size, setSize] = useState<number>(40);
  const [strokeWidth, setStrokeWidth] = useState<number>(1.5);
  const [angle, setAngle] = useState<number>(45);
  const [opacity, setOpacity] = useState<number>(25); // as percentage 0-100
  const [bgColor, setBgColor] = useState<string>('#090514');
  const [bgGradientEnd, setBgGradientEnd] = useState<string>('#03010c');
  const [patternColor, setPatternColor] = useState<string>('#ff007f');
  const [isGradient, setIsGradient] = useState<boolean>(true);
  const [blendMode, setBlendMode] = useState<string>('normal');

  // Preview overlay filters
  const [backdropBlur, setBackdropBlur] = useState<number>(0); // px
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0); // % translucent mask
  const [overlayColor, setOverlayColor] = useState<string>('#000000');

  // UI / Playground State
  const [activeColorPreset, setActiveColorPreset] = useState<number>(0);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile' | 'fullscreen'>('desktop');
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react' | 'svg'>('css');
  const [copiedText, setCopiedText] = useState<string>('');
  const [dummyCardBg, setDummyCardBg] = useState<'frosted' | 'solid-dark' | 'solid-light'>('frosted');

  // React to preset loads
  const loadColorPreset = (index: number) => {
    setActiveColorPreset(index);
    const p = COLOR_PRESETS[index];
    setBgColor(p.bgColor);
    setPatternColor(p.patternColor);
    setIsGradient(p.isGradient);
    if (p.bgGradientEnd) setBgGradientEnd(p.bgGradientEnd);
  };

  // Convert Hex color to RGBA with dynamic opacity support
  const hexToRgba = (hex: string, alpha: number) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Dynamic Generator Engine yielding CSS properties
  const generatePatternCSS = () => {
    const alpha = opacity / 100;
    const finalPatternColor = hexToRgba(patternColor, alpha);

    let backgroundImage = '';
    let backgroundSize = '';
    let backgroundPosition = '';

    switch (patternType) {
      case 'dotted':
        backgroundImage = `radial-gradient(${finalPatternColor} ${strokeWidth}px, transparent ${strokeWidth}px)`;
        backgroundSize = `${size}px ${size}px`;
        break;

      case 'grid':
        backgroundImage = `linear-gradient(to right, ${finalPatternColor} ${strokeWidth}px, transparent ${strokeWidth}px), linear-gradient(to bottom, ${finalPatternColor} ${strokeWidth}px, transparent ${strokeWidth}px)`;
        backgroundSize = `${size}px ${size}px`;
        break;

      case 'blueprint':
        const subtleColor = hexToRgba(patternColor, alpha * 0.4);
        backgroundImage = `
          linear-gradient(to right, ${finalPatternColor} ${strokeWidth}px, transparent ${strokeWidth}px),
          linear-gradient(to bottom, ${finalPatternColor} ${strokeWidth}px, transparent ${strokeWidth}px),
          linear-gradient(to right, ${subtleColor} 1px, transparent 1px),
          linear-gradient(to bottom, ${subtleColor} 1px, transparent 1px)
        `.trim().replace(/\s+/g, ' ');
        backgroundSize = `${size}px ${size}px, ${size}px ${size}px, ${size / 5}px ${size / 5}px, ${size / 5}px ${size / 5}px`;
        break;

      case 'stripes':
        backgroundImage = `repeating-linear-gradient(${angle}deg, ${finalPatternColor}, ${finalPatternColor} ${strokeWidth}px, transparent ${strokeWidth}px, transparent ${size}px)`;
        backgroundSize = 'auto';
        break;

      case 'plus': {
        // SVG inlined crosses
        const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><path d='M ${size/2} ${size/2 - strokeWidth*2.5} v ${strokeWidth*5} M ${size/2 - strokeWidth*2.5} ${size/2} h ${strokeWidth*5}' stroke='${patternColor}' stroke-width='${strokeWidth}' stroke-linecap='round' opacity='${alpha}'/></svg>`;
        const encodedSvg = btoa(svgContent);
        backgroundImage = `url("data:image/svg+xml;base64,${encodedSvg}")`;
        backgroundSize = `${size}px ${size}px`;
        break;
      }

      case 'zigzag': {
        const hSize = size / 2;
        const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><path d='M 0 ${hSize} L ${size/4} ${hSize - size/4} L ${size/2} ${hSize} L ${size*0.75} ${hSize - size/4} L ${size} ${hSize}' fill='none' stroke='${patternColor}' stroke-width='${strokeWidth}' stroke-linecap='round' stroke-linejoin='round' opacity='${alpha}'/></svg>`;
        const encodedSvg = btoa(svgContent);
        backgroundImage = `url("data:image/svg+xml;base64,${encodedSvg}")`;
        backgroundSize = `${size}px ${size}px`;
        break;
      }

      case 'waves': {
        const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'><path d='M 0 ${size/2} Q ${size/4} ${size/2 - size/4} ${size/2} ${size/2} T ${size} ${size/2}' fill='none' stroke='${patternColor}' stroke-width='${strokeWidth}' stroke-linecap='round' opacity='${alpha}'/></svg>`;
        const encodedSvg = btoa(svgContent);
        backgroundImage = `url("data:image/svg+xml;base64,${encodedSvg}")`;
        backgroundSize = `${size}px ${size}px`;
        break;
      }

      case 'checker':
        backgroundImage = `linear-gradient(45deg, ${finalPatternColor} 25%, transparent 25%), linear-gradient(-45deg, ${finalPatternColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${finalPatternColor} 75%), linear-gradient(-45deg, transparent 75%, ${finalPatternColor} 75%)`;
        backgroundSize = `${size}px ${size}px`;
        backgroundPosition = `0 0, 0 ${size/2}px, ${size/2}px -${size/2}px, -${size/2}px 0px`;
        break;

      case 'rings':
        backgroundImage = `radial-gradient(circle, transparent 20%, ${finalPatternColor} 20%, ${finalPatternColor} 30%, transparent 30%, transparent 70%, ${finalPatternColor} 70%, ${finalPatternColor} 80%, transparent 80%)`;
        backgroundSize = `${size}px ${size}px`;
        break;

      case 'hexagons': {
        const height = size * 1.732;
        const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${height}' viewBox='0 0 ${size} ${height}'><path d='M ${size/2} 0 L ${size} ${size/3.46} L ${size} ${size*1.15} L ${size/2} ${size*1.44} L 0 ${size*1.15} L 0 ${size/3.46} Z' fill='none' stroke='${patternColor}' stroke-width='${strokeWidth}' opacity='${alpha}'/></svg>`;
        const encodedSvg = btoa(svgContent);
        backgroundImage = `url("data:image/svg+xml;base64,${encodedSvg}")`;
        backgroundSize = `${size}px ${height}px`;
        break;
      }
    }

    const baseBackground = isGradient 
      ? `linear-gradient(135deg, ${bgColor} 0%, ${bgGradientEnd} 100%)`
      : bgColor;

    return {
      backgroundImage: backgroundImage + (backgroundImage ? ', ' : '') + baseBackground,
      backgroundSize: backgroundSize || 'auto',
      backgroundPosition: backgroundPosition || '0 0',
      backgroundBlendMode: blendMode,
    };
  };

  const patternCSS = generatePatternCSS();

  // Contrast WCAG calculations
  // Get luminance helper
  const getLuminance = (hex: string) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

    const values = [r, g, b].map(val => 
      val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    );
    return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
  };

  // Get Contrast Ratio between two hex colors
  const calculateContrastRatio = (color1: string, color2: string) => {
    try {
      const l1 = getLuminance(color1);
      const l2 = getLuminance(color2);
      const brightest = Math.max(l1, l2);
      const darkest = Math.min(l1, l2);
      return Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;
    } catch {
      return 4.5; // defaults standard
    }
  };

  // Compute readability score
  const isLightBase = getLuminance(bgColor) > 0.4;
  const sampleTextColor = isLightBase ? '#0f172a' : '#f8fafc';
  const contrastRatio = calculateContrastRatio(sampleTextColor, bgColor);

  const getWcagRating = (ratio: number) => {
    if (ratio >= 7) return { label: 'AAA Pass', color: 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20' };
    if (ratio >= 4.5) return { label: 'AA Pass', color: 'text-indigo-500 bg-indigo-500/10 border border-indigo-500/20' };
    return { label: 'Fail / Low Contrast', color: 'text-red-500 bg-red-500/10 border border-red-500/20' };
  };

  const rating = getWcagRating(contrastRatio);

  // Generate exporting clipboard copy segments
  const getCssCodeString = () => {
    return `.custom-pattern-bg {
  background-color: ${bgColor};
  background-image: ${patternCSS.backgroundImage};
  background-size: ${patternCSS.backgroundSize};
  background-position: ${patternCSS.backgroundPosition};
  ${blendMode !== 'normal' ? `background-blend-mode: ${blendMode};` : ''}
}`;
  };

  const getTailwindCodeString = () => {
    const isSvgInlined = ['plus', 'zigzag', 'waves', 'hexagons'].includes(patternType);
    if (isSvgInlined) {
      return `<div className="bg-[${bgColor}] bg-[image:${patternCSS.backgroundImage}] bg-[size:${patternCSS.backgroundSize}]">
  {/* Content */}
</div>`;
    }
    return `<div className="bg-[${bgColor}] bg-[radial-gradient(${patternColor}_${strokeWidth}px,transparent_${strokeWidth}px)] bg-[size:${size}px_${size}px]">
  {/* Content */}
</div>`;
  };

  const getReactCodeString = () => {
    return `import React from 'react';

export default function PatternBackground() {
  const containerStyle = {
    backgroundColor: "${bgColor}",
    backgroundImage: "${patternCSS.backgroundImage}",
    backgroundSize: "${patternCSS.backgroundSize}",
    backgroundPosition: "${patternCSS.backgroundPosition}",
    ${blendMode !== 'normal' ? `backgroundBlendMode: "${blendMode}",` : ''}
    width: '100%',
    minHeight: '100vh',
    padding: '24px'
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', color: '${sampleTextColor}' }}>
        <h1>Beautiful Dynamic BG Pattern</h1>
        <p>Interactive engineered styling.</p>
      </div>
    </div>
  );
}`;
  };

  const getSvgRawCodeString = () => {
    const alpha = opacity / 100;
    switch (patternType) {
      case 'plus':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <path d="M ${size/2} ${size/2 - strokeWidth*2.5} v ${strokeWidth*5} M ${size/2 - strokeWidth*2.5} ${size/2} h ${strokeWidth*5}" stroke="${patternColor}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="${alpha}"/>
</svg>`;
      case 'zigzag':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <path d="M 0 ${size/2} L ${size/4} ${size/4} L ${size/2} ${size/2} L ${size*0.75} ${size/4} L ${size} ${size/2}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" opacity="${alpha}"/>
</svg>`;
      case 'waves':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <path d="M 0 ${size/2} Q ${size/4} ${size/2 - size/4} ${size/2} ${size/2} T ${size} ${size/2}" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" stroke-linecap="round" opacity="${alpha}"/>
</svg>`;
      case 'hexagons':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size * 1.732}" viewBox="0 0 ${size} ${size * 1.732}">
  <path d="M ${size/2} 0 L ${size} ${size/3.46} L ${size} ${size*1.15} L ${size/2} ${size*1.44} L 0 ${size*1.15} L 0 ${size/3.46} Z" fill="none" stroke="${patternColor}" stroke-width="${strokeWidth}" opacity="${alpha}"/>
</svg>`;
      default:
        return `<!-- Standard HTML SVG fallback -->\n<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">\n  <circle cx="${size/2}" cy="${size/2}" r="${strokeWidth}" fill="${patternColor}" opacity="${alpha}" />\n</svg>`;
    }
  };

  const copyToClipboard = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(tabName);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const resetAllValues = () => {
    setPatternType('dotted');
    setSize(40);
    setStrokeWidth(1.5);
    setAngle(45);
    setOpacity(25);
    setBgColor('#090514');
    setBgGradientEnd('#03010c');
    setPatternColor('#ff007f');
    setIsGradient(true);
    setBlendMode('normal');
    setBackdropBlur(0);
    setOverlayOpacity(0);
    setActiveColorPreset(0);
  };

  return (
    <div className="animate-fade-in relative">
      
      {/* Visual Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-8 rounded-3xl bg-linear-to-r from-slate-900 via-violet-950 to-slate-900 border-2 border-slate-800 text-white shadow-xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 h-40 w-40 bg-violet-500/10 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 left-1/3 h-48 w-48 bg-fuchsia-500/10 blur-3xl rounded-full" />

        <div className="z-10 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 text-[10px] font-black uppercase tracking-widest font-display mb-3">
            <Sparkles className="h-3 w-3 animate-pulse" />
            CSS Studio Engine
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight font-display text-white mt-1">
            BACKGROUND <span className="text-violet-400">PATTERNS</span> GENERATOR
          </h1>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
            Architect custom grids, blueprint meshes, waves, and diagonal stripe background textures. Combine linear gradients and inlined SVGs into performant css assets instantly.
          </p>
        </div>

        {/* Global Action Reset */}
        <div className="z-10 flex flex-col justify-center">
          <button 
            onClick={resetAllValues}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-850 hover:border-slate-700 text-slate-300 text-xs font-black uppercase tracking-widest font-display shadow-md transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-violet-400" />
            Reset Design
          </button>
        </div>
      </div>

      {/* Modern Palette Color Schemes Pickers */}
      <div className="mb-8 bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Palette className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-200 font-display">
              Creative Color Palettes
            </h3>
            <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-relaxed">
              Quickly seed background and elements colors simultaneously
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {COLOR_PRESETS.map((preset, idx) => (
            <button
              key={preset.name}
              onClick={() => loadColorPreset(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 text-[10.5px] font-extrabold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeColorPreset === idx
                  ? 'border-violet-600 bg-violet-50/20 dark:bg-violet-950/20 text-violet-750 dark:text-violet-400'
                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-850 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center gap-1">
                <span className="w-3.5 h-3.5 rounded border border-white/20" style={{ backgroundColor: preset.bgColor }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.patternColor }} />
              </div>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
            
            {/* 1. SELECT PATTERN GEOMETRY */}
            <div className="mb-6">
              <label className="text-[11px] font-black uppercase tracking-widest text-slate-450 block mb-2.5 font-display flex items-center gap-1.5">
                <Layout className="h-3.5 w-3.5 text-violet-500" />
                Select Pattern Geometry
              </label>

              <div className="grid grid-cols-2 gap-2">
                {PATTERN_TYPES.map((pat) => (
                  <button
                    key={pat.id}
                    onClick={() => setPatternType(pat.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                      patternType === pat.id
                        ? 'border-violet-600 bg-violet-50/10 dark:bg-violet-950/20'
                        : 'border-slate-150 bg-white hover:border-slate-250 dark:border-slate-850 dark:bg-slate-950 dark:hover:border-slate-850'
                    }`}
                  >
                    <span className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-200 font-display">
                      {pat.name}
                    </span>
                    <span className="text-[9.5px] text-slate-450 mt-1 block">
                      {pat.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. PARAMETERS FORM */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-850 space-y-5">
              <div className="flex items-center gap-1.5 pb-2">
                <Sliders className="h-4 w-4 text-violet-500" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white font-display">
                  Interactive Geometry Tuners
                </h4>
              </div>

              {/* Size Slider */}
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-display">
                  <span>Pattern Grid Size (Spacing)</span>
                  <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">{size}px</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="160"
                  step="1"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>

              {/* Stroke Slider */}
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-display">
                  <span>Stroke / Element Width</span>
                  <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">{strokeWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>

              {/* Opacity Slider */}
              <div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-display">
                  <span>Pattern Opacity</span>
                  <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>

              {/* Angle Slider (Stripes only) */}
              {patternType === 'stripes' && (
                <div>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 font-display">
                    <span>Stripe Rotation Angle</span>
                    <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">{angle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="5"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                </div>
              )}
            </div>

            {/* 3. COLORS & BLENDING CUSTOMIZATIONS */}
            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-850 space-y-4">
              <div className="flex items-center gap-1.5 pb-1">
                <Paintbrush className="h-4 w-4 text-violet-500" />
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white font-display">
                  Colors Customizer
                </h4>
              </div>

              {/* Pattern stroke element color */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                  Pattern Vector Color
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={patternColor}
                    onChange={(e) => {
                      setPatternColor(e.target.value);
                      setActiveColorPreset(-1);
                    }}
                    className="cursor-pointer border border-transparent rounded-lg bg-transparent w-9 h-9 p-0"
                  />
                  <input
                    type="text"
                    maxLength={7}
                    value={patternColor}
                    onChange={(e) => {
                      setPatternColor(e.target.value);
                      setActiveColorPreset(-1);
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-750 dark:text-slate-300"
                  />
                </div>
              </div>

              {/* Background gradient toggle and base colors picker */}
              <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-150 dark:border-slate-850">
                <div className="flex items-center justify-between mb-3 text-[10.5px] font-black uppercase font-display text-slate-450">
                  <span>Is Gradient Base?</span>
                  <button
                    onClick={() => setIsGradient(!isGradient)}
                    className={`px-3 py-1 text-[9px] font-bold rounded-lg border uppercase transition-all ${
                      isGradient
                        ? 'bg-violet-600 text-white border-transparent'
                        : 'bg-white dark:bg-slate-950 text-slate-650 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {isGradient ? 'Yes (Linear)' : 'No (Flat)'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-450 block mb-1">
                      Start Color
                    </span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => {
                          setBgColor(e.target.value);
                          setActiveColorPreset(-1);
                        }}
                        className="cursor-pointer bg-transparent w-6.5 h-6.5 p-0"
                      />
                      <input
                        type="text"
                        maxLength={7}
                        value={bgColor}
                        onChange={(e) => {
                          setBgColor(e.target.value);
                          setActiveColorPreset(-1);
                        }}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300"
                      />
                    </div>
                  </div>

                  {isGradient && (
                    <div>
                      <span className="text-[9.5px] font-bold text-slate-450 block mb-1">
                        End Color
                      </span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={bgGradientEnd}
                          onChange={(e) => {
                            setBgGradientEnd(e.target.value);
                            setActiveColorPreset(-1);
                          }}
                          className="cursor-pointer bg-transparent w-6.5 h-6.5 p-0"
                        />
                        <input
                          type="text"
                          maxLength={7}
                          value={bgGradientEnd}
                          onChange={(e) => {
                            setBgGradientEnd(e.target.value);
                            setActiveColorPreset(-1);
                          }}
                          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Blend Modes Mixer */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
                  Background Blend Mode
                </span>
                <select
                  value={blendMode}
                  onChange={(e) => setBlendMode(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-750 dark:text-slate-300 outline-none"
                >
                  <option value="normal">Normal (Default)</option>
                  <option value="multiply">Multiply (Shadow intense)</option>
                  <option value="screen">Screen</option>
                  <option value="overlay">Overlay</option>
                  <option value="darken">Darken</option>
                  <option value="lighten">Lighten</option>
                  <option value="color-dodge">Color Dodge</option>
                  <option value="color-burn">Color Burn</option>
                  <option value="difference">Difference</option>
                  <option value="exclusion">Exclusion</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive live canvas & design centers */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Real-time Interactive Preview Stage */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-1.5 bg-violet-600/10 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-xl border border-violet-500/20">
                <Eye className="h-4 w-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider font-display">
                  Live Viewport Stage Playground
                </span>
              </div>

              {/* Viewport size controls */}
              <div className="flex gap-1.5 self-end">
                {[
                  { mode: 'desktop' as const, label: 'MacBook', icon: Monitor },
                  { mode: 'mobile' as const, label: 'iPhone', icon: Smartphone },
                  { mode: 'fullscreen' as const, label: 'Immersive', icon: Maximize2 }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.mode}
                      onClick={() => setViewportMode(item.mode)}
                      title={item.label}
                      className={`p-2 rounded-lg border transition-all cursor-pointer ${
                        viewportMode === item.mode
                          ? 'border-violet-600 bg-violet-500/10 text-violet-750 dark:text-violet-400'
                          : 'border-slate-200 text-slate-550 hover:bg-slate-50 dark:border-slate-800'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* DYNAMIC CANVAS CONTAINER */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex justify-center items-center p-6 h-[400px]">
              
              {/* THE GRADIENT + GEOMETRIC PATTERN CSS RENDERING LAYER */}
              <div 
                style={{
                  ...patternCSS,
                  position: 'absolute',
                  inset: 0,
                  transition: 'background-color 0.15s ease, background-size 0.1s ease',
                  zIndex: 1
                }}
              />

              {/* BLUR OVERLAY LAYER (Simulating a frosted zone behind content if desired) */}
              {backdropBlur > 0 && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backdropFilter: `blur(${backdropBlur}px)`,
                    zIndex: 2
                  }}
                />
              )}

              {/* TRANSLUCENT SHIELD MASK */}
              {overlayOpacity > 0 && (
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: overlayColor,
                    opacity: overlayOpacity / 100,
                    zIndex: 3
                  }}
                />
              )}

              {/* CARD PREVIEW DUMMY FOR TEXT CONTRAST & READABILITY COMPLIANCE */}
              {viewportMode !== 'fullscreen' && (
                <div 
                  className={`relative max-w-sm w-full mx-auto p-6 rounded-2xl border transition-all z-10 shadow-2xl ${
                    dummyCardBg === 'frosted'
                      ? 'bg-white/10 dark:bg-black/20 backdrop-blur-md border-white/20 text-white'
                      : dummyCardBg === 'solid-dark'
                      ? 'bg-slate-900 border-slate-850 text-slate-100'
                      : 'bg-white border-slate-150 text-slate-900'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-black tracking-widest uppercase py-0.5 px-2.5 rounded-full border border-violet-500/30 text-violet-400 bg-violet-500/10">
                      CSS Blueprint Test Card
                    </span>
                    <BadgeInfo className="h-4 w-4 text-slate-400" />
                  </div>

                  <h2 className="text-lg font-black tracking-tight leading-snug font-display mt-2 uppercase">
                    Readability Matrix
                  </h2>
                  <p className="text-[11px] leading-relaxed opacity-80 mt-2">
                    Test how your custom geometric pattern performs underneath production cards, text layers, and translucent user components.
                  </p>

                  {/* Contrast Ratings */}
                  <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="p-2 bg-slate-950/20 rounded-xl border border-white/5 flex flex-col justify-center">
                      <span className="text-[8.5px] uppercase font-bold text-slate-400 block mb-0.5 font-display">
                        WCAG 2.1 Score
                      </span>
                      <span className="text-sm font-mono font-black">{contrastRatio}:1 ratio</span>
                    </div>

                    <div className="p-2 bg-slate-950/20 rounded-xl border border-white/5 flex flex-col justify-center">
                      <span className="text-[8.5px] uppercase font-bold text-slate-400 block mb-0.5 font-display">
                        Compliance
                      </span>
                      <span className={`text-[10px] font-black uppercase text-center px-1.5 py-0.5 rounded ${rating.color}`}>
                        {rating.label.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Demo Interactive Actions inside preview */}
                  <div className="flex gap-2 mt-4 text-[10px] font-bold uppercase tracking-wider font-display">
                    <button className="flex-1 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-center cursor-pointer transition-colors border border-transparent shadow shadow-violet-500/30">
                      Standard Button
                    </button>
                    <button className="flex-1 py-1.5 rounded-lg bg-slate-800/60 dark:bg-white/10 hover:bg-slate-900 border border-slate-700/50 dark:border-white/10 text-center transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Fullscreen indicator if immersive mode is active */}
              {viewportMode === 'fullscreen' && (
                <div className="absolute top-4 left-4 bg-slate-950/75 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-white flex items-center gap-2 text-[10px] select-none z-10 font-bold tracking-wider uppercase font-display">
                  <BadgeInfo className="h-4 w-4 text-violet-400" />
                  <span>Interactive Immersive Area — Test Fullscreen Scaling</span>
                </div>
              )}
            </div>

            {/* Viewport Preferences Dock */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {/* UI Card Background choices */}
              <div>
                <label className="text-[9.5px] font-black uppercase text-slate-400 block mb-1 font-display">
                  Sample Widget Theme
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { style: 'frosted' as const, label: 'Glass' },
                    { style: 'solid-dark' as const, label: 'Dark' },
                    { style: 'solid-light' as const, label: 'Light' }
                  ].map((x) => (
                    <button
                      key={x.style}
                      onClick={() => setDummyCardBg(x.style)}
                      className={`text-[9px] font-extrabold uppercase py-1 border rounded-lg transition-all cursor-pointer font-display ${
                        dummyCardBg === x.style
                          ? 'border-violet-600 text-violet-650 bg-violet-50/10'
                          : 'border-slate-150 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overlay Backdrop Blur filter */}
              <div>
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 mb-1 font-display">
                  <span>Overlay Blur (Frosted)</span>
                  <span className="font-mono text-violet-600 font-bold">{backdropBlur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="0.5"
                  value={backdropBlur}
                  onChange={(e) => setBackdropBlur(Number(e.target.value))}
                  className="w-full h-1 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>

              {/* Translucent Shield overlay opacity */}
              <div>
                <div className="flex justify-between text-[9px] font-black uppercase text-slate-400 mb-1 font-display">
                  <span>Overlay Shield Mask</span>
                  <span className="font-mono text-violet-600 font-bold">{overlayOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="5"
                  value={overlayOpacity}
                  onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                  className="w-full h-1 bg-slate-150 rounded-lg appearance-none cursor-pointer accent-violet-600"
                />
              </div>
            </div>

          </div>

          {/* EXPORTING CODE MODULE */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
            
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-850 pb-3">
              <div className="flex items-center gap-2">
                <FolderSync className="h-4.5 w-4.5 text-violet-600 dark:text-violet-400" />
                <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
                  Export Crafted Pattern Style
                </h3>
              </div>

              <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-1">
                {(['css', 'tailwind', 'react', 'svg'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider font-display rounded-lg transition-all cursor-pointer ${
                      activeCodeTab === tab
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-750'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamically compiled copy clipboard code block */}
            <div className="relative rounded-2xl bg-slate-950 p-5 mt-4 min-h-[140px] border border-slate-850 overflow-x-auto">
              
              {/* Copy action key */}
              <button
                onClick={() => {
                  const targetCode = activeCodeTab === 'css' 
                    ? getCssCodeString() 
                    : activeCodeTab === 'tailwind' 
                    ? getTailwindCodeString() 
                    : activeCodeTab === 'react' 
                    ? getReactCodeString() 
                    : getSvgRawCodeString();
                  copyToClipboard(targetCode, activeCodeTab);
                }}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-350 cursor-pointer transition-all z-10 flex items-center gap-1.5"
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

              {/* Code print */}
              <pre className="text-xs font-mono font-bold text-slate-300 text-left whitespace-pre select-all pt-4">
                {activeCodeTab === 'css' && getCssCodeString()}
                {activeCodeTab === 'tailwind' && getTailwindCodeString()}
                {activeCodeTab === 'react' && getReactCodeString()}
                {activeCodeTab === 'svg' && getSvgRawCodeString()}
              </pre>

            </div>

            {/* Informational Help Alert Description */}
            <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-100/50 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed flex gap-3">
              <BadgeInfo className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-850 dark:text-slate-300 mb-0.5">Performance Optimized Assets</p>
                <p>
                  Linear gradients and vector Base64-encoded SVG background images are compiled natively inside standard CSS without triggering additional network HTTP overhead. Perfect for performance-sensitive landing pages and fluid styling utilities.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
