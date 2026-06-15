import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, RotateCcw, Sliders, Code, Palette, HelpCircle, 
  Copy, Check, Eye, ArrowRight, MousePointer, Monitor, Info, Play, Trash2, Box
} from 'lucide-react';

interface CursorPreset {
  name: string;
  description: string;
  dotSize: number;
  ringSize: number;
  ringBorderWidth: number;
  lagSpeed: number;
  trailLength: number;
  dotColor: string;
  ringColor: string;
  glowColor: string;
  hoverScale: number;
  clickScale: number;
  dotStyle: 'dot' | 'none' | 'crosshair';
  ringStyle: 'ring' | 'square' | 'blur' | 'none';
  trailStyle: 'dots' | 'none';
}

const CURSOR_PRESETS: CursorPreset[] = [
  {
    name: 'Cyberpunk Neon',
    description: 'Hot pink core with a lagging neon cyan ring and subtle cyan particles',
    dotSize: 6,
    ringSize: 26,
    ringBorderWidth: 2,
    lagSpeed: 0.15,
    trailLength: 4,
    dotColor: '#ff007f',
    ringColor: '#00f0ff',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    hoverScale: 1.6,
    clickScale: 0.6,
    dotStyle: 'dot',
    ringStyle: 'ring',
    trailStyle: 'dots'
  },
  {
    name: 'Liquid Ghost',
    description: 'Amorphous violet snake trail of decreasing glowing nodes',
    dotSize: 10,
    ringSize: 0,
    ringBorderWidth: 0,
    lagSpeed: 0.1,
    trailLength: 8,
    dotColor: '#8b5cf6',
    ringColor: '#a78bfa',
    glowColor: 'rgba(139, 92, 246, 0.3)',
    hoverScale: 1.4,
    clickScale: 1.8,
    dotStyle: 'dot',
    ringStyle: 'none',
    trailStyle: 'dots'
  },
  {
    name: 'Retro Crosshair',
    description: 'Precise hacker-style green target reticle for extreme accuracy',
    dotSize: 4,
    ringSize: 32,
    ringBorderWidth: 1,
    lagSpeed: 0.3,
    trailLength: 0,
    dotColor: '#10b981',
    ringColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.2)',
    hoverScale: 1.2,
    clickScale: 0.8,
    dotStyle: 'crosshair',
    ringStyle: 'ring',
    trailStyle: 'none'
  },
  {
    name: 'Golden Solar',
    description: 'Bright amber core inside a square dynamic shield that scales up on click',
    dotSize: 8,
    ringSize: 24,
    ringBorderWidth: 3,
    lagSpeed: 0.18,
    trailLength: 3,
    dotColor: '#f59e0b',
    ringColor: '#fbbf24',
    glowColor: 'rgba(245, 158, 11, 0.3)',
    hoverScale: 1.8,
    clickScale: 1.5,
    dotStyle: 'dot',
    ringStyle: 'square',
    trailStyle: 'dots'
  },
  {
    name: 'Toxic Venom',
    description: 'Eerie poison-green soft glowing cloud that enlarges and pulses on hover',
    dotSize: 0,
    ringSize: 40,
    ringBorderWidth: 0,
    lagSpeed: 0.08,
    trailLength: 5,
    dotColor: '#22c55e',
    ringColor: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.45)',
    hoverScale: 2.0,
    clickScale: 0.5,
    dotStyle: 'none',
    ringStyle: 'blur',
    trailStyle: 'dots'
  },
  {
    name: 'Aesthetic Minimalist',
    description: 'Sleek standard layout enhancer with deep slate tinting',
    dotSize: 5,
    ringSize: 18,
    ringBorderWidth: 1,
    lagSpeed: 0.25,
    trailLength: 1,
    dotColor: '#0f172a',
    ringColor: '#475569',
    glowColor: 'transparent',
    hoverScale: 1.5,
    clickScale: 0.7,
    dotStyle: 'dot',
    ringStyle: 'ring',
    trailStyle: 'none'
  },
  {
    name: 'Stealth Recon',
    description: 'Crimson tactical crosshair for high-precision operations that expands on hover',
    dotSize: 3,
    ringSize: 36,
    ringBorderWidth: 1.5,
    lagSpeed: 0.4,
    trailLength: 0,
    dotColor: '#ef4444',
    ringColor: '#dc2626',
    glowColor: 'rgba(239, 68, 68, 0.15)',
    hoverScale: 1.4,
    clickScale: 0.7,
    dotStyle: 'crosshair',
    ringStyle: 'square',
    trailStyle: 'none'
  },
  {
    name: 'Cosmic Singularity',
    description: 'Deep royal blue aura with a massive event horizon soft blur active ring',
    dotSize: 12,
    ringSize: 48,
    ringBorderWidth: 0,
    lagSpeed: 0.07,
    trailLength: 6,
    dotColor: '#1e1b4b',
    ringColor: '#6366f1',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    hoverScale: 2.2,
    clickScale: 0.4,
    dotStyle: 'dot',
    ringStyle: 'blur',
    trailStyle: 'dots'
  },
  {
    name: 'Magnetic Pulse',
    description: 'Vibrant neon yellow tracking system that snaps to buttons with high elasticity',
    dotSize: 4,
    ringSize: 22,
    ringBorderWidth: 2.5,
    lagSpeed: 0.22,
    trailLength: 2,
    dotColor: '#eab308',
    ringColor: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.35)',
    hoverScale: 1.7,
    clickScale: 0.8,
    dotStyle: 'dot',
    ringStyle: 'ring',
    trailStyle: 'dots'
  },
  {
    name: 'Magma Surge',
    description: 'Smoldering fiery orange-red tail that pulsates with extreme thermal pressure',
    dotSize: 8,
    ringSize: 30,
    ringBorderWidth: 2,
    lagSpeed: 0.12,
    trailLength: 7,
    dotColor: '#f97316',
    ringColor: '#ef4444',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    hoverScale: 1.8,
    clickScale: 1.3,
    dotStyle: 'dot',
    ringStyle: 'ring',
    trailStyle: 'dots'
  },
  {
    name: 'Frozen Glace',
    description: 'Subtle icy-blue frosted diamond geometry that glides gracefully',
    dotSize: 6,
    ringSize: 28,
    ringBorderWidth: 1.5,
    lagSpeed: 0.28,
    trailLength: 3,
    dotColor: '#38bdf8',
    ringColor: '#0ea5e9',
    glowColor: 'rgba(56, 189, 248, 0.2)',
    hoverScale: 1.5,
    clickScale: 0.5,
    dotStyle: 'dot',
    ringStyle: 'square',
    trailStyle: 'dots'
  },
  {
    name: 'Parchment Ink',
    description: 'Classic deep charcoal minimalist dot with dynamic high velocity drag',
    dotSize: 7,
    ringSize: 0,
    ringBorderWidth: 0,
    lagSpeed: 0.05,
    trailLength: 10,
    dotColor: '#1e293b',
    ringColor: '#475569',
    glowColor: 'transparent',
    hoverScale: 1.3,
    clickScale: 1.6,
    dotStyle: 'dot',
    ringStyle: 'none',
    trailStyle: 'dots'
  }
];

