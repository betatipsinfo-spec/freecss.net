import React from 'react';
import { Type, ExternalLink, ShieldCheck, HelpCircle, Code, Settings } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  brandName?: string;
  brandLogoSymbol?: string;
  brandLogoUrl?: string;
  footerCopyrightName?: string;
  footerDescription?: string;
  footerAboutTitle?: string;
  footerAboutDescription?: string;
}

export default function Footer({ 
  setActiveTab,
  brandName = 'CSSFONTS',
  brandLogoSymbol = '✨',
  brandLogoUrl = '',
  footerCopyrightName = 'cssfonts.net',
  footerDescription = 'Interactive design suite for web typography. Preview standard and Google fonts, generate copy-to-clipboard clean CSS code, compare rendering side-by-side, and inspect universal web safety index scores.',
  footerAboutTitle = 'About CSSFonts',
  footerAboutDescription = 'This interactive suite is designed and published under premium guidelines. Optimized for lightning-fast styling with standard fallback stacks.',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 py-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 border border-slate-900 dark:border-white shadow-sm overflow-hidden">
                {brandLogoUrl ? (
                  <img src={brandLogoUrl} alt="Logo" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-xs font-bold font-display">{brandLogoSymbol}</span>
                )}
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display uppercase">
                {brandName}
              </span>
              <span className="text-[9px] font-medium bg-slate-250 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded">
                .net
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {footerDescription}
            </p>
          </div>

          {/* Core Tools links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-display">
              Typography Tools
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('styler')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Interactive Font Styler
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('directory')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Comprehensive Font Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compare')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  Side-By-Side Comparer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('compatibility')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  OS & Device Compatibility Index
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('cheatsheet')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                  CSS Typography Cheat Sheet
                </button>
              </li>
            </ul>
          </div>

          {/* Quick-Use CSS Reference */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-display">
              Standard Stacks
            </h3>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400 font-mono">
              <li className="truncate">
                <span className="text-slate-450 dark:text-slate-500">Sans-Serif:</span> Arial, Helvetica, sans-serif
              </li>
              <li className="truncate">
                <span className="text-slate-450 dark:text-slate-500">Serif:</span> Georgia, serif
              </li>
              <li className="truncate">
                <span className="text-slate-450 dark:text-slate-500">Monospace:</span> Courier New, monospace
              </li>
              <li className="truncate">
                <span className="text-slate-450 dark:text-slate-500">Cursive:</span> Pacifico, cursive
              </li>
            </ul>
          </div>

          {/* Developer Contact & Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-display">
              {footerAboutTitle}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              {footerAboutDescription}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
              <span>Primary Host:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {footerCopyrightName}
              </span>
            </div>
            <div className="text-slate-400 dark:text-slate-650 text-[11px] mt-1 font-mono">
              (Live CSS Typography Customizer)
            </div>
            

          </div>

        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-450 dark:text-slate-500">
          <p>
            &copy; {currentYear} <span className="font-semibold text-slate-700 dark:text-slate-350">{footerCopyrightName}</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 sm:mt-0 font-medium justify-center sm:justify-end">
            <a href="#styler" onClick={(e) => { e.preventDefault(); setActiveTab('styler'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-850 dark:hover:text-slate-300 transition-colors">Styler</a>
            <a href="#directory" onClick={(e) => { e.preventDefault(); setActiveTab('directory'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-850 dark:hover:text-slate-300 transition-colors">Catalog</a>
            <a href="#compatibility" onClick={(e) => { e.preventDefault(); setActiveTab('compatibility'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-850 dark:hover:text-slate-300 transition-colors">OS Scores</a>
            <a href="#cheatsheet" onClick={(e) => { e.preventDefault(); setActiveTab('cheatsheet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-850 dark:hover:text-slate-300 transition-colors">Cheat Sheet</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors">About</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); setActiveTab('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors">Privacy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); setActiveTab('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
