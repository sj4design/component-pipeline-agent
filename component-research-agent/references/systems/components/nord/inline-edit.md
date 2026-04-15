---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
Nord does not provide an Inline Edit component (a pattern where clicking a displayed value transforms it into an editable input that saves on blur or Enter key press). This absence is a direct consequence of healthcare software's strict data integrity and audit trail requirements. In clinical environments, every modification to patient data — a changed medication dosage, an updated allergy, a corrected diagnosis code — must be an explicit, intentional action with a clear save confirmation. Implicit save-on-blur editing, the core behavior of inline edit patterns, is fundamentally incompatible with this requirement: accidental keyboard navigation away from a field, a touch event on a tablet, or a screen timeout could silently commit an incorrect change to a patient record. Healthcare regulations (HIPAA, EU MDR, clinical governance standards) require audit logs showing that a specific authenticated user deliberately saved a specific change at a specific time. Nord's clinical forms use explicit "Edit" modes with visible Save/Cancel button pairs, ensuring every data modification is unambiguous and confirmable by the clinician making the change.

## Key Decisions
1. **Absent by design — clinical data audit trail requirements** (HIGH) — Healthcare regulatory standards require that all patient record modifications are explicit, logged, and attributable to an authenticated user action. Inline edit's save-on-blur behavior cannot guarantee this — accidental edits that silently persist would create HIPAA/GDPR audit violations and potential clinical harm.
2. **Absent by design — accidental edit prevention on clinical tablets** (HIGH) — EHR software is heavily used on clinical tablets where touch events can easily trigger unintended edits. An inline edit component with touch-to-edit behavior is a liability on a patient record — a misplaced touch on a medication dosage field should never silently change that dosage.
3. **Explicit edit mode with Save/Cancel is the correct clinical pattern** (HIGH) — Nord-based clinical products implement "view mode → edit mode" transitions with explicit button-triggered state changes and visible Save/Cancel controls. This pattern makes the edit state unambiguous, prevents accidental changes, and provides a clear cancel path that discards uncommitted edits.
4. **Optimistic save UX is inappropriate for clinical data** (MEDIUM) — Consumer applications use inline edit for instant gratification UX. Clinical software cannot use optimistic save patterns because a failed save (network error, validation failure, permission error) on critical patient data must result in obvious user notification, not a subtle undo prompt.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Not applicable — no component exists. Teams implementing custom edit-in-place patterns must ensure the activation mechanism is keyboard accessible, focus is properly managed between view and edit modes, and Save/Cancel actions are reachable without mouse interaction.
- **Screen reader**: Not applicable — no component exists. Custom implementations must announce the mode transition to screen reader users (e.g., via `aria-live` region or focus management to the edit input) so visually impaired clinicians know the field is now editable.
- **ARIA**: Not applicable — no component exists

## Strengths & Gaps
- **Best at**: Preventing a dangerous UI pattern in the clinical software context; the absence enforces the safer explicit-save pattern that healthcare data governance requires
- **Missing**: No documented pattern or reference implementation for the "view mode → edit mode" transition that teams should use instead; without a canonical Nord pattern, different clinical product teams implement this transition inconsistently, creating varied UX across EHR modules built on Nord
