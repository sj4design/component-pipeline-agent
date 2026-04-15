---
system: Base Web (Uber)
component: Button
url: https://baseweb.design/components/button/
last_verified: 2026-03-28
confidence: medium
---

# Button

## Approach
Base Web's Button is a styled component built on their primitive layer with the Overrides customization pattern. It covers Uber's range of button needs: primary actions, secondary actions, minimal ghost buttons, and a loading state. The component uses the Base Web theming system, so color, shape (border radius), and sizing all adapt to the active theme. An important Base Web idiom is that buttons can render as links via the `$as` prop, maintaining semantic HTML while using button styling.

## Key Decisions
1. **Kind prop for hierarchy** (HIGH) — Base Web uses `kind` (not `variant`) to control button type: `"primary"`, `"secondary"`, `"tertiary"`, `"minimal"`. This naming reflects Uber's internal design language and is intentionally distinct from common variant naming.
2. **Shape prop for border radius** (MEDIUM) — The `shape` prop (`"default"`, `"pill"`, `"circle"`, `"square"`) provides explicit control over button shape without needing CSS overrides. This addresses Uber's product diversity where pill buttons appear in consumer-facing products and square buttons in internal tools.
3. **isLoading and isSelected** (MEDIUM) — Both states are first-class props. `isSelected` enables toggle button patterns with built-in visual feedback, acknowledging that buttons often need to represent a persistent state (e.g., a filter that is active).

## Notable Props
- `kind`: `"primary" | "secondary" | "tertiary" | "minimal"`
- `size`: `"mini" | "compact" | "default" | "large"`
- `shape`: `"default" | "pill" | "circle" | "square"`
- `isLoading`: shows spinner
- `isSelected`: toggle state visual
- `startEnhancer` / `endEnhancer`: icon/content slots (not just icon — any ReactNode)

## A11y Highlights
- **Keyboard**: Native button behavior; isLoading disables interaction
- **Screen reader**: Loading state changes aria-label or announces via live region
- **ARIA**: `aria-busy` during loading; `isSelected` maps to `aria-pressed` for toggle buttons

## Strengths & Gaps
- **Best at**: Shape variants; enhancer slots that accept any ReactNode; isSelected for toggle patterns
- **Missing**: No explicit button group pattern; kind naming is non-standard and requires team onboarding
