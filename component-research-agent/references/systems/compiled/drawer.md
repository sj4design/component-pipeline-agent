---
component: drawer
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Side Sheet (Standard + Modal variants) / Navigation Drawer (separate)
**Approach:** M3 distinguishes Side Sheets (for supplementary content) from Navigation Drawers (for app navigation). Side Sheets come in two variants: Standard (persistent, pushes main content) and Modal (overlay with scrim). Bottom Sheet is the mobile equivalent. Navigation Drawer is a separate component in M3's component catalog.
**Key Decisions:**
- [HIGH] Side Sheet vs. Navigation Drawer separation: content drawers (showing details, filters, tools) and navigation drawers (app nav) are different components with different semantic roles
- [HIGH] Standard (persistent) vs. Modal: Standard pushes content and stays open; Modal overlays with a scrim and closes on outside click — appropriate for different use cases
- [MED] Bottom Sheet for mobile: Side Sheets are desktop-oriented; M3 recommends Bottom Sheet for mobile contexts where side panels don't fit the screen width
**Notable API:** `SideSheet` with `show/hide` for Standard variant; `ModalSideSheet` for overlay; `NavigationDrawer` separate component
**A11y:** Modal Side Sheet uses `role="dialog"` with `aria-modal` and `aria-labelledby`; focus trapped within; Escape closes. Standard (persistent) does not trap focus.
**Best at:** Explicit semantic distinction between navigation and content drawers — clearest taxonomy for when to use which drawer type.
**Missing:** Direction control (M3 Side Sheets are left/right only); no built-in nesting support.

---

## spectrum
**Component:** Absent — ModalOverlay + Dialog composition
**Approach:** Spectrum has no dedicated Drawer component. The recommended approach is `ModalOverlay` + `Dialog` with custom CSS to position the dialog as a slide-in panel. This ensures the focus trap, Escape handling, and scroll lock come from the robust Dialog implementation. Spectrum's intentional absence forces all overlay content into the accessible Dialog pattern.
**Key Decisions:**
- [HIGH] Absent: Spectrum's position is that any overlay with interactive content should be a Dialog with full focus trapping — a "drawer" is just a positioned Dialog
- [HIGH] Focus trap non-negotiable: Spectrum's architecture ensures all modal content is in a Dialog; a separate Drawer component would risk developers building overlays without focus management
- [MED] No Tray component either: Spectrum also lacks a Tray (bottom sheet) — the same ModalOverlay + Dialog composition is recommended for bottom panels
**Notable API:** `ModalOverlay` + `Dialog` with CSS `position: fixed; inset-block-start: 0; inset-inline-end: 0; height: 100%` for a right drawer appearance
**A11y:** Dialog provides `role="dialog"`, `aria-modal`, focus trap, and Escape handling automatically. The strongest a11y foundation for a drawer-like overlay.
**Best at:** Accessibility guarantee — any content placed in the ModalOverlay + Dialog pattern gets correct focus management and ARIA semantics automatically.
**Missing:** Drawer-specific features: width configuration, push vs. overlay behavior, multiple directions, and built-in slide animation.

---

