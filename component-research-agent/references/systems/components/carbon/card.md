---
system: Carbon (IBM)
component: Tile
url: https://carbondesignsystem.com/components/tile/usage/
last_verified: 2026-03-28
---

# Tile

## Approach
IBM Carbon deliberately calls this component "Tile" rather than "Card," and the distinction is semantic, not cosmetic. In Carbon's model, a Tile is the foundational container primitive — simple, undifferentiated, minimal in its own opinions about content structure. A "Card" in Carbon's vocabulary is a *pattern* built on top of Tile that adds information hierarchy, actions, media, metadata, and overflow menus. This separation of concerns reflects IBM's enterprise philosophy: the component library provides stable, accessible primitives; the patterns library provides opinionated compositions for common use cases. This means a product team that needs a simple clickable surface gets Tile; a team building a product listing UI consults the Card Pattern to understand how to compose Tile with the right sub-components. Carbon resists the temptation to make Tile "smart" because IBM's products are extraordinarily diverse — from cloud infrastructure dashboards to healthcare analytics to AI tooling — and a prescriptive Card component would inevitably fail to fit most of them. The Tile is the lowest-common-denominator that every IBM product can use correctly, with patterns layered on top for specific contexts.

## Key Decisions
1. **Four distinct interaction variants: Base, Clickable, Selectable, Expandable** (HIGH) — Rather than a single card with optional interactivity props, Carbon defines four separate Tile variants, each with distinct markup, ARIA, and keyboard behavior. The WHY: each variant solves a fundamentally different interaction problem. Base tiles are static content containers (no interaction). Clickable tiles navigate the user to a new location (the whole tile is an `<a>` tag or button). Selectable tiles function as radio buttons or checkboxes in a group (pricing plans, feature toggles). Expandable tiles reveal hidden content (progressive disclosure). Treating these as four separate components rather than one configurable component forces the developer to make an explicit semantic choice — you cannot accidentally make a static tile clickable without changing the component entirely.

2. **Clickable Tile is a `<a>` element by default, not a wrapped button** (HIGH) — When a Tile navigates to a new page, it renders as a native anchor. This is a deliberate accessibility and semantic decision: a Tile that changes the URL is a link, not a button. Carbon enforces this distinction at the component level rather than leaving it to the developer, because misusing `role="button"` on navigation elements is one of the most common accessibility violations in enterprise software. The keyboard behavior follows: Enter activates navigation; Space does NOT (Space is reserved for buttons, not links).

3. **Selectable Tile uses radio/checkbox semantics explicitly** (HIGH) — Single-select Tiles render with `role="radio"` and multi-select Tiles render with `role="checkbox"`. The visual presentation was updated to use radio and checkbox icons (replacing the older checkmark icon) to reinforce the semantic match between visual affordance and underlying role. The reason: users with cognitive disabilities and users of assistive technology need the visual widget to match its ARIA role. A checkmark icon on a radio-group tile created a false mental model.

4. **1px contrast border added to interactive tiles** (MEDIUM) — A visible 1px stroke was added around all interactive tile variants to create a 3:1 contrast ratio against the page background. The motivation was an accessibility audit finding: non-interactive and interactive tiles looked identical on low-contrast displays, so users could not visually distinguish clickable from static content. This is a rare case where an accessibility requirement directly changed the visual design language of a component.

5. **Tile vs. Card Pattern separation preserves architectural flexibility** (MEDIUM) — By keeping Tile as a primitive and Card as a pattern, Carbon allows teams to build non-standard card compositions without forking the component. A team building an AI model card in Watson Studio can use Tile as the surface and compose it with Carbon's other primitives (Tag, Button, OverflowMenu) without being constrained by a built-in header/footer/actions structure that doesn't match their information hierarchy.

## Notable Props
- `href` (ClickableTile): Presence of `href` signals navigation intent, rendering the tile as an `<a>`. The component API itself encodes the semantic choice.
- `value` (SelectableTile): Works as a form input value, enabling Tiles to participate in form submission natively — treating selection not as a UI state but as data input.
- `expanded` (ExpandableTile): Controlled/uncontrolled expansion state. Unusually, expandable tiles push content down the page (not a popover), keeping the page flow intact and maintaining context.
- `light`: Toggle between default (white) and light (gray-10) background to accommodate the two most common IBM product surfaces.

## A11y Highlights
- **Keyboard**: Base tiles are not focusable. Clickable tiles: Tab to focus, Enter to activate (anchor semantics). Selectable tiles: Tab to group, Arrow keys to navigate within the group, Space to select (radio/checkbox semantics). Expandable tiles: Tab to focus, Enter or Space to expand/collapse.
- **Screen reader**: Clickable tiles announce as links with the tile's heading as the accessible name. Selectable tiles announce selection state ("radio button, checked/unchecked" or "checkbox, checked/unchecked"). Expandable tiles announce expanded state via `aria-expanded`.
- **ARIA**: `role="radio"` / `role="checkbox"` on Selectable tiles with `aria-checked`; `aria-expanded` on Expandable tiles; Clickable tiles use native `<a>` semantics without additional ARIA roles.

## Strengths & Gaps
- **Best at**: Making interaction semantics explicit and non-negotiable — the four-variant model forces the correct HTML/ARIA structure for each interaction pattern, which is why Carbon Tiles are among the most accessible "card" implementations in enterprise design systems.
- **Missing**: No first-class cover image slot, no built-in header/body/footer structure, and no native loading/skeleton state at the Tile component level — all of these are addressed in the Card Pattern documentation rather than the component itself, which adds pattern-lookup overhead for teams new to Carbon.
