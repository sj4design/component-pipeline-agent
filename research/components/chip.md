---
component: chip
date: 2026-04-17
mode: --max
systems: 24
scope: all
---

# Chip — Research Document (--max)

## Meta

| Field | Value |
|-------|-------|
| Date | 2026-04-17 |
| Mode | --max (all systems, all patterns) |
| Systems surveyed | 24 (6 Tier 1 + 8 Tier 2 + 10 Tier 3) |
| Scope | All chip variants, states, patterns |

---

## Sistemas sin componente dedicado

| System | Reason | Workaround |
|--------|--------|-----------|
| Twilio Paste | No chip component; Badge for status labels, Tag for dismissible tokens | Compose from Badge + Button for removable; ToggleGroup for filter behavior |
| GitHub Primer | No chip; Label for metadata, SegmentedControl for selection | Compose removable chip from Label + Button; SegmentedControl for filter |
| shadcn/ui | No unified chip; Badge handles display, Toggle handles selection | Badge + Button (removable); ToggleGroup (filter); consumer-composed |
| Playbook | Tag with optional close; no selectable/filter variant | Tag with onClose for removable; custom toggle state for filter |
| Radix UI | Badge (Themes) is display-only; no interactive chip primitive | ToggleGroup + Badge styling; full consumer composition required |
| Evergreen | Badge (display) + TagInput (type-to-add removal); no filter chip | TagInput for input chip pattern; no filter chip abstraction |
| GOV.UK | Tag is display-only status indicators; 10 semantic colors; strictly non-interactive | Custom filter patterns outside the design system |
| Nord | nord-badge for healthcare status labels; non-interactive display only | No chip interaction pattern; modal for data modification |
| Fluent 2 | Has Tag/InteractionTag/TagPicker — NOT absent; most granular T3 architecture | — |

---

## How Systems Solve It

### Material Design 3

Material Design 3 provides the most granular chip taxonomy in the industry, splitting chips into four semantically distinct types: Assist, Filter, Input, and Suggestion. Each type has distinct behavioral semantics enforced at the API level — you cannot accidentally use a Filter chip as an action chip because the props don't match. Assist chips trigger smart contextual actions (add to calendar, share content), Filter chips toggle on/off in multi-select groups with a leading checkmark on selection, Input chips represent user-entered entities (email recipients, search tokens) that can be removed, and Suggestion chips offer AI-generated completions (smart reply). The chip set container groups chips with shared behavioral context. Elevated vs. flat variants communicate spatial context: elevated chips float above content for map overlays, flat chips sit inline with content.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Four-type taxonomy (assist/filter/input/suggestion) | Prevents behavioral ambiguity — a chip that is both a filter and an action is confusing | H | Decide upfront which types you need; don't build a "generic chip" |
| Filter chip uses leading checkmark on selection | Visual affordance communicates multi-select vs. menu — trailing icon signals dropdown | H | Checkmark in leading position is the strongest selection signal |
| Elevated variant for floating contexts | Elevation communicates spatial context (on map, on image) vs. inline flat | M | Only needed if chips appear over media or non-white backgrounds |
| Soft-disabled (focusable but inert) | Discoverability — users can reach the chip to understand why it's unavailable | M | Prefer soft-disabled over hidden for inactive filter chips |

**Notable Props:** `type` (assist|filter|input|suggestion); `selected` (filter/input); `elevated`; leading icon; trailing icon (action/dropdown); `disabled` vs soft-disabled

**Accessibility:** Filter chips use `aria-pressed` for toggle state; input chip remove button is a separate focusable element; chip set requires `aria-label` for group context; soft-disabled chips remain in tab order.

---

### Spectrum (Adobe)

Spectrum merges chip and tag into a single TagGroup system where the container owns all behavioral logic. Interactive behavior emerges from the container configuration rather than individual item props: `selectionMode="single"` produces radio-like choice chips, `selectionMode="multiple"` produces checkbox-like filter chips, and `onRemove` on the group enables removable input chips. Individual tags are deliberately passive — they carry no selection state or removal capability of their own. This container-first architecture is unique in Tier 1 and ensures behavioral consistency across the entire set without per-item configuration. The built-in `maxRows` + "show more" overflow handling is the most complete overflow solution in Tier 1.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Container-first: TagGroup owns selection mode | Individual tags can't have inconsistent selection modes within a group | H | Use if you need guaranteed consistency across chip sets |
| `selectionMode` on group not on individual tags | Forces consistent behavior — no mixing single-select and multi-select chips in one group | H | Critical for filter panels with uniform behavior |
| `maxRows` + "show more" built-in overflow | Teams don't build custom truncation; reduces implementation variance | M | Most useful for filter bars with unpredictable tag counts |
| Mandatory `label`/`aria-label` on TagGroup | Throws at runtime without it — forces accessible group context | H | Use Spectrum's approach as the a11y standard |

