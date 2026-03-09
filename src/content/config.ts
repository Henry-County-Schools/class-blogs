import { defineCollection, z } from 'astro:content';

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const githubUsernamePattern = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const accentPattern = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

export const studentSchema = z.object({
	slug: z.string().regex(slugPattern, 'Use lowercase letters, numbers, and hyphens only.'),
	displayName: z.string().min(1),
	githubUsername: z
		.string()
		.regex(githubUsernamePattern, 'Use a valid GitHub username without the leading @.'),
	bio: z.string().min(1),
	avatar: z.string().optional(),
	accentColor: z.string().regex(accentPattern).optional(),
	links: z
		.array(
			z.object({
				label: z.string().min(1),
				url: z.string().url(),
			}),
		)
		.optional(),
	published: z.boolean(),
});

export const postSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	publishDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	tags: z.array(z.string().min(1)).default([]),
	draft: z.boolean().default(false),
});

export const collections = {
	students: defineCollection({
		type: 'data',
		schema: studentSchema,
	}),
	posts: defineCollection({
		type: 'content',
		schema: postSchema,
	}),
};
