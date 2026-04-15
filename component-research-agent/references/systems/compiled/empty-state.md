---
component: empty-state
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — pattern guidance only
**Approach:** M3 has no Empty State component. The pattern is described in M3's documentation as a combination of a centered illustration (optional), a primary heading, supporting text, and an action button — but no component is provided. Teams use M3's Typography, Button, and layout tokens to assemble empty states. `primaryContainer` / `onPrimaryContainer` are the recommended illustration background colors.
**Key Decisions:**
- [HIGH] Pattern only, no component: M3 treats empty states as content layouts, not interactive components requiring a shared implementation
- [MED] Illustration as optional: M3 recommends illustrations for first-time empty states but not for filtered-to-empty or error-to-empty states, where context-appropriate text is sufficient
- [MED] No action slot standardization: teams implement action buttons independently with no defined slot or positioning convention
**Notable API:** No component. Composed from `Typography` + `Button` + layout tokens.
**A11y:** No prescribed ARIA. Custom implementations should ensure headings use correct semantic heading levels and that action buttons have descriptive labels.
**Best at:** Nothing specific — M3's pattern guidance is conceptual, not prescriptive about layout.
**Missing:** Entire empty state component including illustration slot, action slot, heading, and body text — teams rebuild from scratch each time.

---

## spectrum
**Component:** IllustratedMessage
**Approach:** Spectrum's IllustratedMessage requires a vector SVG illustration as a mandatory slot. The component handles illustration sizing and the heading + content text layout. There is no action button slot — actions must be added by the consumer outside the IllustratedMessage. Spectrum provides a library of pre-built empty state SVGs for common cases (no results, no access, upload).
**Key Decisions:**
- [HIGH] SVG required slot: illustration is mandatory — Spectrum's view is that a text-only empty state lacks the visual hierarchy and emotional quality needed for effective empty state communication
- [MED] No action slot: illustratedMessage is content-only; actions (buttons, links) are placed by the consumer adjacent to or below the component — strict separation of content from actions
- [MED] Accessibility-first SVG handling: empty state illustrations are decorative and must be `aria-hidden`; the text content carries all semantic meaning
**Notable API:** `heading` (required string); `description` (optional); SVG child (required); no built-in action slot
**A11y:** SVG illustrations must be `aria-hidden="true"`; heading uses `<h2>` by default with configurable level; no ARIA landmark for the empty state region by default.
**Best at:** Consistent illustration-first empty states with Adobe's pre-built SVG library — zero illustration production effort for common empty state scenarios.
**Missing:** Action button slot; optional illustration mode for quick text-only empty states; no loading skeleton for empty state transitions.

---

## carbon
**Component:** Pattern, not component (illustrations are decorative)
**Approach:** Carbon treats empty states as a documented pattern rather than a component. The pattern documentation specifies that illustrations should be decorative (`aria-hidden`), that the minimum content is a heading and action, and that illustrations are optional. No Carbon component wraps this pattern. Teams assemble from Typography, Button, and optional illustration assets.
**Key Decisions:**
- [HIGH] Pattern not component: IBM's enterprise applications have highly varied empty state contexts (search results, data tables, notification panels) — a fixed component would over-constrain the layout
- [MED] Illustrations are optional and decorative: IBM's data-focused UIs often omit illustrations in favor of clear, direct text — the documentation validates this approach
- [MED] Action required: Carbon's pattern specifies that every non-error empty state should have a primary action that resolves the empty state — "Add your first item" or "Upload a file"
**Notable API:** No component. Pattern documentation recommends a centered heading + optional body text + Button (`kind="primary"`) as the minimum implementation.
**A11y:** No component-specific guidance. Illustrations must be `aria-hidden`. Teams implement heading semantics and action button labels independently.
**Best at:** Flexibility for highly varied enterprise contexts — no component constraints means teams can match the empty state to the surrounding UI's information density.
**Missing:** A reusable component — IBM product teams rebuild empty states independently, leading to inconsistency in illustration usage, heading levels, and action placement.

---

