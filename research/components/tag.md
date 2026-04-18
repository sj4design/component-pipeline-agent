---
component: tag
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Tag — Cross-System Research

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|------------|
| shadcn/ui | No interactive Tag/Chip; provides only static `Badge` via CVA | Static `Badge` for display-only; consumer composition for removable |
| Wise Design | Low confidence; currency/status indicator focus | `Badge` or custom implementation |
| Dell Design System | Low confidence; enterprise status labels only | `Badge` or custom implementation |

> Note: Most systems in this set have a tag/badge/chip equivalent. The component exists across 21 of 24 systems, with wide variation in naming and interaction model.

---

## How Systems Solve It

### Material Design 3 — Chip

M3 enforces interaction semantics through a four-type taxonomy: Assist (triggers an action), Filter (toggleable boolean state), Input (user-entered data such as an email address in a recipient field), and Suggestion (dynamic completion). These are not visual variants — they are behavioral contracts. A Filter chip and a Suggestion chip may look nearly identical but their ARIA roles, keyboard handlers, and state models differ. M3's philosophy is that visual similarity should not override behavioral clarity.

The `soft-disabled` state is unique among T1 systems: a soft-disabled chip remains focusable and keyboard-reachable but visually indicates it is unavailable. This serves screen reader discoverability — a user navigating by Tab can encounter the chip, hear its label, and understand that it exists but cannot be activated. Hard-disabled removes the chip from the tab order entirely. The chip set container requires an `aria-label` to provide collective semantic context.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Four-type taxonomy (Assist/Filter/Input/Suggestion) | Interaction behavior must be specified at design time, not implied by visual treatment | HIGH | Choose one type per use case; mixing types in the same chip set creates behavioral inconsistency |
| Soft-disabled vs. hard-disabled | Soft-disabled: SR users can discover the chip exists; hard-disabled: SR users cannot reach it — tradeoff between discoverability and navigation efficiency | HIGH | Use soft-disabled when the chip's existence is meaningful context even when unavailable |
| Chip set container `aria-label` required | Without collective context, SR users encounter a series of chips with no understanding of what they collectively represent | MED | Always label the group ("Applied filters", "Suggested tags") |
| Leading vs. trailing icon role differentiation | Leading icons provide context (category); trailing icons perform actions (remove) — visually identical placement but semantically distinct | MED | Never put a remove button in the leading icon position |

**Notable Props:** Type selection (Assist/Filter/Input/Suggestion) as a design-time constraint; `disabled` vs. soft-disabled state; leading icon (context) vs. trailing icon (action)

**Accessibility:** Filter chips: `aria-pressed` for toggle state. Input chip remove button: separate focusable element with "Remove [label]" aria-label. Chip set container: `aria-label` required.

---

### Spectrum (Adobe) — TagGroup + Tag

Spectrum's most significant architectural decision is that Tags cannot exist standalone — `TagGroup` is the mandatory parent. The group manages semantic identity (the label), layout (wrapping, overflow), removal coordination (focus management after removal), and form validation state. This prevents the most common anti-pattern: a set of tags without any accessible group label, where screen reader users encounter a sequence of labels with no collective context.

The `onRemove` handler doubles as a mode switch: its absence means read-only tags (no remove buttons rendered); its presence enables removable mode (remove buttons appear automatically). This prevents accidental destructive UI — a developer cannot forget to hide remove buttons, because they only appear when a handler is provided. The `maxRows` + "show more" overflow is unique among all 24 systems: built-in overflow management means teams do not need to implement their own "show 3 of 12 tags" logic.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Container-first architecture (TagGroup mandatory) | Group manages semantic identity, layout, and removal coordination — prevents piecemeal tags without group context | HIGH | Always model tags as a group, even for a single tag; the group provides the accessible label |
| `onRemove` as mode switch | Absence = read-only; presence = removable — prevents accidentally rendering remove buttons on display-only tags | HIGH | Do not render remove buttons as a separate prop; let the handler presence determine the mode |
| `maxRows` overflow with "show more" | Teams should not implement custom overflow logic for tag lists | MED | Use for any tag list that may have more tags than visible space allows |
| `renderEmptyState` | Empty tag groups need a meaningful UI state (e.g., "No tags added") | MED | Always provide an empty state for removable tag groups |
| TagGroup participates in form validation (`isInvalid`, `errorMessage`) | Tags used in multi-select inputs must communicate validation state at the group level | MED | Use for tag-based multi-select fields in forms |

**Notable Props:** `onRemove` (receives `Set<Key>`), `maxRows`, `renderEmptyState`, `errorMessage`/`isInvalid`, `href` (tags as navigation links)

**Accessibility:** Arrow keys navigate between tags; Delete/Backspace removes focused tag; focus moves to next tag after removal; "Remove [tag name]" labels auto-generated; mandatory group label API requirement.

---

### Carbon (IBM) — Tag

Carbon defines four variants with distinct interaction models: read-only (display, intentionally keyboard-unreachable), dismissible (removable, keyboard-accessible), selectable (toggle filter, `checked` state), and operational (click opens a popover or modal — the only variant that triggers a secondary overlay). The read-only variant being keyboard-unreachable is a deliberate decision: in dense data tables where a row may have 10-20 read-only tags, forcing Tab through each one would make keyboard navigation unusable. The visual design uses no interactive affordance to signal this.

