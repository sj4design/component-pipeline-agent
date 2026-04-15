---
system: Carbon Design System (IBM)
component: Skeleton States (SkeletonText, SkeletonIcon, SkeletonPlaceholder)
url: https://carbondesignsystem.com/components/skeleton-states/usage/
last_verified: 2026-03-28
---

# Skeleton States

## Approach

Carbon's approach to skeleton loading is compositional: rather than a single Skeleton component, IBM provides three discrete building blocks — `SkeletonText`, `SkeletonIcon`, and `SkeletonPlaceholder` — that developers assemble to represent different content types. This building-block philosophy reflects Carbon's broader design system character: a toolkit for enterprise UIs where teams build complex, highly specific layouts. No single skeleton component could represent the variety of IBM product layouts (data tables, dashboards, configuration panels), so Carbon provides primitives instead.

The system applies skeleton states as simplified, animated versions of the component they represent at initial page load. The animation uses a shimmer (horizontal gradient sweep) that communicates "data is actively loading" — consistent with Carbon's guidance that motion should serve purpose and reduce user uncertainty rather than decorate. Carbon explicitly distinguishes skeleton states from the Loading component (spinner/overlay) and Progress Bar: skeletons are for initial page load of container-based and data-based components, while spinners handle in-context operations and Progress Bar handles determinate progress.

A notable aspect of Carbon's approach is explicit scope restrictions: skeleton states are only appropriate for container-based components (tiles, structured lists) and data-based components (data tables, cards). Action components — buttons, input fields, checkboxes, toggles — do not get skeleton states. This is a deliberate restraint that prevents over-skeletonizing a UI and acknowledges that showing a fake button is more confusing than showing nothing.

## Key Decisions

1. **Three separate building block components** (HIGH) — Carbon separates `SkeletonText` (for lines of text), `SkeletonIcon` (for icon placeholders), and `SkeletonPlaceholder` (for generic rectangular content areas like images and cards). WHY: IBM's enterprise products have wildly different content structures. A unified skeleton block with props would either be too generic (losing shape fidelity) or too complex (requiring extensive configuration). Three focused primitives each excel at one job. Developers compose them into whatever pattern the page requires.

2. **Explicit exclusion of action components** (HIGH) — Carbon explicitly states that buttons, inputs, checkboxes, and toggles should never show skeleton states. WHY: action components represent interface affordances, not data. Showing a fake button suggests an action is available when it may not be; showing no button is more honest. This opinionated rule prevents the "everything has a skeleton" antipattern that creates more confusion than it resolves.

3. **Shimmer animation using CSS transform** (MEDIUM) — Carbon's skeleton animation uses a CSS `transform: translateX()` sweep on a gradient pseudo-element, combined with `will-change: transform` for GPU compositing. WHY: earlier implementations used background-position animation which triggered layout recalculation on every frame. The transform approach runs on the GPU compositor thread, keeping the main thread free and maintaining smooth 60fps animation even when the browser is busy processing data responses.

4. **SkeletonText line count and width randomization** (MEDIUM) — The `SkeletonText` component supports a `lines` prop (default 3 for Angular, configurable) and randomizes line widths slightly (via `minLineWidth`/`maxLineWidth` props) to simulate natural text variation. WHY: perfectly uniform text skeleton lines look obviously artificial and call attention to the loading state rather than the content. Slight width variation creates a more organic, realistic impression that a real paragraph is loading.

5. **Skeleton as a simplified component variant, not a separate DOM tree** (MEDIUM) — Many Carbon components (DataTable, Dropdown, Tabs, Breadcrumb) have built-in skeleton variants that are activated rather than replaced by separate skeleton components. WHY: this keeps the skeleton representation close to the component it represents in the codebase, making it easier for developers to maintain when the component's layout changes.

## Notable Props
- `SkeletonText: lines` — Number of text lines to render; match this to the actual content's line count for accurate representation
- `SkeletonText: heading` — Boolean switching from body text proportions to heading proportions; avoids developers needing to manually set height for headings vs body
- `SkeletonPlaceholder: style` — Width/height are set via inline style or className since placeholder proportions vary per use case; no prescribed sizes
- `SkeletonIcon: (no props)` — Fixed 16×16 render matching Carbon's standard icon grid; opinionated sizing means no configuration needed

## A11y Highlights
- **Keyboard**: Not interactive; no keyboard behavior
- **Screen reader**: Historically a documented gap in Carbon. A tracked GitHub issue (#4310) identified that skeleton components in the React package were not accessible — they lacked `tabindex="0"`, `role="status"`, `aria-live="assertive"`, and `aria-label="loading [component name]"`. The issue was raised in 2019 and partially resolved for some components (TextInput, Select, Checkbox, Slider, TextArea, NumberInput). For many components, the recommended approach is to manage `aria-busy="true"` on the parent container and provide an `aria-live` region that announces loading completion
- **ARIA**: Carbon's loading pattern documentation directs developers to WCAG SC 4.1.3 (Status Messages) and to ensure screen readers receive notification when loading begins, when content populates, and if loading fails. The system itself does not guarantee this automatically — it is developer responsibility for skeleton compositions

## Strengths & Gaps
- **Best at**: Precise, opinionated building blocks that compose into any enterprise layout; the explicit ban on action component skeletons prevents common misuse; GPU-optimized animation
- **Missing**: No unified skeleton wrapper (developers must manually compose every skeleton layout); known historic accessibility gaps for screen readers; no built-in `prefers-reduced-motion` handling documented; no guidance on skeleton duration before showing an error state
