import has from './has';

/**
 * A function that given an object and a path to a value, will return a safe value. (will not throw) If any key in the
 * path is null/undefined, the traversal to the leaf is terminated and returns the last value (undefined or null)
 * If a computed property name contains the path separator, this will still work.
 *
 * @param {object} root - Object with nested values
 * @param {string} path - String path to value in object.
 * @param {string} sep - Optionaly specify an alternative path separator, the default is period (.)
 * @returns {*} - Value of the nested key or undefined/null if any key along that path is missing/null.
 */
export default function get (root, path, sep) {
	sep = typeof sep === 'string' ? sep : '.';
	path = typeof path === 'string' ? path.split(sep).reverse() : [];

	let o = root;

	while(o != null && path.length > 0) {
		let key = null;
		while ((!key || !has(o, key)) && path.length > 0) {
			let segment = path.pop();
			key = key == null ? segment : [key, segment].join(sep);
		}

		o = o[key];

	}

	return o;
}
