import { defineReadOnly } from './define-readonly.js';

export function defineProtected(o) {
	return Object.entries(o).reduce(
		(out, [key, value]) => ((out[key] = defineReadOnly(value)), out),
		{}
	);
}
