---
system: Material Design 3
component: Side Sheets (Standard + Modal)
url: https://m3.material.io/components/side-sheets
last_verified: 2026-03-28
---

# Drawer

## Approach

Material Design 3 uses the term "Side Sheets" rather than "Drawer," and the naming distinction is meaningful. In M3's conceptual model, a "sheet" is supplementary content that appears alongside (or over) the primary canvas — the name signals secondary status relative to the main page. "Drawer" implies navigation infrastructure, which M3 handles separately through the Navigation Drawer component. This separation keeps two different interaction patterns from being conflated: Navigation Drawer is for switching between app sections (persistent, part of the app shell), while Side Sheet is for displaying secondary detail content (temporary, content-contextual).

M3 offers two Side Sheet variants: Standard (non-modal, coexists with content by pushing or overlapping it) and Modal (temporary, appears over content with a scrim behind it). The Standard variant is particularly well-suited to large-screen responsive layouts where a side panel for detail or filters can live persistently alongside the content grid without interrupting flow. The Modal variant covers the use case that other systems call a "Drawer" — a temporary panel that slides in from the edge with a scrim, requiring dismissal before returning to the main content.

## Key Decisions

1. **Side Sheet vs. Navigation Drawer naming** (HIGH) — M3 deliberately uses separate names to prevent teams from conflating navigation infrastructure with contextual content panels. Navigation Drawer is always about app-level destination switching; Side Sheet is always about supplementary information or controls. This naming discipline prevents the anti-pattern where teams build navigation inside a Side Sheet or contextual content inside a Navigation Drawer.

2. **Standard (persistent) variant** (HIGH) — Unlike most systems that only offer a modal/overlay drawer, M3's Standard Side Sheet can coexist with main content on large screens, pushing it over or overlapping it without a scrim. This enables the information architecture pattern where a details panel and a list panel share the screen simultaneously — a pattern common in email clients, file managers, and analytics dashboards.

3. **Mobile uses Bottom Sheet instead** (MEDIUM) — On small screens, M3 routes the side panel use case to Bottom Sheet rather than forcing a narrow side panel. This is an explicit responsive strategy: edge-anchored panels are appropriate on large screens where horizontal space is available; on small screens, vertical space at the bottom is more natural and ergonomic. Teams implementing M3 must design both states.

4. **Scrim on Modal variant** (MEDIUM) — The Modal Side Sheet uses a scrim (semi-transparent overlay behind the sheet) to indicate that background content is temporarily inaccessible. The scrim color and opacity follow M3 tokens, ensuring visual consistency with Dialog and other modal surfaces. Tapping the scrim dismisses the sheet, providing a clear and familiar dismissal affordance.

## Notable Props

- M3's Side Sheet spec is primarily a design pattern; specific props depend on implementation (Material Web Components, Material UI, etc.).
- Key configurable behaviors: `persistent` vs. `modal` variant, slide-in direction (default: trailing/right edge), width.

## A11y Highlights

- **Keyboard**: Modal Side Sheet should trap focus within the sheet while open, following the same model as Dialog. Escape key should dismiss. Standard Side Sheet does not trap focus since background content remains accessible.
- **Screen reader**: Modal variant should use `role="dialog"` with `aria-modal="true"` to signal to screen readers that background content is inert. Standard variant does not need this.
- **ARIA**: The trigger element (typically a button) should use `aria-expanded` to communicate the sheet's open/closed state. `aria-controls` can link the trigger to the sheet's ID.

## Strengths & Gaps

- **Best at**: Providing a principled distinction between navigation drawers and content side panels, and offering a true persistent (non-modal) variant for large-screen layouts where other systems default to overlay-only.
- **Missing**: The web component implementation is less mature than the Android-first spec, and the boundary between when to use Modal Side Sheet vs. a full Dialog is not concretely documented.
