---
system: shadcn/ui
component: Command (Search/Command Palette)
url: https://ui.shadcn.com/docs/components/command
last_verified: 2026-03-28
confidence: high
---

# Command (Search / Command Palette)

## Approach
shadcn/ui's primary "search" component is the Command component — a command palette/search pattern built on cmdk (by Paco Coursey). This is a full-featured fuzzy-search command palette rather than a simple search input. The Command component is also commonly composed into Combobox patterns. For simple search inputs, developers use Input[type=search] with styling. shadcn/ui's Command has become widely adopted as a versatile search+action palette.

## Key Decisions
1. **cmdk library foundation** (HIGH) — Built on cmdk, a specialized command menu library with fuzzy search, keyboard navigation, and grouping built-in, providing an extremely capable search-and-execute pattern.
2. **Combobox composition** (HIGH) — Command is combined with Popover to create Combobox (searchable select dropdown), which is shadcn/ui's recommended pattern for searchable selection.
3. **Command palette UX** (MEDIUM) — The Command component enables full command palette UI (search + categorized results + keyboard-first navigation), useful for power user interfaces.

## Notable Props
- `CommandInput`: Search input with built-in filtering
- `CommandList`: Results container with virtualization
- `CommandGroup`: Result groups with headings
- `CommandItem`: Individual selectable result
- `shouldFilter`: Boolean to disable built-in filtering for server-side search

## A11y Highlights
- **Keyboard**: Type to filter; Arrow keys navigate results; Enter selects; Escape closes; full keyboard-first design
- **Screen reader**: role="combobox" on input; role="listbox" on results; items announced as focused
- **ARIA**: Combobox pattern; aria-selected on focused item; aria-expanded; aria-activedescendant

## Strengths & Gaps
- **Best at**: Command palette pattern; fuzzy search; Combobox composition; keyboard-first power user UIs
- **Missing**: Not a simple search input component — heavier than needed for basic search; requires setup for server-side search