**Notable Props:** `selectionMode` (none|single|multiple); `onRemove` (receives Set<Key>); `maxRows`; `renderEmptyState`; `isInvalid`/`errorMessage`; `disabledKeys`

**Accessibility:** Arrow keys navigate within group; Delete/Backspace removes focused tag; focus auto-moves to next item after removal; mandatory `label`/`aria-label` enforced at runtime; selection announced via `aria-selected`.

---

### Carbon (IBM)

Carbon unifies chip and tag into one Tag component with four operational variants. The selectable variant is the primary filter chip equivalent — toggleable on/off with filled background on activation, used extensively in IBM data catalog filter panels. The operational variant is unique in Tier 1: clicking it reveals a popover or modal with related information, functioning as an action chip with progressive disclosure. The dismissible variant covers input chip (removable entities) patterns. The read-only variant is intentionally keyboard-unreachable to avoid tab-stop pollution in dense data tables where dozens of tags may appear in a single row.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Operational variant (click → popover/modal) | IBM data catalog pattern: entity chips that expand to show detail without navigation | H | Unique pattern — use when chip click should reveal contextual detail |
| Read-only tags keyboard-unreachable by design | Prevents tab-stop pollution in dense data grids with many tags per row | H | Consider for display-only chips in dense tables |
| Selectable variant = filter chip with `selected` boolean | Simplest filter chip API; visual fill on activation | M | Adequate for standard filter panels |

**Notable Props:** `type` (read-only|dismissible|selectable|operational); `selected`; `size` (sm|md|lg); `renderIcon`; `onClose`

**Accessibility:** Selectable uses `aria-pressed` or `aria-selected`; assistive text via visually-hidden class for remove buttons; IBM A11y Checklist (WCAG AA + Section 508).

---

### Polaris (Shopify)

Polaris splits chip behavior across components rather than providing a unified chip. Tag handles removable input chips optimized for the merchant add/remove workflow (product tags, customer labels, order tags). Filter chip behavior uses ChoiceList or Filters components with standard form controls — Shopify's research found merchants understand checkboxes better than chip toggles, making this an intentional product decision rather than a gap. Interaction props are mutually exclusive by design: a tag has `onClick` OR `onRemove` OR `url`, never combined, preventing ambiguous multi-affordance chips.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| No filter chip — ChoiceList for filtering | Merchant research: checkboxes more familiar than toggleable chip patterns | H | Question whether chip toggles are the right affordance for your users |
| Mutually exclusive interaction props | Prevents chips that are simultaneously removable and clickable — clarifies affordance | H | Enforce this rule in your API design |
| Auto-generated "Remove [tag text]" aria-label | Eliminates the most common a11y failure on removable chips | H | Implement this pattern; never use generic "Remove" or "×" |

**Notable Props:** `onRemove` (auto-generates close button + aria-label); `onClick`; `url`; `disabled`; `accessibilityLabel`

**Accessibility:** Auto-generated descriptive aria-label for remove buttons; native HTML semantics (links as `<a>`, buttons as `<button>`); focus management post-removal documented.

---

### Atlassian

Atlassian separates interactive chips (Tag) from status indicators (Lozenge) as an architectural decision reflecting domain reality in Jira/Confluence: user-managed labels and system-assigned status indicators have fundamentally different affordances and should never be confused. Tag removal triggers downstream automations and filter updates in Jira, which necessitated the `onBeforeRemoveAction` Promise-returning async confirmation hook — a pattern unique in Tier 1. Tags can link to filtered views via `href`. The `removeButtonLabel` being required (not auto-generated) is an explicit a11y contract with developers.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Tag/Lozenge architectural split | Interactive user-managed labels vs. system-assigned status are distinct affordance categories | H | Model this split in your design token/variant system |
| `onBeforeRemoveAction` async confirmation | Jira label removal has downstream effects (automations, filters, notifications) | H | Use when removal has irreversible side effects |
| `removeButtonLabel` required (not auto-generated) | Forces meaningful context rather than defaulting to generic "Remove" | M | Required string is a better API than optional with bad default |

