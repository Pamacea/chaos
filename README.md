# 🗡️ Chaos UI

Glitch, noise, and distortion components for React. Copy-paste like shadcn.

## Installation

```bash
npx chaos-ui init
```

## Usage

Add components to your project:

```bash
npx chaos-ui add glitch-text
npx chaos-ui add noise-overlay
npx chaos-ui add glitch-button
```

List all available components:

```bash
npx chaos-ui list
```

## Components

### Overlays

| Component | Description |
|-----------|-------------|
| `noise-overlay` | SVG fractal noise texture overlay |
| `scanlines` | CRT-style horizontal scanlines |
| `vignette` | Dark edges radial gradient |
| `static-flicker` | Animated noise with flicker effect |

### Text Effects

| Component | Description |
|-----------|-------------|
| `glitch-text` | RGB split glitch text effect |
| `flicker-text` | Text that flickers randomly |
| `distortion-text` | Wavy distortion text effect |
| `falling-text` | Letters falling in cascade |

### Buttons

| Component | Description |
|-----------|-------------|
| `glitch-button` | Button with glitch hover effect |
| `chaos-button` | Chaotic animated button |

### Backgrounds

| Component | Description |
|-----------|-------------|
| `noise-canvas` | Animated noise canvas background |
| `light-beams` | Vertical colored light beams |
| `glow-orbs` | Floating blurred orbs |
| `particle-field` | Drifting particle background |

### Effects

| Component | Description |
|-----------|-------------|
| `warning-tape` | Scrolling warning tape banner |
| `cursor-follower` | Custom cursor with trail |
| `screen-distortion` | Full screen distortion effect |

## Examples

### GlitchText

```tsx
import { GlitchText } from './components/chaos/text/glitch-text';

<GlitchText intensity="intense" glitchColor="#ff0040">
  CHAOS
</GlitchText>
```

### NoiseOverlay

```tsx
import { NoiseOverlay } from './components/chaos/overlays/noise-overlay';

// Add to your layout
<NoiseOverlay opacity={0.05} animated />
```

### GlitchButton

```tsx
import { GlitchButton } from './components/chaos/buttons/glitch-button';

<GlitchButton intensity="medium" variant="outline">
  Enter the Void
</GlitchButton>
```

### WarningTape

```tsx
import { WarningTape } from './components/chaos/effects/warning-tape';

<WarningTape bgColor="#ff0040" rotation={-2}>
  SYSTEM FAILURE • CRITICAL ERROR
</WarningTape>
```

## Customization

All components use CSS custom properties for easy theming:

```css
:root {
  --chaos-glitch-color: #ff0040;
  --chaos-glitch-color-alt: #00ffff;
  --chaos-noise-opacity: 0.05;
}
```

## Philosophy

- **Copy-paste** — Components live in your codebase, not node_modules
- **No runtime** — Pure CSS animations, no JavaScript overhead
- **Customizable** — Every prop exposed, every style overridable
- **Composable** — Mix and match effects freely

## License

MIT © [Oalacea](https://github.com/oalacea)
