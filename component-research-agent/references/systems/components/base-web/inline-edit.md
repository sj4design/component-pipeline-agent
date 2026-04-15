---
system: Base Web (Uber)
component: Not available natively
url: https://baseweb.design/components/
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
Base Web does not offer a dedicated InlineEdit component. The system's philosophy is to provide focused, composable primitives rather than high-level composite patterns, leaving teams to assemble interaction workflows themselves. Inline editing in Base Web products is typically achieved by toggling between a display element (e.g., a `<Block>` or `<Label>`) and a Base Web `Input` component based on local React state, wiring `onFocus`, `onBlur`, and `onKeyDown` (Enter to confirm, Escape to cancel) manually. This approach gives individual product teams full control over the confirmation model (auto-save on blur vs. explicit save button), which varies substantially across Uber's internal tools.

## Key Decisions
1. **Composability over prescription** (HIGH) — Uber's product teams have divergent requirements for inline edit confirmation (auto-save, button-confirm, and keyboard-only patterns all coexist), making a single opinionated component a poor fit.
2. **Input component as foundation** (HIGH) — Base Web's Input supports all necessary states (focused, error, disabled) and is fully overridable, making it the natural building block for teams constructing inline edit patterns.
3. **No official recipe provided** (MEDIUM) — Unlike some systems (e.g., Atlassian), Base Web does not include a documented "recipe" or pattern guide for inline edit, leaving institutional knowledge to product teams.

## Notable Props
- N/A — no native component exists.

## A11y Highlights
- **Keyboard**: Teams must manually implement Enter to confirm, Escape to cancel, and focus management when toggling display/edit modes.
- **Screen reader**: The display-to-edit transition must be announced; teams should use `aria-live` or move focus explicitly.
- **ARIA**: No built-in guidance; consumers are responsible for `aria-label` and live-region announcements.

## Strengths & Gaps
- **Best at**: N/A natively; the underlying Input and Block primitives are well-suited as building blocks.
- **Missing**: No component, no pattern documentation, no accessibility recipe — teams build from scratch each time.
