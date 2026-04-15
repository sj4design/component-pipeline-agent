---
component: Spinner
tier: 3
last_verified: 2026-03-29
---

# Spinner — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Spinner (Themes) | `loading` wrapper pattern: hides children and shows spinner; SVG animation; `em`-based sizing adapts to context; Themes-only (no primitives-level spinner). | high |
| Chakra UI | Spinner | CSS border animation; `emptyColor` for track color; `thickness` control; `speed` for rotation duration; default `label` prop of "Loading..." pre-configures accessible name. | high |
| GOV.UK | Not available — server-rendered model | No spinner component; page-based navigation replaces JavaScript async loading; processing states use "We're processing your request" full-page patterns. | high |
| Base Web | Spinner | SVG animation following Overrides pattern; `$size` for sizing; `$color` for theme integration; no built-in accessible label by default — consumer must add. | medium |
| Fluent 2 | Spinner | Most configurable T3 spinner: `labelPosition` ("above", "below", "before", "after"); `appearance` (primary/inverted for dark backgrounds); seven `size` options from tiny to huge; built-in `label` prop. | high |
| Gestalt | Spinner | Required `accessibilityLabel` prevents unlabeled spinners; `show` prop for controlled visibility animation; used for Pinterest's infinite-scroll feed loading. | medium |
| Mantine | Loader | Three built-in visual types: `"oval"` (ring), `"bars"` (animated bars), `"dots"` (pulsing dots); custom loaders registerable via MantineProvider; no built-in accessible label — consumer responsible. | high |
| Orbit | Loading | `type` prop for context variants (page, inline, button); `text` prop for accessible loading message; used for flight search, payment processing, booking confirmation. | medium |
| Evergreen | Spinner | `delay` prop prevents spinner flash for fast operations; simple minimal API; no built-in accessible label. | medium |
| Nord | Spinner (nord-spinner) | Web component for healthcare loading states; `aria-label` required for clinical context; portable across frameworks; unambiguous alternative to skeleton loaders for clinical data. | low |

## Key Decision Patterns

The most practically significant divergence in T3 spinners is whether a built-in accessible label is provided by default. Chakra's `label` prop defaults to "Loading...", Fluent 2's `label` prop is a first-class feature supporting four positions, and Gestalt requires `accessibilityLabel` as a prop with no default. By contrast, Base Web, Mantine, and Evergreen provide no built-in accessible label — consumers must add `aria-label` or an associated live region manually. The difference matters because spinners without accessible names are one of the most common accessibility failures in production applications: a spinning SVG circle with no label tells a screen reader user nothing. Chakra's default label and Gestalt's required prop both prevent this failure; the others leave it as a consumer responsibility that is routinely missed.

Mantine's three loader types (oval, bars, dots) is the most feature-differentiated visual design in the T3 set. The distinction is not cosmetic — different spinner styles communicate different loading semantics in practice. The bars style is commonly used in minimal design systems where the ring spinner feels too aggressive; the dots style works well for inline loading (e.g., a text element loading its content) where the oval ring would be oversized or incongruous. Mantine's MantineProvider registration system — which allows custom SVG loaders to be defined globally and referenced by name anywhere in the application — is unique in the T3 set. This means a team that adopts a custom loader style can ensure it's used consistently across all components (Button, Select, overlays) without modifying each use site.

Fluent 2's `labelPosition` prop ("above", "below", "before", "after") reflects the breadth of Microsoft's product surface. Office apps typically show labels below the spinner ("Loading your document..."); Teams shows labels beside the spinner for inline content loading. Most T3 spinners assume label-below as the only layout. By making position configurable, Fluent 2 avoids product teams using CSS overrides to reposition labels that don't fit their context, and the four-position system covers every practical layout pattern without escape hatches.

Evergreen's `delay` prop is the only T3 system that addresses the spinner flash problem: when an async operation completes in under 200ms, showing and immediately hiding a spinner creates a visual flash that is disorienting. The delay prop suppresses the spinner for a specified duration — typically 200-300ms — so that fast operations show nothing at all rather than a flash. This is a common UX best practice (often called "delayed spinner" or "anti-flash" pattern) that the others require custom implementation for.

## A11y Consensus

- Spinners must have an accessible name via `aria-label`, `aria-labelledby`, or a visually hidden label text — a spinning SVG with no accessible name is announced as nothing by screen readers. Chakra, Fluent 2, and Gestalt all enforce this; Base Web, Mantine, and Evergreen leave it to the consumer.
- `role="progressbar"` is the correct role for an indeterminate spinner — when `aria-valuenow` is omitted (no percentage known), the spinner communicates indeterminate loading; this is the same pattern as the progress component in indeterminate state.
- The loading message should describe what is loading, not just "Loading" — "Loading search results," "Processing payment," or "Saving changes" gives screen reader users meaningful context. Generic "Loading..." is acceptable as a default but should be overridden in context.
- For spinners that replace content (like Radix's `loading` wrapper), the replaced content should be marked `aria-hidden="true"` during loading — screen readers should not announce content that is not visible.
- `aria-live="polite"` on the container region (not on the spinner itself) is the recommended pattern for announcing loading completion — when the spinner disappears and content appears, the live region announces the new content to screen reader users.

## Recommended Use

Reference T3 spinner approaches when deciding on accessible labels, label positioning, visual variants, and spinner flash prevention. Chakra is the reference for default accessible label ("Loading...") preventing unlabeled spinners; Fluent 2 is the reference for `labelPosition` flexibility and inverted appearance for dark backgrounds; Mantine's Loader is the reference for multiple visual types (oval/bars/dots) and the global loader registry via MantineProvider; Evergreen is the reference for the `delay` prop preventing spinner flash on fast operations; Gestalt is the reference for required `accessibilityLabel` enforcement.
