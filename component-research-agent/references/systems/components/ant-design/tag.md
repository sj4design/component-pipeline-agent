---
system: Ant Design
component: Tag
url: https://ant.design/components/tag/
last_verified: 2026-03-28
---

# Tag

## Approach

Ant Design's Tag component reflects the system's enterprise Chinese fintech heritage — it is the most feature-complete and visually expressive tag implementation among Tier 1 systems, offering the broadest color system, a checkable/toggleable variant, and deep CSS variable theming. The philosophy here is **maximum flexibility within a consistent visual language**: rather than prescribing narrow semantic color meanings (success = green, error = red), Ant Design provides a full preset color palette (17+ named colors including blue, geekblue, purple, magenta, red, volcano, orange, gold, yellow, lime, green, cyan, and semantic variants) because enterprise products across different industries apply different domain meanings to colors. The `checkable` variant — a Tag that toggles between checked and unchecked visual states — addresses a common pattern in Ant Design's target products: interactive filter tags that do not look like conventional checkboxes or buttons but need toggle semantics. The component also supports a `color` prop that accepts both named presets and arbitrary hex values, making Tag a versatile building block for teams that need to align tag colors with externally defined category systems (like project management tools where each project has a custom color). The result is a component that trades opinionated simplicity for expressive power.

## Key Decisions

1. **Dual color modes: default (tinted background) and solid (filled background)** (HIGH) — Tags render in a light tinted style by default, but can be switched to a solid filled appearance for higher visual emphasis. The WHY: enterprise dashboards and data tools in Ant Design's target market need to distinguish between informational tags (tinted, low-emphasis) and categorical tags that require stronger visual weight (solid, high-emphasis). Having both modes on the same component avoids creating a visual inconsistency when teams need different emphasis levels for the same type of content.

2. **Checkable Tag as a distinct interactive mode** (HIGH) — The `<CheckableTag>` component (or `checkable` mode) transforms a tag into a controlled toggle without changing its visual structure significantly. The WHY: filter UIs in enterprise admin panels — a primary Ant Design use case — frequently need to show a set of toggleable filter options that should look like tags, not checkboxes. Standard checkbox/radio inputs look out of place in these filter pill contexts. CheckableTag gives teams the toggle semantic with the visual affordance of a tag, reducing the need for custom styling.

3. **Color prop accepts hex values alongside named presets** (MEDIUM) — The `color` prop accepts both Ant Design's named colors (e.g., `"blue"`, `"success"`) and arbitrary CSS color values (e.g., `"#f50"`). The WHY: Ant Design is widely used for building admin platforms and SaaS tools where user-generated category systems (like project labels or ticket types) are stored in databases with custom colors. The hex support means tag colors can be driven directly from database values without a mapping layer between user-assigned colors and a constrained preset system.

4. **Status colors as named semantic presets** (HIGH) — `success`, `processing`, `error`, `warning`, and `default` are named color presets with specific visual treatments that align with Ant Design's broader status semantics across alerts, badges, and result components. The WHY: consistency across components for status communication is critical in enterprise dashboards where users scan many status indicators simultaneously. By naming these presets and using them consistently across components, Ant Design ensures that "success" looks the same whether it appears in a Tag, Alert, Badge, or Result component.

5. **CSS variable architecture for deep theming** (MEDIUM) — Tag exposes `--ant-tag-default-bg`, `--ant-tag-solid-text-color`, and related CSS custom properties for per-instance theming. The WHY: Ant Design serves teams building white-label SaaS platforms and multi-tenant applications where tag colors may need to follow tenant-specific brand colors rather than the global design system theme. CSS variable overrides scoped to a container element allow per-tenant theming without component recompilation or CSS specificity battles.

## Notable Props

- `color`: Accepts named presets OR hex values — interesting because it makes Tag one of the few Tier 1 components that can be driven directly by user-generated color data without a mapping layer
- `closable` (boolean): Enables the close/remove button — unlike Polaris's `onRemove` or Spectrum's `onRemove` which implicitly enable the button, Ant Design requires an explicit boolean opt-in before the button appears
- `onClose`: Callback for removal events — also supports `event.preventDefault()` to cancel closure, which is useful for implementing confirmation dialogs without the async Promise pattern Atlassian uses
- `checkable` / `<CheckableTag>`: The toggle tag variant — its `checked` and `onChange` props make it a controlled component, consistent with Ant Design's form control philosophy of always using controlled state
- `icon`: Leading icon slot — allows visual reinforcement of tag meaning with iconography, particularly valuable in Ant Design's enterprise tabular data contexts where color alone may not be sufficient

## A11y Highlights

- **Keyboard**: Closable tags expose the close button as a keyboard-accessible element (Tab-reachable, Enter/Space to activate). CheckableTag responds to Space/Enter for toggle activation, matching standard checkbox keyboard behavior. Tags without interaction receive no keyboard focus.
- **Screen reader**: Tag text is directly readable. The close button on closable tags should carry descriptive text — Ant Design's documentation notes that icon-only elements should include `aria-label` attributes, but does not auto-generate remove button labels the way Polaris does, placing more burden on the implementing developer to ensure adequate labeling. Status color presets pair color with meaningful text labels, ensuring semantic meaning is not color-dependent.
- **ARIA**: CheckableTag uses appropriate checked state communication. The component follows Ant Design's general pattern of relying on native HTML semantics (button for close, input-like behavior for checkable) with explicit ARIA attributes required for non-standard usages. No custom roles are used — the system prefers semantic HTML over ARIA overrides.

## Strengths & Gaps

- **Best at**: Color expressiveness and CheckableTag — the combination of 17+ preset colors, hex value support, and the dedicated checkable toggle variant makes Ant Design Tag the best reference for systems that need highly expressive, data-driven tag coloring and filter toggle patterns in enterprise UIs.
- **Missing**: No TagGroup component with overflow management and no auto-generated accessibility labels on remove buttons — teams must implement group layout, overflow handling, and close button labeling themselves, creating more implementation burden than Spectrum or Polaris for standard tag list patterns.
