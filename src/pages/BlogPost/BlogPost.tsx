import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "../../lib/loadPosts";
import styles from "./BlogPost.module.css";

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

      {/* Wrap markdown and style via components mapping to avoid className on ReactMarkdown */}
      <div className={styles.content}>
        <ReactMarkdown
          components={{
            h1: (props) => <h1 className={styles.mdH1} {...props} />,
            h2: (props) => <h2 className={styles.mdH2} {...props} />,
            h3: (props) => <h3 className={styles.mdH3} {...props} />,
            p: (props) => <p className={styles.mdP} {...props} />,
            a: (props) => <a className={styles.mdA} {...props} />,
            code: (props) => <code className={styles.mdCode} {...props} />,
            pre: (props) => <pre className={styles.mdPre} {...props} />,
            ul: (props) => <ul className={styles.mdUl} {...props} />,
            ol: (props) => <ol className={styles.mdOl} {...props} />,
            li: (props) => <li className={styles.mdLi} {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <footer className={styles.footer}>
        <Link to="/blog" className={styles.back}>
          Back to blog
        </Link>
      </footer>
    </article>
  );
}
