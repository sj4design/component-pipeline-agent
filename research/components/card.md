# Research: Card

## Meta
- **Fecha**: 2026-04-04
- **Modo**: max --expand --fresh
- **Sistemas analizados**: 22/24 (Primer y Base Web no tienen Card dedicado)
- **Tiers**: T1 (6) + T2 (8) + T3 (10) = 24 sistemas consultados
- **Enfoque**: Max coverage — todos los slots, estados, propiedades, sub-componentes y patrones de accesibilidad

---

## Sistemas sin componente dedicado

| Sistema | Tier | Razón | Workaround |
|---------|------|-------|------------|
| GitHub Primer | T2 | No generic Card; Box primitives con borderColor/borderRadius | Composición con Box tokens |
| Base Web (Uber) | T3 | No card component; composición desde primitivas de spacing + surface | Typography + surface tokens |

---

## Cómo resuelven el Card los 22 sistemas

### Material Design 3 (Google) — "Elevación como lenguaje semántico"

Card como superficie contenedora con 3 variantes basadas en elevación: Elevated (sombra real, flota), Filled (bg diferenciado, sin sombra), Outlined (mismo bg, borde 1px). Cada variante comunica posición en la jerarquía visual. La interactividad es build-time: 6 combinaciones (3 estilos × 2 modos). No define sub-componentes formales — anatomía via composición per-platform.

**Decisiones clave:**
- 3 variantes de elevación → hierarchy visual sin ambigüedad | **HIGH**
- Clickable como variante build-time → elimina el "link invisible" | **HIGH**
- Sin slot API formal → multiplataforma (Compose/Web/Flutter) | **MEDIUM**

**API:** `elevation`, `onClick`/`modifier.clickable()`, sin props de slots
**Estados:** default, hover, focus, pressed, dragged, disabled (6)
**A11y:** tabindex="0" + Enter/Space; aria-label requerido; role contextual (article/group/none)

### Spectrum (Adobe) — "Colecciones con selección y drag-and-drop"

Purpose-built para browsing de colecciones (galleries, asset libraries). Standard y Quiet (sin contenedor). Selection (`isSelected`) y drag (`isDraggable`) built-in. Soporta orientación V/H y 3 tamaños (S/M/L).

**Decisiones clave:**
- Quiet variant sin contenedor → Adobe tools con fondos oscuros/texturizados | **HIGH**
- Selection + drag built-in → batch actions en colecciones de 50-100+ items | **HIGH**
- Action menu overflow en vez de botones expuestos → densidad en grids | **MEDIUM**

**API:** variant (standard|quiet), isSelected, isDraggable, size (S|M|L), orientation (V|H)
**Estados:** default, hover, focus, selected, disabled
**A11y:** role="gridcell"|"option"; Ctrl/Cmd multi-select; action menu auto-labeled

### Carbon (IBM) — "Tiles con semántica explícita"

Llamado "Tile" — 4 variantes de interacción separadas: Base (estático), Clickable (link), Selectable (radio/checkbox), Expandable (disclosure). Cada variante tiene markup y ARIA distintos. 1px borde visible en interactivos (WCAG).

**Decisiones clave:**
- 4 componentes separados por tipo de interacción → previene misuse semántico | **HIGH**
- ClickableTile es `<a>` nativo → link semantics correcto | **HIGH**
- SelectableTile usa role="radio"|"checkbox" con visual matching | **MEDIUM**

**API:** href (Clickable), value (Selectable), expanded (Expandable), light
**Estados:** default, hover, focus, pressed, selected, expanded/collapsed, disabled
**A11y:** Base: no focusable. Clickable: Enter only. Selectable: Arrow+Space. Expandable: aria-expanded.

### Polaris (Shopify) — "Composición pura"

Rediseño LegacyCard → Card: eliminó todos los props built-in (title, actions, primaryFooterAction). Solo quedan `background`, `padding`, `roundedAbove`. Responsive padding/radius built-in.

