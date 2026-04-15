---
system: Carbon (IBM)
component: Popover
url: https://carbondesignsystem.com/components/popover/usage/
last_verified: 2026-03-28
---

# Popover

## Approach

Carbon's Popover serves as the foundational layer for a family of related overlay components rather than being a standalone consumer-facing primitive. IBM arrived at this architecture after discovering that the distinction between "informational overlay" and "interactive overlay" was too often collapsed into a single overloaded component, creating accessibility problems in enterprise products. Their solution was a deliberate three-tier hierarchy: Tooltip (hover/focus, non-interactive, accessible by default), Toggletip (click/enter, interactive content, built on Popover), and Popover (the base container that powers both). This separation makes the accessibility model explicit — each component has a documented interaction model that maps cleanly to ARIA patterns.

The Toggletip component deserves special attention because it represents a pattern most systems handle ambiguously. Carbon defines Toggletip as "the disclosure pattern used to toggle the visibility of a popover, where the popover may contain a variety of information from descriptive text to interactive elements such as buttons." This is precisely the use case that other systems either route to Tooltip (incorrectly) or force into a Dialog (over-engineered). Carbon names the pattern directly and gives it its own component, which reduces the design system debt that accumulates when teams improvise.

## Key Decisions

1. **Popover as low-level primitive** (HIGH) — Carbon deliberately exposes Popover as a building block, not a drop-in solution. This means teams can compose custom overlay UIs using the Popover container while Carbon's higher-level components (Toggletip, etc.) handle the common cases with correct ARIA patterns baked in. The tradeoff is that raw Popover usage requires more implementation work, but the resulting components are more semantically correct.

2. **Toggletip as a named pattern** (HIGH) — Rather than leaving the "clickable tooltip with interactive content" use case to improvisation, Carbon codifies it as Toggletip. The naming conveys the interaction model: toggle (click to open/close) + tip (small contextual overlay). This reduces the accessibility antipattern of hover-only interactive content that keyboard users cannot reach.

3. **Four-column width cap** (MEDIUM) — Carbon's guidance states: "If your popover exceeds four columns in width, use a modal instead." This is one of the few systems that provides a quantitative threshold for the Popover-to-Modal escalation decision. The reasoning is that wider popovers begin to feel like overlay pages rather than contextual supplements, and Modal provides better focus management for that weight of content.

4. **Explicit hover vs. click distinction** (HIGH) — Carbon is precise about when content should be hover-accessible (Tooltip) vs. click-accessible (Toggletip). Hover-triggered interactive content is an accessibility antipattern because touch users and keyboard users cannot hover. By routing all interactive content through Toggletip's click/enter model, Carbon avoids this problem at the component level.

## Notable Props

- `align`: Controls the caret/arrow alignment within the popover, not just the overall placement direction. More granular than most systems' placement props.
- `caret`: Boolean toggle for the directional pointer. Carbon follows a similar logic to Spectrum — the caret is optional and context-dependent.
- `highContrast`: Renders the popover in a dark/inverted theme. This was added specifically for situations where the default light popover visually blends with light backgrounds, making boundaries ambiguous.

## A11y Highlights

- **Keyboard**: Toggletip is triggered on click or Enter key. Escape closes. Arrow keys may navigate within interactive content inside a Toggletip.
- **Screen reader**: Popover container uses `role="tooltip"` when used with Tooltip, but Toggletip uses `role="dialog"` or a live region depending on content type. This distinction is critical — it determines whether screen readers announce content automatically.
- **ARIA**: `aria-labelledby` and `aria-describedby` are used to link popover content back to trigger elements. Interactive elements inside Toggletip receive proper focus management.

## Strengths & Gaps

- **Best at**: Drawing sharp, documented boundaries between tooltip, toggletip, and popover — the clearest taxonomy of overlay types in any Tier 1 system.
- **Missing**: A consumer-ready popover for general rich content (not backed by Toggletip) — teams who want a popover with custom layout must compose it themselves from the low-level primitive.
