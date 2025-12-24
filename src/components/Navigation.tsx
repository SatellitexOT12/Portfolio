import { useState } from 'react';
import styles from './Navigation.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>Portfolio</div>
        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <li>
            <button onClick={() => scrollToSection('hero')} className={styles.navLink}>
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('about')} className={styles.navLink}>
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('projects')} className={styles.navLink}>
              Projects
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contact')} className={styles.navLink}>
              Contact
            </button>
          </li>
        </ul>
        <div className={styles.navActions}>
          <ThemeToggle />
          <button className={styles.menuToggle} onClick={toggleMenu}>
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