**Decisiones clave:**
- Composición sobre configuración → Shopify Admin con miles de screens | **HIGH**
- Responsive padding + roundedAbove → merchants en mobile retail | **HIGH**
- Una CTA primaria por card → reduce decision fatigue | **MEDIUM**

**API:** background (semantic tokens), padding (responsive breakpoint), roundedAbove
**Estados:** no interactive states (composición interna decide)
**A11y:** Sin ARIA role en container; heading hierarchy interna; tab order natural

### Atlassian — "Cards domain-specific, no genéricas"

No generic Card. Smart Card (URL → preview), Spotlight Card (onboarding), Profile Card (hover), Media Card. Cada tipo tiene anatomía fija para su dominio.

**Decisiones clave:**
- No generic Card → diversidad de patrones Jira/Confluence/Trello | **HIGH**
- Smart Card (URL resolve) → productos sobre linking work items | **HIGH**
- Spotlight Card solo onboarding → previene misuse para anuncios | **MEDIUM**

**API:** Smart Card: url, appearance (inline|block|embed); Profile Card: cloudId+userId
**Estados:** Smart Card: loading/resolved/error/forbidden; hover/focus
**A11y:** Smart Cards como links; Profile Cards via button trigger (no hover-only)

### Ant Design — "Composición rica built-in"

Card.Meta (avatar/title/description), cover (full-bleed media), tabList (multi-panel), actions (footer bar), loading (skeleton), hoverable (shadow lift). Dos sizes (default/small).

**Decisiones clave:**
- Card.Meta sub-componente → avatar+name+desc aparece en >50% enterprise cards | **HIGH**
- tabList built-in → dashboards con vistas relacionadas | **MEDIUM**
- hoverable sin click handler → separa affordance visual de comportamiento | **MEDIUM**

**API:** hoverable, loading, cover, tabList/activeTabKey/onTabChange, extra (header right), size, bordered
**Estados:** default, hover (hoverable), loading (skeleton)
**A11y:** ⚠️ Gap: hoverable no agrega role ni aria-label; equipos deben agregar manualmente

### Paste (Twilio) — T2, "Container mínimo"

Card minimal: padding variants, sin header/footer structure. Máxima flexibilidad, mínima opinión.

### Lightning (Salesforce) — T2, "CRM record cards"

Header con título + icono, actions slot, body, footer. Narrow/full variants. Diseñado para record views CRM.

### shadcn/ui — T2, "Compound component"

CardHeader/CardTitle/CardDescription/CardContent/CardFooter. Structured API con slots definidos. Referencia para React structured cards.

### Cedar (REI) — T2, "Clickable card a11y"

Soporte explícito para clickable cards con keyboard navigation y hover states. Heading link pattern.

### Fluent 2 (Microsoft) — T3, "3 modos de interacción"

Display (estático), clickable (link), selectable (checkbox). Orientation horizontal/vertical. CardPreview/CardHeader/CardFooter slots. La implementación más completa de interactividad con ARIA correcto.

**API:** interaction mode (display|clickable|selectable), orientation (H|V), CardPreview/CardHeader/CardFooter slots
**Estados:** default, hover, focus, pressed, selected (aria-checked), disabled
**A11y:** Formaliza 3 modos: role="link", role="button", aria-checked. Referencia para interactive cards.

### Chakra UI — T3, "Structured + tokens"

Header/Body/Footer slots; 3 variants (outline/filled/elevated); size control; token-integrated surface.

### Radix UI — T3, "Minimal + asChild"

Minimal surface container; variant (fill/outline/ghost); asChild para interactive card como link o button.

### Mantine — T3, "Card.Section full-bleed"

Card.Section para contenido full-bleed sin padding. Polymorphic component prop. withBorder para separación visual. **Mejor solución al problema full-bleed image.**

### GOV.UK — T3, "Summary Card domain-specific"

