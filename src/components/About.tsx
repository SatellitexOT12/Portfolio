import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>
        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              I'm a passionate developer with 5+ years of experience building web applications.
              I specialize in creating responsive, user-friendly interfaces and scalable backend solutions.
            </p>
            <p>
              My expertise includes React, TypeScript, Node.js, and modern web development tools.
              I'm committed to writing clean, maintainable code and staying updated with industry best practices.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open source,
              or sharing knowledge with the developer community.
            </p>
          </div>
          <div className={styles.skills}>
            <h3>Skills</h3>
            <div className={styles.skillsList}>
              <span className={styles.skill}>React</span>
              <span className={styles.skill}>TypeScript</span>
              <span className={styles.skill}>Node.js</span>
              <span className={styles.skill}>CSS/SCSS</span>
              <span className={styles.skill}>JavaScript</span>
              <span className={styles.skill}>REST APIs</span>
              <span className={styles.skill}>Git</span>
              <span className={styles.skill}>Vite</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
