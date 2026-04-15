---
system: IBM Carbon
component: Search
url: https://carbondesignsystem.com/components/search/usage/
last_verified: 2026-03-28
---

# Search

## Approach

Carbon's Search component reflects IBM's enterprise-first mentality: it is a standalone, opinionated component that is clearly *not* a variant of TextInput. The decision to keep Search separate from the general text input family was driven by Carbon's deep integration with data-dense IBM product surfaces — dashboards, data tables, logs, and audit tools where search is a primary navigation mechanism, not a secondary convenience feature. Carbon is one of the few systems that explicitly documents *when not to use* the Search component: it should not be used when the data set is small or simple enough to be visually scannable without search, which communicates the system's view that Search is a high-complexity pattern that adds cognitive load and should only appear when it earns its place. The component ships three size variants (sm, md, lg), an expandable variant that collapses to a search icon until focused, and integrates directly with Carbon's data table via `TableToolbarSearch` — all of which reflect IBM's reality that the same Search component must serve both compact toolbars and full-width page-level discovery patterns.

## Key Decisions

1. **Escape key clears the input** (HIGH) — Carbon standardizes Escape as the keyboard trigger to both clear the search field and (in expandable variant) collapse it back to icon form. This is the clearest and most explicit Escape-to-clear contract among Tier 1 systems. The reasoning is that search fields in enterprise tools are used by power users who operate primarily via keyboard; making Escape the clear shortcut is consistent with how users dismiss dialogs and cancel operations across the OS, reducing cognitive load by reusing existing mental models.

2. **Expandable variant** (HIGH) — The expandable variant shows only a search icon in the toolbar and expands to a full input on focus. IBM designed this for dense data table toolbars where header space is at a premium and not every screen needs search mode active at all times. Showing a full input that might never be used wastes horizontal space and visually competes with action buttons. The expandable pattern is a trade-off: it saves space at the cost of one extra interaction step to start searching, which is acceptable in contexts where search is used less frequently than other toolbar actions.

3. **Three size variants (sm, md, lg)** (MEDIUM) — Carbon offers small, medium, and large heights for Search, mirroring the same sizing scale applied to buttons, dropdowns, and inputs across the system. The motivation is density control in enterprise interfaces: data-dense tables benefit from `sm` inputs that don't push row heights apart; full-page search bars benefit from `lg` to signal importance and accommodate touch targets on hybrid devices. A single fixed-height input cannot serve both contexts without visual inconsistency.

4. **Clear button appears only after typing begins** (MEDIUM) — The X icon is not present on an empty field — it appears only once the user has typed at least one character. This follows the same rationale as M3: an actionable clear button on an empty field is a non-functional interactive element that confuses users and adds tab-stop noise for keyboard navigators. Carbon is consistent with the broader ecosystem on this point.

5. **role="search" applied to wrapper div** (MEDIUM) — Carbon wraps the input in a `<div role="search">` landmark, with `aria-label` provided by the `labelText` prop. This creates an explicit search region that screen reader users can navigate to directly using landmark navigation (typically the `F` key in JAWS/NVDA), which is critical in enterprise pages that may have dozens of interactive regions.

## Notable Props

- `size`: `"sm" | "md" | "lg"` — Directly controls component height to fit different density contexts; represents a design system-level decision about density management.
- `expandable`: Boolean — Collapses Search to icon form until focused; the existence of this prop acknowledges toolbar real-estate pressure as a first-class design problem.
- `labelText`: Required — Provides both the visible (or visually hidden) label and the `aria-label` for the search landmark wrapper. Interestingly, in `TableToolbarSearch`, this was historically misconfigured to use the `placeholder` value as the `aria-label` instead — a documented accessibility bug that reveals the risk of conflating label and placeholder.
- `closeButton`: Renders the clear/close button explicitly in expandable mode; separating the clear and collapse actions reveals the two-state nature of expandable search.
- `light` (deprecated): Was used for light background contexts — its deprecation in Carbon v11 in favor of the token-based theming system shows how older prop-driven theming patterns were replaced by systematic design tokens.

## A11y Highlights

- **Keyboard**: Escape clears the input; if expandable, Escape also collapses the field back to icon form. Tab moves focus in/out of the field; Enter submits. This is the most explicitly documented Escape-key behavior of all Tier 1 systems.
- **Screen reader**: The search component provides the basic input mechanism; Carbon's documentation explicitly notes that *design annotations are required for search results* — the component itself does not manage a live region for results. VoiceOver on macOS reads both label and placeholder if they differ, which is a documented gotcha Carbon calls out for implementers.
- **ARIA**: `role="search"` on the outer wrapper div with `aria-label` from `labelText`. The input itself uses standard `<input type="text">` (not `type="search"`) in some implementations, relying on the wrapper landmark for search semantics rather than the native input type.

## Strengths & Gaps

- **Best at**: Keyboard interaction standards and enterprise-scale density control — the explicit Escape-to-clear contract, three size variants, and expandable pattern make Carbon the most operationally complete search input for complex data-dense products.
- **Missing**: No built-in scope/category selector, no loading or async state indicator, and no integrated results management — the component intentionally covers only the input layer and delegates all post-submission UX to the consuming application.
