import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>
        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              I am a Software Engineer and graduate of the Universidad de Ciencias Informáticas (UCI) in Cuba,
              where I completed my degree in Informatics Sciences Engineering. My academic and professional path has
              been shaped by a strong foundation in software engineering, with a focus on scalable web development,
              product thinking, and collaborative delivery.
            </p>
            <p>
              I have hands-on experience building full-stack applications using React, TypeScript, Python, Django,
              and PostgreSQL. I enjoy working across the entire development lifecycle, from designing backend
              architecture and APIs to creating responsive, user-centered interfaces that are efficient and maintainable.
            </p>
            <p>
              In addition to web engineering, I bring experience in interactive media and game development with Unity
              and Unreal Engine, including participation in Global Game Jams. That multidisciplinary background has
              strengthened my problem-solving mindset, creativity, and adaptability in fast-paced technical environments.
            </p>
            <p>
              I am a proactive communicator and a reliable team player with a strong interest in building meaningful
              digital products and continuing to grow as a professional in software development and technology.
            </p>
          </div>
          <div className={styles.skills}>
            <h3>Skills</h3>
            
            <div className={styles.skillCategory}>
              <h4 className={styles.categoryTitle}>Web Development (Core)</h4>
              <div className={styles.skillsList}>
                <span className={styles.skill}>React</span>
                <span className={styles.skill}>Django</span>
                <span className={styles.skill}>Python</span>
                <span className={styles.skill}>TypeScript</span>
                <span className={styles.skill}>JavaScript</span>
                <span className={styles.skill}>PostgreSQL</span>
                <span className={styles.skill}>REST APIs</span>
              </div>
            </div>
            
            <div className={styles.skillCategory}>
              <h4 className={styles.categoryTitle}>Tools & Environment</h4>
              <div className={styles.skillsList}>
                <span className={styles.skill}>Git</span>
                <span className={styles.skill}>Node.js</span>
                <span className={styles.skill}>CSS/SCSS</span>
                <span className={styles.skill}>Vite</span>
              </div>
            </div>
            
            <div className={styles.skillCategory}>
              <h4 className={styles.categoryTitle}>Software Engineering & Interactive</h4>
              <div className={styles.skillsList}>
                <span className={styles.skill}>C++</span>
                <span className={styles.skill}>C#</span>
                <span className={styles.skill}>Unreal Engine</span>
                <span className={styles.skill}>Unity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
