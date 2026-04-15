---
system: Nord Design System (Nordhealth)
component: Divider
url: https://nordhealth.design/components/divider/
last_verified: 2026-03-29
confidence: high
---

# Divider

## Approach
Nord's `<nord-divider>` Web Component provides a semantic horizontal rule for separating content sections in clinical interfaces. In electronic health record layouts, dividers play a structural clarity role: they separate distinct sections of a patient record (demographic information from clinical history, medications from allergies, vital signs from assessment notes) without introducing the visual weight of card borders or box shadows. Nord's divider is intentionally minimal — a single thin line styled via CSS custom properties — reflecting the Nordic design philosophy of using space and structure over decorative visual elements. The component maps to an HTML `<hr>` element under the hood, preserving semantic separation meaning for assistive technologies. In clinical forms and data entry views, dividers provide scannable section delineation that helps clinicians quickly locate relevant information under time pressure.

## Key Decisions
1. **Semantic `<hr>` mapping** (HIGH) — Using `<hr>` as the underlying element means the divider communicates a thematic break to screen readers and search engines, not just a visual line. In clinical documents read by screen reader users, this semantic break helps orient users navigating long patient records by section.
2. **Styling via CSS Custom Properties** (MEDIUM) — Divider color and thickness are exposed through Nord's token system (e.g., `--nord-color-border`) rather than component props, allowing institutional white-labeling and ensuring dividers automatically adapt when organizations apply their brand tokens without requiring prop changes.
3. **No decorative variants** (MEDIUM) — Nord intentionally omits dashed, dotted, or decorative divider variants. Clinical interfaces require clear, unambiguous visual structure — decorative dividers introduce unnecessary visual noise in environments where clinicians are scanning dense patient data under cognitive load.
4. **Vertical divider support** (LOW) — For use in horizontal layouts (e.g., toolbar separators, inline action groups within clinical forms), the component supports a vertical orientation variant, allowing the same semantic and styling consistency in both layout axes.

## Notable Props
- `vertical`: Boolean attribute; when present, renders the divider vertically for use in horizontal flex layouts (e.g., separating action groups in a clinical toolbar)
- Styling controlled via CSS Custom Properties: `--nord-color-border` for color, respecting the global token system

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior; not focusable
- **Screen reader**: Renders as `<hr>` element, which is announced as a "separator" by screen readers that support the separator role, providing structural orientation in long clinical documents read end-to-end
- **ARIA**: Inherits `role="separator"` from `<hr>` semantics; `aria-orientation` reflects horizontal (default) or vertical orientation

## Strengths & Gaps
- **Best at**: Providing clean, semantically correct content section separation in clinical forms, patient records, and EHR layouts; integrates seamlessly with Nord's token system for consistent color application; zero-overhead visual separation without card/box-shadow complexity
- **Missing**: No label/text variant (a divider with a centered label like "Clinical History" used as a section header separator in some EHR designs); no spacing control props (margins must be managed by surrounding layout, which can be inconsistent across teams)
