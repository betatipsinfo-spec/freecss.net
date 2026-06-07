import React, { useState } from 'react';
import { BookOpen, Copy, Check, Terminal, ExternalLink, Lightbulb, Code } from 'lucide-react';

interface CheatItem {
  id: string;
  title: string;
  desc: string;
  syntax: string;
  example: string;
}

export default function CheatSheet() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const cheatItems: CheatItem[] = [
    {
      id: 'font-family',
      title: 'Font Family stack syntax',
      desc: 'Sets the fallback sequence of fonts for selected elements. Specify multiple comma-separated names. Custom web fonts with spaces must be enveloped in double quotes.',
      syntax: 'font-family: [font-name], [fallback-font], [superfamily-category];',
      example: 'h1 {\n  font-family: "Playfair Display", Georgia, Times, serif;\n}'
    },
    {
      id: 'font-size',
      title: 'Font Size Units Guide',
      desc: 'Controls typography size. Common units: px (fixed screens), rem (root-relative, great for mobile responsiveness), em (parent-relative), and % (percentage of container scale).',
      syntax: 'font-size: [value][unit];',
      example: 'body {\n  font-size: 16px; /* standard fallback */\n}\n\np {\n  font-size: 1.125rem; /* ~18px with responsive root */\n}'
    },
    {
      id: 'font-weight',
      title: 'Font Weight numeric mapping',
      desc: 'Sets character line thickness. Map numeric values (100-900) or use standard terms: normal (400), medium (500), bold (700).',
      syntax: 'font-weight: [number-or-keyword];',
      example: '.card-hero {\n  font-weight: 800; /* ExtraBold density */\n  font-weight: bold; /* standard 700 falls back */\n}'
    },
    {
      id: 'font-style',
      title: 'Font Style & Postures',
      desc: 'Sets upright orientations. Supports normal, italic (using custom elegant visual slopes), or oblique (forced browser visual rotation).',
      syntax: 'font-style: [normal | italic | oblique];',
      example: 'figcaption {\n  font-style: italic;\n}'
    },
    {
      id: 'line-height',
      title: 'Line Height spacing multiplier',
      desc: 'Controls vertical height between lines of text. Best practice: use unitless decimal multipliers (e.g. 1.5) to keep line heights scale fluid with varied text sizes.',
      syntax: 'line-height: [decimal-value | px-value];',
      example: 'h1 {\n  line-height: 1.25; /* highly compact */\n}\n\narticle {\n  line-height: 1.6; /* comfortable body breathing */\n}'
    },
    {
      id: 'font-face',
      title: '@font-face Custom Embedding',
      desc: 'Loads external asset files from local folders directly. Allows web developers to render proprietary type formats (woff, woff2, ttf) on target machines seamlessly.',
      syntax: '@font-face { font-family: [name]; src: url([path]) format([format]); }',
      example: '@font-face {\n  font-family: "MyCustomSerif";\n  src: url("/fonts/my-serif.woff2") format("woff2"),\n       url("/fonts/my-serif.woff") format("woff");\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap; /* keep page legible quickly */\n}'
    },
    {
      id: 'font-display',
      title: 'Font Display loading strategies',
      desc: 'Tells the browser engine how to handle layout before the external Web Font asset. "swap" renders local fallback instantly and replaces it when loaded - eliminating blank screens.',
      syntax: 'font-display: [auto | block | swap | fallback | optional];',
      example: '/* Declared inside @font-face */\nfont-display: swap; /* Best practice standard */'
    },
    {
      id: 'shorthand',
      title: 'Universal font Shorthand syntax',
      desc: 'Shorthand property to configure style, variant, weight, size, line-height, and family in a single, unified declaration line. Family and size must be defined.',
      syntax: 'font: [style] [variant] [weight] [size]/[line-height] [family];',
      example: '.paragraph-short {\n  /* style | weight | size / line-height | family-stack */\n  font: italic bold 1.15rem/1.5 Arial, sans-serif;\n}'
    }
  ];

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Page header banner */}
      <div id="cheat-intro" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
          <BookOpen className="h-4.5 w-4.5 text-indigo-500" /> CSS Typography Code Cheat Sheet
        </h2>
        <p className="text-xs text-slate-550 dark:text-slate-400 max-w-3xl leading-relaxed">
          Quick interactive reference for web developers and designers. Copy CSS blocks directly into your stylesheet files to control rendering behaviors. Double check specifications below.
        </p>
      </div>

      {/* Tutorial grid list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cheatItems.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div
              key={item.id}
              id={`cheat-card-${item.id}`}
              className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-slate-350 dark:hover:border-slate-750 transition-colors group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-light pb-2">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 font-display">
                    <Code className="h-4 w-4 text-indigo-500" /> {item.title}
                  </h3>
                  <span className="text-[10px] font-mono font-medium tracking-wide bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-850/80 text-indigo-600 dark:text-indigo-400">
                    CSS Property
                  </span>
                </div>
                
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {item.desc}
                </p>

                {/* Syntax template block */}
                <div className="text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300 p-2.5 rounded-lg border border-indigo-100/30">
                  <span className="block text-[8px] uppercase tracking-wider text-slate-450 dark:text-slate-500 mb-1 font-bold">General Syntax</span>
                  {item.syntax}
                </div>
              </div>

              {/* Code Example block with copy capability */}
              <div className="mt-4 relative">
                <div className="flex items-center justify-between text-[10px] text-slate-450 dark:text-slate-500 mb-1 font-mono uppercase font-bold">
                  <span>Usage Example</span>
                  <button
                    onClick={() => handleCopyCode(item.id, item.example)}
                    className="flex items-center gap-1 hover:text-slate-850 dark:hover:text-slate-350 cursor-pointer transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Block</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] sm:text-xs font-mono bg-slate-900 text-indigo-100 p-3.5 rounded-xl block border border-slate-950 select-all overflow-x-auto whitespace-pre">
                  <code>{item.example}</code>
                </pre>
              </div>

            </div>
          );
        })}
      </div>

      {/* Learn more interactive link card */}
      <div className="bg-indigo-600 border border-indigo-750 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-y-8 translate-x-8 opacity-5">
          <BookOpen className="h-56 w-56 transform rotate-12" />
        </div>
        <div className="space-y-1.5 z-10 text-center sm:text-left">
          <h3 className="text-md font-bold tracking-tight">Need a complete guide on web layouts?</h3>
          <p className="text-xs text-indigo-100/80 max-w-xl leading-relaxed">
            Integrating robust, accessible styles is only half the work. We recommend utilizing online safe validators or browser extension inspect panels to observe layout spacing behaviors in various operating systems live!
          </p>
        </div>
        <div className="z-10 bg-white hover:bg-slate-50 text-indigo-600 px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-all h-fit self-center cursor-pointer">
          <a href="https://cssfonts.net" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 justify-center">
            Go to cssfonts.net <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
