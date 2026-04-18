# Banner — Component Research

**Date:** 2026-04-17
**Mode:** Max (all 24 systems, all patterns)
**Systems analyzed:** 24
**Systems with dedicated Banner:** ~14 — Polaris, Atlassian, Ant Design (via prop), Paste (Callout), Lightning, Primer, Playbook, Cedar, Wise, Dell, GOV.UK, Base Web, Gestalt, Orbit, Nord
**Systems without/repurposing Alert:** ~10 — M3, Spectrum, Carbon, shadcn/ui, Radix, Chakra, Mantine, Fluent 2, Evergreen

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | No page-level banner; Snackbar es ephemeral (no persistente); scope intencional | `primaryContainer` / `errorContainer` con full-width layout manual |
| Spectrum | InlineAlert scoped a section-level; no sticky/fixed guidance; Toast = ephemeral | InlineAlert fuera de su scope intended |
| Carbon | Inline Notification existe pero sin sticky ni full-width page-level scope | `high-contrast` InlineNotification manualmente posicionado |
| shadcn/ui | No Banner dedicado; Alert reusado con full-width manual | Alert con CSS width override |
| Radix UI | Solo Callout (inline); sin sticky/positioning guidance | Callout con layout manual |
| Chakra UI | No Banner; Alert con `variant="solid"` + full-width | CloseButton + Alert composición manual |
| Mantine | No Banner; Alert con `withCloseButton` | Alert con width styling |
| Fluent 2 | MessageBar funciona a page-level; MessageBarGroup para stacking | MessageBar con layout manual + MessageBarGroup |
| Evergreen | Alert con `appearance="card"` a page-level | Sin sticky built-in |

---

## How Systems Solve It

### Atlassian — "La separación más limpia: Banner (page) vs SectionMessage (section) vs InlineMessage (element)"

Atlassian es el sistema con la separación de concerns más clara del corpus. Tres componentes distintos para tres scopes distintos: `Banner` para mensajes sistema-página (sticky top), `SectionMessage` para alertas a nivel de sección/contenido, y `InlineMessage` para contexto a nivel de elemento individual. El `Banner` está diseñado específicamente para ser sticky en el top de la página, spans full width, y tiene un API deliberadamente limitado — solo tres appearances (`warning`, `error`, `announcement`) y sin botón de dismiss. Esta limitación es intencional: si el sistema muestra un Banner, es porque hay una condición sistema-nivel que persiste hasta ser resuelta. La variante `announcement` es única entre todos los sistemas — una categoría neutral para cambios de producto o mantenimiento planificado que no son errores ni warnings.

**Design Decisions:**
- **No-dismiss enforced:** → un Banner representa una condición que persiste hasta resolverse; permitir dismiss crea riesgo de que usuarios oculten mensajes críticos de mantenimiento → **Para tu caso:** si el producto tiene mensajes que DEBEN ser vistos (outages, critical security notices), considera banners non-dismissible como separate pattern
- **`announcement` appearance:** → mantenimiento planificado y cambios de producto no son errores ni warnings; necesitan una categoría propia para comunicar urgencia menor → **Para tu caso:** incluir variant neutral para comunicaciones proactivas no-urgentes
- **Single-line content only:** → fuerza brevedad; los mensajes de sistema deben ser escaneables, no leídos → **Para tu caso:** imponer límite de contenido previene abuso del componente para contenido que debería ser modal o página completa
- **Dedicated component (not Alert mode):** → Banner y SectionMessage tienen requisitos de layout, z-index y landmark ARIA distintos; fusionarlos en un componente crea un API esquizofrénico → **Para tu caso:** si el producto tiene ambos scopes (page-level + section-level), dos componentes distintos es la arquitectura más limpia

**Notable Props:** `appearance: "warning" | "error" | "announcement"`, icon element, single-line text, no dismiss, no actions

**Accessibility:** `role="alert"` para warning/error. `aria-live="polite"` para announcement. Landmark semántico en page top.

---

### Polaris (Shopify) — "Tone-based dismissibility enforcement + dual placement"

