import has from './has';
import parsePath from './parse-path';

/**
 * A function that given an object and a path to a value, will return a safe value. (will not throw) If any key in the
 * path is null/undefined, the traversal to the leaf is terminated and returns the last value (undefined or null)
 * If a computed property name contains the path separator, this will still work.
 *
 * @param {object} root - Object with nested values
 * @param {*} path - path to value in object.
 * @param {function} keyCollector - a function called each time we access a key
 * @returns {*} - Value of the nested key or undefined/null if any key along that path is missing/null.
 */
export default function get (root, path, keyCollector) {
	let {parts, sep} = parsePath(path);
	let o = root;

	parts = parts.reverse();

	while(o != null && parts.length > 0) {
		let key = null;
		while ((!key || !has(o, key)) && parts.length > 0) {
			let segment = parts.pop();
			key = key == null ? segment : [key, segment].join(sep);
		}

		if (Object.prototype.hasOwnProperty.call(o, key)) {
			keyCollector?.(key);
		}
		o = o[key];

	}

	return o;
}
