import Link from 'next/link';
import styles from './docs.module.css';

const COMPONENTS = {
  neon: [
    { name: 'neon-button', description: 'Glowing neon button' },
    { name: 'neon-badge', description: 'Luminous status badge' },
    { name: 'neon-progress', description: 'Glowing progress bar' },
    { name: 'neon-toggle', description: 'Neon on/off switch' },
    { name: 'neon-alert', description: 'Neon notifications' },
    { name: 'neon-tabs', description: 'Glowing tab navigation' },
    { name: 'neon-divider', description: 'Luminous dividers' },
  ],
  cyber: [
    { name: 'cyber-input', description: 'Animated input field' },
    { name: 'cyber-loader', description: 'Futuristic spinners' },
    { name: 'cyber-modal', description: 'Modal with scanlines' },
    { name: 'cyber-avatar', description: 'Neon avatar frame' },
    { name: 'cyber-slider', description: 'Neon range slider' },
    { name: 'cyber-tooltip', description: 'Terminal tooltips' },
  ],
  layout: [
    { name: 'hologram-card', description: 'Holographic card' },
    { name: 'data-grid', description: 'Terminal data table' },
    { name: 'horizontal-scroll', description: 'Horizontal panel scroll' },
    { name: 'void-frame', description: 'Decorative corner frame' },
    { name: 'tower-pricing', description: 'Vertical pricing tiers' },
    { name: 'spec-grid', description: 'Terminal spec display' },
    { name: 'tracklist', description: 'Music tracklist layout' },
  ],
  navigation: [
    { name: 'hexagon-menu', description: 'Honeycomb menu' },
    { name: 'scattered-nav', description: 'Scattered chaotic nav' },
    { name: 'vertical-nav', description: 'Rune vertical sidebar' },
    { name: 'brutal-nav', description: 'Bold brutalist navbar' },
    { name: 'progress-dots', description: 'Section progress dots' },
    { name: 'scroll-indicator', description: 'Scroll position tracker' },
  ],
  text: [
    { name: 'glitch-text', description: 'RGB split glitch effect' },
    { name: 'flicker-text', description: 'Random opacity flicker' },
    { name: 'distortion-text', description: 'Wave/shake/skew/blur' },
    { name: 'falling-text', description: 'Cascading letters' },
    { name: 'typing-text', description: 'Typewriter animation' },
    { name: 'char-glitch', description: 'Per-character glitch' },
    { name: 'reveal-text', description: 'Scroll reveal animation' },
    { name: 'strike-reveal', description: 'Strikethrough reveal' },
    { name: 'giant-layers', description: 'Layered shadow text' },
    { name: 'blood-drip', description: 'Dripping blood effect' },
    { name: 'rotate-text', description: 'Word rotation carousel' },
    { name: 'ascii-art', description: 'ASCII art display' },
    { name: 'countdown-display', description: 'Countdown timer' },
    { name: 'terminal-output', description: 'Terminal console' },
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
    { name: 'dead-button', description: 'Destroyed aesthetic' },
    { name: 'deeper-button', description: 'Deep descent CTA' },
    { name: 'dual-choice', description: 'Yes/No binary choice' },
    { name: 'cta-brutal', description: 'Brutalist call-to-action' },
    { name: 'tension-bar', description: 'Progress tension meter' },
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
    { name: 'glowing-border', description: 'Glowing container' },
    { name: 'glitch-image', description: 'RGB glitch on hover' },
  ],
  decorative: [
    { name: 'rune-symbols', description: 'Elder Futhark runes' },
    { name: 'ornaments', description: 'Decorative dividers' },
    { name: 'coffee-stain', description: 'Paper stain effects' },
    { name: 'sheet-music', description: 'Floating music notes' },
    { name: 'inscription', description: 'Carved stone text' },
  ],
};

const totalComponents = Object.values(COMPONENTS).flat().length;

