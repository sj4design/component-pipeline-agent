# Link

## Descripción general

Link es el primitivo interactivo de navegación: un elemento `<a>` con estilo sistemático que conecta destinos dentro y fuera del producto. Su responsabilidad principal es mantener la semántica HTML correcta — el `url` prop renderiza `<a>`, mientras que `onClick` sin URL renderiza `<button>` — previniendo el anti-patrón de usar links para acciones. Como building block, se usa standalone en párrafos de texto (Variant=inline) o en zonas de navegación (Variant=standalone), siempre con un label visible y opcionalmente con un ícono leading o trailing.

```
┌───────────────────────────────────────────────────────────────┐
│                          Link                                 │
│                                                               │
│  [icon?] ─ 4px ─ [label*] ─ 4px ─ [externalIcon?]           │
│                                                               │
│  inline:     texto subrayado en body copy                     │
│  standalone: link de navegación con Launch icon opcional      │
└───────────────────────────────────────────────────────────────┘
```

El ícono leading es opcional (patrón de adorno o categoría); el externalIcon (Launch) aparece automáticamente cuando `external=true`. El underline es el affordance principal de que es un link; en navegación puede suprimirse con Remove Underline.

**Lo que el diseñador puede configurar:**

Variantes (cambian apariencia — generan variantes Figma):

```
Variant   → inline | standalone
State     → default | hover | visited | focused | disabled
Size      → sm (13px) | md (14px) | lg (16px)
Tone      → default | subdued | monochrome | critical
```

Toggles (muestran/ocultan partes — NO generan variantes extra):

```
👁 Has Icon              → muestra/oculta slot icon (leading)
👁 External (Launch icon) → muestra/oculta externalIcon trailing
👁 Remove Underline      → suprime underline (para navegación)
```

### Panel de propiedades en Figma

```
┌─────────────────────────────────────────────┐
│  Link                                       │
│  ─────────────────────────────────────────  │
│  Variant      [ inline              ▼ ]     │
│  State        [ default             ▼ ]     │
│  Size         [ md                  ▼ ]     │
│  Tone         [ default             ▼ ]     │
│  ─────────────────────────────────────────  │
│  👁 Has Icon           [ off ]              │
│  👁 External (Launch)  [ off ]              │
│  👁 Remove Underline   [ off ]              │
│  ─────────────────────────────────────────  │
│  🔄 Icon       [ icon/placeholder   ▼ ]     │
│  🔄 Ext. Icon  [ icon/launch        ▼ ]     │
│  ✏️ Label      [ Link text              ]    │
└─────────────────────────────────────────────┘
```

---

## Cuándo usar (y cuándo no)

```
¿El elemento navega a un destino (URL)?
    ├── Sí → Link (Variant=inline o standalone)
    │         url prop → <a href>
    └── No (solo acción como onClick) → Button (no Link)
              onClick sin url → <button> (Polaris doctrine)
                    │
                    ▼
         ¿El destino es externo al producto?
         ├── Sí → external=true (Launch icon + rel automático)
         └── No → Link estándar
                    │
                    ▼
              ¿Está dentro de body copy?
              ├── Sí → Variant=inline (underline visible)
              └── No → Variant=standalone (underline opcional)
```

**Usar Link cuando:**
- El elemento navega a otra URL (interna o externa)
- Aparece dentro de párrafos de texto (Variant=inline)
- Aparece en zonas de navegación o como acción de "ver más" (Variant=standalone)
- Necesita Tone=critical para acciones destructivas peligrosas con navigate ("Eliminar cuenta")
- Necesita Tone=monochrome sobre fondos de color (banners, toasts)

**NO usar Link cuando:**
- La acción no navega a ninguna URL → usar `Button`
- Se necesita un botón estilizado como link → usar `Button` con variant ghost/link
- Se necesita texto no interactivo → usar `Typography`
- La URL es de descarga de archivo → usar `Button` con ícono download (contexto diferente)

---

## Variaciones visuales

### Por Variant

| Variant    | Underline  | Contexto típico |
|-----------|-----------|----------------|
| inline    | Siempre visible | Dentro de párrafos, oraciones, descripciones |
| standalone | Opcional (Remove Underline) | Navegación, "Ver más", "Ir a panel" |

### Por State

| State    | Color fg    | Underline | Ring | Nota |
|---------|-------------|---------|------|------|
| default | #2659EB (interactive/default) | Sí | No | Estado base |
| hover   | #1E4BD1 (interactive/hover) | Sí | No | Darkened al hover |
| visited | #7338C0 (interactive/visited) | Sí | No | Solo Variant=standalone |
| focused | #2659EB | Sí | 2px ring | Focus ring siempre visible |
| disabled | #B8B8C0 (text/disabled) | No | No | Sin href; aria-disabled |

