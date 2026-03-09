import rss from '@astrojs/rss';
import { siteConfig } from '../config/site';
import { getPostUrl, getPublishedPostEntries } from '../lib/content';

export async function GET(context) {
	const posts = await getPublishedPostEntries();

	return rss({
		title: siteConfig.title,
		description: siteConfig.description,
		site: context.site ?? siteConfig.siteUrl,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.publishDate,
			link: getPostUrl(post),
			categories: post.data.tags,
		})),
	});
}
