---
system: Gestalt (Pinterest)
component: Not available natively
url: N/A
last_verified: 2026-03-29
confidence: high
---

# File Upload

## Approach
Gestalt has no FileUpload component in its public design system. The absence is grounded in Pinterest's product architecture: file uploading on Pinterest is nearly exclusively image and video Pin creation, a flow so central and product-specific that it warrants a fully custom, deeply integrated upload experience rather than a generic reusable component. Pinterest's Pin creation flow involves camera access, image cropping, video trimming, format validation, upload progress, and rich media previews — a surface area that far exceeds what a general-purpose FileUpload component would provide. This specialized flow is built directly into the product's Pin creation feature and is not abstracted into the design system because its complexity, context-dependency, and native-device integrations (camera, photo library) make it a poor candidate for a generic component. Secondary upload contexts within Pinterest (profile photo, board cover) also use custom implementations tailored to their specific constraints (circular crop, aspect ratio enforcement).

## Key Decisions
1. **Upload is product feature, not generic component** (HIGH) — Pinterest's core upload surface (Pin creation) is one of the product's most critical and differentiated flows. Reducing it to a generic `<FileUpload>` would strip away the media-type-specific behaviors (video trimming, image cropping) that define the experience.
2. **Mobile-first upload requires native API integration** (HIGH) — On mobile web and the Pinterest app, upload triggers camera access and the device photo library through native APIs. A generic file input abstraction cannot adequately represent these platform-specific affordances.
3. **Format and size validation is context-specific** (MEDIUM) — Different upload contexts on Pinterest enforce different rules (Pin image: JPEG/PNG/WebP under 32MB; video Pin: MP4/MOV up to 2GB). A generic component would require so many configuration props it would offer little value over a custom implementation.
4. **Design system scope is UI primitives** (MEDIUM) — Gestalt explicitly scopes itself to reusable UI primitives and interaction patterns. Specialized product flows like media upload fall outside this scope by design, keeping the system focused and maintainable.

## Notable Props
- N/A — Component does not exist in Gestalt.

## A11y Highlights
- **Keyboard**: N/A
- **Screen reader**: N/A
- **ARIA**: N/A

## Strengths & Gaps
- **Best at**: N/A — not applicable. Pinterest's upload flow is highly optimized for its specific media use cases within the product.
- **Missing**: No reusable file upload primitive for teams building non-Pin upload flows (e.g., CSV imports for advertisers, document uploads for business accounts). These teams must build from scratch or use third-party libraries, creating inconsistency risk.
