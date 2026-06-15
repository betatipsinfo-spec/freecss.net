import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Copy, Check, RefreshCw, Eye, Layers, Sliders, 
  Palette, Zap, Code, Heart, HelpCircle, ArrowRight, FileCode,
  ChevronDown, ChevronUp, Box, BadgeInfo
} from 'lucide-react';

interface HoverPreset {
  name: string;
  description: string;
  scale: number;
  rotate: number;
  translateX: number;
  translateY: number;
  skewX: number;
  skewY: number;
  duration: number;
  timing: string;
  // Colors & styling
  borderRadius: string;
  bgNormal: string;
  bgHover: string;
  textNormal: string;
  textHover: string;
  borderWidth: number;
  borderNormal: string;
  borderHover: string;
  shadowNormal: string;
  shadowHover: string;
  glowColor: string;
}

const PRESETS: Record<string, HoverPreset> = {
  modernGlow: {
    name: 'Modern Indigo Lift & Glow',
    description: 'Elevates with a gorgeous custom indigo halo glow effect.',
    scale: 1.04,
    rotate: 0,
    translateX: 0,
    translateY: -6,
    skewX: 0,
    skewY: 0,
    duration: 300,
    timing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    borderRadius: 'rounded-xl',
    bgNormal: 'from-slate-900 to-indigo-950',
    bgHover: 'from-indigo-650 to-violet-700',
    textNormal: 'text-slate-100',
    textHover: 'text-white',
    borderWidth: 1,
    borderNormal: 'border-slate-850',
    borderHover: 'border-indigo-400/55',
    shadowNormal: 'shadow-md shadow-black/10',
    shadowHover: 'shadow-2xl shadow-indigo-500/25',
    glowColor: 'rgba(99, 102, 241, 0.4)'
  },
  glassNeumorphic: {
    name: 'Neumorphic Glass Lift',
    description: 'Bright clean glossy elevation, ideal for high-contrast cards.',
    scale: 1.02,
    rotate: 0,
    translateX: 0,
    translateY: -3,
    skewX: 0,
    skewY: 0,
    duration: 200,
    timing: 'ease-out',
    borderRadius: 'rounded-2xl',
    bgNormal: 'from-white to-slate-50/50',
    bgHover: 'from-white to-indigo-50/20',
    textNormal: 'text-slate-800',
    textHover: 'text-slate-950',
    borderWidth: 1.5,
    borderNormal: 'border-slate-150/80',
    borderHover: 'border-indigo-400/40',
    shadowNormal: 'shadow-sm shadow-slate-200/50',
    shadowHover: 'shadow-xl shadow-indigo-600/10',
    glowColor: 'rgba(99, 102, 241, 0.1)'
  },
  retroBrutalist: {
    name: 'Brutalist Push Down',
    description: 'Thick black solid borders that "sink" physically under cursor.',
    scale: 0.98,
    rotate: 0.5,
    translateX: 1,
    translateY: 2,
    skewX: 0,
    skewY: 0,
    duration: 150,
    timing: 'ease-in-out',
    borderRadius: 'rounded-none',
    bgNormal: 'from-amber-205 to-amber-300',
    bgHover: 'from-cyan-400 to-teal-400',
    textNormal: 'text-black',
    textHover: 'text-black',
    borderWidth: 3,
    borderNormal: 'border-black',
    borderHover: 'border-black',
    shadowNormal: '[box-shadow:4px_4px_0px_0px_rgba(0,0,0,1)]',
    shadowHover: '[box-shadow:1px_1px_0px_0px_rgba(0,0,0,1)]',
    glowColor: 'rgba(0,0,0,1)'
  },
  playfulSkew: {
    name: 'Whimsical Skew & Tilt',
    description: 'Lively, expressive tilt movement perfect for gamified elements.',
    scale: 1.05,
    rotate: -1.5,
    translateX: -2,
    translateY: -4,
    skewX: 1,
    skewY: -1,
    duration: 350,
    timing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    borderRadius: 'rounded-2xl',
    bgNormal: 'from-indigo-600 to-indigo-700',
    bgHover: 'from-pink-500 to-rose-500',
    textNormal: 'text-white',
    textHover: 'text-white',
    borderWidth: 0,
    borderNormal: 'border-transparent',
    borderHover: 'border-transparent',
    shadowNormal: 'shadow-md shadow-slate-205/10',
    shadowHover: 'shadow-2xl shadow-pink-500/20',
    glowColor: 'rgba(244, 63, 94, 0.3)'
  },
  borderSlide: {
    name: 'Emerald Aurora Pulse',
    description: 'Crisp outline hover that highlights with glowing safe-borders.',
    scale: 1.02,
    rotate: 0,
    translateX: 0,
    translateY: -1,
    skewX: 0,
    skewY: 0,
    duration: 250,
    timing: 'ease-out',
    borderRadius: 'rounded-xl',
    bgNormal: 'from-slate-900 to-slate-950',
    bgHover: 'from-slate-950 to-emerald-950/40',
    textNormal: 'text-slate-350',
    textHover: 'text-emerald-350',
    borderWidth: 1.5,
    borderNormal: 'border-slate-800',
    borderHover: 'border-emerald-500',
    shadowNormal: 'shadow-none',
    shadowHover: 'shadow-lg shadow-emerald-500/10',
    glowColor: 'rgba(16, 185, 129, 0.3)'
  }
};

const TIMING_OPTIONS = [
  { value: 'ease', label: 'Ease (Standard)' },
  { value: 'linear', label: 'Linear (Steady)' },
  { value: 'ease-in', label: 'Ease In (Accelerate)' },
  { value: 'ease-out', label: 'Ease Out (Decelerate)' },
  { value: 'ease-in-out', label: 'Ease In-Out' },
  { value: 'cubic-bezier(0.16, 1, 0.3, 1)', label: 'Ultra fluid (Apple-style)' },
  { value: 'cubic-bezier(0.34, 1.56, 0.64, 1)', label: 'Playful Spring (Elastic)' },
  { value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', label: 'Bounce Back (Overshoot)' }
];

const parseBgPreset = (bgCls: string) => {
  let start = '#0f172a';
  let end = '#1e1b4b';
  
  if (bgCls.includes('from-slate-900')) { start = '#0f172a'; }
  else if (bgCls.includes('from-white')) { start = '#ffffff'; }
  else if (bgCls.includes('from-amber-205')) { start = '#d97706'; }
  else if (bgCls.includes('from-slate-950')) { start = '#020617'; }
  else if (bgCls.includes('from-indigo-650')) { start = '#4f46e5'; }
  else if (bgCls.includes('from-indigo-600')) { start = '#4f46e5'; }
  else if (bgCls.includes('from-zinc-900')) { start = '#18181b'; }
  else if (bgCls.includes('from-rose-950')) { start = '#4c0519'; }
  else {
    const rawMatch = bgCls.match(/from-\[([^\]]+)\]/);
    if (rawMatch) start = rawMatch[1];
  }

  if (bgCls.includes('to-indigo-950')) { end = '#1e1b4b'; }
  else if (bgCls.includes('to-slate-50/50')) { end = '#f8fafc'; }
  else if (bgCls.includes('to-indigo-50/20')) { end = '#e0e7ff'; }
  else if (bgCls.includes('to-amber-300')) { end = '#fcd34d'; }
  else if (bgCls.includes('to-cyan-400')) { end = '#22d3ee'; }
  else if (bgCls.includes('to-teal-400')) { end = '#2dd4bf'; }
  else if (bgCls.includes('to-slate-900')) { end = '#0f172a'; }
  else if (bgCls.includes('to-emerald-950/40')) { end = '#022c22'; }
  else if (bgCls.includes('to-purple-950')) { end = '#3b0764'; }
  else if (bgCls.includes('to-pink-500')) { end = '#ec4899'; }
  else if (bgCls.includes('to-rose-500')) { end = '#f43f5e'; }
  else if (bgCls.includes('to-yellow-400')) { end = '#facc15'; }
  else if (bgCls.includes('to-amber-500')) { end = '#f59e0b'; }
  else if (bgCls.includes('to-orange-500')) { end = '#f97316'; }
  else if (bgCls.includes('to-red-500')) { end = '#ef4444'; }
  else if (bgCls.includes('to-black')) { end = '#000000'; }
  else if (bgCls.includes('to-indigo-750')) { end = '#312e81'; }
  else if (bgCls.includes('to-stone-900')) { end = '#1c1917'; }
  else {
    const rawMatch = bgCls.match(/to-\[([^\]]+)\]/);
    if (rawMatch) end = rawMatch[1];
  }
  return { start, end };
};

