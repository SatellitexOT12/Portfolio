import { goToSection, type SectionId } from '../hooks/useActiveSection';
import styles from './SectionRail.module.css';

const ITEMS: readonly { id: SectionId; index: string; label: string }[] = [
  { id: 'hero', index: '01', label: 'Home' },
  { id: 'about', index: '02', label: 'About' },
  { id: 'projects', index: '03', label: 'Projects' },
  { id: 'contact', index: '04', label: 'Contact' },
];

interface Props {
  active: SectionId;
}

/* The numbered rail: sequence carries scroll position, the ember state
   carries where you are. Desktop only; the menu owns small screens. */
export default function SectionRail({ active }: Props) {
  return (
    <nav className={styles.rail} aria-label="Sections">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          className={`${styles.item} ${active === item.id ? styles.active : ''}`}
          aria-current={active === item.id ? 'true' : undefined}
          onClick={() => goToSection(item.id)}
        >
          <span className={styles.idx}>{item.index}</span>
          <span className={styles.lbl}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
