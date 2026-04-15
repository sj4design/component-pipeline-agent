---
system: Chakra UI
component: Link
url: https://v2.chakra-ui.com/docs/components/link
last_verified: 2026-03-29
confidence: high
---

# Link

## Approach
Chakra UI provides a Link component as a styled wrapper around an anchor element (`<a>`), fully integrated with Chakra's color mode and theme token system. The component supports all Chakra style props and renders with default styles (colored text, underline on hover) from the active color scheme. For React Router and Next.js integration, the `as` prop allows passing a framework router link component while maintaining Chakra's styling. In v3, Link was updated to use the `asChild` pattern (from Radix's Slot concept) for more idiomatic framework integration — passing `asChild` renders the framework's Link component with Chakra's styles applied, avoiding nested anchor elements.

## Key Decisions
1. **Style props passthrough** (HIGH) — Link accepts all Chakra style props, allowing inline customization (color, fontSize, fontWeight) without needing `sx` or custom CSS. This is consistent with Chakra's universal style prop API across all components.
2. **External link handling** (HIGH) — The `isExternal` prop (v2) automatically adds `target="_blank"` and `rel="noopener noreferrer"` — the security-correct attributes for external links. This prevents teams from forgetting `rel="noopener"`, which closes a reverse tabnapping vulnerability. In v3, this is handled via explicit prop composition.
3. **Router integration via `as` / `asChild`** (HIGH) — The primary design challenge for any Link component is integrating with the app's router without creating invalid nested `<a>` elements. Chakra v2 uses `as={RouterLink}` which renders the router component directly; v3 uses `asChild` which merges props into the child component via cloneElement.
4. **No icon/external indicator by default** (LOW) — Unlike some systems (e.g., Carbon which auto-adds external link icons), Chakra's Link doesn't add visual indicators for external links. Teams add an icon manually using `LinkIcon` or `ExternalLinkIcon` from `@chakra-ui/icons` if needed.

## Notable Props
- `href`: destination URL
- `isExternal`: adds `target="_blank" rel="noopener noreferrer"` (v2)
- `as`: component to render as (React Router Link, Next.js Link, etc.) — v2
- `asChild`: boolean — merge with child component (v3)
- All Chakra style props: color, fontSize, fontWeight, textDecoration, etc.

## A11y Highlights
- **Keyboard**: Standard anchor keyboard interaction — Tab to focus, Enter to activate
- **Screen reader**: Renders as `<a>` with correct href; external links should have visually-hidden "(opens in new tab)" text or aria-label for full clarity
- **ARIA**: No custom ARIA needed for standard links; `aria-current="page"` for active navigation links should be added by the consumer

## Strengths & Gaps
- **Best at**: Zero-friction Chakra styling; `isExternal` security shortcut; theme token color integration; router compatibility
- **Missing**: No automatic external link icon; no visual distinction between visited/unvisited beyond browser defaults; no built-in "current page" styling for navigation contexts
