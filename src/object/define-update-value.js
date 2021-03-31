import { defineReadOnly } from './define-readonly.js';

export function updateValue(scope, key, value) {
	const desc =
		Object.getOwnPropertyDescriptor(scope, key) || defineReadOnly(value);
	delete scope[key];
	Object.defineProperty(scope, key, { ...desc, value });
}
