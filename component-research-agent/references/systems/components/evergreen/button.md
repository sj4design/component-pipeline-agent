---
system: Evergreen (Segment)
component: Button
url: https://evergreen.segment.com/components/buttons
last_verified: 2026-03-28
confidence: medium
---

# Button

## Approach
Evergreen's Button is clean, minimal, and focused on analytics dashboard needs. Segment's products are primarily B2B data tools where buttons perform actions in dense, information-heavy interfaces. The button system provides enough hierarchy for dashboard UIs without the visual heaviness of more consumer-oriented systems. Evergreen uses an intent-based system where `intent` (none, success, warning, danger) modifies button color, and `appearance` controls the fill treatment. This separation allows a "danger" intent with either a filled or minimal appearance.

## Key Decisions
1. **intent + appearance separation** (HIGH) — `intent` (none/success/warning/danger) and `appearance` (default/minimal/primary) are separate props that combine. This gives more combinations than a single variant prop: you can have a minimal danger button or a primary success button, covering dashboard use cases like destructive actions with different visual prominence.
2. **iconBefore / iconAfter** (MEDIUM) — Icon placement is handled by props that accept Evergreen icon component references. Evergreen's icon system is built-in, so icon buttons stay consistent with the design system's icon set.
3. **Small footprint, no loading state** (LOW) — Evergreen's Button is notably lean — it doesn't include a built-in loading state. For async actions in Segment's dashboard, teams typically manage loading state externally and show a spinner next to or instead of the button.

## Notable Props
- `appearance`: `"default" | "minimal" | "primary"`
- `intent`: `"none" | "success" | "warning" | "danger"`
- `iconBefore` / `iconAfter`: Evergreen icon reference
- `size`: `"small" | "medium" | "large"`
- `disabled`: standard disabled state
- `isLoading`: (some versions) shows spinner

## A11y Highlights
- **Keyboard**: Native button behavior
- **Screen reader**: Standard button semantics; icon-only buttons need aria-label
- **ARIA**: No specialized ARIA beyond native button; disabled uses HTML disabled attribute

## Strengths & Gaps
- **Best at**: intent + appearance combination for analytics dashboard hierarchy; clean minimal aesthetic
- **Missing**: No built-in loading state in all versions; no split button; limited size range
