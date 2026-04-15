# Accordion

## Overview

El Accordion es un componente de divulgacion que organiza contenido en secciones colapsables. Cada seccion tiene un header (trigger) que al hacer click revela u oculta un panel de contenido. Permite mostrar informacion progresivamente sin abrumar al usuario con todo el contenido a la vez.

```
  ┌─────────────────────────────────────────┐
  │ ▶ Informacion general                   │  ← collapsed
  ├─────────────────────────────────────────┤
  │ ▼ Detalles de envio                     │  ← expanded (trigger)
  │  ┌─────────────────────────────────────┐│
  │  │ El envio se realiza en 3-5 dias     ││  ← panel de contenido
  │  │ habiles. Aplican restricciones      ││
  │  │ para zonas remotas.                 ││
  │  └─────────────────────────────────────┘│
  ├─────────────────────────────────────────┤
  │ ▶ Metodos de pago                       │  ← collapsed
  └─────────────────────────────────────────┘
```

Tiene dos niveles: el **Accordion** (wrapper que agrupa items) y el **.AccordionItem** (building block con trigger + panel). El wrapper controla el comportamiento de grupo (single o multiple expansion). Cada item es un sub-componente independiente con sus propios estados, tamanos y variantes.

Variantes (cambian la apariencia — generan variantes en Figma):

```
  .AccordionItem
    Tamano        sm · md · lg                                    Altura header: 40 / 48 / 56px
    Variante      default · bordered · ghost                      Bordes y fondo
    Estado        collapsed · expanded · disabled                 Interaccion
```

Toggles (muestran u ocultan partes — NO generan variantes extra):

```
  ☐ Icon                Icono antes del titulo
  ☐ Allow Multiple      Permite multiples items abiertos simultaneamente
```

### Panel de propiedades en Figma

```
┌─ Accordion ──────────────────────────┐
│                                      │
│  Boolean Properties                  │
│  ☐ Allow Multiple                    │
│                                      │
└──────────────────────────────────────┘

┌─ .AccordionItem ─────────────────────┐
│                                      │
│  Variant Properties                  │
│  ┌────────────────┐ ┌──────────────┐ │
│  │ Size      ▼ md │ │ Variant  ▼ … │ │
│  └────────────────┘ └──────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ State               ▼ collaps..│  │
│  └─────────────────────────────────┘ │
│                                      │
│  Boolean Properties                  │
│  ☐ Icon                              │
│                                      │
│  Text Properties                     │
│  ✏️ Title        [ Accordion Item ]  │
│                                      │
│  Instance Swap                       │
│  ↳ Icon          [ chevron       ]   │
│                                      │
└──────────────────────────────────────┘
```

---

## Cuando usar (y cuando no)

```
  ¿Necesitas organizar contenido largo en secciones?
  │
  ├─ 2-3 opciones donde el usuario elige una → usa Tabs (contenido mutuamente exclusivo)
  │
  ├─ Secciones de contenido que el usuario revela a demanda → usa Accordion ✓
  │
  ├─ Un solo bloque que se expande/colapsa → usa Disclosure/Collapsible
  │
  ├─ Pasos secuenciales → usa Stepper/Wizard
  │
  └─ Informacion complementaria en linea → usa Tooltip o Popover
```

**Usa Accordion cuando:**
- Hay multiples secciones de contenido largo que el usuario no necesita ver todas a la vez
- El espacio en pantalla es limitado (FAQs, configuraciones, formularios agrupados)
- El usuario necesita escanear titulos antes de decidir que seccion leer
- El contenido es de referencia (no de flujo lineal)

**NO uses Accordion cuando:**
- Las secciones son interdependientes y el usuario necesita ver varias a la vez → usa layout abierto
- Son 2-3 secciones de contenido corto → muestra todo, no escondas
- El contenido es secuencial (paso 1, paso 2) → usa Stepper
- El usuario necesita comparar secciones → accordion single-open dificulta la comparacion

---

## Variaciones visuales

### Variantes de estilo

