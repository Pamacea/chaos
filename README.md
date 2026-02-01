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

## Theming

All components use CSS variables. Add these to your `globals.css`:

```css
:root {
  /* Primary - main glitch color */
  --chaos-primary: #ff0040;
  --chaos-primary-rgb: 255, 0, 64;
  
  /* Secondary - alt glitch layer */
  --chaos-secondary: #00ffff;
  --chaos-secondary-rgb: 0, 255, 255;
  
  /* Accent - third color */
  --chaos-accent: #ff00ff;
  --chaos-accent-rgb: 255, 0, 255;
  
  /* Base colors */
  --chaos-background: #0a0a0a;
  --chaos-foreground: #fafafa;
  --chaos-muted: #171717;
  --chaos-border: #333333;
}
```

### Presets

```css
/* Cyberpunk */
.cyberpunk {
  --chaos-primary: #f0f000;
  --chaos-secondary: #00f0f0;
  --chaos-background: #0d0d1a;
}

/* Matrix */
.matrix {
  --chaos-primary: #00ff00;
  --chaos-secondary: #00cc00;
  --chaos-background: #000000;
}

/* Vaporwave */
.vaporwave {
  --chaos-primary: #ff71ce;
  --chaos-secondary: #01cdfe;
  --chaos-background: #1a0a2e;
}
```

### Per-component override

```tsx
<GlitchText style={{ '--chaos-primary': '#ff6600' } as React.CSSProperties}>
  Custom Orange
</GlitchText>
```

## Philosophy

- **Copy-paste** — Components live in your codebase
- **No runtime** — Pure CSS animations
- **Customizable** — Every prop exposed
- **Composable** — Mix effects freely

## License

MIT © [Pamacea](https://github.com/Pamacea)
