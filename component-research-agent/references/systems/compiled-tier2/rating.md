---
component: Rating
tier: 2
last_verified: 2026-03-31
---

# Rating — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Not available | No rating component; Paste focuses on communication/contact-center UI where star ratings are not a standard pattern. | high |
| Salesforce Lightning | Rating (not present) | No dedicated rating component; Lightning includes a 5-star display pattern in record detail pages but no reusable component API. Star display is handled via custom LWC implementations per product surface. | medium |
| GitHub Primer | Not available | No rating component; GitHub's UI does not use star-rating input — "starring" a repo is a single toggle, not a multi-level score. | high |
| shadcn/ui | Not available (community) | No official rating component in shadcn/ui registry. Community implementations exist using Radix Toggle primitives or custom star rows, but nothing in the canonical set. | high |
| Playbook | Not available | No rating component in Playbook's component library. | low |
| REI Cedar | Not available | No rating component; REI product pages display star ratings but the implementation is outside the Cedar design system. | medium |
| Wise Design | Not available | No rating component; Wise's financial product UI does not require star-rating input or display. | medium |
| Dell Design System | Not available | No rating component documented in Dell DS public references. Product review ratings on Dell.com are implemented at the application level. | low |

## Key Decision Patterns

**Rating is overwhelmingly absent from Tier 2 systems.** None of the 8 Tier 2 systems provide a dedicated, documented Rating component. This is the strongest "not present" signal of any component surveyed across Tier 2 — even components like ColorPicker or InlineEdit have at least 1-2 T2 implementations.

The absence pattern breaks into two categories. First, systems serving domains where star ratings are irrelevant (Paste/communication, Primer/developer tools, Wise/finance) — these systems have no product surface that would benefit from a rating primitive. Second, systems serving domains where star ratings appear in the product but are implemented outside the DS (Lightning/Salesforce CRM, Cedar/REI e-commerce, Dell/product pages) — the rating display is considered too product-specific or too simple to warrant a shared component.

Salesforce Lightning is the closest to having a rating component. Lightning record pages display star ratings for customer satisfaction fields, and Lightning Design System includes visual specifications for a "star rating" pattern. However, this is documented as a recipe/pattern rather than a shipped component with a public API — developers build it using `lightning-icon` instances and custom event handling.

shadcn/ui's absence is notable because Radix (its foundation) also lacks a Rating primitive, so there is no headless base to wrap. Community-contributed rating components for shadcn exist on GitHub but are not part of the official registry, indicating the maintainers do not consider it core enough to include.

## A11y Consensus
- Interactive rating should use radio group pattern: `role="radiogroup"` container with `role="radio"` per star, `aria-checked` for selected state
- Display-only rating should use `role="img"` with `aria-label` describing the value (e.g., "Rated 4 out of 5 stars")
- Half-star precision in display: `aria-label` should announce the fractional value ("4.5 out of 5 stars"), not round
- Keyboard: Tab to focus group, Arrow keys to navigate between star options, Space/Enter to select

## Recommended Use
No Tier 2 system provides a rating component to reference. For implementation guidance, use Ant Design (Tier 1) as the primary reference — it is the only Tier 1 system with a full Rating (Rate) component. For headless/unstyled approaches, build from a radio group primitive (Radix RadioGroup or equivalent) with star icons. Pair interactive ratings with a visible text label showing the numeric value for precision clarity.
