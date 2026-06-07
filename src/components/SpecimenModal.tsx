import React, { useState, useEffect, useRef } from 'react';
import { X, Printer, Image, RefreshCw, Check, Type, ArrowRight, Sparkles } from 'lucide-react';
import { FontItem, StyleState } from '../types';

interface SpecimenModalProps {
  isOpen: boolean;
  onClose: () => void;
  font: FontItem;
  styleState: StyleState;
}

export default function SpecimenModal({ isOpen, onClose, font, styleState }: SpecimenModalProps) {
  const [themeMode, setThemeMode] = useState<'cream' | 'midnight'>('cream');
  const [heroPhrase, setHeroPhrase] = useState<string>('The quick brown fox jumps over the lazy dog.');
  const [licenseText, setLicenseText] = useState<string>('freecss.net license');
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [imageSuccess, setImageSuccess] = useState<boolean>(false);
  
  // Custom scroll lock on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const fontStack = font.stack;
  const uppercaseLetters = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
  const lowercaseLetters = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
  const numbersAndSymbols = '0 1 2 3 4 5 6 7 8 9  ! @ # $ % ^ & * ( ) _ + - = [ ] { } ; : \' " , . < > ? /';
  const sampleParagraph = 'This specimen demonstrates the spacing, weight distribution, and legibility of this typeface. Typographic alignment forms a critical baseline for visual systems on screens. A balanced hierarchy pairs large expressive headers with tight tracking and lets body copy flow with ample line-height for effortless scanning.';

  // Trigger browser print to save PDF
  const handlePrintPDF = () => {
    window.print();
  };

  // Generate high-resolution specimen poster PNG
  const handleDownloadPNG = async () => {
    setIsGeneratingImage(true);
    setImageSuccess(false);

    try {
      // Create a high-res canvas (1200x1600 px for print ready)
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1600;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2D canvas context');

      // Make sure the selected font load is registered on the canvas
      await document.fonts.ready;

      // Theme color metrics
      const isCream = themeMode === 'cream';
      const bgColor = isCream ? '#FBF9F4' : '#0B0F19';
      const textColor = isCream ? '#1E293B' : '#E2E8F0';
      const secondaryColor = isCream ? '#475569' : '#94A3B8';
      const accentColor = '#6366f1'; // Violet-500
      const gridColor = isCream ? '#E2E8F0' : '#1E293B';

      // 1. Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw aesthetic poster margins and grid structures (editorial look)
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      
      const margin = 60;
      // Border lines
      ctx.strokeRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2);
      
      // Horizontal grid lines partitioning the poster
      const ySplit1 = 340; // Title & Aa Block
      const ySplit2 = 580; // Character Glyphs
      const ySplit3 = 1140; // Hierarchy specimen
      const ySplit4 = 1430; // Custom phrase & metadata (last block)

      ctx.beginPath();
      ctx.moveTo(margin, ySplit1); ctx.lineTo(canvas.width - margin, ySplit1);
      ctx.moveTo(margin, ySplit2); ctx.lineTo(canvas.width - margin, ySplit2);
      ctx.moveTo(margin, ySplit3); ctx.lineTo(canvas.width - margin, ySplit3);
      ctx.moveTo(margin, ySplit4); ctx.lineTo(canvas.width - margin, ySplit4);
      
      // Vertical grid lines
      const xSplit = 320;
      ctx.moveTo(xSplit, margin); ctx.lineTo(xSplit, ySplit1); // Splits Header block
      ctx.stroke();

      // 3. Header Block Left: Massive "Aa" glyph
      ctx.fillStyle = accentColor;
      ctx.font = `normal 200px ${fontStack}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Aa', margin + (xSplit - margin) / 2, margin + (ySplit1 - margin) / 2);

      // 4. Header Block Right: Font Name and metadata
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      // Small caps subheadline
      ctx.fillStyle = secondaryColor;
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('STANDARD TYPOGRAPHIC SPECIMEN', xSplit + 30, margin + 25);

      // Font Name
      ctx.fillStyle = textColor;
      ctx.font = `black 52px ${fontStack}`;
      ctx.fillText(font.name, xSplit + 30, margin + 45);

      // Category / Tech specs
      ctx.fillStyle = accentColor;
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      ctx.fillText(`CATEGORY: ${font.category.toUpperCase()} | CLASSIFICATION: ${font.isGoogleFont ? 'GOOGLE FONTS' : 'SYSTEM-SAFE'}`, xSplit + 30, margin + 115);

      // Description text
      ctx.fillStyle = secondaryColor;
      ctx.font = `italic 14px ${fontStack}`;
      const descLines = [];
      const words = font.description.split(' ');
      let currentDescLine = '';
      const maxDescWidth = canvas.width - xSplit - margin - 60;
      
      ctx.font = `italic 14px ${fontStack}`;
      for (const w of words) {
        const test = currentDescLine ? `${currentDescLine} ${w}` : w;
        if (ctx.measureText(test).width > maxDescWidth) {
          descLines.push(currentDescLine);
          currentDescLine = w;
        } else {
          currentDescLine = test;
        }
      }
      descLines.push(currentDescLine);

      let textY = margin + 145;
      descLines.slice(0, 5).forEach((line) => {
        ctx.fillText(line, xSplit + 30, textY);
        textY += 22;
      });

      // 5. Glyphs Block (Uppercase, Lowercase, Numbers)
      ctx.fillStyle = secondaryColor;
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText('01  GLYPH SETS (LATIN STANDARD CHARACTER MAPS)', margin + 30, ySplit1 + 25);

      // Uppercase letters
      ctx.fillStyle = textColor;
      ctx.font = `normal 20px ${fontStack}`;
      ctx.fillText('ABCDEFGHIJKLMNOPQRSTUVWXYZ', margin + 30, ySplit1 + 55);

      // Lowercase letters
      ctx.font = `normal 19px ${fontStack}`;
      ctx.fillText('abcdefghijklmnopqrstuvwxyz', margin + 30, ySplit1 + 100);

      // Numbers and Symbols
      ctx.fillStyle = secondaryColor;
      ctx.font = `normal 18px ${fontStack}`;
      ctx.fillText(numbersAndSymbols, margin + 30, ySplit1 + 145);

      // 6. Typographic Hierarchy Steps Block
      ctx.fillStyle = secondaryColor;
      ctx.font = 'bold 11px "JetBrains Mono", monospace';
      ctx.fillText('02  SCALE HIERARCHY RENDERING & PROPORTIONS', margin + 30, ySplit2 + 25);

      // Main big display preview
      ctx.fillStyle = textColor;
      ctx.font = `bold 44px ${fontStack}`;
      ctx.fillText(heroPhrase.substring(0, 42), margin + 30, ySplit2 + 65);

      // Secondary subheading
      ctx.font = `bold 28px ${fontStack}`;
      ctx.fillText('Proportion, Spacing and Typographic Baseline Scale', margin + 30, ySplit2 + 130);

      // Small heading
      ctx.font = `normal 18px ${fontStack}`;
      ctx.fillText('Universal interfaces utilize crisp visual geometry for balance.', margin + 30, ySplit2 + 185);

      // Body copy block
      ctx.fillStyle = secondaryColor;
      ctx.font = `normal 14px ${fontStack}`;
      
      const wrapTextHelper = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const textWords = text.split(' ');
        let currentLine = '';
        let lineY = y;

        for (const word of textWords) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth) {
            ctx.fillText(currentLine, x, lineY);
            currentLine = word;
            lineY += lineHeight;
          } else {
            currentLine = testLine;
          }
        }
        ctx.fillText(currentLine, x, lineY);
      };

      wrapTextHelper(sampleParagraph, margin + 30, ySplit2 + 230, canvas.width - margin * 2 - 60, 24);

      // 7. Core styles specs (Weights grid)
      ctx.fillStyle = secondaryColor;
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText('03  SUPPORTED STYLES & ACCESSIBILITY baselines', margin + 30, ySplit3 + 25);

      // Draw some weights indicators
      const testWeights = font.weights.length > 0 ? font.weights : [300, 400, 500, 700];
      let weightX = margin + 30;
      testWeights.forEach((wt) => {
        ctx.fillStyle = gridColor;
        ctx.fillRect(weightX, ySplit3 + 50, 150, 55);

        ctx.fillStyle = textColor;
        ctx.font = `${wt} 20px ${fontStack}`;
        ctx.fillText('Baselines', weightX + 15, ySplit3 + 70);

        ctx.fillStyle = accentColor;
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillText(`WEIGHT: ${wt}`, weightX + 15, ySplit3 + 92);
        
        weightX += 175;
      });

      // Show web safety rating
      ctx.fillStyle = textColor;
      ctx.font = `normal 13px ${fontStack}`;
      const safetyDesc = `This font has an architecture safety score of ${font.safetyScore}%. Devices support standard stacks native to ${font.category} fallbacks automatically in stylesheet code.`;
      wrapTextHelper(safetyDesc, margin + 30, ySplit3 + 135, canvas.width - margin * 2 - 60, 20);

      // 8. Footer credits in last block
      ctx.fillStyle = secondaryColor;
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText(`FONTSTYLER® CHRONO PLAYGROUND SPECIMEN  |  CLASSIFICATION ${font.category.toUpperCase()}  |  LICENSE: ${licenseText.toUpperCase()}`, margin + 30, ySplit4 + 35);
      
      const compileDate = new Date().toISOString().substring(0, 10);
      ctx.textAlign = 'right';
      ctx.fillText(`SYSTEM EXPORTED: ${compileDate}  |  DESIGNED BY GOOGLE AI STUDIO APPLET`, canvas.width - margin - 30, ySplit4 + 35);

      // 9. Process download
      const dataUrl = canvas.toDataURL('image/png');
      const element = document.createElement('a');
      element.download = `specimen-${font.id}-${themeMode}.png`;
      element.href = dataUrl;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setImageSuccess(true);
      setTimeout(() => setImageSuccess(false), 3000);
    } catch (e) {
      console.error('Failed to generate high-resolution canvas poster:', e);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div id="specimen-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-md animate-fade-in print:hidden">
      
      {/* Dynamic Printing Style Segment Injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-specimen-root, #print-specimen-root * {
            visibility: visible !important;
          }
          #print-specimen-root {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: 100% !important;
            visibility: visible !important;
            background-color: white !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 2.5cm !important;
            box-sizing: border-box !important;
          }
          @page {
            size: letter;
            margin: 0;
          }
        }
      `}} />

      {/* Hidden container styled exclusively for the high-end PDF output driver browser print */}
      <div id="print-specimen-root" className="hidden print:block bg-white text-slate-900 leading-relaxed max-w-4xl" style={{ fontFamily: fontStack }}>
        <div className="border-b-2 border-slate-900 pb-6 mb-8 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block font-mono">Typographic Specimen Archive</span>
            <h1 className="text-5xl font-black tracking-tight mt-1">{font.name}</h1>
            <p className="text-xs text-indigo-650 font-bold uppercase tracking-widest mt-1 font-mono">Category: {font.category} / Classification: {font.isGoogleFont ? 'Google CSS Webfont' : 'Local Native Stack'}</p>
            {licenseText && (
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1 font-mono">License: {licenseText}</p>
            )}
          </div>
          <p className="text-8xl font-thin tracking-tighter opacity-80 select-none">Aa</p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-10">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 font-mono">01. Summary Description</h3>
            <p className="text-sm italic text-slate-700 leading-relaxed italic max-w-2xl font-light">"{font.description}"</p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 font-mono">02. Character Mapping (Standard Latin glyph fields)</h3>
            <div className="space-y-4">
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mb-1">Uppercase letters:</span>
                <p className="text-lg tracking-wider font-light">{uppercaseLetters}</p>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mb-1">Lowercase letters:</span>
                <p className="text-lg tracking-wider font-light">{lowercaseLetters}</p>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mb-1">Numbers & Symbols:</span>
                <p className="text-md tracking-widest font-mono font-light">{numbersAndSymbols}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 font-mono">03. Visual Scale Scale Hierarchy System</h3>
            <div className="space-y-6">
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mb-1">Display Headings (48px / Bold)</span>
                <h2 className="text-4xl font-extrabold tracking-tight" style={{ fontWeight: styleState.fontWeight }}>{heroPhrase}</h2>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mb-1">Article Headers (24px / Medium)</span>
                <p className="text-2xl font-semibold leading-snug">{heroPhrase}</p>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mb-1">Paragraph Prose (14px / Regular)</span>
                <p className="text-sm leading-relaxed text-slate-800 font-light max-w-3xl">{sampleParagraph}</p>
              </div>
              <div>
                <span className="block text-[9px] font-bold text-slate-400 uppercase font-mono mb-1">Micro Caption Metadata (11px)</span>
                <p className="text-[11px] leading-relaxed text-slate-500 font-mono">Family Stack: {font.stack} | Safety Rating: {font.safetyScore}% | Preset Weights Available: {font.weights.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-slate-900 pt-4 mt-12 flex justify-between text-[10px] font-mono text-slate-400 uppercase">
          <span>Web Typography Playground — Specimen Sheets</span>
          <span>Date Generated: {new Date().toISOString().substring(0, 10)}</span>
        </div>
      </div>


      {/* Modal Dialog container mockup */}
      <div className="bg-slate-50 dark:bg-slate-900 w-full max-w-5xl h-[90vh] flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden animate-zoom-in">
        
        {/* Modal Top Header panel */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-white dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="py-1 px-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/40 dark:border-indigo-900/40 text-[10px] uppercase font-bold tracking-wider font-display shrink-0">
              <Sparkles className="h-3 w-3 inline-block -translate-y-0.5 mr-1" /> Premium Specimen Tool
            </div>
            <h2 className="text-xs sm:text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider font-display">
              Specimen Generator: <span className="text-indigo-600 dark:text-indigo-400">{font.name}</span>
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 px-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors pointer-cursor"
            title="Close Specimen Preview"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Modal controls and live settings toolbar */}
        <div className="px-6 py-3.5 bg-slate-100/50 dark:bg-slate-950/20 border-b border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-3 shrink-0 items-center">
          
          {/* Custom sentence selector input */}
          <div className="md:col-span-4 flex items-center gap-2">
            <span className="shrink-0 text-[10px] uppercase font-bold tracking-widest text-slate-505 font-display">Specimen Phrase:</span>
            <input
              type="text"
              value={heroPhrase}
              onChange={(e) => setHeroPhrase(e.target.value)}
              placeholder="Type specimen words..."
              className="w-full text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* License specification input */}
          <div className="md:col-span-3 flex items-center gap-2">
            <span className="shrink-0 text-[10px] uppercase font-bold tracking-widest text-slate-505 font-display">License:</span>
            <input
              id="specimen-license-input"
              type="text"
              value={licenseText}
              onChange={(e) => setLicenseText(e.target.value)}
              placeholder="e.g., freecss.net license"
              className="w-full text-xs font-semibold px-ok.5 py-1.5 rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-505"
            />
          </div>

          {/* Theme switcher */}
          <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
            <span className="shrink-0 text-[10px] uppercase font-bold tracking-widest text-slate-500 font-display">Poster Vibe:</span>
            <div className="inline-flex rounded-lg p-0.5 bg-slate-200/70 dark:bg-slate-950 border border-slate-200 dark:border-slate-850">
              <button
                onClick={() => setThemeMode('cream')}
                className={`text-[9px] tracking-wide font-extrabold uppercase py-1 px-2 rounded-md cursor-pointer transition-all ${
                  themeMode === 'cream'
                    ? 'bg-white shadow-xs text-slate-850'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-705'
                }`}
              >
                Cream
              </button>
              <button
                onClick={() => setThemeMode('midnight')}
                className={`text-[9px] tracking-wide font-extrabold uppercase py-1 px-2 rounded-md cursor-pointer transition-all ${
                  themeMode === 'midnight'
                    ? 'bg-slate-800 dark:bg-slate-900 shadow-xs text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-705'
                }`}
              >
                Dark
              </button>
            </div>
          </div>

          {/* Download/Print CTA actions */}
          <div className="md:col-span-3 flex items-center gap-1.5 justify-end">
            {/* Downloader trigger image */}
            <button
              onClick={handleDownloadPNG}
              disabled={isGeneratingImage}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white rounded-xl transition-all cursor-pointer font-display shadow-xs ${
                isGeneratingImage
                  ? 'bg-slate-400 dark:bg-slate-800 cursor-not-allowed'
                  : imageSuccess
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-indigo-650 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700'
              }`}
            >
              {isGeneratingImage ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  Drawing...
                </>
              ) : imageSuccess ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Saved PNG!
                </>
              ) : (
                <>
                  <Image className="h-3.5 w-3.5" />
                  Exporter Poster Image
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Scrollable Preview Grid mock */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-200/50 dark:bg-slate-950/80 flex items-start justify-center">
          
          <div
            id="modal-specimen-viewport"
            className={`w-full max-w-3xl p-8 sm:p-12 md:p-14 rounded-2xl border-2 transition-colors duration-200 shadow-xl relative font-sans ${
              themeMode === 'cream'
                ? 'bg-[#FCFAF5] border-slate-250/80 text-slate-800'
                : 'bg-[#0B0F19] border-slate-800/80 text-slate-200'
            }`}
          >
            {/* Fine design blueprints guidelines overlay background */}
            <div className={`absolute inset-0 border border-dashed rounded-2xl p-6 pointer-events-none ${themeMode === 'cream' ? 'border-indigo-100/40' : 'border-slate-800/40'}`}>
              <div className="w-full h-full border-t border-b border-dashed border-indigo-100/20 dark:border-slate-850/20" />
            </div>

            <div className="relative space-y-12">
              
              {/* SECTION A: HEADER BANNER */}
              <div className={`border-b pb-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 ${themeMode === 'cream' ? 'border-slate-200' : 'border-slate-800'}`}>
                <div className="space-y-2 max-w-lg">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 block font-mono">
                    CHRONO BASE TYPOGRAPHIC SPECIMEN
                  </span>
                  <h1 className="text-5xl font-black tracking-tight" style={{ fontFamily: fontStack }}>
                    {font.name}
                  </h1>
                  <p className={`text-xs ${themeMode === 'cream' ? 'text-slate-500' : 'text-slate-400'} italic font-light font-display leading-relaxed`}>
                    "{font.description}"
                  </p>
                  {licenseText && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="inline-block px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider font-mono uppercase bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/30">
                        License: {licenseText}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Giant glyph stamp */}
                <div 
                  className="text-8xl sm:text-9xl font-thin tracking-tighter opacity-80 shrink-0 select-none leading-none select-none font-display text-indigo-500/90"
                  style={{ fontFamily: fontStack }}
                >
                  Aa
                </div>
              </div>

              {/* SECTION B: GLYPH MAP */}
              <div className="space-y-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500 block font-mono">
                  01 // GLYPH MAPS (LATIN ALPHABET & CHARACTERS)
                </span>
                <div className="space-y-3.5">
                  <div>
                    <span className={`block text-[9px] font-bold uppercase tracking-wider font-mono mb-1 ${themeMode === 'cream' ? 'text-slate-400' : 'text-slate-500'}`}>Caps</span>
                    <p className="text-xl sm:text-2xl font-light tracking-widest leading-loose" style={{ fontFamily: fontStack }}>
                      {uppercaseLetters}
                    </p>
                  </div>
                  <div className={`pt-2 border-t border-dashed ${themeMode === 'cream' ? 'border-slate-200/60' : 'border-slate-800/50'}`}>
                    <span className={`block text-[9px] font-bold uppercase tracking-wider font-mono mb-1 ${themeMode === 'cream' ? 'text-slate-400' : 'text-slate-500'}`}>Lowercase</span>
                    <p className="text-xl sm:text-2xl font-light tracking-widest leading-loose" style={{ fontFamily: fontStack }}>
                      {lowercaseLetters}
                    </p>
                  </div>
                  <div className={`pt-2 border-t border-dashed ${themeMode === 'cream' ? 'border-slate-200/60' : 'border-slate-800/50'}`}>
                    <span className={`block text-[9px] font-bold uppercase tracking-wider font-mono mb-1 ${themeMode === 'cream' ? 'text-slate-400' : 'text-slate-500'}`}>Numerals & Punctuation</span>
                    <p className="text-md sm:text-lg font-light tracking-widest leading-loose font-mono opacity-85" style={{ fontFamily: fontStack }}>
                      {numbersAndSymbols}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION C: TYPE SIZE COMPARISONS */}
              <div className="space-y-6">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-500 block font-mono">
                  02 // SCALE HIERARCHY VALUE MOCK
                </span>
                
                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-bold uppercase font-mono ${themeMode === 'cream' ? 'text-slate-400' : 'text-slate-500'}`}>Hero Title (44px / Extra Bold)</span>
                      <span className="text-[9px] text-indigo-500 font-mono font-bold">44px</span>
                    </div>
                    <p className="text-4xl font-extrabold tracking-tight leading-none" style={{ fontFamily: fontStack, fontWeight: styleState.fontWeight }}>
                      {heroPhrase}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-bold uppercase font-mono ${themeMode === 'cream' ? 'text-slate-400' : 'text-slate-500'}`}>Section Header (24px / Medium)</span>
                      <span className="text-[9px] text-indigo-500 font-mono font-bold">24px</span>
                    </div>
                    <p className="text-2xl font-semibold leading-snug" style={{ fontFamily: fontStack }}>
                      {heroPhrase}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-bold uppercase font-mono ${themeMode === 'cream' ? 'text-slate-400' : 'text-slate-500'}`}>Sub-Heading (18px / Regular)</span>
                      <span className="text-[9px] text-indigo-500 font-mono font-bold">18px</span>
                    </div>
                    <p className="text-lg leading-relaxed" style={{ fontFamily: fontStack, fontStyle: styleState.fontStyle }}>
                      Universal web tools pair clean local safe system stacks with beautiful custom Google Font APIs.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[8px] font-bold uppercase font-mono ${themeMode === 'cream' ? 'text-slate-400' : 'text-slate-500'}`}>Body Prose Copy (13.5px / Generous Leading)</span>
                      <span className="text-[9px] text-indigo-500 font-mono font-bold">13.5px</span>
                    </div>
                    <p className={`text-sm leading-relaxed font-light ${themeMode === 'cream' ? 'text-slate-600' : 'text-slate-300'}`} style={{ fontFamily: fontStack }}>
                      {sampleParagraph}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION D: SPECIFICATION METADATA FOOTER */}
              <div className={`pt-6 border-t font-mono text-[9px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 uppercase ${themeMode === 'cream' ? 'border-slate-200 text-slate-400' : 'border-slate-800 text-slate-505'}`}>
                <div className="space-y-0.5">
                  <span>Stack: <strong className={themeMode === 'cream' ? 'text-slate-700' : 'text-slate-300'}>{font.stack}</strong></span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Weights: {font.weights.join(', ')}</span>
                    <span>•</span>
                    <span>Safety: {font.safetyScore}%</span>
                    {licenseText && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">License: {licenseText}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="sm:text-right">
                  <span>PLAYGROUND ARCHIVE SOURCE</span>
                  <p className="font-bold text-indigo-500 tracking-wider">GEN-SPECIMEN v1.1</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Sticky Instruction Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 flex items-center justify-between text-[11px] font-medium text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span>Generate vector PDF sheets with print drivers, or high-definition export posters in PNG format.</span>
          </div>
          <p className="font-mono text-[10px] hidden sm:block">DPI Scale: 2.0 Web Ready</p>
        </div>

      </div>

    </div>
  );
}
