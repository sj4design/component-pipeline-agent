---
system: Spectrum (Adobe)
component: Divider
url: https://react-spectrum.adobe.com/react-spectrum/Divider.html
last_verified: 2026-03-28
---

# Divider

## Approach
Spectrum does include a Divider component in React Spectrum, contrary to some third-party references that suggest it is absent. The Spectrum Divider is intentionally minimal — it renders a semantic separator with size and orientation control, but with no support for text labels or decorative styling. Adobe's philosophy here aligns with Spectrum's broader design language: components should serve clear functional purposes without accumulating decorative variants that belong in CSS/theming. The Divider in Spectrum is documented primarily in the context of Dialog and Panel layouts, where it separates header/body/footer regions, and in Flex/Grid layouts where spatial separation between content areas needs to be made explicit. The minimal surface area of the component reflects Adobe's view that a divider is a structural signal, not a visual design element, and that visual styling should come from the token system rather than from component props.

## Key Decisions
1. **Three size variants (small, medium, large) for thickness control** (HIGH) — Unlike M3's fixed 1dp thickness, Spectrum's Divider offers `size` prop values of "S", "M", and "L" corresponding to 1px, 2px, and 4px thickness respectively. This exists because Adobe's products span a wide range of content densities: a thin 1px divider is appropriate for separating toolbar regions in dense analytics UIs, while a thicker 4px divider can serve as a visual section break in marketing or content-rich application layouts. The size abstraction uses semantic tokens under the hood, so the visual weights are coordinated with Spectrum's spacing scale.
2. **Orientation support (horizontal and vertical)** (MEDIUM) — Spectrum's Divider explicitly supports both `orientation="horizontal"` (default) and `orientation="vertical"`, which is significant for Adobe's applications where vertical dividers appear in toolbars (separating button groups) and in panel layouts (separating side-by-side content regions). Many simpler design systems only document horizontal dividers and leave vertical usage to border CSS hacks.
3. **No text label support** (MEDIUM) — Spectrum deliberately omits embedded text labels in dividers. In Adobe's UI language, if a section needs a header, that is the job of a Heading element — not a Divider with embedded text. This enforces a clear component responsibility boundary: Divider = spatial separation, Heading = semantic section labeling. The practical consequence is that "titled separator" patterns (common in Ant Design and some Atlassian patterns) require a different composition approach in Spectrum.
4. **Divider as a layout primitive in Flex/Grid** (LOW) — Spectrum's documentation explicitly positions Divider as a child of Flex or Grid layouts, where it participates in the layout's spacing system. This is architecturally intentional: placing Divider in a Flex container means it receives automatic margin/gap treatment from the layout system, so spacing is controlled by the parent layout rather than by margin props on the Divider itself.

## Notable Props
- `size`: `'S' | 'M' | 'L'` — Thickness scale. Unique among Tier 1 systems in using a T-shirt size abstraction rather than pixel values or boolean "thick" props.
- `orientation`: `'horizontal' | 'vertical'` — Explicit vertical support for toolbar and panel use cases.
- `UNSAFE_style` / `UNSAFE_className`: Spectrum's standard escape hatch for CSS overrides — the presence of these props signals that Adobe accepts teams will sometimes need to override divider styling for exceptional cases, but the UNSAFE_ prefix discourages it.

## A11y Highlights
- **Keyboard**: Non-interactive; no keyboard behavior required.
- **Screen reader**: Renders as `role="separator"` by default, which causes screen readers to announce "separator" when focus moves past it in some reading modes. This semantic signal is valuable in dialog layouts where the separator distinguishes the action buttons from the content body.
- **ARIA**: `role="separator"` with `aria-orientation` matching the component's orientation prop. Spectrum's implementation correctly sets `aria-orientation="vertical"` for vertical dividers, which many implementations omit.

## Strengths & Gaps
- **Best at**: Semantic and layout-integrated use within Flex/Grid contexts and Dialog layouts — the size scale and orientation support make it the most versatile bare Divider among Tier 1 systems for complex application layouts.
- **Missing**: Text label support and purely decorative (aria-hidden) dividers are not documented as first-class use cases — teams must handle aria-hidden manually, and section-labeled dividers require custom composition outside the component.
