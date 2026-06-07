import React, { useState } from 'react';
import { Laptop, Clipboard, Check, HelpCircle, ShieldAlert, Monitor, Info, Sparkles, Copy } from 'lucide-react';
import { SYSTEM_FONTS } from '../data/fontsData';
import { FontItem } from '../types';

export default function CompatibilityTable() {
  const [copiedFontId, setCopiedFontId] = useState<string | null>(null);

  const handleCopyStack = (f: FontItem) => {
    navigator.clipboard.writeText(`font-family: ${f.stack};`);
    setCopiedFontId(f.id);
    setTimeout(() => setCopiedFontId(null), 2000);
  };

  // Safe percentage styling class calculator
  const getScoreColorClass = (score: number) => {
    if (score >= 98) return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold';
    if (score >= 90) return 'bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 font-medium';
    if (score >= 75) return 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400';
    return 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400';
  };

  const getSafetyGrade = (overallScore: number) => {
    if (overallScore >= 98) return { label: 'A++', desc: 'Universally Safe' };
    if (overallScore >= 95) return { label: 'A', desc: 'Highly Safe' };
    if (overallScore >= 90) return { label: 'A-', desc: 'Safe Fallback Required' };
    if (overallScore >= 80) return { label: 'B', desc: 'Moderate Presence' };
    return { label: 'C', desc: 'Platform Specific' };
  };

  return (
    <div className="space-y-6">
      
      {/* Introduction Card */}
      <div id="comp-intro" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-md font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Monitor className="h-4.5 w-4.5 text-indigo-500" /> Windows & macOS OS Compatibility Index
          </h2>
          <p className="text-xs text-slate-550 dark:text-slate-400 max-w-2xl leading-relaxed">
            Web-safe fonts are those pre-installed on the vast majority of operating systems. This compatibility table provides a detailed statistical breakdown of coverage indexes across Windows, macOS, iOS, Android, and Linux. Ensure your typography fallback chains align with these distributions.
          </p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/20 px-4 py-3 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-700 dark:text-indigo-400 font-semibold shrink-0">
          ✨ 18+ Standards Evaluated
        </div>
      </div>

      {/* Compatibility Table Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div id="comp-table-container" className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">Font Block</th>
                <th className="py-4 px-4 text-center">Windows %</th>
                <th className="py-4 px-4 text-center">macOS %</th>
                <th className="py-4 px-4 text-center">iOS %</th>
                <th className="py-4 px-4 text-center">Android %</th>
                <th className="py-4 px-4 text-center">Linux %</th>
                <th className="py-4 px-4 text-center">Safety Grade</th>
                <th className="py-4 px-5 text-right w-[150px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-xs">
              {SYSTEM_FONTS.map((font) => {
                const grade = getSafetyGrade(font.safetyScore);
                const isCopied = copiedFontId === font.id;
                return (
                  <tr key={font.id} id={`comp-row-${font.id}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors">
                    
                    {/* Font detail name */}
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-900 dark:text-white mb-0.5">{font.name}</div>
                      <div className="text-[10px] font-mono text-slate-400 dark:text-slate-550 max-w-[220px] truncate" title={font.stack}>
                        {font.stack}
                      </div>
                    </td>

                    {/* Windows Column */}
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-mono ${getScoreColorClass(font.compatibility.windows)}`}>
                        {font.compatibility.windows}%
                      </span>
                    </td>

                    {/* macOS Column */}
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-mono ${getScoreColorClass(font.compatibility.macos)}`}>
                        {font.compatibility.macos}%
                      </span>
                    </td>

                    {/* iOS Column */}
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-mono ${getScoreColorClass(font.compatibility.ios)}`}>
                        {font.compatibility.ios}%
                      </span>
                    </td>

                    {/* Android Column */}
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-mono ${getScoreColorClass(font.compatibility.android)}`}>
                        {font.compatibility.android}%
                      </span>
                    </td>

                    {/* Linux Column */}
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-mono ${getScoreColorClass(font.compatibility.linux)}`}>
                        {font.compatibility.linux}%
                      </span>
                    </td>

                    {/* Safety Grade */}
                    <td className="py-4 px-4 text-center">
                      <div className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm">
                        {grade.label}
                      </div>
                      <div className="text-[9px] text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                        {grade.desc}
                      </div>
                    </td>

                    {/* Copy Snippet button */}
                    <td className="py-4 px-5 text-right">
                      <button
                        id={`comp-copy-btn-${font.id}`}
                        onClick={() => handleCopyStack(font)}
                        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500 shrink-0" />
                            <span className="text-[10px] text-emerald-500 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 shrink-0" />
                            <span className="text-[10px]">Copy CSS</span>
                          </>
                        )}
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive OS Fallback Wisdom Guideline block */}
      <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/70 dark:border-emerald-900/40 p-4 rounded-xl flex gap-3">
        <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
          <span className="font-semibold text-slate-800 dark:text-emerald-300">Advanced Fallback Practice:</span>
          <p className="mt-1">
            Always terminate a CSS <code className="font-mono bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">font-family</code> string with a generic backup superfamily descriptor (<code className="font-mono text-indigo-700 dark:text-indigo-300 bg-slate-100 dark:bg-slate-900 px-1 rounded">sans-serif</code>, <code className="font-mono text-indigo-700 dark:text-indigo-300 bg-slate-100 dark:bg-slate-900 px-1 rounded">serif</code>, or <code className="font-mono text-emerald-700 dark:text-emerald-300 bg-slate-100 dark:bg-slate-900 px-1 rounded">monospace</code>). If Windows or Mac users don't have the desired specialized typeface installed, the local graphics engine falls back onto the generic superfamily, keeping layouts pristine and readable.
          </p>
        </div>
      </div>

    </div>
  );
}
