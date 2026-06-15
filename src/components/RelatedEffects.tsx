import React from 'react';
import { 
  Compass, Maximize, Droplet, Layers, Sparkles, Box, Scissors, ArrowRight, HelpCircle, MousePointer, Grid, Move, Activity, Loader, Aperture
} from 'lucide-react';
import { ActiveTab } from '../types';

interface RelatedEffectsProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function RelatedEffects({ activeTab, setActiveTab }: RelatedEffectsProps) {
  // Check if current active tab is indeed an effects generator
  const effectsTabs: ActiveTab[] = [
    'neumorphism', 
    'border-radius', 
    'glass', 
    'backdrop-filter', 
    'effects', 
    'shadow', 
    'clippath',
    'tooltip',
    'cursor',
    'background-pattern',
    'transform-playground',
    'cubic-bezier',
    'css-loaders',
    'filter-effects'
  ];

  const isEffectActive = effectsTabs.includes(activeTab);

  if (!isEffectActive) return null;

  const effects = [
    {
      id: 'filter-effects' as ActiveTab,
      label: 'Filter Effects',
      icon: Aperture,
      description: 'Interactive image CSS filters. Calibrate custom retro vintage, noir, cyberpunk, saturation, and contrast parameters.',
      colorClass: 'from-amber-500 via-orange-600 to-rose-600',
      tag: 'PHOTO FILTERS',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-slate-900 border border-slate-850 rounded-xl p-2.5">
          <div className="w-10 h-10 rounded bg-gradient-to-tr from-amber-500 to-rose-500 animate-pulse" style={{ filter: 'hue-rotate(60deg) saturate(1.5) contrast(1.2)' }} />
        </div>
      )
    },
    {
      id: 'css-loaders' as ActiveTab,
      label: 'CSS Loaders',
      icon: Loader,
      description: 'Interactive CSS loading indicators with customized size circles, colors, weight lines, speeds, and direct stylesheet exports.',
      colorClass: 'from-violet-650 via-pink-550 to-indigo-500',
      tag: 'INDICATORS',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-slate-900 border border-slate-850 rounded-xl p-2.5">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 border-b-indigo-500 animate-spin" />
        </div>
      )
    },
    {
      id: 'cubic-bezier' as ActiveTab,
      label: 'Cubic Bezier',
      icon: Activity,
      description: 'Interactive cubic bezier curve calculator modeled after Cubic Bezier Studio. Adjust vertices with spring overshooting and compare velocities.',
      colorClass: 'from-indigo-600 via-fuchsia-550 to-pink-500',
      tag: 'EASING TIMELN',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-slate-900 border border-slate-800 rounded-xl p-2.5">
          <div className="relative w-full bg-slate-950 h-5 rounded-full border border-slate-800/80 px-1.5 flex items-center overflow-hidden">
            <div 
              style={{ 
                animation: 'cubic-bounce-demo 1.5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite' 
              }} 
              className="w-3.5 h-3.5 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 shadow-md"
            />
          </div>
          <style>{`
            @keyframes cubic-bounce-demo {
              0% { transform: translateX(0); }
              50% { transform: translateX(calc(120%)); }
              100% { transform: translateX(0); }
            }
          `}</style>
        </div>
      )
    },
    {
      id: 'transform-playground' as ActiveTab,
      label: 'Transform Playground',
      icon: Move,
      description: 'Interactive 3D space with matrix controls for scale, perspective projection, skews, translation, and rotational axes.',
      colorClass: 'from-pink-500 via-fuchsia-600 to-indigo-650',
      tag: '3D TRANSFORMS',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-slate-900 border border-slate-800 rounded-xl">
          <div 
            style={{ 
              transform: 'perspective(100px) rotateX(15deg) rotateY(-20deg)',
              transformStyle: 'preserve-3d'
            }} 
            className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-indigo-500 border border-white/20 shadow-lg rounded-md"
          >
            <div className="absolute inset-0 bg-white/10" style={{ transform: 'translateZ(5px)' }} />
          </div>
        </div>
      )
    },
    {
      id: 'background-pattern' as ActiveTab,
      label: 'Background Pattern',
      icon: Grid,
      description: 'Interactive CSS checkers, dotted grids, stripes, and sinusoidal wave backgrounds generating Base64 encoded CSS layout vectors.',
      colorClass: 'from-violet-600 via-indigo-600 to-pink-500',
      tag: 'GEOMETRIC BG',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden p-1 rounded-xl bg-slate-900 border border-slate-800">
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'radial-gradient(#818cf8 1.5px, transparent 1.5px)',
              backgroundSize: '8px 8px'
            }}
          />
          <span className="relative text-[9px] font-black tracking-widest text-indigo-400 font-display">PATTERN BG</span>
        </div>
      )
    },
    {
      id: 'border-radius' as ActiveTab,
      label: 'Border Radius',
      icon: Maximize,
      description: '8-point asymmetrical border radius generator for organic morphing shapes and sleek elastic vector layouts.',
      colorClass: 'from-amber-400 via-rose-500 to-pink-600',
      tag: '8-POINT MORPH',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden">
          <div 
            style={{ borderRadius: '60% 40% 70% 30% / 60% 40% 60% 40%' }} 
            className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-rose-500 shadow-sm animate-pulse"
          />
        </div>
      )
    },
    {
      id: 'neumorphism' as ActiveTab,
      label: 'Neumorphism',
      icon: Compass,
      description: 'Skeuomorphic soft-shadow playground with dynamic light angle control, contrast offset, and blur variables.',
      colorClass: 'from-slate-400 via-slate-500 to-slate-600',
      tag: 'SFT SHADOW',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden p-2">
          <div 
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 transition-all"
            style={{
              boxShadow: '4px 4px 8px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.7)',
            }}
          />
        </div>
      )
    },
    {
      id: 'glass' as ActiveTab,
      label: 'Liquid Glass',
      icon: Droplet,
      description: 'Frosted Glassmorphism engine with floating fluid background layers, highlight borders, and reflection levels.',
      colorClass: 'from-indigo-400 via-cyan-500 to-blue-600',
      tag: 'GLASSMORPHISM',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden bg-slate-950 rounded-xl">
          <div className="absolute w-8 h-8 rounded-full bg-indigo-500 left-4 top-2 blur-xs opacity-70 animate-pulse" />
          <div className="absolute w-6 h-6 rounded-full bg-cyan-400 right-5 bottom-2 blur-xs opacity-60" />
          <div className="w-14 h-10 rounded-lg bg-white/10 border border-white/25 backdrop-blur-md relative z-10 shadow-lg" />
        </div>
      )
    },
    {
      id: 'backdrop-filter' as ActiveTab,
      label: 'Backdrop Filter',
      icon: Layers,
      description: 'Translucent glassmorphism controller altering areas directly behind components with premium GPU filters.',
      colorClass: 'from-purple-500 via-pink-500 to-rose-500',
      tag: 'GPU REPAINT',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden rounded-xl border border-slate-150 dark:border-slate-800">
          <div className="absolute inset-0 bg-linear-to-r from-emerald-400 via-yellow-350 to-pink-500 opacity-80" />
          <div className="absolute left-0 right-0 top-3 bottom-3 bg-white/10 dark:bg-black/10 backdrop-blur-xs border-y border-white/20" />
        </div>
      )
    },
    {
      id: 'effects' as ActiveTab,
      label: 'Hover Effect',
      icon: Sparkles,
      description: 'Interactive CSS hover action & animation creator adjusting transitions, scale shifts, and custom colors.',
      colorClass: 'from-violet-500 via-purple-500 to-fuchsia-500',
      tag: 'TRANSITION',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden p-2">
          <div className="group-hover:scale-105 group-hover:-translate-y-0.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase text-white bg-indigo-650 transition-all duration-300 shadow-sm shadow-indigo-500/20">
            Hover Me
          </div>
        </div>
      )
    },
    {
      id: 'shadow' as ActiveTab,
      label: 'Box Shadow',
      icon: Box,
      description: 'Sophisticated multi-layered CSS shadow generator simulating complex key lights and ambient depths.',
      colorClass: 'from-blue-500 via-indigo-500 to-violet-600',
      tag: 'DEPTH MATRIX',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden p-2">
          <div className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shadow-[0_10px_20px_rgba(99,102,241,0.2),0_2px_6px_rgba(99,102,241,0.1)]" />
        </div>
      )
    },
    {
      id: 'clippath' as ActiveTab,
      label: 'Clip-Path',
      icon: Scissors,
      description: 'Interactive CSS clip-path polygon generator with visual bounding coordinates and responsive nodes.',
      colorClass: 'from-rose-500 via-orange-500 to-amber-500',
      tag: 'POLYGON MASK',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden p-2">
          <div 
            className="w-10 h-10 bg-linear-to-tr from-rose-500 to-orange-500 shadow-sm"
            style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}
          />
        </div>
      )
    },
    {
      id: 'tooltip' as ActiveTab,
      label: 'Tooltip Generator',
      icon: HelpCircle,
      description: 'Interactive directional tooltip popups with customizable pointer sizes, animation types, and responsive HTML/CSS structures.',
      colorClass: 'from-fuchsia-500 via-indigo-500 to-blue-600',
      tag: 'UI POPUP',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden p-2 bg-slate-100 dark:bg-slate-900 rounded-xl">
          <div className="relative bg-indigo-650 text-white rounded-md px-2.5 py-1.5 text-[9px] font-bold shadow-md">
            Tooltip 💡
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-solid border-4 border-indigo-650 border-x-transparent border-b-transparent" />
          </div>
        </div>
      )
    },
    {
      id: 'cursor' as ActiveTab,
      label: 'Custom Cursor',
      icon: MousePointer,
      description: 'Modern custom cursors with trailing particle layers, custom SVGs, reactive click feedback, and script output.',
      colorClass: 'from-pink-500 via-purple-600 to-indigo-600',
      tag: 'CURSOR ENGINE',
      demo: (
        <div className="relative w-full h-16 flex items-center justify-center overflow-hidden p-2 bg-slate-100 dark:bg-slate-900 rounded-xl">
          <div className="relative flex items-center gap-2">
            <MousePointer className="h-4 w-4 text-indigo-500 animate-pulse" />
            <span className="text-[10px] font-black tracking-wider text-slate-500 dark:text-slate-400">CUSTOM CURSOR</span>
          </div>
        </div>
      )
    }
  ];

  // Exclude the currently active effect, leaving other related effects
  const filteredEffects = effects.filter(effect => effect.id !== activeTab);

  return (
    <div id="related-css-effects-section" className="mt-16 pt-12 border-t-2 border-slate-200 dark:border-slate-800/80 animate-fade-in mb-8">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1 rounded-xl border border-indigo-100/40 dark:border-indigo-900/40 uppercase tracking-widest font-mono">
            <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: '3s' }} /> Related CSS Effects
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-display mt-2.5">
            Explore Other Generators
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed uppercase tracking-wider font-semibold">
            Supercharge your design capabilities with our suite of high-fidelity interactive component stylers
          </p>
        </div>
        
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-lg uppercase font-bold">
          {filteredEffects.length} companion tools available
        </span>
      </div>

      {/* RESPONSIVE GRID LAYOUT: Strict 4 columns on large screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredEffects.map((effect) => {
          const Icon = effect.icon;
          return (
            <button
              key={effect.id}
              onClick={() => setActiveTab(effect.id)}
              className="group flex flex-col justify-between p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-left cursor-pointer hover:border-indigo-500/80 dark:hover:border-indigo-500/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4 w-full">
                
                {/* Demo Element Render & Accent Header */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-xl border border-slate-150 dark:border-slate-900 overflow-hidden">
                  {effect.demo}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white truncate font-display group-hover:text-amber-600 dark:group-hover:text-indigo-400 transition-colors">
                        {effect.label}
                      </h3>
                    </div>
                    
                    <span className="text-[8px] font-mono font-black scale-90 tracking-widest text-slate-400 px-1.5 py-0.5 rounded uppercase border border-slate-200 dark:border-slate-800 shrink-0">
                      {effect.tag}
                    </span>
                  </div>

                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
                    {effect.description}
                  </p>
                </div>

              </div>

              {/* Card Footer Interaction Bar */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-900 font-mono text-[9px] text-slate-400 w-full">
                <span className="font-bold tracking-widest uppercase text-slate-450 dark:text-slate-500">
                  /{effect.id}
                </span>
                <span className="flex items-center gap-1 font-bold font-display uppercase tracking-wider text-[9px] text-indigo-600 dark:text-indigo-400 opacity-60 group-hover:opacity-100 transition-all duration-200">
                  OPEN TOOL <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>

            </button>
          );
        })}
      </div>

    </div>
  );
}
