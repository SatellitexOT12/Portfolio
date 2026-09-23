import styles from './Footer.module.css';

const EMAIL = 'garciaoscargfa@gmail.com';
const MAILTO = `mailto:${EMAIL}`;
const LINKEDIN = 'https://www.linkedin.com/in/oscar-garcía-87015a354';
const GITHUB = 'https://github.com/SatellitexOT12';

type ContactRow = {
  label: string;
  value: string;
  href: string;
  external: boolean;
};

const ROWS: ContactRow[] = [
  { label: 'Email', value: EMAIL, href: MAILTO, external: false },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/oscar-garcía-87015a354',
    href: LINKEDIN,
    external: true,
  },
  { label: 'GitHub', value: 'github.com/SatellitexOT12', href: GITHUB, external: true },
];

function OutboundGlyph() {
  return (
    <svg className={styles.glyph} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M3.5 8.5 L8.5 3.5 M4.75 3.5 H8.5 V7.25" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className={`${styles.footer} head-rule`}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <h2 className={styles.title}>Contact</h2>
          <p className={styles.lede}>Open to roles and collaborations — write anytime.</p>
          <a className={styles.mail} href={MAILTO}>
            {EMAIL}
          </a>
        </div>

        <dl className={styles.table}>
          {ROWS.map((row) => {
            const externalProps = row.external
              ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
              : {};

            return (
              <div key={row.label} className={styles.row}>
                <dt className={styles.rowLabel}>{row.label}</dt>
                <dd className={styles.rowValue}>
                  <a href={row.href} {...externalProps}>
                    {row.value}
                    {row.external ? <OutboundGlyph /> : null}
                  </a>
                </dd>
              </div>
            );
          })}
        </dl>

        <div className={styles.close}>
          <p className={styles.copyright}>© {currentYear} Oscar — All rights reserved</p>
          <p className={styles.stack}>React · TypeScript · WebGL</p>
        </div>
      </div>
    </footer>
  );
}