**Notable Props:** `onBeforeRemoveAction` (Promise-returning); `removeButtonLabel` (required); `href`; Lozenge `appearance` (default|success|removed|inprogress|moved|new); `isBold`

**Accessibility:** `removeButtonLabel` required — explicit a11y contract; async confirmation keyboard-navigable; Lozenge appearance pairs with text content.

---

### Ant Design

Ant Design provides `CheckableTag` as a dedicated sub-component for filter chip behavior — a separate import that enforces intentional use. Regular Tag handles display and dismissible patterns. The color system is the most expressive in Tier 1: 17+ named presets plus arbitrary hex values for database-driven category coloring — a critical feature for SaaS platforms where tag colors come from user configuration. The `onClose` + `event.preventDefault()` pattern enables synchronous removal confirmation without async Promises.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| CheckableTag as separate sub-component | Separate import enforces intent; avoids mode confusion on Tag | M | Separate components for distinct interaction modes is cleaner than a `mode` prop |
| Arbitrary hex color support | SaaS tag/category colors come from database; no mapping layer needed | H | If chip colors are user-configurable, arbitrary hex is required |
| `onClose` + `event.preventDefault()` | Synchronous confirmation pattern (vs. Atlassian's async Promise) | M | Simpler than async for low-stakes removal confirmation |

**Notable Props:** `<CheckableTag checked onChange>`; `closable`; `onClose`; `color` (named preset | hex); `icon`; `bordered` (v5.4+)

**Accessibility:** CheckableTag communicates `checked` state; no auto-generated remove aria-labels (more implementation burden); status presets pair color with text.

---

### REI Cedar (CdrChip)

The only Tier 2 system with a dedicated interactive chip component. CdrChip provides selectable behavior with built-in `aria-pressed` for toggle state, covering both filter chip (multi-select) and choice chip (single-select) use cases. Icon support is built in. WCAG 2.1 AA certified. As the primary interactive chip reference in Tier 2, Cedar validates that a single interactive chip component can serve both filter and choice patterns through group configuration.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Single component for filter + choice variants | Simplifies API surface; behavior emerges from group configuration | M | One chip component with group wrapper is cleaner than two separate components |
| Built-in `aria-pressed` | Toggle behavior correctly modeled as button, not checkbox | H | `aria-pressed` is the correct ARIA pattern for chip toggles |

**Notable Props:** `aria-pressed` toggle; icon slot; group wrapper for selection management; WCAG 2.1 AA

---

### Lightning Design System (Salesforce)

Lightning's Pill is purpose-built for the input chip pattern — a selected item in a lookup field or combobox that represents a user-chosen entity. Pill Container manages groups of removable pills. Unlike most systems, Lightning's Pill is specifically designed for CRM data-entry contexts: selecting an account, adding a contact to a list, or choosing a product variant. No filter chip variant exists — Salesforce's filtering patterns use faceted search and list views, not chip toggles.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| Pill purpose-built for lookup field context | CRM data entry: selected entities need visual representation in the input field | H | Input chip pattern for combobox/lookup UIs |
| Pill Container for group management | Consistent group layout without consumer management | M | Wrap removable chips in a managed container |

**Notable Props:** Icon/avatar support; remove button; Pill Container wrapper

**Accessibility:** Remove button with descriptive aria-label; Pill Container group semantics.

---

### Chakra UI

Chakra provides a compound Tag component (Tag + TagLabel + TagCloseButton) that covers the removable chip pattern. `colorScheme` system provides 10+ semantic color variants. No built-in selectable/toggle mode — filter chip requires external state management with Tag styling. TagCloseButton defaults to a generic close label, which is an a11y regression compared to Spectrum and Polaris auto-labeling.

**Notable Props:** `colorScheme`; `size` (sm|md|lg); `variant` (outline|solid|subtle); `TagCloseButton`

---

### Base Web

Base Web's Tag is the closest Tier 3 equivalent to a unified chip component. Callback presence determines mode: no callbacks = static chip, `onActionClick` = removable chip, `onClick` = clickable/selectable chip. The `kind` semantic system (neutral/primary/accent/positive/negative/warning) provides semantic color variants. This single-component approach covering all modes is elegant but conflates interaction patterns that benefit from explicit separation.

**Notable Props:** `kind` (neutral|primary|accent|positive|negative|warning); `onActionClick`; `onClick`; `disabled`

---

### Mantine

Mantine provides the reference Tier 3 filter chip implementation with Chip and Chip.Group. `Chip.Group` manages single-select (`type="radio"`) or multi-select (`type="checkbox"`) behavior with proper group semantics. The group manages selection state internally and switches between selection models through a single prop. This is the clearest filter chip panel implementation in the entire 24-system set.

**Notable Props:** `type` (radio|checkbox); `Chip.Group multiple`; `variant` (outline|filled|light); `color`; `size`

**Accessibility:** `role="group"` with `aria-label` on Chip.Group; `role="radio"` or `role="checkbox"` on individual chips; selection state via `aria-checked`.

---

### Fluent 2 (Microsoft)

Fluent 2 has the most architecturally granular approach in Tier 3: three separate components for three distinct use cases. Tag is display-only. InteractionTag is clickable/dismissible, explicitly separating the chip body click action from the dismiss action — enabling dual-action chips that can both navigate (body click) and be removed (dismiss button). TagPicker is a complete multi-value input system with type-to-filter, suggestions dropdown, and per-tag removal.

| What | Why | Impact | Para tu caso |
|------|-----|--------|-------------|
| InteractionTag separates body click from dismiss | Email recipient chips: click = open contact card, X = remove recipient | H | Dual-action chip is a common pattern; model the separation explicitly |
| TagPicker as complete multi-value input | Full combobox + chip management in one component | H | Reference for type-to-add chip input systems |

**Notable Props:** `InteractionTag` (body action + dismiss); `TagPicker` (combobox + chip management); `shape` (circular|rounded|square)

---

### Orbit

Orbit's Tag supports both filter and removable modes in a single component: `onClick` for toggle + `onRemove` for dismiss, with `aria-pressed` for toggle state. Designed for travel search filter chips. The dual-callback approach (onClick + onRemove simultaneously) enables a chip that is both filterable and removable, which Polaris explicitly prohibits.

**Notable Props:** `selected`; `onClick`; `onRemove`; `aria-pressed`

---

### Gestalt (Pinterest)

Gestalt's Tag uses `onRemove` for removable mode, `type` for semantic color (error/warning/default), `disabled` state. Remove button aria-label includes tag text — one of the systems that correctly implements descriptive remove labels. No selectable/filter chip variant.

**Notable Props:** `onRemove`; `type` (error|warning|default); `disabled`; descriptive remove aria-label

---

## Pipeline Hints

### Archetype Recommendation

**Primary Archetype: Interactive Chip with type taxonomy + removable token**

Rationale: The 24-system survey establishes two dominant archetypes: (1) filter/selection chips (toggleable, group-managed) and (2) input/removable chips (entity tokens with remove capability). These are functionally and semantically distinct enough to warrant separate component treatment (Fluent 2, M3, Ant Design approach) rather than a single component with callback-presence-determined mode (Base Web approach). The Mantine Chip + Chip.Group pattern is the cleanest filter chip API; the Spectrum TagGroup pattern is the strongest a11y architecture. For a production system, model filter chips as toggle buttons in a managed group, and input chips as removable tokens with explicit remove buttons.

---

### Slot Consensus Table

| Slot | N / systems-with-component | Notes |
|------|---------------------------|-------|
| leadingIcon | 18/18 | Universal; context icon (avatar, category icon) |
| label / text | 18/18 | Required; the chip's content |
| trailingIcon | 14/18 | Action icon (dropdown chevron, remove button, custom action) |
| removeButton | 12/18 | Separate focusable element; not merged with trailingIcon |
| checkmark | 8/18 | Filter chips; M3, Spectrum, Mantine, Cedar, Chakra, Orbit |
| avatar | 6/18 | Input chips for contact/entity tokens; M3, Lightning, Fluent 2 |
| badge/count | 3/18 | Count indicator within chip (rare) |

---

### Property Consensus Table

| Property | Values | Systems | Notes |
|----------|--------|---------|-------|
| `type` / `variant` | filter, input, assist, suggestion, display, selectable, operational, dismissible, read-only | M3, Carbon, Fluent 2, Ant, Cedar | Type taxonomy drives behavior |
| `selected` / `checked` | boolean | M3, Carbon, Ant, Orbit, Mantine, Cedar | Filter chip toggle state |
| `disabled` | boolean | All systems | Standard disabled state |
| `size` | sm, md, lg (Carbon); xs-xl (Mantine); sm-md-lg (Chakra) | 12/18 | Size variants for density control |
| `color` | semantic presets + arbitrary hex (Ant); named semantic (Base Web, Chakra, Gestalt) | 10/18 | Semantic and custom coloring |
| `elevated` | boolean | M3 | Floating context variant |
| `bordered` | boolean | Ant Design | Border style control |
| `onRemove` / `onClose` | function | Spectrum, Polaris, Atlassian, Ant, Gestalt, Chakra, Orbit | Removal callback |
| `onClick` | function | Most systems | Click/activation callback |
| `onBeforeRemoveAction` | Promise-returning function | Atlassian | Async confirmation before removal |
| `href` / `url` | string | Atlassian, Polaris | Chip as navigation link |
| `removeButtonLabel` / `accessibilityLabel` | string | Atlassian (required), Polaris (optional) | Descriptive remove button label |

---

### Boolean Properties Table

| Property | Default | Notes |
|----------|---------|-------|
| `selected` | false | Filter chip toggle |
| `disabled` | false | Standard disabled |
| `elevated` | false | M3 floating variant |
| `bordered` | false | Ant v5.4+ border toggle |
| `closable` | false | Ant Design; must opt-in (unlike Polaris implicit) |
| `startWithEditViewOpen` | false | Atlassian InlineEdit; not chip but related |
| `keepEditViewOpenOnBlur` | false | Related pattern |
| `fluid` | false | Full-width chip variant |
| `isInvalid` | false | Spectrum TagGroup form validation |
| `isBold` | false | Atlassian Lozenge bold variant |

---

### State Coverage Table

| State | Systems | Notes |
|-------|---------|-------|
| default | All | Resting display state |
| hover | All interactive | Hover highlight; elevation systems use shadow change |
| focus-visible | All | Ring/outline; mandatory for keyboard navigation |
| selected / active | Filter: M3, Spectrum, Carbon, Ant, Cedar, Mantine, Orbit | Background fill + checkmark/indicator |
| disabled | All | Reduced opacity; `aria-disabled="true"` |
| soft-disabled | M3 | Focusable but inert; discoverability pattern |
| loading / saving | Atlassian InlineEdit | Post-confirm saving state |
| error / invalid | Spectrum (isInvalid), Gestalt (type="error") | Validation error state |
| dragging | Some implementations | Chip reordering |
| removing | Some implementations | Exit animation before removal |

---

### Exclusion Patterns

- **Avoid mixing filter chip and input chip behavior on the same component** — Polaris enforces this with mutually exclusive props; Base Web's dual-callback approach causes ambiguity
- **Don't make read-only display chips keyboard-reachable** when they appear in dense data tables (Carbon's intentional decision)
- **Don't use chips for complex multi-value selection when a dropdown checkbox list is more familiar** (Polaris research finding)
- **Avoid color as the sole indicator of chip state** — selected state must have visual affordance beyond color change (checkmark, border, text weight change)
- **Don't omit group context** — lone chips without group semantics fail screen reader announcement
- **Avoid generic "Remove" or "×" as remove button labels** — include the chip content in the aria-label

