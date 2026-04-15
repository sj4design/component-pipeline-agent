---
system: Dell Design System
component: Search
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Search

## Approach
Dell Design System's Search is used for searching product catalogs, support articles, and enterprise management inventory. The enterprise context covers both e-commerce product search and IT asset management search, with autocomplete suggestions for efficiency.

## Key Decisions
1. **Dual e-commerce / enterprise search** (MEDIUM) — Serves both Dell.com product search and enterprise management inventory search use cases.
2. **Autocomplete** (MEDIUM) — Product and asset suggestions as you type.
3. **Clear control** (LOW) — Standard clear functionality.

## Notable Props
- Standard search input props expected

## A11y Highlights
- **Keyboard**: Standard search keyboard behavior
- **Screen reader**: Search announced; suggestions via aria-live
- **ARIA**: Combobox pattern for autocomplete

## Strengths & Gaps
- **Best at**: Enterprise and e-commerce dual-purpose search
- **Missing**: Low confidence — verify before use
