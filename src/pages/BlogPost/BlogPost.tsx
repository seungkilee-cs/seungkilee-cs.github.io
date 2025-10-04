import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "../../lib/loadPosts";
import styles from "./BlogPost.module.css";
import "github-markdown-css/github-markdown-light.css";

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <section className={styles.article}>
        <p>Post not found.</p>
        <Link to="/blog" className={styles.back}>
          Back to blog
        </Link>
      </section>
    );
  }

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.meta}>
          {new Date(post.date).toLocaleDateString()}
        </p>
      </header>

      <div className={`${styles.content} markdown-body ${styles.markdownBodyOverride}`}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <footer className={styles.footer}>
        <Link to="/blog" className={styles.back}>
          Back to blog
        </Link>
      </footer>
    </article>
  );
}
