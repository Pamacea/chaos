import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.chaos}>
      {/* Custom cursor */}
      <div className={styles.cursorOuter} id="cursor-outer" />
      <div className={styles.cursorInner} id="cursor-inner" />

      {/* Floating debris */}
      <div className={styles.debris}>
        <span className={styles.debrisItem} style={{ top: '15%', left: '8%', animationDelay: '0s' }}>ERR</span>
        <span className={styles.debrisItem} style={{ top: '45%', right: '12%', animationDelay: '-2s' }}>0x</span>
        <span className={styles.debrisItem} style={{ bottom: '30%', left: '15%', animationDelay: '-4s' }}>NULL</span>
        <span className={styles.debrisItem} style={{ top: '70%', right: '20%', animationDelay: '-1s' }}>////</span>
        <span className={styles.debrisItem} style={{ top: '25%', right: '35%', animationDelay: '-3s' }}>?</span>
        <div className={styles.debrisBlock} style={{ top: '20%', right: '8%' }} />
        <div className={styles.debrisBlock} style={{ bottom: '15%', left: '5%', width: '3px', height: '80px' }} />
        <div className={styles.debrisBlock} style={{ top: '60%', left: '25%', width: '60px', height: '2px' }} />
      </div>

      {/* Glitch lines */}
      <div className={styles.glitchLines}>
        <div className={styles.glitchLine} style={{ top: '23%' }} />
        <div className={styles.glitchLine} style={{ top: '47%' }} />
        <div className={styles.glitchLine} style={{ top: '71%' }} />
      </div>

      {/* Vertical nav - bottom left */}
      <nav className={styles.nav}>
        <Link href="/docs" className={styles.navLink}>
          <span className={styles.navIndex}>01</span>
          <span className={styles.navText}>DOCS</span>
        </Link>
        <Link href="/about" className={styles.navLink}>
          <span className={styles.navIndex}>02</span>
          <span className={styles.navText}>ABOUT</span>
        </Link>
        <a href="https://github.com/oalacea/chaos" className={styles.navLink} target="_blank" rel="noopener">
          <span className={styles.navIndex}>03</span>
          <span className={styles.navText}>GIT</span>
        </a>
      </nav>

      {/* Main content - scattered */}
      <main className={styles.main}>
        {/* Tagline - top area */}
        <p className={styles.tagline}>
          <span className={styles.taglineGlitch}>UI FOR THE</span>
          <br />
          <span className={styles.taglineAccent}>VOID</span>
        </p>

        {/* Center chaos */}
        <div className={styles.center}>
          {/* Broken buttons */}
          <div className={styles.buttonCluster}>
            <BrokenButton href="/docs">
              DOCS
            </BrokenButton>
            <BrokenButton href="/about" variant="ghost">
              MORE
            </BrokenButton>
          </div>

          {/* Install command - floating */}
          <div className={styles.installBlock} id="install">
            <div className={styles.installNoise} />
            <code>npx @oalacea/chaosui add</code>
            <span className={styles.installCursor}>_</span>
          </div>
        </div>

        {/* Scattered info */}
        <div className={styles.infoScatter}>
          <div className={styles.infoBlock} style={{ top: '20%', left: '5%' }}>
            <span className={styles.infoLabel}>COMPONENTS</span>
            <span className={styles.infoValue}>30</span>
          </div>
          <div className={styles.infoBlock} style={{ top: '35%', right: '8%' }}>
            <span className={styles.infoLabel}>RUNTIME</span>
            <span className={styles.infoValue}>0KB</span>
          </div>
          <div className={styles.infoBlock} style={{ bottom: '25%', left: '12%' }}>
            <span className={styles.infoLabel}>DEPS</span>
            <span className={styles.infoValue}>NONE</span>
          </div>
        </div>
      </main>

      {/* Title - bottom right */}
      <h1 className={styles.title}>
        <span className={styles.titleMain} data-text="CHAOS">CHAOS</span>
        <span className={styles.titleSub}>COMPONENTS</span>
      </h1>

      {/* Warning tape - diagonal */}
      <div className={styles.tape}>
        <span>{'SYSTEM UNSTABLE • VISUAL CORRUPTION • EMBRACE CHAOS • '.repeat(15)}</span>
      </div>

      {/* Cursor script */}
      <script dangerouslySetInnerHTML={{ __html: `
        (function() {
          const outer = document.getElementById('cursor-outer');
          const inner = document.getElementById('cursor-inner');
          let mouseX = 0, mouseY = 0;
          let outerX = 0, outerY = 0;
          
          document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            inner.style.left = mouseX + 'px';
            inner.style.top = mouseY + 'px';
          });
          
          function animate() {
            outerX += (mouseX - outerX) * 0.15;
            outerY += (mouseY - outerY) * 0.15;
            outer.style.left = outerX + 'px';
            outer.style.top = outerY + 'px';
            requestAnimationFrame(animate);
          }
          animate();
          
          document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
              outer.style.transform = 'translate(-50%, -50%) scale(2)';
              outer.style.borderColor = '#ff0040';
            });
            el.addEventListener('mouseleave', () => {
              outer.style.transform = 'translate(-50%, -50%) scale(1)';
              outer.style.borderColor = '#fff';
            });
          });
        })();
      `}} />
    </div>
  );
}

function BrokenButton({ 
  children, 
  href, 
  variant = 'default' 
}: { 
  children: React.ReactNode; 
  href: string;
  variant?: 'default' | 'ghost';
}) {
  return (
    <Link href={href} className={`${styles.brokenBtn} ${styles[variant]}`}>
      {/* Excess matter */}
      <div className={styles.btnExcess1} />
      <div className={styles.btnExcess2} />
      <div className={styles.btnExcess3} />
      <div className={styles.btnGlitchSlice} />
      
      {/* Noise layer */}
      <div className={styles.btnNoise} />
      
      {/* Content */}
      <span className={styles.btnText}>{children}</span>
      
      {/* Glitch layers */}
      <span className={styles.btnGlitch1}>{children}</span>
      <span className={styles.btnGlitch2}>{children}</span>
    </Link>
  );
}
