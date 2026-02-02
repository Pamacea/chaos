# 🗡️ Chaos UI

Glitch, noise, neon & brutalist components for React. Copy-paste like shadcn.

**91 components** — CSS Modules or Tailwind — Zero runtime.

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

## Components (91)

### 🔮 Neon (7)

| Component | Description |
|-----------|-------------|
| `neon-button` | Button with neon glow effect |
| `neon-badge` | Luminous status badges |
| `neon-progress` | Glowing progress bar with shimmer |
| `neon-toggle` | On/off switch with neon glow |
| `neon-alert` | Alert notifications with neon style |
| `neon-tabs` | Tab navigation with glow effect |
| `neon-divider` | Luminous section dividers |

### 🤖 Cyber (6)

| Component | Description |
|-----------|-------------|
| `cyber-input` | Input with animated border glow |
| `cyber-loader` | Futuristic spinners and loaders |
| `cyber-modal` | Modal with scanlines and glow |
| `cyber-avatar` | Avatar with neon border and status |
| `cyber-slider` | Slider with neon track and thumb |
| `cyber-tooltip` | Terminal-style tooltips |

### 📝 Text Effects (21)

| Component | Description |
|-----------|-------------|
| `glitch-text` | RGB split glitch text effect |
| `flicker-text` | Text that flickers randomly |
| `distortion-text` | Wavy distortion text effect |
| `falling-text` | Letters falling in cascade |
| `typing-text` | Terminal typing effect |
| `char-glitch` | Per-character glitch effect |
| `reveal-text` | Text reveal on scroll |
| `strike-reveal` | Strikethrough then reveal |
| `giant-layers` | Giant text with 3D shadow layers |
| `blood-drip` | Dripping blood effect letters |
| `rotate-text` | Vertical rotating text |
| `ascii-art` | Styled ASCII art block |
| `countdown-display` | Stylized countdown timer |
| `terminal-output` | Terminal block with prompt |
| `breathing-text` | Breathing animation text |
| `handwritten-text` | Handwriting style text |
| `scramble-text` | Text scramble effect |
| `shadow-glitch` | Shadow glitch effect |
| `split-text` | Split text animation |
| `stroke-text` | Outlined text effect |
| `word-by-word-reveal` | Word by word reveal |

### 🎛️ Buttons (7)

| Component | Description |
|-----------|-------------|
| `glitch-button` | Button with glitch hover effect |
| `chaos-button` | Chaotic animated button with debris |
| `dead-button` | Destroyed/glitched button |
| `deeper-button` | Go deeper style descent button |
| `dual-choice` | Yes/No dual button choice |
| `cta-brutal` | Brutalist CTA button |
| `tension-bar` | Dramatic tension/progress bar |

### 🧭 Navigation (8)

| Component | Description |
|-----------|-------------|
| `scattered-nav` | Scattered fragment navigation |
| `vertical-nav` | Vertical nav with glyphs |
| `brutal-nav` | Brutalist chaotic navigation |
| `progress-dots` | Section progress indicator |
| `scroll-indicator` | Vertical scroll indicator |
| `corner-nav` | Corner-positioned navigation |
| `minimal-nav` | Minimalist navigation |
| `timeline-nav` | Timeline-style navigation |

### 📐 Layout (9)

| Component | Description |
|-----------|-------------|
| `hologram-card` | Holographic card with scanlines |
| `data-grid` | Terminal-style data table |
| `horizontal-scroll` | Horizontal scrolling panels |
| `horizontal-panel-scroll` | Panel scroll container |
| `void-frame` | Frame with decorative corners |
| `tower-pricing` | Vertical stacked pricing cards |
| `spec-grid` | Terminal-style specs grid |
| `tracklist` | Music tracklist component |
| `glass-container` | Glass morphism container |
| `phase-container` | Phase transition container |

### 🌌 Backgrounds (6)

| Component | Description |
|-----------|-------------|
| `noise-canvas` | Animated noise canvas background |
| `glow-orbs` | Floating blurred orbs |
| `particle-field` | Drifting particle background |
| `gradient-mesh` | Animated gradient mesh |
| `noise-pattern` | Noise pattern overlay |
| `starfield` | Animated starfield |

