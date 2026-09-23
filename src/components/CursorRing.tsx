import { useEffect, useRef } from 'react';
import styles from './CursorRing.module.css';

/* The signature: an ember ring trailing the pointer while the shader
   field warps beneath it. Fine pointers and motion-allowed only;
   reduced motion and coarse pointers keep the native cursor. */
export default function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add('ring-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add(styles.live);
    };

    const onOver = (e: MouseEvent) => {
      const hot = (e.target as HTMLElement | null)?.closest?.('a, button');
      el.classList.toggle(styles.hot, Boolean(hot));
    };

    const tick = () => {
      x += (tx - x) * 0.24;
      y += (ty - y) * 0.24;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.documentElement.classList.remove('ring-cursor');
    };
  }, []);

  return <div ref={ref} className={styles.ring} aria-hidden="true" />;
}
