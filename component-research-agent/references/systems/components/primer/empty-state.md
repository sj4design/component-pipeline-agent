---
system: GitHub Primer
component: Blankslate
url: https://primer.style/components/blankslate
last_verified: 2026-03-28
confidence: high
---

# Blankslate (Empty State)

## Approach
GitHub Primer calls this "Blankslate" — the component for zero-data and first-time-use states throughout GitHub. Used when a repository has no commits, a project has no issues, or a user has no followers. Blankslate is a well-established Primer pattern with specific slot structure: icon/image, heading, description, primary action, and secondary action.

## Key Decisions
1. **Blankslate naming** (HIGH) — The term "blankslate" is GitHub's established terminology for empty states, reflecting the concept of a fresh starting point — a well-known term in GitHub's design culture.
2. **Primary + secondary action pattern** (HIGH) — Blankslate can have both a primary CTA button and a secondary link action, enabling "Create your first issue" + "Learn more about issues" patterns common throughout GitHub.
3. **Narrow size variant** (MEDIUM) — Narrow variant for Blankslate in smaller sections (like a narrow panel or sidebar section with no content) vs full-page empty states.

## Notable Props
- `Blankslate.Heading`: Required heading content
- `Blankslate.Description`: Explanatory description
- `Blankslate.PrimaryAction`: Main CTA button
- `Blankslate.SecondaryAction`: Secondary link action
- `Blankslate.Visual`: Icon or image slot
- `narrow` / `spacious`: Size variant

## A11y Highlights
- **Keyboard**: Action buttons/links are fully keyboard accessible
- **Screen reader**: Heading provides section context; description elaborates; actions clearly labeled
- **ARIA**: Heading hierarchy; action button/link accessible names; decorative visual elements aria-hidden

## Strengths & Gaps
- **Best at**: Primary + secondary action split; narrow/spacious size variants; GitHub's established blankslate pattern
- **Missing**: No illustration library (developers provide their own icons/images); no loading vs empty distinction
