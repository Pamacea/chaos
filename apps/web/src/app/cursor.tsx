'use client';

import { useEffect, useRef } from 'react';
import styles from './page.module.css';

export function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const outer = outerRef.current;
    const inner = innerRef.current;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (inner) {
        inner.style.left = mouseX + 'px';
        inner.style.top = mouseY + 'px';
      }
    };

    function animate() {
      if (!outer) return;
      outerX += (mouseX - outerX) * 0.15;
      outerY += (mouseY - outerY) * 0.15;
      outer.style.left = outerX + 'px';
      outer.style.top = outerY + 'px';
      animationId = requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    const links = document.querySelectorAll('a, button');
    const handleMouseEnter = () => {
      if (!outer) return;
      outer.style.transform = 'translate(-50%, -50%) scale(2)';
      outer.style.borderColor = '#ff0040';
    };
    const handleMouseLeave = () => {
      if (!outer) return;
      outer.style.transform = 'translate(-50%, -50%) scale(1)';
      outer.style.borderColor = '#fff';
    };

    links.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', handleMouseMove);
      links.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className={styles.cursorOuter} id="cursor-outer" />
      <div ref={innerRef} className={styles.cursorInner} id="cursor-inner" />
    </>
  );
}
