---
component: breadcrumb
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — Top App Bar back button substitute
**Approach:** M3 has no Breadcrumb component, reflecting its mobile-first, single-level-navigation design philosophy. Android apps navigate with a system back button; iOS with the navigation bar back button. The Top App Bar's leading navigation icon (typically a back arrow) serves the same "where you came from" function for M3 applications. Breadcrumbs are considered a web/desktop pattern.
**Key Decisions:**
- [HIGH] Absent: back-button navigation model replaces multi-level breadcrumbs in M3's mobile context
- [MED] Top App Bar back pattern: `navigationIcon` slot with back arrow is the M3 idiom for parent-level navigation
- [MED] No multi-level path display: deep navigation paths in M3 apps are handled by navigation drawer + current screen title, not a breadcrumb trail
**Notable API:** No component. `TopAppBar` with `navigationIcon` as the closest substitute.
**A11y:** No breadcrumb a11y guidance in M3. Custom implementations should use `<nav aria-label="Breadcrumb">` with `<ol>` and `aria-current="page"` on the last item.
**Best at:** Nothing for this pattern — Top App Bar back navigation is idiomatic M3 but does not display the full path.
**Missing:** The entire breadcrumb component including path display, truncation, and aria-current semantics.

---

## spectrum
**Component:** Breadcrumbs
**Approach:** Spectrum's Breadcrumbs automatically collapses to a "..." menu when items exceed the container width, with `showRoot` ensuring the first item remains always visible. Items can be individually disabled via `isDisabled`. Two sizes (S and M). `aria-current="page"` is automatically applied to the last item.
**Key Decisions:**
- [HIGH] Auto-collapse to menu: overflow items are collected into a dropdown menu triggered by "...", preventing horizontal overflow without manually managing `maxItems` — Spectrum handles this responsively
- [MED] `showRoot` always visible: the root/home item is always shown even during collapse, maintaining orientation context for users who need to know they can navigate to the top
- [MED] `isDisabled` per item: individual breadcrumb items can be non-navigable (e.g., the current page or a section without its own URL)
**Notable API:** `showRoot: boolean`; `isDisabled` on `Breadcrumbs.Item`; `size: "S" | "M"`; auto-collapse — no `maxItems` prop needed
**A11y:** Wraps in `<nav aria-label="Breadcrumbs">` with `<ol>` list; `aria-current="page"` on the last item automatically. The collapse menu is accessible as a disclosed menu with `aria-expanded`.
**Best at:** Automatic responsive collapse — no manual `maxItems` configuration needed; Spectrum detects overflow and collapses automatically.
**Missing:** Icon support per item; no visual separator customization (separator is fixed forward slash).

---

## carbon
**Component:** Breadcrumb
**Approach:** Carbon's Breadcrumb does not auto-collapse. `noTrailingSlash` removes the separator after the last item. The `isCurrentPage` prop marks an item as the current page without making it a link — rendering it as plain text. `BreadcrumbSkeleton` is the only Tier 1 system with a dedicated breadcrumb loading state.
**Key Decisions:**
- [HIGH] No auto-collapse: Carbon's enterprise applications typically have short breadcrumb paths (2-4 levels); IBM's information architecture guidelines discourage deep hierarchies that would require collapse
- [MED] `isCurrentPage` prop: current page renders as non-interactive text (no link element); `aria-current="page"` is applied automatically
- [MED] `BreadcrumbSkeleton`: dedicated loading state for content pages where the breadcrumb path is loaded asynchronously — unique among Tier 1 systems
**Notable API:** `noTrailingSlash: boolean`; `isCurrentPage` on `BreadcrumbItem`; `BreadcrumbSkeleton` component for loading states
**A11y:** Wraps in `<nav aria-label="breadcrumb">` with `<ol>`; `aria-current="page"` on the current page item. Non-link current page item is accessible as non-interactive text.
**Best at:** `BreadcrumbSkeleton` for async content loading and `isCurrentPage` prop for semantic current-page marking.
**Missing:** Auto-collapse for paths that exceed container width; no `maxItems` prop.

---

