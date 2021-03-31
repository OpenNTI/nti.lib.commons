import { has } from './has.js';
import { parsePath } from './parse-path.js';

export function set(root, path, value) {
	if (!root || typeof root !== 'object') {
		throw new Error('Object Set: Cannot call with a non object root');
	}

	const { parts } = parsePath(path);
	const last = parts.pop();
	const prefix = [...parts];
	let o = root;

	for (let part of prefix) {
		if (!has(o, part) || o[part] == null) {
			o = o[part] = Object.create(null);
		} else if (typeof o[part] === 'object') {
			o = o[part];
		} else {
			throw new Error(
				'Object Set: Provided path has non-object part. ',
				part
			);
		}
	}

	o[last] = value;

	return root;
}
