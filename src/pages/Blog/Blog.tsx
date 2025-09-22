import { Link } from "react-router-dom";
import { getAllPosts } from "../../lib/loadPosts";
import styles from "./Blog.module.css";

export function Blog() {
  const posts = getAllPosts();

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Blog</h1>
      <ul className={styles.list}>
        {posts.map((p) => (
          <li key={p.slug} className={styles.item}>
            <Link to={`/blog/${p.slug}`} className={styles.link}>
              <h2 className={styles.postTitle}>{p.title}</h2>
              <p className={styles.meta}>
                <span>{new Date(p.date).toLocaleDateString()}</span>
                {p.description ? (
                  <span className={styles.desc}>{p.description}</span>
                ) : null}
              </p>
              {/* Optional tags if added in front‑matter later */}
              {/* <div className={styles.tags}>
                {p.tags?.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div> */}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
