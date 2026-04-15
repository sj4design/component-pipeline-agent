---
system: Atlassian Design System
component: Modal Dialog
url: https://atlassian.design/components/modal-dialog/
last_verified: 2026-03-28
---

# Modal Dialog

## Approach
Atlassian's Modal Dialog is built around the principle that modals in complex productivity tools (Jira, Confluence, Bitbucket) need to accommodate wildly different content scales — from a simple "Are you sure?" confirmation to a full issue creation form with multiple fields, attachments, and mentions. Rather than prescribing content types, Atlassian focuses on width as the primary sizing mechanism and lets content determine height organically. The system automatically switches to full-screen mode on viewports under 480px, reflecting Atlassian's mobile-responsive strategy without requiring developer intervention. A distinctive architectural choice is the modular sub-components — ModalHeader, ModalBody, ModalFooter, and ModalTitle are separate components composed inside ModalDialog, giving teams fine-grained control over each zone. Atlassian also invested heavily in focus management, building a custom focus lock system that handles edge cases like browser extensions injecting elements outside the modal.

## Key Decisions
1. **Width-based sizing with content-driven height** (HIGH) — Atlassian offers preset widths (small, medium, large, x-large, and a numeric custom width) but deliberately does not control height. The modal grows vertically based on content, and when it hits a threshold, the body scrolls while header and footer stay fixed. This approach was chosen because Jira modals range from 2-line confirmations to 20-field issue forms, and fixed heights would either waste space or force premature scrolling.

2. **Auto full-screen below 480px viewport** (MEDIUM) — When the browser viewport is narrower than 480px, the modal automatically fills the entire screen. Atlassian made this a built-in behavior rather than an option because their user base accesses Jira and Confluence on tablets and phones, and a centered overlay on a 400px screen is unusable. This removes the responsive-modal decision from individual developers entirely.

3. **Composable sub-components (ModalHeader, ModalBody, ModalFooter, ModalTitle)** (MEDIUM) — Instead of props for title, body, and footer, Atlassian uses child components. This allows teams to customize each zone independently — a header might have a custom breadcrumb, a footer might have a non-standard button layout, or the body might need special scroll behavior. The composition model trades simplicity for flexibility, which makes sense given the diversity of Atlassian's product suite.

4. **Focus lock with extension awareness** (MEDIUM) — Atlassian's focus lock system has a specific escape hatch: elements with the `data-atlas-extension` attribute can receive focus even while the modal is open. This was built because browser extensions (like accessibility tools or Atlassian's own Companion app) inject elements into the page that need to remain interactive. Most focus trap implementations break these extensions; Atlassian's does not.

## Notable Props
- `width`: Accepts preset strings ("small", "medium", "large", "x-large") or a numeric pixel value. The named presets cover most cases while the numeric option handles edge cases.
- `shouldScrollInViewport`: Controls whether scrolling happens within the modal body or on the viewport itself. Default is body scroll, but viewport scroll is useful for very tall modals on desktop.
- `shouldCloseOnEscapePress`: Allows disabling Escape-to-close, important for modals with unsaved form data.
- `shouldCloseOnOverlayClick`: Independent control over background-click dismissal.

## A11y Highlights
- **Keyboard**: Focus trapped with Tab/Shift+Tab cycling. Escape closes (configurable). Focus moves to the modal on open and returns to the previously focused element on close.
- **Screen reader**: `role="dialog"` on the container. ModalTitle provides `aria-labelledby`. If no visual title exists, the `label` prop provides an accessible name — though Atlassian warns this should rarely be used since sighted users also need a title.
- **ARIA**: `aria-modal="true"` prevents screen reader virtual cursor from leaving the dialog. Background content is marked inert. Atlassian specifically documents that the close button must have an accessible label.

## Strengths & Gaps
- **Best at**: Flexible content accommodation — the width presets plus content-driven height handle everything from tiny confirmations to massive multi-field forms without developer workarounds.
- **Missing**: No semantic typing (passive vs. transactional), no built-in danger variant, and no adaptive mobile container (tray/sheet) — it is either a centered modal or full-screen, with nothing in between.