Polaris Banner es el más feature-complete del Tier 1. Dual placement (página-nivel vs. inline en card/sección). `tone: "critical"` → no dismissible (fuerza resolución). `tone: "warning" | "info" | "success"` → dismissible con `onDismiss`. Slots de primary y secondary action para CTAs. `stopAnnouncements` prop para suprimir live region updates cuando el contenido del banner cambia programáticamente (ej: countdown timers).

**Design Decisions:**
- **Tone-dictates-dismissibility:** → critical no se puede ocultar porque los merchants podrían perder su acceso, su cuenta o revenue; warning/info se pueden ocultar una vez leídos → **Para tu caso:** mapear severity a dismissibility behavior antes de implementar; no dejar esta decisión al consumer
- **Dual placement (page + inline):** → el mismo componente funciona como página-level (full-width arriba) y inline (dentro de card); reduce el número de componentes en el sistema → **Para tu caso:** considerar si el comportamiento a11y (live region) debe ser distinto por placement; page-level puede necesitar `role="region"` en lugar de `role="alert"`
- **`stopAnnouncements`:** → banners con contenido dinámico (timers, progress) que actualizan cada segundo spamearían screen readers sin este control → **Para tu caso:** incluir si hay casos de uso con banners de countdown o updating content

**Notable Props:** `tone: "critical" | "warning" | "success" | "info"`, `onDismiss`, `action + secondaryAction`, `stopAnnouncements: boolean`

**Accessibility:** `role="alert"` para critical/warning. `role="status"` para info/success. Dismiss button con `aria-label`. Actions con nombres accesibles.

---

### GitHub Primer — "El más completo de Tier 2: 5 variants + upsell + acción doble"

Primer Banner es la implementación más feature-rich del conjunto. Cinco variants: `info`, `warning`, `critical`, `success`, `upsell` — el `upsell` para comunicaciones promocionales de GitHub (upgrade a Pro, habilitar features) es único entre todos los sistemas. Slot de primary y secondary action buttons. Dismissible. Icon slot. Designed para full-width page-level placement.

**Design Decisions:**
- **`upsell` variant:** → GitHub necesita comunicar oportunidades de upgrade sin usar el mismo visual que errores o warnings — un variant neutral-positivo para CTAs comerciales → **Para tu caso:** si el producto tiene mensajes promocionales, un variant neutral/upsell previene el badge-blindness de usar `info` para todo
- **`critical` además de `warning`:** → dos niveles de negatividad porque "el branch está desactualizado" (warning) y "tu organización perderá acceso en 24 horas" (critical) necesitan diferenciación visual y tonal → **Para tu caso:** considera si el producto necesita dos niveles de urgencia negativa

**Notable Props:** `variant: "info" | "warning" | "critical" | "success" | "upsell"`, `onDismiss`, primary + secondary action slots, icon slot

**Accessibility:** Visually-hidden text prefix ("Warning:", "Error:") recomendado antes del mensaje para screen readers. Dismiss button con aria-label.

---

### Gestalt (Pinterest) — "Tres componentes: BannerSlim + BannerCallout + BannerOverlay"

Gestalt lleva la separación de concerns al máximo con tres componentes distintos para el concepto "banner":
- `BannerSlim`: inline compacto, sin rich content, para notificaciones contextuales dentro de la página
- `BannerCallout`: page-level con contenido rico, actions, dismiss — el banner principal
- `BannerOverlay`: floating, mobile-style, posicionado como overlay sobre el contenido

Esta arquitectura refleja que Pinterest tiene tres casos de uso fundamentalmente distintos que no comparten layout ni behavior.

**Design Decisions:**
- **Tres componentes en lugar de props:** → BannerSlim tiene sticky inline; BannerCallout tiene sticky page-level; BannerOverlay tiene z-index y mobile positioning → API incompatibles en un solo componente → **Para tu caso:** la separación tiene sentido cuando los tres casos de uso son reales y frecuentes; si solo existe page-level, un solo componente es suficiente

**Notable Props:** BannerCallout: `type`, `title`, `message`, `primaryAction`, `secondaryAction`, `onDismiss`

---

### GOV.UK — "Notification Banner con auto-focus en dynamic content"

