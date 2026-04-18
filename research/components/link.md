# Link — Component Research

**Fecha:** 2026-04-17
**Modo:** --max (all patterns, all systems, no scope filter)
**Scope:** All patterns — variant, size, state, router integration, external handling, a11y

---

## Sistemas sin componente dedicado

| Sistema | Razon | Workaround |
|---------|-------|------------|
| Material Design 3 | Filosofia: link es `<a>` HTML con tokens aplicados, no componente abstraido | CSS custom properties `--md-sys-color-primary` + `--md-sys-typescale-body-medium-*` en `<a>` nativos |
| shadcn/ui | Sin Link dedicado — omision intencional; collision con React Router naming | `<a>` nativo o router Link con `buttonVariants` para links estilizados |
| Nord | Sin `<nord-link>` — link color aplicado globalmente via CSS Custom Properties | CSS Custom Properties globales en `<a>` nativos; visited state preservado para navigation orientation clinica |
| Salesforce Lightning | Usa `<a>` directo; `lightning-formatted-url` para record links en contexto CRM | `lightning-formatted-url` para URLs de records; `<a>` nativo para el resto |
| Radix UI (Primitives) | Sin Link primitive — `<a>` nativo ya es accessible por default | Radix Themes provee Link wrapper estilizado via `asChild` |

---

## How Systems Solve It

### Spectrum (Adobe) — "RouterProvider pattern + security automatica"

Spectrum's Link es el sistema mas sofisticado para integracion con routers. El `RouterProvider` pattern permite configurar el router de la aplicacion una sola vez en el root y todos los Link components de Spectrum automaticamente usan ese router — sin `as={RouterLink}` boilerplate por link. `isQuiet` remueve el underline para links de navigation-style. La adicion automatica de `rel="noreferrer noopener"` para `target="_blank"` es una medida de seguridad que los consumidores no pueden olvidar inadvertidamente.

La separacion entre variant standalone (con padding visual para touch targets mas grandes) vs inline (integrado en el flow de texto) aborda dos necesidades diferentes del Link component: links en texto de cuerpo y links como elementos de navegacion independientes. Ambos son necesarios en cualquier DS robusto.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `RouterProvider` para router-agnostic integration | Una configuracion en app root; todos los Links usan el router automaticamente — sin boilerplate por link | HIGH | Patron valioso para DS con multiples consumers; alternativa: `component` prop polymorphic por link |
| Auto `rel="noreferrer"` en `target="_blank"` | Seguridad: reverse tabnapping prevention — consumidores no pueden olvidarla | HIGH | Aplicar siempre automaticamente al detectar target="_blank"; no hacer opt-in |
| `isQuiet` para navigation-style links | Links de navegacion sin underline tienen tratamiento visual diferente a inline links | MED | Boolean `underline` o variant `standalone`/`inline` |
| Standalone vs inline variant | Touch targets y uso visual diferente para links independientes vs en-flow | HIGH | Dos variantes o dos componentes: NavLink/Link |

**Notable Props:** `RouterProvider` en app root; `isQuiet: boolean`; `variant: "primary" | "secondary" | "over-background"`; `target="_blank"` auto-adds `rel="noreferrer noopener"`
**A11y:** React Aria Link: Enter para activacion, `role="link"` correcto para navigation, `aria-disabled` sobre `disabled` HTML attribute.

---

### Carbon (IBM) — "Inline vs standalone distinction + Launch icon standard"

Carbon tiene el sistema mas claro de distincion inline/standalone implementado. El prop `inline: boolean` determina el tratamiento visual y de hover: links inline (en body copy) tienen underline y hover que afecta solo el texto; links standalone (en navegacion o como acciones) pueden llevar el icono `Launch` para externos como un estandar documentado. El token `$link-visited` existe como estandar definido — los teams deben aplicarlo manualmente pero existe como convencion documentada.

El prop `renderIcon` permite agregar cualquier Carbon icon a links standalone — el estandar de usar `Launch` para external links es una convencion, no un enforcement. El prop `size` (sm/md/lg) controla el tamaño del texto del link standalone.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `inline` boolean para distincion visual | Inline links y standalone links tienen tratamientos de hover y spacing diferentes — el boolean enforza el correcto | HIGH | Externalizar como prop o como dos componentes separados: InlineLink / StandaloneLink |
| `Launch` icon estandar para external | Convencion documentada que crea consistencia a traves de IBM products sin enforcement | MED | Icono de external-link automatico al detectar `target="_blank"` o URL externa |
| `$link-visited` token | Visited state como token del DS — consistencia sin enforcement | MED | Token `link-visited` o CSS var en el DS; documentar como estandar |
| `renderIcon` para icon placement | Composicion flexible — cualquier icon del DS en el link | MED | `icon` slot con trailing position default |

