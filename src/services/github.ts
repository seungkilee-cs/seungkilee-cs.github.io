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
    payload: { commits?: Array<{ sha: string; message: string; url: string }> };
    created_at: string;
  };

  const events: any[] = await res.json();
  const items: CommitItem[] = [];

  for (const ev of events as PushEvent[]) {
    if (ev.type !== "PushEvent" || !ev.payload?.commits) continue;
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
}