```
  default                          bordered                         ghost
  ┌───────────────────────┐        ┌───────────────────────┐
  │ ▶ Seccion 1           │        │ ▶ Seccion 1           │        ▶ Seccion 1
  ├───────────────────────┤        └───────────────────────┘        ──────────────────────
  │ ▶ Seccion 2           │                                         ▶ Seccion 2
  ├───────────────────────┤        ┌───────────────────────┐        ──────────────────────
  │ ▶ Seccion 3           │        │ ▶ Seccion 2           │        ▶ Seccion 3
  └───────────────────────┘        └───────────────────────┘
                                                                    Sin bordes ni fondo
  Dividers entre items             Borde completo por item          Embebido en containers
  Uso general                      Standalone, como cards           Cards, tablas, sidebars
```

### Tamanos

```
  sm (40px)      ┌───────────────────────────────────┐    Sidebars, paneles densos
                 │ ▶ Seccion titulo                   │    font 14px · py 8 · px 12
                 └───────────────────────────────────┘

  md (48px)      ┌───────────────────────────────────┐    Uso general (default)
                 │ ▶ Seccion titulo                   │    font 14px · py 12 · px 16
                 └───────────────────────────────────┘

  lg (56px)      ┌───────────────────────────────────┐    FAQs, paginas de contenido
                 │ ▶ Seccion titulo                   │    font 16px · py 16 · px 16
                 └───────────────────────────────────┘
```

### Estados del item

```
  collapsed                          expanded
  ┌───────────────────────────┐      ┌───────────────────────────┐
  │ ▶ Seccion titulo          │      │ ▼ Seccion titulo          │
  └───────────────────────────┘      │  ┌───────────────────────┐│
                                     │  │ Contenido del panel   ││
  chevron apuntando derecha          │  │ que puede ser largo.  ││
                                     │  └───────────────────────┘│
                                     └───────────────────────────┘
                                     chevron rotado 180°

  disabled
  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐
  ╎ ▶ Seccion titulo            ╎
  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
  opacity 50%, no interactivo
```

---

## Decisiones de diseno

### 1. Single-open como default

14/18 sistemas hacen default single-open (abrir uno cierra los demas). Ant Design y Fluent 2 hacen default multiple-open porque sus UIs enterprise necesitan comparacion entre secciones. Pero el proposito clasico del accordion es gestionar espacio limitado.

**Nosotros: single-open default.** Boolean `allowMultiple` para opt-in cuando el contexto lo requiera (formularios de comparacion, settings panels).

### 2. Tres variantes visuales, no cuatro

Mantine tiene cuatro variantes (default/contained/filled/separated). Ant Design tiene tres (bordered/borderless/ghost). La variante "filled" (header con fondo) tiene bajo consenso (solo Mantine) y se puede lograr con tokens sin variante extra.

**Nosotros: default/bordered/ghost.** Default usa dividers entre items. Bordered agrega borde completo alrededor de cada item (como cards separadas). Ghost elimina bordes y fondo para embeber en otros containers.

### 3. Chevron a la izquierda como default

12/18 sistemas ponen el chevron a la izquierda. Carbon lo pone a la derecha por consistencia con sus layouts densos, pero documenta un caveat de accesibilidad: el chevron a la derecha puede ser ignorado por usuarios que escanean izquierda-a-derecha.

**Nosotros: izquierda.** El chevron como primer elemento senala inmediatamente "este contenido es expandible". Se puede intercambiar el icono via instance swap.

### 4. AccordionItem como unico building block

Radix descompone en 5 partes (Root, Item, Header, Trigger, Content). Spectrum tiene 3 niveles (Disclosure, DisclosureGroup, Accordion). Esa granularidad es util para codigo headless, pero en Figma genera complejidad innecesaria.

**Nosotros: Accordion (wrapper) + .AccordionItem (building block).** Dos niveles. El item contiene trigger + panel. El wrapper agrupa items y controla el comportamiento de grupo.

### 5. Estados funcionales, no interactivos, como variantes

Hover y pressed son estados CSS transitorios que no necesitan frame dedicado en Figma. Los estados que SI cambian la estructura visible son collapsed (panel oculto), expanded (panel visible) y disabled (atenuado, no interactivo).

**Nosotros: 3 estados como variante.** collapsed/expanded/disabled. Hover y focus se simulan con prototype o se documentan, no se modelan como frames.

### Combinaciones excluidas

