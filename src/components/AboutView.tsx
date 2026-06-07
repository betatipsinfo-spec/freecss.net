import React from 'react';
import { Type, Sparkles, LayoutGrid, Cpu, CheckCircle } from 'lucide-react';

interface AboutViewProps {
  brandName?: string;
  footerCopyrightName?: string;
}

export default function AboutView({ 
  brandName = 'FreeCSS',
  footerCopyrightName = 'cssfonts.net'
}: AboutViewProps) {
  return (
    <div id="about-page-view" className="py-8 font-sans max-w-4xl mx-auto">
      {/* Editorial Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-widest font-mono mb-4">
          <Sparkles className="h-3 w-3" /> Behind The Suite
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-display">
          About {brandName}
        </h1>
        <p className="text-base text-slate-500 dark:text-slate-400 mt-2 leading-relaxed font-normal">
          Learn about our mission to democratize typography customization, live preview systems, and standardized safe fallback fonts.
        </p>
      </div>

      <div className="space-y-10">
        {/* Core Vision Banner */}
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col md:flex-row gap-6 items-center">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30">
            <Type className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white font-display mb-2">
              Democratizing Frontend Presentation
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
              {brandName} ({footerCopyrightName}) was established to resolve a persistent challenge in frontend development: finding, configuring, and testing typography without heavy external files or complex stylesheets. We merge standard-compliant local fallback stacks with Google Web Fonts to let you optimize renders instantly.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-450 dark:text-slate-550 mb-6 font-mono">
            Key Pillars & Standards
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-indigo-650 dark:text-indigo-400 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white font-display mb-2">
                Pure Browser Processing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero processing in external databases or servers. Everything operates inside your personal sandbox, rendering typography natively via standard machine architectures for lightning speeds.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-indigo-650 dark:text-indigo-400 mb-4">
                <LayoutGrid className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white font-display mb-2">
                Rigorous Safety Indexing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Every web-safe font stack features custom operating system coverage scores (Windows, macOS, iOS, Android, Linux) verifying cross-platform compatibility prior to deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-8">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-450 dark:text-slate-550 mb-6 font-mono">
            Our Development Philosophy
          </h2>
          <ul className="space-y-3">
            {[
              'Performance First: Lean system-safe fallbacks keep website bundle sizes lightweight.',
              'Clean Generated Output: Copy-ready CSS syntax complete with font-family declared correctly.',
              'Open Access: 100% free web utilities with absolutely zero subscription barriers or visual overlays.',
              'Intuitive Controls: Granular text formatting toggles with modern responsive previews.'
            ].map((value, idx) => {
              const [boldText, regularText] = value.split(': ');
              return (
                <li key={idx} className="flex gap-3 text-xs text-slate-600 dark:text-slate-350 leading-relaxed items-start">
                  <CheckCircle className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900 dark:text-white uppercase font-display tracking-wide font-black text-[10px]">
                      {boldText}:
                    </strong>{' '}
                    {regularText}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact/Team Note */}
        <div className="p-6 rounded-2xl bg-slate-100/50 dark:bg-slate-900/30 text-center border border-slate-200 dark:border-slate-800/50 mt-12 font-mono text-xs">
          <span className="text-slate-500 dark:text-slate-400">
            Need further resources or custom design support? Check our{' '}
          </span>
          <a 
            href="https://templatemind.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Design Companions
          </a>
          <span className="text-slate-500 dark:text-slate-400"> for companion palettes, templates, and UI assets!</span>
        </div>
      </div>
    </div>
  );
}
