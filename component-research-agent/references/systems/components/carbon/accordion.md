---
system: IBM Carbon Design System
component: Accordion
url: https://carbondesignsystem.com/components/accordion/usage/
last_verified: 2026-03-28
---

# Accordion (Carbon)

## Approach
Carbon treats Accordion as a structured information-density tool, not just a show/hide widget. The component is designed around IBM's enterprise product needs where long forms, configuration panels, and documentation views need to manage large amounts of content without overwhelming users. Carbon provides two alignment modes (default indented and flush) and three sizes (sm, md, lg) because IBM products span dense data dashboards to spacious marketing pages. A distinctive philosophical choice is that Carbon wraps accordion items in an unordered list (`<ul>` with `<li>` elements), treating the accordion as a semantically meaningful group of related sections rather than a flat series of buttons. Carbon also takes an opinionated stance on chevron placement: right-aligned by default, but the documentation explicitly acknowledges that left-aligned chevrons are more accessible for low-vision users because the expand/collapse indicator sits closer to the title text.

## Key Decisions
1. **Flush vs. default alignment** (HIGH) -- Default alignment indents content from the left edge, while flush alignment removes the indentation so content aligns with surrounding page elements. WHY: In dense enterprise layouts (like IBM Cloud dashboards), indented accordion content creates awkward whitespace when placed alongside tables, forms, or other edge-aligned elements. Flush mode solves this by aligning the accordion's content edge with the rest of the page grid, at the cost of slightly less visual separation between the trigger and the content.

2. **Three explicit sizes: sm (32px), md (40px), lg (48px)** (MEDIUM) -- Carbon defines three header heights with specific token-backed measurements. WHY: IBM products range from data-dense monitoring dashboards (where vertical space is precious and sm headers make sense) to setup wizards and documentation (where lg provides comfortable touch targets and breathing room). Rather than a single "responsive" accordion, Carbon lets teams choose the appropriate density explicitly.

3. **Unordered list semantic structure** (MEDIUM) -- Each accordion item is wrapped in a `<li>` inside a `<ul>`, providing list semantics to screen readers. WHY: Screen readers announce "list of 5 items" when entering an accordion, giving users immediate context about how many sections exist. This is more informative than encountering buttons with no group context. Carbon notes that when only a single accordion is used (not a group), the list wrapper should be omitted.

4. **Right-aligned chevron with accessibility caveat** (LOW) -- The chevron icon defaults to the end (right) side of the header to keep titles aligned with other typography in the layout. WHY: Left-aligned titles create a consistent reading edge. However, Carbon's own accessibility documentation acknowledges that left-aligned chevrons are better for low-vision users. This is a deliberate tradeoff between visual consistency and accessibility, and Carbon documents it transparently rather than hiding it.

## Notable Props
- `align`: Controls chevron position ("start" or "end"). Directly exposes the visual-vs-a11y tradeoff documented in their guidelines.
- `size`: "sm" | "md" | "lg" -- Maps to 32px, 40px, and 48px header heights. Token-backed, not arbitrary pixel values.
- `isFlush`: Boolean that removes default indentation, aligning content flush with the container edge.
- `disabled`: Can be set per-item, allowing partial interactivity within a group.

## A11y Highlights
- **Keyboard**: Enter/Space toggles the focused accordion item. Tab and Shift+Tab navigate between accordion headers. Interactive elements inside expanded panels join the tab order naturally.
- **Screen reader**: Items wrapped in `<ul>/<li>` announce list context and item count. Heading roles with configurable levels wrap the trigger buttons. Expanded/collapsed state announced via `aria-expanded`.
- **ARIA**: `aria-expanded` on trigger buttons. `aria-controls` linking trigger to panel. Heading levels settable via ARIA roles when semantic heading elements are not used directly.

## Strengths & Gaps
- **Best at**: Enterprise-grade density control with three sizes and flush alignment, plus unusually transparent documentation about accessibility tradeoffs (like the chevron position debate).
- **Missing**: No built-in single-expand-only mode at the container level -- like MUI, group behavior must be managed by the consumer. No animation customization props exposed.
