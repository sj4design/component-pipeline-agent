---
system: Spectrum (Adobe)
component: Card
url: https://spectrum.adobe.com/page/cards/
last_verified: 2026-03-28
---

# Card

## Approach
Contrary to earlier information suggesting Spectrum lacks a Card component, Spectrum does have a Card component — and the way it is designed reveals Adobe's philosophy plainly. Spectrum Cards are purpose-built for browsing collections: media galleries, asset libraries, template pickers, and content feeds. This is not accidental. Adobe's core products (Lightroom, Experience Manager, Stock, Creative Cloud Libraries) are fundamentally about browsing and selecting items from collections of visual assets. The Card component is therefore designed around selection, preview, and action — not around generic content grouping. Spectrum makes a sharp distinction between a Card (for item browsing in a collection) and a Panel or Box (for content organization in a layout). This means Spectrum's Card is more opinionated and narrower in scope than Material's or Ant Design's: it is a collection-item component, not a general-purpose container. The quiet variant ("no container") reflects another Adobe priority — minimizing chrome in visual-heavy contexts where the content itself (a photo, a video thumbnail, a document preview) should dominate, with UI receding to near-invisibility.

## Key Decisions
1. **Two style variants: Standard and Quiet** (HIGH) — Standard cards include a visible container with background fill and border; Quiet cards remove the container entirely, with components floating on the background. The WHY: Adobe's tools frequently embed cards in dark, texture-rich, or colored backgrounds (Lightroom's dark room, Experience Manager's asset panels). A visible container border in those contexts creates visual noise. Quiet cards let the media content carry visual weight without an imposed frame, which is why they are recommended for "simple cards" where media is the primary element.

2. **Selection is a first-class interaction mode** (HIGH) — Cards support selectable and draggable states built into the component, with checkbox selection and drag-and-drop handled natively. Most design systems treat card selection as a consumer's problem (wrap it yourself). Spectrum bakes it in because Adobe's product use cases almost universally involve selecting one or more items from a collection to perform a batch action (export, move to album, add to library). Not having native selection would force every Adobe team to reimplement the same pattern with inconsistent keyboard handling.

3. **Preview as the dominant anatomy slot** (HIGH) — The card preview region accepts any aspect ratio from 4:1 to 3:4, is positioned at the top, and is the first element in visual hierarchy. This reflects the asset-centric nature of Adobe products: the thumbnail IS the identity of the item. Title and metadata are secondary. This is why Spectrum Cards feel more like "thumbnail + label" than "header + content" — the information hierarchy is inverted compared to, say, Polaris Cards.

4. **Action menu instead of inline action buttons** (MEDIUM) — Spectrum Cards use an action menu (three-dot overflow) rather than exposed action buttons. The reason: in dense grids of 50–100 cards, exposing multiple buttons per card creates visual and cognitive overload. A single overflow trigger keeps the grid clean and scalable. This differs from Material (which exposes actions as a row) and Polaris (which embeds actions in the header and footer).

5. **Flexible layout orientation (vertical/horizontal) and three sizes** (MEDIUM) — Cards support vertical or horizontal layout and small/medium/large sizes. The flexibility is driven by Spectrum's cross-product reach: a card in Experience Manager's list view needs to be horizontal (like a file row) while a card in Creative Cloud's grid needs to be vertical (thumbnail-first). Without built-in orientation options, every product team would build their own card variant.

## Notable Props
- `variant="quiet"`: Removes the container surface — content floats directly on the background. Represents Adobe's philosophy that chrome should disappear in media-heavy contexts.
- `isSelected`: Built-in selection state driving both visual (checkbox, highlight) and semantic (aria-selected) behavior. Not an afterthought — selection is a primary interaction model.
- `isDraggable`: Enables drag-and-drop with full keyboard and screen reader accessibility parity via React Aria's DnD implementation.
- `size` (`S` | `M` | `L`): Adjusts the density of the card for different browsing contexts (compact list vs. comfortable gallery).

## A11y Highlights
- **Keyboard**: Tab/Shift+Tab moves between cards. Arrow keys navigate within a card grid. Space bar toggles selection; Enter activates the primary action. `Ctrl/Cmd + Arrow` enables non-contiguous selection, matching OS-level multi-select conventions.
- **Screen reader**: Selection state is announced via `aria-selected`. Card title is used as the accessible name. Action menu is announced as a button with a label derived from the card title (e.g., "More actions for [title]").
- **ARIA**: Cards in a collection use `role="gridcell"` or `role="option"` depending on selection mode (grid vs. listbox pattern). Adobe's React Aria library underpins the implementation, providing WAI-ARIA Authoring Practices Guide-compliant interaction patterns with screen reader testing across NVDA, JAWS, and VoiceOver.

## Strengths & Gaps
- **Best at**: Collection-browsing scenarios with selection and media-heavy content — the most complete native selection/drag-and-drop story of any Tier 1 design system's Card component.
- **Missing**: Not designed for general-purpose content grouping (a settings panel, a form section, a dashboard widget) — using Spectrum Card outside a browsable collection context requires fighting the component's assumptions.
