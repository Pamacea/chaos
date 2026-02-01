# 🗡️ Chaos UI

Glitch, noise, neon & cyber components for React. Copy-paste like shadcn.

## Quick Start

```bash
npx @oalacea/chaosui add neon-button
```

That's it. No install needed.

## Usage

```bash
# Add a component (CSS Modules by default)
npx @oalacea/chaosui add neon-button

# Add with Tailwind variant
npx @oalacea/chaosui add neon-button --variant tailwind

# List all components
npx @oalacea/chaosui list

# Initialize config (optional)
npx @oalacea/chaosui init
```

## Components

### 🔮 Neon

| Component | Description |
|-----------|-------------|
| `neon-button` | Button with neon glow effect |
| `neon-badge` | Luminous status badges |
| `neon-progress` | Glowing progress bar with shimmer |
| `neon-toggle` | On/off switch with neon glow |
| `neon-alert` | Alert notifications with neon style |
| `neon-tabs` | Tab navigation with glow effect |
| `neon-divider` | Luminous section dividers |

### 🤖 Cyber

| Component | Description |
|-----------|-------------|
| `cyber-input` | Input with animated border glow |
| `cyber-loader` | Futuristic spinners and loaders |
| `cyber-modal` | Modal with scanlines and glow |
| `cyber-avatar` | Avatar with neon border and status |
| `cyber-slider` | Slider with neon track and thumb |
| `cyber-tooltip` | Terminal-style tooltips |

### 📐 Layout

| Component | Description |
|-----------|-------------|
| `hologram-card` | Holographic card with scanlines |
| `data-grid` | Terminal-style data table |

### 🧭 Navigation

| Component | Description |
|-----------|-------------|
| `hexagon-menu` | Honeycomb hexagon menu |

### 📝 Text Effects

| Component | Description |
|-----------|-------------|
| `glitch-text` | RGB split glitch text effect |
| `flicker-text` | Text that flickers randomly |
| `distortion-text` | Wavy distortion text effect |
| `falling-text` | Letters falling in cascade |

### 🎛️ Buttons

| Component | Description |
|-----------|-------------|
| `glitch-button` | Button with glitch hover effect |
| `chaos-button` | Chaotic animated button |

### 🌌 Backgrounds

| Component | Description |
|-----------|-------------|
| `noise-canvas` | Animated noise canvas background |
| `light-beams` | Vertical colored light beams |
| `glow-orbs` | Floating blurred orbs |
| `particle-field` | Drifting particle background |

### 🎭 Overlays

| Component | Description |
|-----------|-------------|
| `noise-overlay` | SVG fractal noise texture overlay |
| `scanlines` | CRT-style horizontal scanlines |
| `vignette` | Dark edges radial gradient |
| `static-flicker` | Animated noise with flicker effect |

### ✨ Effects

| Component | Description |
|-----------|-------------|
| `warning-tape` | Scrolling warning tape banner |
| `cursor-follower` | Custom cursor with trail |
| `screen-distortion` | Full screen distortion effect |
| `glowing-border` | Glowing border container with pulse |
| `glitch-image` | Image with RGB glitch on hover |

## Styling Variants

All components are available in **two variants**:

### CSS Modules (default)
```bash
npx @oalacea/chaosui add neon-button --variant css
```
Copies `index.tsx` + `component.module.css`

### Tailwind
```bash
npx @oalacea/chaosui add neon-button --variant tailwind
```
Copies self-contained `index.tsx` with Tailwind classes

## Examples

### NeonButton

```tsx
import { NeonButton } from './components/chaos/neon/neon-button';

<NeonButton variant="cyan" size="lg" glowing>
  Enter the Grid
</NeonButton>
```

### CyberModal

```tsx
import { CyberModal } from './components/chaos/cyber/cyber-modal';

<CyberModal 
  isOpen={open} 
  onClose={() => setOpen(false)}
  title="System Alert"
  variant="cyan"
>
  <p>Connection established.</p>
</CyberModal>
```

### HologramCard

```tsx
import { HologramCard } from './components/chaos/layout/hologram-card';

<HologramCard variant="pink" scanlines>
  <h3>Status: Online</h3>
</HologramCard>
```

### GlitchText

```tsx
import { GlitchText } from './components/chaos/text/glitch-text';

<GlitchText intensity="intense" glitchColor="#ff0040">
  CHAOS
</GlitchText>
```

## Theming

Components use **CSS variables** compatible with shadcn/ui:

```css
:root {
  --background: 0 0% 4%;        /* #0a0a0a */
  --foreground: 0 0% 98%;       /* #fafafa */
  --primary: 347 100% 50%;      /* #ff0040 */
  --secondary: 180 100% 50%;    /* #00ffff */
}
```

Neon/Cyber components also support direct color variants:
- `cyan` (#00f0ff)
- `pink` (#ff00ff)
- `green` (#00ff88)
- `purple` (#a855f7)
- `red` (#ff0040)
- `yellow` (#ffff00)

## Philosophy

- **Copy-paste** — Components live in your codebase
- **Two variants** — CSS Modules or Tailwind, your choice
- **No runtime** — Pure CSS animations
- **Customizable** — Every prop exposed
- **Composable** — Mix effects freely

## License

MIT © [Pamacea](https://github.com/Pamacea)
