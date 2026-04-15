---
system: Ant Design
component: Steps
url: https://ant.design/components/steps/
last_verified: 2026-03-28
---

# Steps / Stepper (Ant Design)

## Approach
Ant Design's Steps component is the most feature-rich stepper implementation in the Tier 1 landscape by a wide margin, reflecting Alibaba's need to support diverse enterprise workflow patterns across its B2B platforms (Alibaba.com, Taobao seller tools, Alipay enterprise dashboard). The component supports five layout modes — horizontal (default), vertical, inline, dot, and navigation — each optimized for different surface and use-case constraints. It supports five step states — wait, process, finish, error, and warning — where the warning state (unique to Ant Design in Tier 1) represents a step with a non-blocking issue that should be addressed but does not prevent progression. Steps can be entirely non-interactive (visual progress only), partially interactive (only completed steps are clickable), or fully navigable (all steps are clickable tabs). Each step also supports a subtitle and a description — up to three lines of text per step — enabling rich step labeling that describes not just the step name but its status or requirements. This depth of feature coverage reflects Ant Design's guiding principle: provide enough variants that teams never need to build their own custom stepper, accepting the API complexity trade-off in exchange for consistency across Alibaba's diverse product surface.

## Key Decisions
1. **Five layout types for different use cases** (HIGH) — `horizontal` for standard wizard headers; `vertical` for left-sidebar step navigation in tall forms; `inline` for embedding compact step progress within a card or table row (unique to Ant Design); `dot` for minimal progress-only display; `navigation` for tab-like step switching where the stepper is the primary page navigation. The inline type is particularly notable — it renders the step indicator within a single line alongside other content, making it the only Tier 1 system that supports embeddable compact step indicators. This was designed for Alibaba's data table rows where order processing stages are shown inline per row.
2. **Warning state for non-blocking issues** (HIGH) — The `status="warning"` state on individual steps renders a warning icon and applies a warning color. This represents a step with a concern that does not block progression — for example, an optional field was left empty, or a non-critical recommendation was not followed. Carbon's error/invalid state blocks progression; Ant Design's warning state allows it. This distinction reflects Alibaba's complex onboarding flows where some recommendations (adding a business license, uploading a photo ID) improve the experience but are not strictly required to proceed.
3. **Navigation type as a tabbed step experience** (MEDIUM) — The `type="navigation"` Steps variant renders steps as tab-like clickable elements where any step can be navigated to at any time, regardless of whether it has been visited. This is the most permissive navigation model in Tier 1: unlike Atlassian's visited-only-navigable model, Ant Design's navigation type allows jumping to any step at any time. This is appropriate for configuration wizards where steps are genuinely independent (e.g., Alipay's merchant settings where each "step" is a settings category) rather than sequentially dependent.

## Notable Props
- `type`: `"default" | "navigation" | "inline"` — controls navigation model and visual style.
- `direction`: `"horizontal" | "vertical"` — layout orientation.
- `size`: `"default" | "small"` — size variant.
- `progressDot`: Boolean or render function for dot-style step indicators; accepts a custom render prop for the dot itself.
- `status`: Per-step `"wait" | "process" | "finish" | "error" | "warning"` — the most granular step state model in Tier 1.
- `description`: String or React node rendered below the step title — enables rich step labeling with instructions or status messages.
- `subTitle`: Rendered next to the step title on the same line — for compact secondary labels like timestamps or durations.
- `percent`: Number (0-100) for showing a partial-completion progress indicator on the current step — unique feature for showing in-step progress within a wizard.

## A11y Highlights
- **Keyboard**: Tab between steps in navigation mode; Arrow keys within steps for dot and default modes. Enter activates a clickable step. Non-interactive steps are not in the Tab order.
- **Screen reader**: Each step announces its label, state, and position. The `description` and `subTitle` are announced as part of the step's accessible name or description depending on implementation. The `status` states ("error", "warning", "finish") are announced via icon alt text and the `aria-label` on the step element.
- **ARIA**: `role="tablist"` in navigation mode (steps behave as tabs), `role="list"` in default mode (steps are progress indicators). `aria-current="step"` on the active step. `aria-disabled` on steps that are not navigable. This dual ARIA model (tablist vs. list) correctly reflects the semantic difference between navigable and non-navigable step modes.

## Strengths & Gaps
- **Best at**: Feature breadth — five layout types, five step states, inline mode, description and subtitle per step, partial-completion percentage on current step, and navigation type. No other Tier 1 system comes close to this coverage depth for the Steps pattern.
- **Missing**: Time zone support (not applicable) and `prefers-reduced-motion` handling for step transition animations. The inline type, while unique and powerful, has limited documentation on accessibility patterns when embedded in dynamic contexts like table rows.
