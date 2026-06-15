import React, { useState, useEffect } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Activity, Code, Copy, Check, 
  RefreshCw, Layers, Eye, Info, Layout, Cpu, Loader, Flame, Wand2
} from 'lucide-react';

interface LoaderEffect {
  id: string;
  name: string;
  category: 'spinners' | 'dots' | 'pulse' | 'progress' | 'shapes';
  description: string;
  html: string;
  // CSS builder function based on color, speed, size, thickness
  css: (color: string, speed: number, size: number, stroke: number) => string;
}

const LOADERS_LIBRARY: LoaderEffect[] = [
  // SPINNERS
  {
    id: 'classic-ring',
    name: 'Classic Dual Ring',
    category: 'spinners',
    description: 'A smooth continuous rotating double-colored ring with balanced orbital momentum.',
    html: '<div class="dual-ring"></div>',
    css: (color, speed, size, stroke) => `.dual-ring {
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  border: ${stroke}px solid ${color}20;
  border-top-color: ${color};
  border-bottom-color: ${color};
  animation: dual-ring-spin ${speed}s linear infinite;
}

@keyframes dual-ring-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`
  },
  {
    id: 'sleek-dash',
    name: 'Orbital Dash Ring',
    category: 'spinners',
    description: 'A stylish dashed geometric spinner that simulates hardware CPU cycle timers.',
    html: '<div class="orbital-dash"></div>',
    css: (color, speed, size, stroke) => `.orbital-dash {
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  border: ${stroke}px solid transparent;
  border-top-color: ${color};
  border-right-color: ${color};
  animation: orbital-dash-spin ${speed}s cubic-bezier(0.55, 0.085, 0.68, 0.53) infinite;
}

@keyframes orbital-dash-spin {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); border-top-color: ${color}90; }
  100% { transform: rotate(360deg); }
}`
  },
  {
    id: 'triple-orbit',
    name: 'Nested Triple Orbit',
    category: 'spinners',
    description: 'Complex multi-ring counter-rotational visual elements inspired by space gyroscope orbits.',
    html: `<div class="triple-orbit">
  <div class="orbit-inner"></div>
  <div class="orbit-mid"></div>
</div>`,
    css: (color, speed, size, stroke) => `.triple-orbit {
  position: relative;
  width: ${size}px;
  height: ${size}px;
  border: ${stroke}px solid transparent;
  border-top-color: ${color};
  border-radius: 50%;
  animation: triple-orbit-outer ${speed}s linear infinite;
}

.orbit-mid {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  border: ${Math.max(1, stroke - 1)}px solid transparent;
  border-right-color: ${color}cc;
  border-radius: 50%;
  animation: triple-orbit-mid ${speed * 0.75}s linear infinite reverse;
}

.orbit-inner {
  position: absolute;
  top: 9px;
  left: 9px;
  right: 9px;
  bottom: 9px;
  border: ${Math.max(1, stroke - 2)}px solid transparent;
  border-left-color: ${color}90;
  border-radius: 50%;
  animation: triple-orbit-inner ${speed * 0.5}s linear infinite;
}

@keyframes triple-orbit-outer {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes triple-orbit-mid {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes triple-orbit-inner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`
  },

  // DOTS
  {
    id: 'pulse-dots',
    name: 'Bouncing Beacon Dots',
    category: 'dots',
    description: 'A staggered modular bouncing dot trio ideal for conversational AI typing sequences.',
    html: `<div class="beacon-dots">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</div>`,
    css: (color, speed, size, stroke) => `.beacon-dots {
  display: flex;
  align-items: center;
  gap: ${Math.round(size / 6)}px;
}

.beacon-dots .dot {
  width: ${Math.round(size / 3.5)}px;
  height: ${Math.round(size / 3.5)}px;
  background-color: ${color};
  border-radius: 50%;
  animation: beacon-dots-bounce ${speed}s infinite ease-in-out;
}

.beacon-dots .dot:nth-child(1) {
  animation-delay: -0.32s;
}

.beacon-dots .dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes beacon-dots-bounce {
  0%, 80%, 100% { transform: scale(0.3); opacity: 0.3; }
  40% { transform: scale(1.1); opacity: 1; }
}`
  },
  {
    id: 'elastic-chase',
    name: 'Circular Dot Chase',
    category: 'dots',
    description: 'Classic physical clockwork layout with 8 orbital points decaying into elegant trails.',
    html: `<div class="dot-chase">
  <div class="chase-dot"></div>
  <div class="chase-dot"></div>
  <div class="chase-dot"></div>
  <div class="chase-dot"></div>
  <div class="chase-dot"></div>
  <div class="chase-dot"></div>
</div>`,
    css: (color, speed, size, stroke) => `.dot-chase {
  position: relative;
  width: ${size}px;
  height: ${size}px;
}

.chase-dot {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  animation: chase-spin ${speed * 1.5}s infinite linear;
}

.chase-dot:before {
  content: '';
  display: block;
  width: ${Math.round(size / 5)}px;
  height: ${Math.round(size / 5)}px;
  background-color: ${color};
  border-radius: 100%;
  animation: chase-scale ${speed * 1.5}s infinite ease-in-out;
}

.chase-dot:nth-child(1) { animation-delay: -0.5s; }
.chase-dot:nth-child(2) { animation-delay: -0.4s; }
.chase-dot:nth-child(3) { animation-delay: -0.3s; }
.chase-dot:nth-child(4) { animation-delay: -0.2s; }
.chase-dot:nth-child(5) { animation-delay: -0.1s; }

.chase-dot:nth-child(1):before { animation-delay: -0.5s; }
.chase-dot:nth-child(2):before { animation-delay: -0.4s; }
.chase-dot:nth-child(3):before { animation-delay: -0.3s; }
.chase-dot:nth-child(4):before { animation-delay: -0.2s; }
.chase-dot:nth-child(5):before { animation-delay: -0.1s; }

@keyframes chase-spin {
  100% { transform: rotate(360deg); }
}

@keyframes chase-scale {
  50% { transform: scale(0.4); opacity: 0.3; }
}`
  },

  // PULSE & RADIAL
  {
    id: 'fading-sonar',
    name: 'Sonar Echo Pulse',
    category: 'pulse',
    description: 'Dynamic concentric acoustic sonar ripples that decay softly into visual silence.',
    html: `<div class="sonar-pulse">
  <div class="pulse-wave"></div>
  <div class="pulse-center"></div>
</div>`,
    css: (color, speed, size, stroke) => `.sonar-pulse {
  position: relative;
  width: ${size}px;
  height: ${size}px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-center {
  width: ${Math.round(size / 3)}px;
  height: ${Math.round(size / 3)}px;
  background-color: ${color};
  border-radius: 50%;
  z-index: 2;
}

.pulse-wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: ${stroke}px solid ${color};
  border-radius: 50%;
  animation: sonar-radial ${speed}s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  z-index: 1;
}

@keyframes sonar-radial {
  0% { transform: scale(0.3); opacity: 1; }
  100% { transform: scale(1.6); opacity: 0; }
}`
  },
  {
    id: 'glowing-membrane',
    name: 'Breath Membrane Ring',
    category: 'pulse',
    description: 'Elegant ambient glowing halo representing organic, tranquil system state breathing loops.',
    html: '<div class="breath-ring"></div>',
    css: (color, speed, size, stroke) => `.breath-ring {
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background: transparent;
  border: ${stroke}px solid ${color}40;
  box-shadow: 0 0 15px ${color}30, inset 0 0 15px ${color}30;
  animation: breath-glow ${speed}s ease-in-out infinite;
}

@keyframes breath-glow {
  0%, 100% { transform: scale(0.95); opacity: 0.5; box-shadow: 0 0 5px ${color}15; }
  50% { transform: scale(1.08); opacity: 1; box-shadow: 0 0 25px ${color}60, inset 0 0 12px ${color}35; border-color: ${color}; }
}`
  },

  // PROGRESSIVE
  {
    id: 'fluid-bar',
    name: 'Infinite Hydro-Bar',
    category: 'progress',
    description: 'A smooth, modern horizontal status buffer with beautiful gradient liquid acceleration.',
    html: `<div class="hydro-progress">
  <div class="hydro-fill"></div>
</div>`,
    css: (color, speed, size, stroke) => `.hydro-progress {
  width: ${size * 2}px;
  height: ${stroke * 1.5}px;
  background-color: ${color}20;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

.hydro-fill {
  height: 100%;
  background: linear-gradient(90deg, ${color}20 0%, ${color} 50%, ${color}20 100%);
  width: 50%;
  position: absolute;
  border-radius: 30px;
  animation: hydro-flow ${speed * 1.2}s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes hydro-flow {
  0% { left: -50%; }
  100% { left: 100%; }
}`
  },
  {
    id: 'fringe-line',
    name: 'Quantum DNA Strands',
    category: 'progress',
    description: 'Two interleaved energetic tracking waves pulsing along a horizontal layout plane.',
    html: `<div class="fringe-line">
  <div class="strand"></div>
  <div class="strand"></div>
</div>`,
    css: (color, speed, size, stroke) => `.fringe-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${size * 1.5}px;
  height: ${size / 2}px;
  position: relative;
}

.strand {
  position: absolute;
  width: ${stroke * 1.5}px;
  height: 100%;
  background-color: ${color};
  border-radius: 30px;
  animation: swing-strand ${speed}s ease-in-out infinite;
}

.fringe-line .strand:nth-child(1) {
  left: 0;
  animation-delay: 0s;
}

.fringe-line .strand:nth-child(2) {
  right: 0;
  animation-delay: -${speed / 2}s;
  background-color: ${color}80;
}

@keyframes swing-strand {
  0%, 100% { transform: scaleY(0.2); }
  50% { transform: scaleY(1.3) translateX(${size / 1.5}px); }
}`
  },

  // GEOMETRIC SHAPES
  {
    id: 'kinetic-box',
    name: 'Kinetic Origami Cube',
    category: 'shapes',
    description: 'Beautiful looping 3D cubic orientation shifts ideal for high-tech digital dashboards.',
    html: '<div class="kinetic-box"></div>',
    css: (color, speed, size, stroke) => `.kinetic-box {
  width: ${size}px;
  height: ${size}px;
  border: ${stroke}px solid ${color};
  border-radius: 8px;
  animation: origami-flip ${speed * 1.5}s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

@keyframes origami-flip {
  0% { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
  50% { transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg); border-radius: 50%; }
  100% { transform: perspective(120px) rotateX(-180.1deg) rotateY(-179.9deg); border-radius: 8px; }
}`
  },
  {
    id: 'morphing-triangle',
    name: 'Prism Morph Halo',
    category: 'shapes',
    description: 'Polygonal crystalline morphing loop transitioning from sharp angles to circular flow.',
    html: '<div class="prism-morph"></div>',
    css: (color, speed, size, stroke) => `.prism-morph {
  width: ${size}px;
  height: ${size}px;
  background-color: ${color};
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  animation: prism-drift ${speed * 2}s linear infinite;
  opacity: 0.85;
}

@keyframes prism-drift {
  0% { transform: rotate(0deg); border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%; }
  50% { border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%; transform: scale(1.1) rotate(180deg); }
  100% { transform: rotate(360deg); border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%; }
}`
  }
];

