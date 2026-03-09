import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const rootDir = process.cwd();
const studentsDir = path.join(rootDir, 'src', 'content', 'students');
const postsDir = path.join(rootDir, 'src', 'content', 'posts');

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const filePattern = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;

async function walkMarkdownFiles(directory) {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const fullPath = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				return walkMarkdownFiles(fullPath);
			}
			return entry.name.endsWith('.md') ? [fullPath] : [];
		}),
	);
	return files.flat();
}

function parseDate(value, label, filePath, errors) {
	const date = new Date(value);
	if (Number.isNaN(date.valueOf())) {
		errors.push(`${filePath}: invalid ${label} "${value}".`);
	}
}

const errors = [];
const studentFiles = (await fs.readdir(studentsDir)).filter((file) => file.endsWith('.json'));
const studentSlugs = new Set();
const githubUsers = new Set();

for (const studentFile of studentFiles) {
	const fullPath = path.join(studentsDir, studentFile);
	const raw = await fs.readFile(fullPath, 'utf8');
	let data;

	try {
		data = JSON.parse(raw);
	} catch (error) {
		errors.push(`${fullPath}: invalid JSON (${error.message}).`);
		continue;
	}

	const expectedSlug = studentFile.replace(/\.json$/, '');
	const slug = data.slug;
	const githubUsername = data.githubUsername;

	if (typeof slug !== 'string' || !slugPattern.test(slug)) {
		errors.push(`${fullPath}: slug must use lowercase letters, numbers, and hyphens only.`);
		continue;
	}

	if (slug !== expectedSlug) {
		errors.push(`${fullPath}: slug "${slug}" must match filename "${expectedSlug}".`);
	}

	if (studentSlugs.has(slug)) {
		errors.push(`${fullPath}: duplicate student slug "${slug}".`);
	}
	studentSlugs.add(slug);

	if (typeof githubUsername !== 'string' || githubUsername.length === 0) {
		errors.push(`${fullPath}: githubUsername is required.`);
	} else {
		const normalized = githubUsername.toLowerCase();
		if (githubUsers.has(normalized)) {
			errors.push(`${fullPath}: duplicate githubUsername "${githubUsername}".`);
		}
		githubUsers.add(normalized);
	}
}

const markdownFiles = await walkMarkdownFiles(postsDir);
const postSlugsByStudent = new Set();

for (const fullPath of markdownFiles) {
	const relativePath = path.relative(postsDir, fullPath);
	const [studentSlug, fileName, ...rest] = relativePath.split(path.sep);

	if (!studentSlug || !fileName || rest.length > 0) {
		errors.push(`${fullPath}: posts must be stored as src/content/posts/{studentSlug}/YYYY-MM-DD-post-slug.md.`);
		continue;
	}

	if (!studentSlugs.has(studentSlug)) {
		errors.push(`${fullPath}: no student profile exists for slug "${studentSlug}".`);
	}

	if (!filePattern.test(fileName)) {
		errors.push(`${fullPath}: filename must match YYYY-MM-DD-post-slug.md.`);
		continue;
	}

	const source = await fs.readFile(fullPath, 'utf8');
	const { data } = matter(source);

	if (typeof data.title !== 'string' || data.title.trim().length === 0) {
		errors.push(`${fullPath}: title is required.`);
	}

	if (typeof data.description !== 'string' || data.description.trim().length === 0) {
		errors.push(`${fullPath}: description is required.`);
	}

	if (!('publishDate' in data)) {
		errors.push(`${fullPath}: publishDate is required.`);
	} else {
		parseDate(data.publishDate, 'publishDate', fullPath, errors);
	}

	if ('updatedDate' in data) {
		parseDate(data.updatedDate, 'updatedDate', fullPath, errors);
	}

	const postSlug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
	const duplicateKey = `${studentSlug}:${postSlug}`;
	if (postSlugsByStudent.has(duplicateKey)) {
		errors.push(`${fullPath}: duplicate post slug "${postSlug}" for student "${studentSlug}".`);
	}
	postSlugsByStudent.add(duplicateKey);
}

if (errors.length > 0) {
	console.error('Content validation failed:\n');
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

console.log(
	`Content validation passed for ${studentFiles.length} student profiles and ${markdownFiles.length} Markdown posts.`,
);
