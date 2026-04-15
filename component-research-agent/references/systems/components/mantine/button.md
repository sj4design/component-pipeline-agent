---
system: Mantine
component: Button
url: https://mantine.dev/core/button/
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
Mantine's Button is highly polished and configurable, reflecting Mantine's overall approach of providing complete, production-ready components. It covers the full range of button needs: variants (filled, outline, light, white, subtle, default, transparent, gradient), all sizes, icon support, loading states with custom loaders, full width, compact mode, and polymorphic rendering. The `variant="gradient"` option is distinctive — Mantine supports gradient buttons via a `gradient` prop that specifies color stops, reflecting the modern design trend. The component also includes a `ButtonGroup` for connected button arrangements.

## Key Decisions
1. **gradient as a built-in variant** (HIGH) — Mantine includes gradient support as a first-class button option, not a CSS hack. The `gradient` prop accepts `{ from, to, deg }` parameters. This reflects Mantine's approach of supporting modern visual trends out of the box so teams don't need to fight the component defaults.
2. **loaderProps for loader customization** (MEDIUM) — The loading state accepts `loaderProps` to customize the spinner type, size, and color. Mantine supports multiple loader variants (oval, bars, dots), and buttons can use any of them consistently with the rest of the app's loading indicators.
3. **compact prop for density** (MEDIUM) — A `compact` boolean reduces padding for contexts where space is tight (toolbars, table actions). This is separate from the size scale, allowing a "medium" button to be compact or normal.

## Notable Props
- `variant`: `"filled" | "outline" | "light" | "white" | "subtle" | "default" | "transparent" | "gradient"`
- `gradient`: `{ from: string, to: string, deg: number }` — for gradient variant
- `size`: `"xs" | "sm" | "md" | "lg" | "xl"`
- `loading` / `loaderProps`: loading state with customizable loader
- `compact`: reduced padding mode
- `leftSection` / `rightSection`: icon/content slots
- `component`: polymorphic rendering (renders as anchor, router link, etc.)

## A11y Highlights
- **Keyboard**: Native button or anchor behavior depending on component prop
- **Screen reader**: Loading state communicates busy state; disabled buttons maintain focus with `data-disabled`
- **ARIA**: `data-disabled` prevents interaction while keeping element focusable; `aria-busy` during loading

## Strengths & Gaps
- **Best at**: Gradient variant; loader customization; ButtonGroup for connected layouts; comprehensive variant set
- **Missing**: No split button or menu button component in core (available in Mantine's floating menus ecosystem)
