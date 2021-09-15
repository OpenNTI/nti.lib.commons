import { ensure } from '../array/ensure.js';

import { parse } from './parse.js';
export function appendQueryParams(uri, params) {
	if (uri == null) {
		throw new Error('Invalid URI');
	}
	const url = parse(uri);

	for (const [key, value] of Object.entries(params || {})) {
		url.searchParams.delete(key);

		for (const v of ensure(value)) {
			url.searchParams.append(key, `${v}`);
		}
	}

	url.searchParams.sort();

	let str = url.toString().replace(/^\/undefined/, '');
	if (uri === '') {
		str = str.replace(/^\//, '');
	}

	return str;
}
