---
component: Description List
tier: 2
last_verified: 2026-03-31
---

# Description List — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Description List / DescriptionListTerm / DescriptionListDetails | Dedicated component using semantic `dl`/`dt`/`dd`. Renders a vertical list of term-description pairs. Supports standard Paste spacing tokens. Simple sub-component composition pattern. | high |
| Salesforce Lightning | No dedicated component (Record Detail) | Lightning's record detail layout displays field label-value pairs using the record form pattern. `lightning-record-view-form` and `lightning-output-field` handle Salesforce object metadata. No generic description list component. | medium |
| GitHub Primer | No dedicated component | Primer has no description list component. GitHub's repo "About" sidebar and PR metadata use custom key-value layouts. Closest primitives are `FormControl` label patterns or `Box` composition with `Text`. | medium |
| shadcn/ui | No official component (community recipe) | No official DescriptionList. Community implementations use a styled `dl` with Tailwind utilities. Some use a two-column grid pattern within Card. The shadcn "details" page patterns show key-value pairs composed from primitives. | high |
| Playbook | Detail / Title Detail | `Detail` component renders a label-value pair. `TitleDetail` is a specialized variant for larger title + detail combinations. Grouping multiple Detail components creates a description list pattern. Not a dl/dt/dd wrapper. | high |
| REI Cedar | No dedicated component | Cedar has no description list or key-value pair component. Product spec tables (dimensions, materials, features) use custom layout patterns in REI's product pages. | low |
| Wise Design | No dedicated component | Transfer detail screens (amount, recipient, reference) use internal key-value patterns. No reusable component published in the public DS. | low |
| Dell Design System | No dedicated component | Server configuration and system spec displays use tabular layouts internally. No public Description List component. | low |

## Key Decision Patterns

**Paste is the strongest T2 reference:** Twilio Paste provides a dedicated `DescriptionList` component family with `DescriptionListTerm` and `DescriptionListDetails` sub-components that render semantic `dl > dt + dd` HTML. The API follows the standard sub-component composition pattern — developers wrap term-detail pairs in the parent DescriptionList. Paste enforces semantic markup by design, making it one of the few systems (alongside Polaris) that guarantees correct HTML structure.

**Lightning's record-level abstraction:** Salesforce does not provide a generic description list, but its record detail pattern is functionally equivalent. `lightning-record-view-form` automatically renders all fields for a Salesforce object as label-value pairs with correct responsive layout. This is a higher-level abstraction — the description list is implicit in the record rendering, not a standalone layout component. Teams building non-Salesforce key-value displays must compose from scratch.

**Playbook's Detail component:** eBay's Playbook offers `Detail` as a label-value pair primitive. It is intentionally minimal — a single pair of label + value — with grouping handled by stacking multiple Detail instances. `TitleDetail` adds a larger title variant for section headers. The pattern is bottom-up composition rather than a wrapper component, which gives layout flexibility but lacks the semantic dl/dt/dd association.

**Semantic HTML is rare:** Only Paste renders semantic `dl`/`dt`/`dd` out of the box. Playbook uses divs for Detail. Lightning uses its own component markup. shadcn community recipes vary — some use semantic dl, others use divs with grid. The lack of semantic HTML in most implementations is a notable gap for accessibility.

**Horizontal vs vertical is under-specified:** No T2 system provides an explicit horizontal/vertical layout toggle comparable to Ant Design's `layout` prop. Paste renders vertical by default. Playbook's Detail is inherently vertical (label above value). Teams implementing horizontal side-by-side key-value layouts must apply custom styles.

**Action slots are absent:** No T2 system provides a per-row action slot (edit button, copy button, link) within description list items. This is a common product need (edit a field inline, copy a value) that is always handled at the application level.

## A11y Consensus
- Semantic `dl`/`dt`/`dd` HTML is the correct structure for description lists — it provides native term-description association without additional ARIA
- When semantic HTML is not used, `aria-labelledby` should connect each value to its label for screen reader association
- Description lists are non-interactive; no keyboard focus or button roles needed for static display
- Action buttons within value slots (edit, copy) should be independently focusable and labeled (e.g., "Edit email address" not just "Edit")
- Long description lists benefit from heading-based sections to aid screen reader navigation
- Paste's semantic approach is the accessibility reference — dl/dt/dd requires zero additional ARIA engineering

## Recommended Use
Reference Paste's DescriptionList for semantic HTML structure and sub-component composition pattern. Use Playbook's Detail for a minimal label-value pair primitive. For Salesforce-specific contexts, Lightning's record-view-form handles metadata display automatically. Always prioritize semantic `dl`/`dt`/`dd` markup over div-based composition for accessibility.
