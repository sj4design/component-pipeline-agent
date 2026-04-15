---
system: GOV.UK Design System
component: Modal (not available — use confirmation page pattern)
url: https://design-system.service.gov.uk/patterns/confirm-an-action/
last_verified: 2026-03-28
confidence: high
---

# Modal Dialog

## Approach
GOV.UK Design System does not include a modal dialog component. This is a deliberate, research-backed decision: GOV.UK's user research found that modal dialogs cause significant usability problems for many users, particularly those using screen readers, mobile devices, or keyboards. Government services reach the entire UK population including users with low digital literacy, so patterns with high failure rates are avoided. Instead, GOV.UK uses full-page patterns for confirmations (a separate page asking "Are you sure?") and in-context error messages for validation. The Check Answers pattern replaces the "confirm before submitting" modal.

## Key Decisions
1. **No modal component** (HIGH) — GOV.UK's approach is that if information is important enough to interrupt the user, it should be on its own page where it has full context, headings, and no focus trap complexity. The accessibility and usability issues of modals are deemed too severe for government services serving diverse populations.
2. **Full-page confirmation patterns** (HIGH) — The "Confirm an action" pattern uses a separate URL and page, which means it works without JavaScript, is bookmarkable, and doesn't trap focus. The trade-off is an extra page in the journey, which GOV.UK accepts as worth the accessibility gain.

## Notable Props
- N/A — component does not exist in GOV.UK Design System

## A11y Highlights
- N/A — avoided due to accessibility concerns at population scale

## Strengths & Gaps
- **Best at**: By avoiding modals, GOV.UK achieves universal accessibility without complex focus management
- **Missing**: No in-page interruption pattern for quick confirmations; full-page pattern adds journey steps
