---
system: Chakra UI
component: Tag
url: https://chakra-ui.com/docs/components/tag
last_verified: 2026-03-28
confidence: high
---

# Tag

## Approach
Chakra UI provides a Tag component for interactive labels with optional remove functionality. It composes as Tag, TagLabel, TagLeftIcon, TagRightIcon, and TagCloseButton. The Tag integrates with Chakra's colorScheme system and supports the full size scale. Chakra's Tag is designed for both display labels and interactive chips (in multi-select inputs), making it more versatile than most tag components.

## Key Decisions
1. **TagCloseButton for removable tags** (HIGH) — A dedicated TagCloseButton component ensures the close button is correctly accessible (keyboard focusable, has implicit aria-label, renders as `<button>`). This avoids the common mistake of using an `×` span without button semantics.
2. **colorScheme integration** (HIGH) — Tags use the full colorScheme + variant system (solid, subtle, outline), giving them the same color token flexibility as buttons.
3. **Icon slots** (MEDIUM) — TagLeftIcon and TagRightIcon for icon placement inside tags, useful for category tags with icons.

## Notable Props
- `colorScheme`: palette token
- `variant`: `"solid" | "subtle" | "outline"`
- `size`: `"sm" | "md" | "lg"`
- `TagCloseButton`: remove button with built-in aria-label
- `TagLeftIcon` / `TagRightIcon`: icon slots

## A11y Highlights
- **Keyboard**: TagCloseButton is keyboard accessible (Tab, Enter/Space activates)
- **Screen reader**: TagLabel is the accessible name; TagCloseButton has aria-label="Close"
- **ARIA**: TagCloseButton correctly uses role="button" with appropriate label

## Strengths & Gaps
- **Best at**: TagCloseButton with correct accessibility; colorScheme integration; icon slots
- **Missing**: No tag input composition; no overflow/truncation management for long lists
