import Link from 'next/link';
import { Metadata } from 'next';
import styles from './docs.module.css';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Browse 120+ glitch, noise, and distortion UI components. Pure CSS, no dependencies. Copy-paste installation.',
  openGraph: {
    title: 'CHAOS Documentation',
    description: 'Browse all available components — from glitch text to neon buttons, scanlines to noise overlays.',
  },
};

const COMPONENTS = {
  'neon-glow': {
    title: 'NEON & GLOW',
    items: [
      { name: 'neon-button', description: 'Glowing neon button' },
      { name: 'neon-badge', description: 'Luminous status badge' },
      { name: 'neon-progress', description: 'Glowing progress bar' },
      { name: 'neon-toggle', description: 'Neon on/off switch' },
      { name: 'neon-alert', description: 'Neon notifications' },
      { name: 'neon-tabs', description: 'Glowing tab navigation' },
      { name: 'neon-divider', description: 'Luminous dividers' },
      { name: 'glowing-border', description: 'Glowing container' },
    ],
  },
  'cyber-tech': {
    title: 'CYBER & TECH',
    items: [
      { name: 'cyber-input', description: 'Animated input field' },
      { name: 'cyber-loader', description: 'Futuristic spinners' },
      { name: 'cyber-modal', description: 'Modal with scanlines' },
      { name: 'cyber-avatar', description: 'Neon avatar frame' },
      { name: 'cyber-slider', description: 'Neon range slider' },
      { name: 'cyber-tooltip', description: 'Terminal tooltips' },
      { name: 'hologram-card', description: 'Holographic card' },
      { name: 'data-grid', description: 'Terminal data table' },
      { name: 'spec-grid', description: 'Terminal spec display' },
    ],
  },
  'glitch-chaos': {
    title: 'GLITCH & CHAOS',
    items: [
      { name: 'glitch-text', description: 'RGB split glitch effect' },
      { name: 'glitch-button', description: 'Glitch on hover' },
      { name: 'chaos-button', description: 'Chaotic with debris' },
      { name: 'glitch-image', description: 'RGB glitch on hover' },
      { name: 'char-glitch', description: 'Per-character glitch' },
      { name: 'screen-distortion', description: 'Full screen fx' },
      { name: 'warning-tape', description: 'Scrolling banner' },
    ],
  },
  'dark-horror': {
    title: 'DARK & HORROR',
    items: [
      { name: 'blood-drip', description: 'Dripping blood effect' },
      { name: 'dead-button', description: 'Destroyed aesthetic' },
      { name: 'giant-layers', description: 'Layered shadow text' },
      { name: 'deeper-button', description: 'Deep descent CTA' },
    ],
  },
  'terminal-ascii': {
    title: 'TERMINAL & ASCII',
    items: [
      { name: 'terminal-output', description: 'Terminal console' },
      { name: 'ascii-art', description: 'ASCII art display' },
      { name: 'countdown-display', description: 'Countdown timer' },
    ],
  },
  'text-animations': {
    title: 'TEXT ANIMATIONS',
    items: [
      { name: 'flicker-text', description: 'Random opacity flicker' },
      { name: 'distortion-text', description: 'Wave/shake/skew/blur' },
      { name: 'falling-text', description: 'Cascading letters' },
      { name: 'typing-text', description: 'Typewriter animation' },
      { name: 'reveal-text', description: 'Scroll reveal animation' },
      { name: 'strike-reveal', description: 'Strikethrough reveal' },
      { name: 'rotate-text', description: 'Word rotation carousel' },
    ],
  },
  'text-effects': {
    title: 'TEXT EFFECTS',
    items: [
      { name: 'breathing-text', description: 'Breathing animation' },
      { name: 'handwritten-text', description: 'Handwriting style' },
      { name: 'scramble-text', description: 'Text scramble effect' },
      { name: 'stroke-text', description: 'Outlined text effect' },
      { name: 'word-by-word-reveal', description: 'Word by word reveal' },
      { name: 'shadow-glitch', description: 'Shadow glitch effect' },
      { name: 'split-text', description: 'Split text animation' },
      { name: 'living-text', description: 'Text that dies and becomes ghosts' },
      { name: 'brutal-manifest', description: 'Brutalist boxed text manifesto' },
      { name: 'echo-chat', description: 'Chat with echo distortion' },
      { name: 'text-distorter', description: 'Real-time text distortion' },
    ],
  },
  'navigation': {
    title: 'NAVIGATION',
    items: [
      { name: 'scattered-nav', description: 'Scattered chaotic nav' },
      { name: 'vertical-nav', description: 'Rune vertical sidebar' },
      { name: 'brutal-nav', description: 'Bold brutalist navbar' },
      { name: 'progress-dots', description: 'Section progress dots' },
      { name: 'scroll-indicator', description: 'Scroll position tracker' },
      { name: 'corner-nav', description: 'Corner-positioned nav' },
      { name: 'minimal-nav', description: 'Minimalist navigation' },
      { name: 'timeline-nav', description: 'Timeline-style navigation' },
      { name: 'collapsed-nav', description: 'Collapse-inspired dispersed nav' },
      { name: 'magnetic-dock', description: 'Floating dock with magnetic attraction' },
      { name: 'corner-tabs', description: 'Corner-positioned tabs' },
    ],
  },
  'backgrounds': {
    title: 'BACKGROUNDS',
    items: [
      { name: 'noise-canvas', description: 'Animated noise canvas' },
      { name: 'particle-field', description: 'Drifting particles' },
      { name: 'glow-orbs', description: 'Floating blurred orbs' },
      { name: 'gradient-mesh', description: 'Gradient mesh background' },
      { name: 'noise-pattern', description: 'Noise pattern overlay' },
      { name: 'starfield', description: 'Animated starfield' },
    ],
  },
  'overlays': {
    title: 'OVERLAYS',
    items: [
      { name: 'noise-overlay', description: 'SVG fractal noise' },
      { name: 'scanlines', description: 'CRT horizontal lines' },
      { name: 'scanlines-overlay', description: 'Scanline effect overlay' },
      { name: 'vignette', description: 'Dark edges gradient' },
      { name: 'static-flicker', description: 'Animated TV static' },
    ],
  },
  'effects': {
    title: 'EFFECTS',
    items: [
      { name: 'cursor-follower', description: 'Custom cursor follower' },
      { name: 'cursor-trail', description: 'Multi-element cursor trail effect' },
      { name: 'inverted-cursor', description: 'Color inverting ring cursor' },
      { name: 'cursor-magnet', description: 'Magnetic cursor attraction' },
      { name: 'cursor-spotlight', description: 'Spotlight following cursor' },
      { name: 'chromatic-aberration', description: 'RGB chromatic effect' },
      { name: 'glass-crack', description: 'Glass shatter effect' },
      { name: 'radar-scan', description: 'Radar scanning animation' },
      { name: 'ghost-layer', description: 'Revealable ghost text layer' },
      { name: 'flash-effect', description: 'Full-screen flash overlay' },
      { name: 'light-beams', description: 'Animated light beam effects' },
      { name: 'mosaic-grid', description: 'Interactive mosaic tiles' },
      { name: 'tape-border', description: 'Warning tape borders' },
      { name: 'rgb-shift', description: 'RGB color shift effect' },
    ],
  },
  'layout-cards': {
    title: 'LAYOUT & CARDS',
    items: [
      { name: 'horizontal-scroll', description: 'Horizontal panel scroll' },
      { name: 'horizontal-panel-scroll', description: 'Panel scroll container' },
      { name: 'void-frame', description: 'Decorative corner frame' },
      { name: 'tower-pricing', description: 'Vertical pricing tiers' },
      { name: 'tracklist', description: 'Music tracklist layout' },
      { name: 'glass-container', description: 'Glass morphism container' },
      { name: 'phase-container', description: 'Phase transition container' },
      { name: 'broken-grid', description: 'Chaotic offset grid layout' },
      { name: 'broken-grid-chaos', description: 'Heavily chaotic grid with collapse inspiration' },
      { name: 'strata-section', description: 'Geological layer sections' },
    ],
  },
  'decorative': {
    title: 'DECORATIVE',
    items: [
      { name: 'rune-symbols', description: 'Elder Futhark runes' },
      { name: 'ornaments', description: 'Decorative dividers' },
      { name: 'sheet-music', description: 'Floating music notes' },
      { name: 'inscription', description: 'Carved stone text' },
      { name: 'coffee-stain', description: 'Coffee stain effect' },
      { name: 'document-stamp', description: 'Document stamp effect' },
      { name: 'marginalia', description: 'Margin annotations' },
      { name: 'paper-edges', description: 'Aged paper edges' },
    ],
  },
  'buttons-controls': {
    title: 'BUTTONS & CONTROLS',
    items: [
      { name: 'dual-choice', description: 'Yes/No binary choice' },
      { name: 'cta-brutal', description: 'Brutalist call-to-action' },
      { name: 'tension-bar', description: 'Progress tension meter' },
      { name: 'tension-meter', description: 'Tension gauge meter' },
      { name: 'magnetic-button', description: 'Button with magnetic pull' },
    ],
  },
  'inputs': {
    title: 'INPUTS',
    items: [
      { name: 'chat-interface', description: 'Chat message input' },
      { name: 'secret-reveal', description: 'Hidden content reveal' },
      { name: 'draggable-document', description: 'Draggable paper document' },
    ],
  },
  'display': {
    title: 'DISPLAY',
    items: [
      { name: 'countdown-timer', description: 'Countdown display' },
      { name: 'countdown-phase', description: 'Multi-phase countdown with progress' },
      { name: 'terminal-message', description: 'Terminal message' },
      { name: 'depth-indicator', description: 'Vertical depth progress indicator' },
    ],
  },
};

