# Foundations — Spacing & Layout (Atlassian 8px System)

> Base: Atlassian Design System. Scale de 8px con rangos Small / Medium / Large.

## 1.1 Base Unit
**8px** (Atlassian Design System). Token base: `space.100 = 8px`. Todos los valores de spacing son múltiplos del base unit.

## 1.2 Spacing Scale
| Token | Multiplicador | px | rem | Rango |
|-------|--------------|-----|-----|-------|
| space.0 | 0× | 0 | 0 | — |
| space.025 | 0.25× | 2 | 0.125 | Small |
| space.050 | 0.5× | 4 | 0.25 | Small |
| space.075 | 0.75× | 6 | 0.375 | Small |
| space.100 | 1× | 8 | 0.5 | Small |
| space.150 | 1.5× | 12 | 0.75 | Medium |
| space.200 | 2× | 16 | 1 | Medium |
| space.250 | 2.5× | 20 | 1.25 | Medium |
| space.300 | 3× | 24 | 1.5 | Medium |
| space.400 | 4× | 32 | 2 | Large |
| space.500 | 5× | 40 | 2.5 | Large |
| space.600 | 6× | 48 | 3 | Large |
| space.800 | 8× | 64 | 4 | Large |
| space.1000 | 10× | 80 | 5 | Large |

### Rangos de uso
- **Small (0–8px):** UI compacta — gaps icon↔text, padding de componentes pequeños, gaps entre elementos repetidos, padding de inputs
- **Medium (12–24px):** Componentes medianos — padding de containers, space entre avatar/icono y contenido, spacing vertical en cards
- **Large (32–80px):** Layout — espacio entre secciones de página, alineación dentro de contenido grande

## 1.3 Token Naming (patrón más adoptado)
```
--space-{step}    → ej: --space-200 = 8px
```
Variantes por DS: Polaris `--p-space-200`, Atlassian `space.200`, Spectrum `--spectrum-spacing-200`

## 1.4 Breakpoints (consenso)
| Nombre | Min-width | Columnas | Uso |
|--------|-----------|----------|-----|
| xs | 0px | 4 | Mobile portrait |
| sm | 480px | 4 | Mobile landscape |
| md | 768px | 8 | Tablet |
| lg | 1024px | 12 | Desktop |
| xl | 1280px | 12 | Large desktop |
| xxl | 1440px | 12 | Wide desktop |

## 1.5 Grid
- **12 columnas** desktop (11/14 sistemas). Carbon usa 16, Ant usa 24.
- **Gutters:** 16px (compact), 24px (default), 32px (comfortable)
- **Márgenes:** 16px mobile → 24px tablet → 32-48px desktop

## 1.6 Density Modes
5/14 sistemas soportan explícitamente: Material, Carbon, Lightning, Dell, Ant.
| Modo | Multiplicador | Uso |
|------|--------------|-----|
| Compact | 75% | Data-dense UIs, tablas |
| Default | 100% | Uso general |
| Comfortable | 125% | Content-heavy, lectura |

## 1.7 Component Spacing Map (prescriptivo)

> **Regla:** Cada valor de padding y gap DEBE ser un token de la escala (0,2,4,6,8,12,16,20,24,32,40,48,64,80). NO se permiten valores intermedios.

### 1.7.1 Size-Aware Padding (por tamaño de componente)

Los componentes con variante `Size` usan esta tabla para derivar padding del header/trigger:

| Size | Pad-Y (vertical) | Pad-X (horizontal) | Altura resultante* | Tokens |
|------|-------------------|---------------------|---------------------|--------|
| sm | 8px | 12px | ~36px | space.100 / space.150 |
| md | 12px | 16px | ~44px | space.150 / space.200 |
| lg | 16px | 16px | ~52px | space.200 / space.200 |

*Asumiendo línea de texto ~20px (14px font + line-height).

**Aplica a:** Button, Input, Tab, AccordionItem trigger, Select trigger, cualquier componente con Size=sm/md/lg.

### 1.7.2 Elementos de UI por categoría

#### Botones y controles interactivos
| Elemento | Pad-Y | Pad-X | Icon↔Text gap | Token ref |
|----------|-------|-------|---------------|-----------|
| Button sm | 8 | 12 | 6 | 100/150/075 |
| Button md | 12 | 16 | 8 | 150/200/100 |
| Button lg | 16 | 20 | 8 | 200/250/100 |
| IconButton sm | 6 | 6 | — | 075/075 |
| IconButton md | 8 | 8 | — | 100/100 |
| IconButton lg | 12 | 12 | — | 150/150 |
| Checkbox (control↔label) | — | — | 8 | gap=100 |
| Radio (control↔label) | — | — | 8 | gap=100 |
| Switch (control↔label) | — | — | 8 | gap=100 |
| Toggle (control↔label) | — | — | 12 | gap=150 |

#### Inputs y campos de formulario
| Elemento | Pad-Y | Pad-X | Label↔Input gap | Helper gap | Token ref |
|----------|-------|-------|-----------------|------------|-----------|
| Input sm | 6 | 8 | — | — | 075/100 |
| Input md | 8 | 12 | — | — | 100/150 |
| Input lg | 12 | 16 | — | — | 150/200 |
| TextArea | 8 | 12 | — | — | 100/150 |
| Select trigger | (usa tabla Size-Aware) | | | |
| InputGroup label↔input | — | — | 4 | — | 050 |
| InputGroup input↔helper | — | — | 4 | — | 050 |
| Form fields vertical gap | — | — | — | 16 | 200 |