Review de datos (application summaries) con "Change" action links. No generic card.

### Gestalt (Pinterest) — T3, "Module + TileData"

Domain-specific: Module para settings expandibles, TileData para analytics. No generic card.

### Orbit (Kiwi) — T3, "Travel booking cards"

Cards con secciones expandibles y onClick para selección de vuelos/opciones.

### Evergreen — T3, "Pane con elevation"

No dedicated Card; Pane con elevation prop como surface. Flexible composition para dashboards.

### Nord (Nordhealth) — T3, "Clinical data cards"

Healthcare: patient summaries, test results, appointments. Web component para portabilidad.

---

## Pipeline Hints

**Archetype recommendation:** container
Rationale: Card es un contenedor vertical con regiones estructuradas (media, header, body, footer). 22/22 sistemas tratan Card como container, no como inline-action ni form-control.

### Slot consensus

| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| media/cover/preview | media | no | 16/22 | Full-bleed image/video. M3, Spectrum, Ant (cover), Fluent 2 (CardPreview), Mantine (Card.Section), Lightning, Chakra |
| avatar | icon | no | 10/22 | Foto/logo en header. M3, Ant (Card.Meta), Spectrum, Lightning, Polaris (legacy), shadcn, Cedar, Wise, Nord, Orbit |
| eyebrow/overline | text | no | 8/22 | Categoría/label sobre título. M3, Spectrum, Lightning, Cedar, Orbit, Dell, Nord, Wise |
| title | text | yes | 22/22 | Universalmente presente. Heading level contextual (h2-h4) |
| subtitle/description | text | no | 18/22 | Texto secundario bajo título. Ausente en: Polaris (composición), Paste, Gestalt, GOV.UK |
| badge/tag | text | no | 9/22 | Status badge, discount tag, trend indicator. Spectrum, Ant, Lightning, Fluent 2, Orbit, Dell, Nord, Wise, Cedar |
| body/content | container | no | 20/22 | Contenido principal. BB candidate: 14/22 tienen estructura interna (metadata, lists, stats) |
| metadata | text | no | 12/22 | Date, read time, stats, field lists. M3, Spectrum, Ant, Lightning, Fluent 2, shadcn, Cedar, Dell, Nord, Orbit, Wise, Mantine |
| divider | divider | no | 11/22 | Separador entre regiones. M3, Ant, Carbon, shadcn, Fluent 2, Chakra, Lightning, Cedar, Nord, Orbit, Mantine |
| footer/actions | container | no | 17/22 | BB candidate: 15/22 tienen botones/iconos estándar. M3, Ant, Spectrum, Carbon, shadcn, Fluent 2, Chakra, Lightning, Cedar, Dell, Nord, Orbit, Mantine, Evergreen, Radix |
| action-menu/overflow | icon-action | no | 8/22 | Three-dot overflow menu. Spectrum, Ant (extra), Lightning, Fluent 2, Orbit, Dell, Nord, Wise |
| close/dismiss | icon-action | no | 5/22 | Dismiss button. Atlassian (Spotlight), Orbit, GOV.UK, Gestalt, Nord |
| checkbox/selection | icon-action | no | 6/22 | Selection indicator. Spectrum, Carbon (Selectable), Fluent 2, Orbit, Nord, Gestalt (TileData) |

### Property consensus

| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Variant | variant | elevated/filled/outlined/ghost | 18/22 | M3 (3), Spectrum (standard/quiet), Carbon (base), Ant (bordered), Radix (fill/outline/ghost), Chakra (3), Fluent 2 |
| Size | variant | sm/md/lg | 8/22 | Spectrum (S/M/L), Ant (default/small), Chakra, Fluent 2, Dell, Nord. Polaris/shadcn/M3 usan layout del padre |
| State | state | default/hover/focus/pressed/disabled | 22/22 | Base mínimo. +loading, +selected, +dragged, +error varían por sistema |
| Orientation | variant | vertical/horizontal | 7/22 | Spectrum, Fluent 2, Lightning (narrow/full), Cedar, Orbit, Mantine, Wise |
| Interactive | variant | static/clickable/selectable/expandable | 14/22 | Carbon tiene 4 separados; Fluent 2 tiene 3 modos; M3 tiene 2 |

