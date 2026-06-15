import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Activity, Code, Play, Pause, 
  Copy, Check, RefreshCw, Zap, Layers, HelpCircle, ArrowRight,
  Info, Eye, Layout, Cpu, BadgeInfo, Box
} from 'lucide-react';

interface BezierPreset {
  name: string;
  category: 'css' | 'sine' | 'quad' | 'cubic' | 'quart' | 'quint' | 'expo' | 'circ' | 'back';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  description: string;
}

const BEZIER_PRESETS: BezierPreset[] = [
  // Standard CSS Easings
  { name: 'Ease (Default)', category: 'css', x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0, description: 'Standard subtle start, quick acceleration, slow end deceleration' },
  { name: 'Linear', category: 'css', x1: 0.0, y1: 0.0, x2: 1.0, y2: 1.0, description: 'Uniform speed throughout the entire transition' },
  { name: 'Ease-In', category: 'css', x1: 0.42, y1: 0.0, x2: 1.0, y2: 1.0, description: 'Slow starting acceleration leading up to an abrupt stop' },
  { name: 'Ease-Out', category: 'css', x1: 0.0, y1: 0.0, x2: 0.58, y2: 1.0, description: 'Abrupt quick start decelerating down to a soft end' },
  { name: 'Ease-In-Out', category: 'css', x1: 0.42, y1: 0.0, x2: 0.58, y2: 1.0, description: 'Balanced soft entry and soft exit transitions' },

  // Sine
  { name: 'In Sine', category: 'sine', x1: 0.12, y1: 0.0, x2: 0.39, y2: 0.0, description: 'Very gentle, smooth initial entry acceleration' },
  { name: 'Out Sine', category: 'sine', x1: 0.61, y1: 1.0, x2: 0.88, y2: 1.0, description: 'Very gentle, smooth final decelerating exit' },
  { name: 'InOut Sine', category: 'sine', x1: 0.37, y1: 0.0, x2: 0.63, y2: 1.0, description: 'Slightly softer transition profile than standard ease-in-out' },

  // Quad
  { name: 'In Quad', category: 'quad', x1: 0.11, y1: 0.0, x2: 0.5, y2: 0.0, description: 'Moderate acceleration, ideal for physical slide entries' },
  { name: 'Out Quad', category: 'quad', x1: 0.5, y1: 1.0, x2: 0.89, y2: 1.0, description: 'Moderate deceleration, excellent for mechanical components' },
  { name: 'InOut Quad', category: 'quad', x1: 0.45, y1: 0.0, x2: 0.55, y2: 1.0, description: 'Smooth, predictable quad-curved acceleration and deceleration' },

  // Cubic
  { name: 'In Cubic', category: 'cubic', x1: 0.32, y1: 0.0, x2: 0.67, y2: 0.0, description: 'Steep acceleration for high-energy transitions' },
  { name: 'Out Cubic', category: 'cubic', x1: 0.33, y1: 1.0, x2: 0.68, y2: 1.0, description: 'Sleek deceleration, perfect for dropdown panels' },
  { name: 'InOut Cubic', category: 'cubic', x1: 0.65, y1: 0.0, x2: 0.35, y2: 1.0, description: 'Sharper middle dynamic shift, highly expressive structure' },

  // Quart
  { name: 'In Quart', category: 'quart', x1: 0.5, y1: 0.0, x2: 0.75, y2: 0.0, description: 'Abrupt quick curve building momentum late' },
  { name: 'Out Quart', category: 'quart', x1: 0.25, y1: 1.0, x2: 0.5, y2: 1.0, description: 'Snappy initial launch with long decelerating buffer' },
  { name: 'InOut Quart', category: 'quart', x1: 0.76, y1: 0.0, x2: 0.24, y2: 1.0, description: 'Pronounced acceleration change midway through the timeline' },

  // Quint
  { name: 'In Quint', category: 'quint', x1: 0.64, y1: 0.0, x2: 0.78, y2: 0.0, description: 'Very steep onset curve, high energetic delay' },
  { name: 'Out Quint', category: 'quint', x1: 0.22, y1: 1.0, x2: 0.36, y2: 1.0, description: 'Extremely snappy onset with a smooth feathering stop' },
  { name: 'InOut Quint', category: 'quint', x1: 0.83, y1: 0.0, x2: 0.17, y2: 1.0, description: 'Dramatic, high-impact mechanical staging curve' },

  // Expo
  { name: 'In Expo', category: 'expo', x1: 0.7, y1: 0.0, x2: 0.84, y2: 0.0, description: 'Sudden vertical speed burst at the very last second' },
  { name: 'Out Expo', category: 'expo', x1: 0.16, y1: 1.0, x2: 0.3, y2: 1.0, description: 'Instantaneous snap with massive decelerating glide' },
  { name: 'InOut Expo', category: 'expo', x1: 0.87, y1: 0.0, x2: 0.13, y2: 1.0, description: 'Extremely sharp sudden shift from static to full flight' },

  // Circ
  { name: 'In Circ', category: 'circ', x1: 0.55, y1: 0.0, x2: 1.0, y2: 0.45, description: 'Rigid starting progression followed by snappy termination' },
  { name: 'Out Circ', category: 'circ', x1: 0.0, y1: 0.55, x2: 0.45, y2: 1.0, description: 'Instant speed followed by prolonged circle deceleration' },
  { name: 'InOut Circ', category: 'circ', x1: 0.85, y1: 0.0, x2: 0.15, y2: 1.0, description: 'Fluid circular mechanical shifting timeline' },

  // Back (Elastic Bounce Overshoot)
  { name: 'In Back (Anticipate)', category: 'back', x1: 0.36, y1: 0.0, x2: 0.66, y2: -0.56, description: 'Pulls back in negative territory before pushing forward' },
  { name: 'Out Back (Overshoot)', category: 'back', x1: 0.34, y1: 1.56, x2: 0.64, y2: 1.0, description: 'Shoots past the target limit before settling into position' },
  { name: 'InOut Back (Elastic)', category: 'back', x1: 0.68, y1: -0.6, x2: 0.32, y2: 1.6, description: 'Anticipates behind start, overshoots end, then settles' }
];

