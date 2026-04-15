---
system: IBM Carbon
component: TextInput / TextArea
url: https://carbondesignsystem.com/components/text-input/usage/
last_verified: 2026-03-28
---

# TextInput

## Approach
Carbon separates text input into TextInput (single-line) and TextArea (multi-line), and then offers each in two visual styles: Default and Fluid. This dual-style system is one of Carbon's most distinctive decisions. Default inputs live flush with the column grid and have helper text below the field. Fluid inputs are visually larger, hang into the grid gutters, and move all helper information into a tooltip because the fluid layout provides no space beneath the field. IBM arrived at this dual system because their enterprise products range from standard form pages (where Default works) to dense data-entry dashboards and configuration panels (where Fluid's larger touch targets and visual prominence help users parse complex interfaces). Carbon also provides three height sizes (small, medium, large) for Default inputs, giving teams fine-grained control over density.

## Key Decisions
1. **Default vs. Fluid as separate layout modes** (HIGH) — This is not a simple style toggle. Fluid inputs change the entire layout relationship: they're architecturally taller, remove helper text space (pushing it to tooltips), and hang into grid gutters instead of aligning flush to columns. IBM built this because enterprise dashboards need inputs that can fill available space without fixed widths, while form pages need predictable, grid-aligned fields. The tradeoff is that switching between Default and Fluid is not trivial -- it affects surrounding layout, helper text strategy, and spacing.

2. **Helper text becomes tooltip in Fluid mode** (HIGH) — In Default mode, helper text sits persistently below the field. In Fluid mode, there is no room below the field, so all assistive text moves into a tooltip icon. This is a significant UX tradeoff: tooltips are less discoverable and not visible simultaneously with the input. Carbon acknowledges this is an exception to their own "no critical information in tooltips" rule, but accepted it because the density benefit of Fluid inputs outweighed the discoverability cost for their enterprise users.

3. **Three sizes plus one Fluid size** (MEDIUM) — Small (32px), Medium (40px), and Large (48px) for Default, plus a single larger Fluid height. The three Default sizes exist because Carbon is used across IBM's massive product portfolio where density requirements vary significantly. Small works for dense data tables, Large for accessibility-focused or touch-first contexts, and Medium as the general default.

4. **Warning state alongside Error** (MEDIUM) — Carbon provides both error (red) and warning (yellow) validation states. Many systems only offer error. Carbon added warning because enterprise workflows often need to communicate "this value is unusual but allowed" versus "this value is invalid and blocks submission." Warning replaces helper text just like error does, maintaining layout stability.

## Notable Props
- `size`: Accepts "sm", "md", "lg" -- three sizes that map to 32px, 40px, 48px respectively
- `warn` / `warnText`: Warning state separate from error -- a prop unique to Carbon's enterprise validation philosophy
- `enableCounter` / `maxCount`: Explicit character counter that must be opted into, with customizable max count independent of the HTML maxlength attribute
- `inline`: Places label beside the field instead of above it, useful for horizontal form layouts in configuration panels

## A11y Highlights
- **Keyboard**: Standard input keyboard behavior. Carbon bakes keyboard operation into all components, requiring no additional implementation from developers. Tab order follows DOM order.
- **Screen reader**: Both the label and helper text are programmatically surfaced to assistive technologies. When error or warning states activate, the message replaces helper text and is announced. Labels are required -- Carbon does not allow unlabeled fields without an approved accessibility exemption.
- **ARIA**: Uses aria-describedby to link helper/error/warning text to the input. aria-invalid for error states. The label association is enforced at the component level, making it difficult to accidentally create an inaccessible field.

## Strengths & Gaps
- **Best at**: The Fluid layout system for enterprise dashboards -- no other system offers a true fluid input mode that changes the component's relationship to the grid, plus the three-size system provides excellent density control.
- **Missing**: No quiet/borderless variant for inline-edit contexts, no built-in prefix/suffix pattern for currency or units, and no search-specific input variant (search behavior must be composed manually).