### Por Size

| Size | Font size | Line-height | Icon size | Gap |
|------|-----------|------------|----------|-----|
| sm  | 13px      | 18px       | 14px     | 4px |
| md  | 14px      | 20px       | 16px     | 4px |
| lg  | 16px      | 24px       | 18px     | 6px |

### Por Tone

| Tone       | Color fg    | Caso de uso |
|-----------|-------------|------------|
| default   | #2659EB     | Navegación estándar — el 90% de los casos |
| subdued   | #6B7280     | Links de menor énfasis, metadata, breadcrumbs |
| monochrome | currentColor | Links sobre fondos de color (banners, toasts) |
| critical  | #DC2626     | Links de acción destructiva ("Eliminar", "Cancelar cuenta") |

---

## Decisiones de diseño

**1. Variant inline vs. standalone (patrón Carbon)** — Carbon explicita que inline links (en body copy con underline obligatorio) y standalone links (en navegación, opcionalmente sin underline) tienen tratamientos visuales distintos para contextos distintos. WCAG 1.4.1 requiere que los links en body copy sean distinguibles del texto circundante además del color — el underline es el único affordance confiable para daltonismo.

**2. Visited state incluido** — Atlassian lo omitió deliberadamente tras user research en Jira (dense UI). Se mantiene porque: (a) es WCAG-recomendado, (b) GOV.UK y Nord documentan que ayuda a usuarios con dificultades de memoria, (c) Polaris y Ant lo incluyen. Tone=monochrome cubre los casos donde visited no se necesita (links en banners de color donde el color no importa). La exclusión `inline + visited` es correcta — los links inline en texto running rara vez necesitan marcar cuáles se visitaron.

**3. 4 Tones (default/subdued/monochrome/critical)** — Polaris tiene `monochrome` para links sobre fondos de color. `critical` cubre el patrón raro pero válido de link destructivo. `subdued` para metadata/breadcrumbs de menor énfasis. Default es el azul interactivo estándar. Esta es la cubertura mínima para soportar todos los contextos del producto.

**4. External automático: target='_blank' + rel + Launch icon** — Polaris, Spectrum y Paste (T2) convergen en manejar links externos automáticamente: `rel="noopener noreferrer"` por seguridad (previene reverse tabnapping) + ícono Launch visual + texto SR "opens in new tab". Tres sistemas implementando lo mismo es consenso — evitar que developers olviden el security attr.

**5. url vs. onClick determina `<a>` vs. `<button>` (Atlassian doctrine)** — "Link para navegar, Button para acción." Polaris la implementa técnicamente: `url` prop → `<a>`, `onClick` sin URL → `<button>`. Previene el anti-patrón de `<a href="#">` con onclick que genera problemas de accesibilidad y routing.

### Combinaciones excluidas

```
Variant=inline + State=visited       → ✗ inline links visited no estándar en body copy
Tone=monochrome + State=visited      → ✗ monochrome hereda currentColor; visited no aplica
State=disabled + Tone=critical       → ✗ link critical disabled es contradictorio
```

---

## Comportamiento

### Esencial para diseño

- **Underline obligatorio en Variant=inline** — WCAG 1.4.1: links en body copy deben diferenciarse del texto circundante sin depender solo del color. El underline es la solución estándar.
- **Launch icon automático en external=true** — el ícono comunica visualmente que el destino es externo. El texto "opens in new tab" (visually hidden) comunica a SR. Ambos son necesarios.
- **Disabled sin href** — un link deshabilitado no tiene href (no es navegable) y tiene `aria-disabled="true"`. Nunca `disabled` como atributo HTML en `<a>` — ese atributo no existe en anchors.
- **Gap icon↔label: 4px (sm/md) o 6px (lg)** — constante de diseño por tamaño.
- **State=focused siempre muestra ring** — el focus ring 2px es el indicador de teclado. Nunca suprimirlo.

### Accesibilidad (ARIA)

| Parte | Role | Atributos | Por qué importa |
|-------|------|-----------|----------------|
| Link navegacional | `link` (implícito en `<a>`) | `href="url"` | SR anuncia "enlace" + texto + destino |
| Link con acción (onClick sin url) | `button` (renderiza `<button>`) | — | SR anuncia "botón" — expectativa correcta del usuario |
| Link externo | `link` | `target="_blank"` + `rel="noopener noreferrer"` | Seguridad; texto "opens in new tab" para SR |
| Link deshabilitado | `link` | Sin `href` + `aria-disabled="true"` | SR anuncia estado; sin href previene navegación |
| Link active en nav | `link` | `aria-current="page"` | SR anuncia "página actual" — orientación de navegación |
| Icon leading decorativo | ninguno | `aria-hidden="true"` | El label del link ya provee el nombre accesible |

