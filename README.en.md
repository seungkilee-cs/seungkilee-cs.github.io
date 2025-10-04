# Personal Website – Seung Ki Lee

## Overview
This repository powers the public site at [seungkilee-cs.github.io](https://seungkilee-cs.github.io/). It is a single-page application built with Vite and React, featuring a curated "About" page, project highlights, contact details, and a Markdown-driven blog with multilingual support.

### Tech Stack
- **Framework**: React 19 with React Router 7
- **Build tooling**: Vite 7, TypeScript 5.8, ESLint 9
- **Styling**: CSS Modules scoped per component
- **Content**: Markdown posts parsed at build time via `import.meta.glob` and `front-matter`

## Getting Started
- **Requirements**: Node.js 20+ (for native `fetch`) and npm 10+
- **Install dependencies**:
  ```bash
  npm install
  ```
- **Start the dev server**:
  ```bash
  npm run dev
  ```
  Vite serves the app at `http://localhost:5173` by default with hot module replacement.

## Available npm Scripts
- **dev**: Launches the Vite dev server.
- **build**: Runs `tsc -b` then `vite build` to emit production assets to `dist/`.
- **preview**: Serves the production build locally for smoke testing.
- **lint**: Executes ESLint across the repo.
- **deploy**: Builds the site and publishes `dist/` to the `gh-pages` branch via `gh-pages` CLI.
- **new-post**: Wrapper for `scripts/new-post.sh` to scaffold blog posts.

## Deployment
- **Primary workflow**: `npm run deploy` builds and pushes the latest `dist/` output to GitHub Pages using the `gh-pages` package. Ensure you have run `npm run build` or let the script invoke it via `predeploy`.
- **Shell scripts**:
  - **`git-deploy.sh`**: Guarded deployment script that enforces a clean `master` branch, builds, and pushes via a temporary worktree. Use when you need additional safety checks or when the `gh-pages` package is unavailable.
  - **`git-branch-deploy.sh`**: Branch-specific preview deployer, allowing feature branches to publish to isolated folders on `gh-pages`.

## Blog Authoring Workflow
Blog posts live in `content/blog/` and are parsed by `src/lib/loadPosts.ts`.

### Create a Post
1. Run `npm run new-post -- -t "Post Title"` (flags after `--` are forwarded to the script).
2. Optional flags:
   - `--language` (`en`, `ko`, etc.)
   - `--draft` to keep the post hidden in production
   - `--interactive` for guided prompts
3. The script generates a Markdown file with front matter. Draft posts are omitted from listings unless explicitly included via helper functions in `loadPosts.ts`.

### Front Matter Reference
```yaml
---
title: "Example Post"
slug: "example-post-en"
date: "2025-01-01"
language: "en"
description: "Short summary for listings"
tags: ["react", "notes"]
categories: ["engineering"]
baseSlug: "example-post"
draft: true
---
```
- **`slug`** must be unique per language. The script appends the language code by default.
- **`baseSlug`** links translations together and powers `getPostTranslations()` in `src/lib/loadPosts.ts`.

## GitHub Activity & Contributions
- **Recent commits**: `src/pages/About/About.tsx` consumes `fetchRecentCommits()` from `src/services/github.ts`. Consider providing a personal access token if you observe rate limiting.
- **Contribution heatmap**: Refresh `src/content/contrib.json` by running:
  ```bash
  node scripts/fetch-contrib.mjs seungkilee-cs
  ```
  Replace the username as needed; the script scrapes contribution SVG data and writes JSON for the UI.

## Project Structure (Highlights)
- **`src/components/Nav/`**: Top-level navigation (pending responsive overhaul).
- **`src/pages/Blog/`**: Blog list and article view, including translation links.
- **`src/services/github.ts`**: GitHub API integration for recent activity.
- **`scripts/`**: Automation helpers for blog scaffolding and contribution syncing.
- **`docs/`**: Internal documentation and improvement backlog (`docs/todo/repo-improvements.md`).

## Internationalization Notes
- This README links to language-specific variants (`README.ko.md` for Korean).
- Blog translations rely on pairing posts via `baseSlug` and language-specific slugs.

## Roadmap Snapshot
- **Documentation**: Expand this README with visuals and architecture diagrams as the system evolves.
- **Testing & CI**: Vitest + GitHub Actions are planned (see `docs/todo/repo-improvements.md`).
