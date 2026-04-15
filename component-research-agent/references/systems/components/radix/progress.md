---
system: Radix UI (WorkOS)
component: Progress
url: https://www.radix-ui.com/primitives/docs/components/progress
last_verified: 2026-03-28
confidence: high
---

# Progress

## Approach
Radix Progress is a simple headless primitive for linear progress indicators. It composes as Progress.Root and Progress.Indicator. The progress value drives both the visual indicator (via CSS transform or width) and the ARIA state. The component handles the correct ARIA pattern for progress bars including indeterminate state.

## Key Decisions
1. **CSS-driven animation** (HIGH) — The indicator position is controlled via `transform: translateX()` or width via a CSS custom property `--radix-progress-indicator-transform`. This allows CSS transitions for smooth animation without JavaScript animation loops.
2. **null value for indeterminate** (HIGH) — `value={null}` triggers the indeterminate state (usually a cycling animation), correctly mapped to `aria-valuenow` being absent and `aria-valuetext="indeterminate"` for screen readers.

## Notable Props
- `value`: numeric progress (0-100) or null for indeterminate
- `max`: custom max value (default 100)
- `getValueLabel`: function to generate `aria-valuetext` from numeric value

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior
- **Screen reader**: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`; `aria-valuetext` for human-readable value
- **ARIA**: Null value triggers correct indeterminate state

## Strengths & Gaps
- **Best at**: Correct indeterminate ARIA; CSS-driven animation; getValueLabel for custom announcements
- **Missing**: No circular progress; no segmented/stepped progress
