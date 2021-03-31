import { ensure } from '../array/ensure.js';

import { parse, NULL_PROTO } from './parse.js';
export function appendQueryParams(uri, params) {
	if (uri == null) {
		throw new Error('Invalid URI');
	}
	const url = parse(uri);

	for (const [key, value] of Object.entries(params || {})) {
		url.searchParams.delete(key);

		for (const v of ensure(value)) {
			url.searchParams.append(key, '' + v);
		}
	}

	url.searchParams.sort();

	return url
		.toString()
		.replace(new RegExp('^' + NULL_PROTO), '')
		.replace(/^\/undefined/, '');
}
