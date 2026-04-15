---
system: Wise Design
component: Tabs
url: https://wise.design/components/tabs
last_verified: 2026-03-28
confidence: low
---

# Tabs

## Approach
Wise's Tabs organize the different sections of their financial product (Home / Send / Receive / Manage accounts). The component reflects Wise's clean minimal aesthetic with simple underline or pill indicator styles. Financial product context means tabs are used for top-level navigation sections and account-level content switching.

## Key Decisions
1. **Clean visual indicator** (MEDIUM) — Minimal active tab indicator (underline or subtle highlight) consistent with Wise's restrained design language.
2. **Product navigation use case** (MEDIUM) — Designed for Wise's product navigation patterns rather than complex content tab scenarios.
3. **Responsive handling** (LOW) — Mobile-friendly tab sizing for Wise's cross-platform product.

## Notable Props
- `activeTab`: Active tab identifier
- `onChange`: Selection callback

## A11y Highlights
- **Keyboard**: Arrow key navigation expected
- **Screen reader**: ARIA tablist expected
- **ARIA**: Standard tab ARIA pattern expected

## Strengths & Gaps
- **Best at**: Clean financial product tab navigation
- **Missing**: Low confidence — limited public documentation
