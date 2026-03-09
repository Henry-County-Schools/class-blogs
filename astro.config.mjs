// @ts-check
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://blogs.sow.care';

export default defineConfig({
	site,
});
