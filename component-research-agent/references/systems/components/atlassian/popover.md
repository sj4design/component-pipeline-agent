---
system: Atlassian Design System
component: Popup (+ InlineDialog, deprecated)
url: https://atlassian.design/components/popup
last_verified: 2026-03-28
---

# Popover

## Approach

Atlassian has navigated the popover space through two overlapping components — InlineDialog and Popup — and is actively consolidating. The older InlineDialog was designed for "small amounts of information with optional controls" in a contextual overlay, serving the role most systems call a popover. Over time, Atlassian recognized that InlineDialog's design model was overly prescriptive about content and insufficiently flexible for the range of overlay use cases that emerged across Jira, Confluence, and Trello. The newer Popup component is positioned as a leaner, more composable primitive that displays "brief content in an overlay" without mandating a specific content structure.

The deprecation of InlineDialog in favor of Popup reflects a broader Atlassian pattern: consolidate overlapping components by standardizing the interaction model (anchor, position, dismiss, z-index management) and delegating content structure to the consumer. This mirrors how Polaris uses Popover as a general container. The result is that Atlassian now has a clear story: Popup for any anchored overlay, Modal for anything requiring full focus interruption, and Tooltip for non-interactive descriptions. InlineDialog exists only in legacy codebases and is explicitly documented as "plan to deprecate."

## Key Decisions

1. **Popup over InlineDialog consolidation** (HIGH) — Atlassian's decision to deprecate InlineDialog in favor of Popup was driven by the desire to have one canonical anchored overlay component rather than two that teams constantly had to choose between. The criteria for the choice (popup vs. inline dialog) were unclear to teams in practice, leading to inconsistent implementations across products. A single Popup component removes that ambiguity.

2. **Portal-based rendering** (HIGH) — Popup renders into a portal at the document body level rather than in-place in the DOM. This prevents z-index and overflow:hidden clipping issues that frequently plagued InlineDialog when placed inside complex container hierarchies. IBM's products (Jira's sidebar, Confluence's editor, Trello's board columns) all have deeply nested scroll containers where in-place overlay rendering fails visually.

3. **Z-index tier system** (MEDIUM) — Atlassian uses an explicit layering system with z-index values at specific tiers (e.g., 600 for overlays), ensuring predictable stacking across products. This is critical for a platform where multiple Atlassian products may render simultaneously in the same browser window (via Connect apps or embedded iframes).

4. **Optional blanket/backdrop** (MEDIUM) — Unlike Dialog which always shows a dimming backdrop, Popup's backdrop is configurable in opacity and can be fully transparent. This reflects the nature of popover interactions: they should not visually "lock" the page the way a modal does. Teams can add subtle dimming for focus-intensive popovers or omit it entirely for lightweight ones.

## Notable Props

- `placement`: Standard anchor-relative positioning using Popper.js-style placement strings (top, bottom, left, right with -start/-end modifiers).
- `trigger`: Accepts a render prop that receives `triggerRef` and `...triggerProps` to attach to any custom trigger element — more composable than requiring a specific trigger component.
- `isOpen` / `onClose`: Controlled state. Atlassian does not provide an uncontrolled Popup, making dismissal logic explicit.

## A11y Highlights

- **Keyboard**: Escape closes the popup and returns focus to the trigger. Tab navigates within open popup content.
- **Screen reader**: The overlay content container uses `role="dialog"` or an appropriate role based on content type. The trigger element receives `aria-haspopup` and `aria-expanded` state management.
- **ARIA**: InlineDialog (legacy) relied on manual ARIA wiring; Popup improves on this by providing integrated aria prop forwarding to the trigger via the render prop pattern.

## Strengths & Gaps

- **Best at**: Portal-based rendering with explicit z-index management — the most production-proven solution for complex multi-product platforms where overlay stacking is a persistent engineering problem.
- **Missing**: The consolidation to Popup is ongoing and documentation depth is thinner than InlineDialog's — teams migrating from InlineDialog have limited migration guidance.
