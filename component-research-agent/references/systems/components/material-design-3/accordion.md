---
system: Material Design 3 / MUI
component: Accordion (formerly ExpansionPanel)
url: https://mui.com/material-ui/react-accordion/
last_verified: 2026-03-28
---

# Accordion (MUI)

## Approach
Material Design 3 itself does not define a native accordion component in its official component catalog -- this is a significant gap compared to other design systems. MUI fills this void with its own Accordion component (renamed from ExpansionPanel in v5) built on top of the Paper surface component. The philosophy is composition-first: Accordion is assembled from three sub-components (Accordion, AccordionSummary, AccordionDetails) plus an optional AccordionActions for footer buttons. MUI chose to treat each accordion item as an independent controlled or uncontrolled unit rather than managing group state at the container level, which means "only one open at a time" behavior requires manual state wiring with React's useState. This decision prioritizes flexibility over convenience -- developers can compose any behavior they want, but common accordion-group patterns require boilerplate.

## Key Decisions
1. **No container-level group management** (HIGH) -- Unlike Spectrum or Carbon, MUI has no AccordionGroup wrapper. Each Accordion manages its own expanded state independently. WHY: MUI's design philosophy favors composability over prescriptive patterns. They expect developers to wire up group behavior using controlled `expanded` props rather than offering a dedicated container. This means more flexibility but also more work for the most common use case (single-open accordion).

2. **Renamed from ExpansionPanel to Accordion** (MEDIUM) -- In MUI v5, ExpansionPanel was renamed to Accordion to align with common industry terminology and WAI-ARIA naming conventions. WHY: The original name was MUI-specific and didn't match how developers search for or discuss this pattern. The rename improved discoverability and aligned with accessibility standards that reference "accordion" explicitly.

3. **Built on Paper surface** (MEDIUM) -- Accordion extends Paper, inheriting elevation, variant (outlined/elevation), and square props. WHY: Material Design treats surfaces as a core primitive. By extending Paper, Accordion automatically gets elevation shadows, border-radius control, and theme-consistent surface colors without duplicating that logic.

4. **AccordionActions as a separate slot** (LOW) -- MUI provides a dedicated AccordionActions sub-component for placing buttons at the bottom of expanded content. WHY: Enterprise forms frequently need confirm/cancel actions within accordion panels. Rather than forcing developers to manually position buttons, MUI formalized this as a named slot with proper spacing.

## Notable Props
- `disableGutters`: Removes the extra horizontal padding and margin changes when expanded. Useful for flush layouts similar to Carbon's flush alignment, addressing the visual "jump" that default gutters cause on expand.
- `square`: Removes border-radius, allowing seamless stacking. WHY: When accordions are used in a vertical list, rounded corners between items look broken.
- `TransitionProps`/`slots.transition`: Allows swapping the default Collapse animation for a custom transition component. This is unusually flexible -- most systems hardcode their animation.
- `expanded` + `onChange`: Controlled mode. The only way to implement single-expand accordion behavior since there is no group wrapper.

## A11y Highlights
- **Keyboard**: Enter/Space toggles expanded state on the summary button. Tab moves between accordion headers following standard focus order.
- **Screen reader**: AccordionSummary renders as a `<button>` inside a heading-level element. The expanded panel uses `role="region"` with `aria-labelledby` pointing back to the summary.
- **ARIA**: `aria-expanded` on the summary button, `aria-controls` linking summary to details region. Follows WAI-ARIA Authoring Practices 1.2 accordion pattern.

## Strengths & Gaps
- **Best at**: Maximum compositional flexibility -- the Paper foundation, slot-based architecture, and lack of group constraints let developers build virtually any accordion variant.
- **Missing**: No built-in accordion group management (single-expand requires manual state), and M3 itself having no accordion spec means the component lacks official design tokens or guidelines from Google's design team.
