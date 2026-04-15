---
component: accordion
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** No native M3 spec — MUI Accordion (community/MUI layer)
**Approach:** M3 has no accordion in its component spec. MUI's Accordion is built on a Paper surface and uses a CSS transition for expand/collapse. No group-level state management is provided — each Accordion manages its own expanded state independently or via controlled `expanded` prop.
**Key Decisions:**
- [HIGH] No M3 spec: M3 removed Expansion Panels; MUI Accordion is a carry-forward from Material UI v1, not an M3-designed component
- [MED] Composition: `Accordion` + `AccordionSummary` + `AccordionDetails` are three separate components wired together — no monolithic API
- [MED] No group management: allowing multiple expanded at once or enforcing single-open requires manual state wiring at the parent level
**Notable API:** `expanded` / `onChange` for controlled state; `disableGutters` removes default padding from AccordionSummary
**A11y:** AccordionSummary renders as a `<button>` inside a heading element; `aria-expanded` on the button; `aria-controls` linking to the content panel.
**Best at:** Basic expand/collapse composition using M3 surface tokens — works in any M3-themed application without additional theming effort.
**Missing:** Group-level single-open enforcement and animation customization beyond CSS transitions.

---

## spectrum
**Component:** Disclosure / DisclosureGroup / Accordion (3-layer architecture)
**Approach:** Spectrum offers three components at different abstraction levels: `Disclosure` (single toggle), `DisclosureGroup` (multi-disclosure with group-level allow-multiple control), and `Accordion` (a styled DisclosureGroup with specific heading and panel styles). The `hidden="until-found"` HTML attribute is supported for browser Ctrl+F search discoverability.
**Key Decisions:**
- [HIGH] Three-component hierarchy: Disclosure/DisclosureGroup/Accordion enables exact-level composition — use Disclosure standalone or assemble into a group
- [HIGH] `hidden="until-found"`: collapsed panel content is discoverable by browser Find — critical for FAQ and documentation use cases where users search for content
- [MED] `allowsMultipleExpanded` opt-in: single-expand is the default (closes others on open); multiple-expand requires explicit prop
**Notable API:** `allowsMultipleExpanded` on DisclosureGroup; `defaultExpandedKeys` / `expandedKeys` for controlled state; configurable heading level via `headingLevel`
**A11y:** Disclosure trigger is a `<button>` inside a heading with configurable level; `aria-expanded` on the button; `aria-controls` on the content region. `headingLevel` ensures correct document outline.
**Best at:** `hidden="until-found"` for Ctrl+F discoverability and configurable heading levels for correct document structure — most a11y-complete accordion in Tier 1.
**Missing:** No animation built-in (deliberate — left to CSS); `hidden="until-found"` has limited browser support (Chrome/Edge only as of 2026).

---

## carbon
**Component:** Accordion
**Approach:** Carbon's Accordion uses `<ul>` / `<li>` semantics — accordion items are a list, not independent components. Flush and default alignment variants control whether the content aligns with the chevron or the panel edge. Three sizes (sm, md, lg) control the header height. The chevron is on the right rather than left — a documented decision with a noted a11y caveat.
**Key Decisions:**
- [HIGH] `<ul>` / `<li>` semantics: accordion items form an ordered list, communicating grouped related content to screen readers
- [HIGH] Right-side chevron: consistent with IBM's dense information layout; documented caveat that right chevron can be missed by users scanning left-to-right
- [MED] `align` prop: `"start"` (flush with leading edge) vs. `"end"` (content aligned past chevron) — affects visual alignment in dense layouts
**Notable API:** `size: "sm" | "md" | "lg"`; `align: "start" | "end"`; `flush` boolean on individual `AccordionItem` for no-padding content
**A11y:** `<button>` trigger inside `<li>`; `aria-expanded` on button; `aria-controls` on content. Screen readers announce list structure and item count.
**Best at:** Dense enterprise form layouts — flush alignment and three sizes cover IBM's range from compact data forms to spacious settings panels.
**Missing:** `hidden="until-found"` support; no built-in group state management for single-open enforcement (requires manual controlled pattern).

---

