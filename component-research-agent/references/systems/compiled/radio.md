---
component: radio
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Radio — All Systems Digest

## Material Design 3
**Approach**: Six interaction states defined (enabled/hovered/focused/pressed/disabled/error). No first-party RadioGroup component — grouping delegated to platform/framework (fieldset/legend or framework wrappers). Error message anchored below last item (group-level outcome, not per-item). Default preselection permitted when clear best option exists.
**Key decisions**:
- No first-party RadioGroup; multi-platform target means one abstraction would over-constrain platform implementations
- Error message below last item; radio errors are group outcomes — attaching to individual item implies that option is broken
- Default preselection acceptable when majority would choose it; reduces decision friction for obvious cases
**Notable API**: `checked`/`value`; `disabled` (visually present, just unavailable); `error` (triggers error visual on individual radio, group has validation problem)
**A11y**: Tab to group, arrow keys navigate+select within, no "focus without selection" state; role="radiogroup"+role="radio"+aria-checked; 48x48dp touch target around 20dp control.
**Best at**: Comprehensive 6-state visual spec leaving no interaction moment undefined. **Missing**: No first-party RadioGroup; grouping inconsistency across platform implementations.

## Spectrum (Adobe)
**Approach**: Radio cannot exist outside RadioGroup — enforced structural rule (throws if no RadioGroup ancestor). Vertical default. Dual validation modes (native blocks submission, aria advisory). isReadOnly distinct from isDisabled (focusable vs. removed from tab order). Locale-aware SR strings.
**Key decisions**:
- RadioGroup mandatory; lone radio is semantically meaningless; enforced at API level (throws), not just documentation
- Vertical default; horizontal requires explicit opt-in; maximizes readability and handles long labels without truncation
- `isReadOnly` keeps group focusable+navigable; disabled removes from interaction — critical for review/confirmation screens
**Notable API**: `orientation` (vertical default); `validationBehavior` (native|aria); `necessityIndicator` (icon|label, not just asterisk); `isEmphasized`; `validate` callback; `isReadOnly`
**A11y**: WCAG 2.1 AA; role="radiogroup"+role="radio"+aria-checked+aria-errormessage; locale-aware SR strings across 30+ languages; aria-required on group; RTL auto-handled.
**Best at**: Accessibility completeness + enforced correct structure for complex internationalized forms. **Missing**: No option count guidance; no sub-grouping for hierarchical option sets.

## Carbon (IBM)
**Approach**: Horizontal default (unique among all systems — IBM products are wide-format dashboards). No pre-selection by default; first item takes focus on Tab. `legendText` required prop on RadioButtonGroup. Dual controlled/uncontrolled API (`defaultSelected` vs. `valueSelected`). readOnly state built in.
**Key decisions**:
- Horizontal default; IBM Cloud/Watson/analytics platforms are desktop-first wide-format — vertical would be overridden everywhere
- No pre-selection; enterprise form submissions trigger real actions (provisioning, configuration); silent defaults cause unintended consequences
- `legendText` required (maps to `<legend>`); API-level enforcement of accessible group label — cannot render without it
**Notable API**: `orientation` (horizontal default); `legendText` (required, maps to legend); `defaultSelected` (uncontrolled) vs. `valueSelected` (controlled); `readOnly`
**A11y**: Native fieldset+legend+input[type=radio] — no ARIA polyfilling needed; SR announces "group, [legendText]" + each item with position/total; Space selects focused item when nothing selected.
**Best at**: Enterprise form hardening — legendText enforcement, dual controlled/uncontrolled API, readOnly state. **Missing**: No group-level error/validation display on RadioButtonGroup itself.

## Polaris (Shopify)
**Approach**: ChoiceList as preferred high-level abstraction — `allowMultiple` toggles radio→checkbox (same component, same props). RadioButton for custom layouts. Default selection strongly recommended (merchant research: reduces friction, confirms current configuration). Group-level error via ChoiceList.
**Key decisions**:
- ChoiceList's `allowMultiple` switches radio/checkbox; design iterations that change cardinality = one prop change, not component swap
- Default selection recommended; merchants adjusting settings are changing existing values, not making fresh choices from scratch
- `describedByError: true` on individual choices wires that choice to group error message via aria-describedby
**Notable API**: `allowMultiple` (radio/checkbox toggle); `choices` array (includes `describedByError` flag); `titleHidden` (hides group label visually, preserves for SR); `helpText` per RadioButton; `fill` (responsive width)
**A11y**: ChoiceList: role="group"+aria-labelledby; choices with describedByError get aria-describedby to error element; arrow keys select+navigate; Tab enters/exits group.
**Best at**: ChoiceList unified API for radio/checkbox with built-in group labeling and error handling. **Missing**: No explicit orientation prop on ChoiceList; horizontal requires dropping to individual RadioButton.

## Atlassian
**Approach**: Radio can exist standalone (unlike Spectrum's enforced group); RadioGroup is strongly recommended. No default selection — productivity software configurations affect permissions/workflow, accidental defaults carry consequences. Group-level errors linked via aria-describedby. 5-7 option ceiling documented.
**Key decisions**:
- Standalone Radio permitted; complex layouts (table rows, card-selection, draggable lists) conflict with standard group wrappers
- No default selection; Jira/Confluence permissions/workflow configs = accidental pre-selected submission has real consequences
- 5-7 option usability ceiling explicitly quantified; beyond that, use Select — one of the few concrete thresholds documented
**Notable API**: `isRequired` (group-level); `isDisabled` (group or individual); `defaultValue` (uncontrolled escape hatch, not recommended for production); `value`/`onChange` (controlled, primary pattern); `label` on RadioGroup
**A11y**: role="radiogroup"+role="radio"+aria-checked+aria-required+aria-describedby (error); wrapping at ends; error announced when focus enters group in error state.
**Best at**: Flexibility + structure balance — standalone Radio for complex layouts, RadioGroup for standard forms. **Missing**: Orientation docs don't address label wrapping/minimum width for horizontal responsive layouts.

## Ant Design
**Approach**: Two visual modes — standard circular radio and `optionType="button"` (button bar / segmented appearance). `options` array for data-driven declarative groups. Relies on native browser radio behavior via HTML `name` attribute (no custom keyboard JS). Error delegated to Form.Item.
**Key decisions**:
- `optionType="button"` renders radio semantics with button-bar visuals; filter bars/view-mode selectors need single-select semantics + compact visual
- `options` array maps API response directly to radios; no manual JSX mapping for dynamic option lists
- Native `name` attribute for browser keyboard navigation; no custom arrow-key JS — browser handles radiogroup natively
**Notable API**: `optionType` (default|button); `buttonStyle` (solid|outline, for button variant); `options` array; `size` (sm|middle|lg, affects button variant only); `name`
**A11y**: Native `<input type="radio">` semantics throughout; button variant announces as radio (not button); role="radiogroup" on group container; no custom ARIA polyfilling needed.
**Best at**: Visual flexibility — widest presentation range (circular to button-bar) without separate components. **Missing**: No built-in validation/error state; standalone Radio.Group outside Form has no error display.
