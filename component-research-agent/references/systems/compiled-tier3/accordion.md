---
component: Accordion
tier: 3
last_verified: 2026-03-29
---

# Accordion — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Accordion | Headless primitive with composable parts (Root, Item, Header, Trigger, Content) exposing a CSS custom property for height animation. | high |
| Chakra UI | Accordion | Styled accordion with Chakra theme tokens; uses `allowMultiple`/`allowToggle` boolean props rather than a type string; ships visual defaults. | high |
| GOV.UK | Accordion | Progressive-enhancement accordion for long-form government content; signature "Show all sections" global toggle; no animation by design. | high |
| Base Web | Accordion | Override-based customization model; `renderAll` prop for SEO/print; paired `Accordion` and `StatefulAccordion` controlled/uncontrolled variants. | medium |
| Fluent 2 | Accordion | Token-based, multi-panel default to match productivity-app expectations; optimised for navigation panel and settings use cases. | high |
| Gestalt | Not available — no accordion component | Pinterest's visual-feed product surfaces have no need for traditional accordions; collapsible content uses the Module card component instead. | medium |
| Mantine | Accordion | Four built-in visual variants (default, contained, filled, separated); configurable chevron position and custom chevron node; loop keyboard navigation. | high |
| Orbit | Itinerary / Collapse | No generic accordion; domain-specific Itinerary component for flight segments; lightweight Collapse primitive for general show/hide. | medium |
| Evergreen | Not available — use Pane + disclosure pattern | No accordion component; teams compose one from Pane primitives and the `useDisclosureState` hook. | medium |
| Nord | nord-accordion (web component) | Healthcare-focused web component; single-item-open default for reduced cognitive load; framework-portable via custom element standard. | low |

## Key Decision Patterns

The T3 systems reveal a stronger bifurcation between "give me a primitive" and "give me a finished component" than T1/T2 systems typically show. Radix sits firmly at the primitive end — zero styling, maximum ARIA correctness. Mantine sits at the finished-component end, shipping four named visual variants so teams rarely need to write custom CSS. GOV.UK and Fluent 2 represent a third position: opinionated about use-case fitness (long-form content for GOV.UK, navigation panels for Fluent) rather than just about visual style.

Three systems lack a general-purpose accordion entirely: Gestalt, Orbit, and Evergreen. This is a meaningful pattern. All three reflect product contexts (Pinterest's visual feed, Kiwi.com's travel booking UI, Segment's analytics dashboard) where accordions are uncommon or can be replaced by platform-specific patterns. The absence is intentional product scoping, not an oversight.

Naming varies in revealing ways. Orbit uses "Itinerary" for its travel-specific variant and "Collapse" for the generic primitive — a direct reflection of domain-first component naming. GOV.UK uses no API name at all (it's a Nunjucks macro), reflecting its template-based rather than component-based architecture. Nord's `nord-accordion` naming follows the web component convention of vendor-prefixed custom elements.

The single vs. multiple open items decision is handled differently across every system: Radix uses a `type` string with distinct state shapes, Chakra uses two boolean props, Fluent 2 defaults to multiple, Base Web uses an `accordion` boolean to enforce single-item, and Nord defaults to single. No two systems make the same choice, highlighting this as a genuinely contested design decision.

## A11y Consensus

- All systems that implement accordion use `aria-expanded` on the trigger button to communicate open/closed state.
- Content panels are associated with their trigger via `aria-controls`, and the panel carries `role="region"` with `aria-labelledby` pointing back to the trigger heading.
- Trigger elements are native `<button>` elements (or web component buttons), not custom elements with added ARIA roles — this ensures keyboard activation and focus without extra work.
- GOV.UK and Fluent 2 explicitly address heading hierarchy: GOV.UK uses `<h2>` inside triggers; Fluent 2 exposes a configurable `as` prop so consumers control heading level and maintain document outline.
- Reduced motion is explicitly handled by Chakra (`reduceMotion` prop) and implied by Fluent 2's token-based animation; Radix leaves it entirely to consumer CSS.

## Recommended Use

Reference T3 accordion approaches when making decisions about accordion scope (general-purpose vs. domain-specific) or visual variant strategy. Radix is the canonical reference for ARIA-correct headless structure; GOV.UK is the canonical reference for progressive enhancement and power-user global toggle patterns; Mantine is the best reference for variant-based visual differentiation without custom CSS.