**Notable Props:** `inline: boolean`; `renderIcon`; `size: "sm" | "md" | "lg"`; `disabled`; `$link-visited` token
**A11y:** `<a>` con semantica estandar. Disabled: `<a>` sin `href` con `aria-disabled="true"`. Icon-only links requieren `aria-label`.

---

### Polaris (Shopify) — "Semantic enforcement: url vs onClick determines element"

Polaris implementa el enforcement semantico mas fuerte de cualquier sistema: el prop `url` renderiza un `<a>` element; `onClick` sin `url` renderiza un `<button>`. Esto hace imposible usar un link para acciones no-navegacion — el DS enforza el contrato semantico HTML automaticamente. La deteccion automatica de URLs externas aplica `target="_blank"` y `rel="noopener noreferrer"` sin configuracion. El announcement visually-hidden de "(opens in a new tab)" es el mas completo en Tier 1.

`monochrome` renderiza el link en el color de texto actual (para uso en surfaces de color como banners, notifications) manteniendo el affordance de underline. `removeUnderline` suprime el underline para links de navegacion-style.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| `url` vs `onClick` determina `<a>` vs `<button>` | Enforcement automatico del contrato semantico — imposible usar links para acciones | HIGH | Esta es la decision de API mas importante para cualquier Link component |
| Deteccion automatica de external | `url` con dominio externo → `target="_blank"` + `rel` automaticamente | HIGH | Implementar deteccion o requerir prop `external: boolean` explicit |
| `monochrome` para colored surfaces | Links en banners/notifications necesitan color heredado para legibilidad | MED | Boolean `inherit-color` o `monochrome` para uso en surfaces de color |
| Visually-hidden "(opens in a new tab)" | Disclosure de behavior para screen readers — sin dependencia de visual-only icon | HIGH | Texto visually-hidden es mejor que aria-label en el icono para contexto completo |

**Notable Props:** `url: string`; `onClick` (sin url → `<button>`); `external: boolean`; `monochrome: boolean`; `removeUnderline: boolean`
**A11y:** `url`/`onClick` enforza semantica HTML correcta. External: `rel="noopener noreferrer"` + visually-hidden "(opens in a new tab)". El patron de a11y mas completo en Tier 1.

---

### Atlassian — "Two-layer architecture: Anchor + Link"

Atlassian publica una doctrina explicita "Button vs. Link": Link para navegacion, Button para acciones. La arquitectura de dos capas es unica: `Anchor` (primitive sin estilo con routing integration) y `Link` (componente estilizado). Equipos pueden usar `Anchor` para links custom-styled sin reimplementar routing. La omision deliberada de visited state es la decision mas controvertida — basada en investigacion de usuario de que el color visited agrega ruido en la UI densa de Jira sin beneficio significativo.

`testId` como prop de primera clase refleja la cultura de ingenieria de Atlassian donde test automation es expected en todos los componentes.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Anchor (primitive) + Link (styled) | Separation de concerns: behavior/routing vs. visual; custom styled links usan Anchor | MED | Patron valioso si el DS tiene muchos custom link contexts; simplicidad alternativa |
| Sin visited state (deliberado) | User research: visited color agrega ruido en UIs densas sin beneficio claro | HIGH | Decision controversial — GOV.UK y Nord argumentan opuesto para sus contextos |
| `testId` first-class | Cultura de test automation; data-testid baked in | LOW | Conveniencia; baja prioridad si no es un requirement del DS |

**Notable Props:** `Anchor` con href y router integration; `Link` con href, target; `testId`; sin distincion inline/standalone
**A11y:** `<a>` estandar; `aria-current="page"` para navigation active links; router-aware.

---

### Ant Design — "Typography.Link: ellipsis + disabled state"

Ant Design ubica los links dentro de la familia Typography como `Typography.Link`. Esta decision habilita que los links compartan el prop `ellipsis` (truncacion de texto con tooltip) y `copyable` con Typography.Text — un valor practico real para URLs largas en tablas y displays de datos. El prop `disabled` implementa disable visual y funcional (que HTML `<a>` no soporta nativamente) con `cursor: not-allowed` y click blocked.

