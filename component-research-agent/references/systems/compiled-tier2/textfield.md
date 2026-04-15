---
component: TextField
tier: 2
last_verified: 2026-03-28
---

# TextField — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Input + FormField | Separated: Input (the element) + FormField (label/help/error wrapper) | high |
| Salesforce Lightning | Input | lightning-input LWC; type attribute for all input types; inline validation | high |
| GitHub Primer | TextInput | leadingVisual/trailingVisual slots; TextInputWithTokens for tag input | high |
| shadcn/ui | Input | Minimal unstyled base; paired with FormField/Label/FormMessage from shadcn Form | high |
| Playbook | TextInput | Text entry; dual React/Rails | medium |
| REI Cedar | CdrInput | Vue input; background color variants; WCAG 2.1 AA | medium |
| Wise Design | TextField | Financial form fields; account/transfer data entry | low |
| Dell Design System | TextField | Enterprise configuration form fields | low |

## Key Decision Patterns

**Input vs. FormField separation:** Paste separates the Input element from the FormField wrapper (label, help text, error message). shadcn/ui uses a similar separation. Lightning bundles everything in lightning-input. This separation makes inputs more composable but requires more setup.

**Prefix/suffix slots:** Primer has leadingVisual/trailingVisual render prop slots for icons, prefixes, and suffixes. Lightning supports prefix/suffix text. Paste supports prefix/suffix text and icon addons. shadcn/ui relies on CSS-in-children composition for prefix/suffix decoration.

**Token input:** Primer uniquely provides TextInputWithTokens — a text field that displays selected values as removable pill tokens (for tag/assignee input patterns).

**Validation display:** Lightning displays validation inline within the input component. Paste uses FormHelpText and FormErrorMessage. shadcn/ui uses FormMessage (react-hook-form error integration). All require aria-describedby linking the input to its error message.

## A11y Consensus
- Label association: htmlFor + id (or aria-labelledby); visible label required
- Error state: aria-describedby pointing to error message id; aria-invalid="true"
- Help text: aria-describedby pointing to help text id
- Required: aria-required="true" or required attribute (use both for broad support)
- Placeholder is not a label substitute

## Recommended Use
Universal component. Key differentiators: use Primer TextInputWithTokens for tag-style multi-value input, Lightning input for inline validation in Lightning pages, Paste's FormField for composable accessible form field wrapper pattern.
