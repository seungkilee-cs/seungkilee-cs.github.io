#!/usr/bin/env bash

# Next.js GitHub Pages deployment script

set -e # Exit on any error

echo "🚀 Starting Next.js deployment to GitHub Pages..."

# Check if the current directory is a git repository
if [ ! -d .git ] && ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "❌ This is not a git repository. The script will not run."
  exit 1
fi

echo "✅ Git repository detected"

# Check if package.json exists
if [ ! -f package.json ]; then
  echo "❌ package.json not found. Make sure you're in a Next.js project directory."
  exit 1
fi

# Get the current timestamp
timestamp=$(date +"%Y-%m-%d_%H_%M_%S")

# Check if there are any changes that have not been staged
if [ -z "$(git status --porcelain)" ]; then
  echo "ℹ️  No new changes to commit. Proceeding with build and deploy..."
else
  # Prompt the user for a commit message
  read -p "Enter commit message: " commit_message

  # Set the commit message, appending the timestamp if empty
  if [ -z "$commit_message" ]; then
    commit_message="autodeploy-$timestamp"
  else
    commit_message="$commit_message-$timestamp"
  fi

  echo "📝 Committing changes..."
  # Add all changes to git
  git add .

  # Commit the changes
  git commit -m "$commit_message"

  # Push to main branch
  git push origin main
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies..."
  npm ci
fi

# Build the Next.js application
echo "🏗️  Building Next.js application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "❌ Build failed! Please fix the errors and try again."
  exit 1
fi

# Deploy to GitHub Pages using gh-pages branch
echo "🚀 Deploying to GitHub Pages..."

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
  echo "✅ gh-pages branch exists"
else
  echo "🆕 Creating gh-pages branch..."
  git checkout --orphan gh-pages
  git rm -rf .
  git commit --allow-empty -m "Initial gh-pages commit"
  git checkout main
fi

# Deploy built files to gh-pages
git subtree push --prefix dist origin gh-pages

echo "✅ Deployment complete! Your site should be available shortly on GitHub Pages."
