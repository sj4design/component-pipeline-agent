---
system: Adobe Spectrum (S2)
component: Skeleton
url: https://react-spectrum.adobe.com/beta/s2/Skeleton.html
last_verified: 2026-03-28
---

# Skeleton

## Approach

Spectrum 2 (S2) introduces a formal `Skeleton` component that takes a fundamentally different architectural approach from most design systems: rather than providing empty placeholder blocks that developers position manually, Spectrum's Skeleton acts as a wrapper around your actual component tree using mock/placeholder data. You build the real layout once with real components populated with representative mock data, then wrap the entire thing in `<Skeleton isLoading={true}>` — and the shimmer effect is applied over those real components. This "real layout, fake data" model means the skeleton always matches the final content shape exactly, because it *is* the final component structure. When loading completes, you simply toggle `isLoading` to false and swap in real data. This prevents the common failure mode of a skeleton that looks nothing like the loaded content.

The component specifically targets text, images, icons, StatusLight, Badge, and Meter as the elements it replaces with shimmer placeholders. Critically, any forms within a Skeleton wrapper are automatically disabled, preventing user interaction with incomplete interfaces — a defensive UX decision that acknowledges forms with partial data are dangerous. The shimmer animation itself uses a gradient sweep (wave) style that signals active loading progress.

## Key Decisions

1. **Wrapper model instead of placeholder blocks** (HIGH) — Spectrum's Skeleton wraps real components rather than requiring developers to build parallel skeleton layouts. WHY: Adobe's design team recognized that maintaining two separate layouts — one real, one skeleton — creates drift over time. When the real component changes its layout, the skeleton version becomes stale and inaccurate. The wrapper model eliminates this maintenance burden entirely because there is only one layout definition.

2. **Selective component coverage** (HIGH) — The shimmer effect only applies to specific element types: text, images, icons, StatusLight, Badge, and Meter. WHY: these are the visually dominant, layout-defining elements. Non-covered elements (buttons, dividers, labels) remain visible even during loading, which helps merchants immediately understand the page structure. This curated approach reflects Adobe's philosophy that skeleton should reduce uncertainty, not increase it by hiding everything.

3. **Automatic form disabling** (HIGH) — Forms inside a Skeleton automatically become disabled when `isLoading` is true. WHY: submitting a form before all data has loaded can produce corrupt state — particularly relevant in Adobe's creative and analytics products where form values may depend on loaded configuration data. Disabling forms proactively prevents this class of error.

4. **Shimmer (wave) animation** (MEDIUM) — Spectrum uses a directional shimmer sweep rather than a pulse/opacity fade. WHY: shimmer implies directionality and motion, which reads as "content is traveling toward you" — more psychologically effective than a static pulse for long loading states. It aligns with Spectrum's broader motion philosophy of purposeful, meaningful animation.

5. **S2-only: not available in Spectrum 1** (MEDIUM) — The Skeleton component is a Spectrum 2 addition and was absent from the original Spectrum system. WHY: Spectrum 1's component-level loading states were handled ad hoc or with Progress Circle. S2's introduction of Skeleton reflects a maturation of Adobe's product UX philosophy as it moved toward more complex, data-heavy application interfaces in Experience Cloud products.

## Notable Props
- `isLoading`: Boolean toggling the skeleton state — the only required prop. This minimalist API reflects the wrapper philosophy: the component doesn't need to know what's loading, only whether it is
- `children`: The actual component tree with mock data — unlike other systems where children are never visible during loading, here children define the skeleton's shape

## A11y Highlights
- **Keyboard**: Non-interactive during loading; wrapped form elements are automatically disabled preventing premature keyboard interaction
- **Screen reader**: Specific ARIA implementation is not fully documented in the S2 beta docs. The automatic form disabling suggests awareness of interaction-state accessibility, but explicit `aria-busy` or `aria-live` patterns are not confirmed as built-in. Developers are advised to supplement with `aria-busy="true"` on the containing region
- **ARIA**: No confirmed built-in `role="status"` or `aria-live` region — this is documented as a gap in the beta. Adobe's broader React Spectrum commitment to WAI-ARIA suggests this will be addressed before stable release

## Strengths & Gaps
- **Best at**: Eliminating skeleton/content layout drift through the wrapper model — the most architecturally elegant approach among all 6 systems reviewed
- **Missing**: Still in beta (S2), meaning ARIA/screen reader behavior is not finalized; no built-in `prefers-reduced-motion` opt-out is documented; no explicit guidance on skeleton duration before switching to error state
