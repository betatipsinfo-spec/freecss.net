import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Scissors, Plus, Trash2, Sliders, RotateCcw, Copy, Check, 
  Eye, Code, Info, Sparkles, Palette, ArrowRight, 
  HelpCircle, Move, Compass, Lock, Unlock, Grid, EyeOff, Layers,
  ChevronRight, Circle, Disc, MapPin, Minimize2, Settings, Box
} from 'lucide-react';

type ShapeType = 'polygon' | 'circle' | 'ellipse' | 'inset';

interface Point {
  x: number; // 0 to 100
  y: number; // 0 to 100
}

interface ShapePreset {
  name: string;
  description: string;
  shapeType: ShapeType;
  points?: Point[];
  cx?: number;
  cy?: number;
  r?: number;
  rx?: number;
  ry?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  round?: number;
}

const PRESETS: Record<string, ShapePreset> = {
  triangle: {
    name: 'Triangle',
    description: 'Classic three-point pyramid structure.',
    shapeType: 'polygon',
    points: [{ x: 50, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }]
  },
  circle: {
    name: 'Circle',
    description: 'A perfect circular crop with adjustable radius and center point.',
    shapeType: 'circle',
    cx: 50,
    cy: 50,
    r: 35
  },
  ellipse: {
    name: 'Ellipse',
    description: 'An elegant dual-axis fluid oval layout shape.',
    shapeType: 'ellipse',
    cx: 50,
    cy: 50,
    rx: 40,
    ry: 25
  },
  inset: {
    name: 'Inset Box',
    description: 'Rectangular crop with customizable edge offsets and roundness.',
    shapeType: 'inset',
    top: 15,
    right: 15,
    bottom: 15,
    left: 15,
    round: 12
  },
  trapezoid: {
    name: 'Trapezoid',
    description: 'Polished flat-top symmetric wedge.',
    shapeType: 'polygon',
    points: [{ x: 20, y: 0 }, { x: 80, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }]
  },
  parallelogram: {
    name: 'Parallelogram',
    description: 'Slanted quad, ideal for sliders & list badges.',
    shapeType: 'polygon',
    points: [{ x: 25, y: 0 }, { x: 100, y: 0 }, { x: 75, y: 100 }, { x: 0, y: 100 }]
  },
  rhombus: {
    name: 'Rhombus / Diamond',
    description: 'Elegant four-sided symmetric diamond grid element.',
    shapeType: 'polygon',
    points: [{ x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }]
  },
  pentagon: {
    name: 'Pentagon',
    description: 'Symmetric five-pointed shield frame layout.',
    shapeType: 'polygon',
    points: [{ x: 50, y: 0 }, { x: 100, y: 38 }, { x: 82, y: 100 }, { x: 18, y: 100 }, { x: 0, y: 38 }]
  },
  hexagon: {
    name: 'Hexagon',
    description: 'Classic organic honey-bee hive grid pattern.',
    shapeType: 'polygon',
    points: [{ x: 50, y: 0 }, { x: 100, y: 25 }, { x: 100, y: 75 }, { x: 50, y: 100 }, { x: 0, y: 75 }, { x: 0, y: 25 }]
  },
  octagon: {
    name: 'Octagon',
    description: 'Bold stop-sign/outer frame aesthetic layout.',
    shapeType: 'polygon',
    points: [
      { x: 30, y: 0 }, { x: 70, y: 0 },
      { x: 100, y: 30 }, { x: 100, y: 70 },
      { x: 70, y: 100 }, { x: 30, y: 100 },
      { x: 0, y: 70 }, { x: 0, y: 30 }
    ]
  },
  star: {
    name: 'Star (5-Point)',
    description: 'Bright five-point stellar insignia with narrow internal hubs.',
    shapeType: 'polygon',
    points: [
      { x: 50, y: 0 }, { x: 61, y: 35 }, { x: 98, y: 35 }, { x: 68, y: 57 },
      { x: 79, y: 91 }, { x: 50, y: 70 }, { x: 21, y: 91 }, { x: 32, y: 57 },
      { x: 2, y: 35 }, { x: 39, y: 35 }
    ]
  },
  chevron: {
    name: 'Chevron Arrow',
    description: 'Right-pointing indicator, perfect for step controls.',
    shapeType: 'polygon',
    points: [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 100 }, { x: 50, y: 50 }]
  },
  message: {
    name: 'Message Bubble',
    description: 'Retro chat-bubble layout with pointer bottom tag.',
    shapeType: 'polygon',
    points: [
      { x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 75 },
      { x: 75, y: 75 }, { x: 75, y: 100 }, { x: 50, y: 75 }, { x: 0, y: 75 }
    ]
  },
  banner: {
    name: 'Ribbon Banner',
    description: 'Dual inverted notched flag banner accent.',
    shapeType: 'polygon',
    points: [{ x: 100, y: 0 }, { x: 85, y: 50 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 15, y: 50 }, { x: 0, y: 0 }]
  },
  cross: {
    name: 'Tactical Play Cross',
    description: 'Classic game/plus badge outline with twelve segments.',
    shapeType: 'polygon',
    points: [
      { x: 10, y: 35 }, { x: 35, y: 35 }, { x: 35, y: 10 }, { x: 65, y: 10 },
      { x: 65, y: 35 }, { x: 90, y: 35 }, { x: 90, y: 65 }, { x: 65, y: 65 },
      { x: 65, y: 90 }, { x: 35, y: 90 }, { x: 35, y: 65 }, { x: 10, y: 65 }
    ]
  }
};

