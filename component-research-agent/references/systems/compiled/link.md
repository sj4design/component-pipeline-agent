---
component: link
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — typography tokens + color roles
**Approach:** M3 has no Link component. Text links are implemented with typography tokens and the `--md-sys-color-primary` color role, which automatically adapts to light/dark mode. M3's philosophy is that a link is a semantic HTML element (`<a>`) with M3 color and typography applied via CSS custom properties, not a component requiring abstraction.
**Key Decisions:**
- [HIGH] Absent: M3 treats links as styled HTML elements, not components — the `primary` color role and typography tokens are the link "design system support"
- [MED] `--md-sys-color-primary` for link color: semantic color role ensures link text automatically uses the brand primary color in both light and dark themes
- [MED] No visited state component: M3 does not document a visited link color convention; teams apply `color: --md-sys-color-secondary` or similar manually
**Notable API:** No component. CSS custom properties `--md-sys-color-primary`, `--md-sys-typescale-body-medium-*` applied to `<a>` elements.
**A11y:** Standard `<a href>` semantics. M3 provides no guidance on minimum touch target size for inline text links (a known mobile accessibility gap — 44×44dp minimum may not be achievable for inline text links).
**Best at:** Automatic light/dark mode adaptation via semantic color tokens when CSS is applied to native `<a>` elements.
**Missing:** Standalone link component with size variants, external link handling, visited states, and icon support.

---

## spectrum
**Component:** Link (standalone and inline variants)
**Approach:** Spectrum's Link is built on React Aria and implements a `RouterProvider` pattern for router-agnostic integration — teams provide their own router's `navigate` function once at the application root and all Spectrum links use it. `isQuiet` removes the underline for navigation-style links. External links (`target="_blank"`) automatically add `rel="noreferrer noopener"` as a security measure.
**Key Decisions:**
- [HIGH] `RouterProvider` for router-agnostic navigation: one configuration at app root; all Links automatically use the app's router — no per-link `as={RouterLink}` boilerplate
- [MED] Standalone vs. inline variant: standalone links include visual padding for larger click/touch targets; inline links integrate with text flow — both are needed in design systems
- [MED] Auto `rel="noreferrer"` on `target="_blank"`: security best practice applied automatically — teams cannot accidentally forget it
**Notable API:** `RouterProvider` at app root; `isQuiet: boolean` (removes underline); `variant: "primary" | "secondary" | "over-background"`; `target="_blank"` auto-adds `rel="noreferrer noopener"`
**A11y:** Inherits React Aria's Link behavior: keyboard Enter activation, correct `role` for router navigation (button-like behavior for client-side navigation), and `aria-disabled` for disabled state over the `disabled` HTML attribute.
**Best at:** Security-safe external links and the `RouterProvider` pattern for zero-configuration router integration in large applications.
**Missing:** Explicit visited state styling; no icon support built-in (external link icon must be added manually).

---

## carbon
**Component:** Link (inline and standalone)
**Approach:** Carbon explicitly defines two link types with a boolean `inline` prop: inline links appear within text flow with underlines; standalone links (without `inline`) include the leading `Launch` icon for external links as a standardization. `$link-visited` is a defined Carbon token for visited link color. The `renderIcon` prop adds any Carbon icon to standalone links.
**Key Decisions:**
- [HIGH] Inline vs. standalone distinction: inline links (in body copy) and standalone links (in navigation or as actions) have different visual treatments, hover states, and icon needs — the `inline` boolean enforces the correct treatment
- [HIGH] Launch icon standardization for external: `target="_blank"` links in Carbon applications standardly show the `Launch` icon via `renderIcon={Launch}` — a convention Carbon documents and encourages
- [MED] `$link-visited` token: defined token for visited link color provides consistency across IBM products; teams must apply the token manually but it exists as a documented standard
**Notable API:** `inline: boolean`; `renderIcon` for icon placement; `size: "sm" | "md" | "lg"`; `$link-visited` CSS token for visited state; `disabled` state
**A11y:** `<a>` element with standard semantics. Disabled links render as `<a>` without `href` (non-navigable) with `aria-disabled="true"`. Icon-only links require `aria-label`.
**Best at:** Launch icon standardization for external links and the `$link-visited` token for consistent visited state across IBM products.
**Missing:** Router integration pattern (teams must manually configure `<a href>` vs. router `Link` component per link); no `target="_blank"` auto-security attributes.

---

