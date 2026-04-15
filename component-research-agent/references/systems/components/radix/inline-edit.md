---
system: Radix UI
component: Not available natively
url: https://www.radix-ui.com/primitives/docs/overview/introduction
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
Radix Primitives does not offer an InlineEdit (or Editable) component. The inline edit pattern — where static display text toggles into an editable input field on click or focus — is considered application-level state management logic rather than a primitive interaction contract owned by an accessibility library. Radix's philosophy is that a primitive must abstract a non-trivial WAI-ARIA pattern; inline edit is essentially a conditional render between a `<span>` (or `<p>`) and an `<input>`, controlled by a boolean state variable, which does not require a dedicated accessibility pattern beyond correct focus management. Teams implement this with React state (`isEditing` boolean), rendering either the display element or an input, and ensuring focus moves to the input on edit activation and returns to the trigger on cancel/confirm. No Radix Themes component addresses this either.

## Key Decisions
1. **No native InlineEdit primitive** (HIGH) — Inline editing is a conditional render pattern driven by application state, not a discrete WAI-ARIA widget role; Radix avoids building primitives for patterns that are primarily state management concerns rather than accessibility architecture.
2. **Consumer manages focus transitions** (HIGH) — Correct inline edit behavior requires programmatic focus management (moving focus to input on activation, returning it on exit), which Radix would expose via a `ref` pattern — but since no primitive exists, teams must implement `autoFocus` on the input and manage `onBlur`/`onKeyDown` (Enter to confirm, Escape to cancel) themselves.
3. **No shared confirm/cancel interaction model** (MEDIUM) — Whether inline edit confirms on blur, on Enter, or requires explicit buttons is a product decision that varies widely; Radix correctly avoids encoding one approach into a primitive.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Consumer must implement: Enter or click to enter edit mode, Enter to confirm, Escape to cancel and restore original value, focus returns to the trigger element after exit.
- **Screen reader**: The input should have an accessible label (via `aria-label` or `aria-labelledby`); mode transitions should be announced via `aria-live` region or by ensuring focus movement implies the state change.
- **ARIA**: No specific ARIA role for inline edit; the input uses standard input semantics; optional `aria-live="polite"` region for announcing save/cancel outcomes.

## Strengths & Gaps
- **Best at**: Providing complete freedom in UX behavior — confirm-on-blur, confirm-on-Enter, explicit save/cancel buttons — with no constraints imposed by a library abstraction.
- **Missing**: No pre-built focus management utility, no standard keyboard contract enforced, no validation or error state integration; every team reimplements this from scratch with varying accessibility quality.
