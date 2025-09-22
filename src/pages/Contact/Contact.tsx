import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.lead}>Let's Connect! Reach out anytime.</p>
      <ul className={styles.list}>
        <li>
          Email:{" "}
          <a href="mailto:seungkilee.cs@gmail.com">seungkilee.cs@gmail.com</a>
        </li>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/seungkilee-cs"
            target="_blank"
            rel="noopener noreferrer"
          >
            seungkilee-cs
          </a>
        </li>
        <li>
          LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/seungkilee"
            target="_blank"
            rel="noopener noreferrer"
          >
            /in/seungkilee
          </a>
        </li>
      </ul>
    </section>
  );
}
