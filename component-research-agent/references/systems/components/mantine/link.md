---
system: Mantine
component: Anchor
url: https://mantine.dev/core/anchor/
last_verified: 2026-03-29
confidence: high
---

# Link (Anchor)

## Approach
Mantine names its hyperlink component "Anchor" — a styled anchor element that integrates with Mantine's theme token system and supports all Mantine style props. The name "Anchor" is chosen to avoid confusion with React Router's `<Link>` component, which is a common naming collision in React ecosystems. Anchor accepts an `href` prop for standard links and supports the `component` prop for passing framework-specific router links (React Router's `Link`, Next.js `Link`) as the underlying element. It includes `truncate` support for long URLs in constrained layouts and inherits all Mantine `Text` props since it is built on the `Text` component.

## Key Decisions
1. **Named Anchor to avoid conflict** (HIGH) — Many React apps already have a `Link` import from their router. Naming the component Anchor eliminates the need for aliased imports (`import { Link as ChakraLink }`) and makes the codebase's intent clear: Anchor is always a hyperlink, router link is always navigation. This is a thoughtful naming decision that reduces friction in router-integrated apps.
2. **Built on Text component** (HIGH) — Because Anchor extends Mantine's `Text`, it inherits text sizing, weight, color, truncation, and all typography tokens. This means a hyperlink can be styled as any text variant in the system — body, caption, label — while adding link color and underline behavior.
3. **`component` prop for router integration** (MEDIUM) — `<Anchor component={RouterLink} to="/path">` renders the router's Link component with Mantine's Anchor styles applied. This is the standard Mantine polymorphic rendering pattern and avoids nested anchor issues.
4. **`underline` prop** (LOW) — Mantine Anchor supports three underline modes: `"always"` (standard link), `"hover"` (underline on hover only, common in navigation), and `"never"` (for icon links or custom styled links). This fine-grained control is useful in content-dense UIs.

## Notable Props
- `href`: destination URL
- `target`, `rel`: standard anchor attributes
- `component`: polymorphic — pass React Router Link, Next.js Link, etc.
- `underline`: `"always"` | `"hover"` | `"never"`
- `truncate`: boolean — truncate long URLs with ellipsis
- All Mantine `Text` props: size, fw (font weight), c (color), etc.

## A11y Highlights
- **Keyboard**: Standard anchor keyboard behavior — Tab to focus, Enter to activate
- **Screen reader**: Rendered as `<a>` with href; descriptive link text recommended over "click here"
- **ARIA**: No custom ARIA needed for standard links; `aria-current="page"` for active nav links added by consumer; external links benefit from `aria-label` clarifying they open in a new tab

## Strengths & Gaps
- **Best at**: Clean Mantine typography integration; unambiguous naming; flexible underline control; polymorphic router support
- **Missing**: No automatic external link indicator; no built-in visited state styling (browser default only); no variant for non-text icon links
