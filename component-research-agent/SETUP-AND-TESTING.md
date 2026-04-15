# Component Research Agent — Setup & Testing

## Setup in Claude Code

### 1. Copy the skill to your project
```bash
cp -r component-research-agent/ /path/to/your/project/.claude/skills/
```

Or if you prefer it at project root:
```bash
cp -r component-research-agent/ /path/to/your/project/
```

### 2. Add the slash command
```bash
# In your project directory
mkdir -p .claude/commands
cp component-research-agent/commands/research.md .claude/commands/research.md
```

### 3. Reference in CLAUDE.md
Add this to your project's `CLAUDE.md`:

```markdown
## Component Research Agent
When asked to research a component, read the skill at `component-research-agent/SKILL.md` first.
Reference files are in `component-research-agent/references/`.
Output template is in `component-research-agent/templates/`.
Save research outputs to `/research/components/`.

### Critical Rules
- NEVER infer from briefs. Read `references/brief-parsing-rules.md` before parsing.
- ALWAYS use web_search for current component data. Don't rely on training data.
- ALWAYS include the "why" behind each design decision.
- ALWAYS verify visual outputs are actual wireframes, not text descriptions.
```

### 4. Create output directory
```bash
mkdir -p research/components
```

---

## Test Cases

### Test 1: Quick Mode — Basic
```
/research datepicker
```
**Expected**: Research on DatePicker across 6 Tier 1 systems. Should include consensus, divergences, patterns found. No scope questions.

### Test 2: Quick Mode — Deep
```
/research accordion --deep
```
**Expected**: Research across all 24 systems. Significantly more findings and comparisons.

### Test 3: Guided Mode
```
/research datepicker --guided
```
**Expected**: Agent asks 4 questions (type, display, time, constraints). Then filters research to relevant systems/patterns only. Takeaways reference the scope.

### Test 4: Max Mode
```
/research datepicker --max
```
**Expected**: No scope questions. Extracts ALL patterns across all 24 systems. Full Pipeline Hints with every sub-component, state, boolean, and truncation pattern.

### Test 5: Max Mode — Different Component
```
/research datepicker --brief
```
Then paste:
```
Necesitamos un componente para que el usuario pueda elegir fechas en nuestra plataforma. Debe ser fácil de usar y moderno.
```
**Expected**:
- Covered: ZERO or near-zero. "elegir fechas" is vague. "fácil de usar" and "moderno" mean nothing specific.
- If the agent marks more than 1-2 dimensions as covered, the parsing is too aggressive.

### Test 6: Different Component
```
/research accordion
```
**Expected**: Completely different research. Not DatePicker data. Should search for accordion/disclosure/collapsible across systems.

### Test 7: All Systems
```
/research modal
```
**Expected**: Research across all 24 systems. Should include Paste, Lightning, Primer, Radix, Fluent, etc.

---

## What to Check

1. **Are findings current?** — The agent should use web_search, not training data. Check that URLs are valid.
2. **Is the "why" included?** — Each decision should explain rationale, not just describe what exists.
3. **Are takeaways contextual?** — If scope was defined, takeaways should reference the specific case.
4. **Is the brief parsing conservative?** — Test 5 is the critical one. If it over-infers, the parsing rules need tightening.
5. **Is the output saved?** — Check that `/research/components/[name].md` was created.
6. **Does consensus match reality?** — Verify 2-3 consensus points against actual DS docs.

---

## Iteration

After running tests:
1. Note where the agent over-infers or misses information
2. Tighten `brief-parsing-rules.md` if needed
3. Add more systems to `ds-catalog.json` if relevant
4. Expand dimensions in `dimensions.md` if you find recurring gaps
5. Adjust the template if the output doesn't match your team's format