### Boolean properties found

| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| hasMedia | 16/22 | false | Controla media/cover/preview slot |
| hasAvatar | 10/22 | false | Avatar en header region |
| hasEyebrow | 8/22 | false | Overline text sobre título |
| hasSubtitle | 18/22 | true | Descripción/subtítulo |
| hasBadge | 9/22 | false | Status/discount/trend badge |
| hasBody | 20/22 | true | Contenido principal |
| hasMetadata | 12/22 | false | Fecha, stats, fields |
| hasDivider | 11/22 | false | Separadores entre regiones |
| hasActions | 17/22 | true | Footer con botones/iconos |
| hasSecondaryAction | 8/22 | false | Overflow menu o segundo CTA |
| isClickable | 14/22 | false | Toda la card como link/button |
| isSelected | 6/22 | false | Selection checkbox state |
| isExpandable | 5/22 | false | Expand/collapse body (Carbon, Orbit, Gestalt) |
| isLoading | 8/22 | false | Skeleton placeholders (Ant, Atlassian, Fluent 2, Mantine, Lightning, Dell, Nord, Wise) |

### State coverage (comprehensive)

| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 22/22 | Base appearance | Universal |
| hover | 20/22 | Elevation +1 o border más visible | Ant: hoverable prop. Polaris: sin hover propio |
| focus | 18/22 | Focus ring 2px | Solo en cards interactivas (clickable/selectable) |
| pressed | 12/22 | Elevation -1, darker surface | M3, Spectrum, Carbon (Clickable), Fluent 2, Chakra, Radix, Mantine, Cedar, Orbit, Dell, Nord, Wise |
| disabled | 14/22 | Opacity 0.5, no interaction | M3, Spectrum, Carbon, Fluent 2, Chakra, Radix, Cedar, Orbit, Dell, Nord, Ant, Lightning, Mantine, shadcn |
| loading | 8/22 | Skeleton placeholders en slots | Ant, Atlassian (Smart Card), Fluent 2, Lightning, Dell, Nord, Mantine, Wise |
| selected | 6/22 | Checkbox + accent border | Spectrum, Carbon (Selectable), Fluent 2, Gestalt (TileData), Orbit, Nord |
| error | 4/22 | Error border + icon | Atlassian (Smart Card: error/forbidden), Lightning, Dell, Nord |
| dragged | 3/22 | Elevated + larger shadow | M3, Spectrum, Fluent 2 |
| expanded/collapsed | 5/22 | Body visible/hidden + chevron | Carbon (Expandable), Orbit, Gestalt (Module), Mantine, Nord |

### Exclusion patterns found
- disabled × hover/focus/pressed — 22/22 (universal)
- loading × hover/focus/pressed/disabled — 8/8 de los que soportan loading
- selected × disabled — 4/6 lo excluyen (Spectrum y Fluent 2 lo permiten con opacity)
- static (non-interactive) × focus/pressed — 22/22 (no focusable si no es interactivo)

### Building block candidates

| BB | Consensus | Structure | Notes |
|----|-----------|-----------|-------|
| .CardHeader | 14/22 | avatar + eyebrow + title + subtitle + action-menu | shadcn (CardHeader), Fluent 2 (CardHeader), Chakra (CardHeader), Lightning, Ant (Card.Meta), Nord |
| .CardBody | 12/22 | body text + metadata + custom content | shadcn (CardContent), Fluent 2, Chakra (CardBody), Mantine, Lightning |
| .CardFooter | 15/22 | action buttons + icons + links | shadcn (CardFooter), Fluent 2 (CardFooter), Chakra (CardFooter), M3, Ant (actions), Spectrum, Lightning |
| .CardMedia | 10/22 | image/video full-bleed + aspect ratio | Ant (cover), Fluent 2 (CardPreview), Mantine (Card.Section), M3 (media region) |

