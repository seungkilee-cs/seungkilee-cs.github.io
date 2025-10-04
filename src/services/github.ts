// simple gitHub recent commits fetcher for public activity.
// no token required for light usage but add a token for higher rate limits.

export type CommitItem = {
  id: string;
  repo: string;
  message: string;
  html_url: string;
  date: string;
};

/**
 * fetch recent public events and extract PushEvent commits
 * aggregates across repositories and returns the newest commit entries
 */
export async function fetchRecentCommits(
  username: string,
): Promise<CommitItem[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/events/public`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  type PushEvent = {
    type: "PushEvent";
    repo: { name: string; url: string };
    payload?: { commits?: Array<{ sha: string; message: string; url: string }> };
    created_at: string;
  };

  const rawEvents: unknown = await res.json();
  if (!Array.isArray(rawEvents)) {
    return [];
  }

  const items: CommitItem[] = [];

  for (const raw of rawEvents) {
    if (!isPushEvent(raw)) continue;
    const ev = raw;
    if (!ev.payload?.commits) continue;
    for (const c of ev.payload.commits) {
      // derive HTML URL for commit (payload.url is API URL)
      const repoFull = ev.repo.name; // like user/repo
      const [owner, repo] = repoFull.split("/");
      const sha = c.sha;
      const html = `https://github.com/${owner}/${repo}/commit/${sha}`;
      items.push({
        id: `${repoFull}-${sha}`,
        repo: repoFull,
        message: c.message,
        html_url: html,
        date: ev.created_at,
      });
    }
  }

  // sort by newest event time, then truncate
  items.sort((a, b) => (a.date < b.date ? 1 : -1));
  return items;

  function isPushEvent(event: unknown): event is PushEvent {
    if (typeof event !== "object" || event === null) {
      return false;
    }

    const ev = event as {
      type?: unknown;
      repo?: { name?: unknown; url?: unknown };
      payload?: { commits?: unknown };
      created_at?: unknown;
    };

    if (ev.type !== "PushEvent" || typeof ev.created_at !== "string") {
      return false;
    }

    const repo = ev.repo;
    if (
      !repo ||
      typeof repo.name !== "string" ||
      typeof repo.url !== "string"
    ) {
      return false;
    }

    const payload = ev.payload;
    if (!payload) {
      return true;
    }

    const { commits } = payload;
    if (commits === undefined) {
      return true;
    }

    if (!Array.isArray(commits)) {
      return false;
    }

    return commits.every((commit) => {
      if (typeof commit !== "object" || commit === null) {
        return false;
      }
      const data = commit as {
        sha?: unknown;
        message?: unknown;
        url?: unknown;
      };
      return (
        typeof data.sha === "string" &&
        typeof data.message === "string" &&
        typeof data.url === "string"
      );
    });
  }
}
