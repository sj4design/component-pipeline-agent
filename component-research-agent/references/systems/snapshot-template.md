# Snapshot Template

Use this format for all component snapshots in `references/systems/components/[system]/[component].md`.

Target: 800-1200 tokens per file. Only what the Research Agent needs — no full page content.

```markdown
---
system: [System Name]
component: [Component Name in that system]
url: [Direct URL to component docs page]
last_verified: YYYY-MM-DD
---

# [Component Name as the system calls it]

## Approach
[3-5 sentence narrative explaining this system's philosophy for this component. Not bullet points — a paragraph that tells the STORY. Why did they build it this way? What problem were they solving? How does it fit into their broader system?]

## Key Decisions
1. **[Decision name]** (HIGH/MEDIUM/LOW) — [What they decided + WHY in 2-3 sentences. The "why" is mandatory — not "because it's better" but the actual tradeoff.]
2. **[Decision name]** (IMPACT) — [What + Why]
3. **[Decision name]** (IMPACT) — [What + Why]
[Minimum 3, maximum 5 decisions]

## Notable Props
- `propName`: [What it does and WHY it's interesting — what design decision does this prop represent?]
- `propName`: [description]
[Only props that represent design decisions or are unique to this system. Not a full API list.]

## A11y Highlights
- **Keyboard**: [Specific key behaviors, not "supports keyboard"]
- **Screen reader**: [What gets announced and when]
- **ARIA**: [Specific roles/properties]
[Be specific. "Arrow keys navigate calendar grid" not "keyboard accessible".]

## Strengths & Gaps
- **Best at**: [1 sentence — what this system does better than others for this component]
- **Missing**: [1 sentence — what it doesn't cover that others do]
```

## Naming Conventions

**System slugs** (directory names):
- `material-design-3`
- `spectrum`
- `carbon`
- `polaris`
- `atlassian`
- `ant-design`

**Component slugs** (file names):
- `datepicker.md`
- `accordion.md`
- `button.md`
- `modal.md`
- `tabs.md`
- `table.md`
- `select.md`
- `tooltip.md`
- `toast.md`
- `textfield.md`
