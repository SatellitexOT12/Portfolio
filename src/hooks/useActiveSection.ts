import { useEffect, useState } from 'react';

export type SectionId = 'hero' | 'about' | 'projects' | 'contact';

const SECTIONS: readonly SectionId[] = ['hero', 'about', 'projects', 'contact'];

/**
 * Whichever section crosses the viewport's middle band owns the scene:
 * nav state, rail state, readout label and the shader's scene all read
 * from this single source.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && SECTIONS.includes(entry.target.id as SectionId)) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

/** Ask the field to dissolve into the next scene (nav / rail clicks). */
export function fireDissolve() {
  window.dispatchEvent(new CustomEvent('portal:dissolve'));
}

/** Scroll to a section the way the world navigates: dissolve, then glide. */
export function goToSection(id: SectionId) {
  fireDissolve();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
}
