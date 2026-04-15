---
system: Carbon (IBM)
component: Tag
url: https://carbondesignsystem.com/components/tag/usage/
last_verified: 2026-03-28
---

# Tag

## Approach

IBM Carbon's Tag component reflects enterprise data management priorities more than any other Tier 1 system. Carbon ships with four distinct tag variants — read-only, dismissible, selectable, and operational — that map directly to the information architecture patterns IBM teams encounter in data-heavy enterprise products: you might need a tag that communicates a classification (read-only), one that a user can remove (dismissible), one that acts as a toggle filter (selectable), or one that reveals additional related content (operational). The system's semantic color palette (gray, red, magenta, purple, blue, cyan, teal, green, cool gray, warm gray) is deliberately extensive because IBM's enterprise clients apply tags to business-domain data where color coding carries domain-specific meaning — a red tag in one system might mean "critical priority" while in another it means "marketing segment." Rather than reducing colors to a small set of status metaphors, Carbon gives teams the full palette and trusts them to assign meaning within their domain. The component also explicitly separates density (condensed vs. normal) as a first-class concern, acknowledging that enterprise data tables frequently require tag display at reduced size without sacrificing readability.

## Key Decisions

1. **Four tag variants for four interaction patterns** (HIGH) — Read-only (non-interactive label), dismissible (removable by user), selectable (toggleable filter), and operational (click to reveal related content). The WHY: enterprise products use tags in fundamentally different contexts that require different affordances. A read-only classification tag in a data table should not suggest it can be removed. A filter tag that acts as a toggle should look different from a tag that opens a popover. Carbon formalizes these as variants rather than leaving teams to implement them ad-hoc.

2. **Read-only tags are keyboard-unreachable by design** (MEDIUM) — The read-only variant explicitly does not receive keyboard focus. The WHY: a tag that presents no interactive affordance should not interrupt keyboard navigation flow. In dense enterprise data tables that might show dozens of read-only tags per row, forcing keyboard users to tab through every tag would make navigation unusable. This is a deliberate accessibility tradeoff in favor of efficiency — read-only tags are still accessible via screen reader browsing mode, just not tab-stop accessible.

3. **Operational tags for progressive disclosure** (MEDIUM) — The operational variant triggers a popover, modal, or breadcrumb view showing related tags or expanded information when clicked. The WHY: in IBM's data catalog and governance products, objects often carry dozens of tags that would overflow any reasonable UI if rendered inline. The operational variant provides a single tag as an entry point to a richer set, solving the overflow problem without pagination or truncation of the tag text itself.

4. **Semantic color system decoupled from status meaning** (HIGH) — Carbon provides 10 color families for tags without prescribing what each color means. The WHY: IBM serves industries where color semantics vary — healthcare, finance, government, manufacturing all have different color conventions. Prescribing "red = error" as in consumer systems would clash with domain-specific conventions. Carbon's palette-based approach lets each product team define its own color-to-meaning mapping while maintaining visual consistency through the shared token system.

5. **Size scale from xs to 2xl with density variants** (LOW) — Tags support six sizes (xs through 2xl) plus condensed/normal density switching. The WHY: IBM products are deployed across contexts ranging from compact data tables to prominent hero filters. The full size scale avoids the common anti-pattern of forcing CSS overrides to make tags fit a context they were not designed for.

## Notable Props

- `type` (read-only | dismissible | selectable | operational): Interesting because it's the primary variant switch — selecting the wrong type creates the wrong interaction affordance, making this prop the most consequential choice when using Carbon Tag
- `size` (sm | md | lg): More limited than the CSS scale — the React component exposes three sizes, with full scale available via CSS custom properties for fine-grained control
- `filter` (boolean): In older Carbon versions this was the way to enable dismissible behavior; the four-type model in v11 makes this more explicit
- `renderIcon`: Allows a custom leading icon, useful for domain-specific visual coding that complements color coding

## A11y Highlights

- **Keyboard**: Read-only tags receive no keyboard focus. Dismissible tags receive focus on the close icon via Tab, with Enter/Space activating removal. Selectable tags receive full-tag focus, with Enter/Space toggling selection state. Operational tags receive full-tag focus, with Enter/Space triggering the disclosure action.
- **Screen reader**: Carbon uses `cds--visually-hidden` and `cds--assistive-text` CSS classes to inject screen-reader-only text that provides context invisible to sighted users — for example, the close button on a dismissible tag gets hidden text like "Remove tag: [label]" to disambiguate when multiple tags are present.
- **ARIA**: Focus indicators use `outline: 2px solid var(--cds-focus, #0f62fe)` with `outline-offset: -2px`. The component follows IBM Accessibility Checklist requirements based on WCAG AA, Section 508, and European EN 301 549 standards. Selectable tags use appropriate checked/selected state communication.

## Strengths & Gaps

- **Best at**: Enterprise variant coverage — the four-type system (especially the operational variant for progressive disclosure) addresses real IBM enterprise product needs that other design systems leave unsolved, making Carbon the strongest reference for data-dense enterprise tag patterns.
- **Missing**: No explicit TagGroup wrapper component with built-in overflow management — Carbon documents individual tag behavior thoroughly but does not provide a coordinating container component, leaving overflow and wrapping logic to each product team.
