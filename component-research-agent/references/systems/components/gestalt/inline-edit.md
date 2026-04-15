---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
Gestalt has no InlineEdit component, and the absence reflects a deliberate mobile-first interaction design philosophy. Inline editing — where a user clicks directly on displayed text to transform it into an editable field in place — is an interaction pattern that is difficult to implement accessibly and intuitively on touch devices. On mobile, the targets are small, the transition between read and edit states is easy to trigger accidentally, and the on-screen keyboard shifting layout creates unpredictable repositioning. Pinterest's dominant usage is mobile (both app and mobile web), so patterns that work poorly on touch are systematically deprioritized. Instead, Pinterest uses modal dialogs (often Sheet) to handle editing of content such as pin titles, pin descriptions, board names, and profile bios. This modal edit pattern provides a dedicated, full-context editing environment with an explicit save/cancel flow — a clearer interaction that works consistently across mobile and desktop and is trivially accessible.

## Key Decisions
1. **Modal dialogs over inline edit on mobile** (HIGH) — Pinterest's mobile-first mandate makes inline editing a poor default. A Sheet or Modal with a TextField is more reliable across touch contexts, smaller viewport sizes, and on-screen keyboard interactions.
2. **Explicit save/cancel over optimistic inline commit** (HIGH) — Pinterest's content (pin descriptions, board names) is persistent user data. An explicit "Save" action in a modal gives users confidence their edits are intentional, reducing accidental edit errors that inline editing with blur-to-save would risk.
3. **Consistent editing UX across all content types** (MEDIUM) — Using Sheet/Modal for all content editing creates a uniform editing mental model across Pinterest, whether editing a pin title, board description, or profile name. InlineEdit would create an inconsistent experience for users switching between different content types.
4. **Accessibility simplicity** (MEDIUM) — The toggle-between-display-and-input mechanic of inline edit requires careful ARIA live region management and focus handling. Modal dialogs have well-established, standardized accessibility patterns (`role="dialog"`, focus trap) that are easier to implement correctly at scale.

## Notable Props
- N/A — Component does not exist in Gestalt.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — not applicable. The modal editing approach used instead is robust and accessible.
- **Missing**: No inline edit for desktop-heavy surfaces within Pinterest's business tools (ads manager, analytics dashboards) where inline editing is a common productivity pattern. Teams building these desktop-centric tools must implement their own inline edit pattern, typically by composing TextField with conditional rendering around display text.
