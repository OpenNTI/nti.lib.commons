import has from './utils/has';

function inPrototype(o, key) {
	let proto = Object.getPrototypeOf(o || {});
	return proto && (has(proto, key) || inPrototype(proto, key));
}

export default function mixin(dest, partial, ...optionalConstructorData) {
	for (let key of Object.keys(partial)) {
		if (dest[key] == null || !inPrototype(dest, key)) {
			dest[key] = partial[key];
		}
	}

	if (partial.constructor) {
		partial.constructor.call(dest, ...optionalConstructorData);
	}
}
