# Properties Panel Architecture

## Overview
The Properties Panel has been refactored into a modular, maintainable structure with clear separation of concerns.

## Structure

```
components/form-builder-redesign/
├── properties-panel.tsx          # Main orchestrator
└── properties/
    ├── helper.ts                 # Constants & presets
    ├── content-tab.tsx           # Content editing logic
    ├── style-tab.tsx             # Visual styling controls
    └── settings-tab.tsx          # Form behavior settings
```

## Styling Architecture

### Three Distinct Layers

1. **Background (Level 2)** - The outer page/screen users see
   - Background Type: Color, Gradient, Mesh, Dots, **Image**
   - Image Effects: Blur, Color Overlay
   - NO layout features (like Split Layout)
   
2. **Form Card (Level 3)** - The actual form container
   - Card Background Color
   - Border Radius, Shadow
   - Glassmorphism (blur + opacity)
   - **Split Screen Layout** (side image panel)
   - Typography & Max Width settings
   
3. **Sections** - Individual content sections
   - Own background, padding, borders
   - Glassmorphism support
   - Complete style isolation

### Key Points

✅ **Background is ONLY for backdrop styling** (colors, gradients, images with effects)
✅ **Split Layout is a CARD feature**, not a background feature
✅ **No style leakage** - Each layer uses isolated styling functions

## Background vs. Split Layout

### Background Image (Page Level)
```typescript
// Applied to: .background-area div
{
  backgroundType: 'image',
  backgroundImage: 'url(...)',
  backgroundImageBlur: 5,
  backgroundOverlay: { enabled: true, color: '#000', opacity: 0.3 }
}
```

### Split Screen (Card Level)
```typescript
// Applied to: .form-card div structure
{
  splitLayout: {
    enabled: true,
    image: 'url(...)',      // Side panel image
    position: 'left|right',
    focalPoint: { x: 50, y: 50 },
    overlay: { opacity: 0.2 }
  }
}
```

## File Responsibilities

### `helper.ts`
- Button presets
- Color presets
- Gradient presets
- Mesh presets

### `content-tab.tsx`
- Element content editing (text, labels)
- Section titles & layout direction
- Page metadata (title, type)
- No visual styling

### `style-tab.tsx`
Context-aware rendering based on selection:
- **Background selected** → Background type, colors, effects
- **Form Card selected** → Card design, split layout, glass effect
- **Section selected** → Section colors, padding, effects
- **Buttons selected** → Button presets & customization

### `settings-tab.tsx`
- Form behavior toggles
- Display settings info

## Usage

When user selects:
- **Background area** → See background styling options
- **Form card** → See card design + split layout
- **Section** → See section-specific styling
- **Buttons** → See button customization

All properly isolated with no cross-contamination!