const BACKGROUNDS = [
  { id: 'neon', name: 'Cyber Neon Gradient', value: 'linear-gradient(135deg, #1d4ed8 0%, #701a75 50%, #db2777 100%)' },
  { id: 'emerald', name: 'Aurora Emerald Flow', value: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)' },
  { id: 'amber', name: 'Solar Heat Wave', value: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)' },
  { id: 'tech', name: 'Matrix Slate Mesh', value: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' },
  { id: 'nature', name: 'Dynamic High-Res Art', value: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80")' },
  { id: 'solid', name: 'Brand Indigo Block', value: '#4f46e5' }
];

export default function ClipPathGenerator() {
  const [activePreset, setActivePreset] = useState<string>('triangle');
  const [shapeType, setShapeType] = useState<ShapeType>('polygon');
  
  // States of parameters based on type
  const [points, setPoints] = useState<Point[]>([...PRESETS.triangle.points]);
  const [circleParams, setCircleParams] = useState({ cx: 50, cy: 50, r: 35 });
  const [ellipseParams, setEllipseParams] = useState({ cx: 50, cy: 50, rx: 40, ry: 25 });
  const [insetParams, setInsetParams] = useState({ top: 15, right: 15, bottom: 15, left: 15, round: 12 });

  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(0);
  const [snapValue, setSnapValue] = useState<number>(5); // 0 (none), 1, 5, 10
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showHandles, setShowHandles] = useState<boolean>(true);
  const [bgSelection, setBgSelection] = useState<string>('neon');
  
  // Exporter values
  const [copiedCSS, setCopiedCSS] = useState<boolean>(false);
  const [copiedTailwind, setCopiedTailwind] = useState<boolean>(false);
  const [copiedSVG, setCopiedSVG] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'tailwind' | 'svg'>('css');

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const currentDragIndexRef = useRef<number | null>(null);

  // Generate CSS string output
  const generateClipPathCSS = () => {
    if (shapeType === 'polygon') {
      const coords = points.map(p => `${p.x}% ${p.y}%`).join(', ');
      return `clip-path: polygon(${coords});`;
    } else if (shapeType === 'circle') {
      return `clip-path: circle(${circleParams.r}% at ${circleParams.cx}% ${circleParams.cy}%);`;
    } else if (shapeType === 'ellipse') {
      return `clip-path: ellipse(${ellipseParams.rx}% ${ellipseParams.ry}% at ${ellipseParams.cx}% ${ellipseParams.cy}%);`;
    } else {
      const roundStr = insetParams.round > 0 ? ` round ${insetParams.round}%` : '';
      return `clip-path: inset(${insetParams.top}% ${insetParams.right}% ${insetParams.bottom}% ${insetParams.left}%${roundStr});`;
    }
  };

  const generateClipPathTailwind = () => {
    if (shapeType === 'polygon') {
      const coords = points.map(p => `${p.x}%_${p.y}%`).join(',');
      return `clip-path-[polygon(${coords})]`;
    } else if (shapeType === 'circle') {
      return `clip-path-[circle(${circleParams.r}%_at_${circleParams.cx}%_${circleParams.cy}%)]`;
    } else if (shapeType === 'ellipse') {
      return `clip-path-[ellipse(${ellipseParams.rx}%_${ellipseParams.ry}%_at_${ellipseParams.cx}%_${ellipseParams.cy}%)]`;
    } else {
      const roundStr = insetParams.round > 0 ? `_round_${insetParams.round}%` : '';
      return `clip-path-[inset(${insetParams.top}%_${insetParams.right}%_${insetParams.bottom}%_${insetParams.left}%${roundStr})]`;
    }
  };

  const generateSVGCode = () => {
    if (shapeType === 'polygon') {
      const pointsStr = points.map(p => `${p.x / 100},${p.y / 100}`).join(' ');
      return `<svg width="0" height="0" className="absolute">
  <defs>
    <clipPath id="custom-clip-shape" clipPathUnits="objectBoundingBox">
      <polygon points="${pointsStr}" />
    </clipPath>
  </defs>
</svg>`;
    } else if (shapeType === 'circle') {
      return `<svg width="0" height="0" className="absolute">
  <defs>
    <clipPath id="custom-clip-shape" clipPathUnits="objectBoundingBox">
      <circle cx="${circleParams.cx / 100}" cy="${circleParams.cy / 100}" r="${circleParams.r / 100}" />
    </clipPath>
  </defs>
</svg>`;
    } else if (shapeType === 'ellipse') {
      return `<svg width="0" height="0" className="absolute">
  <defs>
    <clipPath id="custom-clip-shape" clipPathUnits="objectBoundingBox">
      <ellipse cx="${ellipseParams.cx / 100}" cy="${ellipseParams.cy / 100}" rx="${ellipseParams.rx / 100}" ry="${ellipseParams.ry / 100}" />
    </clipPath>
  </defs>
</svg>`;
    } else {
      const x = insetParams.left / 100;
      const y = insetParams.top / 100;
      const w = Math.max(0, 1 - (insetParams.left + insetParams.right) / 100);
      const h = Math.max(0, 1 - (insetParams.top + insetParams.bottom) / 100);
      const rx = insetParams.round / 100;
      return `<svg width="0" height="0" className="absolute">
  <defs>
    <clipPath id="custom-clip-shape" clipPathUnits="objectBoundingBox">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ry="${rx}" />
    </clipPath>
  </defs>
</svg>`;
    }
  };

  // Preset Applier
  const applyPreset = (key: string) => {
    const preset = PRESETS[key];
    if (preset) {
      setActivePreset(key);
      setShapeType(preset.shapeType);
      
      if (preset.shapeType === 'polygon' && preset.points) {
        setPoints([...preset.points.map(p => ({ ...p }))]);
        setSelectedPointIndex(0);
      } else if (preset.shapeType === 'circle') {
        setCircleParams({
          cx: preset.cx ?? 50,
          cy: preset.cy ?? 50,
          r: preset.r ?? 35
        });
        setSelectedPointIndex(0);
      } else if (preset.shapeType === 'ellipse') {
        setEllipseParams({
          cx: preset.cx ?? 50,
          cy: preset.cy ?? 50,
          rx: preset.rx ?? 40,
          ry: preset.ry ?? 25
        });
        setSelectedPointIndex(0);
      } else if (preset.shapeType === 'inset') {
        setInsetParams({
          top: preset.top ?? 15,
          right: preset.right ?? 15,
          bottom: preset.bottom ?? 15,
          left: preset.left ?? 15,
          round: preset.round ?? 12
        });
        setSelectedPointIndex(0);
      }
    }
  };

  // Snap logic helper
  const snap = (val: number) => {
    if (snapValue <= 0) return Math.round(val * 10) / 10; // decimal rounding
    return Math.round(val / snapValue) * snapValue;
  };

  // Add a new point to the end (polygon only)
  const appendPoint = () => {
    if (shapeType !== 'polygon') return;
    const newPoint: Point = { x: 50, y: 50 };
    setPoints([...points, newPoint]);
    setSelectedPointIndex(points.length);
    setActivePreset('custom');
  };

  // Insert point at a specific index (polygon only)
  const insertPointBetween = (index: number) => {
    if (shapeType !== 'polygon') return;
    const p1 = points[index];
    const p2 = points[(index + 1) % points.length];
    const newPoint: Point = {
      x: snap((p1.x + p2.x) / 2),
      y: snap((p1.y + p2.y) / 2)
    };
    
    const updated = [...points];
    updated.splice(index + 1, 0, newPoint);
    setPoints(updated);
    setSelectedPointIndex(index + 1);
    setActivePreset('custom');
  };

  // Remove existing point (polygon only)
  const deletePoint = (index: number) => {
    if (shapeType !== 'polygon') return;
    if (points.length <= 3) {
      return; // Cannot go below 3 points
    }
    const updated = points.filter((_, i) => i !== index);
    setPoints(updated);
    setSelectedPointIndex(Math.max(0, index - 1));
    setActivePreset('custom');
  };

  // Update specific coordinates of selected index (polygon only)
  const updateCoordinate = (index: number, key: 'x' | 'y', value: number) => {
    const val = Math.min(100, Math.max(0, value));
    const snappedVal = snap(val);
    const updated = [...points];
    updated[index] = {
      ...updated[index],
      [key]: snappedVal
    };
    setPoints(updated);
    setActivePreset('custom');
  };

  // Mouse & Touch events handle for Workspace dragging
  const handleStartDrag = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    currentDragIndexRef.current = index;
    setSelectedPointIndex(index);
    if (!['triangle', 'circle', 'ellipse', 'inset'].includes(activePreset)) {
      setActivePreset('custom');
    }
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || currentDragIndexRef.current === null || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e) {
        if (e.touches.length === 0) return;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      // Calculate percentage inside container bounds
      let relativeX = ((clientX - containerRect.left) / containerRect.width) * 100;
      let relativeY = ((clientY - containerRect.top) / containerRect.height) * 100;

      // Constrain coordinates between [0, 100]
      relativeX = Math.min(100, Math.max(0, relativeX));
      relativeY = Math.min(100, Math.max(0, relativeY));

      const snappedX = snap(relativeX);
      const snappedY = snap(relativeY);

      if (shapeType === 'polygon') {
        setPoints(prev => {
          const next = [...prev];
          if (currentDragIndexRef.current !== null && next[currentDragIndexRef.current]) {
            next[currentDragIndexRef.current] = { x: snappedX, y: snappedY };
          }
          return next;
        });
      } else if (shapeType === 'circle') {
        setCircleParams(prev => {
          if (currentDragIndexRef.current === 0) {
            return { ...prev, cx: snappedX, cy: snappedY };
          } else if (currentDragIndexRef.current === 1) {
            const r = Math.min(100, Math.max(0, Math.round(Math.abs(snappedX - prev.cx))));
            return { ...prev, r };
          }
          return prev;
        });
      } else if (shapeType === 'ellipse') {
        setEllipseParams(prev => {
          if (currentDragIndexRef.current === 0) {
            return { ...prev, cx: snappedX, cy: snappedY };
          } else if (currentDragIndexRef.current === 1) {
            const rx = Math.min(100, Math.max(0, Math.round(Math.abs(snappedX - prev.cx))));
            return { ...prev, rx };
          } else if (currentDragIndexRef.current === 2) {
            const ry = Math.min(100, Math.max(0, Math.round(Math.abs(snappedY - prev.cy))));
            return { ...prev, ry };
          }
          return prev;
        });
      } else if (shapeType === 'inset') {
        setInsetParams(prev => {
          if (currentDragIndexRef.current === 0) {
            return { ...prev, top: snappedY };
          } else if (currentDragIndexRef.current === 1) {
            return { ...prev, right: Math.min(100, Math.max(0, 100 - snappedX)) };
          } else if (currentDragIndexRef.current === 2) {
            return { ...prev, bottom: Math.min(100, Math.max(0, 100 - snappedY)) };
          } else if (currentDragIndexRef.current === 3) {
            return { ...prev, left: snappedX };
          }
          return prev;
        });
      }
    };

    const handleEndDrag = () => {
      isDraggingRef.current = false;
      currentDragIndexRef.current = null;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEndDrag);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEndDrag);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, [snapValue, shapeType]);

  const copyToClipboard = (text: string, type: 'css' | 'tailwind' | 'svg') => {
    navigator.clipboard.writeText(text);
    if (type === 'css') {
      setCopiedCSS(true);
      setTimeout(() => setCopiedCSS(false), 2000);
    } else if (type === 'tailwind') {
      setCopiedTailwind(true);
      setTimeout(() => setCopiedTailwind(false), 2000);
    } else {
      setCopiedSVG(true);
      setTimeout(() => setCopiedSVG(false), 2000);
    }
  };

  const getBackgroundStyle = () => {
    const bg = BACKGROUNDS.find(b => b.id === bgSelection);
    if (!bg) return { background: BACKGROUNDS[0].value };
    if (bg.value.startsWith('url')) {
      return { 
        backgroundImage: bg.value,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
    return { background: bg.value };
  };

  const getClippedStyle = () => {
    if (shapeType === 'polygon') {
      const polyStr = `polygon(${points.map(p => `${p.x}% ${p.y}%`).join(', ')})`;
      return {
        clipPath: polyStr,
        WebkitClipPath: polyStr,
      };
    } else if (shapeType === 'circle') {
      const circStr = `circle(${circleParams.r}% at ${circleParams.cx}% ${circleParams.cy}%)`;
      return {
        clipPath: circStr,
        WebkitClipPath: circStr,
      };
    } else if (shapeType === 'ellipse') {
      const ellStr = `ellipse(${ellipseParams.rx}% ${ellipseParams.ry}% at ${ellipseParams.cx}% ${ellipseParams.cy}%)`;
      return {
        clipPath: ellStr,
        WebkitClipPath: ellStr,
      };
    } else {
      const roundStr = insetParams.round > 0 ? ` round ${insetParams.round}%` : '';
      const insetStr = `inset(${insetParams.top}% ${insetParams.right}% ${insetParams.bottom}% ${insetParams.left}%${roundStr})`;
      return {
        clipPath: insetStr,
        WebkitClipPath: insetStr,
      };
    }
  };

  const getHandles = () => {
    if (shapeType === 'polygon') {
      return points.map((p, idx) => ({ id: idx, x: p.x, y: p.y, label: `${idx + 1}` }));
    } else if (shapeType === 'circle') {
      return [
        { id: 0, x: circleParams.cx, y: circleParams.cy, label: 'C' }, // Center
        { id: 1, x: snap(circleParams.cx + circleParams.r), y: circleParams.cy, label: 'R' } // Radius
      ];
    } else if (shapeType === 'ellipse') {
      return [
        { id: 0, x: ellipseParams.cx, y: ellipseParams.cy, label: 'C' }, // Center
        { id: 1, x: snap(ellipseParams.cx + ellipseParams.rx), y: ellipseParams.cy, label: 'X' }, // rx
        { id: 2, x: ellipseParams.cx, y: snap(ellipseParams.cy + ellipseParams.ry), label: 'Y' } // ry
      ];
    } else {
      // Inset offsets
      return [
        { id: 0, x: 50, y: insetParams.top, label: 'T' },
        { id: 1, x: 100 - insetParams.right, y: 50, label: 'R' },
        { id: 2, x: 50, y: 100 - insetParams.bottom, label: 'B' },
        { id: 3, x: insetParams.left, y: 50, label: 'L' }
      ];
    }
  };

  return (
    <div className="space-y-8 animate-fade-in" id="clippath-workspace">
      
      {/* QUICK PRESETS CAROUSEL */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <Compass className="h-4.5 w-4.5 text-indigo-505" />
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 font-display">
                Choose Preset Type
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display font-medium mt-0.5">
                Switch category and load sample shape parameters
              </p>
            </div>
          </div>
          
          {/* Shape type selector category pills */}
          <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {(['polygon', 'circle', 'ellipse', 'inset'] as ShapeType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  const companionPreset = Object.entries(PRESETS).find(([_, p]) => p.shapeType === type)?.[0];
                  if (companionPreset) {
                    applyPreset(companionPreset);
                  } else {
                    setShapeType(type);
                  }
                }}
                className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider font-display rounded-lg transition-all duration-150 cursor-pointer ${
                  shapeType === type
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              title={preset.description}
              className={`px-2 py-2.5 text-[10px] font-bold uppercase tracking-wider font-display rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1 cursor-pointer ${
                activePreset === key
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/30 border-indigo-500 text-indigo-700 dark:text-indigo-400 font-extrabold shadow-2xs scale-[1.02]'
                  : 'bg-slate-50 dark:bg-slate-955 border-slate-200 dark:border-slate-850 text-slate-505 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span className="text-[9px] font-black uppercase line-clamp-1">{preset.name}</span>
              <span className="text-[8px] font-mono text-slate-400 font-semibold">{preset.shapeType}</span>
            </button>
          ))}
        </div>
      </div>

      {/* WORKSPACE CONTENT: 12-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Coord Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* PARAMETER CONTROLS BLOCK */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2 font-display">
                <Sliders className="h-4 w-4 text-indigo-500" /> Grid Mechanics & Snaps
              </h3>
              <div className="flex gap-1">
                {activePreset === 'custom' && (
                  <span className="text-[8px] font-mono font-bold text-orange-500 bg-orange-100 dark:bg-orange-950 px-1.5 py-0.5 rounded uppercase">
                    Custom Adjusted Mode
                  </span>
                )}
                <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase">
                  ACTIVE: {shapeType.toUpperCase()}
                </span>
              </div>
            </div>

            {/* SNAP & GRID CONTROLS */}
            <div className="grid grid-cols-3 gap-4">
              
              {/* Snap selection */}
              <div className="space-y-1.5 col-span-3 sm:col-span-1">
                <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                  <span>Snapping Guides</span>
                  <span className="font-mono text-[10px] font-black text-indigo-600 dark:text-indigo-400">
                    {snapValue === 0 ? 'None' : `${snapValue}%`}
                  </span>
                </div>
                <div className="flex rounded-lg border-2 border-slate-200 dark:border-slate-800 overflow-hidden divide-x divide-slate-200 dark:divide-slate-800">
                  {[0, 1, 5, 10].map(v => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSnapValue(v)}
                      className={`flex-1 py-1.5 text-[10px] font-black uppercase tracking-wider font-mono cursor-pointer ${
                        snapValue === v
                          ? 'bg-indigo-650 text-white'
                          : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      {v === 0 ? 'OFF' : `${v}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid visible switch */}
              <div className="space-y-1.5 col-span-3 sm:col-span-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display block">
                  Grid Guides
                </span>
                <button
                  type="button"
                  onClick={() => setShowGrid(!showGrid)}
                  className={`w-full py-1.7 text-xs font-black uppercase tracking-widest font-display rounded-lg border-2 cursor-pointer transition-all ${
                    showGrid
                      ? 'bg-indigo-10/20 border-indigo-500 text-indigo-650 dark:text-indigo-400 font-bold'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Grid className="h-4.5 w-4.5" /> {showGrid ? 'VISIBLE' : 'HIDDEN'}
                  </span>
                </button>
              </div>

              {/* Handles visible switch */}
              <div className="space-y-1.5 col-span-3 sm:col-span-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display block">
                  Handles Overlay
                </span>
                <button
                  type="button"
                  onClick={() => setShowHandles(!showHandles)}
                  className={`w-full py-1.7 text-xs font-black uppercase tracking-widest font-display rounded-lg border-2 cursor-pointer transition-all ${
                    showHandles
                      ? 'bg-indigo-10/20 border-indigo-500 text-indigo-650 dark:text-indigo-400 font-bold'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    {showHandles ? (
                      <>
                        <Eye className="h-4.5 w-4.5" /> MOUNTED
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4.5 w-4.5" /> HIDDEN
                      </>
                    )}
                  </span>
                </button>
              </div>

            </div>

            {/* CHOOSE WORKSPACE BACKDROP BACKGROUND */}
            <div className="space-y-2 pt-3 border-t border-slate-150 dark:border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <Palette className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 font-display">
                  Clipped Shape Poster Background
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {BACKGROUNDS.map((bg) => {
                  const isSelected = bgSelection === bg.id;
                  return (
                    <button
                      key={bg.id}
                      onClick={() => setBgSelection(bg.id)}
                      title={`Active: ${bg.name}`}
                      className={`h-8 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider font-display border cursor-pointer transition-all text-white relative overflow-hidden flex items-center justify-center ${
                        isSelected ? 'ring-2 ring-indigo-500 border-indigo-505 font-black scale-[1.02]' : 'border-slate-250 dark:border-slate-800 opacity-80 hover:opacity-100'
                      }`}
                      style={
                        bg.value.startsWith('url')
                          ? { backgroundImage: bg.value, backgroundSize: 'cover', backgroundPosition: 'center', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }
                          : { background: bg.value }
                      }
                    >
                      {bg.name.split(' ').slice(-2).join(' ')}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ACTIVE COORDINATE LIST / PARAMETER SLIDERS */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4 font-display">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-805 dark:text-slate-200 flex items-center gap-2 font-display">
                <Layers className="h-4 w-4 text-indigo-500" /> Precision Coordinate Sliders
              </h3>
              
              <div className="flex gap-2">
                {shapeType === 'polygon' && (
                  <button
                    onClick={appendPoint}
                    type="button"
                    className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider font-display bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-305 border border-indigo-200 rounded-lg hover:bg-indigo-100 duration-150 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="h-3 w-3" /> Insert Point
                  </button>
                )}
                <button
                  onClick={() => applyPreset(activePreset)}
                  type="button"
                  title="Restore preset defaults"
                  className="px-2 py-1 text-[10px] font-black uppercase tracking-wider font-display text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-950 cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>
            </div>

            {/* IF POLYGON: Render draggable points */}
            {shapeType === 'polygon' && (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1.5 divide-y divide-slate-100 dark:divide-slate-800">
                {points.map((point, index) => {
                  const isSelected = selectedPointIndex === index;
                  return (
                    <div 
                      key={index} 
                      className={`pt-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected ? 'bg-indigo-50/20 dark:bg-indigo-950/15 p-2 rounded-xl border border-indigo-100 dark:border-indigo-900/30' : ''
                      }`}
                    >
                      {/* Circle badge identifier */}
                      <div className="flex items-center gap-2">
                        <span 
                          onClick={() => setSelectedPointIndex(index)}
                          className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-[10.5px] font-black select-none cursor-pointer ${
                            isSelected 
                              ? 'bg-indigo-600 text-white shadow-xs scale-108' 
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-305 hover:bg-slate-200'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span className="text-[10px] font-black font-display uppercase tracking-wider text-slate-500">
                          {isSelected ? 'ACTIVE VECTOR' : `POINT ${index + 1}`}
                        </span>
                      </div>

                      {/* Draggable sliders for X and Y inside point */}
                      <div className="flex-1 grid grid-cols-2 gap-4">
                        {/* Anchor X */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-450 uppercase">
                            <span>X-Axis</span>
                            <span className="font-extrabold text-indigo-700 dark:text-indigo-400">{point.x}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={point.x}
                            onChange={(e) => updateCoordinate(index, 'x', Number(e.target.value))}
                            className="w-full h-1 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                          />
                        </div>

                        {/* Anchor Y */}
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-450 uppercase">
                            <span>Y-Axis</span>
                            <span className="font-extrabold text-indigo-700 dark:text-indigo-400">{point.y}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={point.y}
                            onChange={(e) => updateCoordinate(index, 'y', Number(e.target.value))}
                            className="w-full h-1 bg-slate-155 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                          />
                        </div>
                      </div>

                      {/* Insert point next and delete option */}
                      <div className="flex gap-1.5 self-end">
                        <button
                          type="button"
                          onClick={() => insertPointBetween(index)}
                          title="Insert new coordinate between this point and the next"
                          className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={points.length <= 3}
                          onClick={() => deletePoint(index)}
                          className={`p-1 transition-colors ${
                            points.length <= 3 
                              ? 'text-slate-300 dark:text-slate-800 cursor-not-allowed' 
                              : 'text-slate-400 hover:text-rose-505'
                          }`}
                          title={points.length <= 3 ? "Minimum 3 points required" : "Delete coordinate point"}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* IF CIRCLE: Render Center Center and Radius */}
            {shapeType === 'circle' && (
              <div className="space-y-4">
                {/* Center X */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Disc className="h-4 w-4 text-indigo-500" /> Center X Coordinate (cx)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{circleParams.cx}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={circleParams.cx}
                    onChange={(e) => setCircleParams(prev => ({ ...prev, cx: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                  />
                </div>

                {/* Center Y */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Disc className="h-4 w-4 text-indigo-500" /> Center Y Coordinate (cy)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{circleParams.cy}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={circleParams.cy}
                    onChange={(e) => setCircleParams(prev => ({ ...prev, cy: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-655"
                  />
                </div>

                {/* Radius */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Circle className="h-4 w-4 text-pink-500 animate-pulse" /> Circle Radius (r)</span>
                    <span className="font-mono text-pink-600 dark:text-pink-400">{circleParams.r}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={circleParams.r}
                    onChange={(e) => setCircleParams(prev => ({ ...prev, r: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            )}

            {/* IF ELLIPSE: Render Center, X Radius and Y Radius */}
            {shapeType === 'ellipse' && (
              <div className="space-y-4">
                {/* Center X */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      <span>Center X (cx)</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{ellipseParams.cx}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={ellipseParams.cx}
                      onChange={(e) => setEllipseParams(prev => ({ ...prev, cx: Number(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      <span>Center Y (cy)</span>
                      <span className="font-mono text-indigo-600 dark:text-indigo-400">{ellipseParams.cy}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={ellipseParams.cy}
                      onChange={(e) => setEllipseParams(prev => ({ ...prev, cy: Number(e.target.value) }))}
                      className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                    />
                  </div>
                </div>

                {/* X Radius */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">Horizontal Radius (rx)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{ellipseParams.rx}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={ellipseParams.rx}
                    onChange={(e) => setEllipseParams(prev => ({ ...prev, rx: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-605"
                  />
                </div>

                {/* Y Radius */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1">Vertical Radius (ry)</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{ellipseParams.ry}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={ellipseParams.ry}
                    onChange={(e) => setEllipseParams(prev => ({ ...prev, ry: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-605"
                  />
                </div>
              </div>
            )}

            {/* IF INSET: Render Offsets top, right, bottom, left and roundness */}
            {shapeType === 'inset' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Top */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                      <span>Top Offset</span>
                      <span className="font-mono font-black">{insetParams.top}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={insetParams.top}
                      onChange={(e) => setInsetParams(prev => ({ ...prev, top: Number(e.target.value) }))}
                      className="w-full h-1 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Right */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                      <span>Right Offset</span>
                      <span className="font-mono font-black">{insetParams.right}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={insetParams.right}
                      onChange={(e) => setInsetParams(prev => ({ ...prev, right: Number(e.target.value) }))}
                      className="w-full h-1 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Bottom */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                      <span>Bottom Offset</span>
                      <span className="font-mono font-black">{insetParams.bottom}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={insetParams.bottom}
                      onChange={(e) => setInsetParams(prev => ({ ...prev, bottom: Number(e.target.value) }))}
                      className="w-full h-1 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Left */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                      <span>Left Offset</span>
                      <span className="font-mono font-black">{insetParams.left}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={insetParams.left}
                      onChange={(e) => setInsetParams(prev => ({ ...prev, left: Number(e.target.value) }))}
                      className="w-full h-1 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>
                </div>

                {/* Round Roundedness */}
                <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Settings className="h-4 w-4 text-pink-500 animate-spin" style={{ animationDuration: '8s' }} /> Inward Corner Radius (round)</span>
                    <span className="font-mono text-pink-650 dark:text-pink-400 font-black">{insetParams.round}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={insetParams.round}
                    onChange={(e) => setInsetParams(prev => ({ ...prev, round: Number(e.target.value) }))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                  />
                </div>
              </div>
            )}

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive High-Precision Canvas (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Draggable Active Workspace Sandbox */}
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-905 dark:text-slate-100 flex items-center gap-1.5 font-display">
                <Move className="h-4 w-4 text-indigo-500 animate-pulse" /> Live Shape Canvas
              </h3>
              <span className="text-[9px] font-mono text-slate-450 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full uppercase font-bold">
                interactive nodes
              </span>
            </div>

            {/* Canvas Outer Wrapping Frame */}
            <div className="flex justify-center items-center py-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850">
              
              <div 
                ref={containerRef}
                className="w-80 h-80 sm:w-96 sm:h-96 relative select-none shadow-inner bg-slate-200/50 dark:bg-slate-900/60 transition-colors duration-300"
                style={{
                  backgroundImage: showGrid 
                    ? 'radial-gradient(#6366f1 1px, transparent 1px)' 
                    : 'none',
                  backgroundSize: '20px 20px'
                }}
              >
                {/* 1. Behind cropped shadow element */}
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    ...getBackgroundStyle()
                  }}
                />

                {/* 2. Actual clipped element */}
                <div 
                  className="absolute inset-0 shadow-lg select-none duration-150"
                  style={{
                    ...getBackgroundStyle(),
                    ...getClippedStyle()
                  }}
                />

                {/* SVG path connector line outlining coordinate geometry */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  {shapeType === 'polygon' && (
                    <polygon
                      points={points.map(p => `${p.x}% ${p.y}%`).join(' ')}
                      fill="none"
                      stroke="#4338ca"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-70"
                    />
                  )}
                  {shapeType === 'circle' && (
                    <circle
                      cx={`${circleParams.cx}%`}
                      cy={`${circleParams.cy}%`}
                      r={`${circleParams.r}%`}
                      fill="none"
                      stroke="#4338ca"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-70"
                    />
                  )}
                  {shapeType === 'ellipse' && (
                    <ellipse
                      cx={`${ellipseParams.cx}%`}
                      cy={`${ellipseParams.cy}%`}
                      rx={`${ellipseParams.rx}%`}
                      ry={`${ellipseParams.ry}%`}
                      fill="none"
                      stroke="#4338ca"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-70"
                    />
                  )}
                  {shapeType === 'inset' && (
                    <rect
                      x={`${insetParams.left}%`}
                      y={`${insetParams.top}%`}
                      width={`${Math.max(0, 100 - (insetParams.left + insetParams.right))}%`}
                      height={`${Math.max(0, 100 - (insetParams.top + insetParams.bottom))}%`}
                      rx={`${insetParams.round}%`}
                      ry={`${insetParams.round}%`}
                      fill="none"
                      stroke="#4338ca"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="opacity-70"
                    />
                  )}
                </svg>

                {/* Draggable handle nodes overlay */}
                {showHandles && getHandles().map((h) => {
                  const isSelected = selectedPointIndex === h.id;
                  return (
                    <div
                      key={h.id}
                      onMouseDown={(e) => handleStartDrag(h.id, e)}
                      onTouchStart={(e) => handleStartDrag(h.id, e)}
                      style={{
                        left: `${h.x}%`,
                        top: `${h.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`absolute h-7.5 w-7.5 rounded-full flex items-center justify-center font-mono text-[10px] font-black z-20 cursor-move border-2 transition-transform select-none shadow-md ${
                        isSelected
                          ? 'bg-indigo-650 border-white text-white scale-110 ring-4 ring-indigo-500/30'
                          : 'bg-white text-indigo-950 border-indigo-600 hover:scale-[1.05]'
                      }`}
                    >
                      {h.label}
                    </div>
                  );
                })}

                {/* Bounds indicators 0% and 100% */}
                <div className="absolute top-2 left-2 text-[8px] font-mono bg-white/70 dark:bg-black/70 px-1.5 py-0.5 rounded shadow-xs text-slate-500 pointer-events-none select-none">
                  (0%,0%)
                </div>
                <div className="absolute bottom-2 right-2 text-[8px] font-mono bg-white/70 dark:bg-black/70 px-1.5 py-0.5 rounded shadow-xs text-slate-500 pointer-events-none select-none">
                  (100%,100%)
                </div>

              </div>

            </div>

            {/* Sandbox details */}
            <div className="flex items-start gap-2 bg-indigo-50/40 dark:bg-slate-950 p-3 rounded-xl border border-indigo-10/10 text-[10px] text-slate-550 leading-relaxed font-display">
              <Sparkles className="h-4 w-4 text-indigo-505 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="font-extrabold text-slate-805 dark:text-slate-200">Interactive Canvas Mode: </span>
                Drag center handles directly to reposition the crop origin, or adjustment nodes to expand dimensions dynamically.
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* CORE 12-COLUMN EXPORTER BLOCK */}
      <div className="bg-white dark:bg-slate-950 border-2 border-slate-205 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden animate-fade-in mt-8" id="clippath-exporter">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              Export CSS Clip-Path Specifications
            </h3>
          </div>

          {/* Code format toggle buttons */}
          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1">
            {[
              { id: 'css', label: 'Standard CSS' },
              { id: 'tailwind', label: 'Tailwind CSS' },
              { id: 'svg', label: 'Inline SVG' }
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
              if (activeCodeTab === 'css') textToCopy = generateClipPathCSS();
              if (activeCodeTab === 'tailwind') textToCopy = generateClipPathTailwind();
              if (activeCodeTab === 'svg') textToCopy = generateSVGCode();
              copyToClipboard(textToCopy, activeCodeTab);
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400 cursor-pointer transition-all z-10 flex items-center gap-1.5"
          >
            {(activeCodeTab === 'css' ? copiedCSS : activeCodeTab === 'tailwind' ? copiedTailwind : copiedSVG) ? (
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
            {activeCodeTab === 'css' && generateClipPathCSS()}
            {activeCodeTab === 'tailwind' && generateClipPathTailwind()}
            {activeCodeTab === 'svg' && generateSVGCode()}
          </pre>
        </div>

        {/* Design warning advisory */}
        <div className="flex gap-3 items-start bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850 mt-4">
          <Info className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-[11px] font-bold text-slate-800 dark:text-slate-205 uppercase tracking-wider font-display font-medium">CSS Masking Architectural Warning</h5>
            <p className="text-[10.5px] text-slate-550 dark:text-slate-450 leading-relaxed font-display">
              Clip-paths are highly interactive but do not affect document content layout flow. The clipped regions are completely non-interactive (mouse cursor pointer-events are ignored inside clipped areas). Ensure you provide ample padding surrounding responsive blocks to prevent content cut-offs on mobile viewpoints.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
