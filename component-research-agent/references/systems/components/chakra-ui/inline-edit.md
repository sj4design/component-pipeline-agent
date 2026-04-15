---
system: Chakra UI
component: Editable (InlineEdit)
url: https://v2.chakra-ui.com/docs/components/editable
last_verified: 2026-03-29
confidence: high
---

# Inline Edit (Editable)

## Approach
Chakra UI names this component "Editable" — an inline text editing component that toggles between a display state (static text) and an edit state (text input). It is available in both v2 and v3, making it one of the more mature components in the library. The Editable uses a compound component pattern: `Editable` (root), `EditablePreview` (display text), `EditableInput` or `EditableTextarea` (the input), and an optional `EditableControls` render prop for custom edit/save/cancel buttons. The component manages the toggle between display and edit state, with users activating edit mode by clicking or pressing Enter/F2 on the preview text.

## Key Decisions
1. **Compound component architecture** (HIGH) — `EditablePreview` and `EditableInput` are separate children within the `Editable` root. This gives teams full control over layout — the preview and input can be sized and positioned independently. Chakra automatically swaps between showing the preview vs. the input based on edit state.
2. **Double-click or single-click activation** (HIGH) — The `selectAllOnFocus` and double-click activation can be configured. By default, clicking the preview text activates edit mode. This is configurable because some UIs (data grids) require double-click to avoid accidental edits, while simpler forms can use single-click.
3. **Custom controls via EditableControls** (MEDIUM) — The component doesn't impose a specific button layout for save/cancel. Instead, `EditableControls` is a render prop that exposes `isEditing`, `getEditButtonProps`, `getSubmitButtonProps`, and `getCancelButtonProps`. Teams compose their own control UI, which is important because save/cancel placement varies significantly across products.
4. **Textarea variant** (MEDIUM) — `EditableTextarea` replaces `EditableInput` for multi-line text. This is commonly needed for description fields, notes, and comments in data management UIs.

## Notable Props
- `defaultValue` / `value` / `onChange`: uncontrolled/controlled value
- `onSubmit`: fired when edit is confirmed
- `onCancel`: fired when edit is cancelled
- `isDisabled`: prevents editing
- `selectAllOnFocus`: selects all text when entering edit mode
- `startWithEditView`: begins in edit state (useful for "add new item" flows)
- `submitOnBlur`: boolean — auto-submit when focus leaves the input

## A11y Highlights
- **Keyboard**: Enter activates edit mode; Enter submits; Escape cancels; Tab navigates between editable fields
- **Screen reader**: Preview text is a button (activates edit on click); when edit mode activates, focus moves to the input; input has aria-label matching the field context
- **ARIA**: `EditablePreview` uses a visually-styled span that acts as a button; `EditableInput` is a standard input; state transitions are handled by focus management

## Strengths & Gaps
- **Best at**: Compound component flexibility; textarea support; full keyboard accessibility; custom controls layout; available in both v2 and v3
- **Missing**: No built-in auto-width input that matches preview text width (teams must handle sizing); no rich text / formatted content editing (plain text only); no validation state integration out of the box