La ausencia de router integration es la mayor debilidad — SPAs deben usar el router Link directamente o wrapper con logica de routing. `target="_blank"` no agrega `rel="noopener noreferrer"` automaticamente — un gap de seguridad vs. Spectrum y Polaris.

**Design Decisions:**
| Decision | Why | Impact | Para tu caso |
|----------|-----|--------|--------------|
| Placement en Typography family | Links comparten `ellipsis` y `copyable` — valioso para URLs largas en tablas | MED | Considerar si links necesitan ellipsis; si es comun, la herencia de Typography es una ventaja |
| `disabled` state implementado | HTML `<a>` no tiene disabled — implementacion custom cubre el gap | MED | `disabled` en links es un pattern comun pero semanticamente cuestionable — Button disabled es mas correcto |
| Sin auto-security en `target="_blank"` | Gap de seguridad — consumidores deben agregar `rel` manualmente | HIGH | No replicar este gap — siempre auto-agregar rel en external links |

**Notable Props:** `href`; `target`; `disabled: boolean`; `ellipsis: boolean | {tooltip}`; `copyable`
**A11y:** `<a>` estandar. Disabled: `aria-disabled` con click suppression. `ellipsis` con tooltip para full-text accessible.

---

### Twilio Paste — "Anchor: naming semantico + external safety"

Paste nombra el componente "Anchor" (no "Link") para alineacion con el elemento HTML `<a>`, evitando el naming collision con componentes de router. External link indicator automatico con texto visually-hidden "opens in new tab" y `rel="noopener noreferrer"` para todos los `target="_blank"` links. Una de las implementaciones mas completas de external link safety en Tier 2.

**Notable Props:** `href`, `variant` (inherit color), external link indicator automatico
**A11y:** Visually-hidden "(opens in new tab)"; `rel` automatico.

---

### GitHub Primer — "Link con `as` prop para router integration"

Primer's Link soporta el `as` prop para rendering como router Link (React Router, Next.js). Variante `muted`/`secondary` para links de menor enfasis visual. Una de las implementaciones mas pragmaticas de router integration via polymorphism.

**Notable Props:** `as` (polymorphic router); `muted`; `secondary`; `sx` for style extensions
**A11y:** `<a>` estandar con semantica correcta.

---

### Radix UI (Themes) — "asChild + underline control"

Radix Themes-only styled wrapper con `asChild` para router integration — el patron headless mas limpio para composicion. `underline: "always"|"hover"|"none"` para control fino. `highContrast` para links en surfaces de color.

**Notable Props:** `asChild` (router polymorphism); `underline: "always"|"hover"|"none"`; `highContrast: boolean`; `color`
**A11y:** `<a>` nativo es ya accessible — el wrapper solo agrega styling.

---

### Chakra UI — "isExternal + asChild/as polymorphism"

`isExternal: boolean` automaticamente agrega `target="_blank" rel="noopener noreferrer"` — uno de los props de external link mas claros en el ecosistema. v3 migro a `asChild` pattern para router integration. Full style props passthrough para customizacion.

**Notable Props:** `isExternal: boolean`; `as`/`asChild`; style props
**A11y:** `isExternal` aplica seguridad automatica; `<a>` estandar.

---

### Gestalt (Pinterest) — "externalLinkIcon con aria-label + display variants"

`externalLinkIcon` prop con `aria-label` automatico ("opens in a new tab") — el disclosure de external link mas explicito en Tier 3. `rel="noopener noreferrer"` automatico en `target="_blank"`. `display` prop (inline/inlineBlock/block) para card-title link patterns (inline images + text con el link como wrapper).

**Notable Props:** `externalLinkIcon`; `display: "inline"|"inlineBlock"|"block"`; auto `rel` en external
**A11y:** `aria-label` automatico para external icon — la implementacion mas explicita de disclosure.

---

### Mantine — "Anchor: typography scale + truncate + component polymorphism"

Mantine nombra "Anchor" (no "Link") — resuelve el naming collision con React Router elegantemente. Construido sobre Text component, hereda toda la escala tipografica. `component` prop para router polymorphism. `truncate` para URLs largas.

**Notable Props:** `component` (polymorphic); `truncate`; inherits Text typography props
**A11y:** `<a>` estandar via polymorphism.

