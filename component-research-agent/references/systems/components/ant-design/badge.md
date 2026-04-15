---
system: Ant Design
component: Badge
url: https://ant.design/components/badge/
last_verified: 2026-03-28
---

# Badge

## Approach
Ant Design's Badge is the most feature-complete implementation in Tier 1, reflecting the "maximum configurability" philosophy that characterizes Ant Design's approach to components generally. The component handles three distinct modes in a single API: count badges (numeric with overflow), dot badges (presence indicator without count), and ribbon badges (decorative corner ribbons for card/panel highlighting). This breadth makes sense for Ant Design's target audience — Chinese enterprise application builders who need to serve diverse product contexts from a single component library. The count badge is the primary mode and supports wrapping other elements (the badge anchors to its child element's top-right corner automatically), making it the only Tier 1 system that treats positional anchoring as a core feature rather than a CSS concern.

## Key Decisions
1. **Child-wrapping anchor model** (HIGH) — Ant Design Badge is designed to wrap its child element and automatically positions the count at the top-right corner using absolute positioning. This is the most ergonomic model for the common use case (badge on an icon or avatar) because it eliminates the need for custom CSS positioning. The tradeoff is that Badge must be used as a wrapper, which can conflict with other component APIs that don't expect a wrapping parent.
2. **Dot mode as first-class variant** (HIGH) — The `dot` prop switches to a small circular indicator with no text, used to signal "there's something new" without quantifying it. Ant Design treats this as a first-class feature (not a workaround) because in enterprise dashboards, there are many contexts where showing an exact count would be premature or anxiety-inducing — the dot communicates "check this" without creating urgency around a specific number.
3. **Ribbon sub-component** (MEDIUM) — `Badge.Ribbon` is a separate sub-component for corner-ribbon badges on cards and panels (the triangular "New" or "Hot" ribbon in a card's corner). This is a distinct visual pattern from count badges, and Ant Design makes it explicit rather than adding it as a Badge prop. The ribbon pattern is common in Chinese e-commerce and enterprise UIs, explaining its inclusion.
4. **`overflowCount` prop (default 99)** (MEDIUM) — The overflow threshold is configurable via `overflowCount`, defaulting to 99. When the count exceeds this value, the display shows "[overflowCount]+" (e.g., "99+"). This is equivalent to Atlassian's `max` prop but uses a different naming convention. Enterprise apps sometimes need to show higher overflow thresholds for issue counts, making this flexibility essential.
5. **`showZero` prop** (LOW) — By default, Badge hides itself when count is 0. The `showZero` prop overrides this to show the badge even when count is zero. This is a subtle but important feature: some applications need to show "0 unread" to confirm the user that there's nothing to action, rather than hiding the badge entirely which might be confused with a loading state.

## Notable Props
- `count`: Number or ReactNode — accepts custom JSX for fully custom badge content
- `dot`: Switches to presence-indicator mode without a count
- `overflowCount`: Configurable overflow threshold (default 99)
- `showZero`: Shows badge when count is 0, preventing disappearance confusion
- `offset`: `[x, y]` tuple for fine-tuning badge position on the wrapped element
- `color`: Preset color names for non-semantic styling

## A11y Highlights
- **Keyboard**: No keyboard interaction — Badge is a visual indicator only
- **Screen reader**: Count value is rendered in the DOM but may not be contextually announced without parent element `aria-label` updates; Ant Design's docs recommend including count in the parent button's accessible name
- **ARIA**: No built-in ARIA roles on the badge element itself; relies on surrounding markup to provide context

## Strengths & Gaps
- **Best at**: The most complete badge implementation in Tier 1 — count, dot, ribbon, wrapping anchor model, configurable overflow, showZero, and offset adjustment all in one component
- **Missing**: No semantic status mapping (colors are arbitrary/decorative rather than conveying consistent meaning like Polaris's tones), and the a11y burden is left entirely to the implementing team