---

### Building Block Candidates

| Candidate | Used by | Notes |
|-----------|---------|-------|
| ChipGroup / TagGroup | Spectrum, Lightning, M3 (chip set) | Container that owns selection mode, keyboard nav, overflow |
| TagPicker / ComboboxWithChips | Fluent 2, Evergreen (TagInput) | Full type-to-add multi-value input system |
| Lozenge / StatusBadge | Atlassian, Carbon (read-only), GOV.UK | Display-only status indicator — architecturally separate from interactive chip |
| OverflowButton ("show N more") | Spectrum (maxRows), M3 | Overflow handling for chip sets |

---

### Enum / Configuration Properties

| Property | Values |
|----------|--------|
| `type` (M3) | assist \| filter \| input \| suggestion |
| `type` (Carbon) | read-only \| dismissible \| selectable \| operational |
| `selectionMode` (Spectrum) | none \| single \| multiple |
| `kind` (Base Web) | neutral \| primary \| accent \| positive \| negative \| warning |
| `appearance` (Atlassian Lozenge) | default \| success \| removed \| inprogress \| moved \| new |
| `variant` (Chakra) | outline \| solid \| subtle |
| `variant` (Mantine) | outline \| filled \| light |
| `triggerType` (Ant) | icon \| text |
| `size` (Carbon) | sm \| md \| lg |
| `size` (Mantine) | xs \| sm \| md \| lg \| xl |

