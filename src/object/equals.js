const hasSameNumberOfKeys = (A, B) =>
	Object.keys(B).length === Object.keys(A).length;

function getComparable(o) {
	if (o instanceof Date) {
		return o.getTime();
	}

	return o;
}

const compare = (A, B, deep) =>
	typeof A !== 'object' || !deep ? A === B : equals(A, B, deep);

export function equals(A, B, deep) {
	if (!A && !B) {
		return true;
	}
	if (!A || !B) {
		return false;
	}

	return (
		hasSameNumberOfKeys(A, B) &&
		Object.keys(A).every(key =>
			compare(...[A[key], B[key], deep].map(getComparable))
		)
	);
}