## polaris
**Component:** No standalone Breadcrumb — integrated in Page `backAction` only
**Approach:** Polaris has no standalone Breadcrumb component. The `Page` component's `backAction` prop renders a single back link — a one-level "← Previous Page" pattern rather than a multi-level breadcrumb trail. This reflects Shopify Admin's flat navigation model: most merchant workflows are 1-2 levels deep, making multi-level breadcrumbs unnecessary.
**Key Decisions:**
- [HIGH] Single back-link model: Polaris's Page component handles "where you came from" with one back link — Shopify Admin's information architecture is intentionally flat
- [MED] Integrated in Page, not standalone: backAction is part of the page-level navigation affordance, not a composable breadcrumb component
- [MED] `backAction: {content, url, onAction}` object: the back link label and destination are props on the Page, not a separate component
**Notable API:** `Page` with `backAction={{ content: "Products", url: "/products" }}`; no standalone Breadcrumb component
**A11y:** Page's backAction renders as an `<a>` or `<button>` with the `content` string as its accessible label. No breadcrumb list or `aria-current` semantics.
**Best at:** Simplicity for shallow navigation hierarchies — one prop on Page handles the single most common navigation need.
**Missing:** Multi-level breadcrumb trail, separator customization, item truncation, and any ARIA breadcrumb semantics — not appropriate for applications with deep hierarchy.

---

## atlassian
**Component:** Breadcrumbs (from @atlaskit/breadcrumbs)
**Approach:** Atlassian's Breadcrumbs renders a `<nav>` with `<ol>` and supports explicit `maxItems` control with expand-on-click for truncated items. Truncated items are replaced with "..." that expands to show all items when clicked. The `component` prop on `BreadcrumbsItem` enables router integration (React Router's `Link`, Next.js `Link`, etc.). Truncated item text shows a tooltip on hover.
**Key Decisions:**
- [HIGH] `maxItems` explicit control: consumer specifies the maximum visible items; Atlassian chose explicit control over Spectrum's auto-detect for predictable layout
- [MED] Expand-on-click truncation: clicking "..." expands the full breadcrumb in place rather than showing a dropdown — simpler interaction than Spectrum's menu approach
- [MED] `component` prop for router integration: `BreadcrumbsItem` accepts a custom `component` prop so teams pass their router's `Link` component, avoiding `<a href>` hard navigation in SPAs
**Notable API:** `maxItems: number`; `component` prop on `BreadcrumbsItem` for router integration; `itemsBeforeCollapse` / `itemsAfterCollapse` for which items remain visible when truncated
**A11y:** `<nav aria-label="Breadcrumbs">` with `<ol>`; `aria-current="page"` on the last item. Expand trigger has `aria-label="Show path"`.
**Best at:** Router integration via `component` prop and predictable truncation via explicit `maxItems` — best for SPAs with client-side routing.
**Missing:** Automatic responsive truncation (requires manual `maxItems` setting); no `BreadcrumbSkeleton` for async loading.

---

## ant-design
**Component:** Breadcrumb (with dropdown menus per item)
**Approach:** Ant Design's Breadcrumb is unique in supporting dropdown menus on individual items — each breadcrumb item can have a sub-menu of sibling pages at that level. This creates a navigation-rich breadcrumb where users can jump to sibling pages without returning to the parent. The `routes` config-driven API generates breadcrumbs from a route config object. Custom `separator` accepts any React node.
**Key Decisions:**
- [HIGH] Dropdown menus on breadcrumb items: each item can have a `menu` prop with sub-items — users see "Dashboard > Projects ▼ > Current Project" and can click Projects ▼ to access sibling projects. Unique to Ant Design in Tier 1.
- [MED] `routes` config API: accepts a route config array rather than requiring JSX children — better for applications that generate breadcrumbs from a router config
- [MED] Custom separator: `separator` prop accepts any React node — SVG icon, custom text, or styled element; other systems use fixed forward-slash separators
**Notable API:** `items` array with `{href, title, menu: {items}}` for dropdown support; `separator` for custom dividers; icon support within items
**A11y:** Wraps in `<nav>` with `role="navigation"`; `aria-current="page"` on the last item. Dropdown menus follow standard menu ARIA patterns. The `<ol>` structure communicates sequential hierarchy.
**Best at:** Dropdown menus on breadcrumb items for sibling-page navigation — unique capability for applications with wide hierarchies where jumping between siblings is common.
**Missing:** Auto-collapse for long paths; truncation with `maxItems` requires manual implementation via conditional rendering of items.
