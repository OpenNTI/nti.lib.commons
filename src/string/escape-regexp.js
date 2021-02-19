const re = /[-[\]{}()*+?.,\\^$|#\s]/g;

export function escapeForRegExp(s) {
	if (typeof s !== 'string') {
		throw new TypeError('Expected a string');
	}

	return s.replace(re, '\\$&');
}
