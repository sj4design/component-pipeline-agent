---
system: Dell Design System
component: Tag / Badge
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Tag / Badge

## Approach
Dell Design System's Tag/Badge is used for enterprise status indicators — device health status, service contract labels, and feature/capability tags in management consoles and product pages.

## Key Decisions
1. **System status labels** (MEDIUM) — Primary use for hardware/software status indication in management interfaces.
2. **Color/variant system** (LOW) — Status-coded variants for healthy/warning/critical/unknown states.
3. **Removable filter chips** (LOW) — Likely for filter selection display in management interfaces.

## Notable Props
- `label`, `status`, `removable`

## A11y Highlights
- **Keyboard**: Non-interactive not in tab order; remove button if present
- **Screen reader**: Text content with status
- **ARIA**: Standard label pattern

## Strengths & Gaps
- **Best at**: Enterprise system status labeling
- **Missing**: Low confidence — verify before use
