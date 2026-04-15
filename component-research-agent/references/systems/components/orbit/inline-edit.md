---
system: Orbit (Kiwi.com)
component: Not available natively
url: https://orbit.kiwi/components/
last_verified: 2026-03-29
confidence: high
---

# Inline Edit

## Approach
Orbit does not include an InlineEdit component, and this absence is structurally explained by the nature of Kiwi.com's booking forms. The booking funnel is a strictly linear, step-by-step flow: users enter data on one screen, advance to the next, and submit each step explicitly. There is no "review and click to edit in place" UX pattern in the core funnel — data review happens on a summary screen where edits redirect the user back to the appropriate step (a full-page navigation, not inline editing). The account management section (where inline editing of saved profiles might seem appropriate) uses dedicated edit screens with standard form layouts rather than inline editing, keeping the interaction model consistent with the rest of the product. Inline edit is a pattern suited to data-dense dashboards and CRM-style interfaces, neither of which Kiwi.com's core product requires.

## Key Decisions
1. **Linear submit-flow model** (HIGH) — Kiwi.com's entire UX is built around form pages with explicit next/submit actions; inline editing would be architecturally inconsistent with this mental model.
2. **Edit-page redirect for corrections** (HIGH) — On the booking summary screen, "Edit" links navigate back to the relevant step rather than enabling inline editing, which preserves the funnel's linear integrity and avoids partial-save complexity.
3. **No dashboard/CRM use cases** (MEDIUM) — Orbit is not used for internal tooling or data-management interfaces where inline editing is most valuable; keeping it out of scope keeps the library focused.

## Notable Props
- N/A — component not present in Orbit.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — component intentionally absent.
- **Missing**: InlineEdit entirely. Teams needing this pattern (e.g., editable passenger names in a trip management interface) would need to build it from Orbit's `InputField` and `TextLink` primitives.
