export const siteConfig = {
	title: 'Class Blogs',
	description:
		'A shared course publishing platform where each student contributes through one permanent subpath and instructor-reviewed pull requests.',
	siteUrl: 'https://class-blogs.example.edu',
	defaultAccent: '#61f4de',
	navigation: [
		{ href: '/', label: 'Course Hub' },
		{ href: '/students/', label: 'Student Directory' },
		{ href: '/docs/', label: 'Docs' },
		{ href: '/rss.xml', label: 'RSS Feed' },
	],
};

export type SiteConfig = typeof siteConfig;