---

### Orbit (Kiwi.com) — "TextLink con external + type para dark backgrounds"

`external: boolean` agrega `target="_blank"` con visually-hidden "(opens in new tab)" para screen readers. `type: "primary"|"secondary"|"white"` para legibilidad en dark backgrounds (vuelos en cards oscuras). `standAlone` para block-level link layout.

**Notable Props:** `external: boolean`; `type: "primary"|"secondary"|"white"`; `standAlone: boolean`
**A11y:** Visually-hidden "(opens in new tab)"; `<a>` estandar.

---

### Fluent 2 (Microsoft) — "inline prop + appearance subtle + disabled"

`inline: boolean` para alineacion con baseline de texto. `appearance="subtle"` para links de bajo enfasis. `disabled` remueve href manteniendo el texto con `aria-disabled` para screen readers. Windows high-contrast mode via token mapping.

**Notable Props:** `inline: boolean`; `appearance: "subtle"`; `disabled`
**A11y:** `aria-disabled` en estado disabled; high-contrast mode support.

---

### GOV.UK — "Underline mandatory + visited state required"

Sin componente — `<a>` nativo con CSS modifier classes. Underline mandatory en body copy (WCAG 1.4.1). Visited state `:visited` purple preservado — investigacion documentada de que ayuda a usuarios con dificultades de memoria a orientarse en transacciones de gobierno. "(opens in new tab)" visible requerido para external links.

**Notable Props:** CSS classes (no JS component); `.govuk-link--muted`, `.govuk-link--inverse`
**A11y:** Underline obligatorio; visited preservado; "(opens in new tab)" visible requerido.

---

### Evergreen (Segment) — "Polymorphic `is` prop + color variants"

`is` polymorphic prop para router integration. Color variant tokens. External link handling manual — consumidores deben agregar `rel` explicitamente.

**Notable Props:** `is` (polymorphic); color variants; sin external link handling automatico
**A11y:** `<a>` estandar.

---

### REI Cedar — "CdrLink: inline/standalone + icon support"

Vue link con dos variantes: prominent (standalone) y inline. Icon support built-in. WCAG 2.1 AA compliance documentada.

**Notable Props:** `modifier: "standalone"`; icon support; WCAG 2.1 AA
**A11y:** Standalone links con icon accesible.

---

## Pipeline Hints

### Archetype Recommendation

**Archetype: navigation primitive con safety de external links y router integration**

El Link component es el clearest ejemplo de un elemento HTML que los DS envuelven por razones de: (1) styling integration, (2) router polymorphism, (3) external link safety. La accesibilidad del `<a>` nativo ya es excelente — el valor del DS component es en convenios visuales, convencion de visited state, y la prevencion de misuse (link sin href, link para acciones).

**Recomendacion:** Implementar como `Link` (o `Anchor` para evitar naming collision) con: auto-security para external, `as`/`component` polymorphism para routers, variant inline/standalone, y `url` vs `onClick` semantic enforcement (patron Polaris).

### Slot Consensus Table

| Slot | Sistemas | Consenso |
|------|----------|----------|
| href/url (destination) | Todos excepto M3/shadcn/Nord | 19/19 sistemas con link |
| children (link text) | Todos | 19/19 |
| icon (leading/trailing) | Carbon, Cedar, Gestalt, Orbit | 4/19 |
| external link indicator | Paste, Polaris, Chakra, Gestalt, Orbit, Spectrum | 6/19 |
| visually-hidden disclosure text | Polaris, Paste, Orbit | 3/19 |

### Property Consensus Table

| Propiedad | Valores observados | Consenso |
|-----------|-------------------|---------:|
| variant/appearance | primary, secondary, subtle, over-background, white, muted | 8/19 |
| underline | always, hover, none | 4/19 |
| external/isExternal | boolean | 6/19 |
| target | _blank, _self, _parent | todos |
| size | sm, md, lg | 3/19 |
| display | inline, inlineBlock, block, standalone | 3/19 |
| disabled | boolean | 5/19 |
| rel | noopener noreferrer (auto) | 6/19 |

### Boolean Properties Table

| Prop | Default | Sistemas |
|------|---------|----------|
| isExternal / external | false | Chakra, Orbit, Carbon (Launch icon) |
| isQuiet / removeUnderline | false | Spectrum, Polaris |
| monochrome | false | Polaris |
| inline | false | Carbon, Fluent2 |
| standAlone | false | Orbit |
| highContrast | false | Radix Themes |
| disabled | false | Ant Design, Fluent2, Carbon |
| truncate / ellipsis | false | Ant Design, Mantine |

