import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What is FreeCSS (cssfonts.net)?",
      answer: "FreeCSS (cssfonts.net) is an interactive, browser-native suite engineered for frontend developers and web designers to test, preview, compare, and copy CSS code for system web-safe fonts and popular Google Fonts without clutter or setup delays."
    },
    {
      question: "What is the differences between System Web-Safe Fonts and Google Web Fonts?",
      answer: "System web-safe fonts are typefaces pre-installed across standard operating systems (like Arial, Georgia, or Trebuchet MS) that render instantly without external HTTP requests. Google Web Fonts are retrieved via remote style declarations. FreeCSS provides both local safe stack fallbacks and remote Google declarations with universal safety index ratings to help you optimize load speeds."
    },
    {
      question: "How does the Specimen Generator sheet work?",
      answer: "When inspecting a font, you can click on \"Generate Specimen Sheet\" to launch a typography specimen proof. It displays a real-time responsive poster vibe (Cream Light or Dark) featuring font classifications, safety ratings, weights, standard lorem sentences, and comprehensive alphabetic glyph stamps. You can edit the custom sentence inline or download it instantly."
    },
    {
      question: "Can I customize font attributes in the playground?",
      answer: "Yes, absolutely. The workspace includes real-time font styling controls. You can instantly adjust font weight, style (italic/normal), line height, letter spacing, font size, text transformations, decoration, alignment, and color profiles to generate precise copy-to-clipboard clean CSS code."
    },
    {
      question: "Are these styling tools and generator resources free to use?",
      answer: "Yes! Everything offered in this interactive suite—including our code templates, system-safe fallback guides, sitemap indexes, icon customizers, and specimen tools—is 100% free and open under standard developer guidelines to assist in rapid system building."
    },
    {
      question: "Does FreeCSS require any external database or framework overhead?",
      answer: "No, FreeCSS is entirely client-side optimized to load instantly, running efficiently with vanilla fallback styles, offering lightning-fast styling with standard fallback stacks to reduce your bundle size."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="mt-16 pt-12 border-t-2 border-slate-205 dark:border-slate-800/80">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-widest font-mono">
          <HelpCircle className="h-3 w-3" /> FAQs & Insights
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-display mt-2.5">
          FreeCSS Typography FAQ
        </h2>
        <p className="text-base text-slate-500 dark:text-slate-400 mt-2.5 max-w-2xl leading-relaxed">
          Frequently asked questions about web-safe fallback typography stacks, Google Webfonts integration, and specimen proof sheets.
        </p>
      </div>

      <div className="space-y-3.5 w-full">
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              id={`faq-item-${idx}`}
              className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden bg-white dark:bg-slate-950 ${
                isOpen 
                  ? 'border-indigo-500 dark:border-indigo-650 shadow-md shadow-indigo-100/30 dark:shadow-none' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => handleToggle(idx)}
                className="w-full flex items-center justify-between text-left p-4.5 sm:p-5 font-bold text-xs uppercase tracking-wider font-display text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-450 transition-colors cursor-pointer"
              >
                <span className="pr-4 leading-snug">{item.question}</span>
                <span className={`shrink-0 p-1.5 rounded-lg border transition-all ${
                  isOpen 
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/30' 
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-505 dark:text-slate-400 border-slate-150 dark:border-slate-800'
                }`}>
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-350 border-t border-slate-100 dark:border-slate-850/60 bg-slate-50/50 dark:bg-slate-900/10 font-sans">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
