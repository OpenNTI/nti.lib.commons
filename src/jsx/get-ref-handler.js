const isRef = x => x && (typeof x === 'function' || ('current' in x));

const setRef = (ref, x) => ref && (typeof ref === 'function') ? ref(x) : (ref.current = x);

export function getRefHandler (parentRef, localRef) {
	const fn = getRefHandler;
	const REF_HANDLERS = fn.map || (fn.map = new WeakMap());

	if (!isRef(parentRef)) {
		if (parentRef) {
			// eslint-disable-next-line no-console
			console.error(`Unsupported value (${typeof parentRef}: ${parentRef}) has been dropped. Use a ref object or callback instead.`);
		}
		return localRef;
	}

	if (!isRef(localRef)) {
		throw new Error(`Invalid Ref: ${typeof localRef} - ${localRef}`);
	}

	const PARENT_REF_MAP = REF_HANDLERS.get(localRef) || new WeakMap();
	REF_HANDLERS.set(localRef, PARENT_REF_MAP);

	const h = PARENT_REF_MAP.get(parentRef) || (x => {
		setRef(parentRef, x);
		setRef(localRef, x);
	});

	PARENT_REF_MAP.set(parentRef, h);

	return h;
}
