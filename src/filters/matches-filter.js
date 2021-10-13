function doesMatchFilter(value, filter) {
	return value?.indexOf(filter) >= 0;
}

/**
 * Given a string normalize so it matches similar strings
 *
 * ex. 'test' is the same as 'TEST'
 *
 * @param  {string} term value to normalize
 * @returns {string}      the normalized value
 */
export function normalize(term) {
	return term?.toLowerCase();
}

/**
 * Create a function to pass to an array filter to remove items that do not match the term.
 *
 * @param  {string}   term   the term to match the items to
 * @param  {Function} getter a function that given an item returns the string to compare the term against
 * @returns {Function}        a function to pass to array.filter
 */
export function generateMatchFilter(term = '', getter = x => x) {
	term = normalize(term);

	return x => {
		return doesMatchFilter(normalize(getter(x)), term);
	};
}

/**
 * Whether or not a given value matches a filter
 *
 * @param  {string} value  the value to check
 * @param  {string} filter the filter to check against
 * @returns {boolean}       if it matches or not
 */
export function matchesFilter(value, filter) {
	return doesMatchFilter(normalize(value), normalize(filter));
}