## carbon
**Component:** Absent — UI Shell Right Panel / Modal workaround
**Approach:** Carbon has no standalone Drawer component. The UI Shell's "Right Panel" pattern covers the app-level side panel use case for IBM Cloud's contextual help and notifications panels. For non-shell use cases, teams use Modal with custom CSS. A community GitHub issue (#8481) requests a Drawer component but it remains unimplemented in core Carbon.
**Key Decisions:**
- [HIGH] Absent from core: IBM's enterprise applications use full-page navigation and context switching rather than drawer overlays for secondary content
- [MED] UI Shell Right Panel as the de facto drawer: Carbon's shell architecture includes a right panel slot for contextual help, notifications, and secondary navigation — covers the most common IBM enterprise drawer use case
- [MED] Community gap: Issue #8481 documents the need; workarounds using `Modal` with position overrides are the practical pattern for teams outside the UI Shell context
**Notable API:** No standalone component. `Modal` with custom CSS `right: 0; height: 100%; width: 320px; margin: 0` as a workaround.
**A11y:** Modal workaround inherits Carbon's Modal a11y (focus trap, `role="dialog"`, `aria-modal`). UI Shell Right Panel has its own ARIA implementation.
**Best at:** UI Shell Right Panel for app-level contextual panels within IBM Cloud-style applications.
**Missing:** A general-purpose Drawer component for non-shell contexts — teams needing a drawer must build custom or hack Modal positioning.

---

## polaris
**Component:** Sheet (deprecated — by philosophy, not by bugs)
**Approach:** Polaris deprecated its Sheet component not due to bugs but due to design philosophy: the Sheet component "encouraged creating new layers of complexity rather than improving the existing UI." The official recommendation is to use Modal or Popover instead. This is one of the most explicit "we removed this component for UX reasons" stances in Tier 1.
**Key Decisions:**
- [HIGH] Deprecated by design philosophy: Sheet was removed because teams used it to avoid solving underlying IA problems — adding a sheet was easier than redesigning the page
- [HIGH] Modal or Popover as replacements: Modal for complex forms; Popover for contextual information — both are better contained than a full-viewport-height slide-in panel
- [MED] No migration guide to a drawer alternative: Polaris recommends rethinking the UX pattern entirely rather than providing a like-for-like replacement
**Notable API:** No active Drawer/Sheet component. `Modal` and `Popover` as recommended replacements.
**A11y:** Modal and Popover both have full ARIA and focus management. The deprecation has no negative a11y consequence — teams use better-specified components.
**Best at:** Forcing UX discipline — the deliberate removal discourages drawer anti-patterns in Shopify Admin.
**Missing:** A legitimate drawer/panel for use cases where a side panel is genuinely the right UX: filter panels, comparison views, contextual detail panels.

---

## atlassian
**Component:** Drawer (planned for deprecation)
**Approach:** Atlassian's Drawer opens from the left side only. Width is responsive: `min(90%, 20pc)` — maximum 20 picas (approximately 336px) on large screens. Five named sizes (narrow, medium, wide, extended, full) provide preset widths. Z-index 600 places it above most page content but below modals (z-index 700). The component is listed for future deprecation in favor of a more flexible overlay approach.
**Key Decisions:**
- [HIGH] Left-direction only: Atlassian's information hierarchy places navigation on the left; drawers emerge from the left for contextual navigation and detail panels — right-side drawers are handled by custom implementations
- [HIGH] Five named sizes: `narrow` through `full` cover all Jira/Confluence panel use cases with semantic names rather than pixel values
- [MED] Z-index 600: within Atlassian's z-index tier system, Drawer sits below Modal (700) but above Popups (500), preventing layering conflicts in Jira's complex panel layouts
**Notable API:** `width: "narrow" | "medium" | "wide" | "extended" | "full"`; `onClose`; `isOpen: boolean`; `overrides` for custom inner container styling
**A11y:** `role="dialog"` with `aria-modal`; focus moves to first focusable element on open; Escape closes and returns focus to trigger; scroll lock on body.
**Best at:** Named width sizes with semantic meaning for Atlassian's product context — `narrow` for help panels, `extended` for rich detail views.
**Missing:** Multi-direction support (right/top/bottom); component is planned for deprecation without a clear replacement timeline.

---

## ant-design
**Component:** Drawer (most feature-rich Tier 1 implementation)
**Approach:** Ant Design's Drawer supports four directions (top, right, bottom, left), `mask={false}` for non-blocking panel mode, documented multi-level nesting, the `push` prop for pushing parent drawers to reveal they're stacked, and a `dragger` affordance for touch-based open/close. An `extra` slot in the header renders actions alongside the title.
**Key Decisions:**
- [HIGH] Four directions: top/right/bottom/left drawer — covers all panel entry points; bottom drawer serves as a bottom-sheet equivalent; top drawer for notification panels
- [HIGH] `mask={false}` non-blocking mode: drawer stays open while the main content remains interactive — used for persistent filter panels and comparison drawers in enterprise dashboards
- [MED] Multi-level nesting with `push`: parent drawer visually pushes inward when a child drawer opens — communicates the stack depth and prevents complete overlap
**Notable API:** `placement: "top" | "right" | "bottom" | "left"`; `mask: boolean`; `push: boolean | {distance}` for multi-level offset; `extra` header slot; `destroyOnClose` for unmounting content
**A11y:** `role="dialog"` with `aria-modal` when mask is shown; Escape closes; focus trapped when blocking. When `mask={false}`, the drawer is non-modal and does not trap focus — accessible but requires consumer management of focus on open.
**Best at:** Multi-direction support, non-blocking mode, and nested drawer stacking — the most versatile drawer for complex enterprise dashboard layouts.
**Missing:** `prefers-reduced-motion` handling for slide animations; the `dragger` touch affordance does not have a documented keyboard equivalent.