export default function DocsPage() {
  return (
    <div className={styles.docs}>
      {/* Scattered header */}
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← BACK</Link>
        <div className={styles.headerContent}>
          <span className={styles.headerTag}>{totalComponents} COMPONENTS</span>
          <h1 className={styles.title}>
            <span className="glitch" data-text="DOCS">DOCS</span>
          </h1>
        </div>
        <div className={styles.headerRight}>
          <code className={styles.installCmd}>npx @oalacea/chaosui add [name]</code>
        </div>
      </header>

      {/* Variant info */}
      <div className={styles.variantInfo}>
        <span className={styles.variantBadge}>CSS</span>
        <span className={styles.variantBadge}>TAILWIND</span>
        <code>--variant css|tailwind</code>
      </div>

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
    // Neon
    case 'neon-button':
      return <button className={styles.neonBtn}>GLOW</button>;
    case 'neon-badge':
      return <span className={styles.neonBadge}>LIVE</span>;
    case 'neon-progress':
      return <div className={styles.neonProgress}><div className={styles.neonProgressBar} /></div>;
    case 'neon-toggle':
      return <div className={styles.neonToggle}><div className={styles.neonToggleThumb} /></div>;
    case 'neon-alert':
      return <div className={styles.neonAlert}>ALERT</div>;
    case 'neon-tabs':
      return <div className={styles.neonTabs}><span className={styles.neonTabActive}>TAB</span><span>TAB</span></div>;
    case 'neon-divider':
      return <div className={styles.neonDivider} />;
    
    // Cyber
    case 'cyber-input':
      return <div className={styles.cyberInput}><span>INPUT</span></div>;
    case 'cyber-loader':
      return <div className={styles.cyberLoader} />;
    case 'cyber-modal':
      return <div className={styles.cyberModal}><span>MODAL</span></div>;
    case 'cyber-avatar':
      return <div className={styles.cyberAvatar} />;
    case 'cyber-slider':
      return <div className={styles.cyberSlider}><div className={styles.cyberSliderThumb} /></div>;
    case 'cyber-tooltip':
      return <div className={styles.cyberTooltip}>TIP</div>;
    
    // Layout
    case 'hologram-card':
      return <div className={styles.holoCard}><span>HOLO</span></div>;
    case 'data-grid':
      return <div className={styles.dataGrid}><div/><div/><div/></div>;
    
    // Navigation
    case 'hexagon-menu':
      return <div className={styles.hexMenu}><div/><div/><div/></div>;
    
    // Text
    case 'glitch-text':
      return <span className={`${styles.previewText} glitch`} data-text="GLITCH">GLITCH</span>;
    case 'flicker-text':
      return <span className={`${styles.previewText} flicker`}>FLICKER</span>;
    case 'distortion-text':
      return <span className={`${styles.previewText} ${styles.waveText}`}>WAVE</span>;
    case 'falling-text':
      return <span className={`${styles.previewText} ${styles.fallText}`}>FALL</span>;
    
    // Overlays
    case 'noise-overlay':
      return <div className={styles.noiseBox}><span>NOISE</span></div>;
    case 'scanlines':
      return <div className={styles.scanlinesBox}><span>SCAN</span></div>;
    case 'vignette':
      return <div className={styles.vignetteBox}><span>VIGN</span></div>;
    case 'static-flicker':
      return <div className={styles.staticBox}><span>STATIC</span></div>;
    
    // Buttons
    case 'glitch-button':
      return <button className={styles.previewBtn}>HOVER</button>;
    case 'chaos-button':
      return <button className={styles.previewChaosBtn}>CHAOS</button>;
    
    // Backgrounds
    case 'noise-canvas':
      return <div className={styles.canvasBox} />;
    case 'light-beams':
      return <div className={styles.beamsBox}><div/><div/><div/></div>;
    case 'glow-orbs':
      return <div className={styles.orbsBox}><div/><div/></div>;
    case 'particle-field':
      return <div className={styles.particlesBox}><div/><div/><div/><div/><div/></div>;
    
    // Effects
    case 'warning-tape':
      return <div className={styles.tapeBox}><span>WARNING • ERROR •</span></div>;
    case 'cursor-follower':
      return <div className={styles.cursorBox}><div className={styles.cursorRing}/><div className={styles.cursorDot}/></div>;
    case 'screen-distortion':
      return <div className={styles.distortBox}><span>DIST</span></div>;
    case 'glowing-border':
      return <div className={styles.glowBorder}><span>GLOW</span></div>;
    case 'glitch-image':
      return <div className={styles.glitchImg}>IMG</div>;
    
    // New Text
    case 'typing-text':
      return <span className={styles.typingText}>TYPE<span className={styles.typingCursor} /></span>;
    case 'char-glitch':
      return <span className={styles.charGlitch}>GL!TCH</span>;
    case 'reveal-text':
      return <span className={styles.revealText}>REVEAL</span>;
    case 'strike-reveal':
      return <span className={styles.strikeReveal}><span>OLD</span><span className={styles.strikeNew}>NEW</span></span>;
    case 'giant-layers':
      return <span className={styles.giantLayers}>BIG</span>;
    case 'blood-drip':
      return <span className={styles.bloodDrip}>DRIP</span>;
    case 'rotate-text':
      return <span className={styles.rotateText}><span>WORD</span></span>;
    case 'ascii-art':
      return <pre className={styles.asciiArt}>{`╔══╗\n║▓▓║\n╚══╝`}</pre>;
    case 'countdown-display':
      return <span className={styles.countdownDisplay}>00:42</span>;
    case 'terminal-output':
      return <div className={styles.terminalOutput}><span className={styles.termPrompt}>❯</span> ls</div>;
    
    // New Navigation
    case 'scattered-nav':
      return <div className={styles.scatteredNav}><span>NAV</span><span>ITEM</span></div>;
    case 'vertical-nav':
      return <div className={styles.verticalNav}><span>ᛟ</span><span>☰</span><span>ᛞ</span></div>;
    case 'brutal-nav':
      return <div className={styles.brutalNav}><span>BRAND</span><span>LINK</span></div>;
    case 'progress-dots':
      return <div className={styles.progressDots}><span/><span className={styles.dotActive}/><span/></div>;
    case 'scroll-indicator':
      return <div className={styles.scrollIndicator}><div className={styles.scrollThumb}/><span>↓</span></div>;
    
    // New Buttons
    case 'dead-button':
      return <div className={styles.deadButton}>DEAD</div>;
    case 'deeper-button':
      return <button className={styles.deeperButton}>DEEPER ↓</button>;
    case 'dual-choice':
      return <div className={styles.dualChoice}><span>OUI</span><span>NON</span></div>;
    case 'cta-brutal':
      return <button className={styles.ctaBrutal}>ACTION</button>;
    case 'tension-bar':
      return <div className={styles.tensionBar}><div className={styles.tensionFill}/></div>;
    
    // New Layout
    case 'horizontal-scroll':
      return <div className={styles.horizontalScroll}><div/><div/><div/></div>;
    case 'void-frame':
      return <div className={styles.voidFrame}><span>✦</span></div>;
    case 'tower-pricing':
      return <div className={styles.towerPricing}><div>$9</div><div className={styles.featured}>$19</div><div>$49</div></div>;
    case 'spec-grid':
      return <div className={styles.specGrid}><span>CPU</span><span>8</span></div>;
    case 'tracklist':
      return <div className={styles.tracklist}><span>01</span><span>Track</span><span>3:42</span></div>;
    
    // Decorative
    case 'rune-symbols':
      return <span className={styles.runeSymbols}>ᛟ ᚨ ᛊ</span>;
    case 'ornaments':
      return <div className={styles.ornaments}><span>—</span><span>✝</span><span>—</span></div>;
    case 'coffee-stain':
      return <div className={styles.coffeeStain}><div className={styles.stainRing}/></div>;
    case 'sheet-music':
      return <div className={styles.sheetMusic}><span>♪</span><span>♫</span><span>𝄞</span></div>;
    case 'inscription':
      return <span className={styles.inscription}>CARVED</span>;
    
    default:
      return <span>{name}</span>;
  }
}
