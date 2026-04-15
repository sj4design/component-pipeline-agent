---
component: chip
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

# Chip — All Systems Digest

## Material Design 3
**Component:** Chip (4 types: Assist, Filter, Input, Suggestion)
**Approach:** The most granular chip taxonomy. Assist chips trigger smart actions (e.g., "Add to calendar"). Filter chips toggle on/off like checkboxes in multi-select. Input chips represent user-entered entities (email recipients, search tokens) with removal. Suggestion chips offer dynamic completions (e.g., smart reply). Each type has distinct semantics, icon placement rules, and interaction patterns. Chip set container groups chips with shared context.
**Key Decisions:**
- [HIGH] Four-type taxonomy enforces behavioral clarity — assist (action), filter (toggle), input (entity), suggestion (completion) are never conflated
- [HIGH] Filter chips use leading checkmark on selection; trailing icon reserved for dropdown menus — visual affordance communicates multi-select vs. menu
- [MED] Elevated vs. flat variants; elevated chips float above content (e.g., map overlays), flat chips sit inline — elevation communicates spatial context
**Notable API:** `type` (assist|filter|input|suggestion); `selected` (filter/input); `elevated`; leading icon (context) vs. trailing icon (action/dropdown); `disabled` vs. soft-disabled (focusable but inert)
**A11y:** Filter chips use `aria-pressed` for toggle state; input chip remove is a separate focusable button; chip set requires `aria-label` for group context; soft-disabled chips remain in tab order for discoverability.
**Best at:** Enforcing interaction-semantic clarity through type taxonomy — prevents ambiguous "is this a filter or a button?" confusion.
**Missing:** No chip input/combobox pattern for typing to add chips; chip set overflow/wrapping behavior unspecified.

---

## Spectrum (Adobe)
**Component:** TagGroup (container) + Tag (individual items)
**Approach:** Spectrum merges chip and tag into a single TagGroup system. Interactive behavior is determined by the container: `selectionMode="single"` produces radio-like choice chips, `selectionMode="multiple"` produces checkbox-like filter chips, `onRemove` enables removable input chips. Tags cannot exist outside a TagGroup — the container owns layout, selection state, keyboard navigation, and overflow. `maxRows` with built-in "show more" handles overflow.
**Key Decisions:**
- [HIGH] Container-first architecture — TagGroup manages selection mode, removal, overflow, and a11y labeling; individual tags are passive
- [HIGH] `selectionMode` prop on group (not individual tags) enforces consistent single-select vs. multi-select behavior across the set
- [MED] `maxRows` + "show more" built-in overflow — unique among systems; teams don't build custom truncation
**Notable API:** `selectionMode` (none|single|multiple); `onRemove` (receives Set<Key>); `maxRows`; `renderEmptyState`; `isInvalid`/`errorMessage` (form validation); `disabledKeys`
**A11y:** Arrow keys navigate within group; Delete/Backspace removes focused tag; focus auto-moves to next item after removal; mandatory `label`/`aria-label` on TagGroup (throws without it); selection announced via `aria-selected`.
**Best at:** A11y architecture — mandatory labeling, keyboard navigation, focus management after removal, built-in overflow.
**Missing:** No distinct chip type taxonomy (filter vs. input vs. suggestion behavior all live in one component); no elevated/floating chip variant.

---

## Carbon (IBM)
**Component:** Tag (with selectable and operational variants functioning as chips)
**Approach:** Carbon unifies chip and tag into one Tag component with four variants. Selectable tags function as filter chips — toggleable on/off for multi-select filtering in data views. Operational tags function as action chips — clicking reveals a popover or modal with related information. Dismissible tags function as input chips (removable entities). Read-only tags are display-only. The selectable variant is the primary chip equivalent.
**Key Decisions:**
- [HIGH] Selectable variant = filter chip; uses `selected` boolean toggle; visually distinct with filled background when active
- [HIGH] Operational variant = action chip; single click reveals progressive disclosure (popover/modal) — IBM data catalog pattern for expanding entity details
- [MED] Read-only tags intentionally keyboard-unreachable; prevents tab-stop pollution in dense data tables with dozens of tags per row
**Notable API:** `type` (read-only|dismissible|selectable|operational); `selected` (selectable only); `size` (sm|md|lg); `renderIcon`; `filter` (deprecated, use selectable); `onClose` (dismissible)
**A11y:** Selectable uses `aria-pressed` or `aria-selected` for toggle state; assistive text via `cds--visually-hidden` for remove buttons; IBM A11y Checklist (WCAG AA + Section 508).
**Best at:** Enterprise variant coverage — operational chip for progressive disclosure is unique.
**Missing:** No ChipGroup/TagGroup container with selection management or overflow; no suggestion chip type.

