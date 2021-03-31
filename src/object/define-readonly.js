export function defineReadOnly(value, enumerable = false) {
	return { configurable: true, enumerable, writable: false, value };
}