export default function CssLoaders() {
  const [selectedLoader, setSelectedLoader] = useState<LoaderEffect>(LOADERS_LIBRARY[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Custom interactive parameters
  const [accentColor, setAccentColor] = useState<string>('#6366f1'); // Slate indigo
  const [speed, setSpeed] = useState<number>(1.2); // seconds
  const [size, setSize] = useState<number>(54); // px
  const [strokeWidth, setStrokeWidth] = useState<number>(4); // px
  const [stageBg, setStageBg] = useState<'midnight' | 'slate' | 'paper' | 'dark-mesh'>('midnight');

  // Clipboard tracking states
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedHTML, setCopiedHTML] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'html' | 'guide'>('css');

  // Load preset sizes easily
  const loadSizePreset = (pSize: number, pStroke: number) => {
    setSize(pSize);
    setStrokeWidth(pStroke);
  };

  const handleReset = () => {
    setAccentColor('#6366f1');
    setSpeed(1.2);
    setSize(54);
    setStrokeWidth(4);
    setStageBg('midnight');
  };

  // Build the live CSS style to inject dynamically
  const generatedCss = selectedLoader.css(accentColor, speed, size, strokeWidth);

  const formattedReactClassStr = selectedLoader.html;
  
  const tailwindGuideCode = `// Install in your global stylesheet:
// Input your generated keyframe blocks inside your CSS setup:

@layer utilities {
  ${generatedCss.replace(/\n/g, '\n  ')}
}

// In React Component markup:
${formattedReactClassStr}`;

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const getStageBgClass = () => {
    switch (stageBg) {
      case 'midnight':
        return 'bg-slate-950 text-slate-100';
      case 'slate':
        return 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100';
      case 'paper':
        return 'bg-white border-2 border-slate-100 text-slate-950';
      case 'dark-mesh':
        return 'bg-slate-950 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] text-white';
      default:
        return 'bg-slate-950 text-slate-100';
    }
  };

  const categories = [
    { id: 'all', label: 'All Indicators' },
    { id: 'spinners', label: 'Orbital Spinners' },
    { id: 'dots', label: 'Staggered Dots' },
    { id: 'pulse', label: 'Ambient Pulse' },
    { id: 'progress', label: 'Dynamic Bars' },
    { id: 'shapes', label: 'Retro Morph' }
  ];

  const filteredLibrary = LOADERS_LIBRARY.filter(loader => {
    if (activeCategory === 'all') return true;
    return loader.category === activeCategory;
  });

  return (
    <div id="css-loaders-generator" className="space-y-8">
      {/* Inject compiled customized styles live to affect dynamic HTML markup previews */}
      <style>{generatedCss}</style>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Configurations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/50">
                  <Sliders className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                    Loader Modifiers
                  </h3>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                    Calibrate scale and orbital delay
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
                  title="Scroll and focus CSS loaders FAQs"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">FAQ</span>
                </button>

                <button 
                  onClick={handleReset}
                  title="Reset loading parameters to template defaults"
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Accent Color Picker */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-0.5">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-350 uppercase tracking-wider">
                  Brand Color Key
                </span>
                <span className="text-[10px] font-mono text-slate-450 uppercase">{accentColor}</span>
              </div>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-10 h-10 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
                />
                
                {/* Visual Preset color tags */}
                <div className="flex-1 flex flex-wrap gap-1.5">
                  {[
                    { hex: '#6366f1', label: 'Indigo' },
                    { hex: '#ec4899', label: 'Rose' },
                    { hex: '#3b82f6', label: 'Sky' },
                    { hex: '#10b981', label: 'Mint' },
                    { hex: '#f59e0b', label: 'Amber' }
                  ].map((colorObj) => (
                    <button
                      key={colorObj.hex}
                      onClick={() => setAccentColor(colorObj.hex)}
                      className={`px-2 py-1 text-[10px] uppercase font-mono font-bold rounded-md border text-slate-650 dark:text-slate-350 hover:border-slate-350 transition-colors cursor-pointer ${
                        accentColor === colorObj.hex ? 'bg-slate-100 dark:bg-slate-800 border-indigo-500' : 'bg-transparent border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {colorObj.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Sliders parameters */}
            <div className="space-y-5 pt-2">
              
              {/* Slider 1: Dimension Size */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-medium text-slate-650 dark:text-slate-350">
                  <span>Sizing Radius (Scale)</span>
                  <span className="font-mono font-bold text-indigo-650 dark:text-indigo-450">{size}px</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="120" 
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                {/* Size preset shortcuts */}
                <div className="flex justify-end gap-1">
                  <button 
                    onClick={() => loadSizePreset(28, 2.5)} 
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
                  >
                    Compact (28px)
                  </button>
                  <button 
                    onClick={() => loadSizePreset(56, 4)} 
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
                  >
                    Moderate (56px)
                  </button>
                  <button 
                    onClick={() => loadSizePreset(90, 6.5)} 
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800"
                  >
                    Heavy (90px)
                  </button>
                </div>
              </div>

              {/* Slider 2: Stroke Line Thickness */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-medium text-slate-650 dark:text-slate-350">
                  <span>Stroke Line Weight</span>
                  <span className="font-mono font-bold text-indigo-650 dark:text-indigo-450">{strokeWidth}px</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="12" 
                  value={strokeWidth}
                  disabled={selectedLoader.category === 'dots'} // disabled for dot bouncing vectors
                  onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                  className={`w-full accent-indigo-600 h-1.5 rounded-lg cursor-pointer ${
                    selectedLoader.category === 'dots' ? 'opacity-30 cursor-not-allowed bg-slate-200' : 'bg-slate-100 dark:bg-slate-800'
                  }`}
                />
                {selectedLoader.category === 'dots' && (
                  <p className="text-[9px] text-amber-500 font-medium">
                    * Not applicable for Staggered Dots indicator
                  </p>
                )}
              </div>

              {/* Slider 3: Orbit Time Speed */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-medium text-slate-650 dark:text-slate-350">
                  <span>Cycle Interval (Duration)</span>
                  <span className="font-mono font-bold text-indigo-650 dark:text-indigo-450">{speed}s</span>
                </div>
                <input 
                  type="range" 
                  min="0.3" 
                  max="3.0" 
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

            </div>

            {/* Quick Tips Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                <Info className="h-3.5 w-3.5" />
                <span>Production Tip</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                By implementing indicators purely with CSS animations and hardware-accelerated transforms (<code className="font-mono text-indigo-500 opacity-90">transform: rotate</code>, <code className="font-mono text-indigo-500">scale</code>), you bypass JS evaluation cycles entirely. This guarantees fluid 60FPS UI rendering even during heavy CPU database queries.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Previews and Library Options */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Live Interactive Stage with Dynamic inline rules */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/50">
                  <Activity className="h-4.5 w-4.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                    Live Stage Sandbox
                  </h3>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                    Observe customized animation speed in modern environments
                  </p>
                </div>
              </div>

              {/* Stage background modifier */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-855">
                {[
                  { id: 'midnight', label: 'Dark' },
                  { id: 'slate', label: 'System' },
                  { id: 'paper', label: 'White' },
                  { id: 'dark-mesh', label: 'Grid' }
                ].map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setStageBg(bg.id as any)}
                    className={`px-2.5 py-1 text-[9px] font-bold uppercase rounded-md transition-colors cursor-pointer ${
                      stageBg === bg.id
                        ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-905 shadow-sm'
                        : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sandbox Viewport Area */}
            <div className={`h-[190px] rounded-2xl flex items-center justify-center relative transition-all duration-300 ${getStageBgClass()}`}>
              
              {/* Dynamic DOM injection to instantiate selected styled markup */}
              <div className="flex flex-col items-center gap-4">
                
                {/* Dynamically parsed HTML structure */}
                <div 
                  className="flex justify-center items-center relative inline-block text-current font-bold"
                  dangerouslySetInnerHTML={{ __html: selectedLoader.html }}
                />
                
                {/* Mini Status flag */}
                <span className="text-[10px] font-mono tracking-wider font-bold bg-white/10 text-slate-400 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm select-all">
                  class: {selectedLoader.id}
                </span>

              </div>

            </div>

          </div>

          {/* Library Picker Catalog */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-pink-500" />
                <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                  CSS Indicators Library
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full font-bold border border-slate-150 dark:border-slate-855">
                {LOADERS_LIBRARY.length} presets
              </span>
            </div>

            {/* Category tabs list */}
            <div className="flex flex-wrap gap-1 border-b border-slate-100 dark:border-slate-850 pb-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-855/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Scrolled list of indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 max-h-[290px] overflow-y-auto scrollbar-thin pr-1">
              {filteredLibrary.map((item) => {
                const isSelected = selectedLoader.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedLoader(item)}
                    className={`p-3 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-24 group relative ${
                      isSelected
                        ? 'bg-gradient-to-br from-indigo-50/60 to-rose-50/40 dark:from-indigo-950/30 dark:to-pink-950/20 border-indigo-400 dark:border-indigo-800 ring-2 ring-indigo-500/20 shadow-sm'
                        : 'bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-750'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black uppercase font-display tracking-widest truncate pr-2">
                          {item.name}
                        </span>
                        
                        {/* mini tag */}
                        <span className="text-[8px] font-mono text-slate-400 dark:text-slate-500 uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400 leading-normal line-clamp-2 mt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-2 flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-850/60">
                      <span className="text-[8px] font-mono text-indigo-500 font-bold">
                        .{item.id}
                      </span>
                      <span className="text-[8px] font-display text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Load Preview →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>      {/* COMPACT CODE EXPORTER & IMPLEMENTATION CHANNELS */}
      <div className="bg-white dark:bg-slate-950 border-2 border-slate-205 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden animate-fade-in mt-8" id="loaders-exporter">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Code className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              Pristine CSS Loader Exporter
            </h3>
          </div>

          {/* Code format toggle buttons */}
          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1">
            {[
              { id: 'css', label: 'Standard CSS' },
              { id: 'html', label: 'HTML Markup' },
              { id: 'guide', label: 'Integration Setup' }
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
                textToCopy = generatedCss;
                setCopied = setCopiedCSS;
              } else if (activeCodeTab === 'html') {
                textToCopy = selectedLoader.html;
                setCopied = setCopiedHTML;
              } else if (activeCodeTab === 'guide') {
                textToCopy = tailwindGuideCode;
                setCopied = setCopiedTailwind;
              }
              copyToClipboard(textToCopy, setCopied);
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400 cursor-pointer transition-all z-10 flex items-center gap-1.5"
          >
            {(activeCodeTab === 'css' ? copiedCSS : activeCodeTab === 'html' ? copiedHTML : copiedTailwind) ? (
              <>
                <Check className="h-4.5 w-4.5 text-emerald-500" />
                <span className="text-[10px] font-black uppercase text-emerald-500 font-display font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4.5 w-4.5 text-indigo-400" />
                <span className="text-[10px] font-black uppercase font-display text-slate-300 font-bold">Copy Code</span>
              </>
            )}
          </button>

          {/* Print Code segment */}
          <pre className="text-xs font-mono font-bold text-slate-300 text-left whitespace-pre select-all pt-4 leading-normal max-h-[350px] scrollbar-thin">
            {activeCodeTab === 'css' && generatedCss}
            {activeCodeTab === 'html' && selectedLoader.html}
            {activeCodeTab === 'guide' && tailwindGuideCode}
          </pre>
        </div>

      </div>

    </div>
  );
}
