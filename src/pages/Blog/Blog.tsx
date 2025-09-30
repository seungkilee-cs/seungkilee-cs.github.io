import { Link } from "react-router-dom";
import { getAllPosts } from "../../lib/loadPosts";
import styles from "./Blog.module.css";

export function Blog() {
  const isDev = process.env.NODE_ENV === "development";
  const posts = getAllPosts(isDev);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Blog</h1>
      {isDev && <p>Dev: show both published and draft posts</p>}

      <ul className={styles.list}>
        {posts.map((p) => (
          <li key={p.slug} className={styles.item}>
            <Link to={`/blog/${p.slug}`} className={styles.link}>
              <span className={styles.postTitle}>
                {p.title}
                {p.draft && <span className={styles.draftBadge}> [DRAFT]</span>}
              </span>

              <div className={styles.meta}>
                <time>{new Date(p.date).toLocaleDateString()}</time>
                <span>[{p.language.toUpperCase()}]</span>
              </div>

              {p.description && <p className={styles.desc}>{p.description}</p>}

              {p.tags && p.tags.length > 0 && (
                <div className={styles.tags}>
                  {p.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {p.categories && p.categories.length > 0 && (
                <div className={styles.categories}>
                  {p.categories.map((cat) => (
                    <span key={cat} className={styles.category}>
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
