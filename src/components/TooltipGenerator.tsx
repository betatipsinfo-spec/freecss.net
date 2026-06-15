import React, { useState } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Layers, Code, Palette, HelpCircle, 
  Copy, Check, Eye, HelpCircle as HelpIcon, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
  Maximize, Settings, Zap, Play, Box
} from 'lucide-react';

interface TooltipPreset {
  name: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  bgColor: string;
  textColor: string;
  fontSize: number; // px
  borderRadius: number; // px
  paddingX: number; // px
  paddingY: number; // px
  arrowSize: number; // px
  shadow: string; // tailwind class / css style shadow
  animation: 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'bounce' | 'zoom-in';
  transitionTime: number; // ms
  borderWidth: number; // px
  borderColor: string;
  hasGlow: boolean;
  fontWeight: 'normal' | 'semibold' | 'bold';
}

const TOOLTIP_PRESETS: TooltipPreset[] = [
  {
    name: 'Classic Dark',
    description: 'Clean high-contrast dark visual bubble',
    position: 'top',
    bgColor: '#1e293b',
    textColor: '#ffffff',
    fontSize: 12,
    borderRadius: 8,
    paddingX: 12,
    paddingY: 8,
    arrowSize: 6,
    shadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    animation: 'fade',
    transitionTime: 200,
    borderWidth: 0,
    borderColor: '#334155',
    hasGlow: false,
    fontWeight: 'normal'
  },
  {
    name: 'Neon Cyberpunk',
    description: 'Glow-enhanced deep violet with hot pink accents',
    position: 'right',
    bgColor: '#0f0b21',
    textColor: '#f43f5e',
    fontSize: 12,
    borderRadius: 6,
    paddingX: 14,
    paddingY: 10,
    arrowSize: 8,
    shadow: '0 0 15px rgba(244, 63, 94, 0.4)',
    animation: 'bounce',
    transitionTime: 300,
    borderWidth: 1.5,
    borderColor: '#f43f5e',
    hasGlow: true,
    fontWeight: 'bold'
  },
  {
    name: 'Frosted Glassmorphism',
    description: 'Modern apple design translucent surface blur',
    position: 'top',
    bgColor: 'rgba(255, 255, 255, 0.2)',
    textColor: '#0f172a',
    fontSize: 12,
    borderRadius: 12,
    paddingX: 14,
    paddingY: 8,
    arrowSize: 6,
    shadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
    animation: 'scale',
    transitionTime: 250,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    hasGlow: false,
    fontWeight: 'semibold'
  },
  {
    name: 'Vibrant Sunset gradient',
    description: 'Beautiful flowing orange-purple header pill',
    position: 'bottom',
    bgColor: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)',
    textColor: '#ffffff',
    fontSize: 13,
    borderRadius: 16,
    paddingX: 16,
    paddingY: 10,
    arrowSize: 7,
    shadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
    animation: 'zoom-in',
    transitionTime: 250,
    borderWidth: 0,
    borderColor: 'transparent',
    hasGlow: true,
    fontWeight: 'bold'
  },
  {
    name: 'Warning Bubble',
    description: 'Critical error alert yellow popover context',
    position: 'left',
    bgColor: '#fef08a',
    textColor: '#854d0e',
    fontSize: 11,
    borderRadius: 8,
    paddingX: 12,
    paddingY: 8,
    arrowSize: 6,
    shadow: '0 4px 10px rgba(133, 77, 14, 0.1)',
    animation: 'scale',
    transitionTime: 150,
    borderWidth: 1.5,
    borderColor: '#eab308',
    hasGlow: false,
    fontWeight: 'bold'
  },
  {
    name: 'Minimal Terminal',
    description: 'Brutalist retro aesthetic green layout context',
    position: 'top',
    bgColor: '#000000',
    textColor: '#22c55e',
    fontSize: 12,
    borderRadius: 0,
    paddingX: 12,
    paddingY: 6,
    arrowSize: 5,
    shadow: 'solid 3px #22c55e',
    animation: 'slide-up',
    transitionTime: 100,
    borderWidth: 1,
    borderColor: '#22c55e',
    hasGlow: false,
    fontWeight: 'normal'
  }
];

