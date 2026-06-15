import React, { useState, useEffect } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Palette, Copy, Check, 
  Eye, Move, Layers, BadgeInfo, Info, RotateCw, 
  Box, Play, Pause, Compass, SlidersHorizontal, ToggleLeft, ToggleRight, ArrowUpRight
} from 'lucide-react';

interface TransformPreset {
  name: string;
  description: string;
  translateX: number;
  translateY: number;
  translateZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  skewX: number;
  skewY: number;
  perspective: number;
  originX: number; // as percentage
  originY: number; // as percentage
  duration: number; // in seconds
  timingFunction: string;
}

const TRANSFORM_PRESETS: TransformPreset[] = [
  {
    name: 'Isometric Card Float',
    description: 'Beautiful pseudo-3D axonometric floating state with high perspective',
    translateX: 0,
    translateY: -10,
    translateZ: 30,
    rotateX: 30,
    rotateY: -30,
    rotateZ: 10,
    scaleX: 1.05,
    scaleY: 1.05,
    scaleZ: 1.05,
    skewX: 0,
    skewY: 0,
    perspective: 800,
    originX: 50,
    originY: 50,
    duration: 0.6,
    timingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' // ease-out-quart
  },
  {
    name: '3D Flip Over',
    description: 'Clean vertical perspective flipping state that exposes the card layers',
    translateX: 0,
    translateY: 0,
    translateZ: 50,
    rotateX: 180,
    rotateY: 0,
    rotateZ: 0,
    scaleX: 0.95,
    scaleY: 0.95,
    scaleZ: 0.95,
    skewX: 0,
    skewY: 0,
    perspective: 600,
    originX: 50,
    originY: 50,
    duration: 0.8,
    timingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' // elastic-out
  },
  {
    name: 'Skewed Perspective Fold',
    description: 'Highly stylised flat distortion matching modern typography headers',
    translateX: 0,
    translateY: 0,
    translateZ: 0,
    rotateX: 0,
    rotateY: 25,
    rotateZ: 0,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    skewX: 0,
    skewY: 12,
    perspective: 1000,
    originX: 10,
    originY: 50,
    duration: 0.4,
    timingFunction: 'ease-in-out'
  },
  {
    name: 'Cyberpunk Shadow Spin',
    description: 'Extreme yaw tilt paired with rapid interactive entry timers',
    translateX: 15,
    translateY: -5,
    translateZ: 10,
    rotateX: 12,
    rotateY: 55,
    rotateZ: -12,
    scaleX: 1.1,
    scaleY: 1.1,
    scaleZ: 1,
    skewX: -8,
    skewY: 4,
    perspective: 500,
    originX: 50,
    originY: 50,
    duration: 0.5,
    timingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' // ease-out-expo
  },
  {
    name: 'Pop Out Scale Lift',
    description: 'Standard elegant hovering logic for SaaS bento grids and catalog buttons',
    translateX: 0,
    translateY: -8,
    translateZ: 40,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scaleX: 1.08,
    scaleY: 1.08,
    scaleZ: 1.08,
    skewX: 0,
    skewY: 0,
    perspective: 1200,
    originX: 50,
    originY: 50,
    duration: 0.3,
    timingFunction: 'ease'
  }
];

type TargetSample = 'credit-card' | 'glassmorphic-slab' | 'browser-wireframe' | 'cube-3d';

