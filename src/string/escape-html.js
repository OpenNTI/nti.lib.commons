export const escapeHTML = html => (
	html
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
);
