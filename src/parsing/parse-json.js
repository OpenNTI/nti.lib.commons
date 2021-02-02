/**
 * Parses JSON without throwing an exception if there was a problem. Simply returns null instead.
 *
 * @param  {string} string The value to be parsed into json
 * @returns {*} The result of parsing.
 */
export default function parseJSONSafely (string) {
	try {
		return JSON.parse(string || 'null');
	} catch (e) {
		return null;
	}
}
