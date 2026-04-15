---
system: Material Design 3
component: Tooltip (Plain & Rich)
url: https://m3.material.io/components/tooltips
last_verified: 2026-03-28
---

# Tooltip (Plain & Rich)

## Approach
Material Design 3 splits tooltips into two fundamentally different components: Plain Tooltip and Rich Tooltip. This is not a prop toggle but a philosophical separation. Plain tooltips are brief text-only labels for icon buttons and unlabeled controls, capped at 200dp width. Rich tooltips are larger containers (320dp) that support titles, multi-line descriptions, and action buttons. M3 made this split because they observed that teams were overloading a single tooltip component with interactive content, breaking the ARIA tooltip pattern which specifically states tooltips must not receive focus. By creating Rich Tooltip as a separate construct, M3 signals that if your content needs actions or links, you need a different interaction model — one that supports a caret/arrow pointer, persistent visibility, and structured content hierarchy.

## Key Decisions
1. **Two distinct component types instead of one configurable component** (HIGH) — M3 enforces the boundary between non-interactive supplemental text (Plain) and structured content with actions (Rich). This matters because the ARIA `role="tooltip"` pattern explicitly forbids focus inside the tooltip. By splitting them, M3 prevents developers from accidentally creating inaccessible tooltips with buttons inside a hover-only surface. Rich tooltips get their own dismiss logic and focus management.

2. **Automatic dismissal after 1500ms** (MEDIUM) — Both tooltip types auto-dismiss after 1500 milliseconds, on any screen touch, or programmatically. This fixed timeout prevents tooltips from lingering and obscuring content. The tradeoff is that users with slower reading speeds may lose the content, but M3 accepts this because tooltips should only contain brief, supplementary info — if users need more time, the content belongs in a different pattern.

3. **Optional caret (arrow) pointing to anchor** (MEDIUM) — The caret is an arrow at the bottom of the tooltip pointing to the trigger element. M3 makes this optional because in dense UIs, the visual connection between tooltip and trigger is obvious from proximity, but in sparse layouts the caret helps users understand which element the tooltip describes. This is a visual affordance choice, not a functional one.

4. **TooltipBox as a wrapper composable** (MEDIUM) — Rather than attaching tooltip behavior via a directive or hook, M3 uses a wrapper component (TooltipBox) that contains positioning logic. This means the tooltip calculates its own position relative to the content composable, reducing the need for manual offset management. The tradeoff is slightly more verbose markup but more predictable positioning.

## Notable Props
- `caretEnabled`: Toggles the arrow pointer — interesting because most systems always show or never show the arrow, M3 makes it a per-instance decision.
- `maxWidth` (200dp plain, 320dp rich): Hard constraints that enforce the content-length philosophy — plain tooltips should be brief labels, rich tooltips can be descriptive.
- `isPersistent` (Rich only): Keeps the rich tooltip visible until explicitly dismissed, acknowledging that actionable content needs time.

## A11y Highlights
- **Keyboard**: Tooltip appears on focus of trigger element; dismissed on Escape or blur. Focus never enters the plain tooltip itself.
- **Screen reader**: Plain tooltips using `aria-labelledby` when serving as primary labels (e.g., icon-only buttons), `aria-describedby` when providing supplemental descriptions. The distinction matters: label vs. description changes how screen readers announce the content.
- **ARIA**: `role="tooltip"` on the container element. The trigger references the tooltip via `aria-describedby` or `aria-labelledby` depending on whether the tooltip provides a name or a description.

## Strengths & Gaps
- **Best at**: Enforcing the separation between non-interactive hints and structured rich content through architecture rather than guidelines — the two-component model makes it hard to misuse.
- **Missing**: No built-in warmup/cooldown delay system for sequential tooltip hovering — each tooltip operates independently without a global timer to handle rapid hover transitions between elements.
