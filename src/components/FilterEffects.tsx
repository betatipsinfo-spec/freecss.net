import React, { useState } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Activity, Code, Copy, Check, 
  Layers, Eye, Info, Layout, Cpu, Image as ImageIcon, Link as LinkIcon, HelpCircle, ArrowRight, Wand2
} from 'lucide-react';

interface FilterPreset {
  id: string;
  name: string;
  description: string;
  filters: {
    blur: number;
    brightness: number;
    contrast: number;
    grayscale: number;
    hueRotate: number;
    invert: number;
    opacity: number;
    saturate: number;
    sepia: number;
  };
}

const PRESETS_LIBRARY: FilterPreset[] = [
  {
    id: 'vintage-warmth',
    name: 'Vintage Warmth',
    description: 'Soft warm nostalgic sepia values with low saturation and boosted contrast.',
    filters: { blur: 0, brightness: 94, contrast: 115, grayscale: 0, hueRotate: 0, invert: 0, opacity: 100, saturate: 75, sepia: 40 }
  },
  {
    id: 'cyberpunk-neon',
    name: 'Cyberpunk Neon',
    description: 'Heavily saturated neon palette with cybernetic hue rotation.',
    filters: { blur: 0, brightness: 105, contrast: 130, grayscale: 0, hueRotate: 285, invert: 0, opacity: 100, saturate: 190, sepia: 0 }
  },
  {
    id: 'classic-noir',
    name: 'Classic Noir',
    description: 'High-contrast dramatic monochrome with silver highlights.',
    filters: { blur: 0, brightness: 90, contrast: 145, grayscale: 100, hueRotate: 0, invert: 0, opacity: 100, saturate: 0, sepia: 0 }
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Sunny warm glow simulating perfect sunset illumination.',
    filters: { blur: 0, brightness: 108, contrast: 110, grayscale: 0, hueRotate: 15, invert: 0, opacity: 100, saturate: 140, sepia: 15 }
  },
  {
    id: 'cool-midnight',
    name: 'Midnight Dream',
    description: 'Eerie blue nocturnal fantasy with partial inversion overlays.',
    filters: { blur: 0, brightness: 80, contrast: 120, grayscale: 0, hueRotate: 195, invert: 12, opacity: 100, saturate: 135, sepia: 5 }
  },
  {
    id: 'emerald-breeze',
    name: 'Emerald Aurora',
    description: 'Lush dynamic greens and deep mystical ambient highlights.',
    filters: { blur: 0, brightness: 100, contrast: 120, grayscale: 0, hueRotate: 115, invert: 0, opacity: 100, saturate: 150, sepia: 10 }
  },
  {
    id: 'dreamy-mist',
    name: 'Dreamy Mist',
    description: 'Soft-focus cinematic atmospheric glow with high pastel opacity.',
    filters: { blur: 2, brightness: 112, contrast: 90, grayscale: 0, hueRotate: 340, invert: 0, opacity: 95, saturate: 110, sepia: 10 }
  },
  {
    id: 'high-contrast-acid',
    name: 'Psychedelic Acid',
    description: 'Hyper-vivid invert loops with intense neon color scales.',
    filters: { blur: 0, brightness: 125, contrast: 180, grayscale: 0, hueRotate: 75, invert: 80, opacity: 100, saturate: 250, sepia: 30 }
  }
];

const IMAGES_LIBRARY = [
  {
    id: 'neon-city',
    name: 'Cyberpunk Neon',
    url: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'mountain',
    name: 'Mountain Sunrise',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'portrait',
    name: 'Aesthetic Portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'supercar',
    name: 'Retro Supercar',
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80'
  }
];

