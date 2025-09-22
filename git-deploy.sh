#!/usr/bin/env bash
# Simple build-and-deploy to gh-pages (static) without feature branches
# Intended for a Vite/React SPA (dist output). Adjust build command if needed.

set -euo pipefail

# Config
DEFAULT_BRANCH="${DEFAULT_BRANCH:-master}"
BUILD_DIR="${BUILD_DIR:-dist}"
REMOTE_NAME="${REMOTE_NAME:-origin}"

echo "Starting deployment to GitHub Pages..."

# Preconditions
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: Not a git repository."
  exit 1
fi

if [ ! -f package.json ]; then
  echo "Error: package.json not found. Run this in the project root."
  exit 1
fi

# Ensure default branch
git fetch --all --prune
if ! git show-ref --verify --quiet "refs/heads/${DEFAULT_BRANCH}"; then
  echo "Error: Default branch '${DEFAULT_BRANCH}' not found locally."
  exit 1
fi

git checkout "${DEFAULT_BRANCH}"
git pull --ff-only "${REMOTE_NAME}" "${DEFAULT_BRANCH}"

# Commit pending changes (optional)
if [ -z "$(git status --porcelain)" ]; then
  echo "No new changes to commit. Proceeding with build."
else
  read -r -p "Enter commit message (leave empty to auto-generate): " commit_message
  timestamp="$(date +'%Y-%m-%d_%H_%M_%S')"
  if [ -z "${commit_message}" ]; then
    commit_message="autodeploy-${timestamp}"
  else
    commit_message="${commit_message}-${timestamp}"
  fi
  echo "Committing changes..."
  git add -A
  git commit -m "${commit_message}"
  git push "${REMOTE_NAME}" "${DEFAULT_BRANCH}"
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

# Ensure gh-pages exists remotely (create if missing) using an orphan branch once
if git ls-remote --exit-code --heads "${REMOTE_NAME}" gh-pages >/dev/null 2>&1; then
  echo "gh-pages exists on remote."
else
  echo "Creating gh-pages branch (orphan) on remote..."
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

# Publish dist via a worktree checked out to gh-pages
PUB_DIR="$(mktemp -d)"
echo "Adding worktree for gh-pages at ${PUB_DIR}"
git worktree add "${PUB_DIR}" gh-pages

rsync -av --delete "${BUILD_DIR}/" "${PUB_DIR}/" --exclude ".git"

pushd "${PUB_DIR}" >/dev/null

# SPA 404 fallback
if [ -f index.html ] && [ ! -f 404.html ]; then
  cp index.html 404.html
fi

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "Publish ${BUILD_DIR} $(date +'%Y-%m-%d_%H_%M_%S')"
  git push "${REMOTE_NAME}" gh-pages
else
  echo "No changes to publish on gh-pages."
fi

popd >/dev/null
git worktree remove --force "${PUB_DIR}"

echo "Deployment complete. Pages will update shortly."
