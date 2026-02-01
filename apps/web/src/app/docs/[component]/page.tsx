import Link from 'next/link';
import { notFound } from 'next/navigation';
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
  'light-beams': {
    name: 'LightBeams',
    category: 'backgrounds',
    description: 'Vertical colored light beams that sway gently.',
    props: [
      { name: 'colors', type: 'string[]', default: '["#7c3aed", "#06b6d4", ...]', description: 'Beam colors' },
      { name: 'count', type: 'number', default: '5', description: 'Number of beams' },
      { name: 'beamWidth', type: 'number', default: '2', description: 'Beam width in px' },
      { name: 'opacity', type: 'number', default: '0.15', description: 'Beam opacity' },
      { name: 'durationRange', type: '[number, number]', default: '[15, 25]', description: 'Animation duration range' },
    ],
    usage: `import { LightBeams } from '@/components/chaos/backgrounds/light-beams';

<LightBeams />
<LightBeams colors={['#ff0040', '#00ff00']} count={3} />
<LightBeams opacity={0.3} beamWidth={4} />`,
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
};

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
    case 'light-beams':
      return <div className={styles.beamsPreview}><div/><div/><div/></div>;
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
    default:
      return <span>Preview</span>;
  }
}
