import React from 'react';
import { Palette, Layers, Type, Image, Sliders, ExternalLink, Sparkles, Smile } from 'lucide-react';

export default function CompanionTools() {
  const tools = [
    {
      title: 'Free Icon Gallery',
      badge: 'Icons & Vectors',
      url: 'https://templatemind.com/tools/icons',
      description: 'Download and customize thousands of hand-crafted premium SVG icons optimized for UI/UX projects.',
      icon: Smile,
      accentColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/30',
      hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-800'
    },
    {
      title: 'Free Color Palettes',
      badge: 'Palette Studio',
      url: 'https://templatemind.com/tools/color-palettes',
      description: 'Explore trending color schemes, dynamic hex scales, and instant generator palettes for interfaces.',
      icon: Palette,
      accentColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30',
      hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-800'
    },
    {
      title: 'Advanced Color Palettes',
      badge: 'Pro Contrast Swatches',
      url: 'https://flatpalette.com/',
      description: 'A professional and clean flat UI palette suite offering high-contrast shades and developer codes directly.',
      icon: Sliders,
      accentColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/30',
      hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-800'
    },
    {
      title: 'Free UI Resources',
      badge: 'Design Kit assets',
      url: 'https://templatemind.com/',
      description: 'Download highly polished developer wireframes, graphic templates, layouts, and boilerplate elements.',
      icon: Layers,
      accentColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-800'
    },
    {
      title: 'CSS Font Stacks',
      badge: 'Safe Local Fallbacks',
      url: 'https://templatemind.com/tools/css-fonts',
      description: 'Inspect safe local default system typeface fallback codes to reduce load speeds and dependencies.',
      icon: Type,
      accentColor: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900/30',
      hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-800'
    },
    {
      title: 'Favicon Studio',
      badge: 'Icon Generator',
      url: 'https://faviconexpert.com/',
      description: 'Render and export perfect multi-size favicon bundles, .ico libraries, and iOS-safe touch shortcuts.',
      icon: Image,
      accentColor: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/30 border-pink-100 dark:border-pink-900/30',
      hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-800'
    }
  ];

  return (
    <div id="companion-designer-tools-section" className="mt-16 pt-12 border-t-2 border-slate-200 dark:border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-widest font-mono">
            <Sparkles className="h-3 w-3" /> Companion Utilities
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-display mt-2.5">
            More Professional Creative Tools
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Boost your product development speed with free design resources, palettes, icons, and safe font stacks curated specifically for web designers and front-end developers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, idx) => {
          const IconComponent = tool.icon;
          return (
            <a
              key={idx}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`companion-card-${idx}`}
              className={`group flex flex-col justify-between p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all duration-250 hover:shadow-lg hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-slate-900 ${tool.hoverBorder} cursor-pointer`}
            >
              <div>
                <div className="flex items-center justify-between gap-2.5 mb-4">
                  <div className={`p-2 rounded-xl border flex items-center justify-center ${tool.accentColor}`}>
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900/70 text-slate-505 dark:text-slate-400 border border-slate-200 dark:border-slate-800 font-mono">
                    {tool.badge}
                  </span>
                </div>
                
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white font-display group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-850/60 font-mono text-[10px] text-slate-450 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                <span className="truncate max-w-[180px]">{tool.url.replace('https://', '')}</span>
                <span className="flex items-center gap-1 font-bold font-display uppercase tracking-wider text-[9px] text-indigo-600 dark:text-indigo-400 opacity-80 group-hover:opacity-100">
                  VISIT TOOL <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
