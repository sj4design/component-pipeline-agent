# Shared Building Blocks

BBs que pueden ser reutilizados por múltiples componentes. Cuando un config referencia estos BBs con `skipIfExists: true`, el plugin reutiliza la instancia existente en la page.

## .ContentHeader

Estructura: `eyebrow → text+icons(prefix, title+subtitle, suffix) → badge`

### Compatibilidad por componente

| Componente | prefix | title | subtitle | suffix (default: chevron) | badge | Notas |
|------------|--------|-------|----------|--------------------------|-------|-------|
| **Card** | avatar/logo | Card Title | Supporting text | swap → more-horizontal (⋯) | ✅ | Swap suffix icon |
| **Accordion** | status icon | Section Title | — | chevron-down ↓ (default) | — | Suffix rota en expanded |
| **Modal** | icon | Dialog Title | description | swap → x (close) | — | Swap suffix icon |
| **Alert** | status icon | Alert Title | message | swap → x (dismiss) | severity badge | Swap suffix + badge |
| **List Item** | avatar | Name | subtitle | chevron-right → | — | Swap suffix icon |
| **Drawer** | — | Drawer Title | — | swap → x (close) | — | Minimal header |

### Config usage

```json
{
  "buildOrder": [".ContentHeader", ".ContentBody", ".ContentFooter", "Card"],
  "family": [
    {
      "name": ".ContentHeader",
      "isBuildingBlock": true,
      "skipIfExists": true,
      "slotGroups": [...]
    },
    {
      "name": "Card",
      "slots": [
        { "name": "header", "type": "container", "buildingBlock": ".ContentHeader" }
      ]
    }
  ]
}
```

## .ContentBody

Estructura flat: `body-text → metadata → divider`

Reutilizable en: Card, Modal, Drawer, Alert (expanded content).

## .ContentFooter

Estructura horizontal: `action-primary → action-secondary`

Reutilizable en: Card, Modal, Drawer, Alert.

## .ContentMedia

Placeholder de imagen/video. Solo Card y algunos list items lo usan.
