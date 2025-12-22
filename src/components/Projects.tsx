import styles from './Projects.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application with product catalog, shopping cart, and payment integration.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates and team collaboration features.',
    technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    link: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather application showing real-time forecasts with interactive maps and detailed analytics.',
    technologies: ['React', 'API Integration', 'Chart.js', 'Vite'],
    link: '#',
  },
  {
    id: 4,
    title: 'Social Media Feed',
    description: 'A social media platform featuring user authentication, posts, comments, and real-time notifications.',
    technologies: ['React', 'GraphQL', 'PostgreSQL', 'WebSockets'],
    link: '#',
  },
  {
    id: 5,
    title: 'Blog Platform',
    description: 'A markdown-based blog platform with search functionality, categories, and reader analytics.',
    technologies: ['React', 'Next.js', 'Markdown', 'SEO'],
    link: '#',
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'A mobile-friendly fitness tracking application with progress charts and workout recommendations.',
    technologies: ['React Native', 'Firebase', 'Charts', 'APIs'],
    link: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <h2 className={styles.title}>My Projects</h2>
        <div className={styles.grid}>
          {projectsData.map((project) => (
            <div key={project.id} className={styles.card}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
