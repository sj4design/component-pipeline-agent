---
system: Spectrum (Adobe)
component: Popover + ContextualHelp
url: https://spectrum.adobe.com/page/popover/
last_verified: 2026-03-28
---

# Popover

## Approach

Spectrum treats the Popover as a first-class floating container for transient content that needs visual prominence above the page surface. Adobe's products (Lightroom, Analytics, Experience Platform, Creative Cloud) regularly require rich contextual overlays — think tool option panels, layer settings, and contextual help — so a well-specified Popover is essential infrastructure. The design philosophy positions Popover between Tooltip (passive, no interaction) and Dialog (modal, full interruption): Popover is interactive and focused but never blocks background access. It floats with stroke and drop shadow to clearly separate it from the page, while an optional pointer tip reinforces the visual connection to its trigger.

Spectrum further specializes the pattern with a second component, ContextualHelp, which is an opinionated Popover preset for the specific job of contextual guidance next to form fields and labels. Rather than leaving teams to guess at structure, ContextualHelp enforces Heading + Content + optional Footer with a standardized icon button trigger. This separation between the general-purpose Popover and the specialized ContextualHelp pattern is intentional: the former handles compositional needs, the latter provides a turnkey solution for the most common use case in enterprise UI.

## Key Decisions

1. **Optional pointer tip** (HIGH) — By default, Popover renders without a tip/caret. A tip is only added when the trigger element lacks a visually distinct "active" or "down" state. This reasoning is precise: if the button already communicates its active state clearly, adding a redundant arrow is visual noise. If the trigger is ambiguous, the tip provides the connection. This is more nuanced than most systems that either always show or never show an arrow.

2. **20 placement variants** (MEDIUM) — Spectrum supports placements across all four sides, each with start/end/center alignment variations. The rationale is viewport flexibility: enterprise products have complex layouts where naively defaulting to "top" would cause clipping. The system auto-adjusts when the preferred placement would go off-screen, with `shouldFlip` controlling that behavior.

3. **Focus trap inherited from Dialog** (HIGH) — Popovers that wrap interactive content use React Aria's Dialog under the hood, which traps focus within the overlay. This is a deliberate accessibility stance: once a popover opens, keyboard users cannot accidentally tab into background content. Escape dismisses and returns focus to the trigger. This is stricter than most systems, which often leave focus trap as optional.

4. **ContextualHelp as a preset** (HIGH) — Rather than documenting a Popover usage pattern for contextual help, Spectrum ships a separate component with enforced structure (help vs. info variant, required Heading, optional Footer with link). This reduces design drift across product teams — every piece of contextual help in the entire Adobe suite looks and behaves the same because the component itself enforces it.

5. **Origin-aware animations** (LOW) — As of 2025, Spectrum added origin-aware overlay animations where the scale transition appears to emerge from the trigger element itself. This was not just visual polish — it reinforces the spatial relationship between trigger and popover for sighted users, reducing cognitive confusion about where the overlay came from.

## Notable Props

- `shouldFlip`: Whether the popover flips to the opposite side if the preferred placement clips. Interesting because it exposes the flip behavior as a consumer decision rather than hardcoding it.
- `offset` / `crossOffset`: Fine-grain positional adjustment beyond the preset placements. Useful for edge cases where the 8px default does not align with component borders.
- `isOpen` / `defaultOpen`: Controlled vs. uncontrolled state. Spectrum explicitly supports both patterns, acknowledging that some orchestration needs to control open state externally.
- `trigger` (ContextualHelp): Accepts `'help'` or `'info'` to swap the icon and semantic intent of the trigger button. A rare case of encoding content semantics into a prop.

## A11y Highlights

- **Keyboard**: Escape closes the popover and returns focus to the trigger. Tab navigates within the popover. Focus does not escape to background content while the popover is open.
- **Screen reader**: Uses `role="dialog"` inherited from the Dialog primitive, which announces the popover as a dialog region. ContextualHelp's SVG illustrations use `aria-hidden="true"` and `role="presentation"` to prevent redundant announcements.
- **ARIA**: Trigger elements receive `aria-haspopup="dialog"` and `aria-expanded` to communicate state. `aria-label` or `aria-labelledby` must be provided on the Dialog element for accessible naming.

## Strengths & Gaps

- **Best at**: Accessibility rigor — focus trap by default, origin-aware animations, and a specialized ContextualHelp preset make Spectrum the most complete popover implementation for enterprise accessibility.
- **Missing**: Explicit documentation on when NOT to use Popover (the line between Popover and Dialog is not documented with concrete criteria), and no built-in action button slot in the base Popover.
