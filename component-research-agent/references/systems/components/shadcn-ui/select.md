---
system: shadcn/ui
component: Select
url: https://ui.shadcn.com/docs/components/select
last_verified: 2026-03-28
confidence: high
---

# Select

## Approach
shadcn/ui's Select is built on Radix UI's Select primitive — a fully custom dropdown select that replaces the native select element with a custom-styled, accessible dropdown. This enables custom option rendering, icons, and groups while maintaining ARIA combobox semantics. The compound component pattern (Select, SelectTrigger, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator) provides full structural control.

## Key Decisions
1. **Custom dropdown over native select** (HIGH) — Uses Radix's custom select rather than native HTML select, enabling custom option rendering and consistent cross-browser appearance at the cost of native mobile behavior (no native mobile select sheet).
2. **Radix ARIA combobox implementation** (HIGH) — Radix implements the ARIA combobox listbox pattern correctly, with role="combobox" on trigger, role="listbox" on dropdown, and role="option" on items.
3. **Item grouping and labels** (MEDIUM) — SelectGroup and SelectLabel enable grouped options with visible group headers, useful for categorized option lists.

## Notable Props
- `value` / `defaultValue`: Controlled/uncontrolled selection
- `onValueChange`: Selection callback
- `disabled`: Disables the select
- `SelectItem[disabled]`: Disable individual options

## A11y Highlights
- **Keyboard**: Arrow keys navigate options; Enter/Space selects; Escape closes; type-ahead search within open dropdown
- **Screen reader**: role="combobox" on trigger announces selected value; role="option" on items; aria-selected on selected item
- **ARIA**: Radix auto-wires combobox pattern; aria-expanded on trigger; aria-activedescendant tracking focused option

## Strengths & Gaps
- **Best at**: Custom option rendering; consistent cross-browser appearance; group/label support; type-ahead in open dropdown
- **Missing**: No native mobile select behavior; no multi-select (use separate component for that)
