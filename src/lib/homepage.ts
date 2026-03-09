import { siteConfig } from '../config/site';
import {
	getPostUrl,
	getPublishedPostEntries,
	getPublishedStudents,
	getStudentSlugFromPost,
	getStudentUrl,
} from './content';
import { formatDate } from './format';

export async function getHomepageData() {
	const students = await getPublishedStudents();
	const posts = await getPublishedPostEntries();
	const studentMap = new Map(students.map((student) => [student.data.slug, student]));

	const recentPosts = posts.slice(0, 4).map((post) => {
		const studentSlug = getStudentSlugFromPost(post);
		const student = studentMap.get(studentSlug);
		return {
			title: post.data.title,
			description: post.data.description,
			date: formatDate(post.data.publishDate, 'compact'),
			studentName: student?.data.displayName ?? studentSlug,
			studentSlug,
			postUrl: getPostUrl(post),
			studentUrl: getStudentUrl(studentSlug),
			tags: post.data.tags.slice(0, 3),
		};
	});

	return {
		title: siteConfig.title,
		description: siteConfig.description,
		routeExample: '/students/{studentSlug}/',
		studentCount: students.length,
		postCount: posts.length,
		recentPosts,
		editPaths: [
			'src/content/students/{studentSlug}.json',
			'src/content/posts/{studentSlug}/YYYY-MM-DD-post-slug.md',
			'public/student-assets/{studentSlug}/',
		],
		workflow: [
			'Assign or confirm the student slug',
			'Write profile and Markdown post content',
			'Open a PR for review and validation',
			'Merge to publish on the shared domain',
		],
	};
}