The 10 color families in Carbon have no prescribed domain meanings — `red` does not mean error, `green` does not mean success. This is intentional for enterprise flexibility: teams assign color meanings contextually (Red = "Deprecated", Blue = "Experimental") without being locked to status semantics. The operational variant is unique: it is the only tag pattern across all 24 systems that uses a tag as an entry point to a progressive disclosure overlay.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Read-only keyboard-unreachable | Dense data tables with many read-only tags per row would force excessive Tab stops | HIGH | Confirm your read-only tags are truly decorative context, not interactive controls |
| Operational variant (opens popover) | IBM data catalog pattern: single tag entry point to dozens of related tags; prevents visual overflow | HIGH | Use when tag density would overflow the container; operational "view all" reduces visible count |
| Four distinct variants, not a prop combination | Interaction patterns are mutually exclusive; preventing combination prevents invalid states | HIGH | Choose one variant per use case; do not allow consumer prop combinations |
| 10 color families without prescribed meanings | Enterprise flexibility: teams map colors to domain meanings | MED | Define and document your own color-to-meaning map in product guidelines |

**Notable Props:** `type` (read-only/dismissible/selectable/operational), `size` (sm/md/lg), `renderIcon`, visually-hidden assistive text classes

**Accessibility:** Assistive text via `cds--visually-hidden` provides "Remove tag: [label]" context; IBM A11y Checklist (WCAG AA + Section 508 + EN 301 549); selectable uses checked/selected state communication; read-only: no interactive role.

---

### Polaris (Shopify) — Tag

Polaris optimizes for exactly one use case: merchant-supplied removable keyword tags (product tags, order tags, customer segment tags). The mutually exclusive interaction props are the most opinionated API decision: a tag can have `onClick`, `onRemove`, or `url`, but never more than one. This prevents "tag with a link AND a remove button" patterns, which Shopify research found confuse merchants about the primary action.

The auto-generated remove aria-label is the most DX-friendly a11y feature in T1: `onRemove` presence automatically generates a remove button with `aria-label="Remove [tag text]"` — the most commonly failed accessibility criterion on removable components. `size="large"` carries semantic meaning beyond visual size: it signals system-assigned provenance (admin-created) versus merchant-created tags — a rare example of size encoding domain meaning.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Mutually exclusive interactions (onClick OR onRemove OR url) | Tag with multiple affordances confuses merchants about the primary action | HIGH | Enforce mutual exclusivity if your tag has both a navigation destination and a remove action |
| Auto-generated remove `aria-label` from tag text | Eliminates the most common a11y failure on dismissible components | HIGH | Implement this pattern; "Remove Python" is always correct; "Remove" alone is never correct in multi-tag context |
| `size="large"` signals system-assigned provenance | Visual distinction between merchant-created and system-created tags | MED | Only useful if your product has a meaningful distinction between user-authored and system-authored labels |

**Notable Props:** `onRemove` (auto-generates close button + aria-label), `accessibilityLabel` (override auto-generated label), `disabled`, `size` (default/large)

**Accessibility:** Native HTML throughout (links as `<a>`, buttons as `<button>`); auto-generated remove aria-label; focus management post-removal documented (not auto-enforced).

---

### Atlassian — Tag + Lozenge + TagGroup

Atlassian formalizes the distinction between interactive user-managed labels (Tag) and non-interactive system-assigned status indicators (Lozenge) into separate components. This Tag/Lozenge split is the clearest formalization of this distinction across all 24 systems. Jira has both: user-authored labels on issues (Tag) and system workflow states like "In Progress," "Done," "Blocked" (Lozenge). Using the same component for both would require either allowing non-interactive remove buttons or adding interactive affordances to status indicators — both semantically wrong.

The `onBeforeRemoveAction` returning a Promise is unique across all 24 systems. Removing a Jira label is a data mutation with downstream effects (automation rules, filter queries, reporting) — async confirmation prevents accidental data loss. The Promise pattern is cleaner than Ant Design's `event.preventDefault()` approach for async confirmation because it handles loading states naturally.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Tag/Lozenge split (separate components) | User-authored interactive labels and system workflow status indicators have different semantics; one component cannot serve both correctly | HIGH | Consider a parallel Badge/Tag split if your product has both user-managed and system-assigned label types |
| `onBeforeRemoveAction` returning Promise | Removing a label is a data mutation; async confirmation handles loading state naturally | HIGH | Use for any removable tag where deletion has downstream effects or requires confirmation |
| `removeButtonLabel` required (not auto-generated) | Developer must provide meaningful context-specific label; prevents generic "Remove" labels | MED | Always include the tag name in the remove button label |
| Lozenge variants encode workflow states | `success`/`removed`/`inprogress`/`moved`/`new` map to Atlassian product workflow states for cross-product consistency | MED | Define a fixed set of status Lozenge appearances for your product's workflow states |

**Notable Props:** `onBeforeRemoveAction` (Promise), `removeButtonLabel` (required string), Lozenge `appearance`, `isBold` (weight switch), `href` (tags as links)

**Accessibility:** `removeButtonLabel` required (developer provides contextual label); async confirmation via keyboard activation; TagGroup has no custom keyboard navigation layer.

---

### Ant Design — Tag + CheckableTag

Ant Design has the most expressive color system among all 24 systems: 17+ named presets plus arbitrary hex values for user-defined category colors driven from a database. SaaS admin platforms need to display user-created category tags with arbitrary colors (team colors, project colors, label colors from a planning tool) — a mapping layer between database colors and preset names is unnecessary overhead. `CheckableTag` is a toggleable filter pill component: the interaction model is checkbox-like (selected/deselected) but the visual affordance is tag-like, appropriate for enterprise filter bars where checkbox visuals in a pill layout look out of place.

