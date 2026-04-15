---
system: Radix UI
component: Not available natively
url: https://www.radix-ui.com/primitives/docs/components/popover
last_verified: 2026-03-29
confidence: high
---

# Combobox

## Approach
Radix Primitives does not ship a dedicated Combobox component. This is a deliberate architectural choice rooted in Radix's philosophy of composability over convenience: a combobox is fundamentally a composition of a text input, a popover container, and a listbox with filtered results, all of which already exist as separate primitives. The recommended Radix pattern is to combine `Popover` (for the floating panel), an uncontrolled `<input>` (for text entry), and either `Select` or a custom listbox built with `div[role="listbox"]` and `div[role="option"]` items. Radix Themes also does not add a Combobox, leaving this composition entirely to the consumer. This approach gives maximum flexibility but requires teams to wire up ARIA relationships, keyboard navigation (arrow keys, Escape, Enter), and filtering logic themselves.

## Key Decisions
1. **No native Combobox primitive** (HIGH) — Radix deliberately avoids building components whose ARIA pattern is a superset of existing primitives; by owning only the atomic parts, they prevent the API surface from bloating and allow consumers to combine exactly what they need.
2. **Popover + input composition pattern** (HIGH) — The recommended workaround uses `Popover.Root` with a custom trigger that wraps an input, giving consumers full control over filtering behavior (client-side, async, debounced) without the library imposing a specific strategy.
3. **No built-in filtering logic** (MEDIUM) — Because Radix is UI-agnostic about data, it intentionally omits search/filter logic, keeping the primitive pure and framework-neutral.

## Notable Props
- No component exists; no props applicable.
- For the composition pattern: `Popover.Root`, `Popover.Trigger`, `Popover.Content` props apply — see Popover documentation.

## A11y Highlights
- **Keyboard**: Must be manually implemented; standard combobox contract requires Down Arrow to open list, Arrow keys to navigate options, Enter to select, Escape to close and return focus to input.
- **Screen reader**: Consumer must set `role="combobox"` on the input, `aria-expanded`, `aria-haspopup="listbox"`, and `aria-activedescendant` pointing to the focused option.
- **ARIA**: `role="listbox"` on the dropdown container; `role="option"` on each item; `aria-selected` on the active option; `aria-autocomplete="list"` on the input.

## Strengths & Gaps
- **Best at**: Giving advanced teams full control over combobox filtering, async loading, and visual design without fighting library constraints.
- **Missing**: No pre-built Combobox means significant implementation effort for accessibility compliance; no shared keyboard navigation utility; teams commonly reinvent this pattern, leading to inconsistency across codebases.
