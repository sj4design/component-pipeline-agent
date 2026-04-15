---
component: Grid
tier: 2
last_verified: 2026-03-31
---

# Grid — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Grid / Column | 12-column flexbox grid with Grid + Column components; responsive columnSpan per breakpoint; vertical gutters via `vertical` prop on Grid | high |
| Salesforce Lightning | lightning-layout / lightning-layout-item | Flexbox-based layout with `size` and `flexibility` on items; pull/padding props; horizontal/vertical alignment; 12-column sizing via `size="6"` (of 12) | high |
| GitHub Primer | Grid (CSS utility) | No Grid component — uses CSS utility classes (`col-1` through `col-12`, `container-sm/md/lg/xl`); layout via `<Box display="grid">` with inline styles or `PageLayout` for sidebar+content | high |
| shadcn/ui | No Grid component | No dedicated grid; relies on Tailwind CSS `grid` utilities (`grid-cols-*`, `gap-*`); layout patterns documented in examples, not abstracted | high |
| Playbook | FlexItem / Layout | Flex-based layout primitives; Layout component with `position` and `size` props; no formal grid column system | medium |
| REI Cedar | CdrGrid / CdrRow / CdrCol | Vue-based 12-column grid; Row + Col hierarchy; responsive spans via `cols`/`colsSm`/`colsMd`/`colsLg`; gutter control | medium |
| Wise Design | Grid | Layout grid for financial product pages; responsive column control; minimal public documentation | low |
| Dell Design System | Grid / Row / Col | Enterprise 12-column grid; Row + Col model; responsive breakpoints; standard Bootstrap-influenced approach | low |

## Key Decision Patterns

**Component vs. utility-class approach:** The sharpest split in Tier 2 is between systems that provide Grid components (Paste, Lightning, Cedar, Dell) and those that rely on CSS utilities or primitives (Primer, shadcn/ui, Playbook). Primer and shadcn/ui explicitly chose not to abstract grid into a component — CSS Grid and Tailwind utilities are expressive enough that a component wrapper adds indirection without meaningful value. Paste and Cedar take the opposite stance: a component enforces consistent gutters, column counts, and responsive behavior that raw utilities leave to individual developer judgment.

**12-column convention is universal:** Every Tier 2 system that provides a grid uses 12 columns. None adopted 24 columns (unlike Ant Design in Tier 1). The 12-column system provides sufficient granularity for the page layouts these products need (admin dashboards, developer tools, documentation sites, e-commerce).

**Row nesting vs. flat model:** Paste uses a flat Grid > Column model (no Row). Lightning uses a flat layout > layout-item model. Cedar uses the traditional Row > Col nested model. The flat model reduces DOM depth and simplifies the mental model — the grid container handles wrapping automatically.

**Gutter control:** Paste provides `gutter` as a token-based spacing prop on the Grid container. Cedar provides gutter control at the Row level. Lightning uses padding props on items. shadcn/ui and Primer delegate entirely to CSS `gap`. The component-based systems ensure consistent gutters; the utility-based systems give full control but no enforcement.

## A11y Highlights
- Grid components are purely presentational — no ARIA roles applied to grid containers or items
- DOM source order must match visual reading order; CSS reordering (push/pull/order) risks creating a mismatch
- Responsive layout changes that move content between columns should not change the logical content sequence
- Page-level grids should use landmark elements (`<main>`, `<nav>`, `<aside>`) within grid items, not on the grid itself

## Recommended Use
Use Paste Grid for a well-structured responsive 12-column layout with consistent token-based gutters. Use Primer's PageLayout for sidebar+content page structures in GitHub-ecosystem projects. Use shadcn/ui's Tailwind grid utilities when working in a Tailwind-first codebase that avoids component abstractions for layout. Use Cedar CdrGrid for Vue-based e-commerce layouts with strict responsive column requirements. Reference Lightning's layout for Salesforce-ecosystem flat layout patterns.