Todas las combinaciones de Size x Variant x State son validas. No hay exclusiones logicas.

```
  (ninguna combinacion excluida — 27 frames netos: 3x3x3)
```

---

## Comportamiento

### Lo esencial para disenar

1. **Enter/Space toggle el item.** El trigger DEBE ser un `<button>` nativo. Ant Design usa `<div role="button">` — esto es un anti-patron porque pierde el comportamiento de teclado nativo.

2. **Single-open cierra los demas.** Al abrir un item, los demas se cierran automaticamente. En mode multiple, cada item es independiente.

3. **El chevron rota al expandir.** Rotacion de 180 grados (o 90, segun la convencion). La rotacion debe ser animada (120-200ms) para comunicar el cambio de estado.

4. **Disabled puede coexistir con expanded.** Un item que ya estaba abierto y luego se deshabilita mantiene su contenido visible pero no se puede cerrar.

5. **Heading level correcto.** El trigger vive dentro de un heading (`<h3>`, `<h4>`, etc.). El nivel debe coincidir con el contexto del documento. Spectrum y GOV.UK lo hacen configurable.

6. **Contenido colapsado puede ser buscable.** Spectrum soporta `hidden="until-found"` — el contenido colapsado aparece en busquedas Ctrl+F del navegador. Critico para FAQs.

### Accesibilidad (ARIA)

| Parte | Rol | Atributos | Por que importa |
|-------|-----|-----------|-----------------|
| Trigger | `button` | `aria-expanded`, `aria-controls` | SR anuncia "boton, [titulo], colapsado/expandido" |
| Heading | `heading` | nivel configurable (h2-h6) | SR anuncia la estructura del documento correctamente |
| Panel | `region` | `aria-labelledby` (apunta al trigger) | SR anuncia "region, [titulo]" al entrar al panel |
| Chevron | decorativo | `aria-hidden="true"` | SR ignora el icono — la info esta en `aria-expanded` |
| Item disabled | n/a | `aria-disabled="true"` en trigger | SR anuncia "deshabilitado" sin bloquear foco |

### Navegacion por teclado

Interacciones principales (las que afectan el diseno):

```
  Tab                   foco al siguiente trigger de item
  Enter / Space         toggle expanded/collapsed del item enfocado
  ↓ ↑                   navega entre triggers (roving tabindex)
```

Interacciones secundarias (no afectan diseno, referencia para dev):

```
  Home                  foco al primer trigger
  End                   foco al ultimo trigger
  Tab (desde trigger)   si expanded, foco al contenido del panel
```

---

## Guia de contenido

**Titulos:** Breves y descriptivos. "Informacion de envio", "Metodos de pago" — no "Haz click aqui para ver mas informacion sobre envio".

**Panel:** Contenido libre — texto, formularios, listas, imagenes. Evitar accordions anidados (confunde la jerarquia).

**Orden:** Organizar items por prioridad o frecuencia de uso. El primer item es el mas importante o el mas consultado.

**Cantidad:** 3-10 items es el rango ideal. Menos de 3 → muestra todo sin accordion. Mas de 10 → agrupa o divide en categorias.

**Titulo sin verbo:** "Detalles de envio" (no "Ver detalles de envio"). El accordion ya comunica que hay contenido oculto.

---

## Checklist antes de construir

```
  ☐ ¿Single o multiple expansion?
    └─ single (default) = FAQs, configuracion secuencial
    └─ multiple = formularios con secciones comparables

  ☐ ¿Que variante visual?
    └─ default = paginas de contenido, dentro de layouts
    └─ bordered = standalone, como cards individuales
    └─ ghost = embebido en drawers, sidebars, cards

  ☐ ¿Que tamano?
    └─ sm = paneles densos, sidebars
    └─ md = uso general (default)
    └─ lg = FAQs, paginas de contenido con mucho espacio

  ☐ ¿Necesita icono en el header?
    └─ Si → activa boolean Icon + configura swap

  ☐ ¿Algun item empieza expandido?
    └─ Si → configura el estado initial en expanded

  ☐ ¿Algun item debe estar deshabilitado?
    └─ Si → estado disabled (permite expanded + disabled)

  ☐ ¿El heading level es correcto?
    └─ Verificar con la estructura del documento (h2/h3/h4)
```