export default function TransformPlayground() {
  // Translate Controls State
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(-10);
  const [translateZ, setTranslateZ] = useState<number>(30);

  // Rotation Controls State
  const [rotateX, setRotateX] = useState<number>(30);
  const [rotateY, setRotateY] = useState<number>(-30);
  const [rotateZ, setRotateZ] = useState<number>(10);

  // Scale Controls State
  const [scaleX, setScaleX] = useState<number>(1.05);
  const [scaleY, setScaleY] = useState<number>(1.05);
  const [scaleZ, setScaleZ] = useState<number>(1.05);

  // Skew Controls State
  const [skewX, setSkewX] = useState<number>(0);
  const [skewY, setSkewY] = useState<number>(0);

  // 3D Perspective & Origin
  const [perspective, setPerspective] = useState<number>(800);
  const [originX, setOriginX] = useState<number>(50);
  const [originY, setOriginY] = useState<number>(50);

  // Transition & Interactive Drivers
  const [duration, setDuration] = useState<number>(0.6);
  const [timingFunction, setTimingFunction] = useState<string>('cubic-bezier(0.25, 1, 0.5, 1)');
  const [interactiveTrigger, setInteractiveTrigger] = useState<'immediate' | 'hover'>('immediate');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isOrbiting, setIsOrbiting] = useState<boolean>(false);
  const [orbitRate, setOrbitRate] = useState<number>(1.5);

  // Extra Playground Settings
  const [sampleWidget, setSampleWidget] = useState<TargetSample>('credit-card');
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [stageTheme, setStageTheme] = useState<'deep-space' | 'minimalist-gray' | 'editorial' | 'vector-stars'>('deep-space');
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react'>('css');
  const [copiedText, setCopiedText] = useState<string>('');

  // Auto Orbit Loop Handler
  useEffect(() => {
    if (!isOrbiting) return;

    let animFrameId: number;
    let currentYAngle = rotateY;
    let currentXAngle = rotateX;

    const tick = () => {
      currentYAngle = (currentYAngle + orbitRate) % 360;
      setRotateY(Math.round(currentYAngle * 10) / 10);
      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [isOrbiting, orbitRate]);

  // Read preset setup
  const loadPreset = (index: number) => {
    setActivePresetIndex(index);
    const p = TRANSFORM_PRESETS[index];
    setTranslateX(p.translateX);
    setTranslateY(p.translateY);
    setTranslateZ(p.translateZ);
    setRotateX(p.rotateX);
    setRotateY(p.rotateY);
    setRotateZ(p.rotateZ);
    setScaleX(p.scaleX);
    setScaleY(p.scaleY);
    setScaleZ(p.scaleZ);
    setSkewX(p.skewX);
    setSkewY(p.skewY);
    setPerspective(p.perspective);
    setOriginX(p.originX);
    setOriginY(p.originY);
    setDuration(p.duration);
    setTimingFunction(p.timingFunction);
  };

  // Convert raw parameters to CSS strings
  const getTransformString = (isDemoTriggered: boolean) => {
    // If interactive trigger is hover and user is not hovered, return native baseline values
    if (interactiveTrigger === 'hover' && !isDemoTriggered) {
      return {
        transform: 'perspective(none) translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1) skew(0deg, 0deg)',
        transformOrigin: '50% 50%',
        transition: `transform ${duration}s ${timingFunction}`
      };
    }

    const persValue = perspective > 0 ? `perspective(${perspective}px)` : '';
    const transValue = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px)`;
    const rotValue = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    const scaleValue = `scale3d(${scaleX}, ${scaleY}, ${scaleZ})`;
    const skewValue = `skew(${skewX}deg, ${skewY}deg)`;

    return {
      transform: `${persValue} ${transValue} ${rotValue} ${scaleValue} ${skewValue}`.trim().replace(/\s+/g, ' '),
      transformOrigin: `${originX}% ${originY}%`,
      transition: `transform ${duration}s ${timingFunction}`
    };
  };

  const currentStyles = getTransformString(isHovered);

  // Dynamic code compiler string
  const getCssCodeString = () => {
    let selector = interactiveTrigger === 'hover' ? '.transform-element:hover' : '.transform-element';
    let baseSelector = interactiveTrigger === 'hover' 
      ? `.transform-element {
  transition: transform ${duration}s ${timingFunction};
  transform-origin: ${originX}% ${originY}%;
}`
      : `.transform-element {
  transform-origin: ${originX}% ${originY}%;
}`;

    let transStr = `transform: ${currentStyles.transform};`;
    
    return `${baseSelector}

${selector} {
  ${transStr}
}`;
  };

  const getTailwindCodeString = () => {
    const isPerspectiveDef = perspective > 0;
    const hoverPrefix = interactiveTrigger === 'hover' ? 'hover:' : '';
    
    return `<div className="transition-all duration-[${Math.round(duration * 1000)}ms] ease-[${timingFunction.replace(/\s+/g, '')}] origin-[${originX}%_${originY}%] ${hoverPrefix}[transform:${isPerspectiveDef ? `perspective(${perspective}px)_` : ''}translate3d(${translateX}px,${translateY}px,${translateZ}px)_rotateX(${rotateX}deg)_rotateY(${rotateY}deg)_rotateZ(${rotateZ}deg)_scale3d(${scaleX},${scaleY},${scaleZ})_skew(${skewX}deg,${skewY}deg)]">
  {/* Elevated Component Layer */}
</div>`;
  };

  const getReactCodeString = () => {
    return `import React, { useState } from 'react';

export default function TransformWidget() {
  const [isHovered, setIsHovered] = useState(false);

  const activeStyle = {
    transform: "${interactiveTrigger === 'hover' ? getTransformString(true).transform : currentStyles.transform}",
    transformOrigin: "${originX}% ${originY}%",
    transition: "transform ${duration}s ${timingFunction}",
    transformStyle: "preserve-3d"
  };

  const baseStyle = {
    transform: "perspective(none) translate3d(0px,0px,0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1,1,1) skew(0deg,0deg)",
    transformOrigin: "${originX}% ${originY}%",
    transition: "transform ${duration}s ${timingFunction}",
    transformStyle: "preserve-3d"
  };

  return (
    <div 
      style={isHovered ? activeStyle : (${interactiveTrigger === 'hover' ? 'baseStyle' : 'activeStyle'})}
      ${interactiveTrigger === 'hover' ? `onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}` : ''}
      className="p-6 rounded-2xl bg-gradient-to-tr from-slate-905 to-slate-950 text-white"
    >
      <h3 className="font-extrabold uppercase tracking-wider">3D Transformed Card</h3>
      <p className="text-xs text-slate-400 mt-1">Accelerated hardware vector layers.</p>
    </div>
  );
}`;
  };

  const handleCopyToClipboard = (text: string, tabName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(tabName);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const resetAllParameters = () => {
    setTranslateX(0);
    setTranslateY(-10);
    setTranslateZ(30);
    setRotateX(30);
    setRotateY(-30);
    setRotateZ(10);
    setScaleX(1.05);
    setScaleY(1.05);
    setScaleZ(1.05);
    setSkewX(0);
    setSkewY(0);
    setPerspective(800);
    setOriginX(50);
    setOriginY(50);
    setDuration(0.6);
    setTimingFunction('cubic-bezier(0.25, 1, 0.5, 1)');
    setInteractiveTrigger('immediate');
    setIsOrbiting(false);
    setActivePresetIndex(0);
  };

  return (
    <div className="animate-fade-in relative">
      
      {/* 2. Interactive Presets Deck */}
      <div className="mb-8 bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-4.5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Palette className="h-5 w-5 text-pink-500" />
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-200 font-display">
              Ready-made Transform Presets
            </h3>
            <p className="text-[10px] text-slate-450 dark:text-slate-500 leading-relaxed">
              Inject custom spatial state angles instantly for bento boxes and headers
            </p>
          </div>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          <div className="flex flex-wrap gap-2">
            {TRANSFORM_PRESETS.map((preset, idx) => (
              <button
                key={preset.name}
                onClick={() => loadPreset(idx)}
                className={`px-3.5 py-1.5 rounded-xl border-2 text-[10.5px] font-black uppercase tracking-wider font-display transition-all cursor-pointer ${
                  activePresetIndex === idx
                    ? 'border-pink-500 bg-pink-50/10 dark:bg-pink-950/20 text-pink-650 dark:text-pink-400'
                    : 'border-slate-200 hover:border-slate-300 dark:border-slate-850 dark:hover:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{preset.name}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={resetAllParameters}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-rose-200 hover:border-rose-300 dark:border-rose-950/40 bg-rose-50/50 hover:bg-rose-100/50 dark:bg-rose-950/20 text-rose-650 dark:text-rose-400 text-[10.5px] font-black uppercase tracking-wider font-display transition-all cursor-pointer shrink-0"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Matrix
          </button>
        </div>
      </div>

      {/* 3. Global Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls Dashboard */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm space-y-6">
            
            {/* Control category A: Translation */}
            <div>
              <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-850">
                <Move className="h-4.5 w-4.5 text-pink-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-850 dark:text-slate-200 font-display">
                  1. Translation vectors (offsets)
                </h3>
              </div>

              <div className="space-y-4 mt-3">
                {/* Translate X */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Translate Axis X</span>
                    <span className="font-mono text-pink-600 font-bold">{translateX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-120"
                    max="120"
                    value={translateX}
                    onChange={(e) => setTranslateX(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Translate Y */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Translate Axis Y</span>
                    <span className="font-mono text-pink-600 font-bold">{translateY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-120"
                    max="120"
                    value={translateY}
                    onChange={(e) => setTranslateY(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Translate Z */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Translate Axis Z (Depth)</span>
                    <span className="font-mono text-pink-600 font-bold">{translateZ}px</span>
                  </div>
                  <input
                    type="range"
                    min="-150"
                    max="150"
                    value={translateZ}
                    onChange={(e) => setTranslateZ(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Control category B: Axial Tilt (Rotation) */}
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-1.5">
                  <RotateCw className="h-4.5 w-4.5 text-pink-500" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-850 dark:text-slate-200 font-display">
                    2. Rotational Pitch (Axes)
                  </h3>
                </div>

                <button
                  onClick={() => setIsOrbiting(!isOrbiting)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold rounded-lg border uppercase transition-all ${
                    isOrbiting
                      ? 'bg-pink-600 text-white border-transparent'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-500 border-slate-150 dark:border-slate-800'
                  }`}
                >
                  {isOrbiting ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  <span>Auto orbit</span>
                </button>
              </div>

              <div className="space-y-4 mt-3">
                {/* Rotate X */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Rotate X (Horizontal Pitch)</span>
                    <span className="font-mono text-pink-600 font-bold">{rotateX}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotateX}
                    onChange={(e) => setRotateX(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Rotate Y */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Rotate Y (Vertical Yaw)</span>
                    <span className="font-mono text-pink-600 font-bold">{rotateY}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotateY}
                    onChange={(e) => setRotateY(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Rotate Z */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Rotate Z (Splay / Roll)</span>
                    <span className="font-mono text-pink-600 font-bold">{rotateZ}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotateZ}
                    onChange={(e) => setRotateZ(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Control category C: Scales and Skew */}
            <div>
              <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-850">
                <SlidersHorizontal className="h-4.5 w-4.5 text-pink-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-850 dark:text-slate-200 font-display">
                  3. Scales & Skews Distortion
                </h3>
              </div>

              <div className="space-y-4 mt-3">
                {/* Scale Overall Option */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-450 block mb-1">Scale X</span>
                    <input
                      type="number"
                      step="0.05"
                      min="0.2"
                      max="3"
                      value={scaleX}
                      onChange={(e) => setScaleX(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-450 block mb-1">Scale Y</span>
                    <input
                      type="number"
                      step="0.05"
                      min="0.2"
                      max="3"
                      value={scaleY}
                      onChange={(e) => setScaleY(Number(e.target.value))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>

                {/* Skew X */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Skew Distort X</span>
                    <span className="font-mono text-pink-600 font-bold">{skewX}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={skewX}
                    onChange={(e) => setSkewX(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Skew Y */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Skew Distort Y</span>
                    <span className="font-mono text-pink-600 font-bold">{skewY}°</span>
                  </div>
                  <input
                    type="range"
                    min="-45"
                    max="45"
                    value={skewY}
                    onChange={(e) => setSkewY(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Control category D: Perspective & Origins */}
            <div>
              <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 dark:border-slate-850">
                <Layers className="h-4.5 w-4.5 text-pink-500" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-850 dark:text-slate-200 font-display">
                  4. Perspective Projection & Origins
                </h3>
              </div>

              <div className="space-y-4 mt-3">
                {/* 3D Perspective */}
                <div>
                  <div className="flex justify-between text-[10.5px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                    <span>Perspective Radius (0 = off)</span>
                    <span className="font-mono text-pink-600 font-bold">{perspective === 0 ? 'Disabled' : `${perspective}px`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={perspective}
                    onChange={(e) => setPerspective(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>

                {/* Transform Center Coordinates */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-450 block mb-0.5">Origin X %</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={originX}
                      onChange={(e) => setOriginX(Number(e.target.value))}
                      className="w-full h-1 bg-slate-150 rounded"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-450 block mb-0.5">Origin Y %</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={originY}
                      onChange={(e) => setOriginY(Number(e.target.value))}
                      className="w-full h-1 bg-slate-150 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Control category E: Timing and Triggers */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-850 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-450 block border-b border-slate-200/50 dark:border-slate-800 pb-1.5 font-display">
                5. Transition Timings & Triggers
              </span>

              {/* Transition Speed duration */}
              <div>
                <div className="flex justify-between text-[10px] font-extrabold uppercase text-slate-500 mb-1 font-display">
                  <span>Transition Duration</span>
                  <span className="font-mono text-pink-600 font-bold">{duration}s</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.05"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
              </div>

              {/* Micro-Interaction Trigger mode */}
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 font-display">
                <span>Playground State Trigger</span>
                <div className="flex rounded-lg bg-white dark:bg-slate-950 border border-slate-250 p-0.5">
                  {[
                    { val: 'immediate' as const, label: 'Constant (Set)' },
                    { val: 'hover' as const, label: 'On Hover' }
                  ].map((x) => (
                    <button
                      key={x.val}
                      onClick={() => setInteractiveTrigger(x.val)}
                      className={`px-2 py-1 text-[9px] font-bold rounded transition-all cursor-pointer ${
                        interactiveTrigger === x.val
                          ? 'bg-pink-600 text-white'
                          : 'text-slate-500 hover:text-slate-750'
                      }`}
                    >
                      {x.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timing function select dropdown */}
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-500 block mb-1">
                  Timing Cubic-Bezier Function
                </span>
                <select
                  value={timingFunction}
                  onChange={(e) => setTimingFunction(e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2 py-1 text-[11px] font-mono font-bold text-slate-650 dark:text-slate-350 outline-none"
                >
                  <option value="ease">Ease (Default)</option>
                  <option value="linear">Linear</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In Out</option>
                  <option value="cubic-bezier(0.25, 1, 0.5, 1)">Ease Out Quart (Cubic-Bezier)</option>
                  <option value="cubic-bezier(0.34, 1.56, 0.64, 1)">Elastic Out Spring (Cubic-Bezier)</option>
                  <option value="cubic-bezier(0.16, 1, 0.3, 1)">Ultra-Fast Expo Out (Cubic-Bezier)</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW STAGE & CODE EXPORTERS */}
        <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
          
          {/* Real-time Interactive Previews Stage */}
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-5 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-1.5 bg-pink-500/10 text-pink-650 dark:text-pink-400 px-3 py-1 rounded-xl border border-pink-500/20">
                <Eye className="h-4 w-4 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider font-display">
                  Stage Projection Playground
                </span>
              </div>

              {/* Sample Target Switchers */}
              <div className="flex gap-1 bg-slate-50 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200/50 dark:border-slate-850">
                {[
                  { style: 'credit-card' as const, label: 'Credit Card' },
                  { style: 'glassmorphic-slab' as const, label: 'Liquid Slab' },
                  { style: 'browser-wireframe' as const, label: 'Wireframe' },
                  { style: 'cube-3d' as const, label: '3D Cube' }
                ].map((x) => (
                  <button
                    key={x.style}
                    onClick={() => setSampleWidget(x.style)}
                    className={`text-[9.5px] whitespace-nowrap font-extrabold uppercase py-1 px-2 border border-transparent rounded-lg transition-all cursor-pointer font-display ${
                      sampleWidget === x.style
                        ? 'bg-pink-600 text-white'
                        : 'text-slate-500 hover:text-slate-750'
                    }`}
                  >
                    {x.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN STAGE BOX CONTAINER */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900/95 flex justify-center items-center p-8 min-h-[460px] preserve-3d">
              
              {/* Optional Star/Grid vector background overlay to guide the eyes on perspective */}
              <div className="absolute inset-0 opacity-15" 
                style={{
                  backgroundImage: 'radial-gradient(circle at top right, #f43f5e 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                  backgroundSize: '150px 150px, 40px 40px, 40px 40px',
                  perspective: '800px'
                }}
              />

              {/* THE TRANSFORM TARGET COMPONENT VIEWPORT ZONE */}
              <div 
                className="w-full max-w-sm flex justify-center items-center cursor-pointer select-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1200px'
                }}
              >
                
                {/* 1. CREDIT CARD PREVIEW COMPONENT */}
                {sampleWidget === 'credit-card' && (
                  <div 
                    style={currentStyles}
                    className="w-80 h-48 rounded-2xl p-6 bg-gradient-to-tr from-rose-600 via-pink-700 to-indigo-700 border border-white/20 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between"
                  >
                    {/* Glowing mesh decorative accent inside card */}
                    <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 blur-2xl rounded-full" />
                    <div className="absolute -bottom-10 -left-6 w-24 h-24 bg-pink-500/20 blur-xl rounded-full animate-pulse" />

                    <div className="flex justify-between items-start z-10" style={{ transform: 'translateZ(10px)' }}>
                      <div>
                        <span className="text-[8.5px] font-black tracking-widest uppercase opacity-75">Visual Developer Node</span>
                        <div className="h-5 w-7 bg-amber-400 opacity-90 rounded-md border border-white/10 mt-1 shadow-sm" />
                      </div>
                      <span className="text-sm font-black italic tracking-tighter text-white font-display">PREMIUM CHIP</span>
                    </div>

                    <div className="space-y-1 z-10" style={{ transform: 'translateZ(20px)' }}>
                      <span className="text-lg font-mono font-bold tracking-widest text-slate-100 block">
                        4512 • 8956 • 2480 • 1102
                      </span>
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[7.5px] uppercase opacity-60 block">Cardholder</span>
                          <span className="text-[10px] font-black uppercase tracking-wider font-display">CSS Vector Matrix</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[7.5px] opacity-60 block">Expires</span>
                          <span className="text-[10px] font-black font-mono">08 / 29</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. GLASSMORPHIC SLAB WITH INTERNAL FLOATING GLOW */}
                {sampleWidget === 'glassmorphic-slab' && (
                  <div 
                    style={currentStyles}
                    className="w-80 h-52 rounded-3xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-2xl flex flex-col justify-between relative"
                  >
                    {/* Deep internal spheres to make 3D layers shine */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-pink-500 rounded-full blur-xs opacity-50 block" style={{ transform: 'translateZ(-15px)' }} />
                    <div className="absolute bottom-4 right-10 w-8 h-8 bg-indigo-500 rounded-full blur-xs opacity-60 block" style={{ transform: 'translateZ(-25px)' }} />

                    <div className="relative z-10 flex items-center justify-between" style={{ transform: 'translateZ(15px)' }}>
                      <span className="text-[8.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-white/10 border border-white/10 text-pink-300">
                        Liquid Physics
                      </span>
                      <BadgeInfo className="h-4.5 w-4.5 text-white/50" />
                    </div>

                    <div className="relative z-10 space-y-2" style={{ transform: 'translateZ(30px)' }}>
                      <span className="text-xs text-indigo-200 block font-bold font-mono">NODE_ACCELERATOR: OK</span>
                      <h3 className="text-xl font-black uppercase font-display leading-tight">
                        GLASSMORPHISM ACCENT
                      </h3>
                      <p className="text-[10.5px] text-slate-350 leading-relaxed">
                        Watch how Translate-Z pushes the interactive glass boundaries outward relative to background shadow depths.
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. WIREFRAME CODE EDITOR BROWSER FRAME */}
                {sampleWidget === 'browser-wireframe' && (
                  <div 
                    style={currentStyles}
                    className="w-84 h-52 rounded-2xl border border-slate-700 bg-slate-950 text-slate-300 shadow-2xl font-mono text-[9px] flex flex-col overflow-hidden"
                  >
                    {/* Browser layout header rail */}
                    <div className="flex justify-between items-center bg-slate-900 border-b border-slate-800 px-3 py-2 text-[8px] select-none text-slate-400">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 block" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500 block" />
                        <span className="w-2 h-2 rounded-full bg-green-500 block" />
                      </div>
                      <span className="text-[7px]">localhost:3000/transform.css</span>
                      <ArrowUpRight className="h-2.5 w-2.5" />
                    </div>

                    {/* Fake code block lines inside */}
                    <div className="p-4 space-y-1.5 text-left leading-normal flex-1 font-bold">
                      <p className="text-pink-400">.transform-stage &#123;</p>
                      <p className="pl-3 text-slate-400"><span className="text-sky-400">perspective</span>: {perspective}px;</p>
                      <p className="pl-3 text-slate-400"><span className="text-sky-400">transform</span>:</p>
                      <p className="pl-6 text-slate-300">
                        translate3d(<span className="text-amber-500">{translateX}px</span>, <span className="text-amber-500">{translateY}px</span>, <span className="text-amber-500">{translateZ}px</span>)
                      </p>
                      <p className="pl-6 text-slate-300">
                        rotateX(<span className="text-amber-500">{rotateX}deg</span>) rotateY(<span className="text-amber-500">{rotateY}deg</span>) rotateZ(<span className="text-amber-500">{rotateZ}deg</span>)
                      </p>
                      <p className="pl-6 text-slate-300">
                        scale3d(<span className="text-amber-500">{scaleX}</span>, <span className="text-amber-500">{scaleY}</span>, <span className="text-amber-500">{scaleZ}</span>);
                      </p>
                      <p className="text-pink-400">&#125;</p>
                    </div>
                  </div>
                )}

                {/* 4. ACTUAL 3D ROTATABLE ACCELERATED GEOMETRIC CUBE */}
                {sampleWidget === 'cube-3d' && (
                  <div 
                    style={{
                      transform: currentStyles.transform,
                      transformOrigin: currentStyles.transformOrigin,
                      transition: currentStyles.transition,
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      width: '120px',
                      height: '120px',
                    }}
                    className="relative"
                  >
                    {/* Front Face */}
                    <div className="absolute w-30 h-30 bg-gradient-to-tr from-pink-500/80 to-purple-600/80 border border-white/30 text-white flex items-center justify-center font-black text-xs uppercase"
                      style={{ transform: 'translateZ(60px)' }}
                    >
                      Front
                    </div>

                    {/* Back Face */}
                    <div className="absolute w-30 h-30 bg-slate-900/90 border border-pink-500/30 text-pink-400 flex items-center justify-center font-black text-xs uppercase"
                      style={{ transform: 'rotateY(180deg) translateZ(60px)' }}
                    >
                      Back
                    </div>

                    {/* Right Face */}
                    <div className="absolute w-30 h-30 bg-gradient-to-br from-indigo-550/80 to-pink-550/80 border border-white/20 text-indigo-100 flex items-center justify-center font-black text-xs uppercase"
                      style={{ transform: 'rotateY(90deg) translateZ(60px)' }}
                    >
                      Right
                    </div>

                    {/* Left Face */}
                    <div className="absolute w-30 h-30 bg-indigo-950/90 border border-purple-500/30 text-indigo-300 flex items-center justify-center font-black text-xs uppercase"
                      style={{ transform: 'rotateY(-90deg) translateZ(60px)' }}
                    >
                      Left
                    </div>

                    {/* Top Face */}
                    <div className="absolute w-30 h-30 bg-pink-700/80 border border-white/30 text-white flex items-center justify-center font-black text-xs uppercase"
                      style={{ transform: 'rotateX(90deg) translateZ(60px)' }}
                    >
                      Top
                    </div>

                    {/* Bottom Face */}
                    <div className="absolute w-30 h-30 bg-slate-800/90 border border-pink-500/20 text-slate-400 flex items-center justify-center font-black text-xs uppercase"
                      style={{ transform: 'rotateX(-90deg) translateZ(60px)' }}
                    >
                      Bottom
                    </div>
                  </div>
                )}

              </div>

              {/* Hover simulation overlay notice */}
              {interactiveTrigger === 'hover' && (
                <div className="absolute bottom-4 left-4 right-4 text-center text-slate-400 select-none text-[10px] bg-slate-950/70 p-2 border border-slate-800 rounded-xl">
                  {isHovered ? '✓ Active Transformation triggered!' : '💡 Hover over the element above to trigger the CSS transform transition'}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* CODE COMPILER EXPORT COMPONENT - 12 Column full-width section below grid, above Explore Other Generators */}
      <div className="mt-8 bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
        
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-850 pb-3">
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-pink-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              Export Transform Styles
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
                ? getCssCodeString() 
                : activeCodeTab === 'tailwind' 
                ? getTailwindCodeString() 
                : getReactCodeString();
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
                <Copy className="h-4.5 w-4.5 text-pink-400" />
                <span className="text-[10px] font-black uppercase font-display text-slate-300">Copy Code</span>
              </>
            )}
          </button>

          {/* Print Code segment */}
          <pre className="text-xs font-mono font-bold text-slate-350 text-left whitespace-pre select-all pt-4 leading-normal">
            {activeCodeTab === 'css' && getCssCodeString()}
            {activeCodeTab === 'tailwind' && getTailwindCodeString()}
            {activeCodeTab === 'react' && getReactCodeString()}
          </pre>

        </div>

        {/* Informational helpful tips */}
        <div className="mt-4 p-4 rounded-2xl bg-pink-50/50 dark:bg-slate-900/40 border border-pink-100/50 dark:border-slate-850 text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed flex gap-3">
          <BadgeInfo className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-slate-850 dark:text-slate-300 mb-0.5">3D Hardware Compositing GPU tip</p>
            <p>
              Applying translation offsets along the Z-axis is optimized via the device GPU, preventing page layouts from lagging or reflow cycles. Add <code>transform-style: preserve-3d</code> to your parent containers so that children elements pop out dimensionally within virtual focal spaces.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
