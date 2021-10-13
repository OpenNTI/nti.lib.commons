/** @typedef {string | number | symbol} Key */
/**
 * Remove and return value at key.
 *
 * @template T
 * @param {Record<Key, T>} object
 * @param {Key} key
 * @param {T} results temp variable
 * @returns {T} the value at key
 */
export const pop = (object, key, results) => (
	(results = object[key]), delete object[key], results
);