### Navegación por teclado

Primary interactions (afectan diseño):

```
Tab     → navega al link (recibe focus — mostrar ring 2px)
Enter   → activa el link (navega al href o ejecuta onClick)
```

Secondary interactions (referencia dev):

```
Space   → NO activa links (diferencia vs. button — Space activa buttons)
Shift+F10 → abre context menu del link (comportamiento nativo del browser)
```

---

## Guía de contenido

**Texto del link:**
- Descriptivo en aislamiento: "Ver historial de pagos" (no "Ver más" o "Click aquí")
- Evitar URLs crudas como texto del link en prosa — usar texto descriptivo
- Máximo 4-5 palabras para links inline; standalone puede ser más descriptivo
- Para links de navegación external, el ícono Launch + "(opens in new tab)" para SR es suficiente — no necesario repetir "externo" en el label

**Con ícono:**
- El ícono leading es decorativo — el label es el nombre accesible del link
- Nunca ícono-only Link sin `aria-label` — si no hay label visible, el link necesita aria-label
- Icon size debe coincidir con el Size del link (sm:14px, md:16px, lg:18px)

**Critical links:**
- Tone=critical solo para acciones verdaderamente destructivas o de alerta
- Siempre acompañar de texto que describe la consecuencia ("Esta acción no se puede deshacer")

---

## Pre-build checklist

```
□ ¿Tiene href/URL? Si no → usar Button
□ ¿External=true tiene Launch icon + texto SR "opens in new tab"?
□ ¿Variant=inline tiene underline visible (Remove Underline=off)?
□ ¿State=focused tiene ring visible de 2px?
□ ¿State=disabled no tiene href y tiene aria-disabled?
□ ¿Tone=monochrome solo en fondos de color (banners, toasts)?
□ ¿Tone=critical solo para links genuinamente destructivos?
□ ¿El texto del link es descriptivo en aislamiento (sin "click aquí")?
□ ¿Links en body copy son distinguibles del texto (underline o similar)?
□ ¿aria-current="page" en links de navegación activa?
```

---

## Componentes relacionados

```
Button       → para acciones sin URL; Button ghost imita visualmente un link
NavItem      → link de navegación primaria con ícono + label + active state
Breadcrumb   → usa Link subdued para los ítems anteriores de la ruta
Footer       → usa Link standalone para links secundarios de pie de página
Alert        → puede incluir Link monochrome dentro del contenido del alert
Toast        → puede incluir Link monochrome como acción contextual
Typography   → texto base; Link extiende sus estilos con color interactivo y underline
```

---

## Referencia: cómo lo hacen otros sistemas

| Sistema | Variante | External automático | Visited | Router integration | Diferenciador |
|---------|---------|--------------------|---------|--------------------|--------------|
| **Material Design 3** | Sin componente | No | No | — | CSS custom properties en `<a>` nativo; sin abstracción |
| **Spectrum (Adobe)** | inline / standalone | Sí (rel auto) | No doc | RouterProvider (1 config global) | RouterProvider zero-config; isQuiet para navigation |
| **Carbon (IBM)** | inline / standalone | Launch icon manual | `$link-visited` token | No | Launch icon standardized para external; inline boolean |
| **Polaris (Shopify)** | inline / standalone | Sí (auto detecta external) | No | url→`<a>`, onClick→`<button>` | Semantic enforcement url/onClick; monochrome; visually-hidden SR text |
| **Atlassian** | Single variant | No | No (deliberado) | Anchor + Link layers | Button vs. Link doctrine; Anchor primitive separado; testId first-class |
| **Ant Design** | Typography.Link | No (manual rel) | No doc | No | ellipsis truncation; copyable; editable (en texto de tabla) |
| **Twilio Paste** | Anchor | Sí (rel + icon + SR text) | No doc | No | Nombrado "Anchor" para evitar colisión con router Link |
| **Lightning (Salesforce)** | Sin componente | No | No | — | lightning-formatted-url para record navigation |
| **Primer (GitHub)** | Single | No | No doc | `as` prop | `sx` responsive; muted variant |
| **shadcn/ui** | Sin componente | No | — | — | BYO: usa router `Link` + buttonVariants |
| **Radix Themes** | Link | No | No doc | asChild | `underline="hover"` para navigation; highContrast para fondos oscuros |
| **Chakra UI** | Link | `isExternal` → rel auto | No doc | asChild (v3) | isExternal prop; full style props |
| **GOV.UK** | CSS classes | "(opens in new tab)" requerido | Sí (mandatorio) | — | Más estricto: underline mandatory; visited obligatorio; texto explícito tab |
| **Base Web (Uber)** | Link | No | `linkVisited` token | overrides.Root | Dark mode via theme tokens |
| **Fluent 2** | Link | No | No doc | asChild | `appearance="subtle"`; Windows high contrast via tokens |
| **Gestalt (Pinterest)** | Link | `externalLinkIcon` + aria-label auto | No doc | No | Más completo en external: auto aria-label suffix; display=block/inline |
| **Mantine** | Anchor | No | No doc | component prop | Nombrado "Anchor" (evita React Router collision); hereda Typography |
| **Orbit (Kiwi)** | TextLink | `external` + visually hidden SR text | No doc | No | `type="white"` para dark backgrounds; standAlone para block layout |
| **Evergreen** | Link | No | No doc | `is` prop | Minimalista; polymorphic `is` |
| **Nord** | Sin componente | — | Sí (clínico) | — | CSS global en `<a>`; visited crítico para orientación de records clínicos |