export default function CustomCursorGenerator() {
  // Core State
  const [dotSize, setDotSize] = useState<number>(6);
  const [ringSize, setRingSize] = useState<number>(26);
  const [ringBorderWidth, setRingBorderWidth] = useState<number>(2);
  const [lagSpeed, setLagSpeed] = useState<number>(0.15);
  const [trailLength, setTrailLength] = useState<number>(4);
  const [dotColor, setDotColor] = useState<string>('#ff007f');
  const [ringColor, setRingColor] = useState<string>('#00f0ff');
  const [glowColor, setGlowColor] = useState<string>('rgba(0, 240, 255, 0.4)');
  const [hoverScale, setHoverScale] = useState<number>(1.6);
  const [clickScale, setClickScale] = useState<number>(0.6);
  const [dotStyle, setDotStyle] = useState<'dot' | 'none' | 'crosshair'>('dot');
  const [ringStyle, setRingStyle] = useState<'ring' | 'square' | 'blur' | 'none'>('ring');
  const [trailStyle, setTrailStyle] = useState<'dots' | 'none'>('dots');

  // Interactive Viewport UI State
  const [isSiteWideActive, setIsSiteWideActive] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<string>('');
  const [activeCodeTab, setActiveCodeTab] = useState<'html-css' | 'react' | 'react-tailwind'>('html-css');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [hoverType, setHoverType] = useState<string>('');
  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);

  // Viewport-Only tracking
  const viewportRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isMouseInside, setIsMouseInside] = useState(false);

  // Smooth lerped coords for trail rendering
  const dotCoord = useRef({ x: -100, y: -100 });
  const ringCoord = useRef({ x: -100, y: -100 });
  const trailCoords = useRef<Array<{ x: number, y: number }>>([]);

  // Set up trail structures
  useEffect(() => {
    trailCoords.current = Array.from({ length: 15 }, () => ({ x: -100, y: -100 }));
  }, []);

  // Anim frame loop for smooth trail rendering (React handles coordinate triggers)
  const [renderCoordinates, setRenderCoordinates] = useState({
    dotX: -100, dotY: -100,
    ringX: -100, ringY: -100,
    trail: [] as Array<{ x: number, y: number }>
  });

  // Track global client body coordinates for site-wide preview
  const [globalMousePos, setGlobalMousePos] = useState({ x: -100, y: -100 });
  const globalDotCoord = useRef({ x: -100, y: -100 });
  const globalRingCoord = useRef({ x: -100, y: -100 });
  const globalTrailCoords = useRef<Array<{ x: number, y: number }>>([]);
  
  useEffect(() => {
    globalTrailCoords.current = Array.from({ length: 15 }, () => ({ x: -100, y: -100 }));
  }, []);

  const [globalRenderCoords, setGlobalRenderCoords] = useState({
    dotX: -100, dotY: -100,
    ringX: -100, ringY: -100,
    trail: [] as Array<{ x: number, y: number }>
  });

  // Continuous physics animation loop for smooth lagging interpolation (LERP)
  useEffect(() => {
    let animId: number;

    const tick = () => {
      // 1. Viewport Cursor Physics
      if (isMouseInside) {
        // Inner dot follows mouse immediately (no lag)
        dotCoord.current.x = mousePos.x;
        dotCoord.current.y = mousePos.y;

        // Outer ring follows mouse with delay (lerp)
        const targetSpeed = isHovered ? lagSpeed * 1.3 : lagSpeed;
        ringCoord.current.x += (mousePos.x - ringCoord.current.x) * targetSpeed;
        ringCoord.current.y += (mousePos.y - ringCoord.current.y) * targetSpeed;

        // Trail dots delay (lag chains)
        if (trailLength > 0) {
          // First trail point follows the ring
          globalTrailCoords.current[0].x += (mousePos.x - globalTrailCoords.current[0].x) * lagSpeed;
          globalTrailCoords.current[0].y += (mousePos.y - globalTrailCoords.current[0].y) * lagSpeed;
          
          let prevX = mousePos.x;
          let prevY = mousePos.y;

          for (let i = 0; i < trailLength; i++) {
            if (!trailCoords.current[i]) trailCoords.current[i] = { x: -100, y: -100 };
            
            // Each trail node flows toward the previous node
            const speedCoeff = lagSpeed * (1 - (i * 0.08));
            const clampedSpeed = Math.max(0.04, speedCoeff);
            
            trailCoords.current[i].x += (prevX - trailCoords.current[i].x) * clampedSpeed;
            trailCoords.current[i].y += (prevY - trailCoords.current[i].y) * clampedSpeed;
            
            prevX = trailCoords.current[i].x;
            prevY = trailCoords.current[i].y;
          }
        }
      }

      // 2. Global Site-wide Cursor Physics
      if (isSiteWideActive) {
        // Dot follows global mouse
        globalDotCoord.current.x = globalMousePos.x;
        globalDotCoord.current.y = globalMousePos.y;

        // Ring follows with lag
        globalRingCoord.current.x += (globalMousePos.x - globalRingCoord.current.x) * lagSpeed;
        globalRingCoord.current.y += (globalMousePos.y - globalRingCoord.current.y) * lagSpeed;

        // Trail nodes
        if (trailLength > 0) {
          let prevX = globalMousePos.x;
          let prevY = globalMousePos.y;

          for (let i = 0; i < trailLength; i++) {
            if (!globalTrailCoords.current[i]) globalTrailCoords.current[i] = { x: -100, y: -100 };
            
            const speedCoeff = lagSpeed * (1 - (i * 0.08));
            const clampedSpeed = Math.max(0.04, speedCoeff);
            
            globalTrailCoords.current[i].x += (prevX - globalTrailCoords.current[i].x) * clampedSpeed;
            globalTrailCoords.current[i].y += (prevY - globalTrailCoords.current[i].y) * clampedSpeed;
            
            prevX = globalTrailCoords.current[i].x;
            prevY = globalTrailCoords.current[i].y;
          }
        }
      }

      // Update states to drive styles smoothly
      setRenderCoordinates({
        dotX: dotCoord.current.x,
        dotY: dotCoord.current.y,
        ringX: ringCoord.current.x,
        ringY: ringCoord.current.y,
        trail: [...trailCoords.current.slice(0, trailLength)]
      });

      setGlobalRenderCoords({
        dotX: globalDotCoord.current.x,
        dotY: globalDotCoord.current.y,
        ringX: globalRingCoord.current.x,
        ringY: globalRingCoord.current.y,
        trail: [...globalTrailCoords.current.slice(0, trailLength)]
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [mousePos, globalMousePos, isMouseInside, isSiteWideActive, lagSpeed, trailLength, isHovered]);

  // Handle local viewport mouse position updating
  const handleViewportMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Handle global page mouse movement tracking
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setGlobalMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalMouseDown = () => setIsClicked(true);
    const handleGlobalMouseUp = () => setIsClicked(false);

    // Track active hover tags on interactive elements site-wide
    const handleGlobalMouseOver = (e: MouseOverEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    type MouseOverEvent = { target: EventTarget | null };

    if (isSiteWideActive) {
      // Hide default browser cursor
      document.body.style.cursor = 'none';
      const styleTag = document.createElement('style');
      styleTag.id = 'custom-cursor-body-override';
      styleTag.innerHTML = `
        * { cursor: none !important; }
        a, button, [role="button"], select, input, textarea { cursor: none !important; }
      `;
      document.head.appendChild(styleTag);

      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mousedown', handleGlobalMouseDown);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mouseover', handleGlobalMouseOver);
    }

    return () => {
      // Clean up body styles and classes on toggle off OR on unmount
      document.body.style.cursor = '';
      const styleTag = document.getElementById('custom-cursor-body-override');
      if (styleTag) styleTag.remove();

      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mousedown', handleGlobalMouseDown);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseover', handleGlobalMouseOver);
    };
  }, [isSiteWideActive]);

  // Clean-up active effects if the user changes tabs or reloads
  useEffect(() => {
    return () => {
      document.body.style.cursor = '';
      const styleTag = document.getElementById('custom-cursor-body-override');
      if (styleTag) styleTag.remove();
    };
  }, []);

  const loadPreset = (index: number) => {
    const p = CURSOR_PRESETS[index];
    setActivePresetIndex(index);
    setDotSize(p.dotSize);
    setRingSize(p.ringSize);
    setRingBorderWidth(p.ringBorderWidth);
    setLagSpeed(p.lagSpeed);
    setTrailLength(p.trailLength);
    setDotColor(p.dotColor);
    setRingColor(p.ringColor);
    setGlowColor(p.glowColor);
    setHoverScale(p.hoverScale);
    setClickScale(p.clickScale);
    setDotStyle(p.dotStyle);
    setRingStyle(p.ringStyle);
    setTrailStyle(p.trailStyle);
  };

  const resetControls = () => {
    loadPreset(0);
  };

  const triggerCopy = (codeKey: string, codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedText(codeKey);
    setTimeout(() => setCopiedText(''), 2000);
  };

  // Build reactive scale calculation
  const getScaleMultiplier = () => {
    let scale = 1;
    if (isHovered) scale *= hoverScale;
    if (isClicked) scale *= clickScale;
    return scale;
  };

  const calculatedRingSize = ringSize * getScaleMultiplier();
  const calculatedDotSize = dotSize * (isClicked ? clickScale : 1);

  // Generate CSS shadow/glow properties
  const getRingGlowStyle = () => {
    if (glowColor === 'transparent' || ringStyle === 'none') return {};
    if (ringStyle === 'blur') {
      return {
        boxShadow: `0 0 16px 4px ${glowColor}`,
        backgroundColor: glowColor
      };
    }
    return {
      boxShadow: `0 0 ${isHovered ? '15px' : '8px'} ${glowColor}`,
      borderColor: ringColor
    };
  };

  // Generate code segments for HTML/CSS
  const getHtmlCssCode = () => {
    const isSvgInlined = dotStyle !== 'none' || ringStyle !== 'none';
    
    return `/* === 1. HIDE NATIVE BROWSER CURSOR === */
html, body {
  cursor: none !important;
}
a, button, .interactive {
  cursor: none !important;
}

/* === 2. DECLARE CUSTOM CURSOR CONTAINER === */
.custom-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width 0.15s ease, height 0.15s ease, background-color 0.15s ease;
  will-change: transform;
}

/* === 3. DOT & RING ELEMENTS === */
.custom-cursor-dot {
  width: ${dotSize}px;
  height: ${dotSize}px;
  background-color: ${dotColor};
  border-radius: ${dotStyle === 'dot' ? '50%' : '0%'};
  display: ${dotStyle === 'none' ? 'none' : 'block'};
  position: fixed;
  pointer-events: none;
  z-index: 100000;
  transform: translate(-50%, -50%);
  will-change: transform;
}

.custom-cursor-ring {
  width: ${ringSize}px;
  height: ${ringSize}px;
  border: ${ringBorderWidth}px solid ${ringColor};
  border-radius: ${ringStyle === 'square' ? '8px' : '50%'};
  display: ${ringStyle === 'none' ? 'none' : 'block'};
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  background-color: ${ringStyle === 'blur' ? glowColor : 'transparent'};
  filter: ${ringStyle === 'blur' ? 'blur(8px)' : 'none'};
  box-shadow: ${glowColor !== 'transparent' ? `0 0 10px ${glowColor}` : 'none'};
  will-change: transform;
}

/* === 4. ACTIVE HOVER AND CLICK STATES === */
.body-hover-active .custom-cursor-ring {
  transform: translate(-50%, -50%) scale(${hoverScale});
  border-color: ${dotColor};
}

.body-click-active .custom-cursor-ring {
  transform: translate(-50%, -50%) scale(${clickScale});
}`;
  };

  const getReactTailwindCode = () => {
    return `import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursorTailwind() {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const ringRef = useRef({ x: -100, y: -100 });
  const [ringRender, setRingRender] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // LERP physics loop
  useEffect(() => {
    let frameId;
    const tick = () => {
      const targetSpeed = ${lagSpeed};
      ringRef.current.x += (coords.x - ringRef.current.x) * targetSpeed;
      ringRef.current.y += (coords.y - ringRef.current.y) * targetSpeed;
      
      setRingRender({ x: ringRef.current.x, y: ringRef.current.y });
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [coords]);

  const scale = (isHovering ? ${hoverScale} : 1) * (isClicked ? ${clickScale} : 1);

  return (
    <>
      <style>{\`
        html, body, a, button { cursor: none !important; }
      \`}</style>
      
      {/* 1. Core Pointer Dot */}
      <div 
        className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99999] transition-transform duration-75"
        style={{
          left: coords.x,
          top: coords.y,
          width: '${dotSize}px',
          height: '${dotSize}px',
          backgroundColor: '${dotColor}',
          borderRadius: '${dotStyle === 'dot' ? '9999px' : '0px'}',
          display: '${dotStyle === 'none' ? 'none' : 'block'}'
        }}
      />

      {/* 2. Lagging Outer Ring */}
      <div 
        className="fixed -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[99998] transition-all duration-105 ease-out"
        style={{
          left: ringRender.x,
          top: ringRender.y,
          width: '${ringSize}px',
          height: '${ringSize}px',
          border: '${ringBorderWidth}px solid ${ringColor}',
          backgroundColor: '${ringStyle === 'blur' ? '${glowColor}' : 'transparent'}',
          filter: '${ringStyle === 'blur' ? 'blur(8px)' : 'none'}',
          borderRadius: '${ringStyle === 'square' ? '8px' : '9999px'}',
          display: '${ringStyle === 'none' ? 'none' : 'block'}',
          transform: \`translate(-50%, -50%) scale(\${scale})\`,
          boxShadow: '${glowColor !== 'transparent' ? `0 0 10px ${glowColor}` : 'none'}'
        }}
      />
    </>
  );
}`;
  };

  const getReactCode = () => {
    return `import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [coords, setCoords] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  
  const ringRef = useRef({ x: -100, y: -100 });
  const [ringRender, setRingRender] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // LERP physics loop
  useEffect(() => {
    let frameId;
    const tick = () => {
      const targetSpeed = ${lagSpeed};
      ringRef.current.x += (coords.x - ringRef.current.x) * targetSpeed;
      ringRef.current.y += (coords.y - ringRef.current.y) * targetSpeed;
      
      setRingRender({ x: ringRef.current.x, y: ringRef.current.y });
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [coords]);

  const scale = (isHovering ? ${hoverScale} : 1) * (isClicked ? ${clickScale} : 1);

  return (
    <>
      <style>{\`
        html, body, a, button { cursor: none !important; }
      \`}</style>
      
      {/* 1. Core Pointer Dot */}
      <div 
        style={{
          position: 'fixed',
          left: coords.x,
          top: coords.y,
          width: '${dotSize}px',
          height: '${dotSize}px',
          backgroundColor: '${dotColor}',
          borderRadius: '${dotStyle === 'dot' ? '50%' : '0%'}',
          display: '${dotStyle === 'none' ? 'none' : 'block'}',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999
        }}
      />

      {/* 2. Lagging Outer Ring */}
      <div 
        style={{
          position: 'fixed',
          left: ringRender.x,
          top: ringRender.y,
          width: '${ringSize}px',
          height: '${ringSize}px',
          border: '${ringBorderWidth}px solid ${ringColor}',
          backgroundColor: '${ringStyle === 'blur' ? glowColor : 'transparent'}',
          filter: '${ringStyle === 'blur' ? 'blur(8px)' : 'none'}',
          borderRadius: '${ringStyle === 'square' ? '8px' : '50%'}',
          display: '${ringStyle === 'none' ? 'none' : 'block'}',
          transform: \`translate(-50%, -50%) scale(\${scale})\`,
          boxShadow: '${glowColor !== 'transparent' ? `0 0 10px ${glowColor}` : 'none'}',
          transition: 'transform 0.1s ease',
          pointerEvents: 'none',
          zIndex: 99998
        }}
      />
    </>
  );
}`;
  };

  return (
    <div className="animate-fade-in relative">
      
      {/* Presets and Site-Wide Trial Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
        <div className="lg:col-span-9">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-3 flex items-center gap-2 font-display">
            <Palette className="h-4 w-4 text-indigo-500" />
            Quick-Deploy Custom Cursor Presets
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {CURSOR_PRESETS.map((preset, index) => (
              <button
                key={preset.name}
                onClick={() => loadPreset(index)}
                className={`group relative text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${
                  activePresetIndex === index
                    ? 'border-indigo-600 bg-linear-to-b from-indigo-50/50 to-indigo-100/30 dark:from-indigo-950/40 dark:to-indigo-900/10 dark:border-indigo-450'
                    : 'border-slate-150 bg-white hover:border-slate-350 dark:border-slate-850 dark:bg-slate-950 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {preset.name}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    v0.{index + 1}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 p-4.5 rounded-3xl shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Monitor className="h-4 w-4 text-indigo-500 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-white font-display">Site-Wide Trial</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Experiment with your custom cursor across the entire browser app!
              </p>
            </div>
            <button
              onClick={() => setIsSiteWideActive(!isSiteWideActive)}
              className={`w-full py-2 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider font-display transition-all cursor-pointer ${
                isSiteWideActive
                  ? 'bg-red-500/20 hover:bg-red-500/30 text-red-550 dark:text-red-450 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                  : 'bg-indigo-660 hover:bg-indigo-600 text-white shadow-md border border-indigo-550'
              }`}
            >
              {isSiteWideActive ? '🛑 Remove Cursor' : '🟢 Activate Site-Wide'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-950 border-2 border-slate-150 dark:border-slate-850 rounded-3xl p-6 shadow-sm">
            
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-850">
              <div className="flex items-center gap-2">
                <Sliders className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
                  Cursor Formulators
                </h3>
              </div>
              <button 
                onClick={resetControls}
                className="p-1 px-2.5 rounded-lg text-[10px] font-bold text-slate-550 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-red-500 flex items-center gap-1 cursor-pointer transition-colors"
                title="Reset values to preset 1"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            {/* Pointer Core Point Style (Inner Component) */}
            <div className="mb-6">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5 font-display">
                Inner Pointer Point Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['dot', 'crosshair', 'none'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setDotStyle(style)}
                    className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider font-display border transition-all cursor-pointer ${
                      dotStyle === style
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-650 dark:text-slate-450'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Pointer Outer Ring/Shield Style */}
            <div className="mb-6">
              <label className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2.5 font-display">
                Outer Boundary Frame Style
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['ring', 'square', 'blur', 'none'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setRingStyle(style)}
                    className={`py-2 rounded-xl text-[11px] font-black uppercase tracking-wider font-display border transition-all cursor-pointer ${
                      ringStyle === style
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-650 dark:text-slate-450'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider parameters */}
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-850">
              
              {/* Inner Dot Dimension */}
              {dotStyle !== 'none' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      Inner Point Dimension
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {dotSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="22"
                    step="1"
                    value={dotSize}
                    onChange={(e) => setDotSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              )}

              {/* Outer Ring Dimension */}
              {ringStyle !== 'none' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      Outer Ring Dimension
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {ringSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    step="1"
                    value={ringSize}
                    onChange={(e) => setRingSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              )}

              {/* Ring Border Thickness */}
              {ringStyle !== 'none' && ringStyle !== 'blur' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      Outer Border Thickness
                    </span>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {ringBorderWidth}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={ringBorderWidth}
                    onChange={(e) => setRingBorderWidth(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              )}

              {/* Trail Multiplier length */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                    Snake Trail length Nodes
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {trailLength === 0 ? 'No Trail' : `${trailLength} dots`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={trailLength}
                  onChange={(e) => setTrailLength(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Laggard Speed multiplier */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                    Lagging Interpolation Speed
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {Math.round(lagSpeed * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.50"
                  step="0.01"
                  value={lagSpeed}
                  onChange={(e) => setLagSpeed(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Hover Reactive Amplification */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                    Button Hover Expansion Scale
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {hoverScale}x
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="2.5"
                  step="0.1"
                  value={hoverScale}
                  onChange={(e) => setHoverScale(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Click Reduction scale */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                    Click Reactive scale Multiplier
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {clickScale}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.0"
                  step="0.1"
                  value={clickScale}
                  onChange={(e) => setClickScale(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-150 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

            </div>

            {/* Colors customizing block */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-850 space-y-4">
              <label className="text-[11px] font-black uppercase tracking-wider text-slate-800 dark:text-white block font-display">
                Hex & Accent Colors
              </label>

              <div className="grid grid-cols-2 gap-4">
                {/* Dot color */}
                <div>
                  <span className="text-[10px] font-bold text-slate-450 uppercase block mb-1">
                    Inner Point Hex
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={dotColor}
                      onChange={(e) => setDotColor(e.target.value)}
                      className="cursor-pointer border border-transparent rounded bg-transparent w-8 h-8 p-0"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={dotColor}
                      onChange={(e) => setDotColor(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono font-bold text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>

                {/* Ring color */}
                <div>
                  <span className="text-[10px] font-bold text-slate-450 uppercase block mb-1">
                    Outer Boundary Hex
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={ringColor}
                      onChange={(e) => setRingColor(e.target.value)}
                      className="cursor-pointer border border-transparent rounded bg-transparent w-8 h-8 p-0"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={ringColor}
                      onChange={(e) => setRingColor(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-900 text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 font-mono font-bold text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              {/* Glow accent */}
              <div>
                <span className="text-[10px] font-bold text-slate-450 uppercase block mb-1">
                  Outer Sphere Aura Glow (Or Blur Background)
                </span>
                <div className="flex gap-2">
                  {[
                    { label: 'Cyan Glow', val: 'rgba(0, 240, 255, 0.4)' },
                    { label: 'Hot Pink', val: 'rgba(255, 0, 127, 0.4)' },
                    { label: 'Violet Glow', val: 'rgba(139, 92, 246, 0.4)' },
                    { label: 'Pure Green', val: 'rgba(16, 185, 129, 0.4)' },
                    { label: 'None', val: 'transparent' }
                  ].map((presetGlow) => (
                    <button
                      key={presetGlow.label}
                      onClick={() => setGlowColor(presetGlow.val)}
                      style={{ 
                        borderColor: glowColor === presetGlow.val ? ringColor : 'transparent' 
                      }}
                      className={`flex-1 text-[9px] font-extrabold uppercase py-1 border rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-display ${
                        glowColor === presetGlow.val 
                          ? 'text-indigo-650 dark:text-indigo-350' 
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {presetGlow.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW STAGE & CODE EXPORTERS */}
        <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-24">
          
          {/* Real-time Viewport Stage */}
          <div 
            ref={viewportRef}
            onMouseMove={handleViewportMouseMove}
            onMouseEnter={() => setIsMouseInside(true)}
            onMouseLeave={() => {
              setIsMouseInside(false);
              setIsHovered(false);
            }}
            onMouseDown={() => setIsClicked(true)}
            onMouseUp={() => setIsClicked(false)}
            className="group relative h-[360px] bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-inner flex flex-col justify-between p-6 transition-all"
            style={{ cursor: isMouseInside ? 'none' : 'default' }}
          >
            {/* Viewport Meta Indicator */}
            <div className="flex items-center justify-between w-full mb-4 z-10 select-none">
              <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-150 dark:border-slate-800">
                <Eye className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <span className="text-[9.5px] font-black uppercase tracking-wider font-display text-slate-850 dark:text-slate-300">
                  Interactive Live-Feel Stage
                </span>
              </div>
              <div className="text-[9px] font-mono font-bold bg-slate-200/60 dark:bg-slate-900/60 text-slate-500 py-1 px-2.5 rounded-lg">
                Cursor: {isMouseInside ? `X: ${Math.round(mousePos.x)} | Y: ${Math.round(mousePos.y)}` : 'OUTSIDE VIEWPORT'}
              </div>
            </div>

            {/* Hover Targets Playground Center */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 z-10 w-full select-none">
              {!isMouseInside && (
                <div className="flex flex-col items-center gap-2 pointer-events-none animate-bounce">
                  <MousePointer className="h-7 w-7 text-indigo-500" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 text-center font-display">
                    Move Mouse / Hover Inside To Trial
                  </span>
                </div>
              )}

              {isMouseInside && (
                <div className="flex flex-col items-center gap-3 w-full max-w-md">
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {/* Hover box A */}
                    <button
                      onMouseEnter={() => {
                        setIsHovered(true);
                        setHoverType('Button Link active transform scale');
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                        setHoverType('');
                      }}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 text-center transition-all duration-150 flex flex-col items-center justify-center gap-1 relative overflow-hidden group/target cursor-none"
                    >
                      <h4 className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-display">
                        HOVER TARGET
                      </h4>
                      <p className="text-[9.5px] text-slate-450 leading-relaxed max-w-[130px]">
                        Scales ring outer shield by {hoverScale}x
                      </p>
                    </button>

                    {/* Hover box B */}
                    <button
                      onMouseEnter={() => {
                        setIsHovered(true);
                        setHoverType('Aura high glow intensity');
                      }}
                      onMouseLeave={() => {
                        setIsHovered(false);
                        setHoverType('');
                      }}
                      className="p-5 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-600 text-white text-center transition-all duration-150 flex flex-col items-center justify-center gap-1 relative overflow-hidden shadow-md cursor-none"
                    >
                      <h4 className="text-xs font-black uppercase tracking-widest text-white font-display">
                        GLOW DOCK
                      </h4>
                      <p className="text-[9.5px] text-indigo-100 leading-relaxed max-w-[130px]">
                        Increases halo luminescence
                      </p>
                    </button>
                  </div>

                  {/* Press test zone */}
                  <div 
                    className="w-full py-4 text-center bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl uppercase tracking-wider text-[10.5px] font-black text-slate-500 font-display flex items-center justify-center gap-2"
                  >
                    <span>Click and Hold inside Viewport for reactive click compression 💡</span>
                  </div>
                </div>
              )}
            </div>

            {/* Viewport Footer Status */}
            <div className="flex justify-between items-center w-full mt-4 text-[9px] font-mono text-slate-400 z-10 select-none">
              <span>Status: {isClicked ? 'MOUSE_DOWN' : isHovered ? 'HOVERING_ELEMENT' : 'MOUSE_UP'}</span>
              <span>{hoverType ? `Event: ${hoverType}` : 'No Hover Events Registered'}</span>
            </div>

            {/* VIEWPORT CURSOR DEMO RENDERING (REPLACES HOST BROWSER CURSOR) */}
            {isMouseInside && (
              <>
                {/* Custom particle lagging dots trail rendering */}
                {trailStyle === 'dots' && trailLength > 0 && renderCoordinates.trail.map((pt, index) => {
                  // Decreasing bubble opacity and sizing for realistic snake wind-down
                  const orderFactor = (trailLength - index) / trailLength;
                  const ptSize = Math.max(2, dotSize * 0.7 * orderFactor);
                  const ptOpacity = 0.65 * orderFactor;

                  return (
                    <div
                      key={index}
                      style={{
                        left: pt.x,
                        top: pt.y,
                        width: `${ptSize}px`,
                        height: `${ptSize}px`,
                        backgroundColor: dotColor,
                        borderRadius: dotStyle === 'dot' ? '50%' : '0%',
                        opacity: ptOpacity,
                        pointerEvents: 'none',
                        position: 'absolute',
                        zIndex: 99990 - index,
                        transform: 'translate(-50%, -50%)',
                        willChange: 'transform'
                      }}
                    />
                  );
                })}

                {/* Lagging Outer Ring */}
                {ringStyle !== 'none' && (
                  <div
                    style={{
                      left: renderCoordinates.ringX,
                      top: renderCoordinates.ringY,
                      width: `${calculatedRingSize}px`,
                      height: `${calculatedRingSize}px`,
                      borderColor: ringColor,
                      borderWidth: `${ringBorderWidth}px`,
                      borderRadius: ringStyle === 'square' ? '8px' : '50%',
                      pointerEvents: 'none',
                      position: 'absolute',
                      zIndex: 99998,
                      transform: 'translate(-50%, -50%)',
                      transition: 'transform 0.08s ease-out, border-color 0.15s ease',
                      willChange: 'transform',
                      ...getRingGlowStyle()
                    }}
                  >
                    {/* Crosshair interior coordinates lines detail */}
                    {dotStyle === 'crosshair' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        <div className="w-[110%] h-[1px] bg-slate-400 absolute" />
                        <div className="h-[110%] w-[1px] bg-slate-400 absolute" />
                      </div>
                    )}
                  </div>
                )}

                {/* Direct Dot Pointer */}
                {dotStyle !== 'none' && (
                  <div
                    style={{
                      left: renderCoordinates.dotX,
                      top: renderCoordinates.dotY,
                      width: `${calculatedDotSize}px`,
                      height: `${calculatedDotSize}px`,
                      backgroundColor: dotColor,
                      borderRadius: dotStyle === 'dot' ? '50%' : '0%',
                      pointerEvents: 'none',
                      position: 'absolute',
                      zIndex: 99999,
                      transform: 'translate(-50%, -50%)',
                      willChange: 'transform'
                    }}
                  />
                )}
              </>
            )}
          </div>

        </div>
      </div>

      {/* Export Code Cards container */}
      <div className="mt-8 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm overflow-hidden animate-fade-in">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Box className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-md font-black uppercase tracking-wider font-display text-slate-800 dark:text-white">
              Export Custom Cursor
            </h3>
          </div>

          {/* Code format toggle buttons */}
          <div className="flex rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1">
            {[
              { id: 'html-css', label: 'HTML & CSS' },
              { id: 'react', label: 'React / TS' },
              { id: 'react-tailwind', label: 'React + Tailwind' }
            ].map((recipeTab) => (
              <button
                key={recipeTab.id}
                onClick={() => setActiveCodeTab(recipeTab.id as any)}
                className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider font-display rounded-lg transition-all cursor-pointer ${
                  activeCodeTab === recipeTab.id
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-705'
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
              if (activeCodeTab === 'html-css') textToCopy = getHtmlCssCode();
              if (activeCodeTab === 'react') textToCopy = getReactCode();
              if (activeCodeTab === 'react-tailwind') textToCopy = getReactTailwindCode();
              triggerCopy(activeCodeTab, textToCopy);
            }}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400 cursor-pointer transition-all z-10 flex items-center gap-1.5"
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
          <pre className="text-xs font-mono font-bold text-slate-300 text-left whitespace-pre select-all pt-4 leading-normal max-h-[350px] scrollbar-thin">
            {activeCodeTab === 'html-css' && getHtmlCssCode()}
            {activeCodeTab === 'react' && getReactCode()}
            {activeCodeTab === 'react-tailwind' && getReactTailwindCode()}
          </pre>
        </div>

        {/* Helper tips indicator block */}
        <div className="mt-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/40 dark:border-indigo-900/40 flex gap-3 text-slate-600 dark:text-slate-400 text-xs">
          <Info className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-slate-800 dark:text-slate-200">System Tip: </span>
            Custom cursors MUST define <code className="bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded font-bold text-indigo-600 dark:text-indigo-400">pointer-events: none</code> inside CSS, otherwise clicking interactive components like buttons will fail because the absolute element captures the mouse trigger vectors!
          </div>
        </div>

      </div>

      {/* GLOBAL CURSOR INJECTOR FOR ACTIVE TRIAL SESSIONS */}
      {isSiteWideActive && (
        <>
          {/* Custom Trail Nodes */}
          {trailStyle === 'dots' && trailLength > 0 && globalRenderCoords.trail.map((pt, idx) => {
            const factor = (trailLength - idx) / trailLength;
            const ptSize = Math.max(2, dotSize * 0.7 * factor);
            const ptOpacity = 0.65 * factor;

            return (
              <div
                key={`global-trail-${idx}`}
                style={{
                  left: pt.x,
                  top: pt.y,
                  width: `${ptSize}px`,
                  height: `${ptSize}px`,
                  backgroundColor: dotColor,
                  borderRadius: dotStyle === 'dot' ? '50%' : '0%',
                  opacity: ptOpacity,
                  pointerEvents: 'none',
                  position: 'fixed',
                  zIndex: 2147483640 - idx,
                  transform: 'translate(-50%, -50%)',
                  willChange: 'transform'
                }}
              />
            );
          })}

          {/* Outer Ring Element */}
          {ringStyle !== 'none' && (
            <div
              style={{
                left: globalRenderCoords.ringX,
                top: globalRenderCoords.ringY,
                width: `${calculatedRingSize}px`,
                height: `${calculatedRingSize}px`,
                borderColor: ringColor,
                borderWidth: `${ringBorderWidth}px`,
                borderRadius: ringStyle === 'square' ? '8px' : '50%',
                pointerEvents: 'none',
                position: 'fixed',
                zIndex: 2147483646,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
                transition: 'transform 0.08s ease-out',
                ...getRingGlowStyle()
              }}
            >
              {/* Target reticle decoration */}
              {dotStyle === 'crosshair' && (
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <div className="w-[110%] h-[1px] bg-slate-400 absolute" />
                  <div className="h-[110%] w-[1px] bg-slate-400 absolute" />
                </div>
              )}
            </div>
          )}

          {/* Core Pointer Dot */}
          {dotStyle !== 'none' && (
            <div
              style={{
                left: globalRenderCoords.dotX,
                top: globalRenderCoords.dotY,
                width: `${calculatedDotSize}px`,
                height: `${calculatedDotSize}px`,
                backgroundColor: dotColor,
                borderRadius: dotStyle === 'dot' ? '50%' : '0%',
                pointerEvents: 'none',
                position: 'fixed',
                zIndex: 2147483647,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform'
              }}
            />
          )}
        </>
      )}

    </div>
  );
}
