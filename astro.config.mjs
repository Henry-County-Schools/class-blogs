// @ts-check
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://class-blogs.example.edu';

export default defineConfig({
	site,
});
