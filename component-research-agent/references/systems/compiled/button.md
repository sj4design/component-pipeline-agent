---
component: button
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Button — All Systems Digest

## Material Design 3
**Approach**: Five-level emphasis hierarchy (filled > tonal > elevated > outlined > text) prescribes universal priority across Google's ecosystem. Separate FAB family for screen-level primary actions. 2025 Expressive update added FAB menus and new sizes.
**Key decisions**:
- Five-level hierarchy replaces per-team priority guessing; "filled" always = primary action
- FAB as distinct component family, not just a large button; owns screen-level action semantics
- Tonal recommended as default to avoid overusing filled (which signals final/irreversible)
**Notable API**: `variant` (filled|outlined|tonal|elevated|text); `icon` (leading slot only per spec)
**A11y**: Disabled buttons stay focusable via aria-disabled; segmented buttons use role="group" + aria-pressed; icon-only requires aria-label.
**Best at**: Prescriptive emphasis ladder that scales across many teams and surfaces. **Missing**: No built-in danger/destructive variant; requires manual color token composition.

## Spectrum (Adobe)
**Approach**: Three separate components — Button (CTA), Action Button (toolbars), ToggleButton (binary state) — prevent the bloated mega-button problem. Semantic variant names (accent, primary, secondary, negative) adapt visually per theme.
**Key decisions**:
- Three components instead of one; each is purpose-built with minimal API and correct ARIA semantics
- Semantic names over visual names; "accent" adapts per theme while "filled" implies a fixed look
- `style` (fill|outline) decoupled from `variant`, creating a clean 2-axis system (intent × weight)
**Notable API**: `style` (fill|outline) independent of `variant`; `isPending` preserves button width during loading
**A11y**: ToggleButton label stays constant; state announced via aria-pressed. Action Button inherits toolbar group semantics.
**Best at**: Clean separation of button contexts (CTA vs. toolbar vs. toggle). **Missing**: No segmented button or button group; radio-style groups require custom composition.

## Carbon (IBM)
**Approach**: Enterprise-density focus with five kinds and seven sizes. Danger available in three emphasis levels (primary/tertiary/ghost) to avoid "everything is red" dilution. Ghost buttons require an icon due to low affordance in dense dashboards.
**Key decisions**:
- Ghost buttons must include an icon; plain ghost text is indistinguishable from static text in dense UIs
- Three danger levels (primary/tertiary/ghost) match severity to visual alarm intensity
- Productive vs. expressive LG size split supports both data-dense and marketing/onboarding contexts
**Notable API**: `kind` (primary|secondary|tertiary|danger|ghost); `size` (xs–2xl, 7 options); `isExpressive`
**A11y**: Icon-only tooltips shown on both hover and keyboard focus; visible border between adjacent ghost/secondary recommended for WCAG non-text contrast.
**Best at**: Granular emphasis control for complex enterprise dashboards. **Missing**: No toggle button or segmented button; use Content Switcher instead.

## Polaris (Shopify)
**Approach**: Intentionally simpler variant set optimized for non-technical merchants who need immediate action recognition. Tone (critical) is orthogonal to variant, so any emphasis level can be destructive. Disclosure is a first-class built-in pattern.
**Key decisions**:
- `tone=critical` separate from variant; destructive actions occur at every emphasis level in merchant flows
- Disclosure prop built-in for "reveal more options" pattern ubiquitous in Shopify admin
- Fewer variants by design; research showed too many button styles slow merchant recognition
**Notable API**: `tone` (critical, independent of variant); `disclosure` (boolean|"up"|"down")
**A11y**: `accessibilityLabel` docs require visible text be included in aria-label so speech activation can match what users see/say.
**Best at**: Clear, constrained system for non-technical users needing quick action recognition. **Missing**: No toggle, icon-button, or segmented button components.

## Atlassian
**Approach**: 2025 refactor split monolithic Button into Button, IconButton, and LinkButton to enforce semantic correctness (links navigate, buttons act). Actively discourages disabled buttons in favor of inline validation. Structured APIs force accessibility by making label a required prop on IconButton.
**Key decisions**:
- Three-component split eliminates href-on-button a11y bugs; correct HTML element per use case
- Disabled buttons discouraged; keep enabled + use validation messages (reduces top user frustration source)
- `label` is a required prop on IconButton; a11y structurally enforced, not hoped for
**Notable API**: `appearance` (default|primary|subtle|warning|danger); `isSelected` for toolbar active state
**A11y**: IconButton label is non-optional. LinkButton renders as `<a>` with correct link semantics. Danger/warning rely on label text, not ARIA, since color alone isn't accessible.
**Best at**: Semantic correctness via architecture and structurally-enforced accessibility. **Missing**: No FAB, segmented button, or toggle button.

## Ant Design
**Approach**: Maximalist single-component API handling all button scenarios through props. Unique `dashed` type for "add more" patterns from Chinese enterprise form conventions. Ghost is a compositional mode (boolean) independent of type, not a variant.
**Key decisions**:
- `dashed` type signals extensible/add-more affordance; almost unique among major systems
- `ghost` is a boolean overlay mode, not a type; separates display context from semantic intent
- `danger` is orthogonal boolean like Polaris's tone; primary+danger, text+danger all valid
**Notable API**: `type` (primary|default|dashed|text|link); `block` (full-width); `loading` ({delay, icon} with custom spinner)
**A11y**: Less prescriptive than Western systems; link type renders as `<button>` not `<a>` (semantic issue); danger communicated by color alone by default.
**Best at**: Maximalist single-component covering virtually every scenario including unique dashed pattern. **Missing**: Weaker a11y enforcement; no structural requirement for icon-only labels; link type has semantic issues.
