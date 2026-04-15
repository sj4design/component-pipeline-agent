---
system: Mantine
component: Loader
url: https://mantine.dev/core/loader/
last_verified: 2026-03-28
confidence: high
---

# Loader (Spinner)

## Approach
Mantine's loading indicator is named "Loader" (not Spinner). It supports three distinct visual variants: `"oval"` (classic ring spinner), `"bars"` (three animated bars), and `"dots"` (three pulsing dots). This variety lets teams match the loader to their interface aesthetic. The `MantineProvider` can set a default loader type globally, ensuring all loading states are consistent. Custom loaders can also be registered in the provider.

## Key Decisions
1. **Three built-in loader types** (HIGH) — oval, bars, and dots cover the most common loading animations. Bars is popular in more minimal interfaces; dots is used for inline loading (text is loading). Having all three built-in is a significant advantage.
2. **Custom loaders via MantineProvider** (HIGH) — Teams can register custom SVG/CSS loaders globally, then reference them by name anywhere in the app. This makes the loader system fully extensible.
3. **loaders global registry** (MEDIUM) — Any component using loading state (Button, Select) can reference the registered loader types by name.

## Notable Props
- `type`: `"oval" | "bars" | "dots"` or custom name
- `size`: explicit size or `"xs" | "sm" | "md" | "lg" | "xl"`
- `color`: token color

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: role="progressbar" or similar; aria-label should be added by consumer (no default label)
- **ARIA**: Consumer responsible for accessible loading announcement; no built-in label unlike Chakra/Fluent

## Strengths & Gaps
- **Best at**: Three visual types; custom loader registration; global default loader type
- **Missing**: No built-in accessible label (unlike Chakra which has default "Loading..."); consumer must handle a11y announcement