#### Contenedores de notificación
| Elemento | Section Pad | Title↔Close gap | Icon↔Title gap | Footer gap | Token ref |
|----------|-------------|-----------------|----------------|------------|-----------|
| Toast header | 16 all | 8 | 8 | — | 200/100/100 |
| Toast message | 0V / 16H | — | — | — | 0/200 |
| Toast footer | 16 all | — | — | 12 | 200/150 |
| Alert header | 16 all | 8 | 8 | — | 200/100/100 |
| Alert footer | 16 all | — | — | 12 | 200/150 |
| Banner | 12V / 16H | 8 | 8 | 12 | 150-200/100 |

#### Navegación y tabs
| Elemento | Pad-Y | Pad-X | Tab↔Tab gap | Tab↔Panel gap | Panel pad |
|----------|-------|-------|-------------|---------------|-----------|
| Tab sm | 8 | 12 | 0 | 0 | 16 |
| Tab md | 12 | 16 | 0 | 0 | 16 |
| Tab lg | 16 | 16 | 0 | 0 | 16 |
| Nav-bar | 0 | 0 | 0 (flush) | — | — |
| Breadcrumb items | — | — | 8 | — | — |

#### Acordeones y colapsables
| Elemento | Header pad | Content pad | Footer pad | Items gap |
|----------|------------|-------------|------------|-----------|
| AccordionItem sm | 8V/12H | 0T-16R-16B-16L | 0T-16R-16B-16L | — |
| AccordionItem md | 12V/16H | 0T-16R-16B-16L | 0T-16R-16B-16L | — |
| AccordionItem lg | 16V/16H | 0T-16R-16B-16L | 0T-16R-16B-16L | — |
| Accordion bordered | 0 (items manejan padding) | — | — | 0 (dividers) |
| Accordion ghost | 0 | — | — | 8 |
| Title↔Chevron gap | 8 | — | — | — |

#### Cards y contenedores
| Elemento | Pad all | Header↔Body gap | Body↔Footer gap | External gap |
|----------|---------|-----------------|-----------------|--------------|
| Card sm | 12 | 8 | 12 | 16 |
| Card md | 16 | 12 | 16 | 16 |
| Card lg | 24 | 16 | 16 | 24 |
| Dialog body | 24 | 16 | 24 | — |
| Modal body | 24 | 16 | 24 | — |
| Popover | 12 | 8 | 12 | — |
| Tooltip | 6V/8H | — | — | — |

#### Grupos y listas
| Elemento | Items gap (V) | Items gap (H) | Group padding | Legend↔Items gap |
|----------|---------------|---------------|---------------|------------------|
| CheckboxGroup | 8 | 16 | 0 | 8 |
| RadioGroup | 8 | 16 | 0 | 8 |
| ButtonGroup | — | 8 | 0 | — |
| Stack vertical | 8-16 | — | 0 | — |
| Stack horizontal | — | 8-16 | 0 | — |
| List items | 0 | — | 0 | — |
| Menu items | 0 | — | 4V padding | — |

#### Layout y página
| Elemento | Spacing | Token ref |
|----------|---------|-----------|
| Page top ↔ header | 32 | space.400 |
| Section ↔ section | 32-48 | space.400-600 |
| Header ↔ content | 24 | space.300 |
| Page margins mobile | 16 | space.200 |
| Page margins tablet | 24 | space.300 |
| Page margins desktop | 32-48 | space.400-600 |

### 1.7.3 Reglas universales para subcomponentes

| Subcomponente | Regla de spacing |
|---------------|-----------------|
| Icon dentro de button/input | gap con texto = space.100 (8px) |
| Close button (X) | size 20×20, gap con contenido = space.100 (8px) |
| Status icon (info/success/warning/error) | size 16×16, gap con título = space.100 (8px) |
| Chevron (expand/collapse) | size 16×16, gap con título = space.100 (8px) |
| Badge/counter | gap con label = space.050 (4px) |
| Helper text / error text | gap con parent = space.050 (4px) |
| Divider/separator | margin vertical = space.100 (8px) |
| Avatar | gap con texto = space.100-150 (8-12px) |

### 1.7.4 Reglas de derivación automática

El spec-agent DEBE aplicar estas reglas al generar `config.json.sizes[]`:

1. **Si el componente tiene Size=sm/md/lg:** usar tabla 1.7.1 para padding del trigger/header
2. **Si el componente es un container (Card, Dialog, Accordion):** padding = space.200 (16px) default, space.300 (24px) para lg
3. **Si el componente tiene icon + text:** gap = space.100 (8px) siempre
4. **Si el componente tiene footer con botones:** gap entre botones = space.150 (12px), padding = space.200 (16px)
5. **Si el componente es un grupo (CheckboxGroup, RadioGroup, ButtonGroup):** padding container = 0, items gap vertical = space.100 (8px), horizontal = space.200 (16px)
6. **Content dentro de item colapsable (AccordionItem collapsed):** `visible = false`, NO ocupa espacio
7. **Items dentro de un grupo bordered:** gap = 0 (dividers manejan separación). Ghost: gap = space.100 (8px)
8. **Texto message/body directo en root:** DEBE tener wrapper con padding horizontal = space.200 (16px)
