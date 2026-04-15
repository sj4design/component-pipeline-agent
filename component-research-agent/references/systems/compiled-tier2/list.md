---
component: List
tier: 2
last_verified: 2026-03-31
---

# List — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | List / Description List | Unordered, ordered, and description list primitives; ListItem with leading/trailing content slots; no built-in selection or action patterns — composed with other primitives. | high |
| Salesforce Lightning | List / ActivityTimeline / VerticalNavigation | `lightning-list-view` for record lists; description lists for key-value pairs; related list patterns for object detail pages; drag-and-drop reordering in some contexts. | high |
| GitHub Primer | ActionList | Compound component: ActionList, ActionList.Item, ActionList.LeadingVisual, ActionList.TrailingVisual, ActionList.Description; single/multi selection modes; section dividers with headers; used as building block for NavList and SelectPanel. | high |
| shadcn/ui | Command (list portion) | No standalone List component; list patterns are embedded in Command (cmdk), ScrollArea, and composed from div+map patterns; description lists are custom compositions. | medium |
| Playbook (eBay) | List / SelectableList | List with ordered/unordered/borderless variants; SelectableList for checkbox/radio selection; layout prop for horizontal/vertical; dark mode support; dual React/Rails. | high |
| REI Cedar | CdrList | Ordered, unordered, and inline list variants; modifier prop for compact/inline styling; no selection or action list patterns — purely presentational list formatting. | medium |
| Wise Design | List (not documented) | No dedicated list component in public documentation; list patterns composed from layout primitives and card-like row components. | low |
| Dell Design System | List | Enterprise data lists and description lists; structured item rows with metadata columns; verify exact API at dell.design. | low |

## Key Decision Patterns

**ActionList vs. presentational List:** The T2 set reveals two fundamentally different components sharing the "list" name. Primer's ActionList is an interactive compound component with selection, leading/trailing visuals, descriptions, sections, and keyboard navigation — it is the backbone for menus, nav lists, and select panels. In contrast, Cedar's CdrList and Paste's List are semantic HTML wrappers (ul/ol/dl) that handle typography and spacing. These are different components that happen to share a name. A design system needs both: a semantic list for content display and an interactive list for actions/selection.

**Selection as first-class pattern:** Playbook's SelectableList and Primer's ActionList both treat selection as a built-in behavior mode (single-select via radio, multi-select via checkbox). Lightning handles selection at the view/page level rather than the component level. This split reflects whether selection is a list concern or a container concern. Systems targeting data-heavy applications (Primer, Playbook) embed selection in the list; systems targeting page-level patterns (Lightning) handle it externally.

**Leading/trailing visual slots:** Primer's ActionList.LeadingVisual and ActionList.TrailingVisual establish the pattern of dedicated sub-components for the left icon/avatar and right action/badge slots. Paste's ListItem supports similar composition but through children rather than named slots. This leading-visual + content + trailing-action three-column layout is the consensus structure for interactive list items across all systems that support them.

**Description List as separate concern:** Paste, Lightning, and Cedar all treat description lists (key-value pairs) as a separate component from action/item lists. This aligns with the HTML semantic split between dl/dt/dd and ul/ol/li. Systems that conflate them into a single List component with a `type` prop typically lose the distinct layout requirements (term-description pairs vs. uniform items).

## A11y Consensus
- Presentational lists use semantic HTML: `<ul>` for unordered, `<ol>` for ordered, `<dl>` for description lists — screen readers announce list semantics and item count automatically.
- Interactive/selectable lists use `role="listbox"` with `role="option"` children (NOT `role="menu"` — that is for action menus, not selection lists).
- Single selection: `aria-selected="true"` on the active option; multi-selection: `aria-multiselectable="true"` on the listbox, `aria-selected` on each option.
- Keyboard: arrow keys navigate between items; Home/End jump to first/last; type-ahead jumps to matching items; Space/Enter selects.
- Grouped items use `role="group"` with `aria-labelledby` pointing to a section header; Primer's ActionList.Group implements this pattern.

## Recommended Use
Use Primer ActionList as the primary reference for interactive list components with selection, leading/trailing visuals, sections, and keyboard navigation. Use Playbook SelectableList for the checkbox/radio selection pattern. Use Paste List and Cedar CdrList as references for semantic presentational lists. Keep description lists as a separate component.