const totalComponents = Object.values(COMPONENTS).reduce((sum, cat) => sum + cat.items.length, 0);

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
        {Object.entries(COMPONENTS).map(([key, category]) => (
          <section key={key} className={styles.category}>
            <h2 className={styles.categoryTitle}>{category.title}</h2>
            <div className={styles.componentGrid}>
              {category.items.map((comp) => (
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
    // Neon & Glow
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
    case 'glowing-border':
      return <div className={styles.glowBorder}><span>GLOW</span></div>;
    // Backgrounds
    case 'gradient-mesh':
      return <div className={styles.meshBox} />;
    case 'noise-pattern':
      return <div className={styles.noisePatternBox}><span>NOISE</span></div>;
    case 'starfield':
      return <div className={styles.starfieldBox}><div/><div/><div/><div/></div>;
    case 'glow-orbs':
      return <div className={styles.orbsBox}><div/><div/></div>;
    
    // Cyber & Tech
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
    case 'hologram-card':
      return <div className={styles.holoCard}><span>HOLO</span></div>;
    case 'data-grid':
      return <div className={styles.dataGrid}><div/><div/><div/></div>;
    case 'spec-grid':
      return <div className={styles.specGrid}><span>CPU</span><span>8</span></div>;
    
    // Glitch & Chaos
    case 'glitch-text':
      return <span className={`${styles.previewText} glitch`} data-text="GLITCH">GLITCH</span>;
    case 'glitch-button':
      return <button className={styles.previewBtn}>HOVER</button>;
    case 'chaos-button':
      return <button className={styles.previewChaosBtn}>CHAOS</button>;
    case 'glitch-image':
      return <div className={styles.glitchImg}>IMG</div>;
    case 'char-glitch':
      return <span className={styles.charGlitch}>GL!TCH</span>;
    case 'screen-distortion':
      return <div className={styles.distortBox}><span>DIST</span></div>;
    case 'warning-tape':
      return <div className={styles.tapeBox}><span>WARNING • ERROR •</span></div>;
    
    // Dark & Horror
    case 'blood-drip':
      return <span className={styles.bloodDrip}>DRIP</span>;
    case 'dead-button':
      return <div className={styles.deadButton}>DEAD</div>;
    case 'giant-layers':
      return <span className={styles.giantLayers}>BIG</span>;
    case 'deeper-button':
      return <button className={styles.deeperButton}>DEEPER ↓</button>;
    
    // Terminal & ASCII
    case 'terminal-output':
      return <div className={styles.terminalOutput}><span className={styles.termPrompt}>❯</span> ls</div>;
    case 'ascii-art':
      return <pre className={styles.asciiArt}>{`╔══╗\n║▓▓║\n╚══╝`}</pre>;
    case 'countdown-display':
      return <span className={styles.countdownDisplay}>00:42</span>;
    
    // Text Animations
    case 'flicker-text':
      return <span className={`${styles.previewText} flicker`}>FLICKER</span>;
    case 'distortion-text':
      return <span className={`${styles.previewText} ${styles.waveText}`}>WAVE</span>;
    case 'falling-text':
      return <span className={`${styles.previewText} ${styles.fallText}`}>FALL</span>;
    case 'typing-text':
      return <span className={styles.typingText}>TYPE<span className={styles.typingCursor} /></span>;
    case 'reveal-text':
      return <span className={styles.revealText}>REVEAL</span>;
    case 'strike-reveal':
      return <span className={styles.strikeReveal}><span>OLD</span><span className={styles.strikeNew}>NEW</span></span>;
    case 'rotate-text':
      return <span className={styles.rotateText}><span>WORD</span></span>;
    
    // Navigation
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
    
    // Background & Overlays
    case 'noise-canvas':
      return <div className={styles.canvasBox} />;
    case 'particle-field':
      return <div className={styles.particlesBox}><div/><div/><div/><div/><div/></div>;
    case 'noise-overlay':
      return <div className={styles.noiseBox}><span>NOISE</span></div>;
    case 'scanlines':
      return <div className={styles.scanlinesBox}><span>SCAN</span></div>;
    case 'vignette':
      return <div className={styles.vignetteBox}><span>VIGN</span></div>;
    case 'static-flicker':
      return <div className={styles.staticBox}><span>STATIC</span></div>;
    
    // Layout & Cards
    case 'horizontal-scroll':
      return <div className={styles.horizontalScroll}><div/><div/><div/></div>;
    case 'void-frame':
      return <div className={styles.voidFrame}><span>✦</span></div>;
    case 'tower-pricing':
      return <div className={styles.towerPricing}><div>$9</div><div className={styles.featured}>$19</div><div>$49</div></div>;
    case 'tracklist':
      return <div className={styles.tracklist}><span>01</span><span>Track</span><span>3:42</span></div>;
    
    // Decorative
    case 'rune-symbols':
      return <span className={styles.runeSymbols}>ᛟ ᚨ ᛊ</span>;
    case 'ornaments':
      return <div className={styles.ornaments}><span>—</span><span>✝</span><span>—</span></div>;
    case 'sheet-music':
      return <div className={styles.sheetMusic}><span>♪</span><span>♫</span><span>𝄞</span></div>;
    case 'inscription':
      return <span className={styles.inscription}>CARVED</span>;
    
    // Buttons & Controls
    case 'dual-choice':
      return <div className={styles.dualChoice}><span>OUI</span><span>NON</span></div>;
    case 'cta-brutal':
      return <button className={styles.ctaBrutal}>ACTION</button>;
    case 'tension-bar':
      return <div className={styles.tensionBar}><div className={styles.tensionFill}/></div>;

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

    // NEW NAVIGATION
    case 'corner-nav':
      return <div className={styles.cornerNavBox}><span>☰</span></div>;
    case 'minimal-nav':
      return <div className={styles.minimalNavBox}><span>Home</span><span>About</span></div>;
    case 'timeline-nav':
      return <div className={styles.timelineNavBox}><div/><div className={styles.timelineActive}/><div/></div>;

    // NEW BACKGROUNDS
    case 'gradient-mesh':
      return <div className={styles.meshBox} />;
    case 'noise-pattern':
      return <div className={styles.noisePatternBox}><span>NOISE</span></div>;
    case 'starfield':
      return <div className={styles.starfieldBox}><div/><div/><div/><div/></div>;

    // NEW OVERLAYS
    case 'scanlines-overlay':
      return <div className={styles.scanlinesOverlayBox}><span>SCAN</span></div>;

    // NEW EFFECTS
    case 'chromatic-aberration':
      return <div className={styles.chromaticBox}><span>RGB</span></div>;
    case 'glass-crack':
      return <div className={styles.glassCrackBox}><span>CRACK</span></div>;
    case 'radar-scan':
      return <div className={styles.radarBox}><div className={styles.radarSweep}/></div>;

    // NEW LAYOUT
    case 'horizontal-panel-scroll':
      return <div className={styles.panelScrollBox}><div/><div/><div/></div>;
    case 'glass-container':
      return <div className={styles.glassContainerBox}><span>GLASS</span></div>;
    case 'phase-container':
      return <div className={styles.phaseContainerBox}><span>PHASE</span></div>;

    // NEW DECORATIVE
    case 'coffee-stain':
      return <div className={styles.coffeeStainBox}><div className={styles.stainRing}/></div>;
    case 'document-stamp':
      return <div className={styles.documentStampBox}><span>STAMP</span></div>;
    case 'marginalia':
      return <div className={styles.marginaliaBox}><span>Note</span></div>;
    case 'paper-edges':
      return <div className={styles.paperEdgesBox}><span>PAPER</span></div>;

    // NEW BUTTONS
    case 'tension-meter':
      return <div className={styles.tensionMeterBox}><div className={styles.tensionMeterFill}/></div>;

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

    // EXTRA TEXT
    case 'shadow-glitch':
      return <span className={styles.shadowGlitch}>GLITCH</span>;
    case 'split-text':
      return <span className={styles.splitText}><span>SPLIT</span></span>;

    // NEW CHAOS COMPONENTS
    case 'living-text':
      return <span className={styles.livingTextPreview}><span className={styles.livingTextAlive}>ALIVE</span><span className={styles.livingTextGhost}>GHOST</span></span>;
    case 'brutal-manifest':
      return <div className={styles.brutalManifestPreview}><span className={styles.brutalBox}>NO</span><span className={styles.brutalBox}>RULES</span></div>;

    // NEW LAYOUT
    case 'strata-section':
      return <div className={styles.strataPreview}><span>STRATA</span></div>;
    case 'broken-grid':
    case 'broken-grid-chaos':
      return <div className={styles.brokenGridPreview}><div className={styles.brokenGridItem}><span>01</span></div><div className={styles.brokenGridItem}><span>02</span></div><div className={styles.brokenGridItem}><span>03</span></div></div>;

    // NEW NAVIGATION
    case 'collapsed-nav':
      return <div className={styles.collapsedNavPreview}><span className={styles.collapsedNavItem}>COLLAPSE</span></div>;

    // NEW INPUTS
    case 'draggable-document':
      return <div className={styles.draggableDocPreview}><span>DOC</span></div>;

    // NEW EFFECTS
    case 'ghost-layer':
      return <div className={styles.ghostLayerPreview}><span className={styles.ghostText}>GHOST</span></div>;
    case 'cursor-trail':
      return <div className={styles.cursorTrailPreview}><div className={styles.trailDot}/><div className={styles.trailDot}/><div className={styles.trailDot}/></div>;
    case 'flash-effect':
      return <div className={styles.flashEffectPreview}><span>FLASH</span></div>;

    // EFFECTS (existing but missing)
    case 'cursor-follower':
      return <div className={styles.cursorPreview}><div/><div/></div>;

    // DISPLAY
    case 'depth-indicator':
      return <div className={styles.depthIndicatorPreview}>DEPTH</div>;

    // NEW COMPONENTS - Navigation
    case 'magnetic-dock':
      return <div className={styles.magneticDockPreview}><span className={styles.dockItem}>HOME</span><span className={styles.dockItem}>WORK</span><span className={styles.dockItem}>ABOUT</span></div>;
    case 'corner-tabs':
      return <div className={styles.cornerTabsPreview}><span className={styles.cornerTabActive}>TAB 1</span><span>TAB 2</span></div>;

    // NEW COMPONENTS - Text
    case 'echo-chat':
      return <div className={styles.echoChatPreview}><div className={styles.echoMessage}>Hello...</div><div className={styles.echoEcho}>Hello...</div></div>;
    case 'text-distorter':
      return <span className={styles.textDistorterPreview}>DISTORT</span>;

    // NEW COMPONENTS - Display
    case 'countdown-phase':
      return <div className={styles.countdownPhasePreview}><div className={styles.phaseNumber}>42</div><div className={styles.phaseLabel}>SECONDS</div></div>;

    // NEW COMPONENTS - Effects
    case 'light-beams':
      return <div className={styles.lightBeamsPreview}><div className={styles.beam}/><div className={styles.beam}/><div className={styles.beam}/></div>;
    case 'mosaic-grid':
      return <div className={styles.mosaicGridPreview}><div className={styles.mosaicTile}/><div className={styles.mosaicTile}/><div className={styles.mosaicTile}/><div className={styles.mosaicTile}/></div>;
    case 'tape-border':
      return <div className={styles.tapeBorderPreview}><span>BORDER</span></div>;
    case 'rgb-shift':
      return <div className={styles.rgbShiftPreview}><span>RGB</span></div>;

    // NEW COMPONENTS - Cursors
    case 'inverted-cursor':
      return <div className={styles.invertedCursorPreview}><div className={styles.invertedRing}/></div>;
    case 'cursor-magnet':
      return <div className={styles.cursorMagnetPreview}><div className={styles.magnetItem}>ITEM</div></div>;
    case 'cursor-spotlight':
      return <div className={styles.cursorSpotlightPreview}><div className={styles.spotlight}/><span>TEXT</span></div>;

    // NEW COMPONENTS - Buttons (magnetic-button may already exist)
    case 'magnetic-button':
      return <button className={styles.magneticButtonPreview}>MAGNETIC</button>;

    default:
      return <span>{name}</span>;
  }
}
