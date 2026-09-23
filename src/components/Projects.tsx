import { useState } from 'react';
import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link: string;
  /** Optional direct link to the deployed site — rendered as its own foot action. */
  liveLink?: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'University Incident Management System',
    description:
      'A full-stack university maintenance management system designed to streamline incident reporting and centralize technical support workflows.',
    technologies: ['Django', 'JavaScript', 'PostgreSQL', 'Bootstrap'],
    link: 'https://github.com/SatellitexOT12/ProyectoMantenimientoUCI',
    liveLink: 'https://proyecto-mantenimiento-kzofm1w5n-antivist1.vercel.app',
    image: 'sgum-uci.webp',
  },
  {
    id: 2,
    title: 'MOOC Course platform',
    description: 'MOOC course platform with registration system, user authentication, and data export to CSV.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Django REST Framework', 'API Integration'],
    link: 'https://github.com/SatellitexOT12/moc',
    image: 'mooc-platform.webp',
  },
  {
    id: 3,
    title: 'MiniNabi',
    description:
      'A modern storefront for a handcrafted dessert brand, focused on premium product presentation, mobile-friendly browsing, and a clean ordering experience.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'E-commerce'],
    link: 'https://mininabi.qzz.io/',
    image: 'mininabi.webp',
  },
  {
    id: 4,
    title: 'Personal Professional Portfolio',
    description:
      'A high-performance personal portfolio designed with a mobile-first approach, focusing on clean architecture, optimized asset loading, and responsive UI components.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules'],
    link: 'https://github.com/SatellitexOT12/Portfolio',
    image: 'portfolio-shot.webp',
  },
  {
    id: 5,
    title: "Death's Challenge",
    description:
      'A 3D parkour platformer developed in Unreal Engine for the Global Game Jam 2024, featuring custom assets modeled in Blender and fluid movement mechanics.',
    technologies: ['Unreal Engine', 'Blender'],
    link: 'https://globalgamejam.org/games/2024/deaths-challenge-2',
    image: 'deaths-challenge.webp',
  },
  {
    id: 6,
    title: 'Orbital Shield',
    description:
      'A 2D side-scroller developed in Unreal Engine for the Global Game Jam 2025, featuring a dynamic state-switching shield mechanic for energy absorption and combat.',
    technologies: ['Unreal Engine', 'Aseprite'],
    link: 'https://globalgamejam.org/games/2025/orbital-shield-frostaras-adventures-2-0',
    image: 'orbital-shield.webp',
  },
  {
    id: 7,
    title: 'AR Ships (Capstone Project)',
    description:
      'An immersive AR mobile application built with Unity and Vuforia Engine to visualize and preserve naval heritage through interactive 3D historical ship models.',
    technologies: ['Unity', 'Vuforia Engine', 'Blender', 'C#'],
    link: 'https://github.com/SatellitexOT12/RA_Barcos',
    image: 'ar-ships.webp',
  },
];

/* YEAR: user-confirmed ship years; 20XX is the marked placeholder
   where no year exists in the source truth (AR Ships). */
const YEARS: Record<number, string> = {
  1: '2025',
  2: '2024',
  3: '2026',
  4: '2026',
  5: '2024',
  6: '2025',
};

/* ROLE: every listed module is Oscar's delivered work. */
const ROLE = 'Developer';

/* Fallback tile initials — no external placeholder ever renders. */
function initialsOf(title: string): string {
  return title
    .split(/\s+/)
    .map((word) => word.charAt(0))
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export default function Projects() {
  const [failed, setFailed] = useState<Set<number>>(() => new Set());

  const markFailed = (id: number) => {
    setFailed((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <section id="projects" className={`${styles.projects} head-rule`}>
      <span className={styles.edgeLabel} aria-hidden="true">
        MESH · DENSE
      </span>
      <div className={styles.head}>
        <h2 className={styles.title}>Projects</h2>
        <p className={styles.meta}>{String(projectsData.length).padStart(2, '0')} · Selected work</p>
      </div>

      <div className={styles.grid}>
        {projectsData.map((project, i) => (
          <article key={project.id} className={styles.card}>
            <a
              className={styles.cardLink}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title}`}
            >
              <div className={styles.media}>
                {project.image && !failed.has(project.id) ? (
                  <img
                    className={styles.thumb}
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width={1600}
                    height={900}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => markFailed(project.id)}
                  />
                ) : (
                  <div className={styles.fallback} aria-hidden="true">
                    <span className={styles.fallbackNum}>{String(i + 1).padStart(2, '0')}</span>
                    <strong className={styles.fallbackInitials}>{initialsOf(project.title)}</strong>
                  </div>
                )}
              </div>

              <div className={styles.body}>
                <div className={styles.topRow}>
                  <h3 className={styles.name}>{project.title}</h3>
                  <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className={styles.desc}>{project.description}</p>
                <ul className={styles.techList}>
                  {project.technologies.map((tech) => (
                    <li key={tech} className={styles.tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </a>

            {/* Sibling of the card link: keeps every anchor standalone
                (no nested <a>) while the foot spans the full card width. */}
            <div className={styles.foot}>
              <span className={styles.spec}>
                {YEARS[project.id] ?? '20XX'} · {ROLE}
              </span>
              <span className={styles.actions}>
                <a className={styles.action} href={project.link} target="_blank" rel="noreferrer">
                  Open
                  <svg className={styles.arrow} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
                {project.liveLink && (
                  <a
                    className={`${styles.action} ${styles.actionLive}`}
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live
                    <svg className={styles.arrow} width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </a>
                )}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
