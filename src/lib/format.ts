const longDateFormatter = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'long',
});

const compactDateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
});

export function formatDate(date: Date, style: 'long' | 'compact' = 'long') {
	return style === 'compact' ? compactDateFormatter.format(date) : longDateFormatter.format(date);
}
