export function isSameOrigin(uri, as) {
	const toOrigin = o => (
		(o = new URL(o, 'file://')),
		Object.assign(o, { pathname: '', search: '', hash: '' }),
		o.toString()
	);

	return as && toOrigin(uri) === toOrigin(as);
}
