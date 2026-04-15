---
component: textfield
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Textfield — All Systems Digest

## Material Design 3
**Approach**: Exactly two variants — Filled (container + bottom indicator) and Outlined (full stroke border) — architecturally separate, not a style prop. Floating label animates from placeholder to label-above on focus. Character counter auto-renders when maxlength set.
**Key decisions**:
- Two discrete variants force intentional per-context choice; each can optimize interaction states independently
- Floating label eliminates separate static label, saves vertical space; wired via ARIA regardless of animation state
- Error text replaces helper text (not stacks), layout stable; "Error" prefix ensures colorblind users see validation state
**Notable API**: `leading-icon`/`trailing-icon` slots; `error`/`error-text`; `supporting-text`; `maxlength` (auto-triggers counter)
**A11y**: aria-describedby for error messages (announced on state change); aria-invalid for error; "Error" text prefix as non-color validation signal; label announced on focus regardless of animation.
**Best at**: Strong visual editability affordances with clear variant guidance. **Missing**: No search variant, no quiet/borderless style, no prefix/suffix addon pattern.

## Spectrum (Adobe)
**Approach**: Three components — TextField (single-line), TextArea (multi-line with resize/auto-grow), SearchField (search semantics + clear button). `isQuiet` removes border for dense contexts. Validation first-class via Form wrapper + FieldError component.
**Key decisions**:
- Three components instead of one; each owns its behavior and semantics without multiline/search flag overloading
- `isQuiet` variant for dense layouts (table cells, property panels); explicitly warns that surrounding structure is needed to maintain parsability
- Validation pushed to Form level with `validationBehavior` prop; consistent cross-field errors, automatic submit blocking
**Notable API**: `isQuiet`; `validationBehavior` (native|aria); `necessityIndicator` (asterisk vs. "(required)" text — supports both conventions)
**A11y**: Most complete validation story — aria-live for error announcements on state change; aria-describedby for both help and error; aria-invalid; Form handles aria-errormessage distribution.
**Best at**: Validation architecture — native constraint validation + custom functions + server-side errors + FieldError component. **Missing**: No prefix/suffix addon, no character counter, no connected-field pattern.

## Carbon (IBM)
**Approach**: Default (grid-aligned, helper text below) vs. Fluid (hangs into grid gutters, helper text moves to tooltip) — a true layout mode change, not a style toggle. Three sizes (SM=32px/MD=40px/LG=48px). Warning state alongside Error (unusual/allowed vs. invalid/blocked).
**Key decisions**:
- Fluid mode changes component's relationship to grid entirely; enterprise dashboards need fill-available inputs, not fixed-width
- Helper text moves to tooltip in Fluid; acknowledged tradeoff (reduced discoverability) accepted for density benefit
- `warn`/`warnText` separate from error; "unusual but allowed" vs. "invalid and blocks submission" are distinct feedback needs
**Notable API**: `size` (sm|md|lg); `warn`/`warnText`; `enableCounter`/`maxCount`; `inline` (label beside field for horizontal forms)
**A11y**: aria-describedby for helper/error/warning; aria-invalid for error; label association enforced at component level (difficult to create unlabeled field); warning announced on state change.
**Best at**: Fluid layout mode for enterprise dashboards — no other system offers true fluid inputs that change grid relationship. **Missing**: No quiet/borderless variant, no prefix/suffix addon, no search-specific variant.

## Polaris (Shopify)
**Approach**: Single TextField component handles single-line, multiline (via `multiline` prop), connected fields (via `connectedLeft`/`connectedRight`), and tag-style inputs (via `verticalContent`). Commerce-first: value+unit pairs are first-class patterns.
**Key decisions**:
- `connectedLeft`/`connectedRight` for value+unit pairs ($50.00 USD, 2.5 kg); border-radius merging + shared focus states built in
- `prefix`/`suffix` (non-editable inline decorators, inside border) distinct from connected fields (interactive elements, outside border)
- `verticalContent` renders tag chips above input within same field boundary; multi-value input without separate TagInput component
**Notable API**: `connectedLeft`/`connectedRight`; `prefix`/`suffix`; `verticalContent`; `clearButton`; `monospaced` (code/formatted data entry)
**A11y**: Prefix/suffix text included in accessible description (SR announces "$" before value); connected fields maintain individual labels; label required.
**Best at**: Commerce patterns — connected fields, prefix/suffix, and tag-style inputs for value+unit and multi-value scenarios. **Missing**: No quiet/borderless variant, no character counter, no multiple sizes.

## Atlassian
**Approach**: Three appearance modes — standard (bordered), subtle (transparent until focused), none (completely invisible). Designed for Jira/Confluence inline-edit: dozens of fields on issue view without visual overload. Paired with InlineEdit wrapper for read-to-edit transition management.
**Key decisions**:
- `appearance="subtle"` transparent until hover/focus; critical for Jira issue views with many inline-editable fields
- InlineEdit is separate wrapper component managing readView/editView toggle, confirm/cancel, Enter/Escape shortcuts
- `elemBeforeInput`/`elemAfterInput` slots accept any React element (not just text); icons, spinners, status indicators
**Notable API**: `appearance` (standard|subtle|none); `spacing` (compact|default); `elemBeforeInput`/`elemAfterInput` (flexible element slots)
**A11y**: Subtle/none appearances maintain same ARIA semantics as standard; InlineEdit announces read-to-edit transition; placeholder never replaces label (explicitly documented); aria-invalid for errors.
**Best at**: Inline-edit workflows — subtle/none appearances + InlineEdit wrapper is the most complete inline-editing story among all systems. **Missing**: No built-in validation display (composed separately), no character counter, no prefix/suffix addon.

## Ant Design
**Approach**: Input family with five sub-components (Input, Input.TextArea, Input.Search, Input.Password, Input.OTP). Four visual variants (outlined/filled/borderless/underlined). Addon (outside border) vs. prefix/suffix (inside border) as explicit distinct patterns.
**Key decisions**:
- Five sub-components with tailored defaults; OTP auto-advances focus segment-to-segment; Password toggles visibility; Search adds Enter-to-search
- `addonBefore`/`addonAfter` (outside border) + `prefix`/`suffix` (inside border) serve different decoration contexts; enterprise forms need both simultaneously
- Four visual variants — widest range researched; borderless for embedded, underlined for modern, filled for M3-like, outlined for standard
**Notable API**: `addonBefore`/`addonAfter`; `variant` (outlined|filled|borderless|underlined); `showCount`/`count` (custom counting logic, e.g., emoji=1 char); `Input.OTP`
**A11y**: A11y delegated to Form.Item; standalone Inputs outside Form need manual ARIA wiring; prefix/suffix available to SR as description; error/warning adds visual indicator only (Form.Item adds aria-invalid).
**Best at**: Variant richness and addon pattern — five sub-components + four visual variants + distinct inside/outside border decoration. **Missing**: A11y delegated to Form context; DOM recreation issue with dynamic prefix/suffix; no fluid mode.
