import { useEffect, useState } from "react";
import styles from "./About.module.css";
import { fetchRecentCommits, type CommitItem } from "../../services/github";
import ghosttyIcon from "../../assets/icons/ghostty.svg";
import neovimIcon from "../../assets/icons/neovim.svg";
import zenIcon from "../../assets/icons/zen.svg";

export function About() {
  const [commits, setCommits] = useState<CommitItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <section className={styles.section} data-label="Intro">
          <h1 className={styles.title}>Quietly opinionated</h1>
          <p className={styles.lead}>
            Hi, I'm Seung Ki Lee, a Software Engineer and a Writer.
          </p>
          <p>My favorite things to do is:</p>
          <p>To solve problems to bring value to people.</p>
          <p>To stack days upon days to hopefully build them up to myself.</p>
          <p>
            To formalize the intuitions and feelings we have to gain insights into something
            greater.
          </p>
        </section>

        <section className={styles.section} data-label="Toolkit">
          <h2 className={styles.h2}>Current Favorite Tools</h2>
          <div className={styles.toolList}>
            <a
              className={styles.toolPill}
              href="https://ghostty.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ghostty - download"
            >
              <img src={ghosttyIcon} alt="" className={styles.toolIcon} />
              <span className={styles.toolLabel}>
                <span className={styles.toolType}>Terminal</span>
                <span className={styles.toolSep}>|</span>
                <span className={styles.toolName}>Ghostty</span>
              </span>
            </a>
            <a
              className={styles.toolPill}
              href="https://neovim.io/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Neovim - download"
            >
              <img src={neovimIcon} alt="" className={styles.toolIcon} />
              <span className={styles.toolLabel}>
                <span className={styles.toolType}>Text Editor</span>
                <span className={styles.toolSep}>|</span>
                <span className={styles.toolName}>Neovim</span>
              </span>
            </a>
            <a
              className={styles.toolPill}
              href="https://www.zen-browser.app/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Zen Browser - download"
            >
              <img src={zenIcon} alt="" className={styles.toolIcon} />
              <span className={styles.toolLabel}>
                <span className={styles.toolType}>Browser</span>
                <span className={styles.toolSep}>|</span>
                <span className={styles.toolName}>Zen</span>
              </span>
            </a>
          </div>
        </section>

        <section className={styles.section} data-label="Activity">
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
                    <span className={styles.commitMsg}>{truncate(c.message, 96)}</span>
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
    </section>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
