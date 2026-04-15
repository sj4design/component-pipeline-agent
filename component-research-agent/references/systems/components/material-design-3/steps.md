---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# Steps / Stepper (Material Design 3)

## Approach
Material Design 3 does not include a Steps or Stepper component. This is a notable absence given that the previous version, Material Design 2, included a Stepper component — the removal in the MD3 redesign was deliberate. Google's rationale, communicated through Material's GitHub discussions, is that multi-step wizards are a high-context UI pattern that varies so significantly across products that a standardized component creates more constraints than it solves. In Google's own products, multi-step flows (account setup, payment checkout, onboarding sequences) use a wide variety of visual treatments: linear headers in Google Pay, card-stacked flows in Google One, bottom-sheet sequences in Android settings. None of these map cleanly onto a single "stepper" component. MD3's design philosophy for complex flows is composition: use the existing navigation, progress indicator, and typography components to build step-by-step flows appropriate for the specific surface and context. The `LinearProgressIndicator` can communicate progress through a flow; a custom top-bar with step count text ("Step 2 of 4") is the recommended pattern for wizard progress. This absence reflects a broader MD3 principle that "utility patterns" should emerge from composition rather than being pre-built as monolithic components.

## Key Decisions
1. **Removed from MD3 after existing in MD2** (HIGH) — The deliberate removal signals that Google's design team found the MD2 stepper created antipatterns in practice: teams used it for flows that were too long (more than 5 steps), too complex (steps with branching logic), or too narrow in viewport (stepper headers that didn't fit mobile screens). Rather than iterate on these problems, MD3 removed the component and let teams design flows that fit their specific content.
2. **LinearProgressIndicator as the recommended progress pattern** (MEDIUM) — For simple sequential flows, MD3 recommends using a `LinearProgressIndicator` at the top of the screen with text indicating current position (e.g., "1 / 4" or "25%"). This is less visually rich than a step-labeled indicator but works at any viewport width and does not require a component that knows the step structure upfront.
3. **No navigation stepper pattern** (MEDIUM) — MD3 provides no guidance for navigable steppers (where completed steps are clickable and allow the user to jump back). This use case (common in multi-page forms and checkout flows) must be implemented entirely custom. Teams building for Google's ecosystem are implicitly steered toward linear-only flows where back-navigation uses the system back button rather than step indicators.

## Notable Props
- No component. Custom implementations use:
  - `LinearProgressIndicator` for progress visualization.
  - Text components for step count display.
  - Navigation components for step-to-step movement.

## A11y Highlights
- **Keyboard**: No prescribed pattern. Custom implementations must establish their own keyboard navigation between steps.
- **Screen reader**: Custom implementations should use `aria-current="step"` on the active step indicator and `aria-label` on the progress region. MD3 provides no specific guidance.
- **ARIA**: The ARIA step indicator pattern (using `aria-current="step"`, a list structure for step items, and live region announcements for step transitions) must be self-implemented without MD3 guidance.

## Strengths & Gaps
- **Best at**: Nothing for this pattern — MD3's absence here means teams must build from scratch.
- **Missing**: Any standardized approach to multi-step wizard progress indication, step navigation, step states (complete / active / incomplete / error), and the associated accessibility patterns. This is one of the most commonly requested missing components in Material Design's GitHub issues.
