---
system: Spectrum (Adobe)
component: Button, Action Button, ToggleButton
url: https://spectrum.adobe.com/page/button/
last_verified: 2026-03-28
---

# Spectrum Buttons

## Approach

Spectrum splits button-like controls into three distinct components: Button (for primary call-to-action flows), Action Button (for task-based operations within toolbars and menus), and ToggleButton (for binary on/off state). This separation exists because Adobe's products like Photoshop, Lightroom, and Experience Platform have fundamentally different button contexts. A "Save" in a dialog is not the same interaction as a "Bold" toggle in a toolbar or a "Filter" action in a panel. By giving each context its own component, Spectrum prevents the bloated mega-button problem where a single component accumulates dozens of props to handle every use case. The variant system uses semantic names (accent, primary, secondary, negative) paired with style options (fill, outline) rather than visual descriptions, so the intent is always clear regardless of the active theme.

## Key Decisions

1. **Three separate button components instead of one** (HIGH) — Spectrum explicitly separates Button, Action Button, and ToggleButton at the component architecture level. The reason: Action Buttons in toolbars need different sizing, density, and grouping behavior than CTAs in dialogs. Toggle state introduces aria-pressed semantics that a regular button should never have. Merging these would force conditional logic everywhere and make the API confusing. The tradeoff is that developers must learn which component to use, but the payoff is that each one is simple and purpose-built.

2. **Semantic variant names over visual descriptions** (HIGH) — Spectrum uses "accent," "primary," "secondary," and "negative" rather than "filled," "outlined," or visual style names. This is deliberate because Adobe supports extensive theming across products. A button labeled "accent" adapts its visual treatment per theme, while a button labeled "filled" would imply a specific look that might not hold across contexts. The semantic naming also forces designers to think about intent rather than appearance.

3. **Deprecation of isQuiet in favor of style prop** (MEDIUM) — Spectrum deprecated the isQuiet boolean and the overBackground variant, replacing them with a composable style prop (fill/outline) and staticColor prop. The old API created ambiguity: isQuiet on an accent button meant something different visually than isQuiet on a secondary button. The new approach makes style and variant independently controllable, which is cleaner for theming and reduces edge cases.

4. **Static color for overlay contexts** (MEDIUM) — The staticColor prop (white/black) replaces the old overBackground variant for buttons placed on images or colored surfaces. Spectrum added this because in creative tools, buttons frequently overlay dynamic content where automatic contrast calculation would fail. The explicit static color gives designers deterministic control.

## Notable Props

- `variant` (accent | primary | secondary | negative): Intent-based naming forces teams to declare purpose, not appearance.
- `style` (fill | outline): Decoupled from variant, so any intent can have any visual weight. This two-axis system (intent x weight) is unique among design systems.
- `staticColor` (white | black): Solves the "button on image" problem that creative tools encounter constantly.
- `isPending`: Built-in loading state that disables interaction but preserves button width to prevent layout shift.

## A11y Highlights

- **Keyboard**: Tab to focus, Enter/Space to activate. ToggleButton announces state change on activation.
- **Screen reader**: Icon-only buttons require aria-label or a label prop. ToggleButton labels must remain constant across states (the screen reader announces "pressed"/"not pressed," not a label change), preventing the common mute/unmute anti-pattern.
- **ARIA**: Button uses role="button". ToggleButton adds aria-pressed. Action Button in toolbar context inherits group semantics from the parent toolbar component.

## Strengths & Gaps

- **Best at**: Cleanly separating button contexts (CTA vs. toolbar action vs. toggle) so each component stays focused and its API stays small.
- **Missing**: No built-in segmented button or button group component; teams needing radio-style button groups must compose from Action Buttons and custom state management.
