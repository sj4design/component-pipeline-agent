---
system: Fluent 2 (Microsoft)
component: Tag / TagPicker
url: https://fluent2.microsoft.design/components/web/react/tag/usage
last_verified: 2026-03-28
confidence: high
---

# Tag / TagPicker

## Approach
Fluent 2 provides Tag (display and interactive labels) and TagPicker (a full tag input component for selecting multiple values). The Tag component handles display, removable, and selectable states. TagPicker is a complete multi-value input combining an input field, suggestion dropdown, and selected tag display — one of the most complete tag input systems in any design system. This reflects Office's extensive use of tag-based inputs (email recipients, document tags, To/CC fields).

## Key Decisions
1. **TagPicker as a complete solution** (HIGH) — TagPicker handles the full multi-value selection workflow: type to filter, select from suggestions, display selections as tags, remove individual selections. This covers the Outlook recipients field pattern that is extremely common in Microsoft products.
2. **Tag appearance variants** (MEDIUM) — Tags support filled, outline, and brand appearances matching Fluent's color system. Tags in Teams channel mentions use brand appearance; category tags use subtle/outline.
3. **dismissible prop** (HIGH) — `dismissible` on Tag renders a remove button. The remove button is correctly accessible with proper labeling.

## Notable Props
- Tag: `appearance`, `dismissible`, `onDismiss`, `primary-text`, `secondary-text`
- TagPicker: full composite component with input, suggestion list, selected tags
- `size`: `"small" | "medium" | "large" | "extra-small"`

## A11y Highlights
- **Keyboard**: Remove button keyboard accessible; TagPicker: Arrow keys in suggestion list; Backspace removes last tag
- **Screen reader**: Tag text + dismiss button labeled; TagPicker announces selected items and remaining
- **ARIA**: Dismissible tags have aria-label on dismiss button; TagPicker uses combobox pattern

## Strengths & Gaps
- **Best at**: TagPicker complete solution; Office recipient patterns; appearance variants; tag secondary text
- **Missing**: No tag color picker for custom tag colors
