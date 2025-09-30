#!/usr/bin/env bash

# Set default values
TITLE=""
SLUG=""
DATE=$(date +%Y-%m-%d)
LANGUAGE="en"
DESCRIPTION=""
TAGS=""
CATEGORIES=""
BASE_SLUG=""
DRAFT=false
INTERACTIVE=false
HELP=false

# Function to display help
show_help() {
    cat << EOF
Usage: npm run new-post [options]

Options:
    -t, --title TITLE         Post title (required)
    -s, --slug SLUG           Custom slug (auto-generated if not provided)
    -d, --date DATE           Post date in YYYY-MM-DD format (default: today)
    -l, --language LANG       Language code (default: en)
    -D, --description DESC    Post description (default: same as title)
    --tags TAGS               Comma-separated tags
    --categories CATS         Comma-separated categories
    --base-slug SLUG          Base slug for translations
    --draft                   Create as draft (default: false)
    -i, --interactive         Interactive mode
    -h, --help                Show this help

Examples:
    npm run new-post "My First Post"
    npm run new-post -t "Work in Progress" --draft
    npm run new-post -t "My First Post" -l ko --tags "react,tutorial"
    npm run new-post --interactive

Note: If you provide just a title without flags, it will be treated as the post title.
EOF
}

# Function to slugify text
slugify() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g'
}

# Function to generate slug
generate_slug() {
    local title="$1"
    local language="$2"
    local base_slug=$(slugify "$title")
    echo "${base_slug}-${language}"
}

# Function to create markdown template
create_template() {
    local title="$1"
    local slug="$2"
    local date="$3"
    local language="$4"
    local description="$5"
    local tags="$6"
    local categories="$7"
    local base_slug="$8"
    local draft="$9"
    local filepath="${10}"

    cat > "$filepath" << EOF
---
title: "$title"
slug: "$slug"
date: "$date"
language: "$language"
description: "$description"$([ -n "$tags" ] && echo -e "\ntags: [$tags]")$([ -n "$categories" ] && echo -e "\ncategories: [$categories]")$([ -n "$base_slug" ] && echo -e "\nbaseSlug: \"$base_slug\"")$([ "$draft" = true ] && echo -e "\ndraft: true")
---

# $title

Write your blog post content here...

## Getting Started

Add your introduction here.

## Main Content

Develop your main points here.

## Conclusion

Wrap up your thoughts here.
EOF
}

# Function to prompt for input
prompt_input() {
    local prompt="$1"
    local default="$2"
    local result

    if [ -n "$default" ]; then
        read -p "$prompt (default: $default): " result
        echo "${result:-$default}"
    else
        read -p "$prompt: " result
        echo "$result"
    fi
}

# Function to format tags/categories for YAML
format_list() {
    if [ -n "$1" ]; then
        echo "$1" | sed 's/,/, /g' | sed 's/[^,]*/"&"/g'
    fi
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--title)
            TITLE="$2"
            shift 2
            ;;
        -s|--slug)
            SLUG="$2"
            shift 2
            ;;
        -d|--date)
            DATE="$2"
            shift 2
            ;;
        -l|--language)
            LANGUAGE="$2"
            shift 2
            ;;
        -D|--description)
            DESCRIPTION="$2"
            shift 2
            ;;
        --tags)
            TAGS="$2"
            shift 2
            ;;
        --categories)
            CATEGORIES="$2"
            shift 2
            ;;
        --base-slug)
            BASE_SLUG="$2"
            shift 2
            ;;
        --draft)
            DRAFT=true
            shift
            ;;
        -i|--interactive)
            INTERACTIVE=true
            shift
            ;;
        -h|--help)
            HELP=true
            shift
            ;;
        -*)
            echo "Unknown option $1"
            show_help
            exit 1
            ;;
        *)
            # If no title was set and this is the first positional argument, treat it as title
            if [ -z "$TITLE" ]; then
                TITLE="$1"
            fi
            shift
            ;;
    esac
done

# Show help if requested
if [ "$HELP" = true ]; then
    show_help
    exit 0
fi

# Interactive mode or missing title
if [ "$INTERACTIVE" = true ] || [ -z "$TITLE" ]; then
    if [ "$INTERACTIVE" = true ]; then
        echo "Creating a new blog post..."
        echo
    fi

    if [ -z "$TITLE" ]; then
        TITLE=$(prompt_input "Post title (required)")
        if [ -z "$TITLE" ]; then
            echo "Error: Title is required"
            exit 1
        fi
    fi

    if [ "$INTERACTIVE" = true ]; then
        SLUG=$(prompt_input "Slug" "$(generate_slug "$TITLE" "$LANGUAGE")")
        DATE=$(prompt_input "Date (YYYY-MM-DD)" "$DATE")
        LANGUAGE=$(prompt_input "Language" "$LANGUAGE")
        DESCRIPTION=$(prompt_input "Description" "$TITLE")
        TAGS=$(prompt_input "Tags (comma-separated)")
        CATEGORIES=$(prompt_input "Categories (comma-separated)")
        BASE_SLUG=$(prompt_input "Base slug (for translations)")

        read -p "Save as draft? (y/N): " draft_response
        if [[ "$draft_response" =~ ^[Yy]$ ]]; then
            DRAFT=true
        fi
    fi
fi

# Set defaults if not provided
if [ -z "$SLUG" ]; then
    SLUG=$(generate_slug "$TITLE" "$LANGUAGE")
fi

if [ -z "$DESCRIPTION" ]; then
    DESCRIPTION="$TITLE"
fi

# Format tags and categories
FORMATTED_TAGS=$(format_list "$TAGS")
FORMATTED_CATEGORIES=$(format_list "$CATEGORIES")

# Create content directory if it doesn't exist
CONTENT_DIR="content/blog"
mkdir -p "$CONTENT_DIR"

# Create the file path
FILENAME="${SLUG}.md"
FILEPATH="${CONTENT_DIR}/${FILENAME}"

# Check if file already exists
if [ -f "$FILEPATH" ]; then
    echo "Error: File $FILENAME already exists"
    exit 1
fi

# Create the markdown file
create_template "$TITLE" "$SLUG" "$DATE" "$LANGUAGE" "$DESCRIPTION" "$FORMATTED_TAGS" "$FORMATTED_CATEGORIES" "$BASE_SLUG" "$DRAFT" "$FILEPATH"

echo "Created new blog post: $FILEPATH"
echo "Slug: $SLUG"
echo "Status: $([ "$DRAFT" = true ] && echo "Draft" || echo "Published")"
echo "URL: /blog/$SLUG"