**Patrones clave de la industria:**
1. **External link safety** — Gestalt, Orbit, Paste, Spectrum, Chakra, Polaris convergen en `rel="noopener noreferrer"` automático. GOV.UK requiere texto visible "(opens in new tab)". El consenso es claro: externalizar no es responsabilidad del developer cada vez.
2. **url/onClick → `<a>`/`<button>`** — Polaris es el único que lo implementa técnicamente, pero la doctrina "Link para navegar, Button para acción" (Atlassian) es citada universalmente.
3. **Visited state** — GOV.UK y Nord documentan por qué es accesibilidad real (orientación de navegación para usuarios con dificultades de memoria). Solo Atlassian lo omitió deliberadamente con justificación UX (dense UI).
4. **Naming: Anchor vs. Link** — Paste y Mantine nombran "Anchor" para evitar colisión con React Router `<Link>`. Patrón pragmático que resuelve un pain point real de importaciones en SPAs.

---

## Tokens

**16 tokens** · prefijo `lnk-` · 3 capas (primitivo → semántico → componente)

| Token | Variable Figma | Uso |
|-------|---------------|-----|
| `lnk-default-fg` | `interactive/default` | Color default — #2659EB |
| `lnk-hover-fg` | `interactive/hover` | Color hover — #1E4BD1 |
| `lnk-visited-fg` | `interactive/visited` | Color visited — #7338C0 |
| `lnk-focused-ring` | `focus/ring` | Focus ring — #3F61F2 (2px, offset 2px) |
| `lnk-disabled-fg` | `text/disabled` | Color disabled — #B8B8C0 |
| `lnk-subdued-fg` | `text/secondary` | Tone subdued — #6B7280 |
| `lnk-monochrome-fg` | `text/currentColor` | Tone monochrome — currentColor |
| `lnk-critical-fg` | `status/error/fg` | Tone critical — #DC2626 |
| `lnk-sm-fontSize` | `type/sm` | Font size sm — 13px |
| `lnk-md-fontSize` | `type/md` | Font size md — 14px |
| `lnk-lg-fontSize` | `type/lg` | Font size lg — 16px |
| `lnk-iconSize-sm` | `iconSize/sm` | Icon size sm — 14px |
| `lnk-iconSize-md` | `iconSize/md` | Icon size md — 16px |
| `lnk-iconSize-lg` | `iconSize/md` | Icon size lg — 18px |
| `lnk-gap-sm` | `spacing/1` | Gap icon↔label sm/md — 4px |
| `lnk-gap-lg` | `spacing/2` | Gap icon↔label lg — 6px |

### Especificaciones de espaciado

```
┌──────────────────────────────────────────────────────────┐
│  Link — tamaños y gaps                                   │
│                                                          │
│  sm: [icon 14px] ─ 4px ─ [label 13px/18px] ─ 4px ─ [ext 14px] │
│  md: [icon 16px] ─ 4px ─ [label 14px/20px] ─ 4px ─ [ext 16px] │
│  lg: [icon 18px] ─ 6px ─ [label 16px/24px] ─ 6px ─ [ext 18px] │
│                                                          │
│  Focus ring: 2px, offset 2px, color #3F61F2              │
│                                                          │
│  Frames totales:                                         │
│  Variant(2) × State(5) × Size(3) × Tone(4) = 120        │
│  − 16 exclusiones = 104 frames netos                     │
└──────────────────────────────────────────────────────────┘
```
