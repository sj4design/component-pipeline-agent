---
system: Ant Design
component: Alert
url: https://ant.design/components/alert/
last_verified: 2026-03-28
---

# Alert

## Approach

Ant Design's Alert component is a straightforward, mature implementation of the inline persistent notification pattern. It covers the standard four severity types (success, info, warning, error), supports optional description text for layered information hierarchy, and can be configured as closable. The design philosophy is pragmatic and feature-complete rather than opinionated: the Alert provides a full set of configurable behaviors (icon, description, closable, custom action, banner display mode) and trusts teams to apply the right configuration for their context rather than enforcing rules about when to use each feature.

The Toast vs. Alert distinction in Ant Design is architecturally enforced by using entirely separate components: `Message` (Ant Design's Toast equivalent) is a lightweight, auto-dismissing global notification that appears at the top of the viewport as a temporary overlay, while `Alert` is embedded in the document flow and persists until dismissed or the condition resolves. The `Message` component auto-dismisses (default 3 seconds), has no action buttons, and is purely informational feedback. `Alert` has none of these constraints: it is persistent, supports rich content, and can include custom action elements. This clear separation means there is no API ambiguity — you cannot accidentally use an Alert where a Message is intended.

Ant Design also provides a `Notification` component (distinct from both Alert and Message) for more complex global notifications that need to persist longer than a Message and may include actions — Ant Design's version of a persistent toast/global alert hybrid. Understanding this three-component ecosystem (Alert for inline, Message for transient toast, Notification for persistent global) is key to using Ant Design correctly, though the Alert is the definitive inline persistent component.

## Key Decisions

1. **Four semantic types as the industry baseline** (HIGH) — Alert uses `success`, `info`, `warning`, and `error` — the four-type tetrad that has become the de facto standard across the industry. This is the same vocabulary as Carbon (`kind`), Polaris (`tone`), and Atlassian (minus the `discovery` variant). Ant Design uses the term `type` rather than `kind`, `tone`, or `variant`, but the semantic meaning is identical. Each type maps to a distinct icon and color: green/check for success, blue/info for info, orange/exclamation for warning, red/close-circle for error. The choice to align on this four-type vocabulary rather than diverging (as Spectrum does with five variants) means Ant Design's Alert is immediately readable to developers familiar with any other major design system.

2. **Optional description prop for two-level information hierarchy** (HIGH) — The `description` prop allows adding a secondary text block below the primary `message`. When `description` is present, the icon is rendered at a larger size to maintain visual proportion with the increased content height. This optional layered architecture is the correct approach for a utility-focused design system: simple alerts (title-only) remain compact, while complex alerts (title + detail) expand gracefully. The pattern is consistent with Carbon (title + subtitle), Polaris (title + content), Spectrum (Heading + Content), and Atlassian SectionMessage — a universal consensus that two-level hierarchy improves alert scannability.

3. **`closable` is optional and explicit** (MEDIUM) — Dismissibility is not the default — `closable` must be explicitly set to `true`. This is a deliberate default that reflects Ant Design's pragmatic philosophy: alerts are persistent by nature, and making dismissal the default would undermine their purpose. Teams must make an active choice to allow dismissal. When `closable` is set, an `onClose` callback is available for handling post-dismiss state. Compared to Polaris (which enforces dismissibility for non-critical tones) and Spectrum (which disallows dismissal entirely), Ant Design's explicit opt-in approach gives maximum flexibility at the cost of less opinionated guidance.

4. **`action` prop for custom action elements** (MEDIUM) — The `action` prop accepts any React node, allowing teams to embed buttons, links, or other interactive elements within the Alert. This is the most flexible action model among Tier 1 systems: Carbon constrains to one ghost button (Actionable Notification), Polaris constrains to one primary + one secondary action via typed props, and Spectrum documents no action support at all. Ant Design's `action` slot accepts arbitrary content, which maximizes flexibility but also removes guardrails. Teams can embed multi-button decision surfaces inside an alert, which works against the principle that alerts are signals, not decision dialogs.

5. **`banner` prop for display mode switching** (LOW) — The `banner` prop switches the Alert into a banner display mode — no border-radius, no border, displayed edge-to-edge for use at the top of a page or section. This is a display variant that allows the same Alert component to function as both an inline content-embedded notification and a page-level banner, controlled by a single boolean. This is architecturally simpler than Atlassian's three-component hierarchy but also less semantically clear — the same `Alert` component can represent very different scopes depending on how `banner` is set.

6. **Explicit separation from Message (Toast equivalent)** (HIGH) — Ant Design's `Message` component is the Toast analogue: global, auto-dismissing, overlay, top-anchored, no action buttons. Ant Design's documentation explicitly distinguishes Alert from Message on persistence (Alert persists; Message auto-dismisses), placement (Alert is inline; Message is global overlay), and interaction model (Alert supports rich content and actions; Message is text-only). This documented separation prevents the most common misuse pattern, though the presence of three notification-adjacent components (Alert, Message, Notification) means teams new to Ant Design still face a learning curve about which to use when.

## Notable Props

- `type`: `'success' | 'info' | 'warning' | 'error'` — The standard four-type tetrad. Controls icon and color treatment.
- `message`: The primary text content (required).
- `description`: Optional secondary text for two-level hierarchy. Presence causes icon to scale up.
- `closable`: Boolean. Opt-in dismissibility. Must be explicit; not the default.
- `onClose`: Callback when the alert is dismissed. Used to update application state.
- `action`: ReactNode slot for custom interactive elements. Maximum flexibility, minimal guardrails.
- `banner`: Boolean. Switches to edge-to-edge banner display mode. Enables dual-purpose use of Alert as either inline notification or page banner.
- `icon`: Custom icon override, replacing the default type-specific icon.
- `showIcon`: Boolean controlling icon visibility. Defaults to `false` for simple (no description) mode; defaults to `true` when `description` is present.

## A11y Highlights

- **Keyboard**: The close button (when `closable` is set) is a standard keyboard-reachable interactive element. Action slot content inherits standard keyboard behavior of the embedded elements. No automatic focus management on render.
- **Screen reader**: Ant Design's Alert uses appropriate semantic roles for the notification container. Severity is communicated through both color and icon (not color alone). The `showIcon` default behavior ensures that when rich content (description) is present, an icon is always shown for visual and semantic emphasis.
- **ARIA**: The official documentation acknowledges that `role="alert"` semantics and `aria-live` attributes are applied, but Ant Design's accessibility documentation is less explicit than Carbon or Polaris about exactly which ARIA roles map to which severity types. Teams building on Ant Design should audit the rendered ARIA in their specific implementation rather than relying on documentation-level guarantees.

## Strengths & Gaps

- **Best at**: The most flexible action model of any Tier 1 system (arbitrary ReactNode in the action slot), the optional `description` prop creating clean two-level hierarchy, and the `banner` mode allowing context-adaptive display without a separate component.
- **Missing**: Less opinionated guidance than Carbon or Polaris on when to use Alert vs. Message vs. Notification (the three-component ecosystem requires study), and ARIA documentation is less precise than other systems — accessibility-critical teams should verify the live implementation rather than trusting the docs.
