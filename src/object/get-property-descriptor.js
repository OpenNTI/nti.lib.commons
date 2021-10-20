const hasOwn =
	Object.hasOwn || ((x, y) => Object.prototype.hasOwnProperty.call(x, y));

export function getPropertyDescriptor(scope, property) {
	if (!scope || !(property in scope)) {
		return null;
	}

	try {
		while (!hasOwn(scope, property)) {
			scope = Object.getPrototypeOf(scope);
		}

		return Object.getOwnPropertyDescriptor(scope, property);
	} catch {
		return null;
	}
}
