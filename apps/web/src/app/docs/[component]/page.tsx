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
    default:
      return <span>Preview</span>;
  }
}
