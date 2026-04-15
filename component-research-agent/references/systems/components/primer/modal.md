---
system: GitHub Primer
component: Dialog
url: https://primer.style/components/dialog
last_verified: 2026-03-28
confidence: high
---

# Dialog (Modal)

## Approach
GitHub Primer calls this component "Dialog" following the ARIA pattern name. It's built on Primer's custom focus-trap implementation and is used throughout GitHub for confirmation dialogs, settings modals, and feature-gated workflows. Primer's Dialog uses the native HTML `<dialog>` element in modern browsers where available, with a polyfill fallback, which provides native browser focus trapping and Escape handling. The component has a well-structured header/body/footer layout.

## Key Decisions
1. **Native dialog element** (HIGH) — Uses HTML `<dialog>` element where supported, leveraging native browser accessibility and focus management rather than ARIA-simulated dialogs, improving reliability across assistive technologies.
2. **Portal rendering** (HIGH) — Dialog renders into a portal at the document root, preventing z-index stacking context issues common in complex GitHub UI layouts.
3. **footerButtons prop** (MEDIUM) — Footer action buttons are configured via a prop (array of button configs) rather than slotted children, enforcing consistent footer button patterns across all GitHub dialogs.

## Notable Props
- `isOpen`: Controlled open state
- `onClose`: Close callback
- `title`: Required dialog title (used for aria-labelledby)
- `subtitle`: Optional descriptive subtitle
- `footerButtons`: Array of button configuration objects for standardized footer
- `width`: "small" | "medium" | "large" | "xlarge"

## A11y Highlights
- **Keyboard**: Focus trapped; Escape closes; focus returns to trigger on close
- **Screen reader**: role="dialog"; aria-labelledby title; aria-modal; subtitle via aria-describedby
- **ARIA**: Native dialog element provides role automatically; Primer adds aria-modal, aria-labelledby

## Strengths & Gaps
- **Best at**: Native dialog element use; portal rendering for z-index safety; standardized footer button pattern
- **Missing**: No full-screen mobile variant; complex multi-step workflows require custom state management
