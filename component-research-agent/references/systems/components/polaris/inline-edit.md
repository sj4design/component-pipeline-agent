---
system: Polaris (Shopify)
component: InlineEdit (via TextField editing state pattern — no standalone InlineEdit component)
url: https://polaris.shopify.com/components/inline-edit
last_verified: 2026-03-28
---

# Inline Edit

## Approach
Polaris's approach to inline editing is in a transitional state. Shopify Admin does use in-place editing patterns — product title editing, order note editing, customer address editing — but the Polaris component library's implementation of this pattern has evolved. As of current documentation, Polaris approaches InlineEdit through composed patterns using TextField with specific interaction states rather than a dedicated InlineEdit component (though a dedicated component may exist in newer Polaris versions). The Polaris philosophy here reflects a broader tension in the system: Shopify's merchant-facing Admin needs to feel direct and manipulable (clicking a value to edit it directly reduces friction), but the component library's formal component count is managed carefully to avoid sprawl. The pattern documentation for Polaris recommends using a "read mode" display (the value as text or a styled display element) that, when activated, swaps to an active TextField — a composition approach rather than a dedicated component.

## Key Decisions
1. **Composition pattern over dedicated component** (MEDIUM) — Polaris's current guidance favors composing inline edit behavior from existing primitives (a display Text or Heading element paired with a TextField for the edit state) rather than providing a pre-built InlineEdit component. The advantage is flexibility — each product context has slightly different needs for how the display value renders. The disadvantage is inconsistency — without a shared component, different teams in Shopify implement the view/edit toggle differently, with different keyboard shortcuts, different save/cancel affordances, and different loading/error states.
2. **Click or focus to enter edit mode** (HIGH) — Where Polaris does document inline editing interactions, the activation pattern is a direct click on the displayed value or an explicit "Edit" affordance (pencil icon). This is safer than double-click, which is not reliably discoverable in web contexts. The design guideline is that every editable value should have a visible affordance that it is editable — users should not need to try clicking text to discover it is editable.
3. **Saving on blur vs. explicit confirmation** (MEDIUM) — Polaris pattern guidance distinguishes between auto-save-on-blur (simpler, for single-value quick edits like a product title) and explicit confirmation (for multi-field edits or any edit where data loss would be significant). This distinction is not enforced by a component but is documented as a decision point for teams. The guidance is valuable even without a component implementation.

## Notable Props
- No standalone dedicated component with specific props as of the researched version.
- For composed implementations: `TextField`'s `autoFocus`, `onBlur`, `onFocus`, and `onChange` props are the key integration points for building the edit state machine.

## A11y Highlights
- **Keyboard**: In composed implementations, the display state element should be reachable by Tab and activatable by Enter or Space. Escape should cancel without saving. Enter in the text field should confirm. Focus should return to the display element after confirmation or cancellation.
- **Screen reader**: Polaris pattern guidance notes that the active edit state should be announced to screen readers (e.g., using a visually-hidden live region that announces "Now editing: [field name]"). This is guidance rather than built-in component behavior.
- **ARIA**: Display text elements that are editable should have `aria-label` indicating editability, or be wrapped in a button element that triggers the edit mode, to make the affordance discoverable by screen reader users who may not use a mouse.

## Strengths & Gaps
- **Best at**: Design guidance on the activation model and save/cancel decision points — Polaris's pattern-level documentation on when to auto-save vs. require confirmation is the most practical usage guidance among systems that lack a dedicated InlineEdit component.
- **Missing**: A dedicated InlineEdit component with built-in state management, keyboard handling, and accessible focus management — teams must re-implement these mechanics for each in-place editing context in Shopify Admin.
