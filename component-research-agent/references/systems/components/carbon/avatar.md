---
system: IBM Carbon Design System
component: Not available natively
url: https://carbondesignsystem.com/components/overview/
last_verified: 2026-03-28
---

# Avatar

## Approach
Carbon Design System does not include a native Avatar component. This is one of the more surprising omissions in a Tier 1 system, but it reflects Carbon's strong enterprise-B2B focus. IBM's core product domains (Cloud infrastructure, data platforms, Watson AI tools, enterprise software) are not user-facing social or collaborative interfaces where avatars are common. In Carbon's primary use cases, the "user" is typically a system administrator or data analyst interacting with dashboards and configuration UIs, not a person in a social feed. The few places where user identity appears in IBM products are handled with the `Header` component's user profile section and the `UserProfile` pattern in specific product line implementations.

Teams using Carbon who need avatars are directed to use either the `Icon` component with a person-shaped icon (for generic user representation) or a custom implementation. Carbon's community on GitHub has several open issues requesting a native Avatar component, and community-contributed Avatar implementations exist outside the official library (notable example: `@carbon/ibmdotcom-web-components` includes an avatar-like pattern for IBM.com use cases). The absence creates real inconsistency: two Carbon-based IBM products might implement avatar fallbacks differently — one using initials, another using a generic person icon — because there's no official contract.

## Key Decisions
1. **Deliberate absence due to product domain fit** (HIGH) — Carbon made a scope decision that Avatar is not a core B2B enterprise UI pattern. This is defensible given IBM's actual product portfolio, but it creates a gap for teams building IBM products that do have collaboration features (IBM Connections, IBM Watson Assistant with human handoff, etc.).
2. **Icon component as workaround** (MEDIUM) — Carbon's guidance for user representation is to use the `Person` icon from the Carbon icon library, rendered at appropriate sizes. This is semantically weaker than a proper avatar (no image support, no initials, no visual distinction between different users) but maintains visual consistency with Carbon's icon system.
3. **No standardized size scale** (MEDIUM) — Without a native component, there is no official size scale for user images. Teams using Carbon independently adopt sizing conventions (24px, 32px, 40px are common) that don't align across products, creating visual inconsistency in any cross-product IBM experience.

## Notable Props
- No official Avatar props — component does not exist
- Teams typically implement with `size` (pixel value), `src`, `alt`, and a custom `initials` prop in their own implementations

## A11y Highlights
- **Keyboard**: No guidance provided — implementations vary widely
- **Screen reader**: No standardized approach; IBM's accessibility team recommends all user images have descriptive alt text in their general image guidance, but no Avatar-specific guidance exists
- **ARIA**: No standardized pattern; community implementations vary

## Strengths & Gaps
- **Best at**: Nothing Avatar-specific — the component is absent; Carbon's Icon library does provide quality person/user icons as a fallback
- **Missing**: Entirely absent — no image support with circular clipping, no initials fallback, no AvatarGroup, no loading states, and no standard size scale; this is a genuine gap that Carbon has not addressed
