---
component: tag
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Tag — All Systems Digest

## Material Design 3
**Approach**: Called "Chip." Four types enforcing interaction semantics: Assist (trigger action), Filter (toggle), Input (user-entered data like email), Suggestion (dynamic completion). Soft-disabled distinct from disabled (focusable + discoverable). Chip set container requires aria-label.
**Key decisions**:
- Four-type taxonomy; visual similarity doesn't override behavioral clarity — doing/filtering/confirming/accepting need distinct types
- Soft-disabled keeps chips keyboard-reachable; hard-disabled removes from tab order — screen reader discoverability vs. navigation efficiency tradeoff
- Container aria-label required; without it SR users encounter chips with no collective context
**Notable API**: Type selection (Assist/Filter/Input/Suggestion) as design-time constraint; leading (context) vs. trailing (action) icon role differentiation; `disabled` vs soft-disabled state
**A11y**: Filter chips use aria-pressed for toggle; Input chip remove button is separate focusable element; chip set container aria-label required (unusual pattern vs. other systems).
**Best at**: Enforcing interaction-semantic clarity through type taxonomy. **Missing**: No TagGroup overflow/wrapping behavior spec; chip-list overflow left to implementers.

## Spectrum (Adobe)
**Approach**: TagGroup is mandatory parent (Tags cannot exist standalone). Mandatory labeling enforced at API level (throws without label/aria-label). `maxRows` + "show more" collapse for overflow. `onRemove` presence enables remove mode (remove buttons only appear when handler provided). Tags can be navigation links.
**Key decisions**:
- Container-first architecture; group manages semantic identity, layout, and removal coordination — prevents piecemeal tags without group context
- `onRemove` as mode switch; absence = read-only tags; presence = editable/removable — prevents accidental destructive UI
- `maxRows` overflow collapse; Spectrum's built-in "show more" pattern unique among systems (teams don't need custom overflow logic)
**Notable API**: `onRemove` (receives Set<Key>); `maxRows`; `renderEmptyState`; `errorMessage`/`isInvalid` (TagGroup participates in form validation); `href` (tags as navigation links)
**A11y**: Arrow keys navigate tags; Delete/Backspace removes focused tag; focus moves to next tag after removal; auto-generated "Remove [tag name]" labels; mandatory group label API requirement.
**Best at**: A11y architecture — mandatory labeling, keyboard removal, focus management after removal, built-in overflow. **Missing**: No semantic status color system (success/warning/error).

## Carbon (IBM)
**Approach**: Four variants — read-only, dismissible, selectable (toggle filter), operational (click reveals popover/modal). Read-only tags intentionally keyboard-unreachable (tab-stop efficiency in dense tables). 10 color families without prescribed domain meanings.
**Key decisions**:
- Four variants for four interaction patterns; read-only should not suggest clickability in dense data table rows
- Read-only keyboard-unreachable; dozens of read-only tags per data row would make keyboard navigation unusable
- Operational variant for progressive disclosure; single tag entry point to dozens of related tags (IBM data catalog pattern)
**Notable API**: `type` (read-only|dismissible|selectable|operational); `size` (sm|md|lg); `renderIcon` (custom leading icon for domain visual coding); visually-hidden assistive text classes
**A11y**: Assistive text via `cds--visually-hidden` provides "Remove tag: [label]" context; IBM A11y Checklist (WCAG AA + Section 508 + EN 301 549); selectable uses checked/selected state communication.
**Best at**: Enterprise variant coverage — especially operational variant for progressive disclosure. **Missing**: No TagGroup wrapper with overflow management.

## Polaris (Shopify)
**Approach**: Minimal — optimized for merchant-supplied removable keywords (product/order/customer tags). Mutually exclusive interactions (onClick OR onRemove OR url, never combined). Auto-generated "Remove [tag text]" aria-label. Large size signals system-assigned vs. merchant-applied tags.
**Key decisions**:
- Mutually exclusive interaction props; tag with multiple affordances confuses merchants about primary action
- Auto-generated remove aria-label from tag text; eliminates most common a11y failure on dismissible components
- `size="large"` semantically signals system-assigned provenance (not just bigger); rare example of size carrying domain meaning
**Notable API**: `onRemove` (auto-generates close button + aria-label); `accessibilityLabel` (override auto-generated label for context); `disabled`; `size` (default for merchant tags, large for system tags)
**A11y**: Native HTML semantics throughout (links as `<a>`, buttons as `<button>`); focus management post-removal documented (not auto-enforced); remove button aria-label auto-generated.
**Best at**: Merchant removable-tag workflow — auto-aria-label, mutually exclusive interactions, add/remove UX. **Missing**: No semantic status colors, no TagGroup overflow.

## Atlassian
**Approach**: Three-component system — Tag (interactive, user-managed), Lozenge (non-interactive, system-assigned status), TagGroup (layout coordinator). Tag/Lozenge split is the clearest formalization of interactive-label vs. status-indicator separation. `onBeforeRemoveAction` supports async confirmation before removal.
**Key decisions**:
- Tag/Lozenge split; Jira has both user-authored labels (Tag) and system workflow states (Lozenge) — same component for both would require either interactive non-interactive modes or removable status indicators, both wrong
- Lozenge variants encode Atlassian workflow states (success/removed/inprogress/moved/new) for cross-product consistency in Jira/Confluence/Forge apps
- `onBeforeRemoveAction` returns Promise; removing a Jira label is a data mutation with downstream effects (automation, filters) — async confirmation prevents accidental data loss
**Notable API**: `onBeforeRemoveAction` (Promise-returning async confirmation, unique among systems); `removeButtonLabel` (required string, not auto-generated); `appearance` on Lozenge; `isBold` (Lozenge weight switch); `href` (tags as filtered-list navigation links)
**A11y**: `removeButtonLabel` required (developer must provide meaningful context, not auto-generated); async confirmation flows through keyboard activation; TagGroup has no custom keyboard navigation layer.
**Best at**: Domain-accurate Tag/Lozenge split and async removal confirmation. **Missing**: No overflow behavior in TagGroup; teams implement "show more" manually.

## Ant Design
**Approach**: Most expressive color system — 17+ named presets + arbitrary hex values (for user-defined category colors from database). `CheckableTag` for toggleable filter pills. Status colors (success/processing/error/warning) consistent with Alert/Badge/Result. `onClose` supports `event.preventDefault()` for confirmation.
**Key decisions**:
- Hex color support alongside presets; SaaS admin platforms drive tag colors from DB — no mapping layer needed
- CheckableTag for filter pill UI; filter tags shouldn't look like checkboxes/radios in enterprise dashboards — tag affordance with toggle semantics
- `onClose` + `event.preventDefault()` for confirmation; different from Atlassian's Promise pattern but achieves same result for sync confirmation dialogs
**Notable API**: `color` (named|hex); `closable` (boolean, must opt-in explicitly unlike Polaris's implicit onRemove); `onClose`; `<CheckableTag checked onChange>`; `icon` slot
**A11y**: No auto-generated remove button aria-labels (more implementation burden than Polaris); CheckableTag uses checked state communication; status presets pair color with text labels (not color alone).
**Best at**: Color expressiveness + CheckableTag for filter UIs. **Missing**: No TagGroup with overflow; no auto-generated remove aria-labels; more a11y implementation burden than Spectrum/Polaris.
