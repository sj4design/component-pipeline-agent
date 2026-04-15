---
system: Fluent 2 (Microsoft)
component: Button
url: https://fluent2.microsoft.design/components/web/react/button/usage
last_verified: 2026-03-28
confidence: high
---

# Button

## Approach
Fluent 2's Button system is one of the most comprehensive in any design system, reflecting Microsoft's diverse product needs across Office, Azure, Xbox, and consumer apps. It provides multiple distinct button components: Button (primary interactive), CompoundButton (icon + two-line text), MenuButton (with dropdown trigger), SplitButton (action + menu), and ToggleButton. Each is a separate component rather than variants of a single Button, reflecting Fluent's philosophy that structurally different buttons should be different components with different APIs.

## Key Decisions
1. **Separate components per button type** (HIGH) — SplitButton, MenuButton, CompoundButton, and ToggleButton are distinct components, not variants. This prevents the single Button component from becoming a sprawling API. It also means each type has a focused, correct accessibility implementation rather than a generalized one.
2. **appearance prop for visual hierarchy** (HIGH) — Fluent uses `appearance` (not `variant`) with values: `"primary"`, `"secondary"`, `"outline"`, `"subtle"`, `"transparent"`. This naming intentionally reflects the visual treatment (how the button appears) rather than its semantic role (which hierarchy level it is).
3. **Density via size prop** (MEDIUM) — `size` values of `"small"`, `"medium"`, `"large"` map to Fluent's density modes, which are critical for Office's compact and spacious display modes. Small is used in toolbars; large in dialogs.

## Notable Props
- `appearance`: `"primary" | "secondary" | "outline" | "subtle" | "transparent"`
- `size`: `"small" | "medium" | "large"`
- `icon`: icon element; `iconPosition`: `"before" | "after"`
- `disabled` / `disabledFocusable`: disabled but still focusable (important for showing tooltips on disabled buttons)
- `as`: polymorphic element type

## A11y Highlights
- **Keyboard**: Enter/Space activate; Tab navigation; focus visible ring meets WCAG 2.1 non-text contrast
- **Screen reader**: `disabledFocusable` keeps button in tab order while announcing disabled state — allows tooltip to explain why button is disabled
- **ARIA**: `aria-pressed` for ToggleButton; SplitButton uses proper composite widget ARIA

## Strengths & Gaps
- **Best at**: SplitButton and CompoundButton patterns; disabledFocusable for tooltip accessibility; Office density support
- **Missing**: Loading state is not built into the base Button (requires custom implementation); no built-in button group
