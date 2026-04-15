---
component: bottom-sheet
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Bottom Sheet (Standard + Modal variants)
**Approach:** M3 has the most comprehensive bottom sheet specification of any design system. Two variants: Standard (non-modal, coexists with page content, allows interaction behind) and Modal (scrim overlay, blocks background interaction). Both slide up from the viewport bottom. A drag handle affordance at the top enables swipe gestures. Snap points (detents) define resting heights: collapsed (peek), half-expanded, and fully expanded. Nested scrolling is handled — the sheet expands first, then internal content scrolls. This is the reference implementation for mobile-first bottom sheet behavior.
**Key Decisions:**
- [HIGH] Standard vs. Modal: Standard bottom sheets are non-modal and allow concurrent interaction with page content (e.g., a map behind a location list); Modal bottom sheets block background with a scrim and require dismissal before continuing — the distinction drives when to use each
- [HIGH] Drag handle + snap points (detents): the drag handle is the primary interaction affordance; snap points at collapsed/half/full heights create the "peek → expand → full" progressive disclosure pattern that defines bottom sheet behavior
- [HIGH] Nested scrolling contract: the sheet expands to its maximum snap point before internal content begins scrolling — prevents the ambiguous "am I scrolling the sheet or the content" problem
- [MED] Swipe-to-dismiss: downward swipe past the lowest snap point dismisses the sheet; only available on Modal variant (Standard sheets persist)
**Notable API:** `BottomSheet` with `sheetState` (collapsed, partiallyExpanded, expanded); `skipPartiallyExpanded` to skip the half-height detent; `dragHandle` composable; `sheetPeekHeight` for collapsed state height
**A11y:** Modal variant uses `role="dialog"` with `aria-modal`; focus trapped within when modal; drag handle has `role="slider"` semantics for assistive technology; Standard variant does not trap focus since it is non-modal. Swipe gestures have no keyboard equivalent in the spec — implementations must provide expand/collapse buttons.
**Best at:** The definitive bottom sheet specification — snap points, drag handle, nested scrolling, and the Standard/Modal distinction. Every other system references or approximates this pattern.
**Missing:** Web implementation guidance — M3's bottom sheet spec is Android/Compose-first with no official web component; web teams must build from scratch or use third-party libraries.

---

## spectrum
**Component:** Absent — no Bottom Sheet; Tray (mobile Dialog variant) as closest pattern
**Approach:** Spectrum has no dedicated Bottom Sheet component. The closest pattern is the Tray, which is a Dialog variant that slides up from the bottom on mobile viewports. However, Tray is a simple container overlay — it does not support drag handles, snap points, or swipe-to-dismiss gestures. It is a "bottom-positioned Dialog," not a true bottom sheet with drag behavior. For any bottom-panel need, Spectrum recommends composing `ModalOverlay` + `Dialog` with bottom positioning.
**Key Decisions:**
- [HIGH] Absent: Spectrum intentionally does not provide a gesture-driven bottom sheet; all overlay content must live in the accessible Dialog pattern
- [HIGH] Tray as mobile Dialog, not bottom sheet: Tray appears at the bottom on mobile but lacks drag handle, snap points, and swipe-to-dismiss — it is a positioned modal, not a progressive disclosure surface
- [MED] Consistent overlay model: by routing all overlays through Dialog, Spectrum ensures focus trap, Escape handling, and scroll lock without per-component reimplementation
**Notable API:** `Tray` wrapping `Dialog` for bottom-positioned mobile overlays. No snap points, no drag handle props.
**A11y:** Tray inherits Dialog's full a11y: `role="dialog"`, `aria-modal`, focus trap, Escape to close. Strong a11y foundation but no gesture-specific accessibility.
**Best at:** Ensuring any bottom overlay has correct modal a11y semantics through Dialog composition.
**Missing:** True bottom sheet behavior: drag handle, snap points/detents, swipe-to-dismiss, nested scrolling, non-modal (standard) variant. Web teams needing native-feeling bottom sheet behavior must build custom.

---

## carbon
**Component:** Absent — no Bottom Sheet; Modal or Tearsheet as alternatives
**Approach:** Carbon has no Bottom Sheet component. IBM's enterprise desktop-focused design philosophy does not prioritize mobile-native patterns. The closest alternatives are Modal (for blocking overlay content) and Tearsheet (a large side-sliding panel for multi-step workflows). For mobile-responsive IBM applications, teams use custom implementations or third-party libraries. Carbon's Tearsheet (from ibm-products) is a large overlay that slides in from the right, not the bottom.
**Key Decisions:**
- [HIGH] Absent: enterprise desktop context — IBM Cloud and Watson applications are primarily desktop-first; bottom sheets are a mobile-native pattern that doesn't fit the IBM design paradigm
- [MED] Tearsheet as the large overlay pattern: Tearsheet fills the "supplementary content overlay" role but slides from the right side, not the bottom, and is sized for desktop viewports
- [MED] No mobile-specific overlay guidance: Carbon's responsive strategy focuses on layout reflow rather than introducing mobile-specific components like bottom sheets
**Notable API:** No bottom sheet component. `Modal` and `Tearsheet` serve different overlay roles.
**A11y:** Modal provides `role="dialog"`, `aria-modal`, focus trap. No gesture-based a11y considerations since the pattern doesn't exist in Carbon.
**Best at:** Explicit enterprise-desktop scope — Carbon doesn't pretend to solve mobile-native patterns it wasn't designed for.
**Missing:** Any mobile-first overlay pattern. Teams building responsive IBM applications with mobile bottom sheet needs must build entirely custom solutions.

