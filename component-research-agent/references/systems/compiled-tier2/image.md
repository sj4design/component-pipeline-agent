---
component: Image
tier: 2
last_verified: 2026-03-31
---

# Image — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | No dedicated Image component | Paste does not provide an Image component; teams use native `<img>` with Paste spacing/sizing tokens. | high |
| Salesforce Lightning | Image (lightning-image) | Basic image wrapper with lazy loading via `loading="lazy"` attribute; no preview or fallback logic. | medium |
| GitHub Primer | No dedicated Image component | Primer has no Image component; images are handled via standard HTML or within composite components (Avatar, Card). | high |
| shadcn/ui | No dedicated Image component | No Image primitive; developers use Next.js Image or native `<img>`. Aspect ratio utilities via Tailwind CSS. | high |
| Playbook | Image | Basic image component with `url` and `alt` props; supports rounded corners and loading states. | medium |
| REI Cedar | CdrImg | Image component with `ratio` prop for aspect ratio enforcement; lazy loading via `loading` prop; responsive `srcset`/`sizes` support. | high |
| Wise Design | No dedicated Image component | No Image abstraction; uses native `<img>` elements. | low |
| Dell Design System | Image | Basic image display with responsive sizing and alt text requirement. | low |

## Key Decision Patterns

**Most systems skip it:** The majority of Tier 2 systems (Paste, Primer, shadcn/ui, Wise) do not provide a dedicated Image component, treating image display as a platform concern handled by native HTML, framework components (Next.js Image), or CSS utilities. This reflects a pragmatic position: wrapping `<img>` adds minimal value unless the DS provides loading/error/preview behavior.

**Aspect ratio control:** Cedar (CdrImg) stands out with a `ratio` prop that enforces aspect ratio via CSS, preventing layout shift when images load. This is particularly valuable for e-commerce product grids (REI's outdoor gear catalog) where consistent image dimensions maintain visual rhythm. shadcn/ui achieves similar results via Tailwind's `aspect-ratio` utility but without component-level enforcement.

**Lazy loading:** Cedar and Lightning support lazy loading through the native `loading="lazy"` attribute exposed as a prop. No Tier 2 system implements Intersection Observer-based lazy loading at the component level — all delegate to browser-native behavior.

**Responsive images:** Cedar is the only Tier 2 system with built-in `srcset` and `sizes` prop support, enabling responsive image delivery without custom markup. Other systems expect developers to use native HTML attributes directly.

**Fallback/error handling:** No Tier 2 system provides built-in error fallback comparable to Ant Design's `fallback` prop. When images fail to load, developers must handle errors at the application layer.

## A11y Consensus
- All systems that provide an Image component require or strongly recommend `alt` text
- Cedar enforces `alt` as a required prop — the strongest Tier 2 a11y enforcement
- Decorative images should use `alt=""` to prevent screen reader announcement of the filename
- No Tier 2 system provides automated alt text validation or warning for missing alt
- Lazy-loaded images should still have proper `alt` text — loading strategy does not affect a11y requirements

## Recommended Use
Reference Cedar (CdrImg) for aspect ratio enforcement and responsive `srcset` support — it is the most complete Tier 2 Image implementation. For projects already using Next.js, shadcn/ui's omission of an Image component is intentional — use `next/image` instead. Lightning's basic wrapper adds minimal value over native `<img>`.
