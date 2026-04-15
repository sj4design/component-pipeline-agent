---
system: Nord Design System (Nordhealth)
component: Breadcrumb
url: https://nordhealth.design/components/breadcrumb/
last_verified: 2026-03-29
confidence: high
---

# Breadcrumb

## Approach
Nord's `<nord-breadcrumb>` Web Component addresses the deep hierarchical navigation inherent to electronic health record systems, where clinical data is organized in complex nested structures: Organization → Patient → Encounter → Prescription → Medication Detail. Without clear breadcrumb navigation, clinicians risk losing context when drilling into patient records — a serious workflow concern in high-pressure clinical environments where time-to-information directly affects patient care. Nord's breadcrumb is intentionally minimal and typography-forward, matching the clean Nordic aesthetic without visual noise that could compete with critical clinical data on screen. The component uses `<nord-breadcrumb-item>` child elements to construct the trail, keeping the markup semantic and composable. Separator styling is handled via CSS custom properties, allowing healthcare product teams to match institutional style guides.

## Key Decisions
1. **Composable item-based architecture** (HIGH) — Using discrete `<nord-breadcrumb-item>` children rather than a data-array prop preserves full HTML flexibility, allowing each breadcrumb item to be a real anchor element with proper `href` attributes. This matters for healthcare applications where deep links into patient records must be shareable URLs for team handoffs and audit trails.
2. **Landmark navigation role** (HIGH) — The component renders as a `<nav>` landmark with `aria-label="Breadcrumb"` to comply with WCAG navigation landmark requirements. In clinical software used by screen reader-dependent staff, clear landmark identification prevents navigation confusion when multiple navigation regions exist on a complex EHR page.
3. **Current page marking** (HIGH) — The final breadcrumb item receives `aria-current="page"` to communicate to assistive technologies which level of the clinical hierarchy is currently active — essential when navigating patient records on wards where cognitive orientation must be instant.
4. **Minimal visual treatment** (MEDIUM) — The breadcrumb uses subdued link styling to maintain visual hierarchy, keeping focus on the primary clinical content. In dense clinical UIs (patient dashboards, encounter summaries), breadcrumbs must be present but not dominant.

## Notable Props
- `<nord-breadcrumb>`: Container element, renders as `<nav aria-label="Breadcrumb">`
- `<nord-breadcrumb-item>`: Individual trail item; accepts an `href` attribute for navigation; the last item without `href` is treated as current page
- `href` (on item): Navigation target; absence on final item signals current/active page and applies `aria-current="page"` automatically

## A11y Highlights
- **Keyboard**: All linked breadcrumb items are standard anchor elements, fully keyboard navigable via Tab; current page item is not interactive (no tab stop)
- **Screen reader**: Wrapped in `<nav>` with `aria-label="Breadcrumb"` creating a distinct navigation landmark; screen readers announce "Breadcrumb navigation" before reading the trail items; current page item announced with "current page"
- **ARIA**: `aria-current="page"` on the active item; `role="list"` on the item container to preserve list semantics in browsers that strip list semantics from CSS-styled lists

## Strengths & Gaps
- **Best at**: Deep hierarchical navigation in EHR systems; semantic HTML with shareable deep-link URLs for clinical handoffs; strong accessibility for assistive technology users in clinical settings; clean visual integration with Nord's typography system
- **Missing**: No built-in overflow/collapse behavior for very deep hierarchies (e.g., 6+ levels); no mobile-specific truncation pattern for clinical tablet use where screen real estate is limited; no support for non-link breadcrumb items (e.g., step-indicating breadcrumbs used in clinical workflows)
