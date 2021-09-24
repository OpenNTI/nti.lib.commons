const hasSameNumberOfKeys = (A, B) =>
	Object.keys(B).length === Object.keys(A).length;

const getKeys = (A, B) =>
	Array.from(new Set([...Object.keys(A), ...Object.keys(B)]));

const seen = new Map();
function getComparable(o, path) {
	if (o instanceof Date) {
		return o.getTime();
	}

	if (typeof o === 'object') {
		if (seen.has(o)) {
			return `[cycle ${seen.get(o)} <-> ${path}]`;
		}
		seen.set(o, path);
	}

	return o;
}

const compare = (A, B, deep, ...args) =>
	typeof A !== 'object' || !deep ? A === B : equals(A, B, deep, ...args);

export function equals(A, B, deep, path = '') {
	if (A === B || (A == null && B == null)) {
		return true;
	}
	if (!A || !B) {
		return false;
	}

	try {
		return (
			hasSameNumberOfKeys(A, B) &&
			getKeys(A, B).every(key => {
				const values = [A[key], B[key]].map(x =>
					getComparable(x, path + 'key')
				);
				return compare(...values, deep, path + '.' + key);
			})
		);
	} finally {
		seen.delete(A);
		seen.delete(B);
	}
}
