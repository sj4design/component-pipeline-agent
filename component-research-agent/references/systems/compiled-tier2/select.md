---
component: Select
tier: 2
last_verified: 2026-03-28
---

# Select — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Select | Native HTML select; FormField wrapper; full native browser behavior | high |
| Salesforce Lightning | Select | Native select styled to Lightning design; LightningCombobox for custom | high |
| GitHub Primer | Select | Native select with Primer styling; ActionMenu for custom dropdown | high |
| shadcn/ui | Select | Radix UI Select; fully custom styled; portal rendering; item groups | high |
| Playbook | Select | Native and custom variants; dual React/Rails | medium |
| REI Cedar | CdrSelect | Vue wrapper around native select; WCAG 2.1 AA | medium |
| Wise Design | Select | Currency/country selects; critical financial flows | low |
| Dell Design System | Select | Enterprise configuration selects | low |

## Key Decision Patterns

**Native vs. custom:** Paste, Primer, and Cedar wrap native `<select>` for full browser/mobile compatibility, keyboard support, and accessibility without custom ARIA. Lightning and shadcn/ui offer both native (for simple lists) and custom (for grouped, rich-content, or styled options).

**When to use custom:** shadcn/ui's Radix Select is custom — required when option items need icons, descriptions, or custom formatting that native select cannot support. Native select cannot display rich option content.

**Option groups:** All systems support `<optgroup>` for native selects. Radix Select supports explicit item group components with visible group labels.

**Portal rendering:** Radix Select renders the dropdown in a portal (body) to avoid overflow/z-index clipping. Native select avoids this entirely as it uses OS-native dropdown.

## A11y Consensus
- Native select: full native accessibility; keyboard support automatic; mobile-friendly
- Custom select: must implement role="combobox" or role="listbox" pattern; aria-expanded; aria-activedescendant; all keyboard behavior must be custom-implemented
- Label association: htmlFor/id or aria-labelledby required
- Required: aria-required="true" or required attribute

## Recommended Use
Use native select (Paste, Cedar, Primer) for all standard single-value selection. Use custom Select (shadcn/ui Radix) only when option items require rich formatting. Never use custom select for mobile-critical paths without thorough testing.
