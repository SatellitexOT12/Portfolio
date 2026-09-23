import { fireDissolve } from '../hooks/useActiveSection';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Oscar</h1>
        <p className={styles.role}>Software Engineer · Full Stack Developer</p>
        <p className={styles.stack}>React · TypeScript · Python · Django · PostgreSQL</p>
        <div className={styles.actions}>
          <a
            className={styles.btnPrimary}
            href="mailto:garciaoscargfa@gmail.com"
          >
            Contact
          </a>
          <a className={styles.btnGhost} href="#projects" onClick={fireDissolve}>
            View projects
          </a>
        </div>
      </div>
    </section>
  );
}