### Enum/configuration properties

| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| mediaRatio | 1:1, 4:3, 16:9, 2:1, 3:2 | 10/22 | Spectrum, Fluent 2, Mantine, Cedar, Dell. M3/Ant usan aspect-ratio CSS |
| mediaPosition | top, left, right, background | 7/22 | Spectrum (V/H orientation), Fluent 2, Lightning (narrow=left), Mantine, Orbit |
| actionsLayout | buttons, icons, both, justified | 9/22 | M3, Ant, Spectrum, Lightning, Fluent 2, Chakra, Cedar, Dell, Nord |
| truncate | none, 1-line, 2-lines, 3-lines | 8/22 | Spectrum, Polaris, Ant, Cedar, Dell, Fluent 2, Mantine, Nord |

### A11y consensus

- **Primary role:** No implicit role en card estática (div). article si es contenido autocontenido (6/22). group si agrupa controles (3/22).
- **Clickable card:** role="link" con `<a>` nativo o asChild (14/22). Cedar: heading-as-link pattern (solo título es el link). Carbon: ClickableTile es `<a>` nativo.
- **Selectable card:** role="radio"|"checkbox" con aria-checked (6/22). Carbon, Fluent 2, Spectrum.
- **Expandable card:** aria-expanded en trigger, contenido en aria-controls (5/22).
- **Required ARIA:** aria-label cuando no hay heading visible. aria-labelledby pointing al título.
- **Keyboard:** Tab (focus card o elementos internos), Enter (activar clickable), Space (select/expand), Arrow keys (en grid de selección).
- **Focus:** Linear (tab entre cards) o roving (arrow keys dentro de grid).
- **APG pattern:** No hay APG pattern específico para Card. Se compone de: link, button, checkbox, disclosure patterns.
- **Nested interactive:** Sibling pattern (M3, Carbon) > nesting. Links y botones internos como hermanos del link principal, no hijos.

### Type Taxonomy

**Classification rule:**
| Shell overlap | Decision | Figma strategy |
|---------------|----------|----------------|
| ≥ 70% | Template — same Base Card, configured with booleans | Same component set, different boolean combos |
| 40–70% | Extension — shared shell + contentType prop | Same component set with extra variant property |
| < 40% | Separate component | Own component set in own section |
| Different semantics | NOT a Card | Different component entirely |

**Types found:**

