/**
 * Create a function to pass to an array filter to remove items that do not match the term.
 *
 * @param  {String}   term   the term to match the items to
 * @param  {Function} getter a function that given an item returns the string to compare the term against
 * @return {Function}        a function to pass to array.filter
 */
export default function generateMatchFilter (term = '', getter = x => x) {
	term = term.toLowerCase();

	return (x) => {
		return getter(x).toLowerCase().indexOf(term) >= 0;
	};
}
