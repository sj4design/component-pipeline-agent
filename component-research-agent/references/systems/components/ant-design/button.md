---
system: Ant Design
component: Button
url: https://ant.design/components/button/
last_verified: 2026-03-28
---

# Ant Design Button

## Approach

Ant Design takes a pragmatic, maximalist approach to buttons, offering a single Button component that handles nearly every button-like interaction through props. Unlike systems that split buttons into multiple components, Ant consolidates everything (primary, link, text, ghost, icon, loading, block) into one flexible API. This reflects Ant Design's core audience: Chinese enterprise development teams building complex back-office systems at speed. These teams need a single component that can be dropped into any context and configured via props rather than choosing between specialized components. The tradeoff is a larger API surface, but the benefit is that developers only need to learn one component. Ant Design v5 introduced CSS-in-JS theming via design tokens, and v6 (late 2025) further refined the token system, allowing per-button color customization through the colorPrimary token cascade.

## Key Decisions

1. **Type-based variant system with "dashed" as a unique addition** (HIGH) — Ant Design offers primary, default, dashed, text, and link types. The dashed button is distinctive among major design systems; almost no other system has it. Dashed exists for "add" actions (e.g., "Add field," "Add row") where the dashed border visually suggests an empty slot waiting to be filled. This convention comes from Chinese enterprise UI patterns where forms frequently have dynamic, user-expandable sections. The dashed border communicates "this area is extensible" in a way that a regular outlined button does not.

2. **Ghost as a mode, not a type** (MEDIUM) — Ghost is not listed alongside the types but is an independent boolean prop that makes any button type transparent. This means you can have a ghost primary button, a ghost dashed button, or a ghost default button. The reason: ghost mode is a display context (button on a colored/image background) rather than a semantic intent. Separating it from type lets developers independently control what the button means (type) and where it appears (ghost). This is more compositional than systems that treat ghost as a variant alongside primary/secondary.

3. **Block mode for full-width layout** (MEDIUM) — The block prop makes a button expand to 100% of its parent container width. Ant Design includes this as a first-class prop because Chinese enterprise applications frequently use full-width buttons in modals, drawers, and mobile views. Rather than requiring developers to add CSS overrides for width, the prop handles it consistently including proper padding and text centering.

4. **Loading state with customizable icon** (MEDIUM) — The loading prop accepts both a boolean and an object with an icon property for custom loading indicators. Ant Design went further than most systems here because enterprise apps often have branding requirements for spinners, or need different loading icons in different contexts (e.g., upload progress vs. save progress). Enabling loading.icon customization prevents teams from building wrapper components just to swap out a spinner.

## Notable Props

- `type` (primary | default | dashed | text | link): The dashed type is Ant's signature contribution, purpose-built for "add more" patterns in dynamic forms.
- `ghost` (boolean): Independent of type, so any button can become transparent. Compositional approach separating context from intent.
- `danger` (boolean): Orthogonal to type, so primary+danger, text+danger, link+danger are all valid. Similar to Polaris's tone approach.
- `block` (boolean): First-class full-width support, reflecting Ant's mobile-ready enterprise focus.
- `loading` (boolean | { delay, icon }): Supports delayed loading indicator (to avoid flicker on fast operations) and custom loading icons.
- `iconPosition` (start | end): Explicit control over icon placement, recognizing that trailing icons serve different purposes than leading icons.

## A11y Highlights

- **Keyboard**: Tab to focus, Enter/Space to activate. Loading state disables the button to prevent double-submission while maintaining focus.
- **Screen reader**: Ant Design relies on the button's visible text for the accessible name. Icon-only buttons need explicit aria-label. The documentation is less prescriptive about accessibility than Western-focused design systems.
- **ARIA**: Standard role="button". Link type renders as a button element styled as a link rather than an anchor, which is a semantic concern for navigation use cases. Danger state is communicated through color alone by default; teams should supplement with label text.

## Strengths & Gaps

- **Best at**: Providing a maximalist single-component API with unique patterns like dashed buttons and compositional ghost mode that handle virtually every enterprise button scenario through props alone.
- **Missing**: Weaker accessibility documentation and enforcement compared to Western design systems; no structural requirement for icon-only labels; link type uses button semantics instead of anchor elements, which can create navigation accessibility issues.