## polaris
**Component:** EmptyState
**Approach:** Polaris's EmptyState requires an `image` prop (URL) and enforces a single `primaryAction` as the main resolution affordance. The heading must be action-oriented ("Add your first product"). `footerContent` handles supplementary help links below the main action. `fullWidth` removes the max-width constraint for full-page contexts. Large image responsive sizing reduces the illustration on small screens.
**Key Decisions:**
- [HIGH] Image required: Polaris enforces that empty states include illustrations — merchant-facing UIs benefit from visual warmth in otherwise-empty spaces
- [HIGH] Single primary action enforced: only one `primaryAction` prop — the most important action to resolve the empty state; secondary links go in `footerContent`
- [MED] Action-oriented heading: documentation and linting rules enforce that headings describe what the merchant can do ("Add your first product") rather than stating the problem ("No products yet")
**Notable API:** `image: string` (required); `primaryAction: {content, url}` (required); `secondaryAction`; `footerContent`; `fullWidth: boolean`
**A11y:** Image is `aria-hidden`; heading uses configurable heading level; action buttons have descriptive content labels. The component's forced structure ensures heading + action are always present.
**Best at:** Merchant-optimized empty state structure — enforced image, action-oriented heading, and single primary action create consistent empty states across Shopify Admin.
**Missing:** Multiple action support (only one primary + one secondary allowed); no slot for illustrative icons without an external image URL.

---

## atlassian
**Component:** EmptyState
**Approach:** Atlassian's EmptyState is the most structurally complete in Tier 1: optional image (recommended, not required), required `headingLevel` prop (unique — forces correct document heading semantics), three-tier action hierarchy (`primaryAction`, `secondaryAction`, `tertiaryAction`), and a two-column responsive layout on wide screens. The `--ds-surface-sunken` token provides the recessed background for empty state regions.
**Key Decisions:**
- [HIGH] `headingLevel` required prop: Atlassian is the only Tier 1 system that requires consumers to specify the heading level (`h2`, `h3`, etc.) — prevents incorrect heading hierarchy across Jira, Confluence, and Bitbucket pages
- [MED] Three-tier actions: `primaryAction` (button), `secondaryAction` (button), `tertiaryAction` (link) — covers Jira's empty sprint (create issue / import issues / learn more) and similar multi-action empty states
- [MED] Two-column responsive layout: on wide screens, illustration and text appear side-by-side; on narrow screens, stacked — Atlassian provides the responsive layout rather than leaving it to teams
**Notable API:** `headingLevel: "h2" | "h3" | "h4" | "h5" | "h6"` (required); `imageUrl`; `primaryAction`, `secondaryAction`, `tertiaryAction` as React nodes; `description` as string or node
**A11y:** `headingLevel` prop enforces semantic heading level; image is decorative and `aria-hidden`; action buttons are standard Atlassian button components with built-in a11y.
**Best at:** Required `headingLevel` for correct document structure and three-tier action hierarchy for complex empty state resolution flows.
**Missing:** The `--ds-surface-sunken` background is not automatically applied — teams must add the token to the parent container separately.

---

## ant-design
**Component:** Empty (built into Table, List, Select automatically)
**Approach:** Ant Design's Empty component accepts `image` as a boolean (`false` to hide), a URL string, or a ReactNode for custom illustration, and `children` for action buttons. `imageStyle` provides CSS control over the illustration. `ConfigProvider renderEmpty` sets a global custom empty state renderer for all built-in components (Table, List, Select) that show empty states. The built-in `PRESENTED_IMAGE_DEFAULT` and `PRESENTED_IMAGE_SIMPLE` constants provide two illustration styles.
**Key Decisions:**
- [HIGH] `ConfigProvider renderEmpty` for global defaults: a single configuration point renders custom empty states across all of Ant Design's collection components — no per-component configuration needed
- [MED] `image` flexibility: boolean/string/ReactNode — false hides illustration entirely (text-only empty state); a URL shows a custom image; a ReactNode shows custom content including icons
- [MED] Built-in integration with Table/List/Select/TreeSelect: these components automatically display Empty when their data is empty — teams don't add Empty explicitly
**Notable API:** `image: boolean | string | ReactNode`; `imageStyle: CSSProperties`; `description: ReactNode`; children for actions; `ConfigProvider renderEmpty` for global override
**A11y:** No required heading level — teams must add semantic heading elements as part of `description`. Image is rendered in a div without `aria-hidden` by default — teams should add `aria-hidden` to decorative illustrations.
**Best at:** `ConfigProvider renderEmpty` for application-wide empty state customization and built-in integration with Ant's collection components.
**Missing:** No enforced heading semantics (unlike Atlassian's required `headingLevel`); no structured action slot — actions go in `children` without position or role guidance.