const parseTextPreset = (txtCls: string) => {
  if (txtCls.includes('text-slate-100')) return '#f1f5f9';
  if (txtCls.includes('text-white')) return '#ffffff';
  if (txtCls.includes('text-slate-800')) return '#1e293b';
  if (txtCls.includes('text-slate-950')) return '#0f172a';
  if (txtCls.includes('text-black')) return '#000000';
  if (txtCls.includes('text-slate-350')) return '#cbd5e1';
  if (txtCls.includes('text-emerald-350')) return '#6ee7b7';
  if (txtCls.includes('text-slate-200')) return '#e2e8f0';
  if (txtCls.includes('text-slate-400')) return '#94a3b8';
  if (txtCls.includes('text-indigo-200')) return '#c7d2fe';
  if (txtCls.includes('text-pink-200')) return '#fbcfe8';
  
  const rawMatch = txtCls.match(/text-\[([^\]]+)\]/);
  if (rawMatch) return rawMatch[1];
  return '#ffffff';
};

const parseBorderPreset = (borderCls: string) => {
  if (borderCls.includes('border-transparent')) return 'transparent';
  if (borderCls.includes('border-slate-850')) return '#1e293b';
  if (borderCls.includes('border-slate-150')) return '#cbd5e1';
  if (borderCls.includes('border-slate-800')) return '#1e293b';
  if (borderCls.includes('border-indigo-400')) return '#818cf8';
  if (borderCls.includes('border-indigo-500')) return '#6366f1';
  if (borderCls.includes('border-emerald-500')) return '#10b981';
  if (borderCls.includes('border-pink-500')) return '#ec4899';
  if (borderCls.includes('border-black')) return '#000000';
  if (borderCls.includes('border-slate-200')) return '#e2e8f0';
  if (borderCls.includes('border-zinc-700')) return '#3f3f46';
  
  const rawMatch = borderCls.match(/border-\[([^\]]+)\]/);
  if (rawMatch) return rawMatch[1];
  return '#e2e8f0';
};

const parseGlowPreset = (glowVal: string) => {
  const m = glowVal.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (m) {
    const r = parseInt(m[1]);
    const g = parseInt(m[2]);
    const b = parseInt(m[3]);
    const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
    const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return { hex, alpha: a };
  }
  
  if (glowVal.startsWith('#')) {
    return { hex: glowVal, alpha: 0.4 };
  }
  
  return { hex: '#6366f1', alpha: 0.4 };
};