GOV.UK es el único sistema que auto-focused el banner en page load cuando contiene confirmación de acción dinámica (ej: form submission exitoso). Esto es un requisito de accesibilidad para servicios gubernamentales — el usuario debe saber que su acción tuvo efecto. Separación explícita entre Notification Banner (sistema) y Cookie Banner (consentimiento) como componentes distintos.

**Design Decisions:**
- **Auto-focus para content dinámico:** → usuarios de screen reader necesitan ser informados del resultado de su acción; esperar que accedan al banner por navegación es insuficiente → **Para tu caso:** si el banner aparece dinámicamente post-acción (confirmación de guardado, éxito de pago), programmatic focus es best practice

**Notable Props:** `type: "success" | undefined`, focus management via `tabindex="-1"` + programmatic focus

---

### Salesforce Lightning — "Sticky positioning + multi-banner stacking"

Lightning es el único sistema con stacking rules explícitas para múltiples banners simultáneos (mantenimiento + cookie consent + upgrade notice). Define ordenamiento por severity para el stack y visualización groupada. Sticky-top positioning built-in.

**Design Decisions:**
- **Multi-banner stacking rules:** → productos enterprise pueden necesitar múltiples mensajes simultáneos (outage + feature notice); sin reglas de ordenamiento el stack es caótico → **Para tu caso:** si múltiples banners pueden coexistir, definir order/priority system y max visible count

**Notable Props:** `type: "info" | "warning" | "error" | "offline"`, sticky top positioning, grouped stacking support

---

### Ant Design — "Alert con `banner` prop: máxima flexibilidad al costo de semántica"

Ant Design usa un único componente Alert con `banner: boolean` en lugar de un componente separado. En banner mode: sin border-radius, sin border izquierdo, full-width intencional. El acceso a TODA la API del Alert (type, closable, action, description) lo hace el más flexible — pero mezcla la semántica de page-level con section-level alert en el mismo componente.

**Design Decisions:**
- **`banner` as Alert mode:** → reduce API surface a expensas de semántica clara; un mismo componente no puede ser óptimo para ambos scopes → **Para tu caso:** si el equipo es pequeño y los casos de uso son limitados, la flexibilidad de un componente unificado puede ser más práctica que la pureza semántica

**Notable Props:** `banner: boolean`, toda la API de Alert disponible en banner mode

---

### Base Web (Uber) — "Banner dedicado con artwork slot"

Base Web tiene un `Banner` component separado de `Notification`, con `artwork` slot para íconos personalizados y `title` + `description` structure. `kind: "info" | "positive" | "warning" | "negative"`.

**Notable Props:** `kind: "info" | "positive" | "warning" | "negative"`, artwork slot, action slot, title + description

---

### Orbit (Kiwi.com) — "AlertBanner para disrupciones de viaje"

`AlertBanner` de Orbit es sticky por default, designed para notificaciones de disrupciones de vuelos, cancelaciones y cambios de itinerario. Context domain-specific: usuarios necesitan ver estas alertas independientemente de su posición de scroll.

**Notable Props:** `type: "info" | "success" | "warning" | "critical"`, action button, dismissible, sticky top

---

### Nord (Nordhealth) — "Healthcare persistence: sin auto-dismiss por seguridad clínica"

Nord Banner no tiene auto-dismiss porque un anuncio de mantenimiento de sistema clínico perdido puede impactar el cuidado de pacientes. El modelo de persistencia es una decisión de seguridad, no de UX.

**Notable Props:** `variant: "info" | "warning" | "danger" | "success"`, `dismissible` attribute, action slot

---

### REI Cedar — "CdrBanner WCAG 2.1 AA + role-based variants"

Cedar usa `role` (no `type` o `tone`) como prop principal: `role="info" | "warning" | "error" | "success"`. Designed para persistencia en páginas de producto con avisos legales o de disponibilidad.

---

### Twilio Paste — "Callout: informational framing, no `banner`"

Paste llama al componente "Callout" en lugar de "Banner", enfatizando el framing informacional sobre la urgencia. `variant: "info" | "success" | "warning" | "error" | "new"`. Dismissible opcional. No es live region por default.

---

## Pipeline Hints

