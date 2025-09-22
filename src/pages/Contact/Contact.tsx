import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.lead}>Reach out anytime.</p>
      <ul className={styles.list}>
        <li>
          Email: <a href="mailto:hello@example.com">hello@example.com</a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
          >
            username
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/username"
            target="_blank"
            rel="noopener noreferrer"
          >
            /in/username
          </a>
        </li>
      </ul>
    </section>
  );
}
