import React from 'react';
import { 
  Palette, 
  Layers, 
  Type, 
  Image, 
  Sliders, 
  ExternalLink, 
  Sparkles, 
  Smile, 
  Wand2, 
  ShieldAlert, 
  RefreshCw, 
  Crop, 
  Minimize2, 
  FileText, 
  User, 
  Paintbrush, 
  Camera 
} from 'lucide-react';

export default function CompanionTools() {
  const tools = [
    {
      title: 'Free Advance Font Generator',
      badge: 'Font Creator',
      url: 'https://genfonts.com/',
      description: 'Generate beautiful web-optimized custom Google fonts and visual text decorations for headers.',
      icon: Wand2,
      accentColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900/30',
      hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-800'
    },
    {
      title: 'Free Advance Color Palettes',
      badge: 'Pro Contrast',
      url: 'https://flatpalette.com/',
      description: 'A professional and clean flat UI palette suite offering high-contrast shades and developer hex codes.',
      icon: Sliders,
      accentColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/30',
      hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-800'
    },
    {
      title: 'Favicon Studio',
      badge: 'Assets Generator',
      url: 'https://faviconexpert.com/',
      description: 'Render and export perfect multi-size favicon bundles, .ico libraries, and iOS-safe touch shortcuts.',
      icon: Image,
      accentColor: 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/30 border-pink-100 dark:border-pink-900/30',
      hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-800'
    },
    {
      title: 'Free Resource UI',
      badge: 'Design Kit',
      url: 'https://templatemind.com/',
      description: 'Download highly polished developer wireframes, graphic templates, layouts, and boilerplate elements.',
      icon: Layers,
      accentColor: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-800'
    },
    {
      title: 'Image Watermarker',
      badge: 'Privacy Security',
      url: 'https://templatemind.com/tools/watermark',
      description: 'Secure, brand, and protect your design mockups and screens with quick web-only watermarks.',
      icon: ShieldAlert,
      accentColor: 'text-red-650 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/30',
      hoverBorder: 'hover:border-red-300 dark:hover:border-red-800'
    },
    {
      title: 'Image Converter',
      badge: 'Optimize Format',
      url: 'https://templatemind.com/tools/image-converter',
      description: 'Instantly convert images between WebP, PNG, JPEG, and SVG right inside your sandbox browser.',
      icon: RefreshCw,
      accentColor: 'text-violet-650 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900/30',
      hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-800'
    },
    {
      title: 'Image Cropper',
      badge: 'Design Ratio',
      url: 'https://templatemind.com/tools/image-cropper',
      description: 'Crop and scale layout pictures down into pristine shapes, dynamic banner ratios, or design sizes.',
      icon: Crop,
      accentColor: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900/30',
      hoverBorder: 'hover:border-teal-300 dark:hover:border-teal-800'
    },
    {
      title: 'Image Compressor',
      badge: 'Performance Boost',
      url: 'https://templatemind.com/tools/image-compressor',
      description: 'Shrink your heavy graphic sizes up to 90% without compromising visual clarity or layout resolution.',
      icon: Minimize2,
      accentColor: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30',
      hoverBorder: 'hover:border-amber-300 dark:hover:border-amber-800'
    },
    {
      title: 'Word Count',
      badge: 'Editor Tool',
      url: 'https://templatemind.com/tools/word-counter',
      description: 'Instantly measure sentences, reading pacing, paragraphs, and characters for editorial typography.',
      icon: FileText,
      accentColor: 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900/30',
      hoverBorder: 'hover:border-sky-300 dark:hover:border-sky-800'
    },
    {
      title: 'Profile Picture Maker',
      badge: 'Avatar Creator',
      url: 'https://templatemind.com/tools/profile-maker',
      description: 'Create perfect personal user avatars, round borders, and high-quality profiles for forums.',
      icon: User,
      accentColor: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border-rose-100 dark:border-rose-900/30',
      hoverBorder: 'hover:border-rose-300 dark:hover:border-rose-800'
    },
    {
      title: 'Fancy Font Generator',
      badge: 'Creative Styles',
      url: 'https://templatemind.com/tools/font-generator',
      description: 'Transform boring texts into fancy aesthetic scripts, cursive lines, and beautiful unicode styles.',
      icon: Type,
      accentColor: 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/30 border-fuchsia-100 dark:border-fuchsia-900/30',
      hoverBorder: 'hover:border-fuchsia-300 dark:hover:border-fuchsia-800'
    },
    {
      title: 'Free Icon Gallery',
      badge: 'SVG UI Elements',
      url: 'https://templatemind.com/tools/icons',
      description: 'Download and customize thousands of hand-crafted premium SVG vector icons for clean screens.',
      icon: Smile,
      accentColor: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border-orange-100 dark:border-orange-900/30',
      hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-850'
    },
    {
      title: 'Free Color Palettes',
      badge: 'Design Swatches',
      url: 'https://templatemind.com/tools/color-palettes',
      description: 'Explore trending color schemes, dynamic hex scales, and instant CSS color codes for websites.',
      icon: Palette,
      accentColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/30 border-cyan-100 dark:border-cyan-900/30',
      hoverBorder: 'hover:border-cyan-300 dark:hover:border-cyan-800'
    },
    {
      title: 'CSS Font Stacks',
      badge: 'Safe Fallbacks',
      url: 'https://templatemind.com/tools/css-fonts',
      description: 'Inspect safe local default system typeface fallback CSS declarations to speed up web environments.',
      icon: Type,
      accentColor: 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 border-violet-100 dark:border-violet-900/30',
      hoverBorder: 'hover:border-violet-300 dark:hover:border-violet-800'
    },
    {
      title: 'Gradient Generator',
      badge: 'CSS Backgrounds',
      url: 'https://templatemind.com/tools/gradients',
      description: 'Generate stunning linear, radial, and multi-color gradients with smooth CSS markup copied.',
      icon: Paintbrush,
      accentColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/30',
      hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-800'
    },
    {
      title: 'Screen Capture',
      badge: 'Interactive Mock',
      url: 'https://templatemind.com/tools/screenshot',
      description: 'A beautiful mockup frame capturing system for generating clean app marketing templates.',
      icon: Camera,
      accentColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/30',
      hoverBorder: 'hover:border-emerald-300 dark:hover:border-emerald-800'
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
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
