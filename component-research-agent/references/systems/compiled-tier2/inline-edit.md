---
component: InlineEdit
tier: 2
last_verified: 2026-03-28
---

# InlineEdit — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | InlineEdit (not present) | Not present; compose from Text + Input + Button | high |
| Salesforce Lightning | Inline Edit | Table cell inline edit + record field pencil icon pattern; mass edit support | high |
| GitHub Primer | InlineEdit (not present) | Not dedicated; InlineAutocomplete available for @mention patterns | high |
| shadcn/ui | InlineEdit (not present) | Not present; compose from Input + conditional rendering | medium |
| Playbook | InlineEdit (not present) | Not present in public docs | medium |
| REI Cedar | InlineEdit (not present) | Not present | medium |
| Wise Design | InlineEdit (not present) | Not present; form flows used instead | low |
| Dell Design System | InlineEdit (not present) | Not present in public docs | low |

## Key Decision Patterns

**Lightning uniquely dominant:** Inline Edit is the one component in the T2 set where a single system (Lightning) is overwhelmingly the most comprehensive. Lightning's Inline Edit for tables and record fields is a core CRM interaction pattern, supporting mass edit, popout editors for complex field types, and keyboard-driven table cell editing.

**Composition pattern:** All other systems require composition for inline editing — typically: display a text element; on click/double-click or edit button, replace with an Input; confirm with Enter or a save button; cancel with Escape. This is implementable but requires custom state management.

**Pencil icon pattern:** Lightning's record field pencil icon (appears on hover/focus) is a recognizable CRM interaction pattern. Click the pencil to reveal the input in place of the display value.

**Context for inline edit:** Inline edit works best for: single-field quick corrections, table cell editing, record field updates. Avoid for complex multi-field changes (use a form modal instead) or when validation requires context from other fields.

## A11y Consensus
- Edit trigger: button (pencil icon) with aria-label="Edit [field name]"
- When entering edit mode: announce "Editing [field name]" or move focus directly to input
- Cancel: Escape key returns to display mode; announce cancellation
- Save: Enter key or Save button; announce success/failure
- In table inline edit: aria-live announcement when cell enters/exits edit mode

## Recommended Use
Use Lightning Inline Edit for Salesforce table and record field editing. Build custom inline edit in other contexts using the standard pattern (display → input → save/cancel). Lightning is the reference implementation for this pattern in the T2 system set.