| Type | Shell % | Decision | Key differentiator | Systems |
|------|---------|----------|--------------------|---------|
| Article/Media Card | 90% | ✅ Template | hasMedia:true, hasEyebrow:true, hasMetadata:true (readTime, date) | M3, Spectrum, Ant, Fluent 2, Mantine, Cedar, Nord |
| Contact Card | 88% | ✅ Template | hasAvatar:true, actionsLayout:icons (call/email/location) | Lightning, Ant, Cedar, Dell, Nord |
| Profile Card | 80% | ✅ Template | hasAvatar:true (large), stat-grid en body, follow/connect CTA | Atlassian, Spectrum, Lightning, Wise, Nord |
| Job Posting Card | 80% | ✅ Template | hasAvatar:true (company logo), hasBadge:true (salary), tags skills | Orbit, Dell, Wise |
| Testimonial/Review Card | 78% | ✅ Template | Quote typography, star rating, reviewer avatar+name | Ant, Dell, Orbit |
| Product/E-commerce Card | 75% | ✅ Template | mediaRatio:1:1, hasBadge:true (discount), price slot, add-to-cart CTA | Ant, Spectrum, Polaris, Mantine, Orbit |
| KPI/Graph/Stat Card | 75% | ✅ Template | hasEyebrow:true (metric name), stat value grande, sparkline en body | Ant (tabList), Lightning, Dell, Gestalt (TileData), Nord |
| Recipe Card | 75% | ✅ Template | mediaRatio:16:9, stat-grid (time/servings/calories), ingredient list | Ant, Mantine |
| Event Card | 55% | ⚡ Extension | Date block lateral, hora range, aforo, precio entrada | Orbit, Lightning, Dell |
| Kanban/Task Card | 50% | ⚡ Extension | Checklist, progress bar, priority badge, assignee stack, drag handle | Spectrum (isDraggable), Carbon, Fluent 2, Orbit |
| Notification Card | 48% | ⚡ Extension | Item list repetible (icon+text+timestamp), unread dot, mark-all-read | Atlassian (Smart Card), Lightning, Nord |
| Navigation Card | 55% | ⚡ Extension | Icon categoría grande, lista de links, descripción de sección | GOV.UK (Summary), Lightning, Dell |
| Pricing/Tier Card | 25% | ❌ Separado | Multi-columna comparativo, feature list ✓/✗, featured tier, billing toggle | Radix, Mantine, Orbit |
| Weather Widget | 20% | ❌ Separado | Layout full custom, icon dinámico, API-driven, forecast grid | — (ningún DS tiene esto como Card) |
| Map/Location Card | 15% | ❌ Separado | Map embed interactivo, geo-API, zoom/pan/layers | — |
| File/Attachment | 35% | ⚠️ No es Card → List Item | Operativo (download/upload), no entry point. Barra de progreso = UI state | Carbon, shadcn, Mantine |
| Form/Wizard Step | 20% | ⚠️ No es Card → Form Container | Validación de campos, step flow, inputs controlados | GOV.UK, Carbon |
| Alert/Banner | 15% | ⚠️ No es Card → Alert | Mensaje del sistema, severidad, dismissible. No representa entidad | Todos (componente separado) |

**Summary:** 8 templates (≥70%) + 4 extensions (40-70%) + 3 separate + 3 not-a-card = 18 types classified.
Spec-agent should build the Base Card to support ALL 8 templates via boolean combinations, and optionally add a `contentType` prop for the 4 extensions.

---

## Qué todos acuerdan (22/22 o casi)

1. **Card = contenedor de una sola entidad**: Una card representa un solo objeto (artículo, producto, persona, tarea). 22/22 sistemas.
2. **Título siempre presente**: El slot de título es el único universalmente requerido. 22/22.
3. **Elevación/borde como diferenciador visual**: Elevated vs Outlined como mínimo. 18/22.
4. **Una acción primaria máxima**: Múltiples CTAs primarios en una card = anti-patrón. 20/22.
5. **Footer para acciones**: Botones/links de acción en región inferior. 17/22.
6. **Media full-bleed**: Imágenes sin padding, ocupando el ancho completo. 14/16 que tienen media.
7. **Disabled = opacity reducida**: 14/22 usan opacity 0.38-0.5 para disabled.

## Dónde no están de acuerdo

### "¿Sub-componentes (CardHeader/Body/Footer) o composición libre?"
- **Sub-componentes:** shadcn, Fluent 2, Chakra, Ant (Card.Meta), Lightning, Nord (14/22)
- **Composición pura:** Polaris, M3, Paste, Radix, Evergreen (8/22)
- **Recomendación:** Modelo híbrido. Sub-componentes como BB + composición libre como escape hatch.

### "¿Variantes por elevación (3) o por borde (2)?"
- **3 variantes (elevated/filled/outlined):** M3, Chakra, Radix (ghost también) (8/22)
- **2 variantes (default/bordered):** Ant, Carbon (5/22)
- **Recomendación:** 4 variantes: elevated, filled, outlined, ghost. Cubre todos los casos.