export default function TooltipGenerator() {
  // Core Tooltip State Values
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [bgColor, setBgColor] = useState<string>('#1e293b');
  const [textColor, setTextColor] = useState<string>('#ffffff');
  const [fontSize, setFontSize] = useState<number>(12);
  const [borderRadius, setBorderRadius] = useState<number>(8);
  const [paddingX, setPaddingX] = useState<number>(14);
  const [paddingY, setPaddingY] = useState<number>(8);
  const [arrowSize, setArrowSize] = useState<number>(6);
  const [animation, setAnimation] = useState<'fade' | 'scale' | 'slide-up' | 'slide-down' | 'bounce' | 'zoom-in'>('fade');
  const [transitionTime, setTransitionTime] = useState<number>(200);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderColor, setBorderColor] = useState<string>('#334155');
  const [fontWeight, setFontWeight] = useState<'normal' | 'semibold' | 'bold'>('normal');
  const [hasGlow, setHasGlow] = useState<boolean>(false);

  // Content customizers
  const [triggerText, setTriggerText] = useState<string>('Hover Over Me');
  const [tooltipContent, setTooltipContent] = useState<string>('Perfect lightweight CSS tooltip! 💡');
  const [customShadow, setCustomShadow] = useState<string>('0 8px 16px rgba(0, 0, 0, 0.15)');

  // Interface preferences
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [forceShow, setForceShow] = useState<boolean>(true);
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react'>('css');
  const [copiedText, setCopiedText] = useState<'css' | 'tailwind' | 'react' | null>(null);

  const handleCopyToClipboard = (text: string, tab: 'css' | 'tailwind' | 'react') => {
    navigator.clipboard.writeText(text);
    setCopiedText(tab);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Apply a config preset instantly
  const applyPreset = (index: number) => {
    setActivePresetIndex(index);
    const p = TOOLTIP_PRESETS[index];
    setPosition(p.position);
    setBgColor(p.bgColor);
    setTextColor(p.textColor);
    setFontSize(p.fontSize);
    setBorderRadius(p.borderRadius);
    setPaddingX(p.paddingX);
    setPaddingY(p.paddingY);
    setArrowSize(p.arrowSize);
    setAnimation(p.animation);
    setTransitionTime(p.transitionTime);
    setBorderWidth(p.borderWidth);
    setBorderColor(p.borderColor);
    setFontWeight(p.fontWeight);
    setHasGlow(p.hasGlow);

    if (p.name === 'Neon Cyberpunk') {
      setCustomShadow('0 0 15px rgba(244, 63, 94, 0.5)');
    } else if (p.name === 'Frosted Glassmorphism') {
      setCustomShadow('0 8px 32px rgba(31, 38, 135, 0.15)');
    } else if (p.name === 'Vibrant Sunset gradient') {
      setCustomShadow('0 6px 20px rgba(139, 92, 246, 0.35)');
    } else if (p.name === 'Minimal Terminal') {
      setCustomShadow('none');
    } else {
      setCustomShadow('0 8px 16px rgba(0, 0, 0, 0.15)');
    }
  };

  const handleReset = () => {
    setPosition('top');
    setBgColor('#1e293b');
    setTextColor('#ffffff');
    setFontSize(12);
    setBorderRadius(8);
    setPaddingX(14);
    setPaddingY(8);
    setArrowSize(6);
    setAnimation('fade');
    setTransitionTime(200);
    setBorderWidth(0);
    setBorderColor('#334155');
    setFontWeight('normal');
    setHasGlow(false);
    setTriggerText('Hover Over Me');
    setTooltipContent('Perfect lightweight CSS tooltip! 💡');
    setCustomShadow('0 8px 16px rgba(0, 0, 0, 0.15)');
    setActivePresetIndex(0);
    setForceShow(true);
  };

  // Build arrow coordinates & positions based on direction:
  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return `bottom: -${arrowSize * 2}px; left: 50%; transform: translateX(-50%); border-width: ${arrowSize}px; border-color: ${bgColor.includes('rgba') ? 'rgba(255,255,255,0.1)' : bgColor} transparent transparent transparent;`;
      case 'bottom':
        return `top: -${arrowSize * 2}px; left: 50%; transform: translateX(-50%); border-width: ${arrowSize}px; border-color: transparent transparent ${bgColor.includes('rgba') ? 'rgba(255,255,255,0.1)' : bgColor} transparent;`;
      case 'left':
        return `right: -${arrowSize * 2}px; top: 50%; transform: translateY(-50%); border-width: ${arrowSize}px; border-color: transparent transparent transparent ${bgColor.includes('rgba') ? 'rgba(255,255,255,0.1)' : bgColor};`;
      case 'right':
        return `left: -${arrowSize * 2}px; top: 50%; transform: translateY(-50%); border-width: ${arrowSize}px; border-color: transparent ${bgColor.includes('rgba') ? 'rgba(255,255,255,0.1)' : bgColor} transparent transparent;`;
    }
  };

  // Animation values map to CSS transitions
  const getAnimationCSS = () => {
    let initialTransform = '';
    let hoverTransform = '';

    switch (position) {
      case 'top':
        initialTransform = 'translate3d(-50%, 8px, 0)';
        hoverTransform = 'translate3d(-50%, 0, 0)';
        break;
      case 'bottom':
        initialTransform = 'translate3d(-50%, -8px, 0)';
        hoverTransform = 'translate3d(-50%, 0, 0)';
        break;
      case 'left':
        initialTransform = 'translate3d(8px, -50%, 0)';
        hoverTransform = 'translate3d(0, -50%, 0)';
        break;
      case 'right':
        initialTransform = 'translate3d(-8px, -50%, 0)';
        hoverTransform = 'translate3d(0, -50%, 0)';
        break;
    }

    if (animation === 'scale') {
      initialTransform += ' scale(0.85)';
      hoverTransform += ' scale(1)';
    } else if (animation === 'zoom-in') {
      initialTransform += ' scale(0.5)';
      hoverTransform += ' scale(1)';
    } else if (animation === 'bounce') {
      initialTransform += ' scale(0.9)';
      hoverTransform += ' scale(1.05)';
    }

    return { initialTransform, hoverTransform };
  };

  const anim = getAnimationCSS();

  // Position placements inside tooltip container
  const getContainerPositionStyle = () => {
    switch (position) {
      case 'top':
        return 'bottom: 100%; left: 50%; margin-bottom: 10px; transform: translateX(-50%);';
      case 'bottom':
        return 'top: 100%; left: 50%; margin-top: 10px; transform: translateX(-50%);';
      case 'left':
        return 'right: 100%; top: 50%; margin-right: 10px; transform: translateY(-50%);';
      case 'right':
        return 'left: 100%; top: 50%; margin-left: 10px; transform: translateY(-50%);';
    }
  };

  // Modern HTML & CSS Code Export Generation
  const rawCSSCode = `/* CSS Tooltip Base Container */
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* Tooltip Bubble */
.tooltip-bubble {
  position: absolute;
  ${getContainerPositionStyle()}
  background: ${bgColor};
  color: ${textColor};
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  border-radius: ${borderRadius}px;
  padding: ${paddingY}px ${paddingX}px;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${forceShow ? '1' : '0'};
  visibility: ${forceShow ? 'visible' : 'hidden'};
  box-shadow: ${customShadow};
  ${borderWidth > 0 ? `border: ${borderWidth}px solid ${borderColor};` : ''}
  transform: ${anim.hoverTransform};
  transition: all ${transitionTime}ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 100;
}

/* Tooltip Arrow */
.tooltip-bubble::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  ${getArrowStyles()}
}

/* Show Tooltip on Hover */
.tooltip-container:hover .tooltip-bubble {
  opacity: 1;
  visibility: visible;
  transform: ${anim.hoverTransform};
}`;

  // Dynamic highly-precision Tailwind CSS utility compiler
  const getTailwindCode = () => {
    let placementClass = '';
    let arrowPlacementStyle = '';
    let animClassesStart = '';
    let animClassesEnd = '';

    switch (position) {
      case 'top':
        placementClass = 'bottom-full left-1/2 -translate-x-1/2 mb-[10px]';
        arrowPlacementStyle = `bottom-[-${arrowSize * 2}px] left-1/2 -translate-x-1/2 border-[${arrowSize}px] border-t-[${bgColor}] border-x-transparent border-b-transparent`;
        animClassesStart = 'translate-y-2';
        animClassesEnd = 'group-hover:translate-y-0';
        break;
      case 'bottom':
        placementClass = 'top-full left-1/2 -translate-x-1/2 mt-[10px]';
        arrowPlacementStyle = `top-[-${arrowSize * 2}px] left-1/2 -translate-x-1/2 border-[${arrowSize}px] border-b-[${bgColor}] border-x-transparent border-t-transparent`;
        animClassesStart = '-translate-y-2';
        animClassesEnd = 'group-hover:translate-y-0';
        break;
      case 'left':
        placementClass = 'right-full top-1/2 -translate-y-1/2 mr-[10px]';
        arrowPlacementStyle = `right-[-${arrowSize * 2}px] top-1/2 -translate-y-1/2 border-[${arrowSize}px] border-l-[${bgColor}] border-y-transparent border-r-transparent`;
        animClassesStart = 'translate-x-2';
        animClassesEnd = 'group-hover:translate-x-0';
        break;
      case 'right':
        placementClass = 'left-full top-1/2 -translate-y-1/2 ml-[10px]';
        arrowPlacementStyle = `left-[-${arrowSize * 2}px] top-1/2 -translate-y-1/2 border-[${arrowSize}px] border-r-[${bgColor}] border-y-transparent border-l-transparent`;
        animClassesStart = '-translate-x-2';
        animClassesEnd = 'group-hover:translate-x-0';
        break;
    }

    let animationScale = '';
    if (animation === 'scale') {
      animationScale = 'scale-90 group-hover:scale-100';
    } else if (animation === 'zoom-in') {
      animationScale = 'scale-50 group-hover:scale-100';
    } else if (animation === 'bounce') {
      animationScale = 'scale-95 group-hover:scale-105';
    }

    return `<div className="relative inline-block group">
  <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition duration-200">
    ${triggerText}
  </button>
  
  {/* Tooltip Bubble */}
  <div className="absolute ${placementClass} z-50 px-[${paddingX}px] py-[${paddingY}px] bg-[${bgColor}] text-[${textColor}] text-[${fontSize}px] font-${fontWeight === 'normal' ? 'normal' : fontWeight === 'semibold' ? 'semibold' : 'bold'} rounded-[${borderRadius}px] shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-[${transitionTime}ms] ease-out ${animClassesStart} ${animClassesEnd} ${animationScale} ${borderWidth > 0 ? `border-[${borderWidth}px] border-[${borderColor}]` : ''} ${hasGlow ? `shadow-[0_0_15px_${bgColor}]` : ''}">
    ${tooltipContent}
    {/* Tooltip Arrow */}
    <div className="absolute w-0 h-0 border-solid ${arrowPlacementStyle}"></div>
  </div>
</div>`;
  };

  const rawTailwindCode = getTailwindCode();

  const rawReactCode = `import React from 'react';
 
export default function SmartTooltip() {
  return (
    <div className="relative inline-block group">
      <button className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-200">
        ${triggerText}
      </button>

      {/* Tooltip Bubble */}
      <div 
        style={{
          background: "${bgColor}",
          color: "${textColor}",
          fontSize: "${fontSize}px",
          fontWeight: "${fontWeight}",
          borderRadius: "${borderRadius}px",
          padding: "${paddingY}px ${paddingX}px",
          boxShadow: "${customShadow}",
          ${borderWidth > 0 ? `border: "${borderWidth}px solid ${borderColor}",` : ''}
          transition: "all ${transitionTime}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        className="absolute z-50 pointer-events-none opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300
          ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2 translate-y-1 group-hover:translate-y-0' : ''}
          ${position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2 -translate-y-1 group-hover:translate-y-0' : ''}
          ${position === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-2 translate-x-1 group-hover:translate-x-0' : ''}
          ${position === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-2 -translate-x-1 group-hover:translate-x-0' : ''}
        "
      >
        ${tooltipContent}
        
        {/* Arrow element */}
        <div 
          className="absolute w-0 h-0 border-solid"
          style={{
            ${position === 'top' ? `bottom: -${arrowSize * 2}px; left: 50%; transform: translateX(-50%); border-width: ${arrowSize}px; border-color: ${bgColor} transparent transparent transparent;` : ''}
            ${position === 'bottom' ? `top: -${arrowSize * 2}px; left: 50%; transform: translateX(-50%); border-width: ${arrowSize}px; border-color: transparent transparent ${bgColor} transparent;` : ''}
            ${position === 'left' ? `right: -${arrowSize * 2}px; top: 50%; transform: translateY(-50%); border-width: ${arrowSize}px; border-color: transparent transparent transparent ${bgColor};` : ''}
            ${position === 'right' ? `left: -${arrowSize * 2}px; top: 50%; transform: translateY(-50%); border-width: ${arrowSize}px; border-color: transparent ${bgColor} transparent transparent;` : ''}
          }}
        />
      </div>
    </div>
  );
}`;

  return (
    <div className="space-y-6 animate-fade-in" id="tooltip-generator-workspace">
      
      {/* QUICK PRESETS CAROUSEL */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-855 dark:text-slate-200 flex items-center gap-2 font-display">
            <Palette className="h-4 w-4 text-indigo-500" /> Beautiful Ready-to-use Tooltip Presets
          </h3>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider font-display rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all shadow-xs active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5 text-indigo-500 animate-spin-reverse-once" /> Reset Playground
            </button>
            <span className="text-[9px] font-mono bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-extrabold uppercase px-2 py-1 rounded-full">
              Modern custom palettes
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {TOOLTIP_PRESETS.map((preset, idx) => {
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
                    <p className="text-[10px] font-black uppercase tracking-wide text-slate-900 dark:text-white leading-tight truncate">
                      {preset.name}
                    </p>
                    <div className="w-2.5 h-2.5 rounded-full border border-white/20 shadow-xs" style={{ background: preset.bgColor }} />
                  </div>
                  <p className="text-[9px] text-slate-500 leading-normal line-clamp-2">
                    {preset.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-[8px] font-mono text-indigo-650 dark:text-indigo-400 font-extrabold mt-1">
                  <span>Pos: {preset.position}</span>
                  <span className="uppercase text-[7px] bg-slate-100 dark:bg-slate-900 px-1 rounded">{preset.animation}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* WORKSPACE COMPONENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* SLIDERS & CONTROLS DECK (7 columns) */}
        <div className="lg:col-span-7 space-y-6">

          {/* DYNAMIC SHAPE CONTROLLER */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-200 flex items-center gap-2 font-display">
                <Sliders className="h-4 w-4 text-indigo-500" /> Layout & Appearance Parameters
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-indigo-500 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded font-black uppercase">
                  CSS3 PROPS
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* LAYOUT SIDE */}
              <div className="space-y-4">
                
                {/* Placement position */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-450">
                    <span>1. Tooltip Position</span>
                    <span className="font-mono text-indigo-500 uppercase">{position}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {(['top', 'bottom', 'left', 'right'] as const).map((pos) => {
                      return (
                        <button
                          key={pos}
                          onClick={() => { setPosition(pos); setActivePresetIndex(-1); }}
                          className={`py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg border-2 cursor-pointer transition-all ${
                            position === pos
                              ? 'bg-indigo-650 border-indigo-650 text-white shadow-xs'
                              : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-855 text-slate-700 dark:text-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {pos}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content values */}
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">2. Text Content Settings</span>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-extrabold uppercase text-slate-500">Trigger Button Label</label>
                    <input
                      type="text"
                      value={triggerText}
                      onChange={(e) => setTriggerText(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-extrabold uppercase text-slate-500">Tooltip Bubble Text</label>
                    <input
                      type="text"
                      value={tooltipContent}
                      onChange={(e) => setTooltipContent(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-lg text-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {/* Font customization sizes */}
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-455">
                    <span>3. Text Font Size</span>
                    <span className="font-mono text-indigo-500">{fontSize}px</span>
                  </div>
                  <input
                    type="range" min="10" max="18" step="1" value={fontSize}
                    onChange={(e) => { setFontSize(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-455 pt-1">
                    <span>4. Weight Variant</span>
                    <span className="font-mono text-indigo-500 uppercase">{fontWeight}</span>
                  </div>
                  <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-150">
                    {(['normal', 'semibold', 'bold'] as const).map((weight) => (
                      <button
                        key={weight}
                        onClick={() => { setFontWeight(weight); setActivePresetIndex(-1); }}
                        className={`flex-1 py-1 text-[8.5px] font-bold uppercase rounded cursor-pointer ${
                          fontWeight === weight
                            ? 'bg-indigo-650 text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* STYLING CODES */}
              <div className="space-y-4">
                
                {/* Quick Color Picker inputs */}
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">5. Palette Configurations</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[8.5px] font-bold uppercase text-slate-450">Bubble Color</label>
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                        <input 
                          type="color" value={bgColor.startsWith('rgba') ? '#1e293b' : bgColor.startsWith('linear') ? '#f43f5e' : bgColor} 
                          onChange={(e) => { setBgColor(e.target.value); setActivePresetIndex(-1); }}
                          className="w-5 h-5 rounded border-0 cursor-pointer overflow-hidden p-0"
                        />
                        <span className="font-mono text-[9px] uppercase tracking-wide text-slate-700 dark:text-slate-350 shrink-0">Hex code</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[8.5px] font-bold uppercase text-slate-455">Text Color</label>
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                        <input 
                          type="color" value={textColor} 
                          onChange={(e) => { setTextColor(e.target.value); setActivePresetIndex(-1); }}
                          className="w-5 h-5 rounded border-0 cursor-pointer overflow-hidden p-0"
                        />
                        <span className="font-mono text-[9px] uppercase tracking-wide text-slate-700 dark:text-slate-350 shrink-0">Hex code</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Padding slider */}
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-455">
                    <span>6. Horizontal Padding (X)</span>
                    <span className="font-mono text-indigo-500">{paddingX}px</span>
                  </div>
                  <input
                    type="range" min="8" max="24" step="1" value={paddingX}
                    onChange={(e) => { setPaddingX(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />

                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-455 pt-1">
                    <span>7. Vertical Padding (Y)</span>
                    <span className="font-mono text-indigo-500">{paddingY}px</span>
                  </div>
                  <input
                    type="range" min="4" max="16" step="1" value={paddingY}
                    onChange={(e) => { setPaddingY(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Curves curvature radius and arrow sizes */}
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-3.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-455">
                    <span>8. Corner Border Radius</span>
                    <span className="font-mono text-indigo-500">{borderRadius}px</span>
                  </div>
                  <input
                    type="range" min="0" max="24" step="1" value={borderRadius}
                    onChange={(e) => { setBorderRadius(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />

                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-455 pt-1">
                    <span>9. Pointer Arrow Size</span>
                    <span className="font-mono text-indigo-500">{arrowSize}px</span>
                  </div>
                  <input
                    type="range" min="3" max="15" step="1" value={arrowSize}
                    onChange={(e) => { setArrowSize(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

              </div>

            </div>

            {/* BORDER & GLOW SECTION */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-455">
                    <span>10. Custom Border Width</span>
                    <span className="font-mono text-indigo-500">{borderWidth}px</span>
                  </div>
                  <input
                    type="range" min="0" max="4" step="0.5" value={borderWidth}
                    onChange={(e) => { setBorderWidth(Number(e.target.value)); setActivePresetIndex(-1); }}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  
                  {borderWidth > 0 && (
                    <div className="flex items-center justify-between gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-slate-200">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">Border Color</span>
                      <input 
                        type="color" value={borderColor} 
                        onChange={(e) => setBorderColor(e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer p-0 border-0"
                      />
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-150 dark:border-slate-850 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-850 dark:text-slate-300 block">11. Animation Options</span>
                      <span className="text-[8.5px] text-slate-450">Select pop animation</span>
                    </div>
                    <span className="text-[9px] font-mono text-indigo-500 uppercase font-black">{animation}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mt-2">
                    {(['fade', 'scale', 'bounce', 'zoom-in', 'slide-up', 'slide-down'] as const).map((animName) => (
                      <button
                        key={animName}
                        onClick={() => { setAnimation(animName); setActivePresetIndex(-1); }}
                        className={`py-1 text-[8px] font-bold uppercase rounded cursor-pointer transition-all ${
                          animation === animName
                            ? 'bg-indigo-650 text-white shadow-2xs'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {animName}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* SIMULATION STATE CONFIGS */}
          <div className="bg-slate-50 dark:bg-slate-955 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800/80 p-3 rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-50 dark:bg-indigo-950 p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Settings className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-black tracking-wider text-slate-850 dark:text-white">
                    Playground Render Controls
                  </h4>
                  <p className="text-[10px] text-slate-450">Choose to force render open or test real hover status trigger</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setForceShow(true)}
                  className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    forceShow 
                      ? 'bg-indigo-650 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-500 dark:hover:bg-slate-800'
                  }`}
                >
                  Force Sticky Open
                </button>
                <button
                  onClick={() => setForceShow(false)}
                  className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    !forceShow 
                      ? 'bg-indigo-650 text-white shadow-xs' 
                      : 'bg-slate-100 dark:bg-slate-955 text-slate-500 dark:hover:bg-slate-800'
                  }`}
                >
                  Interactive Hover Test
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PREVIEW STAGE & CODE EXPORTERS */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">

          {/* DYNAMIC BUBBLE CANVAS */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between overflow-hidden relative">
            
            <div className="flex items-center justify-between w-full mb-4 z-10">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                <Eye className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-[9.5px] font-black uppercase tracking-wider font-display text-slate-800 dark:text-slate-350">
                  Interactive Viewport
                </span>
              </div>
              <span className="text-[9px] font-mono bg-indigo-55 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-450 font-extrabold px-2 py-0.5 rounded-lg uppercase">
                {forceShow ? "FORCE OPEN STATE" : "HOVER TO TRIGGER"}
              </span>
            </div>

            {/* LIVE PORTAL FOR TOOLTIP COMPONENT */}
            <div className="relative w-full h-[340px] rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-850/80 p-6">
              
              {/* VISUAL GRIDS LINES */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />
              <div className="absolute w-72 h-72 border border-slate-800/40 rounded-full pointer-events-none" />

              {/* CENTERED HOVERABLE TRIGGER WRAPPER */}
              <div className="relative inline-block group cursor-pointer z-20">
                
                {/* TOOLTIP TRIGGER BUTTON */}
                <button 
                  className="px-6 py-3 bg-gradient-to-tr from-violet-600 to-indigo-650 text-white font-display font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 active:scale-95 transition-all duration-200 pointer-events-auto"
                >
                  {triggerText}
                </button>

                {/* THE MORPHING CSS POPUP BUBBLE */}
                <div 
                  style={{
                    position: 'absolute',
                    background: bgColor,
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                    borderRadius: `${borderRadius}px`,
                    padding: `${paddingY}px ${paddingX}px`,
                    boxShadow: customShadow,
                    borderWidth: borderWidth > 0 ? `${borderWidth}px` : undefined,
                    borderColor: borderWidth > 0 ? borderColor : undefined,
                    borderStyle: borderWidth > 0 ? 'solid' : undefined,
                    transition: `all ${transitionTime}ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
                    transform: forceShow ? anim.hoverTransform : undefined,
                    zIndex: 100,
                    width: 'max-content',
                    maxWidth: '180px'
                  }}
                  className={`
                    pointer-events-none border-collapse whitespace-normal break-words leading-relaxed select-none overflow-visible
                    ${forceShow 
                      ? 'opacity-100 visible' 
                      : 'opacity-0 group-hover:opacity-100 invisible group-hover:visible'
                    }
                    ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-3 ' + (forceShow ? '' : 'translate-y-2 group-hover:translate-y-0') : ''}
                    ${position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-3 ' + (forceShow ? '' : '-translate-y-2 group-hover:translate-y-0') : ''}
                    ${position === 'left' ? 'right-full top-1/2 -translate-y-1/2 mr-3 ' + (forceShow ? '' : 'translate-x-2 group-hover:translate-x-0') : ''}
                    ${position === 'right' ? 'left-full top-1/2 -translate-y-1/2 ml-3 ' + (forceShow ? '' : '-translate-x-2 group-hover:translate-x-0') : ''}
                    ${hasGlow ? 'ring-4 ring-rose-500/10' : ''}
                  `}
                >
                  <p className="font-sans font-medium line-clamp-3">
                    {tooltipContent}
                  </p>

                  {/* CUSTOM INTEGRATED BUBBLE ARROW */}
                  <div 
                    className="absolute w-0 h-0 border-solid"
                    style={{
                      content: '""',
                      ...(() => {
                        switch (position) {
                          case 'top':
                            return {
                              bottom: `-${arrowSize * 2}px`,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              borderWidth: `${arrowSize}px`,
                              borderColor: `${bgColor} transparent transparent transparent`
                            };
                          case 'bottom':
                            return {
                              top: `-${arrowSize * 2}px`,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              borderWidth: `${arrowSize}px`,
                              borderColor: `transparent transparent ${bgColor} transparent`
                            };
                          case 'left':
                            return {
                              right: `-${arrowSize * 2}px`,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              borderWidth: `${arrowSize}px`,
                              borderColor: `transparent transparent transparent ${bgColor}`
                            };
                          case 'right':
                            return {
                              left: `-${arrowSize * 2}px`,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              borderWidth: `${arrowSize}px`,
                              borderColor: `transparent ${bgColor} transparent transparent`
                            };
                        }
                      })()
                    }}
                  />

                </div>

              </div>

            </div>

            {/* ARY VALUE BAR */}
            <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3.5 z-10">
              <span className="text-[10px] font-black font-display uppercase tracking-wider text-slate-455 block mb-1">
                Active Placement Pointer Position
              </span>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 font-mono text-[10.5px] text-indigo-400 text-center select-all whitespace-nowrap overflow-x-auto leading-none uppercase">
                placement: {position} | pointer-angle: {position === 'top' ? '180°' : position === 'bottom' ? '0°' : position === 'left' ? '90°' : '270°'}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* EXPORT CODE BLOCKS (Styled similarly to Transform Playground) */}
      <div className="mt-8 bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
        
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-850 pb-3">
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              Export Tooltip Styles
            </h3>
          </div>

          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-1">
            {(['css', 'tailwind', 'react'] as const).map((tab) => (
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

        {/* Compiled code block */}
        <div className="relative rounded-2xl bg-slate-950 p-5 mt-4 min-h-[140px] border border-slate-850 overflow-x-auto">
          
          {/* Copy keyboard */}
          <button
            onClick={() => {
              const targetCode = activeCodeTab === 'css' 
                ? rawCSSCode 
                : activeCodeTab === 'tailwind' 
                ? rawTailwindCode 
                : rawReactCode;
              handleCopyToClipboard(targetCode, activeCodeTab);
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

          {/* Print Code segment */}
          <pre className="text-xs font-mono font-bold text-slate-350 text-left whitespace-pre select-all pt-4 leading-normal">
            {activeCodeTab === 'css' && rawCSSCode}
            {activeCodeTab === 'tailwind' && rawTailwindCode}
            {activeCodeTab === 'react' && rawReactCode}
          </pre>

        </div>

        {/* Informational helpful tips */}
        <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/40 border border-indigo-100/50 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed flex gap-3">
          <Settings className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-850 dark:text-slate-300 mb-0.5">Custom Tooltip Compositing tip</p>
            <p>
              Using CSS transparency and responsive offsets ensures layout-independent rendering. Ensure your parent element has <code>position: relative</code> so the tooltips align correctly to their trigger bounds.
            </p>
          </div>
        </div>

      </div>

     

    </div>
  );
}

// Simple local visual icon proxy helper
function NormalizeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
