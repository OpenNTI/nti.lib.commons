import { defineReadOnly } from './define-readonly.js';

export function definePublic(o) {
	return Object.entries(o).reduce(
		(out, [key, value]) => ((out[key] = defineReadOnly(value, true)), out),
		{}
	);
}