`onClose` with `event.preventDefault()` enables synchronous confirmation dialogs before removal — different from Atlassian's Promise pattern but effective for simple modal confirmation flows.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Arbitrary hex color support alongside presets | SaaS dashboards display tag colors from database; no mapping layer needed | HIGH | Use if your product stores user-defined tag colors; requires accessible contrast validation per color |
| `CheckableTag` for filter pills | Enterprise filter bars need toggle semantics with tag visual affordance; checkbox visuals look wrong in this context | HIGH | Use `CheckableTag` for filter panels; use regular `Tag` for display and dismissible use cases |
| `closable` must be explicit (not implicit like Polaris) | Ant Design requires opt-in to remove button, preventing accidental destructive UI | MED | Explicit opt-in is safer; implicit (Polaris `onRemove` presence) is more convenient |
| Status presets pair color with text | Status tags use both color and label text to convey meaning; color alone is insufficient | HIGH | Always pair status colors with status text in the tag label |

**Notable Props:** `color` (named preset or hex), `closable` boolean, `onClose` (with `event.preventDefault()` for confirmation), `<CheckableTag checked onChange>`, `icon` slot

**Accessibility:** No auto-generated remove aria-labels (more burden than Polaris); CheckableTag uses `aria-checked` state; status presets include text labels (not color alone).

---

### Twilio Paste — Tag

Paste's Tag is dismissible with a remove button and supports avatar integration (user avatar before the tag label). Tag groups provide layout coordination. The avatar integration is distinctive — ideal for people tags in multi-user selection interfaces (assignee selection, mention chips).

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| Avatar integration | People tags (user assignments, @mentions) need visual user identity | MED | Use for user/person entity tags; omit avatar slot for keyword/category tags |
| Tag group layout coordinator | Groups manage wrapping and spacing consistently | MED | Use TagGroup even for single tags to maintain consistent spacing |

**Notable Props:** Remove button; avatar option; tag group component

**Accessibility:** Remove button `aria-label` includes tag name; `role="list"` on tag group.

---

### Salesforce Lightning — Badge + Pill

Lightning separates static status badges (Badge) from removable selected items (Pill). Badge is for metadata labels and status indicators in data tables and list views. Pill is for removable selected items — most commonly the output of a multi-select lookup or combobox, where selected records display as removable pills. The separation mirrors Atlassian's Tag/Lozenge distinction from a different angle: Badge is always display-only, Pill is always interactive-removable.

**Notable Props:** Badge: semantic color system (success/error/warning/info). Pill: icon, avatar, remove button with accessible label.

**Accessibility:** Pill remove button `aria-label` includes item name; Badge is display-only with no interactive role.

---

### GitHub Primer — Label

Primer's Label is a color-coded category metadata component, not a removable tag. GitHub issues use user-assigned colors for Labels — the component supports 9 size/variant combinations. Not removable by default; removal is handled at the application level. This is a pure display component: metadata labels that identify and categorize, not user-controlled values.

**Notable Props:** 9 size/variant options; `sx` override; `as` polymorphic.

**Accessibility:** Display-only; no interactive role; color contrast must be validated per custom color.

---

### shadcn/ui — Badge

shadcn/ui's Badge uses CVA (class-variance-authority) variants: default, secondary, destructive, outline. Static display-only; no built-in remove functionality. Link-style badge for navigation labels. Teams that need removable tags compose their own by adding a button inside the badge or using community packages.

**Notable Props:** CVA variants (default/secondary/destructive/outline); link-style badge.

**Accessibility:** Display-only static badge requires no special ARIA; link-style badge uses native `<a>` element.

---

### REI Cedar — CdrChip

Cedar's CdrChip is specifically a selectable/filterable UI control — a toggle button with chip styling. Distinct from a label/badge (display metadata) and from a dismissible tag (removes from list). Selectable and filter variants are supported. Vue component with WCAG 2.1 AA compliance.

**Notable Props:** Selectable and filter variants; Vue; WCAG 2.1 AA.

**Accessibility:** `aria-pressed` for toggle state; keyboard-navigable.

---

### Radix UI (Themes) — Badge

Radix Themes provides Badge as a display-only primitive with a full color scale (solid/soft/outline/surface variants), `highContrast` option, and polymorphic `as` prop. Removable tags require consumer composition with an external close button. Radix Primitives (headless) has no tag/badge at all.

**Notable Props:** `variant` (solid/soft/outline/surface), `color`, `highContrast`, `as` (polymorphic)

**Accessibility:** Display-only; removable composition requires consumer to add accessible remove button.

---

### Chakra UI — Tag

Chakra's Tag uses a compound component architecture: Tag + TagLabel + TagCloseButton + TagLeftIcon/TagRightIcon. `TagCloseButton` ensures the remove button is a focusable element but defaults to a generic "Close" aria-label — insufficient in multi-tag contexts. `colorScheme` + variant system for visual customization.

**Notable Props:** Compound components; `colorScheme`; `variant` (solid/outline/subtle); `TagCloseButton` focusable element

**Accessibility:** `TagCloseButton` defaults to "Close" (not contextual — should be overridden with tag name); `colorScheme` variants must maintain WCAG contrast.

---

### GOV.UK — Tag

GOV.UK's Tag is for status indicators only: 10 semantic colors with explicit guidance mapping each color to a specific status type (blue = in progress, green = complete, red = rejected, orange = warning, purple = received, yellow = pending, pink = sent). The most opinionated color semantics in all 24 systems. Display-only; text must always convey meaning independent of color — the text-over-color principle is explicitly mandated.

