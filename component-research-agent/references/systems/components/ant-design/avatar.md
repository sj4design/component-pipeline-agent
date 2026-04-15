---
system: Ant Design
component: Avatar
url: https://ant.design/components/avatar/
last_verified: 2026-03-28
---

# Avatar

## Approach
Ant Design's Avatar component is the most configurable in Tier 1, offering image, icon, and text content types in a single unified API. This breadth is characteristic of Ant Design's philosophy: provide maximum flexibility for enterprise developers building a wide variety of application types in the Chinese enterprise and e-commerce market. The component supports circular and square shapes, multiple size variants, automatic text scaling to fit initials within the circle, and an `Avatar.Group` sub-component for stacked group displays. A notable Ant Design innovation is the automatic font size scaling for text avatars — when the initials text would overflow the avatar circle, Ant Design automatically reduces the font size to maintain legibility without truncation. This solves a real problem that most other systems leave to the consumer.

## Key Decisions
1. **Three content types in one component** (HIGH) — Avatar accepts `src` (image), `icon` (any Ant Design icon), or `children` (text/initials) in one unified component. The active content type is determined by what's provided: image src takes priority, then icon, then children. This is the most flexible fallback approach in Tier 1, but it puts the fallback logic in the consumer's hands — if the image fails and you want to fall back to initials, you must handle the `onError` callback yourself and conditionally render without `src`.
2. **Square vs. circle shape prop** (HIGH) — Ant Design is the only Tier 1 system that makes square avatars a first-class variant via a `shape` prop (`circle` | `square`). Square avatars are used extensively in Chinese enterprise software for brand logos, product thumbnails, and non-person entities (e.g., a company's avatar in a CRM). The explicit shape prop prevents teams from needing to override border-radius with custom CSS.
3. **Automatic text scaling** (MEDIUM) — When using text content (initials or custom text), Ant Design calculates whether the text fits within the avatar bounds and reduces font size proportionally if it doesn't. This is unique among Tier 1 systems and eliminates the awkward truncated-initials problem that affects teams using 3-character names (like "Tom" or Chinese two-character names) in a small avatar.
4. **`Avatar.Group` with `maxCount` and `maxStyle`** (MEDIUM) — The group component stacks avatars with configurable overlap, controls how many avatars show before the overflow count, and allows full style customization of the overflow indicator via `maxStyle`. This flexibility reflects Ant Design's generally permissive styling approach.
5. **`gap` prop for text spacing** (LOW) — The `gap` prop controls the padding between the text content and the avatar's circular edge. This fine-grained control exists because Ant Design's users often need to fit multi-character text in avatars across different language contexts.

## Notable Props
- `shape`: circle | square — square avatars as first-class (unique in Tier 1)
- `onError`: Callback when image fails, returns boolean to control fallback display
- `gap`: Pixel value controlling text-to-edge spacing in text avatars
- `draggable`: Boolean controlling whether the avatar image is HTML5 draggable
- `crossOrigin`: CORS setting for image loading

## A11y Highlights
- **Keyboard**: No keyboard interaction for non-interactive avatars; consumers must wrap in interactive elements for interactive use
- **Screen reader**: No automatic `alt` text — consumers must provide `alt` on the `src` image or an `aria-label` on the component; this is a significant gap compared to Polaris and Atlassian, which derive accessible names from the `name` prop
- **ARIA**: No built-in ARIA attributes beyond what HTML elements provide naturally; accessibility is largely a consumer responsibility

## Strengths & Gaps
- **Best at**: Maximum flexibility — three content types, square/circle shape, automatic text scaling, and the most configurable group component make Ant Design Avatar the right choice when you need to handle diverse entity types (people, companies, products) in one unified component
- **Missing**: No automatic accessible name derivation (no `name` prop that drives both visual display and a11y), no presence indicator, and the image fallback requires manual error handling rather than automatic sequence