---

## polaris
**Component:** Absent — Sheet (deprecated); no bottom sheet variant existed
**Approach:** Polaris deprecated its Sheet component (a right-side drawer) for UX philosophy reasons — it encouraged complexity layering. The deprecated Sheet was a side-anchored panel, never a bottom sheet. Polaris has no bottom sheet and no plans for one. Shopify Admin is desktop-first with responsive mobile views that use full-screen modals or page navigation on small viewports rather than bottom sheet overlays.
**Key Decisions:**
- [HIGH] Absent: Shopify Admin's mobile strategy uses full-page navigation and full-screen modals rather than bottom sheet overlays — mobile merchants navigate between full screens
- [HIGH] Sheet deprecation philosophy applies: Polaris's stance against overlay complexity extends to bottom sheets — if a side sheet encouraged bad UX, a bottom sheet would too
- [MED] Mobile = full screen: on mobile viewports, Polaris Modals expand to full screen, effectively replacing any need for a partial-height bottom sheet
**Notable API:** No component. Modal on mobile goes full-screen.
**A11y:** Not applicable — no bottom sheet implementation. Mobile Modal inherits standard Modal a11y.
**Best at:** Consistent UX philosophy — full-screen mobile interactions avoid the complexity of partial-height gestural overlays.
**Missing:** Any partial-overlay mobile pattern for progressive disclosure without full-screen takeover.

---

## atlassian
**Component:** Absent — no Bottom Sheet; Drawer (left-only) and Modal as alternatives
**Approach:** Atlassian's Drawer component only opens from the left side and is designed for navigation and contextual panels on desktop. There is no bottom sheet component. Jira and Confluence mobile apps use native mobile SDKs (iOS/Android) for bottom sheet behavior rather than the web design system. The web DS does not provide a bottom-positioned overlay of any kind.
**Key Decisions:**
- [HIGH] Absent from web DS: Atlassian's mobile experiences (Jira Mobile, Confluence Mobile) are native apps that use platform-native bottom sheets (iOS UISheetPresentationController, Android BottomSheetBehavior), not web components
- [MED] Drawer is left-only desktop pattern: Atlassian's Drawer serves navigation panels on desktop, not mobile bottom overlays
- [MED] Native-first mobile: Atlassian's strategy separates web DS (desktop focus) from native mobile (platform-native patterns) rather than building responsive web components that mimic native bottom sheets
**Notable API:** No bottom sheet. Drawer has `width` sizing but no bottom placement.
**A11y:** Not applicable for bottom sheet. Drawer provides `role="dialog"`, focus trap, Escape handling for its left-panel use case.
**Best at:** Pragmatic platform separation — native apps use native bottom sheets; web DS focuses on desktop overlay patterns.
**Missing:** Web-based bottom sheet for responsive web applications that need bottom sheet behavior without a native app wrapper.

---

## ant-design
**Component:** Drawer with `placement="bottom"` (bottom-positioned drawer, not true bottom sheet)
**Approach:** Ant Design's Drawer component supports four directions including `placement="bottom"`, which creates a bottom-sliding overlay panel. However, this is a standard Drawer positioned at the bottom — it does not provide drag handle, snap points, swipe-to-dismiss, or nested scrolling behavior. It is a "bottom drawer" (CSS-positioned overlay from the bottom edge) rather than a "bottom sheet" (gesture-driven progressive disclosure surface). The `height` prop controls the panel size. Combined with `mask={false}`, it can create a non-blocking bottom panel.
**Key Decisions:**
- [HIGH] Bottom Drawer, not Bottom Sheet: `placement="bottom"` gives a bottom-anchored overlay but without drag handle, snap points, or swipe gestures — it's a positioned drawer, not a mobile-native bottom sheet
- [MED] `mask={false}` non-blocking mode: bottom drawer without a scrim allows background interaction — approximates a Standard (non-modal) bottom sheet for desktop use cases
- [MED] `height` prop for panel sizing: numeric or string value controls the drawer height, but there are no snap points or detents — the height is fixed, not gesture-adjustable
**Notable API:** `placement="bottom"`; `height: number | string`; `mask: boolean`; `push` for nested drawers; `extra` header slot; standard Drawer API applies
**A11y:** Same as Drawer: `role="dialog"`, `aria-modal` when mask is shown, Escape closes, focus trapped when blocking. No gesture-specific a11y since no drag/swipe behavior exists.
**Best at:** Quick bottom panel overlay for enterprise dashboards — no extra dependencies, works within Ant's existing Drawer infrastructure.
**Missing:** True bottom sheet behavior: drag handle, snap points/detents, swipe-to-dismiss, nested scrolling contract. For mobile-native bottom sheet, teams must use a dedicated library.