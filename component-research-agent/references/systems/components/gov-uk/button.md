---
system: GOV.UK Design System
component: Button
url: https://design-system.service.gov.uk/components/button/
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
GOV.UK's Button is highly opinionated and intentionally limited in variation. The system provides three variants — default (primary), secondary, and warning — with very prescriptive guidance on when each should be used. The green primary button is iconic in UK government services and is strictly reserved for the single main action on a page. GOV.UK's research shows that users scan for the green button to progress through a service, so having only one primary action per page is a hard rule, not a suggestion. Button design is informed by usability research with a diverse population including older users and people with cognitive disabilities.

## Key Decisions
1. **Green as the primary call-to-action color** (HIGH) — GOV.UK chose green specifically because it signals "go" / "proceed" in a government context and tests well across age groups and accessibility needs. It is not based on brand color but on user research. Warning buttons are red, reinforcing the traffic light metaphor.
2. **Shadow for affordance** (HIGH) — GOV.UK buttons have a bottom shadow that makes them look three-dimensional and "pressable." User research showed this visual cue significantly helps older users and people with cognitive disabilities identify interactive elements. The shadow moves on press to simulate a physical click.
3. **Prevent double submission** (MEDIUM) — The button includes `data-prevent-double-click="true"` by default, which disables the button after one click. This prevents common transactional errors in government services (paying twice, submitting a form twice) without requiring custom JavaScript from each service team.

## Notable Props
- `element`: `"button" | "input" | "a"` — render as button, input[type=submit], or link
- `variant`: `"warning"` — only one non-default variant (secondary is another)
- `disabled`: renders with aria-disabled and muted styling
- `preventDoubleClick`: boolean, prevents rapid re-submission

## A11y Highlights
- **Keyboard**: Enter and Space activate buttons; disabled state uses `aria-disabled` not HTML disabled to keep focus
- **Screen reader**: Button text must be descriptive; guidance warns against generic "Click here" or "Submit" labels
- **ARIA**: Minimal ARIA — native button semantics are used; disabled state preserves focusability via `aria-disabled`

## Strengths & Gaps
- **Best at**: Clear, research-backed primary/secondary/warning hierarchy; double-click prevention; strong accessibility guidance
- **Missing**: No icon button pattern; no loading state; no size variants (one size only); very limited compared to commercial design systems