**Archetype recommendation:** `container`
Rationale: Banner es un contenedor full-width para mensajes sistema-nivel. No es interactive por default (form-control), no tiene overlay behavior típico (aunque puede ser sticky), y su estructura es de container con slots de contenido definidos. La variante sticky/fixed se maneja a través de CSS/layout sin cambiar la naturaleza del componente.

**Slot consensus:** (14 sistemas con banner)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| message/content | text | yes | 14/14 | Core message; single-line (Atlassian) or multi-line (Polaris, Primer, Base Web) |
| icon | icon | no | 12/14 | Semantic severity icon; most systems include by default; `showIcon: false` opt-out |
| title/heading | text | no | 8/14 | Polaris, Primer, Base Web, Gestalt BannerCallout, Nord have title slot |
| primary-action | container | no | 9/14 | CTA button; Polaris `action`, Primer primary action, Paste, Base Web |
| secondary-action | container | no | 6/14 | Second CTA; Polaris `secondaryAction`, Primer, Gestalt BannerCallout |
| close-button | icon-action | no | 10/14 | Dismiss control; absent in Atlassian (non-dismissible by design) |
| description | text | no | 5/14 | Extended text below title; Base Web, Ant Design (via description), Nord |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| tone/variant/type | variant | info/warning/error/success | 13/14 | Core semantic axis; Atlassian adds `announcement`; Primer adds `critical` + `upsell` |
| isDismissible | boolean | true/false | 10/14 | Atlassian enforces non-dismissible; others opt-in |
| showIcon | boolean | true/false | 7/14 | Most show icon by default with opt-out; some always show |
| isSticky | boolean | true/false | 4/14 | Lightning, Dell, Orbit built-in; others leave to CSS |
| size | variant | default/compact | 2/14 | Gestalt BannerSlim vs BannerCallout; Polaris sm/default |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isDismissible | 10/14 | true (opt-in) | Non-dismissible as override pattern |
| showIcon | 7/14 | true | Icon always visible; `showIcon=false` for decorative banners |
| isSticky | 4/14 | false | Sticky top positioning; most leave to layout |
| stopAnnouncements | 1/14 | false | Polaris only — suppress live region for dynamic content |
| hasTitle | 8/14 | false | Title/heading slot above message body |
| hasPrimaryAction | 9/14 | false | CTA button slot |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 14/14 | tone color + icon + message | |
| dismissed | 10/14 | element removed/hidden | onDismiss callback; non-dismissible banners never reach this state |
| focus (dismiss button) | 10/14 | focus ring on close button | Keyboard accessibility |
| focus (action buttons) | 9/14 | focus ring on primary/secondary action | |
| loading (dynamic content) | 1/14 | content updates with stopAnnouncements | Polaris edge case |

**Exclusion patterns found:**
- critical/error × dismissible — Polaris (critical always non-dismissible); Atlassian (all banners non-dismissible); enforcement at design system level prevents hiding critical messages
- page-level banner × role="alert" on page load — 8/14 systems clarify that banners present on page load should NOT use `role="alert"` (assertive); only dynamic insertion needs alert role

**Building block candidates:**
- action-group → `.BannerActions` — 6/14 systems formalize the action button area as a structured slot
- content-area → `.BannerContent` — 4/14 systems (Gestalt, Base Web, Nord) structure content with title + message slots

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| tone | info, warning, error, success, critical, announcement, upsell | varies | Core 4 universal; `critical` (Primer), `announcement` (Atlassian), `upsell` (Primer), `offline` (Lightning) as extensions |
| placement | page-level, inline | 6/14 | Polaris explicit dual placement; Atlassian separates into different components |
| multibannerBehavior | stack, replace, queue | 1/14 | Lightning only |

