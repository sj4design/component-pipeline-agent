---
component: Icon
tier: 3
last_verified: 2026-03-31
---

# Icon — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | @radix-ui/react-icons | 300+ icons as individual React SVG components; 15px design grid (unique size); no Icon wrapper component — each icon is a standalone component with standard SVG props. | high |
| Chakra UI | Icon / createIcon | Generic `Icon` wrapper accepting any SVG children or `as` prop for third-party icons; `createIcon` factory for defining custom icons from path data; `boxSize` for sizing; `color` inherits from Chakra color mode. | high |
| GOV.UK | Icon (via govuk-frontend) | Minimal curated icon set (~30 icons) for government services; SVGs inline in HTML; strict guidance that icons must always accompany text — standalone icons are explicitly discouraged for accessibility. | high |
| Base Web (Uber) | Icon / themed icons | `Icon` base component with `size`, `color`, `title` props; ~150 built-in icons; `overrides` pattern for deep style customization; icons use `title` prop for accessible name (renders `<title>` in SVG). | high |
| Fluent 2 (Microsoft) | @fluentui/react-icons | 5,000+ icons in Filled/Regular/Light styles; individually tree-shakeable; `bundleIcon` utility to combine Filled+Regular into one component that switches on parent state (e.g., filled on selection); 16/20/24/28/32/48px size-specific SVGs. | high |
| Gestalt (Pinterest) | Icon | 100+ Pinterest-curated icons; `icon` prop takes icon name string; `accessibilityLabel` required for informative use (enforced by prop types); fixed size options (12/14/16/24/32px); `color` maps to Gestalt design tokens. | medium |
| Mantine | Icon (via Tabler Icons) | No built-in Icon component — uses Tabler Icons React; `@tabler/icons-react` provides 5,000+ icons with `size`, `stroke`, `color` props; Mantine documents Tabler as the recommended icon library but does not wrap it. | high |
| Orbit (Kiwi.com) | Icon | Travel-domain icons (airports, luggage, seats, boarding pass); `size` (small/medium/large); `color` from Orbit token palette; `ariaLabel` for informative; `ariaHidden` defaults to true for decorative. | medium |
| Evergreen (Segment) | Icon | 300+ icons; `icon` prop takes icon name string; `size` (number, default 16); `color` (string); icons are SVG paths rendered inline; minimal API surface. | medium |
| Nord (Nordhealth) | nord-icon (web component) | Web component `<nord-icon name="...">` from Nord icon library; `size` (s/m/l); `label` for a11y (when set, adds `role="img"` + `aria-label`); healthcare-context icons (clinical, patient, pharmacy). | low |

## Key Decision Patterns

Fluent 2's `bundleIcon` utility is the most architecturally distinctive T3 pattern. It combines a Regular and Filled icon variant into a single component that the parent can toggle — for example, a navigation item renders the Regular icon when unselected and the Filled icon when selected. This eliminates conditional rendering logic at the consuming component level and formalizes the "filled = active" visual convention that many systems implement ad-hoc.

The BYO icon library pattern is dominant in T3. Radix, Chakra, Mantine, and shadcn/ui (T2) all either provide a minimal icon set or explicitly delegate to a third-party library (Lucide, Tabler Icons). This reflects a philosophical position that icon sets are a design decision, not a system infrastructure concern. The trade-off is that teams using these systems must make and maintain their own icon library choice.

GOV.UK's strict "icons must accompany text" rule is the most conservative accessibility position in any tier. Standalone icons are explicitly discouraged because government services must be accessible to the widest possible audience, including users unfamiliar with common iconography conventions. This is a policy-driven constraint rather than a technical one.

Fluent 2 has the largest icon library (5,000+) with the most size variants (16/20/24/28/32/48px), each size-optimized. This dwarfs most T3 systems and matches only M3's Material Symbols in breadth. The size-specific optimization at six breakpoints is the most granular of any system across all tiers.

Base Web's `overrides` pattern allows deep customization of icon SVG internals (path, SVG container, title element), which is consistent with Base Web's override-everything philosophy but unique among icon components.

## A11y Consensus

- All T3 systems agree on the decorative/informative binary: decorative icons get `aria-hidden="true"`, informative icons get an accessible label.
- Gestalt enforces `accessibilityLabel` as a required prop when the icon is informative — the component will not render without it, similar to Paste's T2 approach.
- GOV.UK goes furthest: standalone icons without adjacent visible text are a documented anti-pattern, not just an a11y concern.
- Base Web uses `<title>` inside SVG for accessible name (rendered when `title` prop is provided); this is the SVG-native approach vs. `aria-label` on the wrapper.
- Nord (web component) uses `label` attribute — when present, adds `role="img"` + `aria-label`; when absent, the icon is treated as decorative.
- Fluent 2 documents that bundled icon components are decorative by default; the consuming component (Button, MenuItem) is responsible for providing the accessible name, not the icon itself.
- Icon-only buttons: all systems agree the accessible label belongs on the button, not the icon. The icon should be `aria-hidden="true"` inside a labeled button.

## Recommended Use

Reference Fluent 2 for the most comprehensive icon system: 5,000+ icons, 6 size breakpoints, Filled/Regular/Light styles, and `bundleIcon` for state-driven icon switching. Reference Chakra UI's `createIcon` factory for systems that need a lightweight way to register custom icons from SVG path data. Reference GOV.UK for the most conservative icon accessibility policy (always accompany with text). Reference Gestalt for prop-enforced accessibility labeling on informative icons. Reference Mantine + Tabler Icons for the cleanest BYO icon library integration pattern.
