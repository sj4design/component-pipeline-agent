---
system: Spectrum (Adobe)
component: Not available natively
url: https://react-spectrum.adobe.com/react-spectrum/index.html
last_verified: 2026-03-28
---

# Inline Edit (Absent in Spectrum)

## Approach
React Spectrum does not provide a dedicated InlineEdit component. The closest related component is ContextualHelp, which provides a popover with additional information about a field — but this is informational, not an edit-in-place affordance. Adobe's product applications (Photoshop, Illustrator, Experience Manager, Marketo) do employ in-place editing patterns extensively in layer name editing, asset renaming, cell editing in data grids, and annotation editing — but these implementations are built at the product level using Spectrum primitives rather than through a shared InlineEdit component. The absence in the component library likely reflects the high variability of in-place editing contexts across Adobe's product lines: a layer name edit in Photoshop has different UX constraints than a cell edit in Experience Platform data tables, making a single generalized InlineEdit component difficult to design without it being either too prescriptive or too abstract to be useful.

## Key Decisions
1. **Product-level implementation over shared component** (HIGH) — Adobe's design systems team appears to have made a deliberate architectural decision to not standardize InlineEdit at the component library level. This avoids the risk of a one-size-fits-all component that imposes constraints on high-variability editing contexts. The tradeoff is that each product team reimplements the pattern independently, creating potential inconsistency across Adobe's product ecosystem in areas like keyboard shortcuts (does F2 enter edit mode? Does click? Does double-click?), confirmation affordances, and error handling during editing.
2. **TextField + EditableText as composition primitives** (MEDIUM) — Teams building inline edit in Spectrum applications typically use TextField for the editing state and a custom styled text display for the view state. Spectrum's TextField supports `autoFocus` and `onBlur` events that allow building the core edit/confirm/cancel state machine, but the composition is non-trivial and not documented as a pattern.
3. **No pattern documentation** (HIGH) — Unlike Atlassian, which documents InlineEdit with detailed usage guidance for when it should and should not be used, Spectrum provides no pattern-level guidance on in-place editing. This is a documentation gap as much as a component gap — teams cannot look to Spectrum for guidance on keyboard behavior, save confirmation UX, or error states in inline editing contexts.

## Notable Props
- No component exists; no props applicable.
- Relevant components for composition: `TextField` (edit state), `Text` (display state), `Button` with icon (confirm/cancel affordances).

## A11y Highlights
- **Keyboard**: Not applicable — no component. The standard inline edit keyboard pattern that teams must implement manually includes: clicking or pressing Enter on the display value to enter edit mode, Escape to cancel without saving, Enter to confirm, with focus management returning to the display element after confirmation.
- **Screen reader**: Not applicable. Custom implementations must manage live region announcements when saving ("Value saved: [new value]") and when entering edit mode ("Now editing: [field name]").
- **ARIA**: Not applicable for a dedicated component. The standard approach uses `aria-label` updates, `aria-live="polite"` for save confirmations, and focus management.

## Strengths & Gaps
- **Best at**: Nothing specific — Spectrum has no inline edit capability and no documented pattern to guide custom implementations.
- **Missing**: Both the component and the pattern documentation — teams building Spectrum applications with in-place editing requirements have no official guidance from Adobe, which is a notable gap given that Adobe's own products extensively use the pattern.