## polaris
**Component:** Link
**Approach:** Polaris's Link enforces semantic correctness: `url` prop renders an `<a>` element; `onClick`-without-url renders a `<button>` element — preventing the antipattern of using links for non-navigation actions. External URL detection is automatic. `monochrome` renders the link in the current text color (for use on colored surfaces). `removeUnderline` suppresses the underline for navigation-style links.
**Key Decisions:**
- [HIGH] `url` vs. `onClick` determines `<a>` vs. `<button>`: Polaris enforces the semantic HTML contract — links navigate, buttons act. A developer cannot use a link without a URL and call it accessible.
- [MED] Automatic external handling: `url` with an external domain automatically sets `target="_blank"` and `rel="noopener noreferrer"`
- [MED] `monochrome` for colored surfaces: links on colored backgrounds (banners, notifications) inherit the text color while maintaining underline affordance
**Notable API:** `url: string` (renders `<a>`); `onClick` without url (renders `<button>`); `external: boolean` override; `monochrome: boolean`; `removeUnderline: boolean`
**A11y:** The `url`/`onClick` distinction enforces correct HTML semantics automatically. External links include `rel="noopener noreferrer"` and a visually-hidden "(opens in a new tab)" text announcement.
**Best at:** Semantic enforcement — `url` vs `onClick` distinction is the strongest semantic HTML enforcement of any Tier 1 Link component.
**Missing:** Explicit visited state styling; icon support (no `renderIcon` equivalent).

---

## atlassian
**Component:** Anchor (primitive) + Link (styled)
**Approach:** Atlassian publishes an explicit "Button vs. Link" doctrine: use Link for navigation, Button for actions. The system provides two layers: `Anchor` (unstyled primitive with routing integration) and `Link` (styled component). Visited states are deliberately omitted — Atlassian's research found visited link color adds noise in Jira's dense UI without meaningful user benefit. `testId` is a first-class prop.
**Key Decisions:**
- [HIGH] Two-layer architecture (Anchor + Link): Anchor provides the behavior and routing integration; Link provides visual styling — teams can use Anchor for custom-styled links without reimplementing routing
- [MED] No visited state by design: Atlassian actively chose to omit visited link styling after user research — a documented deliberate decision rather than an oversight
- [MED] `testId` first-class: reflects Atlassian's engineering culture where UI test automation is expected; `data-testid` is baked in rather than requiring consumer `data-*` attributes
**Notable API:** `Anchor` with `href` and router integration; `Link` with `href`; `target`; no `inline`/`standalone` distinction (single variant)
**A11y:** `<a>` element with standard semantics; `aria-current="page"` for active navigation links; router-aware implementation prevents hard navigation when client-side routing is active.
**Best at:** "Button vs. Link" doctrine clarity and the two-layer Anchor/Link architecture for routing integration with custom styling.
**Missing:** Icon support, size variants, and `monochrome`/surface-aware color variants.

---

## ant-design
**Component:** Typography.Link
**Approach:** Ant Design places links within the Typography component family as `Typography.Link`. This gives links the same `ellipsis` (text truncation with tooltip), `copyable`, and `disabled` features available to Typography.Text. `href` and `target` map to standard `<a>` attributes. No special router integration — standard `href` navigation only.
**Key Decisions:**
- [HIGH] Typography family placement: links share Typography's `ellipsis` prop for truncation — valuable for long URLs in tables and data displays where truncation with tooltip is needed
- [MED] `disabled` state: unlike HTML `<a>` which has no disabled state, `Typography.Link` implements visual and functional disabling with `cursor: not-allowed` and blocked click
- [MED] No router integration: Ant Design provides no `RouterProvider` equivalent; SPAs must use their router's `Link` component or wrap `Typography.Link` with routing logic
**Notable API:** `href`; `target`; `disabled: boolean`; `ellipsis: boolean | {tooltip}` for truncation; `copyable` for copy-to-clipboard; inherits all Typography props
**A11y:** Renders as `<a>` with standard semantics. Disabled state uses `aria-disabled` with click suppression. `ellipsis` with `tooltip` provides an accessible full-text tooltip for truncated links.
**Best at:** `ellipsis` truncation with tooltip for long URLs in data-dense tables — a practical feature for Ant Design's enterprise admin UI use cases.
**Missing:** Router integration pattern; visited state; `rel="noopener noreferrer"` is not automatically added for `target="_blank"` links.