---

### A11y Consensus

| Aspect | Consensus | Notes |
|--------|-----------|-------|
| Role (filter chip) | `role="button"` + `aria-pressed` OR `role="checkbox"` + `aria-checked` | Both valid; `aria-pressed` more common (M3, Carbon, Cedar, Orbit) |
| Role (single-select group) | `role="radio"` within `role="group"` | Mantine with `type="radio"`; Spectrum single selection |
| Role (multi-select group) | `role="checkbox"` within `role="group"` | Mantine with `type="checkbox"` |
| Role (display chip) | None required or `role="status"` | GOV.UK, Carbon read-only |
| Group ARIA | `role="group"` + `aria-label` on container | Mandatory; Spectrum throws without it |
| Remove button label | `aria-label="Remove [chip content]"` | Never generic "Remove" or "×" |
| Keyboard (filter) | Space/Enter to toggle; arrow keys to navigate group | Spectrum, M3 chip set |
| Keyboard (input chip) | Delete/Backspace to remove focused chip | Spectrum, Fluent 2 |
| Keyboard (activation) | Enter/Space on display trigger | All interactive chips |
| Focus after removal | Auto-move to next chip or group | Spectrum spec; best practice |
| State announcement | `aria-live="polite"` for additions; `aria-pressed`/`aria-checked` for selection | Critical for dynamic chip sets |
| APG pattern | Button Pattern (filter) or Listbox Pattern (multi-select input) | Both are valid depending on context |