type TargetPropType = 'translate-x' | 'scale' | 'rotate' | 'color-shift' | 'slide-up-down';
type CustomEasingPresetKey = 'custom' | 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

export default function CubicBezierGenerator() {
  // Coordinate coordinates for control points P1 (x1, y1) and P2 (x2, y2)
  const [x1, setX1] = useState<number>(0.34);
  const [y1, setY1] = useState<number>(1.56);
  const [x2, setX2] = useState<number>(0.64);
  const [y2, setY2] = useState<number>(1.0);

  // Play controls
  const [duration, setDuration] = useState<number>(1.2);
  const [targetProp, setTargetProp] = useState<TargetPropType>('translate-x');
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [animationTick, setAnimationTick] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Dragging local tracking state
  const [draggingPoint, setDraggingPoint] = useState<'p1' | 'p2' | null>(null);

  // Exporters statuses
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react' | 'javascript'>('css');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Coordinates Converter functions (relative to SVG boundaries)
  // Let SVG viewBox="0 0 360 360"
  // Core transition square bounded from x=60 to x=300 (W=240, H=240)
  // y ranges from 0.0 at SVG y=300 to 1.0 at SVG y=60
  const getSvgX = (nx: number) => 60 + nx * 240;
  // Standard inversion of y-axis for standard viewport representation
  const getSvgY = (ny: number) => 300 - ny * 240;

  const getNormalizedX = (svgX: number) => {
    const val = (svgX - 60) / 240;
    return Math.min(Math.max(val, 0), 1);
  };

  const getNormalizedY = (svgY: number) => {
    const val = (300 - svgY) / 240;
    // Allow extended overflow vertically to construct elastic overshoots (clamped for visual aesthetics)
    return Math.min(Math.max(val, -1.5), 2.5);
  };

  const handlePointerDown = (point: 'p1' | 'p2', e: React.PointerEvent<SVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDraggingPoint(point);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingPoint) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert screen scale back to the 360 viewBox scale
    const svgX = (clientX / rect.width) * 360;
    const svgY = (clientY / rect.height) * 360;

    const nx = parseFloat(getNormalizedX(svgX).toFixed(2));
    const ny = parseFloat(getNormalizedY(svgY).toFixed(2));

    if (draggingPoint === 'p1') {
      setX1(nx);
      setY1(ny);
    } else {
      setX2(nx);
      setY2(ny);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGElement>) => {
    if (draggingPoint) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDraggingPoint(null);
    }
  };

  // Quick preset loading
  const loadPreset = (preset: BezierPreset) => {
    setX1(preset.x1);
    setY1(preset.y1);
    setX2(preset.x2);
    setY2(preset.y2);
  };

  const handleReset = () => {
    setX1(0.34);
    setY1(1.56);
    setX2(0.64);
    setY2(1.0);
    setDuration(1.2);
    setTargetProp('translate-x');
    setIsLooping(true);
  };

  const forceReplay = () => {
    setAnimationTick(prev => prev + 1);
  };

  // Re-trigger visual replay each time duration, target or coordinates shift
  useEffect(() => {
    if (!isLooping) {
      forceReplay();
    }
  }, [x1, y1, x2, y2, targetProp, duration, isLooping]);

  // Copy code strings
  const rawBezier = `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  const cssProperty = `transition-timing-function: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});`;
  const cssTransition = `transition: all ${duration}s cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});`;
  
  const tailwindConfig = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'custom-bezier': 'cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})',
      }
    }
  }
}`;

  const framerMotionCode = `// React Framer Motion transition config
<motion.div
  animate={{ x: 200 }}
  transition={{ 
    ease: [${x1}, ${y1}, ${x2}, ${y2}], 
    duration: ${duration} 
  }}
/>`;

  const webAnimationsJS = `// Web Animations API
element.animate([
  { transform: 'translateX(0px)' },
  { transform: 'translateX(280px)' }
], {
  duration: ${Math.round(duration * 1000)},
  easing: 'cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})',
  iterations: ${isLooping ? 'Infinity' : '1'},
  fill: 'forwards'
});`;

  const copyToClipboard = (text: string, format: 'css' | 'tailwind' | 'react' | 'javascript') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedText(format);
        setTimeout(() => setCopiedText(null), 2000);
      });
    }
  };

  const categories = [
    { id: 'all', label: 'All Easings' },
    { id: 'css', label: 'CSS Standards' },
    { id: 'sine', label: 'Sine' },
    { id: 'quad', label: 'Quad/Cubic' },
    { id: 'quart', label: 'Quart/Quint' },
    { id: 'expo', label: 'Expo/Circ' },
    { id: 'back', label: 'Elastic Back' }
  ];

  const filteredPresets = BEZIER_PRESETS.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'quad') return p.category === 'quad' || p.category === 'cubic';
    if (activeCategory === 'quart') return p.category === 'quart' || p.category === 'quint';
    if (activeCategory === 'expo') return p.category === 'expo' || p.category === 'circ';
    return p.category === activeCategory;
  });

  // Derived control point coordinates for SVG representation
  const p0Svg = { x: getSvgX(0), y: getSvgY(0) };
  const p1Svg = { x: getSvgX(x1), y: getSvgY(y1) };
  const p2Svg = { x: getSvgX(x2), y: getSvgY(y2) };
  const p3Svg = { x: getSvgX(1), y: getSvgY(1) };

  // Helper class names for selected target translation test vectors
  const getSimulativeStyle = (bezierVal: string) => {
    const iteration = isLooping ? 'infinite' : '1';
    
    let baseStyles: React.CSSProperties = {
      animationDuration: `${duration}s`,
      animationTimingFunction: bezierVal,
      animationIterationCount: iteration,
      animationFillMode: 'forwards',
    };

    switch (targetProp) {
      case 'translate-x':
        return {
          ...baseStyles,
          animationName: 'cubic-slide-x',
        };
      case 'scale':
        return {
          ...baseStyles,
          animationName: 'cubic-pulse-scale',
        };
      case 'rotate':
        return {
          ...baseStyles,
          animationName: 'cubic-rotary',
        };
      case 'color-shift':
        return {
          ...baseStyles,
          animationName: 'cubic-color-fade',
        };
      case 'slide-up-down':
        return {
          ...baseStyles,
          animationName: 'cubic-slide-up-down',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <div id="cubic-bezier-generator" className="space-y-8">
      {/* Dynamic Keyframe Injection block */}
      <style>{`
        @keyframes cubic-slide-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100% - 28px)); }
        }
        @keyframes cubic-pulse-scale {
          0% { transform: scale(1); }
          50% { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        @keyframes cubic-rotary {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cubic-color-fade {
          0% { background-color: #6366f1; } /* Indigo 500 */
          50% { background-color: #ec4899; } /* Pink 500 */
          100% { background-color: #6366f1; }
        }
        @keyframes cubic-slide-up-down {
          0% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
          100% { transform: translateY(0); }
        }
      `}</style>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & SVG Editor */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-6 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150 dark:border-indigo-900/50">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                    Curve Constructor
                  </h3>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                    Drag anchors or slide coordinates
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
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-55 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
                  title="Scroll and focus cubic bezier curve FAQs"
                >
                  <Info className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">FAQ</span>
                </button>

                <button 
                  onClick={handleReset}
                  title="Reset to absolute defaults"
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-55 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Dynamic SVG Interactive Bezier Plotter */}
            <div className="relative aspect-square w-full max-w-[340px] mx-auto bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden shadow-inner select-none">
              
              {/* Plotter Watermark */}
              <div className="absolute top-3 right-4 font-mono text-[9px] font-bold text-slate-350 dark:text-slate-650 tracking-wider">
                X: [0.0 - 1.0] | Y: [-1.5 - 2.5]
              </div>

              <svg 
                viewBox="0 0 360 360" 
                className="w-full h-full cursor-crosshair overflow-visible touch-none"
                onPointerMove={handlePointerMove}
              >
                {/* 1. Extended Shaded vertical overflow lanes indicating overshoot bounce boundaries */}
                <rect x="60" y="0" width="240" height="60" fill="currentColor" className="text-slate-100/30 dark:text-slate-900/30" />
                <rect x="60" y="300" width="240" height="60" fill="currentColor" className="text-slate-100/30 dark:text-slate-900/30" />

                <line x1="60" y1="60" x2="300" y2="60" stroke="currentColor" className="text-indigo-300/30 dark:text-indigo-850/40" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="60" y1="300" x2="300" y2="300" stroke="currentColor" className="text-indigo-300/30 dark:text-indigo-850/40" strokeWidth="2" strokeDasharray="3 3" />

                {/* 2. Core (0, 0) to (1, 1) transition box frame */}
                <rect 
                  x="60" 
                  y="60" 
                  width="240" 
                  height="240" 
                  fill="none" 
                  stroke="currentColor" 
                  className="text-slate-200 dark:text-slate-800" 
                  strokeWidth="2" 
                />

                {/* Grid Gridlines inside core square */}
                <line x1="120" y1="60" x2="120" y2="300" stroke="currentColor" className="text-slate-150/40 dark:text-slate-900/30" />
                <line x1="180" y1="60" x2="180" y2="300" stroke="currentColor" className="text-slate-150/40 dark:text-slate-900/30" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="240" y1="60" x2="240" y2="300" stroke="currentColor" className="text-slate-150/40 dark:text-slate-900/30" />

                <line x1="60" y1="120" x2="300" y2="120" stroke="currentColor" className="text-slate-150/40 dark:text-slate-900/30" />
                <line x1="60" y1="180" x2="300" y2="180" stroke="currentColor" className="text-slate-150/40 dark:text-slate-900/30" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="60" y1="240" x2="300" y2="240" stroke="currentColor" className="text-slate-150/40 dark:text-slate-900/30" />

                {/* Perfect Linear reference helper line (diagonal) */}
                <line 
                  x1="60" 
                  y1="300" 
                  x2="300" 
                  y2="60" 
                  stroke="currentColor" 
                  className="text-slate-300 dark:text-slate-800" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 4" 
                />

                {/* 3. Drag Guideline Handle Bars */}
                {/* Handle P1 (Start Anchor to P1 Knob) */}
                <line 
                  x1={p0Svg.x} 
                  y1={p0Svg.y} 
                  x2={p1Svg.x} 
                  y2={p1Svg.y} 
                  stroke="currentColor" 
                  className="text-indigo-500/80 dark:text-indigo-400/80" 
                  strokeWidth="2.5" 
                />
                {/* Handle P2 (End Anchor to P2 Knob) */}
                <line 
                  x1={p3Svg.x} 
                  y1={p3Svg.y} 
                  x2={p2Svg.x} 
                  y2={p2Svg.y} 
                  stroke="currentColor" 
                  className="text-pink-500/80 dark:text-pink-450/80" 
                  strokeWidth="2.5" 
                />

                {/* 4. MAIN BEZIER CURVE PATH */}
                {/* Drawn using a pristine custom gradient stroke from indigo to pink */}
                <defs>
                  <linearGradient id="bezier-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <path 
                  d={`M ${p0Svg.x} ${p0Svg.y} C ${p1Svg.x} ${p1Svg.y}, ${p2Svg.x} ${p2Svg.y}, ${p3Svg.x} ${p3Svg.y}`} 
                  fill="none" 
                  stroke="url(#bezier-gradient)" 
                  strokeWidth="5.5" 
                  strokeLinecap="round"
                />

                {/* 5. Anchor endpoint markers (Fixed) */}
                <circle cx={p0Svg.x} cy={p0Svg.y} r="6" stroke="#4f46e5" strokeWidth="2.5" fill="#ffffff" />
                <circle cx={p3Svg.x} cy={p3Svg.y} r="6" stroke="#db2777" strokeWidth="2.5" fill="#ffffff" />

                {/* 6. Active Draggable Knobs (Interactive with pointer captures) */}
                {/* Knob P1 (Control point 1) */}
                <circle 
                  cx={p1Svg.x} 
                  cy={p1Svg.y} 
                  r="13" 
                  fill="#6366f1" 
                  stroke="#ffffff" 
                  strokeWidth="3.5"
                  className="cursor-pointer shadow-lg hover:scale-115 transition-transform duration-100"
                  onPointerDown={(e) => handlePointerDown('p1', e)}
                  onPointerUp={handlePointerUp}
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.18))' }}
                />
                
                {/* Knob P2 (Control point 2) */}
                <circle 
                  cx={p2Svg.x} 
                  cy={p2Svg.y} 
                  r="13" 
                  fill="#ec4899" 
                  stroke="#ffffff" 
                  strokeWidth="3.5"
                  className="cursor-pointer shadow-lg hover:scale-115 transition-transform duration-100"
                  onPointerDown={(e) => handlePointerDown('p2', e)}
                  onPointerUp={handlePointerUp}
                  style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.18))' }}
                />

                {/* Text Labels inside Editor for pure structural alignment */}
                <text x="50" y="318" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="end">P0</text>
                <text x="312" y="65" fontSize="11" fontWeight="bold" fill="#64748b" textAnchor="start">P3</text>
              </svg>

              {/* Live coordinates tooltip overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex justify-between px-2 py-1.5 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-100 dark:border-slate-800 pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                    P1: ({x1.toFixed(2)}, {y1.toFixed(2)})
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                  <span className="text-[10px] font-mono font-bold text-slate-700 dark:text-slate-300">
                    P2: ({x2.toFixed(2)}, {y2.toFixed(2)})
                  </span>
                </div>
              </div>

            </div>

            {/* Micro sliders for hyper-precision coordinates refinement */}
            <div className="space-y-4">
              <div className="px-1 flex justify-between items-center select-none">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                  Coordinate Sliders
                </span>
                <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400">
                  Precision: 0.01 steps
                </span>
              </div>

              {/* Slider P1 X */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">P1.x (Start Influence X)</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{x1}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={x1} 
                  onChange={(e) => setX1(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider P1 Y */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">P1.y (Start Influence Y)</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{y1}</span>
                </div>
                <input 
                  type="range" 
                  min="-1.5" 
                  max="2.5" 
                  step="0.01" 
                  value={y1} 
                  onChange={(e) => setY1(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider P2 X */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">P2.x (End Influence X)</span>
                  <span className="font-mono font-bold text-pink-600 dark:text-pink-450">{x2}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={x2} 
                  onChange={(e) => setX2(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider P2 Y */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">P2.y (End Influence Y)</span>
                  <span className="font-mono font-bold text-pink-600 dark:text-pink-450">{y2}</span>
                </div>
                <input 
                  type="range" 
                  min="-1.5" 
                  max="2.5" 
                  step="0.01" 
                  value={y2} 
                  onChange={(e) => setY2(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 h-1.5 bg-slate-200 dark:bg-slate-850 rounded-lg cursor-pointer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Comparative Simulator & Presets */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Comparative Animation Sandbox */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-450 border border-pink-150 dark:border-pink-900/50 animate-pulse">
                  <Play className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                    Comparative Simulator Stage
                  </h3>
                  <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                    Observe custom curves vs CSS standard baselines side-by-side
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Duration Slider */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-lg text-[11px] font-mono font-bold">
                  <span>Duration:</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{duration}s</span>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="4.0" 
                    step="0.1" 
                    value={duration} 
                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                    className="w-16 accent-indigo-600 cursor-pointer h-1 bg-slate-200 dark:bg-slate-850 rounded"
                  />
                </div>

                {/* Looper toggle */}
                <button 
                  onClick={() => setIsLooping(!isLooping)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                    isLooping
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-250 text-emerald-650'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 text-slate-500'
                  }`}
                >
                  <RefreshCw className={`h-3 w-3 ${isLooping ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  <span>{isLooping ? 'Loop' : 'Manual'}</span>
                </button>

                {!isLooping && (
                  <button 
                    onClick={forceReplay}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span>Play</span>
                  </button>
                )}
              </div>
            </div>

            {/* Test Animation parameters Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850">
              {[
                { id: 'translate-x', label: 'Translate X' },
                { id: 'scale', label: 'Pulse Scale' },
                { id: 'rotate', label: 'Rotary Spin' },
                { id: 'color-shift', label: 'Color Shift' },
                { id: 'slide-up-down', label: 'Accordion' }
              ].map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => setTargetProp(prop.id as TargetPropType)}
                  className={`px-2 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer font-display ${
                    targetProp === prop.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-slate-200'
                  }`}
                >
                  {prop.label}
                </button>
              ))}
            </div>

            {/* Comparative Rows */}
            <div className="space-y-2.5 py-1">
              
              {/* Row 1: Your Custom Curve */}
              <div className="flex items-center gap-3 bg-indigo-50/20 dark:bg-indigo-950/10 border-2 border-indigo-200/50 dark:border-indigo-900/35 p-3 rounded-xl relative overflow-hidden transition-all">
                <div className="absolute top-1 right-2 text-[8px] font-mono uppercase font-black text-indigo-500 dark:text-indigo-400">
                  Custom
                </div>
                <div className="w-24 shrink-0">
                  <p className="text-[11px] font-black uppercase text-slate-855 dark:text-slate-100 font-display">
                    Your Bezier
                  </p>
                  <p className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400 font-bold tracking-tight">
                    ({x1}, {y1}, {x2}, {y2})
                  </p>
                </div>
                <div className="flex-1 bg-slate-100/70 dark:bg-slate-950 px-2 py-3 rounded-lg flex items-center relative overflow-hidden h-12">
                  <div 
                    key={animationTick}
                    style={getSimulativeStyle(rawBezier)}
                    className="w-6 h-6 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 shadow flex items-center justify-center text-white text-[9px] font-bold"
                  >
                    ✨
                  </div>
                </div>
              </div>

              {/* standard references */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-850 rounded-xl space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
                  CSS Standard Baselines
                </p>

                {/* 1. Linear */}
                <div className="flex items-center gap-3">
                  <div className="w-24 shrink-0">
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Linear
                    </p>
                    <p className="text-[9px] font-mono text-slate-400">
                      (0, 0, 1, 1)
                    </p>
                  </div>
                  <div className="flex-1 bg-slate-100/50 dark:bg-slate-950/20 px-2 py-2 rounded-lg flex items-center relative overflow-hidden h-9">
                    <div 
                      key={animationTick}
                      style={getSimulativeStyle('linear')}
                      className="w-5 h-5 rounded bg-slate-400 dark:bg-slate-700 shadow flex items-center justify-center text-[10px] text-white"
                    >
                      L
                    </div>
                  </div>
                </div>

                {/* 2. Ease */}
                <div className="flex items-center gap-3">
                  <div className="w-24 shrink-0">
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Ease
                    </p>
                    <p className="text-[9px] font-mono text-slate-400">
                      (0.25, 0.1, 0.25, 1)
                    </p>
                  </div>
                  <div className="flex-1 bg-slate-100/50 dark:bg-slate-950/20 px-2 py-2 rounded-lg flex items-center relative overflow-hidden h-9">
                    <div 
                      key={animationTick}
                      style={getSimulativeStyle('ease')}
                      className="w-5 h-5 rounded bg-slate-400 dark:bg-slate-700 shadow flex items-center justify-center text-[10px] text-white"
                    >
                      E
                    </div>
                  </div>
                </div>

                {/* 3. Ease-In */}
                <div className="flex items-center gap-3">
                  <div className="w-24 shrink-0">
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Ease-In
                    </p>
                    <p className="text-[9px] font-mono text-slate-400">
                      (0.42, 0, 1, 1)
                    </p>
                  </div>
                  <div className="flex-1 bg-slate-100/50 dark:bg-slate-950/20 px-2 py-2 rounded-lg flex items-center relative overflow-hidden h-9">
                    <div 
                      key={animationTick}
                      style={getSimulativeStyle('ease-in')}
                      className="w-5 h-5 rounded bg-slate-400 dark:bg-slate-700 shadow flex items-center justify-center text-[10px] text-white"
                    >
                      In
                    </div>
                  </div>
                </div>

                {/* 4. Ease-Out */}
                <div className="flex items-center gap-3">
                  <div className="w-24 shrink-0">
                    <p className="text-[11px] font-bold text-slate-600 dark:text-slate-300">
                      Ease-Out
                    </p>
                    <p className="text-[9px] font-mono text-slate-400">
                      (0, 0, 0.58, 1)
                    </p>
                  </div>
                  <div className="flex-1 bg-slate-100/50 dark:bg-slate-950/20 px-2 py-2 rounded-lg flex items-center relative overflow-hidden h-9">
                    <div 
                      key={animationTick}
                      style={getSimulativeStyle('ease-out')}
                      className="w-5 h-5 rounded bg-slate-400 dark:bg-slate-700 shadow flex items-center justify-center text-[10px] text-white"
                    >
                      Out
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Preset Easings Catalog */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-150 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <h3 className="text-sm font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-100">
                  Pre-configured Easing Library
                </h3>
              </div>
              <span className="text-[9px] font-mono bg-slate-100 dark:bg-slate-850 text-slate-500 px-2.5 py-0.5 rounded-full font-bold">
                {BEZIER_PRESETS.length} presets
              </span>
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap gap-1 border-b border-slate-100 dark:border-slate-800/80 pb-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-850/55'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Grid of Easing items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[290px] overflow-y-auto scrollbar-thin pr-1">
              {filteredPresets.map((preset, index) => {
                const isCurrent = x1 === preset.x1 && y1 === preset.y1 && x2 === preset.x2 && y2 === preset.y2;
                return (
                  <button
                    key={index}
                    onClick={() => loadPreset(preset)}
                    className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-22 group relative ${
                      isCurrent
                        ? 'bg-gradient-to-br from-indigo-50/60 to-rose-50/40 dark:from-indigo-950/30 dark:to-pink-950/20 border-indigo-400 dark:border-indigo-800 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-850 hover:bg-white dark:hover:bg-slate-900 hover:border-slate-350 dark:hover:border-slate-750'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black uppercase font-display tracking-wide truncate pr-2">
                          {preset.name}
                        </span>
                        {preset.category === 'back' && (
                          <span className="text-[7px] font-mono uppercase bg-pink-100 dark:bg-pink-955 text-pink-700 dark:text-pink-300 px-1 py-0.2 rounded font-extrabold shrink-0">
                            Spring
                          </span>
                        )}
                      </div>
                      <p className="text-[9px] text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400 leading-tight line-clamp-2 mt-1">
                        {preset.description}
                      </p>
                    </div>

                    <div className="mt-2 flex justify-between items-center pt-1 border-t border-slate-100 dark:border-slate-850/60">
                      <span className="text-[8px] font-mono text-indigo-500 font-bold">
                        {preset.x1}, {preset.y1}, {preset.x2}, {preset.y2}
                      </span>
                      <span className="text-[8px] font-display text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Load →
                      </span>
                    </div>
                  </button>
                );
              })}
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
                Export Cubic-Bezier Styles
              </h3>
              <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                Integrate custom transitional timings securely into production
              </p>
            </div>
          </div>

          <div className="flex flex-wrap rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-1">
            {[
              { id: 'css', label: 'css' },
              { id: 'tailwind', label: 'tailwind' },
              { id: 'react', label: 'react / motion' },
              { id: 'javascript', label: 'javascript' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id as 'css' | 'tailwind' | 'react' | 'javascript')}
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
                ? `/* Cubic Bezier Curve Formula */
transition-timing-function: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});

/* Full CSS Transition Rule (with duration) */
transition: all ${duration}s cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});` 
                : activeCodeTab === 'tailwind' 
                ? tailwindConfig 
                : activeCodeTab === 'react' 
                ? framerMotionCode 
                : webAnimationsJS;
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
            {activeCodeTab === 'css' && `/* Cubic Bezier Curve Formula */
transition-timing-function: cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});

/* Full CSS Transition Rule (with duration) */
transition: all ${duration}s cubic-bezier(${x1}, ${y1}, ${x2}, ${y2});`}
            {activeCodeTab === 'tailwind' && tailwindConfig}
            {activeCodeTab === 'react' && framerMotionCode}
            {activeCodeTab === 'javascript' && webAnimationsJS}
          </pre>

        </div>

        {/* Informational helpful tips */}
        <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-100/50 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed flex gap-3">
          <BadgeInfo className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-850 dark:text-slate-300 mb-0.5">GPU hardware-accelerated transition tip</p>
            <p>
              Custom <code>cubic-bezier</code> ease structures deliver flawless, fluid visual flow by aligning directly with standard browser render loops. Prefer manipulating properties like <code>transform</code> (such as translate and scale) and <code>opacity</code> utilizing cubic bezier easing curves to ensure 60fps GPU-composited hardware execution.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
