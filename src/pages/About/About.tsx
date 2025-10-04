import { useEffect, useState } from "react";
import styles from "./About.module.css";
import { fetchRecentCommits, type CommitItem } from "../../services/github";
import ghosttyIcon from "../../assets/icons/ghostty.svg";
import neovimIcon from "../../assets/icons/neovim.svg";
import zenIcon from "../../assets/icons/zen.svg";
import braveIcon from "../../assets/icons/brave.svg";
import obsidianIcon from "../../assets/icons/obsidian.svg";
import zedIcon from "../../assets/icons/Zed_light.svg";
import youtubeMusicIcon from "../../assets/icons/youtube_music.svg";
import raycastIcon from "../../assets/icons/raycast.svg";

type FavoriteTool = {
  name: string;
  category: string;
  href: string;
  icon: string;
  note?: string;
};

const favoriteTools: FavoriteTool[] = [
  {
    name: "Ghostty",
    category: "Terminal",
    href: "https://ghostty.org/",
    icon: ghosttyIcon,
  },
  {
    name: "Neovim",
    category: "Editor",
    href: "https://neovim.io/",
    icon: neovimIcon,
  },
  {
    name: "Raycast",
    category: "Launcher",
    href: "https://www.raycast.com/",
    icon: raycastIcon,
  },
  {
    name: "Zed",
    category: "Editor",
    href: "https://zed.dev/",
    icon: zedIcon,
  },
  {
    name: "Zen Browser",
    category: "Browser",
    href: "https://www.zen-browser.app/",
    icon: zenIcon,
  },
  {
    name: "Brave",
    category: "Browser",
    href: "https://brave.com/",
    icon: braveIcon,
  },
  {
    name: "Obsidian",
    category: "Notes",
    href: "https://obsidian.md/",
    icon: obsidianIcon,
  },
  {
    name: "YouTube Music",
    category: "Sound",
    href: "https://music.youtube.com/",
    icon: youtubeMusicIcon,
  },
];

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
            {favoriteTools.map((tool) => (
              <a
                key={tool.name}
                className={styles.toolPill}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${tool.name}`}
              >
                <span className={styles.toolIcon} aria-hidden="true">
                  <img src={tool.icon} alt="" loading="lazy" />
                </span>
                <span className={styles.toolLabel}>
                  <span className={styles.toolType}>{tool.category}</span>
                  <span className={styles.toolName}>{tool.name}</span>
                  {/* {tool.note && <span className={styles.toolMeta}>{tool.note}</span>} */}
                </span>
              </a>
            ))}
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
