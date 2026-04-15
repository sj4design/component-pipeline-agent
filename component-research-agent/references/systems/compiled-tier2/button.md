---
component: Button
tier: 2
last_verified: 2026-03-28
---

# Button — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Button | Loading + icon variants; destructive variant; as prop for polymorphism | high |
| Salesforce Lightning | Button | brand/neutral/destructive/success variants; icon button via Button Icon | high |
| GitHub Primer | Button | variant + size system; leadingVisual/trailingVisual icon slots; as prop | high |
| shadcn/ui | Button | CVA variants; asChild prop (Radix Slot); 6 variants; size variants | high |
| Playbook | Button | Sales/service action buttons; dual React/Rails | medium |
| REI Cedar | CdrButton | Vue button; icon-left/icon-right slots; responsive sizing; WCAG AA | medium |
| Wise Design | Button | Minimal financial action buttons; transfer CTAs | low |
| Dell Design System | Button | Enterprise IT action buttons | low |

## Key Decision Patterns

**Variant systems:** All systems define a primary/secondary/destructive minimum. Lightning adds success and brand. shadcn/ui adds ghost, link, outline. Paste adds destructive loading state.

**Polymorphism:** Paste uses `as` prop. Primer uses `as` prop. shadcn/ui uses `asChild` (Radix Slot pattern). This allows rendering a button as an anchor tag with button styling.

**Loading states:** Paste has explicit `loading` prop with spinner. Lightning uses `isLoading`. Primer and shadcn/ui do not have built-in loading states — developers compose with spinner.

**Icon integration:** Primer uses leadingVisual/trailingVisual render props. Cedar uses named slots. Lightning has separate ButtonIcon component. shadcn/ui relies on children composition.

## A11y Consensus
- Use `<button>` element (not div/span); avoid role="button" on non-buttons
- Loading state: aria-disabled + aria-busy or aria-label change; no spinner without screen reader text
- Icon-only buttons: require aria-label
- Destructive buttons: aria-label or button text should convey destructive nature

## Recommended Use
Button is universal. Key differentiators: use Paste for loading states in async Twilio actions, shadcn/ui asChild for flexible polymorphism, Primer for GitHub's visual style, Lightning for Salesforce brand-aligned CTA hierarchy.
