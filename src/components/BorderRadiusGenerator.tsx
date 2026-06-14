import React, { useState } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Layers, Code, Palette, HelpCircle, 
  Copy, Check, Image, Grid, Eye, CheckCircle, Compass, Maximize
} from 'lucide-react';

interface RadiusPreset {
  name: string;
  description: string;
  // 8 values representing tlh trh brh blh / tlv trv brv blv
  tlh: number;
  trh: number;
  brh: number;
  blh: number;
  tlv: number;
  trv: number;
  brv: number;
  blv: number;
  color: string;
}

const RADIUS_PRESETS: RadiusPreset[] = [
  {
    name: 'Organic Blob',
    description: 'Perfect fluid organic droplet shape',
    tlh: 60, trh: 40, brh: 70, blh: 30,
    tlv: 60, trv: 40, brv: 60, blv: 40,
    color: 'from-amber-400 to-rose-500'
  },
  {
    name: 'Soft Egg',
    description: 'Nostalgic asymmetrical organic egg structure',
    tlh: 50, trh: 50, brh: 50, blh: 50,
    tlv: 60, trv: 60, brv: 40, blv: 40,
    color: 'from-emerald-400 to-teal-600'
  },
  {
    name: 'Wobbly Stone',
    description: 'Natural river-washed polished stone curvature',
    tlh: 30, trh: 70, brh: 70, blh: 30,
    tlv: 30, trv: 30, brv: 70, blv: 70,
    color: 'from-blue-600 to-indigo-800'
  },
  {
    name: 'Sleek Shield',
    description: 'Modern dynamic software badge motif',
    tlh: 50, trh: 50, brh: 20, blh: 20,
    tlv: 10, trv: 10, brv: 90, blv: 90,
    color: 'from-fuchsia-600 to-pink-500'
  },
  {
    name: 'Liquid Leaf',
    description: 'Sharp nature leaf shape with dual pointed tips',
    tlh: 0, trh: 100, brh: 0, blh: 100,
    tlv: 0, trv: 100, brv: 0, blv: 100,
    color: 'from-green-450 to-emerald-500'
  },
  {
    name: 'Speech Bubble',
    description: 'Interactive talk balloon format',
    tlh: 40, trh: 40, brh: 40, blh: 0,
    tlv: 40, trv: 40, brv: 40, blv: 100,
    color: 'from-indigo-500 via-purple-500 to-pink-500'
  },
  {
    name: 'Curved Card',
    description: 'Modern structural layout component panel',
    tlh: 24, trh: 24, brh: 8, blh: 8,
    tlv: 24, trv: 24, brv: 8, blv: 8,
    color: 'from-amber-200 to-orange-500'
  },
  {
    name: 'Fluid Cushion',
    description: 'Gently waving puffed aesthetic layout block',
    tlh: 48, trh: 52, brh: 45, blh: 55,
    tlv: 55, trv: 45, brv: 52, blv: 48,
    color: 'from-cyan-500 to-blue-500'
  }
];

type AspectRatioType = 'square' | 'wide' | 'tall';
type FillPatternType = 'gradient' | 'grid' | 'neon' | 'glass';

