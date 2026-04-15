---
system: Salesforce Lightning Design System
component: Inline Edit
url: https://lightningdesignsystem.com/components/data-tables/#Inline-Edit
last_verified: 2026-03-28
confidence: high
---

# Inline Edit

## Approach
Salesforce Lightning has robust Inline Edit support, particularly within Data Tables — a core CRM interaction pattern where users edit field values directly in table rows without navigating to a separate edit form. This is critical for Salesforce's CRM efficiency: sales reps can update opportunity amounts, close dates, or contact names directly in list views without opening individual records. Lightning also supports inline edit on record fields outside tables via the "edit pencil" pattern on record detail pages.

## Key Decisions
1. **Table inline edit** (HIGH) — Primary use case; clicking a cell in an inline-editable table reveals an input field in place, with a popout confirmation for longer edits, directly supporting Salesforce's list view editing workflow.
2. **Pencil icon trigger on record fields** (HIGH) — On record detail pages, a pencil icon appears on hover/focus of field values, enabling click-to-edit for individual fields, matching Salesforce's record editing UX paradigm.
3. **Mass inline edit** (MEDIUM) — Multiple rows can be edited simultaneously in table inline edit, supporting bulk data entry workflows important for CRM data quality.

## Notable Props
- DataTable-level: `inline-edit-enabled` prop
- Cell-level: edit trigger mechanism
- Popout edit panel for complex field types

## A11y Highlights
- **Keyboard**: Double-click or Enter to enter edit mode; Escape to cancel; Tab/Enter to confirm; arrow keys to navigate cells in read mode
- **Screen reader**: Edit mode announced; save/cancel controls announced; field label maintained during edit
- **ARIA**: aria-haspopup for cells with popout edit; live region announcement when entering/exiting edit mode

## Strengths & Gaps
- **Best at**: Table inline edit for CRM list views; record field inline edit; mass edit support; Salesforce data entry patterns
- **Missing**: Generic standalone inline edit component outside of table/record contexts
