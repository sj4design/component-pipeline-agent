---
system: Material Design 3
component: Card
url: https://m3.material.io/components/cards
last_verified: 2026-03-28
---

# Card

## Approach
Material Design 3 treats the Card as a surface — a bounded piece of Material that lifts off the page at varying degrees to communicate hierarchy and interactivity. Google's core philosophy is that elevation is not decorative: it encodes meaning. An Elevated card signals independent content floating above the page; a Filled card signals content embedded within the surface hierarchy; an Outlined card signals content with a defined boundary that contrasts without requiring shadow. This three-variant model exists because Google's product matrix spans consumer apps, dashboards, and data-dense enterprise tools where the same card container needs to behave visually differently depending on the page surface it sits on. The interactive variant pattern (non-clickable vs. clickable) is handled by treating the card as a stateful surface with ripple and hover state — the entire card becomes a single interaction target — rather than nesting a button or link inside it. This is a deliberate choice: Google's research showed that nested interactive elements inside clickable cards create ambiguous tap targets on touch devices.

## Key Decisions
1. **Three elevation-based variants** (HIGH) — Elevated (drop shadow, `tonal-surface-container-low`), Filled (tonal surface fill, no shadow), and Outlined (1dp border, no shadow) exist because different product contexts require different visual weight. An Elevated card in a list creates depth hierarchy; a Filled card on a colored background avoids competing shadows; an Outlined card provides structure without elevation hierarchy. Choosing the wrong variant for the surface breaks Material's layering system and creates visual noise.

2. **Clickable card as a first-class variant, not a pattern** (HIGH) — M3 explicitly defines both a non-interactive and a clickable version of each card type (6 total combinations). The clickable version applies a full-surface ripple and hover/focus state, making the affordance unambiguous. This solves the "invisible link" problem where a card looks static but navigates — M3 makes interactivity a build-time decision embedded in the component variant, not a runtime composition question.

3. **No built-in header/body/footer slots** (MEDIUM) — M3 Card provides no enforced content structure. Instead, the anatomy is defined in the Material guidelines (media region at top, header area, supporting text area, actions area) but implemented via composition. The rationale is cross-platform flexibility: Android, iOS, and web each have different layout primitives, so enforcing slot APIs would break one platform. Designers specify anatomy; developers implement with platform idioms.

4. **Elevation conveys interactivity on hover** (MEDIUM) — On hover, an Elevated card increases elevation from 1dp to 2dp; a Filled or Outlined card gains a surface tint. This is intentional: elevation change is the M3 signal for "this surface is interactive," matching the motion design principle that interactive elements should respond spatially to attention. It reinforces the click affordance without adding explicit UI elements like chevrons.

5. **Image/media region as top-priority anatomy slot** (LOW) — M3 guidelines define the top of a card as the primary media zone. This reflects Google's research that image-first cards dramatically improve scannability in grid and list contexts (used heavily in Google Play, YouTube playlists, Google Shopping). The media region is full-bleed to the card edges, using aspect ratio control to prevent layout shift.

## Notable Props
- `elevation`: Controls the visual variant (0 = Filled, 1 = Elevated default, varies). The elevation prop directly encodes the semantic meaning — it is not just a shadow strength number.
- `onClick` / `interactionSource`: The presence of a click handler is what switches the card into interactive mode with ripple. No separate "clickable" boolean — behavior is inferred from whether an interaction is provided.
- `modifier.clickable()` (Compose): In Jetpack Compose, the modifier drives all interaction handling, keeping the Card itself semantically neutral.

## A11y Highlights
- **Keyboard**: Interactive cards with `tabindex="0"` receive focus; Enter or Space activates the card. Non-interactive cards are not focusable at the card level.
- **Screen reader**: M3 guidance specifies that `role="group"` or `role="region"` is appropriate depending on content grouping semantics. If the card is the primary interaction mechanism, `tabindex="0"` plus a descriptive `aria-label` is required.
- **ARIA**: No prescriptive role is mandated by the component itself — M3 explicitly says the correct role depends on content context: `role="article"` for standalone content, `role="group"` for a form grouping, no role for purely decorative containers. Interactive cards should carry an `aria-label` describing the action.

## Strengths & Gaps
- **Best at**: Communicating visual hierarchy through elevation semantics — the three-variant system is the most intentional elevation-as-meaning approach of any major design system.
- **Missing**: No built-in structural slots (header, body, footer, actions) means every team reimplements the same anatomy decisions; there is no canonical opinionated card layout, which leads to inconsistency across products.
