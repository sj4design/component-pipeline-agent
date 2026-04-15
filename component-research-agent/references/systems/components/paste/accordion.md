---
system: Twilio Paste
component: Disclosure (Accordion)
url: https://paste.twilio.design/components/disclosure
last_verified: 2026-03-28
confidence: high
---

# Disclosure (Accordion)

## Approach
Twilio Paste calls this component "Disclosure" rather than Accordion, distinguishing between a single expandable section (Disclosure) and a grouped set (DisclosureGroup). This naming reflects the underlying HTML disclosure pattern and ARIA authoring practices. The component uses Reach UI's disclosure primitives under the hood, providing robust accessibility behavior. Paste's Disclosure is used heavily in configuration panels and help text expansions within Twilio's console.

## Key Decisions
1. **Disclosure vs Accordion naming** (HIGH) — Naming follows the HTML/ARIA semantic model (the disclosure pattern) rather than the visual term "accordion," reinforcing correct usage and mental models for developers.
2. **Independent vs grouped behavior** (HIGH) — Disclosure handles a single panel; DisclosureGroup wraps multiple and can enforce single-open-at-a-time behavior, keeping the API clean and composable.
3. **Reach UI foundation** (MEDIUM) — Delegates keyboard and ARIA behavior to Reach UI's battle-tested disclosure implementation rather than reimplementing, ensuring correctness at the cost of dependency.

## Notable Props
- `visible`: Controls open/closed state for controlled usage
- `onVisibilityChange`: Callback for controlled state management
- `variant`: "default" | "contained" — contained adds border and padding for card-like appearance

## A11y Highlights
- **Keyboard**: Enter/Space on trigger toggles panel; focus follows natural tab order
- **Screen reader**: Trigger announces expanded/collapsed state via aria-expanded; panel region associated with trigger
- **ARIA**: aria-expanded on trigger button; aria-controls pointing to panel id; panel has role="region" with aria-labelledby

## Strengths & Gaps
- **Best at**: Semantic correctness and accessibility; clean single vs. grouped composition pattern
- **Missing**: No animation configuration beyond the default; limited visual variants compared to some systems
