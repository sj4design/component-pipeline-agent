---
system: Twilio Paste
component: Separator
url: https://paste.twilio.design/components/separator
last_verified: 2026-03-28
confidence: high
---

# Separator (Divider)

## Approach
Twilio Paste calls this component Separator and uses it to create visual separation between content sections in the Twilio Console — between form sections, content blocks, and navigation items. The component renders a semantic HR element or a div with role="separator" depending on context. It supports both horizontal and vertical orientations.

## Key Decisions
1. **Semantic separator element** (HIGH) — Uses HTML `<hr>` or role="separator" to provide semantic meaning to assistive technologies rather than a purely decorative line, aligning with Paste's accessibility-first philosophy.
2. **Horizontal and vertical orientations** (MEDIUM) — Both orientations supported; vertical separator is useful in navigation bars and inline content separation (e.g., between breadcrumb items or action groups).
3. **Decorative vs. semantic** (MEDIUM) — When used purely for visual spacing, role="none" or aria-hidden prevents it from cluttering screen reader output.

## Notable Props
- `orientation`: "horizontal" | "vertical"
- `decorative`: Boolean — if true, hides from screen readers

## A11y Highlights
- **Keyboard**: Not interactive; not in tab order
- **Screen reader**: role="separator" communicated to screen readers when semantic; aria-hidden when decorative
- **ARIA**: role="separator" or role="none" depending on decorative prop; aria-orientation

## Strengths & Gaps
- **Best at**: Semantic vs. decorative distinction; both orientations; accessibility-first approach
- **Missing**: No variants for thickness or style beyond basic line
