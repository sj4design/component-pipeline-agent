---
system: Salesforce Lightning Design System
component: Modal
url: https://lightningdesignsystem.com/components/modals/
last_verified: 2026-03-28
confidence: high
---

# Modal

## Approach
Salesforce Lightning's Modal is a comprehensive dialog component used extensively throughout CRM for record creation, confirmation dialogs, and task flows. Lightning modals have well-defined structure (header, scrollable body, footer) and support a tagline in the header for additional context. The system distinguishes between modal sizes and provides extensive guidance on modal vs. prompt (smaller confirmation dialog) use cases. Directional footers (left/right aligned actions) support various CRM action patterns.

## Key Decisions
1. **Prompt variant for confirmation** (HIGH) — A smaller "prompt" modal variant exists for simple confirmation dialogs, preventing developers from using full-size modals for yes/no confirmations and maintaining proportion.
2. **Scrollable body** (HIGH) — Modal body is independently scrollable while header and footer remain fixed, critical for CRM modals that may contain long record forms or data tables.
3. **Directional footer alignment** (MEDIUM) — Footer supports left-aligned, right-aligned, and directional (back/next) button patterns, accommodating both simple action and multi-step wizard flows.

## Notable Props
- `isOpen`: Controlled open state
- `onRequestClose`: Close callback
- `size`: "small" | "medium" | "large"
- `heading`: Required modal title
- `footer`: Footer content slot

## A11y Highlights
- **Keyboard**: Focus trapped inside modal; Escape closes; Tab cycles focusable elements
- **Screen reader**: role="dialog"; aria-labelledby on heading; aria-modal prevents background reading
- **ARIA**: aria-modal="true"; aria-labelledby; aria-describedby on body content

## Strengths & Gaps
- **Best at**: Scrollable body with fixed header/footer; prompt variant for confirmations; extensive size range
- **Missing**: No built-in multi-step wizard state management
