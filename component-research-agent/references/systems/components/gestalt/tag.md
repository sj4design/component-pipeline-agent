---
system: Gestalt (Pinterest)
component: Tag
url: https://gestalt.pinterest.systems/web/tag
last_verified: 2026-03-28
confidence: medium
---

# Tag

## Approach
Gestalt's Tag is used for category labels, interest tags, and removable chips in Pinterest's various surfaces. Tags represent user interests, board categories, and search facets. The component supports removable mode for use in multi-select inputs and filter chips.

## Key Decisions
1. **onRemove for removable tags** (HIGH) — Passing an `onRemove` callback switches the tag to removable mode, showing an X button. Used in filter chips and tag input fields.
2. **disabled state** (MEDIUM) — Tags can be disabled, used when tag removal is not permitted in the current context.

## Notable Props
- `text`: tag label (required)
- `onRemove`: optional remove callback (enables remove button)
- `disabled`: disabled state
- `id`: required for accessibility

## A11y Highlights
- **Keyboard**: Remove button keyboard accessible when present
- **Screen reader**: Text is the accessible name; remove button labeled with tag text
- **ARIA**: Remove button aria-label includes tag text (e.g., "Remove travel tag")

## Strengths & Gaps
- **Best at**: Remove button with contextual aria-label; clean minimal design
- **Missing**: No tag color variants; no icon inside tags