export default function HoverEffectsGenerator() {
  const [activePreset, setActivePreset] = useState<string>('modernGlow');
  
  // Custom Controls State (Initialized with Modern Glow)
  const [scale, setScale] = useState<number>(1.04);
  const [rotate, setRotate] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(-6);
  const [skewX, setSkewX] = useState<number>(0);
  const [skewY, setSkewY] = useState<number>(0);
  const [duration, setDuration] = useState<number>(300);
  const [timing, setTiming] = useState<string>('cubic-bezier(0.16, 1, 0.3, 1)');
  
  // Styling Controls
  const [borderRadius, setBorderRadius] = useState<string>('rounded-xl');
  const [bgNormal, setBgNormal] = useState<string>('from-slate-900 to-indigo-950');
  const [bgHover, setBgHover] = useState<string>('from-indigo-650 to-violet-700');
  const [textNormal, setTextNormal] = useState<string>('text-slate-100');
  const [textHover, setTextHover] = useState<string>('text-white');
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [borderNormal, setBorderNormal] = useState<string>('border-slate-850');
  const [borderHover, setBorderHover] = useState<string>('border-indigo-400/55');
  const [shadowNormal, setShadowNormal] = useState<string>('shadow-md shadow-black/10');
  const [shadowHover, setShadowHover] = useState<string>('shadow-2xl shadow-indigo-500/25');
  const [glowColor, setGlowColor] = useState<string>('rgba(99, 102, 241, 0.4)');

  // Custom Color Hex Overrides
  const [bgNormStart, setBgNormStart] = useState<string>('#0f172a');
  const [bgNormEnd, setBgNormEnd] = useState<string>('#1e1b4b');
  const [bgHovStart, setBgHovStart] = useState<string>('#4f46e5');
  const [bgHovEnd, setBgHovEnd] = useState<string>('#6236ff');
  const [textNormHex, setTextNormHex] = useState<string>('#f1f5f9');
  const [textHovHex, setTextHovHex] = useState<string>('#ffffff');
  const [borderNormHex, setBorderNormHex] = useState<string>('#1e293b');
  const [borderHovHex, setBorderHovHex] = useState<string>('#818cf8');

  const [forceHover, setForceHover] = useState<boolean>(false);
  const [sandboxText, setSandboxText] = useState<string>('Interactive Card');
  const [copiedType, setCopiedType] = useState<'tailwind' | 'css' | null>(null);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react'>('css');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Auto response state when scrolling down or up
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollDelta, setScrollDelta] = useState<number>(0);

  const previewStageRef = React.useRef<HTMLDivElement>(null);

  // Clean React state for interactive canvas hover tracking
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);
  const [hoveredBtn, setHoveredBtn] = useState<boolean>(false);
  const [hoveredCircle, setHoveredCircle] = useState<boolean>(false);

  const currentGlow = parseGlowPreset(glowColor);

  React.useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let animFrameId: number;
    let lastTouchY = 0;

    // Track targets & animated values
    const physics = {
      target: 0,
      current: 0,
    };

    const triggerScrolling = (delta: number) => {
      // Direct integration of scrolling impulses
      // Clamp incoming scroll velocities to reasonable ranges to prevent wild spikes
      const clampedDelta = Math.min(Math.max(delta, -180), 180);
      physics.target += clampedDelta;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      triggerScrolling(delta * 2.8); // Boost scroll delta slightly for better feedback
      lastScrollY = currentScrollY;
    };

    const handleWheel = (e: WheelEvent) => {
      // Capture and integrate wheel scroll distance
      triggerScrolling(e.deltaY * 0.9);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const currentTouchY = e.touches[0].clientY;
        const delta = lastTouchY - currentTouchY; // positive delta means scrolling down
        triggerScrolling(delta * 2.5);
        lastTouchY = currentTouchY;
      }
    };

    // Physics decay and interpolation loop using RequestAnimationFrame
    const updatePhysics = () => {
      // Lerp (Linear Interpolation) for buttery smooth decay
      physics.current += (physics.target - physics.current) * 0.12;
      
      // Decay the target over time so it slows down naturally when input stops
      physics.target *= 0.82;

      const deltaAbs = Math.abs(physics.current);
      
      if (deltaAbs > 0.15) {
        setScrollDelta(physics.current);
        setIsScrolling(true);
      } else {
        // Snapping stable state
        physics.current = 0;
        physics.target = 0;
        setScrollDelta(0);
        setIsScrolling(false);
      }

      animFrameId = requestAnimationFrame(updatePhysics);
    };

    // Play/start animation frame loop
    animFrameId = requestAnimationFrame(updatePhysics);

    // 1. Attach listeners wrapper globally
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 2. Attach listeners specifically to the live stage preview container if available
    const stageEl = previewStageRef.current;
    if (stageEl) {
      stageEl.addEventListener('scroll', handleScroll, { passive: true });
      stageEl.addEventListener('wheel', handleWheel, { passive: true });
      stageEl.addEventListener('touchstart', handleTouchStart, { passive: true });
      stageEl.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);

      if (stageEl) {
        stageEl.removeEventListener('scroll', handleScroll);
        stageEl.removeEventListener('wheel', handleWheel);
        stageEl.removeEventListener('touchstart', handleTouchStart);
        stageEl.removeEventListener('touchmove', handleTouchMove);
      }

      cancelAnimationFrame(animFrameId);
    };
  }, []);


  // Apply Preset Values
  const applyPreset = (key: string) => {
    setActivePreset(key);
    const p = PRESETS[key];
    if (p) {
      setScale(p.scale);
      setRotate(p.rotate);
      setTranslateX(p.translateX);
      setTranslateY(p.translateY);
      setSkewX(p.skewX);
      setSkewY(p.skewY);
      setDuration(p.duration);
      setTiming(p.timing);
      setBorderRadius(p.borderRadius);
      setBgNormal(p.bgNormal);
      setBgHover(p.bgHover);
      setTextNormal(p.textNormal);
      setTextHover(p.textHover);
      setBorderWidth(p.borderWidth);
      setBorderNormal(p.borderNormal);
      setBorderHover(p.borderHover);
      setShadowNormal(p.shadowNormal);
      setShadowHover(p.shadowHover);
      setGlowColor(p.glowColor);

      // Extract raw hex colors
      const normBg = parseBgPreset(p.bgNormal);
      setBgNormStart(normBg.start);
      setBgNormEnd(normBg.end);

      const hovBg = parseBgPreset(p.bgHover);
      setBgHovStart(hovBg.start);
      setBgHovEnd(hovBg.end);

      setTextNormHex(parseTextPreset(p.textNormal));
      setTextHovHex(parseTextPreset(p.textHover));

      setBorderNormHex(parseBorderPreset(p.borderNormal));
      setBorderHovHex(parseBorderPreset(p.borderHover));
    }
  };

  const handleReset = () => {
    applyPreset('modernGlow');
  };

  // Compile CSS Code Blocks
  const getTimingCss = (val: string) => {
    return val;
  };

  const borderRadiiMap: Record<string, string> = {
    'rounded-none': '0px',
    'rounded-sm': '2px',
    'rounded-md': '6px',
    'rounded-lg': '8px',
    'rounded-xl': '12px',
    'rounded-2xl': '16px',
    'rounded-3xl': '24px',
    'rounded-full': '9999px',
  };

  const generateRawCSS = () => {
    const radiusVal = borderRadiiMap[borderRadius] || '12px';
    const borderStyleNormal = borderWidth > 0 ? `${borderWidth}px solid ${borderNormHex === 'transparent' ? 'transparent' : borderNormHex}` : 'none';
    const borderStyleHover = borderWidth > 0 ? `${borderWidth}px solid ${borderHovHex === 'transparent' ? 'transparent' : borderHovHex}` : 'none';

    return `/* --- Paste inside your stylesheet --- */
.hover-target-card {
  position: relative;
  border-radius: ${radiusVal};
  padding: 1.5rem;
  background: linear-gradient(135deg, ${bgNormStart}, ${bgNormEnd});
  color: ${textNormHex};
  border: ${borderStyleNormal};
  cursor: pointer;
  transition: all ${duration}ms ${getTimingCss(timing)};
}

/* Hover Animation Styles */
.hover-target-card:hover,
.hover-target-card.force-hover {
  transform: 
    translate3d(${translateX}px, ${translateY}px, 0)
    scale(${scale}) 
    rotate(${rotate}deg) 
    skew(${skewX}deg, ${skewY}deg);
  background: linear-gradient(135deg, ${bgHovStart}, ${bgHovEnd});
  color: ${textHovHex};
  border: ${borderStyleHover};
  box-shadow: 0 20px 40px -15px ${glowColor};
}`;
  };

  const generateTailwindClass = () => {
    // Mapping properties to exact inline Tailwind equivalents
    const scaleClass = scale !== 1 ? `hover:scale-[${scale}]` : '';
    const rotateClass = rotate !== 0 ? `hover:rotate-[${rotate}deg]` : '';
    const transXClass = translateX !== 0 ? `hover:translate-x-[${translateX}px]` : '';
    const transYClass = translateY !== 0 ? `hover:-translate-y-[${Math.abs(translateY)}px]` : '';
    const skewXClass = skewX !== 0 ? `hover:skew-x-[${skewX}deg]` : '';
    const skewYClass = skewY !== 0 ? `hover:skew-y-[${skewY}deg]` : '';
    
    // Duration class mappings
    const durationClass = `duration-[${duration}ms]`;
    
    const easeClassMap: Record<string, string> = {
      'ease': 'ease-in-out',
      'linear': 'ease-linear',
      'ease-in': 'ease-in',
      'ease-out': 'ease-out',
      'ease-in-out': 'ease-in-out',
    };
    const easeClass = easeClassMap[timing] ? easeClassMap[timing] : `delay-0`;

    // Normal values styling
    const radius = borderRadius;
    const padding = 'p-6';
    const border = borderWidth > 0 ? `border ${borderNormal}` : 'border-0';
    const borderOnHover = borderWidth > 0 ? `hover:${borderHover}` : '';

    return `transition-all ${durationClass} ${easeClass} bg-gradient-to-br ${bgNormal} hover:bg-gradient-to-br hover:${bgHover} ${textNormal} hover:${textHover} ${radius} ${padding} ${border} ${borderOnHover} ${shadowNormal} hover:${shadowHover} ${scaleClass} ${rotateClass} ${transXClass} ${transYClass} ${skewXClass} ${skewYClass}`;
  };

  const generateReactCode = () => {
    return `import { motion } from 'motion/react';

// Hover Animation Style object
const hoverStyle = {
  transform: 'translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg)',
  transition: 'all ${duration}ms ${timing}',
  boxShadow: '0 20px 40px -15px ${glowColor}',
  background: 'linear-gradient(135deg, ${bgHovStart}, ${bgHovEnd})',
  color: '${textHovHex}',
  borderColor: '${borderHovHex}'
};

// Render in JSX using standard events or framer-motion library:
<motion.div
  whileHover={{
    scale: ${scale},
    x: ${translateX},
    y: ${translateY},
    rotate: ${rotate},
    skewX: ${skewX},
    skewY: ${skewY}
  }}
  transition={{ type: "tween", ease: "${timing}", duration: ${duration / 1000} }}
  className="p-6 rounded-2xl border"
  style={{
    background: 'linear-gradient(135deg, ${bgNormStart}, ${bgNormEnd})',
    color: '${textNormHex}',
    borderColor: '${borderNormHex}'
  }}
>
  Hover Me Seamlessly!
</motion.div>`;
  };

  const copyToClipboard = (code: string, tab: 'css' | 'tailwind' | 'react') => {
    navigator.clipboard.writeText(code);
    setCopiedText(tab);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // Convert current dynamic parameters to an inline object
  const getDynamicTestPanelStyles = (isHovered: boolean = false) => {
    const isCurrentlyActive = forceHover || isScrolling || isHovered;

    if (isCurrentlyActive) {
      // Simulate physical responsive momentum offset based on scrolling motion
      const scrollYOffset = Math.min(Math.max(scrollDelta * 0.12, -6), 6);
      const dynamicY = translateY + scrollYOffset;
      const dynamicRot = rotate + (scrollDelta * 0.08);

      return {
        transform: `translate3d(${translateX}px, ${dynamicY}px, 0) scale(${scale}) rotate(${dynamicRot}deg) skew(${skewX}deg, ${skewY}deg)`,
        transition: isScrolling ? 'transform 100ms ease-out, box-shadow 150ms ease-out, border-color 150ms ease-out' : `all ${duration}ms ${timing}`,
        boxShadow: `0 24px 50px -10px ${glowColor}`,
        borderColor: borderHovHex === 'transparent' ? 'transparent' : borderHovHex,
        background: `linear-gradient(135deg, ${bgHovStart}, ${bgHovEnd})`,
        color: textHovHex
      };
    }
    return {
      transition: `all ${duration}ms ${timing}`,
      borderColor: borderNormHex === 'transparent' ? 'transparent' : borderNormHex,
      background: `linear-gradient(135deg, ${bgNormStart}, ${bgNormEnd})`,
      color: textNormHex,
      transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg) skew(0deg)',
      boxShadow: 'none'
    };
  };

  return (
    <div className="animate-fade-in relative space-y-8" id="hover-effects-workspace">

      {/* Main Grid: left editor, right preview + code output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Presets + Controls (span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Presets Catalog */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-indigo-600" />
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 font-display">
                  Aesthetic Quick Presets
                </h2>
              </div>
              <div className="flex items-center gap-2.5 font-display">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-rose-200 hover:border-rose-300 dark:border-rose-950/45 bg-rose-50/50 hover:bg-rose-100/50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-450 text-[10px] font-black uppercase tracking-wider font-display transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </button>
                <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-150 dark:border-indigo-900/5 bg-indigo-50/30 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider font-display cursor-pointer transition-all">
                  <input
                    type="checkbox"
                    checked={forceHover}
                    onChange={(e) => setForceHover(e.target.checked)}
                    className="rounded border-slate-300 dark:border-slate-750 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
                  />
                  <span>Lock Hover</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-2">
              {Object.entries(PRESETS).map(([key, item]) => {
                const isSelected = activePreset === key;
                return (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`w-full flex items-start gap-3 rounded-xl p-3 text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-violet-950 text-white border-transparent shadow shadow-slate-900/10'
                        : 'bg-slate-50/50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border-slate-150 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900/90'
                    }`}
                  >
                    <div className={`mt-0.5 p-1 rounded-lg ${isSelected ? 'bg-indigo-502 text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <Zap className="h-3.5 w-3.5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold uppercase tracking-wide leading-none mb-1">
                        {item.name}
                      </div>
                      <div className="text-[10px] opacity-70 leading-relaxed font-sans">
                        {item.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Precision Animation Controls */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-5 border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <Sliders className="h-4.5 w-4.5 text-indigo-600" />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                Hover Animation Controls
              </h2>
            </div>

            <div className="space-y-4">
              
              {/* Scale Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Hover Scale</span>
                  <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded font-black text-indigo-600 dark:text-indigo-400">
                    {scale.toFixed(2)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.85"
                  max="1.20"
                  step="0.01"
                  value={scale}
                  onChange={(e) => {
                    setScale(parseFloat(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Translate Y Slider (Vertical Lift) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Translate Y (Vertical Lift)</span>
                  <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded font-black text-indigo-600 dark:text-indigo-400">
                    {translateY}px
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={translateY}
                  onChange={(e) => {
                    setTranslateY(parseInt(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Translate X Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Translate X (Lateral)</span>
                  <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded font-black text-indigo-600 dark:text-indigo-400">
                    {translateX}px
                  </span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="20"
                  step="1"
                  value={translateX}
                  onChange={(e) => {
                    setTranslateX(parseInt(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Rotation Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Rotate Accent Angle</span>
                  <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded font-black text-indigo-600 dark:text-indigo-400">
                    {rotate}°
                  </span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={rotate}
                  onChange={(e) => {
                    setRotate(parseFloat(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Skew Slider (combined preview X and Y) */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Skew X</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{skewX}°</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="1"
                    value={skewX}
                    onChange={(e) => {
                      setSkewX(parseInt(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Skew Y</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{skewY}°</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="1"
                    value={skewY}
                    onChange={(e) => {
                      setSkewY(parseInt(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-850 my-2 pt-3" />

              {/* Transition Config */}
              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Transition Slower Speed</span>
                    <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded font-black text-indigo-600 dark:text-indigo-400">
                      {duration}ms
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    step="50"
                    value={duration}
                    onChange={(e) => {
                      setDuration(parseInt(e.target.value));
                      setActivePreset('custom');
                    }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">Transition Timing Function</span>
                  <select
                    value={timing}
                    onChange={(e) => {
                      setTiming(e.target.value);
                      setActivePreset('custom');
                    }}
                    className="w-full rounded-xl border-2 border-slate-150 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 cursor-pointer focus:border-indigo-500 focus:outline-none"
                  >
                    {TIMING_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>
          </div>

          {/* Color & Halo Cosmetics Block */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <Palette className="h-4.5 w-4.5 text-indigo-600" />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100">
                Colors, Borders & Halo Glow
              </h2>
            </div>

            {/* Background Style Selector (Pairs of Normal & Hover) */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                Background Theme Presets
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    name: 'Deep Sapphire',
                    normal: 'from-slate-900 to-indigo-950',
                    hover: 'from-indigo-650 to-violet-700',
                    textNorm: 'text-slate-100',
                    textHov: 'text-white',
                  },
                  {
                    name: 'Glass Pearl',
                    normal: 'from-white to-slate-50/50',
                    hover: 'from-white to-indigo-50/20',
                    textNorm: 'text-slate-800',
                    textHov: 'text-slate-950',
                  },
                  {
                    name: 'Brutalist Amber',
                    normal: 'from-amber-205 to-amber-300',
                    hover: 'from-cyan-400 to-teal-400',
                    textNorm: 'text-black',
                    textHov: 'text-black',
                  },
                  {
                    name: 'Sleek Obsidian',
                    normal: 'from-slate-950 to-slate-900',
                    hover: 'from-slate-900 to-emerald-950/40',
                    textNorm: 'text-slate-350',
                    textHov: 'text-emerald-350',
                  },
                  {
                    name: 'Vapor Wave',
                    normal: 'from-slate-900 to-purple-950',
                    hover: 'from-pink-500 to-rose-500',
                    textNorm: 'text-slate-200',
                    textHov: 'text-white',
                  },
                  {
                    name: 'Toxic Cyber',
                    normal: 'from-zinc-900 to-black',
                    hover: 'from-yellow-400 to-amber-500',
                    textNorm: 'text-slate-400',
                    textHov: 'text-black',
                  },
                ].map((bgPreset) => {
                  const isMatch = bgNormal === bgPreset.normal && bgHover === bgPreset.hover;
                  return (
                    <button
                      key={bgPreset.name}
                      onClick={() => {
                        setBgNormal(bgPreset.normal);
                        setBgHover(bgPreset.hover);
                        setTextNormal(bgPreset.textNorm);
                        setTextHover(bgPreset.textHov);
                        
                        const normBg = parseBgPreset(bgPreset.normal);
                        setBgNormStart(normBg.start);
                        setBgNormEnd(normBg.end);

                        const hovBg = parseBgPreset(bgPreset.hover);
                        setBgHovStart(hovBg.start);
                        setBgHovEnd(hovBg.end);

                        setTextNormHex(parseTextPreset(bgPreset.textNorm));
                        setTextHovHex(parseTextPreset(bgPreset.textHov));
                        setActivePreset('custom');
                      }}
                      className={`px-2 py-2 text-[10px] font-black uppercase text-center rounded-xl border transition-all cursor-pointer ${
                        isMatch
                          ? 'bg-indigo-600 text-white border-transparent shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      {bgPreset.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Precision Background Gradient Picker Controls */}
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-850/50">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Custom Background Gradients (Start / End)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Normal Background Gradient */}
                <div className="space-y-2 p-3 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Normal Base Fill
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Start Color */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase block">Start Hex</label>
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                        <input
                          type="color"
                          value={bgNormStart}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgNormStart(val);
                            setBgNormal(`from-[${val}] to-[${bgNormEnd}]`);
                            setActivePreset('custom');
                          }}
                          className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0"
                        />
                        <input
                          type="text"
                          value={bgNormStart}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgNormStart(val);
                            setBgNormal(`from-[${val}] to-[${bgNormEnd}]`);
                            setActivePreset('custom');
                          }}
                          className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    </div>
                    {/* End Color */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase block">End Hex</label>
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                        <input
                          type="color"
                          value={bgNormEnd}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgNormEnd(val);
                            setBgNormal(`from-[${bgNormStart}] to-[${val}]`);
                            setActivePreset('custom');
                          }}
                          className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0"
                        />
                        <input
                          type="text"
                          value={bgNormEnd}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgNormEnd(val);
                            setBgNormal(`from-[${bgNormStart}] to-[${val}]`);
                            setActivePreset('custom');
                          }}
                          className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Quick Preset Selector */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-850">
                    <label className="text-[9px] font-bold uppercase text-slate-405 dark:text-slate-500 block mb-1">Preset Options</label>
                    <select
                      value={bgNormal}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBgNormal(val);
                        const colors = parseBgPreset(val);
                        setBgNormStart(colors.start);
                        setBgNormEnd(colors.end);
                        setActivePreset('custom');
                      }}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-1.5 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 pointer-events-auto cursor-pointer"
                    >
                      <option value="from-slate-900 to-indigo-950">Cosmic Blue</option>
                      <option value="from-white to-slate-50/50">Arctic Light</option>
                      <option value="from-amber-205 to-amber-300">Retro Sand</option>
                      <option value="from-slate-950 to-slate-900">Obsidian Matte</option>
                      <option value="from-indigo-650 to-indigo-750">Royal Indigo</option>
                      <option value="from-rose-950 to-stone-900">Ember Crimson</option>
                      <option value="from-zinc-900 to-black">Abyss Dark</option>
                    </select>
                  </div>
                </div>

                {/* Hover Background Gradient */}
                <div className="space-y-2 p-3 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Hover State Fill
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Start Color */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase block">Start Hex</label>
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                        <input
                          type="color"
                          value={bgHovStart}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgHovStart(val);
                            setBgHover(`from-[${val}] to-[${bgHovEnd}]`);
                            setActivePreset('custom');
                          }}
                          className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0"
                        />
                        <input
                          type="text"
                          value={bgHovStart}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgHovStart(val);
                            setBgHover(`from-[${val}] to-[${bgHovEnd}]`);
                            setActivePreset('custom');
                          }}
                          className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    </div>
                    {/* End Color */}
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase block">End Hex</label>
                      <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                        <input
                          type="color"
                          value={bgHovEnd}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgHovEnd(val);
                            setBgHover(`from-[${bgHovStart}] to-[${val}]`);
                            setActivePreset('custom');
                          }}
                          className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0"
                        />
                        <input
                          type="text"
                          value={bgHovEnd}
                          onChange={(e) => {
                            const val = e.target.value;
                            setBgHovEnd(val);
                            setBgHover(`from-[${bgHovStart}] to-[${val}]`);
                            setActivePreset('custom');
                          }}
                          className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Quick Preset Selector */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-850">
                    <label className="text-[9px] font-bold uppercase text-slate-405 dark:text-slate-500 block mb-1">Preset Options</label>
                    <select
                      value={bgHover}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBgHover(val);
                        const colors = parseBgPreset(val);
                        setBgHovStart(colors.start);
                        setBgHovEnd(colors.end);
                        setActivePreset('custom');
                      }}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-1.5 py-1 text-[10px] font-bold text-slate-700 dark:text-slate-300 pointer-events-auto cursor-pointer"
                    >
                      <option value="from-indigo-650 to-violet-700">Neon Purple</option>
                      <option value="from-white to-indigo-50/20">Clean Glaze</option>
                      <option value="from-cyan-400 to-teal-400">Mint Aurora</option>
                      <option value="from-pink-500 to-rose-500">Vapor Pink</option>
                      <option value="from-slate-950 to-emerald-950/40">Dark Emerald</option>
                      <option value="from-yellow-400 to-amber-500">Cyber Gold</option>
                      <option value="from-red-500 to-orange-500">Volcanic Red</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Precision Text Colors Picker */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-850/50">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                Custom Text Color Configuration
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Normal Text */}
                <div className="space-y-1.5 p-2.5 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850">
                  <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">Normal Text Hex</label>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                    <input
                      type="color"
                      value={textNormHex}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTextNormHex(val);
                        setTextNormal(`text-[${val}]`);
                        setActivePreset('custom');
                      }}
                      className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      value={textNormHex}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTextNormHex(val);
                        setTextNormal(`text-[${val}]`);
                        setActivePreset('custom');
                      }}
                      className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                {/* Hover Text */}
                <div className="space-y-1.5 p-2.5 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850">
                  <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">Hover Text Hex</label>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                    <input
                      type="color"
                      value={textHovHex}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTextHovHex(val);
                        setTextHover(`text-[${val}]`);
                        setActivePreset('custom');
                      }}
                      className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      value={textHovHex}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTextHovHex(val);
                        setTextHover(`text-[${val}]`);
                        setActivePreset('custom');
                      }}
                      className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-505 dark:text-slate-500 uppercase tracking-wider block">
                  Text Presets Quick Select
                </span>
                <select
                  value={textNormal + ' | ' + textHover}
                  onChange={(e) => {
                    const [norm, hov] = e.target.value.split(' | ');
                    setTextNormal(norm);
                    setTextHover(hov);
                    setTextNormHex(parseTextPreset(norm));
                    setTextHovHex(parseTextPreset(hov));
                    setActivePreset('custom');
                  }}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-2 text-[11px] font-semibold text-slate-800 dark:text-slate-100 cursor-pointer pointer-events-auto"
                >
                  <option value="text-slate-100 | text-white">Light on Dark</option>
                  <option value="text-slate-800 | text-slate-950">Dark on Light</option>
                  <option value="text-slate-350 | text-emerald-350">Emerald Accent</option>
                  <option value="text-black | text-black">Brutalist Black</option>
                  <option value="text-indigo-200 | text-pink-200">Cyber Purple-Pink</option>
                </select>
              </div>
            </div>

            {/* Custom Active Glow Halo Color Picker and Swatches */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-850/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                  Halo Glow Color & Intensity
                </span>
                <span className="text-[10px] font-mono font-bold text-indigo-500 dark:text-indigo-400">
                  {Math.round(currentGlow.alpha * 100)}% Opacity
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Color Choice */}
                <div className="space-y-1.5 p-2.5 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850">
                  <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 block mb-1">Glow Hex Color</label>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                    <input
                      type="color"
                      value={currentGlow.hex}
                      onChange={(e) => {
                        const hex = e.target.value;
                        const rVal = parseInt(hex.slice(1, 3), 16) || 0;
                        const gVal = parseInt(hex.slice(3, 5), 16) || 0;
                        const bVal = parseInt(hex.slice(5, 7), 16) || 0;
                        setGlowColor(`rgba(${rVal}, ${gVal}, ${bVal}, ${currentGlow.alpha})`);
                        setActivePreset('custom');
                      }}
                      className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0"
                    />
                    <input
                      type="text"
                      value={currentGlow.hex}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.startsWith('#') && val.length <= 7) {
                          const cleanup = val.padEnd(7, '0');
                          const rVal = parseInt(cleanup.slice(1, 3), 16) || 0;
                          const gVal = parseInt(cleanup.slice(3, 5), 16) || 0;
                          const bVal = parseInt(cleanup.slice(5, 7), 16) || 0;
                          setGlowColor(`rgba(${rVal}, ${gVal}, ${bVal}, ${currentGlow.alpha})`);
                        }
                        setActivePreset('custom');
                      }}
                      className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                {/* Opacity Slider */}
                <div className="space-y-1.5 p-2.5 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850 flex flex-col justify-center">
                  <label className="text-[10px] font-bold uppercase text-slate-505 dark:text-slate-400 block mb-1">Glow Strength (Alpha)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={Math.round(currentGlow.alpha * 100)}
                      onChange={(e) => {
                        const alphaVal = parseFloat(e.target.value) / 100;
                        const hex = currentGlow.hex;
                        const rVal = parseInt(hex.slice(1, 3), 16) || 0;
                        const gVal = parseInt(hex.slice(3, 5), 16) || 0;
                        const bVal = parseInt(hex.slice(5, 7), 16) || 0;
                        setGlowColor(`rgba(${rVal}, ${gVal}, ${bVal}, ${alphaVal})`);
                        setActivePreset('custom');
                      }}
                      className="w-full accent-indigo-650 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Preset Swatches */}
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase text-slate-400 dark:text-slate-500 block mb-1">
                  Quick Selector Presets
                </span>
                <div className="flex items-center gap-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { hex: '#6366f1', value: `rgba(99, 102, 241, ${currentGlow.alpha})`, label: 'Indigo' },
                      { hex: '#a855f7', value: `rgba(168, 85, 247, ${currentGlow.alpha})`, label: 'Purple' },
                      { hex: '#10b981', value: `rgba(16, 185, 129, ${currentGlow.alpha})`, label: 'Emerald' },
                      { hex: '#ec4899', value: `rgba(236, 72, 153, ${currentGlow.alpha})`, label: 'Pink' },
                      { hex: '#f59e0b', value: `rgba(245, 158, 11, ${currentGlow.alpha})`, label: 'Amber' },
                      { hex: '#06b6d4', value: `rgba(6, 182, 212, ${currentGlow.alpha})`, label: 'Cyan' },
                      { hex: '#ef4444', value: `rgba(239, 68, 68, ${currentGlow.alpha})`, label: 'Red' },
                      { hex: '#ffffff', value: `rgba(255, 255, 255, ${currentGlow.alpha})`, label: 'White' },
                    ].map((color) => {
                      const isSelected = currentGlow.hex.toLowerCase() === color.hex.toLowerCase();
                      return (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() => {
                            setGlowColor(color.value);
                            setActivePreset('custom');
                          }}
                          style={{ backgroundColor: color.hex }}
                          className={`h-6 w-6 rounded-full border-2 transition-all cursor-pointer ${
                            isSelected 
                              ? 'border-slate-800 dark:border-white scale-125 shadow-sm' 
                              : 'border-slate-200 dark:border-slate-800 hover:scale-110'
                          }`}
                          title={color.label}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Borders & Radius Control section */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-850/50">
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                  Border Radius Style
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { value: 'rounded-none', label: 'Sharp' },
                    { value: 'rounded-lg', label: 'Medium' },
                    { value: 'rounded-xl', label: 'Large' },
                    { value: 'rounded-2xl', label: 'Huge' },
                  ].map((rad) => (
                    <button
                      key={rad.value}
                      onClick={() => {
                        setBorderRadius(rad.value);
                        setActivePreset('custom');
                      }}
                      className={`px-1 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border text-center transition-all cursor-pointer ${
                        borderRadius === rad.value
                          ? 'bg-indigo-650 text-white border-transparent'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-205 dark:border-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {rad.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Normal Border Color */}
                <div className="space-y-2 p-2.5 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Normal Border
                  </span>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                    <input
                      type="color"
                      value={borderNormHex === 'transparent' ? '#000000' : borderNormHex}
                      disabled={borderNormHex === 'transparent'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBorderNormHex(val);
                        setBorderNormal(`border-[${val}]`);
                        setActivePreset('custom');
                      }}
                      className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0 disabled:opacity-40"
                    />
                    <input
                      type="text"
                      value={borderNormHex}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBorderNormHex(val);
                        if (val === 'transparent') {
                          setBorderNormal('border-transparent');
                        } else {
                          setBorderNormal(`border-[${val}]`);
                        }
                        setActivePreset('custom');
                      }}
                      className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div className="pt-1.5">
                    <select
                      value={borderNormal}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBorderNormal(val);
                        setBorderNormHex(parseBorderPreset(val));
                        setActivePreset('custom');
                      }}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-1.5 py-1 text-[10px] font-semibold text-slate-850 dark:text-slate-100 cursor-pointer pointer-events-auto"
                    >
                      <option value="border-transparent">No border color</option>
                      <option value="border-slate-850">Obsidian Slate</option>
                      <option value="border-slate-200">Cool Soft Slate</option>
                      <option value="border-indigo-500/20">Indigo Tint</option>
                      <option value="border-zinc-700">Dark Charcoal</option>
                    </select>
                  </div>
                </div>

                {/* Hover Border Color */}
                <div className="space-y-2 p-2.5 bg-slate-55 dark:bg-slate-900/30 rounded-xl border border-slate-150 dark:border-slate-850">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Hover Border
                  </span>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1">
                    <input
                      type="color"
                      value={borderHovHex === 'transparent' ? '#000000' : borderHovHex}
                      disabled={borderHovHex === 'transparent'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBorderHovHex(val);
                        setBorderHover(`border-[${val}]`);
                        setActivePreset('custom');
                      }}
                      className="h-5 w-5 rounded cursor-pointer border-none bg-transparent shrink-0 disabled:opacity-40"
                    />
                    <input
                      type="text"
                      value={borderHovHex}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBorderHovHex(val);
                        if (val === 'transparent') {
                          setBorderHover('border-transparent');
                        } else {
                          setBorderHover(`border-[${val}]`);
                        }
                        setActivePreset('custom');
                      }}
                      className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-200"
                    />
                  </div>

                  <div className="pt-1.5">
                    <select
                      value={borderHover}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBorderHover(val);
                        setBorderHovHex(parseBorderPreset(val));
                        setActivePreset('custom');
                      }}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-1.5 py-1 text-[10px] font-semibold text-slate-850 dark:text-slate-100 cursor-pointer pointer-events-auto"
                    >
                      <option value="border-transparent">No border color</option>
                      <option value="border-indigo-400/55">Cosmic Indigo</option>
                      <option value="border-emerald-500">Aurora Emerald</option>
                      <option value="border-pink-500">Sweet Fuchsia</option>
                      <option value="border-zinc-100">Bright White</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Border Thickness
                </span>
                <select
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(parseFloat(e.target.value));
                    setActivePreset('custom');
                  }}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-2.5 text-[11px] font-semibold text-slate-800 dark:text-slate-100 cursor-pointer pointer-events-auto"
                >
                  <option value="0">No Stroke (0px)</option>
                  <option value="1">Thin (1px)</option>
                  <option value="1.5">Medium (1.5px)</option>
                  <option value="2">Thick (2px)</option>
                  <option value="3">Super (3px)</option>
                </select>
              </div>
            </div>
          </div>



        </div>

        {/* Right column: Sandbox Preview + Compiled Output (span 7) */}
        <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-8 z-20">
          
          {/* Web Interactive Sandbox Showcase */}
          <div 
            ref={previewStageRef}
            className="bg-slate-100/60 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-850 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center"
          >
            
            {/* Visual Dot Grid background decorator */}
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#334155_1.2px,transparent_1.2px)] [background-size:16px_16px] pointer-events-none opacity-40" />
            
            <div className="w-full flex items-center justify-between z-10 mb-6">
              <div className="flex items-center gap-2">
                <Eye className="h-4.5 w-4.5 text-indigo-600" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-350 flex items-center gap-2">
                  Interactive Canvas
                  {isScrolling && (
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded animate-pulse ${
                      scrollDelta > 0 
                        ? 'bg-amber-500 text-slate-950' 
                        : 'bg-emerald-500 text-white'
                    }`}>
                      Scroll {scrollDelta > 0 ? 'Down ⬇' : 'Up ⬆'}
                    </span>
                  )}
                </span>
              </div>
              <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-full border border-indigo-200/20">
                {isScrolling 
                  ? (scrollDelta > 0 
                      ? "⚡ Scrolling Down: +Y Offset momentum triggered" 
                      : "⚡ Scrolling Up: -Y Offset momentum triggered") 
                  : "Move Mouse Over Elements"}
              </div>
            </div>

            {/* Stage Showcase layout */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 z-10 py-4">
              
              {/* Test Element 1: Card Container */}
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2.5 block text-center">
                  Bento Showcase Card
                </span>
                
                <div
                  id="sandbox-test-component"
                  style={getDynamicTestPanelStyles(hoveredCard)}
                  className={`w-full max-w-sm flex flex-col justify-between p-6 transition-all cursor-pointer bg-gradient-to-br ${
                    (forceHover || isScrolling || hoveredCard) ? bgHover : bgNormal
                  } ${
                    (forceHover || isScrolling || hoveredCard) ? textHover : textNormal
                  } ${borderRadius} border ${
                    (forceHover || isScrolling || hoveredCard) ? borderHover : borderNormal
                  } ${
                    (forceHover || isScrolling || hoveredCard) ? shadowHover : shadowNormal
                  }`}
                  onMouseEnter={() => setHoveredCard(true)}
                  onMouseLeave={() => setHoveredCard(false)}
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <span className="text-[9px] font-black tracking-widest bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded uppercase font-mono">
                        Active
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-extrabold uppercase tracking-wide">
                        {sandboxText}
                      </h3>
                      <p className="text-[11px] opacity-75 mt-1 font-sans leading-relaxed">
                        Customize visual transformations using precision sliders on the left-panel editor.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-3.5 border-t border-slate-500/10 text-[10px] font-black uppercase tracking-wider">
                    <span>Deploy Asset</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="mt-3.5 w-full max-w-xs">
                  <input
                    type="text"
                    value={sandboxText}
                    onChange={(e) => setSandboxText(e.target.value)}
                    placeholder="Rename card..."
                    className="w-full text-center py-1 bg-transparent text-[11px] font-extrabold text-slate-550 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-slate-300 dark:focus:border-slate-850 rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* Test Element 2: Action Button and Small components */}
              <div className="flex flex-col items-center justify-center space-y-6">
                
                <div className="w-full flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2.5 block text-center">
                    Call To Action Trigger
                  </span>
                  
                  <button
                    id="sandbox-test-btn"
                    style={getDynamicTestPanelStyles(hoveredBtn)}
                    className={`px-8 py-3.5 font-black text-xs uppercase tracking-widest transition-all cursor-pointer bg-gradient-to-br ${
                      (forceHover || isScrolling || hoveredBtn) ? bgHover : bgNormal
                    } ${
                      (forceHover || isScrolling || hoveredBtn) ? textHover : textNormal
                    } ${borderRadius} border ${
                      (forceHover || isScrolling || hoveredBtn) ? borderHover : borderNormal
                    } ${
                      (forceHover || isScrolling || hoveredBtn) ? shadowHover : shadowNormal
                    }`}
                    onMouseEnter={() => setHoveredBtn(true)}
                    onMouseLeave={() => setHoveredBtn(false)}
                  >
                    Hover Me Please
                  </button>
                </div>

                <div className="w-full flex flex-col items-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2.5 block text-center">
                    Floating Circular Icon
                  </span>
                  
                  <div
                    id="sandbox-test-circle"
                    style={getDynamicTestPanelStyles(hoveredCircle)}
                    className={`h-14 w-14 rounded-full flex items-center justify-center transition-all cursor-pointer bg-gradient-to-br ${
                      (forceHover || isScrolling || hoveredCircle) ? bgHover : bgNormal
                    } ${
                      (forceHover || isScrolling || hoveredCircle) ? textHover : textNormal
                    } border ${
                      (forceHover || isScrolling || hoveredCircle) ? borderHover : borderNormal
                    } ${
                      (forceHover || isScrolling || hoveredCircle) ? shadowHover : shadowNormal
                    }`}
                    onMouseEnter={() => setHoveredCircle(true)}
                    onMouseLeave={() => setHoveredCircle(false)}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

              </div>

              {/* End Layer Parameters Section */}
              <div className="w-full mt-6 pt-5 border-t border-slate-200/65 dark:border-slate-800/80 z-10 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <Sliders className="h-3.5 w-3.5 text-indigo-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                    Layer Parameters
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/50 dark:bg-slate-950/30 p-3.5 rounded-xl border border-slate-150 dark:border-slate-850/60 font-mono text-[10px] text-slate-650 dark:text-slate-350 leading-normal">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">Scale Factor</span>
                    <span className="font-extrabold text-indigo-650 dark:text-indigo-400">{scale.toFixed(2)}x</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">Vertical Lift</span>
                    <span className="font-extrabold text-indigo-650 dark:text-indigo-400">{translateY}px</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">Lateral Drive</span>
                    <span className="font-extrabold text-indigo-650 dark:text-indigo-400">{translateX}px</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">Rotate Angle</span>
                    <span className="font-extrabold text-indigo-650 dark:text-indigo-400">{rotate}°</span>
                  </div>
                  <div className="space-y-1 mt-1 sm:mt-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">Skew Transform</span>
                    <span className="font-extrabold text-indigo-650 dark:text-indigo-400">{skewX}° / {skewY}°</span>
                  </div>
                  <div className="space-y-1 mt-1 sm:mt-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">Duration</span>
                    <span className="font-extrabold text-indigo-650 dark:text-indigo-400">{duration}ms</span>
                  </div>
                  <div className="space-y-1 mt-1 sm:mt-0 col-span-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display block">Timing Function</span>
                    <span className="font-extrabold text-indigo-650 dark:text-indigo-400 block truncate" title={timing}>{timing}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Guidelines Tips on implementation */}
          <div className="bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/15 dark:border-amber-900/30 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-amber-805 dark:text-amber-300">
            <HelpCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider block text-[10px]">
                Integration Best Practice
              </span>
              <p className="font-sans text-[11px] opacity-90">
                To guarantee GPU-accelerated and smooth transitions, implement <code>transition-property: transform, box-shadow, background-color, border-color;</code> and assign backings properly. Always use <code>will-change: transform</code> if the hover triggers complex recursive skew layers on slow legacy web clients.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* CODE COMPILER EXPORT COMPONENT - 12 Column full-width section below grid, above Explore Other Generators */}
      <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm mt-8 animate-fade-in animate-duration-500" id="hover-effect-exports-section">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-slate-100 dark:border-slate-850 pb-3">
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-indigo-500" />
            <div>
              <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
                Export Transform & Hover Styles
              </h3>
              <p className="text-[10px] text-slate-450 uppercase tracking-widest font-mono">
                Deploy lightweight, high-performance physical hover interactions directly into your design system
              </p>
            </div>
          </div>

          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-1">
            {[
              { id: 'css', label: 'css ruleset' },
              { id: 'tailwind', label: 'tailwind class' },
              { id: 'react', label: 'react / jsx' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCodeTab(tab.id as 'css' | 'tailwind' | 'react')}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider font-display rounded-lg transition-all cursor-pointer ${
                  activeCodeTab === tab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm font-black'
                    : 'text-slate-500 hover:text-slate-755'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <button
              onClick={() => {
                const code = activeCodeTab === 'css' 
                  ? generateRawCSS() 
                  : activeCodeTab === 'tailwind' 
                    ? generateTailwindClass() 
                    : generateReactCode();
                copyToClipboard(code, activeCodeTab);
              }}
              className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-indigo-650 dark:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur"
            >
              {copiedText === activeCodeTab ? (
                <>
                  <Check className="h-3 text-emerald-500 animate-pulse" />
                  <span className="text-emerald-505 dark:text-emerald-400 font-black">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy Code String</span>
                </>
              )}
            </button>

            <div className="bg-slate-50/50 dark:bg-slate-900/60 rounded-2xl p-5 border border-slate-150 dark:border-slate-850 font-mono text-xs leading-relaxed overflow-x-auto text-slate-750 dark:text-slate-300">
              {activeCodeTab === 'css' && (
                <pre className="max-h-64 overflow-y-auto scrollbar-thin">
                  <code>{generateRawCSS()}</code>
                </pre>
              )}
              {activeCodeTab === 'tailwind' && (
                <div className="break-all font-semibold select-all">
                  {generateTailwindClass()}
                </div>
              )}
              {activeCodeTab === 'react' && (
                <pre className="max-h-72 overflow-y-auto scrollbar-thin">
                  <code>{generateReactCode()}</code>
                </pre>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/10 rounded-2xl p-4">
            <div className="flex gap-2 text-xs leading-relaxed text-indigo-805 dark:text-indigo-350">
              <BadgeInfo className="h-4 w-4 text-indigo-505 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-[10px] uppercase tracking-wider block text-indigo-600 dark:text-indigo-400">
                  Integration Blueprint Advice
                </span>
                <p className="font-sans text-[11px] opacity-90 max-w-2xl leading-normal text-slate-600 dark:text-slate-400">
                  {activeCodeTab === 'css' && "Include standard custom timing functions in your system style sheets to enable sub-pixel interpolation."}
                  {activeCodeTab === 'tailwind' && "Requires standard config hooks or relative inline parameters to inject custom durations dynamically."}
                  {activeCodeTab === 'react' && "Requires importing standard motion hooks from the lightweight frame animation library."}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
