# Class Blogs

This repository hosts a shared class blogging platform built with Astro. Every student gets one
assigned slug and one canonical URL space:

- `/students/{studentSlug}/`
- `/students/{studentSlug}/{postSlug}/`

The root site acts as the course hub, while students submit new posts through pull requests that are
validated and reviewed before merge.

## Local setup

This project standardizes on `pnpm` and Node 22.

Install `pnpm` with one of these approaches:

```sh
corepack enable
corepack prepare pnpm@10.31.0 --activate
```

or

```sh
npm install -g pnpm
```

Then install dependencies and start the dev server:

```sh
pnpm install
pnpm dev
```

## Commands

```sh
pnpm dev
pnpm build
pnpm preview
pnpm check
pnpm validate:content
pnpm validate:ownership --base <baseSha> --head <headSha>
```

## Content structure

```text
src/content/
├── students/
│   └── {studentSlug}.json
└── posts/
    └── {studentSlug}/
        └── YYYY-MM-DD-post-slug.md
```

Student pages and post pages are generated automatically from those content folders.

## Important paths

- Student onboarding: `docs/student-blog-setup.md`
- Slug rules: `docs/student-slug-policy.md`
- Instructor workflow: `docs/instructor-operations.md`
- Public student docs page: `/docs/`
- Content schemas: `src/content/config.ts`
- CI workflow: `.github/workflows/ci.yml`

## Notes

- Students should only edit files within their assigned slug area.
- Unpublished student profiles stay out of the public directory and route generation.
- Branch protection should be configured in GitHub to require PRs, passing CI, and instructor review.
