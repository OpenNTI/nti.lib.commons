import path from 'path';

import { parse, NULL_PROTO } from './parse.js';

export function join(...parts) {
	const base = parse(parts.shift());

	const urls = parts.filter(Boolean).map(x => parse(x.toString(), base));

	for (let part of urls) {
		base.pathname = path.join(base.pathname, part.pathname);
		base.hash = part.hash || base.hash;
		part.searchParams.forEach((value, key) =>
			base.searchParams.set(key, value)
		);
	}

	return base.toString().replace(new RegExp('^' + NULL_PROTO), '');
}
