---
system: Orbit (Kiwi.com)
component: Drawer
url: https://orbit.kiwi/components/overlay/drawer/
last_verified: 2026-03-29
confidence: high
---

# Drawer

## Approach
Orbit's Drawer is a sliding overlay panel designed for the complex secondary interactions of a travel booking interface: filter panels during flight search (price range, airlines, stops), baggage selection detail views, and trip summary sidebars. Because these tasks require showing rich contextual information alongside the main results list without fully leaving the page, a right-anchored drawer is the natural pattern. Orbit's implementation emphasizes focus management and scroll containment, as drawers in the booking context often contain forms (baggage upgrades, seat selection) that must be completable without the background content scrolling. On mobile, the Drawer transitions to a full-screen bottom-sheet style behavior to maximize content area.

## Key Decisions
1. **Right-panel anchoring** (HIGH) — Travel filter and detail panels are conventionally right-aligned; this placement is familiar to users from aggregator tools and aligns with Kiwi.com's search results layout.
2. **Focus trap** (HIGH) — When the Drawer opens, focus is moved inside and trapped until dismissal, preventing users from inadvertently interacting with obscured background content during form completion.
3. **Mobile full-screen mode** (HIGH) — On small viewports the drawer expands to fill the screen, giving forms (baggage selection, seat maps) the space they require rather than cramming content into a partial-width panel.

## Notable Props
- `shown`: boolean controlling visibility
- `onClose`: callback for close events (backdrop click, Escape key, close button)
- `position`: `"right" | "left"` — panel anchor side
- `width`: custom width override for desktop
- `title`: header text rendered in the drawer's title bar
- `fixedFooter`: pins action buttons to the bottom of the drawer

## A11y Highlights
- **Keyboard**: Focus trapped inside when open; Escape closes the drawer; Tab cycles through interactive elements inside.
- **Screen reader**: Rendered as `role="dialog"` with `aria-modal="true"`; `aria-labelledby` points to the title element.
- **ARIA**: Background content is hidden from the accessibility tree while the drawer is open.

## Strengths & Gaps
- **Best at**: Filter panels and contextual detail views in search results; excellent mobile full-screen fallback; fixed footer for action buttons in multi-step flows.
- **Missing**: No built-in multi-step navigation within the drawer; no snap points for partial-height bottom sheets.
