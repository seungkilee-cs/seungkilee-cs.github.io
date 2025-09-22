import { useEffect, useState } from "react";
import styles from "./About.module.css";
import { fetchRecentCommits, type CommitItem } from "../../services/github";

export function About() {
  const [commits, setCommits] = useState<CommitItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // CHANGE THIS to the GitHub username to show activity for
  const GITHUB_USERNAME = "seungkilee-cs";

  useEffect(() => {
    let active = true;
    fetchRecentCommits(GITHUB_USERNAME)
      .then((items) => {
        if (active) setCommits(items.slice(0, 5));
      })
      .catch((e: unknown) => {
        if (active) setError("Could not load recent activity.");
        console.error(e);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <section className={styles.section}>
        <h1 className={styles.title}>Quietly opinionated</h1>
        <p className={styles.lead}>
          Hi, I&apos;m Seung Ki Lee, a Software Engineer and a Writer.
        </p>
        <p>My favorite things to do is:</p>
        <p>To solve problems to bring value to people.</p>
        <p>To stack days upon days to hopefully build them up to myself.</p>
        <p>
          To formalize the intuitions and feelings we have to gain insights into
          something greater.
        </p>
      </section>

      {/* Tools */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Tools</h2>
        <ul className={styles.badgeList}>
          <li>
            <a
              className={styles.badge}
              href="https://www.zen-browser.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zen Browser - download"
            >
              <span className={styles.badgeIcon} aria-hidden="true">
                {/* Inline SVG icon */}
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              </span>
              <span className={styles.badgeText}>Zen Browser</span>
            </a>
          </li>
          <li>
            <a
              className={styles.badge}
              href="https://neovim.io/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Neovim - download"
            >
              <span className={styles.badgeIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M6 2l12 8-12 8z"></path>
                </svg>
              </span>
              <span className={styles.badgeText}>Neovim</span>
            </a>
          </li>
          <li>
            <a
              className={styles.badge}
              href="https://ghostty.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ghostty - download"
            >
              <span className={styles.badgeIcon} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <rect x="4" y="5" width="16" height="12" rx="2"></rect>
                </svg>
              </span>
              <span className={styles.badgeText}>Ghostty</span>
            </a>
          </li>
        </ul>
      </section>

      {/* Stack */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Languages & Stack</h2>
        <div className={styles.tags}>
          {/* Languages */}
          <div className={styles.tagGroup}>
            <h3 className={styles.h3}>Languages</h3>
            <div className={styles.tagRow}>
              <span className={styles.tag}>TypeScript</span>
              <span className={styles.tag}>JavaScript</span>
              <span className={styles.tag}>Python</span>
              <span className={styles.tag}>SQL</span>
            </div>
          </div>
          {/* Frontend */}
          <div className={styles.tagGroup}>
            <h3 className={styles.h3}>Frontend</h3>
            <div className={styles.tagRow}>
              <span className={styles.tag}>React</span>
              <span className={styles.tag}>Vite</span>
              <span className={styles.tag}>CSS Modules</span>
            </div>
          </div>
          {/* Backend/Infra */}
          <div className={styles.tagGroup}>
            <h3 className={styles.h3}>Backend & Infra</h3>
            <div className={styles.tagRow}>
              <span className={styles.tag}>Node.js</span>
              <span className={styles.tag}>Express</span>
              <span className={styles.tag}>PostgreSQL</span>
              <span className={styles.tag}>MongoDB</span>
              <span className={styles.tag}>GitHub Actions</span>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub activity */}
      <section className={styles.section}>
        <h2 className={styles.h2}>Recent GitHub Activity</h2>
        {error ? (
          <p className={styles.muted}>{error}</p>
        ) : !commits ? (
          <p className={styles.muted}>Loading recent commits…</p>
        ) : commits.length === 0 ? (
          <p className={styles.muted}>No recent public commits found.</p>
        ) : (
          <ul className={styles.commitList}>
            {commits.map((c) => (
              <li key={c.id} className={styles.commitItem}>
                <a
                  className={styles.commitLink}
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={c.message}
                >
                  <span className={styles.commitRepo}>{c.repo}</span>
                  <span className={styles.commitMsg}>
                    {truncate(c.message, 96)}
                  </span>
                  <span className={styles.commitTime}>
                    {new Date(c.date).toLocaleString()}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className={styles.commitMore}>
          <a
            className={styles.pill}
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
