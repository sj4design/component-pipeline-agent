---
system: Chakra UI
component: Spinner
url: https://chakra-ui.com/docs/components/spinner
last_verified: 2026-03-28
confidence: high
---

# Spinner

## Approach
Chakra UI's Spinner is a simple, styled loading indicator with size, speed, and color control. It uses CSS border animation for the spinning effect. The component is commonly used inside Buttons (via isLoading prop on Button), in content areas during async loads, and as page-level loading indicators.

## Key Decisions
1. **emptyColor for track** (MEDIUM) — `emptyColor` sets the color of the spinner track (the non-spinning portion). Setting this to a lighter version of the main color creates a more refined spinner appearance than the typical single-color spinner.
2. **thickness** (MEDIUM) — Controls the width of the spinner ring. Thicker spinners are more visible; thinner ones are more subtle for inline use.

## Notable Props
- `size`: `"xs" | "sm" | "md" | "lg" | "xl"`
- `color`: spinning segment color
- `emptyColor`: track color
- `thickness`: ring thickness
- `speed`: rotation duration in seconds
- `label`: screen reader label (default "Loading...")

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: `role="status"` with `aria-label` from `label` prop; default label is "Loading..."
- **ARIA**: Pre-configured accessible label prevents unlabeled spinners

## Strengths & Gaps
- **Best at**: emptyColor for track; pre-configured aria-label; speed control; token-based color
- **Missing**: No multiple spinner styles (bars, dots); no overlay spinner for full-section loading
