---
system: Material Design 3
component: No dedicated inline alert component (Banner deprecated; Snackbar is Toast-equivalent)
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# Inline Alert / Persistent Notification

## Approach

Material Design 3 made a deliberate and notable choice: it does not include a dedicated inline alert or persistent notification component. The Banner — which was M2's answer to page-level persistent messaging — was not carried forward into M3. This absence is not an oversight; it reflects M3's philosophy that persistent, blocking messages interrupt the flow of adaptive, expressive UIs and should be replaced by less disruptive patterns. The only notification component M3 ships is the Snackbar, which is a temporary overlay (auto-dismissing, bottom-anchored) — the direct equivalent of what other systems call a Toast. For persistent contextual feedback, M3 implicitly pushes designers toward composing solutions from Cards, contextual text, or system-level status indicators rather than providing a prescriptive inline alert container.

This is one of the most significant gaps in M3 compared to every other Tier 1 design system. All five other systems (Spectrum, Carbon, Polaris, Atlassian, Ant Design) have explicit, named components for persistent inline notifications. M3's absence forces product teams to improvise — which leads to inconsistency across products built on M3.

The core Toast vs. Inline distinction in M3 context: the Snackbar IS the Toast equivalent. It is temporary (default 4–10 seconds auto-dismiss), presented as an overlay floating above content, and does not interrupt interaction. There is no M3-native pattern for the opposite: an inline, persistent, contextual status message embedded in the page layout. That design space is explicitly unaddressed in M3.

## Key Decisions

1. **Banner not included in M3** (HIGH) — M2's Banner component was deliberately excluded from M3's component set. The likely reasoning is that M3's emphasis on adaptive, expressive, and container-free layouts made a full-width interrupting banner feel architecturally heavy. M3's design language leans on elevation, motion, and color roles to communicate status rather than dedicated alert containers. The cost of this decision is that teams lose a standardized pattern for persistent page-level messaging.

2. **Snackbar as the sole notification primitive** (HIGH) — M3's Snackbar is unambiguously a transient overlay notification: it appears at the bottom of the screen, auto-dismisses, supports one optional action, and should not be used for critical errors that require user resolution. This makes Snackbar the Toast equivalent, not the inline alert equivalent. Teams that need persistent feedback must build it themselves, typically using Card components with semantic color fills or custom implementations drawing on M3's color role system (e.g., `error`, `errorContainer`, `onErrorContainer` tokens).

3. **Color roles as the status communication layer** (MEDIUM) — M3 introduced a structured color role system with semantic roles including `error`/`errorContainer`, which can be applied to any surface or component. This is M3's implicit answer to "how do you show an error state inline?" — you apply the error color role to the relevant container. While flexible, this approach provides no standardized layout, icon treatment, or dismiss behavior, leaving each implementation team to define its own conventions.

4. **No ARIA guidance for persistent inline alerts** (HIGH) — Because M3 has no official inline alert component, it also provides no official guidance on ARIA roles (`role="alert"` vs `role="status"` vs `aria-live="polite"`) for persistent contextual feedback. Teams are on their own for accessibility implementation. This is a meaningful gap for enterprise and government products that rely on M3 but need WCAG compliance.

5. **Workaround via Cards with status treatment** (LOW) — The community-accepted workaround for persistent inline feedback in M3 is using a Card component styled with M3's semantic color roles. A Card with `errorContainer` background and an error icon functions as a de facto error inline alert, but this is a convention, not a specified component with standardized behavior, props, or accessibility markup.

## Notable Props

- No official component — no official props exist.
- `errorContainer` / `onErrorContainer` (color tokens): The intended color role pair for surfaces that communicate error states. Applying these to a Card creates the closest M3-native approximation of an error inline alert.
- Snackbar's `supportingText` + `action` props: These are Toast props, not inline alert props, but are often confused for persistent alert use cases. Key distinction — Snackbar is always an overlay and always temporary.

## A11y Highlights

- **Keyboard**: The Snackbar action button is focusable and reachable via Tab. However, because there is no inline alert component, there is no official keyboard spec for persistent inline feedback.
- **Screen reader**: The Snackbar announces via an `aria-live` region. No guidance exists for persistent inline patterns.
- **ARIA**: M3 documentation does not specify ARIA roles for inline persistent feedback. For any custom implementation, the best practice is `role="status"` with `aria-live="polite"` for informational messages, and `role="alert"` with `aria-live="assertive"` for errors requiring immediate attention — but M3 does not document this.

## Strengths & Gaps

- **Best at**: Providing a clean, expressive visual language for transient notifications via Snackbar, and a rich color role system that can be applied to any surface to communicate semantic states.
- **Missing**: A dedicated, specified, accessible inline alert component for persistent contextual feedback — the only Tier 1 system with this gap, which forces every M3 product team to invent their own convention.
