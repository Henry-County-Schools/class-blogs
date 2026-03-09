import { getCollection, type CollectionEntry } from 'astro:content';
import { siteConfig } from '../config/site';

export type StudentEntry = CollectionEntry<'students'>;
export type PostEntry = CollectionEntry<'posts'>;

const markdownExtensionPattern = /\.(md|mdx)$/i;

export function getStudentUrl(studentSlug: string) {
	return `/students/${studentSlug}/`;
}

export function getStudentSlugFromPost(post: PostEntry) {
	const [studentSlug] = post.id.split('/');
	if (!studentSlug) {
		throw new Error(`Unable to derive student slug from post id "${post.id}".`);
	}
	return studentSlug;
}

export function getPostStem(post: PostEntry) {
	const segment = post.id.split('/').pop() ?? post.slug.split('/').pop() ?? post.slug;
	return segment.replace(markdownExtensionPattern, '');
}

export function getPostSlug(post: PostEntry) {
	return getPostStem(post).replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

export function getPostUrl(post: PostEntry) {
	return `${getStudentUrl(getStudentSlugFromPost(post))}${getPostSlug(post)}/`;
}

export function getStudentAccent(student: StudentEntry) {
	return student.data.accentColor ?? siteConfig.defaultAccent;
}

export function sortPosts(posts: PostEntry[]) {
	return [...posts].sort(
		(left, right) => right.data.publishDate.valueOf() - left.data.publishDate.valueOf(),
	);
}

export async function getAllStudents() {
	return getCollection('students');
}

export async function getPublishedStudents() {
	const students = await getAllStudents();
	return students
		.filter((student) => student.data.published)
		.sort((left, right) => left.data.displayName.localeCompare(right.data.displayName));
}

export async function getPublishedStudentBySlug(studentSlug: string) {
	const students = await getPublishedStudents();
	return students.find((student) => student.data.slug === studentSlug);
}

export async function getPublishedPostEntries() {
	const students = await getPublishedStudents();
	const publishedStudentSlugs = new Set(students.map((student) => student.data.slug));
	const posts = await getCollection('posts');

	return sortPosts(
		posts.filter(
			(post) => !post.data.draft && publishedStudentSlugs.has(getStudentSlugFromPost(post)),
		),
	);
}

export async function getPostsByStudent(studentSlug: string) {
	const posts = await getPublishedPostEntries();
	return posts.filter((post) => getStudentSlugFromPost(post) === studentSlug);
}

export async function getPublishedPostByParams(studentSlug: string, postSlug: string) {
	const posts = await getPostsByStudent(studentSlug);
	return posts.find((post) => getPostSlug(post) === postSlug);
}
