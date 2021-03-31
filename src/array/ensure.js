export function ensure(a) {
	return Array.isArray(a) ? a : a == null ? [] : [a];
}
