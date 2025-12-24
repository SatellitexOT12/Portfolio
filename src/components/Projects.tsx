import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  link: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'University Incident Management System',
    description: 'A full-stack university maintenance management system designed to streamline incident reporting and centralize technical support workflows.',
    technologies: ['Django', 'JavaScript', 'PostgreSQL', 'Bootstrap'],
    link: 'https://github.com/SatellitexOT12/ProyectoMantenimientoUCI',
    image: '/img/incident-management.png',
  },
  {
    id: 2,
    title: 'MOOC Course platform',
    description: 'MOOC course platform with registration system, user authentication, and data export to CSV.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Django REST Framework', 'API Integration'],
    link: 'https://github.com/SatellitexOT12/moc',
    image: '/img/mooc-platform.jpg',
  },
  {
    id: 3,
    title: 'Personal Professional Portfolio',
    description: 'A high-performance personal portfolio designed with a mobile-first approach, focusing on clean architecture, optimized asset loading, and responsive UI components.',
    technologies: ['React',  'TypeScript','Vite' ,'CSS Modules'],
    link: '#',
    image: '/img/personal-portfolio.png',
  },
  {
    id: 4,
    title: "Death's Challenge",
    description: 'A 3D parkour platformer developed in Unreal Engine for the Global Game Jam 2024, featuring custom assets modeled in Blender and fluid movement mechanics.',
    technologies: ['Unreal Engine', 'Blender'],
    link: 'https://globalgamejam.org/games/2024/deaths-challenge-2',
    image: '/img/deaths-challenge.png',
  },
  {
    id: 5,
    title: 'Orbital Shield',
    description: 'A 2D side-scroller developed in Unreal Engine for the Global Game Jam 2025, featuring a dynamic state-switching shield mechanic for energy absorption and combat.',
    technologies: ['Unreal Engine', 'Aseprite'],
    link: 'https://globalgamejam.org/games/2025/orbital-shield-frostaras-adventures-2-0',
    image: '/img/orbital-shield.png',
    
  },
  {
    id: 6,
    title: 'AR Ships (Portada Project)',
    description: 'An immersive AR mobile application built with Unity and Vuforia Engine to visualize and preserve naval heritage through interactive 3D historical ship models.',
    technologies: ['Unity', 'Vuforia Engine', 'Blender', 'C#'],
    link: 'https://github.com/SatellitexOT12/RA_Barcos',
    image: '/img/ar-ships.jpg',
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title}>My Projects</h2>
        <div className={styles.grid}>
          {projectsData.map((project) => (
            <article key={project.id} className={styles.card}>
              <img
                src={project.image ?? 'https://via.placeholder.com/800x450'}
                alt={`${project.title} thumbnail`}
                className={styles.thumbnail}
              />

              <div className={styles.cardBody}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.technologies}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <a href={project.link} className={styles.link}>
                  View Project →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
