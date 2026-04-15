---
system: Nord Design System (Nordhealth)
component: Avatar
url: https://nordhealth.design/components/avatar/
last_verified: 2026-03-29
confidence: high
---

# Avatar

## Approach
Nord's `<nord-avatar>` Web Component is purpose-built for healthcare professional identification and patient record contexts in electronic health record (EHR) systems. In clinical software, avatars serve a distinct function from consumer apps: they identify clinicians (physicians, nurses, pharmacists) in activity feeds, patient handoff notes, prescriptions, and appointment rosters — contexts where misidentification carries professional and patient safety implications. The component supports image-based avatars with a graceful fallback to initials, which is critical in healthcare where not all staff will have profile photos but clear identification is still required. Nord sizes the component to work in both compact list contexts (patient timelines, audit logs) and prominent display contexts (clinician profiles, appointment cards). The design aligns with Nord's clean Nordic aesthetic — minimal ornamentation, high contrast, and clinical precision.

## Key Decisions
1. **Initials fallback with deterministic color assignment** (HIGH) — In healthcare environments where photo uploads may be restricted by IT policy or privacy regulations, the initials fallback ensures every clinician and patient record remains identifiable. Deterministic color assignment from a controlled palette means the same person always gets the same color, reducing cognitive load in repeated clinical encounters.
2. **Circular shape as default** (MEDIUM) — The circular avatar is the recognized visual affordance for person identity across healthcare software. It clearly distinguishes person avatars from entity icons (departments, facilities, record types) which use rounded-rectangle shapes elsewhere in Nord.
3. **Accessible alt text requirement** (HIGH) — In clinical contexts, screen readers used by visually impaired healthcare staff must correctly identify whose record or action is being displayed. The component enforces meaningful alt text to prevent ambiguous "image" announcements in EHR audit trails or prescription workflows.
4. **Size variants for contextual density** (MEDIUM) — Clinical UIs range from compact data tables (small avatars in audit logs) to prominent handoff cards (large avatars for shift change communication). Nord provides size variants to serve all density levels without creating bespoke implementations.

## Notable Props
- `name`: Full name of the person — used to generate initials fallback and accessible label (e.g., `"Dr. Anna Korhonen"`)
- `src`: Image URL for photo-based avatar; component gracefully falls back to initials if image fails to load
- `size`: Size variant — `"s"` | `"m"` | `"l"` | `"xl"` controlling rendered dimensions
- `variant`: Visual shape or treatment variant if applicable to the version

## A11y Highlights
- **Keyboard**: Avatar is non-interactive by default; when used inside interactive elements (links, buttons), keyboard focus and interaction is inherited from the parent
- **Screen reader**: Renders with `role="img"` and derives `aria-label` from the `name` prop, ensuring screen reader users hear "Dr. Anna Korhonen" rather than a generic "image" announcement
- **ARIA**: Uses `aria-hidden="true"` on the decorative image element when the `name` attribute provides the accessible label, preventing double-announcement of the person's name

## Strengths & Gaps
- **Best at**: Clinician and patient identification in EHR interfaces; consistent, accessible person representation across appointment, prescription, and audit log contexts; reliable initials fallback for environments with restricted photo uploads
- **Missing**: No built-in status indicator overlay (e.g., "on-call", "off-duty" badge) which clinical scheduling UIs often need; no group/stacked avatar pattern for multi-clinician care teams; limited customization of initials color palette for teams wanting organization-branded color assignments
