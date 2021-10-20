export function getPropertyDescriptor(scope, property) {
	const hasOwn =
		Object.hasOwn || ((x, y) => Object.prototype.hasOwnProperty.call(x, y));
	if (!(property in scope)) {
		return null;
	}

	while (!hasOwn(scope, property)) {
		scope = Object.getPrototypeOf(scope);
	}

	return Object.getOwnPropertyDescriptor(scope, property);
}
