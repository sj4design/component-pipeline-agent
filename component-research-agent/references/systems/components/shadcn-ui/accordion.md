---
system: shadcn/ui
component: Accordion
url: https://ui.shadcn.com/docs/components/accordion
last_verified: 2026-03-28
confidence: high
---

# Accordion

## Approach
shadcn/ui's Accordion is built directly on Radix UI's Accordion primitive, providing a fully accessible, animatable accordion with both single and multiple open modes. The component is copied into the user's codebase via the CLI, providing full ownership. Tailwind CSS handles styling with CSS variables for theming. The Radix foundation ensures robust keyboard navigation and ARIA compliance without custom implementation.

## Key Decisions
1. **Radix UI primitive** (HIGH) — Built on @radix-ui/react-accordion, delegating all accessibility logic and keyboard behavior to Radix's well-tested implementation, ensuring correctness.
2. **type="single" | "multiple"** (HIGH) — Explicit type prop controls whether one or multiple items can be open simultaneously, making the behavioral contract clear in the component API.
3. **CSS animation via data attributes** (HIGH) — Uses Radix's data-state="open"|"closed" attributes combined with Tailwind CSS animations for smooth expand/collapse transitions, enabling customization without JavaScript animation libraries.

## Notable Props
- `type`: "single" | "multiple" — controls single vs multiple open behavior
- `collapsible`: Boolean (single type only) — allows the open item to be collapsed by clicking again
- `value` / `defaultValue`: Controlled/uncontrolled open item value
- `onValueChange`: Callback for controlled usage

## A11y Highlights
- **Keyboard**: Enter/Space toggles item; Tab navigates between triggers; arrow keys optionally navigate triggers
- **Screen reader**: aria-expanded on each trigger; content panel linked via aria-controls; heading level appropriate per AccordionTrigger context
- **ARIA**: aria-expanded; aria-controls; aria-labelledby on content panel; role="region" on content

## Strengths & Gaps
- **Best at**: Clean animation support; explicit single/multiple mode; full Radix accessibility; maximum code ownership
- **Missing**: No built-in icon/chevron animation direction control (requires custom CSS); visual variants limited to what developers add
