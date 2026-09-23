import { useEffect, useState } from 'react';
import { goToSection, type SectionId } from '../hooks/useActiveSection';
import styles from './Navigation.module.css';
import ThemeToggle from './ThemeToggle';

const LINKS: readonly { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

interface Props {
  active: SectionId;
}

export default function Navigation({ active }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const go = (id: SectionId) => {
    goToSection(id);
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <button className={styles.brand} onClick={() => go('hero')} aria-label="Oscar — back to top">
          <svg className={styles.mark} width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
            <circle
              cx="16"
              cy="16"
              r="8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeDasharray="40 13.36"
              strokeLinecap="round"
              transform="rotate(-38 16 16)"
            />
            <circle cx="24.4" cy="12.2" r="3.6" className={styles.markDot} />
          </svg>
          <span className={styles.brandName}>Oscar</span>
        </button>

        <ul className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          {LINKS.map((link) => (
            <li key={link.id} className={styles.navItem}>
              <button
                onClick={() => go(link.id)}
                className={`${styles.navLink} ${active === link.id ? styles.navLinkActive : ''}`}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.navActions}>
          <ThemeToggle />
          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M2.5 2l11 8M13.5 2l-11 8" />
                </g>
              </svg>
            ) : (
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                <circle cx="2.5" cy="2.5" r="1.6" />
                <circle cx="8" cy="2.5" r="1.6" />
                <circle cx="13.5" cy="2.5" r="1.6" />
                <circle cx="2.5" cy="9.5" r="1.6" />
                <circle cx="8" cy="9.5" r="1.6" />
                <circle cx="13.5" cy="9.5" r="1.6" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
