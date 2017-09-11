import path from 'path';
import url from 'url';

import QueryString from 'query-string';

export default function join (...parts) {
	let base = url.parse(parts.shift());

	parts.unshift(base.pathname);

	const urls = parts
		.filter(Boolean)
		.map(x => url.parse(x.toString()));

	for(let part of urls) {
		base.pathname = path.join(base.pathname, part.pathname);
		base.hash = part.hash;
		base.search = QueryString.stringify({
			...QueryString.parse(base.search),
			...QueryString.parse(part.search),
		});
	}

	return base.format();
}
