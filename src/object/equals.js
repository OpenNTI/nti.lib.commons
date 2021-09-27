const hasSameNumberOfKeys = (A, B) =>
	Object.keys(B).length === Object.keys(A).length;

const getKeys = (A, B) =>
	Array.from(new Set([...Object.keys(A), ...Object.keys(B)]));

/** @type {Array<[unknown, string]>[]} */
const seen = [[], []];
const get = (x, o) => seen[x].find(x => x[0] === o)?.[1];
const add = (x, o, p) => seen[x].push([o, p]);

function getComparable(o, bin, path) {
	if (o instanceof Date) {
		return o.getTime();
	}

	if (typeof o === 'object') {
		const p = get(bin, o);
		if (p) {
			return `[cycle ${p} <-> ${path}]`;
		}
		add(bin, o, path);
	}

	return o;
}

const compare = (A, B, deep, ...args) =>
	typeof A !== 'object' || !deep ? A === B : equals(A, B, deep, ...args);

export function equals(A, B, deep, path = '') {
	if (typeof A !== 'object' || typeof B !== 'object') {
		return compare(A, B);
	}

	if (A === B || (A == null && B == null)) {
		return true;
	}
	if (!A || !B) {
		return false;
	}

	const [AStack, BStack] = seen;
	const { length: markA } = AStack;
	const { length: markB } = BStack;

	try {
		return (
			hasSameNumberOfKeys(A, B) &&
			getKeys(A, B).every(key => {
				const values = [A[key], B[key]].map((x, bin) =>
					getComparable(x, bin, [path, key].join('.'))
				);
				return compare(...values, deep, path + '.' + key);
			})
		);
	} finally {
		AStack.splice(markA, AStack.length);
		BStack.splice(markB, BStack.length);
	}
}

/**
 * Used in testing only
 *
 * @private
 * @returns {Array<[unknown, string]>[]}
 */
equals.__getSeen = () => seen;
