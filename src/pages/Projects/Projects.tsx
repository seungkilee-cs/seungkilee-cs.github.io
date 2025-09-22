import styles from "./Projects.module.css";

type Project = {
  title: string;
  description: string;
  github: string;
  demo?: string;
};

const projects: Project[] = [
  {
    title: "Spektra",
    description: "Audio Spectrum Analyzer hosted on the Web",
    github: "https://github.com/seungkilee-cs/Spektra",
    demo: "https://www.seungkilee.com/Spektra/",
  },
  {
    title: "MiniMeet",
    description:
      "Real Time Video Chat Application built with Full Stack TypeScript and WebSocket",
    github: "https://github.com/seungkilee-cs/MiniMeet",
    demo: "https://github.com/username/weather-lite",
  },
  {
    title: "K-Means Image Compression",
    description: "Image compression implemented with K-Means Clustering",
    github: "https://github.com/seungkilee-cs/K-Means-Image-Compression",
    demo: "https://github.com/seungkilee-cs/MiniMeet",
  },
  {
    title: "Financial Modeling",
    description:
      "Some interesting financial modeling done in python and TypeScript",
    github: "https://github.com/seungkilee-cs/Financial-Modeling",
    demo: "https://github.com/seungkilee-cs/Financial-Modeling",
  },
  {
    title: "QR-Zenerate",
    description: "URL to QR Code Extension for Zen Browser",
    github: "https://github.com/seungkilee-cs/QR-Zenerate",
    demo: "https://github.com/seungkilee-cs/QR-Zenerate",
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
