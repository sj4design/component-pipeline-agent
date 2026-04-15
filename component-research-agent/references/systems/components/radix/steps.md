---
system: Radix UI
component: Not available natively
url: https://www.radix-ui.com/primitives/docs/overview/introduction
last_verified: 2026-03-29
confidence: high
---

# Steps

## Approach
Radix Primitives and Radix Themes both lack a Steps (Stepper) component. This absence is consistent with Radix's scope: the library focuses on atomic, reusable interaction primitives (modals, tooltips, menus, form controls) rather than higher-order layout and navigation components like multi-step wizards. A steps/stepper UI is essentially a styled ordered list combined with application-level state management (current step, completed steps, validation per step), and does not have a dedicated WAI-ARIA role or pattern — the closest guidance comes from using `role="list"` with `aria-current="step"` on the active item. Because the accessibility pattern is not complex enough to warrant a dedicated primitive, and because the visual design of step indicators varies enormously across products, Radix leaves this entirely to application teams. Common Radix-based compositions use `Flex`, `Text`, and custom SVG step indicators alongside a controlled step index.

## Key Decisions
1. **No native Steps primitive** (HIGH) — Steps/stepper components are application-level navigation orchestrators that combine state management, validation gates, and layout; Radix's primitive scope ends at atomic interaction patterns, not multi-component workflows.
2. **No WAI-ARIA pattern to abstract** (HIGH) — Unlike menus or dialogs which have precise ARIA specifications, multi-step indicators have only informal accessibility guidance, making it impractical to define a canonical Radix primitive with a clear accessibility contract.
3. **Layout primitives used for composition** (MEDIUM) — Radix Themes' `Flex`, `Box`, `Text`, and `Badge` components provide building blocks for step indicator UIs, but the orchestration logic is entirely consumer-owned.

## Notable Props
- No component exists; no props applicable.

## A11y Highlights
- **Keyboard**: No standard keyboard pattern; typically the stepper indicator is presentational and navigation is handled by Back/Next buttons which follow standard button keyboard behavior.
- **Screen reader**: Step indicators should use `role="list"` with `role="listitem"` for each step; `aria-current="step"` marks the active step; completed and upcoming steps should have discernible text labels, not just numeric indicators.
- **ARIA**: `aria-current="step"` on the active step item; `aria-label` on the step list describing the overall progress context; step completion state communicated via visible text or `aria-label` updates.

## Strengths & Gaps
- **Best at**: Allowing complete freedom in step indicator visual design and state management logic, which is highly variable across products.
- **Missing**: No pre-built step indicator, no step validation gating utilities, no linear/non-linear navigation mode, no built-in progress announcement for screen readers — this is one of the largest gaps for teams building wizard-style flows with Radix.