export default function BorderRadiusGenerator() {
  // Horizontal sliders (percentage)
  const [tlh, setTlh] = useState<number>(60);
  const [trh, setTrh] = useState<number>(40);
  const [brh, setBrh] = useState<number>(70);
  const [blh, setBlh] = useState<number>(30);

  // Vertical sliders (percentage)
  const [tlv, setTlv] = useState<number>(60);
  const [trv, setTrv] = useState<number>(40);
  const [brv, setBrv] = useState<number>(60);
  const [blv, setBlv] = useState<number>(40);

  // Playground configuration
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('square');
  const [fillPattern, setFillPattern] = useState<FillPatternType>('gradient');
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [showValuesOverlay, setShowValuesOverlay] = useState<boolean>(true);

  // Exporters statuses
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);

  // Assemble full 8-point string
  // tl-h tr-h br-h bl-h / tl-v tr-v br-v bl-v
  const buildBorderRadiusValue = () => {
    return `${tlh}% ${trh}% ${brh}% ${blh}% / ${tlv}% ${trv}% ${brv}% ${blv}%`;
  };

  const currentRadiusString = buildBorderRadiusValue();

  const applyPreset = (index: number) => {
    setActivePresetIndex(index);
    const p = RADIUS_PRESETS[index];
    setTlh(p.tlh);
    setTrh(p.trh);
    setBrh(p.brh);
    setBlh(p.blh);
    
    setTlv(p.tlv);
    setTrv(p.trv);
    setBrv(p.brv);
    setBlv(p.blv);
  };

  const handleReset = () => {
    setTlh(60);
    setTrh(40);
    setBrh(70);
    setBlh(30);

    setTlv(60);
    setTrv(40);
    setBrv(60);
    setBlv(40);

    setAspectRatio('square');
    setFillPattern('gradient');
    setActivePresetIndex(0);
    setShowValuesOverlay(true);
  };

  // Modern CSS3 block
  const cssCode = `/* CSS3 organic 8-point border-radius */
border-radius: ${currentRadiusString};
-webkit-border-radius: ${currentRadiusString};`;

  // Tailwind build code
  const getTailwindCode = () => {
    // arbitrary raw tailwind notation
    const cleanRadius = currentRadiusString.replace(/\s+/g, '_');
    return `<div class="rounded-[${cleanRadius}] bg-gradient-to-tr from-indigo-500 to-purple-600 w-64 h-64 shadow-xl">\n  <!-- Organic Shape Element -->\n</div>`;
  };

  const reactCode = `const organicShapeStyle = {
  borderRadius: '${currentRadiusString}',
  WebkitBorderRadius: '${currentRadiusString}'
};

// Render React block
<div style={organicShapeStyle} className="bg-indigo-600" />`;

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
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6 sm:py-10 animate-fade-in" id="border-radius-workspace">
      
      {/* HEADER UNIT */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-6 animate-fade-in">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-display font-black text-xs uppercase tracking-widest mb-1.5 animate-pulse">
            <Sparkles className="h-4 w-4" /> 8-point shape morpher
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-display sm:text-4xl">
            Border Radius CSS Playground
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-display font-medium uppercase tracking-wider">
            Exquisite interactive customizer simulating fluid shapes, sleek organic blobs, and asymmetrical card corners
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black uppercase tracking-wider font-display rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer self-start md:self-center transition-all shadow-2xs"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Reset Playground
        </button>
      </div>

      {/* QUICK PRESETS CAROUSEL */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-450 dark:text-slate-500 flex items-center gap-2 font-display">
            <Palette className="h-4 w-4 text-indigo-500" /> Organic Curvature Presets
          </h3>
          <span className="text-[9px] font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold uppercase px-2 py-0.5 rounded-full">
            Fluid blob layout templates
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {RADIUS_PRESETS.map((preset, idx) => {
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
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-900 dark:text-white leading-tight">
                      {preset.name}
                    </p>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-tr ${preset.color} block`} />
                  </div>
                  <p className="text-[9px] text-slate-500 leading-normal leading-tight line-clamp-2">
                    {preset.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[8px] font-mono text-indigo-650 dark:text-indigo-400 font-extrabold pb-0.5 mt-2">
                  <span>H: {preset.tlh}%</span>
                  <span>V: {preset.tlv}%</span>
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

          {/* 8-POINT ROTATIONAL SLIDERS */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-200 flex items-center gap-2 font-display">
                <Sliders className="h-4 w-4 text-indigo-500" /> Split Axis Curvature Controls (H &times; V)
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-400">Axes split</span>
                <span className="text-[9px] font-mono font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
                  8-POINT VALUES
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* AXIS A: HORIZONTAL RADII RANGE */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-1 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-450">Horizontal Axis &rarr;</span>
                  <span className="text-[9px] font-mono text-slate-400">Left-to-Right offset</span>
                </div>

                {/* Top-Left Horizontal */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-650 dark:text-slate-400">
                    <span>1. Top-Left (H)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{tlh}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={tlh}
                    onChange={(e) => { setTlh(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

                {/* Top-Right Horizontal */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-650 dark:text-slate-400">
                    <span>2. Top-Right (H)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{trh}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={trh}
                    onChange={(e) => { setTrh(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

                {/* Bottom-Right Horizontal */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-650 dark:text-slate-400">
                    <span>3. Bottom-Right (H)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{brh}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={brh}
                    onChange={(e) => { setBrh(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

                {/* Bottom-Left Horizontal */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-655 dark:text-slate-400">
                    <span>4. Bottom-Left (H)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{blh}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={blh}
                    onChange={(e) => { setBlh(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

              </div>

              {/* AXIS B: VERTICAL RADII RANGE */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800/80 pb-1 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-450">Vertical Axis &darr;</span>
                  <span className="text-[9px] font-mono text-slate-400 font-medium">Up-and-Down stretch</span>
                </div>

                {/* Top-Left Vertical */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-650 dark:text-slate-400">
                    <span>5. Top-Left (V)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{tlv}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={tlv}
                    onChange={(e) => { setTlv(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

                {/* Top-Right Vertical */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-650 dark:text-slate-400">
                    <span>6. Top-Right (V)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{trv}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={trv}
                    onChange={(e) => { setTrv(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

                {/* Bottom-Right Vertical */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-655 dark:text-slate-400">
                    <span>7. Bottom-Right (V)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{brv}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={brv}
                    onChange={(e) => { setBrv(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

                {/* Bottom-Left Vertical */}
                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wide text-slate-655 dark:text-slate-400">
                    <span>8. Bottom-Left (V)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{blv}%</span>
                  </div>
                  <input
                    type="range" min="0" max="100" step="1" value={blv}
                    onChange={(e) => { setBlv(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-400 uppercase">
                    <span>Point 0%</span>
                    <span>Center 50%</span>
                    <span>100% End</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* METRIC HELPER BOXES */}
          <div className="bg-slate-50 dark:bg-slate-950/45 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Visual Grid Helpers
                </h4>
                <p className="text-[10px] text-slate-500">Configure visual canvas aspect ratios and styling</p>
              </div>
              
              <button 
                onClick={() => setShowValuesOverlay(p => !p)}
                className={`text-[9.5px] font-black uppercase px-3 py-1 font-display border cursor-pointer rounded-lg duration-150 ${
                  showValuesOverlay 
                    ? 'bg-slate-900 border-transparent text-white dark:bg-white dark:text-slate-900 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-450 hover:bg-slate-50'
                }`}
              >
                {showValuesOverlay ? "Hide Handle Overlay" : "Show Handle Overlay"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Aspect selection ratio */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Canvas Aspect Ratio</span>
                <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800/80">
                  {(['square', 'wide', 'tall'] as AspectRatioType[]).map((aspect) => (
                    <button
                      key={aspect}
                      onClick={() => setAspectRatio(aspect)}
                      className={`flex-1 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg cursor-pointer ${
                        aspectRatio === aspect
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      {aspect}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fill styling selections */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Fill Color Pattern</span>
                <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800/80">
                  {(['gradient', 'grid', 'neon', 'glass'] as FillPatternType[]).map((pattern) => (
                    <button
                      key={pattern}
                      onClick={() => setFillPattern(pattern)}
                      className={`flex-1 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg cursor-pointer ${
                        fillPattern === pattern
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      {pattern}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* PREVIEW STAGE (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">

          {/* DYNAMIC SHAPE PREVIEW CANVAS */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between overflow-hidden relative">
            
            <div className="flex items-center justify-between w-full mb-4 z-10">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                <Eye className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[9.5px] font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-350">
                  Canvas Viewport
                </span>
              </div>
              <span className="text-[9px] font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold uppercase px-2 py-0.5 rounded-lg">
                Real-time Rendering
              </span>
            </div>

            {/* MAIN STAGE PORTAL */}
            <div className="relative w-full h-[370px] rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-850/80 p-6">
              
              {/* STAGE SUB-GRID LAYER FOR PRECISION ALIGNMENT */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-25" />
              
              {/* ROTATING BACKGROUND DECORATION */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-slate-800/60 rounded-full pointer-events-none animate-spin" style={{ animationDuration: '30s' }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-slate-750/30 rounded-full pointer-events-none" />

              {/* ASPECT ASPECT RATIO CONTAINER CLASS WRAPPER */}
              <div className={`transition-all duration-300 w-full flex items-center justify-center ${
                aspectRatio === 'square' ? 'max-w-[280px] h-[280px]' : 
                aspectRatio === 'wide' ? 'max-w-[320px] h-[200px]' : 
                'max-w-[220px] h-[300px]'
              }`}>
                
                {/* MORPHING CSS SHAPE BLOCK */}
                <div 
                  style={{
                    borderRadius: currentRadiusString,
                    transition: 'border-radius 0.15s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className={`w-full h-full relative shadow-2xl flex flex-col items-center justify-center p-6 text-center group ${
                    fillPattern === 'gradient' ? 'bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 text-white' :
                    fillPattern === 'grid' ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white' :
                    fillPattern === 'neon' ? 'bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500 text-indigo-400 font-mono shadow-[0_0_30px_rgba(99,102,241,0.25)]' :
                    'bg-white/10 dark:bg-slate-900/45 border border-white/30 dark:border-slate-800 backdrop-blur-md text-slate-900 dark:text-white'
                  }`}
                >
                  {/* Subtle pulsing glow */}
                  <div className="absolute -inset-1.5 bg-indigo-500/10 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition duration-300" />

                  {/* LOGO IN Shape representing dynamic status */}
                  <Compass className={`h-8 w-8 mb-2.5 animate-pulse ${
                    fillPattern === 'neon' ? 'text-indigo-500' : 'text-white/90'
                  }`} />
                  
                  <div className="space-y-1 select-none z-10 pointer-events-none">
                    <p className="text-xs uppercase font-black tracking-widest font-display text-white">
                      SHAPE MORPH
                    </p>
                    <p className={`text-[10px] font-mono ${
                      fillPattern === 'neon' ? 'text-indigo-450' : 'text-white/70'
                    }`}>
                      {tlh}% {trh}% / {tlv}% {trv}%
                    </p>
                  </div>

                  {/* VISUAL CURVATURE HANDLE METRICS OVERLAYS */}
                  {showValuesOverlay && (
                    <div className="absolute inset-0 pointer-events-none select-none text-[8.5px] font-mono">
                      
                      {/* Top-Left Anchor Points */}
                      <span className="absolute top-2 left-2 bg-slate-950/90 text-amber-400 font-bold border border-slate-800 px-1.5 py-0.5 rounded leading-none">
                        tlh: {tlh}% | tlv: {tlv}%
                      </span>

                      {/* Top-Right Anchor Points */}
                      <span className="absolute top-2 right-2 bg-slate-950/90 text-emerald-450 font-bold border border-slate-800 px-1.5 py-0.5 rounded leading-none">
                        trh: {trh}% | trv: {trv}%
                      </span>

                      {/* Bottom-Right Anchor Points */}
                      <span className="absolute bottom-2 right-2 bg-slate-950/90 text-indigo-400 font-bold border border-slate-800 px-1.5 py-0.5 rounded leading-none">
                        brh: {brh}% | brv: {brv}%
                      </span>

                      {/* Bottom-Left Anchor Points */}
                      <span className="absolute bottom-2 left-2 bg-slate-950/90 text-pink-400 font-bold border border-slate-800 px-1.5 py-0.5 rounded leading-none">
                        blh: {blh}% | blv: {blv}%
                      </span>

                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* PREVIEW BOTTOM VALUATORS */}
            <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3.5 z-10">
              <span className="text-[10px] font-black font-display uppercase tracking-wider text-slate-450 block mb-1">
                Raw Output String:
              </span>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[10.5px] text-indigo-400 text-center select-all whitespace-nowrap overflow-x-auto leading-none">
                border-radius: {currentRadiusString};
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* FULL-WIDTH REAL TIME EXPORT PANEL */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6 font-display animate-fade-in">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-150 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2 font-display">
              <Code className="h-5 w-5 text-indigo-500" /> Real-time Export Panel
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
              Copy generated border-radius parameters instantly in your preferred structures
            </p>
          </div>
          <span className="self-start sm:self-center text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-55/60 dark:bg-emerald-950/40 border border-emerald-200/50 dark:border-emerald-990/55 px-3 py-1 rounded-xl uppercase tracking-wider animate-pulse flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Live Synced
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* RAW CSS BOX */}
          <div className="space-y-3 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-950/30 p-4.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-350">
                <span>1. Standard CSS3 Declarations</span>
                <button
                  onClick={() => copyToClipboard(cssCode, 'css')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-105 duration-150 flex items-center gap-1 cursor-pointer font-display"
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

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-indigo-400 overflow-x-auto select-all whitespace-pre h-[140px] flex items-start justify-start">
                <code className="w-full text-left block">{cssCode}</code>
              </div>
            </div>
          </div>

          {/* TAILWIND CSS BOX */}
          <div className="space-y-3 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-950/30 p-4.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-650 dark:text-slate-350">
                <span>2. Tailwind CSS Arbitrary Class</span>
                <button
                  onClick={() => copyToClipboard(getTailwindCode(), 'tailwind')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-105 duration-150 flex items-center gap-1 cursor-pointer font-display"
                >
                  {copiedTailwind ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> COPY CLASS
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-purple-200 overflow-x-auto select-all whitespace-pre h-[140px] flex items-start justify-start">
                <code className="w-full text-left block">{getTailwindCode()}</code>
              </div>
            </div>
          </div>

          {/* REACT CONST DECLARATION BOX */}
          <div className="space-y-3 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-950/30 p-4.5 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-slate-655 dark:text-slate-350">
                <span>3. React Inline Style Declaration</span>
                <button
                  onClick={() => copyToClipboard(reactCode, 'react')}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-indigo-655 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 hover:bg-indigo-105 duration-150 flex items-center gap-1 cursor-pointer font-display"
                >
                  {copiedReact ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-550" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" /> COPY INLINE JS
                    </>
                  )}
                </button>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[11px] leading-relaxed text-blue-200 overflow-x-auto select-all whitespace-pre h-[140px] flex items-start justify-start">
                <code className="w-full text-left block">{reactCode}</code>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* COMPACT INTUITIVE DESCRIPTION SECTION */}
      <div className="bg-slate-50 dark:bg-slate-955 rounded-2xl border-2 border-slate-205 dark:border-slate-850 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 text-left">
          <div className="bg-indigo-50 dark:bg-indigo-950 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900">
            <Maximize className="h-6 w-6 text-indigo-600 dark:text-indigo-450" />
          </div>
          <div>
            <h4 className="text-xs uppercase font-black tracking-wider text-slate-850 dark:text-white">
              Understanding 8-value border-radius Mechanics
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-550 dark:text-slate-400 max-w-2xl">
              By adding a slash (<span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">/</span>), we isolate horizontal radius offsets from vertical radius offsets. The values before the slash dictate the horizontal point limits for all four corners (Top-Left, Top-Right, Bottom-Right, Bottom-Left), while the values following the slash control the corresponding vertical curves. This creates custom elastic vectors instead of simple circles.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
