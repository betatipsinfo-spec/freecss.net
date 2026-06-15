import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Plus, Trash2, Copy, Check, Layers, Eye, EyeOff, 
  RefreshCw, Sliders, ChevronDown, ChevronUp, Palette, 
  Code, Wand2, Laptop, Smartphone, Box, Move, Layers3, Flame
} from 'lucide-react';

interface ShadowLayer {
  id: string;
  name: string;
  active: boolean;
  inset: boolean;
  offsetX: number; // px
  offsetY: number; // px
  blur: number; // px
  spread: number; // px
  color: string; // hex
  opacity: number; // 0 to 1
}

interface ShadowPreset {
  name: string;
  description: string;
  layers: ShadowLayer[];
  boxColor: string;
  boxRadius: number;
  containerBg: string;
  boxBorder: boolean;
}

const PRESETS: Record<string, ShadowPreset> = {
  modernAmbient: {
    name: 'Modern Ambient Velvet',
    description: 'Ultra-soft volumetric stacked indigo shadow for premium cards.',
    boxColor: '#ffffff',
    boxRadius: 24,
    containerBg: '#f8fafc',
    boxBorder: true,
    layers: [
      { id: 'l1', name: 'Ambient Drop', active: true, inset: false, offsetX: 0, offsetY: 25, blur: 50, spread: -12, color: '#4f46e5', opacity: 0.25 },
      { id: 'l2', name: 'Tactile Base', active: true, inset: false, offsetX: 0, offsetY: 10, blur: 20, spread: -5, color: '#1e293b', opacity: 0.15 },
      { id: 'l3', name: 'Micro Shadow', active: true, inset: false, offsetX: 0, offsetY: 1, blur: 3, spread: 0, color: '#000000', opacity: 0.12 }
    ]
  },
  cyberpunkGlow: {
    name: 'Cyberpunk HyperGlow',
    description: 'Intense dual-polarized neon pink and cyan emission overlay.',
    boxColor: '#0f172a',
    boxRadius: 16,
    containerBg: '#020617',
    boxBorder: false,
    layers: [
      { id: 'cg1', name: 'Cyan Aura', active: true, inset: false, offsetX: -6, offsetY: 0, blur: 25, spread: 2, color: '#06b6d4', opacity: 0.7 },
      { id: 'cg2', name: 'Hot Pink Aura', active: true, inset: false, offsetX: 6, offsetY: 0, blur: 25, spread: 2, color: '#ec4899', opacity: 0.7 },
      { id: 'cg3', name: 'Core Shadow', active: true, inset: false, offsetX: 0, offsetY: 4, blur: 12, spread: -2, color: '#000000', opacity: 0.5 }
    ]
  },
  brutalistComic: {
    name: 'Brutalist Retro Block',
    description: 'Thick hard-edge 90s z-index comic print offset styled block.',
    boxColor: '#fde047',
    boxRadius: 0,
    containerBg: '#ffffff',
    boxBorder: true,
    layers: [
      { id: 'b1', name: 'Solid Core', active: true, inset: false, offsetX: 10, offsetY: 10, blur: 0, spread: 0, color: '#000000', opacity: 1 }
    ]
  },
  neumorphicInset: {
    name: 'Neumorphic Deep Carve',
    description: 'Intricate inner-carved plastic recess shadow matching physical relief.',
    boxColor: '#f1f5f9',
    boxRadius: 24,
    containerBg: '#f1f5f9',
    boxBorder: false,
    layers: [
      { id: 'n1', name: 'Dark Emboss', active: true, inset: true, offsetX: 4, offsetY: 4, blur: 8, spread: 0, color: '#94a3b8', opacity: 0.4 },
      { id: 'n2', name: 'White Specular Glow', active: true, inset: true, offsetX: -4, offsetY: -4, blur: 8, spread: 0, color: '#ffffff', opacity: 0.9 }
    ]
  },
  tailwindXl: {
    name: 'Tailwind Standard XL',
    description: 'The iconic utility framework stacked medium-heavy dropdown shadow.',
    boxColor: '#ffffff',
    boxRadius: 12,
    containerBg: '#f8fafc',
    boxBorder: true,
    layers: [
      { id: 'tw1', name: 'Decay Spread', active: true, inset: false, offsetX: 0, offsetY: 20, blur: 25, spread: -5, color: '#000000', opacity: 0.1 },
      { id: 'tw2', name: 'Sharp Definition', active: true, inset: false, offsetX: 0, offsetY: 8, blur: 10, spread: -6, color: '#000000', opacity: 0.1 }
    ]
  },
  neonVolcanic: {
    name: 'Volcanic Core Burn',
    description: 'Intense warm orange inner and outer volcanic sulfur flare.',
    boxColor: '#180c05',
    boxRadius: 32,
    containerBg: '#0c0400',
    boxBorder: false,
    layers: [
      { id: 'v1', name: 'Molten Core Outset', active: true, inset: false, offsetX: 0, offsetY: 15, blur: 35, spread: 2, color: '#f97316', opacity: 0.45 },
      { id: 'v2', name: 'Inner Sulfur Glow', active: true, inset: true, offsetX: 0, offsetY: 0, blur: 20, spread: 2, color: '#eab308', opacity: 0.6 },
      { id: 'v3', name: 'Deep Smoke', active: true, inset: false, offsetX: 0, offsetY: 30, blur: 70, spread: -5, color: '#ef4444', opacity: 0.3 }
    ]
  }
};