---

## Relacion con otros componentes

```
  Tabs             Para contenido mutuamente exclusivo (2-5 secciones cortas)
  Disclosure       Un solo item expandible, sin grupo
  Stepper/Wizard   Para flujos secuenciales, no contenido de referencia
  Card             Contenedor con chrome visual; accordion puede vivir dentro
  Drawer           Accordion dentro de drawer para filtros agrupados
  Tree View        Para jerarquias profundas (3+ niveles), no secciones planas
```

---

## Referencia: como lo hacen otros sistemas

**Los que tienen arquitectura granular:**
- Spectrum (Adobe): 3 niveles (Disclosure → DisclosureGroup → Accordion), `hidden="until-found"`
- Radix: 5 partes composables, `type="single"|"multiple"`, CSS variable para animacion de altura
- shadcn/ui: sobre Radix, `collapsible` prop para permitir 0 items abiertos en single mode

**Los que priorizan enterprise:**
- Carbon (IBM): `<ul>/<li>` semantics, chevron a la derecha, 3 sizes, `align` prop
- Ant Design: multiple-open default, `ghost` variant, `collapsible` por area de trigger
- Fluent 2: multi-panel default, token-based animation

**Los que priorizan simplicidad:**
- Primer (GitHub): `<details>/<summary>` nativo, zero JS
- GOV.UK: "Show all sections" toggle, sin animacion, progressive enhancement
- Nord (Nordhealth): single-open default, web component portable

**Consenso universal (18/18):**
- Trigger es `<button>` con `aria-expanded`
- `aria-controls` vincula trigger con panel
- Chevron como indicador visual de expandibilidad
- Dos niveles minimo: wrapper + item

---

## Tokens

**30 tokens** · prefijo `acc-` · 3 capas (primitivo → semantico → componente)

| Token | Figma Variable | Uso |
|-------|---------------|-----|
| `--acc-header-bg` | `surface/default` | Fondo del header/trigger |
| `--acc-header-bg-hover` | `surface/hover` | Header en hover |
| `--acc-header-fg` | `text/label` | Texto del titulo |
| `--acc-header-fg-disabled` | `text/disabled` | Titulo deshabilitado |
| `--acc-panel-bg` | `surface/default` | Fondo del panel de contenido |
| `--acc-panel-fg` | `text/body` | Texto del contenido |
| `--acc-border` | `border/mid/default` | Bordes y dividers |
| `--acc-border-hover` | `border/mid/hover` | Borde en hover |
| `--acc-border-focus` | `border/focus` | Anillo de foco |
| `--acc-border-disabled` | `border/light/default` | Borde deshabilitado |
| `--acc-chevron-fg` | `icon/secondary` | Color del chevron |
| `--acc-chevron-fg-disabled` | `icon/disabled` | Chevron deshabilitado |
| `--acc-focus-ring` | `border/focus` | Anillo de foco 2px |

### Specs de spacing

```
  ┌─ .AccordionItem ────────────────────────────────────────┐
  │                                                         │
  │  ┌─ trigger/header ──────────────────────────────────┐  │
  │  │ ←px→ [chevron] ←gap→ [icon?] ←gap→ [Title] ←px→  │  │
  │  │      ↕ py                                  ↕ py   │  │
  │  └───────────────────────────────────────────────────┘  │
  │                                                         │
  │  ┌─ panel (solo visible en expanded) ────────────────┐  │
  │  │ ←px→ contenido libre                         ←px→ │  │
  │  │      ↕ py                                   ↕ py  │  │
  │  └───────────────────────────────────────────────────┘  │
  │                                                         │
  └─────────────────────────────────────────────────────────┘

  Header por size:
    sm: h=40, fontSize=14, iconSize=16, py=8,  px=12, gap=8
    md: h=48, fontSize=14, iconSize=20, py=12, px=16, gap=8
    lg: h=56, fontSize=16, iconSize=20, py=16, px=16, gap=8

  Panel padding:    mismo px que header · py=12 (sm) / 16 (md/lg)
  gap chevron↔texto: 8px (siempre)
  radius (bordered): sm=6 · md=8 · lg=8
  radius (default/ghost): 0
  divider entre items: 1px border/mid/default
```
