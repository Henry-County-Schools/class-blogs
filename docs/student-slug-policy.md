# Student Slug Policy

## Purpose

Every student blog uses one permanent slug so the site can generate stable subpath URLs from a
single repository.

## Rules

- Each slug is unique across the entire course site.
- Slugs use lowercase letters, numbers, and hyphens only.
- Slugs do not include spaces or punctuation beyond hyphens.
- The slug in `src/content/students/{studentSlug}.json` must match the filename.
- Display names may change without changing the slug.
- Once a blog is published, the slug should be treated as permanent.

## Collision handling

If two students request the same slug, the instructor resolves the collision before the profile is
created. The profile file in `src/content/students/` is the source of truth.

## Publication state

- `published: false` keeps the student out of the public directory and post listings.
- `published: true` makes the student eligible for public route generation.

## Instructor responsibility

The instructor is responsible for:

- assigning the initial slug
- resolving collisions
- approving any slug migration
- coordinating any redirects if a published slug must change
