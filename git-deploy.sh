#!/usr/bin/env bash

# Pushing directly to master for dist deployment

# Check if the current directory is a git repository
if [ -d .git ] || git rev-parse --git-dir > /dev/null 2>&1; then
    echo "This is a git repository. The script will run."

    # Get the current timestamp
    timestamp=$(date +"%Y-%m-%d_%H_%M_%S")

    # Check if there are any changes that have not been staged
    if [ -z "$(git status --porcelain)" ]; then
        echo "No new changes to commit. Exiting."
        exit 1
    fi

    # Prompt the user for a commit message
    read -p "Enter commit message: " commit_message

    # Set the commit message, appending the timestamp if empty
    if [ -z "$commit_message" ]; then
        commit_message="autodeploy-$timestamp"
    else
        commit_message="$commit_message-$timestamp"
    fi

    # Add all changes to git
    git add .

    # Commit the changes
    git commit -m "$commit_message"

    # Push the changes to the master branch at the remote repository
    git push origin master

else
    echo "This is not a git repository. The script will not run."
fi