---

## What Everyone Agrees On

1. **Removable chips need descriptive remove button labels** — "Remove JavaScript" not "Remove" or "×". Spectrum (mandatory label), Polaris (auto-generated), Atlassian (required param), Gestalt (includes text), Base Web (includes text) all validate this.

2. **Filter chips use toggle semantics, not link or checkbox visuals** — whether implemented as `aria-pressed` (button model) or `aria-checked` (checkbox model), the toggle state must be programmatically determinable, not just visually indicated.

3. **Selection state cannot be color-only** — every system with filter chips provides a secondary visual indicator: checkmark (M3, Spectrum), filled background (Carbon, Mantine), border change (Cedar), text weight change (some implementations).

4. **Group context is mandatory for chip sets** — all systems that provide group containers require meaningful `aria-label`; Spectrum enforces this at runtime. Individual chips without group context fail screen reader announcement.

5. **Read-only / display-only chips should not be interactive** — they should not be in the tab order unless the user has a meaningful action to perform. Carbon's intentional decision to make read-only tags keyboard-unreachable is the right call for dense data contexts.

6. **Input chips (removable tokens) and filter chips (toggleable selectors) are different interaction models** that require different ARIA patterns, different keyboard behaviors, and different visual states. Systems that conflate them (Base Web, Orbit) require more consumer discipline to implement correctly.

7. **Container-managed selection** is preferred over per-chip selection state — Spectrum, Mantine, Cedar all manage selection at the group level, preventing inconsistent per-chip selection modes.

---

## Where They Disagree

### 1. Unified component vs. type taxonomy

**Option A: Single chip component, behavior from props** — Base Web (callbacks determine mode), Orbit (onClick + onRemove), Chakra (compound with close button)
**Option B: Multiple types/sub-components** — M3 (4 types), Carbon (4 variants), Fluent 2 (Tag + InteractionTag + TagPicker), Ant (Tag + CheckableTag)

- Adopters of A: Base Web, Orbit, Chakra, shadcn/ui composition
- Adopters of B: M3, Carbon, Fluent 2, Ant Design, Atlassian (Tag vs. Lozenge)
- Upside A: Smaller API surface; easier composition
- Downside A: Type ambiguity — "is this chip a filter or an action?" — harder to enforce semantics
- Upside B: Semantic clarity; correct ARIA roles per type; enforces design intent
- Downside B: Larger API surface; harder onboarding
- Para tu caso: If you have 3+ chip behaviors, Option B (type taxonomy) prevents behavioral drift. If you have 1-2 behaviors, Option A is sufficient.

---

### 2. Container-managed vs. individual chip selection state

**Option A: Container owns selection** — Spectrum (TagGroup), Mantine (Chip.Group), Cedar
**Option B: Individual chips manage their own selected state** — M3, Carbon, Ant CheckableTag

