---
component: Textarea
tier: 2
last_verified: 2026-03-31
---

# Textarea — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | TextArea | Dedicated component; uses `@twilio-paste/textarea`; integrated with Paste's Label, HelpText, and form primitives; no auto-resize built in | high |
| Salesforce Lightning | lightning-textarea / textarea | SLDS textarea with `max-length` and character counter; part of form element family; supports `message-when-too-long` validation | high |
| GitHub Primer | Textarea (React) | Dedicated `Textarea` component with `resize`, `block` (full-width), `validationStatus`; supports `rows`; auto-resize via `sx` or CSS | high |
| shadcn/ui | Textarea | Thin wrapper around HTML `<textarea>` with Tailwind classes; no auto-resize, no character count — minimal by design; consumer composes with Label and form primitives | high |
| Playbook | Textarea | Dedicated component with `rows`, `maxCharacters`, `characterCount` display; supports `resize: "both" | "vertical" | "horizontal" | "none"` | medium |
| REI Cedar | CdrInput (multiline) | Vue component; `rows` prop for sizing; no dedicated textarea — uses CdrInput with multiline behavior; WCAG 2.1 AA compliant | medium |
| Wise Design | TextareaField | Form field wrapper with integrated label, hint, and error; supports `maxLength` with visual counter; no auto-resize | low |
| Dell DS | Textarea | Enterprise textarea with `maxLength`, `rows`, `resize` control; follows Dell's form field pattern with label, helper text, error | low |

## Key Decision Patterns

**Dedicated component vs. input variant:** Paste, Primer, shadcn/ui, and Playbook all provide a dedicated Textarea component separate from their text input. Cedar is the outlier, using CdrInput with a multiline configuration — similar to Polaris's approach in Tier 1. The dedicated component approach dominates in Tier 2, suggesting that the multi-line input pattern has enough unique concerns (resize behavior, row configuration, character counting) to warrant its own component.

**Auto-resize is notably absent:** Unlike Tier 1 where Polaris, Atlassian, and Ant Design all provide built-in auto-resize, most Tier 2 systems leave auto-resize to the consumer. shadcn/ui explicitly delegates this to CSS or third-party libraries. Primer supports it through style overrides but not as a first-class prop. This reflects a common Tier 2 philosophy: provide the semantic wrapper and let consumers handle advanced behavior.

**Character count implementation varies:** Lightning and Playbook have the most complete built-in character counters with visual feedback as limits approach. Paste and Primer expect consumers to compose character count displays using helper text primitives. shadcn/ui has no character count at all. Wise Design integrates a visual counter into its field wrapper.

**Resize control:** Playbook and Dell expose explicit `resize` props matching CSS resize values. Primer supports `resize` as a direct prop. Most others default to vertical resize only (browser default for textareas) or no resize. None of the Tier 2 systems implement the "smart" grow-only behavior found in Atlassian's Tier 1 implementation.

## A11y Consensus
- Label association via `htmlFor`/`id` or `aria-labelledby` is universal across all 8 systems
- Helper text and error messages linked via `aria-describedby`
- `aria-invalid="true"` on validation failure across all systems that support error states
- `aria-required="true"` or `required` attribute for mandatory fields
- Character count is visual-only in all Tier 2 systems — no `aria-live` region for dynamic count updates (consistent gap across all tiers)
- Primer's `validationStatus` prop automatically sets appropriate ARIA attributes

## Recommended Use
Use Primer's Textarea as the reference for a well-balanced dedicated component with resize control and validation status. Use Lightning's textarea for the most complete character counter implementation. Use shadcn/ui's minimal approach when composability and consumer control are priorities.
