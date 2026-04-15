---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Skeleton

## Approach
Nord does not provide a Skeleton loader component — the animated placeholder shape pattern used in consumer applications to simulate content before it loads. This absence is a principled position rooted in the clinical context of healthcare software and the Nordic design philosophy of honest, accurate information. In healthcare UIs, skeleton loaders create a category of dangerous ambiguity: when a patient record or lab result section shows a pulsing gray placeholder, a clinician cannot determine whether the system is loading real data that will appear shortly, or whether the section is empty, errored, or unavailable. In high-pressure clinical environments — emergency departments, ICUs, operating rooms — this ambiguity is not acceptable. Clinical data should only be shown when it is accurate and complete. Nord follows a deterministic loading philosophy: clinical sections remain visually absent until data is ready, with Nord's `<nord-spinner>` providing explicit, unambiguous loading state indication at the page or section level, and `<nord-notification variant="error">` communicating load failures clearly.

## Key Decisions
1. **Absent by design — clinical data accuracy requirement** (HIGH) — Skeleton loaders visually imply that content exists and is on its way. If the data fails to load, errors, or is genuinely absent, the skeleton placeholder has been lying to the clinician about the content state. In medical software, every visual state must accurately represent the system state — false positives about data availability are a patient safety concern.
2. **Absent by design — Nordic honesty principle** (HIGH) — Nordic design philosophy prioritizes honest, direct communication over optimistic UI patterns. Consumer skeleton loaders are optimistic UX — they assume success and pre-render a positive loading state. Nord's clinical context demands pessimistic/accurate UX: show loading state explicitly, show data when available, show errors clearly.
3. **`<nord-spinner>` is the sanctioned loading indicator** (HIGH) — Nord's Spinner component provides unambiguous "system is working" communication without implying anything about the shape or quantity of the forthcoming data. It clearly signals a loading state rather than pre-suggesting content that may not arrive.
4. **Server-rendered clinical data reduces loading state frequency** (MEDIUM) — Nordhealth's EHR products favor server-side rendering patterns for critical clinical data, reducing client-side loading states. When data is rendered server-side, skeleton loaders are unnecessary — the page either loads with data or shows an error, with no intermediate uncertain state.

## Notable Props
- No component exists; no props applicable.
- Recommended alternatives:
  - `<nord-spinner>`: Explicit, unambiguous loading indicator; use at section or page level while clinical data fetches
  - `<nord-empty-state>`: For sections where no data exists (not loading, genuinely empty)
  - `<nord-notification variant="error">`: For data load failure states

## A11y Highlights
- **Keyboard**: Not applicable — no component exists. Note: animated skeleton loaders present accessibility challenges (motion sensitivity, `prefers-reduced-motion` compliance) that Nord's spinner handles through its animation behavior.
- **Screen reader**: Not applicable — no component exists. Skeleton loaders have well-known screen reader accessibility problems — animated placeholder shapes have no semantic content, requiring complex ARIA live region management to communicate loading state. Nord's `<nord-spinner>` with `aria-label` provides a cleaner assistive technology experience.
- **ARIA**: Not applicable — no component exists

## Strengths & Gaps
- **Best at**: Maintaining clinical data accuracy standards by refusing a loading pattern that misrepresents system state; the spinner provides clean, accessible, unambiguous loading communication; reduces motion accessibility concerns by avoiding animated skeleton patterns
- **Missing**: No progressive content reveal primitives for clinical pages where sections load asynchronously at different times (e.g., a patient summary where demographics load fast but lab results load slowly); teams must design their own multi-section loading orchestration without Nord skeleton patterns; no `prefers-reduced-motion`-respecting fade-in transition utilities for when content does arrive
