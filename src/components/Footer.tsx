import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h3>Let's Connect</h3>
          <p>Feel free to reach out for collaborations or just a friendly hello</p>
          <div className={styles.links}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:your@email.com">Email</a>
          </div>
        </div>
        <p className={styles.copyright}>
          © {currentYear} My Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
