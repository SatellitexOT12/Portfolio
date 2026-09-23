import { useEffect, useRef } from 'react';
import type { SectionId } from '../hooks/useActiveSection';
import styles from './SceneReadout.module.css';

const SCENE_NAME: Record<SectionId, string> = {
  hero: 'Home',
  about: 'Profile',
  projects: 'Work',
  contact: 'Contact',
};

interface Props {
  active: SectionId;
}

/* Right-margin readout: scroll progress on the axis, current scene
   named below. Decorative duplicate of nav state, hence hidden from AT. */
export default function SceneReadout({ active }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const read = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const frac = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      el.style.setProperty('--progress', String(frac));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    read();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <aside ref={ref} className={styles.readout} aria-hidden="true">
      <span className={styles.vertical}>Scroll</span>
      <span className={styles.track}>
        <span className={styles.knob} />
      </span>
      <span className={styles.env}>
        <span className={`${styles.envLabel} label`}>Scene</span>
        <strong className={styles.envName}>{SCENE_NAME[active]}</strong>
        <span className={styles.live}>
          <i className={styles.blink} />
          Active
        </span>
      </span>
    </aside>
  );
}