**A11y consensus:**
- Primary role: NO `role="alert"` for banners present on page load — use `role="region"` with `aria-label` instead; `role="alert"` only for dynamically injected banners
- Error/critical dynamic banners: `role="alert"` (assertive)
- Success/info dynamic banners: `role="status"` or `aria-live="polite"`
- Keyboard: dismiss button is `<button>` with `aria-label="Dismiss [banner type]"`; action buttons in tab order after banner text
- Focus: GOV.UK's auto-focus pattern for dynamic success banners is best practice for form submission confirmations
- Sticky banners: must not obscure focused elements; page content should be pushed down, not overlapped
- Icon: decorative (icon reinforces color) → `aria-hidden="true"`; standalone icon-only banners → explicit `aria-label` on icon
- Color independence: all systems require icon + text to convey severity; color is supplementary
- Multiple stacked banners: group in single `role="region"` landmark to prevent landmark pollution
- APG pattern: no specific APG pattern; Notification Banner closest equivalent

---

## Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base, different boolean/variant | Same component set |
| 40–70% | Extension — shared shell + extra prop | Same component set + additional property |
| < 40% | Separate component | Own component set |

**Types found:**
| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Status banner (page-level) | 100% | Template | Full-width, tone color, icon, message | All with banner |
| Banner with CTA | 80% | Template | Adds action button slot(s) | Polaris, Primer, Paste, Base Web, Gestalt BannerCallout |
| Non-dismissible banner | 80% | Template | Close button absent; enforced visibility | Atlassian (all), Polaris critical |
| Announcement/promo banner | 70% | Template | Neutral/positive tone for non-error notices | Atlassian announcement, Primer upsell, Lightning announcement |
| Inline section-level alert | 30% | Separate | Not full-width; lives in content flow; different layout | Atlassian SectionMessage, Polaris inline mode |
| Sticky/floating banner | 60% | Extension | CSS sticky/fixed positioning + scroll behavior | Lightning, Orbit, Dell, Nord |
| Multi-line banner with title | 70% | Template | Title + description structure | Base Web, Gestalt BannerCallout, Nord, Primer |
| Cookie/consent banner | 10% | Separate | Different legal requirements; different structure | GOV.UK separates explicitly |
| NOT a banner — Toast | 0% | Not-a-banner | Ephemeral, auto-dismiss, floating — opposite of banner | M3 Snackbar, others |
| NOT a banner — Inline Alert | 30% | Not-a-banner | Section-level scope, not page-level system messaging | Carbon InlineNotification, Spectrum InlineAlert |

---

## What Everyone Agrees On

1. **Color must not be the sole severity communicator:** All 14 systems with banner pair color with an icon and/or text label. Semantic color codes without reinforcement fail high-contrast mode and color-blind users.

2. **Standard four-tone vocabulary:** info/warning/error/success is the universal baseline. Extensions (critical, announcement, upsell, offline) exist but the core four are consistent across all systems.

3. **Banner ≠ Toast:** Every system that has both makes this explicit. Toast is ephemeral (auto-dismisses), bottom-positioned, and transient. Banner is persistent, top-positioned, and system-level. Using Toast for persistent messaging is an anti-pattern in every system that documents it.

4. **Dismiss button accessibility:** All dismissible banners provide a close button with accessible label (aria-label="Dismiss" or equivalent). Icon-only close buttons without text alternatives are universally flagged as failures.

5. **Actions before close button in tab order:** Across all systems with action buttons, the tab order is: banner text → primary action → secondary action → dismiss button. This is consistent with the principle of "most important action first" in keyboard navigation.

---

## Where They Disagree

**¿Un componente Banner o Alert con `banner` prop?**
- **Option A: Dedicated Banner component** (Atlassian, Polaris, Primer, Base Web, Gestalt, Orbit, Nord, GOV.UK) — semántica clara; API optimizada para page-level scope; diferentes landmark ARIA por scope
- **Option B: Alert con modo `banner`** (Ant Design, Chakra, Mantine, Fluent 2, Evergreen) — menos componentes que aprender; flexibilidad máxima; pero semántica borrosa entre page-level y section-level
- **Para tu caso:** Componente dedicado es la arquitectura más limpia para productos grandes donde la distinción page/section/inline es importante; Alert+prop funciona para sistemas más pequeños