- Adopters of A: Spectrum, Mantine, Cedar
- Adopters of B: M3, Carbon, Ant Design
- Upside A: Enforces consistent selection mode across the set; enables correct group ARIA
- Downside A: Cannot use filter chips outside of a group context
- Upside B: More flexible; chips usable standalone
- Downside B: Inconsistent selection behavior when chips from different groups are mixed
- Para tu caso: Option A for design systems used in filter panels; Option B for one-off chip uses.

---

### 3. Auto-save on blur vs. explicit removal confirmation

**Option A: Immediate removal on click** — Polaris, Spectrum, Chakra
**Option B: Async confirmation before removal** — Atlassian (`onBeforeRemoveAction` Promise)
**Option C: Synchronous confirmation via event.preventDefault()** — Ant Design

- Upside A: Simplest; fastest workflow; undo pattern handles mistakes
- Downside A: No protection for removals with side effects
- Upside B: Safe for high-stakes operations (Jira label removal triggers automations)
- Downside B: Adds latency; complex async state to manage
- Para tu caso: Use Option A with an undo toast for most cases; Option B only when removal has irreversible downstream effects.

---

### 4. Chip vs. ChoiceList for filter patterns

**Option A: Chip toggles for filter UI** — M3 (filter chips), Carbon (selectable), Mantine, Cedar
**Option B: Checkboxes/ChoiceList for filter UI** — Polaris (intentional; Shopify research)

- Upside A: Compact; quick to toggle; visually distinct filter state
- Downside A: Toggle affordance less obvious for less tech-savvy users; can be confused with buttons
- Upside B: Familiar form control; clear checked/unchecked semantics for all user populations
- Downside B: Takes more space; visual weight doesn't match filter context
- Para tu caso: Developer/power-user products → chip toggles. Consumer/general audience → ChoiceList. B2B admin → chip toggles standard.

---

### 5. Separate Lozenge/Badge vs. display variant of chip

**Option A: Architecturally separate display component** — Atlassian (Tag + Lozenge), Ant (Tag + Badge), Carbon (Tag + Tag read-only)
**Option B: Chip with a display variant** — Chakra (variant="solid" without interaction), Gestalt (no onClick)

- Upside A: Prevents accidental interactivity on status indicators; clear visual/semantic vocabulary
- Downside A: Two components to maintain; teams must choose correctly
- Upside B: Unified component family; simpler import
- Downside B: Risk of making status badges accidentally interactive
- Para tu caso: If status chips and interactive chips coexist in the same UI, architectural separation (Option A) prevents category errors.

---

### 6. Overflow handling for chip sets

**Option A: Built-in maxRows + "show more"** — Spectrum
**Option B: Consumer-managed overflow** — Most other systems

- Adopters of A: Spectrum only
- Upside A: Consistent overflow UX; no custom implementation required
- Downside A: Less flexible; Spectrum's "show more" pattern may not match your design
- Para tu caso: Build overflow into ChipGroup if your filter panels have variable chip counts.

---

## Visual Patterns Found

| Pattern | Description | Systems |
|---------|-------------|---------|
| Filter chip panel | Horizontally scrolling or wrapping chip set for faceted search | M3, Carbon, Cedar, Mantine |
| Input chip row | Chips in a text input field representing selected entities | M3, Spectrum, Fluent 2 (TagPicker), Lightning |
| Suggestion chips | Below a prompt or search box; disappear after selection | M3 |
| Status lozenge row | Non-interactive status indicators in tables/cards | Atlassian (Lozenge), GOV.UK, Carbon (read-only) |
| Chip + overflow | N visible chips + "+X more" button | Spectrum (maxRows), custom |
| Category color chips | Database-driven hex-colored tags | Ant Design |
| Dual-action chip | Body clickable + separate dismiss button | Fluent 2 (InteractionTag) |

