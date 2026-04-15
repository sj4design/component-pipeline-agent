---
system: Ant Design
component: Empty
url: https://ant.design/components/empty/
last_verified: 2026-03-28
---

# Empty State

## Approach

Ant Design names its empty state component "Empty" — a concise name that reflects the component's broad purpose: representing any state of data absence. Unlike Polaris (which scopes EmptyState to full-page first-use moments) or Spectrum (which centers identity on the illustration), Ant Design's Empty is designed as a flexible inline component that can appear anywhere data is expected but absent: inside tables, inside lists, inside search results, inside cards, or as a full-page condition. This breadth is deliberate — Ant Design's enterprise audience builds data-dense management interfaces where empty conditions appear frequently and in varied contexts.

The component's architecture follows Ant Design's broader philosophy of composition and customization. The `image` slot accepts a URL string, a boolean (to show/hide the default image), or a ReactNode (for fully custom visuals including icons, custom SVGs, or animated illustrations). The `description` slot accepts string or ReactNode. The `children` slot renders below description and is intended for action buttons or any other CTA content. This three-slot model (image, description, children) provides explicit structure without mandating specific content at any level — any slot can be omitted or replaced. Ant Design's research documentation for the Empty component emphasizes that empty state messaging should communicate the reason for absence and guide the user toward resolution, distinguishing between "nothing here yet," "search returned nothing," and "something went wrong."

## Key Decisions

1. **Highly configurable image slot** (HIGH) — The image prop accepting `boolean | string | ReactNode` is the most flexible image configuration in any Tier 1 empty state component. Setting `image={false}` removes the visual entirely for text-only contexts. Passing a URL string uses a custom image. Passing a ReactNode (e.g., an Ant Design Icon component) enables icon-based empty states for compact contexts. The `Empty.PRESENTED_IMAGE_SIMPLE` and `Empty.PRESENTED_IMAGE_DEFAULT` constants provide two built-in image presets — a simple outline style and a more detailed style — letting teams choose visual complexity.

2. **Children slot for actions** (HIGH) — Unlike Polaris (which has dedicated `action` and `secondaryAction` props with prescribed button rendering) or Spectrum (which has no action slot), Ant Design's `children` accepts any ReactNode for CTA content. This means actions can be Ant Design Buttons, links, Space-separated button groups, or custom components. The flexibility is consistent with Ant Design's composition model but puts responsibility on the team to maintain visual consistency across empty states.

3. **`imageStyle` and `styles` for visual control** (MEDIUM) — The `imageStyle` prop allows CSS-level control over the illustration container (height, margin, custom dimensions), while the newer `styles` object provides semantic slot styling. This level of customization acknowledges that enterprise dashboards frequently have space-constrained contexts where the default illustration size is inappropriate — a 64px icon version of the empty state looks different from a 160px illustration version.

4. **`ConfigProvider` for global defaults** (MEDIUM) — `ConfigProvider` allows setting a global `renderEmpty` function that overrides the default empty state rendering for data components (Table, List, TreeSelect, etc.). This is a systemic solution: rather than manually adding an `Empty` component to every data-displaying component, teams can register a single global empty state template. This is unique to Ant Design and reflects their focus on application-scale configuration.

5. **Integration with data components** (HIGH) — Unlike standalone empty state components in other systems, Ant Design's Empty is used internally by Table, List, TreeSelect, Select, and other data components as the default empty state. This built-in integration means the empty state experience in Ant Design applications is automatically consistent across all data components without teams needing to manually add empty state handling.

## Notable Props

- `image`: `boolean | string | ReactNode` — the most flexible image configuration in any Tier 1 system.
- `description`: `string | ReactNode` — accepts JSX for styled or multi-element descriptions.
- `children`: `ReactNode` — the action slot; accepts any content including buttons, links, or custom components.
- `imageStyle`: `CSSProperties` — direct CSS control over the image container for size customization.
- `Empty.PRESENTED_IMAGE_SIMPLE` / `Empty.PRESENTED_IMAGE_DEFAULT`: Static references to the two built-in presets, usable as the `image` prop value.

## A11y Highlights

- **Keyboard**: No interactive elements in the base component. Action buttons passed via `children` follow standard Ant Design Button keyboard behavior.
- **Screen reader**: The default illustrations are decorative and should have `aria-hidden="true"`. When passing custom image content via the ReactNode path, teams must ensure appropriate alt text or aria-hidden depending on whether the image conveys meaningful information.
- **ARIA**: The `description` text is the primary accessible communication. Ant Design does not enforce a heading structure within the component — teams must decide whether to include a heading element in their description for screen reader navigation. The component does not render a heading by default.

## Strengths & Gaps

- **Best at**: Built-in integration with data components via `ConfigProvider.renderEmpty` — the only Tier 1 system that provides a systematic way to configure empty states globally across all data-displaying components, which eliminates per-component empty state management in large applications.
- **Missing**: No enforced heading structure means screen reader users navigating by headings may not find the empty state's title without explicit heading markup from the team. No variant system for distinguishing empty-by-design (blank slate), empty-by-search, and error conditions — all three look the same without custom configuration.
