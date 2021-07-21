export function stringifyQuery(query) {
	const out = new URLSearchParams();

	for (const [key, value] of Object.entries(query || {})) {
		out.append(key, value);
	}

	return out.toString();
}
