---
system: Polaris (Shopify)
component: Sheet (deprecated) → Modal (recommended replacement)
url: https://polaris.shopify.com/components/deprecated/sheet
last_verified: 2026-03-28
---

# Drawer

## Approach

Polaris had a dedicated Sheet component — a large container that entered from the trailing edge of the screen to display contextual actions and information without fully interrupting workflow like a Modal. Shopify deprecated it, and the reasoning is instructive: the Sheet was deprecated not because it was technically broken, but because it was behaviorally harmful. The Polaris team's documented rationale states that Sheet "encourages designers to create a new layer on top of the page instead of improving the existing user interface" and "blocks other parts of the UI, forces users to switch context, and adds complexity to otherwise simple interactions." This is a philosophy-level deprecation: the pattern itself was deemed problematic, not just the implementation.

The recommended replacements are Modal (when an action is required before the next step in a flow) and Popover (for small amounts of content or action menus that do not require full-screen interruption). This is a strong statement by Shopify's design system team: the entire concept of a drawer/side panel was rejected in favor of either committing to full interruption (Modal) or minimal non-interruption (Popover). There is no middle ground. The implication for merchant-facing products is that Shopify believes side panels create an ambiguous UX: they feel lighter than a Modal but interrupt as much, leading merchants to hesitate about whether the background content is still live.

## Key Decisions

1. **Sheet deprecated by philosophy, not by bug** (HIGH) — The deprecation is unusually principle-driven: Shopify concluded that the drawer/side panel pattern itself causes UX harm by creating context-switching friction without the clarity of a full modal. This is the boldest stance on drawer deprecation in any Tier 1 system. Rather than improving Sheet, they declared the pattern wrong and removed it entirely from their recommended vocabulary.

2. **Modal as the replacement for action-gating overlays** (HIGH) — When an overlay requires the merchant to take an action before proceeding (e.g., confirming a settings change, filling out a form), Polaris now routes that to Modal regardless of how "light" the interaction feels. The reasoning: if the merchant must engage with the overlay before returning to their task, that is by definition a modal interruption, and it should be designed as one with all the clarity that entails.

3. **Popover as the replacement for contextual information** (HIGH) — When the overlay is supplementary and dismissable without completing an action, Polaris routes to Popover. This creates a binary: either the content blocks progress (Modal) or it does not (Popover). There is no longer a supported middle tier where content partially blocks while appearing non-blocking.

4. **Keyboard accessibility of deprecated Sheet** (LOW) — The Sheet did include keyboard support: ESC to close, focus management into the sheet on open, focus return on close. Its deprecation was not driven by accessibility failures. This is relevant context: Shopify did not remove Sheet because it was inaccessible — they removed it because the interaction model itself was considered harmful regardless of implementation quality.

## Notable Props

- Sheet (deprecated): `open` (boolean), `onClose` (callback). Minimal API reflecting its conceptual simplicity.
- Polaris recommends Modal for complex replacement scenarios; see Modal docs for its full API including `size`, `primaryAction`, `secondaryActions`.

## A11y Highlights

- **Keyboard**: Sheet (deprecated) used ESC to close and returned focus to the trigger. The recommended Modal replacement has the same behavior, plus full focus trap.
- **Screen reader**: Modal (replacement) uses `role="dialog"` with `aria-modal="true"`, which is a stronger accessibility guarantee than Sheet provided.
- **ARIA**: Sheet did not apply `aria-modal="true"`, which meant screen readers could continue reading background content. This is another reason the replacement to Modal is an accessibility improvement.

## Strengths & Gaps

- **Best at**: Forcing a clear design decision — by removing the ambiguous middle tier, Polaris prevents the "looks light but blocks heavily" UX antipattern from being implemented in Shopify products.
- **Missing**: Any supported pattern for genuinely non-blocking side panels that display supplementary detail without using the full weight of a Modal — a use case that enterprise products legitimately need.
