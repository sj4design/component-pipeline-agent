---
system: IBM Carbon Design System
component: Tooltip / Toggletip / Definition Tooltip
url: https://carbondesignsystem.com/components/tooltip/usage/
last_verified: 2026-03-28
---

# Tooltip / Toggletip / Definition Tooltip

## Approach
Carbon takes the most granular approach of any major design system by splitting tooltip-like behavior into three distinct components: Tooltip, Toggletip, and Definition Tooltip. This is driven by IBM's enterprise accessibility requirements — Carbon's products must meet strict WCAG compliance for government and healthcare clients. The core insight is that hover-triggered tooltips cannot contain interactive elements because they disappear when the mouse moves to interact with them, making buttons or links inside tooltips unreachable for many users. Rather than trying to make one component handle both cases, Carbon created Toggletip for interactive content (triggered by click/Enter, stays open until dismissed) and kept Tooltip strictly for non-interactive supplemental text. Definition Tooltip fills a third niche: inline term definitions within text, using a dotted underline affordance to signal that extra context is available.

## Key Decisions
1. **Three-component split based on interaction model** (HIGH) — Tooltip (hover/focus, non-interactive), Toggletip (click/Enter, interactive content allowed), Definition Tooltip (inline text definitions). This is Carbon's strongest architectural decision because it makes the interaction contract explicit at the component level. Developers cannot accidentally create an inaccessible tooltip with buttons inside — the API physically prevents it. The tradeoff is that teams must learn three components instead of one, but the clarity in intent is worth the learning curve.

2. **Icons cannot directly trigger tooltips — use IconButton** (HIGH) — Carbon explicitly states that icons cannot receive focus and are therefore unsuitable as tooltip triggers. If an icon needs a tooltip, it must be wrapped in an IconButton. This seems restrictive but solves a widespread accessibility failure: standalone icon elements that have tooltips but are unreachable by keyboard. By requiring IconButton, Carbon guarantees the trigger is focusable.

3. **Toggletip uses the disclosure pattern** (MEDIUM) — Toggletips are not hover-triggered. They use click/Enter to open and Escape to close, following the WAI-ARIA disclosure pattern. This means the content stays visible while the user tabs through interactive elements inside it. Carbon chose this because enterprise UIs frequently need to show contextual help with links to documentation or action buttons — content that cannot live inside a hover tooltip.

4. **Alignment via `align` prop** (MEDIUM) — Carbon uses a single `align` prop (top, bottom, left, right, and sub-positions) rather than separate placement and offset props. This keeps the API simpler but sacrifices the fine-grained offset control that Spectrum provides. For IBM's enterprise forms and data tables, cardinal-direction alignment is usually sufficient.

## Notable Props
- `label` vs `description`: Tooltip uses `label` for primary labels and `description` for supplemental info — mirrors the `aria-labelledby` vs `aria-describedby` distinction at the API level.
- `align`: Single prop for positioning (top, bottom, left, right with start/end variants) — simpler than offset-based systems.
- `defaultOpen` (Toggletip): Allows toggletips to render open on mount, useful for onboarding or first-use guidance.

## A11y Highlights
- **Keyboard**: Tooltip appears on focus of trigger. Toggletip opens on Enter/Space, dismisses on Escape. Tab moves through interactive content inside Toggletip.
- **Screen reader**: Tooltip content announced via `aria-describedby` on the trigger. Toggletip content is a live region that announces when opened.
- **ARIA**: Tooltip uses `role="tooltip"`. Toggletip uses the disclosure pattern (no tooltip role) because it contains interactive content that would violate the tooltip role contract.

## Strengths & Gaps
- **Best at**: The three-component model is the most accessibility-rigorous approach to tooltip-like patterns — it makes it structurally impossible to create the most common tooltip accessibility violations.
- **Missing**: No warmup/cooldown delay system for rapid hover scanning across multiple tooltips — each tooltip operates independently, which can feel sluggish in dense icon toolbars.
