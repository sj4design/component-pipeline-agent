---
system: Polaris (Shopify)
component: Button
url: https://polaris.shopify.com/components/actions/button
last_verified: 2026-03-28
---

# Polaris Button

## Approach

Polaris designs buttons for a very specific context: Shopify merchants who are not professional software users and need clear, unambiguous guidance about what each action will do. The button system is intentionally simpler than enterprise-focused systems because Polaris prioritizes clarity over granularity. Instead of a five-level emphasis hierarchy, Polaris uses a smaller set of variants (primary, secondary, tertiary, plain, monochromePlain) paired with a "tone" system (default and critical) that communicates intent orthogonally to emphasis. The disclosure button pattern is a Polaris signature, reflecting the common Shopify pattern of actions that reveal additional options. Every design decision is filtered through the question "will a non-technical merchant understand what this button does and what will happen when they click it?"

## Key Decisions

1. **Tone as a separate axis from variant** (HIGH) — Polaris separates "how prominent" (variant) from "how dangerous" (tone=critical) as independent props. This means any variant can be critical: a primary critical button for "Delete store," a plain critical button for "Remove item." Most systems bake danger into the variant list (alongside primary, secondary, etc.), which forces an implicit assumption that danger always has a specific visual weight. Polaris's approach is more flexible because destructive actions occur at every emphasis level in merchant workflows.

2. **Disclosure as a first-class pattern** (MEDIUM) — Polaris builds disclosure (a chevron that indicates "more options") directly into the Button component as a prop, not as a separate dropdown trigger component. This reflects the reality of Shopify's UI: merchants constantly encounter buttons that expand to show additional actions ("More actions," "Manage," "Export"). Making disclosure a built-in prop ensures consistent chevron placement, animation, and semantics across every instance instead of leaving teams to DIY it.

3. **Deliberate simplicity over granularity** (HIGH) — Polaris offers fewer variants than systems like Carbon or M3. There is no "elevated," "tonal," or "ghost" variant. This is a conscious constraint, not a limitation. Shopify's research showed that merchants scan admin interfaces quickly and make snap decisions; too many button styles slow down recognition. By limiting the palette, Polaris ensures that every button on the screen falls into an immediately recognizable category.

4. **Monochrome plain for embedded contexts** (MEDIUM) — The monochromePlain variant renders a button that inherits the surrounding text color, essentially looking like a styled link. Polaris added this for contexts where a button needs to feel part of the content flow (e.g., inline "Learn more" actions within card descriptions) without the visual disruption of a colored or outlined button.

## Notable Props

- `variant` (primary | secondary | tertiary | plain | monochromePlain): A deliberately small set that covers merchant use cases without overwhelming.
- `tone` (critical): Orthogonal to variant, so danger can be applied at any emphasis level. Clean separation of "how important" vs. "how risky."
- `disclosure` (boolean | "up" | "down"): Built-in pattern for "this button reveals more options." Default direction is down when set to true.
- `accessibilityLabel`: Explicit prop (maps to aria-label) that Polaris documentation emphasizes should supplement, not replace, visible text. The docs specifically call out that speech activation users need the aria-label to include the visible text.

## A11y Highlights

- **Keyboard**: Tab to focus, Enter/Space to activate. Disclosure buttons manage their own expanded/collapsed state announcement.
- **Screen reader**: accessibilityLabel adds aria-label. The documentation specifically warns to include visible button text within the aria-label so speech activation software can match what the user sees and says.
- **ARIA**: Polaris targets WCAG 2.1 Level AA. Icon-only buttons require accessibilityLabel. Disclosure buttons communicate expanded state via aria-expanded.

## Strengths & Gaps

- **Best at**: Providing a clear, constrained button system optimized for non-technical users who need to quickly identify what each action does and how risky it is.
- **Missing**: No built-in toggle button, icon button, or segmented button components; the system relies on other components (like SegmentedControl or ActionList) for those patterns.
