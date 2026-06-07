import React from 'react';
import { ShieldCheck, Calendar, Lock, Globe, Server } from 'lucide-react';

interface PrivacyViewProps {
  brandName?: string;
  footerCopyrightName?: string;
}

export default function PrivacyView({
  brandName = 'FreeCSS',
  footerCopyrightName = 'cssfonts.net'
}: PrivacyViewProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div id="privacy-policy-view" className="py-8 font-sans max-w-4xl mx-auto">
      {/* Policy Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-100 dark:border-amber-900/30 uppercase tracking-widest font-mono mb-4">
          <ShieldCheck className="h-3 w-3" /> Integrity & Assurance
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-display">
          Privacy Policy
        </h1>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" /> Effective: {currentDate}
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Suite: {footerCopyrightName}</span>
        </div>
      </div>

      {/* Main content body containing standard section logs */}
      <div className="space-y-8 text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-sans">
        
        {/* Core summary */}
        <p className="text-base text-slate-700 dark:text-slate-200">
          At <strong>{brandName}</strong>, we are committed to providing helpful developer resources with maximum transparency. Because this application is a pure client-side design workspace running natively inside your browser, we prioritize your data privacy by default.
        </p>

        {/* Section 1 */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950">
          <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white font-display mb-3">
            <Lock className="h-4.5 w-4.5 text-indigo-500" /> 1. No Personal Data Acquisition
          </h2>
          <p>
            We do not require user account registration, sign-ups, or login procedures to access any tier of our styling tools or web font catalogs. We do not solicit, compile, or store any personally identifiable information (PII) including email addresses, phone coordinates, or billing details.
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950">
          <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white font-display mb-3">
            <Server className="h-4.5 w-4.5 text-indigo-500" /> 2. Local Storage Usage
          </h2>
          <p>
            The application utilizes browser-native <code>localStorage</code> capabilities solely to save user customized selections (such as your Favorites font lists) and workspace configuration presets (such as Dark Mode preference toggles). This data resides exclusively inside your personal browser storage instance. We have no external database synchronization linking these local assets, and you may clear them instantly through standard browser cache methods.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950">
          <h2 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white font-display mb-3">
            <Globe className="h-4.5 w-4.5 text-indigo-500" /> 3. Third-Party Integrations
          </h2>
          <p className="mb-3">
            To provide comprehensive typography previews, this application connects to standard external services:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-550 dark:text-slate-400">
            <li>
              <strong>Google Web Fonts:</strong> Fetching remote typefaces utilizes official Google APIs, which may log visitor metadata under their distinct developer privacy guidelines.
            </li>
            <li>
              <strong>External Links:</strong> FreeCSS includes helpful links to companion resources (e.g., TemplateMind, FlatPalette, FaviconExpert). Clicking these will redirect you to those discrete properties governed by their unique terms.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white font-display mb-3">
            4. Analytics & Operational Logs
          </h2>
          <p>
            We may implement basic analytical snippets to track standard navigation parameters (such as click volumes or interface usage) strictly to refine features and guide engineering choices. These measurements maintain complete anonymity and exclude contextual personal tracking variables.
          </p>
        </div>

        {/* Section 5 */}
        <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-950">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white font-display mb-3">
            5. Revisions and Contact
          </h2>
          <p>
            This policy is updated iteratively in compliance with standard security principles. For queries regarding the data processing workflow or to clear local workspace parameters, you may inspect standard browser preferences or consult our team.
          </p>
        </div>

      </div>
    </div>
  );
}
