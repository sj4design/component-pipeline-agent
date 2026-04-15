---
system: Fluent 2 (Microsoft)
component: Not available natively
url: https://react.fluentui.dev/?path=/docs/components-input--docs
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
Fluent 2 does not include an InlineEdit or Editable component in its core library. This absence is architecturally deliberate and reflects a broader Microsoft 365 design philosophy: rather than editing content in-place within list rows, table cells, or cards, Microsoft products favor modal dialogs, side panels, or dedicated edit pages for data mutation. This pattern prioritizes clarity and reversibility — users enter an explicit "edit mode" with clear commit (Save) and cancel actions, reducing accidental edits and making undo semantics unambiguous. In Teams, editing a message triggers an inline text area that replaces the message content but is scoped to that specific interaction and not generalized as a reusable component. SharePoint list editing opens a form panel rather than enabling cell-level inline editing. This philosophy differs significantly from design systems like Atlassian's Atlaskit or Ant Design, which treat inline editing as a core table/list interaction pattern.

## Key Decisions
1. **No native component — philosophical pattern decision** (HIGH) — Microsoft's enterprise UX research indicates that in-place editing in dense list/table views increases error rates and reduces discoverability of the save/cancel affordance; dialog and panel patterns provide clearer edit boundaries for the 300M+ non-power users of Microsoft 365.
2. **Dialog/panel for editing** (HIGH) — The recommended pattern is to use Fluent 2's `Dialog` or `OverlayDrawer` (panel) with a form containing `Input`, `Textarea`, and action `Button` components — this is the pattern used in SharePoint list editing, Teams meeting detail editing, and Outlook contact editing.
3. **Input component as DIY building block** (MEDIUM) — Teams chat message editing does use a pattern superficially similar to inline edit — clicking "Edit" replaces the message text with an `Input` or `Textarea` that accepts text and exposes Save/Cancel buttons — but this is product-level composition, not a shared Fluent component.
4. **DataGrid without inline edit** (MEDIUM) — Fluent 2's `DataGrid` component supports row selection and sorting but does not natively support cell-level inline editing; editable tables are expected to use a row-click-to-dialog or side panel pattern.

## Notable Props
N/A — No native InlineEdit component. Recommended composition pattern:
- `Input` or `Textarea` for the editable field
- `Button` (primary) for Save / confirm action
- `Button` (subtle/secondary) for Cancel action
- `Dialog` or `DrawerBody` as the editing container
- `Tooltip` on display text to hint that content is editable (if click-to-edit pattern is used)

## A11y Highlights
- **Keyboard**: Dialog-based editing inherits full keyboard trapping via Fluent's `Dialog` component (focus is trapped within the dialog, Escape cancels, Tab cycles through fields and actions); if a click-to-edit pattern is built manually, the trigger element must be keyboard-activatable (button or role="button") rather than a plain div.
- **Screen reader**: Dialog pattern announces the edit context clearly as a modal (`role="dialog"` with `aria-labelledby` pointing to the dialog title); screen reader users know they are in an edit state because focus moves to a labeled form; custom inline edit patterns require careful live region announcements when switching between view and edit modes.
- **ARIA**: `role="dialog"` with `aria-modal="true"` for dialog-based editing; any custom inline toggle between display and edit states should use `aria-live` or focus management to signal the mode switch; high-contrast mode handled by Fluent token system for all form inputs.

## Strengths & Gaps
- **Best at**: Providing the dialog and panel building blocks needed to implement Microsoft's preferred explicit-edit-mode pattern; Input and Textarea components are polished and meet Fluent's accessibility standards when composed into custom edit flows.
- **Missing**: No shared InlineEdit primitive means every product team reimplements the click-to-edit pattern independently; no standardized API, keyboard behavior, or visual treatment for transitioning between display and edit states; DataGrid lacks built-in cell editing, which limits its applicability for spreadsheet-like enterprise data management UIs.
