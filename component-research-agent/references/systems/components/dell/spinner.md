---
system: Dell Design System
component: Spinner / Loader
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Spinner / Loader

## Approach
Dell Design System's Spinner is used for enterprise operation loading states — firmware updates, configuration deployments, and system data loading in management consoles. Enterprise loading states may have extended durations requiring informative labels.

## Key Decisions
1. **Enterprise operation loading** (MEDIUM) — Used for potentially long-running management operations.
2. **Informative labeling** (MEDIUM) — Enterprise users need to know what operation is running.
3. **Overlay pattern** (LOW) — Overlay loading for blocking sections during management operations.

## Notable Props
- `size`, `label`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Loading described via label
- **ARIA**: aria-label or live region expected

## Strengths & Gaps
- **Best at**: Enterprise management operation loading
- **Missing**: Low confidence — verify before use
