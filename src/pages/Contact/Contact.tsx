import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section} data-label="Connect">
      <div className={styles.hero}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.lead}>
          Partnerships, mentorship chats, or feedback on recent projects: my inbox is
          always open.
        </p>
        {/* <div className={styles.ctaRow}>
          <a href="mailto:seungkilee.cs@gmail.com" className={styles.primaryCta}>
           Email Me 
          </a>
          <p className={styles.ctaHint}>Prefer async? Pick a channel below.</p>
        </div> */}
      </div>

      <ul className={styles.grid}>
        <li>
          <a href="mailto:seungkilee.cs@gmail.com" className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardEyebrow}>Email</span>
              <h2 className={styles.cardTitle}>Email</h2>
            </div>
            <p className={styles.cardDesc}>
              Long-form updates, collaboration proposals, and anything that needs a thoughtful
              response.
            </p>
            <span className={styles.cardAction}>seungkilee.cs@gmail.com →</span>
            <span className={styles.cardMeta}>Typical response: under 24 hours</span>
          </a>
        </li>

        <li>
          <a
            href="https://github.com/seungkilee-cs"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardEyebrow}>GitHub</span>
              <h2 className={styles.cardTitle}>Dev Work and Portfolio</h2>
            </div>
            <p className={styles.cardDesc}>
              Follow active repos, open issues, or start a discussion about engineering
              experiments.
            </p>
            <span className={styles.cardAction}>github.com/seungkilee-cs →</span>
            <span className={styles.cardMeta}>Starred projects updated weekly</span>
          </a>
        </li>

        <li>
          <a
            href="https://linkedin.com/in/seungkilee"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardEyebrow}>LinkedIn</span>
              <h2 className={styles.cardTitle}>Professional network</h2>
            </div>
            <p className={styles.cardDesc}>
              Connect for career opportunities, speaking invites, or industry collaborations.
            </p>
            <span className={styles.cardAction}>linkedin.com/in/seungkilee →</span>
            <span className={styles.cardMeta}>Let’s build something thoughtful together</span>
          </a>
        </li>
      </ul>

      <div className={styles.footerNote}>
        <p>
          Currently collaborating across time zones. If you don’t hear back right away, feel
          free to nudge me. Your message matters.
        </p>
      </div>
    </section>
  );
}
