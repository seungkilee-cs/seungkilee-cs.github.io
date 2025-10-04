import styles from "./Projects.module.css";

type Project = {
  title: string;
  description: string;
  github: string;
  demo?: string;
  image: string;
  tech: string[];
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Spektra",
    description: "Audio Spectrum Analyzer hosted on the Web",
    github: "https://github.com/seungkilee-cs/spektra",
    demo: "https://www.seungkilee.com/spektra/",
    image: "https://opengraph.githubassets.com/1/seungkilee-cs/spektra",
    tech: ["JavaScript", "Rust", "ReactJS", "Web Audio API", "WebAssembly", "FFT"],
    featured: true,
  },
  {
    title: "MiniMeet",
    description:
      "Real Time Video Chat Application built with Full Stack TypeScript and WebSocket",
    github: "https://github.com/seungkilee-cs/MiniMeet",
    demo: "https://github.com/seungkilee-cs/MiniMeet",
    image: "https://opengraph.githubassets.com/1/seungkilee-cs/MiniMeet",
    tech: ["TypeScript", "Next.js", "Socket.IO", "WebRTC", "gRPC"],
  },
  {
    title: "Financial Modeling",
    description:
      "Some interesting financial modeling done in python and TypeScript",
    github: "https://github.com/seungkilee-cs/Financial-Modeling",
    demo: "https://www.seungkilee.com/Financial-Modeling",
    image: "https://opengraph.githubassets.com/1/seungkilee-cs/Financial-Modeling",
    tech: ["Python", "TypeScript", "Finance", "Visualization"],
  },
  {
    title: "K-Means Image Compression",
    description: "Image compression implemented with K-Means Clustering",
    github: "https://github.com/seungkilee-cs/K-Means-Image-Compression",
    demo: "https://github.com/seungkilee-cs/K-Means-Image-Compression",
    image: "https://opengraph.githubassets.com/1/seungkilee-cs/K-Means-Image-Compression",
    tech: ["c++", "K-Means Clustering", "Image Compression"],
  },
  {
    title: "Vinylla Player",
    description: "Vinly Record Player and Cyberpunk inspired Web Audio Player in pure JS",
    github: "https://github.com/seungkilee-cs/Vinylla-Player",
    demo: "https://www.seungkilee.com/Vinylla-Player",
    image: "https://opengraph.githubassets.com/1/seungkilee-cs/Vinylla-Player",
    tech: ["JavaScript" ],
  },

];

export function Projects() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const gallery = projects.filter((p) => p !== featured);

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.sectionHeader} data-label="Work">
          <h1 className={styles.title}>Projects</h1>
        </div>
        <div className={styles.layout}>
          {featured ? (
            <article className={styles.heroCard} key={featured.title}>
              <div
                className={styles.heroMedia}
                style={{ backgroundImage: `url(${featured.image})` }}
                aria-hidden="true"
              >
                <span className={styles.heroMediaMask} />
              </div>
              <div className={styles.heroBody}>
                <span className={styles.heroEyebrow}>Featured Project</span>
                <h2 className={styles.heroTitle}>{featured.title}</h2>
                <p className={styles.heroDesc}>{featured.description}</p>
                <ul className={styles.techList}>
                  {featured.tech.map((tech) => (
                    <li key={tech} className={styles.techChip}>
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className={styles.heroActions}>
                  <a
                    className={`${styles.link} ${styles.linkPrimary}`}
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                  {featured.demo && (
                    <a
                      className={`${styles.link} ${styles.linkGhost}`}
                      href={featured.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ) : null}

          <div className={styles.gallery}>
            {gallery.map((p) => (
              <article key={p.title} className={styles.card}>
                <div
                  className={styles.cardMedia}
                  style={{ backgroundImage: `url(${p.image})` }}
                  aria-hidden="true"
                >
                  <span className={styles.cardMediaMask} />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardEyebrow}>Project</span>
                    <h2 className={styles.cardTitle}>{p.title}</h2>
                    <p className={styles.cardDesc}>{p.description}</p>
                  </div>
                  <ul className={styles.techList}>
                    {p.tech.map((tech) => (
                      <li key={tech} className={styles.techChip}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <div className={styles.actions}>
                    <a
                      className={`${styles.link} ${styles.linkPrimary}`}
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                    {p.demo && (
                      <a
                        className={styles.link}
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
