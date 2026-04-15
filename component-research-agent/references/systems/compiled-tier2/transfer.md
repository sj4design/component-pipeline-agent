---
component: Transfer
tier: 2
last_verified: 2026-03-31
---

# Transfer — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Not available | No transfer component; Paste handles multi-selection via Combobox with multi-select and checkbox groups; assignment workflows use modal pickers | high |
| Salesforce Lightning | DualListbox | Dedicated dual-list component for moving options between "Available" and "Selected" lists; center arrow buttons; search filter per list; required/optional field support; reordering within target list | high |
| GitHub Primer | Not available | No transfer component; GitHub's permission and team member assignment uses autocomplete search + tag list patterns; browse-and-move dual lists not aligned with GitHub's search-first UX | high |
| shadcn/ui | Not available (community recipes) | No official component; community implementations compose two ScrollArea lists + Button actions using Radix primitives; no standardized pattern in the shadcn/ui registry | medium |
| Playbook | Not available | No transfer component; eBay's item management workflows use multi-select tables with bulk actions rather than dual-list transfer | medium |
| REI Cedar | Not available | No transfer component; outdoor retail context has limited bulk assignment use cases | low |
| Wise Design | Not available | No transfer component; financial product workflows use step-based flows with selection screens rather than side-by-side lists | low |
| Dell Design System | Not available | No transfer component in public docs; enterprise IT provisioning workflows likely use custom dual-list implementations internally | low |

## Key Decision Patterns

**Lightning DualListbox as enterprise reference:** Lightning's `DualListbox` is the only dedicated transfer component in Tier 2 and one of the strongest implementations across all tiers alongside Ant Design. It provides two vertically-stacked panels ("Available Options" and "Selected Options") with bidirectional arrow buttons, a search filter input for the source list, and up/down reorder buttons for the target list. The reorder capability is a key differentiator — it acknowledges that in many enterprise scenarios (field ordering, column arrangement, priority assignment), the sequence of selected items matters as much as the selection itself. The component integrates with Lightning's form model, supporting `required`, `disabled`, field-level help text, and validation error states, making it a true form control rather than a standalone widget.

**Search-first alternatives dominate:** The overwhelming pattern in Tier 2 is the absence of a transfer component, with systems preferring search-driven multi-select patterns instead. Paste uses multi-select Combobox, Primer uses autocomplete with avatar-enriched results, and shadcn/ui defers to composed Combobox + tag patterns. This reflects a broader industry trend: as datasets grow, browsing a complete source list becomes impractical, and type-to-search with progressive disclosure is more scalable. The dual-list transfer pattern is most valuable when the source list is small enough to browse (under ~100 items) or when seeing all available options simultaneously is important for the user's decision.

**Bulk action tables as alternative:** Playbook and Dell's enterprise patterns suggest that multi-select data tables with bulk action toolbars serve a similar function to transfer components — users select rows via checkboxes and apply an action ("Add to group", "Assign to project"). This table-based approach handles multi-column data better than a transfer's single-line item display and scales to larger datasets via built-in pagination and sorting.

**Rarity reflects pattern evolution:** Only 1 of 8 Tier 2 systems (Lightning) has a dedicated transfer component. This extreme rarity — even more pronounced than in Tier 1 where Ant Design provides the pattern — suggests that the dual-list transfer is a legacy enterprise pattern being supplanted by more compact alternatives (multi-select combobox, picker modals, filterable checkbox lists) that work better on smaller viewports and with larger datasets.

## A11y Consensus
- Each panel should use `listbox` role with `aria-multiselectable="true"` and a descriptive `aria-label` ("Available options", "Selected options")
- Transfer action buttons must have explicit `aria-label` text ("Move selected to target", "Move selected to source", "Move all to target", "Move all to source") — icon-only arrows are insufficient
- Selected item count should be announced: "3 of 15 items selected" as live text or in the panel header
- Reorder buttons (when present) need `aria-label` ("Move up", "Move down") and should announce the new position via `aria-live`
- Search/filter input needs `aria-label` ("Filter available options") and should announce result count changes ("5 matching items")
- Lightning's DualListbox uses `aria-describedby` for field-level help text, connecting the overall component to its description

## Recommended Use
Use Lightning DualListbox as the primary Tier 2 reference for enterprise transfer patterns — it is the only dedicated implementation and includes reordering, search, form integration, and field validation. For systems without a transfer component, consider whether the use case truly requires simultaneous visibility of source and target lists; if not, a multi-select combobox or picker modal is likely a better fit. Reserve the dual-list transfer pattern for scenarios with browsable-size source lists (under ~200 items), where users benefit from seeing what has and has not been selected simultaneously, and where ordering of selected items matters. For large datasets, prefer searchable multi-select with tag display of selections.
