---
system: Gestalt (Pinterest)
component: Sheet (Drawer equivalent)
url: https://gestalt.pinterest.systems/web/sheet
last_verified: 2026-03-29
confidence: high
---

# Drawer (Sheet)

## Approach
Gestalt does not use the term "Drawer." The equivalent pattern is Sheet — a panel that slides in from the side or bottom of the viewport to present supplementary content or actions without navigating away from the current context. Sheet is Pinterest's primary pattern for secondary task flows: editing pin details, viewing board options, adjusting account settings, and displaying filter panels in search. The naming choice reflects Pinterest's content-first vocabulary: a "sheet" of information overlays the current view, analogous to a physical sheet of paper placed over a workspace. On mobile (which is Pinterest's dominant platform), Sheet naturally maps to a bottom sheet — a deeply familiar mobile interaction pattern that slides up from the bottom edge. On wider viewports, it transitions to a side panel. This dual-axis behavior is central to the component's design, ensuring a single component covers both mobile and desktop contexts.

## Key Decisions
1. **"Sheet" not "Drawer"** (HIGH) — The naming is intentional and product-aligned. "Sheet" evokes layered content rather than a navigation container, positioning it correctly as supplementary context rather than a navigation destination.
2. **Bottom sheet on mobile, side panel on desktop** (HIGH) — Pinterest's mobile-first mandate means the default animation and anchoring must work as a bottom sheet. The component handles viewport-responsive positioning internally, avoiding the need for separate mobile/desktop implementations.
3. **Focus trap and scroll lock** (HIGH) — When Sheet opens, focus is trapped inside and background scroll is locked. This is critical for mobile Safari and Pinterest's PWA context where scroll management is complex.
4. **Subcomponents: Sheet.Header, Sheet.Footer** (MEDIUM) — Structured subcomponents enforce consistent header (title + close button) and footer (action buttons) areas, preventing ad-hoc layout inconsistencies in the many different Sheet use cases across Pinterest.
5. **Dismissal via overlay click and Escape key** (MEDIUM) — Pinterest users expect bottom sheets to be easily dismissible. Both tap-outside and keyboard Escape are supported, aligning with mobile and desktop conventions respectively.

## Notable Props
- `accessibilityLabel`: Required — describes the sheet's purpose for screen readers
- `heading`: Optional title text displayed in the sheet header
- `onDismiss`: Required callback invoked when the sheet should close
- `size`: `"sm"` | `"md"` | `"lg"` — controls the width on desktop; height on mobile bottom sheet
- `footer`: ReactNode for rendering action buttons in the anchored footer area
- `closeOnOutsideClick`: Boolean controlling whether clicking the backdrop dismisses the sheet (default `true`)
- `subHeading`: Secondary subtitle displayed below the main heading

## A11y Highlights
- **Keyboard**: Focus moves to the Sheet container on open; Tab cycles through interactive elements within the sheet; Escape closes the sheet and returns focus to the triggering element.
- **Screen reader**: Sheet uses `role="dialog"` with `aria-modal="true"`. `aria-labelledby` links the dialog role to the heading. Background content receives `aria-hidden="true"` when the sheet is open.
- **ARIA**: `aria-modal="true"` ensures virtual cursor is constrained to the sheet in screen readers; close button has explicit `aria-label`; focus is returned to the trigger element on close.

## Strengths & Gaps
- **Best at**: Mobile bottom sheet + desktop side panel in a single component; strong focus management; subcomponent API enforces consistent header/footer structure; widely used across Pinterest's product surface.
- **Missing**: No built-in multi-step / wizard flow within a Sheet (must be composed manually); no resize handle for user-adjustable height on mobile bottom sheets; no "push" layout mode (Sheet always overlays rather than pushing page content aside).
