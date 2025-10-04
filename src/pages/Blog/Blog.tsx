import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../../lib/loadPosts";
import styles from "./Blog.module.css";

export function Blog() {
  const isDev = process.env.NODE_ENV === "development";
  const posts = getAllPosts(isDev);
  type Post = (typeof posts)[number];

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const tags = useMemo(() => {
    const bucket = new Set<string>();
    posts.forEach((post) => post.tags?.forEach((tag) => bucket.add(tag)));
    return Array.from(bucket).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const categories = useMemo(() => {
    const bucket = new Set<string>();
    posts.forEach((post) => post.categories?.forEach((cat) => bucket.add(cat)));
    return Array.from(bucket).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post: Post) => {
      const tagMatch = !activeTag || post.tags?.includes(activeTag);
      const categoryMatch = !activeCategory || post.categories?.includes(activeCategory);
      return tagMatch && categoryMatch;
    });
  }, [posts, activeTag, activeCategory]);

  const featuredPost = useMemo(() => filteredPosts.find((post) => post.featured), [filteredPosts]);
  const gallery = useMemo(
    () => filteredPosts.filter((post) => (featuredPost ? post.slug !== featuredPost.slug : true)),
    [filteredPosts, featuredPost],
  );

  const toggleTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  const toggleCategory = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  const clearFilters = () => {
    setActiveTag(null);
    setActiveCategory(null);
  };

  const hasActiveFilters = Boolean(activeTag || activeCategory);

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Blog</h1>
          <div className={styles.filterTrail}>
            {activeTag && <span>Tag: {activeTag}</span>}
            {activeCategory && <span>Category: {activeCategory}</span>}
            {hasActiveFilters && (
              <button
                type="button"
                className={styles.clearFilters}
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
        {isDev && <p className={styles.devBadge}>Dev: showing both published and draft posts</p>}

        {(tags.length > 0 || categories.length > 0) && (
          <div className={styles.filters}>
            {tags.length > 0 && (
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Browse by tag</span>
                <div className={styles.filterChips}>
                  {tags.map((tag) => {
                    const isActive = activeTag === tag;
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={
                          isActive
                            ? `${styles.filterChip} ${styles.filterChipActive}`
                            : styles.filterChip
                        }
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {categories.length > 0 && (
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Browse by category</span>
                <div className={styles.filterChips}>
                  {categories.map((category) => {
                    const isActive = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        className={
                          isActive
                            ? `${styles.filterChip} ${styles.filterChipActive}`
                            : styles.filterChip
                        }
                        onClick={() => toggleCategory(category)}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {featuredPost && (
          <article className={styles.featured}>
            <Link to={`/blog/${featuredPost.slug}`} className={styles.featuredLink}>
              <div className={styles.featuredBadge}>Featured</div>
              <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
              <p className={styles.featuredExcerpt}>{featuredPost.description ?? ""}</p>
              <div className={styles.featuredMeta}>
                <time>{new Date(featuredPost.date).toLocaleDateString()}</time>
                <span>[{featuredPost.language.toUpperCase()}]</span>
              </div>
              {featuredPost.tags && featuredPost.tags.length > 0 && (
                <div className={styles.featuredTags}>
                  {featuredPost.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </Link>
          </article>
        )}

        <ul className={styles.list}>
          {gallery.map((p) => (
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

        {filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <p>No posts match the selected filters yet.</p>
            {hasActiveFilters && (
              <button type="button" className={styles.clearFilters} onClick={clearFilters}>
                Reset filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
