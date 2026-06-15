export interface FontCompatibility {
  windows: number; // percentage (0 to 100)
  macos: number;
  ios: number;
  android: number;
  linux: number;
}

export interface FontItem {
  id: string;
  name: string;
  category: 'sans-serif' | 'serif' | 'monospace' | 'cursive' | 'display';
  stack: string;
  isGoogleFont: boolean;
  safetyScore: number; // overall percentage estimate of safety of web-safe font or representation
  compatibility: FontCompatibility;
  description: string;
  styles: string[];
  googleFontUrlName?: string;
  defaultWeight: number;
  weights: number[];
}

export type ActiveTab = 'styler' | 'directory' | 'compare' | 'compatibility' | 'cheatsheet' | 'favorites' | 'admin' | 'about' | 'privacy' | 'terms' | 'effects' | 'shadow' | 'glass' | 'clippath' | 'neumorphism' | 'backdrop-filter' | 'border-radius' | 'tooltip' | 'cursor' | 'background-pattern' | 'transform-playground' | 'cubic-bezier' | 'css-loaders' | 'filter-effects';

export interface AppAdminConfig {
  defaultFontSize: number;
  brandName: string;
  brandLogoSymbol: string; // Emoji symbols or icon choice keys
  brandLogoUrl: string; // Dynamic physical image logo URL
  primaryBrandColor: string;
  secondaryBrandColor: string;
  defaultPreviewTheme: 'dark' | 'light';
  enableAnalyticsSimulation: boolean;
  playgroundHeaderTitle: string;
  playgroundHeaderSubtitle: string;
  enableGoogleFonts: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  seoOgImage: string;
  seoRobots: 'index, follow' | 'noindex, nofollow' | 'index, nofollow';
  seoCanonicalUrl: string;
  footerCopyrightName: string;
  footerDescription: string;
  footerAboutTitle: string;
  footerAboutDescription: string;
}

export interface StyleState {
  fontSize: number; // in px
  fontWeight: number;
  fontStyle: 'normal' | 'italic';
  letterSpacing: number; // in px
  lineHeight: number; // unitless multiplier
  color: string; // hex
  backgroundColor: string; // hex
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration: 'none' | 'underline' | 'line-through' | 'overline';
  textShadow: string; // shadow CSS string
  shadowOffsetX?: number; // custom shadow x offset in px
  shadowOffsetY?: number; // custom shadow y offset in px
  shadowBlur?: number; // custom shadow blur radius in px
  shadowColor?: string; // custom shadow color in hex
  shadowOpacity?: number; // custom shadow opacity from 0 to 1
}
