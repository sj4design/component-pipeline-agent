---
system: Atlassian Design System
component: Tag + TagGroup + Lozenge (three related components)
url: https://atlassian.design/components/tag/examples
last_verified: 2026-03-28
---

# Tag / TagGroup / Lozenge

## Approach

Atlassian made one of the most architecturally significant decisions among Tier 1 systems: splitting what most systems handle with a single component into two distinct primitives — **Tag** (interactive, user-managed, removable) and **Lozenge** (non-interactive, system-assigned, status-communicating). This separation reflects how Jira and Confluence actually work: a Jira issue might carry both Labels (user-applied, removable tags on the issue detail page) and a Status badge (system-assigned, non-interactive Lozenge in the issue header). These two elements look visually similar but carry completely different semantics — one is data the user controls, the other is system state the user reads. Conflating them into a single component would require either overloading a Tag with non-interactive modes or using a Lozenge in contexts where it should be interactive, neither of which is correct. The **TagGroup** component handles layout coordination for collections of Tags, providing consistent spacing and wrapping behavior without prescribing interaction logic. Together, the three components model the full spectrum of label-like UI elements that appear across Atlassian's product suite.

## Key Decisions

1. **Tag vs. Lozenge split for interactive vs. static** (HIGH) — Tag handles user-created, potentially removable labels; Lozenge handles system-assigned, read-only status indicators. The WHY: Jira's information architecture separates user-authored metadata (labels, components, fix versions) from system-managed state (status, resolution, priority). Using the same component for both would force either the Tag to have a "non-interactive" mode (confusing) or the Lozenge to have a "removable" mode (semantically wrong). The split makes each component's purpose unambiguous and prevents cross-domain misuse.

2. **Lozenge appearance variants for status semantics** (HIGH) — Lozenge provides `success`, `removed`, `inprogress`, `moved`, `new`, and `default` appearance variants, each mapping to a semantic state in Atlassian's workflow model. The WHY: Jira and Confluence have standardized workflow states that appear across millions of issues and pages. The Lozenge variants encode those states into the design system so that all Atlassian products (and third-party Marketplace apps built on Forge) render workflow states consistently without each team defining their own color-to-state mapping.

3. **TagGroup as layout coordinator, not interaction controller** (MEDIUM) — TagGroup manages spacing and wrapping layout for a collection of Tags but does not own the removal or selection logic. Individual Tags still receive their own `onBeforeRemoveAction`/`removeButtonLabel` props. The WHY: Atlassian's products have diverse tag collection behaviors — some allow removal, some don't, some mix removable and non-removable tags in the same group. A TagGroup that controlled removal centrally would not accommodate these mixed-mode collections.

4. **onBeforeRemoveAction for async confirmation** (MEDIUM) — Tag provides `onBeforeRemoveAction` which can return a Promise, allowing teams to show a confirmation dialog before removal completes. The WHY: in Jira, removing a label from an issue is a persistent data mutation that may have downstream effects (breaking filter subscriptions, affecting automation rules). The async confirmation pattern lets product teams add appropriate warnings without requiring a custom wrapper component.

5. **Lozenge subtle vs. bold appearance** (LOW) — Lozenge supports both subtle (background-tinted) and bold (high-contrast) appearance modes for the same semantic color. The WHY: Atlassian products use Lozenges in contexts ranging from dense issue list tables (where subtle appearance reduces visual noise) to prominent status headers (where bold appearance aids quick scanning). Providing both modes from the same component avoids teams reaching for different components or CSS overrides to achieve appropriate visual weight.

## Notable Props

- `onBeforeRemoveAction` (Tag): Can return a Promise — this async removal confirmation pattern is unique among Tier 1 systems and directly addresses enterprise data mutation safety
- `removeButtonLabel` (Tag): Required string that becomes the aria-label on the remove button — unlike Polaris which auto-generates it, Atlassian requires teams to provide it, ensuring the label is meaningful in context rather than relying on auto-generation
- `appearance` (Lozenge): Encodes workflow-state semantics (inprogress, moved, removed) — these are Atlassian-domain terms, not generic status terms, reflecting the system's Jira/Confluence heritage
- `isBold` (Lozenge): Switches between subtle and bold visual weight without changing semantic meaning — useful for the same status indicator in different layout contexts
- `href` (Tag): Tags can be navigation links, supporting the Jira pattern of clicking a label to navigate to a filtered issue list

## A11y Highlights

- **Keyboard**: Tags receive focus via Tab. Removable tags expose the remove button as a separate Tab stop. `onBeforeRemoveAction` flows through keyboard activation — pressing Enter/Space on the remove button will trigger the async confirmation before removal. TagGroup does not add its own keyboard navigation layer; focus order follows DOM order within the group.
- **Screen reader**: `removeButtonLabel` is required and becomes the `aria-label` on the remove button — Atlassian requires this to be meaningful in context (e.g., "Remove JavaScript from issue labels" rather than just "Remove"). Lozenge text is directly readable. Atlassian's design system ships components with built-in ARIA usage as a baseline, with documentation noting teams must still review end-to-end interaction flows.
- **ARIA**: Tags use native button semantics for remove actions. Lozenge uses appropriate inline element semantics for non-interactive status display. The TagGroup does not impose a `role="list"` or similar container role — layout is managed via CSS, with semantic meaning derived from individual tag semantics.

## Strengths & Gaps

- **Best at**: Domain-accurate component splitting — the Tag/Lozenge distinction is the clearest formalization among Tier 1 systems of the interactive-label vs. status-indicator divide, making the Atlassian approach the best reference for any design system that needs both user-managed tags AND system-assigned status badges.
- **Missing**: No built-in overflow behavior in TagGroup — Atlassian's TagGroup handles spacing but does not provide the "show more" collapse pattern that Spectrum's `maxRows` offers, meaning teams with large tag collections must implement their own overflow handling.
