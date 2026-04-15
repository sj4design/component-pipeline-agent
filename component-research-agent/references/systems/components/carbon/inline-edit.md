---
system: Carbon (IBM)
component: Not available natively
url: https://carbondesignsystem.com/components/overview/
last_verified: 2026-03-28
---

# Inline Edit (Absent in Carbon)

## Approach
Carbon Design System does not include a standalone InlineEdit component. Carbon does address in-place editing in specific contexts — notably the DataTable component, which supports editable cells through its built-in edit mode — but there is no general-purpose InlineEdit component that can be used for arbitrary text values (headings, item names, descriptions) outside a data table context. Carbon's approach to editing in enterprise IBM products tends toward explicit form patterns: a settings page, an edit modal, or a dedicated edit state of a full form — rather than direct manipulation of displayed values. This reflects the context of IBM's primary applications (cloud infrastructure dashboards, security analytics tools, DevOps pipelines) where users are managing critical system configurations, and the stakes of an accidental edit are high enough to warrant explicit edit modes with clear confirmation rather than casual in-place editing.

## Key Decisions
1. **DataTable handles its own inline editing** (HIGH) — Carbon's DataTable component has a built-in `inline` edit pattern for cell-level editing within tables. This is the most common inline editing use case in IBM's enterprise products, and Carbon addressed it at the component level. However, this editing behavior is tightly coupled to the DataTable context and cannot be extracted for use in arbitrary text-value editing. The architectural decision to scope inline editing to tables rather than building a general InlineEdit primitive reflects Carbon's product-requirements-driven development model.
2. **Edit patterns in Carbon favor explicit modes** (HIGH) — Carbon's design patterns documentation addresses editing through "structured list," "data table," and "form" patterns — all of which use explicit edit buttons that switch the view to an edit state, rather than double-click or click-to-edit direct manipulation. This is a deliberate accessibility choice as well as a design preference: explicit edit modes are more discoverable (the affordance is visible), less prone to accidental activation, and easier to implement correctly with keyboard navigation.
3. **No community pattern fills the gap cleanly** (MEDIUM) — Unlike the ColorPicker gap, which has documented community extensions, there is no widely adopted Carbon community pattern for general InlineEdit. Teams in the IBM ecosystem who need it typically look to Atlassian's InlineEdit as an implementation reference while adapting the visual styling to Carbon tokens. This cross-system borrowing is an acknowledged reality in IBM product teams.

## Notable Props
- No component exists; no props applicable.
- Relevant existing component: `DataTable` with `useEditableRows` pattern for table-context inline editing.

## A11y Highlights
- **Keyboard**: Not applicable for a standalone component. DataTable's inline editing uses F2 to enter edit mode in cells, Escape to cancel, Enter to confirm — following the ARIA grid interaction pattern.
- **Screen reader**: Not applicable for standalone. DataTable's editable cells announce edit mode state through ARIA.
- **ARIA**: Not applicable.

## Strengths & Gaps
- **Best at**: Table-context inline cell editing through DataTable — Carbon's DataTable inline editing is well-designed for enterprise data grids with large datasets.
- **Missing**: A general-purpose InlineEdit for non-table contexts — heading editing, item name editing, description editing, attribute editing in detail panels — all common enterprise application patterns that Carbon teams must implement without a standard component reference.
