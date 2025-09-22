import fm from "front-matter";

export type PostMeta = {
  title: string;
  slug: string;
  date: string;
  description?: string;
};

export type Post = PostMeta & {
  content: string;
  path: string;
};

const modules = import.meta.glob("../content/blog/*.md", {
  as: "raw",
  eager: true,
});

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  for (const path in modules) {
    const raw = modules[path] as string;
    const parsed = fm<Partial<PostMeta>>(raw);
    const data = parsed.attributes || {};
    const meta: PostMeta = {
      title: String(data.title ?? "Untitled"),
      slug: String(data.slug ?? slugFromPath(path)),
      date: String(data.date ?? "1970-01-01"),
      description: data.description ? String(data.description) : undefined,
    };
    posts.push({ ...meta, content: parsed.body, path });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

function slugFromPath(p: string) {
  const name = p.split("/").pop() || "";
  return name.replace(/\.md$/, "");
}
