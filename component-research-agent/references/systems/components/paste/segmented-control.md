---
system: Twilio Paste
component: Button Group (Segmented Control)
url: https://paste.twilio.design/components/button-group
last_verified: 2026-03-28
confidence: medium
---

# Segmented Control (Button Group)

## Approach
Twilio Paste doesn't have a component explicitly named "Segmented Control" but achieves this pattern through its RadioButtonGroup component (radio inputs styled as a connected button group). This is the semantically correct approach — segmented controls are single-selection from a set of mutually exclusive options, which maps to radio group semantics.

## Key Decisions
1. **RadioButtonGroup for segmented control** (HIGH) — Using radio group semantics for the segmented control pattern ensures correct keyboard navigation (arrow keys within group) and screen reader behavior (radiogroup/radio roles), unlike custom click-handler implementations.
2. **Attached button visual** (HIGH) — Buttons visually connect/attach to form a single composite control, consistent with the segmented control UX pattern where options appear as a unified control.
3. **Icon-only variant** (MEDIUM) — RadioButtonGroup supports icon-only options (with aria-labels) for compact icon-based segmented controls (e.g., list/grid view toggle).

## Notable Props
- `value`: Selected option
- `onChange`: Selection callback
- `orientation`: horizontal/vertical
- Options with icon or text content

## A11y Highlights
- **Keyboard**: Arrow keys within group (roving tabindex); Tab exits group
- **Screen reader**: radiogroup/radio roles; selected option announced; group label via fieldset/legend
- **ARIA**: radio group semantics; fieldset/legend for group label

## Strengths & Gaps
- **Best at**: Correct radio semantics for mutually exclusive selection; keyboard navigation
- **Missing**: May not be visually identical to iOS-style segmented control; named "RadioButtonGroup" not "Segmented Control"