## polaris
**Component:** Collapsible (utility only — no Accordion component)
**Approach:** Polaris provides `Collapsible` as a low-level utility for controlled show/hide with CSS height animation. There is no Accordion component with header, chevron, or group management. Teams compose accordions from `Collapsible` + `Button` or custom heading elements, managing open/closed state externally. `expandOnPrint` ensures content is visible when printing.
**Key Decisions:**
- [HIGH] No Accordion component: Polaris's merchant-first philosophy argues that accordion affordances are context-specific — the trigger, heading level, and grouping vary enough to warrant custom composition
- [MED] Controlled-only: `open` prop required; Collapsible has no internal state management, avoiding the "who owns open state" confusion
- [MED] `expandOnPrint` prop: collapsed content expands in print media — important for order summaries and receipts where merchants print pages
**Notable API:** `open: boolean` (required); `expandOnPrint: boolean`; `transition` object for duration/timing function override
**A11y:** Collapsible itself has no ARIA — the consuming component must add `aria-expanded` to the trigger and `aria-controls` / `id` linking to the content. No built-in accessibility wiring.
**Best at:** Print-aware content hiding with CSS animation — `expandOnPrint` and animation customization are practical features for merchant-facing UIs.
**Missing:** All accordion-specific behavior: heading semantics, chevron affordance, group management, and a11y wiring are entirely the consumer's responsibility.

---

## atlassian
**Component:** Accordion (limited — no dedicated component in current ADS)
**Approach:** Atlassian's current design system does not have a formal Accordion component. Atlassian uses collapsible sections extensively across Jira and Confluence but implements them through product-level code rather than a shared component. The team validated accordion behavior across 6 products during a navigation redesign and concluded that each context had sufficiently different requirements. Accessibility is a non-negotiable baseline across all Atlassian products.
**Key Decisions:**
- [HIGH] No dedicated component: validated across 6 products; each context's heading level, grouping, and styling needs differ too much for a single component
- [MED] Jira uses accordion within issue detail panels via composed primitives — `<button>` + CSS transition + ARIA wiring applied per product
- [MED] A11y non-negotiable: Atlassian's a11y team mandates `aria-expanded`, `aria-controls`, and correct heading levels in all accordion implementations regardless of component origin
**Notable API:** No formal component. Teams use Atlassian's `@atlaskit/primitives` Box/Stack + custom button with aria attributes.
**A11y:** Atlassian's pattern guidance specifies: trigger must be `<button>` inside a heading, `aria-expanded` on trigger, `aria-controls` linking to content, focus returns to trigger on close.
**Best at:** Enforcing accessible implementation standards via guidelines, even without a formal component.
**Missing:** A formal reusable Accordion component — acknowledged gap leading to inconsistent implementations across Jira, Confluence, and Trello.

---

## ant-design
**Component:** Collapse
**Approach:** Ant Design's Collapse (their name for Accordion) defaults to multiple-open and offers `accordion` prop to opt into single-open behavior. The `items` array API (introduced in v5) replaces the deprecated `Collapse.Panel` child composition. Three visual variants — `bordered`, `borderless`, and `ghost` — plus `collapsible` trigger control (header, icon, or disabled).
**Key Decisions:**
- [HIGH] Multiple-open default with `accordion` opt-in: enterprise UIs often need multiple sections open simultaneously for comparison; single-open is the narrower use case
- [HIGH] `items` API: flat array of `{key, label, children, extra, collapsible}` objects replaces JSX child composition — better for data-driven accordion generation from API responses
- [MED] `ghost` variant: no border, no background — renders collapse within card or table contexts without visual container conflict
**Notable API:** `accordion: boolean` for single-open mode; `collapsible: "header" | "icon" | "disabled"` to control trigger area; `expandIcon` for custom chevron
**A11y:** Each panel trigger is a `<div role="button">` with `aria-expanded` and `aria-controls`; content region has `aria-hidden` when collapsed. Heading semantics for the trigger are not enforced by the component.
**Best at:** Data-driven accordion via `items` API and the `ghost` variant for context-embedded collapsible sections in dense enterprise UIs.
**Missing:** `hidden="until-found"` support; trigger elements use `role="button"` on a div rather than a native `<button>`, which reduces keyboard accessibility robustness.
