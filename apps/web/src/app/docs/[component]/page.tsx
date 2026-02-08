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
    usage: `import { GlitchText } from '@oalacea/chaosui/text/glitch-text';

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
    usage: `import { FlickerText } from '@oalacea/chaosui/text/flicker-text';

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
    usage: `import { DistortionText } from '@oalacea/chaosui/text/distortion-text';

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
    usage: `import { FallingText } from '@oalacea/chaosui/text/falling-text';

<FallingText>FALLING</FallingText>
<FallingText direction="up" stagger={50}>RISING</FallingText>
<FallingText loop={false}>ONCE</FallingText>`,
  },
  'gradient-text': {
    name: 'GradientText',
    category: 'text',
    description: 'Animated gradient text with customizable colors and direction.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The text to display' },
      { name: 'colors', type: 'string[]', default: '["#ff0000", "#ffff00", ...]', description: 'Array of colors for the gradient' },
      { name: 'speed', type: 'number', default: '3', description: 'Animation duration in seconds' },
      { name: 'direction', type: '"horizontal" | "vertical" | "diagonal"', default: '"horizontal"', description: 'Animation direction' },
      { name: 'angle', type: 'number', default: '-', description: 'Gradient angle in degrees (overrides direction)' },
      { name: 'size', type: 'number', default: '200', description: 'Gradient size percentage' },
      { name: 'pauseOnHover', type: 'boolean', default: 'false', description: 'Pause animation on hover' },
    ],
    usage: `import { GradientText } from '@oalacea/chaosui/text/gradient-text';

<GradientText>RAINBOW</GradientText>
<GradientText colors={['#ff0040', '#ff00ff']} speed={5}>NEON</GradientText>
<GradientText direction="vertical">FLOW</GradientText>`,
  },
  'wavy-text': {
    name: 'WavyText',
    category: 'text',
    description: 'Text with animated wave effect on individual letters.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The text to display' },
      { name: 'amplitude', type: 'number', default: '5', description: 'Wave height in pixels' },
      { name: 'frequency', type: 'number', default: '1', description: 'Number of wave cycles' },
      { name: 'speed', type: 'number', default: '2', description: 'Animation duration in seconds' },
      { name: 'direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Wave direction' },
    ],
    usage: `import { WavyText } from '@oalacea/chaosui/text/wavy-text';

<WavyText>WAVY</WavyText>
<WavyText amplitude={10} frequency={2}>INTENSE</WavyText>
<WavyText direction="horizontal">SIDE TO SIDE</WavyText>`,
  },
  'reflection-text': {
    name: 'ReflectionText',
    category: 'text',
    description: 'Text with a mirror reflection effect below it.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'The text to display' },
      { name: 'reflectionOpacity', type: 'number', default: '0.3', description: 'Reflection opacity (0-1)' },
      { name: 'blur', type: 'number', default: '2', description: 'Blur amount in pixels' },
      { name: 'skew', type: 'number', default: '0', description: 'Skew transformation in degrees' },
      { name: 'gap', type: 'number', default: '8', description: 'Gap between text and reflection in pixels' },
    ],
    usage: `import { ReflectionText } from '@oalacea/chaosui/text/reflection-text';

<ReflectionText>MIRROR</ReflectionText>
<ReflectionText reflectionOpacity={0.5} blur={4}>FADED</ReflectionText>
<ReflectionText skew={10}>TILTED</ReflectionText>`,
  },
  'three-d-text': {
    name: 'ThreeDText',
    category: 'text',
    description: 'Text with 3D extrusion effect using layered shadows.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'Text to display' },
      { name: 'depth', type: 'number', default: '5', description: 'Number of shadow layers for depth' },
      { name: 'direction', type: '"top-left" | "top" | "top-right" | "right" | "bottom-right" | "bottom" | "bottom-left" | "left"', default: '"bottom-right"', description: 'Direction of the 3D extrusion' },
      { name: 'color', type: 'string', default: '"#000000"', description: 'Shadow color' },
      { name: 'opacity', type: 'number', default: '0.8', description: 'Shadow opacity (0-1)' },
      { name: 'spacing', type: 'number', default: '2', description: 'Pixels between each layer' },
    ],
    usage: `import { ThreeDText } from '@oalacea/chaosui/text/three-d-text';

