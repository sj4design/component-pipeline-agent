---
system: Dell Design System
component: Accordion
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Accordion

## Approach
Dell Design System uses Accordion in enterprise IT management interfaces for organizing configuration options, system specifications, and support documentation. The B2B enterprise context means accordions are used for dense technical content organization rather than marketing FAQ patterns. Limited public documentation means confidence is low on specifics.

## Key Decisions
1. **Enterprise information density** (MEDIUM) — Accordion is sized and spaced for dense technical content, consistent with Dell's enterprise management UI patterns (OpenManage, configuration screens).
2. **Multiple open panels** (LOW) — Enterprise users reviewing multiple configuration sections simultaneously likely benefit from multiple-open behavior, which may be the default.
3. **Consistent form/layout integration** (LOW) — Likely integrates with Dell's grid and layout system for configuration page layouts.

## Notable Props
- `expanded`: Open/closed state control
- `onChange`: Toggle callback

## A11y Highlights
- **Keyboard**: Standard keyboard toggle behavior expected
- **Screen reader**: State announcement via aria-expanded expected
- **ARIA**: Standard accordion ARIA pattern expected

## Strengths & Gaps
- **Best at**: Technical content organization in enterprise management interfaces
- **Missing**: Limited public documentation; confidence low — verify before use
