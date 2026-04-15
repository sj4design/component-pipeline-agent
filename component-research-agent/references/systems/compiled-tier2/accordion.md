---
component: Accordion
tier: 2
last_verified: 2026-03-28
---

# Accordion — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Disclosure | Reakit-based; single expandable section primitive; compose for accordion list | high |
| Salesforce Lightning | Accordion | Full accordion with single/multi expand modes; Lightning page sections | high |
| GitHub Primer | Details | Native HTML details/summary element; zero JS; semantic collapsible | high |
| shadcn/ui | Accordion | Radix UI Accordion; type="single"\|"multiple"; collapsible prop | high |
| Playbook | Accordion | Collapsible sections; dual React/Rails support | medium |
| REI Cedar | CdrAccordion | Vue accordion; unwrapped prop for borderless variant; WCAG 2.1 AA | medium |
| Wise Design | Accordion | FAQ/info expandable sections; minimal financial UI | low |
| Dell Design System | Accordion | Enterprise configuration expandable sections | low |

## Key Decision Patterns

**Native vs. custom:** Primer uses native details/summary — no JS, full browser support, automatic aria-expanded behavior, but limited styling control. All others use custom implementations for full styling control.

**Single vs. multiple expand:** shadcn/ui (Radix) exposes type="single"|"multiple". Lightning offers single/multi modes. Paste's Disclosure is single-item primitive requiring composition for multi-accordion behavior. Cedar and Playbook typically default to independent expand/collapse.

**Primitive vs. compound:** Paste offers Disclosure as a single primitive. shadcn/ui (Radix) offers AccordionItem/AccordionTrigger/AccordionContent compound components. Lightning provides a higher-level Accordion with items API.

**ARIA pattern:** All custom implementations use button[aria-expanded] + [aria-controls] + [id] pattern. Primer's details/summary relies on native browser semantics.

## A11y Consensus
- Trigger: `<button>` with aria-expanded; Enter/Space to toggle
- Panel: id referenced by aria-controls on trigger; aria-hidden or hidden when closed
- No role="tab" — accordion triggers are buttons, not tabs

## Recommended Use
Primer's details/summary for zero-JS collapsible content in documentation or simple contexts. Radix/shadcn Accordion when full styling control and single/multiple modes are needed. Lightning Accordion for Salesforce page section organization.
