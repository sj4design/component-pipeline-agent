---
system: shadcn/ui
component: Combobox (via Command + Popover)
url: https://ui.shadcn.com/docs/components/combobox
last_verified: 2026-03-28
confidence: high
---

# Combobox

## Approach
shadcn/ui's Combobox is not a standalone component but a composition pattern documented in the Combobox recipe — combining the Command component (cmdk library, providing the filterable list UI) inside a Popover. This gives it the same powerful search/filter UI as the Command Menu but anchored to a specific input field. The pattern is well-documented with multiple variants. It's one of shadcn/ui's most-cited composition recipes.

## Key Decisions
1. **Command + Popover composition** (HIGH) — Reuses the Command component (cmdk) inside a Popover rather than building a separate combobox component, demonstrating shadcn/ui's composition-over-new-components philosophy; also means the combobox gets all of cmdk's fuzzy search capabilities for free.
2. **Popover anchor** (HIGH) — The Combobox trigger is a Button styled to look like a select input, and the Command filter UI appears in a Popover anchored to it — keeping keyboard focus in the Popover while the full cmdk search experience is preserved.
3. **Multi-select variant** (MEDIUM) — Multi-select combobox is documented as a variant using the same Command + Popover pattern with checkboxes in the option list, showing selected items as a comma-separated display in the trigger.

## Notable Props
- Composed from: Popover, PopoverTrigger, PopoverContent, Command, CommandInput, CommandList, CommandItem
- No single component — recipe-based

## A11y Highlights
- **Keyboard**: Trigger opens Popover; CommandInput auto-focused; Down/Up to navigate; Enter to select; Escape to close Popover
- **Screen reader**: Popover announces as dialog or listbox; CommandInput as searchbox; options as listbox items
- **ARIA**: role="combobox" on trigger button; role="listbox" in Command list; aria-expanded; selected state via aria-selected

## Strengths & Gaps
- **Best at**: Powerful fuzzy search filtering (cmdk); single and multi-select variants well-documented; composable with any shadcn/ui primitive
- **Missing**: No built-in async loading state documentation; recipe-based pattern requires more setup than a dedicated component; no official grouped options support