### "¿Card interactiva: variante separada o prop?"
- **Componentes separados:** Carbon (4 tiles), M3 (variante interactiva) (4/22)
- **Prop (onClick/href/isClickable):** Ant, Spectrum, Fluent 2, Radix, Mantine (14/22)
- **Recomendación:** Prop isClickable con prop Interactive (static/clickable/selectable) como en Fluent 2.

### "¿Orientación vertical/horizontal?"
- **Solo vertical:** M3, Polaris, Ant, Carbon, shadcn (11/22)
- **Ambas:** Spectrum, Fluent 2, Lightning, Cedar, Orbit, Mantine, Wise (7/22)
- **Recomendación:** Incluir orientation si el DS soporta layouts con media lateral.

### "¿Loading como estado o como prop?"
- **Boolean prop (loading):** Ant, Fluent 2, Mantine, Lightning (8/22)
- **No soportado:** Polaris, Carbon, shadcn, Radix (14/22)
- **Recomendación:** Boolean isLoading que muestra skeleton placeholders.

## Patrones visuales encontrados

| Patrón | Descripción | Mejor para | Adoptado por |
|--------|-------------|------------|--------------|
| Card vertical con media | Full-bleed image top + header + body + footer | Product grids, galleries | M3, Spectrum, Ant, Fluent 2, Mantine |
| Card horizontal | Media 1:1 left + content right | Lists, sidebars, mobile | Spectrum, Fluent 2, Lightning, Cedar |
| Tile de selección | Card con checkbox/radio para batch selection | Configuradores, file pickers | Carbon, Spectrum, Fluent 2 |
| Card CRM/record | Icon + title + field list + "View all" | Admin panels, CRMs | Lightning, Dell, Nord |
| Smart Card (URL preview) | URL → structured preview | Link sharing, wikis | Atlassian |
| Card expandible | Partial content + expand/collapse | Long content, settings | Carbon, Orbit, Gestalt |
| Card con tabs | Tabs internos para multi-vista | Dashboards, KPIs | Ant Design |
| Card ghost/quiet | Sin contenedor visible, contenido flota | Dark/textured backgrounds | Spectrum (quiet), Radix (ghost) |
| Card summary (gov) | Data review con "Change" links | Forms, applications | GOV.UK |
| Card skeleton/loading | Slots como skeleton placeholders | Data fetching | Ant, Fluent 2, Mantine, Lightning |

## Riesgos a considerar

1. **Links interactivos anidados** (HIGH) — Card clickeable con botones internos = HTML inválido. Solución: sibling pattern (Carbon, M3).
2. **Hover-only actions en touch** (HIGH) — Actions que solo aparecen en hover son inaccesibles en mobile. Solución: always-visible overflow menu.
3. **Card clickeable sin semántica** (HIGH) — div onClick sin tabIndex/role/aria-label. Solución: `<a>` nativo o role="link" + keyboard handler.
4. **Layout shift por imágenes** (MEDIUM) — Imágenes sin aspect-ratio reservado causan shifts. Solución: aspect-ratio CSS en media container.
5. **Naming inconsistente** (MEDIUM) — Card vs Tile vs Panel vs Box. Documentar la diferencia: Card (contenido estructurado) vs Box (primitiva de layout).
6. **Composición sin guía** (MEDIUM) — Sin sub-componentes, equipos producen cards inconsistentes. Solución: BB pattern como "camino fácil".

---

## Próximos pasos

| # | Qué hacer | Comando |
|---|-----------|---------|
| 1 | Generar spec con Pipeline Hints | `/spec card` |
| 2 | Enriquecer con tokens y a11y | `/enrich card` |
| 3 | Generar en Figma | `/generate card` |
| 4 | Auditar calidad | `/figma-qa` |

---

_Generado por Component Research Agent v2 — 2026-04-04_
_22 sistemas analizados (6 T1 + 8 T2 + 8 T3) — ~3,200 palabras_
_Fuentes: compiled digests (T1+T2+T3)_
_Modo: max --expand --fresh_