export default function FilterEffects() {
  // Main slider state bounds
  const [blur, setBlur] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [grayscale, setGrayscale] = useState<number>(0);
  const [hueRotate, setHueRotate] = useState<number>(0);
  const [invert, setInvert] = useState<number>(0);
  const [opacity, setOpacity] = useState<number>(100);
  const [saturate, setSaturate] = useState<number>(100);
  const [sepia, setSepia] = useState<number>(0);

  // Active picture selection
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(IMAGES_LIBRARY[0].url);
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [showCustomInput, setShowCustomInput] = useState<boolean>(false);

  // Interactive split screen controller slider percentage (0 to 100)
  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState<boolean>(false);

  // Copy tracking triggers
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react'>('css');

  // Active preset tracking string
  const [activePresetId, setActivePresetId] = useState<string>('custom');

  // Applies selected preset configuration to hooks
  const loadPreset = (preset: FilterPreset) => {
    setActivePresetId(preset.id);
    setBlur(preset.filters.blur);
    setBrightness(preset.filters.brightness);
    setContrast(preset.filters.contrast);
    setGrayscale(preset.filters.grayscale);
    setHueRotate(preset.filters.hueRotate);
    setInvert(preset.filters.invert);
    setOpacity(preset.filters.opacity);
    setSaturate(preset.filters.saturate);
    setSepia(preset.filters.sepia);
  };

  const handleReset = () => {
    setActivePresetId('custom');
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setGrayscale(0);
    setHueRotate(0);
    setInvert(0);
    setOpacity(100);
    setSaturate(100);
    setSepia(0);
  };

  const handleCustomImageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customImageUrl.trim().startsWith('http')) {
      setSelectedImageUrl(customImageUrl.trim());
    }
  };

  // Build Filter CSS values
  const getFilterString = () => {
    const filtersList: string[] = [];
    if (blur > 0) filtersList.push(`blur(${blur}px)`);
    if (brightness !== 100) filtersList.push(`brightness(${brightness}%)`);
    if (contrast !== 100) filtersList.push(`contrast(${contrast}%)`);
    if (grayscale > 0) filtersList.push(`grayscale(${grayscale}%)`);
    if (hueRotate > 0) filtersList.push(`hue-rotate(${hueRotate}deg)`);
    if (invert > 0) filtersList.push(`invert(${invert}%)`);
    if (opacity !== 100) filtersList.push(`opacity(${opacity}%)`);
    if (saturate !== 100) filtersList.push(`saturate(${saturate}%)`);
    if (sepia > 0) filtersList.push(`sepia(${sepia}%)`);

    return filtersList.length > 0 ? filtersList.join(' ') : 'none';
  };

  const filterCssCode = `filter: ${getFilterString()};`;

  // Get tailwind representations
  const getTailwindClasses = () => {
    const classesList: string[] = ['filter'];
    if (blur > 0) {
      if (blur <= 2) classesList.push('blur-sm');
      else if (blur <= 4) classesList.push('blur');
      else if (blur <= 8) classesList.push('blur-md');
      else if (blur <= 12) classesList.push('blur-lg');
      else classesList.push('blur-xl');
    }
    if (brightness !== 100) {
      if (brightness < 50) classesList.push('brightness-50');
      else if (brightness < 75) classesList.push('brightness-75');
      else if (brightness < 95) classesList.push('brightness-90');
      else if (brightness < 105) classesList.push('brightness-100');
      else if (brightness < 115) classesList.push('brightness-110');
      else if (brightness < 130) classesList.push('brightness-125');
      else if (brightness < 160) classesList.push('brightness-150');
      else classesList.push('brightness-200');
    }
    if (contrast !== 100) {
      if (contrast < 50) classesList.push('contrast-50');
      else if (contrast < 75) classesList.push('contrast-75');
      else if (contrast < 110) classesList.push('contrast-100');
      else if (contrast < 135) classesList.push('contrast-125');
      else if (contrast < 160) classesList.push('contrast-150');
      else classesList.push('contrast-200');
    }
    if (grayscale > 0) {
      if (grayscale > 75) classesList.push('grayscale');
      else classesList.push(`grayscale-[${grayscale}%]`);
    }
    if (hueRotate > 0) {
      classesList.push(`hue-rotate-[${hueRotate}deg]`);
    }
    if (invert > 0) {
      if (invert > 75) classesList.push('invert');
      else classesList.push(`invert-[${invert}%]`);
    }
    if (opacity !== 100) {
      classesList.push(`opacity-[${opacity}%]`);
    }
    if (saturate !== 100) {
      classesList.push(`saturate-[${saturate}%]`);
    }
    if (sepia > 0) {
      if (sepia > 75) classesList.push('sepia');
      else classesList.push(`sepia-[${sepia}%]`);
    }

    return classesList.join(' ');
  };

  const reactSampleCode = `// React Component inline usage
<img 
  src="${selectedImageUrl.substring(0, 50)}..." 
  alt="Filtered Target Component" 
  style={{ filter: "${getFilterString()}" }} 
  className="rounded-2xl object-cover w-full h-full"
/>`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Start dragging split screen
  const handleSplitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingSplit || e.buttons === 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
      setSplitPercent(pct);
    }
  };

  return (
    <div id="filter-effects-generator" className="space-y-8 animate-fade-in">
      
      {/* Top Interactive Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Filter adjustments */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-150 dark:border-violet-900/50 animate-pulse">
                  <Sliders className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                    Filter Calibrator
                  </h3>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                    Construct raw CSS pixel matrix values
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
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
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                  title="Scroll and focus Filter Effects FAQs"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">FAQ</span>
                </button>

                <button 
                  onClick={handleReset}
                  title="Reset loading parameters to defaults"
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Core Sliders Grid */}
            <div className="space-y-4 pt-1">
              
              {/* Slider 1: Blur */}
              <div className="space-y-1" id="filter-ctrl-blur">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Blur Radius</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{blur}px</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="20" 
                  step="1"
                  value={blur}
                  onChange={(e) => { setBlur(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2: Brightness */}
              <div className="space-y-1" id="filter-ctrl-brightness">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Brightness</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{brightness}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="250" 
                  step="5"
                  value={brightness}
                  onChange={(e) => { setBrightness(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3: Contrast */}
              <div className="space-y-1" id="filter-ctrl-contrast">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Contrast</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{contrast}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="250" 
                  step="5"
                  value={contrast}
                  onChange={(e) => { setContrast(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 4: Grayscale */}
              <div className="space-y-1" id="filter-ctrl-grayscale">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Grayscale</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{grayscale}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={grayscale}
                  onChange={(e) => { setGrayscale(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 5: Hue Rotate */}
              <div className="space-y-1" id="filter-ctrl-huerotate">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Hue Rotation</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{hueRotate}deg</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="360" 
                  step="5"
                  value={hueRotate}
                  onChange={(e) => { setHueRotate(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 6: Invert */}
              <div className="space-y-1" id="filter-ctrl-invert">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Invert Palette</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{invert}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={invert}
                  onChange={(e) => { setInvert(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 7: Opacity */}
              <div className="space-y-1" id="filter-ctrl-opacity">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Alpha Opacity</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{opacity}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="5"
                  value={opacity}
                  onChange={(e) => { setOpacity(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 8: Saturate */}
              <div className="space-y-1" id="filter-ctrl-saturate">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Saturation Volume</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{saturate}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="300" 
                  step="5"
                  value={saturate}
                  onChange={(e) => { setSaturate(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 9: Sepia */}
              <div className="space-y-1" id="filter-ctrl-sepia">
                <div className="flex justify-between text-[11px] font-bold text-slate-650 dark:text-slate-350">
                  <span className="uppercase tracking-wide font-mono text-[10px]">Sepia Tone</span>
                  <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{sepia}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={sepia}
                  onChange={(e) => { setSepia(parseInt(e.target.value)); setActivePresetId('custom'); }}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Real-Time Split Interactive Stage & Preset Library */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Live Interactive Stage */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/50">
                  <Activity className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                    Split-Lens Viewer
                  </h3>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                    Drag the center handle side-to-side to view real-time changes
                  </p>
                </div>
              </div>

              <span className="text-[9px] font-mono font-extrabold text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md border border-indigo-100 dark:border-indigo-900/40">
                Left: Original | Right: Filtered
              </span>
            </div>

            {/* Split Screen Viewport Container */}
            <div 
              id="split-lens-viewport"
              className="h-[300px] rounded-2xl relative select-none overflow-hidden group cursor-ew-resize border border-slate-200 dark:border-slate-850 bg-slate-900 shadow-inner"
              onMouseMove={handleSplitMouseMove}
              onMouseDown={() => setIsDraggingSplit(true)}
              onMouseUp={() => setIsDraggingSplit(false)}
              onMouseLeave={() => setIsDraggingSplit(false)}
            >
              {/* Lower layer: UNFILTERED (Original image fully unmapped) */}
              <div className="absolute inset-0 pointer-events-none">
                <img 
                  referrerPolicy="no-referrer"
                  src={selectedImageUrl}
                  alt="Original unfiltered visual state"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upper layer: FILTERED (Clipped by active slider location percentage) */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all"
                style={{
                  clipPath: `inset(0 0 0 ${splitPercent}%)`
                }}
              >
                <img 
                  referrerPolicy="no-referrer"
                  src={selectedImageUrl}
                  alt="Modified image with filter applied"
                  className="w-full h-full object-cover"
                  style={{
                    filter: getFilterString()
                  }}
                />
              </div>

              {/* Overlay Label "Original" (Left) */}
              <div className="absolute left-4 top-4 bg-slate-950/70 backdrop-blur text-[9px] font-mono font-bold text-white uppercase px-2.5 py-1 rounded-md tracking-wider border border-white/10 opacity-70">
                Original
              </div>

              {/* Overlay Label "Filtered" (Right) */}
              <div className="absolute right-4 top-4 bg-violet-955/70 backdrop-blur text-[9px] font-mono font-bold text-white uppercase px-2.5 py-1 rounded-md tracking-wider border border-violet-500/20 opacity-90">
                Filtered: {activePresetId}
              </div>

              {/* Interactive Divider Bar */}
              <div 
                className="absolute top-0 bottom-0 w-0.5 bg-indigo-500 hover:bg-indigo-400 cursor-ew-resize z-20 pointer-events-none"
                style={{ left: `${splitPercent}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs shadow-md">
                  ↔
                </div>
              </div>

            </div>

            {/* Target Samples Pick List */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-550 uppercase font-mono tracking-widest">
                  Target Photos Library
                </span>
                <button
                  onClick={() => setShowCustomInput(!showCustomInput)}
                  className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <LinkIcon className="h-3 w-3" />
                  <span>{showCustomInput ? 'Close Custom URL' : 'Use Custom Photo URL'}</span>
                </button>
              </div>

              {showCustomInput && (
                <form onSubmit={handleCustomImageSubmit} className="flex gap-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Input direct photo url (Unsplash image link, png, etc)..."
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white hover:bg-indigo-750 px-4 py-2 rounded-xl text-xs font-bold uppercase cursor-pointer"
                  >
                    Load Target
                  </button>
                </form>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1">
                {IMAGES_LIBRARY.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => { setSelectedImageUrl(img.url); setShowCustomInput(false); }}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer overflow-hidden ${
                      selectedImageUrl === img.url
                        ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20'
                        : 'border-slate-150 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850/50'
                    }`}
                  >
                    <div className="w-full h-11 rounded-lg overflow-hidden relative border border-slate-100 dark:border-slate-800">
                      <img 
                        referrerPolicy="no-referrer"
                        src={img.url} 
                        alt={img.name} 
                        className="w-full h-full object-cover scale-105"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-350 truncate w-full">
                      {img.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Curated Filter presets library */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-violet-500" />
                <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                  Pre-compiled Filter Presets
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full font-bold border border-slate-150 dark:border-slate-855">
                {PRESETS_LIBRARY.length} presets
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {PRESETS_LIBRARY.map((preset) => {
                const isSelected = activePresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => loadPreset(preset)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-24 group relative ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-50/60 to-rose-50/40 dark:from-indigo-950/30 dark:to-pink-950/20 border-indigo-400 dark:border-indigo-800 ring-2 ring-indigo-500/20 shadow-sm'
                        : 'bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-750'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase font-display tracking-widest block text-slate-800 dark:text-slate-200">
                        {preset.name}
                      </span>
                      <p className="text-[9px] text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400 leading-normal line-clamp-2 mt-1">
                        {preset.description}
                      </p>
                    </div>

                    <div className="mt-2 flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-850/60">
                      <span className="text-[8px] font-mono text-indigo-500 font-bold">
                        preset:{preset.id.substring(0, 10)}
                      </span>
                      <span className="text-[8px] font-display text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Apply →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>

      {/* CODE EXPORTER PANEL - Full Width 12-column Section */}
      <div className="bg-white dark:bg-slate-950 border-2 border-slate-205 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden animate-fade-in mt-8" id="filter-exporter">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Code className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              CSS Filter Code Exposer
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
              let setCopied: (v: boolean) => void = () => {};
              if (activeCodeTab === 'css') {
                textToCopy = filterCssCode;
                setCopied = setCopiedCSS;
              } else if (activeCodeTab === 'tailwind') {
                textToCopy = getTailwindClasses();
                setCopied = setCopiedTailwind;
              } else if (activeCodeTab === 'react') {
                textToCopy = reactSampleCode;
                setCopied = setCopiedReact;
              }
              copyToClipboard(textToCopy, setCopied);
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
            {activeCodeTab === 'css' && filterCssCode}
            {activeCodeTab === 'tailwind' && getTailwindClasses()}
            {activeCodeTab === 'react' && reactSampleCode}
          </pre>
        </div>

      </div>

    </div>
  );
}
