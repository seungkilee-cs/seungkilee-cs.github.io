import styles from "./About.module.css";

export function About() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Quietly opinionated.</h1>
      <p className={styles.lead}>
        Designing and building pared‑back interfaces that feel effortless.
      </p>
      <p>
        Focused on clarity, rhythm, and small details that make products feel
        human.
      </p>
    </section>
  );
}
