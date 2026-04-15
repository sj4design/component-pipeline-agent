---
system: Material Design 3
component: Divider
url: https://m3.material.io/components/divider
last_verified: 2026-03-28
---

# Divider

## Approach
Material Design 3 treats Divider as a proper component with documented variants and semantic guidance, which reflects Google's investment in handling layout structure consistently across Android, Wear OS, and web surfaces. M3 defines three variants: full-width (spanning the entire container), inset (leaving space on the left to align with list item content), and middle-inset (leaving space on both sides, typically used between floating elements). The existence of these three variants is directly tied to M3's List component spec — dividers in lists must optionally align with list item leading content (icons, avatars) to maintain the visual rhythm of the list without the divider cutting through the icon column. M3 also explicitly addresses divider usage in navigation components, sheets, and cards, treating it not as a standalone flourish but as a layout-structure element that carries spatial meaning.

## Key Decisions
1. **Three geometric variants (full-width, inset, middle-inset)** (HIGH) — The inset variant exists specifically because list items in Material Design have a leading content zone (icon, avatar, radio, checkbox) with standardized 16-72dp left padding. A full-width divider would cut through this zone, visually conflating the leading element column with the separation. The inset variant aligns the divider's left edge with the text content start, preserving the visual hierarchy of the list. This is a spatial reasoning decision, not arbitrary stylistic variation.
2. **Divider in Lists is a List-level decision, not a Divider-level decision** (MEDIUM) — M3's List component has its own `divider` toggle rather than requiring manual Divider placement between ListItem elements. This reflects a philosophy that when dividers are part of a list's structure, they should be declared at the list level (as a property of the pattern) rather than imperatively placed between items. This reduces the chance of inconsistent inset choices across different list implementations.
3. **Surface color approach — outline-variant token** (MEDIUM) — M3 dividers use the `outline-variant` semantic color token, which is defined as a low-emphasis version of the outline color. This is important because the divider should be visible enough to indicate separation but never compete with content for visual attention. Using a semantic token rather than a hardcoded color value means dividers automatically adjust between light and dark mode without any conditional logic in the component.
4. **Thickness fixed at 1dp** (LOW) — M3 does not support thick dividers (2px, 4px) or decorative dividers with custom styling. The single thickness reflects Google's view that a divider is a structural tool, not a decorative one — if a visual element needs to be thicker or styled, it is probably serving a different semantic role (a card border, a section header underline) and should use a different component.

## Notable Props
- `inset`: Controls whether the divider has left-side padding for list alignment. The naming ("inset" rather than "indent" or "offset") matches Android's Compose API naming exactly, reflecting M3's cross-platform consistency goal.
- `middleInset`: Both-sides padding variant. Available as a separate prop or variant depending on implementation (Compose vs. web).

## A11y Highlights
- **Keyboard**: Dividers are non-interactive; no keyboard behavior.
- **Screen reader**: M3 guidance recommends `role="separator"` for dividers that separate meaningful content regions, and `aria-hidden="true"` for purely decorative ones. The system documents this distinction explicitly, which is more guidance than most systems provide.
- **ARIA**: `role="separator"` with optional `aria-orientation="horizontal"` (default) or `aria-orientation="vertical"` for vertical dividers in navigation drawers.

## Strengths & Gaps
- **Best at**: Integrating dividers naturally into the List component's structure with inset alignment that preserves list visual rhythm — this level of list-specific divider guidance is unique among Tier 1 systems.
- **Missing**: Dividers with embedded text labels (a section header centered in the divider line) — Ant Design supports this natively and it is a common UI pattern for grouping list sections.
