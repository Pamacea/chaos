import Link from 'next/link';
import { Metadata } from 'next';
import styles from './showcase.module.css';

export const metadata: Metadata = {
  title: 'Chaos UI Showcase - Interactive Component Demo',
  description: 'Experience all 105+ chaotic UI components with live interactive demos. Glitch, noise, neon & brutalist effects.',
};

export default function ShowcasePage() {
  return (
    <div className={styles.showcase}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <span className="glitch" data-text="CHAOS">CHAOS</span>
            <span> UI SHOWCASE</span>
          </h1>
          <p className={styles.subtitle}>
            105+ glitch, noise, neon & brutalist components
          </p>
          <div className={styles.headerBadges}>
            <span className={styles.badge}>CSS Modules</span>
            <span className={styles.badge}>Tailwind</span>
            <span className={styles.badge}>Zero Runtime</span>
          </div>
        </div>
        <Link href="/" className={styles.backLink}>
          ← HOME
        </Link>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Quick Stats */}
        <section className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>105+</span>
            <span className={styles.statLabel}>Components</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>14</span>
            <span className={styles.statLabel}>Categories</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>2</span>
            <span className={styles.statLabel}>Variants</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>0</span>
            <span className={styles.statLabel}>Runtime</span>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className={styles.demo}>
          <h2 className={styles.sectionTitle}>Interactive Demo</h2>
          <p className={styles.sectionDesc}>
            Experience the chaotic effects in real-time. Hover, click, and interact.
          </p>

          <div className={styles.demoGrid}>
            {/* Background Effects */}
            <div className={styles.demoCard}>
              <h3 className={styles.cardTitle}>Background Effects</h3>
              <div className={styles.demoPreview}>
                <div className={styles.previewBg}>
                  <div className={styles.orb}></div>
                  <div className={styles.orb}></div>
                  <div className={styles.orb}></div>
                </div>
              </div>
              <ul className={styles.featureList}>
                <li>✨ Glowing Orbs - Animated radial gradients</li>
                <li>⚡ Light Beams - Diagonal perspective rays</li>
                <li>🎨 Noise Canvas - Procedural generation</li>
                <li>✨ Particle Field - Connected particles</li>
              </ul>
              <Link href="/docs/backgrounds" className={styles.demoLink}>
                Explore →
              </Link>
            </div>

            {/* Buttons */}
            <div className={styles.demoCard}>
              <h3 className={styles.cardTitle}>Chaotic Buttons</h3>
              <div className={styles.demoPreview}>
                <button className={`${styles.demoButton} ${styles.chaosButton}`}>
                  CHAOS
                </button>
                <button className={`${styles.demoButton} ${styles.glitchButton}`}>
                  GLITCH
                </button>
              </div>
              <ul className={styles.featureList}>
                <li>🎛️ Chaos Button - Debris animation</li>
                <li>⚡ Glitch Button - RGB splitting</li>
                <li>🎯 Hover effects</li>
                <li>⚡ CSS animations only</li>
              </ul>
              <Link href="/docs/buttons" className={styles.demoLink}>
                Explore →
              </Link>
            </div>

            {/* Overlays */}
            <div className={styles.demoCard}>
              <h3 className={styles.cardTitle}>Overlay Effects</h3>
              <div className={styles.demoPreview}>
                <div className={styles.overlayDemo}>
                  <div className={styles.scanlines}></div>
                  <div className={styles.vignette}></div>
                </div>
              </div>
              <ul className={styles.featureList}>
                <li>📺 Noise Overlay - SVG fractal noise</li>
                <li>📺 Scanlines - CRT horizontal lines</li>
                <li>⚡ Static Flicker - Random opacity</li>
                <li>🌑 Vignette - Dark edge focus</li>
              </ul>
              <Link href="/docs/overlays" className={styles.demoLink}>
                Explore →
              </Link>
            </div>

            {/* Text Effects */}
            <div className={styles.demoCard}>
              <h3 className={styles.cardTitle}>Text Effects</h3>
              <div className={styles.demoPreview}>
                <div className={styles.textDemo}>
                  <span className="glitch-text" data-text="GLITCH">GLITCH</span>
                  <br />
                  <span className="distortion-text">WAVE</span>
                  <br />
                  <span className="falling-text">CASCADE</span>
                </div>
              </div>
              <ul className={styles.featureList}>
                <li>⚡ Glitch Text - RGB separation</li>
                <li>🌊 Distortion Text - Wave movement</li>
                <li>✨ Flicker Text - Random opacity</li>
                <li>⬇️ Falling Text - Matrix cascade</li>
              </ul>
              <Link href="/docs/text-effects" className={styles.demoLink}>
                Explore →
              </Link>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className={styles.install}>
          <h2 className={styles.sectionTitle}>Quick Installation</h2>
          <div className={styles.installSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Add Component</h3>
                <code className={styles.code}>
                  npx @panacea/chaosui add glitch-button
                </code>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Import & Use</h3>
                <pre className={styles.codeBlock}>
{`import { GlitchButton } from './components/chaos/buttons/glitch-button';

<GlitchButton intensity="high">
  CLICK ME
</GlitchButton>`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* All Components Grid */}
        <section className={styles.components}>
          <h2 className={styles.sectionTitle}>All Components</h2>
          <p className={styles.sectionDesc}>
            Click on any category to explore all available components
          </p>

          <div className={styles.componentGrid}>
            <Link href="/docs/neon-glow" className={styles.componentCard}>
              <div className={styles.componentIcon}>💡</div>
              <h3 className={styles.componentName}>Neon & Glow</h3>
              <p className={styles.componentDesc}>7 components</p>
            </Link>

            <Link href="/docs/cyber-tech" className={styles.componentCard}>
              <div className={styles.componentIcon}>🤖</div>
              <h3 className={styles.componentName}>Cyber Tech</h3>
              <p className={styles.componentDesc}>6 components</p>
            </Link>

            <Link href="/docs/backgrounds" className={styles.componentCard}>
              <div className={styles.componentIcon}>🌌</div>
              <h3 className={styles.componentName}>Backgrounds</h3>
              <p className={styles.componentDesc}>6 components</p>
            </Link>

            <Link href="/docs/overlays" className={styles.componentCard}>
              <div className={styles.componentIcon}>🎭️</div>
              <h3 className={styles.componentName}>Overlays</h3>
              <p className={styles.componentDesc}>4 components</p>
            </Link>

            <Link href="/docs/text-effects" className={styles.componentCard}>
              <div className={styles.componentIcon}>✨</div>
              <h3 className={styles.componentName}>Text Effects</h3>
              <p className={styles.componentDesc}>21 components</p>
            </Link>

            <Link href="/docs/buttons" className={styles.componentCard}>
              <div className={styles.componentIcon}>🎛️</div>
              <h3 className={styles.componentName}>Buttons</h3>
              <p className={styles.componentDesc}>7 components</p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <Link href="/" className={styles.footerLink}>
            ← Back to Home
          </Link>
          <span className={styles.footerSeparator}>•</span>
          <a href="https://github.com/panacea/chaos" className={styles.footerLink}>
            GitHub
          </a>
        </footer>
      </main>
    </div>
  );
}
