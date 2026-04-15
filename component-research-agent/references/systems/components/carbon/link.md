---
system: Carbon (IBM)
component: Link
url: https://carbondesignsystem.com/components/link/usage/
last_verified: 2026-03-28
---

# Link (Carbon)

## Approach
Carbon's Link component has explicit, documented opinions on two axes that most systems leave ambiguous: inline vs. standalone presentation and icon placement relative to link text. IBM's enterprise products frequently embed links in data tables, form helper text, notification banners, and legal disclaimers — all contexts where the visual treatment of a link must be precisely controlled to avoid disrupting the surrounding layout. Carbon distinguishes between inline links (which inherit the surrounding text size and line height) and standalone links (which are self-contained navigational elements with independent sizing). The component also formalizes the icon-link pattern: when an external link icon is needed to signal that a URL opens in a new tab, Carbon specifies exactly which icon to use (`Launch` from the Carbon icon set), its size relative to the link text, and its position (trailing, not leading). This level of specification exists because IBM's accessibility teams found inconsistent icon placement across products was confusing screen magnification users who lost context when the icon appeared in an unexpected position.

## Key Decisions
1. **Inline vs. standalone as a first-class distinction** (HIGH) — Carbon provides two distinct visual treatments through a `inline` boolean prop. Inline links blend into surrounding text; standalone links sit as independent interactive elements. This distinction prevents the common mistake of dropping a standalone link into a paragraph and breaking the line height, which was a recurring bug in IBM product UIs before the distinction was formalized.
2. **Icon placement standardization for external links** (HIGH) — When `renderIcon` is used with `target="_blank"`, Carbon's documentation explicitly prescribes trailing icon placement. The `Launch` icon (16px at 14px text size, 20px at 16px text size) provides a consistent visual signal for external navigation. This standardization emerged from IBM's accessibility audits showing users had difficulty predicting which links would navigate away from the current application.
3. **Visited state through design tokens** (MEDIUM) — Carbon provides `$link-visited` token (a purple-family color) that distinguishes visited from unvisited links. Most enterprise systems omit visited styling on the grounds that enterprise apps are not "content browsing" contexts; Carbon includes it because IBM's documentation sites and knowledge bases are heavily used for browsing, not just task completion.

## Notable Props
- `inline`: Boolean that switches between inline text link and standalone link — this single prop controls padding, size inheritance, and line height behavior.
- `renderIcon`: Accepts a Carbon icon component, with documented guidance on which icon to use for external links specifically.
- `visited`: Boolean that applies the visited state styling without relying on the browser's `:visited` CSS pseudo-class, which is useful in SPAs where browser history may not reflect the app's navigation state.

## A11y Highlights
- **Keyboard**: Tab to focus, Enter to activate. Carbon applies a 1px offset focus ring using `$focus` token that meets 3:1 contrast in both light and dark themes.
- **Screen reader**: When `target="_blank"` is used, Carbon's documentation recommends adding " (opens in new tab)" to the link text, but the component does not inject this automatically — it is a documentation recommendation only.
- **ARIA**: Native `<a>` element. Carbon documents that `aria-label` should be used when the link text is not self-descriptive (e.g., "Learn more" → `aria-label="Learn more about Carbon design tokens"`).

## Strengths & Gaps
- **Best at**: Icon link standardization — the most prescriptive system for external link icon treatment, which benefits large organizations needing cross-team consistency.
- **Missing**: No automatic rel="noopener noreferrer" injection on external links; developers must add this manually, which is a security gap in practice.
