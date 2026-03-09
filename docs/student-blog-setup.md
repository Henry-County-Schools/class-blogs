# Student Blog Setup

## Assigned slug

Each student receives one permanent `studentSlug` from the instructor. The slug determines the
public URL and the folder the student is allowed to edit.

Slug rules:

- lowercase only
- letters, numbers, and hyphens only
- no spaces
- no renaming after publishing unless the instructor handles a migration

Your public URLs will be:

- `/students/{studentSlug}/`
- `/students/{studentSlug}/{postSlug}/`

## Where to edit

Update only files that belong to your assigned slug:

- Profile file: `src/content/students/{studentSlug}.json`
- Posts folder: `src/content/posts/{studentSlug}/`
- Optional assets: `public/student-assets/{studentSlug}/`

Do not create routes manually. Student pages and post URLs are generated from content automatically.

## Profile file

Your profile file is the source of truth for your assigned slug and GitHub username.

Required fields:

- `slug`
- `displayName`
- `githubUsername`
- `bio`
- `published`

Optional fields:

- `avatar`
- `accentColor`
- `links`

Example:

```json
{
  "slug": "student-slug",
  "displayName": "Display Name",
  "githubUsername": "github-user",
  "bio": "Short profile text for the student page.",
  "accentColor": "#8f5a28",
  "published": true
}
```

## Writing a post

Create Markdown files in your folder using this pattern:

`src/content/posts/{studentSlug}/YYYY-MM-DD-post-slug.md`

Required frontmatter:

```md
---
title: "Post title"
description: "Short summary used in listings and RSS."
publishDate: 2026-03-09
draft: false
---
```

Optional frontmatter:

- `updatedDate`
- `tags`

Example path:

`src/content/posts/student-slug/2026-03-09-first-post.md`

That file becomes:

`/students/student-slug/first-post/`

## Opening a pull request

1. Create or update your profile file.
2. Add your new Markdown post in your own folder.
3. Run the local checks if you have the project toolchain installed.
4. Open a PR and fill out the template.

The PR should contain only your assigned profile, posts, and optional asset files. CI will fail if
you edit another student's area.