### State Coverage Table

| Estado | Sistemas | Consenso |
|--------|----------|----------|
| default | Todos | 19/19 |
| hover | Todos | 19/19 |
| focus (visible outline) | Todos | 19/19 |
| active | Mayoria | 15/19 |
| visited | GOV.UK, Nord, Carbon, Base Web | 4/19 |
| disabled | Ant Design, Carbon, Fluent2 | 3/19 |
| loading (link que navega) | Ninguno | 0/19 |

### Exclusion Patterns

- **Sin "current" state built-in**: `aria-current="page"` para navigation links activos debe agregarse manualmente; solo Atlassian lo documenta explicitamente
- **Sin loading state**: No sistema provee feedback de navegacion en-progress
- **Sin icon-leading built-in en la mayoria**: Carbon `renderIcon` y Cedar son los unicos con icon built-in — la mayoria compone icons externamente
- **Sin multi-line enforcement**: Ninguno limita la longitud del link text (solo Ant Design tiene ellipsis)

### Building Block Candidates

- `Link` / `Anchor` → base navegacion con href + router polymorphism
- `ExternalLink` → Link con external indicator automatico
- `NavLink` → Link con `aria-current` + active state styling
- `InlineLink` → Link optimizado para uso dentro de texto de cuerpo

### Enum / Configuration Properties

```
underline: "always" | "hover" | "none"
display: "inline" | "block" | "inlineBlock"
variant: "primary" | "secondary" | "subtle" | "over-background"
target: "_blank" | "_self" | "_parent" | "_top"
```

### A11y Consensus

| Dimension | Consenso | Implementacion |
|-----------|----------|----------------|
| Role | `<a href>` nativo — role="link" implicito | Nunca usar `<div role="link">` — 100% `<a>` nativo |
| Teclado | Tab para focus; Enter para activar | Nativo via `<a>` element |
| External links | `rel="noopener noreferrer"` + disclosure de "(opens in new tab)" | Auto en `target="_blank"`; visually-hidden text > icon aria-label |
| Link text | Descriptivo en isolation — sin "click here" ni "read more" | Documentar como guideline; `aria-label` como escape hatch |
| Visited state | No suprimir sin razon fuerte | GOV.UK y Nord documentan usuarios que dependen de visited |
| Disabled | `aria-disabled="true"` sobre `disabled` HTML attr | `disabled` HTML attr remueve del tab order — usar `aria-disabled` + prevent click |
| APG Pattern | Link nativo — no hay APG pattern adicional | `<a>` con href para navegacion; `<button>` para acciones |

---

## What Everyone Agrees On

1. **`<a href>` es el unico elemento correcto para navigation links.** Sin excepcion — 19/19 sistemas con link component renderizan `<a>`. Nunca `<div role="link">`.
2. **`rel="noopener noreferrer"` en `target="_blank"` es obligatorio.** 6 sistemas lo aplican automaticamente — es el standard de seguridad de toda la industria.
3. **Links para navegacion, buttons para acciones.** La doctrina Button-vs-Link es universal — Polaris, Atlassian, GOV.UK, y todos los demas la documentan explicitamente.
4. **External links necesitan disclosure para usuarios de screen readers.** "(opens in new tab)" visually-hidden o via aria-label en el icono — el consenso es que el disclosure es obligatorio, no opcional.
5. **Visited state no debe ser suprimido por defecto.** GOV.UK y Nord proveen los argumentos mas fuertes documentados — orientation para usuarios con memory challenges.
6. **Router integration via polymorphism es el patron moderno.** `as`, `asChild`, `component`, `RouterProvider` — todos resuelven el mismo problema: cliente-side navigation sin hard reload.
7. **Link text debe ser descriptivo en isolation.** "Click here" y "Read more" son anti-patrones universales — el texto del link debe describir el destino sin contexto adicional.

---

## Where They Disagree

**1. ¿`url` vs `onClick` enforcement o componente unico con ambos?**
- **Option A (Polaris):** `url` vs `onClick` determina el elemento HTML — enforcement semantico automatico, cero misuse posible
- **Option B (todos los demas):** Un componente con ambos props — mas flexible, pero permite links sin href (anti-patron)

