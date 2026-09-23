import styles from './About.module.css';

const BIO: readonly string[] = [
  'I am a Software Engineer and graduate of the Universidad de Ciencias Informáticas (UCI) in Cuba, where I completed my degree in Informatics Sciences Engineering. My academic and professional path has been shaped by a strong foundation in software engineering, with a focus on scalable web development, product thinking, and collaborative delivery.',
  'I have hands-on experience building full-stack applications using React, TypeScript, Python, Django, and PostgreSQL. I enjoy working across the entire development lifecycle, from designing backend architecture and APIs to creating responsive, user-centered interfaces that are efficient and maintainable.',
  'In addition to web engineering, I bring experience in interactive media and game development with Unity and Unreal Engine, including participation in Global Game Jams. That multidisciplinary background has strengthened my problem-solving mindset, creativity, and adaptability in fast-paced technical environments.',
  'I am a proactive communicator and a reliable team player with a strong interest in building meaningful digital products and continuing to grow as a professional in software development and technology.',
];

interface SkillGroup {
  readonly category: string;
  readonly items: readonly string[];
}

const SKILLS: readonly SkillGroup[] = [
  {
    category: 'Web Development (Core)',
    items: ['React', 'Django', 'Python', 'TypeScript', 'JavaScript', 'PostgreSQL', 'REST APIs'],
  },
  {
    category: 'Tools & Environment',
    items: ['Git', 'Node.js', 'CSS/SCSS', 'Vite'],
  },
  {
    category: 'Software Engineering & Interactive',
    items: ['C++', 'C#', 'Unreal Engine', 'Unity'],
  },
];

export default function About() {
  return (
    <section id="about" className={`${styles.about} head-rule`}>
      <div className={styles.inner}>
        <h2 className={styles.title}>About</h2>
        <div className={styles.grid}>
          <div className={styles.bio}>
            {BIO.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.skills}>
            {SKILLS.map((group) => (
              <div className={styles.group} key={group.category}>
                <div className={styles.groupHead}>
                  <h3 className={styles.groupTitle}>{group.category}</h3>
                  <span className={styles.groupCount}>
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li className={styles.item} key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
