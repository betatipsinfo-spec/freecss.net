import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  activeTab?: ActiveTab;
}

export default function FAQ({ activeTab }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Reset opened accordion and search when tab shifts
  useEffect(() => {
    setOpenIndex(null);
    setSearchQuery('');
  }, [activeTab]);

  const typographyFaqs: FAQItem[] = [
    {
      question: "What is FreeCSS (cssfonts.net)?",
      answer: "FreeCSS (cssfonts.net) is an interactive, browser-native suite engineered for frontend developers and web designers to test, preview, compare, and copy CSS code for system web-safe fonts and popular Google Fonts without clutter or setup delays."
    },
    {
      question: "How can I customize typography in the Font Styler?",
      answer: "The Font Styler offers a live slider playground where you can customize font-weight, italic styles, line-height, letter-spacing, text alignment, decoration, and shadows. As you adjust the sliders, the tool automatically compiles a pristine, copy-pasteable CSS rule block that you can embed directly in your target stylesheet files."
    },
    {
      question: "How do I filter and search across the Font Directory?",
      answer: "The Font Directory categorizes standard OS system typefaces and key Google Web Fonts so you can search them instantly by name. Filter results by specific typography families like Sans-Serif, Serif, Monospace, Display, or Handwriting, and change custom preview sentences globally to inspect layout fit."
    },
    {
      question: "How does the Font Compare tool assist in visual design matching?",
      answer: "The Font Compare utility loads up to three separate font configurations side-by-side. It is perfect for visual pairing validation—allowing you to inspect how display headlines, subheads, and body paragraph fonts/sizes harmonize visually before committing to specific styles."
    },
    {
      question: "What are the Browser Safety scores based on?",
      answer: "Browser Safety scores represent the expected default rendering success of system-safe fonts across major operating systems including Windows, macOS, iOS, iPadOS, Android, and Linux. This safety index helps developers choose baseline fallbacks that don't shift or break responsive layouts."
    },
    {
      question: "How can the CSS Cheat Sheet speed up my stylesheet development?",
      answer: "The CSS Cheat Sheet contains boilerplate templates, import `@import` rules, system font stack arrays, fluid responsive sizing clamp equations, and custom typography scrollbar styles. Copy any code snippet with a single click to instantly establish standard modern CSS configurations."
    },
    {
      question: "What is the difference between System Web-Safe Fonts and Google Web Fonts?",
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

  const hoverFaqs: FAQItem[] = [
    {
      question: "How can I use the Hover Effects Generator to enhance my projects?",
      answer: "The Hover Effects Generator allows you to interactively create fluid 3D transformations, scaling animations, custom timing paths, and ambient glowing states. You can tweak live parameters using the sliders, verify interactions instantly inside the visual sandbox, and export clean Tailwind CSS shorthand or pure CSS rulesets with a single hit."
    },
    {
      question: "Why are transform-based hover animations highly recommended for performance?",
      answer: "Properties like 'scale', 'rotate', 'translate', and 'skew' are GPU-accelerated by modern web engines. Using these instead of modifying physical box-model attributes (like absolute coordinates, margin, or padding) bypasses expensive layout recalculation (reflow) stages, guaranteeing silky-smooth 60 FPS transition states."
    },
    {
      question: "How do I implement these custom effects on other elements?",
      answer: "Copy either the compiled Tailwind utility shorthand or pure CSS ruleset. Assign that classname config directly to your target container or button. Make sure your target stylesheet includes corresponding transitions (e.g., transition-property: transform, box-shadow, background-color, border-color) so coordinates interpolate seamlessly."
    },
    {
      question: "How can I prevent shifting or alignment jumps on hover?",
      answer: "Avoid shifting or adding structural box-model metrics (like margin, height, padding, or absolute placement offset positions) inside hover states. Doing so triggers full browser reflow cycles. Using transform attributes (scale, rotate, translate, skew) ensures GPU-compositing overrides, avoiding expensive visual recalculations completely."
    },
    {
      question: "Why do my transforms look slightly blurry or crisp-distorted during transitions?",
      answer: "Web browsers sometimes map subpixel dimensions to intermediate frames incorrectly. To override this, assign 'backface-visibility: hidden;' or 'will-change: transform;' on the source selector. Translating elements using three-dimensional coordinates (like translate3d instead of translateX) also enforces hardware-accelerated rendering."
    },
    {
      question: "Which transition easing functions look best for buttons vs grid lists?",
      answer: "For tactile quick triggers like buttons, go for short durations (150ms to 200ms) with ease-out vectors. For larger columns, card bento modules, or images, opt for slightly longer trajectories (300ms to 500ms) paired with elastic spring functions like cubic-bezier(0.16, 1, 0.3, 1) or cubic-bezier(0.34, 1.56, 0.64, 1)."
    }
  ];

  const shadowFaqs: FAQItem[] = [
    {
      question: "How does the CSS Box Shadow multi-layer designer work?",
      answer: "The designer allows you to stack up to 10 independent shadow layers. Stacking multiple layers enables you to create physically accurate and smooth light-scattering depth effects. You can configure horizontal/vertical offsets, blur radius, spread weight, opacity levels, and color profiles separately for each layer."
    },
    {
      question: "Why are multi-layered shadows superior to single-layer shadows?",
      answer: "In physical environments, shadows are not solid, uniform bands; they disperse softly as light bounces. Stacking separate layers—such as a sharp, high-opacity close layer paired with a very wide, light, responsive ambient layer—perfectly duplicates realistic surface properties and prevents 'muddy' or cartoonish rendering."
    },
    {
      question: "How does the Tailwind CSS Arbitrary class build custom utilities?",
      answer: "Tailwind CSS uses bracket syntax `shadow-[...]` to load arbitrary rules into utility pipelines. The Box Shadow exporter automatically bundles your active layers, parses hex colors into clean floats within standard CSS syntax, and handles string concatenation so you can copy and deploy responsive classes directly."
    },
    {
      question: "Are there any rendering performance costs with deep multi-layered shadows?",
      answer: "Yes, complex shadow rendering is handled by browser GPU rasterization. Modifying layout dimensions or applying high-blur multi-layered shadows to complex nested components can trigger heavy repaints. For top-tier performance on weak devices, avoid animating highly complex shadow layers dynamically if simpler static combinations are adequate."
    },
    {
      question: "What is the difference between an Outset and an Inset shadow layer?",
      answer: "Outset layers cast shadows outward away from the element, creating elevation above the canvas background. Inset layers project shadows inward from the element's border. This inwards projection is ideal for simulating internal recesses, nested grids, hollow slots, and interactive sunken states."
    },
    {
      question: "How do I choose realistic shadow colors for dark vs light designs?",
      answer: "For light mode mockups, use a high-opacity soft neutral gray or dark-indigo tint (e.g. #0f172a with 0.08 to 0.15 opacity) for accurate physical contrast. For immersive dark mode interfaces, use vibrant, saturated glow colors matching elements' themes (like indigo, violet, or emerald) with low opacity to produce radiant organic neon halos."
    }
  ];

  const glassFaqs: FAQItem[] = [
    {
      question: "What exactly is Glassmorphism, and how is it implemented?",
      answer: "Glassmorphism is a modern UI design trend that emulates frosted translucent glass panes, creating a premium sense of physical stacking depth. It is achieved in CSS using a translucent background tint (e.g. standard rgba colors), high backdrop filters (backdrop-filter: blur), and high-contrast dual-polarized edge borders to simulate light refracting along the bevel."
    },
    {
      question: "Why does backdrop-filter sometimes fail to render in older browsers?",
      answer: "Backdrop filter calculations require the browser engine to snapshot regions behind an element, apply a Gaussian blur pixel pipeline, and composite it recursively. Older WebKit-based browsers (and older Safari builds) require the vendor-prefixed version: `-webkit-backdrop-filter`. The Liquid Glass designer automatically appends both declarations for universal rendering coverage."
    },
    {
      question: "What is the purpose of adding dynamic background 'Liquid Blobs' behind glass?",
      answer: "Since frosted glass blocks rely on translucent blur values to create refraction, their quality depends directly on the visual complexity of the elements behind them. Plain solid backgrounds render glass panels looking like generic flat gray blocks. Adding vibrant, fluid 'liquid blobs' in constant motion under the frosted layer stress-tests the blur mechanics, revealing stunning physical glares and real-time contrast shifts."
    },
    {
      question: "How do backdrop blur and saturation work together in CSS?",
      answer: "As we increase backdrop blur (e.g., above 15px), light from behind becomes heavily diffused, which can wash out or dull the background's original colors. Increasing the saturation filter (e.g., to 140% - 200%) restore chromatic vibrancy, giving the frosted plate a luminous, neon glowing aura."
    },
    {
      question: "Are there any mobile accessibility concerns when using Glassmorphism?",
      answer: "Yes. Translucent background plates risk violating WCAG 2.1 contrast rules because the layout beneath them can vary drastically. To solve this, design defensively: keep background tint opacity high enough (0.15 to 0.35) so text remains readable even over light-colored flowing fluid details, or use dark overlays behind small captions."
    }
  ];

  const clippathFaqs: FAQItem[] = [
    {
      question: "How does the clip-path polygon coordinate system operate?",
      answer: "The CSS clip-path property with polygon() uses a percentage-based, relative coordinate grid starting from the top-left corner (0% 0%) down to the bottom-right corner (100% 100%). By connecting multiple X and Y coordinate pairs, you define a custom vector boundary that masks the elements' visible parts."
    },
    {
      question: "Can clip-path shapes be animated smoothly using CSS transitions?",
      answer: "Yes, you can animate clip-path with standard CSS transitions or keyframes, but there is a major constraint: both the starting and ending polygon states MUST have the exact same number of coordinate points. Changing point structures midway is mathematically undefined, so the browser drops to an instantaneous jump."
    },
    {
      question: "What are the performance impacts of complex clip-paths on weak devices?",
      answer: "Clip paths are accelerated by browser SVG rendering and GPU layout pipelines. However, having dozens of custom vectors or animating them in real-time triggers continuous layout recalculations and heavy paint routines. For optimal speed, stick to simpler polygon shapes with 3 to 12 points."
    },
    {
      question: "What is the difference between clip-path and mask-image?",
      answer: "Clip-path is vector-based (using strict geometric lines like polygons, circles, path coordinates) and behaves binary—either a pixel is inside the shape and visible, or outside and hidden. Mask-image uses rasterized alpha-transparency images (such as png or gradients) to support partial opacities and soft-edge transparent blends."
    },
    {
      question: "Do clipped regions remain interactive for user mouse pointers or text selection?",
      answer: "No. Any area masked out by a CSS clip-path is completely discarded from layout calculations. This means links, buttons, or hover states located inside the clipped areas cannot be clicked, hovered, or selected. The interactive boundary shrinks perfectly to fit your shape's polygon bounds."
    }
  ];

  const neumorphismFaqs: FAQItem[] = [
    {
      question: "What is Neumorphism in modern CSS?",
      answer: "Neumorphism (Soft UI) is an aesthetic style blending skeuomorphic physical realism with flat minimal curves. The element shares its exact background color with its container, sculpted via realistic double offset shadows—a lighter reflection on the illuminated side and a darker shadow on the opposite side."
    },
    {
      question: "Why do bright white or solid black colors break neumorphic contrast?",
      answer: "Since Neumorphism depends entirely on subtle light offsets and deep shadow blends to convey tactile height, Pure White (#ffffff) cannot render lighter highlight values, while Pitch Black (#000000) cannot render darker shadow recesses. Standard grays, warm tones, and mid-range saturation levels work best."
    },
    {
      question: "What are the differences between flat, concave, convex, and pressed neumorphic structures?",
      answer: "Flat style delivers an extruded outward plate with uniform surface color; Concave and Convex curves utilize gradient color fills to represent realistic physical curvature; Pressed (Inset) flips the lighting direction internally, making the element look like an interactive button pressed downward."
    },
    {
      question: "How do you make Neumorphism accessible under WCAG guidelines?",
      answer: "Soft neumorphic panels inherently have poor boundary contrast. You can make them highly accessible by adding high-contrast indicator lines, colorful interactive icons, borders with fine tactile opacities (e.g. 1px solid border matching the light/dark shadows), and active focus outlines for keyboard users."
    },
    {
      question: "What is the formula for calculating matching lights and shadow values?",
      answer: "Lighter highlights are calculated by scaling base RGB values upwards (e.g. R + shift), capped at 255. Dark shadows are calculated by scaling base RGB values downward towards zero. Multiplying or adding shift deltas based on distance and blur results in beautifully blended, natural-looking shadows."
    }
  ];

  const backdropFilterFaqs: FAQItem[] = [
    {
      question: "What is the backdrop-filter property in CSS?",
      answer: "The backdrop-filter CSS property applies graphical effects—such as blur, brightness, contrast, or color shifting—to the area directly behind an element. This is the cornerstone of premium Glassmorphism design, allowing text and controls to sit accessibly over busy graphic designs."
    },
    {
      question: "What is the difference between filter and backdrop-filter?",
      answer: "A standard CSS filter (e.g., filter: blur(5px)) blurs the element itself and all of its contents (including text and child buttons). In contrast, backdrop-filter leaves the element's actual contents crisp and crisp, while smoothly blurring and filtering the background pixels beneath it."
    },
    {
      question: "Why must I declare -webkit-backdrop-filter alongside backdrop-filter?",
      answer: "Many major browsers (such as Apple Safari on both MacOS and iOS) still require the vendor-prefixed -webkit-backdrop-filter to activate rendering. Always declare both in your custom stylesheets to guarantee full cross-browser safety."
    },
    {
      question: "Why does my backdrop-filter look empty or invisible?",
      answer: "There are two common triggers: (1) The element must have a semi-transparent background color (e.g., rgba(255, 255, 255, 0.4)). If the background is fully opaque (#fff), no backdrop shines through, rendering filters invisible. (2) There must be actual background layers or design motifs rendering behind the element in the layout stack."
    },
    {
      question: "Is backdrop-filter performant on mobile layouts?",
      answer: "Backdrop-filter is GPU-accelerated in modern browsers but can trigger repaints when content behind it slides or animates. To maximize performance, use reasonable blur coefficients (10px to 24px) instead of extreme radii, and avoid nesting multiple semi-transparent filter layers together."
    }
  ];

  const borderRadiusFaqs: FAQItem[] = [
    {
      question: "What is the 8-value border-radius syntax in CSS3?",
      answer: "An 8-value border-radius declaration allows you to define distinct horizontal and vertical radius values for all four corners. The syntax is structured as: tl-h tr-h br-h bl-h / tl-v tr-v br-v bl-v. This makes it possible to shape beautiful, complex, elastic organic blobs."
    },
    {
      question: "What does the slash (/) character do inside a border-radius value?",
      answer: "The slash separates horizontal percentages from vertical percentages. The 4 values before the slash control the horizontal radius of each corner (stretching left-to-right), and the 4 values after the slash control the vertical radius of each corner (stretching top-to-bottom)."
    },
    {
      question: "Are 8-point border-radius declarations performant and web-safe?",
      answer: "Yes, absolutely! 8-point border-radius relies on standard CSS rendering engines and is fully hardware-accelerated. It requires virtually no CPU or memory overhead compared to heavy SVG path animations, rendering flawless vectors instantly on all mobile and desktop devices."
    },
    {
      question: "Can we animate transitions between two organic blob shapes?",
      answer: "Yes, you can smoothly animate or transition between two 8-value border-radius shapes using standard CSS transitions (e.g., transition: border-radius 0.3s ease-in-out). The browser automatically interpolates the 8 horizontal and vertical offsets for a liquid, organic waving effect."
    },
    {
      question: "Why do child components leak outside of my curved organic container?",
      answer: "When a container has custom organic curvatures, nested content (like block images or colored headers) might bleed past the corners. This is easily solved by adding overflow: hidden; (or overflow-hidden in Tailwind) to the outer container to force inner elements to conform to the curvature."
    }
  ];

  const tooltipFaqs: FAQItem[] = [
    {
      question: "What is a CSS Tooltip Generator?",
      answer: "The Tooltip Generator is an interactive visual playground that allows web designers to customize, preview, and build CSS-only tooltip bubbles. You can tune arrow sizing, colors, dimensions, positions (top, bottom, left, right), and dynamic sliding/fading hover animations."
    },
    {
      question: "How do you create tooltip arrows/pointers using only pure CSS?",
      answer: "Tooltip arrows are built using the CSS border transparent triangle hack. By declaring zero height and width on a pseudo-element (:after or :before), and giving it transparent borders on three sides and a solid colored border on the pointing side, the browser renders a crisp geometric triangle. Adjusting border-width changes the pointing arrow's size."
    },
    {
      question: "How can I make my tooltips animatable during hover transitions?",
      answer: "You can transition opacity and 2D transform translations. Typically, you hide the tooltip by default using 'opacity: 0; pointer-events: none; transform: translateY(6px); transition: all 0.2s ease;'. When the parent is hovered, you declare 'opacity: 1; pointer-events: auto; transform: translateY(0px)'. This creates a premium, smooth slide-up effect."
    },
    {
      question: "Why is 'pointer-events: none' highly recommended for tooltips?",
      answer: "If a tooltip doesn't have 'pointer-events: none' while hidden, users might accidentally trigger hover states, clickable links, or text selection blockers by hovering over invisible spaces. Adding 'pointer-events: none' guarantees the hidden bubble is completely ignored, then flipping it to 'pointer-events: auto' once active maintains keyboard link clicks."
    },
    {
      question: "Can I customize the tooltip background with gradients or backdrop-filters?",
      answer: "Yes! High-contrast gradients or Glassmorphism backdrop-blur can be assigned to the main tooltip package. However, remember to style the pseudo-element pointer (the arrow triangle) with a color matching the border edge so they look seamless."
    },
    {
      question: "How can I implement tooltips securely on touchscreen/mobile devices?",
      answer: "Since touch-devices don't have natural hover events, mobile users must tap the trigger component to display descriptions. To build mobile-safe systems, handle focus states using the CSS ':focus-within' property, or capture brief taps using lightweight JavaScript touch listeners to toggle open classes."
    }
  ];

  const cursorFaqs: FAQItem[] = [
    {
      question: "What is a Custom CSS Cursor Generator?",
      answer: "A Custom CSS Cursor Generator is an interactive visual builder that helps you design and output CSS and JavaScript recipes to replace the browser's default black/white arrow pointer. You can create customized cursor shapes, set custom colors, sizes, scaling behaviors, borders, and implement reactive trailing elements."
    },
    {
      question: "How do you customize a cursor using native CSS?",
      answer: "You can use the 'cursor' property in CSS, directing it to an image file or inline SVG via a URL with specified coordinate hot-spots. For example: 'cursor: url(\"data:image/svg+xml;utf8,...\") 10 10, auto;'. The coordinates (10 10) define the active tip or hot-spot of your cursor."
    },
    {
      question: "How do modern websites implement smooth lagging/trailing custom cursors?",
      answer: "They combine CSS for the static design or hiding of the cursor with a JavaScript event listener on 'mousemove'. A script tracks the mouse position and updates a custom absolute/fixed container's transform. By applying linear interpolation (lerp) or transition property values, you create a beautiful lag or tail effect that flows with cursor movement."
    },
    {
      question: "Why should we use 'pointer-events: none' on custom cursors?",
      answer: "Custom absolute or fixed cursor elements exist physically on the DOM. If they do not have 'pointer-events: none', they will capture mouse movements and hover triggers, blocking standard links, buttons, and scrolls below them from firing. This property ensures mouse clicks bypass the cursor elements entirely."
    },
    {
      question: "Is there an issue with custom cursors on touchscreen mobile devices?",
      answer: "Yes, touchscreen devices (smartphones, tablets) do not have a cursor because users interact directly with their fingers. It is highly recommended to disable custom cursors entirely for mobile users using CSS media queries such as '@media (hover: none)' or checks on touch capacities, which revert the layout to normal touchscreen handling."
    },
    {
      question: "How does the 'hot-spot' coordinate declaration work?",
      answer: "The cursor property allows two numeric parameters representing X and Y offsets in pixels. These offsets align the true clickable point (the tip of your pointer/arrow) with the SVG or PNG design. For instance, in 'cursor: url(custom-pointer.png) 8 12, auto;', the clicking activation spot is shifted 8px right and 12px down from the top-left corner of the image structure."
    }
  ];

  const backgroundPatternFaqs: FAQItem[] = [
    {
      question: "What is the CSS Background Patterns Generator?",
      answer: "The CSS Background Patterns Generator is an interactive visual suite designed to build and export pristine, lightweight geometric background textures—including dotted grids, stripes, chevron saw-teeth, liquid waves, concentric circles, and hexagonal honeycomb meshes. These can be integrated seamlessly into modern frontends without adding visual weight or asset package size."
    },
    {
      question: "How does inlined Base64 SVG pattern rendering work in CSS?",
      answer: "Instead of requesting remote image assets via high-latency HTTP queries, the engine compiles the vector patterns (such as crosses, waves, and organic hexagons) directly as inlined SVG markup. By base64-encoding this SVG string and passing it inside 'background-image: url(\"data:image/svg+xml;base64,...\")', the browser renders crisp vector graphics without triggering any external network asset loads."
    },
    {
      question: "Why should we use background-blend-mode inside the CSS styles?",
      answer: "The 'background-blend-mode' property controls how the background pattern images blend with existing colors or linear theme gradients underneath them. By utilizing modes like multiply, color-dodge, difference, or overlay, you can create gorgeous, stylized sci-fi grid glow patterns or soft textured overlays rather than simple flat layouts."
    },
    {
      question: "How does the built-in WCAG 2.1 Contrast Calculator assist designer decisions?",
      answer: "Dynamic background designs risk reducing text legibility. Our background engine runs real-time relative luminance calculations on the active colors, generating a precise contrast ratio score (according to WCAG standards) alongside clear AAA, AA, or low contrast rating pass indicators. This alerts you to make design corrections before deploying to production."
    },
    {
      question: "How can I implement these patterns inside Tailwind CSS or React setups?",
      answer: "The exporter compiles specialized code snippets for all primary workflows: (1) Vanilla CSS classes declaring background size, position, and blend properties; (2) Tailwind CSS shorthand utilizing bracket-based arbitrary assets notation 'bg-[image:...]'; (3) Standard inline React style objects; and (4) Raw standalone XML SVG assets for vector editing."
    },
    {
      question: "What are safe performance guidelines for rendering layered backgrounds?",
      answer: "Because background patterns are rendered natively by the browser on each redraw, extreme resizing alongside high backdrop-blur values and complex blend modes can increase GPU repaint budgets. For optimal speed on weaker mobile processors, restrict pattern repetitions within reasonable grid sizes and use modest overlay blur dimensions."
    }
  ];

  const transformPlaygroundFaqs: FAQItem[] = [
    {
      question: "What is the CSS 3D Transform Playground?",
      answer: "The 3D Transform Playground is a visual developer studio designed to model, test, and export customized three-dimensional spatial coordinates and rotational pitches utilizing CSS matrix projection specifications. It supports multi-axial translations, degrees of roll, percentage aspect scaling, skew distortions, and browser hardware acceleration settings."
    },
    {
      question: "How does the 'perspective' property contribute to 3D CSS rendering?",
      answer: "Determining the distance (focal radius) between the user's viewport screen and the z=0 layout plane, 'perspective' dictates how dramatic the scaling compression of elements feels under rotational pitch. Lower prospective numbers (e.g., 300px) project sharp extreme distortions, while higher parameters (e.g., 1500px) result in smooth, conservative spatial depth shifts."
    },
    {
      question: "What is the difference between applying 'perspective' on the entity vs the container?",
      answer: "Applying 'perspective(px)' inside the 'transform' declaration affects that individual element independently. When declared on a parent wrapper via the standalone property 'perspective: px; transform-style: preserve-3d;', all child elements share a unified global perspective viewport, enabling consistent 3D intersections and overlapping layers."
    },
    {
      question: "Why should we prefer 'translate3d()' and 'scale3d()' over standard 2D counterparts?",
      answer: "Using 3D-specific CSS methods requests the browser to promote the rendered node to its own composite canvas. This redirects all repaints and spatial alterations straight to the system's hardware GPU rather than using the CPU main thread, securing silky 60fps animations without causing browser layout reflows."
    },
    {
      question: "What does the 'transform-origin' coordinate alter?",
      answer: "The transform-origin establishes the fixed geometric anchor point around which rotations, scales, and skews occur. By mapping values from '0% 0%' (top-left) to '50% 50%' (center) or customized coordinates, you can model folding notebooks, swing-down card flaps, and corner-pinned interactive components."
    }
  ];

  const getFaqData = () => {
    switch (activeTab) {
      case 'transform-playground':
        return {
          items: transformPlaygroundFaqs,
          title: "CSS 3D Transforms & Matrix FAQs",
          description: "Frequently asked questions about hardware GPU compositing, coordinate perspective anchors, translation offsets, and transition easing parameters."
        };
      case 'background-pattern':
        return {
          items: backgroundPatternFaqs,
          title: "CSS Background Patterns & Grids FAQs",
          description: "Frequently asked questions about inlining vector SVG structures, Base64 data encoding, background blend modes, WCAG contrast parameters, and responsive design guidelines."
        };
      case 'cursor':
        return {
          items: cursorFaqs,
          title: "Custom CSS Cursor Generator FAQs",
          description: "Frequently asked questions about mouse coordinates, trailing lag algorithms, inline SVG hot-spot declarations, and safe desktop-to-mobile response strategies."
        };
      case 'tooltip':
        return {
          items: tooltipFaqs,
          title: "CSS Tooltip & Arrow Customizer FAQs",
          description: "Frequently asked questions about pseudo-element border triangles, opacity transition animations, pointer-event ignore lists, and touch device responsive structures."
        };
      case 'border-radius':
        return {
          items: borderRadiusFaqs,
          title: "8-Point Border Radius & Organic Shape FAQs",
          description: "Frequently asked questions about axis split values, slash separators, organic CSS transitions, child element overflow clips, and browser performance safeguards."
        };
      case 'backdrop-filter':
        return {
          items: backdropFilterFaqs,
          title: "Backdrop Filter & Glassmorphism FAQs",
          description: "Frequently asked questions about Safari Webkit prefixes, contrast opacity, the difference between filter systems, and CPU-repaint performance tips."
        };
      case 'neumorphism':
        return {
          items: neumorphismFaqs,
          title: "Skeuomorphic Soft UI & Neumorphism FAQs",
          description: "Frequently asked questions about automatic shadow generation formulas, luminance contrast barriers, pressed-button states, and robust CSS hover blends."
        };
      case 'clippath':
        return {
          items: clippathFaqs,
          title: "Clip-Path & Vector Masking FAQs",
          description: "Frequently asked questions about percentage coordinates, SVG mask assets, CSS polygon transitions, pointer-event interaction rules, and GPU render limits."
        };
      case 'glass':
        return {
          items: glassFaqs,
          title: "Liquid Glass & Glassmorphism FAQs",
          description: "Frequently asked questions about translucent frosted glass overlays, Safari Webkit compatibility, backdrop saturation, and flowing liquid composition guidelines."
        };
      case 'shadow':
        return {
          items: shadowFaqs,
          title: "Advanced CSS Box Shadow FAQs",
          description: "Frequently asked questions about multi-layered lighting, translucent color projection, inset recess depth, hardware repaints, and Tailwind arbitrary syntax."
        };
      case 'effects':
        return {
          items: hoverFaqs,
          title: "Hover Animation & Performance FAQs",
          description: "Frequently asked questions about CSS transforms, GPU hardware acceleration, transition easing functions, and tactile hover states."
        };
      default:
        return {
          items: typographyFaqs,
          title: "FreeCSS Typography FAQ",
          description: "Frequently asked questions about web-safe fallback typography stacks, Google Webfonts integration, and specimen proof sheets."
        };
    }
  };

  const { items: faqItems, title: currentTitle, description: currentDescription } = getFaqData();

  const filteredFaqs = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-section" className="mt-16 pt-12 border-t-2 border-slate-205 dark:border-slate-800/80 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/30 uppercase tracking-widest font-mono">
            <HelpCircle className="h-3 w-3" /> FAQs & Insights
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight font-display mt-2.5">
            {currentTitle}
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-2.5 max-w-2xl leading-relaxed">
            {currentDescription}
          </p>
        </div>

        {/* FAQ Search Container with focusing metrics */}
        <div 
          id="faq-search-container"
          className="relative w-full md:w-80 shrink-0 border-2 border-slate-200 dark:border-slate-800 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 bg-white dark:bg-slate-950 rounded-xl px-3 py-2 flex items-center gap-2 transition-all shadow-xs"
        >
          <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            id="faq-search-input"
            type="text"
            placeholder="Search questions & answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-transparent border-none p-0 outline-none focus:ring-0 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3.5 w-full">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, idx) => {
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
                  className="w-full flex items-center justify-between text-left p-4.5 sm:p-5 font-bold text-xs uppercase tracking-wider font-display text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-455 transition-colors cursor-pointer"
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
          })
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
            <HelpCircle className="h-8 w-8 mx-auto text-slate-400 mb-2 text-indigo-500" />
            <p className="text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-xs">No matching questions found</p>
            <p className="text-slate-400 text-xs mt-1">Try adjusting your search query or clear the filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
