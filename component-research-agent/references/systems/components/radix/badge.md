---
system: Radix UI (WorkOS)
component: Badge (via Radix Themes)
url: https://www.radix-ui.com/themes/docs/components/badge
last_verified: 2026-03-28
confidence: high
---

# Badge

## Approach
Radix Themes Badge is a styled label for status indicators, version numbers, category labels, and count displays. It is a non-interactive inline element. The Badge supports the full Radix Themes color palette and four variants (solid, soft, surface, outline), making it highly configurable for different visual contexts without custom CSS.

## Key Decisions
1. **Color + variant matrix** (HIGH) — Any color from the Radix color palette can be combined with any variant. This gives 4 × many_colors combinations, handling category-coded badges (green success, red error, blue info, yellow warning) and any custom scheme.
2. **highContrast** (MEDIUM) — `highContrast` mode increases the text contrast against the badge background, useful for WCAG AA compliance in colored badges.

## Notable Props
- `color`: Radix color token
- `variant`: `"solid" | "soft" | "surface" | "outline"`
- `radius`: border radius override
- `highContrast`: boolean for increased text contrast
- `size`: `"1" | "2" | "3"`

## A11y Highlights
- **Keyboard**: Non-interactive
- **Screen reader**: Reads as inline text; color alone never carries meaning (text must convey status)
- **ARIA**: No ARIA needed for static badges

## Strengths & Gaps
- **Best at**: Color + variant matrix; highContrast for accessibility; token system integration
- **Missing**: No badge on icon or avatar (notification dot); no count badge with overflow (99+)
