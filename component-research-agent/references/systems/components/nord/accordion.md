---
system: Nord (Nordhealth)
component: Accordion (nord-accordion web component)
url: https://nordhealth.design/components/accordion/
last_verified: 2026-03-28
confidence: low
---

# Accordion

## Approach
Nord provides an Accordion web component (`<nord-accordion>`) designed for healthcare application use cases: FAQ sections, collapsible clinical information panels, and settings sections. As with all Nord components, it is a web component for framework portability. The component is minimal by design — Nord's healthcare products use accordions primarily for secondary information that should be available but not prominent, such as additional patient information fields or help text sections.

## Key Decisions
1. **Web component standard** (HIGH) — Framework portability is the primary driver for all Nord component decisions. Accordion as a web component works identically in the React-based patient portal and the Angular-based clinical dashboard.
2. **Single open item default** (MEDIUM) — Nord's accordion defaults to single-item mode, reflecting healthcare UI patterns where showing one piece of information at a time reduces cognitive load for clinicians. Multiple-open mode may be available but is not the primary use case.

## Notable Props
- `open`: controls expanded state per item
- `heading`: the visible section title
- Likely: standard `disabled` state
- Web component event: `toggle` event on state change

## A11y Highlights
- **Keyboard**: Enter/Space to toggle; Tab navigation between items
- **Screen reader**: aria-expanded on the trigger; content panel associated via aria-controls
- **ARIA**: Standard disclosure pattern implemented in web component shadow DOM

## Strengths & Gaps
- **Best at**: Framework portability; healthcare UI simplicity
- **Missing**: Limited customization compared to React-based systems; shadow DOM limits external CSS styling; verify exact API at nordhealth.design
