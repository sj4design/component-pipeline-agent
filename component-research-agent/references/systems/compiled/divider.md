---
component: divider
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Divider (3 geometric variants)
**Approach:** M3 provides a documented Divider component with three variants tied to list item alignment: full-width, inset (left-offset to align with list text content), and middle-inset (both sides offset). Thickness is fixed at 1dp. The `outline-variant` semantic token provides automatic light/dark mode adaptation. Dividers within Lists are controlled by the List component's `divider` toggle, not by manually placing Divider components.
**Key Decisions:**
- [HIGH] Inset variant for list alignment: left-side inset aligns the divider with list item text content, preserving the visual hierarchy of the leading icon/avatar column
- [MED] List-level divider control: Dividers within lists are declared as a list property, not imperatively placed between items — reduces inconsistent inset choices across list implementations
- [MED] `outline-variant` token: low-emphasis separator color that auto-adapts to light/dark mode without conditional CSS
**Notable API:** `inset: boolean`; `middleInset: boolean`; no thickness control (fixed 1dp); `role="separator"` with `aria-orientation`
**A11y:** `role="separator"` for structural dividers; `aria-hidden="true"` recommended for purely decorative ones. M3 documents this semantic vs. decorative distinction explicitly.
**Best at:** Inset alignment for list item content — M3's list-specific divider guidance is unique among Tier 1.
**Missing:** Text labels embedded in the divider line (Ant Design's primary feature); no thickness variants.

---

## spectrum
**Component:** Divider (3 sizes, horizontal and vertical)
**Approach:** Spectrum offers a size scale (S=1px, M=2px, L=4px) for thickness variation and explicit `orientation` support for both horizontal and vertical dividers. Vertical dividers are used in toolbars and panel layouts within Adobe's applications. Spectrum deliberately omits text label support. The component is intended to live within Flex or Grid layouts, inheriting gap/margin from the layout context.
**Key Decisions:**
- [HIGH] Three size variants (S/M/L): 1px/2px/4px thickness for different visual weight contexts — analytics UIs use thin; marketing layouts use thick
- [MED] Vertical orientation first-class: `orientation="vertical"` with correct `aria-orientation="vertical"` — important for Adobe toolbar button group separators
- [MED] No text label support: section labels are the job of `Heading` elements, not dividers — clear component responsibility boundary
**Notable API:** `size: "S" | "M" | "L"`; `orientation: "horizontal" | "vertical"`; layout primitive designed for Flex/Grid children
**A11y:** `role="separator"` with `aria-orientation` matching the `orientation` prop — correctly sets `aria-orientation="vertical"` for vertical dividers.
**Best at:** Vertical orientation with correct `aria-orientation` and the three-size thickness scale for density-varied application layouts.
**Missing:** Text label support and `aria-hidden` decorative mode documentation.

---

## carbon
**Component:** Absent — whitespace and border utilities
**Approach:** Carbon has no Divider component. Carbon's philosophy is that separation should be achieved through adequate whitespace (base-8 spacing scale) and container borders rather than decorative lines. The `$border-subtle-01` token serves as the functional equivalent of a divider when applied as a CSS border on container elements. No ARIA guidance for separator patterns is provided.
**Key Decisions:**
- [HIGH] Whitespace over decorative lines: Carbon's grid system creates visual rhythm through spacing; a divider line indicates insufficient spacing, not a design decision
- [MED] `border-subtle-01` token as the practical divider: applied as `border-bottom: 1px solid var(--cds-border-subtle)` on container elements
- [MED] Community inconsistency risk: without a standardized component, IBM teams use `<hr>`, CSS borders on divs, and spacer elements inconsistently — acknowledged gap
**Notable API:** No component. Token: `$border-subtle-01` for CSS border; `<hr>` for semantic separator fallback.
**A11y:** `<hr>` provides native `role="separator"`; CSS border divs provide no separator semantics — a documented accessibility gap for teams who choose the CSS border approach.
**Best at:** Encouraging spatial discipline — Carbon UIs rely on grid spacing for separation rather than decorative lines.
**Missing:** A standardized Divider component for consistent markup and accessibility across IBM products.

---

## polaris
**Component:** Divider (token-based color and width)
**Approach:** Polaris's Divider renders as a semantic `<hr>` element with token-constrained color and width customization. `borderColor` accepts any Polaris border token (semantic names like `border-subdued`, `border-critical`). `borderWidth` uses Polaris's numeric scale. Horizontal only. No text label support.
**Key Decisions:**
- [HIGH] `<hr>` element: native `role="separator"` semantics without additional ARIA — the correct semantic HTML choice for thematic breaks between content
- [HIGH] Token-constrained `borderColor`: semantic token vocabulary (border, border-subdued, border-critical) prevents arbitrary colors while enabling contextual meaning (critical dividers for error sections)
- [MED] `borderWidth` scale: `025`/`050`/`100` (1px/2px/4px) using Polaris notation — section-level vs. item-level visual weight differentiation
**Notable API:** `borderColor: PolarisColorToken`; `borderWidth: "025" | "050" | "100"`; horizontal only; renders `<hr>`
**A11y:** Native `<hr>` provides `role="separator"` automatically. Polaris documents that decorative-only dividers should use `aria-hidden="true"` — better semantic guidance than most systems.
**Best at:** Semantic `<hr>` foundation with token-constrained color — accessibility-correct HTML with meaningful semantic color choices.
**Missing:** Vertical orientation; text label support.

---

## atlassian
**Component:** Divider (single variant — zero configuration)
**Approach:** Atlassian's Divider is intentionally minimal: no configuration props beyond `testId`. Single visual treatment using the `color.border` design token. Horizontal only. Renders as `<hr>`. Used primarily within dropdown menus and navigation panels to separate logical item groups. Visual consistency is enforced by offering no customization options.
**Key Decisions:**
- [HIGH] Zero-configuration single variant: no color, width, or orientation props — every Atlassian product uses the same divider; design governance is enforced by removing choice
- [MED] Menu and navigation context: Atlassian documents Divider usage within dropdown menus (separating action groups in Jira issue menus) as the primary use case
- [MED] `color.border` token integration: automatically adapts to Atlassian's light/dark token modes without any configuration
**Notable API:** `testId: string` (only non-default prop); `color.border` token; renders `<hr>`
**A11y:** `<hr>` provides `role="separator"`. Atlassian documentation notes decorative dividers should use `aria-hidden="true"`.
**Best at:** Absolute consistency — zero configuration means no visual divergence between Jira, Confluence, and Bitbucket dividers.
**Missing:** Thickness and color variation for hierarchical separation (major section vs. minor item separator).

---

## ant-design
**Component:** Divider (text labels, orientation, dashed variant)
**Approach:** Ant Design's Divider is the richest in Tier 1. `children` prop embeds text content within the rule, splitting the line on each side. `orientation` positions the embedded text at left/center/right. `orientationMargin` sets pixel/percentage distance from the container edge. `type="vertical"` renders an inline vertical separator for action groups. `dashed` renders a dashed line for optional/expandable sections in Chinese enterprise UI conventions.
**Key Decisions:**
- [HIGH] Embedded text label in divider line: `children` prop creates section headers within the rule — the only Tier 1 system with this feature; addresses dense enterprise form section labeling
- [MED] `orientation` for text position: left/center/right text alignment within the rule — left-aligned matches Chinese enterprise reading flow and form field alignment
- [MED] `type="vertical"` as inline separator: renders inline in text flow for "Edit | Delete | View" action groups — architecturally different from other systems' vertical divider implementations
**Notable API:** `children` for embedded text; `orientation: "left" | "center" | "right"`; `orientationMargin: string | number`; `type: "horizontal" | "vertical"`; `dashed: boolean`; `plain: boolean` (normal vs. bold text weight)
**A11y:** Renders as `<div role="separator">` (not `<hr>`); embedded text is read as part of the separator. Text labels do not carry `role="heading"` — screen reader users navigating by heading will not land on divider labels, reducing usability for keyboard heading navigation.
**Best at:** Text-labeled section dividers for dense enterprise form layouts — unique first-class support for the section header within a rule pattern.
**Missing:** Semantic heading role for embedded text labels (reduces screen reader navigability by heading); token-based color control.
