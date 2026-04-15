---
system: Atlassian Design System
component: Spinner
url: https://atlassian.design/components/spinner/usage
last_verified: 2026-03-28
---

# Spinner

## Approach
Atlassian's Spinner is a focused, minimal loading indicator designed to communicate that content is actively being processed. The component is deliberately non-interactive and visually minimal — a single animated ring using Atlassian's motion tokens — because Atlassian's enterprise products (Jira, Confluence, Trello) demand loading states that do not compete visually with dense information environments. Atlassian's design system philosophy is "clarity first": the spinner must unambiguously signal activity without adding visual noise to already information-dense layouts. The component integrates with Atlassian's semantic colour system, supporting an `appearance` prop (including an `invert` mode for dark backgrounds), which reflects Atlassian's product reality of both light-themed admin interfaces and dark-themed dashboards and code editors. Unlike Carbon's three-type taxonomy, Atlassian's Spinner is a single, composable primitive — overlay behaviour, inline placement, and page-level loading are achieved by composing the Spinner with layout components, reflecting the Atlassian Design System's preference for composable primitives over feature-rich single components. Guidance around when to use a Spinner versus skeleton screens is acknowledged but less prescriptive than Polaris — Atlassian's docs note the distinction without mandating a hierarchy.

## Key Decisions
1. **`label` prop as primary accessibility mechanism** (HIGH) — Atlassian requires a label string that provides context for assistive technologies. The docs state: "A label should always be used to add context for assistive technologies. The label should accurately describe the type of process that's occurring." This is similar to Polaris's `accessibilityLabel`, but Atlassian surfaces it simply as `label`. Importantly, the label should not be generic ("Loading") but descriptive of the specific operation ("Loading project settings"). The reasoning is that enterprise users navigating complex interfaces with screen readers need to know *which* loading state they are encountering, not just that something is loading.

2. **`appearance` prop with `invert` for dark backgrounds** (MEDIUM) — The `invert` appearance switches the spinner to a light-coloured ring for display on dark backgrounds. This is a direct response to Atlassian's product landscape: Jira's dark mode, code editor panels in Bitbucket, and dark-themed dashboards all require loading indicators that remain visible without relying on the primary brand colour. Unlike Spectrum's `staticColor` which provides `"white"` and `"black"`, Atlassian's `invert` is a semantic toggle — you're describing the background context, not picking a colour value.

3. **Three size variants aligning to layout contexts** (MEDIUM) — Atlassian provides `small`, `medium` (default), and `large` sizes, with medium explicitly called out as appropriate for most use cases. Small is for tight inline contexts (inside form fields, table cells). Large is for prominent section-level or page-level loading states where the spinner needs to be the visual centrepiece. The sizing follows Atlassian's spatial token scale, keeping the spinner proportional to the layout density of the surrounding components. This three-tier scale matches the majority of Tier 1 systems (Carbon, Spectrum) and reflects a consensus around the minimum meaningful size distinction for loading indicators.

4. **Motion respects `prefers-reduced-motion`** (HIGH) — Atlassian's spinner animation uses motion tokens from the design system's motion scale (timing in the 150ms–600ms range) and honours the OS-level `prefers-reduced-motion` media query. For users with vestibular disorders or motion sensitivity, this is not optional — Atlassian's accessibility standards align with WCAG 2.1 Success Criterion 2.3.3 (Animation from Interactions). The spinner is one of the most motion-prominent components in any design system, making this support particularly important here.

5. **Composable, no built-in overlay** (MEDIUM) — Like Polaris and Spectrum, Atlassian's Spinner is a standalone primitive without an embedded overlay or content-wrapping mode. Full-page or section-level blocking during loading is achieved by composing the Spinner inside a modal or overlay component from the Atlassian Design System. The reasoning is that the Spinner's role is solely to communicate activity — the responsibility of blocking interaction belongs to the overlay primitive, which has its own focus management, z-index, and backdrop concerns. Mixing those concerns would make both components harder to reason about independently.

## Notable Props
- `label`: The accessible description of the current loading operation — interesting because Atlassian's docs explicitly discourage generic labels ("Loading") in favour of operation-specific ones ("Loading project settings"), which is more opinionated a11y guidance than most systems.
- `appearance` (`"default"` | `"invert"`): Semantic inversion prop for dark contexts — notably, this is a *context descriptor* rather than a *colour value*, which keeps the prop aligned with the design system's semantic colour philosophy.
- `size` (`"small"` | `"medium"` | `"large"`): Three-tier scale with explicit guidance that `medium` covers the vast majority of cases.
- `testId`: Atlassian consistently exposes `testId` across all components, reflecting the organisation's strong emphasis on automated testing practices — a prop pattern less common in other systems.

## A11y Highlights
- **Keyboard**: Not interactive. No focus management or keyboard handling within the component. Does not trap or redirect focus during loading states — that is the responsibility of any overlay or modal component wrapping the Spinner.
- **Screen reader**: Uses `role="status"` which creates an implicit `aria-live="polite"` region, meaning the spinner's presence is announced without interrupting the user's current interaction. The `label` prop provides the accessible name. When the spinner is removed from the DOM (loading complete), screen readers are not automatically notified — the application must handle completion announcements separately.
- **ARIA**: `role="status"` is the primary ARIA mechanism. The `label` prop maps to `aria-label` on the spinner element, giving it a meaningful name in the accessibility tree. Atlassian's docs note that the label should describe the type of process accurately — the closest Tier 1 system to providing prescriptive label-writing guidance alongside the API docs.

## Strengths & Gaps
- **Best at**: Clear prescriptive guidance on writing meaningful accessible labels (not just "Loading"), and consistent `prefers-reduced-motion` support aligned with Atlassian's documented accessibility standards.
- **Missing**: No delay prop to suppress flicker on fast operations (unlike Ant Design), and no skeleton screen guidance alongside the Spinner docs to help teams make the spinner-vs-skeleton decision.
