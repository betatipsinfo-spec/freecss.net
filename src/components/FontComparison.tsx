import React, { useState } from 'react';
import { Columns, ArrowRightLeft, Info, HelpCircle } from 'lucide-react';
import { ALL_FONTS, SAMPLE_TEXTS } from '../data/fontsData';
import { FontItem } from '../types';

export default function FontComparison() {
  const [customText, setCustomText] = useState(
    "Comparison makes perfect: how does Arial read compared to Helvetica or Roboto?"
  );

  // Font A States
  const [fontA, setFontA] = useState<FontItem>(ALL_FONTS.find((f) => f.id === 'arial') || ALL_FONTS[0]);
  const [sizeA, setSizeA] = useState(24);
  const [weightA, setWeightA] = useState(400);
  const [lineHeightA, setLineHeightA] = useState(1.4);
  const [letterSpacingA, setLetterSpacingA] = useState(0);

  // Font B States
  const [fontB, setFontB] = useState<FontItem>(ALL_FONTS.find((f) => f.id === 'roboto') || ALL_FONTS[1]);
  const [sizeB, setSizeB] = useState(24);
  const [weightB, setWeightB] = useState(400);
  const [lineHeightB, setLineHeightB] = useState(1.4);
  const [letterSpacingB, setLetterSpacingB] = useState(0);

  // Helper to handle font A family update
  const handleFontAChange = (id: string) => {
    const font = ALL_FONTS.find((f) => f.id === id);
    if (font) {
      setFontA(font);
      if (!font.weights.includes(weightA)) {
        setWeightA(font.defaultWeight);
      }
    }
  };

  // Helper to handle font B family update
  const handleFontBChange = (id: string) => {
    const font = ALL_FONTS.find((f) => f.id === id);
    if (font) {
      setFontB(font);
      if (!font.weights.includes(weightB)) {
        setWeightB(font.defaultWeight);
      }
    }
  };

  return (
    <div className="space-y-6">

      {/* 1. Universal Input text bar */}
      <div id="compare-text-panel" className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
        <label htmlFor="comparison-text" className="block text-xs font-bold uppercase tracking-widest text-slate-405 dark:text-slate-500 font-display">
          Typography Double Tester text input
        </label>
        <textarea
          id="comparison-text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full text-xs font-bold uppercase tracking-wider px-4 py-3 border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 font-display"
          placeholder="Type any sentence or paragraph here to compare side by side..."
          rows={3}
        />
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {SAMPLE_TEXTS.map((t, i) => (
            <button
              key={t.label}
              id={`compare-preset-${i}`}
              onClick={() => setCustomText(t.text)}
              className="text-[10px] sm:text-xs px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 border border-slate-250 dark:border-slate-800 rounded-lg cursor-pointer font-bold uppercase font-display"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Side-By-Side Grid Layout */}
      <div id="compare-side-by-side" className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-display">

        {/* Font A Column */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5 justify-between">
          <div>
            {/* Controller Header A */}
            <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-850 pb-4 mb-4 gap-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-black text-xs font-display">
                A
              </span>
              <select
                id="compare-select-a"
                value={fontA.id}
                onChange={(e) => handleFontAChange(e.target.value)}
                className="w-full text-xs font-bold uppercase px-3 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white cursor-pointer"
              >
                {ALL_FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.isGoogleFont ? 'Google API' : 'Web Safe'})
                  </option>
                ))}
              </select>
            </div>

            {/* Micro Controls for A */}
            <div className="grid grid-cols-2 gap-4 bg-slate-50/50 dark:bg-slate-950/10 p-4 border border-light rounded-xl">
              
              {/* Font Size A */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 font-medium">
                  <span>Size</span>
                  <span className="font-mono">{sizeA}px</span>
                </div>
                <input
                  id="compare-size-slider-a"
                  type="range"
                  min="12"
                  max="70"
                  value={sizeA}
                  onChange={(e) => setSizeA(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 cursor-pointer rounded-lg appearance-none"
                />
              </div>

              {/* Line Height A */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 font-medium">
                  <span>Line Height</span>
                  <span className="font-mono">{lineHeightA}</span>
                </div>
                <input
                  id="compare-lineheight-slider-a"
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={lineHeightA}
                  onChange={(e) => setLineHeightA(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 cursor-pointer rounded-lg appearance-none"
                />
              </div>

              {/* Letter Spacing A */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 font-medium">
                  <span>Spacing</span>
                  <span className="font-mono">{letterSpacingA}px</span>
                </div>
                <input
                  id="compare-spacing-slider-a"
                  type="range"
                  min="-4"
                  max="12"
                  value={letterSpacingA}
                  onChange={(e) => setLetterSpacingA(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 cursor-pointer rounded-lg appearance-none"
                />
              </div>

              {/* Font Weight A selection buttons */}
              <div>
                <span className="block text-xs text-slate-500 mb-1 font-medium">Weight</span>
                <div className="flex flex-wrap gap-1">
                  {fontA.weights.map((w) => (
                    <button
                      key={w}
                      id={`compare-weight-btn-a-${w}`}
                      onClick={() => setWeightA(w)}
                      className={`text-[9px] px-2 py-1 border rounded-md cursor-pointer transition-all ${
                        weightA === w
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-slate-250 dark:bg-slate-900 border-slate-800 text-slate-600 dark:text-slate-350'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* A Canvas */}
            <div className="mt-5 border border-dashed border-slate-200 dark:border-slate-800 p-5 rounded-2xl min-h-[220px]">
              <p
                id="comparison-canvas-a"
                style={{
                  fontFamily: fontA.stack,
                  fontSize: `${sizeA}px`,
                  fontWeight: weightA,
                  lineHeight: lineHeightA,
                  letterSpacing: `${letterSpacingA}px`,
                  wordBreak: 'break-word',
                }}
                className="text-slate-950 dark:text-indigo-50"
              >
                {customText || 'Type double sentence.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-850 font-mono text-[10px] text-slate-400">
            <span>Fallback Family Stack A:</span>
            <div className="mt-1 font-light break-all px-2.5 py-1 bg-slate-50 dark:bg-slate-950 rounded text-slate-600 dark:text-slate-450 border border-slate-100 dark:border-slate-850">
              {fontA.stack}
            </div>
          </div>
        </div>

        {/* Font B Column */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-250 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col gap-5 justify-between">
          <div>
            {/* Controller Header B */}
            <div className="flex items-center justify-between border-b-2 border-slate-100 dark:border-slate-850 pb-4 mb-4 gap-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-black text-xs font-display">
                B
              </span>
              <select
                id="compare-select-b"
                value={fontB.id}
                onChange={(e) => handleFontBChange(e.target.value)}
                className="w-full text-xs font-bold uppercase px-3 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-white cursor-pointer"
              >
                {ALL_FONTS.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.isGoogleFont ? 'Google API' : 'Web Safe'})
                  </option>
                ))}
              </select>
            </div>

            {/* Micro Controls for B */}
            <div className="grid grid-cols-2 gap-4 bg-slate-550/5 p-4 border border-light rounded-xl">
              
              {/* Font Size B */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 font-medium">
                  <span>Size</span>
                  <span className="font-mono">{sizeB}px</span>
                </div>
                <input
                  id="compare-size-slider-b"
                  type="range"
                  min="12"
                  max="70"
                  value={sizeB}
                  onChange={(e) => setSizeB(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 cursor-pointer rounded-lg appearance-none"
                />
              </div>

              {/* Line Height B */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 font-medium">
                  <span>Line Height</span>
                  <span className="font-mono">{lineHeightB}</span>
                </div>
                <input
                  id="compare-lineheight-slider-b"
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.1"
                  value={lineHeightB}
                  onChange={(e) => setLineHeightB(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 cursor-pointer rounded-lg appearance-none"
                />
              </div>

              {/* Letter Spacing B */}
              <div>
                <div className="flex justify-between text-xs mb-1 text-slate-500 font-medium">
                  <span>Spacing</span>
                  <span className="font-mono">{letterSpacingB}px</span>
                </div>
                <input
                  id="compare-spacing-slider-b"
                  type="range"
                  min="-4"
                  max="12"
                  value={letterSpacingB}
                  onChange={(e) => setLetterSpacingB(parseInt(e.target.value))}
                  className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 cursor-pointer rounded-lg appearance-none"
                />
              </div>

              {/* Font Weight B Selection buttons */}
              <div>
                <span className="block text-xs text-slate-500 mb-1 font-medium">Weight</span>
                <div className="flex flex-wrap gap-1">
                  {fontB.weights.map((w) => (
                    <button
                      key={w}
                      id={`compare-weight-btn-b-${w}`}
                      onClick={() => setWeightB(w)}
                      className={`text-[9px] px-2 py-1 border rounded-md cursor-pointer transition-all ${
                        weightB === w
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-slate-250 dark:bg-slate-900 border-slate-800 text-slate-600 dark:text-slate-350'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* B Canvas */}
            <div className="mt-5 border border-dashed border-slate-200 dark:border-slate-800 p-5 rounded-2xl min-h-[220px]">
              <p
                id="comparison-canvas-b"
                style={{
                  fontFamily: fontB.stack,
                  fontSize: `${sizeB}px`,
                  fontWeight: weightB,
                  lineHeight: lineHeightB,
                  letterSpacing: `${letterSpacingB}px`,
                  wordBreak: 'break-word',
                }}
                className="text-slate-950 dark:text-indigo-50"
              >
                {customText || 'Type double sentence.'}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-850 font-mono text-[10px] text-slate-400">
            <span>Fallback Family Stack B:</span>
            <div className="mt-1 font-light break-all px-2.5 py-1 bg-slate-50 dark:bg-slate-950 rounded text-slate-600 dark:text-slate-450 border border-slate-100 dark:border-slate-850">
              {fontB.stack}
            </div>
          </div>
        </div>

      </div>

      {/* Comparison Wisdom Guidelines block */}
      <div className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/40 p-4 rounded-xl flex items-start gap-3">
        <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">
          <span className="font-semibold text-slate-800 dark:text-amber-200">Typography Comparison Metrics:</span>
          <p className="mt-1">
            When pairing or selecting typography, evaluate the <strong className="font-semibold text-slate-800 dark:text-slate-200">x-height</strong> (the size of standard lowercase characters relative to capitals) and <strong className="font-semibold text-slate-800 dark:text-slate-200">em-density</strong>. Fonts of identical pixel sizes often occupy substantially distinct visual widths. Adjust letter-spacing for wide serif bodies to maintain optimal screen alignments.
          </p>
        </div>
      </div>

    </div>
  );
}
