import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import styles from './component.module.css';

// Full component documentation
const COMPONENTS: Record<string, {
  name: string;
  category: string;
  description: string;
  props: { name: string; type: string; default: string; description: string }[];
  usage: string;
  cssVars?: { name: string; default: string; description: string }[];
}> = {
  // TEXT
  'glitch-text': {
    name: 'GlitchText',
    category: 'text',
    description: 'RGB split glitch text effect with customizable intensity and colors.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The text to display' },
      { name: 'intensity', type: '"subtle" | "medium" | "intense"', default: '"medium"', description: 'Glitch animation intensity' },
      { name: 'glitchColor', type: 'string', default: '"#ff0040"', description: 'Primary glitch color' },
      { name: 'glitchColorAlt', type: 'string', default: '"#00ffff"', description: 'Secondary glitch color' },
      { name: 'static', type: 'boolean', default: 'false', description: 'Glitch only on hover' },
    ],
    usage: `import { GlitchText } from '@/components/chaos/text/glitch-text';

<GlitchText>CHAOS</GlitchText>
<GlitchText intensity="intense">ERROR</GlitchText>
<GlitchText glitchColor="#ff00ff" glitchColorAlt="#00ff00">CUSTOM</GlitchText>
<GlitchText static>HOVER ME</GlitchText>`,
    cssVars: [
      { name: '--glitch-color', default: '#ff0040', description: 'Primary glitch layer color' },
      { name: '--glitch-color-alt', default: '#00ffff', description: 'Secondary glitch layer color' },
    ],
  },
  'flicker-text': {
    name: 'FlickerText',
    category: 'text',
    description: 'Text that flickers randomly like a broken neon sign.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The text to display' },
      { name: 'speed', type: '"slow" | "normal" | "fast" | "erratic"', default: '"normal"', description: 'Flicker speed' },
      { name: 'minOpacity', type: 'number', default: '0', description: 'Minimum opacity during flicker' },
      { name: 'hoverOnly', type: 'boolean', default: 'false', description: 'Only flicker on hover' },
    ],
    usage: `import { FlickerText } from '@/components/chaos/text/flicker-text';

<FlickerText>SIGNAL LOST</FlickerText>
<FlickerText speed="erratic">UNSTABLE</FlickerText>
<FlickerText minOpacity={0.5}>DIMMING</FlickerText>`,
  },
  'distortion-text': {
    name: 'DistortionText',
    category: 'text',
    description: 'Text with wave, shake, skew, or blur distortion effects.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The text to display' },
      { name: 'type', type: '"wave" | "shake" | "skew" | "blur"', default: '"wave"', description: 'Distortion type' },
      { name: 'speed', type: '"slow" | "normal" | "fast"', default: '"normal"', description: 'Animation speed' },
      { name: 'intensity', type: '"subtle" | "medium" | "intense"', default: '"medium"', description: 'Effect intensity' },
      { name: 'hoverOnly', type: 'boolean', default: 'false', description: 'Only animate on hover' },
    ],
    usage: `import { DistortionText } from '@/components/chaos/text/distortion-text';

<DistortionText type="wave">FLOWING</DistortionText>
<DistortionText type="shake" intensity="intense">EARTHQUAKE</DistortionText>
<DistortionText type="blur" hoverOnly>FOCUS</DistortionText>`,
  },
  'falling-text': {
    name: 'FallingText',
    category: 'text',
    description: 'Letters that fall in cascade with staggered animation.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The text to display' },
      { name: 'duration', type: 'number', default: '2', description: 'Fall duration in seconds' },
      { name: 'stagger', type: 'number', default: '100', description: 'Delay between letters in ms' },
      { name: 'loop', type: 'boolean', default: 'true', description: 'Loop the animation' },
      { name: 'direction', type: '"down" | "up"', default: '"down"', description: 'Fall direction' },
    ],
    usage: `import { FallingText } from '@/components/chaos/text/falling-text';

<FallingText>FALLING</FallingText>
<FallingText direction="up" stagger={50}>RISING</FallingText>
<FallingText loop={false}>ONCE</FallingText>`,
  },

  // OVERLAYS
  'noise-overlay': {
    name: 'NoiseOverlay',
    category: 'overlays',
    description: 'SVG fractal noise texture overlay for film grain effect.',
    props: [
      { name: 'opacity', type: 'number', default: '0.05', description: 'Noise opacity' },
      { name: 'frequency', type: 'number', default: '0.8', description: 'Noise frequency (higher = finer)' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Enable animation' },
      { name: 'blendMode', type: 'string', default: '"overlay"', description: 'CSS blend mode' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { NoiseOverlay } from '@/components/chaos/overlays/noise-overlay';

<NoiseOverlay />
<NoiseOverlay animated opacity={0.08} />
<NoiseOverlay frequency={1.2} blendMode="multiply" />`,
  },
  'scanlines': {
    name: 'Scanlines',
    category: 'overlays',
    description: 'CRT-style horizontal scanlines overlay.',
    props: [
      { name: 'opacity', type: 'number', default: '0.1', description: 'Line opacity' },
      { name: 'lineWidth', type: 'number', default: '1', description: 'Line thickness in px' },
      { name: 'gap', type: 'number', default: '2', description: 'Gap between lines in px' },
      { name: 'color', type: 'string', default: '"#000000"', description: 'Line color' },
      { name: 'flicker', type: 'boolean', default: 'false', description: 'Enable flicker' },
    ],
    usage: `import { Scanlines } from '@/components/chaos/overlays/scanlines';

<Scanlines />
<Scanlines flicker opacity={0.15} />
<Scanlines lineWidth={2} gap={4} color="#ff0040" />`,
  },
  'vignette': {
    name: 'Vignette',
    category: 'overlays',
    description: 'Dark edges radial gradient overlay.',
    props: [
      { name: 'intensity', type: 'number', default: '0.8', description: 'Vignette darkness' },
      { name: 'color', type: 'string', default: '"#000000"', description: 'Vignette color' },
      { name: 'spread', type: 'number', default: '0.5', description: 'How far effect extends' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { Vignette } from '@/components/chaos/overlays/vignette';

<Vignette />
<Vignette intensity={0.9} spread={0.3} />
<Vignette color="#1a0000" />`,
  },
  'static-flicker': {
    name: 'StaticFlicker',
    category: 'overlays',
    description: 'Animated TV static noise with flicker effect.',
    props: [
      { name: 'opacity', type: 'number', default: '0.03', description: 'Static opacity' },
      { name: 'speed', type: '"slow" | "normal" | "fast"', default: '"normal"', description: 'Flicker speed' },
      { name: 'frequency', type: 'number', default: '0.9', description: 'Noise frequency' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { StaticFlicker } from '@/components/chaos/overlays/static-flicker';

<StaticFlicker />
<StaticFlicker speed="fast" opacity={0.05} />`,
  },

  // BUTTONS
  'glitch-button': {
    name: 'GlitchButton',
    category: 'buttons',
    description: 'Button with glitch effect on hover including noise and RGB split.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'variant', type: '"default" | "outline" | "ghost"', default: '"default"', description: 'Button variant' },
      { name: 'intensity', type: '"subtle" | "medium" | "intense"', default: '"medium"', description: 'Glitch intensity' },
      { name: 'glitchColor', type: 'string', default: '"#ff0040"', description: 'Primary glitch color' },
      { name: 'glitchColorAlt', type: 'string', default: '"#00ffff"', description: 'Secondary glitch color' },
    ],
    usage: `import { GlitchButton } from '@/components/chaos/buttons/glitch-button';

<GlitchButton>ENTER</GlitchButton>
<GlitchButton variant="outline">SUBMIT</GlitchButton>
<GlitchButton intensity="intense">DESTROY</GlitchButton>`,
  },
  'chaos-button': {
    name: 'ChaosButton',
    category: 'buttons',
    description: 'Chaotic button with debris, glitch slices, and ghost layers.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'chaos', type: '"mild" | "medium" | "extreme"', default: '"medium"', description: 'Chaos level' },
      { name: 'variant', type: '"solid" | "outline" | "broken"', default: '"solid"', description: 'Button variant' },
      { name: 'accentColor', type: 'string', default: '"#ff0040"', description: 'Accent color' },
    ],
    usage: `import { ChaosButton } from '@/components/chaos/buttons/chaos-button';

<ChaosButton>CHAOS</ChaosButton>
<ChaosButton chaos="extreme">DESTROY</ChaosButton>
<ChaosButton variant="broken">BROKEN</ChaosButton>`,
  },

  // BACKGROUNDS
  'noise-canvas': {
    name: 'NoiseCanvas',
    category: 'backgrounds',
    description: 'Animated noise using canvas for smooth real-time static.',
    props: [
      { name: 'opacity', type: 'number', default: '0.05', description: 'Canvas opacity' },
      { name: 'fps', type: 'number', default: '24', description: 'Animation frame rate' },
      { name: 'intensity', type: 'number', default: '50', description: 'Noise intensity (0-255)' },
      { name: 'monochrome', type: 'boolean', default: 'true', description: 'Monochrome or colored' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { NoiseCanvas } from '@/components/chaos/backgrounds/noise-canvas';

<NoiseCanvas />
<NoiseCanvas fps={60} intensity={80} />
<NoiseCanvas monochrome={false} />`,
  },
  'glow-orbs': {
    name: 'GlowOrbs',
    category: 'backgrounds',
    description: 'Floating blurred color orbs for ambient background.',
    props: [
      { name: 'colors', type: 'string[]', default: '["#7c3aed", "#06b6d4", ...]', description: 'Orb colors' },
      { name: 'count', type: 'number', default: '5', description: 'Number of orbs' },
      { name: 'sizeRange', type: '[number, number]', default: '[100, 300]', description: 'Size range in px' },
      { name: 'blur', type: 'number', default: '80', description: 'Blur amount in px' },
      { name: 'durationRange', type: '[number, number]', default: '[15, 25]', description: 'Float duration range' },
    ],
    usage: `import { GlowOrbs } from '@/components/chaos/backgrounds/glow-orbs';

<GlowOrbs />
<GlowOrbs colors={['#ff0040']} count={3} blur={100} />
<GlowOrbs sizeRange={[50, 150]} />`,
  },
  'particle-field': {
    name: 'ParticleField',
    category: 'backgrounds',
    description: 'Drifting particle background that floats upward.',
    props: [
      { name: 'count', type: 'number', default: '50', description: 'Number of particles' },
      { name: 'color', type: 'string', default: '"#ffffff"', description: 'Particle color' },
      { name: 'sizeRange', type: '[number, number]', default: '[1, 3]', description: 'Size range in px' },
      { name: 'opacity', type: 'number', default: '0.5', description: 'Particle opacity' },
      { name: 'durationRange', type: '[number, number]', default: '[10, 20]', description: 'Drift duration range' },
    ],
    usage: `import { ParticleField } from '@/components/chaos/backgrounds/particle-field';

<ParticleField />
<ParticleField count={100} color="#ff0040" />
<ParticleField sizeRange={[2, 5]} opacity={0.8} />`,
  },
  'starfield': {
    name: 'Starfield',
    category: 'backgrounds',
    description: 'Animated canvas starfield with depth, twinkle, and parallax effects.',
    props: [
      { name: 'starCount', type: 'number', default: '200', description: 'Number of stars' },
      { name: 'speed', type: 'number', default: '0.5', description: 'Star movement speed' },
      { name: 'color', type: 'string', default: '"#ffffff"', description: 'Star color' },
      { name: 'minSize', type: 'number', default: '0.5', description: 'Minimum star size' },
      { name: 'maxSize', type: 'number', default: '2', description: 'Maximum star size' },
      { name: 'twinkle', type: 'boolean', default: 'true', description: 'Enable twinkling' },
      { name: 'twinkleSpeed', type: 'number', default: '0.02', description: 'Twinkle speed' },
      { name: 'depth', type: 'number', default: '1000', description: 'Perspective depth' },
      { name: 'direction', type: '"center" | "right" | "down" | "random"', default: '"center"', description: 'Movement direction' },
      { name: 'backgroundColor', type: 'string', default: '"transparent"', description: 'Canvas background' },
      { name: 'mouseParallax', type: 'boolean', default: 'true', description: 'Mouse parallax effect' },
      { name: 'parallaxIntensity', type: 'number', default: '0.5', description: 'Parallax strength' },
    ],
    usage: `import { Starfield } from '@/components/chaos/backgrounds/starfield';

<Starfield />
<Starfield starCount={500} speed={1} />
<Starfield direction="right" twinkle={false} color="#ff0040" />`,
  },

  // EFFECTS
  'warning-tape': {
    name: 'WarningTape',
    category: 'effects',
    description: 'Scrolling warning tape banner like construction site tape.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'Text to scroll' },
      { name: 'bgColor', type: 'string', default: '"#ff0040"', description: 'Background color' },
      { name: 'textColor', type: 'string', default: '"#000000"', description: 'Text color' },
      { name: 'duration', type: 'number', default: '20', description: 'Scroll duration in seconds' },
      { name: 'rotation', type: 'number', default: '-1', description: 'Rotation angle in degrees' },
      { name: 'reverse', type: 'boolean', default: 'false', description: 'Reverse scroll direction' },
    ],
    usage: `import { WarningTape } from '@/components/chaos/effects/warning-tape';

<WarningTape>SYSTEM ERROR • CRITICAL</WarningTape>
<WarningTape bgColor="#ffff00" textColor="#000">CAUTION</WarningTape>
<WarningTape reverse rotation={2}>REVERSE</WarningTape>`,
  },
  'cursor-follower': {
    name: 'CursorFollower',
    category: 'effects',
    description: 'Custom cursor that follows mouse with smooth delay.',
    props: [
      { name: 'size', type: 'number', default: '20', description: 'Cursor size in px' },
      { name: 'color', type: 'string', default: '"#ff0040"', description: 'Cursor color' },
      { name: 'delay', type: 'number', default: '0.1', description: 'Follow delay (0-1)' },
      { name: 'variant', type: '"ring" | "dot" | "crosshair"', default: '"ring"', description: 'Cursor style' },
      { name: 'blendMode', type: 'string', default: '"difference"', description: 'Mix blend mode' },
    ],
    usage: `import { CursorFollower } from '@/components/chaos/effects/cursor-follower';

<CursorFollower />
<CursorFollower variant="crosshair" color="#fff" />
<CursorFollower size={30} delay={0.2} />`,
  },
  'screen-distortion': {
    name: 'ScreenDistortion',
    category: 'effects',
    description: 'Full screen distortion effects: wave, glitch, chromatic, noise.',
    props: [
      { name: 'type', type: '"wave" | "glitch" | "chromatic" | "noise"', default: '"glitch"', description: 'Distortion type' },
      { name: 'intensity', type: '"subtle" | "medium" | "intense"', default: '"medium"', description: 'Effect intensity' },
      { name: 'speed', type: '"slow" | "normal" | "fast"', default: '"normal"', description: 'Animation speed' },
      { name: 'hoverOnly', type: 'boolean', default: 'false', description: 'Only show on hover' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { ScreenDistortion } from '@/components/chaos/effects/screen-distortion';

<ScreenDistortion type="glitch" />
<ScreenDistortion type="chromatic" intensity="subtle" />
<ScreenDistortion type="wave" speed="slow" />`,
  },
  'glowing-border': {
    name: 'GlowingBorder',
    category: 'effects',
    description: 'Container with animated neon glowing border effect.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Content inside the border' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple" | "rainbow"', default: '"cyan"', description: 'Glow color' },
      { name: 'animated', type: 'boolean', default: 'true', description: 'Enable pulse animation' },
      { name: 'intensity', type: '"low" | "medium" | "high"', default: '"medium"', description: 'Glow intensity' },
    ],
    usage: `import { GlowingBorder } from '@/components/chaos/effects/glowing-border';

<GlowingBorder>Content here</GlowingBorder>
<GlowingBorder variant="rainbow">Rainbow glow</GlowingBorder>
<GlowingBorder intensity="high" animated={false}>Static</GlowingBorder>`,
  },
  'glitch-image': {
    name: 'GlitchImage',
    category: 'effects',
    description: 'Image with RGB split glitch effect on hover.',
    props: [
      { name: 'src', type: 'string', default: '-', description: 'Image source URL' },
      { name: 'alt', type: 'string', default: '"Image"', description: 'Alt text' },
      { name: 'intensity', type: '"low" | "medium" | "high"', default: '"medium"', description: 'Glitch intensity' },
      { name: 'continuous', type: 'boolean', default: 'false', description: 'Continuous glitch (not just hover)' },
    ],
    usage: `import { GlitchImage } from '@/components/chaos/effects/glitch-image';

<GlitchImage src="/photo.jpg" alt="Profile" />
<GlitchImage src="/hero.png" intensity="high" />
<GlitchImage src="/bg.jpg" continuous />`,
  },
  'radar-scan': {
    name: 'RadarScan',
    category: 'effects',
    description: 'Circular radar display with rotating scan line, rings, and target blips.',
    props: [
      { name: 'color', type: 'string', default: '"rgba(0, 255, 0, 0.8)"', description: 'Scan color' },
      { name: 'speed', type: 'number', default: '1', description: 'Rotation speed (per second)' },
      { name: 'size', type: 'number', default: '300', description: 'Radar size in pixels' },
      { name: 'rings', type: 'number', default: '4', description: 'Number of concentric rings' },
      { name: 'blips', type: 'Array<{angle, distance}>', default: '[]', description: 'Target blips to display' },
      { name: 'pulseBlips', type: 'boolean', default: 'true', description: 'Enable pulse on blips' },
      { name: 'scanWidth', type: 'number', default: '2', description: 'Scan line width' },
    ],
    usage: `import { RadarScan } from '@/components/chaos/effects/radar-scan';

<RadarScan />
<RadarScan color="rgba(255, 0, 0, 0.8)" speed={2} />
<RadarScan blips={[{angle: 45, distance: 70}, {angle: 180, distance: 40}]} />`,
  },

  // NEON
  'neon-button': {
    name: 'NeonButton',
    category: 'neon',
    description: 'Glowing neon button with multiple color variants and effects.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple" | "red" | "yellow"', default: '"cyan"', description: 'Neon color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'glowing', type: 'boolean', default: 'false', description: 'Continuous glow pulse' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Animated gradient border' },
      { name: 'cut', type: 'boolean', default: 'false', description: 'Cut corner style' },
    ],
    usage: `import { NeonButton } from '@/components/chaos/neon/neon-button';

<NeonButton>ENTER</NeonButton>
<NeonButton variant="pink" glowing>GLOW</NeonButton>
<NeonButton variant="green" cut>CUT STYLE</NeonButton>
<NeonButton size="lg" animated>ANIMATED</NeonButton>`,
  },
  'neon-badge': {
    name: 'NeonBadge',
    category: 'neon',
    description: 'Luminous status badge with pulse animation.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Badge content' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple" | "red" | "yellow"', default: '"cyan"', description: 'Neon color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Badge size' },
      { name: 'pulse', type: 'boolean', default: 'false', description: 'Pulse animation' },
      { name: 'outline', type: 'boolean', default: 'false', description: 'Outline style' },
    ],
    usage: `import { NeonBadge } from '@/components/chaos/neon/neon-badge';

<NeonBadge>LIVE</NeonBadge>
<NeonBadge variant="green" pulse>ONLINE</NeonBadge>
<NeonBadge variant="red" outline>ERROR</NeonBadge>`,
  },
  'neon-progress': {
    name: 'NeonProgress',
    category: 'neon',
    description: 'Glowing progress bar with shimmer animation.',
    props: [
      { name: 'value', type: 'number', default: '-', description: 'Current progress value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple" | "rainbow"', default: '"cyan"', description: 'Neon color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Bar size' },
      { name: 'animated', type: 'boolean', default: 'true', description: 'Shimmer animation' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage' },
    ],
    usage: `import { NeonProgress } from '@/components/chaos/neon/neon-progress';

<NeonProgress value={75} />
<NeonProgress value={50} variant="rainbow" showValue />
<NeonProgress value={30} size="lg" animated={false} />`,
  },
  'neon-toggle': {
    name: 'NeonToggle',
    category: 'neon',
    description: 'Neon on/off switch with glow effect.',
    props: [
      { name: 'checked', type: 'boolean', default: '-', description: 'Current state' },
      { name: 'onChange', type: '(checked: boolean) => void', default: '-', description: 'Change callback' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Toggle size' },
    ],
    usage: `import { NeonToggle } from '@/components/chaos/neon/neon-toggle';

const [on, setOn] = useState(false);

<NeonToggle checked={on} onChange={setOn} />
<NeonToggle checked={on} onChange={setOn} variant="pink" />`,
  },
  'neon-alert': {
    name: 'NeonAlert',
    category: 'neon',
    description: 'Neon notification/alert component with variants.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Alert message' },
      { name: 'variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Alert type' },
      { name: 'title', type: 'string', default: '-', description: 'Alert title' },
      { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
      { name: 'onDismiss', type: '() => void', default: '-', description: 'Close callback' },
    ],
    usage: `import { NeonAlert } from '@/components/chaos/neon/neon-alert';

<NeonAlert title="Info">This is an info message</NeonAlert>
<NeonAlert variant="error" dismissible onDismiss={handleClose}>
  Critical error occurred
</NeonAlert>`,
  },
  'neon-tabs': {
    name: 'NeonTabs',
    category: 'neon',
    description: 'Glowing tab navigation component.',
    props: [
      { name: 'tabs', type: 'NeonTab[]', default: '-', description: 'Array of {id, label, icon?}' },
      { name: 'activeTab', type: 'string', default: '-', description: 'Active tab id' },
      { name: 'onChange', type: '(tabId: string) => void', default: '-', description: 'Tab change callback' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
    ],
    usage: `import { NeonTabs } from '@/components/chaos/neon/neon-tabs';

const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'settings', label: 'Settings' },
];

<NeonTabs tabs={tabs} activeTab="home" onChange={setActiveTab} />`,
  },
  'neon-divider': {
    name: 'NeonDivider',
    category: 'neon',
    description: 'Luminous horizontal divider line.',
    props: [
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple" | "gradient"', default: '"cyan"', description: 'Neon color' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Glow animation' },
      { name: 'text', type: 'string', default: '-', description: 'Center text' },
    ],
    usage: `import { NeonDivider } from '@/components/chaos/neon/neon-divider';

<NeonDivider />
<NeonDivider variant="gradient" animated />
<NeonDivider text="OR" variant="pink" />`,
  },

  // CYBER
  'cyber-input': {
    name: 'CyberInput',
    category: 'cyber',
    description: 'Animated input field with neon glow and label.',
    props: [
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'label', type: 'string', default: '-', description: 'Input label' },
      { name: 'error', type: 'string', default: '-', description: 'Error message' },
    ],
    usage: `import { CyberInput } from '@/components/chaos/cyber/cyber-input';

<CyberInput placeholder="Enter text" />
<CyberInput label="Username" variant="pink" />
<CyberInput label="Email" error="Invalid email" />`,
  },
  'cyber-loader': {
    name: 'CyberLoader',
    category: 'cyber',
    description: 'Futuristic loading spinners with multiple styles.',
    props: [
      { name: 'variant', type: '"spinner" | "dots" | "bars" | "pulse" | "hexagon"', default: '"spinner"', description: 'Loader style' },
      { name: 'color', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Loader size' },
    ],
    usage: `import { CyberLoader } from '@/components/chaos/cyber/cyber-loader';

<CyberLoader />
<CyberLoader variant="dots" color="pink" />
<CyberLoader variant="hexagon" size="lg" />`,
  },
  'cyber-modal': {
    name: 'CyberModal',
    category: 'cyber',
    description: 'Modal dialog with scanlines effect.',
    props: [
      { name: 'isOpen', type: 'boolean', default: '-', description: 'Modal visibility' },
      { name: 'onClose', type: '() => void', default: '-', description: 'Close callback' },
      { name: 'title', type: 'string', default: '-', description: 'Modal title' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "red"', default: '"cyan"', description: 'Neon color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Modal size' },
    ],
    usage: `import { CyberModal } from '@/components/chaos/cyber/cyber-modal';

<CyberModal isOpen={open} onClose={() => setOpen(false)} title="Confirm">
  Are you sure?
</CyberModal>`,
  },
  'cyber-avatar': {
    name: 'CyberAvatar',
    category: 'cyber',
    description: 'Avatar with neon frame and status indicator.',
    props: [
      { name: 'src', type: 'string', default: '-', description: 'Image source' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Avatar size' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'status', type: '"online" | "offline" | "busy" | "away"', default: '-', description: 'Status indicator' },
      { name: 'glowing', type: 'boolean', default: 'false', description: 'Continuous glow' },
    ],
    usage: `import { CyberAvatar } from '@/components/chaos/cyber/cyber-avatar';

<CyberAvatar src="/avatar.jpg" />
<CyberAvatar src="/user.png" status="online" glowing />
<CyberAvatar src="/profile.jpg" size="xl" variant="pink" />`,
  },
  'cyber-slider': {
    name: 'CyberSlider',
    category: 'cyber',
    description: 'Neon range slider with value display.',
    props: [
      { name: 'value', type: 'number', default: '-', description: 'Current value' },
      { name: 'onChange', type: '(value: number) => void', default: '-', description: 'Change callback' },
      { name: 'min', type: 'number', default: '0', description: 'Minimum value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'step', type: 'number', default: '1', description: 'Step increment' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show current value' },
    ],
    usage: `import { CyberSlider } from '@/components/chaos/cyber/cyber-slider';

<CyberSlider value={50} onChange={setValue} />
<CyberSlider value={vol} onChange={setVol} showValue variant="pink" />`,
  },
  'cyber-tooltip': {
    name: 'CyberTooltip',
    category: 'cyber',
    description: 'Terminal-style tooltip on hover.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Trigger element' },
      { name: 'content', type: 'ReactNode', default: '-', description: 'Tooltip content' },
      { name: 'position', type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: 'Tooltip position' },
      { name: 'variant', type: '"cyan" | "pink" | "green"', default: '"cyan"', description: 'Neon color' },
    ],
    usage: `import { CyberTooltip } from '@/components/chaos/cyber/cyber-tooltip';

<CyberTooltip content="Click to submit">
  <button>Submit</button>
</CyberTooltip>`,
  },

  // LAYOUT
  'hologram-card': {
    name: 'HologramCard',
    category: 'layout',
    description: 'Holographic card with scanlines and glow.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Card content' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'scanlines', type: 'boolean', default: 'true', description: 'Show CRT scanlines' },
      { name: 'flicker', type: 'boolean', default: 'false', description: 'Flicker effect' },
    ],
    usage: `import { HologramCard } from '@/components/chaos/layout/hologram-card';

<HologramCard>
  <h2>Title</h2>
  <p>Content here</p>
</HologramCard>
<HologramCard variant="pink" flicker>Unstable</HologramCard>`,
  },
  'data-grid': {
    name: 'DataGrid',
    category: 'layout',
    description: 'Terminal-style data table with neon accents.',
    props: [
      { name: 'columns', type: 'DataGridColumn[]', default: '-', description: 'Column definitions {key, header, width?}' },
      { name: 'data', type: 'T[]', default: '-', description: 'Data rows' },
      { name: 'variant', type: '"cyan" | "green" | "amber"', default: '"cyan"', description: 'Color theme' },
      { name: 'striped', type: 'boolean', default: 'true', description: 'Striped rows' },
      { name: 'hoverable', type: 'boolean', default: 'true', description: 'Hover effect' },
    ],
    usage: `import { DataGrid } from '@/components/chaos/layout/data-grid';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
];
const data = [{ name: 'Server-1', status: 'Online' }];

<DataGrid columns={columns} data={data} />`,
  },

  // NAVIGATION
  'hexagon-menu': {
    name: 'HexagonMenu',
    category: 'navigation',
    description: 'Honeycomb-style hexagonal menu layout.',
    props: [
      { name: 'items', type: 'HexagonMenuItem[]', default: '-', description: 'Menu items {id, label, icon?, onClick?}' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Hexagon size' },
    ],
    usage: `import { HexagonMenu } from '@/components/chaos/navigation/hexagon-menu';

const items = [
  { id: 'home', label: 'Home' },
  { id: 'settings', label: 'Settings' },
  { id: 'profile', label: 'Profile' },
];

<HexagonMenu items={items} />`,
  },

  // NEW TEXT COMPONENTS
  'typing-text': {
    name: 'TypingText',
    category: 'text',
    description: 'Typewriter animation with customizable cursor and looping.',
    props: [
      { name: 'text', type: 'string', default: '-', description: 'Text to type out' },
      { name: 'speed', type: 'number', default: '50', description: 'Typing speed in ms per character' },
      { name: 'delay', type: 'number', default: '0', description: 'Delay before starting in ms' },
      { name: 'showCursor', type: 'boolean', default: 'true', description: 'Show cursor' },
      { name: 'cursorStyle', type: '"block" | "line" | "underscore"', default: '"block"', description: 'Cursor style' },
      { name: 'variant', type: '"default" | "terminal" | "hacker" | "cyber" | "ghost"', default: '"default"', description: 'Visual variant' },
      { name: 'loop', type: 'boolean', default: 'false', description: 'Loop the animation' },
      { name: 'loopDelay', type: 'number', default: '2000', description: 'Pause between loops in ms' },
      { name: 'deleteSpeed', type: 'number', default: '30', description: 'Delete speed when looping' },
      { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when typing completes' },
    ],
    usage: `import { TypingText } from '@/components/chaos/text/typing-text';

<TypingText text="Hello World" />
<TypingText text="Loading..." variant="terminal" loop />
<TypingText text="SYSTEM ONLINE" speed={100} cursorStyle="line" />`,
  },
  'char-glitch': {
    name: 'CharGlitch',
    category: 'text',
    description: 'Per-character glitch effect with scramble reveal.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'Text to display' },
      { name: 'intensity', type: '"subtle" | "medium" | "intense"', default: '"medium"', description: 'Glitch intensity' },
      { name: 'variant', type: '"blood" | "cyber" | "matrix" | "corrupt"', default: '"blood"', description: 'Visual variant' },
      { name: 'mode', type: '"random" | "hover" | "continuous" | "wave"', default: '"random"', description: 'Trigger mode' },
      { name: 'interval', type: 'number', default: '100', description: 'Interval between random glitches in ms' },
      { name: 'glitchChars', type: 'string', default: '"!@#$%..."', description: 'Characters to use for scramble' },
      { name: 'scramble', type: 'boolean', default: 'false', description: 'Enable scramble reveal effect' },
    ],
    usage: `import { CharGlitch } from '@/components/chaos/text/char-glitch';

<CharGlitch>CORRUPTED</CharGlitch>
<CharGlitch variant="matrix" mode="wave">MATRIX</CharGlitch>
<CharGlitch scramble>REVEAL ME</CharGlitch>`,
  },
  'reveal-text': {
    name: 'RevealText',
    category: 'text',
    description: 'Scroll-triggered text reveal with multiple split modes.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'Text to reveal' },
      { name: 'splitBy', type: '"word" | "char" | "line"', default: '"word"', description: 'Split mode' },
      { name: 'direction', type: '"fromBottom" | "fromTop" | "fromLeft" | "fromRight"', default: '"fromBottom"', description: 'Reveal direction' },
      { name: 'effect', type: '"none" | "blur" | "scale" | "rotate"', default: '"none"', description: 'Additional effect' },
      { name: 'stagger', type: 'number', default: '50', description: 'Stagger delay between elements in ms' },
      { name: 'speed', type: '"fast" | "normal" | "slow"', default: '"normal"', description: 'Animation speed' },
      { name: 'threshold', type: 'number', default: '0.2', description: 'Trigger threshold (0-1)' },
      { name: 'once', type: 'boolean', default: 'true', description: 'Only animate once' },
      { name: 'highlight', type: 'boolean', default: 'false', description: 'Show highlight underline' },
      { name: 'highlightColor', type: 'string', default: '"#ff0040"', description: 'Highlight color' },
      { name: 'immediate', type: 'boolean', default: 'false', description: 'Trigger immediately without scroll' },
    ],
    usage: `import { RevealText } from '@/components/chaos/text/reveal-text';

<RevealText>This text reveals on scroll</RevealText>
<RevealText splitBy="char" direction="fromLeft">Character by character</RevealText>
<RevealText effect="blur" highlight>With blur effect</RevealText>`,
  },
  'strike-reveal': {
    name: 'StrikeReveal',
    category: 'text',
    description: 'Strikethrough animation that reveals new text.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'Original text to strike through' },
      { name: 'revealText', type: 'string', default: '-', description: 'Text to reveal after strike' },
      { name: 'variant', type: '"permanent" | "crossout" | "redacted" | "censored" | "glitch"', default: '"permanent"', description: 'Visual variant' },
      { name: 'color', type: '"default" | "blood" | "cyber" | "acid" | "void"', default: '"default"', description: 'Color variant' },
      { name: 'trigger', type: '"auto" | "hover" | "scroll" | "click"', default: '"auto"', description: 'Trigger mode' },
      { name: 'delay', type: 'number', default: '0', description: 'Delay before animation (ms)' },
      { name: 'double', type: 'boolean', default: 'false', description: 'Double strike line' },
      { name: 'strikeColor', type: 'string', default: '-', description: 'Custom strike color' },
      { name: 'onReveal', type: '() => void', default: '-', description: 'Callback when reveal completes' },
    ],
    usage: `import { StrikeReveal } from '@/components/chaos/text/strike-reveal';

<StrikeReveal revealText="TRUTH">LIE</StrikeReveal>
<StrikeReveal variant="redacted" trigger="hover">CLASSIFIED</StrikeReveal>
<StrikeReveal color="blood" double>OLD TEXT</StrikeReveal>`,
  },
  'giant-layers': {
    name: 'GiantLayers',
    category: 'text',
    description: 'Large text with layered shadow effects.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'Text to display' },
      { name: 'layers', type: '1 | 2 | 3', default: '3', description: 'Number of shadow layers' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"lg"', description: 'Size preset' },
      { name: 'variant', type: '"blood" | "cyber" | "mono" | "neon"', default: '"blood"', description: 'Visual variant' },
      { name: 'direction', type: '"diagonal" | "horizontal" | "vertical"', default: '"diagonal"', description: 'Shadow offset direction' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Animate layers' },
      { name: 'hover', type: 'boolean', default: 'false', description: 'Expand on hover' },
      { name: 'layerColors', type: '[string, string?, string?]', default: '-', description: 'Custom layer colors' },
    ],
    usage: `import { GiantLayers } from '@/components/chaos/text/giant-layers';

<GiantLayers>CHAOS</GiantLayers>
<GiantLayers variant="cyber" animated>CYBER</GiantLayers>
<GiantLayers layers={2} size="xl" hover>BIG</GiantLayers>`,
  },
  'blood-drip': {
    name: 'BloodDrip',
    category: 'text',
    description: 'Text with animated dripping blood effect.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'Text to display' },
      { name: 'variant', type: '"blood" | "acid" | "cyber" | "void" | "chrome"', default: '"blood"', description: 'Drip color variant' },
      { name: 'intensity', type: '"light" | "medium" | "heavy"', default: '"medium"', description: 'Drip intensity' },
      { name: 'dripsPerChar', type: '1 | 2 | 3', default: '1', description: 'Number of drips per character' },
      { name: 'duration', type: 'number', default: '2', description: 'Base drip duration in seconds' },
      { name: 'glowing', type: 'boolean', default: 'false', description: 'Add text glow effect' },
      { name: 'melting', type: 'boolean', default: 'false', description: 'Add melting animation' },
      { name: 'showPool', type: 'boolean', default: 'false', description: 'Show pool at bottom' },
      { name: 'pauseOnHover', type: 'boolean', default: 'false', description: 'Pause animation on hover' },
      { name: 'static', type: 'boolean', default: 'false', description: 'Static drips (no animation)' },
      { name: 'dripColor', type: 'string', default: '-', description: 'Custom drip color' },
      { name: 'dripProbability', type: 'number', default: '0.7', description: 'Probability of drip per character (0-1)' },
    ],
    usage: `import { BloodDrip } from '@/components/chaos/text/blood-drip';

<BloodDrip>HORROR</BloodDrip>
<BloodDrip variant="acid" glowing>TOXIC</BloodDrip>
<BloodDrip intensity="heavy" showPool>DRIPPING</BloodDrip>`,
  },
  'rotate-text': {
    name: 'RotateText',
    category: 'text',
    description: 'Word rotation carousel with multiple animation styles.',
    props: [
      { name: 'prefix', type: 'string', default: '-', description: 'Static text before rotating words' },
      { name: 'suffix', type: 'string', default: '-', description: 'Static text after rotating words' },
      { name: 'words', type: 'string[]', default: '-', description: 'Words to rotate through' },
      { name: 'animation', type: '"up" | "down" | "left" | "right" | "flip" | "fade" | "zoom" | "blur"', default: '"up"', description: 'Rotation animation' },
      { name: 'duration', type: 'number', default: '2000', description: 'Duration each word is shown (ms)' },
      { name: 'speed', type: '"fast" | "normal" | "slow"', default: '"normal"', description: 'Animation speed' },
      { name: 'highlight', type: 'boolean', default: 'false', description: 'Highlight active word' },
      { name: 'highlightColor', type: 'string', default: '"#ff0040"', description: 'Highlight color' },
      { name: 'underline', type: 'boolean', default: 'false', description: 'Show underline on active' },
      { name: 'bracket', type: 'boolean', default: 'false', description: 'Show brackets around rotator' },
      { name: 'pauseOnHover', type: 'boolean', default: 'false', description: 'Pause on hover' },
      { name: 'cursor', type: 'boolean', default: 'false', description: 'Show typing cursor' },
      { name: 'onChange', type: '(word: string, index: number) => void', default: '-', description: 'Callback when word changes' },
    ],
    usage: `import { RotateText } from '@/components/chaos/text/rotate-text';

<RotateText prefix="I am" words={['CHAOS', 'DESTRUCTION', 'POWER']} />
<RotateText words={['BUILD', 'BREAK', 'REPEAT']} animation="flip" highlight />
<RotateText prefix="We" words={['CREATE', 'DESTROY']} suffix="." bracket />`,
  },
  'ascii-art': {
    name: 'AsciiArt',
    category: 'text',
    description: 'ASCII art display with reveal and glitch animations.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'ASCII art content (multi-line string)' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Size variant' },
      { name: 'variant', type: '"default" | "blood" | "cyber" | "matrix" | "amber" | "ghost" | "gradient"', default: '"default"', description: 'Color variant' },
      { name: 'animation', type: '"none" | "typing" | "reveal" | "glitch" | "flicker" | "pulse"', default: '"none"', description: 'Animation effect' },
      { name: 'scanlines', type: 'boolean', default: 'false', description: 'Show scanlines overlay' },
      { name: 'bordered', type: 'boolean', default: 'false', description: 'Show border' },
      { name: 'title', type: 'string', default: '-', description: 'Border title' },
      { name: 'revealDelay', type: 'number', default: '100', description: 'Delay between lines for reveal animation (ms)' },
      { name: 'color', type: 'string', default: '-', description: 'Custom color' },
    ],
    usage: `import { AsciiArt } from '@/components/chaos/text/ascii-art';

<AsciiArt variant="matrix" animation="reveal">
{\`  /\\\\
 /  \\\\
/____\\\\\`}
</AsciiArt>`,
  },
  'countdown-display': {
    name: 'CountdownDisplay',
    category: 'text',
    description: 'Countdown timer with flip animation and urgency effects.',
    props: [
      { name: 'target', type: 'Date | number', default: '-', description: 'Target date/time or duration in seconds' },
      { name: 'format', type: '"full" | "hms" | "ms" | "dhms"', default: '"hms"', description: 'Display format' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size variant' },
      { name: 'variant', type: '"default" | "minimal" | "neon" | "brutal" | "glitch"', default: '"default"', description: 'Visual variant' },
      { name: 'accentColor', type: 'string', default: '"#ff0040"', description: 'Accent color' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show labels under numbers' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Compact mode (less spacing)' },
      { name: 'flip', type: 'boolean', default: 'false', description: 'Enable flip animation' },
      { name: 'urgentThreshold', type: 'number', default: '60', description: 'Seconds threshold for urgency effect' },
      { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when countdown reaches zero' },
      { name: 'labels', type: '{ days?: string; hours?: string; minutes?: string; seconds?: string }', default: '-', description: 'Labels customization' },
    ],
    usage: `import { CountdownDisplay } from '@/components/chaos/text/countdown-display';

<CountdownDisplay target={new Date('2025-01-01')} />
<CountdownDisplay target={3600} variant="neon" flip />
<CountdownDisplay target={300} urgentThreshold={120} onComplete={() => alert('Done!')} />`,
  },
  'terminal-output': {
    name: 'TerminalOutput',
    category: 'text',
    description: 'Terminal console with animated line output.',
    props: [
      { name: 'lines', type: 'TerminalLine[]', default: '-', description: 'Lines to display {type, content, prompt?, delay?}' },
      { name: 'prompt', type: 'string', default: '"❯"', description: 'Default prompt string' },
      { name: 'variant', type: '"default" | "hacker" | "blood" | "cyber"', default: '"default"', description: 'Visual variant' },
      { name: 'showHeader', type: 'boolean', default: 'true', description: 'Show window header with dots' },
      { name: 'title', type: 'string', default: '"terminal"', description: 'Window title' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Animate lines appearing' },
      { name: 'animationDelay', type: 'number', default: '100', description: 'Base delay between animated lines (ms)' },
      { name: 'typingCursor', type: 'boolean', default: 'false', description: 'Show typing cursor on last command' },
      { name: 'scanlines', type: 'boolean', default: 'false', description: 'Enable scanlines overlay' },
      { name: 'glowing', type: 'boolean', default: 'false', description: 'Enable glow effect' },
      { name: 'showInput', type: 'boolean', default: 'false', description: 'Show interactive input' },
      { name: 'inputPlaceholder', type: 'string', default: '"Type a command..."', description: 'Input placeholder' },
      { name: 'onCommand', type: '(command: string) => void', default: '-', description: 'Callback when command is submitted' },
      { name: 'autoScroll', type: 'boolean', default: 'true', description: 'Auto-scroll to bottom' },
    ],
    usage: `import { TerminalOutput } from '@/components/chaos/text/terminal-output';

const lines = [
  { type: 'command', content: 'npm install chaos' },
  { type: 'output', content: 'Installing...' },
  { type: 'success', content: 'Done!' },
];

<TerminalOutput lines={lines} animated />`,
  },

  // NEW INPUTS
  'chat-interface': {
    name: 'ChatInterface',
    category: 'inputs',
    description: 'Chat message interface with echo response and themes.',
    props: [
      { name: 'initialMessages', type: 'Message[]', default: '[]', description: 'Initial messages' },
      { name: 'onSendMessage', type: '(content: string) => void', default: '-', description: 'Callback on send' },
      { name: 'showTimestamps', type: 'boolean', default: 'false', description: 'Show timestamps' },
      { name: 'theme', type: '"terminal" | "neon" | "minimal" | "cyber"', default: '"terminal"', description: 'Chat theme' },
      { name: 'autoScroll', type: 'boolean', default: 'true', description: 'Auto-scroll to bottom' },
      { name: 'showInput', type: 'boolean', default: 'true', description: 'Show input field' },
      { name: 'placeholder', type: 'string', default: '"Type a message..."', description: 'Input placeholder' },
      { name: 'sendLabel', type: 'string', default: '"Send"', description: 'Send button label' },
    ],
    usage: `import { ChatInterface } from '@/components/chaos/inputs/chat-interface';

<ChatInterface />
<ChatInterface theme="neon" showTimestamps />
<ChatInterface onSendMessage={(msg) => console.log(msg)} />`,
  },

  // NEW NAVIGATION COMPONENTS
  'scattered-nav': {
    name: 'ScatteredNav',
    category: 'navigation',
    description: 'Chaotically scattered navigation with glitch effects.',
    props: [
      { name: 'items', type: 'ScatteredNavItemProps[]', default: '-', description: 'Navigation items' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Custom nav items' },
    ],
    usage: `import { ScatteredNav, ScatteredNavItem } from '@/components/chaos/navigation/scattered-nav';

<ScatteredNav>
  <ScatteredNavItem href="/" variant="logo">LOGO</ScatteredNavItem>
  <ScatteredNavItem href="/about" scattered={2}>ABOUT</ScatteredNavItem>
  <ScatteredNavItem variant="status">ONLINE</ScatteredNavItem>
</ScatteredNav>`,
  },
  'vertical-nav': {
    name: 'VerticalNav',
    category: 'navigation',
    description: 'Vertical sidebar navigation with rune decorations.',
    props: [
      { name: 'items', type: 'VerticalNavItemProps[]', default: '-', description: 'Navigation items {href?, glyph, label?, active?, onClick?}' },
      { name: 'runeTop', type: 'string', default: '"ᛟ"', description: 'Top rune symbol' },
      { name: 'runeBottom', type: 'string', default: '"ᛞ"', description: 'Bottom rune symbol' },
      { name: 'variant', type: '"default" | "dark"', default: '"default"', description: 'Visual variant' },
      { name: 'size', type: '"default" | "compact"', default: '"default"', description: 'Size variant' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Custom nav items' },
    ],
    usage: `import { VerticalNav } from '@/components/chaos/navigation/vertical-nav';

const items = [
  { glyph: '⌂', label: 'Home', href: '/', active: true },
  { glyph: '☰', label: 'Menu', href: '/menu' },
  { glyph: '⚙', label: 'Settings', href: '/settings' },
];

<VerticalNav items={items} />`,
  },
  'timeline-nav': {
    name: 'TimelineNav',
    category: 'navigation',
    description: 'Timeline-style navigation with era markers and active states.',
    props: [
      { name: 'eras', type: 'TimelineEra[]', default: '-', description: 'Timeline eras {value, label, active?}' },
      { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Timeline orientation' },
      { name: 'onEraClick', type: '(era: TimelineEra, index: number) => void', default: '-', description: 'Era click callback' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show era labels' },
      { name: 'showLine', type: 'boolean', default: 'true', description: 'Show connecting line' },
      { name: 'dotSize', type: '"small" | "medium" | "large"', default: '"medium"', description: 'Dot size' },
    ],
    usage: `import { TimelineNav } from '@/components/chaos/navigation/timeline-nav';

const eras = [
  { value: '2020', label: '2020', active: true },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
];

<TimelineNav eras={eras} orientation="vertical" />`,
  },
  'brutal-nav': {
    name: 'BrutalNav',
    category: 'navigation',
    description: 'Bold brutalist navigation bar with status indicators.',
    props: [
      { name: 'brand', type: 'string', default: '-', description: 'Brand/logo text' },
      { name: 'brandGlitch', type: 'boolean', default: '-', description: 'Enable brand glitch effect' },
      { name: 'links', type: 'BrutalNavLinkProps[]', default: '-', description: 'Navigation links {href, children, active?}' },
      { name: 'statusItems', type: 'BrutalNavStatusProps[]', default: '-', description: 'Status indicators {label, value, status?}' },
      { name: 'variant', type: '"default" | "heavy" | "double"', default: '"default"', description: 'Visual variant' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Custom content' },
    ],
    usage: `import { BrutalNav } from '@/components/chaos/navigation/brutal-nav';

<BrutalNav 
  brand="CHAOS"
  brandGlitch
  links={[
    { href: '/', children: 'HOME', active: true },
    { href: '/about', children: 'ABOUT' },
  ]}
  statusItems={[
    { label: 'STATUS', value: 'ONLINE', status: 'online' },
  ]}
/>`,
  },
  'progress-dots': {
    name: 'ProgressDots',
    category: 'navigation',
    description: 'Section progress indicator with dots.',
    props: [
      { name: 'items', type: 'ProgressDotItem[]', default: '-', description: 'Dot items {id, label?, href?}' },
      { name: 'activeId', type: 'string', default: '-', description: 'Active dot id' },
      { name: 'variant', type: '"default" | "gold" | "minimal"', default: '"default"', description: 'Visual variant' },
      { name: 'direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Layout direction' },
      { name: 'showConnector', type: 'boolean', default: 'false', description: 'Show connectors between dots' },
      { name: 'onDotClick', type: '(id: string) => void', default: '-', description: 'Click callback' },
    ],
    usage: `import { ProgressDots } from '@/components/chaos/navigation/progress-dots';

const items = [
  { id: 'intro', label: 'INTRO', href: '#intro' },
  { id: 'features', label: 'FEATURES', href: '#features' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

<ProgressDots items={items} activeId="features" />`,
  },
  'scroll-indicator': {
    name: 'ScrollIndicator',
    category: 'navigation',
    description: 'Fixed scroll position indicator.',
    props: [
      { name: 'text', type: 'string', default: '"SCROLL"', description: 'Display text' },
      { name: 'showArrow', type: 'boolean', default: 'false', description: 'Show arrow' },
      { name: 'showPercentage', type: 'boolean', default: 'false', description: 'Show scroll percentage' },
      { name: 'variant', type: '"default" | "blood" | "minimal"', default: '"default"', description: 'Visual variant' },
      { name: 'position', type: '"right" | "left"', default: '"right"', description: 'Position' },
      { name: 'trackHeight', type: 'number', default: '100', description: 'Track height in px' },
    ],
    usage: `import { ScrollIndicator } from '@/components/chaos/navigation/scroll-indicator';

<ScrollIndicator />
<ScrollIndicator showPercentage variant="blood" />
<ScrollIndicator text="DEPTH" showArrow position="left" />`,
  },

  // NEW BUTTON COMPONENTS
  'dead-button': {
    name: 'DeadButton',
    category: 'buttons',
    description: 'Destroyed/dead aesthetic button with noise effects.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'icon', type: 'ReactNode', default: '-', description: 'Icon element' },
      { name: 'gradient', type: '1 | 2 | 3 | 4', default: '1', description: 'Gradient style' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'showStrike', type: 'boolean', default: 'true', description: 'Show strikethrough effect' },
    ],
    usage: `import { DeadButton } from '@/components/chaos/buttons/dead-button';

<DeadButton>DEAD END</DeadButton>
<DeadButton gradient={2} size="lg">DESTROYED</DeadButton>
<DeadButton icon={<Skull />}>GAME OVER</DeadButton>`,
  },
  'deeper-button': {
    name: 'DeeperButton',
    category: 'buttons',
    description: 'Deep descent call-to-action button.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'variant', type: '"default" | "gold" | "outline" | "ghost"', default: '"default"', description: 'Visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'showArrow', type: 'boolean', default: 'true', description: 'Show arrow' },
      { name: 'pulsing', type: 'boolean', default: 'false', description: 'Enable pulse animation' },
      { name: 'glitchOnHover', type: 'boolean', default: 'false', description: 'Enable glitch on hover' },
      { name: 'iconLeft', type: 'ReactNode', default: '-', description: 'Left icon' },
      { name: 'iconRight', type: 'ReactNode', default: '-', description: 'Right icon' },
      { name: 'href', type: 'string', default: '-', description: 'Link URL (renders as anchor)' },
    ],
    usage: `import { DeeperButton } from '@/components/chaos/buttons/deeper-button';

<DeeperButton>GO DEEPER</DeeperButton>
<DeeperButton variant="gold" pulsing>DESCEND</DeeperButton>
<DeeperButton href="/abyss" glitchOnHover>ENTER THE VOID</DeeperButton>`,
  },
  'dual-choice': {
    name: 'DualChoice',
    category: 'buttons',
    description: 'Binary yes/no choice component.',
    props: [
      { name: 'yesLabel', type: 'string', default: '"OUI"', description: 'Yes button label' },
      { name: 'noLabel', type: 'string', default: '"NON"', description: 'No button label' },
      { name: 'onYes', type: '() => void', default: '-', description: 'Yes click callback' },
      { name: 'onNo', type: '() => void', default: '-', description: 'No click callback' },
      { name: 'variant', type: '"default" | "dramatic" | "minimal" | "stacked"', default: '"default"', description: 'Visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'showDivider', type: 'boolean', default: 'true', description: 'Show divider between buttons' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable both buttons' },
      { name: 'selectedValue', type: '"yes" | "no" | null', default: 'null', description: 'Currently selected value' },
    ],
    usage: `import { DualChoice } from '@/components/chaos/buttons/dual-choice';

<DualChoice onYes={() => console.log('yes')} onNo={() => console.log('no')} />
<DualChoice yesLabel="ACCEPT" noLabel="REJECT" variant="dramatic" />
<DualChoice variant="stacked" size="lg" />`,
  },
  'cta-brutal': {
    name: 'CtaBrutal',
    category: 'buttons',
    description: 'Brutalist call-to-action button with multiple variants.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'variant', type: '"default" | "outline" | "gold" | "inverse"', default: '"default"', description: 'Visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Button size' },
      { name: 'icon', type: 'ReactNode', default: '-', description: 'Icon element' },
      { name: 'iconPosition', type: '"left" | "right"', default: '"right"', description: 'Icon position' },
      { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Full width button' },
      { name: 'glitch', type: 'boolean', default: 'false', description: 'Enable glitch effect' },
      { name: 'shake', type: 'boolean', default: 'false', description: 'Enable shake animation' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Loading state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disabled state' },
      { name: 'href', type: 'string', default: '-', description: 'Link URL (renders as anchor)' },
    ],
    usage: `import { CtaBrutal } from '@/components/chaos/buttons/cta-brutal';

<CtaBrutal>TAKE ACTION</CtaBrutal>
<CtaBrutal variant="gold" glitch size="lg">SUBSCRIBE</CtaBrutal>
<CtaBrutal href="/signup" fullWidth shake>JOIN NOW</CtaBrutal>`,
  },
  'tension-bar': {
    name: 'TensionBar',
    category: 'buttons',
    description: 'Progress/tension meter with dramatic styling.',
    props: [
      { name: 'value', type: 'number', default: '-', description: 'Current value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'labelLeft', type: 'string', default: '-', description: 'Left label' },
      { name: 'labelRight', type: 'string', default: '-', description: 'Right label' },
      { name: 'showPercentage', type: 'boolean', default: 'false', description: 'Show percentage' },
      { name: 'showMarkers', type: 'boolean', default: 'false', description: 'Show markers' },
      { name: 'markerCount', type: 'number', default: '10', description: 'Number of markers' },
      { name: 'variant', type: '"default" | "gold" | "danger" | "segmented" | "dramatic"', default: '"default"', description: 'Visual variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Bar size' },
      { name: 'innerText', type: 'string', default: '-', description: 'Text inside bar' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Enable animation' },
      { name: 'dangerThreshold', type: 'number', default: '80', description: 'Danger threshold percentage' },
    ],
    usage: `import { TensionBar } from '@/components/chaos/buttons/tension-bar';

<TensionBar value={75} />
<TensionBar value={90} variant="danger" dangerThreshold={80} />
<TensionBar value={50} variant="segmented" showMarkers />`,
  },

  // NEW LAYOUT COMPONENTS
  'horizontal-scroll': {
    name: 'HorizontalScroll',
    category: 'layout',
    description: 'Horizontal scrolling panel container.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Panel contents' },
      { name: 'variant', type: '"cyan" | "green" | "amber" | "blood"', default: '"cyan"', description: 'Color variant' },
      { name: 'panelSize', type: '"full" | "large" | "medium" | "small"', default: '"large"', description: 'Panel size' },
      { name: 'fadeEdges', type: 'boolean', default: 'false', description: 'Show fade on edges' },
      { name: 'showIndicators', type: 'boolean', default: 'false', description: 'Show navigation indicators' },
      { name: 'gap', type: 'number', default: '2', description: 'Gap between panels in rem' },
    ],
    usage: `import { HorizontalScroll } from '@/components/chaos/layout/horizontal-scroll';

<HorizontalScroll showIndicators>
  <div>Panel 1</div>
  <div>Panel 2</div>
  <div>Panel 3</div>
</HorizontalScroll>`,
  },
  'void-frame': {
    name: 'VoidFrame',
    category: 'layout',
    description: 'Decorative frame with corner ornaments.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Frame content' },
      { name: 'variant', type: '"gold" | "bone" | "blood" | "iron" | "cyan"', default: '"gold"', description: 'Color variant' },
      { name: 'cornerStyle', type: '"simple" | "extended" | "ornate"', default: '"simple"', description: 'Corner style' },
      { name: 'glow', type: 'boolean', default: 'false', description: 'Add glow effect' },
      { name: 'padding', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Padding size' },
    ],
    usage: `import { VoidFrame } from '@/components/chaos/layout/void-frame';

<VoidFrame>
  <h2>Framed Content</h2>
  <p>Content inside the frame</p>
</VoidFrame>
<VoidFrame variant="blood" cornerStyle="ornate" glow>Special Frame</VoidFrame>`,
  },
  'tower-pricing': {
    name: 'TowerPricing',
    category: 'layout',
    description: 'Vertical pricing tier display.',
    props: [
      { name: 'tiers', type: 'PricingTier[]', default: '-', description: 'Pricing tiers {name, price, currency?, period?, features, featured?, featuredLabel?, buttonText?, onSelect?}' },
      { name: 'variant', type: '"gold" | "blood" | "cyan" | "bone"', default: '"gold"', description: 'Color variant' },
      { name: 'showConnectors', type: 'boolean', default: 'false', description: 'Show connectors between tiers' },
    ],
    usage: `import { TowerPricing } from '@/components/chaos/layout/tower-pricing';

const tiers = [
  { name: 'Basic', price: 9, features: ['Feature 1', 'Feature 2'] },
  { name: 'Pro', price: 19, features: ['All Basic', 'Feature 3'], featured: true },
  { name: 'Ultra', price: 49, features: ['All Pro', 'Feature 4'] },
];

<TowerPricing tiers={tiers} />`,
  },
  'spec-grid': {
    name: 'SpecGrid',
    category: 'layout',
    description: 'Terminal-style specification grid.',
    props: [
      { name: 'specs', type: 'SpecItem[]', default: '-', description: 'Spec items {label, value, unit?, description?, icon?, highlighted?}' },
      { name: 'variant', type: '"cyan" | "green" | "amber" | "blood"', default: '"cyan"', description: 'Color variant' },
      { name: 'columns', type: 'number', default: '-', description: 'Grid columns' },
      { name: 'showHeader', type: 'boolean', default: 'false', description: 'Show terminal header' },
      { name: 'headerTitle', type: 'string', default: '"SYSTEM SPECS"', description: 'Header title' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Compact mode' },
      { name: 'striped', type: 'boolean', default: 'false', description: 'Striped rows' },
    ],
    usage: `import { SpecGrid } from '@/components/chaos/layout/spec-grid';

const specs = [
  { label: 'CPU', value: '8', unit: 'cores', highlighted: true },
  { label: 'RAM', value: '32', unit: 'GB' },
  { label: 'Storage', value: '1', unit: 'TB' },
];

<SpecGrid specs={specs} showHeader />`,
  },
  'tracklist': {
    name: 'Tracklist',
    category: 'layout',
    description: 'Music tracklist layout with hover effects.',
    props: [
      { name: 'tracks', type: 'Track[]', default: '-', description: 'Track list {number, name, artist?, duration, active?}' },
      { name: 'variant', type: '"silver" | "blood" | "gold" | "bone"', default: '"silver"', description: 'Color variant' },
      { name: 'showHeader', type: 'boolean', default: 'false', description: 'Show header row' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Compact mode' },
      { name: 'numbered', type: 'boolean', default: 'false', description: 'Large track numbers' },
      { name: 'onTrackClick', type: '(track: Track, index: number) => void', default: '-', description: 'Track click handler' },
    ],
    usage: `import { Tracklist } from '@/components/chaos/layout/tracklist';

const tracks = [
  { number: 1, name: 'Intro', duration: '0:42' },
  { number: 2, name: 'Main Theme', artist: 'Composer', duration: '3:14', active: true },
  { number: 3, name: 'Finale', duration: '5:00' },
];

<Tracklist tracks={tracks} showHeader />`,
  },

  // NEW DECORATIVE COMPONENTS
  'rune-symbols': {
    name: 'RuneSymbols',
    category: 'decorative',
    description: 'Decorative Elder Futhark rune display.',
    props: [
      { name: 'runes', type: '(keyof typeof RUNES | string)[]', default: '-', description: 'Specific runes to display' },
      { name: 'count', type: 'number', default: '6', description: 'Number of random runes' },
      { name: 'variant', type: '"gold" | "blood" | "bone" | "iron" | "cyan"', default: '"gold"', description: 'Color variant' },
      { name: 'animation', type: '"glow" | "floating" | "pulsing" | "flickering" | "none"', default: '"glow"', description: 'Animation style' },
      { name: 'direction', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Layout direction' },
      { name: 'size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Size variant' },
      { name: 'scattered', type: 'boolean', default: 'false', description: 'Scattered positioning' },
    ],
    usage: `import { RuneSymbols, RUNES } from '@/components/chaos/decorative/rune-symbols';

<RuneSymbols />
<RuneSymbols runes={['algiz', 'sowilo', 'tiwaz']} animation="pulsing" />
<RuneSymbols count={10} scattered variant="blood" />`,
  },
  'ornaments': {
    name: 'Ornaments',
    category: 'decorative',
    description: 'Decorative dividers, corners, and symbols.',
    props: [
      { name: 'type', type: '"divider" | "corner" | "frame" | "fleuron" | "symbols"', default: '"divider"', description: 'Ornament type' },
      { name: 'symbol', type: 'keyof typeof ORNAMENT_SYMBOLS | string', default: '"cross"', description: 'Symbol to use' },
      { name: 'symbols', type: '(keyof typeof ORNAMENT_SYMBOLS | string)[]', default: '-', description: 'Multiple symbols (for type="symbols")' },
      { name: 'variant', type: '"gold" | "bone" | "blood" | "iron"', default: '"gold"', description: 'Color variant' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size' },
      { name: 'animated', type: 'boolean', default: 'false', description: 'Animate' },
      { name: 'position', type: '"top-left" | "top-right" | "bottom-left" | "bottom-right" | "all"', default: '"all"', description: 'Corner position (for type="corner")' },
    ],
    usage: `import { Ornaments } from '@/components/chaos/decorative/ornaments';

<Ornaments type="divider" symbol="fleurDeLis" />
<Ornaments type="symbols" symbols={['star', 'diamond', 'star']} />
<Ornaments type="corner" position="all" variant="gold" />`,
  },
  'coffee-stain': {
    name: 'CoffeeStain',
    category: 'decorative',
    description: 'Paper stain and aging effects.',
    props: [
      { name: 'mode', type: '"overlay" | "inline"', default: '"overlay"', description: 'Positioning mode' },
      { name: 'intensity', type: '"light" | "medium" | "heavy"', default: '"medium"', description: 'Stain intensity' },
      { name: 'variant', type: '"coffee" | "tea" | "wine" | "ink"', default: '"coffee"', description: 'Stain color variant' },
      { name: 'count', type: 'number', default: '3', description: 'Number of random stains' },
      { name: 'stains', type: 'StainConfig[]', default: '-', description: 'Custom stain configurations' },
      { name: 'agedPaper', type: 'boolean', default: 'false', description: 'Show aged paper effect' },
      { name: 'paperTexture', type: 'boolean', default: 'false', description: 'Show paper texture' },
      { name: 'burnEdges', type: 'boolean', default: 'false', description: 'Show burn/dark edges' },
      { name: 'edgeDarkening', type: 'boolean', default: 'false', description: 'Show edge darkening' },
    ],
    usage: `import { CoffeeStain } from '@/components/chaos/decorative/coffee-stain';

<CoffeeStain />
<CoffeeStain variant="wine" agedPaper burnEdges />
<CoffeeStain mode="inline" count={5} intensity="heavy" />`,
  },
  'sheet-music': {
    name: 'SheetMusic',
    category: 'decorative',
    description: 'Floating music notes and symbols.',
    props: [
      { name: 'mode', type: '"overlay" | "inline"', default: '"overlay"', description: 'Positioning mode' },
      { name: 'animation', type: '"drift" | "falling" | "swirling" | "rising" | "none"', default: '"drift"', description: 'Animation style' },
      { name: 'variant', type: '"ash" | "silver" | "gold" | "blood" | "ivory"', default: '"ash"', description: 'Color variant' },
      { name: 'density', type: '"sparse" | "normal" | "dense"', default: '"normal"', description: 'Note density' },
      { name: 'count', type: 'number', default: '8', description: 'Number of random notes' },
      { name: 'notes', type: 'NoteConfig[]', default: '-', description: 'Custom note configurations' },
      { name: 'showStaff', type: 'boolean', default: 'false', description: 'Show decorative staff lines' },
      { name: 'symbols', type: '(keyof typeof MUSIC_SYMBOLS)[]', default: '-', description: 'Symbols to use for random generation' },
    ],
    usage: `import { SheetMusic } from '@/components/chaos/decorative/sheet-music';

<SheetMusic />
<SheetMusic animation="falling" variant="gold" showStaff />
<SheetMusic count={15} density="dense" symbols={['quarterNote', 'eighthNote']} />`,
  },
  'inscription': {
    name: 'Inscription',
    category: 'decorative',
    description: 'Carved stone text effect.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Text content' },
      { name: 'effect', type: '"carved" | "deepCarved" | "embossed" | "weathered" | "ancient" | "roman"', default: '"carved"', description: 'Carving style' },
      { name: 'variant', type: '"bone" | "marble" | "granite" | "obsidian" | "gold"', default: '"bone"', description: 'Stone color variant' },
      { name: 'size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Text size' },
      { name: 'textured', type: 'boolean', default: 'false', description: 'Add stone texture overlay' },
      { name: 'bordered', type: 'boolean', default: 'false', description: 'Add decorative border' },
      { name: 'cracked', type: 'boolean', default: 'false', description: 'Add crack effect' },
      { name: 'as', type: '"div" | "span" | "h1" | "h2" | "h3" | "h4" | "p"', default: '"div"', description: 'HTML tag to render' },
    ],
    usage: `import { Inscription } from '@/components/chaos/decorative/inscription';

<Inscription>MEMENTO MORI</Inscription>
<Inscription effect="deepCarved" variant="marble" bordered>CARVED IN STONE</Inscription>
<Inscription effect="ancient" cracked textured>ANCIENT TEXT</Inscription>`,
  },
};

const BASE_URL = 'https://chaos.oalacea.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ component: string }>;
}): Promise<Metadata> {
  const { component } = await params;
  const data = COMPONENTS[component];

  if (!data) {
    return {
      title: 'Component Not Found',
    };
  }

  const title = `${data.name} — ${component} | CHAOS`;
  const description = `${data.description} Pure CSS, no dependencies. Copy-paste installation for React and Next.js projects.`;

  return {
    title,
    description,
    keywords: [component, data.category, 'ui', 'components', 'css', 'react', 'nextjs', 'copy-paste'],
    openGraph: {
      title: `${data.name} — CHAOS Component`,
      description,
      url: `${BASE_URL}/docs/${component}`,
      type: 'website',
      images: [
        {
          url: '/branding/chaos.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/branding/chaos.png'],
    },
    alternates: {
      canonical: `${BASE_URL}/docs/${component}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(COMPONENTS).map((component) => ({ component }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  const { component } = await params;
  const data = COMPONENTS[component];

  if (!data) {
    notFound();
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/docs" className={styles.backLink}>← DOCS</Link>
        <div className={styles.headerMain}>
          <span className={styles.category}>{data.category}</span>
          <h1 className={styles.title}>{data.name}</h1>
          <p className={styles.description}>{data.description}</p>
          <code className={styles.install}>npx chaos add {component}</code>
        </div>
      </header>

      {/* Preview */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>PREVIEW</h2>
        <div className={styles.preview}>
          <ComponentPreview component={component} />
        </div>
      </section>

      {/* Usage */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>USAGE</h2>
        <div className={styles.codeBlock}>
          <pre><code>{data.usage}</code></pre>
        </div>
      </section>

      {/* Props */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>PROPS</h2>
        <div className={styles.propsTable}>
          <div className={styles.propsHeader}>
            <span>Prop</span>
            <span>Type</span>
            <span>Default</span>
          </div>
          {data.props.map((prop) => (
            <div key={prop.name} className={styles.propsRow}>
              <div className={styles.propMain}>
                <span className={styles.propName}>{prop.name}</span>
                <span className={styles.propDesc}>{prop.description}</span>
              </div>
              <span className={styles.propType}>{prop.type}</span>
              <span className={styles.propDefault}>{prop.default}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CSS Variables */}
      {data.cssVars && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>CSS VARIABLES</h2>
          <div className={styles.varsGrid}>
            {data.cssVars.map((v) => (
              <div key={v.name} className={styles.varItem}>
                <code>{v.name}</code>
                <span className={styles.varDefault}>{v.default}</span>
                <span className={styles.varDesc}>{v.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <Link href="/docs">← ALL COMPONENTS</Link>
      </footer>
    </div>
  );
}

function ComponentPreview({ component }: { component: string }) {
  switch (component) {
    case 'glitch-text':
      return <span className={`${styles.previewText} glitch`} data-text="GLITCH">GLITCH</span>;
    case 'flicker-text':
      return <span className={`${styles.previewText} flicker`}>FLICKER</span>;
    case 'distortion-text':
      return <span className={`${styles.previewText} ${styles.waveAnim}`}>DISTORT</span>;
    case 'falling-text':
      return <span className={`${styles.previewText} ${styles.fallAnim}`}>FALLING</span>;
    case 'noise-overlay':
      return <div className={styles.noisePreview}><span>NOISE</span></div>;
    case 'scanlines':
      return <div className={styles.scanlinesPreview}><span>SCANLINES</span></div>;
    case 'vignette':
      return <div className={styles.vignettePreview}><span>VIGNETTE</span></div>;
    case 'static-flicker':
      return <div className={styles.staticPreview}><span>STATIC</span></div>;
    case 'glitch-button':
      return <button className={styles.btnPreview}>HOVER ME</button>;
    case 'chaos-button':
      return <button className={styles.chaosBtnPreview}>CHAOS</button>;
    case 'noise-canvas':
      return <div className={styles.canvasPreview} />;
    case 'starfield':
      return <div className={styles.starfieldBox}><div/><div/><div/><div/></div>;
    case 'glow-orbs':
      return <div className={styles.orbsPreview}><div/><div/></div>;
    case 'particle-field':
      return <div className={styles.particlesPreview}>{Array.from({length:8}).map((_,i)=><div key={i}/>)}</div>;
    case 'warning-tape':
      return <div className={styles.tapePreview}><span>{'WARNING • ERROR • SYSTEM FAILURE • '.repeat(5)}</span></div>;
    case 'cursor-follower':
      return <div className={styles.cursorPreview}><div/><div/></div>;
    case 'screen-distortion':
      return <div className={styles.distortPreview}><span>DISTORTION</span></div>;
    case 'glowing-border':
      return <div className={styles.glowBorderPreview}><span>GLOW</span></div>;
    case 'glitch-image':
      return <div className={styles.glitchImgPreview}>IMG</div>;
    case 'radar-scan':
      return <div className={styles.radarBox}><div className={styles.radarSweep}/></div>;
    // NEON
    case 'neon-button':
      return <button className={styles.neonBtnPreview}>GLOW</button>;
    case 'neon-badge':
      return <span className={styles.neonBadgePreview}>LIVE</span>;
    case 'neon-progress':
      return <div className={styles.neonProgressPreview}><div /></div>;
    case 'neon-toggle':
      return <div className={styles.neonTogglePreview}><div /></div>;
    case 'neon-alert':
      return <div className={styles.neonAlertPreview}>ALERT</div>;
    case 'neon-tabs':
      return <div className={styles.neonTabsPreview}><span className={styles.active}>TAB</span><span>TAB</span></div>;
    case 'neon-divider':
      return <div className={styles.neonDividerPreview} />;
    // CYBER
    case 'cyber-input':
      return <div className={styles.cyberInputPreview}><span>INPUT</span></div>;
    case 'cyber-loader':
      return <div className={styles.cyberLoaderPreview} />;
    case 'cyber-modal':
      return <div className={styles.cyberModalPreview}><span>MODAL</span></div>;
    case 'cyber-avatar':
      return <div className={styles.cyberAvatarPreview} />;
    case 'cyber-slider':
      return <div className={styles.cyberSliderPreview}><div /></div>;
    case 'cyber-tooltip':
      return <div className={styles.cyberTooltipPreview}>TIP</div>;
    // LAYOUT
    case 'hologram-card':
      return <div className={styles.holoCardPreview}><span>HOLO</span></div>;
    case 'data-grid':
      return <div className={styles.dataGridPreview}><div/><div/><div/></div>;
    // NAVIGATION
    case 'hexagon-menu':
      return <div className={styles.hexMenuPreview}><div/><div/><div/></div>;
    
    // NEW TEXT
    case 'typing-text':
      return <span className={styles.typingTextPreview}>TYPE<span className={styles.typingCursor} /></span>;
    case 'char-glitch':
      return <span className={styles.charGlitchPreview}>GL!TCH</span>;
    case 'reveal-text':
      return <span className={styles.revealTextPreview}>REVEAL</span>;
    case 'strike-reveal':
      return <span className={styles.strikeRevealPreview}><span className={styles.strikeOld}>OLD</span><span className={styles.strikeNew}>NEW</span></span>;
    case 'giant-layers':
      return <span className={styles.giantLayersPreview}>BIG</span>;
    case 'blood-drip':
      return <span className={styles.bloodDripPreview}>DRIP</span>;
    case 'rotate-text':
      return <div className={styles.rotateTextPreview}><span className={styles.rotateActive}>WORD</span><span>NEXT</span></div>;
    case 'ascii-art':
      return <pre className={styles.asciiArtPreview}>{`╔══════╗\n║ ASCII║\n╚══════╝`}</pre>;
    case 'countdown-display':
      return <div className={styles.countdownPreview}><span>00</span>:<span>42</span>:<span>13</span></div>;
    case 'terminal-output':
      return <div className={styles.terminalPreview}><div className={styles.terminalHeader}><span/><span/><span/></div><div className={styles.terminalBody}><span className={styles.termPrompt}>❯</span> ls</div></div>;
    
    // NEW NAVIGATION
    case 'scattered-nav':
      return <div className={styles.scatteredNavPreview}><span>NAV</span><span className={styles.scattered}>ITEM</span></div>;
    case 'vertical-nav':
      return <div className={styles.verticalNavPreview}><span>ᛟ</span><span className={styles.navActive}>☰</span><span>ᛞ</span></div>;
    case 'timeline-nav':
      return <div className={styles.timelineNavPreview}><div/><div className={styles.timelineDotActive}/><div/></div>;
    case 'brutal-nav':
      return <div className={styles.brutalNavPreview}><span className={styles.navBrand}>CHAOS</span><span>LINK</span></div>;
    case 'progress-dots':
      return <div className={styles.progressDotsPreview}><span/><span className={styles.dotActive}/><span/></div>;
    case 'scroll-indicator':
      return <div className={styles.scrollIndicatorPreview}><div className={styles.scrollTrack}><div className={styles.scrollThumb}/></div><span>↓</span></div>;
    
    // NEW BUTTONS
    case 'dead-button':
      return <div className={styles.deadButtonPreview}>DEAD</div>;
    case 'deeper-button':
      return <button className={styles.deeperButtonPreview}>DEEPER ↓</button>;
    case 'dual-choice':
      return <div className={styles.dualChoicePreview}><span className={styles.choiceYes}>OUI</span><span className={styles.choiceNo}>NON</span></div>;
    case 'cta-brutal':
      return <button className={styles.ctaBrutalPreview}>ACTION</button>;
    case 'tension-bar':
      return <div className={styles.tensionBarPreview}><div className={styles.tensionFill}/></div>;
    
    // NEW LAYOUT
    case 'horizontal-scroll':
      return <div className={styles.horizontalScrollPreview}><div/><div/><div/></div>;
    case 'void-frame':
      return <div className={styles.voidFramePreview}><span className={styles.corner}/><span className={styles.corner}/><span className={styles.corner}/><span className={styles.corner}/>✦</div>;
    case 'tower-pricing':
      return <div className={styles.towerPricingPreview}><div>$9</div><div className={styles.featured}>$19</div><div>$49</div></div>;
    case 'spec-grid':
      return <div className={styles.specGridPreview}><div><span>CPU</span><span>8</span></div><div><span>RAM</span><span>32</span></div></div>;
    case 'tracklist':
      return <div className={styles.tracklistPreview}><div><span>01</span><span>Track Name</span><span>3:42</span></div></div>;
    
    // DECORATIVE
    case 'rune-symbols':
      return <span className={styles.runeSymbolsPreview}>ᛟ ᚨ ᛊ</span>;
    case 'ornaments':
      return <div className={styles.ornamentsPreview}><span className={styles.ornLine}/><span className={styles.ornSymbol}>✝</span><span className={styles.ornLine}/></div>;
    case 'coffee-stain':
      return <div className={styles.coffeeStainPreview}><div className={styles.stainRing}/><div className={styles.stainSplash}/></div>;
    case 'sheet-music':
      return <div className={styles.sheetMusicPreview}><span>♪</span><span>♫</span><span>𝄞</span></div>;
    case 'inscription':
      return <span className={styles.inscriptionPreview}>CARVED</span>;

    // INPUTS
    case 'chat-interface':
      return <div className={styles.chatInterfaceBox}><div className={styles.chatBubble}>Hi</div></div>;
    case 'secret-reveal':
      return <div className={styles.secretRevealBox}><span>SECRET</span></div>;

    // DISPLAY
    case 'countdown-timer':
      return <div className={styles.countdownTimerBox}><span>00</span>:<span>42</span></div>;
    case 'terminal-message':
      return <div className={styles.terminalMessageBox}><span className={styles.termPrompt2}>❯</span> Message</div>;

    // NEW TEXT EFFECTS
    case 'breathing-text':
      return <span className={styles.breathingText}>BREATH</span>;
    case 'handwritten-text':
      return <span className={styles.handwrittenText}>Written</span>;
    case 'scramble-text':
      return <span className={styles.scrambleText}>SCRAMBLE</span>;
    case 'stroke-text':
      return <span className={styles.strokeText}>STROKE</span>;
    case 'word-by-word-reveal':
      return <span className={styles.wordByWord}>REVEAL</span>;
    case 'shadow-glitch':
      return <span className={styles.shadowGlitch}>GLITCH</span>;
    case 'split-text':
      return <span className={styles.splitText}><span>SPLIT</span></span>;

    // NEW NAVIGATION
    case 'corner-nav':
      return <div className={styles.cornerNavBox}><span>☰</span></div>;
    case 'minimal-nav':
      return <div className={styles.minimalNavBox}><span>Home</span><span>About</span></div>;

    // NEW BACKGROUNDS
    case 'gradient-mesh':
      return <div className={styles.meshBox} />;
    case 'noise-pattern':
      return <div className={styles.noisePatternBox}><span>NOISE</span></div>;

    // NEW OVERLAYS
    case 'scanlines-overlay':
      return <div className={styles.scanlinesOverlayBox}><span>SCAN</span></div>;

    // NEW EFFECTS
    case 'chromatic-aberration':
      return <div className={styles.chromaticBox}><span>RGB</span></div>;
    case 'glass-crack':
      return <div className={styles.glassCrackBox}><span>CRACK</span></div>;

    // NEW LAYOUT
    case 'horizontal-panel-scroll':
      return <div className={styles.panelScrollBox}><div/><div/><div/></div>;
    case 'glass-container':
      return <div className={styles.glassContainerBox}><span>GLASS</span></div>;
    case 'phase-container':
      return <div className={styles.phaseContainerBox}><span>PHASE</span></div>;

    // NEW DECORATIVE
    case 'document-stamp':
      return <div className={styles.documentStampBox}><span>STAMP</span></div>;
    case 'marginalia':
      return <div className={styles.marginaliaBox}><span>Note</span></div>;
    case 'paper-edges':
      return <div className={styles.paperEdgesBox}><span>PAPER</span></div>;

    // NEW BUTTONS
    case 'tension-meter':
      return <div className={styles.tensionMeterBox}><div className={styles.tensionMeterFill}/></div>;

    default:
      return <span>Preview</span>;
  }
}
