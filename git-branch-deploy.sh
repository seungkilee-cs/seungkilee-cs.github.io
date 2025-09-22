#!/usr/bin/env bash
# Feature-branch build-and-deploy to gh-pages (static) with automated merge
# Intended for a Vite/React SPA (dist output). Adjust build command if needed.

set -euo pipefail

# Config
DEFAULT_BRANCH="${DEFAULT_BRANCH:-master}"
BUILD_DIR="${BUILD_DIR:-dist}"
REMOTE_NAME="${REMOTE_NAME:-origin}"

echo "Starting feature-branch deployment..."

# Preconditions
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: Not a git repository."
  exit 1
fi

if [ ! -f package.json ]; then
  echo "Error: package.json not found. Run this in the project root."
  exit 1
fi

# Verify default branch exists locally
if ! git show-ref --verify --quiet "refs/heads/${DEFAULT_BRANCH}"; then
  echo "Error: Default branch '${DEFAULT_BRANCH}' not found locally."
  exit 1
fi

# Sync default branch
git fetch --all --prune
git checkout "${DEFAULT_BRANCH}"
git pull --ff-only "${REMOTE_NAME}" "${DEFAULT_BRANCH}"

# Detect changes
if [ -z "$(git status --porcelain)" ]; then
  echo "No new changes to commit in working tree."
else
  # Commit changes
  read -r -p "Enter commit message (leave empty to auto-generate): " commit_message
  timestamp="$(date +'%Y-%m-%d_%H_%M_%S')"
  if [ -z "${commit_message}" ]; then
    commit_message="autodeploy-${timestamp}"
  else
    commit_message="${commit_message}-${timestamp}"
  fi

  git add -A
  git commit -m "${commit_message}"
fi

# Create and push a temporary feature branch
timestamp="$(date +'%Y-%m-%d_%H_%M_%S')"
branch_name="autodeploy-${timestamp}"
echo "Creating feature branch: ${branch_name}"
git checkout -b "${branch_name}"
git push -u "${REMOTE_NAME}" "${branch_name}"

# Merge back into default branch (fast-forward if possible)
git checkout "${DEFAULT_BRANCH}"
# Try fast-forward, else a regular merge; fail if conflicts
if git merge --ff-only "${branch_name}"; then
  echo "Fast-forward merge completed."
else
  echo "Non fast-forward merge required; attempting a no-ff merge."
  git merge --no-edit "${branch_name}"
fi

# Install deps if needed
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm ci
fi

# Build
echo "Building project..."
npm run build

if [ ! -d "${BUILD_DIR}" ]; then
  echo "Error: build directory '${BUILD_DIR}' not found after build."
  exit 1
fi

# Push default branch
git push "${REMOTE_NAME}" "${DEFAULT_BRANCH}"

# Ensure gh-pages exists remotely (create if missing)
if git ls-remote --exit-code --heads "${REMOTE_NAME}" gh-pages >/dev/null 2>&1; then
  echo "gh-pages exists on remote."
else
  echo "Creating gh-pages branch (empty initial commit) on remote..."
  tmpdir="$(mktemp -d)"
  git worktree add "${tmpdir}" --detach
  pushd "${tmpdir}" >/dev/null
  git checkout --orphan gh-pages
  rm -rf ./*
  git commit --allow-empty -m "Initial gh-pages commit"
  git push "${REMOTE_NAME}" gh-pages
  popd >/dev/null
  git worktree remove --force "${tmpdir}"
fi

# Deploy build to gh-pages using subtree (safer alternative commands below)
echo "Deploying ${BUILD_DIR} to gh-pages..."
# Ensure working tree clean for subtree
if [ -n "$(git status --porcelain)" ]; then
  echo "Error: working tree dirty. Commit or stash changes and retry."
  exit 1
fi

# Add subtree if not present; subtree push can fail if history changed; retry advice printed on error
set +e
git subtree push --prefix "${BUILD_DIR}" "${REMOTE_NAME}" gh-pages
status=$?
set -e
if [ $status -ne 0 ]; then
  echo "subtree push failed. Trying split+push fallback..."
  commit_ref="$(git subtree split --prefix "${BUILD_DIR}" "${DEFAULT_BRANCH}")"
  git push "${REMOTE_NAME}" "${commit_ref}:refs/heads/gh-pages"
fi

# Cleanup feature branch locally and remote
echo "Cleaning up feature branch: ${branch_name}"
git branch -D "${branch_name}" 2>/dev/null || true
git push "${REMOTE_NAME}" --delete "${branch_name}" 2>/dev/null || true

echo "Deployment complete. Pages will update shortly."
