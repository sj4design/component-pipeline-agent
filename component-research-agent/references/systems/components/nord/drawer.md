---
system: Nord Design System (Nordhealth)
component: Not available natively
url: https://nordhealth.design/components/
last_verified: 2026-03-29
confidence: high
---

# Drawer

## Approach
Nord does not provide a Drawer (side panel / side sheet) component, and this absence reflects a deliberate preference for clinical workflow clarity over UI panel patterns common in consumer software. In healthcare software interfaces — particularly electronic health records displayed on clinical workstations and tablets — a sliding side drawer that overlays or partially obscures the main content view creates problematic ambiguity: clinicians must not lose access to or visibility of the primary patient data while accessing supplementary information. Nord's preferred pattern for overlay content is the `<nord-modal>` component, which provides a focused, isolated interaction context with a clear background overlay that communicates the modal state unambiguously. For supplementary detail that needs to remain contextually adjacent, Nord-based clinical products use dedicated split-pane page layouts or navigate to a dedicated detail page, preserving the full information hierarchy without an overlay panel that could obscure critical clinical data.

## Key Decisions
1. **Absent by design — clinical data visibility** (HIGH) — Side drawers that slide over clinical content create a risk of partially obscuring patient data (vital signs, medication lists, allergy warnings) at the moment a clinician needs to cross-reference it. Full-page navigation and modal overlays provide unambiguous state transitions that are safer in high-cognitive-load clinical environments.
2. **Modal is the sanctioned overlay pattern** (HIGH) — Nord's `<nord-modal>` handles all overlay content needs: focused data entry, confirmation dialogs, detail views. Its full-page backdrop makes the overlay state clear, unlike a drawer that can leave the main view partially visible and create confusion about which content is interactive.
3. **Page-based navigation for detail contexts** (MEDIUM) — EHR workflows (Patient → Encounter → Prescription Detail) are naturally hierarchical and well-suited to page navigation. Nord's Breadcrumb and layout system support deep page hierarchies without requiring a drawer to display secondary context alongside primary content.
4. **Touch target and tablet considerations** (MEDIUM) — Nord is designed for clinical tablet use. Side drawers on tablets create edge-swipe interaction ambiguity (conflict with OS navigation gestures on iOS/Android). Full-page navigation avoids this hardware conflict in clinical tablet deployments.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: Not applicable — no component exists. Teams implementing custom drawers must manage focus trapping within the open drawer, focus restoration on close, and Escape key dismissal — the same requirements as modal dialogs per WCAG 2.1.
- **Screen reader**: Not applicable — no component exists. Custom implementations must use `role="dialog"` or `role="complementary"` depending on whether the drawer is a modal overlay or a persistent sidebar, with appropriate `aria-label` and `aria-modal` attributes.
- **ARIA**: Not applicable — no component exists

## Strengths & Gaps
- **Best at**: Keeping the component surface simple and avoiding a pattern that could create clinical data visibility risks; `<nord-modal>` covers the most critical overlay use cases with strong accessibility support
- **Missing**: No lightweight side panel option for supplementary clinical context (e.g., a patient summary panel alongside a form) that would not require full navigation or a disruptive modal; teams needing this pattern must build it from scratch, risking inconsistent implementations across clinical product teams
