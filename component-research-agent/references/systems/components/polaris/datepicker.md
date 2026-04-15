---
system: Polaris
component: DatePicker + Date Picking Patterns
url: https://polaris-react.shopify.com/patterns/date-picking
last_verified: 2026-03-28
---

# DatePicker + Date Picking Patterns

## Approach
Polaris takes the most opinionated pattern-driven approach of any Tier 1 system. Instead of one component with many props, Shopify documented three date picking patterns — Single Date, Date Range, and Date List — each as a composition recipe explaining which components to combine and why. The Date Range pattern is the most complete range-with-presets implementation in any major DS: a three-zone popover with preset options (left), input fields + dual-month calendar (right), and Cancel/Apply buttons (bottom). This exists because merchant research showed people select ranges three different ways: presets for common ranges, text input for known dates, calendar for visual selection near today. The Date List pattern is unique — preset-only, no calendar, for workflows where templated ranges suffice.

## Key Decisions
1. **Patterns (composition recipes) instead of monolithic components** (HIGH) — Polaris documents how to compose DatePicker + Popover + TextField + OptionList rather than shipping one DateRangePicker. Avoids the prop explosion problem. Developers pick what they need. Tradeoff: more developer effort, but more flexibility.
2. **Three-zone layout for range (presets | calendar | confirm)** (HIGH) — OptionList left, dual-month calendar + inputs right, Cancel/Apply bottom. Serves three mental models simultaneously: "common period" (presets), "exact dates" (text), "visual" (calendar). Gold standard for range+presets.
3. **Explicit confirmation for ranges, auto-close for singles** (HIGH) — Single date: one click = done, popover closes. Range: requires Apply because it's two decisions that need review before committing. Auto-close after first date would lose user's work.
4. **Preset ordering: singles first, ranges smallest to largest** (MEDIUM) — "Today" → "Yesterday" → "Last 7 days" → "Last 30d" → "Last 90d" → "Last year." Merchants scan top-to-bottom; most common/smallest first. Custom pinned dates at the very top.
5. **Responsive collapse: dual-month → single-month** (MEDIUM) — Desktop shows dual months + OptionList sidebar. Mobile collapses to one month + Select dropdown for presets. Three-zone layout doesn't fit mobile.

## Notable Props
- `allowRange`: Enables range highlighting on the DatePicker component.
- `disablesBefore`/`disablesAfter`: Simple constraint patterns (no callback-based disabled dates).
- No prop API for the range pattern — it's a composition recipe assembled by the developer.

## A11y Highlights
- **Keyboard**: TextField uses `role="combobox"`. Text entry always available. Tab between zones.
- **Screen reader**: Labels on start/end fields. `autofocusTarget="none"` prevents focus traps in Popover.
- **Gap**: Composition approach means a11y depends on correct assembly — the pattern can't enforce it internally like a monolithic component.

## Strengths & Gaps
- **Best at**: Most complete range+presets implementation. Excellent design guidance and rationale. Three-pattern approach for different merchant workflows.
- **Missing**: No callback-based disabled dates. Composition requires significant developer effort. A11y depends on correct assembly.
