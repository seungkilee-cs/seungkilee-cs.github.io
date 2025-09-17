#!/usr/bin/env bash

# Next.js GitHub Pages deployment with feature branch workflow

set -e # Exit on any error

echo "🚀 Starting Next.js feature branch deployment..."

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
  echo "❌ No new changes to commit. Exiting."
  exit 1
fi

# Prompt the user for a commit message
read -p "Enter commit message: " commit_message

# Set the commit message, appending the timestamp if empty
if [ -z "$commit_message" ]; then
  commit_message="feature-$timestamp"
else
  commit_message="$commit_message-$timestamp"
fi

# Create the branch name
branch_name="feature-$timestamp"

echo "📝 Creating feature branch: $branch_name"

# Add all changes to git
git add .

# Commit the changes
git commit -m "$commit_message"

# Create a new branch and switch to it
git checkout -b $branch_name

# Push the new branch to the remote repository
git push origin $branch_name

# Switch back to the main branch
git checkout main

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
  echo "📦 Installing dependencies..."
  npm ci
fi

# Build the Next.js application to test
echo "🏗️  Testing build on main branch..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "❌ Build failed on main branch! Please fix before merging."
  git checkout $branch_name
  echo "🔄 Switched back to feature branch: $branch_name"
  echo "Fix the issues and run the script again."
  exit 1
fi

# Merge the new branch into main
echo "🔀 Merging $branch_name into main..."
git merge $branch_name --no-ff -m "Merge feature branch: $branch_name"

# Push the changes to the main branch
git push origin main

# Deploy to GitHub Pages
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

# Clean up: Delete the local feature branch
git branch -d $branch_name

# Delete the feature branch from the remote repository
git push origin --delete $branch_name

echo "✅ Feature branch deployment complete!"
echo "🗑️  Cleaned up feature branch: $branch_name"
echo "🌐 Your site should be available shortly on GitHub Pages."
