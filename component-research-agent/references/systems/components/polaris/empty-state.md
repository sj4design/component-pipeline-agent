---
system: Polaris (Shopify)
component: EmptyState
url: https://polaris.shopify.com/components/layout-and-structure/empty-state
last_verified: 2026-03-28
---

# Empty State

## Approach

Polaris's EmptyState is the most opinionated and merchant-psychology-driven empty state implementation in any Tier 1 design system. Shopify's product philosophy frames empty states not as technical conditions ("no data found") but as educational opportunities to help merchants understand the value of a feature and take the first step to enable it. The component's design flows from this philosophy: it requires an image (mandatory, not optional), enforces a single primary call-to-action, prescribes action-oriented heading copy, and frames description text around what the merchant will gain, not what is missing. Every structural and content constraint exists to serve merchant empowerment rather than just technical state communication.

The component is explicitly scoped to full-page empty states, not component-level empty states (like an empty table row or an empty input field). This scope limitation is a design discipline decision: full-page empty states warrant investment in illustration and copy because the merchant is encountering a blank feature for the first time; component-level empty states are better handled by inline messaging patterns. By scoping EmptyState to the full-page use case, Polaris ensures the component is not over-applied to minor empty conditions where its visual weight would be disproportionate.

## Key Decisions

1. **Image is required, not optional** (HIGH) — Unlike Carbon (decorative, optional) and Ant Design (highly configurable), Polaris mandates an image for every EmptyState. The rationale is merchant psychology: blank pages communicate failure; illustrated pages communicate potential. The image signals that this is a feature that can be activated, not a broken state. The component also specifies that images in nested contexts (cards, modals) should include 40px of white space to prevent visual collisions with container borders.

2. **Single primary action enforced** (HIGH) — EmptyState enforces exactly one primary CTA button. This reflects Shopify's conversion design philosophy: multiple equally-weighted actions cause decision paralysis, and merchants who hesitate on the empty state are unlikely to ever activate the feature. The forced constraint also prevents design teams from loading the empty state with multiple calls to action when the real problem is unclear primary intent.

3. **Action-oriented heading copy required** (HIGH) — The documentation explicitly requires headings to "encourage merchants to take the step required to activate the product or feature." This means headings like "You haven't created any products yet" are wrong; "Start selling your products" is correct. This copy prescription shifts the empty state from a diagnostic statement to an invitation. The documentation also prescribes button label format as `{verb}+{noun}` (e.g., "Create product," "Activate Apple Pay") to ensure clarity and reduce ambiguity.

4. **`footerContent` for supplementary actions** (MEDIUM) — Secondary and tertiary actions are placed in `footerContent` rather than in the main action area. This maintains visual hierarchy (primary action is visually dominant) while allowing supplementary options like "Learn more" or "Import products" to exist without competing with the primary CTA. The footer placement is a spatial signal: it's available but not prominent.

5. **Responsive image via `largeImage`** (LOW) — A separate `largeImage` prop allows teams to provide a higher-resolution or compositionally different image for large-screen contexts. This acknowledges that empty state illustrations optimized for mobile aspect ratios may look awkward on wide desktop layouts, requiring a layout-aware image system rather than simple fluid scaling.

## Notable Props

- `image` (required): URL or import for the empty state illustration. The required type enforces the visual-communication philosophy.
- `action`: The single primary CTA — `{ content, onAction }` shape ensures the button is always properly labeled.
- `secondaryAction`: One secondary action, always rendered as a link (lower visual weight than `action`'s button).
- `footerContent`: ReactNode for additional context, links, or tertiary actions.
- `fullWidth`: Removes the default max-width constraint for contexts requiring edge-to-edge empty state layouts.

## A11y Highlights

- **Keyboard**: The primary action button follows standard Polaris Button keyboard behavior (Tab to focus, Enter/Space to activate). Focus management within the page is not specialized for EmptyState.
- **Screen reader**: EmptyState images are implemented as decorative images with empty `alt=""` attributes and are skipped by screen readers. The heading and description provide all semantic meaning.
- **ARIA**: No special ARIA attributes beyond standard semantic HTML. The heading element uses the appropriate heading level for its document position. Action buttons have their `content` prop as the accessible label.

## Strengths & Gaps

- **Best at**: Merchant psychology and conversion design — the most opinionated content and structural guidelines that actively prevent common UX antipatterns (vague headings, multiple equal CTAs, illustration-free blank pages).
- **Missing**: No support for component-level empty states (empty table, empty search results in a dropdown), and no error-state variant for distinguishing between "never used" and "failed to load" conditions.
