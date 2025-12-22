import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to My World</h1>
        <p className={styles.subtitle}>
          Full Stack Developer | Creative Problem Solver | Tech Enthusiast
        </p>
        <button className={styles.cta}>
          <a href="#projects">View My Work</a>
        </button>
      </div>
    </section>
  );
}
