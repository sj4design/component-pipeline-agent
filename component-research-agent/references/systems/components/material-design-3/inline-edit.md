---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/components/text-fields/overview
last_verified: 2026-03-28
---

# Inline Edit (Absent in M3)

## Approach
Material Design 3 does not provide an InlineEdit component, and this absence reflects the system's mobile-first, form-centric design heritage. M3's approach to text editing is built around TextField — a component designed for form contexts where editing is the explicit, primary mode of the screen. Google's core products (Search, Maps, Gmail, Google Docs) either use full-screen text editors (Docs, Sheets) or search/input forms (Search, Maps) — neither context maps to the "click a value to edit it in place" pattern that InlineEdit serves. In-place editing in Google's apps tends to happen through navigation to a detail edit screen (the Android pattern) or through a dedicated edit toolbar/mode, rather than through direct manipulation of displayed text. M3 does not address in-place editing patterns in its components or patterns documentation, and there is no guidance or community pattern that fills this gap. Teams building applications that need InlineEdit with M3 are expected to compose their own solution using TextField with custom view/edit state management.

## Key Decisions
1. **Mobile-first editing model favors explicit edit modes** (HIGH) — Android's human interface guidelines have historically favored explicit navigation to edit screens rather than in-place editing, because direct manipulation is harder to discover on mobile than on desktop. A tap on a text label in a mobile app is ambiguous — it might navigate, select, or trigger a tooltip. M3's component set reflects this heritage: it provides the primitives (TextField, Chip, Switch) for explicit form-based editing, but not the in-place pattern.
2. **TextField as the composition base** (MEDIUM) — Teams that need inline editing behavior in M3 applications typically compose a solution using TextField toggled between a `readOnly` / `disabled` state (displaying the value) and an active editing state. M3's TextField has outlined and filled variants that work for this approach, but there is no standardized way to handle the confirmation (checkmark button) or cancellation (Escape key) affordances that complete the inline edit pattern.
3. **No documentation of the pattern** (HIGH) — The absence is not just component-level but also pattern-level. M3's patterns and guidelines do not document when to use inline editing vs. modal editing vs. navigate-to-edit, leaving teams without design guidance. This is a meaningful gap compared to Atlassian, which provides explicit usage guidance on when InlineEdit is appropriate vs. when a full form is better.

## Notable Props
- No component exists; no props applicable.
- Relevant existing component: `TextField` with `readOnly` prop for the display state, though this does not provide built-in view/edit mode switching.

## A11y Highlights
- **Keyboard**: Not applicable — no component. Custom implementations must handle: Enter or F2 to enter edit mode, Escape to cancel, Enter to confirm — the standard keyboard interface for inline editing patterns.
- **Screen reader**: Not applicable. A correct implementation should announce when entering edit mode (e.g., "Editing: [field name]") and when changes are saved or cancelled.
- **ARIA**: Not applicable. A custom implementation should use `aria-label` changes to reflect current mode state.

## Strengths & Gaps
- **Best at**: Nothing in this space — M3 has no inline edit capability.
- **Missing**: The entire inline editing pattern, including component, interaction specification, and design guidance on when in-place editing is appropriate. This is one of the most significant component gaps in M3 for desktop/web application use cases.