**¿Dismissible por defecto o non-dismissible enforced?**
- **Option A: Siempre dismissible (opt-out)** (Ant, Primer, Paste, Base Web, most) — user agency; limpiar UI una vez leído
- **Option B: Non-dismissible enforced** (Atlassian — always, Polaris — critical only) — mensajes de sistema críticos deben persistir hasta resolverse; dismiss = ocultar problemas reales
- **Option C: Severity-dictates-dismiss** (Polaris — el modelo más sofisticado) — critical=no dismiss, rest=dismissible
- **Para tu caso:** El modelo de Polaris (severity-dictates) es el más defensible; mapear explícitamente qué severities permiten dismiss antes de implementar

**¿Sticky/fixed positioning built-in o CSS externo?**
- **Option A: Sticky built-in como prop** (Lightning, Orbit, Dell) — consistencia de posicionamiento; z-index management incluido
- **Option B: CSS externo** (la mayoría) — el componente no controla su posición; consumer maneja layout
- **Para tu caso:** Si el 90% de usos del Banner son sticky-top, incluir el comportamiento por default es más ergonómico; override opt-out para casos inline

**¿Página-level + inline en un componente vs. componentes separados?**
- **Option A: Dual placement en un componente** (Polaris, Ant Design) — menos API surface; `placement` prop controla layout
- **Option B: Componentes separados** (Atlassian: Banner + SectionMessage; Gestalt: BannerCallout + BannerSlim) — API exactamente correcta para cada scope; sin ambigüedad
- **Para tu caso:** Componentes separados si el sistema tiene usos frecuentes de ambos scopes; dual-placement si la distinción es rara

**¿Cuántos variants de severity?**
- **Option A: Los 4 básicos** (info/warning/error/success) — universal, simple, familiar
- **Option B: Extender con critical + upsell** (Primer) — dos niveles de negatividad + variant promocional
- **Option C: Agregar announcement** (Atlassian) — variant neutral para comunicaciones proactivas
- **Para tu caso:** Los 4 básicos como baseline; añadir variantes solo si hay casos de uso reales distintos de los básicos en el producto

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Full-width sticky banner | Top-of-page, spans viewport, persiste en scroll | System status, maintenance, outages | Lightning, Orbit, Dell, Atlassian |
| Page-level dismissible banner | Full-width, aparece arriba del contenido, con close button | Feature announcements, onboarding messages | Polaris, Primer, Paste, Base Web |
| Banner with CTA actions | Mensaje + primary/secondary action buttons | Upgrade prompts, consent, required actions | Polaris, Primer, Gestalt BannerCallout |
| Compact single-line banner | Single line, ícono izquierdo, minimal height | Quick notifications, system status indicators | Atlassian, Gestalt BannerSlim, Cedar |
| Banner with title + description | H-level heading + extended body text | Rich announcements with context | Base Web, Primer, Nord, Gestalt BannerCallout |
| Floating overlay banner | Z-indexed sobre contenido, mobile-style | Mobile push-style announcements | Gestalt BannerOverlay |

**Full-width page banner (patrón estándar):**
```
┌────────────────────────────────────────────────────────────┐
│  ⚠  System maintenance scheduled for Jan 15, 2:00 AM UTC.  [Learn more]  [×] │
└────────────────────────────────────────────────────────────┘
   warning icon  |  message text  |  action CTA  |  dismiss
```

**Atlassian non-dismissible announcement:**
```
┌────────────────────────────────────────────────────────────┐
│  📢  We're updating our terms of service on March 1.                           │
└────────────────────────────────────────────────────────────┘
   (no dismiss button — persists until resolved)
```

**Polaris multi-action critical:**
```
┌────────────────────────────────────────────────────────────┐
│  ✗  Your store is at risk. Verify your account to continue selling.            │
│     [Verify now]  [Learn more]                                                 │
└────────────────────────────────────────────────────────────┘
   (no dismiss — critical enforces resolution)
```

**Base Web title + description:**
```
┌────────────────────────────────────────────────────────────┐
│  [icon]  Scheduled Maintenance                                                 │
│           Services will be unavailable Saturday, 3-5 AM ET.                   │
│           [View status page]                                              [×]  │
└────────────────────────────────────────────────────────────┘
```

---

## Risks to Consider

