# Instructor Operations

## Initial setup

1. Create one student profile file per assigned slug in `src/content/students/`.
2. Set each profile's `githubUsername` to the account that will open PRs.
3. Leave `published: false` until the student is ready to appear publicly.
4. Add the repository variable `INSTRUCTOR_GITHUB_USERS` in GitHub settings with a comma-separated
   list of instructor usernames who should bypass student ownership restrictions.

## Adding a student

Create a new JSON file:

`src/content/students/{studentSlug}.json`

Recommended bootstrap fields:

- `slug`
- `displayName`
- `githubUsername`
- `bio`
- `published: false`

Students should not create their own slug registry entry unless you deliberately want to relax that
workflow.

## Reviewing student PRs

Student PRs should normally change only:

- `src/content/students/{studentSlug}.json`
- `src/content/posts/{studentSlug}/`
- `public/student-assets/{studentSlug}/`

CI checks:

- content rules and naming
- ownership restrictions
- `astro check`
- production build

## Publishing and unpublishing

- Change `published` to `true` when the student should appear publicly.
- Change `published` to `false` to remove that student from public routes and listings.
- Posts inside unpublished student folders stay in the repository but are not generated publicly.

## Branch protection

Configure branch protection in GitHub for the default branch:

- require pull requests before merging
- require CI to pass
- require at least one instructor review

These settings are managed in the GitHub repository UI, not inside the Astro project itself.
