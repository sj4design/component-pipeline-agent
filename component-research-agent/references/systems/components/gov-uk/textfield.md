---
system: GOV.UK Design System
component: Input (Text Input)
url: https://design-system.service.gov.uk/components/text-input/
last_verified: 2026-03-28
confidence: high
---

# Text Input

## Approach
GOV.UK's Text Input is among the most research-backed form input designs in existence. The system has extensive guidance on input widths (always size to the expected content), autocomplete attributes (always specify for known data types), error handling (red border + message above + error summary at top of page), and when to use specific input types. GOV.UK's text inputs are intentionally plain — no custom focus rings that compete with browser defaults, no prefix/suffix icons that distract. The focus is entirely on clarity and usability for a diverse population.

## Key Decisions
1. **Input width matches expected content** (HIGH) — GOV.UK provides input size classes (width-2 for postcodes, width-10 for names, full-width for addresses) based on the cognitive benefit of form fields visually indicating the expected length of the answer. This reduces uncertainty and errors.
2. **Explicit autocomplete attributes** (HIGH) — GOV.UK's guidance requires `autocomplete` attributes on inputs where the browser can help (name, email, address). This improves completion rates and reduces errors for users with motor disabilities who rely on autofill.
3. **Prefix and suffix for units** (MEDIUM) — Input prefix (`£`, `$`) and suffix (`.com`, `kg`) are supported for contextualizing the expected input. These are visible text additions, not overlaid icons, making them screen reader accessible without additional ARIA.

## Notable Props
- `id`, `name`: form binding
- `type`: input type attribute
- `autocomplete`: autocomplete attribute value
- `classes`: width modifier classes
- `label.text`: visible label (required)
- `hint.text`: secondary guidance
- `errorMessage.text`: validation error
- `prefix.text` / `suffix.text`: unit indicators

## A11y Highlights
- **Keyboard**: Native input behavior
- **Screen reader**: Label, hint, and error messages all properly associated; prefix/suffix are visible text before/after the input in DOM order
- **ARIA**: `aria-describedby` links input to hint and error message IDs; `aria-invalid` on error state

## Strengths & Gaps
- **Best at**: Width sizing guidance; autocomplete attribute enforcement; research-backed error pattern; accessible prefix/suffix
- **Missing**: No character count variant (GOV.UK has a separate Character Count component); no masked input; no addon buttons