**Risk 1: role="alert" en banners presentes en page load** (HIGH)
Si un banner informacional (info/announcement) usa `role="alert"` y está presente en el HTML inicial del servidor, muchos screen readers lo anunciarán inmediatamente y de forma assertiva al cargar la página — interrumpiendo la navegación normal. El banner de mantenimiento de cada lunes se volvería una molestia de accesibilidad.
**Mitigation:** Banners en page load: `role="region"` con `aria-label`; NUNCA `role="alert"`. Solo banners inyectados dinámicamente post-carga necesitan role="alert".

**Risk 2: Dismiss oculta mensajes críticos** (HIGH)
Si el dismiss button está disponible en todas las severities sin distinción, usuarios pueden ocultar outage notices o security warnings. "Limpiar" la UI no debe aplicarse a mensajes que requieren acción.
**Mitigation:** Implementar severity-dictates-dismiss pattern de Polaris: critical/error = non-dismissible; info/success = dismissible.

**Risk 3: Sticky banners obstruyen contenido bajo el fold** (MEDIUM)
Banners sticky de múltiples líneas reducen el viewport available. Múltiples banners simultáneos (stacking) pueden ocluir significativo contenido. Elementos con `position: sticky` debajo del banner pierden su stick point calculation.
**Mitigation:** Banners de una línea por default; multi-línea como variante explícita. Para multi-banner: max 2-3 visible; collapse/queue para adicionales. Ajustar `top` de otros sticky elements cuando el banner está activo.

**Risk 4: Banner vs Alert scope confusion para el equipo** (MEDIUM)
Sin documentación clara, los equipos usarán Banner (page-level) para validaciones de formulario (debería ser inline Alert) y Alert para anuncios del sistema (debería ser Banner). La confusión genera inconsistencia visual y semántica.
**Mitigation:** Documentar explícitamente: "Banner = sistema-nivel, persiste hasta resolución. Alert = sección-nivel, contexto local, temporal." Ejemplos reales de cuándo usar cada uno.

**Risk 5: Contenido de Banner demasiado largo** (LOW)
Algunos equipos colocan párrafos enteros en el Banner. El Banner es para mensajes de una a tres líneas máximo.
**Mitigation:** Limitar el slot de message a texto corto; para contenido rico, dirigir a página/modal con acción CTA en el Banner.

---

## Dimension Scores (sistemas CON banner dedicado)

| Sistema | Scope Clarity | A11y | Flexibility | Dismissibility | Placement | Total |
|---------|---------------|------|-------------|----------------|-----------|-------|
| Atlassian | 10 | 9 | 5 | 9 (non-dismiss enforced) | 8 | **41/50** |
| Polaris | 9 | 9 | 8 | 10 (severity-dictates) | 7 | **43/50** |
| Primer | 9 | 8 | 9 | 8 | 7 | **41/50** |
| Gestalt | 9 | 8 | 9 | 8 | 8 | **42/50** |
| GOV.UK | 8 | 10 | 5 | 7 | 7 | **37/50** |
| Base Web | 8 | 8 | 8 | 8 | 7 | **39/50** |
| Lightning | 8 | 7 | 7 | 7 | 9 (sticky) | **38/50** |
| Orbit | 8 | 8 | 7 | 8 | 9 (sticky) | **40/50** |
| Nord | 8 | 9 | 6 | 9 (clinical) | 7 | **39/50** |
| Ant Design | 7 | 5 | 10 | 6 | 6 | **34/50** |

---

## Next Steps

1. **`/spec banner`** — Generate config.json with anatomy (tone variants, slots, dismissibility, placement)
2. **`/enrich banner`** — Add a11y requirements (role semantics by placement+timing, dismiss a11y, sticky focus management)
3. **`/build banner`** — Full pipeline in one command using this research as cache
4. **`/build banner --max`** — Use pre-generated config as-is without scope questions
5. **`/research banner --fresh`** — Re-run research from scratch (bypasses this cache)

**Key spec decisions to make:**
- Dedicated Banner vs. Alert with `banner` prop?
- Severity-dictates-dismiss (Polaris model) or always-dismissible?
- Sticky positioning built-in or CSS-external?
- Dual placement (page + inline) or separate components?
- Four tones or extended (critical, announcement, upsell)?