---

## Polaris (Shopify)
**Component:** Tag (removable) + Choice (selectable via ChoiceList)
**Approach:** Polaris splits chip behavior across components. Tag handles removable input chips (merchant-created product/order/customer tags). For filter chip behavior (selectable toggles), Polaris uses ChoiceList or Filters components rather than chip-styled toggles. Tags are optimized for the add/remove workflow: type a tag, press Enter to add, click X to remove. Mutually exclusive interactions — onClick OR onRemove OR url, never combined.
**Key Decisions:**
- [HIGH] No dedicated filter chip component — filtering uses ChoiceList/Filters with standard form controls, not chip toggles; Shopify merchants understand checkboxes better than chip toggles
- [HIGH] Mutually exclusive interaction props prevent ambiguous multi-affordance chips (a tag that is both clickable and removable)
- [MED] Auto-generated `aria-label` for remove button ("Remove [tag text]") — eliminates the most common a11y failure on removable components
**Notable API:** `onRemove` (auto-generates close button + aria-label); `onClick` (navigable tag); `url` (link tag); `disabled`; `accessibilityLabel` (override auto-generated label)
**A11y:** Auto-generated "Remove [tag text]" aria-label; native HTML semantics (links as `<a>`, buttons as `<button>`); focus management post-removal documented but not auto-enforced.
**Best at:** Merchant add/remove tag workflow with auto-accessible remove buttons.
**Missing:** No filter chip / selectable chip component; no chip group with overflow; no visual selection state on tags.

---

## Atlassian
**Component:** Tag (interactive) + Lozenge (status display)
**Approach:** Atlassian separates interactive chips (Tag) from status indicators (Lozenge). Tag supports removal with `onBeforeRemoveAction` for async confirmation — critical for Jira label removal which triggers automation and filter updates. Tags can link to filtered views via `href`. For filter chip patterns, Atlassian uses custom implementations in Jira's JQL filter bar rather than a dedicated chip component. Lozenge covers status display (In Progress, Done, etc.).
**Key Decisions:**
- [HIGH] Tag/Lozenge split — interactive user-managed labels (Tag) vs. system-assigned status indicators (Lozenge) are architecturally separate; prevents removable status badges
- [HIGH] `onBeforeRemoveAction` returns Promise for async confirmation before removal — Jira label removal has downstream effects (automations, filters, notifications)
- [MED] `removeButtonLabel` is required (not auto-generated) — forces developers to provide meaningful context rather than defaulting to generic "Remove"
**Notable API:** `onBeforeRemoveAction` (Promise-returning async confirmation); `removeButtonLabel` (required string); `href` (tag as navigation link); `appearance` (Lozenge variants: default|success|removed|inprogress|moved|new); `isBold`
**A11y:** `removeButtonLabel` required — explicit a11y contract with developers; async confirmation flows through keyboard activation; no custom keyboard navigation layer in TagGroup.
**Best at:** Async removal confirmation and domain-accurate Tag/Lozenge architectural split.
**Missing:** No dedicated filter chip / selectable chip component; no chip group overflow; filter chip patterns are custom per-product.

---

## Ant Design
**Component:** Tag (with CheckableTag sub-component functioning as chip)
**Approach:** Ant Design provides `CheckableTag` as the primary chip equivalent — a toggleable tag used for filter selection in admin dashboards. Regular Tag handles display and removal. CheckableTag uses `checked`/`onChange` for toggle state, visually filling on selection. The color system is the most expressive: 17+ named presets plus arbitrary hex values for database-driven category colors. Tag + CheckableTag cover filter chip, removable chip, and display tag patterns.
**Key Decisions:**
- [HIGH] CheckableTag is a dedicated sub-component for filter chip behavior — not a mode on Tag; separate import enforces intent
- [HIGH] Arbitrary hex color support alongside presets — SaaS platforms drive tag/chip colors from database; no mapping layer needed
- [MED] `onClose` + `event.preventDefault()` for removal confirmation — synchronous confirmation pattern (vs. Atlassian's async Promise)
**Notable API:** `<CheckableTag checked onChange>` (filter chip); `closable` (must opt-in, unlike Polaris's implicit onRemove); `onClose`; `color` (named preset|hex); `icon`; `bordered` (v5.4+)
**A11y:** CheckableTag communicates `checked` state; no auto-generated remove button aria-labels (more implementation burden); status presets pair color with text labels (not color alone).
**Best at:** Color expressiveness + CheckableTag for filter chip UIs in admin/dashboard contexts.
**Missing:** No ChipGroup with overflow management; no auto-generated remove aria-labels; no suggestion or assist chip types; more a11y burden than Spectrum/Polaris.
