import styles from "./About.module.css";

export function About() {
  return (
    <div>
      <section className={styles.section}>
        <h1 className={styles.title}>Quietly opinionated</h1>
        <p className={styles.lead}>
          Hi, I'm Seung Ki Lee, a Software Engineer and a Writer.
        </p>
        <p>My favorite things to do is:</p>
        <p>To solve problems to bring value to people.</p>
        <p>To stack days upon days to hopefully build them up to myself.</p>
        <p>
          To formalize the intuitions and feelings we have to gain insights into
          something greater.
        </p>
      </section>
      <section className={styles.section}>
        <p>Browser: Zen Browser</p>

        <p>Text Editor: neovim</p>

        <p>Terminal: Ghostty</p>
      </section>
    </div>
  );
}
