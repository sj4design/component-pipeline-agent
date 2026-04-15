---
component: rating
compiled: 2026-03-31
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Rating — All Systems Digest

## Material Design 3
**Approach**: No dedicated Rating component. Material Design does not provide a star-rating primitive — rating UI is built by composing IconButton/ToggleButton rows with star icons. Material guidelines reference star ratings in product reviews context but provide no component specification, API, or accessibility pattern. Teams implement custom solutions using filled/outlined star icons in a row.
**Key decisions**:
- No standardized component; rating is considered an application-level pattern rather than a foundational primitive — the interaction model (tap to select 1-5) is simple enough that a row of icon buttons suffices without dedicated abstraction
- No half-star or fractional guidance; Material treats precision display as app-specific rather than system-level
**Notable API**: N/A — no component exists. Teams use `Icon` (star, star_half, star_outline) + `IconButton` for interactive rating.
**A11y**: No prescribed pattern. Custom implementations should use radio group pattern for input or aria-label with current/max for display.
**Best at**: Icon library includes star, star_half, star_outline, star_rate for building custom implementations. **Missing**: Entire component — no API, no interaction spec, no a11y guidance.

## Spectrum (Adobe)
**Approach**: No dedicated Rating component. Adobe Spectrum does not include a star-rating or score-input component. Adobe products that need ratings (e.g., stock asset ratings in Adobe Stock) implement custom solutions outside the design system. Spectrum's focus on creative-tool and document-editing interfaces means rating input is not a common enough pattern to warrant standardization.
**Key decisions**:
- Not included in system scope; Spectrum prioritizes creative workflow components (ColorPicker, ColorArea, ColorSlider) over e-commerce/review patterns
- No guidance on building custom rating; teams are left to determine their own interaction and a11y model
**Notable API**: N/A — no component exists.
**A11y**: No prescribed pattern.
**Best at**: N/A. **Missing**: Entire component — no rating primitive or guidance.

## Carbon (IBM)
**Approach**: No dedicated Rating component. IBM Carbon does not provide a star-rating or score-display component. Enterprise software contexts (Jira-like project tools, cloud dashboards) rarely use star ratings — satisfaction surveys and NPS in IBM products are handled through custom form patterns outside the design system.
**Key decisions**:
- Not included; enterprise dashboard and data-management interfaces do not commonly require star-rating input — numeric scales and survey components are built per-product
- Carbon's pattern guidance does not reference rating as a recommended pattern
**Notable API**: N/A — no component exists.
**A11y**: No prescribed pattern.
**Best at**: N/A. **Missing**: Entire component — no rating primitive or guidance.

## Polaris (Shopify)
**Approach**: No dedicated Rating component in the public Polaris component library. Shopify product pages display star ratings extensively (product reviews, app reviews), but the rating display and input components are implemented at the application level rather than in the shared design system. Polaris provides the building blocks (Icon, inline layout) but not a composed Rating component.
**Key decisions**:
- Application-level pattern; Shopify's specific rating display (4.5 stars + review count + distribution bars) is too product-specific to generalize as a reusable DS component
- Star ratings on Shopify storefronts are theme-level, not admin-level — Polaris serves the admin, where star-rating input is rare
**Notable API**: N/A — no component exists. `Icon` component with `StarFilledIcon`/`StarIcon` available for custom builds.
**A11y**: No prescribed pattern. Shopify storefront ratings use aria-label like "4.5 out of 5 stars" in practice.
**Best at**: N/A. **Missing**: Entire component — despite star ratings being core to the Shopify merchant experience, no shared component exists.

## Atlassian
**Approach**: No dedicated Rating component. Atlassian Design System does not include a rating or star-score component. Atlassian products (Jira, Confluence, Bitbucket) do not use star ratings in their core workflows — feedback collection uses emoji reactions (Confluence) or custom satisfaction surveys rather than numeric star scales.
**Key decisions**:
- Not applicable to product surface; Atlassian's collaboration tools use reactions and voting (Jira story points, Confluence likes) rather than star-based rating scales
- No guidance provided for custom rating implementations
**Notable API**: N/A — no component exists.
**A11y**: No prescribed pattern.
**Best at**: N/A. **Missing**: Entire component — not applicable to Atlassian's product domain.

## Ant Design
**Approach**: Full-featured `Rate` component — the most complete Tier 1 rating implementation. Supports interactive input and read-only display. Half-star precision via `allowHalf`. Custom icon per star via `character` prop (accepts ReactNode or function receiving index). `count` for total stars (default 5). Hover preview with `tooltips` array for per-star labels. `allowClear` to deselect (click same star to reset to 0).
**Key decisions**:
- `character` as function of index; enables mixed-icon ratings (e.g., emoji faces from sad to happy) and progressive icon changes — not just uniform stars but contextual icons per position
- `allowHalf` for half-star granularity; most review systems need 0.5 precision for display (4.5 stars) and some for input — Ant makes this a simple boolean toggle rather than a generic `precision` number
- `allowClear` defaults to true; clicking an already-selected star resets to 0, enabling "no rating" state — critical for optional rating fields where users may want to retract their selection
- `tooltips` array for per-star hover labels; "Terrible", "Bad", "Normal", "Good", "Wonderful" — maps each position to a human-readable label for both visual tooltip and potential SR announcement
**Notable API**: `allowClear` (boolean, default true); `allowHalf` (boolean); `character` (ReactNode | (index) => ReactNode); `count` (number, default 5); `tooltips` (string[]); `disabled` (read-only); `defaultValue`/`value`/`onChange`; `onHoverChange`; `style`/`className`
**A11y**: Uses radio group pattern internally — each star is a radio input within a fieldset. Tab to focus the group, Arrow keys to navigate between stars. `tooltips` array provides accessible labels per star position. `aria-label` supported for the overall component. Read-only mode uses `aria-disabled`.
**Best at**: Most complete rating implementation in any Tier 1 system — custom icons per position, half-star precision, per-star tooltips, clear-to-reset, and proper radio group a11y. **Missing**: No fractional precision beyond half (e.g., 0.1 increments for display); no built-in count/review-number display alongside stars.
