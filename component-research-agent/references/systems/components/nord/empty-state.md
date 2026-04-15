---
system: Nord Design System (Nordhealth)
component: Empty State
url: https://nordhealth.design/components/empty-state/
last_verified: 2026-03-29
confidence: high
---

# Empty State

## Approach
Nord's `<nord-empty-state>` Web Component addresses a meaningful clinical UX challenge: communicating to clinicians that a data view has no records — and distinguishing this from a loading state, an error state, or a system failure. In healthcare software, an empty patient list, an empty appointment calendar, or a "no lab results" view is a meaningful clinical state that must be communicated clearly and with appropriate context. An ambiguous empty screen could lead a clinician to believe the system failed to load data, causing them to repeat actions or escalate to IT support unnecessarily. Nord's empty state provides structured slots for an illustration or icon, a heading, a description, and optional action buttons — giving clinical product teams a consistent template to craft contextually appropriate messages like "No appointments scheduled for this patient" or "No prescriptions on record for this encounter." The clean Nordic aesthetic keeps the empty state visually calm rather than alarming, signaling normalcy rather than error.

## Key Decisions
1. **Structured slot architecture (icon + heading + description + actions)** (HIGH) — Clinical empty states require precise context: "No lab results" is meaningless without "for this encounter" or "in the last 30 days." The slot structure encourages product teams to provide meaningful clinical context rather than generic "Nothing here" messages that force clinicians to question whether the system is working correctly.
2. **Visual distinction from error states** (HIGH) — In healthcare software, clinicians must immediately distinguish "no data exists" from "system failed to load data." Nord's empty state is visually calm (no red colors, no warning icons in the default treatment) — error states use `<nord-notification variant="error">` instead. This visual separation prevents false-alarm escalations in clinical settings.
3. **Optional action slot for next-step guidance** (MEDIUM) — Clinical workflows often have a clear next action when a list is empty: "Schedule Appointment," "Add Prescription," "Request Lab Test." The action slot allows product teams to embed these workflow-advancing CTAs directly in the empty state, reducing the number of steps a clinician must take to move a patient's care forward.
4. **Illustration/icon slot for context-specific imagery** (LOW) — Different clinical contexts warrant different empty state illustrations (patient profile icon for empty patient search, calendar icon for no appointments, flask icon for no lab results). The flexible slot allows Nord-based products to build a consistent empty state pattern while using context-appropriate visuals.

## Notable Props
- `headline` / heading slot: Primary text communicating what is empty (e.g., "No appointments found")
- Default slot: Descriptive body text providing clinical context (e.g., "This patient has no upcoming appointments. Schedule one below.")
- `actions` slot: Optional action buttons for clinical next steps (e.g., a "Schedule Appointment" button)
- Icon/image slot: Contextual illustration or icon to visually reinforce the empty category

## A11y Highlights
- **Keyboard**: If action buttons are present in the actions slot, they are standard keyboard-accessible interactive elements; the empty state container itself is non-interactive
- **Screen reader**: Renders as a semantic region; heading element in the heading slot is a real heading (`<h2>` or similar) providing document structure for screen reader navigation in complex EHR pages with multiple data regions
- **ARIA**: No special ARIA attributes needed beyond the semantic heading; relies on correct heading hierarchy for assistive technology navigation context

## Strengths & Gaps
- **Best at**: Providing a structured, contextually meaningful empty state template for clinical data views; preventing confusion between "no data" and "error" states in healthcare software; supporting actionable guidance to advance clinical workflows from empty states
- **Missing**: No built-in filtering/search context variant (e.g., "No results match your search filters" which differs from "This patient has no records" and needs different copy and actions); no animation or transition for when data loads in and the empty state should disappear
