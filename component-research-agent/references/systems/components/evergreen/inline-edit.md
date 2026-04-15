---
system: Evergreen (Segment/Twilio)
component: Not available natively
url: https://evergreen.segment.com/components/
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
Evergreen does not include an InlineEdit component. Segment's UI interaction model for editing entities (sources, destinations, audiences, schemas) uses dedicated edit dialogs or SideSheets rather than in-place editing. When a user wants to rename a source or update a destination configuration, they interact with a SideSheet or Dialog that presents the full edit form for that entity — a deliberate choice that keeps the complexity of validation, saving state, and error handling in a focused overlay rather than embedded within a data display. This approach is also more appropriate for Segment's entity model: most editable objects have multiple fields that benefit from being presented together in a form context, rather than being edited one field at a time inline. The cognitive overhead of tracking which fields are "in edit mode" across a complex configuration UI would degrade the user experience.

## Key Decisions
1. **SideSheet/Dialog for entity editing** (HIGH) — Segment's entities (sources, destinations) have rich configuration; editing them requires a form context with validation and explicit save/cancel, not an inline text field that appears on click.
2. **No CRM-style inline editing patterns** (HIGH) — Evergreen is not designed for CRM or spreadsheet-style interfaces where inline editing is the dominant interaction; the target use case is data pipeline configuration, not record management.
3. **Consistent save/cancel model** (MEDIUM) — Using modal dialogs for all edits creates a consistent mental model where users always know that edits require explicit confirmation, reducing accidental changes in a platform where misconfiguration can cause data loss.

## Notable Props
- N/A — component not present in Evergreen.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: InlineEdit entirely. Teams needing it (e.g., an editable name field in a list view) should compose from Evergreen's `TextInput`, `IconButton`, and `Text` components with manual edit-mode state toggling.
