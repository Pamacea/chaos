import Link from 'next/link';
import styles from './docs.module.css';

const COMPONENTS = {
  text: [
    { name: 'glitch-text', description: 'RGB split glitch effect' },
    { name: 'flicker-text', description: 'Random opacity flicker' },
    { name: 'distortion-text', description: 'Wave/shake/skew/blur' },
    { name: 'falling-text', description: 'Cascading letters' },
  ],
  overlays: [
    { name: 'noise-overlay', description: 'SVG fractal noise' },
    { name: 'scanlines', description: 'CRT horizontal lines' },
    { name: 'vignette', description: 'Dark edges gradient' },
    { name: 'static-flicker', description: 'Animated TV static' },
  ],
  buttons: [
    { name: 'glitch-button', description: 'Glitch on hover' },
    { name: 'chaos-button', description: 'Chaotic with debris' },
  ],
  backgrounds: [
    { name: 'noise-canvas', description: 'Animated noise canvas' },
    { name: 'light-beams', description: 'Vertical color beams' },
    { name: 'glow-orbs', description: 'Floating blurred orbs' },
    { name: 'particle-field', description: 'Drifting particles' },
  ],
  effects: [
    { name: 'warning-tape', description: 'Scrolling banner' },
    { name: 'cursor-follower', description: 'Custom cursor trail' },
    { name: 'screen-distortion', description: 'Full screen fx' },
  ],
};

export default function DocsPage() {
  return (
    <div className={styles.docs}>
      {/* Scattered header */}
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← BACK</Link>
        <div className={styles.headerContent}>
          <span className={styles.headerTag}>17 COMPONENTS</span>
          <h1 className={styles.title}>
            <span className="glitch" data-text="DOCS">DOCS</span>
          </h1>
        </div>
        <div className={styles.headerRight}>
          <code className={styles.installCmd}>npx chaos add [name]</code>
        </div>
      </header>

      {/* Main grid - takes space */}
      <main className={styles.main}>
        {Object.entries(COMPONENTS).map(([category, components]) => (
          <section key={category} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <div className={styles.componentGrid}>
              {components.map((comp) => (
                <Link
                  key={comp.name}
                  href={`/docs/${comp.name}`}
                  className={styles.componentCard}
                >
                  <div className={styles.cardPreview}>
                    <ComponentPreview name={comp.name} />
                  </div>
                  <div className={styles.cardInfo}>
                    <span className={styles.cardName}>{comp.name}</span>
                    <span className={styles.cardDesc}>{comp.description}</span>
                  </div>
                  <span className={styles.cardArrow}>→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer - bottom left */}
      <footer className={styles.footer}>
        <Link href="/">HOME</Link>
        <span>•</span>
        <Link href="/about">ABOUT</Link>
        <span>•</span>
        <a href="https://github.com/oalacea/chaos">GITHUB</a>
      </footer>
    </div>
  );
}

function ComponentPreview({ name }: { name: string }) {
  switch (name) {
    case 'glitch-text':
      return <span className={`${styles.previewText} glitch`} data-text="GLITCH">GLITCH</span>;
    case 'flicker-text':
      return <span className={`${styles.previewText} flicker`}>FLICKER</span>;
    case 'distortion-text':
      return <span className={`${styles.previewText} ${styles.waveText}`}>WAVE</span>;
    case 'falling-text':
      return <span className={`${styles.previewText} ${styles.fallText}`}>FALL</span>;
    case 'noise-overlay':
      return <div className={styles.noiseBox}><span>NOISE</span></div>;
    case 'scanlines':
      return <div className={styles.scanlinesBox}><span>SCAN</span></div>;
    case 'vignette':
      return <div className={styles.vignetteBox}><span>VIGN</span></div>;
    case 'static-flicker':
      return <div className={styles.staticBox}><span>STATIC</span></div>;
    case 'glitch-button':
      return <button className={styles.previewBtn}>HOVER</button>;
    case 'chaos-button':
      return <button className={styles.previewChaosBtn}>CHAOS</button>;
    case 'noise-canvas':
      return <div className={styles.canvasBox} />;
    case 'light-beams':
      return <div className={styles.beamsBox}><div/><div/><div/></div>;
    case 'glow-orbs':
      return <div className={styles.orbsBox}><div/><div/></div>;
    case 'particle-field':
      return <div className={styles.particlesBox}><div/><div/><div/><div/><div/></div>;
    case 'warning-tape':
      return <div className={styles.tapeBox}><span>WARNING • ERROR •</span></div>;
    case 'cursor-follower':
      return <div className={styles.cursorBox}><div className={styles.cursorRing}/><div className={styles.cursorDot}/></div>;
    case 'screen-distortion':
      return <div className={styles.distortBox}><span>DIST</span></div>;
    default:
      return <span>{name}</span>;
  }
}
