---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Segmented Control

## Approach
Nord does not provide a Segmented Control component — the pill-shaped multi-option toggle common in consumer mobile UIs and design tools. In Nordhealth's clinical software context, the segmented control's specific use cases are covered by more semantically appropriate components: `<nord-tabs>` handles view-switching between distinct content sections, and styled `<nord-radio>` groups handle mutually exclusive option selection within clinical forms. The segmented control pattern is heavily associated with consumer app aesthetics (iOS UISegmentedControl, Material Design's Chip group) and conveys a lightweight, toggleable feel that can understate the significance of choices in clinical software. When a clinician selects "Once daily / Twice daily / Three times daily" for a medication frequency, the selection carries clinical implications — using a radio group makes the selection feel as deliberate and formal as it needs to be. Nord's tab component handles the view-switching case with proper semantic navigation landmarks, which is more appropriate for clinical module switching than a visual toggle.

## Key Decisions
1. **Absent by design — covered by tabs and radio groups** (HIGH) — The two primary use cases for segmented controls (view switching and option selection) are each served by semantically superior alternatives in Nord. Tabs provide navigation landmark semantics for view switching; radio groups provide form field semantics for option selection. The segmented control's visual aesthetic does not justify duplicating these capabilities.
2. **Clinical option selection requires form semantics** (HIGH) — Mutually exclusive clinical selections (medication frequency, appointment priority, triage level) are form inputs and must behave as such: they should participate in form submission, support `required` validation, and associate with a `<label>` or `<legend>`. Radio groups in Nord provide all of this; a segmented control typically does not.
3. **Consumer aesthetic is inappropriate for clinical gravity** (MEDIUM) — The segmented control's pill/toggle visual language signals "lightweight preference" (like switching between Map and Satellite view). Clinical option selections that affect patient care should feel deliberate and form-like, matching the gravity of the decision being made.
4. **Tabs provide accessible navigation landmarks** (MEDIUM) — `<nord-tabs>` renders with `role="tablist"`, `role="tab"`, and `role="tabpanel"` ARIA semantics, creating proper navigation structure in complex clinical layouts. A segmented control's `role="group"` with radio semantics would be less appropriate for content-switching navigation.

## Notable Props
- No component exists; no props applicable.
- Recommended alternatives:
  - `<nord-tabs>` / `<nord-tab>` / `<nord-tab-panel>`: For switching between distinct content views in clinical modules
  - `<nord-radio-group>` / `<nord-radio>`: For mutually exclusive option selection within clinical forms

## A11y Highlights
- **Keyboard**: Not applicable — no component exists. `<nord-tabs>` provides arrow key navigation between tabs; `<nord-radio-group>` provides arrow key navigation between radio options — both following their respective ARIA patterns.
- **Screen reader**: Not applicable — no component exists. Both tabs and radio groups have well-established ARIA patterns with strong screen reader support, superior to the less-standardized segmented control pattern.
- **ARIA**: Not applicable — no component exists

## Strengths & Gaps
- **Best at**: Directing teams toward semantically appropriate, clinically-gravity-appropriate components (tabs for navigation, radio groups for selection) rather than a visually appealing but semantically ambiguous toggle pattern
- **Missing**: No visual variant of radio groups that renders in a compact, horizontal button-group style for space-constrained clinical UIs where a traditional stacked radio list is too large; teams wanting the compact horizontal option-selector look must implement it as a custom-styled radio group, with no Nord reference pattern to follow
