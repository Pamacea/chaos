import Link from 'next/link';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.about}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>← BACK</Link>
        <h1 className={styles.title}>
          <span className="glitch" data-text="ABOUT">ABOUT</span>
        </h1>
      </header>

      {/* Manifesto */}
      <section className={styles.section}>
        <div className={styles.manifesto}>
          <p className={styles.manifestoLine}>
            The web is too clean.
          </p>
          <p className={styles.manifestoLine}>
            Too polished. Too predictable.
          </p>
          <p className={styles.manifestoLine}>
            Every site looks the same.
          </p>
          <p className={`${styles.manifestoLine} ${styles.accent}`}>
            Chaos is the antidote.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>WHY?</h2>
        <div className={styles.content}>
          <p>
            In 2026, every landing page uses the same components. 
            The same animations. The same gradients. 
            Shadcn made beautiful UI accessible to everyone—which is great—but 
            it also made everything look <em>identical</em>.
          </p>
          <p>
            Chaos exists for the projects that want to stand out. 
            For the artists, the musicians, the game devs, the digital rebels 
            who want their sites to <em>feel</em> different.
          </p>
          <p>
            Glitch effects. Noise textures. Scanlines. Distortion. 
            The visual language of VHS tapes, broken screens, and corrupted files.
          </p>
        </div>
      </section>

      {/* How */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>HOW?</h2>
        <div className={styles.content}>
          <p>
            Like shadcn, Chaos is <strong>not a component library</strong>. 
            It's a collection of copy-paste components that you own.
          </p>
          <p>
            When you run <code>npx chaos add glitch-text</code>, 
            the component files are copied directly into your project. 
            No dependencies. No imports from node_modules. 
            Just your code, in your repo, that you can modify however you want.
          </p>
          <p>
            All effects are pure CSS. No runtime JavaScript. 
            No performance overhead. Just animations that run at 60fps 
            on any modern browser.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>PRINCIPLES</h2>
        <div className={styles.principles}>
          <div className={styles.principle}>
            <span className={styles.principleNum}>01</span>
            <h3>OWNERSHIP</h3>
            <p>You own the code. Modify it. Break it. Make it yours.</p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleNum}>02</span>
            <h3>PERFORMANCE</h3>
            <p>CSS-only effects. No JavaScript runtime. Zero dependencies.</p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleNum}>03</span>
            <h3>SIMPLICITY</h3>
            <p>One component = one folder. Easy to understand, easy to extend.</p>
          </div>
          <div className={styles.principle}>
            <span className={styles.principleNum}>04</span>
            <h3>CHAOS</h3>
            <p>Embrace imperfection. Glitches are features, not bugs.</p>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>CREDITS</h2>
        <div className={styles.content}>
          <p>
            Built by <a href="https://github.com/oalacea" target="_blank" rel="noopener">Oalacea</a>.
          </p>
          <p>
            Inspired by brutalist web design, VHS aesthetics, 
            and every site that dared to look different.
          </p>
          <p>
            Open source. MIT license. Use it however you want.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>Ready to break the rules?</p>
        <Link href="/docs" className={styles.ctaButton}>
          VIEW COMPONENTS →
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <Link href="/" className={styles.footerLink}>HOME</Link>
        <span className={styles.footerSep}>•</span>
        <Link href="/docs" className={styles.footerLink}>DOCS</Link>
        <span className={styles.footerSep}>•</span>
        <a href="https://github.com/oalacea/chaos" className={styles.footerLink}>GITHUB</a>
      </footer>
    </div>
  );
}
