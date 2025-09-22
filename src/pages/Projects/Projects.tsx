import styles from "./Projects.module.css";

type Project = {
  title: string;
  description: string;
  github: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: "Minimal Portfolio",
    description: "SPA build with a11y-first, ~30KB gzipped.",
    github: "https://github.com/username/username.github.io",
    demo: "https://username.github.io",
  },
  {
    title: "Weather Lite",
    description: "1s FCP on 3G, clean map overlays.",
    github: "https://github.com/username/weather-lite",
    demo: "https://username.github.io/weather-lite",
  },
  {
    title: "Tasks Mini",
    description: "Zero-config, keyboard-first flow.",
    github: "https://github.com/username/tasks-mini",
  },
];

export function Projects() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Projects</h1>
      <div className={styles.grid}>
        {projects.map((p) => (
          <article key={p.title} className={styles.card}>
            <h2 className={styles.cardTitle}>{p.title}</h2>
            <p className={styles.cardDesc}>{p.description}</p>
            <div className={styles.actions}>
              <a
                className={styles.link}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Code
              </a>
              {p.demo && (
                <a
                  className={styles.link}
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
