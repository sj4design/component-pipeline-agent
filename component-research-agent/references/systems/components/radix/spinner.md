---
system: Radix UI (WorkOS)
component: Spinner (no dedicated primitive — use CSS animation)
url: https://www.radix-ui.com/themes/docs/components/spinner
last_verified: 2026-03-28
confidence: high
---

# Spinner

## Approach
Radix Themes provides a Spinner component. At the primitives level, there is no Spinner. The Radix Themes Spinner is a styled spinning indicator for loading states. It uses SVG animation and integrates with Radix's token system for color. The component supports a `loading` prop that can be wrapped around children — when loading is true, the children are hidden and the spinner is shown.

## Key Decisions
1. **loading wrapper pattern** (HIGH) — `<Spinner loading={isLoading}>{children}</Spinner>` wraps content and shows a spinner overlay instead when loading. This is a convenient pattern for async content areas.
2. **Automatic sizing** (MEDIUM) — The spinner size adapts to the surrounding context via CSS `em` units, or can be controlled with a `size` prop.

## Notable Props
- `loading`: boolean — controls visibility
- `size`: spinner size
- `children`: content shown when not loading

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: `role="progressbar"` or similar; loading state should be communicated to AT
- **ARIA**: Loading spinner should have `aria-label="Loading"` or similar; content area should have `aria-busy="true"` during loading

## Strengths & Gaps
- **Best at**: Loading wrapper pattern; automatic sizing
- **Missing**: No spinner inside button (must be manual); no progress percentage variant
