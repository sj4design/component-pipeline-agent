---
system: Carbon (IBM)
component: Not a standalone component — documented as a layout pattern
url: https://carbondesignsystem.com/elements/2x-grid/overview/
last_verified: 2026-03-28
---

# Divider (Absent as Component — Exists as Layout Pattern)

## Approach
Carbon Design System does not ship a Divider component. Instead, Carbon handles visual and structural separation through its 2x Grid system, spacing tokens, and border utilities rather than through a dedicated separator component. This is a philosophically significant distinction: Carbon's view is that separation between content regions should be achieved through adequate whitespace (governed by the spacing scale: 8px, 16px, 24px, 32px, 48px, 64px) and through the inherent borders of UI elements (panel headers, card borders, tile boundaries). A thin decorative line is considered a last resort in Carbon's visual language — if content areas are well-separated by space and container borders, a divider line adds visual noise rather than clarity. This approach is consistent with IBM's enterprise application design philosophy, which favors density and information richness over decorative visual elements.

## Key Decisions
1. **Whitespace over decorative lines** (HIGH) — Carbon's grid and spacing system is built on a base-8 scale that creates inherent visual rhythm between content sections. The system's position is that if two sections need a divider line to be visually separated, the spacing between them is probably insufficient. This philosophy pushes developers to solve separation through layout rather than decoration. In practice, this means Carbon UIs tend to be denser and rely on card containers, panel headers, and tab structures for sectioning rather than horizontal rules.
2. **Border utilities as the practical divider** (MEDIUM) — Where Carbon components need visual separation (between a modal header and body, between a data table header and content), they use border tokens from the Carbon color token system rather than a Divider component. The token `border-subtle-01` (a light gray) serves the role that a Divider would serve in other systems. Teams building custom layouts can use this same token directly in their CSS, achieving visual consistency without a component dependency.
3. **Section pattern for labeled group separation** (MEDIUM) — For separating named groups of form fields or content sections, Carbon's pattern documentation recommends Section headers (a styled heading + space below it) rather than a titled divider line. This is a compositional pattern, not a component, and it reflects Carbon's general preference for headings as semantic section markers over decorated horizontal rules with embedded text.
4. **Inconsistency risk in community practice** (LOW) — Because Carbon doesn't provide a Divider component, teams across IBM products implement horizontal rules inconsistently — some use `<hr>` with CSS, some use a div with a bottom border, some use a Carbon tile component as a section wrapper. This lack of standardization is a recognized gap in the Carbon ecosystem, and community discussions suggest a Divider component may eventually be added to address it.

## Notable Props
- No component exists; no props applicable.
- Relevant token: `$border-subtle-01` — 1px border in Carbon's color system, functionally equivalent to what a Divider would render.
- CSS pattern used in practice: `border-bottom: 1px solid var(--cds-border-subtle)` applied to container elements.

## A11y Highlights
- **Keyboard**: Not applicable — no component exists.
- **Screen reader**: Teams using `<hr>` for dividers get browser-native `role="separator"` behavior. Teams using CSS borders on divs get no separator semantics, which is an accessibility gap in Carbon's current approach.
- **ARIA**: No guidance provided by Carbon. This is a documented gap — there is no official Carbon guidance on when to use `role="separator"` vs. `aria-hidden="true"` for visual separators implemented through borders.

## Strengths & Gaps
- **Best at**: Encouraging separation through whitespace and container structure — Carbon UIs are often more organized than competitors not because of dividers but because the grid system enforces spatial discipline.
- **Missing**: A standardized, accessible divider element with documented semantic guidance — the absence means teams make inconsistent choices between `<hr>`, CSS borders, and empty spacer elements, resulting in accessibility and visual consistency gaps across IBM products.