### 🎭 Overlays (5)

| Component | Description |
|-----------|-------------|
| `noise-overlay` | SVG fractal noise texture overlay |
| `scanlines` | CRT-style horizontal scanlines |
| `scanlines-overlay` | Scanline effect overlay |
| `vignette` | Dark edges radial gradient |
| `static-flicker` | Animated noise with flicker effect |

### ✨ Effects (8)

| Component | Description |
|-----------|-------------|
| `warning-tape` | Scrolling warning tape banner |
| `cursor-follower` | Custom cursor with trail |
| `screen-distortion` | Full screen distortion effect |
| `glowing-border` | Glowing border container with pulse |
| `glitch-image` | Image with RGB glitch on hover |
| `chromatic-aberration` | RGB chromatic effect |
| `glass-crack` | Glass shatter effect |
| `radar-scan` | Radar scanning animation |

### 🏛️ Decorative (8)

| Component | Description |
|-----------|-------------|
| `rune-symbols` | Animated runic symbols |
| `ornaments` | Medieval ornaments |
| `coffee-stain` | Coffee stain/aged paper effect |
| `sheet-music` | Floating music notes |
| `inscription` | Stone carved inscription |
| `document-stamp` | Document stamp effect |
| `marginalia` | Margin annotations |
| `paper-edges` | Aged paper edges |

### 📥 Inputs (2)

| Component | Description |
|-----------|-------------|
| `chat-interface` | Chat message input |
| `secret-reveal` | Hidden content reveal |

### 🖥️ Display (3)

| Component | Description |
|-----------|-------------|
| `countdown-timer` | Countdown display |
| `tension-meter` | Tension gauge meter |
| `terminal-message` | Terminal message |

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

### TypingText

```tsx
import { TypingText } from './components/chaos/text/typing-text';

<TypingText speed={50} cursor>
  Initializing system...
</TypingText>
```

### DeadButton

```tsx
import { DeadButton } from './components/chaos/buttons/dead-button';

<DeadButton destruction="heavy">
  DESTROYED
</DeadButton>
```

### VoidFrame

```tsx
import { VoidFrame } from './components/chaos/layout/void-frame';

<VoidFrame variant="gold" corners="ornate">
  <h2>Ancient Text</h2>
</VoidFrame>
```

### RuneSymbols

```tsx
import { RuneSymbols } from './components/chaos/decorative/rune-symbols';

<RuneSymbols
  symbols={['ᛟ', 'ᚨ', 'ᛊ']}
  variant="gold"
  animated
/>
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

Color variants available:
- `cyan` (#00f0ff)
- `pink` (#ff00ff)
- `green` (#00ff88)
- `purple` (#a855f7)
- `red` (#ff0040)
- `yellow` (#ffff00)
- `gold` (#c9a84c)

## Philosophy

- **Copy-paste** — Components live in your codebase
- **Two variants** — CSS Modules or Tailwind, your choice
- **No runtime** — Pure CSS animations
- **Customizable** — Every prop exposed
- **Composable** — Mix effects freely
- **Brutalist** — Embrace the chaos

## What's New in 0.6.0

- 🆕 **26 new components** — 91 total
- 📝 **Text effects**: breathing-text, scramble-text, shadow-glitch, split-text, stroke-text, word-by-word-reveal, handwritten-text
- 🧭 **Navigation**: timeline-nav, corner-nav, minimal-nav
- 📐 **Layout**: phase-container, glass-container, horizontal-panel-scroll
- ✨ **Effects**: radar-scan, glass-crack, chromatic-aberration, scanlines-overlay
- 🌌 **Backgrounds**: starfield, gradient-mesh, noise-pattern
- 🖥️ **Display**: countdown-timer, tension-meter, terminal-message
- 🏛️ **Decorative**: document-stamp, marginalia, paper-edges
- 📥 **Inputs**: chat-interface, secret-reveal
- 🎛️ **Buttons**: cta-brutal with arrow variants

## License

MIT © [Pamacea](https://github.com/Pamacea)
