---
system: Evergreen (Segment)
component: Badge / TagInput
url: https://evergreen.segment.com/components/badge
last_verified: 2026-03-28
confidence: medium
---

# Badge / Tag

## Approach
Evergreen provides Badge for display labels and TagInput for the interactive tag input pattern. The Badge is a minimal label component with color variants matching Evergreen's intent system. TagInput is a full tag input component (type to add tags, click X to remove) used in Segment's source/destination configuration for entering allowed values, tags, and identifiers.

## Key Decisions
1. **TagInput for interactive tag entry** (HIGH) — A dedicated TagInput component for adding/removing tags by typing. Segment's pipeline configuration frequently requires entering lists of identifiers, event names, and property values.
2. **Badge color mapping to intent** (MEDIUM) — Badge colors follow Evergreen's intent system (green = positive, red = danger) for status communication.

## Notable Props
- Badge: `color`
- TagInput: `values`, `onAdd`, `onRemove`, `tagProps`, `inputProps`

## A11y Highlights
- **Keyboard**: TagInput: Enter adds tag; Backspace removes last tag; remove button per tag
- **Screen reader**: TagInput announces added/removed tags; tag count communicated
- **ARIA**: Tags have remove buttons with aria-label; input announces tag count

## Strengths & Gaps
- **Best at**: TagInput for analytics identifier entry; Badge intent color system
- **Missing**: Badge has no removable mode; limited Badge visual variants