export default function BoxShadowGenerator() {
  const [layers, setLayers] = useState<ShadowLayer[]>([
    { id: '1', name: 'Soft Base', active: true, inset: false, offsetX: 0, offsetY: 15, blur: 30, spread: -8, color: '#4f46e5', opacity: 0.25 },
    { id: '2', name: 'Sharp Core', active: true, inset: false, offsetX: 0, offsetY: 4, blur: 10, spread: -3, color: '#111827', opacity: 0.15 }
  ]);
  const [activeLayerId, setActiveLayerId] = useState<string>('1');
  
  // Custom box styling
  const [boxColor, setBoxColor] = useState<string>('#ffffff');
  const [boxRadius, setBoxRadius] = useState<number>(24);
  const [containerBg, setContainerBg] = useState<string>('#f8fafc');
  const [boxBorder, setBoxBorder] = useState<boolean>(true);
  const [boxContentText, setBoxContentText] = useState<string>('Shadow Lab');
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // Copy success feedback states
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedReact, setCopiedReact] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'react'>('css');

  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [isDraggingJoystick, setIsDraggingJoystick] = useState<boolean>(false);

  // Find active layer
  const activeLayer = layers.find(l => l.id === activeLayerId) || layers[0] || null;

  // Sync color when matching preset loaded
  const applyPreset = (presetKey: string) => {
    const p = PRESETS[presetKey];
    if (p) {
      // Create duplicate layers list with fresh keys to prevent reference bugs
      const freshLayers = p.layers.map((l, idx) => ({
        ...l,
        id: `${presetKey}_${idx}_${Date.now()}`
      }));
      setLayers(freshLayers);
      setBoxColor(p.boxColor);
      setBoxRadius(p.boxRadius);
      setContainerBg(p.containerBg);
      setBoxBorder(p.boxBorder);
      if (freshLayers.length > 0) {
        setActiveLayerId(freshLayers[0].id);
      }
    }
  };

  const handleUpdateLayer = (id: string, updates: Partial<ShadowLayer>) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const handleCreateLayer = () => {
    const newId = `layer_${Date.now()}`;
    const newLayer: ShadowLayer = {
      id: newId,
      name: `Layer ${layers.length + 1}`,
      active: true,
      inset: false,
      offsetX: 0,
      offsetY: 10,
      blur: 20,
      spread: 0,
      color: '#4f46e5',
      opacity: 0.2
    };
    setLayers(prev => [...prev, newLayer]);
    setActiveLayerId(newId);
  };

  const handleDeleteLayer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (layers.length <= 1) return; // keep at least one
    const remaining = layers.filter(l => l.id !== id);
    setLayers(remaining);
    if (activeLayerId === id) {
      setActiveLayerId(remaining[0].id);
    }
  };

  const handleDuplicateLayer = (layer: ShadowLayer, e: React.MouseEvent) => {
    e.stopPropagation();
    const newId = `layer_dup_${Date.now()}`;
    const newLayer: ShadowLayer = {
      ...layer,
      id: newId,
      name: `${layer.name} (Copy)`
    };
    const activeIdx = layers.findIndex(l => l.id === layer.id);
    const updated = [...layers];
    updated.splice(activeIdx + 1, 0, newLayer);
    setLayers(updated);
    setActiveLayerId(newId);
  };

  // Convert Hex color to RGBA string for CSS output
  const hexToRgbaCSS = (hex: string, alpha: number) => {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
  };

  // Build final CSS multi-shadow string
  const generateShadowStyle = () => {
    const activeLayers = layers.filter(l => l.active);
    if (activeLayers.length === 0) return 'none';
    
    return activeLayers.map(l => {
      const insetStr = l.inset ? 'inset ' : '';
      const rgbaColor = hexToRgbaCSS(l.color, l.opacity);
      return `${insetStr}${l.offsetX}px ${l.offsetY}px ${l.blur}px ${l.spread}px ${rgbaColor}`;
    }).join(',\n  ');
  };

  // Build Tailwind custom value arbitrary expression
  const generateTailwindValue = () => {
    const activeLayers = layers.filter(l => l.active);
    if (activeLayers.length === 0) return 'shadow-none';

    const cleanParts = activeLayers.map(l => {
      const insetStr = l.inset ? 'inset_' : '';
      // Tailwind uses space replacement and escapes
      const rgbaColor = hexToRgbaCSS(l.color, l.opacity).replace(/\s+/g, '');
      return `${insetStr}${l.offsetX}px_${l.offsetY}px_${l.blur}px_${l.spread}px_${rgbaColor}`;
    }).join(',');

    return `shadow-[${cleanParts}]`;
  };

  // Build React Multi-Shadow Inline Style String
  const generateReactValue = () => {
    const shadowVal = generateShadowStyle().replace(/\n/g, '\n    ');
    return `const ShadowCard = () => {\n  return (\n    <div\n      style={{\n        boxShadow: "${shadowVal}"\n      }}\n    />\n  );\n};`;
  };

  // Handle Joystick drag implementation
  const handleJoystickMove = (clientX: number, clientY: number) => {
    if (!dragAreaRef.current || !activeLayer) return;
    const rect = dragAreaRef.current.getBoundingClientRect();
    
    // Convert to relative coordinates inside our grid (-50px to 50px)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Scale down factor so it is sensitive
    const maxOffset = 50; // virtual PX scale
    const rawX = clientX - centerX;
    const rawY = clientY - centerY;
    
    // Map bounds to a limit
    const pctX = Math.max(-1, Math.min(1, rawX / (rect.width / 2)));
    const pctY = Math.max(-1, Math.min(1, rawY / (rect.height / 2)));
    
    const calculatedX = Math.round(pctX * maxOffset);
    const calculatedY = Math.round(pctY * maxOffset);

    handleUpdateLayer(activeLayer.id, {
      offsetX: calculatedX,
      offsetY: calculatedY
    });
  };

  const handleJoystickMouseDown = (e: React.MouseEvent) => {
    setIsDraggingJoystick(true);
    handleJoystickMove(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingJoystick) {
        handleJoystickMove(e.clientX, e.clientY);
      }
    };
    const handleMouseUp = () => {
      setIsDraggingJoystick(false);
    };

    if (isDraggingJoystick) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingJoystick, activeLayer]);

  // Touch handlers for mobile
  const handleJoystickTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleJoystickMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const copyToClipboard = (text: string, type: 'css' | 'tailwind' | 'react') => {
    navigator.clipboard.writeText(text);
    if (type === 'css') {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } else if (type === 'tailwind') {
      setCopiedTailwind(true);
      setTimeout(() => setCopiedTailwind(false), 2000);
    } else {
      setCopiedReact(true);
      setTimeout(() => setCopiedReact(false), 2000);
    }
  };

  const handleReset = () => {
    setLayers([
      { id: '1', name: 'Soft Base', active: true, inset: false, offsetX: 0, offsetY: 15, blur: 30, spread: -8, color: '#4f46e5', opacity: 0.25 },
      { id: '2', name: 'Sharp Core', active: true, inset: false, offsetX: 0, offsetY: 4, blur: 10, spread: -3, color: '#111827', opacity: 0.15 }
    ]);
    setActiveLayerId('1');
    setBoxColor('#ffffff');
    setBoxRadius(24);
    setContainerBg('#f8fafc');
    setBoxBorder(true);
    setBoxContentText('Shadow Lab');
  };

  return (
    <div className="space-y-10 animate-fade-in py-2">
      
      {/* Grid Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Presets (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Preset Cards Selectors */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3 font-display">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-violet-500" /> Loaded Quick-Presets
              </h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg font-black uppercase tracking-wider transition-all duration-150 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" /> Reset Lab
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(PRESETS).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className="flex flex-col text-left p-3 rounded-xl border-2 border-slate-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 hover:border-indigo-500 hover:bg-indigo-50/5 dark:hover:bg-indigo-950/10 cursor-pointer group transition-all"
                >
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-800 dark:text-slate-250 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-display">
                    {item.name}
                  </p>
                  <span className="text-[9px] text-slate-450 dark:text-slate-450 leading-relaxed mt-1 line-clamp-2">
                    {item.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Layers Stack Container */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800/80 pb-3 mb-4 font-display">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Layers className="h-4 w-4 text-pink-500" /> Active Shadow Layers
              </h3>
              <button
                onClick={handleCreateLayer}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add Layer
              </button>
            </div>

            {/* List of layers */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {layers.map((layer, index) => {
                  const isActive = layer.id === activeLayerId;
                  const rgbaPreview = hexToRgbaCSS(layer.color, layer.opacity);
                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setActiveLayerId(layer.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        isActive
                          ? 'border-indigo-500 dark:border-indigo-650 bg-indigo-50/15'
                          : 'border-slate-155 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:border-slate-350 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Status Dot / Active Switch */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpdateLayer(layer.id, { active: !layer.active });
                          }}
                          className={`p-1.5 rounded-lg border transition-all ${
                            layer.active 
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' 
                              : 'bg-slate-100 text-slate-400 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                          }`}
                          title={layer.active ? "Mute entire layer" : "Activate layer"}
                        >
                          {layer.active ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                        </button>

                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={layer.name}
                              onChange={(e) => handleUpdateLayer(layer.id, { name: e.target.value })}
                              onClick={(e) => e.stopPropagation()}
                              className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-100 bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-indigo-500 focus:ring-0 p-0 outline-none w-28 uppercase font-display"
                            />
                            {layer.inset && (
                              <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-500/15 text-amber-500 font-bold border border-amber-500/25 uppercase tracking-widest leading-none">
                                Inset
                              </span>
                            )}
                          </div>
                          <p className="text-[9px] font-mono text-slate-405/80 dark:text-slate-500 mt-0.5 block">
                            X: {layer.offsetX}px, Y: {layer.offsetY}px, B: {layer.blur}px, S: {layer.spread}px
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Bubble swatch display */}
                        <div className="flex items-center gap-1">
                          <span 
                            className="inline-block h-4.5 w-4.5 rounded-full border border-slate-300 dark:border-slate-700 shadow-xs" 
                            style={{ backgroundColor: layer.color }}
                          />
                          <span className="text-[9px] font-mono text-slate-450 uppercase">{layer.color}</span>
                        </div>

                        {/* Duplicate Button */}
                        <button
                          onClick={(e) => handleDuplicateLayer(layer, e)}
                          className="p-1 text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                          title="Duplicate Layer"
                        >
                          <Layers3 className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={(e) => handleDeleteLayer(layer.id, e)}
                          disabled={layers.length <= 1}
                          className={`p-1 rounded-lg transition-colors ${
                            layers.length <= 1
                              ? 'text-slate-300 dark:text-slate-800 cursor-not-allowed'
                              : 'text-slate-400 hover:text-red-500 hover:bg-red-500/10 cursor-pointer'
                          }`}
                          title="Delete Layer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Active Layer Parameter Knobs (Sliders) */}
          {activeLayer && (
            <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs relative">
              <div className="absolute top-2.5 right-4 pointer-events-none select-none">
                <span className="text-[10px] font-bold text-slate-350 dark:text-slate-650 uppercase font-mono tracking-widest">
                  editing: {activeLayer.name}
                </span>
              </div>

              <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-200 mb-5 pb-2 border-b border-slate-150 dark:border-slate-800/80 flex items-center gap-2 font-display">
                <Sliders className="h-4.5 w-4.5 text-indigo-500" /> Layer Parameters
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 2D Joystick Grid */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-450 dark:text-slate-500 mb-2 self-start flex items-center gap-1 font-display">
                    <Move className="h-3.5 w-3.5 text-indigo-505" /> Joystick Vector Pad
                  </span>
                  
                  <div 
                    ref={dragAreaRef}
                    onMouseDown={handleJoystickMouseDown}
                    onTouchStart={(e) => handleJoystickTouchMove(e)}
                    onTouchMove={(e) => handleJoystickTouchMove(e)}
                    className="relative w-full h-44 border-2 border-dashed border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30 rounded-2xl cursor-crosshair select-none flex items-center justify-center overflow-hidden group"
                  >
                    {/* Horizon grid axes */}
                    <div className="absolute h-full w-px bg-slate-200 dark:bg-slate-800" />
                    <div className="absolute w-full h-px bg-slate-200 dark:bg-slate-800" />
                    
                    {/* Joystick Knob Node */}
                    <div 
                      className={`absolute w-6 h-6 rounded-full border-2 bg-gradient-to-br from-indigo-500 to-violet-600 border-white dark:border-slate-900 shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-shadow cursor-grab active:cursor-grabbing ${
                        isDraggingJoystick ? 'ring-4 ring-indigo-500/35 scale-105' : 'group-hover:scale-105'
                      }`}
                      style={{ 
                        left: `${50 + (activeLayer.offsetX / 50) * 50}%`, 
                        top: `${50 + (activeLayer.offsetY / 50) * 50}%` 
                      }}
                    />

                    {/* Coordinates Overlay */}
                    <div className="absolute bottom-2 right-2 bg-slate-900/80 dark:bg-slate-950/90 text-[9px] font-mono font-bold text-white px-1.5 py-0.5 rounded leading-none">
                      X: {activeLayer.offsetX}px, Y: {activeLayer.offsetY}px
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-2 block whitespace-normal text-center leading-normal">
                    Drag anywhere in the coordinate panel to shift the shadow vector direction dynamically.
                  </span>
                </div>

                {/* Standard Sliders list */}
                <div className="space-y-4">
                  {/* Offset X Slider */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                      <span>Horizontal Shift (X)</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{activeLayer.offsetX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-120"
                      max="120"
                      value={activeLayer.offsetX}
                      onChange={(e) => handleUpdateLayer(activeLayer.id, { offsetX: parseInt(e.target.value) })}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Offset Y Slider */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                      <span>Vertical Shift (Y)</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{activeLayer.offsetY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-120"
                      max="120"
                      value={activeLayer.offsetY}
                      onChange={(e) => handleUpdateLayer(activeLayer.id, { offsetY: parseInt(e.target.value) })}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Blur Slider */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                      <span>Blur Decay Radius</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{activeLayer.blur}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="120"
                      value={activeLayer.blur}
                      onChange={(e) => handleUpdateLayer(activeLayer.id, { blur: parseInt(e.target.value) })}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Spread Slider */}
                  <div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                      <span>Spread Extent</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{activeLayer.spread}px</span>
                    </div>
                    <input
                      type="range"
                      min="-60"
                      max="60"
                      value={activeLayer.spread}
                      onChange={(e) => handleUpdateLayer(activeLayer.id, { spread: parseInt(e.target.value) })}
                      className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>

              </div>

              {/* Extras Row in sliders (Color Picker, Opacity, Inset Checkbox) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-slate-150 dark:border-slate-800/80 pt-5 mt-5">
                
                {/* Opacity slider */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 font-mono">
                    <span>Opacity</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{Math.round(activeLayer.opacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={activeLayer.opacity * 100}
                    onChange={(e) => handleUpdateLayer(activeLayer.id, { opacity: parseFloat(e.target.value) / 100 })}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Color swatches input */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1.5 font-mono">
                    <span>Shadow Color</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={activeLayer.color}
                      onChange={(e) => handleUpdateLayer(activeLayer.id, { color: e.target.value })}
                      className="h-7 w-12 rounded border border-slate-200 dark:border-slate-800 p-0 overflow-hidden cursor-pointer bg-transparent"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={activeLayer.color}
                      onChange={(e) => handleUpdateLayer(activeLayer.id, { color: e.target.value })}
                      className="w-full text-xs font-mono font-bold bg-slate-50 dark:bg-slate-950 px-2 py-1 border border-slate-200 dark:border-slate-800 rounded-lg outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 dark:text-slate-200 uppercase"
                    />
                  </div>
                </div>

                {/* Dynamic Choice Switches (Inset) */}
                <div className="flex flex-col justify-end">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-display">
                      Inset Shadow
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUpdateLayer(activeLayer.id, { inset: !activeLayer.inset })}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        activeLayer.inset ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          activeLayer.inset ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: PREVIEW STAGE & CODE EXPORTERS */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Canvas Preview Sandbox */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
                <Box className="h-4 w-4 text-emerald-500" /> Interactive Canvas
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border transition-all cursor-pointer ${
                    isRotating 
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' 
                      : 'bg-slate-50 text-slate-450 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                  }`}
                  title="Animate rotation on layout container"
                >
                  Spin test: {isRotating ? "ON" : "OFF"}
                </button>
              </div>
            </div>

            {/* Customizer row for canvas container controls */}
            <div className="grid grid-cols-2 gap-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 p-3.5 rounded-xl">
              <div>
                <label className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest block mb-1 font-display">
                  Canvas BG
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={containerBg}
                    onChange={(e) => setContainerBg(e.target.value)}
                    className="h-6 w-9 rounded overflow-hidden cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={containerBg}
                    onChange={(e) => setContainerBg(e.target.value)}
                    className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none text-slate-800 dark:text-slate-300 uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest block mb-1 font-display">
                  Specimen Box
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={boxColor}
                    onChange={(e) => setBoxColor(e.target.value)}
                    className="h-6 w-9 rounded overflow-hidden cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={boxColor}
                    onChange={(e) => setBoxColor(e.target.value)}
                    className="w-full text-[10px] font-mono bg-transparent border-none p-0 outline-none text-slate-800 dark:text-slate-300 uppercase"
                  />
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-3 mt-1 pt-2.5 border-t border-slate-200 dark:border-slate-850">
                <div>
                  <div className="flex justify-between text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase mb-1 font-mono">
                    <span>Radius</span>
                    <span className="font-extrabold">{boxRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="64"
                    value={boxRadius}
                    onChange={(e) => setBoxRadius(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-455 dark:text-slate-500 uppercase tracking-widest block mb-1 font-display">
                    Display Specs
                  </label>
                  <div className="flex items-center gap-3 mt-0.5">
                    <label className="flex items-center gap-1.5 text-[10px] font-medium text-slate-700 dark:text-slate-350 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={boxBorder}
                        onChange={(e) => setBoxBorder(e.target.checked)}
                        className="rounded border-slate-300 text-indigo-605 focus:ring-indigo-500 text-xs cursor-pointer h-3.5 w-3.5"
                      />
                      <span>Outline</span>
                    </label>

                    <input
                      type="text"
                      maxLength={18}
                      value={boxContentText}
                      onChange={(e) => setBoxContentText(e.target.value)}
                      placeholder="Custom Text"
                      className="w-full text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-1.5 py-0.5 font-bold uppercase text-center focus:ring-1 focus:ring-indigo-500 outline-none text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sandbox Container screen with the main Box */}
            <div 
              className="relative w-full h-72 rounded-2xl flex items-center justify-center overflow-hidden border border-slate-150 dark:border-slate-850 transition-all shadow-inner"
              style={{ backgroundColor: containerBg }}
            >
              {/* Dot background logic for visual spacing */}
              <div 
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(#1e293b 1px, transparent 1px)`,
                  backgroundSize: '16px 16px'
                }}
              />

              {/* The element under active shadow transformation */}
              <motion.div
                id="shadow-rendering-target"
                className="w-36 h-36 flex flex-col items-center justify-center p-3 text-center transition-all bg-white font-display select-none"
                animate={isRotating ? { rotate: 360 } : { rotate: 0 }}
                transition={isRotating ? { repeat: Infinity, duration: 16, ease: "linear" } : { duration: 0.3 }}
                style={{
                  backgroundColor: boxColor,
                  borderRadius: `${boxRadius}px`,
                  boxShadow: generateShadowStyle(),
                  border: boxBorder ? '1px solid rgba(148, 163, 184, 0.4)' : 'none'
                }}
              >
                <div className="z-10 bg-slate-900/60 dark:bg-indigo-950/50 text-white border border-white/10 dark:border-indigo-850 px-2.5 py-1.5 rounded-xl backdrop-blur-xs font-mono">
                  <p className="text-[10px] font-black tracking-widest uppercase truncate max-w-[105px]">
                    {boxContentText || 'Shadow'}
                  </p>
                  <span className="text-[8px] font-bold text-slate-300 dark:text-slate-400 mt-0.5 block">
                    {layers.filter(l => l.active).length} Layer{layers.filter(l => l.active).length !== 1 ? 's' : ''}
                  </span>
                </div>
              </motion.div>

              {/* Backdrop lighting color indicator banner */}
              <div className="absolute top-2 left-2 z-10">
                <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-slate-900/80 text-slate-300 backdrop-blur-xs">
                  container: {containerBg.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* CODE EXPORTER PANEL - Full Width 12-column Section */}
      <div className="bg-white dark:bg-slate-950 border-2 border-slate-205 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden animate-fade-in mt-8" id="shadow-exporter">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              Export System Stylesheet
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
              if (activeCodeTab === 'css') textToCopy = `box-shadow: ${generateShadowStyle()};`;
              if (activeCodeTab === 'tailwind') textToCopy = generateTailwindValue();
              if (activeCodeTab === 'react') textToCopy = generateReactValue();
              copyToClipboard(textToCopy, activeCodeTab);
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
            {activeCodeTab === 'css' && `box-shadow: ${generateShadowStyle()};`}
            {activeCodeTab === 'tailwind' && generateTailwindValue()}
            {activeCodeTab === 'react' && generateReactValue()}
          </pre>
        </div>

        {/* Design info/warning tip */}
        <div className="flex gap-3 items-start bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 mt-4">
          <Sparkles className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-[11px] font-bold text-slate-800 dark:text-slate-205 uppercase tracking-wider font-display font-medium">Volumetric Shadow Compositing Standard</h5>
            <p className="text-[10.5px] text-slate-550 dark:text-slate-450 leading-relaxed font-display">
              Stacking multiple box shadows operates identically to ambient lighting logic. Use standard CSS property tags to guarantee uniform hardware-accelerated viewport rendering on all target web environments.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
