import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>About</h1>
      <p className={styles.lead}>
        Building clean, minimal web experiences with React and TypeScript.
      </p>
      <p>Focused on performance, simplicity, and thoughtful UI.</p>
    </section>
  );
}
