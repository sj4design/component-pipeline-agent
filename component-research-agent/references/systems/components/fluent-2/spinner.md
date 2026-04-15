---
system: Fluent 2 (Microsoft)
component: Spinner
url: https://fluent2.microsoft.design/components/web/react/spinner/usage
last_verified: 2026-03-28
confidence: high
---

# Spinner

## Approach
Fluent 2's Spinner is used extensively across Microsoft products for loading states. It supports multiple sizes (tiny to huge), label positions (before/after/above/below the spinner), and appearance (primary brand color, inverted for dark backgrounds). The label is built-in (unlike Radix where label must be externally added) and shows below the spinner by default — the "Loading..." pattern that Office users expect.

## Key Decisions
1. **labelPosition** (HIGH) — `"above" | "below" | "before" | "after"` — the label can appear at any edge of the spinner. Office loading states typically show label below; Teams shows it to the right for inline use.
2. **appearance** (MEDIUM) — `"primary"` (brand blue) and `"inverted"` (white for dark backgrounds). Inverted is used in dark panels, dialogs with dark overlays, and dark-mode surfaces.
3. **Huge size** (MEDIUM) — Sizes up to "huge" for page-level loading indicators that need to be prominent.

## Notable Props
- `label`: loading message string
- `labelPosition`: `"above" | "below" | "before" | "after"`
- `size`: `"tiny" | "extra-small" | "small" | "medium" | "large" | "extra-large" | "huge"`
- `appearance`: `"primary" | "inverted"`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Built-in label; role="progressbar" with label; loading state announced when spinner appears
- **ARIA**: label prop provides accessible name; should use aria-live on container

## Strengths & Gaps
- **Best at**: labelPosition flexibility; inverted for dark backgrounds; huge size for page-level loading; built-in label
- **Missing**: No spinner style variants (only ring/circle style)
