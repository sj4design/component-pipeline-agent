---
system: Gestalt (Pinterest)
component: Button
url: https://gestalt.pinterest.systems/web/button
last_verified: 2026-03-28
confidence: medium
---

# Button

## Approach
Gestalt's Button reflects Pinterest's consumer-facing product aesthetic — rounded, colorful, visually prominent. The system provides a button with strong visual hierarchy through the `color` prop, which maps to Pinterest's semantic color palette (red for primary, blue for links, neutrals for secondary). The component is designed for both the consumer Pinterest app and the business advertising platform, which have different visual needs but share the same component. Gestalt buttons emphasize visual affordance through color and shape rather than shadows or other depth cues.

## Key Decisions
1. **color prop maps to semantic roles** (HIGH) — Rather than a generic variant system, Gestalt uses a `color` prop with values like `"red"`, `"blue"`, `"transparent"`, `"white"`. Pinterest's brand red is the primary action color. This reflects Pinterest's strong brand identity being embedded in the component system.
2. **iconEnd / iconStart for icon placement** (MEDIUM) — Icons are specified by name string (from Gestalt's icon set) via `iconStart` or `iconEnd`, not as ReactNode. This enforces use of Gestalt's icon library and prevents arbitrary icon mixing.
3. **Selected state** (MEDIUM) — The `selected` prop creates a toggle button visual state, used in filter interfaces (Pinterest search filters, ad targeting) where buttons represent persistent selection states.

## Notable Props
- `text`: required button label (enforces accessible text)
- `color`: `"red" | "blue" | "darkGray" | "transparent" | "white"` etc.
- `size`: `"sm" | "md" | "lg"`
- `iconStart` / `iconEnd`: Gestalt icon name string
- `selected`: toggle state
- `disabled`: standard disabled state

## A11y Highlights
- **Keyboard**: Native button behavior
- **Screen reader**: `text` prop is required, enforcing visible labels; no icon-only buttons without text
- **ARIA**: `aria-pressed` for selected state; Gestalt enforces accessible text by requiring the `text` prop

## Strengths & Gaps
- **Best at**: Brand color integration; required text prop for accessibility enforcement; selected state for filter patterns
- **Missing**: No loading state; icon-only buttons require a separate `IconButton` component; limited variant expressiveness for B2B contexts
