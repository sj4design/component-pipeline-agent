---
system: GitHub Primer
component: Button
url: https://primer.style/components/button
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
GitHub Primer's Button is a comprehensive component supporting GitHub's varied UI contexts from repository actions to code review workflows. Primer emphasizes clear visual hierarchy with default/primary/danger/invisible variants and supports leading/trailing icons as first-class props. The component has a well-defined size system and includes a dedicated IconButton component for icon-only actions, separating the concerns of labeled and unlabeled buttons.

## Key Decisions
1. **IconButton as separate component** (HIGH) — Icon-only buttons are a separate IconButton component rather than a variant of Button, enforcing that every icon button must have an aria-label, preventing accidental inaccessible icon buttons.
2. **Leading/trailing icon props** (HIGH) — Icons are passed as `leadingVisual` and `trailingVisual` props (accepting React components) rather than children, enforcing correct icon positioning and sizing.
3. **Count prop for action counts** (MEDIUM) — Button has a built-in `count` prop that renders a counter (e.g., star count, fork count) — unique to GitHub's UI patterns for social coding actions.

## Notable Props
- `variant`: "default" | "primary" | "danger" | "invisible" | "outline"
- `size`: "small" | "medium" | "large"
- `leadingVisual` / `trailingVisual`: Icon components for button icons
- `count`: Number to display alongside button (GitHub-specific social counts)
- `loading`: Loading state with spinner

## A11y Highlights
- **Keyboard**: Enter and Space activate; focus ring prominent per GitHub's accessibility guidelines
- **Screen reader**: IconButton requires aria-label; count value included in accessible name
- **ARIA**: aria-disabled for non-interactive states; aria-label on IconButton; aria-busy during loading

## Strengths & Gaps
- **Best at**: Enforced separation of icon-only buttons (accessibility safety); leading/trailing icon system; GitHub-specific count pattern
- **Missing**: No stateful toggle button built-in; split button requires custom composition
