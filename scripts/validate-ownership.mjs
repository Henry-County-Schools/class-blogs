import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

function readArg(flag) {
	const index = process.argv.indexOf(flag);
	return index >= 0 ? process.argv[index + 1] : undefined;
}

function getChangedFiles(base, head) {
	const output = execFileSync('git', ['diff', '--name-only', '--diff-filter=ACMRT', base, head], {
		encoding: 'utf8',
	});
	return output
		.split('\n')
		.map((value) => value.trim())
		.filter(Boolean);
}

const actor = process.env.GITHUB_ACTOR?.trim().toLowerCase();
const base = readArg('--base') ?? process.env.BASE_SHA;
const head = readArg('--head') ?? process.env.HEAD_SHA;
const instructorUsers = (process.env.INSTRUCTOR_GITHUB_USERS ?? '')
	.split(',')
	.map((value) => value.trim().toLowerCase())
	.filter(Boolean);

if (!actor || !base || !head) {
	console.error('Ownership validation requires GITHUB_ACTOR, --base, and --head.');
	process.exit(1);
}

if (instructorUsers.includes(actor)) {
	console.log(`Ownership validation skipped for instructor account "${actor}".`);
	process.exit(0);
}

const studentsDir = path.join(process.cwd(), 'src', 'content', 'students');
const studentFiles = (await fs.readdir(studentsDir)).filter((file) => file.endsWith('.json'));
const actorToSlug = new Map();

for (const studentFile of studentFiles) {
	const filePath = path.join(studentsDir, studentFile);
	const raw = await fs.readFile(filePath, 'utf8');
	const data = JSON.parse(raw);
	if (typeof data.githubUsername === 'string' && typeof data.slug === 'string') {
		actorToSlug.set(data.githubUsername.toLowerCase(), data.slug);
	}
}

const actorSlug = actorToSlug.get(actor);
if (!actorSlug) {
	console.error(
		`Ownership validation failed: "${actor}" is not mapped to a student slug in src/content/students/.`,
	);
	process.exit(1);
}

const changedFiles = getChangedFiles(base, head);
const allowedPrefixes = [
	`src/content/posts/${actorSlug}/`,
	`public/student-assets/${actorSlug}/`,
];
const allowedFiles = new Set([`src/content/students/${actorSlug}.json`]);

const disallowedFiles = changedFiles.filter((file) => {
	if (allowedFiles.has(file)) {
		return false;
	}
	return !allowedPrefixes.some((prefix) => file.startsWith(prefix));
});

if (disallowedFiles.length > 0) {
	console.error(`Ownership validation failed for "${actor}" with assigned slug "${actorSlug}".`);
	console.error('Only the following paths are allowed:');
	console.error(`- src/content/students/${actorSlug}.json`);
	console.error(`- src/content/posts/${actorSlug}/`);
	console.error(`- public/student-assets/${actorSlug}/`);
	console.error('\nDisallowed changes:');
	for (const file of disallowedFiles) {
		console.error(`- ${file}`);
	}
	process.exit(1);
}

console.log(
	`Ownership validation passed for "${actor}" with ${changedFiles.length} changed file(s) in the assigned area.`,
);