**2. ¿RouterProvider global o polymorphic `as`/`component` por link?**
- **Option A (Spectrum):** `RouterProvider` una vez en el root — zero boilerplate; configuracion centralizada
- **Option B (Primer, Chakra, Mantine, Radix):** `as`/`component` prop per link — mas explicit, mas flexible, mas portable

**3. ¿Visited state incluido o excluido?**
- **Option A (GOV.UK, Nord, Carbon, Base Web):** Visited state is a navigation orientation feature — preservar siempre
- **Option B (Atlassian):** Visited agrega ruido en UIs densas — omitir basado en user research de Jira

**4. ¿External link indicator automatico o prop explicit?**
- **Option A (Paste, Spectrum, Gestalt, Orbit):** Auto-apply indicator y `rel` en external links — seguridad y disclosure sin posibilidad de olvido
- **Option B (Chakra `isExternal`, Carbon `renderIcon`):** Prop explicit `isExternal`/`external` — mas explicito, menos automagic
- **Option C (Ant Design, Evergreen):** Sin handling automatico — responsabilidad total del consumidor

**5. ¿Nombrar el componente "Link" o "Anchor"?**
- **Option A (Link — mayoria):** Nombre familiar; alineado con el concepto UI
- **Option B (Paste, Mantine, Radix partial):** "Anchor" — alineado con el elemento HTML; elimina naming collision con React Router `<Link>`

---

## Visual Patterns Found

### Patron 1: Inline link en body text

```
Este es un parrafo con un link inline que aparece dentro del flujo
de texto. El link ───── texto del link ───── continua el flujo del
parrafo sin interrumpir el rhythm visual.
↑ underline siempre en body copy (WCAG 1.4.1)
```

### Patron 2: Standalone link con icon

```
[→] Standalone navigation link
[↗] External link con icono   ← "(opens in a new tab)" visually-hidden
[←] Back to previous page
```

### Patron 3: Link como nav item con active/visited states

```
Navegacion:
  Inicio
▶ Productos        ← active: aria-current="page", estilo diferenciado
  Acerca de
  Contacto         ← visited: color diferente (si se preserva)
```

### Patron 4: Semantic enforcement (Polaris model)

```
Navegacion:              Accion:
<a href="/pagina">       <button onClick={handler}>
  Ir a pagina              Realizar accion
</a>                     </button>
↑ renders <a>            ↑ renders <button>
```

---

## Risks to Consider

| Riesgo | Severidad | Detalle |
|--------|-----------|---------|
| Links sin `href` o con `href="#"` | HIGH | Links sin href no estan en el tab order por defecto; links con `href="#"` navigatan al top de la pagina — ambos son anti-patrones comunes que rompen a11y. El `url` vs `onClick` enforcement de Polaris los previene. |
| `target="_blank"` sin `rel="noopener noreferrer"` | HIGH | Vulnerabilidad de reverse tabnapping — la pagina destino puede acceder y manipular `window.opener`. 6 sistemas lo aplican automaticamente — los demas dejan este gap en el consumidor. |
| Link text no descriptivo | HIGH | "Click here", "Read more", o URL raw como text violan WCAG 2.4.6 — screen reader users leen links en isolation. Sin enforcement en el API, require educacion de consumidores. |
| Visited state suprimido con CSS reset | MEDIUM | Muchos CSS resets y utility frameworks (Tailwind) eliminan `:visited` styling. Documentar que el DS preserva visited intencionalmente y que los consumers no deben sobreescribir. |
| Router collision naming | LOW | En proyectos con React Router o Next.js, `import { Link } from '@ds/components'` y `import { Link } from 'react-router-dom'` requieren aliasing. El naming "Anchor" (Paste, Mantine) previene esto. |

---

## Next Steps

1. **Decidir naming: "Link" vs "Anchor"** — evaluar si el DS target tiene React Router / Next.js como dependency comun.
2. **Definir router integration pattern**: RouterProvider (Spectrum) vs `component`/`as` prop polymorphism.
3. **Implementar external link auto-handling**: `rel="noopener noreferrer"` + visually-hidden disclosure — no hacer opt-in.
4. **Decidir sobre visited state**: Evaluar si el contexto del DS beneficia a usuarios que necesitan navigation orientation.
5. **Confirmar semantic enforcement**: ¿Polaris-style `url` vs `onClick` o un componente mas permisivo?
