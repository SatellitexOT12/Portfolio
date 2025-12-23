import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>
        <div className={styles.content}>
          <div className={styles.text}>
            <p>
              I am a final-year undergraduate student pursuing a degree in Informatics  
              Sciences Engineering at the Universidad de Ciencias Informáticas (UCI) in Cuba. 
              My academic trajectory is defined by a strong foundation in software engineering, 
              with a primary focus on scalable Web Development and Agile project management using Scrum.
            </p>
            <p>
              I possess robust Full-Stack capabilities, specializing in building responsive applications 
              using Python (Django) and React, integrated with relational databases such as PostgreSQL. 
              My background allows me to design efficient backend architectures while delivering intuitive 
              frontend experiences.
            </p>
            <p>
              In addition to web engineering, I have a diverse technical background in interactive media. 
              I am currently developing an Augmented Reality (AR) thesis project using Unity and C#, and 
              I have extensive experience in game development with Unreal Engine. This multidisciplinary 
              experience, reinforced by my participation in two Global Game Jams, has sharpened my 
              problem-solving skills and my ability to adapt to complex technical environments.
            </p>
            <p>
              Beyond my technical skills, I am an effective communicator and a proactive team player. 
              I thrive in collaborative settings and am committed to continuous learning and professional growth. 
              I am eager to contribute my skills and enthusiasm to innovative projects in the tech industry.
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