**Notable Props:** 10 semantic color classes; display-only; no interactive role.

**Accessibility:** Text must convey status meaning independently of color (GOV.UK's explicit requirement); prevents colorblindness failures.

---

### Base Web (Uber) — Tag

Three modes via callback presence: static (no callbacks), removable (`onActionClick`), clickable (`onClick`). `kind` semantic system: neutral/primary/accent/positive/negative/warning. Remove button `aria-label` includes tag text — one of the few T3 systems to implement this correctly by default.

**Notable Props:** `kind` (neutral/primary/accent/positive/negative/warning), `onActionClick` (removable mode), `onClick` (clickable mode), `overrides`

**Accessibility:** Remove button `aria-label` includes tag text ("Remove travel" not "Remove"); Overrides for deep customization.

---

### Fluent 2 (Microsoft) — Tag + TagPicker

Fluent 2 provides the most complete T3 tag implementation: Tag with `dismissible` prop and TagPicker as a full multi-value input system — the Outlook recipients field pattern. TagPicker combines text input for typing, a filtered suggestion dropdown, selected tag display, and per-tag removal into a single component. No other system across all 24 provides a complete TagPicker out of the box; every other system requires composing this from separate components.

**Design Decisions:**

| What | Why | Impact | Para tu caso |
|------|-----|--------|--------------|
| TagPicker as complete multi-value input | Outlook, Teams, and SharePoint all use the same recipient/label-entry pattern; consistency requires one component | HIGH | Reference TagPicker for any type-to-add tag input pattern; do not compose from scratch |

**Notable Props:** Tag `dismissible`; TagPicker with text input + suggestion dropdown + selected tag display + per-tag removal

**Accessibility:** TagPicker announces tag additions/removals via `aria-live`; per-tag remove buttons include tag name in label.

---

### Gestalt (Pinterest) — Tag

`onRemove` callback switches to removable mode. Remove button `aria-label` includes the tag text ("Remove travel") — correctly contextual for multi-tag displays. `disabled` state. Minimal design aligned to Pinterest's card-based visual language.

**Notable Props:** `onRemove` (removable mode), `disabled`

**Accessibility:** Remove button `aria-label` includes tag text ("Remove [label]") by default.

---

### Mantine — Badge + Chip

Two-component split: Badge (display) and Chip (interactive selection/toggle). `Chip.Group` for multi-select filter panels with single or multi mode. Badge supports gradient variant. This is the clearest single/interactive split in T3.

**Notable Props:** Badge: `variant` (light/filled/outline/dot/gradient), `gradient`. Chip: `checked`, `onChange`. `Chip.Group`: single or multi mode.

**Accessibility:** Chip.Group uses `role="group"` with checkbox semantics; Chip uses `aria-checked`.

---

### Orbit (Kiwi.com) — Tag

Selected state for filter chips in flight search filters. `onClick` toggle + `onRemove` for separate selection and removal actions. `aria-pressed` for toggle state. Travel domain optimized.

**Notable Props:** `onClick` (toggle), `onRemove` (removal), `selected` state

**Accessibility:** `aria-pressed` for toggle; remove button with contextual aria-label.

---

### Evergreen (Segment) — Badge + TagInput

Two-component split: Badge (display) and TagInput (type to add, X to remove). TagInput with `values`/`onAdd`/`onRemove` for pipeline configuration tag entry. Clear separation between static labels and editable tag sets.

**Notable Props:** TagInput: `values`, `onAdd`, `onRemove`

**Accessibility:** TagInput announces additions/removals; remove buttons include tag name.

---

### Nord (Nordhealth) — Badge

Healthcare status labels: Active, Discharged, Urgent. Text-over-color principle; web component for clinical system portability. Non-interactive. Same principle as GOV.UK: text labels must carry meaning independently of color.

**Notable Props:** Web component; semantic healthcare status colors; non-interactive.

**Accessibility:** Text conveys status meaning independently of color; high-contrast mode support.

---

### Playbook (eBay/PayPal) — Tag

Categorical labels for sales/service workflow guidance. Dual React/Rails rendering. Medium confidence.

---

### Wise Design — Tag/Badge

Currency indicators and status labels. Low confidence — limited public documentation.

---

### Dell Design System — Tag/Badge

Enterprise status and category labels. Low confidence — limited public documentation.

---

## Pipeline Hints

### Archetype Recommendation

**Three distinct archetypes** should be modeled separately rather than as props on a single component:

1. **Tag (interactive-removable):** User-managed labels that can be removed. Needs: remove button with contextual `aria-label`, focus management post-removal, optional group wrapper.
2. **Badge/Label (display-only status):** System-assigned metadata labels. Needs: semantic color-to-status mapping, text conveys status independent of color, no interactive role.
3. **Chip/Filter (toggle selectable):** Filter options in a filter bar. Needs: `aria-pressed` or `aria-checked`, group semantics for multi-select, keyboard navigation.

Rationale: M3's four-type taxonomy demonstrates the cost of forcing all interaction models onto one component — the API becomes a combination of mutually exclusive props. Atlassian's Tag/Lozenge split and Mantine's Badge/Chip split both validate this separation in production systems.

---

### Slot Consensus Table

| Slot | Systems with it | Notes |
|------|----------------|-------|
| Label text | 24/24 | Required; always present |
| Leading icon/avatar | M3, Carbon, Polaris, Paste, Chakra, Fluent 2, Mantine, Orbit, Gestalt | Context visual; category icon or user avatar |
| Trailing remove button | M3 (Input), Spectrum, Polaris, Atlassian, Paste, Chakra, Carbon (dismissible), Base Web, Fluent 2, Gestalt, Orbit | Only renders when `onRemove`/`closable` provided or always for dismissible type |
| Group wrapper | Spectrum (required), M3 (ChipSet), Atlassian (TagGroup), Paste, Polaris (implicit) | Provides group label, layout, overflow |
| "Show more / collapse" overflow | Spectrum (`maxRows`) | Unique to Spectrum; others leave to consumer |
| Popover trigger (operational) | Carbon (operational type) | Unique to Carbon; opens secondary overlay |
| Selected/checked state indicator | M3 (Filter), Cedar (CdrChip), Mantine (Chip), Orbit, shadcn/ui | Checkmark or filled state for selected filter chips |

---

### Property Consensus Table

| Property | Values | Systems | Notes |
|----------|--------|---------|-------|
| `label` / `children` | `string` | All | Tag display text |
| `onRemove` / `onClose` / `dismissible` / `closable` | `() => void` / `boolean` | Spectrum, Polaris, Atlassian, Ant Design, Carbon (type), Fluent 2, Gestalt, Base Web | Presence of handler enables remove mode |
| `disabled` | `boolean` | M3, Polaris, Gestalt, Atlassian, Carbon | Prevents interaction; Carbon read-only is also non-interactive |
| `color` / `colorScheme` / `kind` / `variant` | Named preset or hex | All systems with visual variants | See enum section |
| `size` | `"sm" \| "md" \| "lg"` or `"xs" \| "s" \| "m" \| "l"` | Carbon, Chakra, GOV.UK, Mantine | Controls height, padding, font size |
| `icon` / `leadingIcon` / `avatar` | `ReactNode` | M3, Carbon, Ant Design, Paste, Chakra, Fluent 2 | Leading visual element |
| `href` / `url` | `string` | Spectrum, Atlassian, Polaris | Tag as navigation link |
| `checked` / `selected` / `value` | `boolean` | M3 (Filter), Cedar, Mantine (Chip), Orbit | Toggle state for filter chips |
| `removeButtonLabel` | `string` | Atlassian | Required accessible label for remove button |
| `accessibilityLabel` | `string` | Polaris | Override auto-generated remove button label |
| `maxRows` | `number` | Spectrum | Tag group overflow collapse |

---

### Boolean Properties Table

| Property | Default | Effect |
|----------|---------|--------|
| `closable` / `dismissible` | `false` | Shows remove button |
| `disabled` | `false` | Prevents interaction |
| `checked` / `selected` | `false` | Toggle state for filter chips |
| `isBold` | `false` | Bold weight for Lozenge (Atlassian) |
| `highContrast` | `false` | High-contrast mode for Radix Badge |

---

### State Coverage Table

| State | Systems with it | Notes |
|-------|----------------|-------|
| Default/resting | 24/24 | Display state |
| Hover | All interactive systems | Visual feedback on interaction |
| Focus | All interactive systems | Keyboard focus indicator |
| Selected/checked | M3 (Filter), Cedar, Mantine (Chip), Orbit, shadcn/ui | Filter chip toggle state |
| Disabled | M3, Polaris, Gestalt, Atlassian, Carbon | Non-interactive; visual desaturation |
| Soft-disabled | M3 | Focusable but not activatable |
| Loading/pending (remove) | Atlassian (`onBeforeRemoveAction` Promise) | Async removal in progress |

---

### Exclusion Patterns

- **Never combine** `href`/`url` (navigation) with `onRemove` (removal) on the same tag — Polaris explicitly enforces mutual exclusivity; both affordances on one element confuse users about the primary action.
- **Never use color alone** to convey status — GOV.UK and Nord enforce this explicitly; always pair status color with status text in the label.
- **`closable` and display-only (read-only)** are mutually exclusive — read-only/static tags (Carbon read-only, GOV.UK, Primer) should never render a remove button.
- **`CheckableTag`/`Chip` and remove button** are mutually exclusive — selectable filter chips do not have remove buttons; removal and selection are different interaction models.
- **Hex color values** require accessible contrast validation at render time — arbitrary hex (Ant Design) can easily fail WCAG 4.5:1 contrast ratio with tag background.

---

### Building Block Candidates

| Building block | Used by |
|----------------|---------|
| `<button>` for remove action | Polaris (auto), Spectrum, Carbon, Chakra, Gestalt, Base Web |
| `<a>` for navigable tags | Spectrum (`href`), Atlassian, Polaris (`url`), Primer |
| `role="list"` / `<ul>` for tag group | Paste, Polaris, Atlassian, Carbon (implicit) |
| `aria-label="Remove [tag name]"` on remove button | Polaris (auto), Spectrum (auto), Gestalt, Base Web |
| `aria-label` on group container | M3 (required), Spectrum (required) |
| `aria-pressed` for toggle chips | M3 (Filter), Cedar, Orbit |
| `aria-checked` + `role="checkbox"` for multi-select chips | Mantine (Chip.Group) |
| Visually-hidden text for status state | Carbon, GOV.UK |
| `aria-live="polite"` for tag add/remove announcements | Fluent 2 TagPicker, Evergreen TagInput |

---

### Enum/Configuration Properties

```
// Color system (superset across systems)
type TagColor =
  | "default" | "primary" | "secondary"          // neutral
  | "success" | "warning" | "error" | "info"     // semantic status
  | "processing" | "blue" | "green" | "red" | "orange" | "yellow" | "purple" | "cyan" | "magenta" | "lime" | "gold" | "volcano" | "geekblue"  // Ant Design presets
  | string  // hex (Ant Design)

// Size
type TagSize = "xs" | "sm" | "md" | "lg" | "xl"

// Variant/appearance
type TagVariant = "solid" | "soft" | "outline" | "surface" | "dot" | "filled" | "subtle"

// Interaction type (M3 taxonomy)
type ChipType = "assist" | "filter" | "input" | "suggestion"

// Lozenge appearance (Atlassian)
type LozengeAppearance = "default" | "success" | "removed" | "inprogress" | "moved" | "new"
```

---

### A11y Consensus

| Concern | Consensus | Notes |
|---------|-----------|-------|
| Remove button aria-label | "Remove [tag text]" — contextual, not "Remove" | WCAG 1.3.1; generic "Remove" fails in multi-tag context |
| Static/display tags | No special ARIA needed | Read naturally as inline text in surrounding content |
| Filter/toggle chips | `aria-pressed` (standalone) or `aria-checked` in `role="group"` | Multi-select filter group: Mantine Chip.Group pattern preferred |
| Tag group container | `aria-label` describing the group purpose | "Applied filters", "Suggested tags", "Skills" |
| Color-only status | Tag text must convey status independently of color | GOV.UK and Nord's explicit requirement; WCAG 1.4.1 |
| Focus after removal | Move focus to next tag; if last tag removed, move to group container or preceding element | Spectrum's focus management is the reference |
| TagInput announcements | `aria-live="polite"` announces additions/removals | Without this, keyboard-only users receive no feedback |
| APG pattern | No dedicated APG pattern for Tag/Badge | Filter chips: closest is Checkbox; removable tags: closest is Listbox item |

---

## What Everyone Agrees On

1. **Remove buttons must have contextual aria-labels** — "Remove Python" not "Remove." This is the most commonly failed accessibility criterion on removable tag components, documented explicitly by Polaris, Spectrum, Gestalt, Base Web, and Atlassian.
2. **Status tags must not rely on color alone** — the tag label text must convey the status meaning independently. GOV.UK and Nord enforce this explicitly; every system with semantic colors recommends it.
3. **Static/display tags need no special ARIA** — a non-interactive tag label reads naturally as inline text. Adding `role="tag"` (not a valid ARIA role) or other unnecessary roles creates confusion.
4. **Group context is required for semantic completeness** — a collection of tags without an accessible group label (Spectrum enforces this via required container; M3 requires ChipSet `aria-label`) leaves screen reader users without orientation context.
5. **Filter/toggle chips are not the same component as removable tags** — they have different ARIA roles (`aria-pressed` vs. remove button), different keyboard behaviors, and different visual affordances. Mantine's Badge/Chip split and Atlassian's Tag/Lozenge split both reflect this.
6. **Focus management after tag removal is required** — removing a tag must move focus to the next tag, the previous tag, or the group container. Without this, keyboard focus is lost after removal.
7. **Hex or arbitrary color requires accessible contrast validation** — Ant Design's hex color support is powerful but shifts the contrast responsibility to the implementer; automated contrast checking at render time is required.

---

## Where They Disagree

### 1. Single component vs. split components for display vs. interactive

- **Option A — Single component, mode determined by props (Chakra, Base Web, Gestalt, Polaris, Carbon):** One component handles both static display and interactive removal; `onRemove`/`closable` presence switches the mode.
  - Adopters: Chakra, Base Web, Gestalt, Polaris, Carbon (per-variant), Ant Design
  - Upside: One import; simpler mental model for cases where a tag is conditionally removable
  - Downside: Static display and interactive modes share the same API surface; risk of accidentally rendering remove buttons on display-only tags
  - Para tu caso: Use if the same tag may be removable in some contexts and display-only in others

- **Option B — Split: display component + interactive component (Mantine, Evergreen, Atlassian, Salesforce):** Badge/Label for display-only; Tag/Chip/Pill for interactive.
  - Adopters: Mantine (Badge + Chip), Evergreen (Badge + TagInput), Atlassian (Tag + Lozenge), Lightning (Badge + Pill)
  - Upside: Clean semantic separation; impossible to render a remove button on a display-only Badge; clearer documentation
  - Downside: Two imports; teams must know which to use; can lead to inconsistent styling between the two
  - Para tu caso: Use if your product has truly distinct display-only status labels and user-managed interactive tags

---

### 2. Remove button aria-label: auto-generated vs. developer-provided

- **Option A — Auto-generated from tag text (Polaris, Spectrum):** The component automatically generates "Remove [tag text]" without developer input.
  - Adopters: Polaris, Spectrum
  - Upside: Correct accessibility is the default; developers cannot accidentally leave a generic "Remove" label
  - Downside: Auto-generated label may not be contextually appropriate for all cases (Polaris provides `accessibilityLabel` override)
  - Para tu caso: Auto-generate with override capability; this is the best default

- **Option B — Developer-provided required (Atlassian):** `removeButtonLabel` is a required prop; no fallback.
  - Adopters: Atlassian
  - Upside: Developer explicitly provides the contextual label; prevents assumptions about tag text format
  - Downside: Adds required prop burden; teams can still provide generic "Remove" if they misunderstand the intent
  - Para tu caso: Acceptable when tags may have complex labels that don't map cleanly to "Remove [text]"

- **Option C — Not auto-generated, not required (Chakra, Ant Design):** Developer is responsible; defaults are poor.
  - Adopters: Chakra (`TagCloseButton` defaults to "Close"), Ant Design (no auto-label)
  - Upside: Flexibility
  - Downside: Most common a11y failure; "Close" in multi-tag context is meaningless to screen reader users
  - Para tu caso: Avoid this pattern; always enforce contextual remove labels

---

### 3. Color semantics: prescribed meanings vs. flexible palette

- **Option A — Prescribed semantic meanings (GOV.UK, Nord, M3 status):** Each color maps to a specific status type with documented meaning.
  - Adopters: GOV.UK, Nord, M3 (semantic types), Lightning (success/error/warning/info)
  - Upside: Cross-team consistency; prevents color fragmentation across the product
  - Downside: Cannot accommodate product-specific domain meanings beyond the preset set
  - Para tu caso: Use prescribed meanings for system-wide status labels where consistency is critical

- **Option B — Flexible palette without prescribed meanings (Carbon, Primer, Radix):** Color choices are up to the product team.
  - Adopters: Carbon (10 families, no meanings), Primer (user-assigned), Radix (full color scale)
  - Upside: Accommodates domain-specific color meanings; works for user-defined category colors
  - Downside: Color fragmentation across teams; different teams use different colors for the same status type
  - Para tu caso: Requires product-level documentation of color-to-meaning mapping; do not ship without it

- **Option C — Both: presets + hex override (Ant Design):** Named presets for common statuses plus hex for user-defined colors.
  - Adopters: Ant Design
  - Upside: Covers both system-assigned status tags and user-defined category tags
  - Downside: Hex values shift contrast responsibility to implementer; requires runtime contrast validation
  - Para tu caso: Use for products where users can create their own tagged categories with custom colors

---

### 4. Filter chip interaction model: aria-pressed vs. aria-checked

- **Option A — `aria-pressed` (toggle button model, M3 Filter, Orbit, Cedar):** Each filter chip is an independent toggle button.
  - Adopters: M3, Cedar, Orbit
  - Upside: Simpler per-chip; no group container needed; works for independent toggles
  - Downside: Does not communicate multi-select affordance to screen readers; "pressed" implies a one-time action more than a persistent selected state
  - Para tu caso: Use for independent filter toggles without group selection semantics

- **Option B — `aria-checked` + `role="group"` (Mantine Chip.Group model):** Filter chips in a group use checkbox semantics.
  - Adopters: Mantine (Chip.Group), implicit in some Tab-style navigation modes
  - Upside: Screen readers correctly identify the multi-select pattern; `role="group"` provides collective context
  - Downside: More markup; group container required
  - Para tu caso: Use for filter panels where multiple chips can be selected simultaneously

---

### 5. TagInput: built-in vs. consumer composition

- **Option A — Built-in TagInput component (Fluent 2, Evergreen):** Complete type-to-add-tags UX in one component.
  - Adopters: Fluent 2 (TagPicker), Evergreen (TagInput)
  - Upside: Consistent behavior and accessibility across all instances; one API for the whole pattern
  - Downside: Large component surface; harder to customize; couples input + suggestion + tag display
  - Para tu caso: Reference Fluent 2 TagPicker; build as a separate compound component rather than a prop on Tag

- **Option B — Consumer composition (all other systems):** Teams compose TagInput from separate input, combobox, and tag components.
  - Adopters: Spectrum, Atlassian, Carbon, most T2/T3 systems
  - Upside: Maximum flexibility; each piece is independently customizable
  - Downside: Re-inventing the same accessibility patterns (aria-live announcements, focus management) across products
  - Para tu caso: If TagInput is a frequent pattern in your product, build a dedicated TagInput component rather than expecting every team to compose it correctly

---

## Visual Patterns Found

### Pattern Summary Table

| Pattern | Systems | Notes |
|---------|---------|-------|
| Static display badge/label | GOV.UK, Primer, Radix, Nord, shadcn/ui, Atlassian (Lozenge) | No interactive affordance |
| Dismissible tag with remove button | Polaris, Spectrum, Paste, Carbon (dismissible), Chakra, Fluent 2, Base Web, Gestalt | Remove button on right |
| Filter chip / toggle chip | M3 (Filter), Cedar, Mantine (Chip), Orbit, Ant Design (CheckableTag) | Checkmark or filled state when selected |
| Tag with avatar/icon lead | Paste, M3 (Input), Fluent 2, Chakra | User identity in people tags |
| Color-coded category label | Primer (user-assigned), Ant Design (presets + hex), Radix | User-defined or domain-specific colors |
| Operational tag (opens overlay) | Carbon | Unique: tag opens popover/modal |
| TagInput (type to add) | Fluent 2 (TagPicker), Evergreen (TagInput) | Combobox-style tag entry |
| Inline overflow "show more" | Spectrum (`maxRows`) | Unique built-in overflow management |

---

### ASCII Wireframes

**Static display badge/label**

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌────────────┐                 │
│  │  In Progress│  │ Complete │  │  Rejected  │                 │
│  └──────────┘  └──────────┘  └────────────┘                 │
│  (blue)         (green)       (red)                         │
│  Text conveys status; color provides visual scanning only   │
└─────────────────────────────────────────────────────────────┘
```

**Dismissible tag with remove button**

```
┌─────────────────────────────────────────────────────────────┐
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │  Python  ╳   │  │  React   ╳   │  │  TypeScript ╳ │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
│                                                              │
│  ╳ = <button aria-label="Remove Python">                    │
│      Each button identifies WHICH tag it removes            │
└─────────────────────────────────────────────────────────────┘
```

**Filter chips — multi-select (Mantine Chip.Group pattern)**

```
┌─────────────────────────────────────────────────────────────┐
│  Cuisines:                                                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │▣ Italian │  │□ Mexican │  │▣ Thai    │  │□ Indian  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ▣ = selected (aria-checked="true")                         │
│  □ = unselected (aria-checked="false")                       │
│  role="group" aria-label="Cuisines" on container            │
└─────────────────────────────────────────────────────────────┘
```

**Tag with avatar lead (Paste/Fluent 2 people tag)**

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │  [AB] Alice Brown ╳  │  │  [CD] Chris Doe  ╳  │         │
│  └──────────────────────┘  └──────────────────────┘         │
│                                                              │
│  [AB] = avatar initials                                      │
│  ╳ = <button aria-label="Remove Alice Brown">               │
└─────────────────────────────────────────────────────────────┘
```

**Spectrum TagGroup with maxRows overflow**

```
┌─────────────────────────────────────────────────────────────┐
│  Skills: (maxRows=2)                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌──────┐  │
│  │ Python │  │ React  │  │ TypeSc │  │ Node   │  │ SQL  │  │
│  └────────┘  └────────┘  └────────┘  └────────┘  └──────┘  │
│  ┌────────┐  ┌─────────────┐                                │
│  │ Docker │  │ + 4 more ▼  │                                │
│  └────────┘  └─────────────┘                                │
└─────────────────────────────────────────────────────────────┘
```

**Carbon operational tag (opens overlay)**

```
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────────┐                                        │
│  │  +12 more tags ▼ │  ← operational: click opens popover  │
│  └──────────────────┘                                        │
│          ↓                                                   │
│  ┌────────────────────────────────┐                          │
│  │  All tags:                     │                          │
│  │  Python  React  TypeScript ... │  ← popover overlay      │
│  └────────────────────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

**TagInput / TagPicker (Fluent 2 pattern)**

```
┌─────────────────────────────────────────────────────────────┐
│  To:                                                         │
│  ┌────────────────────────────────────────────────────┐      │
│  │ [Alice Brown ╳] [Chris Doe ╳]  [type to add...]   │      │
│  └────────────────────────────────────────────────────┘      │
│                                                              │
│  role="combobox" on input                                    │
│  aria-live="polite" announces "[name] added" / "[name] removed"│
└─────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

### 1. Generic remove button label (HIGH)
"Remove" or "×" aria-labels on remove buttons are a frequent WCAG 1.3.1 failure in multi-tag displays. A screen reader user navigating a row of remove buttons hears "Remove, Remove, Remove" with no way to identify which tag each button removes.
**Mitigation:** Auto-generate "Remove [tag text]" as the default label (Polaris/Spectrum pattern). Never allow a generic "Remove" or icon-only remove button without an override that includes the tag name.

### 2. Color as the only status differentiator (HIGH)
Tags that use only color to convey status (red = error, green = success) fail WCAG 1.4.1 (Color) for colorblind users and in high-contrast mode where custom tag colors may become indistinguishable.
**Mitigation:** Always include status text in the tag label alongside status color. GOV.UK's model (text is the primary carrier of meaning; color provides visual scanning efficiency only) is the correct approach.

### 3. Focus management after tag removal (MEDIUM)
When a user removes a tag using the keyboard, focus is lost if it is not explicitly managed. This leaves keyboard-only users disoriented with no indication of where focus went.
**Mitigation:** Move focus to the next tag after removal; if the removed tag was the last, move focus to the group container or the tag input. Document the focus management strategy in the component API.

### 4. Unconstrained hex color contrast (MEDIUM)
Ant Design's arbitrary hex color support is the most powerful color system but requires runtime contrast validation — a tag with a light yellow background and white text fails WCAG at any size.
**Mitigation:** If implementing hex color support, integrate a runtime contrast check and warn or override to a safe text color when the computed contrast ratio falls below 4.5:1.

### 5. Filter chip and dismissible tag in the same component (LOW)
Building toggle/selectable behavior and removable behavior into the same component (as some T3 systems do) creates an API where `aria-pressed` (toggle) and the remove button (destructive action) coexist. This is semantically confusing and not supported by WCAG patterns.
**Mitigation:** Keep selectable filter chips (Chip) and dismissible tags (Tag) as separate components or variants with clearly different keyboard models and ARIA roles.

---

## Next Steps

1. **Define the component split first** — decide whether to ship one polymorphic Tag component or a Tag + Badge split. This determines the API surface and the accessibility model.
2. **Implement auto-generated remove button labels** from tag text as the default, with an override prop for atypical cases.
3. **Define color semantics** — if shipping semantic status colors, document the color-to-meaning mapping explicitly. If shipping a flexible palette, require a product-level color guide.
4. **Build focus management for removal** into the component from the start — post-removal focus is consistently the most-missed a11y requirement in tag implementations.
5. **Decide on TagInput** — if your product has type-to-add-tags flows (recipient fields, label entry), build a dedicated TagInput/TagPicker compound component rather than expecting consumers to compose it correctly each time.
6. **Filter chip ARIA model** — decide between `aria-pressed` (independent toggles) and `aria-checked` + `role="group"` (multi-select group) before speccing the Chip/filter component. This decision cannot be changed later without breaking existing implementations.
