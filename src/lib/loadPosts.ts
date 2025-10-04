import fm from "front-matter";

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  language: string;
  baseSlug?: string;
  description?: string;
  tags?: string[];
  categories?: string[];
  draft?: boolean;
  featured?: boolean;
};

export type Post = PostMeta & {
  content: string;
  path: string;
};

const modules = import.meta.glob("../../content/blog/*.md", {
  // as: "raw",
  query: "?raw",
  import: "default",
  eager: true,
});

export function getAllPosts(includeDrafts: boolean = false): Post[] {
  const posts: Post[] = [];
  for (const path in modules) {
    const raw = modules[path] as string;
    const parsed = fm<Partial<PostMeta>>(raw);
    const data = parsed.attributes || {};
    const meta: PostMeta = {
      title: String(data.title ?? "Untitled"),
      slug: String(data.slug ?? slugFromPath(path)),
      date: String(data.date ?? "1970-01-01"),
      language: String(data.language ?? detectedLanguageFromSlug(path)),
      description: data.description ? String(data.description) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      categories: Array.isArray(data.categories)
        ? data.categories.map(String)
        : [],
      baseSlug: data.baseSlug ? String(data.baseSlug) : undefined,
      draft: Boolean(data.draft ?? false),
      featured: Boolean(data.featured ?? false),
    };

    if (meta.draft && !includeDrafts) {
      continue;
    }

    posts.push({ ...meta, content: parsed.body, path });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostBySlug(
  slug: string,
  includeDrafts: boolean = false,
): Post | null {
  return getAllPosts(includeDrafts).find((p) => p.slug === slug) ?? null;
}

export function getTranslations(baseSlug: string): Post[] {
  return getAllPosts().filter((post) => post.baseSlug === baseSlug);
}

export function getPostTranslations(currentPost: Post): Post[] {
  if (!currentPost.baseSlug) return [currentPost];
  return getTranslations(currentPost.baseSlug);
}

export function getPostInLanguage(
  baseSlug: string,
  language: string,
): Post | null {
  return (
    getAllPosts().find(
      (post) => post.baseSlug === baseSlug && post.language === language,
    ) ?? null
  );
}

export function getDraftPosts(): Post[] {
  return getAllPosts(true).filter((post) => post.draft);
}

export function getPublishedPosts(): Post[] {
  return getAllPosts(false);
}

export function getAllPostsWithDraftStatus(): Post[] {
  return getAllPosts(true);
}

function slugFromPath(p: string) {
  const name = p.split("/").pop() || "";
  return name.replace(/\.md$/, "");
}

function detectedLanguageFromSlug(path: string): string {
  if (path.includes("-ko.md")) return "ko";
  if (path.includes("-en.md")) return "en";
  return "en";
}
