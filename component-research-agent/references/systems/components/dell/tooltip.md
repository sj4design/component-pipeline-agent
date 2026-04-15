---
system: Dell Design System
component: Tooltip
url: https://www.delldesignsystem.com
last_verified: 2026-03-28
confidence: low
---

# Tooltip

## Approach
Dell Design System's Tooltip provides contextual information for enterprise management UI elements — icon button labels, truncated data values, and configuration help text in management consoles. Enterprise IT users benefit from tooltips that explain technical terms and configuration options.

## Key Decisions
1. **Management UI labels** (MEDIUM) — Primary use in enterprise management for icon-only toolbar actions and technical term explanations.
2. **Technical content support** (LOW) — Tooltip content may include technical identifiers or multi-line explanations for enterprise management scenarios.
3. **Standard placement** (LOW) — Standard placement options to handle complex enterprise layout contexts.

## Notable Props
- `content`: Tooltip content
- `placement`: Direction

## A11y Highlights
- **Keyboard**: Focus trigger expected
- **Screen reader**: role="tooltip" expected
- **ARIA**: Standard tooltip ARIA expected

## Strengths & Gaps
- **Best at**: Enterprise management UI contextual labels
- **Missing**: Low confidence — limited public documentation; verify before use
