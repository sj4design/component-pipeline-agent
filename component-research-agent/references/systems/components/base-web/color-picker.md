---
system: Base Web (Uber)
component: Not available natively
url: https://baseweb.design/components/
last_verified: 2026-03-29
confidence: high
---

# Color Picker

## Approach
Base Web does not include a native color picker component. This is a deliberate product-scope decision: Uber's internal tools and consumer-facing products (ride-hailing, Eats, Freight) have no user-facing color selection workflows. The system is optimized for data-dense operational interfaces — dispatch maps, driver dashboards, analytics — where color choice is a theming concern handled at the system level via Styletron tokens, not a runtime user interaction. Teams needing color selection in one-off admin tools are expected to compose a solution using Base Web's Input and Popover primitives or adopt a standalone library.

## Key Decisions
1. **Out of product scope** (HIGH) — No Uber product surface requires end-user color selection, so investing in a maintained color picker component offers no return for the design system team.
2. **Theme-level color control** (HIGH) — Color customization in Base Web is addressed through the theme override system (`createTheme`), not interactive components, reflecting a "configure at build time, not at runtime" philosophy.
3. **Composability as fallback** (MEDIUM) — Base Web's Popover + Input + Block primitives provide enough building blocks for product teams to construct bespoke color inputs when genuinely needed.

## Notable Props
- N/A — no native component exists.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A — teams building custom solutions must implement WCAG color-contrast requirements and appropriate ARIA patterns manually.

## Strengths & Gaps
- **Best at**: Theme-level color token management via `createTheme`; Styletron integration makes design-token-driven color robust.
- **Missing**: Entirely absent as an interactive UI component; no official guidance or recommended third-party integration documented.
