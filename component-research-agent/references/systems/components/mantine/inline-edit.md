---
system: Mantine
component: Not available natively (InlineEdit pattern)
url: https://mantine.dev/core/text-input/
last_verified: 2026-03-29
confidence: high
---

# Inline Edit (Absent)

## Approach
Mantine does not provide a dedicated InlineEdit component. The common pattern in the Mantine ecosystem is to compose inline editing behavior using conditional rendering: a Text or other display component shown by default, toggled to a TextInput on click, with keyboard submit/cancel handling wired manually. Mantine provides all the building blocks — Popover, TextInput, ActionIcon (for edit/save icons), and focus management — but does not bundle them into a pre-built InlineEdit primitive. This absence is consistent with Mantine's focus on form-context inputs: the library excels at form fields that are always-visible inputs, rather than display-mode elements that transform into inputs on interaction. Teams with data-dense UIs (admin tables, CMS fields, spreadsheet-like interfaces) typically reach for a specialized library like `react-inline-edit` or build a custom hook using Mantine's components.

## Key Decisions
1. **Not a design priority for Mantine's target audience** (HIGH) — Mantine is heavily used in SaaS dashboards, admin panels, and developer tools where standard form layouts (always-visible inputs) are the norm. Inline editing is more common in consumer products and content management tools where display-first UI is important. The absence reflects the library's actual usage patterns.
2. **Composable from primitives** (MEDIUM) — The recommended pattern uses `useState` for edit mode toggle, `TextInput` with `autoFocus` when entering edit mode, `onBlur` to save on focus loss, and Escape key handler to cancel. Mantine's `FocusTrap` component can help contain focus during editing.
3. **Popover-based alternative** (MEDIUM) — For richer inline editing (with save/cancel buttons), a Popover containing a TextInput is a common Mantine community pattern. The popover provides a contained editing context without full modal overhead.

## Notable Props
- No dedicated component; pattern uses: `TextInput`, `Text`, `ActionIcon`, `Popover`, `FocusTrap`
- `autoFocus` on TextInput when entering edit mode
- `onBlur` / `onKeyDown` for save/cancel behavior

## A11y Highlights
- **Keyboard**: Consumer-implemented; recommended: click or Enter/F2 on display text to enter edit mode; Enter to save, Escape to cancel; Tab moves to next element after save
- **Screen reader**: Display element should be marked as editable (via `aria-label` or button role); switching to input should move focus to the input with appropriate aria-label
- **ARIA**: Display element when interactive: `role="button"` or wrapped in a button; input: standard TextInput ARIA; status announcements for save/error via live region

## Strengths & Gaps
- **Best at**: Flexible composition using Mantine's own input components; full control over save/cancel UX; consistent visual treatment via Mantine tokens
- **Missing**: No pre-built InlineEdit component — every team implements the same patterns from scratch; no standard event model (save-on-blur vs save-on-enter) leads to inconsistency; no error state UI within the inline edit context
