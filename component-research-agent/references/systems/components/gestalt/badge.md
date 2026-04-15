---
system: Gestalt (Pinterest)
component: Badge
url: https://gestalt.pinterest.systems/web/badge
last_verified: 2026-03-28
confidence: medium
---

# Badge

## Approach
Gestalt's Badge is used for status labels in Pinterest's advertising and content management UIs — campaign status, pin status, board visibility. It supports semantic color variants with text content. The badge is non-interactive and follows Gestalt's text-must-convey-meaning principle.

## Key Decisions
1. **type for semantic color** (HIGH) — `type: "info" | "success" | "warning" | "error" | "neutral" | "lightWash" | "darkWash"` — semantic types rather than arbitrary colors.
2. **Required text** (HIGH) — The text prop is required, enforcing that badges always have text content.

## Notable Props
- `text`: required badge text
- `type`: semantic color variant
- `position`: `"middle" | "top"` for absolute positioning on parent elements

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Text is accessible name; semantic type aids screen reader users
- **ARIA**: No special ARIA; text conveys meaning

## Strengths & Gaps
- **Best at**: Semantic type system; required text enforcement; position for icon overlays
- **Missing**: No count badge variant; no animated notification badge
