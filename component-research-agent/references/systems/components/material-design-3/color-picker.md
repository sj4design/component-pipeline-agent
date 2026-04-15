---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/styles/color/overview
last_verified: 2026-03-28
---

# Color Picker (Absent in M3)

## Approach
Material Design 3 does not provide a ColorPicker component, and this absence is architecturally intentional rather than an oversight. M3's color philosophy is entirely token-based: the system generates a harmonious palette from a single source color using the HCT (Hue, Chroma, Tone) color space, and surfaces, states, and roles are then filled by semantic color roles (primary, secondary, tertiary, error, surface) rather than user-chosen arbitrary colors. Google's product ecosystem — Search, Maps, Gmail, Drive — does not present scenarios where end-users pick freeform colors as part of core workflows. Because M3 assumes the designer selects the palette at build time via Material Theme Builder, a runtime ColorPicker would exist outside the system's mental model entirely. The design philosophy treats color as a systematic, pre-resolved concern, not a user input surface.

## Key Decisions
1. **Token-based color system, not user-input** (HIGH) — M3 expresses all color through semantic roles (primary, on-primary, surface, outline, etc.) generated from a single source color. This means color is a design-time decision, not a runtime one. The entire system is built so that switching themes requires changing one source color, not re-painting individual surfaces.
2. **HCT color space for harmony guarantees** (HIGH) — Rather than sRGB or HSL, M3 uses HCT (Hue, Chroma, Tone), a perceptually uniform space. This guarantees contrast ratios and visual harmony across the generated palette automatically. A ColorPicker built on HCT would be meaningless to users who think in hex or RGB, which reinforces why Google omitted it.
3. **Material Theme Builder as the color entry point** (MEDIUM) — The intended workflow for customizing color is through the Material Theme Builder web tool or Figma plugin, not a component on-screen. This pushes color selection entirely to the design/build phase, making an interactive ColorPicker out of scope for the runtime component library.
4. **Dynamic Color adapts from user wallpaper, not user input** (MEDIUM) — Android's Dynamic Color feature derives palette colors from the user's current wallpaper at the OS level. This is the closest M3 gets to "user color selection" — but it's passive extraction, not active picking, and it's an OS-level API rather than a component.

## Notable Props
- No component exists; no props applicable.
- Relevant token surface: `colorScheme` in MaterialTheme for Compose, or CSS custom properties for web implementations.

## A11y Highlights
- **Keyboard**: Not applicable — no interactive component.
- **Screen reader**: Not applicable.
- **ARIA**: Not applicable. Color role semantics are expressed through contrast ratios enforced by the token system, not by interactive elements.

## Strengths & Gaps
- **Best at**: Enforcing systematic, accessible color palettes at the design-system level — no user can accidentally pick an inaccessible color combination because the palette is pre-harmonized.
- **Missing**: Any affordance for user-facing color customization, which makes M3 unsuitable for products like design tools, e-commerce personalization, or note-taking apps where users legitimately need to choose colors at runtime.