```
FILTER CHIP PANEL
┌─────────────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ ✓ JavaScript│  │   Python     │  │   TypeScript        │ │
│  └─────────────┘  └──────────────┘  └─────────────────────┘ │
│  ┌──────────┐  ┌────────────────┐  ┌──────────┐            │
│  │   React  │  │ ✓ Vue          │  │  +4 more │            │
│  └──────────┘  └────────────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────────┘

INPUT CHIP ROW (in text field)
┌─────────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────────────┐                 │
│  │ Alice Chen ×  │  │ Bob Martinez ×       │  [cursor]      │
│  └──────────────┘  └──────────────────────┘                 │
└─────────────────────────────────────────────────────────────┘

CHIP ANATOMY
┌────────────────────────────────┐
│  [●icon] [Label text]  [▶ ×]  │
│   lead    required    trail    │
└────────────────────────────────┘

OPERATIONAL/ACTION CHIP (Carbon)
┌─────────────────────┐
│  [●] Entity Name    │  → click → ┌──────────────────────┐
└─────────────────────┘            │  Detail Popover       │
                                   │  ─────────────────   │
                                   │  More info here...    │
                                   └──────────────────────┘

CHIP WITH OVERFLOW
┌─────────────────────────────────────────────────┐
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌───────┐ │
│  │ Filter1│  │Filter2 │  │Filter3 │  │ +5    │ │
│  └────────┘  └────────┘  └────────┘  └───────┘ │
└─────────────────────────────────────────────────┘

LOZENGE / STATUS CHIP (display only, no hover state)
┌─────────────────────┐
│  ● In Progress      │  ← no border-radius on interaction, no pointer cursor
└─────────────────────┘
```

---

## Risks to Consider

### HIGH — Conflating filter chip and input chip semantics

**Risk:** Building a single "chip" component that handles both filter toggle and removable token patterns through callback-presence detection leads to ARIA role mismatches. A removable input chip should use `role="button"` with labeled dismiss affordance; a filter chip should use `aria-pressed` toggle semantics or checkbox group semantics. Using the wrong ARIA pattern causes screen readers to announce incorrect interaction expectations.

**Mitigation:** Define chip types explicitly in your API. At minimum, distinguish `variant="filter"` (toggle semantics) from `variant="input"` (removable token semantics). Or use separate components for each interaction model.

---

### HIGH — Missing group semantics for chip sets

**Risk:** Filter chip panels without `role="group"` + `aria-label` on the container fail WCAG 1.3.1 (Info and Relationships). Screen reader users hear individual chip labels with no group context ("JavaScript, button, pressed" rather than "Language filters, JavaScript, toggle button, pressed").

**Mitigation:** Enforce group semantics at the container level. Make `aria-label` on ChipGroup required (Spectrum approach) or throw a warning in development mode.

---

### MEDIUM — Remove button aria-label is generic

**Risk:** "Remove ×" on all chips in a multi-chip context fails WCAG 2.4.6 (Headings and Labels) — users cannot distinguish which chip is being removed without navigating to each chip's label first. This is the most common chip accessibility failure.

**Mitigation:** Auto-generate descriptive remove button labels from chip content (Polaris approach). If exposing `removeButtonLabel` as a prop, make it required (Atlassian approach) rather than optional with a generic default.

---

### MEDIUM — Color as sole selection indicator

**Risk:** Using only background color change to indicate chip selection fails WCAG 1.4.1 (Use of Color). Users with color vision deficiencies cannot distinguish selected from unselected chips.

**Mitigation:** Add a secondary visual indicator: leading checkmark (M3), border change, text weight change, or icon change. Never rely on color alone.

---

### LOW — Overflow chip sets with no accessibility handling

**Risk:** "+N more" overflow buttons in chip sets typically hide chips from the DOM or use `display: none`, making overflow chips unreachable by screen readers.

**Mitigation:** Implement overflow as collapsed/expanded with `aria-expanded` on the overflow button. Collapsed chips should remain in the DOM with `hidden` attribute (not `display: none`) or manage focus correctly on expansion.

---

## Next Steps

1. **Decide type taxonomy** — which chip types does your system need? (filter, input, display, action/operational). Two types minimum.
2. **Model ChipGroup** — build the group container first; individual chip behavior emerges from group configuration (selectionMode, onRemove).
3. **Implement auto-generated remove labels** — derive from chip content, not a generic string.
4. **Define selection state visuals** — checkmark + filled background is the M3/Spectrum consensus; do not rely on color alone.
5. **Spec keyboard behavior** — filter chips: Space/Enter toggle, arrows navigate group; input chips: Delete/Backspace removes, arrow keys navigate.
6. **Separate display-only chips (Lozenge/Badge) from interactive chips** architecturally if both exist in your system.
7. **Address overflow** — if chip sets can grow beyond a fixed width, specify the overflow strategy (maxRows, scroll, +N more).