<ThreeDText>DEPTH</ThreeDText>
<ThreeDText depth={10} direction="left">LEFT</ThreeDText>
<ThreeDText color="#ff0040">RED SHADOW</ThreeDText>`,
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
    usage: `import { NoiseOverlay } from '@oalacea/chaosui/overlays/noise-overlay';

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
    usage: `import { Scanlines } from '@oalacea/chaosui/overlays/scanlines';

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
    usage: `import { Vignette } from '@oalacea/chaosui/overlays/vignette';

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
    usage: `import { StaticFlicker } from '@oalacea/chaosui/overlays/static-flicker';

<StaticFlicker />
<StaticFlicker speed="fast" opacity={0.05} />`,
  },
  'scanlines-overlay': {
    name: 'ScanlinesOverlay',
    category: 'overlays',
    description: 'CRT-style horizontal scanlines overlay with customizable thickness.',
    props: [
      { name: 'thickness', type: 'number', default: '2', description: 'Scanline thickness in pixels' },
      { name: 'opacity', type: 'number', default: '0.15', description: 'Scanline opacity (0-1)' },
      { name: 'color', type: 'string', default: '"#000000"', description: 'Scanline color' },
      { name: 'flicker', type: 'boolean', default: 'false', description: 'Add CRT flicker effect' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { ScanlinesOverlay } from '@oalacea/chaosui/overlays/scanlines-overlay';

<ScanlinesOverlay />
<ScanlinesOverlay flicker opacity={0.2} />
<ScanlinesOverlay thickness={4} color="#ff0040" />`,
  },
  'vignette-overlay': {
    name: 'VignetteOverlay',
    category: 'overlays',
    description: 'Radial gradient overlay for darkened edges with feathering control.',
    props: [
      { name: 'intensity', type: 'number', default: '0.5', description: 'Darkness intensity at edges (0-1)' },
      { name: 'size', type: 'number', default: '70', description: 'Clear area size percentage' },
      { name: 'color', type: 'string', default: '"#000000"', description: 'Vignette color' },
      { name: 'feather', type: 'number', default: '30', description: 'Soft edge feathering percentage' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { VignetteOverlay } from '@oalacea/chaosui/overlays/vignette-overlay';

<VignetteOverlay />
<VignetteOverlay intensity={0.8} size={50} />
<VignetteOverlay color="#1a0000" feather={50} />`,
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
    usage: `import { GlitchButton } from '@oalacea/chaosui/buttons/glitch-button';

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
    usage: `import { ChaosButton } from '@oalacea/chaosui/buttons/chaos-button';

<ChaosButton>CHAOS</ChaosButton>
<ChaosButton chaos="extreme">DESTROY</ChaosButton>
<ChaosButton variant="broken">BROKEN</ChaosButton>`,
  },
  'glass-button': {
    name: 'GlassButton',
    category: 'buttons',
    description: 'Frosted glass morphism button with backdrop blur and customizable transparency.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'blur', type: 'string', default: '"10px"', description: 'Backdrop blur amount' },
      { name: 'bgOpacity', type: 'number', default: '0.1', description: 'Background opacity 0-1' },
      { name: 'borderOpacity', type: 'number', default: '0.2', description: 'Border opacity 0-1' },
      { name: 'hoverOpacity', type: 'number', default: '0.2', description: 'Hover background opacity' },
      { name: 'glowAmount', type: 'number', default: '0', description: 'Glow intensity 0-1' },
      { name: 'glassColor', type: 'string', default: '-', description: 'Custom glass color (rgba or hex with alpha)' },
      { name: 'borderColor', type: 'string', default: '-', description: 'Custom border color' },
    ],
    cssVars: [
      { name: '--glass-blur', default: '10px', description: 'Backdrop filter blur amount' },
      { name: '--glass-bg-opacity', default: '0.1', description: 'Background opacity' },
      { name: '--glass-border-opacity', default: '0.2', description: 'Border opacity' },
      { name: '--glass-hover-opacity', default: '0.2', description: 'Hover state opacity' },
      { name: '--glass-glow', default: '0', description: 'Glow intensity' },
      { name: '--glass-color', default: 'rgba(255,255,255,0.1)', description: 'Glass tint color' },
      { name: '--glass-border', default: 'rgba(255,255,255,0.2)', description: 'Border color' },
    ],
    usage: `import { GlassButton } from '@oalacea/chaosui/buttons/glass-button';

<GlassButton>Default Glass</GlassButton>
<GlassButton blur="20px" bgOpacity={0.2}>Heavy Blur</GlassButton>
<GlassButton glowAmount={0.5}>Glowing</GlassButton>
<GlassButton glassColor="rgba(124, 58, 237, 0.2)">Purple Tint</GlassButton>`,
  },
  'neon-glow': {
    name: 'NeonGlow',
    category: 'buttons',
    description: 'Vibrant neon-style button with customizable glow color, pulsing animation, and optional realistic flicker effect.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'color', type: 'string', default: '"#00ffff"', description: 'Neon glow color' },
      { name: 'glowSize', type: 'number', default: '20', description: 'Glow blur radius in pixels' },
      { name: 'pulseSpeed', type: 'number', default: '2', description: 'Pulse animation duration in seconds' },
      { name: 'flicker', type: 'boolean', default: 'false', description: 'Add realistic neon flicker effect' },
    ],
    cssVars: [
      { name: '--neon-color', default: '#00ffff', description: 'Primary neon color' },
      { name: '--glow-size', default: '20px', description: 'Glow blur radius' },
      { name: '--pulse-speed', default: '2s', description: 'Pulse animation duration' },
    ],
    usage: `import { NeonGlow } from '@oalacea/chaosui/buttons/neon-glow';

<NeonGlow>CYAN NEON</NeonGlow>
<NeonGlow color="#ff00ff">MAGENTA GLOW</NeonGlow>
<NeonGlow color="#00ff00" flicker>FLICKERING</NeonGlow>
<NeonGlow glowSize={40} pulseSpeed={1}>FAST PULSE</NeonGlow>`,
  },
  'floating-button': {
    name: 'FloatingButton',
    category: 'buttons',
    description: 'Animated button with gentle floating motion and customizable shadow effects.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Button content' },
      { name: 'floatSpeed', type: 'number', default: '3', description: 'Animation duration in seconds' },
      { name: 'floatAmplitude', type: 'number', default: '10', description: 'Float distance in pixels' },
      { name: 'shadowSize', type: 'number', default: '20', description: 'Shadow blur size' },
      { name: 'shadowOpacity', type: 'number', default: '0.3', description: 'Shadow opacity 0-1' },
    ],
    cssVars: [
      { name: '--float-speed', default: '3s', description: 'Float animation duration' },
      { name: '--float-amplitude', default: '10px', description: 'Float movement distance' },
      { name: '--shadow-size', default: '20px', description: 'Shadow blur radius' },
      { name: '--shadow-opacity', default: '0.3', description: 'Shadow opacity' },
    ],
    usage: `import { FloatingButton } from '@oalacea/chaosui/buttons/floating-button';

<FloatingButton>Float Away</FloatingButton>
<FloatingButton floatSpeed={2} floatAmplitude={15}>Wild Float</FloatingButton>
<FloatingButton shadowSize={40} shadowOpacity={0.5}>Deep Shadow</FloatingButton>`,
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
    usage: `import { NoiseCanvas } from '@oalacea/chaosui/backgrounds/noise-canvas';

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
    usage: `import { GlowOrbs } from '@oalacea/chaosui/backgrounds/glow-orbs';

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
    usage: `import { ParticleField } from '@oalacea/chaosui/backgrounds/particle-field';

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
    usage: `import { Starfield } from '@oalacea/chaosui/backgrounds/starfield';

<Starfield />
<Starfield starCount={500} speed={1} />
<Starfield direction="right" twinkle={false} color="#ff0040" />`,
  },
  'particles': {
    name: 'Particles',
    category: 'backgrounds',
    description: 'Interactive particle system with connection lines and mouse interaction.',
    props: [
      { name: 'particleCount', type: 'number', default: '100', description: 'Number of particles to render' },
      { name: 'speed', type: 'number', default: '1', description: 'Base animation speed multiplier' },
      { name: 'size', type: 'number', default: '2', description: 'Particle size in pixels' },
      { name: 'color', type: 'string', default: '"#ffffff"', description: 'Particle color (hex or rgb)' },
      { name: 'connectionDistance', type: 'number', default: '100', description: 'Max distance to draw connection lines' },
      { name: 'lineOpacity', type: 'number', default: '0.15', description: 'Opacity of connection lines (0-1)' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Fixed or absolute positioning' },
      { name: 'mouseInteraction', type: 'boolean', default: 'true', description: 'Enable mouse interaction (particles flee)' },
      { name: 'mouseRadius', type: 'number', default: '150', description: 'Mouse interaction radius' },
    ],
    usage: `import { Particles } from '@oalacea/chaosui/backgrounds/particles';

<Particles />
<Particles particleCount={150} color="#ff0040" />
<Particles mouseInteraction={false} connectionDistance={150} />`,
  },
  'aurora': {
    name: 'Aurora',
    category: 'backgrounds',
    description: 'Northern lights-inspired color wave effect with multiple layers.',
    props: [
      { name: 'colors', type: 'string[]', default: '["#00ff00", "#00ffff", ...]', description: 'Array of aurora colors (5 colors)' },
      { name: 'speed', type: 'number', default: '20', description: 'Animation duration in seconds' },
      { name: 'intensity', type: 'number', default: '0.5', description: 'Opacity/strength of the aurora effect' },
      { name: 'blur', type: 'number', default: '100', description: 'Blur amount in pixels' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position the aurora effect' },
      { name: 'variant', type: '"default" | "subtle" | "dynamic"', default: '"default"', description: 'Animation style variant' },
      { name: 'region', type: '"full" | "top" | "bottom" | "left" | "right"', default: '"full"', description: 'Constrain aurora to specific area' },
      { name: 'blendMode', type: 'string', default: '"screen"', description: 'Custom CSS blend mode' },
    ],
    usage: `import { Aurora } from '@oalacea/chaosui/backgrounds/aurora';

<Aurora />
<Aurora colors={['#ff00ff', '#00ffff', '#ff0080']} intensity={0.7} />
<Aurora region="top" variant="subtle" />`,
  },
  'plasma-wave': {
    name: 'PlasmaWave',
    category: 'backgrounds',
    description: 'Retro plasma wave effect with canvas-based animation and customizable colors.',
    props: [
      { name: 'colors', type: 'string[]', default: '["#ff006e", "#8338ec", ...]', description: 'Array of plasma colors (min 2)' },
      { name: 'speed', type: 'number', default: '1', description: 'Animation speed multiplier (0.1 - 3)' },
      { name: 'complexity', type: 'number', default: '3', description: 'Wave complexity - overlapping waves (2-6)' },
      { name: 'intensity', type: 'number', default: '0.5', description: 'Wave intensity/amplitude (0.1 - 1)' },
      { name: 'scale', type: 'number', default: '1', description: 'Canvas scale for performance (0.5 - 2)' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position the plasma effect' },
    ],
    usage: `import { PlasmaWave } from '@oalacea/chaosui/backgrounds/plasma-wave';

<PlasmaWave />
<PlasmaWave colors={['#ff0000', '#0000ff']} intensity={0.8} />
<PlasmaWave complexity={5} speed={1.5} />`,
  },
  'bubbles': {
    name: 'Bubbles',
    category: 'backgrounds',
    description: 'Floating bubbles with 3D gradient effect and wobble animation.',
    props: [
      { name: 'count', type: 'number', default: '20', description: 'Number of bubbles' },
      { name: 'minSize', type: 'number', default: '20', description: 'Minimum bubble size in pixels' },
      { name: 'maxSize', type: 'number', default: '80', description: 'Maximum bubble size in pixels' },
      { name: 'speed', type: 'number', default: '1', description: 'Animation speed multiplier' },
      { name: 'color', type: 'string', default: '"rgba(255, 255, 255, 0.1)"', description: 'Bubble color (rgba or hex)' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Fixed or absolute positioning' },
    ],
    usage: `import { Bubbles } from '@oalacea/chaosui/backgrounds/bubbles';

<Bubbles />
<Bubbles count={40} color="rgba(255, 0, 100, 0.15)" />
<Bubbles minSize={10} maxSize={50} speed={1.5} />`,
  },
  'lightning': {
    name: 'Lightning',
    category: 'backgrounds',
    description: 'WebGL-based lightning effect with fractal noise and customizable colors.',
    props: [
      { name: 'hue', type: 'number', default: '230', description: 'Base hue for lightning color (0-360)' },
      { name: 'xOffset', type: 'number', default: '0', description: 'Horizontal offset for lightning (-1 to 1)' },
      { name: 'speed', type: 'number', default: '1', description: 'Animation speed multiplier' },
      { name: 'intensity', type: 'number', default: '1', description: 'Lightning brightness intensity' },
      { name: 'size', type: 'number', default: '1', description: 'Lightning bolt thickness' },
      { name: 'className', type: 'string', default: '""', description: 'Custom className' },
    ],
    usage: `import { Lightning } from '@oalacea/chaosui/backgrounds/lightning';

<Lightning />
<Lightning hue={120} intensity={1.5} />
<Lightning xOffset={-0.3} speed={2} />`,
  },
  'faulty-terminal': {
    name: 'FaultyTerminal',
    category: 'backgrounds',
    description: 'CRT terminal background with matrix-style digits, scanlines, and glitch effects.',
    props: [
      { name: 'scale', type: 'number', default: '1', description: 'Scale of the matrix grid' },
      { name: 'gridMul', type: '[number, number]', default: '[2, 1]', description: 'Grid multipliers [x, y]' },
      { name: 'digitSize', type: 'number', default: '1.5', description: 'Size of the LED digits' },
      { name: 'timeScale', type: 'number', default: '0.3', description: 'Time scale for animation' },
      { name: 'pause', type: 'boolean', default: 'false', description: 'Pause animation' },
      { name: 'scanlineIntensity', type: 'number', default: '0.3', description: 'Scanline intensity (0-1)' },
      { name: 'glitchAmount', type: 'number', default: '1', description: 'Glitch amount (1 = normal, higher = more)' },
      { name: 'flickerAmount', type: 'number', default: '1', description: 'Flicker amount (1 = normal, higher = more)' },
      { name: 'noiseAmp', type: 'number', default: '1', description: 'Noise amplitude' },
      { name: 'chromaticAberration', type: 'number', default: '0', description: 'Chromatic aberration strength' },
      { name: 'dither', type: 'number | boolean', default: '0', description: 'Dithering amount (0 = off, higher = more)' },
      { name: 'curvature', type: 'number', default: '0.2', description: 'Screen curvature (0 = flat)' },
      { name: 'tint', type: 'string', default: '"#ffffff"', description: 'Tint color (hex)' },
      { name: 'mouseReact', type: 'boolean', default: 'true', description: 'React to mouse interaction' },
      { name: 'mouseStrength', type: 'number', default: '0.2', description: 'Mouse interaction strength' },
      { name: 'dpr', type: 'number', default: 'Math.min(devicePixelRatio, 2)', description: 'Device pixel ratio' },
      { name: 'pageLoadAnimation', type: 'boolean', default: 'true', description: 'Enable page load animation' },
      { name: 'brightness', type: 'number', default: '1', description: 'Brightness multiplier' },
      { name: 'className', type: 'string', default: '""', description: 'Custom className' },
      { name: 'style', type: 'React.CSSProperties', default: '-', description: 'Custom styles' },
    ],
    usage: `import { FaultyTerminal } from '@oalacea/chaosui/backgrounds/faulty-terminal';

<FaultyTerminal />
<FaultyTerminal scanlineIntensity={0.5} glitchAmount={2} />
<FaultyTerminal tint="#00ff00" chromaticAberration={2} />`,
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
    usage: `import { WarningTape } from '@oalacea/chaosui/effects/warning-tape';

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
    usage: `import { CursorFollower } from '@oalacea/chaosui/effects/cursor-follower';

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
    usage: `import { ScreenDistortion } from '@oalacea/chaosui/effects/screen-distortion';

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
    usage: `import { GlowingBorder } from '@oalacea/chaosui/effects/glowing-border';

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
    usage: `import { GlitchImage } from '@oalacea/chaosui/effects/glitch-image';

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
    usage: `import { RadarScan } from '@oalacea/chaosui/effects/radar-scan';

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
    usage: `import { NeonButton } from '@oalacea/chaosui/neon/neon-button';

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
    usage: `import { NeonBadge } from '@oalacea/chaosui/neon/neon-badge';

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
    usage: `import { NeonProgress } from '@oalacea/chaosui/neon/neon-progress';

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
    usage: `import { NeonToggle } from '@oalacea/chaosui/neon/neon-toggle';

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
    usage: `import { NeonAlert } from '@oalacea/chaosui/neon/neon-alert';

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
    usage: `import { NeonTabs } from '@oalacea/chaosui/neon/neon-tabs';

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
    usage: `import { NeonDivider } from '@oalacea/chaosui/neon/neon-divider';

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
    usage: `import { CyberInput } from '@oalacea/chaosui/cyber/cyber-input';

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
    usage: `import { CyberLoader } from '@oalacea/chaosui/cyber/cyber-loader';

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
    usage: `import { CyberModal } from '@oalacea/chaosui/cyber/cyber-modal';

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
    usage: `import { CyberAvatar } from '@oalacea/chaosui/cyber/cyber-avatar';

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
    usage: `import { CyberSlider } from '@oalacea/chaosui/cyber/cyber-slider';

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
    usage: `import { CyberTooltip } from '@oalacea/chaosui/cyber/cyber-tooltip';

<CyberTooltip content="Click to submit">
  <button>Submit</button>
</CyberTooltip>`,
  },

  // LAYOUT
  'hologram-card': {
    name: 'HologramCard',
    category: 'layout',
    description: 'Holographic card with scanlines, RGB shift, 3D tilt, and mouse-tracking glow.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Card content' },
      { name: 'variant', type: '"cyan" | "pink" | "green" | "purple"', default: '"cyan"', description: 'Neon color' },
      { name: 'scanlines', type: 'boolean', default: 'true', description: 'Show CRT scanlines' },
      { name: 'flicker', type: 'boolean', default: 'false', description: 'Flicker effect' },
    ],
    usage: `import { HologramCard } from '@oalacea/chaosui/layout/hologram-card';

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
    usage: `import { DataGrid } from '@oalacea/chaosui/layout/data-grid';

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
    usage: `import { HexagonMenu } from '@oalacea/chaosui/navigation/hexagon-menu';

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
    usage: `import { TypingText } from '@oalacea/chaosui/text/typing-text';

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
    usage: `import { CharGlitch } from '@oalacea/chaosui/text/char-glitch';

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
    usage: `import { RevealText } from '@oalacea/chaosui/text/reveal-text';

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
    usage: `import { StrikeReveal } from '@oalacea/chaosui/text/strike-reveal';

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
    usage: `import { GiantLayers } from '@oalacea/chaosui/text/giant-layers';

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
    usage: `import { BloodDrip } from '@oalacea/chaosui/text/blood-drip';

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
    usage: `import { RotateText } from '@oalacea/chaosui/text/rotate-text';

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
    usage: `import { AsciiArt } from '@oalacea/chaosui/text/ascii-art';

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
    usage: `import { CountdownDisplay } from '@oalacea/chaosui/text/countdown-display';

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
    usage: `import { TerminalOutput } from '@oalacea/chaosui/text/terminal-output';

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
    usage: `import { ChatInterface } from '@oalacea/chaosui/inputs/chat-interface';

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
    usage: `import { ScatteredNav, ScatteredNavItem } from '@oalacea/chaosui/navigation/scattered-nav';

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
    usage: `import { VerticalNav } from '@oalacea/chaosui/navigation/vertical-nav';

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
    usage: `import { TimelineNav } from '@oalacea/chaosui/navigation/timeline-nav';

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
    usage: `import { BrutalNav } from '@oalacea/chaosui/navigation/brutal-nav';

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
    usage: `import { ProgressDots } from '@oalacea/chaosui/navigation/progress-dots';

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
    usage: `import { ScrollIndicator } from '@oalacea/chaosui/navigation/scroll-indicator';

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
    usage: `import { DeadButton } from '@oalacea/chaosui/buttons/dead-button';

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
    usage: `import { DeeperButton } from '@oalacea/chaosui/buttons/deeper-button';

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
    usage: `import { DualChoice } from '@oalacea/chaosui/buttons/dual-choice';

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
    usage: `import { CtaBrutal } from '@oalacea/chaosui/buttons/cta-brutal';

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
    usage: `import { TensionBar } from '@oalacea/chaosui/buttons/tension-bar';

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
    usage: `import { HorizontalScroll } from '@oalacea/chaosui/layout/horizontal-scroll';

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
    usage: `import { VoidFrame } from '@oalacea/chaosui/layout/void-frame';

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
    usage: `import { TowerPricing } from '@oalacea/chaosui/layout/tower-pricing';

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
    usage: `import { SpecGrid } from '@oalacea/chaosui/layout/spec-grid';

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
    usage: `import { Tracklist } from '@oalacea/chaosui/layout/tracklist';

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
    usage: `import { RuneSymbols, RUNES } from '@oalacea/chaosui/decorative/rune-symbols';

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
    usage: `import { Ornaments } from '@oalacea/chaosui/decorative/ornaments';

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
    usage: `import { CoffeeStain } from '@oalacea/chaosui/decorative/coffee-stain';

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
    usage: `import { SheetMusic } from '@oalacea/chaosui/decorative/sheet-music';

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
    usage: `import { Inscription } from '@oalacea/chaosui/decorative/inscription';

<Inscription>MEMENTO MORI</Inscription>
<Inscription effect="deepCarved" variant="marble" bordered>CARVED IN STONE</Inscription>
<Inscription effect="ancient" cracked textured>ANCIENT TEXT</Inscription>`,
  },
  // NEW COMPONENTS
  'living-text': {
    name: 'LivingText',
    category: 'text',
    description: 'Text that appears, lives for a duration, dies character by character, and becomes a ghost revealed on hover.',
    props: [
      { name: 'text', type: 'string', default: '-', description: 'The text to display' },
      { name: 'lifetime', type: 'number', default: '0', description: 'Duration in ms, 0 = typing time' },
      { name: 'ghostOpacity', type: 'number', default: '0.03', description: 'Base opacity for ghosts (0-1)' },
      { name: 'revealOpacity', type: 'number', default: '0.15', description: 'Hover opacity for ghosts (0-1)' },
      { name: 'revealDistance', type: 'number', default: '150', description: 'Pixel distance for reveal' },
      { name: 'showTimer', type: 'boolean', default: 'true', description: 'Show timer display' },
    ],
    usage: `import { LivingText } from '@oalacea/chaosui/text/living-text';

<LivingText text="This text will fade away" lifetime={5000} />`,
  },
  'brutal-manifest': {
    name: 'BrutalManifest',
    category: 'text',
    description: 'Brutalist text with each word in boxed colors, thick borders, and chaotic rotations.',
    props: [
      { name: 'phrases', type: 'PhraseSegment[][]', default: '-', description: 'Array of phrase arrays' },
      { name: 'colors', type: 'string[]', default: '["#ff0000", "#ffff00", "#000000", "#ffffff"]', description: 'Color palette' },
      { name: 'borderWidth', type: 'number', default: '6', description: 'Border width in pixels' },
      { name: 'fontSize', type: '"small" | "medium" | "large" | "massive"', default: '"large"', description: 'Text size' },
      { name: 'chaosLevel', type: 'number', default: '0.5', description: 'Rotation chaos level (0-1)' },
      { name: 'textShadow', type: 'boolean', default: 'true', description: 'Add text shadow' },
      { name: 'uppercase', type: 'boolean', default: 'true', description: 'Uppercase text' },
    ],
    usage: `import { BrutalManifest } from '@oalacea/chaosui/text/brutal-manifest';

<BrutalManifest phrases={[
  [{ text: 'NO' }, { text: 'COMPROMISE' }],
  [{ text: 'BREAK' }, { text: 'RULES' }]
]} chaosLevel={0.8} />`,
  },
  'strata-section': {
    name: 'StrataSection',
    category: 'layout',
    description: 'Geological layer section with jagged edges, depth indicator, and pattern overlays.',
    props: [
      { name: 'depth', type: 'number', default: '-', description: 'Depth in meters' },
      { name: 'color', type: 'string', default: '-', description: 'Background color' },
      { name: 'pattern', type: '"lines" | "dots" | "gradient" | "fossil" | "rust" | "none"', default: '"none"', description: 'Pattern overlay' },
      { name: 'textColor', type: 'string', default: '-', description: 'Text color' },
      { name: 'title', type: 'string', default: '-', description: 'Section title' },
      { name: 'description', type: 'string', default: '-', description: 'Section description' },
      { name: 'stats', type: 'Array<{label: string, value: string | number}>', default: '[]', description: 'Stats to display' },
      { name: 'position', type: '"left" | "center" | "right"', default: '"left"', description: 'Content position' },
    ],
    usage: `import { StrataSection } from '@oalacea/chaosui/layout/strata-section';

<StrataSection
  depth={450}
  color="#8b8680"
  pattern="lines"
  title="CRETACEOUS"
  description="Ancient seabed layer"
  stats={[
    { label: 'Age', value: '145M years' },
    { label: 'Depth', value: '450m' }
  ]}
/>`,
  },
  'broken-grid': {
    name: 'BrokenGrid',
    category: 'layout',
    description: 'CSS Grid with chaotic offset/rotation per item, hover effects, and text truncation.',
    props: [
      { name: 'items', type: 'GridItem[]', default: '-', description: 'Grid items' },
      { name: 'columns', type: 'number', default: '3', description: 'Number of columns' },
      { name: 'chaosLevel', type: 'number', default: '0.5', description: 'Chaos level (0-1)' },
      { name: 'truncateText', type: 'boolean', default: 'true', description: 'Truncate long text' },
      { name: 'borderStyle', type: '"solid" | "dashed" | "double"', default: '"solid"', description: 'Border style' },
    ],
    usage: `import { BrokenGrid } from '@oalacea/chaosui/layout/broken-grid';

<BrokenGrid
  items={[
    { title: 'Infrastructure', description: 'Systems broken' },
    { title: 'Interfaces', description: 'User chaos' },
    { title: 'Signals', description: 'Lost comms' }
  ]}
  columns={3}
  chaosLevel={0.6}
/>`,
  },
  'collapsed-nav': {
    name: 'CollapsedNav',
    category: 'navigation',
    description: 'Navigation with items dispersed around screen edges, inspired by collapse demo.',
    props: [
      { name: 'items', type: 'NavItem[]', default: '-', description: 'Navigation items' },
      { name: 'chaosLevel', type: '"low" | "medium" | "high"', default: '"medium"', description: 'Dispersion amount' },
    ],
    usage: `import { CollapsedNav } from '@oalacea/chaosui/navigation/collapsed-nav';

<CollapsedNav items={[
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Data', href: '#data' }
]} />`,
  },
  'dock': {
    name: 'Dock',
    category: 'navigation',
    description: 'macOS-style dock with magnification effect on hover and magnetic items.',
    props: [
      { name: 'items', type: 'DockItem[]', default: '-', description: 'Dock items {id, icon, label?, badge?, onClick?, href?, active?, disabled?}' },
      { name: 'maxScale', type: 'number', default: '1.5', description: 'Maximum scale for hovered item' },
      { name: 'spacing', type: 'number', default: '8', description: 'Spacing between items in px' },
      { name: 'iconSize', type: 'number', default: '48', description: 'Base icon size in px' },
      { name: 'position', type: '"bottom" | "top" | "left" | "right"', default: '"bottom"', description: 'Position of the dock' },
      { name: 'magnificationRange', type: 'number', default: '150', description: 'Magnification range in px' },
      { name: 'animationDuration', type: 'number', default: '200', description: 'Animation duration in ms' },
      { name: 'variant', type: '"glass" | "solid" | "neon"', default: '"glass"', description: 'Style variant' },
    ],
    usage: `import { Dock } from '@oalacea/chaosui/navigation/dock';

const items = [
  { id: 'home', icon: <HomeIcon />, label: 'Home', href: '/' },
  { id: 'search', icon: <SearchIcon />, label: 'Search', badge: 3 },
  { id: 'settings', icon: <SettingsIcon />, label: 'Settings', active: true }
];

<Dock items={items} />
<Dock items={items} position="left" variant="neon" />`,
  },
  'magnetic-dock': {
    name: 'MagneticDock',
    category: 'navigation',
    description: 'Dock with magnetic attraction and spring physics for smooth animations.',
    props: [
      { name: 'items', type: 'MagneticDockItem[]', default: '-', description: 'Dock items {id, label?, icon?, href?, onClick?, active?, disabled?}' },
      { name: 'position', type: '"bottom" | "top" | "left" | "right"', default: '"bottom"', description: 'Position of the dock' },
      { name: 'magneticStrength', type: 'number', default: '0.3', description: 'Magnetic strength (0-1)' },
      { name: 'stiffness', type: 'number', default: '0.1', description: 'Spring stiffness for animation' },
      { name: 'damping', type: 'number', default: '0.8', description: 'Damping for animation' },
      { name: 'size', type: '"small" | "medium" | "large"', default: '"medium"', description: 'Dock size variant' },
      { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Icon-only mode' },
      { name: 'variant', type: '"glass" | "solid" | "neon" | "brutal"', default: '"glass"', description: 'Style variant' },
    ],
    usage: `import { MagneticDock } from '@oalacea/chaosui/navigation/magnetic-dock';

const items = [
  { id: 'home', icon: <HomeIcon />, label: 'Home' },
  { id: 'search', icon: <SearchIcon />, label: 'Search' }
];

<MagneticDock items={items} />
<MagneticDock items={items} magneticStrength={0.5} variant="neon" />`,
  },
  'bubble-menu': {
    name: 'BubbleMenu',
    category: 'navigation',
    description: 'Floating bubble menu with pop animations and ripple effects.',
    props: [
      { name: 'items', type: 'BubbleMenuItem[]', default: '-', description: 'Menu items {id, icon, label?, onClick?, href?, active?, disabled?}' },
      { name: 'bubbleSize', type: 'number', default: '60', description: 'Size of each bubble in px' },
      { name: 'spacing', type: 'number', default: '16', description: 'Spacing between bubbles in px' },
      { name: 'floating', type: 'boolean', default: 'true', description: 'Enable floating animation' },
      { name: 'align', type: '"center" | "left" | "right"', default: '"center"', description: 'Alignment of bubbles' },
      { name: 'variant', type: '"glass" | "solid" | "neon" | "pastel"', default: '"glass"', description: 'Style variant' },
      { name: 'animationSpeed', type: 'number', default: '1', description: 'Animation speed multiplier' },
    ],
    usage: `import { BubbleMenu } from '@oalacea/chaosui/navigation/bubble-menu';

const items = [
  { id: 'home', icon: <HomeIcon />, label: 'Home' },
  { id: 'search', icon: <SearchIcon />, label: 'Search' },
  { id: 'settings', icon: <SettingsIcon />, label: 'Settings', active: true }
];

<BubbleMenu items={items} />
<BubbleMenu items={items} variant="neon" bubbleSize={80} />`,
  },
  'draggable-document': {
    name: 'DraggableDocument',
    category: 'inputs',
    description: 'Draggable paper/folder document with classification, stamp, and coffee stain.',
    props: [
      { name: 'title', type: 'string', default: '-', description: 'Document title' },
      { name: 'reference', type: 'string', default: '-', description: 'Reference number' },
      { name: 'classification', type: '"public" | "confidentiel" | "secret" | "top-secret"', default: '"confidentiel"', description: 'Classification level' },
      { name: 'stamp', type: 'string', default: '-', description: 'Stamp text' },
      { name: 'content', type: 'ReactNode', default: '-', description: 'Document content' },
      { name: 'backContent', type: 'ReactNode', default: '-', description: 'Back content (revealed on double-click)' },
      { name: 'initialPosition', type: '{x: number; y: number}', default: '{x: 100, y: 100}', description: 'Initial position' },
    ],
    usage: `import { DraggableDocument } from '@oalacea/chaosui/inputs/draggable-document';

<DraggableDocument
  title="PROJET ÆTHER"
  classification="secret"
  stamp="VALIDÉ"
  reference="ÆTH-2024-001"
>
  <p>Confidential document content here...</p>
</DraggableDocument>`,
  },
  'ghost-layer': {
    name: 'GhostLayer',
    category: 'effects',
    description: 'Layer of semi-transparent ghost texts revealed on cursor proximity.',
    props: [
      { name: 'ghosts', type: 'GhostItem[]', default: '-', description: 'Ghost items with id, text, position' },
      { name: 'baseOpacity', type: 'number', default: '0.03', description: 'Base opacity (0-1)' },
      { name: 'revealOpacity', type: 'number', default: '0.15', description: 'Hover opacity (0-1)' },
      { name: 'revealDistance', type: 'number', default: '150', description: 'Pixel radius for reveal' },
      { name: 'showScanLine', type: 'boolean', default: 'true', description: 'Show scan line following mouse' },
    ],
    usage: `import { GhostLayer } from '@oalacea/chaosui/effects/ghost-layer';

<GhostLayer
  ghosts={[
    { id: '1', text: 'I remember...', position: { x: 100, y: 100 } },
    { id: '2', text: 'The ocean sang', position: { x: 300, y: 200 } }
  ]}
  revealDistance={200}
/>`,
  },
  'cursor-trail': {
    name: 'CursorTrail',
    category: 'effects',
    description: 'Multi-element cursor trail with mix-blend-mode and hover expansion.',
    props: [
      { name: 'trailCount', type: 'number', default: '3', description: 'Number of trail elements' },
      { name: 'trailSize', type: 'number', default: '20', description: 'Trail size in pixels' },
      { name: 'trailColor', type: 'string', default: '"#fff"', description: 'Border color' },
      { name: 'blendMode', type: '"normal" | "difference" | "screen" | "multiply" | "exclusion"', default: '"difference"', description: 'CSS blend mode' },
      { name: 'hasCenterDot', type: 'boolean', default: 'true', description: 'Add center dot' },
    ],
    usage: `import { CursorTrail } from '@oalacea/chaosui/effects/cursor-trail';

<CursorTrail
  trailCount={5}
  trailColor="#00ffff"
  blendMode="screen"
  hasCenterDot={true}
/>`,
  },
  'depth-indicator': {
    name: 'DepthIndicator',
    category: 'display',
    description: 'Vertical progress bar showing depth/scroll position with real-time updates.',
    props: [
      { name: 'currentDepth', type: 'number', default: '-', description: 'Current depth value' },
      { name: 'minDepth', type: 'number', default: '0', description: 'Minimum depth' },
      { name: 'maxDepth', type: 'number', default: '100', description: 'Maximum depth' },
      { name: 'unit', type: 'string', default: '"m"', description: 'Unit symbol' },
      { name: 'label', type: 'string', default: '"DEPTH"', description: 'Label text' },
      { name: 'position', type: '"left" | "right"', default: '"left"', description: 'Side position' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Show numeric value' },
    ],
    usage: `import { DepthIndicator } from '@oalacea/chaosui/display/depth-indicator';

<DepthIndicator
  currentDepth={450}
  minDepth={0}
  maxDepth={1000}
  unit="m"
  position="right"
/>`,
  },
  'flash-effect': {
    name: 'FlashEffect',
    category: 'effects',
    description: 'Full-screen flash overlay with trigger modes (manual/scroll/click).',
    props: [
      { name: 'trigger', type: '"manual" | "scroll" | "click"', default: '"manual"', description: 'Trigger mode' },
      { name: 'color', type: 'string', default: '"#fff"', description: 'Flash color' },
      { name: 'duration', type: 'number', default: '150', description: 'Duration in ms' },
      { name: 'opacity', type: 'number', default: '0.4', description: 'Flash opacity (0-1)' },
      { name: 'blendMode', type: '"normal" | "overlay" | "screen" | "difference"', default: '"normal"', description: 'CSS blend mode' },
    ],
    usage: `import { FlashEffect, useFlash } from '@oalacea/chaosui/effects/flash-effect';

function App() {
  const flashRef = useFlash();

  return (
    <>
      <FlashEffect trigger="scroll" color="#ff0000" />
      <button onClick={() => flashRef.current?.flash()}>FLASH</button>
    </>
  );
}`,
  },

  // === FANTASY COMPONENTS ===

  // Fantasy Backgrounds
  'arcane-circle': {
    name: 'ArcaneCircle',
    category: 'fantasy',
    description: 'Magical arcane circle with rotating Elder Futhark runes and glowing energy.',
    props: [
      { name: 'intensity', type: '"mild" | "medium" | "extreme"', default: '"medium"', description: 'Intensity of the magical effect' },
      { name: 'color', type: 'string', default: '"#8b5cf6"', description: 'Primary color of the arcane magic' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { ArcaneCircle } from '@oalacea/chaosui/backgrounds/arcane-circle';

<ArcaneCircle />
<ArcaneCircle intensity="extreme" color="#ff6b6b" />
<ArcaneCircle position="absolute" />`,
    cssVars: [
      { name: '--arcane-color', default: '#8b5cf6', description: 'Primary arcane color' },
    ],
  },
  'starfall': {
    name: 'Starfall',
    category: 'fantasy',
    description: 'Falling stars with trail effects and burst animations.',
    props: [
      { name: 'density', type: '"sparse" | "normal" | "dense" | "cosmic"', default: '"normal"', description: 'Density of stars' },
      { name: 'speed', type: '"slow" | "normal" | "fast" | "meteor-shower"', default: '"normal"', description: 'Animation speed' },
      { name: 'trail', type: 'boolean', default: 'true', description: 'Trail effect intensity' },
      { name: 'color', type: 'string', default: '"#fbbf24"', description: 'Star color' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Position type' },
    ],
    usage: `import { Starfall } from '@oalacea/chaosui/backgrounds/starfall';

<Starfall />
<Starfall density="cosmic" speed="meteor-shower" trail={false} />`,
    cssVars: [
      { name: '--star-color', default: '#fbbf24', description: 'Star color' },
    ],
  },

  // Fantasy Buttons
  'spell-button': {
    name: 'SpellButton',
    category: 'fantasy',
    description: 'Magical spell casting button with particle effects and elemental themes.',
    props: [
      { name: 'spellType', type: '"fire" | "ice" | "lightning" | "void"', default: '"fire"', description: 'Type of spell for visual effects' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the button' },
      { name: 'intensity', type: '"subtle" | "normal" | "epic"', default: '"normal"', description: 'Intensity of the cast effect' },
    ],
    usage: `import { SpellButton } from '@oalacea/chaosui/buttons/spell-button';

<SpellButton>Fireball</SpellButton>
<SpellButton spellType="ice" size="lg">Frost Nova</SpellButton>
<SpellButton spellType="lightning" intensity="epic">Chain Lightning</SpellButton>`,
    cssVars: [
      { name: '--spell-primary', default: '#ff4500', description: 'Primary spell color' },
      { name: '--spell-glow', default: '#ff6b35', description: 'Glow color' },
    ],
  },
  'rune-button': {
    name: 'RuneButton',
    category: 'fantasy',
    description: 'Norse rune inscribed button with magical glow effects.',
    props: [
      { name: 'runeType', type: '"power" | "protection" | "wisdom" | "shadow"', default: '"power"', description: 'Type of rune symbol' },
      { name: 'glowColor', type: 'string', default: '-', description: 'Custom glow color' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the button' },
    ],
    usage: `import { RuneButton } from '@oalacea/chaosui/buttons/rune-button';

<RuneButton>Power</RuneButton>
<RuneButton runeType="protection" size="lg">Shield</RuneButton>
<RuneButton runeType="wisdom" glowColor="#9370db">Knowledge</RuneButton>`,
    cssVars: [
      { name: '--rune-glow', default: '#ffd700', description: 'Rune glow color' },
    ],
  },
  'quest-scroll': {
    name: 'QuestScroll',
    category: 'fantasy',
    description: 'Ancient quest scroll button with wax seal and aged paper texture.',
    props: [
      { name: 'questStatus', type: '"available" | "active" | "completed"', default: '"available"', description: 'Current quest status' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the scroll' },
    ],
    usage: `import { QuestScroll } from '@oalacea/chaosui/buttons/quest-scroll';

<QuestScroll>Accept Quest</QuestScroll>
<QuestScroll questStatus="active">In Progress</QuestScroll>
<QuestScroll questStatus="completed" size="lg">Claim Reward</QuestScroll>`,
    cssVars: [
      { name: '--scroll-primary', default: '#d4a574', description: 'Scroll paper color' },
    ],
  },
  'potion-flask': {
    name: 'PotionFlask',
    category: 'fantasy',
    description: 'Bubbling potion flask button with liquid animation and particles.',
    props: [
      { name: 'potionColor', type: '"health" | "mana" | "poison" | "strength" | "invisibility"', default: '"health"', description: 'Type of potion for color' },
      { name: 'bubbles', type: 'boolean | number', default: 'true', description: 'Number of bubbles or enable/disable' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Size of the flask' },
    ],
    usage: `import { PotionFlask } from '@oalacea/chaosui/buttons/potion-flask';

<PotionFlask>Drink</PotionFlask>
<PotionFlask potionColor="mana">Restore Mana</PotionFlask>
<PotionFlask potionColor="strength" bubbles={12}>Buff</PotionFlask>`,
    cssVars: [
      { name: '--potion-liquid', default: '#e53935', description: 'Potion liquid color' },
      { name: '--potion-glow', default: '#ff5252', description: 'Potion glow color' },
    ],
  },

  // Fantasy Navigation
  'spellbook-tabs': {
    name: 'SpellbookTabs',
    category: 'fantasy',
    description: 'Spellbook inspired tab navigation with book cover and pages.',
    props: [
      { name: 'spellSchools', type: 'SpellSchool[]', default: '-', description: 'Array of spell schools {id, name, icon?}' },
      { name: 'activeTab', type: 'string', default: '-', description: 'Currently active tab ID' },
      { name: 'onChange', type: '(schoolId: string) => void', default: '-', description: 'Callback when tab changes' },
    ],
    usage: `import { SpellbookTabs } from '@oalacea/chaosui/navigation/spellbook-tabs';

const schools = [
  { id: 'fire', name: 'Fire', icon: '🔥' },
  { id: 'ice', name: 'Ice', icon: '❄️' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
];

<SpellbookTabs spellSchools={schools} activeTab="fire" onChange={setTab} />`,
  },
  'quest-log': {
    name: 'QuestLog',
    category: 'fantasy',
    description: 'Fantasy quest log navigation with status indicators and wax seal.',
    props: [
      { name: 'quests', type: 'Quest[]', default: '-', description: 'Array of quests {id, title, description?, status, progress?, reward?, level?}' },
      { name: 'activeQuest', type: 'string', default: '-', description: 'Currently active quest ID' },
      { name: 'onSelect', type: '(questId: string) => void', default: '-', description: 'Callback when quest selected' },
    ],
    usage: `import { QuestLog } from '@oalacea/chaosui/navigation/quest-log';

const quests = [
  { id: '1', title: 'Slay Dragon', status: 'active', progress: 75, level: 10 },
  { id: '2', title: 'Find Artifact', status: 'available', reward: '500g' },
];

<QuestLog quests={quests} activeQuest="1" onSelect={handleSelect} />`,
  },
  'inventory-grid': {
    name: 'InventoryGrid',
    category: 'fantasy',
    description: 'RPG-style inventory grid with drag-and-drop and rarity colors.',
    props: [
      { name: 'items', type: 'InventoryItem[]', default: '[]', description: 'Inventory items {id, icon?, name?, count?, rarity?, category?}' },
      { name: 'gridSize', type: '{ rows: number; cols: number }', default: '{ rows: 4, cols: 6 }', description: 'Grid dimensions' },
      { name: 'onSelect', type: '(item: InventoryItem) => void', default: '-', description: 'Callback when item selected' },
      { name: 'maxSlots', type: 'number', default: '-', description: 'Maximum number of slots' },
    ],
    usage: `import { InventoryGrid } from '@oalacea/chaosui/navigation/inventory-grid';

const items = [
  { id: '1', icon: '⚔️', name: 'Sword', count: 1, rarity: 'legendary' },
  { id: '2', icon: '🧪', name: 'Potion', count: 5, rarity: 'common' },
];

<InventoryGrid items={items} onSelect={handleSelect} />`,
  },
  // Fantasy Text
  'incantation': {
    name: 'Incantation',
    category: 'fantasy',
    description: 'Magical incantation text with glow layers, vibration, and pulse effects.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The incantation text to display' },
      { name: 'intensity', type: '"subtle" | "medium" | "intense"', default: '"medium"', description: 'Intensity of the magical effect' },
      { name: 'language', type: '"arcane" | "divine" | "eldritch"', default: '"arcane"', description: 'Magical language style' },
      { name: 'glowColor', type: 'string', default: '"#a855f7"', description: 'Primary glow color' },
      { name: 'shiftColor', type: 'string', default: '"#fbbf24"', description: 'Secondary color for shift effect' },
      { name: 'pulseDuration', type: 'number', default: '2', description: 'Duration of the pulse cycle in seconds' },
    ],
    usage: `import { Incantation } from '@oalacea/chaosui/text/incantation';

<Incantation>Abracadabra</Incantation>
<Incantation intensity="intense" language="divine">Sanctify</Incantation>
<Incantation glowColor="#ef4444" shiftColor="#fbbf24">Ignis!</Incantation>`,
    cssVars: [
      { name: '--glow-color', default: '#a855f7', description: 'Primary glow color' },
      { name: '--shift-color', default: '#fbbf24', description: 'Secondary shift color' },
    ],
  },
  'prophecy': {
    name: 'Prophecy',
    category: 'fantasy',
    description: 'Revealing prophecy text with character-by-character reveal animation.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The prophecy text to reveal' },
      { name: 'revealSpeed', type: '"slow" | "medium" | "fast" | "instant"', default: '"medium"', description: 'Speed of character reveal' },
      { name: 'ancientFont', type: 'boolean', default: 'true', description: 'Use ancient/deteriorated font style' },
      { name: 'startDelay', type: 'number', default: '500', description: 'Delay before revelation starts (ms)' },
      { name: 'loop', type: 'boolean', default: 'false', description: 'Loop the revelation animation' },
      { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when revelation completes' },
    ],
    usage: `import { Prophecy } from '@oalacea/chaosui/text/prophecy';

<Prophecy>The chosen one shall rise...</Prophecy>
<Prophecy revealSpeed="slow" loop onComplete={handleComplete}>
  Darkness falls, heroes rise...
</Prophecy>`,
  },
  'runes-reveal': {
    name: 'RunesReveal',
    category: 'fantasy',
    description: 'Ancient runes that illuminate and reveal their translation.',
    props: [
      { name: 'runes', type: 'string[]', default: '-', description: 'The runes to display (ancient symbols)' },
      { name: 'translation', type: 'string', default: '-', description: 'The translation text to reveal' },
      { name: 'revealSpeed', type: '"slow" | "medium" | "fast"', default: '"medium"', description: 'Reveal animation speed' },
      { name: 'runeStyle', type: '"nordic" | "elven" | "draconic"', default: '"nordic"', description: 'Rune style' },
      { name: 'autoStart', type: 'boolean', default: 'true', description: 'Auto-start animation on mount' },
      { name: 'startDelay', type: 'number', default: '1000', description: 'Delay before start (ms)' },
      { name: 'onComplete', type: '() => void', default: '-', description: 'Callback when translation completes' },
    ],
    usage: `import { RunesReveal } from '@oalacea/chaosui/text/runes-reveal';

<RunesReveal runes={['ᚠ', 'ᚢ', 'ᚦ']} translation="SECRET" />
<RunesReveal
  runes={['ᛟ', 'ᛃ', 'ᛇ']}
  translation="OPEN SESAME"
  runeStyle="nordic"
  revealSpeed="slow"
/>`,
  },
  'ancient-scroll': {
    name: 'AncientScroll',
    category: 'fantasy',
    description: 'Ancient scroll text container with aged paper, flowing ink, and wax seal.',
    props: [
      { name: 'children', type: 'string', default: '-', description: 'The text to display on the scroll' },
      { name: 'decay', type: '"pristine" | "aged" | "weathered" | "crumbling"', default: '"aged"', description: 'Level of paper decay' },
      { name: 'inkColor', type: '"black" | "brown" | "red" | "gold"', default: '"brown"', description: 'Ink color style' },
      { name: 'flowingInk', type: 'boolean', default: 'true', description: 'Enable flowing ink animation' },
      { name: 'showTexture', type: 'boolean', default: 'true', description: 'Show aged paper texture' },
    ],
    usage: `import { AncientScroll } from '@oalacea/chaosui/text/ancient-scroll';

<AncientScroll>
  In the time of old, when magic flowed freely...
</AncientScroll>
<AncientScroll decay="crumbling" inkColor="gold">
  The forbidden tome speaks of...
</AncientScroll>`,
    cssVars: [
      { name: '--ink-color', default: '#4a3728', description: 'Ink color' },
    ],
  },

  // Fantasy Effects
  'spell-cast': {
    name: 'SpellCast',
    category: 'fantasy',
    description: 'Spell casting burst effect with shockwaves and particles.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Content that triggers spell on click' },
      { name: 'spellType', type: '"fire" | "ice" | "lightning" | "nature" | "shadow" | "holy" | "arcane"', default: '"arcane"', description: 'Type of spell for visual styling' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge"', default: '"medium"', description: 'Size of the spell effect' },
      { name: 'duration', type: 'number', default: '0.6', description: 'Duration in seconds' },
      { name: 'triggerOnClick', type: 'boolean', default: 'true', description: 'Trigger animation on click' },
      { name: 'autoTrigger', type: 'boolean', default: 'false', description: 'Auto-trigger on mount' },
      { name: 'showRune', type: 'boolean', default: 'false', description: 'Show rune symbol (arcane spells)' },
      { name: 'particleCount', type: 'number', default: '12', description: 'Number of burst particles' },
    ],
    usage: `import { SpellCast } from '@oalacea/chaosui/effects/spell-cast';

<SpellCast>
  <button>Cast Fireball</button>
</SpellCast>
<SpellCast spellType="lightning" particleCount={20}>
  <button>Chain Lightning</button>
</SpellCast>`,
  },
  'heal-pulse': {
    name: 'HealPulse',
    category: 'fantasy',
    description: 'Healing pulse wave effect with sparkles and thematic elements.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Content that triggers heal' },
      { name: 'color', type: '"nature" | "holy" | "mystic" | "water" | "life"', default: '"nature"', description: 'Type of healing effect' },
      { name: 'waves', type: 'number', default: '5', description: 'Number of healing waves' },
      { name: 'speed', type: '"slow" | "medium" | "fast"', default: '"medium"', description: 'Speed of the waves' },
      { name: 'size', type: '"small" | "medium" | "large" | "xlarge"', default: '"medium"', description: 'Size of the effect' },
      { name: 'triggerOnClick', type: 'boolean', default: 'true', description: 'Trigger animation on click' },
      { name: 'autoTrigger', type: 'boolean', default: 'false', description: 'Auto-trigger on mount' },
      { name: 'particles', type: 'boolean', default: 'true', description: 'Show floating particles' },
      { name: 'showCross', type: 'boolean', default: 'false', description: 'Show cross pattern (holy)' },
    ],
    usage: `import { HealPulse } from '@oalacea/chaosui/effects/heal-pulse';

<HealPulse>
  <button>Heal</button>
</HealPulse>
<HealPulse color="holy" waves={8} showCross>
  <button>Divine Healing</button>
</HealPulse>`,
  },

  // NEW EFFECTS COMPONENTS
  'blob-cursor': {
    name: 'BlobCursor',
    category: 'effects',
    description: 'Fluid blob cursor that follows mouse with organic movement and distortion.',
    props: [
      { name: 'size', type: 'number', default: '80', description: 'Blob size in pixels' },
      { name: 'color', type: 'string', default: '"rgba(100, 200, 255, 0.5)"', description: 'Blob color (any valid CSS color)' },
      { name: 'blobAmount', type: 'number', default: '5', description: 'How distorted the blob shape is (0 = circle, higher = more distorted)' },
      { name: 'speed', type: 'number', default: '0.1', description: 'Follow speed (0.01-1, lower = smoother/slower)' },
      { name: 'damping', type: 'number', default: '0.9', description: 'Smoothness/damping of movement (0.1-0.99, higher = more momentum)' },
      { name: 'zIndex', type: 'number', default: '9999', description: 'Z-index of the blob cursor' },
      { name: 'className', type: 'string', default: '""', description: 'Additional className for the blob container' },
      { name: 'children', type: 'ReactNode', default: '-', description: 'Child elements to render underneath the cursor' },
    ],
    usage: `import { BlobCursor } from '@oalacea/chaosui/effects/blob-cursor';

<BlobCursor />
<BlobCursor size={120} color="rgba(255, 100, 150, 0.6)" />
<BlobCursor blobAmount={10} speed={0.05} damping={0.95} />`,
  },
  'splash-cursor': {
    name: 'SplashCursor',
    category: 'effects',
    description: 'Interactive fluid simulation cursor with colorful splash effects and realistic dye diffusion.',
    props: [
      { name: 'SIM_RESOLUTION', type: 'number', default: '128', description: 'Fluid simulation resolution for velocity fields' },
      { name: 'DYE_RESOLUTION', type: 'number', default: '1440', description: 'Resolution of the color/dye texture' },
      { name: 'DENSITY_DISSIPATION', type: 'number', default: '3.5', description: 'Rate at which color/density dissipates over time' },
      { name: 'VELOCITY_DISSIPATION', type: 'number', default: '2', description: 'Rate at which velocity dissipates over time' },
      { name: 'SPLAT_RADIUS', type: 'number', default: '0.2', description: 'Radius of the splash effect' },
      { name: 'SPLAT_FORCE', type: 'number', default: '6000', description: 'Force of the fluid splash on interaction' },
      { name: 'SHADING', type: 'boolean', default: 'true', description: 'Toggle simple lighting/shading' },
      { name: 'COLOR_UPDATE_SPEED', type: 'number', default: '10', description: 'Frequency of color randomization' },
      { name: 'BACK_COLOR', type: '{ r: number; g: number; b: number }', default: '{ r: 0.5, g: 0, b: 0 }', description: 'Background color RGB values' },
      { name: 'TRANSPARENT', type: 'boolean', default: 'true', description: 'Transparent canvas background' },
      { name: 'className', type: 'string', default: '""', description: 'Custom className' },
    ],
    usage: `import { SplashCursor } from '@oalacea/chaosui/effects/splash-cursor';

<SplashCursor />
<SplashCursor DENSITY_DISSIPATION={5} SPLAT_FORCE={8000} />
<SplashCursor SHADING={false} TRANSPARENT={false} />`,
  },
  'electric-border': {
    name: 'ElectricBorder',
    category: 'effects',
    description: 'Animated electric border with turbulent noise distortion and glow effects.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Child elements to wrap' },
      { name: 'color', type: 'string', default: '"#5227FF"', description: 'Border color (hex)' },
      { name: 'speed', type: 'number', default: '1', description: 'Animation speed (1 = normal, higher = faster)' },
      { name: 'chaos', type: 'number', default: '1', description: 'Chaos/turbulence intensity' },
      { name: 'thickness', type: 'number', default: '2', description: 'Border thickness in pixels' },
      { name: 'className', type: 'string', default: '""', description: 'Custom className' },
      { name: 'style', type: 'React.CSSProperties', default: '-', description: 'Custom styles' },
    ],
    usage: `import { ElectricBorder } from '@oalacea/chaosui/effects/electric-border';

<ElectricBorder>
  <div>Content with electric border</div>
</ElectricBorder>
<ElectricBorder color="#ff0040" chaos={2} thickness={3}>
  <button>High Voltage</button>
</ElectricBorder>`,
  },
  'click-spark': {
    name: 'ClickSpark',
    category: 'effects',
    description: 'Spark explosion effect on click with configurable particles and animation.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Child elements' },
      { name: 'sparkColor', type: 'string', default: '"#fff"', description: 'Color of sparks (hex)' },
      { name: 'sparkSize', type: 'number', default: '10', description: 'Size of each spark line in pixels' },
      { name: 'sparkRadius', type: 'number', default: '15', description: 'Radius of explosion in pixels' },
      { name: 'sparkCount', type: 'number', default: '8', description: 'Number of sparks per click' },
      { name: 'duration', type: 'number', default: '400', description: 'Duration of animation in ms' },
      { name: 'easing', type: '"linear" | "ease-in" | "ease-in-out" | "ease-out"', default: '"ease-out"', description: 'Easing function' },
      { name: 'extraScale', type: 'number', default: '1.0', description: 'Extra scale multiplier' },
    ],
    usage: `import { ClickSpark } from '@oalacea/chaosui/effects/click-spark';

<ClickSpark>
  <button>Click for sparks</button>
</ClickSpark>
<ClickSpark sparkColor="#ff0040" sparkCount={12} sparkRadius={20}>
  <button>Red burst</button>
</ClickSpark>`,
  },
  'magnet': {
    name: 'Magnet',
    category: 'effects',
    description: 'Magnetic effect that pulls elements toward cursor on hover.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Child elements to apply magnet effect' },
      { name: 'padding', type: 'number', default: '100', description: 'Padding around element to trigger effect (pixels)' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the magnet effect' },
      { name: 'magnetStrength', type: 'number', default: '2', description: 'Strength of attraction (higher = less movement)' },
      { name: 'activeTransition', type: 'string', default: '"transform 0.3s ease-out"', description: 'Transition when active/attracted' },
      { name: 'inactiveTransition', type: 'string', default: '"transform 0.5s ease-in-out"', description: 'Transition when inactive/released' },
      { name: 'wrapperClassName', type: 'string', default: '""', description: 'Class for wrapper div' },
      { name: 'innerClassName', type: 'string', default: '""', description: 'Class for inner div' },
    ],
    usage: `import { Magnet } from '@oalacea/chaosui/effects/magnet';

<Magnet>
  <button>Hover me</button>
</Magnet>
<Magnet padding={150} magnetStrength={3}>
  <div>Stronger pull</div>
</Magnet>`,
  },
  'lens-flare': {
    name: 'LensFlare',
    category: 'effects',
    description: 'Optical lens flare effect with multiple elements that follow mouse position.',
    props: [
      { name: 'children', type: 'ReactNode', default: '-', description: 'Content to overlay flare on' },
      { name: 'intensity', type: 'number', default: '0.6', description: 'Flare brightness 0-1' },
      { name: 'color', type: 'string', default: '"#ffffff"', description: 'Flare color tint' },
      { name: 'flareSize', type: 'number', default: '300', description: 'Max flare diameter in pixels' },
      { name: 'elementCount', type: 'number', default: '5', description: 'Number of flare elements' },
      { name: 'followMouse', type: 'boolean', default: 'true', description: 'Whether flare follows mouse' },
      { name: 'className', type: 'string', default: '""', description: 'Additional class name' },
    ],
    usage: `import { LensFlare } from '@oalacea/chaosui/effects/lens-flare';

<LensFlare>
  <div>Content with lens flare</div>
</LensFlare>
<LensFlare intensity={0.8} color="#ffcc00" elementCount={7} />
<LensFlare followMouse={false} />`,
  },
  'fireflies': {
    name: 'Fireflies',
    category: 'effects',
    description: 'Ambient fireflies with pulsing glow and wandering movement patterns.',
    props: [
      { name: 'count', type: 'number', default: '30', description: 'Number of fireflies' },
      { name: 'color', type: 'string', default: '"#ffff00"', description: 'Firefly color (hex or rgb)' },
      { name: 'minSize', type: 'number', default: '2', description: 'Minimum firefly size in pixels' },
      { name: 'maxSize', type: 'number', default: '4', description: 'Maximum firefly size in pixels' },
      { name: 'speed', type: 'number', default: '1', description: 'Movement speed multiplier' },
      { name: 'glowIntensity', type: 'number', default: '0.8', description: 'Glow intensity (0-1)' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Fixed or absolute positioning' },
    ],
    usage: `import { Fireflies } from '@oalacea/chaosui/effects/fireflies';

<Fireflies />
<Fireflies count={50} color="#00ff00" glowIntensity={1} />
<Fireflies position="absolute" speed={2} />`,
  },
  'snowfall': {
    name: 'Snowfall',
    category: 'effects',
    description: 'Animated snowflakes with swaying motion and wind effects.',
    props: [
      { name: 'snowflakeCount', type: 'number', default: '100', description: 'Number of snowflakes' },
      { name: 'minSize', type: 'number', default: '2', description: 'Minimum snowflake size in pixels' },
      { name: 'maxSize', type: 'number', default: '5', description: 'Maximum snowflake size in pixels' },
      { name: 'speed', type: 'number', default: '1', description: 'Fall speed multiplier' },
      { name: 'wind', type: 'number', default: '0', description: 'Horizontal wind (negative = left, positive = right)' },
      { name: 'color', type: 'string', default: '"#ffffff"', description: 'Snowflake color' },
      { name: 'opacity', type: 'number', default: '0.8', description: 'Snowflake opacity (0-1)' },
      { name: 'position', type: '"fixed" | "absolute"', default: '"fixed"', description: 'Fixed or absolute positioning' },
    ],
    usage: `import { Snowfall } from '@oalacea/chaosui/effects/snowfall';

<Snowfall />
<Snowfall snowflakeCount={200} wind={1} />
<Snowfall color="#add8e6" opacity={0.6} />`,
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
    case 'glass-button':
      return <button className={styles.glassBtnPreview}>GLASS</button>;
    case 'neon-glow':
      return <button className={styles.neonGlowPreview}>NEON</button>;
    case 'floating-button':
      return <button className={styles.floatingBtnPreview}>FLOAT</button>;
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
    case 'particles':
      return <div className={styles.particlesPreview}>{Array.from({length:12}).map((_,i)=><div key={i}/>)}</div>;
    case 'aurora':
      return <div className={styles.auroraPreview}><div/><div/><div/></div>;
    case 'plasma-wave':
      return <div className={styles.plasmaPreview} />;
    case 'bubbles':
      return <div className={styles.bubblesPreview}><div/><div/><div/></div>;
    case 'lightning':
      return <div className={styles.lightningPreview} />;
    case 'faulty-terminal':
      return <div className={styles.faultyTerminalPreview}><span className={styles.ftText}>TERMINAL</span></div>;
    case 'gradient-mesh':
      return <div className={styles.meshBox} />;
    case 'noise-pattern':
      return <div className={styles.noisePatternBox}><span>NOISE</span></div>;

    // NEW OVERLAYS
    case 'scanlines-overlay':
      return <div className={styles.scanlinesOverlayBox}><span>SCAN</span></div>;
    case 'vignette-overlay':
      return <div className={styles.vignetteOverlayBox}><span>VIGNETTE</span></div>;

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

    // === NEW CHAOS COMPONENTS ===

    // TEXT
    case 'living-text':
      return (
        <div className={styles.livingTextPreview}>
          <span className={styles.livingTextAlive}>ALIVE</span>
          <span className={styles.livingTextGhost}>GHOST</span>
        </div>
      );
    case 'brutal-manifest':
      return (
        <div className={styles.brutalManifestPreview}>
          <span className={styles.brutalBox}>NO</span>
          <span className={styles.brutalBox}>RULES</span>
        </div>
      );

    // NEW TEXT PREVIEWS
    case 'gradient-text':
      return <span className={styles.gradientText}>GRADIENT</span>;
    case 'wavy-text':
      return <span className={styles.wavyText}><span>W</span><span>A</span><span>V</span><span>Y</span></span>;
    case 'reflection-text':
      return <div className={styles.reflectionText}><span>REFLECT</span></div>;
    case 'three-d-text':
      return <span className={styles.threeDText}>DEPTH</span>;

    // LAYOUT
    case 'strata-section':
      return (
        <div className={styles.strataPreview}>
          <div className={styles.strataLayer}><span>STRATA</span></div>
        </div>
      );
    case 'broken-grid':
    case 'broken-grid-chaos':
      return (
        <div className={styles.brokenGridPreview}>
          <div className={styles.brokenGridItem}><span>01</span></div>
          <div className={styles.brokenGridItem}><span>02</span></div>
          <div className={styles.brokenGridItem}><span>03</span></div>
        </div>
      );

    // NAVIGATION
    case 'scattered-nav':
      return (
        <div className={styles.scatteredNavPreview}>
          <span className={styles.scatteredNavItem}>NAV</span>
        </div>
      );
    case 'collapsed-nav':
      return (
        <div className={styles.collapsedNavPreview}>
          <span className={styles.collapsedNavItem}>COLLAPSE</span>
        </div>
      );
    case 'dock':
      return (
        <div className={styles.dockPreview}>
          <div className={styles.dockItem}><span>1</span></div>
          <div className={styles.dockItem}><span>2</span></div>
          <div className={styles.dockItem}><span>3</span></div>
        </div>
      );
    case 'magnetic-dock':
      return (
        <div className={styles.magneticDockPreview}>
          <div className={styles.magneticDockItem}><span>M</span></div>
          <div className={styles.magneticDockItem}><span>A</span></div>
          <div className={styles.magneticDockItem}><span>G</span></div>
        </div>
      );
    case 'bubble-menu':
      return (
        <div className={styles.bubbleMenuPreview}>
          <div className={styles.bubble}><span>+</span></div>
          <div className={styles.bubble}><span>-</span></div>
          <div className={styles.bubble}><span>*</span></div>
        </div>
      );

    // LAYOUT
    case 'parallax-container':
      return (
        <div className={styles.parallaxPreview}>
          <div className={styles.parallaxLayer} style={{transform: 'translateY(2px)'}}><span>BACK</span></div>
          <div className={styles.parallaxLayer} style={{transform: 'translateY(0)'}}><span>MID</span></div>
          <div className={styles.parallaxLayer} style={{transform: 'translateY(-2px)'}}><span>FRONT</span></div>
        </div>
      );
    case 'stack-cards':
      return (
        <div className={styles.stackCardsPreview}>
          <div className={styles.stackCard} style={{transform: 'translateY(0) rotate(0deg)', zIndex: 3}}><span>1</span></div>
          <div className={styles.stackCard} style={{transform: 'translateY(4px) rotate(1deg)', zIndex: 2}}><span>2</span></div>
          <div className={styles.stackCard} style={{transform: 'translateY(8px) rotate(2deg)', zIndex: 1}}><span>3</span></div>
        </div>
      );
    case 'animated-list':
      return (
        <div className={styles.animatedListPreview}>
          <div><span>•</span> Item 1</div>
          <div><span>•</span> Item 2</div>
          <div><span>•</span> Item 3</div>
        </div>
      );
    case 'circular-gallery':
      return (
        <div className={styles.circularGalleryPreview}>
          <div className={styles.galleryCenter}>●</div>
          <div className={styles.galleryItem} style={{transform: 'rotate(0deg) translate(25px) rotate(0deg)'}}>1</div>
          <div className={styles.galleryItem} style={{transform: 'rotate(72deg) translate(25px) rotate(-72deg)'}}>2</div>
          <div className={styles.galleryItem} style={{transform: 'rotate(144deg) translate(25px) rotate(-144deg)'}}>3</div>
          <div className={styles.galleryItem} style={{transform: 'rotate(216deg) translate(25px) rotate(-216deg)'}}>4</div>
          <div className={styles.galleryItem} style={{transform: 'rotate(288deg) translate(25px) rotate(-288deg)'}}>5</div>
        </div>
      );

    // INPUTS
    case 'draggable-document':
      return (
        <div className={styles.draggableDocPreview}>
          <div className={styles.docContent}>DOC</div>
        </div>
      );

    // EFFECTS
    case 'ghost-layer':
      return (
        <div className={styles.ghostLayerPreview}>
          <span className={styles.ghostText}>GHOST</span>
        </div>
      );
    case 'cursor-trail':
      return (
        <div className={styles.cursorTrailPreview}>
          <div className={styles.trailDot} />
          <div className={styles.trailDot} />
          <div className={styles.trailDot} />
        </div>
      );
    case 'flash-effect':
      return (
        <div className={styles.flashEffectPreview}>
          <span>FLASH</span>
        </div>
      );

    // DISPLAY
    case 'depth-indicator':
      return <div className={styles.depthIndicatorPreview}>DEPTH</div>;

    // === FANTASY COMPONENTS PREVIEWS ===
    case 'arcane-circle':
      return <div className={styles.arcaneCirclePreview}><span>ᛟ</span></div>;
    case 'starfall':
      return <div className={styles.starfallPreview}><div className={styles.star}/></div>;
    case 'spell-button':
      return <button className={styles.spellButtonPreview}>FIREBALL</button>;
    case 'rune-button':
      return <button className={styles.runeButtonPreview}>ᛟ POWER</button>;
    case 'quest-scroll':
      return <button className={styles.questScrollPreview}>QUEST</button>;
    case 'potion-flask':
      return <button className={styles.potionFlaskPreview}>⚗ HEALTH</button>;
    case 'spellbook-tabs':
      return <div className={styles.spellbookTabsPreview}><span>📖 FIRE</span><span>📘 ICE</span></div>;
    case 'quest-log':
      return <div className={styles.questLogPreview}><span>⚔ Slay Dragon</span></div>;
    case 'inventory-grid':
      return <div className={styles.inventoryGridPreview}><div className={styles.slot}/><div className={styles.slot}/></div>;
    case 'incantation':
      return <span className={styles.incantationPreview}>ABRACADABRA</span>;
    case 'prophecy':
      return <div className={styles.prophecyPreview}><span>THE PROPHECY...</span></div>;
    case 'runes-reveal':
      return <div className={styles.runesRevealPreview}><span>ᚠᚢᚦ</span><span>→ SECRET</span></div>;
    case 'ancient-scroll':
      return <div className={styles.ancientScrollPreview}><p>Ancient wisdom...</p></div>;
    case 'spell-cast':
      return <div className={styles.spellCastPreview}><div className={styles.burst}/></div>;
    case 'heal-pulse':
      return <div className={styles.healPulsePreview}><div className={styles.pulse}/></div>;


    case 'blob-cursor':
      return <div className={styles.blobCursorPreview}><div className={styles.blob}/></div>;
    case 'splash-cursor':
      return <div className={styles.splashCursorPreview}><div className={styles.splash}/></div>;
    case 'electric-border':
      return <div className={styles.electricBorderPreview}><span>⚡ELECTRIC⚡</span></div>;
    case 'click-spark':
      return <button className={styles.clickSparkPreview}>CLICK ME</button>;
    case 'magnet':
      return <div className={styles.magnetPreview}><button>HOVER ME</button></div>;
    case 'lens-flare':
      return <div className={styles.lensFlarePreview}><span>☀️FLARE☀️</span></div>;
    case 'fireflies':
      return <div className={styles.firefliesPreview}><div className={styles.firefly}/><div className={styles.firefly}/><div className={styles.firefly}/></div>;
    case 'snowfall':
      return <div className={styles.snowfallPreview}><div className={styles.snowflake}/><div className={styles.snowflake}/><div className={styles.snowflake}/></div>;

    default:
      return <span>Preview</span>;
  }
}
