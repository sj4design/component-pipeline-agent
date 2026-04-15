---
system: Twilio Paste
component: Spinner
url: https://paste.twilio.design/components/spinner
last_verified: 2026-03-28
confidence: high
---

# Spinner

## Approach
Twilio Paste's Spinner is an indeterminate loading indicator for async operations where progress cannot be quantified. It's used inline within Button's loading state, in page sections loading async data, and in form fields with async validation. Paste's Spinner is an SVG animation with accessible labeling required.

## Key Decisions
1. **Required accessible label** (HIGH) — Spinner requires an accessible label (i18nLabel prop or aria-label) communicating what is loading, preventing the accessibility error of unlabeled loading indicators.
2. **Inline size variants** (HIGH) — Sizes match Paste's type scale tokens (sizeIcon10 through sizeIcon90) enabling inline use within text, buttons, and compact UI elements.
3. **Token-driven color** (MEDIUM) — Spinner color uses design tokens so it automatically adapts in dark mode and across different brand color themes.

## Notable Props
- `size`: sizeIcon10 through sizeIcon90 for inline sizing
- `color`: Token-based color
- `i18nLabel`: Required accessible label string (e.g., "Loading call logs")
- `decorative`: Boolean — when true, hides from screen readers (use only when label is provided by surrounding context)

## A11y Highlights
- **Keyboard**: Not interactive; not in tab order
- **Screen reader**: role="img" with aria-label from i18nLabel; decorative=true hides via aria-hidden when context provides the loading state
- **ARIA**: role="img" with aria-label; aria-hidden when decorative

## Strengths & Gaps
- **Best at**: Required accessible label enforcement; inline size variants; token-based color for theme adaptation
- **Missing**: No pulsing/shimmer skeleton alternative (separate Skeleton component); no overlay variant
