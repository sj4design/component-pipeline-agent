---
system: Dell Design System
component: Modal
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Modal

## Approach
Dell Design System's Modal serves enterprise management interfaces where modals are used for confirmation of destructive operations (server deletion, configuration resets), data entry in management consoles, and alert escalation in monitoring tools. The enterprise IT context means modals must handle high-stakes confirmations and are frequently used in multi-step workflows.

## Key Decisions
1. **Destructive confirmation focus** (MEDIUM) — High priority on destructive action confirmation patterns given Dell enterprise IT use cases (deleting servers, resetting configurations).
2. **Enterprise size range** (LOW) — Multiple sizes to accommodate simple confirmations through complex management task modals.
3. **Focus management** (LOW) — Proper focus trap essential for keyboard-navigating enterprise users in management consoles.

## Notable Props
- `isOpen`: Open state
- `onClose`: Close callback
- `title`: Modal title

## A11y Highlights
- **Keyboard**: Focus trap and Escape close expected
- **Screen reader**: Dialog announcement expected
- **ARIA**: Standard dialog ARIA expected

## Strengths & Gaps
- **Best at**: Enterprise destructive confirmation patterns; management console workflows
- **Missing**: Low confidence — limited public documentation; verify before use
