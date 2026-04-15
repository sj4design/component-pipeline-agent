---
system: Material Design 3
component: Buttons (Common, FAB, Icon, Segmented)
url: https://m3.material.io/components/all-buttons
last_verified: 2026-03-28
---

# Material Design 3 Buttons

## Approach

M3 treats buttons as a visual emphasis hierarchy rather than a flat set of variants. The system offers five common button types (filled, outlined, tonal, elevated, text) explicitly ordered from highest to lowest prominence, plus three specialized categories: FAB for primary screen actions, icon buttons for compact controls, and segmented buttons for multi-option selection. This hierarchy-first philosophy exists because Google's product ecosystem spans dozens of apps with wildly different information density needs. Rather than letting each team invent its own button priority system, M3 prescribes a universal emphasis ladder so that "filled" always means "primary action" and "text" always means "lowest priority," no matter which Google product you are in. The 2025 Material 3 Expressive update pushed this further by introducing new FAB sizes, FAB menus, and additional color options to support more emotional, branded interactions.

## Key Decisions

1. **Five-level emphasis hierarchy for common buttons** (HIGH) — M3 defines filled, filled tonal, elevated, outlined, and text as a strict prominence gradient. This matters because designers do not need to guess which button "looks" more important; the system tells them. Tonal sits between filled and outlined as a deliberate middle ground for secondary-but-still-important actions like "Next" in onboarding flows, solving the gap where outlined felt too weak but filled was too aggressive.

2. **FAB as a separate architectural concept** (HIGH) — Floating Action Buttons are not just "big buttons" but a distinct component family (FAB, Extended FAB, small FAB) with their own placement rules and sizing. Google separates them because FABs represent the single most important action on a screen and have unique layout behavior (floating, anchored to corners). Treating them as a button variant would muddy the semantic distinction between inline actions and screen-level primary actions.

3. **Filled tonal as the recommended default** (MEDIUM) — M3 documentation steers teams toward tonal buttons for most workflows instead of filled. The reasoning is that filled buttons are visually heavy and should be reserved for truly final actions (Save, Confirm, Submit). Overusing filled buttons creates visual noise, so tonal gives teams a "safe default" that still carries enough weight without dominating the page.

4. **Segmented buttons as toggle groups** (MEDIUM) — Rather than building toggle behavior into regular buttons, M3 isolates segmented buttons as a distinct component for multi-option selection. This prevents the common anti-pattern of using a row of regular buttons to simulate a toggle group, which creates ambiguous selected states and inconsistent keyboard behavior.

## Notable Props

- `variant` (filled | outlined | tonal | elevated | text): The emphasis hierarchy in a single prop, making the designer's intent explicit rather than relying on ad-hoc styling.
- `icon` (leading/trailing slot): M3 mandates icon placement rules (leading only for common buttons) to maintain scanning consistency across products.
- `disabled` with `aria-label`: M3 recommends keeping disabled buttons focusable for screen reader discoverability, following ARIA authoring practices for disabled controls.

## A11y Highlights

- **Keyboard**: All buttons receive focus via Tab. Enter and Space activate. FABs follow the same pattern despite their floating position.
- **Screen reader**: Icon-only buttons require explicit aria-label. FABs announce their action label, not their visual position. Disabled buttons remain in the tab order with aria-disabled so screen readers can discover and explain them.
- **ARIA**: Standard role="button" for all types. Segmented buttons use role="group" with aria-pressed on individual segments to communicate toggle state.

## Strengths & Gaps

- **Best at**: Providing a clear, prescriptive emphasis hierarchy that scales across large product ecosystems with many teams and surfaces.
- **Missing**: No built-in "danger" or "destructive" variant; teams must compose this from color tokens, which creates inconsistency when different products interpret "danger" differently.
