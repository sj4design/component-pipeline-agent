---
component: Transfer
tier: 3
last_verified: 2026-03-31
---

# Transfer — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Not available — no primitive | No transfer primitive; dual-list can be composed from two `ScrollArea` + `Checkbox` groups + `Button` actions; no recipe or pattern guidance exists. | high |
| Chakra UI | Not available | No transfer component in v2 or v3; multi-selection handled via `CheckboxGroup` or `Menu` with multi-select; no dual-list composition guidance. | high |
| GOV.UK | Not available — different pattern scope | No transfer component; government form patterns use checkbox lists with "select all" for bulk selection; multi-page form flows handle assignment rather than side-by-side dual lists. | high |
| Base Web | Not available — no dual-list pattern | No component; Uber's internal assignment workflows (driver groups, city zones) use custom implementations; no design system abstraction for transfer. | high |
| Fluent 2 | Not available (SwatchPicker is unrelated) | No dedicated transfer/dual-list component; Fluent 1 had no transfer either; Microsoft 365 admin assignment UIs (user-to-group, license assignment) use custom picker dialogs. | high |
| Gestalt | Not available — board-based selection | No component; Pinterest's board management (adding pins to boards) uses modal pickers with search rather than dual-list transfer. | high |
| Mantine | TransferList | Full-featured dual-list: two searchable lists with checkboxes; bidirectional move buttons; `nothingFound` empty state per list; `transferAll`/`transferAllMatchingFilter` for bulk move; custom item render via `itemComponent`; controlled via `value` as `[sourceData, targetData]` tuple. | high |
| Orbit | Not available — travel domain | No transfer component; Kiwi.com's booking flows use single-selection patterns (flight selection, seat selection) rather than bulk assignment between lists. | high |
| Evergreen | Not available — no assignment pattern | No component; Segment's source/destination configuration uses step-based wizards with single selections rather than dual-list transfer. | high |
| Nord | Not available — clinical workflow focus | No transfer component; Nord's patient-to-provider or resource assignment workflows use search-based pickers within clinical workflow steps. | high |

## Key Decision Patterns

The transfer component is exceptionally rare across Tier 3 systems — only Mantine provides a dedicated implementation. This extreme scarcity (1 of 10 systems) is even more pronounced than in Tier 1 (1 of 6, Ant Design) and Tier 2 (1 of 8, Lightning DualListbox), confirming that the dual-list transfer is a niche enterprise pattern rather than a universal UI primitive.

**Mantine TransferList as the strongest composable reference:** Mantine's `TransferList` is a well-designed dual-list implementation that pairs well with Ant Design's Transfer as a cross-tier reference. Its data model uses a `[left, right]` tuple where each side is an array of `{ value, label, ...rest }` objects, with `onChange` returning the updated tuple after any move. This tuple approach is ergonomically simpler than Ant Design's `dataSource` + `targetKeys` model, as it avoids the indirection of key-based mapping. The `transferAll` and `transferAllMatchingFilter` actions are explicit — when search is active, "move all" only moves filtered items, preventing accidental bulk transfer of hidden items. The `nothingFound` prop per list provides empty state messaging ("No users available", "No items selected"), which is important UX for transfer lists where one side may frequently be empty.

**Custom item rendering as a shared pattern:** Both Mantine (`itemComponent`) and Ant Design (`render`) provide custom item rendering, and this is essential for real-world transfer usage. Transferring plain text labels is a demo-only scenario — production transfer lists display rich items with avatars (user assignment), icons (permission assignment), descriptions (resource assignment), or status badges (availability indicators). Any transfer implementation must support custom item rendering to be production-viable.

**Search/filter is mandatory for usability:** Mantine includes built-in search per list by default (with `searchPlaceholder` customization). Ant Design requires opting in with `showSearch`. The consensus across all systems that offer transfer (Ant, Lightning, Mantine) is that search is not optional for source lists beyond ~20 items — without it, finding a specific item in a long alphabetical list is prohibitively slow. This is a key reason many systems prefer multi-select combobox (which is search-first by nature) over transfer.

**The absence pattern reveals alternatives:** Systems without transfer components have converged on three alternative patterns for the same use case: (1) multi-select combobox/autocomplete — search-first, compact, mobile-friendly (Radix, Chakra, Fluent, Gestalt); (2) modal picker with checkbox list — full-screen or dialog with search and batch selection (GOV.UK multi-page forms, Pinterest board picker, Evergreen wizard steps); (3) multi-select data table with bulk actions — table rows with checkboxes and toolbar actions, better for multi-column data (Base Web, Nord). The choice between these alternatives depends on dataset size, item complexity, and viewport constraints.

## A11y Consensus

- Each panel should use `role="listbox"` with `aria-multiselectable="true"` and a descriptive `aria-label` that identifies the panel ("Available users", "Assigned users") — the two panels must be distinguishable by screen readers.
- Transfer action buttons (move right, move left, move all right, move all left) must have explicit `aria-label` text. Icon-only arrow buttons without labels are a common accessibility failure in transfer implementations.
- After items are moved, announce the result via `aria-live="polite"` region: "3 items moved to Assigned users. 12 available, 8 assigned." This feedback is critical because the visual change (items disappearing from one list, appearing in another) is not perceivable by screen readers without explicit announcement.
- Search/filter inputs need `aria-label` per panel ("Search available users", "Search assigned users") and should announce filtered result count changes.
- Keyboard navigation: Tab between panels and action buttons; Arrow keys within a panel to navigate items; Space to toggle checkbox selection; Enter to activate the focused transfer button. The two-panel layout requires clear tab order: source list → transfer buttons → target list.
- Disabled items (non-transferable) must use `aria-disabled="true"` with a reason available via `aria-describedby` ("This user is already a system admin and cannot be removed from the group").

## Recommended Use

Reference Mantine TransferList alongside Ant Design Transfer (Tier 1) and Lightning DualListbox (Tier 2) as the three canonical implementations. Mantine's tuple data model (`[left, right]`) is the simplest API pattern for state management. Use Ant Design for the broadest feature set (Table Transfer, pagination, one-way mode). Use Lightning for enterprise form integration (required/disabled, validation, reorder). For systems without a transfer component, evaluate whether the use case truly requires dual-list visibility — if users are selecting from a searchable dataset, multi-select combobox is typically more usable and accessible. Reserve the transfer pattern for scenarios where browsing both source and target simultaneously provides meaningful value: role/permission assignment with small option sets, column ordering, or priority ranking where target list order matters.
