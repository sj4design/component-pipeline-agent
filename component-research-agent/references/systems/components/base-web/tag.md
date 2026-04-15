---
system: Base Web (Uber)
component: Tag
url: https://baseweb.design/components/tag/
last_verified: 2026-03-28
confidence: medium
---

# Tag

## Approach
Base Web's Tag component is designed for labeling and categorization in Uber's operational tools. It supports removable mode (with an X button) and a clickable mode. Tags are used in multi-select displays, filter chips, and category labels. The component follows the Overrides pattern for visual customization.

## Key Decisions
1. **Removable and clickable modes** (HIGH) — Tags can be static labels, removable chips (with X button for multi-select displays), or clickable filter chips. These are separate modes controlled by whether `onActionClick` (removable) or `onClick` (clickable) props are provided.
2. **Variants: solid/outlined** (MEDIUM) — Visual variants for different contexts: solid for prominent tags, outlined for lighter labeling.
3. **Overrides** (HIGH) — Full customization per usual Base Web pattern.

## Notable Props
- `onActionClick`: enables remove button
- `onClick`: enables click interaction
- `kind`: `"neutral" | "primary" | "accent" | "positive" | "negative" | "warning"`
- `variant`: `"solid" | "outlined" | "light"`
- `closeable`: boolean for remove button
- `overrides`

## A11y Highlights
- **Keyboard**: Remove button is keyboard accessible
- **Screen reader**: Tag text is the accessible name; remove button has accessible label
- **ARIA**: Remove button has aria-label indicating which tag is being removed

## Strengths & Gaps
- **Best at**: kind semantic system; removable + clickable modes; Overrides
- **Missing**: No tag input field integration; limited icon support
