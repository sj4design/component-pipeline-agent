---
system: Chakra UI
component: Steps / Stepper (v3)
url: https://chakra-ui.com/docs/components/steps
last_verified: 2026-03-29
confidence: medium
---

# Steps / Stepper

## Approach
Chakra UI v2 did not include a Stepper/Steps component. Teams typically used `@chakra-ui/pro-components` (a paid library) or built custom steppers. Chakra UI v3 introduced a native Steps component as part of the major component expansion. The component supports both horizontal and vertical orientations, renders numbered step indicators or custom icons, shows connecting lines between steps, and manages completed/active/pending visual states. It is a display component — navigation logic (prev/next, validation, step completion tracking) is left to the consumer, which keeps the component focused on presentation.

## Key Decisions
1. **Available from v3 only** (HIGH) — Teams on Chakra v2 have no official Steps component. The primary workarounds were building from scratch using `Box`, `Circle`, and `Divider` components, or using the pro components library. This was a notable gap in v2 that v3 addressed.
2. **Horizontal and vertical support** (HIGH) — Both orientations are first-class in v3. Horizontal is typical for desktop checkout flows; vertical for mobile onboarding and configuration wizards. The same API works for both — orientation is a prop on the Steps root.
3. **Indicator customization** (MEDIUM) — Step indicators can show sequential numbers (default), completion checkmarks, or custom icons. This covers the main visual variants: numbered progress (checkout), task completion (onboarding checklist), and status icons (workflow stages).
4. **No built-in content panel** (MEDIUM) — Unlike Mantine's Stepper which renders step content as children of each step, Chakra's Steps is purely a navigation indicator. Content for each step must be rendered separately and conditionally shown based on the current step index. This separation is cleaner architecturally but requires more consumer code.

## Notable Props
- `step`: current active step index (controlled)
- `orientation`: `"horizontal"` | `"vertical"`
- `colorScheme`: color for active/completed states
- `size`: `"sm"` | `"md"` | `"lg"`
- Per-step: `title`, `description`, `icon` (custom indicator icon)
- `isLastStep`, `isCompleted`, `isIncomplete`: step state props

## A11y Highlights
- **Keyboard**: Non-interactive display component; any navigation buttons (prev/next) are consumer-provided and follow standard button accessibility
- **Screen reader**: Step indicators include visually-hidden text for step numbers and states; active step can use `aria-current="step"`
- **ARIA**: `aria-current="step"` on active step; completed/pending states communicated via visually-hidden text or `aria-label`

## Strengths & Gaps
- **Best at**: Clean display-only stepper with horizontal/vertical support in v3; token theming; custom step icons
- **Missing**: Not in v2; no built-in navigation controls; no step content panel (must be managed externally); no click-to-navigate between completed steps
