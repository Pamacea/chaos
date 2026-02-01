# 🗡️ Chaos UI

Glitch, noise, and distortion components for React. Copy-paste like shadcn.

## Quick Start

```bash
npx @oalacea/chaosui add glitch-text
```

That's it. No install needed.

## Usage

```bash
# Add a component
npx @oalacea/chaosui add noise-overlay

# List all components
npx @oalacea/chaosui list

# Initialize config (optional)
npx @oalacea/chaosui init
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

<NoiseOverlay opacity={0.05} animated />
```

### GlitchButton

```tsx
import { GlitchButton } from './components/chaos/buttons/glitch-button';

<GlitchButton intensity="medium" variant="outline">
  Enter the Void
</GlitchButton>
```

## Customization

All components use CSS custom properties:

```css
:root {
  --chaos-glitch-color: #ff0040;
  --chaos-glitch-color-alt: #00ffff;
  --chaos-noise-opacity: 0.05;
}
```

## Philosophy

- **Copy-paste** — Components live in your codebase
- **No runtime** — Pure CSS animations
- **Customizable** — Every prop exposed
- **Composable** — Mix effects freely

## License

MIT © [Pamacea](https://github.com/Pamacea)
