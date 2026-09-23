import { useEffect, useState } from 'react';
import styles from './PortalLoader.module.css';

const DURATION = 1100;
const DOTS = 16;

/* The contract's loader: percentage counting 0→100 at the bottom-left,
   over the field, no curtain — content stays visible underneath. */
export default function PortalLoader() {
  const [pct, setPct] = useState(0);
  const [closing, setClosing] = useState(false);
  const [gone, setGone] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let timer = 0;
    const t0 = performance.now();

    const tick = (t: number) => {
      const p = Math.min((t - t0) / DURATION, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setClosing(true);
        timer = window.setTimeout(() => setGone(true), 650);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  if (gone) return null;

  const lit = Math.round((pct / 100) * DOTS);

  return (
    <div className={`${styles.overlay} ${closing ? styles.closing : ''}`} aria-hidden="true">
      <div className={styles.hud}>
        <span className={`${styles.tag} label`}>Loading portal</span>
        <span className={styles.pct}>
          {String(pct).padStart(3, '0')}
          <i>%</i>
        </span>
        <span className={styles.dots}>
          {Array.from({ length: DOTS }, (_, i) => (
            <b key={i} className={i < lit ? styles.on : ''} />
          ))}
        </span>
      </div>
    </div>
  );
}
