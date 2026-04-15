---
system: Adobe Spectrum / React Aria
component: Disclosure, DisclosureGroup, Accordion
url: https://react-spectrum.adobe.com/react-spectrum/Accordion.html
last_verified: 2026-03-28
---

# Disclosure / Accordion (Spectrum)

## Approach
Spectrum takes a deliberately layered architecture: Disclosure is the atomic unit (a single expandable section), DisclosureGroup is the headless behavior wrapper (manages which items are open), and Accordion is the styled Spectrum-specific composition of the two. This three-tier separation exists because Adobe discovered that their products (Lightroom, Analytics, Experience Platform) need disclosure behavior at wildly different levels of abstraction. Some contexts need a single collapsible section with no group logic. Others need accordion groups with custom styling that doesn't match Spectrum's visual language. By splitting the primitive (React Aria's Disclosure/DisclosureGroup) from the themed component (React Spectrum's Accordion), Adobe lets teams use the accessibility and state management without being locked into Spectrum's visual design. The React Aria layer also supports `hidden="until-found"`, enabling browser-native Ctrl+F search inside collapsed panels in Chromium browsers -- a genuinely novel feature that no other major design system has implemented.

## Key Decisions
1. **Three-layer architecture: Disclosure / DisclosureGroup / Accordion** (HIGH) -- The single-item Disclosure is independent from the multi-item DisclosureGroup, and the styled Accordion wraps DisclosureGroup with Spectrum tokens. WHY: Adobe's product suite spans creative tools, analytics dashboards, and content management. A single collapsible section in a Lightroom sidebar has nothing in common visually with an accordion in Adobe Analytics. Separating behavior from presentation means both use cases share the same a11y logic without sharing styles.

2. **`allowsMultipleExpanded` as explicit opt-in** (HIGH) -- DisclosureGroup defaults to single-expand and requires an explicit prop to allow multiple panels open simultaneously. WHY: Spectrum's research indicated that most accordion use cases benefit from single-expand to prevent content overload. Making multi-expand opt-in signals that it should be a deliberate choice, not an accidental default.

3. **`hidden="until-found"` support** (MEDIUM) -- Collapsed panels use the browser's `hidden="until-found"` attribute instead of removing content from the DOM. WHY: When users press Ctrl+F to search a page, content inside collapsed accordion panels becomes findable, and the browser auto-expands the matching panel. This solves a long-standing UX problem where users cannot find content they know exists because it is hidden inside a collapsed section.

4. **DisclosureTitle with configurable heading `level`** (MEDIUM) -- The title component accepts a `level` prop (1-6) to set the semantic heading level. WHY: Accordion headers must participate in the page's heading hierarchy for screen reader navigation. If the accordion is inside an `<h2>` section, its titles should be `<h3>`. Hardcoding a level would break document outline in many contexts.

## Notable Props
- `expandedKeys` / `defaultExpandedKeys`: Controlled and uncontrolled expansion using key-based identity. More scalable than index-based approaches because keys survive reordering.
- `isQuiet`: A visual variant that reduces visual weight by removing borders and backgrounds. Reflects Spectrum's consistent quiet/non-quiet pattern across all components.
- `role` on DisclosurePanel: Can be set to `"region"` or `"group"`, giving developers control over ARIA landmark behavior based on the panel's importance.

## A11y Highlights
- **Keyboard**: Enter/Space toggles the focused disclosure. Tab navigates between disclosure titles in document order.
- **Screen reader**: Titles render inside semantic heading elements at the specified level. Panels announce their expanded/collapsed state via `aria-expanded` on the trigger button.
- **ARIA**: `aria-controls` links trigger to panel. Panel role is configurable (`group` or `region`). Full `aria-label`, `aria-labelledby`, `aria-describedby` support on all sub-components.

## Strengths & Gaps
- **Best at**: Architectural separation of behavior and presentation -- the React Aria primitives are genuinely reusable across any visual system, and `hidden="until-found"` is a unique innovation for content discoverability.
- **Missing**: Animation/transition configuration is not exposed as a first-class prop. The styled Accordion component is relatively opinionated compared to the flexible primitives underneath, offering fewer visual variants than systems like Ant Design.
